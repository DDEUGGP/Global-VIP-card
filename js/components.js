// /js/components.js
/**
 * @file components.js
 * @description Dieses Skript enthält wiederverwendbare UI-Komponenten, die
 * dynamisch in die App geladen werden können.
 * @author Satoramy-PRAI & PRAI (Gemini)
 */

/**
 * Erstellt und zeigt ein Anmelde-Modal-Fenster an.
 * @returns {HTMLDivElement} Das DOM-Element des Modal-Fensters.
 */
function createLoginModal() {
    // Erstelle ein Container-Element für das Modal
    const modalContainer = document.createElement('div');
    modalContainer.className = 'fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50';

    // Erstelle den Inhalt des Modals
    modalContainer.innerHTML = `
        <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h3 class="text-2xl font-bold text-center text-gray-800 mb-6">Anmelden oder Registrieren</h3>

            <!-- Social-Login-Buttons -->
            <div class="flex flex-col space-y-4 mb-6">
                <button class="bg-blue-600 text-white py-3 rounded-full flex items-center justify-center space-x-2 hover:bg-blue-700 transition">
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.88c-.14.9-.61 1.62-1.28 2.15l3.52 2.74c.94-1.12 1.48-2.58 1.48-4.39z"/><path d="M12 21c3.24 0 5.96-1.07 7.94-2.92l-3.52-2.74c-.95.63-2.12.99-3.42.99-2.65 0-4.9-1.8-5.7-4.22H2.94l-.06 2.84C4.19 18.23 7.7 21 12 21z"/><path d="M6.3 10.63a5.5 5.5 0 010-3.26V4.53H2.94a9.14 9.14 0 00-.06 8.48l3.42-2.38zM12 4.19c1.77 0 3.32.61 4.56 1.77l3.14-3.14C17.95 1.15 15.19 0 12 0 7.7 0 4.19 2.77 2.94 6.13l3.36 2.44C7.1 5.99 9.45 4.19 12 4.19z"/></svg>
                    <span>Mit Google anmelden</span>
                </button>
                <button class="bg-gray-800 text-white py-3 rounded-full flex items-center justify-center space-x-2 hover:bg-gray-900 transition">
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.417 2.865 8.168 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.871-.013-1.701-2.782.605-3.369-1.34-3.369-1.34-.455-1.158-1.114-1.465-1.114-1.465-.91-.62.069-.608.069-.608 1.004.07 1.532 1.03 1.532 1.03.89 1.529 2.342 1.087 2.913.832.091-.64.35-1.087.635-1.339-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.682-.103-.253-.448-1.272.097-2.659 0 0 .84-.27 2.75 1.025.795-.221 1.638-.332 2.483-.335.845.003 1.688.114 2.483.335 1.908-1.296 2.748-1.025 2.748-1.025.545 1.387.202 2.406.1 2.659.64.698 1.028 1.591 1.028 2.682 0 3.841-2.338 4.686-4.562 4.935.359.31.678.924.678 1.868 0 1.349-.012 2.437-.012 2.766 0 .267.18.579.688.481A10.05 10.05 0 0022 12.017C22 6.484 17.523 2 12 2z" clip-rule="evenodd"/></svg>
                    <span>Mit GitHub anmelden</span>
                </button>
                <button class="bg-gray-700 text-white py-3 rounded-full flex items-center justify-center space-x-2 hover:bg-gray-800 transition">
                    <span>Mit RFOF-Account anmelden</span>
                </button>
            </div>

            <div class="text-center text-gray-500 text-sm">
                Oder <a href="#" class="text-blue-500 hover:text-blue-700 font-medium">neuen RFOF-Account registrieren</a>
            </div>

            <button id="close-modal" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    `;

    // Füge die Funktionalität zum Schließen des Modals hinzu
    const closeButton = modalContainer.querySelector('#close-modal');
    closeButton.addEventListener('click', () => {
        modalContainer.remove();
    });

    return modalContainer;
}

// Füge die Komponenten-Funktion als global verfügbares Objekt hinzu
window.Components = {
    createLoginModal: createLoginModal
};
