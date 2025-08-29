// /js/app.js
/**
 * @file app.js
 * @description Dieses zentrale Skript verwaltet das clientseitige Routing,
 * indem es den Inhalt basierend auf dem URL-Hash lädt.
 * Es enthält jetzt auch die Logik für den Global VIP Card Generator.
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
        } catch (error) {
            console.error(error);
            appContainer.innerHTML = `<h2 class="text-red-500">Fehler beim Laden der Seite.</h2><p>Die angeforderte Seite konnte nicht gefunden werden.</p>`;
        }
    }

    // Funktion zum Initialisieren der Card-Generator-Logik
    function initCardGenerator() {
        // Holen der DOM-Elemente
        const canvas = document.getElementById('vip-card-canvas');
        const ctx = canvas.getContext('2d');
        const countrySelect = document.getElementById('country-select');
        const nameInput = document.getElementById('name-input');
        const idInput = document.getElementById('id-input');
        const saveButton = document.getElementById('save-button');

        // Funktion zum Zeichnen der Karte
        function drawCard() {
            // Lösche das Canvas, um die Karte neu zu zeichnen
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Wähle die Farben basierend auf dem Land
            const countryCode = countrySelect.value;
            let colors = {};
            switch(countryCode) {
                case 'de': // Deutschland
                    colors = { primary: '#000000', secondary: '#FF0000', accent: '#FFCC00' };
                    break;
                case 'at': // Österreich
                    colors = { primary: '#FF0000', secondary: '#FFFFFF', accent: '#FF0000' };
                    break;
                case 'ch': // Schweiz
                    colors = { primary: '#FF0000', secondary: '#FFFFFF', accent: '#FF0000' };
                    break;
                case 'fr': // Frankreich
                    colors = { primary: '#0055A4', secondary: '#FFFFFF', accent: '#EF4135' };
                    break;
                case 'es': // Spanien
                    colors = { primary: '#AA152B', secondary: '#FFCC00', accent: '#AA152B' };
                    break;
                case 'it': // Italien
                    colors = { primary: '#009246', secondary: '#FFFFFF', accent: '#CE2B37' };
                    break;
                case 'pl': // Polen
                    colors = { primary: '#DC143C', secondary: '#FFFFFF', accent: '#DC143C' };
                    break;
                default:
                    colors = { primary: '#1a202c', secondary: '#e2e8f0', accent: '#4a5568' }; // Standard
            }

            // Zeichne den Hintergrund der Karte
            ctx.fillStyle = colors.primary;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Zeichne einen Akzentstreifen
            ctx.fillStyle = colors.accent;
            ctx.fillRect(0, 0, 50, canvas.height);

            // Zeichne den Text
            ctx.fillStyle = colors.secondary;
            ctx.font = '24px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Global VIP Card', canvas.width / 2, 50);

            ctx.font = '16px Arial';
            ctx.textAlign = 'left';
            ctx.fillText(`Name: ${nameInput.value}`, 70, 100);
            ctx.fillText(`ID: ${idInput.value}`, 70, 140);
            ctx.fillText(`Land: ${countrySelect.options[countrySelect.selectedIndex].text}`, 70, 180);
            
            // Fügen Sie hier die Logik für Bilder oder Logos hinzu, basierend auf dem Land
            // Zum Beispiel: if (countryCode === 'de') { // zeichne ein deutsches Flaggen-SVG }
        }

        // Hinzufügen von Event-Listenern zu den Formularfeldern
        countrySelect.addEventListener('change', drawCard);
        nameInput.addEventListener('input', drawCard);
        idInput.addEventListener('input', drawCard);

        // Event-Listener für den Speichern-Button
        saveButton.addEventListener('click', () => {
            const link = document.createElement('a');
            link.download = 'vip-card.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
            alert('Karte wurde als Bild gespeichert!');
        });
        
        // Zeichne die Karte beim ersten Laden der Seite
        drawCard();
    }

    // Funktion zum Verarbeiten des URL-Hash
    function handleHashChange() {
        const hash = window.location.hash.slice(1) || 'home';
        loadPage(hash);
    }

    // Listener für URL-Hash-Änderungen
    window.addEventListener('hashchange', handleHashChange);

    // Lade die erste Seite beim Initialisieren
    handleHashChange();
});
