// api/klikindomaret.js - Vercel Serverless Function
export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, apps, page, x-correlation-id');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { 
            keyword, 
            type = 'keyword',
            columnView = '2',
            page = '0', 
            size = '16', 
            storeCode = 'TNRT',
            latitude = '-4.507133333333333',
            longitude = '120.184025',
            mode = 'PICKUP',
            districtId = '141100100',
            isUserFiltered = 'false'
        } = req.query;

        if (!keyword) {
            return res.status(400).json({ 
                error: 'Parameter keyword diperlukan' 
            });
        }

        // Parameter sets untuk fallback dengan koordinat yang sesuai dengan fetch asli
        const parameterSets = [
            {
                storeCode: storeCode,
                latitude: latitude,
                longitude: longitude,
                mode: mode,
                districtId: districtId
            },
            {
                storeCode: "TNRT",
                latitude: "-4.507133333333333",
                longitude: "120.184025",
                mode: "PICKUP",
                districtId: "141100100"
            },
            {
                storeCode: "TJKT",
                latitude: "-6.1763897",
                longitude: "106.82667",
                mode: "DELIVERY",
                districtId: "141100100"
            },
            {
                storeCode: "TMKS",
                latitude: "-4.5502257",
                longitude: "120.31591",
                mode: "DELIVERY",
                districtId: "142601813"
            }
        ];

        const API_URL = "https://ap-mc.klikindomaret.com/assets-klikidmsearch/api/get/catalog-xpress/api/webapp/search/result";
        
        let lastError = null;

        // Coba setiap parameter set
        for (const params of parameterSets) {
            try {
                const queryParams = new URLSearchParams({
                    keyword: keyword,
                    type: type,
                    columnView: columnView,
                    page: page,
                    size: size,
                    isUserFiltered: isUserFiltered,
                    storeCode: params.storeCode,
                    latitude: params.latitude,
                    longitude: params.longitude,
                    mode: params.mode,
                    districtId: params.districtId
                });

                // Generate correlation ID seperti di fetch asli
                const correlationId = generateUUID();
                
                // Generate device ID seperti di fetch asli
                const deviceId = "e6a0c721-05d5-4d80-9b9d-1393180dc177";

                const response = await fetch(`${API_URL}?${queryParams}`, {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json, text/plain, */*',
                        'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
                        'apps': JSON.stringify({
                            "app_version": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36",
                            "device_class": "mobile|browser",
                            "device_family": "none",
                            "device_id": deviceId,
                            "os_name": "Android",
                            "os_version": "10"
                        }),
                        'page': '/search',
                        'sec-ch-ua': '"Chromium";v="137", "Not/A)Brand";v="24"',
                        'sec-ch-ua-mobile': '?1',
                        'sec-ch-ua-platform': '"Android"',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-site',
                        'x-correlation-id': correlationId,
                        'Referer': 'https://www.klikindomaret.com/',
                        'Referrer-Policy': 'strict-origin-when-cross-origin',
                        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36'
                    },
                    signal: AbortSignal.timeout(15000)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                
                // Jika berhasil mendapat data, kembalikan response
                if (data && (data.status === "00" || data.data)) {
                    // Tambahkan metadata
                    const responseData = {
                        ...data,
                        meta: {
                            timestamp: new Date().toISOString(),
                            source: 'KlikIndomaret API',
                            storeCode: params.storeCode,
                            location: {
                                latitude: params.latitude,
                                longitude: params.longitude
                            },
                            requestParams: {
                                keyword,
                                type,
                                page: parseInt(page),
                                size: parseInt(size),
                                columnView: parseInt(columnView)
                            }
                        }
                    };
                    
                    return res.status(200).json(responseData);
                }

            } catch (error) {
                console.error(`Error with store ${params.storeCode}:`, error.message);
                lastError = error;
                continue; // Coba parameter set berikutnya
            }
        }

        // Jika semua parameter set gagal
        return res.status(500).json({
            error: 'Gagal mengambil data dari semua store',
            details: lastError?.message || 'Unknown error',
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Proxy error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            details: error.message,
            timestamp: new Date().toISOString()
        });
    }
}

// Helper function to generate UUID seperti di fetch asli
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
