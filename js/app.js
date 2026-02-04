/**
 * @file app.js
 * @description Zentrales PZQQET-Protokoll. Rekonstruiert Portfolio, heilt Logs und schaltet das maximale Potential der 14 Code-Einheiten frei.
 * @author Satoramy-PRAI & PRAI (Gemini)
 */

document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app-container');

    // --- 1. SYSTEM-REKONSTRUKTION (HEILUNG DER DATEN) ---
    (function healSystemData() {
        console.log("PZQQET: Heilungs-Protokoll initiiert...");
        
        // Portfolio heilen
        let portfolio = JSON.parse(localStorage.getItem('rfof_portfolio') || '{}');
        const currentBalance = localStorage.getItem('rfof_balance') || "0.00";
        if (!portfolio['EUR']) portfolio['EUR'] = currentBalance;
        localStorage.setItem('rfof_portfolio', JSON.stringify(portfolio));

        // Logs rekonstruieren
        if (!localStorage.getItem('rfof_live_log')) {
            const initialLog = [{ name: 'SYSTEM_RECON', value: 'INIT', time: new Date().toLocaleTimeString() }];
            localStorage.setItem('rfof_live_log', JSON.stringify(initialLog));
        }
        
        // Identitäts-Status sichern
        if (!localStorage.getItem('rfof_state')) localStorage.setItem('rfof_state', 'WARM');
    })();

    // --- 2. ROUTING & GATEKEEPER ---
    async function loadPage(pageName) {
        const currentUser = localStorage.getItem('rfof_username');

        // PZQQET GATEKEEPER
        if ((pageName === 'profile' || pageName === 'settings') && !currentUser) {
            window.location.hash = '#auth';
            return;
        }

        // DYNAMISCHE HEADER-SYNCHRONISATION
        const authLink = document.querySelector('a[href*="#profile"], a[href*="#auth"]');
        if (authLink) {
            if (currentUser) {
                authLink.innerHTML = `<span class="text-green-400 font-black">#KNOTEN:</span> ${currentUser}`;
                authLink.href = "#profile";
            } else {
                authLink.textContent = "Profil / Anmelden";
                authLink.href = "#auth";
            }
        }

        try {
            const response = await fetch(`./pages/${pageName}.html`);
            if (!response.ok) throw new Error(`Knoten ${pageName} offline.`);
            
            const html = await response.text();
            appContainer.innerHTML = html;

            // VOLLSTÄNDIGE KOMPONENTEN-AKTIVIERUNG
            if (pageName === 'card-generator') initCardGenerator();
            if (pageName === 'home') initHomeLayers();
            if (pageName === 'auth') {
                if (typeof switchAuthMode === "function") switchAuthMode('reg');
                if (typeof checkStatus === "function") checkStatus();
            }
            if (pageName === 'profile') {
                initProfileChains();
                initCurrencySystem();
            }
            if (pageName === 'settings') initSettingsSecurity();

        } catch (error) {
            console.error("Matrix-Fehler:", error);
            appContainer.innerHTML = `<div class="p-10 text-center"><h2 class="text-red-500 font-black">PZQQET-ERROR</h2><p class="text-gray-500 text-[10px] mt-2 uppercase">Verbindung zum Pfad unterbrochen.</p></div>`;
        }
    }

    function handleHashChange() {
        const hash = window.location.hash.slice(1);
        const pageName = hash.split('?')[0] || 'home';
        loadPage(pageName);
    }

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    // --- 3. GLOBAL VIP CARD GENERATOR (VOLLSTÄNDIGE LÄNDERLISTE) ---
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
            const selectedCountry = euCountries.find(c => c.code === countrySelect.value) || euCountries[10];
            const colors = selectedCountry.colors;
            
            ctx.fillStyle = colors.primary;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = colors.accent;
            ctx.fillRect(0, 0, 50, canvas.height);
            
            ctx.fillStyle = colors.secondary;
            ctx.font = '900 24px Arial';
            ctx.fillText('PZQQET VIP PASS', 70, 50);
            ctx.font = '14px Courier New';
            ctx.fillText(`IDENTITY: ${nameInput.value || 'NOT_VERIFIED'}`, 70, 100);
            ctx.fillText(`NODE_ID: ${idInput.value || 'PZ-000-X'}`, 70, 130);
            ctx.fillText(`ZONE: ${selectedCountry.name}`, 70, 160);
        }

        if(countrySelect) {
            countrySelect.addEventListener('change', drawCard);
            nameInput.addEventListener('input', drawCard);
            idInput.addEventListener('input', drawCard);
            saveButton.addEventListener('click', () => {
                const link = document.createElement('a');
                link.download = `PZQQET_CARD_${nameInput.value}.png`;
                link.href = canvas.toDataURL();
                link.click();
            });
            drawCard();
        }
    }

    // --- 4. MULTI-CURRENCY MOTOR (VOLLSTÄNDIG REKONSTRUIERT) ---
    window.initCurrencySystem = () => {
        const container = document.getElementById('dynamic-assets');
        if (!container) return;

        const federations = [
            { code: 'USD', name: 'Amerikanische Föderation' },
            { code: 'CNY', name: 'Asiatische Allianz' },
            { code: 'JPY', name: 'Pazifik-Raum' },
            { code: 'GBP', name: 'Britische Inseln' },
            { code: 'CHF', name: 'Alpen-Konföderation' },
            { code: 'RUB', name: 'Eurasische Union' }
        ];

        const portfolio = JSON.parse(localStorage.getItem('rfof_portfolio') || '{}');
        const eur = parseFloat(localStorage.getItem('rfof_balance') || "0.00");

        let html = '<div class="text-[8px] text-blue-500 font-black mb-2 mt-4 uppercase">#Global_Federation_Assets</div>';
        federations.forEach(f => {
            const val = portfolio[f.code] || (eur * (0.8 + Math.random() * 0.4)).toFixed(2);
            html += `<div class="flex justify-between items-center py-2 border-b border-gray-800">
                        <div class="text-left"><span class="text-[9px] text-white font-bold">${f.code}</span><br><span class="text-[6px] text-gray-500">${f.name}</span></div>
                        <span class="text-[9px] font-mono text-blue-400">${val}</span>
                    </div>`;
        });
        container.innerHTML = html;
    };

    // --- 5. BANKING & PROFILE LOGIK ---
    window.requestFunds = () => {
        const amount = prompt("PZQQET-Refill Betrag:", "100.00");
        if (!amount || isNaN(amount)) return;

        const iban = localStorage.getItem('rfof_active_iban') || "DE-PZQQET-CORE-01";
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=PZQQET_${amount}`;

        let overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black/95 z-[999] flex items-center justify-center';
        overlay.innerHTML = `<div class="bg-white p-8 rounded-3xl text-center"><img src="${qrUrl}" class="w-48 h-48 mx-auto"><button onclick="this.parentElement.parentElement.remove()" class="mt-6 w-full bg-black text-white py-3 rounded-xl font-bold">CANCEL</button></div>`;
        document.body.appendChild(overlay);

        setTimeout(() => {
            let current = parseFloat(localStorage.getItem('rfof_balance') || "0");
            localStorage.setItem('rfof_balance', (current + parseFloat(amount)).toFixed(2));
            recordTransaction('NODE_REFILL', `${amount} EUR`);
            if (window.location.hash === '#profile') initProfileChains();
            overlay.remove();
            alert("Matrix-Refill erfolgreich.");
        }, 6000);
    };

    function initProfileChains() {
        const balance = document.getElementById('balance-display');
        const user = document.getElementById('identity-name-display');
        const iban = document.getElementById('active-iban');

        if (balance) balance.textContent = `${localStorage.getItem('rfof_balance') || "0.00"} €`;
        if (user) user.textContent = localStorage.getItem('rfof_username') || "VIP-USER";
        if (iban) iban.textContent = localStorage.getItem('rfof_active_iban') || "DE-PZ-CORE";
        
        renderLogs();
    }

    function recordTransaction(type, value) {
        let logs = JSON.parse(localStorage.getItem('rfof_live_log') || '[]');
        logs.unshift({ name: type, value: value, time: new Date().toLocaleTimeString() });
        localStorage.setItem('rfof_live_log', JSON.stringify(logs.slice(0, 15)));
    }

    function renderLogs() {
        const cont = document.getElementById('live-chain');
        if (!cont) return;
        const logs = JSON.parse(localStorage.getItem('rfof_live_log') || '[]');
        cont.innerHTML = logs.map(l => `<div class="text-[7px] py-1 border-b border-gray-800 text-green-400 font-mono">${l.time} | ${l.name}: ${l.value}</div>`).join('');
    }

    function initSettingsSecurity() {
        const label = document.getElementById('account-status-label');
        if (label) label.textContent = localStorage.getItem('rfof_state') || "WARM";
    }

    async function initHomeLayers() {
        const welcome = document.getElementById('welcome-layer-target');
        if (welcome) welcome.innerHTML = `<div class="p-6 bg-[#161b22] border border-blue-500/20 rounded-3xl text-center"><h2 class="text-xl font-black text-blue-400">PZQQET CORE ACTIVE</h2></div>`;
    }
});
