(function() {
    // ================= DADOS DOS PERSONAGENS =================
    const CHARACTERS = [
        {
            id: 'blaze',
            name: 'BLAZE',
            color: '#e63946',
            accent: '#ffb347',
            strength: 8,
            speed: 6,
            stamina: 7,
            svg: (color, accent) => `
                <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="40" r="30" fill="${color}" stroke="#111" stroke-width="3"/>
                    <circle cx="38" cy="35" r="5" fill="#fff"/>
                    <circle cx="62" cy="35" r="5" fill="#fff"/>
                    <circle cx="38" cy="35" r="2" fill="#111"/>
                    <circle cx="62" cy="35" r="2" fill="#111"/>
                    <path d="M35 55 Q50 68 65 55" stroke="#111" stroke-width="4" fill="none"/>
                    <rect x="40" y="65" width="20" height="30" rx="8" fill="${color}" stroke="#111" stroke-width="3"/>
                    <rect x="18" y="45" width="18" height="35" rx="10" fill="${accent}" stroke="#111" stroke-width="3"/>
                    <rect x="64" y="45" width="18" height="35" rx="10" fill="${accent}" stroke="#111" stroke-width="3"/>
                    <rect x="30" y="92" width="16" height="20" rx="6" fill="${accent}" stroke="#111" stroke-width="3"/>
                    <rect x="54" y="92" width="16" height="20" rx="6" fill="${accent}" stroke="#111" stroke-width="3"/>
                </svg>`
        },
        {
            id: 'shadow',
            name: 'SHADOW',
            color: '#4a4e69',
            accent: '#9a8c98',
            strength: 6,
            speed: 9,
            stamina: 6,
            svg: (color, accent) => `
                <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="40" r="28" fill="${color}" stroke="#111" stroke-width="3"/>
                    <circle cx="38" cy="33" r="4" fill="#ff5e5e"/>
                    <circle cx="62" cy="33" r="4" fill="#ff5e5e"/>
                    <path d="M38 52 Q50 60 62 52" stroke="#111" stroke-width="4" fill="none"/>
                    <rect x="42" y="65" width="16" height="30" rx="6" fill="${color}" stroke="#111" stroke-width="3"/>
                    <rect x="22" y="48" width="16" height="30" rx="8" fill="${accent}" stroke="#111" stroke-width="3"/>
                    <rect x="62" y="48" width="16" height="30" rx="8" fill="${accent}" stroke="#111" stroke-width="3"/>
                    <rect x="34" y="92" width="14" height="18" rx="6" fill="${accent}" stroke="#111" stroke-width="3"/>
                    <rect x="52" y="92" width="14" height="18" rx="6" fill="${accent}" stroke="#111" stroke-width="3"/>
                </svg>`
        },
        {
            id: 'titan',
            name: 'TITAN',
            color: '#2d6a4f',
            accent: '#95d5b2',
            strength: 10,
            speed: 4,
            stamina: 8,
            svg: (color, accent) => `
                <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="42" r="32" fill="${color}" stroke="#111" stroke-width="4"/>
                    <circle cx="37" cy="36" r="5" fill="#fff"/>
                    <circle cx="63" cy="36" r="5" fill="#fff"/>
                    <circle cx="37" cy="36" r="2" fill="#111"/>
                    <circle cx="63" cy="36" r="2" fill="#111"/>
                    <path d="M32 58 Q50 70 68 58" stroke="#111" stroke-width="5" fill="none"/>
                    <rect x="36" y="68" width="28" height="32" rx="10" fill="${color}" stroke="#111" stroke-width="4"/>
                    <rect x="12" y="48" width="22" height="38" rx="12" fill="${accent}" stroke="#111" stroke-width="4"/>
                    <rect x="66" y="48" width="22" height="38" rx="12" fill="${accent}" stroke="#111" stroke-width="4"/>
                    <rect x="26" y="95" width="18" height="20" rx="8" fill="${accent}" stroke="#111" stroke-width="4"/>
                    <rect x="56" y="95" width="18" height="20" rx="8" fill="${accent}" stroke="#111" stroke-width="4"/>
                </svg>`
        },
        {
            id: 'viper',
            name: 'VIPER',
            color: '#7209b7',
            accent: '#b5179e',
            strength: 5,
            speed: 10,
            stamina: 8,
            svg: (color, accent) => `
                <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="38" r="26" fill="${color}" stroke="#111" stroke-width="3"/>
                    <circle cx="40" cy="32" r="4" fill="#f0f"/>
                    <circle cx="60" cy="32" r="4" fill="#f0f"/>
                    <path d="M40 48 Q50 56 60 48" stroke="#111" stroke-width="3" fill="none"/>
                    <rect x="44" y="60" width="12" height="28" rx="6" fill="${color}" stroke="#111" stroke-width="3"/>
                    <rect x="24" y="42" width="14" height="32" rx="8" fill="${accent}" stroke="#111" stroke-width="3"/>
                    <rect x="62" y="42" width="14" height="32" rx="8" fill="${accent}" stroke="#111" stroke-width="3"/>
                    <rect x="34" y="88" width="12" height="18" rx="6" fill="${accent}" stroke="#111" stroke-width="3"/>
                    <rect x="54" y="88" width="12" height="18" rx="6" fill="${accent}" stroke="#111" stroke-width="3"/>
                </svg>`
        }
    ];

    // ================= ESTADO GLOBAL =================
    const state = {
        currentScreen: 'menu',
        selectedP1: 0,
        selectedP2: 1,
        game: {
            active: false,
            paused: false,
            timer: 60,
            timerInterval: null,
            p1: { hp: 100, maxHp: 100, isBlocking: false, dodgeActive: false, cooldown: 0, name: '', strength: 0 },
            p2: { hp: 100, maxHp: 100, isBlocking: false, dodgeActive: false, cooldown: 0, name: '', strength: 0 }
        }
    };

    // Elementos DOM
    const screens = {
        menu: document.getElementById('screen-menu'),
        howto: document.getElementById('screen-howto'),
        select: document.getElementById('screen-select'),
        fight: document.getElementById('screen-fight'),
        result: document.getElementById('screen-result')
    };

    // ========== NAVEGAÇÃO ==========
    function showScreen(name) {
        Object.values(screens).forEach(s => s.classList.remove('active'));
        if (screens[name]) screens[name].classList.add('active');
        state.currentScreen = name;
    }

    // ========== PREVIEWS DE SELEÇÃO ==========
    function updateSelectUI() {
        const p1Char = CHARACTERS[state.selectedP1];
        const p2Char = CHARACTERS[state.selectedP2];

        document.getElementById('p1Preview').innerHTML = p1Char.svg(p1Char.color, p1Char.accent);
        document.getElementById('p1Name').textContent = p1Char.name;
        document.getElementById('p1Attrs').innerHTML = `
            <span>💪 ${p1Char.strength}</span>
            <span>⚡ ${p1Char.speed}</span>
            <span>🛡️ ${p1Char.stamina}</span>
        `;

        document.getElementById('p2Preview').innerHTML = p2Char.svg(p2Char.color, p2Char.accent);
        document.getElementById('p2Name').textContent = p2Char.name;
        document.getElementById('p2Attrs').innerHTML = `
            <span>💪 ${p2Char.strength}</span>
            <span>⚡ ${p2Char.speed}</span>
            <span>🛡️ ${p2Char.stamina}</span>
        `;
    }

    // ========== INICIAR LUTA ==========
    function startFight() {
        const p1Char = CHARACTERS[state.selectedP1];
        const p2Char = CHARACTERS[state.selectedP2];

        state.game = {
            active: true,
            paused: false,
            timer: 60,
            timerInterval: null,
            p1: { hp: 100, maxHp: 100, isBlocking: false, dodgeActive: false, cooldown: 0, name: p1Char.name, strength: p1Char.strength },
            p2: { hp: 100, maxHp: 100, isBlocking: false, dodgeActive: false, cooldown: 0, name: p2Char.name, strength: p2Char.strength }
        };

        document.getElementById('p1NameHud').textContent = p1Char.name;
        document.getElementById('p2NameHud').textContent = p2Char.name;
        document.getElementById('p1HealthFill').style.width = '100%';
        document.getElementById('p2HealthFill').style.width = '100%';
        document.getElementById('timerDisplay').textContent = '60';
        document.getElementById('btnPause').textContent = 'PAUSAR';

        document.getElementById('p1Sprite').innerHTML = p1Char.svg(p1Char.color, p1Char.accent);
        document.getElementById('p2Sprite').innerHTML = p2Char.svg(p2Char.color, p2Char.accent);

        ['p1Sprite','p2Sprite'].forEach(id => {
            document.getElementById(id).classList.remove('shake','hit-flash','block-fx');
            document.getElementById(id).style.opacity = '1';
            document.getElementById(id).style.transform = '';
        });

        showScreen('fight');

        clearInterval(state.game.timerInterval);
        state.game.timerInterval = setInterval(() => {
            if (!state.game.active || state.game.paused) return;
            state.game.timer = Math.max(0, state.game.timer - 1);
            document.getElementById('timerDisplay').textContent = state.game.timer;
            if (state.game.timer <= 0) endFightByTime();
        }, 1000);
    }

    // ========== CONDIÇÕES DE VITÓRIA ==========
    function checkWinCondition() {
        const g = state.game;
        if (!g.active) return;
        if (g.p1.hp <= 0 && g.p2.hp <= 0) endFight('EMPATE!');
        else if (g.p1.hp <= 0) endFight('PLAYER 2 VENCEU!');
        else if (g.p2.hp <= 0) endFight('PLAYER 1 VENCEU!');
    }

    function endFightByTime() {
        const g = state.game;
        if (!g.active) return;
        if (g.p1.hp > g.p2.hp) endFight('PLAYER 1 VENCEU!');
        else if (g.p2.hp > g.p1.hp) endFight('PLAYER 2 VENCEU!');
        else endFight('EMPATE!');
    }

    function endFight(winnerMessage) {
        const g = state.game;
        if (!g.active) return;
        g.active = false;
        g.paused = true;
        clearInterval(g.timerInterval);
        document.getElementById('winnerText').textContent = winnerMessage;
        showScreen('result');
    }

    // ========== BARRAS DE VIDA ==========
    function updateHealthBars() {
        const g = state.game;
        document.getElementById('p1HealthFill').style.width = Math.max(0, (g.p1.hp / g.p1.maxHp) * 100) + '%';
        document.getElementById('p2HealthFill').style.width = Math.max(0, (g.p2.hp / g.p2.maxHp) * 100) + '%';
    }

    // ========== AÇÕES ==========
    function playerAction(player, action) {
        const g = state.game;
        if (!g.active || g.paused) return;

        const attacker = player === 1 ? g.p1 : g.p2;
        const defender = player === 1 ? g.p2 : g.p1;
        const attackerSprite = document.getElementById(player === 1 ? 'p1Sprite' : 'p2Sprite');
        const defenderSprite = document.getElementById(player === 1 ? 'p2Sprite' : 'p1Sprite');

        if (attacker.cooldown > 0) return;

        if (action === 'punch') {
            attacker.cooldown = 25;
            attackerSprite.style.transform = 'translateX(' + (player === 1 ? '15px' : '-15px') + ') scale(1.05)';
            setTimeout(() => { attackerSprite.style.transform = ''; }, 100);

            let damage = 7 + Math.floor(attacker.strength * 1.2);

            if (defender.isBlocking) damage = Math.floor(damage * 0.4);

            if (defender.dodgeActive) {
                damage = 0;
                defender.dodgeActive = false;
                defenderSprite.classList.add('block-fx');
                setTimeout(() => defenderSprite.classList.remove('block-fx'), 200);
            } else {
                defenderSprite.classList.add('shake', 'hit-flash');
                setTimeout(() => defenderSprite.classList.remove('shake', 'hit-flash'), 200);
            }

            defender.hp = Math.max(0, defender.hp - damage);
            updateHealthBars();
            checkWinCondition();
        } else if (action === 'block') {
            attacker.isBlocking = true;
            attackerSprite.classList.add('block-fx');
            setTimeout(() => {
                attacker.isBlocking = false;
                attackerSprite.classList.remove('block-fx');
            }, 400);
        } else if (action === 'dodge') {
            attacker.dodgeActive = true;
            attackerSprite.style.opacity = '0.6';
            setTimeout(() => {
                attacker.dodgeActive = false;
                attackerSprite.style.opacity = '1';
            }, 300);
        }
    }

    // ========== COOLDOWN RESET ==========
    setInterval(() => {
        if (state.game.p1.cooldown > 0) state.game.p1.cooldown -= 5;
        if (state.game.p2.cooldown > 0) state.game.p2.cooldown -= 5;
    }, 5);

    // ========== PAUSA / RESET / MENU ==========
    function pauseGame() {
        const g = state.game;
        if (!g.active) return;
        g.paused = !g.paused;
        document.getElementById('btnPause').textContent = g.paused ? 'CONTINUAR' : 'PAUSAR';
    }

    function restartGame() {
        clearInterval(state.game.timerInterval);
        startFight();
    }

    function backToMenu() {
        clearInterval(state.game.timerInterval);
        state.game.active = false;
        state.game.paused = false;
        showScreen('menu');
    }

    // ========== EVENTOS ==========
    document.getElementById('btnPlay').addEventListener('click', () => {
        showScreen('select');
        updateSelectUI();
    });
    document.getElementById('btnHowTo').addEventListener('click', () => showScreen('howto'));
    document.getElementById('btnCloseHowTo').addEventListener('click', () => showScreen('menu'));
    document.getElementById('btnCharSelect').addEventListener('click', () => {
        showScreen('select');
        updateSelectUI();
    });

    document.getElementById('p1Prev').addEventListener('click', () => {
        state.selectedP1 = (state.selectedP1 - 1 + CHARACTERS.length) % CHARACTERS.length;
        updateSelectUI();
    });
    document.getElementById('p1Next').addEventListener('click', () => {
        state.selectedP1 = (state.selectedP1 + 1) % CHARACTERS.length;
        updateSelectUI();
    });
    document.getElementById('p2Prev').addEventListener('click', () => {
        state.selectedP2 = (state.selectedP2 - 1 + CHARACTERS.length) % CHARACTERS.length;
        updateSelectUI();
    });
    document.getElementById('p2Next').addEventListener('click', () => {
        state.selectedP2 = (state.selectedP2 + 1) % CHARACTERS.length;
        updateSelectUI();
    });
    document.getElementById('btnBackFromSelect').addEventListener('click', () => showScreen('menu'));
    document.getElementById('btnStartFight').addEventListener('click', startFight);

    document.getElementById('p1Punch').addEventListener('click', () => playerAction(1, 'punch'));
    document.getElementById('p1Block').addEventListener('click', () => playerAction(1, 'block'));
    document.getElementById('p1Dodge').addEventListener('click', () => playerAction(1, 'dodge'));
    document.getElementById('p2Punch').addEventListener('click', () => playerAction(2, 'punch'));
    document.getElementById('p2Block').addEventListener('click', () => playerAction(2, 'block'));
    document.getElementById('p2Dodge').addEventListener('click', () => playerAction(2, 'dodge'));

    document.getElementById('btnPause').addEventListener('click', pauseGame);
    document.getElementById('btnRestart').addEventListener('click', restartGame);
    document.getElementById('btnBackMenu').addEventListener('click', backToMenu);

    document.getElementById('btnResultRestart').addEventListener('click', restartGame);
    document.getElementById('btnResultMenu').addEventListener('click', () => {
        clearInterval(state.game.timerInterval);
        showScreen('menu');
    });

    // ========== TECLADO ==========
    document.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();
        if (state.currentScreen !== 'fight') return;
        if (state.game.paused || !state.game.active) return;
        e.preventDefault();

        if (key === 'a') playerAction(1, 'punch');
        if (key === 's') playerAction(1, 'block');
        if (key === 'd') playerAction(1, 'dodge');
        if (key === 'j') playerAction(2, 'punch');
        if (key === 'k') playerAction(2, 'block');
        if (key === 'l') playerAction(2, 'dodge');
    });

    // ========== INICIALIZAÇÃO ==========
    updateSelectUI();
    showScreen('menu');
})();