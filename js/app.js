/**
 * @file app.js (Teil 1)
 * @description Dieses zentrale Skript verwaltet das clientseitige Routing.
 * @author Satoramy-PRAI & PRAI (Gemini)
 */

document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app-container');

    // --- 1. ROUTING LOGIK (PAGES-PFAD BEWAHRT) ---
    async function loadPage(pageName) {
        try {
            // Pfad bleibt ./pages/ wie im Original gefordert
            const response = await fetch(`./pages/${pageName}.html`);
            if (!response.ok) {
                throw new Error(`Seite "${pageName}" konnte nicht geladen werden.`);
            }
            const html = await response.text();
            appContainer.innerHTML = html;

            // Trigger-Logik für die Komponenten
            if (pageName === 'card-generator') initCardGenerator();
            if (pageName === 'home') initHomeLayers();
            if (pageName === 'profile') {
                initProfileChains();
                if (typeof initCurrencySystem === "function") initCurrencySystem();
            }
            if (pageName === 'settings') initSettingsSecurity();

        } catch (error) {
            console.error(error);
            appContainer.innerHTML = `<h2 class="text-red-500">Fehler beim Laden der Seite.</h2><p>Die angeforderte Seite konnte nicht gefunden werden.</p>`;
        }
    }

    function handleHashChange() {
        const hash = window.location.hash.slice(1);
        const pageName = hash.split('?')[0] || 'home';
        loadPage(pageName);
    }

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    // --- 2. GLOBAL VIP CARD GENERATOR (ORIGINAL TITEL & LOGIK) ---
    function initCardGenerator() {
        const canvas = document.getElementById('vip-card-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const countrySelect = document.getElementById('country-select');
        const nameInput = document.getElementById('name-input');
        const idInput = document.getElementById('id-input');
        const saveButton = document.getElementById('save-button');

        const euCountries = [
            { code: 'at', name: 'Österreich', colors: { primary: '#FF0000', secondary: '#FFFFFF', accent: '#FF0000' } },
            { code: 'be', name: 'Belgien', colors: { primary: '#000000', secondary: '#F1F1F1', accent: '#FDDA24' } },
            { code: 'bg', name: 'Bulgarien', colors: { primary: '#00966E', secondary: '#FFFFFF', accent: '#D62612' } },
            { code: 'hr', name: 'Kroatien', colors: { primary: '#214D96', secondary: '#FFFFFF', accent: '#E00000' } },
            { code: 'cy', name: 'Zypern', colors: { primary: '#FFFFFF', secondary: '#000000', accent: '#FF9933' } },
            { code: 'cz', name: 'Tschechische Republik', colors: { primary: '#003399', secondary: '#FFFFFF', accent: '#E80000' } },
            { code: 'dk', name: 'Dänemark', colors: { primary: '#C60C30', secondary: '#FFFFFF', accent: '#C60C30' } },
            { code: 'ee', name: 'Estland', colors: { primary: '#0072B2', secondary: '#FFFFFF', accent: '#000000' } },
            { code: 'fi', name: 'Finnland', colors: { primary: '#FFFFFF', secondary: '#003580', accent: '#003580' } },
            { code: 'fr', name: 'Frankreich', colors: { primary: '#0055A4', secondary: '#FFFFFF', accent: '#EF4135' } },
            { code: 'de', name: 'Deutschland', colors: { primary: '#000000', secondary: '#FF0000', accent: '#FFCC00' } },
            { code: 'gr', name: 'Griechenland', colors: { primary: '#0D5EAF', secondary: '#FFFFFF', accent: '#FFFFFF' } },
            { code: 'hu', name: 'Ungarn', colors: { primary: '#CE2B37', secondary: '#FFFFFF', accent: '#008751' } },
            { code: 'ie', name: 'Irland', colors: { primary: '#169B62', secondary: '#FFFFFF', accent: '#FF883E' } },
            { code: 'it', name: 'Italien', colors: { primary: '#009246', secondary: '#FFFFFF', accent: '#CE2B37' } },
            { code: 'lv', name: 'Lettland', colors: { primary: '#9E2A2F', secondary: '#FFFFFF', accent: '#9E2A2F' } },
            { code: 'lt', name: 'Litauen', colors: { primary: '#FFB81C', secondary: '#006A44', accent: '#C1272D' } },
            { code: 'lu', name: 'Luxemburg', colors: { primary: '#EF3340', secondary: '#FFFFFF', accent: '#00A4E0' } },
            { code: 'mt', name: 'Malta', colors: { primary: '#FFFFFF', secondary: '#C8102E', accent: '#FFFFFF' } },
            { code: 'nl', name: 'Niederlande', colors: { primary: '#AE1C28', secondary: '#FFFFFF', accent: '#21468B' } },
            { code: 'pl', name: 'Polen', colors: { primary: '#DC143C', secondary: '#FFFFFF', accent: '#DC143C' } },
            { code: 'pt', name: 'Portugal', colors: { primary: '#006600', secondary: '#FFCC00', accent: '#CC0000' } },
            { code: 'ro', name: 'Rumänien', colors: { primary: '#002B7F', secondary: '#FCD116', accent: '#E2592A' } },
            { code: 'sk', name: 'Slowakei', colors: { primary: '#FFFFFF', secondary: '#0A3897', accent: '#EE1C25' } },
            { code: 'si', name: 'Slowenien', colors: { primary: '#006B92', secondary: '#FFFFFF', accent: '#E31D1A' } },
            { code: 'es', name: 'Spanien', colors: { primary: '#AA152B', secondary: '#FFCC00', accent: '#AA152B' } },
            { code: 'se', name: 'Schweden', colors: { primary: '#006AA7', secondary: '#FECC00', accent: '#FECC00' } }
        ];

        if (countrySelect.options.length <= 1) {
            euCountries.forEach(country => {
                const option = document.createElement('option');
                option.value = country.code;
                option.textContent = country.name;
                countrySelect.appendChild(option);
            });
        }

        function drawCard() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const selectedCountry = euCountries.find(c => c.code === countrySelect.value) || {};
            const colors = selectedCountry.colors || { primary: '#1a202c', secondary: '#e2e8f0', accent: '#4a5568' };
            ctx.fillStyle = colors.primary;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = colors.accent;
            ctx.fillRect(0, 0, 50, canvas.height);
            ctx.fillStyle = colors.secondary;
            ctx.font = '24px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Global VIP Card', canvas.width / 2, 50);
            ctx.font = '16px Arial';
            ctx.textAlign = 'left';
            ctx.fillText(`Name: ${nameInput.value}`, 70, 100);
            ctx.fillText(`ID: ${idInput.value}`, 70, 140);
            ctx.fillText(`Land: ${selectedCountry.name || ''}`, 70, 180);
        }

        countrySelect.addEventListener('change', drawCard);
        nameInput.addEventListener('input', drawCard);
        idInput.addEventListener('input', drawCard);

        saveButton.addEventListener('click', () => {
            const link = document.createElement('a');
            link.download = `vip-card-${countrySelect.value}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            alert('Karte wurde als Bild gespeichert!');
        });

        const params = new URLSearchParams(window.location.hash.split('?')[1]);
        const countryCode = params.get('country');
        if (countryCode) countrySelect.value = countryCode;
        drawCard();
    }
    // =========================================================================
    // AB HIER: FUSIONIERTE MASTER INTEGRATIONEN (MAXIMALES POTENZIAL)
    // =========================================================================

    // --- 1. EBENEN-RENDERING (3-2-1 Logik für home.html) ---
    async function initHomeLayers() {
        // Willkommens-Bereich Injektion
        const welcomeContainer = document.getElementById('welcome-layer-target');
        if (welcomeContainer) {
            welcomeContainer.innerHTML = `
                <div class="welcome-section text-center p-6 bg-[#161b22] rounded-3xl mb-6 border border-[#30363d]">
                    <h2 class="text-2xl font-bold text-blue-400">Systemstatus: Aktiv</h2>
                    <p class="text-gray-400 text-sm">Willkommen in der PZQQET-Kernumgebung.</p>
                </div>
            `;
        }

        // Ebene 3: Root-Fläche (index.html Injektion)
        const rootContainer = document.getElementById('root-layer-target');
        if (rootContainer) {
            try {
                const res = await fetch('index.html');
                const html = await res.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const mainContent = doc.querySelector('main');
                rootContainer.innerHTML = mainContent ? mainContent.innerHTML : html;
            } catch(e) { 
                console.warn("Root Layer konnte nicht geladen werden."); 
            }
        }

        // Ebene 2: README-Rendering (Dokumentations-Offenbarung)
        const readmeContainer = document.getElementById('readme-layer-target');
        if (readmeContainer) {
            try {
                const res = await fetch('README.md');
                const md = await res.text();
                readmeContainer.innerHTML = `<div class="p-4 bg-gray-900/50 rounded-lg border border-gray-800 font-mono text-[10px] whitespace-pre-wrap">${md}</div>`;
            } catch(e) { 
                readmeContainer.innerHTML = "Dokumentation lädt..."; 
            }
        }
        
        if (typeof updateGlobalRanking === "function") updateGlobalRanking();
    }

    // --- 2. MULTI-CURRENCY MOTOR (27 EU-Staaten + Föderationen) ---
    window.initCurrencySystem = () => {
        const federations = [
            { code: 'USD', name: 'Amerikanische Föderation (USA)' },
            { code: 'CNY', name: 'Asiatische Allianz (China)' },
            { code: 'JPY', name: 'Pazifik-Raum (Japan)' },
            { code: 'GBP', name: 'Britische Inseln (UK)' },
            { code: 'CHF', name: 'Alpen-Konföderation (Schweiz)' },
            { code: 'RUB', name: 'Eurasische Union (Russland)' }
        ];

        const euAll = [
            { code: 'EUR', name: 'Europäische Kernzone', isEuro: true },
            { code: 'BGN', name: 'Bulgarien' }, { code: 'CZK', name: 'Tschechien' },
            { code: 'DKK', name: 'Dänemark' }, { code: 'HUF', name: 'Ungarn' },
            { code: 'PLN', name: 'Polen' }, { code: 'RON', name: 'Rumänien' },
            { code: 'SEK', name: 'Schweden' }, { code: 'HRK', name: 'Kroatien' },
            { code: 'AT', name: 'Österreich', isEuro: true }, { code: 'BE', name: 'Belgien', isEuro: true },
            { code: 'CY', name: 'Zypern', isEuro: true }, { code: 'EE', name: 'Estland', isEuro: true },
            { code: 'FI', name: 'Finnland', isEuro: true }, { code: 'FR', name: 'Frankreich', isEuro: true },
            { code: 'DE', name: 'Deutschland', isEuro: true }, { code: 'GR', name: 'Griechenland', isEuro: true },
            { code: 'IE', name: 'Irland', isEuro: true }, { code: 'IT', name: 'Italien', isEuro: true },
            { code: 'LV', name: 'Lettland', isEuro: true }, { code: 'LT', name: 'Litauen', isEuro: true },
            { code: 'LU', name: 'Luxemburg', isEuro: true }, { code: 'MT', name: 'Malta', isEuro: true },
            { code: 'NL', name: 'Niederlande', isEuro: true }, { code: 'PT', name: 'Portugal', isEuro: true },
            { code: 'SK', name: 'Slowakei', isEuro: true }, { code: 'SI', name: 'Slowenien', isEuro: true },
            { code: 'ES', name: 'Spanien', isEuro: true }
        ];

        let portfolio = JSON.parse(localStorage.getItem('rfof_portfolio') || '{}');
        portfolio['EUR'] = localStorage.getItem('rfof_balance') || "0.00";
        localStorage.setItem('rfof_portfolio', JSON.stringify(portfolio));

        const container = document.getElementById('dynamic-assets');
        if (container) {
            let html = '<div class="text-[8px] text-blue-500 font-black mb-2 mt-4 uppercase tracking-tighter">#Global_Federation_Assets</div>';
            
            federations.forEach(f => {
                const val = parseFloat(portfolio[f.code] || 0).toFixed(2);
                html += `
                    <div class="flex justify-between items-center py-1 border-b border-gray-800/20 px-1">
                        <div class="flex flex-col">
                            <span class="text-[9px] text-white font-mono font-bold">${f.code}</span>
                            <span class="text-[6px] text-gray-500 uppercase">${f.name}</span>
                        </div>
                        <span class="text-[9px] font-mono text-blue-400">${val}</span>
                    </div>`;
            });

            html += '<div class="text-[8px] text-yellow-600 font-black mb-2 mt-4 uppercase tracking-tighter">#EU_Regional_Parity</div>';
            
            euAll.forEach(curr => {
                const val = parseFloat(portfolio[curr.code] || (curr.isEuro ? portfolio['EUR'] : 0)).toFixed(2);
                html += `
                    <div class="flex justify-between items-center py-1 border-b border-gray-800/20 px-1">
                        <div class="flex flex-col">
                            <span class="text-[9px] text-white font-mono font-bold">${curr.code}</span>
                            <span class="text-[6px] text-gray-500 uppercase">${curr.name}</span>
                        </div>
                        <span class="text-[9px] font-mono ${curr.isEuro ? 'text-green-500' : 'text-gray-400'}">${val}</span>
                    </div>`;
            });
            container.innerHTML = html;
        }
    };

    // --- 3. QR-BANKING & ANFORDERN ENGINE ---
    window.requestFunds = () => {
        const amount = prompt("Betrag in Euro zum Anfordern:", "50.00");
        if (!amount || isNaN(amount)) return;

        const iban = localStorage.getItem('rfof_active_iban') || "DE760000000000000000";
        const name = localStorage.getItem('rfof_username') || "VIP-USER";
        
        const qrData = `BCD\n001\n1\nSCT\n\n${name}\n${iban}\nEUR${amount}\n\nPZQQET-TRANSACTION`;
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrData)}`;

        let overlay = document.getElementById('qr-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'qr-overlay';
            overlay.className = 'fixed inset-0 bg-black/95 z-[100] flex flex-col items-center justify-center p-6';
            document.body.appendChild(overlay);
        }

        overlay.innerHTML = `
            <div class="bg-white p-6 rounded-3xl text-center shadow-2xl">
                <h3 class="text-black font-black text-[10px] mb-4 uppercase">#Scan_to_Transfer_EUR</h3>
                <img src="${qrUrl}" class="w-48 h-48 mx-auto border border-gray-100" />
                <p class="mt-4 text-[9px] font-mono text-gray-500">${iban}</p>
                <button onclick="this.parentElement.parentElement.remove()" class="mt-6 w-full bg-black text-white py-3 rounded-xl text-[10px] font-bold uppercase">Abbrechen</button>
            </div>
            <p class="text-white text-[8px] mt-4 opacity-50 italic">Simulation: Eingang erfolgt nach Scan automatisch (8s)...</p>
        `;

        setTimeout(() => {
            if (document.getElementById('qr-overlay')) {
                let current = parseFloat(localStorage.getItem('rfof_balance') || "0");
                let newBalance = (current + parseFloat(amount)).toFixed(2);
                localStorage.setItem('rfof_balance', newBalance);
                
                recordTransaction('RECEIVE', `${amount} €`);
                
                if (window.location.hash.includes('profile')) {
                    initProfileChains();
                    initCurrencySystem();
                }
                document.getElementById('qr-overlay').remove();
                alert(`ERFOLG: ${amount} € wurden gutgeschrieben.`);
            }
        }, 8000);
    };

    // --- 4. BEWAHRTE IBAN & CHAIN LOGIK ---
    function initProfileChains() {
        const ibanDisplay = document.getElementById('active-iban');
        const balanceDisplay = document.getElementById('balance-display');
        const identityDisplay = document.getElementById('identity-name-display');
        
        const savedIban = localStorage.getItem('rfof_active_iban');
        const savedBalance = localStorage.getItem('rfof_balance') || "0.00";
        const savedUser = localStorage.getItem('rfof_username');
        
        if (ibanDisplay) ibanDisplay.textContent = savedIban || "Generiere ID...";
        if (balanceDisplay) balanceDisplay.textContent = `${savedBalance} €`;
        if (identityDisplay && savedUser) identityDisplay.textContent = savedUser;
        
        renderLocalChains();
    }

    function recordTransaction(type, value) {
        let live = JSON.parse(localStorage.getItem('rfof_live_log') || '[]');
        live.unshift({ name: type, value: value, time: new Date().toLocaleTimeString() });
        localStorage.setItem('rfof_live_log', JSON.stringify(live));
    }

    function renderLocalChains() {
        const histCont = document.getElementById('history-chain');
        const liveCont = document.getElementById('live-chain');
        if (!histCont || !liveCont) return;

        const history = JSON.parse(localStorage.getItem('rfof_history_log') || '[]');
        const live = JSON.parse(localStorage.getItem('rfof_live_log') || '[]');

        histCont.innerHTML = history.slice(0,10).map(h => `<div class="border-b border-gray-900 py-1 text-[7px]">ID: ${h.id}</div>`).join('');
        liveCont.innerHTML = live.slice(0,10).map(l => `<div class="text-green-400 font-bold text-[7px]">${l.name}: ${l.value}</div>`).join('');
    }

    function initSettingsSecurity() {
        const state = localStorage.getItem('rfof_state') || 'WARM';
        const statusLabel = document.getElementById('account-status-label');
        if (statusLabel) {
            statusLabel.textContent = state;
            statusLabel.style.color = state === 'WARM' ? '#10b981' : '#ef4444';
        }
    }
});
