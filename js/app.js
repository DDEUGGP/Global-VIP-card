// Das ist der zentrale Router der App.
document.addEventListener('DOMContentLoaded', () => {

    /**
     * @file app.js
     * @description Dieser Code verwaltet das clientseitige Routing für die Global VIP Card App.
     * Basierend auf dem URL-Hash (z.B. #home, #profile) wird der entsprechende Inhalt
     * dynamisch in das Haupt-Content-Div geladen.
     * @author Satoramy-PRAI
     */

    const appContainer = document.getElementById('app-container');

    // Funktion zum Laden des Seiteninhalts
    async function loadPage(pageName) {
        try {
            // Holen der HTML-Datei für die angeforderte Seite
            const response = await fetch(`./pages/${pageName}.html`);
            if (!response.ok) {
                // Wenn die Datei nicht existiert, lade die Fehlerseite
                throw new Error(`Seite "${pageName}" konnte nicht geladen werden.`);
            }
            const html = await response.text();
            appContainer.innerHTML = html;
        } catch (error) {
            console.error(error);
            appContainer.innerHTML = `<h2 class="text-red-500">Fehler beim Laden der Seite.</h2><p>Die angeforderte Seite konnte nicht gefunden werden.</p>`;
        }
    }

    // Funktion zum Verarbeiten des URL-Hash
    function handleHashChange() {
        // Entferne das '#' aus dem Hash und verwende 'home' als Standard
        const hash = window.location.hash.slice(1) || 'home';
        loadPage(hash);
    }

    // Listener für URL-Hash-Änderungen
    window.addEventListener('hashchange', handleHashChange);

    // Lade die erste Seite beim Initialisieren
    handleHashChange();
});

<!-- /pages/home.html -->
<!-- Inhalt für die Startseite der App -->
<div class="bg-white p-6 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-4">Startseite</h2>
    <p>Willkommen in der App. Hier findest du eine Übersicht über deine Global VIP Card.</p>
</div>

<!-- /pages/profile.html -->
<!-- Inhalt für die Profilseite der App -->
<div class="bg-white p-6 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-4">Mein Profil</h2>
    <p>Hier kannst du deine persönlichen Daten und deine VIP-Karte verwalten.</p>
</div>

<!-- /pages/settings.html -->
<!-- Inhalt für die Einstellungsseite der App -->
<div class="bg-white p-6 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-4">Einstellungen</h2>
    <p>Passe die App-Einstellungen nach deinen Wünschen an.</p>
</div>
