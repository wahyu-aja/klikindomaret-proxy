<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cek Stok Indomaret</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }

        .header h1 {
            font-size: 28px;
            margin-bottom: 10px;
        }

        .header p {
            opacity: 0.9;
            font-size: 14px;
        }

        .content {
            padding: 30px;
        }

        .token-section {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 25px;
            border-left: 4px solid #667eea;
        }

        .token-status {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            padding: 15px;
            background: white;
            border-radius: 8px;
        }

        .token-info {
            flex: 1;
        }

        .token-info h4 {
            margin-bottom: 5px;
            color: #333;
        }

        .token-info p {
            font-size: 13px;
            color: #666;
            margin: 3px 0;
        }

        .token-valid {
            color: #28a745;
            font-weight: 600;
        }

        .token-expired {
            color: #dc3545;
            font-weight: 600;
        }

        .token-unknown {
            color: #ffc107;
            font-weight: 600;
        }

        .btn-refresh {
            padding: 10px 20px;
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s;
            white-space: nowrap;
        }

        .btn-refresh:hover {
            transform: translateY(-2px);
        }

        .btn-refresh:disabled {
            background: #ccc;
            cursor: not-allowed;
            transform: none;
        }

        .form-group {
            margin-bottom: 25px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #333;
            font-size: 14px;
        }

        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-size: 14px;
            transition: all 0.3s;
            font-family: 'Courier New', monospace;
        }

        .form-group input:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-group textarea {
            resize: vertical;
            min-height: 100px;
        }

        .hint {
            font-size: 12px;
            color: #666;
            margin-top: 5px;
            font-style: italic;
        }

        .btn {
            width: 100%;
            padding: 15px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        .btn:active {
            transform: translateY(0);
        }

        .btn:disabled {
            background: #ccc;
            cursor: not-allowed;
            transform: none;
        }

        .loading {
            display: none;
            text-align: center;
            padding: 20px;
            color: #667eea;
        }

        .loading.active {
            display: block;
        }

        .spinner {
            border: 3px solid #f3f3f3;
            border-top: 3px solid #667eea;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto 10px;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .result {
            margin-top: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;
            display: none;
        }

        .result.active {
            display: block;
        }

        .result h3 {
            color: #333;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid #667eea;
        }

        .store-info {
            background: white;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            border-left: 4px solid #667eea;
        }

        .store-info p {
            margin: 5px 0;
            font-size: 14px;
        }

        .store-info strong {
            color: #667eea;
        }

        .product-list {
            display: grid;
            gap: 15px;
        }

        .product-item {
            background: white;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #28a745;
            transition: transform 0.2s;
        }

        .product-item:hover {
            transform: translateX(5px);
        }

        .product-item.no-stock {
            border-left-color: #dc3545;
            opacity: 0.7;
        }

        .product-name {
            font-weight: 600;
            color: #333;
            margin-bottom: 8px;
        }

        .product-details {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
            color: #666;
        }

        .stock {
            font-weight: 600;
            color: #28a745;
        }

        .no-stock .stock {
            color: #dc3545;
        }

        .error {
            background: #fee;
            border: 1px solid #fcc;
            color: #c33;
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
        }

        .success {
            background: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
            padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
        }

        .batch-info {
            background: #e3f2fd;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 13px;
        }

        .batch-info p {
            margin: 5px 0;
        }

        @media (max-width: 768px) {
            .container {
                border-radius: 0;
            }

            .header h1 {
                font-size: 24px;
            }

            .content {
                padding: 20px;
            }

            .token-status {
                flex-direction: column;
                gap: 10px;
            }

            .btn-refresh {
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏪 Cek Stok Indomaret</h1>
            <p>Aplikasi Web Cek Stok Produk Indomaret dengan Auto Refresh Token</p>
        </div>

        <div class="content">
            <div class="token-section">
                <h4 style="margin-bottom: 15px; color: #333;">🔑 Status Token</h4>
                <div class="token-status">
                    <div class="token-info">
                        <h4>Access Token</h4>
                        <p id="accessTokenStatus" class="token-unknown">Belum dimuat</p>
                        <p id="accessTokenExpiry" style="font-size: 12px;"></p>
                    </div>
                    <button class="btn-refresh" id="btnRefresh">
                        🔄 Refresh Token
                    </button>
                </div>
                <div id="refreshMessage"></div>
            </div>

            <form id="tokenForm" style="margin-bottom: 25px;">
                <div class="form-group">
                    <label for="refreshTokenInput">🔐 Refresh Token</label>
                    <textarea 
                        id="refreshTokenInput" 
                        placeholder="Paste refresh token Anda di sini"
                        required
                    ></textarea>
                    <div class="hint">Refresh token akan disimpan di localStorage browser Anda</div>
                </div>
                <button type="submit" class="btn">💾 Simpan Refresh Token</button>
            </form>

            <form id="stockForm">
                <div class="form-group">
                    <label for="storeCode">🏪 Kode Toko</label>
                    <input 
                        type="text" 
                        id="storeCode" 
                        placeholder="Contoh: TBVH"
                        required
                    >
                    <div class="hint">Masukkan kode toko Indomaret (4 karakter)</div>
                </div>

                <div class="form-group">
                    <label for="pluInput">📦 Daftar PLU</label>
                    <textarea 
                        id="pluInput" 
                        placeholder="Masukkan PLU (pisahkan dengan koma, spasi, atau baris baru)&#10;Contoh: 20024079, 10003795&#10;atau satu PLU per baris"
                        required
                    ></textarea>
                    <div class="hint">PLU harus minimal 5 digit angka</div>
                </div>

                <button type="submit" class="btn" id="submitBtn">
                    🔍 Cek Stok Sekarang
                </button>
            </form>

            <div class="loading" id="loading">
                <div class="spinner"></div>
                <p id="loadingText">Sedang mengecek stok... Mohon tunggu</p>
            </div>

            <div class="result" id="result"></div>
        </div>
    </div>

    <script>
        // Constants
        const TELUR_QTY_10 = new Set(['20024079', '10003795']);
        const TELUR_QTY_6 = new Set(['20081741', '10004977']);
        const requestCache = new Map();

        // Token Management
        let currentAccessToken = null;
        let currentRefreshToken = null;

        // Load tokens from memory
        function loadTokens() {
            const stored = sessionStorage.getItem('tokens');
            if (stored) {
                const tokens = JSON.parse(stored);
                currentAccessToken = tokens.accessToken;
                currentRefreshToken = tokens.refreshToken;
                updateTokenStatus();
            }

            const savedRefresh = localStorage.getItem('refreshToken');
            if (savedRefresh && !currentRefreshToken) {
                currentRefreshToken = savedRefresh;
                document.getElementById('refreshTokenInput').value = savedRefresh;
            }
        }

        // Save tokens to memory
        function saveTokens() {
            if (currentAccessToken || currentRefreshToken) {
                sessionStorage.setItem('tokens', JSON.stringify({
                    accessToken: currentAccessToken,
                    refreshToken: currentRefreshToken
                }));
            }
        }

        // Decode JWT token
        function decodeToken(token) {
            try {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                return JSON.parse(jsonPayload);
            } catch (e) {
                return null;
            }
        }

        // Check if token is expired
        function isTokenExpired(token) {
            if (!token) return true;
            
            const decoded = decodeToken(token);
            if (!decoded || !decoded.exp) return false;
            
            const currentTime = Math.floor(Date.now() / 1000);
            return decoded.exp < (currentTime + 60);
        }

        // Update token status display
        function updateTokenStatus() {
            const statusEl = document.getElementById('accessTokenStatus');
            const expiryEl = document.getElementById('accessTokenExpiry');
            
            if (!currentAccessToken) {
                statusEl.textContent = 'Belum ada token';
                statusEl.className = 'token-unknown';
                expiryEl.textContent = '';
                return;
            }

            const decoded = decodeToken(currentAccessToken);
            if (decoded && decoded.exp) {
                const expTime = new Date(decoded.exp * 1000);
                const now = new Date();
                const diff = expTime - now;
                
                if (diff > 0) {
                    const minutes = Math.floor(diff / 60000);
                    statusEl.textContent = '✅ Token Valid';
                    statusEl.className = 'token-valid';
                    expiryEl.textContent = `Berlaku ${minutes} menit lagi (${expTime.toLocaleTimeString('id-ID')})`;
                } else {
                    statusEl.textContent = '❌ Token Kadaluarsa';
                    statusEl.className = 'token-expired';
                    expiryEl.textContent = 'Token sudah tidak berlaku';
                }
            } else {
                statusEl.textContent = '⚠️ Token Tidak Valid';
                statusEl.className = 'token-unknown';
                expiryEl.textContent = '';
            }
        }

        // Refresh token function
        async function performRefreshToken() {
            if (!currentRefreshToken) {
                throw new Error('Refresh token tidak ditemukan. Silakan masukkan refresh token terlebih dahulu.');
            }

            const url = "https://ap-mc.klikindomaret.com/assets-klikidmsearch/api/post/customer/api/webapp/authentication/refresh-token";

            const headers = {
                "Content-Type": "application/json",
                "apps": JSON.stringify({
                    app_version: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:134.0) Gecko/20100101 Firefox/134.0",
                    device_class: "browser|browser",
                    device_family: "none",
                    device_id: "c03b3603-075e-4276-b420-a92d9ee93035",
                    os_name: "Windows",
                    os_version: "10"
                })
            };

            const body = {
                refreshToken: currentRefreshToken
            };

            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });

            const data = await response.json();

            if (data && data.data && data.data.accessToken) {
                currentAccessToken = data.data.accessToken;
                
                if (data.data.refreshToken) {
                    currentRefreshToken = data.data.refreshToken;
                    localStorage.setItem('refreshToken', currentRefreshToken);
                }
                
                saveTokens();
                updateTokenStatus();
                return currentAccessToken;
            } else {
                throw new Error('Response API tidak mengandung accessToken yang valid.');
            }
        }

        // Auto refresh if expired
        async function ensureValidToken() {
            if (!currentAccessToken || isTokenExpired(currentAccessToken)) {
                await performRefreshToken();
            }
        }

        // Utility Functions
        function tentukanQty(plu) {
            if (TELUR_QTY_10.has(plu)) return 10;
            if (TELUR_QTY_6.has(plu)) return 6;
            return 1;
        }

        function getRandomUserAgent() {
            const agents = [
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
                'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
            ];
            return agents[Math.floor(Math.random() * agents.length)];
        }

        function getCacheKey(type, ...params) {
            return `${type}_${params.join('_')}`;
        }

        function getFromCache(key, maxAge = 30000) {
            const cached = requestCache.get(key);
            if (cached && Date.now() - cached.timestamp < maxAge) {
                return cached.data;
            }
            return null;
        }

        function setCache(key, data) {
            requestCache.set(key, { data, timestamp: Date.now() });
            if (requestCache.size > 200) {
                const oldestKey = requestCache.keys().next().value;
                requestCache.delete(oldestKey);
            }
        }

        function parsePLUInput(input) {
            const normalized = input.replace(/,/g, ' ').replace(/\n/g, ' ');
            const pluList = normalized.match(/\d{5,}/g) || [];
            return [...new Set(pluList)];
        }

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        function chunkArray(array, chunkSize) {
            const chunks = [];
            for (let i = 0; i < array.length; i += chunkSize) {
                chunks.push(array.slice(i, i + chunkSize));
            }
            return chunks;
        }

        // API Functions
        async function resetCart(token, storeCode) {
            const cacheKey = getCacheKey('reset_cart', token.slice(-10), storeCode);
            const cached = getFromCache(cacheKey, 15000);
            if (cached) return true;

            const url = 'https://ap-mc.klikindomaret.com/assets-klikidmorder/api/post/cart-xpress/api/webapp/cart/update-cart';
            const userAgent = getRandomUserAgent();

            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'apps': JSON.stringify({
                    app_version: userAgent,
                    device_class: 'browser|browser',
                    device_family: 'none',
                    device_id: `device-${Math.random().toString(36).substring(2, 15)}`,
                    os_name: 'Android',
                    os_version: '10'
                })
            };

            const body = {
                storeCode: storeCode,
                latitude: 1,
                longitude: 1,
                mode: 'PICKUP',
                districtId: '1',
                products: []
            };

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(body)
                });

                const data = await response.json();
                const success = data.status === '00';
                
                if (success) {
                    setCache(cacheKey, true);
                }
                
                return success;
            } catch (err) {
                console.error('Error reset cart:', err);
                return false;
            }
        }

        async function checkStockSingle(token, storeCode, pluList) {
            const cacheKey = getCacheKey('stock_check', token.slice(-10), storeCode, pluList.join(','));
            const cached = getFromCache(cacheKey, 20000);
            if (cached) return cached;

            const url = 'https://ap-mc.klikindomaret.com/assets-klikidmgroceries/api/post/cart-xpress/api/webapp/cart/add-to-cart';
            const userAgent = getRandomUserAgent();

            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'apps': JSON.stringify({
                    app_version: userAgent,
                    device_class: 'browser|browser',
                    device_family: 'none',
                    device_id: `device-${Math.random().toString(36).substring(2, 15)}`,
                    os_name: 'Android',
                    os_version: '10'
                })
            };

            const body = {
                storeCode: storeCode,
                latitude: 1,
                longitude: 1,
                mode: 'PICKUP',
                districtId: '1',
                permalink: 'sunlight-pencuci-piring-lime-650ml',
                products: pluList.map(plu => ({
                    plu: plu,
                    qty: tentukanQty(plu)
                }))
            };

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(body)
                });

                const data = await response.json();

                if (data.status && data.status !== '00') {
                    const errorResult = { error: data.message || 'API error' };
                    setCache(cacheKey, errorResult);
                    return errorResult;
                }

                const resData = data.data || data;
                const products = resData.products || [];

                if (products.length === 0) {
                    const errorResult = { error: 'Produk tidak tersedia/stok kosong' };
                    setCache(cacheKey, errorResult);
                    return errorResult;
                }

                const store = resData.selectedStore || {};
                const result = {
                    storeName: store.storeName || storeCode,
                    address: store.address || '-',
                    products: products.map(p => ({
                        productName: p.productName || `PLU ${p.plu}`,
                        plu: p.plu,
                        stock: p.stock || 0
                    }))
                };

                setCache(cacheKey, result);
                return result;

            } catch (err) {
                console.error('Error check stock:', err);
                return { error: err.message };
            }
        }

        async function checkStockBatch(token, storeCode, pluList, batchSize = 20) {
            if (pluList.length <= batchSize) {
                return await checkStockSingle(token, storeCode, pluList);
            }

            const chunks = chunkArray(pluList, batchSize);
            let allProducts = [];
            let storeInfo = null;
            let totalErrors = 0;
            let consecutiveErrors = 0;
            const maxConsecutiveErrors = 2;

            console.log(`Processing ${chunks.length} batches for ${pluList.length} PLU...`);

            for (let i = 0; i < chunks.length; i++) {
                const chunk = chunks[i];
                document.getElementById('loadingText').textContent = 
                    `Memproses batch ${i + 1}/${chunks.length} (${chunk.length} PLU)...`;

                try {
                    if (i > 0) {
                        const errorRate = totalErrors / i;
                        const delay = Math.min(2000 * Math.max(1, errorRate * 3), 12000);
                        await sleep(delay);

                        let resetSuccess = false;
                        for (let retry = 0; retry < 3; retry++) {
                            resetSuccess = await resetCart(token, storeCode);
                            if (resetSuccess) break;
                            await sleep(2000);
                        }

                        await sleep(1500);
                    }

                    const result = await checkStockSingle(token, storeCode, chunk);

                    if (result.error) {
                        console.warn(`Batch ${i + 1} error:`, result.error);
                        totalErrors++;
                        consecutiveErrors++;

                        if (consecutiveErrors >= maxConsecutiveErrors) {
                            console.error('Too many consecutive errors');
                            break;
                        }

                        await sleep(8000);
                        continue;
                    }

                    consecutiveErrors = 0;

                    if (!storeInfo && result.storeName) {
                        storeInfo = {
                            storeName: result.storeName,
                            address: result.address
                        };
                    }

                    if (result.products && result.products.length > 0) {
                        allProducts = allProducts.concat(result.products);
                    }

                } catch (error) {
                    console.error(`Error batch ${i + 1}:`, error);
                    totalErrors++;
                    consecutiveErrors++;

                    if (consecutiveErrors >= maxConsecutiveErrors) {
                        break;
                    }

                    await sleep(10000);
                }
            }

            if (allProducts.length === 0) {
                return { error: `Tidak ada produk ditemukan untuk ${pluList.length} PLU` };
            }

            const uniqueProducts = Array.from(
                new Map(allProducts.map(p => [p.plu, p])).values()
            );

            return {
                storeName: storeInfo?.storeName || storeCode,
                address: storeInfo?.address || '-',
                products: uniqueProducts,
                batchInfo: {
                    totalPLU: pluList.length,
                    totalBatches: chunks.length,
                    totalFound: uniqueProducts.length,
                    totalErrors: totalErrors,
                    successRate: `${Math.round(((chunks.length - totalErrors) / chunks.length) * 100)}%`
                }
            };
        }

        // Display Functions
        function displayResult(result, storeCode) {
            const resultDiv = document.getElementById('result');
            
            if (result.error) {
                resultDiv.innerHTML = `<div class="error">❌ ${result.error}</div>`;
                resultDiv.classList.add('active');
                return;
            }

            const now = new Date();
            const timestamp = now.toLocaleString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });

            let html = `
                <h3>📦 Hasil Cek Stok Toko</h3>
                
                <div class="store-info">
                    <p><strong>🏪 Toko:</strong> ${storeCode} - ${result.storeName}</p>
                    <p><strong>📍 Alamat:</strong> ${result.address}</p>
                    <p><strong>📅 Waktu:</strong> ${timestamp}</p>
                </div>
            `;

            if (result.batchInfo) {
                html += `
                    <div class="batch-info">
                        <p><strong>📊 Info Batch:</strong></p>
                        <p>Total PLU: ${result.batchInfo.totalPLU}</p>
                        <p>Total Batch: ${result.batchInfo.totalBatches}</p>
                        <p>Ditemukan: ${result.batchInfo.totalFound}</p>
                        <p>Success Rate: ${result.batchInfo.successRate}</p>
                    </div>
                `;
            }

            const available = result.products.filter(p => p.stock > 0);
            const unavailable = result.products.filter(p => p.stock === 0);

            if (available.length > 0) {
                html += `<h4 style="margin-top: 20px; color: #28a745;">✅ Produk Tersedia (${available.length})</h4>`;
                html += '<div class="product-list">';
                available.forEach((p, i) => {
                    html += `
                        <div class="product-item">
                            <div class="product-name">${i + 1}. ${p.productName}</div>
                            <div class="product-details">
                                <span>PLU: ${p.plu}</span>
                                <span class="stock">Stok: ${p.stock} pcs</span>
                            </div>
                        </div>
                    `;
                });
                html += '</div>';
            }

            if (unavailable.length > 0) {
                html += `<h4 style="margin-top: 20px; color: #dc3545;">❌ Stok Kosong (${unavailable.length})</h4>`;
                html += '<div class="product-list">';
                unavailable.slice(0, 10).forEach((p, i) => {
                    html += `
                        <div class="product-item no-stock">
                            <div class="product-name">${i + 1}. ${p.productName}</div>
                            <div class="product-details">
                                <span>PLU: ${p.plu}</span>
                                <span class="stock">Stok: 0 pcs</span>
                            </div>
                        </div>
                    `;
                });
                if (unavailable.length > 10) {
                    html += `<p style="text-align: center; margin-top: 10px; color: #666;">... dan ${unavailable.length - 10} PLU lainnya</p>`;
                }
                html += '</div>';
            }

            resultDiv.innerHTML = html;
            resultDiv.classList.add('active');
        }

        // Event Handlers
        
        // Save refresh token form
        document.getElementById('tokenForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const refreshToken = document.getElementById('refreshTokenInput').value.trim();
            if (!refreshToken) {
                alert('❌ Refresh token tidak boleh kosong!');
                return;
            }

            currentRefreshToken = refreshToken;
            localStorage.setItem('refreshToken', refreshToken);
            saveTokens();
            
            const messageDiv = document.getElementById('refreshMessage');
            messageDiv.innerHTML = '<div class="success">✅ Refresh token berhasil disimpan!</div>';
            
            setTimeout(() => {
                messageDiv.innerHTML = '';
            }, 3000);
        });

        // Refresh token button
        document.getElementById('btnRefresh').addEventListener('click', async () => {
            const btn = document.getElementById('btnRefresh');
            const messageDiv = document.getElementById('refreshMessage');
            
            btn.disabled = true;
            btn.textContent = '⏳ Memproses...';
            messageDiv.innerHTML = '';

            try {
                await performRefreshToken();
                messageDiv.innerHTML = '<div class="success">✅ Token berhasil di-refresh!</div>';
                
                setTimeout(() => {
                    messageDiv.innerHTML = '';
                }, 3000);
            } catch (error) {
                console.error('Error refresh token:', error);
                messageDiv.innerHTML = `<div class="error">❌ Gagal refresh token: ${error.message}</div>`;
            } finally {
                btn.disabled = false;
                btn.textContent = '🔄 Refresh Token';
            }
        });

        // Stock check form
        document.getElementById('stockForm').addEventListener('submit', async (e) => {
            e.preventDefault();

            const storeCode = document.getElementById('storeCode').value.trim().toUpperCase();
            const pluInput = document.getElementById('pluInput').value;

            // Parse PLU
            const pluList = parsePLUInput(pluInput);
            if (pluList.length === 0) {
                alert('❌ Tidak ada PLU yang valid! PLU harus minimal 5 digit.');
                return;
            }

            // Show loading
            document.getElementById('submitBtn').disabled = true;
            document.getElementById('loading').classList.add('active');
            document.getElementById('result').classList.remove('active');
            document.getElementById('loadingText').textContent = 'Memeriksa token...';

            try {
                // Ensure valid token
                await ensureValidToken();

                if (!currentAccessToken) {
                    throw new Error('Tidak ada access token. Silakan refresh token terlebih dahulu.');
                }

                document.getElementById('loadingText').textContent = 'Mengecek stok produk...';

                // Check stock
                const result = await checkStockBatch(currentAccessToken, storeCode, pluList);
                
                // Display result
                displayResult(result, storeCode);

            } catch (error) {
                console.error('Error:', error);
                document.getElementById('result').innerHTML = `
                    <div class="error">❌ Terjadi kesalahan: ${error.message}</div>
                `;
                document.getElementById('result').classList.add('active');
            } finally {
                // Hide loading
                document.getElementById('submitBtn').disabled = false;
                document.getElementById('loading').classList.remove('active');
            }
        });

        // Initialize
        loadTokens();
        updateTokenStatus();
        
        // Update token status every minute
        setInterval(updateTokenStatus, 60000);
    </script>
</body>
</html>
