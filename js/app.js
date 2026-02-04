/**
 * @file app.js
 * @description Dieses zentrale Skript verwaltet das clientseitige Routing,
 * indem es den Inhalt basierend auf dem URL-Hash lädt.
 * Es enthält jetzt auch die Logik für den Global VIP Card Generator und die
 * Initialisierung des App-Zustands.
 * @author Satoramy-PRAI & PRAI (Gemini)
 */

document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app-container');

    // Funktion zum Laden des Seiteninhalts
    async function loadPage(pageName) {
        try {
            // Lade die HTML-Datei für die angeforderte Seite
            const response = await fetch(`./pages/${pageName}.html`);
            if (!response.ok) {
                throw new Error(`Seite "${pageName}" konnte nicht geladen werden.`);
            }
            const html = await response.text();
            appContainer.innerHTML = html;

            // Führe spezielle Initialisierungslogik für die Card-Generator-Seite aus
            if (pageName === 'card-generator') {
                initCardGenerator();
            }

            // --- TRIGGER FÜR WEITERE SEITEN ---
            if (pageName === 'home') initHomeLayers();
            if (pageName === 'profile') initProfileChains();
            if (pageName === 'settings') initSettingsSecurity();
            // --- ENDE TRIGGER ---

        } catch (error) {
            console.error(error);
            appContainer.innerHTML = `<h2 class="text-red-500">Fehler beim Laden der Seite.</h2><p>Die angeforderte Seite konnte nicht gefunden werden.</p>`;
        }
    }

    // Funktion zum Initialisieren der Card-Generator-Logik
    function initCardGenerator() {
        const canvas = document.getElementById('vip-card-canvas');
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

        euCountries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.code;
            option.textContent = country.name;
            countrySelect.appendChild(option);
        });

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
        if (countryCode) {
            countrySelect.value = countryCode;
        }
        drawCard();
    }

    function handleHashChange() {
        const hash = window.location.hash.slice(1);
        const pageName = hash.split('?')[0] || 'home';
        loadPage(pageName);
    }

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
// =========================================================================
// FINALER MOTOR: VOLLSTÄNDIGE INTEGRATION (27 EU + FÖDERATIONEN)
// =========================================================================

window.initCurrencySystem = () => {
    // 1. Die Globalen Föderationen (Haupt-Auslandswährungen)
    const federations = [
        { code: 'USD', name: 'Amerikanische Föderation (USA)' },
        { code: 'CNY', name: 'Asiatische Allianz (China)' },
        { code: 'JPY', name: 'Pazifik-Raum (Japan)' },
        { code: 'GBP', name: 'Britische Inseln (UK)' },
        { code: 'CHF', name: 'Alpen-Konföderation (Schweiz)' },
        { code: 'RUB', name: 'Eurasische Union (Russland)' }
    ];

    // 2. Alle 27 EU-Mitgliedstaaten (Lückenlose Liste)
    const euAll = [
        { code: 'EUR', name: 'Europäische Kernzone', isEuro: true }, // Basis
        { code: 'BGN', name: 'Bulgarien' }, { code: 'CZK', name: 'Tschechien' },
        { code: 'DKK', name: 'Dänemark' }, { code: 'HUF', name: 'Ungarn' },
        { code: 'PLN', name: 'Polen' }, { code: 'RON', name: 'Rumänien' },
        { code: 'SEK', name: 'Schweden' }, { code: 'HRK', name: 'Kroatien' },
        // Euro-Länder (rhetorisch als Teil der Kernzone geführt)
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

    // Initialisierung aller Konten auf 0.00
    [...federations, ...euAll].forEach(curr => {
        if (!portfolio[curr.code]) portfolio[curr.code] = "0.00";
    });

    // Synchronisiere Haupt-Euro-Guthaben mit Portfolio
    portfolio['EUR'] = localStorage.getItem('rfof_balance') || "0.00";
    
    localStorage.setItem('rfof_portfolio', JSON.stringify(portfolio));
    renderFinalPortfolio(federations, euAll);
};

function renderFinalPortfolio(federations, euAll) {
    const container = document.getElementById('dynamic-assets');
    const eurValDisplay = document.getElementById('portfolio-eur-val');
    const portfolio = JSON.parse(localStorage.getItem('rfof_portfolio') || '{}');

    if (eurValDisplay) eurValDisplay.textContent = `${parseFloat(portfolio['EUR']).toFixed(2)} €`;

    if (container) {
        let html = '';

        // SEKTION 1: FÖDERATIONEN
        html += `<div class="text-[8px] text-blue-500 font-black mb-2 mt-4 uppercase tracking-tighter">#Global_Federation_Assets</div>`;
        federations.forEach(f => {
            html += createAssetRow(f.code, f.name, portfolio[f.code], 'text-blue-400');
        });

        // SEKTION 2: REGIONALE EU-WÄHRUNGEN (Nicht-Euro)
        html += `<div class="text-[8px] text-yellow-600 font-black mb-2 mt-4 uppercase tracking-tighter">#Regional_EU_Non_Euro</div>`;
        euAll.filter(e => !e.isEuro).forEach(s => {
            html += createAssetRow(s.code, s.name, portfolio[s.code], 'text-gray-400');
        });

        // SEKTION 3: EURO-ZONE REFERENZ
        html += `<div class="text-[8px] text-green-600 font-black mb-2 mt-4 uppercase tracking-tighter">#Euro_Zone_Internal</div>`;
        euAll.filter(e => e.isEuro && e.code !== 'EUR').forEach(s => {
            html += createAssetRow('EUR', s.name, portfolio['EUR'], 'text-green-900/50');
        });

        container.innerHTML = html;
    }
}

function createAssetRow(code, name, val, colorClass) {
    return `
        <div class="flex justify-between items-center py-1 border-b border-gray-800/20 px-1">
            <div class="flex flex-col">
                <span class="text-[9px] text-white font-mono font-bold">${code}</span>
                <span class="text-[6px] text-gray-500 uppercase">${name}</span>
            </div>
            <span class="${colorClass} text-[9px] font-mono">${parseFloat(val).toFixed(2)}</span>
        </div>
    `;
}

// Erhaltet die bestehende IBAN-Logik & fügt Transaktions-Check hinzu
window.executeRealSwap = async (targetCurr, rate) => {
    let balance = parseFloat(localStorage.getItem('rfof_balance') || "0");
    if (balance <= 0) return alert("System-Error: Kein EUR-Guthaben für Konvertierung.");

    let portfolio = JSON.parse(localStorage.getItem('rfof_portfolio') || '{}');
    const convertedAmount = (balance * rate).toFixed(2);

    portfolio['EUR'] = "0.00";
    portfolio[targetCurr] = convertedAmount;
    
    localStorage.setItem('rfof_balance', "0.00");
    localStorage.setItem('rfof_portfolio', JSON.stringify(portfolio));

    // Update Live-Chain (aus Nachricht 2 bewahrt)
    recordTransaction('SWAP', `${convertedAmount} ${targetCurr}`);
    
    initCurrencySystem();
    alert(`PZQQET-Swap erfolgreich: ${targetCurr} aktiv.`);
};
