// Apiklik/klik.js - Vercel Serverless Function
export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
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
            page = 0, 
            size = 16, 
            storeCode = 'TJKT',
            latitude = '-6.1763897',
            longitude = '106.82667',
            mode = 'DELIVERY',
            districtId = '141100100',
            isUserFiltered = 'false'
        } = req.query;

        if (!keyword) {
            return res.status(400).json({ 
                error: 'Parameter keyword diperlukan' 
            });
        }

        // Parameter sets untuk fallback
        const parameterSets = [
            {
                storeCode: storeCode,
                latitude: latitude,
                longitude: longitude,
                mode: mode,
                districtId: districtId,
                isUserFiltered: isUserFiltered
            },
            {
                storeCode: "TMKS",
                latitude: "-4.5502257",
                longitude: "120.31591",
                mode: "DELIVERY",
                districtId: "142601813",
                isUserFiltered: "false"
            },
            {
                storeCode: "TYGA",
                latitude: "-7.42680566136574", 
                longitude: "109.2391143315548", 
                mode: "DELIVERY",
                districtId: "141308323", 
                isUserFiltered: "false"
            }
        ];

        const API_URL = "https://ap-mc.klikindomaret.com/assets-klikidmsearch/api/get/catalog-xpress/api/webapp/search/result";
        
        let lastError = null;

        // Coba setiap parameter set
        for (const params of parameterSets) {
            try {
                const queryParams = new URLSearchParams({
                    keyword: keyword,
                    page: page,
                    size: size,
                    ...params
                });

                const response = await fetch(`${API_URL}?${queryParams}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                        'Referer': 'https://www.klikindomaret.com/',
                        'Origin': 'https://www.klikindomaret.com',
                        'Accept-Language': 'id-ID,id;q=0.9,en;q=0.8',
                        'Accept-Encoding': 'gzip, deflate, br',
                        'Connection': 'keep-alive',
                        'Sec-Fetch-Dest': 'empty',
                        'Sec-Fetch-Mode': 'cors',
                        'Sec-Fetch-Site': 'same-site'
                    },
                    timeout: 10000
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                
                // Jika berhasil mendapat data, kembalikan response
                if (data && data.status === "00") {
                    // Tambahkan metadata
                    const responseData = {
                        ...data,
                        meta: {
                            timestamp: new Date().toISOString(),
                            source: 'KlikIndomaret API',
                            storeCode: params.storeCode,
                            requestParams: {
                                keyword,
                                page: parseInt(page),
                                size: parseInt(size)
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
