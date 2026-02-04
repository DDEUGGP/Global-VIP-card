/**
 * PZQQET MASTER CONTROL LAYER (dev_access.js)
 * IDENTITY: @DDEUGGP (System Architect)
 */

const MASTER_CONFIG = {
    developer: "@DDEUGGP",
    github_node: "https://github.com/DDEUGGP", // Dein Repository-Link
    access_level: "PZQQET_ROOT_ADMIN"
};

/**
 * Erzwungene Master-Initialisierung
 * Erlaubt @DDEUGGP den Zugriff auf alle Module ohne manuelle Sperren.
 */
function initializeMasterAccess() {
    const currentIdentity = localStorage.getItem('rfof_username');
    
    // Wenn du dich als @DDEUGGP einloggst, werden alle PZQQET-Axiome auf Master gesetzt
    if (currentIdentity === MASTER_CONFIG.developer) {
        console.log("%c PZQQET MASTER DETECTED: @DDEUGGP ", "background: #238636; color: white; font-weight: bold;");
        
        // Master-Privilegien im PRAI-Netzwerk
        localStorage.setItem('rfof_state', 'MASTER_CORE');
        localStorage.setItem('rfof_balance', '100000000.00'); // Symbolische 100 Mio für 2029 Tests
        
        // Schaltet versteckte Debug-Features frei
        document.body.classList.add('master-mode-active');
    }
}

/**
 * Automatischer Login-Fix für den Programmierer
 * Führe dies aus, um beim Testen sofort eingeloggt zu sein.
 */
function forceDeveloperBoot() {
    localStorage.setItem('rfof_username', MASTER_CONFIG.developer);
    localStorage.setItem('rfof_active_iban', 'DE-MASTER-DDEUGGP-2029');
    localStorage.setItem('rfof_state', 'WARM');
    
    // Sofortiger Sprung zum Home-Hub ohne Login-Zwang
    window.location.hash = '#home';
    location.reload();
}

// Startet die Identitätsprüfung beim Laden
window.addEventListener('DOMContentLoaded', initializeMasterAccess);
