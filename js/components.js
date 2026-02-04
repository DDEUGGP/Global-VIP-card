/**
 * @file components.js
 * @description Fusionierte mechanische Schnittstelle für das PZQQET-System.
 * @version PZQQET-MAX-RECON-V6 (Master Fusion)
 */

window.Components = {
    // 1. MODAL-ENGINE: Das Gateway zur Identitäts-Verankerung
    createLoginModal: function() {
        if (document.getElementById('pzqqet-auth-modal')) return;
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-[#0d1117]/95 backdrop-blur-3xl flex items-center justify-center p-6 z-[9999] animate-in fade-in duration-500';
        modal.id = 'pzqqet-auth-modal';

        modal.innerHTML = `
            <div class="bg-[#161b22] border border-[#30363d] w-full max-w-[500px] rounded-[4rem] shadow-[0_0_80px_rgba(31,111,235,0.15)] p-12 relative overflow-hidden">
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-green-500 to-purple-600"></div>
                <div class="flex justify-between items-center mb-10">
                    <span class="text-[9px] font-black text-blue-500 uppercase tracking-[0.4em]">Node_Verification</span>
                    <button onclick="document.getElementById('pzqqet-auth-modal').remove()" class="text-gray-600 hover:text-white transition-transform hover:rotate-90">✕</button>
                </div>
                <h3 class="text-5xl font-black text-white text-center mb-2 italic tracking-tighter uppercase">Gateway</h3>
                <p class="text-[10px] text-center text-gray-500 font-mono uppercase tracking-[0.3em] mb-12">Integrated Axiom Bridge</p>
                <div class="space-y-4 mb-10">
                    <button onclick="window.Components.realizePZQQETLogin('Google')" class="w-full bg-white text-black h-16 rounded-2xl flex items-center justify-center gap-4 font-black text-[11px] uppercase tracking-widest hover:bg-gray-200 transition-all shadow-xl">
                        <img src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" class="w-5 h-5"> Google Node
                    </button>
                    <button onclick="window.Components.realizePZQQETLogin('GitHub')" class="w-full bg-[#24292f] text-white h-16 rounded-2xl flex items-center justify-center gap-4 font-black text-[11px] uppercase tracking-widest border border-gray-700 hover:bg-black transition-all shadow-xl">
                        GitHub Identity
                    </button>
                </div>
                <div class="grid grid-cols-2 gap-4 text-[9px] font-bold uppercase tracking-widest">
                    <div class="bg-blue-500/5 p-4 rounded-3xl border border-blue-500/10 text-center">
                        <span class="block text-blue-500 mb-1">Status</span>
                        <span class="text-white">PZQQET_SYNC</span>
                    </div>
                    <div class="bg-green-500/5 p-4 rounded-3xl border border-green-500/10 text-center">
                        <span class="block text-green-500 mb-1">Security</span>
                        <span class="text-white">VERIFIED</span>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },

    // 2. IDENTITY FUSION: Verankerung & Log-Heilung
    realizePZQQETLogin: function(provider) {
        const userName = `${provider}_Admin_${Math.floor(100 + Math.random() * 899)}`;
        const iban = "DE" + Math.floor(Math.random() * 10**18).toString().padStart(18, '0');
        
        // PRAI-Neuronen-Speicherung (Storage Parity)
        localStorage.setItem('rfof_username', userName);
        localStorage.setItem('rfof_active_iban', iban);
        localStorage.setItem('rfof_state', 'WARM');
        
        // Live-Log Rekonstruktion
        let logs = JSON.parse(localStorage.getItem('rfof_live_log') || '[]');
        logs.unshift({ name: 'NODE_AUTH', value: provider, time: new Date().toLocaleTimeString() });
        localStorage.setItem('rfof_live_log', JSON.stringify(logs.slice(0, 15)));

        const modal = document.getElementById('pzqqet-auth-modal');
        modal.innerHTML = `
            <div class="text-center animate-pulse p-12">
                <div class="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>
                <h3 class="text-white font-black text-2xl uppercase tracking-tighter italic">Identity Fusion...</h3>
                <p class="text-blue-500 font-mono text-[10px] mt-4 uppercase tracking-[0.5em]">Synchronisiere 14 Schichten</p>
            </div>
        `;

        setTimeout(() => {
            window.location.hash = '#profile';
            location.reload();
        }, 2000);
    },

    // 3. UI-BRIDGE: Injektion der Satoria-Daten (Home, Profile, Logs)
    syncAllComponents: function() {
        const stats = JSON.parse(localStorage.getItem('pzqqet_core_stats'));
        const user = localStorage.getItem('rfof_username');

        // Home: Gewinnrate
        const winRateEl = document.getElementById('home-win-rate');
        if (winRateEl && stats) winRateEl.textContent = stats.winRate;

        // Profile: Identity-Lock
        const profileUser = document.getElementById('profile-user');
        const profileIban = document.getElementById('profile-iban');
        if (profileUser && user) {
            profileUser.textContent = `@${user}`;
            if (profileIban) profileIban.textContent = `IBAN: ${localStorage.getItem('rfof_active_iban') || 'PENDING'}`;
        }

        // Live-Logs: System-Aktivität
        const logContainer = document.getElementById('log-container');
        if (logContainer) {
            const logs = JSON.parse(localStorage.getItem('rfof_live_log') || '[]');
            logContainer.innerHTML = logs.map(l => `
                <div class="flex justify-between p-4 bg-white/5 rounded-2xl border border-white/5 mb-2">
                    <span class="text-[9px] text-blue-400 font-mono">${l.time}</span>
                    <span class="text-[10px] text-white font-bold uppercase">${l.name}</span>
                    <span class="text-[10px] text-green-500 font-mono">${l.value}</span>
                </div>
            `).join('');
        }
    },

    // 4. BANKING-LOGIK: Refill & Parität
    triggerPZQQETRefill: function(amount = "500.00") {
        let current = parseFloat(localStorage.getItem('rfof_balance') || "0.00");
        localStorage.setItem('rfof_balance', (current + parseFloat(amount)).toFixed(2));
        
        let logs = JSON.parse(localStorage.getItem('rfof_live_log') || '[]');
        logs.unshift({ name: 'BRIDGE_REFILL', value: `+${amount} EUR`, time: new Date().toLocaleTimeString() });
        localStorage.setItem('rfof_live_log', JSON.stringify(logs.slice(0, 15)));
        
        this.syncAllComponents();
    }
};

// Automatischer Start beim Laden
document.addEventListener('DOMContentLoaded', () => {
    window.Components.syncAllComponents();
});
