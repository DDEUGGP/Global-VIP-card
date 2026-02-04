/**
 * @file app.js
 * @description PZQQET CORE ULTIMATE FUSION - Vollständige Integration ohne Lücken.
 * Beinhaltet: Routing, Banking, 27-Länder VIP-Cards, Euro-Master-Hierarchie, 4-Zonen-Sicherheit,
 * NEU: API-Swap-Motor & Triple-Layer Home-Rendering.
 * @author Satoramy-PRAI & PRAI (Gemini)
 */

document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app-container');

    // --- 1. STORAGE & CHAIN PARITY (VOLALITÄTS-SCHUTZ) ---
    const syncPZQQETStorage = () => {
        const staticDefaults = {
            rfof_balance: "0.00",
            rfof_state: "COLD",
            rfof_active_status: "false",
            rfof_active_iban: "DE-PZQQET-CORE-001",
            rfof_portfolio: JSON.stringify({ EUR: "0.00" }),
            rfof_live_log: JSON.stringify([{ name: 'CORE_FUSION', value: 'STABLE', time: new Date().toLocaleTimeString() }]),
            rfof_static_log: JSON.stringify([{ id: 'PZ-INIT', type: 'GENESIS' }])
        };

        Object.keys(staticDefaults).forEach(key => {
            if (localStorage.getItem(key) === null) {
                localStorage.setItem(key, staticDefaults[key]);
            }
        });
    };
    syncPZQQETStorage();

    // --- 2. ROUTING & GATEKEEPER (BRÜCKEN-INJEKTION) ---
    async function loadPage(pageName) {
        const currentUser = localStorage.getItem('rfof_username');
        
        if ((pageName === 'profile' || pageName === 'settings') && !currentUser) {
            window.location.hash = '#auth';
            return;
        }

        const authLinks = document.querySelectorAll('.auth-trigger, a[href*="#profile"], a[href*="#auth"]');
        authLinks.forEach(link => {
            if (currentUser) {
                link.innerHTML = `<span class="text-green-400 font-black">#ID:</span> ${currentUser}`;
                link.href = "#profile";
            } else {
                link.textContent = "Profil / Anmelden";
                link.href = "#auth";
            }
        });

        try {
            const response = await fetch(`./pages/${pageName}.html`);
            if (!response.ok) throw new Error("Knoten-Verlust");
            const html = await response.text();
            appContainer.innerHTML = html;

            // Initialisierung der Schichten je nach Seite
            if (pageName === 'card-generator') initCardGenerator();
            if (pageName === 'home') initHomeLayers(); // Korrigierte Funktion unten
            if (pageName === 'auth' && typeof initAuthLogic === "function") initAuthLogic();
            if (pageName === 'profile') {
                initProfileChains(); 
                initCurrencySystem(); 
            }
            if (pageName === 'settings') initSettingsSecurity();

        } catch (e) {
            appContainer.innerHTML = `<div class="p-10 text-red-500 font-mono text-[10px]">CRITICAL_ERROR: NODE_OFFLINE</div>`;
        }
    }

    // --- 3. GLOBAL VIP CARD (VOLLSTÄNDIGE EU-27 DATEN - UNVERÄNDERT) ---
    function initCardGenerator() {
        const canvas = document.getElementById('vip-card-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const countrySelect = document.getElementById('country-select');
        const nameInput = document.getElementById('name-input');
        const idInput = document.getElementById('id-input');
        const saveButton = document.getElementById('save-button');

        const euCountries = [
            { code: 'be', name: 'Belgien', colors: { primary: '#000000', secondary: '#F1F1F1', accent: '#FDDA24' } },
            { code: 'bg', name: 'Bulgarien', colors: { primary: '#00966E', secondary: '#FFFFFF', accent: '#D62612' } },
            { code: 'dk', name: 'Dänemark', colors: { primary: '#C60C30', secondary: '#FFFFFF', accent: '#C60C30' } },
            { code: 'de', name: 'Deutschland', colors: { primary: '#000000', secondary: '#FF0000', accent: '#FFCC00' } },
            { code: 'ee', name: 'Estland', colors: { primary: '#0072CE', secondary: '#FFFFFF', accent: '#000000' } },
            { code: 'fi', name: 'Finnland', colors: { primary: '#003580', secondary: '#FFFFFF', accent: '#003580' } },
            { code: 'fr', name: 'Frankreich', colors: { primary: '#002395', secondary: '#FFFFFF', accent: '#ED2939' } },
            { code: 'gr', name: 'Griechenland', colors: { primary: '#005BAE', secondary: '#FFFFFF', accent: '#005BAE' } },
            { code: 'ie', name: 'Irland', colors: { primary: '#169B62', secondary: '#FFFFFF', accent: '#FF883E' } },
            { code: 'it', name: 'Italien', colors: { primary: '#009246', secondary: '#FFFFFF', accent: '#CE2B37' } },
            { code: 'hr', name: 'Kroatien', colors: { primary: '#FF0000', secondary: '#FFFFFF', accent: '#171796' } },
            { code: 'lv', name: 'Lettland', colors: { primary: '#9E3039', secondary: '#FFFFFF', accent: '#9E3039' } },
            { code: 'lt', name: 'Litauen', colors: { primary: '#FDB913', secondary: '#006A44', accent: '#C1272D' } },
            { code: 'lu', name: 'Luxemburg', colors: { primary: '#EA141D', secondary: '#FFFFFF', accent: '#00A1DE' } },
            { code: 'mt', name: 'Malta', colors: { primary: '#FFFFFF', secondary: '#CE1126', accent: '#CE1126' } },
            { code: 'nl', name: 'Niederlande', colors: { primary: '#AE1C28', secondary: '#FFFFFF', accent: '#21468B' } },
            { code: 'at', name: 'Österreich', colors: { primary: '#FF0000', secondary: '#FFFFFF', accent: '#FF0000' } },
            { code: 'pl', name: 'Polen', colors: { primary: '#FFFFFF', secondary: '#DC143C', accent: '#DC143C' } },
            { code: 'pt', name: 'Portugal', colors: { primary: '#006600', secondary: '#FF0000', accent: '#FFFF00' } },
            { code: 'ro', name: 'Rumänien', colors: { primary: '#002B7F', secondary: '#FCD116', accent: '#CE1126' } },
            { code: 'se', name: 'Schweden', colors: { primary: '#006AA7', secondary: '#FECC00', accent: '#FECC00' } },
            { code: 'sk', name: 'Slowakei', colors: { primary: '#FFFFFF', secondary: '#0B4EA2', accent: '#EE1C25' } },
            { code: 'si', name: 'Slowenien', colors: { primary: '#FFFFFF', secondary: '#0000FF', accent: '#FF0000' } },
            { code: 'es', name: 'Spanien', colors: { primary: '#AA151B', secondary: '#F1BF00', accent: '#AA151B' } },
            { code: 'cz', name: 'Tschechien', colors: { primary: '#FFFFFF', secondary: '#11457E', accent: '#D7141A' } },
            { code: 'hu', name: 'Ungarn', colors: { primary: '#CE1126', secondary: '#FFFFFF', accent: '#477050' } },
            { code: 'cy', name: 'Zypern', colors: { primary: '#FFFFFF', secondary: '#D47008', accent: '#377345' } }
        ];

        if (countrySelect && countrySelect.options.length <= 1) {
            euCountries.forEach(country => {
                const option = document.createElement('option');
                option.value = country.code;
                option.textContent = country.name;
                countrySelect.appendChild(option);
            });
        }

        function drawCard() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const selectedCountry = euCountries.find(c => c.code === countrySelect.value) || euCountries[0];
            const colors = selectedCountry.colors;
            ctx.fillStyle = colors.primary;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = colors.accent;
            ctx.fillRect(0, 0, 50, canvas.height);
            ctx.fillStyle = colors.secondary;
            ctx.font = 'bold 24px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Global VIP Card', canvas.width / 2, 50);
            ctx.font = '16px Courier New';
            ctx.textAlign = 'left';
            ctx.fillText(`NAME: ${nameInput.value.toUpperCase()}`, 70, 100);
            ctx.fillText(`ID:   ${idInput.value.toUpperCase()}`, 70, 140);
            ctx.fillText(`ZONE: ${selectedCountry.name.toUpperCase()}`, 70, 180);
        }

        [countrySelect, nameInput, idInput].forEach(el => el?.addEventListener('input', drawCard));
        saveButton?.addEventListener('click', () => {
            const link = document.createElement('a');
            link.download = `PZQQET_VIP_${countrySelect.value}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
        drawCard();
    }

    // --- 4. MULTI-CURRENCY MOTOR (FIAT API & SWAP LOGIC) ---
    // Hier bleibt deine Struktur gleich, wird aber um die echte API-Logik erweitert
    window.initCurrencySystem = async () => {
        const container = document.getElementById('dynamic-assets');
        if (!container) return;

        const mainEuro = localStorage.getItem('rfof_balance') || "0.00";
        const portfolio = JSON.parse(localStorage.getItem('rfof_portfolio') || '{}');

        let html = `<div class="mb-6 p-4 bg-blue-900/10 border-l-4 border-blue-500 rounded-r-xl cursor-pointer" id="balance-trigger">
                        <span class="text-[8px] text-blue-400 font-black uppercase">#Master_Currency_Center</span>
                        <div class="flex justify-between items-end"><span class="text-xl font-mono text-white font-black">EUR</span>
                        <span class="text-xl font-mono text-blue-400">${mainEuro} €</span></div>
                        <div id="secondary-balance-display" class="text-[10px] text-gray-500 mt-1 hidden"></div></div>`;

        const federations = [
            { code: 'USD', name: 'Amerikanische Föderation' },
            { code: 'CNY', name: 'Asiatische Allianz' },
            { code: 'JPY', name: 'Pazifik-Raum' },
            { code: 'GBP', name: 'Britische Inseln' },
            { code: 'CHF', name: 'Alpen-Konföderation' },
            { code: 'RUB', name: 'Eurasische Union' }
        ];

        const nonEuroZones = [
            { code: 'BGN', name: 'Bulgarien' },
            { code: 'CZK', name: 'Tschechien' },
            { code: 'DKK', name: 'Dänemark' },
            { code: 'HUF', name: 'Ungarn' },
            { code: 'PLN', name: 'Polen' },
            { code: 'RON', name: 'Rumänien' },
            { code: 'SEK', name: 'Schweden' }
        ];

        // Funktion zum Laden der echten Kurse via API
        async function getRate(code) {
            try {
                const res = await fetch(`https://api.frankfurter.app/latest?from=EUR&to=${code}`);
                const data = await res.json();
                return data.rates[code];
            } catch (e) { return 1.0; } // Fallback
        }

        html += '<div class="text-[8px] text-blue-500 font-black mb-2 uppercase tracking-widest">#Global_Federations</div>';
        for (const f of federations) {
            const rate = await getRate(f.code);
            const val = portfolio[f.code] || (parseFloat(mainEuro) * rate).toFixed(2);
            html += `<div class="flex justify-between py-1 border-b border-gray-800/30 px-1">
                <span class="text-[9px] text-white font-bold">${f.code} <span class="text-[6px] text-gray-500 ml-1">${f.name}</span></span>
                <span class="text-[9px] font-mono text-blue-300">${val}</span></div>`;
        }

        html += '<div class="text-[8px] text-green-600 font-black mb-2 mt-4 uppercase tracking-widest">#Non_Euro_Zones</div>';
        for (const z of nonEuroZones) {
            const rate = await getRate(z.code);
            const val = portfolio[z.code] || (parseFloat(mainEuro) * rate).toFixed(2);
            html += `<div class="flex justify-between py-1 border-b border-gray-800/30 px-1">
                <span class="text-[9px] text-white font-bold">${z.code} <span class="text-[6px] text-gray-500 ml-1">${z.name}</span></span>
                <span class="text-[9px] font-mono text-green-400">${val}</span></div>`;
        }
        container.innerHTML = html;

        // Kontostand-Klick Logik
        document.getElementById('balance-trigger')?.addEventListener('click', async () => {
            const target = prompt("Umrechnung in:", "USD").toUpperCase();
            const rate = await getRate(target);
            const display = document.getElementById('secondary-balance-display');
            if(display) {
                display.textContent = `≈ ${(parseFloat(mainEuro) * rate).toFixed(2)} ${target}`;
                display.classList.toggle('hidden');
            }
        });
    };

    // --- NEU: SWAP LOGIK FUNKTION ---
    window.executeSwap = async () => {
        const amount = prompt("EUR Betrag zum Tausch:", "10.00");
        const target = prompt("Zielwährung (USD, CZK, etc):", "USD").toUpperCase();
        if(!amount || isNaN(amount)) return;

        let currentEur = parseFloat(localStorage.getItem('rfof_balance'));
        if(currentEur < amount) { alert("Unzureichend EUR!"); return; }

        try {
            const res = await fetch(`https://api.frankfurter.app/latest?from=EUR&to=${target}`);
            const data = await res.json();
            const rate = data.rates[target];
            const result = (parseFloat(amount) * rate).toFixed(2);

            localStorage.setItem('rfof_balance', (currentEur - parseFloat(amount)).toFixed(2));
            let port = JSON.parse(localStorage.getItem('rfof_portfolio'));
            port[target] = (parseFloat(port[target] || 0) + parseFloat(result)).toFixed(2);
            localStorage.setItem('rfof_portfolio', JSON.stringify(port));
            
            recordTransaction('SWAP', `${amount} EUR -> ${result} ${target}`);
            initProfileChains();
            initCurrencySystem();
        } catch(e) { alert("Swap fehlgeschlagen. API offline?"); }
    };

    // --- 5. SECURITY MATRIX (UNVERÄNDERT) ---
    window.initSettingsSecurity = () => {
        const label = document.getElementById('account-status-label');
        if (!label) return;
        const state = localStorage.getItem('rfof_state') || 'COLD';
        const isActive = localStorage.getItem('rfof_active_status') === 'true';
        const colorClass = state === 'WARM' ? 'text-yellow-500' : 'text-blue-300';
        const activeTag = isActive ? '<span class="text-green-500">[AKTIV]</span>' : '<span class="text-red-500">[INAKTIV]</span>';
        label.innerHTML = `${activeTag} | <span class="${colorClass}">${state}</span>`;
    };

    window.togglePZQQETState = (targetState, targetActive) => {
        if (targetState) localStorage.setItem('rfof_state', targetState);
        if (targetActive !== undefined) localStorage.setItem('rfof_active_status', targetActive.toString());
        recordTransaction('STATE_CHANGE', `${targetState || 'SAME'} | ACTIVE:${targetActive}`);
        initSettingsSecurity();
    };

    // --- 6. BANKING & LOGS (QR & REFILL) ---
    window.requestFunds = () => {
        if (localStorage.getItem('rfof_active_status') !== 'true') {
            alert("SYSTEM-BLOCKADE: Knoten ist [INAKTIV]."); return;
        }
        const amount = prompt("BETRAG (EUR):", "100.00");
        if (!amount || isNaN(amount)) return;
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=EUR_${amount}_PZQQET`;
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black/95 z-[999] flex items-center justify-center';
        overlay.innerHTML = `<div class="bg-white p-6 rounded-3xl text-center"><img src="${qrUrl}"><button onclick="this.parentElement.parentElement.remove()" class="mt-4 text-[10px] text-red-500">CANCEL</button></div>`;
        document.body.appendChild(overlay);
        setTimeout(() => {
            if (document.body.contains(overlay)) {
                let current = parseFloat(localStorage.getItem('rfof_balance'));
                localStorage.setItem('rfof_balance', (current + parseFloat(amount)).toFixed(2));
                recordTransaction('REFILL', `+${amount} EUR`);
                if (window.location.hash.includes('profile')) { initProfileChains(); initCurrencySystem(); }
                overlay.remove();
            }
        }, 5000);
    };

    function recordTransaction(type, value) {
        let live = JSON.parse(localStorage.getItem('rfof_live_log') || '[]');
        live.unshift({ name: type, value: value, time: new Date().toLocaleTimeString() });
        localStorage.setItem('rfof_live_log', JSON.stringify(live.slice(0, 15)));
        let staticLog = JSON.parse(localStorage.getItem('rfof_static_log') || '[]');
        staticLog.push({ id: `PZ-${Date.now().toString(36).toUpperCase()}`, type: type });
        localStorage.setItem('rfof_static_log', JSON.stringify(staticLog));
    }

    function initProfileChains() {
        const bal = document.getElementById('balance-display');
        const live = document.getElementById('live-chain');
        const nameDisp = document.getElementById('display-system-name');
        if (bal) bal.textContent = `${localStorage.getItem('rfof_balance')} €`;
        if (nameDisp) nameDisp.textContent = localStorage.getItem('rfof_username') || "NON-REGISTERED";
        if (live) {
            const logs = JSON.parse(localStorage.getItem('rfof_live_log') || '[]');
            live.innerHTML = logs.map(l => `<div class="text-[7px] text-green-400 font-mono py-1 border-b border-gray-900">${l.time} | ${l.name}: ${l.value}</div>`).join('');
        }
    }

    // --- KORREKTUR: HOME LAYERS (DREISTUFIGE INJEKTION) ---
    async function initHomeLayers() {
        const target = document.getElementById('welcome-layer-target');
        if (!target) return;

        // Schicht 1: Willkommenstext (Bereits in home.html vorhanden)
        
        // Schicht 2: index.html Injektion
        const indexDiv = document.createElement('div');
        indexDiv.id = "root-layer-injection";
        try {
            const res = await fetch('index.html');
            const html = await res.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            indexDiv.innerHTML = (doc.querySelector('main') || doc.body).innerHTML;
            target.appendChild(indexDiv);
        } catch(e) { console.error("Index-Error"); }

        // Schicht 3: README-Injektion
        const readmeDiv = document.createElement('div');
        readmeDiv.id = "readme-layer-injection";
        try {
            const res = await fetch('README.md');
            const md = await res.text();
            readmeDiv.innerHTML = `<pre class="p-4 bg-black text-[9px] text-blue-300 font-mono overflow-auto">${md}</pre>`;
            target.appendChild(readmeDiv);
        } catch(e) { console.error("README-Error"); }
    }

    window.addEventListener('hashchange', () => loadPage(window.location.hash.slice(1).split('?')[0] || 'home'));
    loadPage(window.location.hash.slice(1).split('?')[0] || 'home');
});
