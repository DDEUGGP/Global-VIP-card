
/**
 * @file components.js
 * @description Mechanische Schnittstelle für alle 5 Haupt-Webseiten-Logiken.
 * @version PZQQET-MAX-RECON
 * @author Satoramy-PRAI & PRAI (Gemini)
 */

/**
 * Kern-Objekt zur Realisierung der 5 Webseiten-Logiken innerhalb der UI-Komponenten.
 */
window.Components = {
    
    // 1. LOGIK-KNOTEN: AUTH & IDENTITÄT (Verbindung zu auth.html)
    createLoginModal: function() {
        const modalContainer = document.createElement('div');
        modalContainer.className = 'fixed inset-0 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 z-[10000]';
        modalContainer.id = 'pzqqet-auth-modal';

        const isDark = document.documentElement.classList.contains('dark') || true;
        const theme = isDark ? 'bg-[#0d1117] border-[#30363d] text-white' : 'bg-white border-gray-200 text-gray-900';

        modalContainer.innerHTML = `
            <div class="${theme} p-1 w-full max-w-[480px] rounded-[3.5rem] border shadow-[0_0_100px_rgba(0,0,0,0.5)] relative overflow-hidden transition-all duration-700 transform scale-100">
                <div class="p-10 rounded-[3.3rem] relative">
                    
                    <div class="flex justify-between items-start mb-12">
                        <div class="grid grid-cols-5 gap-1">
                            <div class="w-1 h-4 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                            <div class="w-1 h-6 bg-green-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                            <div class="w-1 h-3 bg-red-500 rounded-full animate-bounce" style="animation-delay: 0.3s"></div>
                            <div class="w-1 h-5 bg-yellow-500 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
                            <div class="w-1 h-2 bg-purple-500 rounded-full animate-bounce" style="animation-delay: 0.5s"></div>
                        </div>
                        <div class="text-right">
                            <span class="block text-[10px] font-black tracking-widest text-blue-500 uppercase">#PZQQET_V5_STABLE</span>
                            <span class="block text-[6px] text-gray-500 uppercase font-mono">Quantum Enkta Bridge</span>
                        </div>
                    </div>

                    <h3 class="text-4xl font-black text-center mb-1 tracking-tighter uppercase italic italic">Gateway</h3>
                    <p class="text-[9px] text-center text-gray-500 mb-12 font-mono uppercase tracking-[0.4em]">Integrated Node Verification</p>

                    <div class="space-y-4 mb-10">
                        <button onclick="window.Components.realizePZQQETLogin('Google')" class="group relative w-full bg-[#4285F4] hover:bg-[#357ae8] text-white h-16 rounded-[1.5rem] flex items-center px-8 transition-all active:scale-95 shadow-xl">
                            <div class="bg-white p-2 rounded-lg mr-5 shadow-inner">
                                <svg class="h-5 w-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.88c-.14.9-.61 1.62-1.28 2.15l3.52 2.74c.94-1.12 1.48-2.58 1.48-4.39z"/><path fill="#34A853" d="M12 21c3.24 0 5.96-1.07 7.94-2.92l-3.52-2.74c-.95.63-2.12.99-3.42.99-2.65 0-4.9-1.8-5.7-4.22H2.94l-.06 2.84C4.19 18.23 7.7 21 12 21z"/><path fill="#FBBC05" d="M6.3 10.63a5.5 5.5 0 010-3.26V4.53H2.94a9.14 9.14 0 00-.06 8.48l3.42-2.38zM12 4.19c1.77 0 3.32.61 4.56 1.77l3.14-3.14C17.95 1.15 15.19 0 12 0 7.7 0 4.19 2.77 2.94 6.13l3.36 2.44C7.1 5.99 9.45 4.19 12 4.19z"/></svg>
                            </div>
                            <span class="text-[12px] font-black uppercase tracking-widest">Connect Identity Google</span>
                        </button>

                        <button onclick="window.Components.realizePZQQETLogin('GitHub')" class="group relative w-full bg-[#24292f] hover:bg-black text-white h-16 rounded-[1.5rem] flex items-center px-8 transition-all border border-gray-700 active:scale-95 shadow-xl">
                            <svg class="h-6 w-6 mr-5 fill-white" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.417 2.865 8.168 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.871-.013-1.701-2.782.605-3.369-1.34-3.369-1.34-.455-1.158-1.114-1.465-1.114-1.465-.91-.62.069-.608.069-.608 1.004.07 1.532 1.03 1.532 1.03.89 1.529 2.342 1.087 2.913.832.091-.64.35-1.087.635-1.339-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.682-.103-.253-.448-1.272.097-2.659 0 0 .84-.27 2.75 1.025.795-.221 1.638-.332 2.483-.335.845.003 1.688.114 2.483.335 1.908-1.296 2.748-1.025 2.748-1.025.545 1.387.202 2.406.1 2.659.64.698 1.028 1.591 1.028 2.682 0 3.841-2.338 4.686-4.562 4.935.359.31.678.924.678 1.868 0 1.349-.012 2.437-.012 2.766 0 .267.18.579.688.481A10.05 10.05 0 0022 12.017C22 6.484 17.523 2 12 2z"/></svg>
                            <span class="text-[12px] font-black uppercase tracking-widest">Connect Identity GitHub</span>
                        </button>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <button onclick="window.location.hash='#auth'; document.getElementById('pzqqet-auth-modal').remove();" class="bg-green-600 hover:bg-green-500 text-white p-4 rounded-2xl text-[10px] font-bold uppercase transition-all shadow-lg hover:shadow-green-500/30">
                            Direct Auth
                        </button>
                        <button onclick="window.location.hash='#settings'; document.getElementById('pzqqet-auth-modal').remove();" class="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-2xl text-[10px] font-bold uppercase transition-all border border-gray-600">
                            Security Settings
                        </button>
                    </div>
                </div>

                <div class="mt-4 p-6 bg-blue-500/5 flex justify-between items-center rounded-b-[3.5rem] border-t border-gray-800/20">
                    <div class="flex flex-col">
                        <span class="text-[8px] text-gray-500 uppercase font-bold">Node Parity</span>
                        <span class="text-[10px] text-blue-400 font-mono">STABLE_14_LINK</span>
                    </div>
                    <div class="flex flex-col text-right">
                        <span class="text-[8px] text-gray-500 uppercase font-bold">Balance Security</span>
                        <span class="text-[10px] text-green-400 font-mono">VERIFIED_PZQQET</span>
                    </div>
                </div>
                
                <button id="close-modal" class="absolute top-10 right-10 text-gray-500 hover:text-white transition-all transform hover:rotate-90">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
        `;

        modalContainer.querySelector('#close-modal').addEventListener('click', () => {
            modalContainer.style.opacity = '0';
            setTimeout(() => modalContainer.remove(), 400);
        });

        return modalContainer;
    },

    // 4. LOGIK-KNOTEN: REKONSTRUKTIONS-MOTOR (Zentralisiert alle app.js Aufgaben)
    realizePZQQETLogin: function(provider) {
        const modal = document.getElementById('pzqqet-auth-modal');
        if (!modal) return;

        // IDENTITÄTS-HEILUNG (Daten für profile.html & card-generator.html)
        const userName = `${provider}_User_${Math.floor(1000 + Math.random() * 8999)}`;
        const iban = `DE${Math.floor(100000000000000000 + Math.random() * 899999999999999999)}`;
        
        // SPEICHER-PARITY (Verhindert Zerstörung alter Logs)
        localStorage.setItem('rfof_username', userName);
        localStorage.setItem('rfof_active_iban', iban);
        localStorage.setItem('rfof_state', 'WARM');
        
        // LOG-HEILUNG (Logik für profile.html Live-Logs)
        let logs = JSON.parse(localStorage.getItem('rfof_live_log') || '[]');
        logs.unshift({ name: 'ID_LINKED', value: provider, time: new Date().toLocaleTimeString() });
        localStorage.setItem('rfof_live_log', JSON.stringify(logs.slice(0, 15)));

        // VISUELLE TRANSITION (Logik für home.html Übergänge)
        modal.innerHTML = `
            <div class="bg-[#0d1117] border border-blue-500/30 p-16 rounded-[4rem] text-center shadow-2xl">
                <div class="mb-8 flex justify-center space-x-2">
                    <div class="w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
                    <div class="w-3 h-3 bg-green-500 rounded-full animate-ping" style="animation-delay: 0.2s"></div>
                    <div class="w-3 h-3 bg-red-500 rounded-full animate-ping" style="animation-delay: 0.4s"></div>
                </div>
                <h3 class="text-white font-black uppercase tracking-tight text-2xl italic italic">Identity Fusion</h3>
                <p class="text-[11px] text-gray-500 font-mono mt-4">KNOTEN_VERIFIZIERT: ${userName}</p>
                <div class="mt-12 text-[9px] text-blue-400 font-black tracking-widest animate-pulse">SYNCHRONISIERE 14 CORE DATEIEN...</div>
            </div>
        `;

        // HARD-SYNC (Stellt sicher, dass alle 5 Webseiten-Logiken die neue Identität laden)
        setTimeout(() => {
            window.location.hash = '#profile';
            location.reload(); 
        }, 2500);
    },

    // 5. LOGIK-KNOTEN: PORTFOLIO & BANKING VERSTÄRKER
    triggerPZQQETRefill: function(amount) {
        // Diese Funktion verstärkt die Banking-Logik aus der app.js
        if(!amount) amount = "500.00";
        let current = parseFloat(localStorage.getItem('rfof_balance') || "0.00");
        let newBalance = (current + parseFloat(amount)).toFixed(2);
        
        localStorage.setItem('rfof_balance', newBalance);
        
        // Melde Erfolg an die UI-Logs
        let logs = JSON.parse(localStorage.getItem('rfof_live_log') || '[]');
        logs.unshift({ name: 'BRIDGE_REFILL', value: `+${amount} EUR`, time: new Date().toLocaleTimeString() });
        localStorage.setItem('rfof_live_log', JSON.stringify(logs.slice(0, 15)));
        
        console.log(`PZQQET: Portfolio geheilt. Neuer Stand: ${newBalance} €`);
    }
};
