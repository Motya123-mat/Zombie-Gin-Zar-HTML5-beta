(function() {
    'use strict';

    if (!window.Game) {
        alert('Ошибка загрузки! Перезагрузите страницу.');
        return;
    }

    const Game = window.Game;

    // ========== ДАННЫЕ ==========
    const WEAPONS = [
        { name: 'Нож кухонный', priceZ: 0, priceR: 0, damage: 10, maxDur: -1, limited: false, cd: 1000 },
        { name: 'Мачете', priceZ: 300, priceR: 0, damage: 50, maxDur: 100, limited: false, cd: 3000 },
        { name: 'Топор', priceZ: 1000, priceR: 0, damage: 100, maxDur: 150, limited: false, cd: 2000 },
        { name: 'Пистолет глок', priceZ: 5000, priceR: 0, damage: 500, maxDur: 200, limited: false, cd: 2000 },
        { name: 'Пистолет дигл', priceZ: 8000, priceR: 0, damage: 600, maxDur: 250, limited: false, cd: 3000 },
        { name: 'Автомат Калашникова', priceZ: 16000, priceR: 0, damage: 900, maxDur: 300, limited: false, cd: 2000 },
        { name: 'Сюрикены', priceZ: 30000, priceR: 0, damage: 1300, maxDur: 350, limited: false, cd: 1000 },
        { name: 'Дробовик', priceZ: 50000, priceR: 0, damage: 3000, maxDur: 200, limited: false, cd: 2000 },
        { name: 'Пулемёт', priceZ: 80000, priceR: 0, damage: 5000, maxDur: 400, limited: false, cd: 2000 },
        { name: 'РПГ', priceZ: 1200000, priceR: 0, damage: 20000, maxDur: 500, limited: false, cd: 3000 },
        { name: 'Миниган', priceZ: 1650000, priceR: 0, damage: 25000, maxDur: 12000, limited: false, cd: 2000 },
        { name: 'Невидимые сюрикены', priceZ: 1850000, priceR: 0, damage: 28000, maxDur: 15500, limited: false, cd: 2000 },
        { name: 'дубина', priceZ: 1200, priceR: 0, damage: 450, maxDur: 180, limited: false, cd: 2000 },
        { name: 'копьё', priceZ: 2500, priceR: 0, damage: 650, maxDur: 200, limited: false, cd: 3000 },
        { name: 'бумеранг', priceZ: 1000, priceR: 0, damage: 350, maxDur: 100, limited: false, cd: 5000 },
        { name: 'лук', priceZ: 500, priceR: 0, damage: 150, maxDur: 95, limited: false, cd: 1000 },
        { name: 'Меч', priceZ: 850, priceR: 0, damage: 200, maxDur: 125, limited: false, cd: 2000 },
        { name: 'кинжал', priceZ: 2000, priceR: 0, damage: 1200, maxDur: 300, limited: false, cd: 3000 },
        { name: 'булава', priceZ: 950, priceR: 0, damage: 450, maxDur: 150, limited: false, cd: 2000 },
        { name: 'серп', priceZ: 1850, priceR: 0, damage: 750, maxDur: 165, limited: false, cd: 3000 },
        { name: 'Радужный дробовик', priceZ: 0, priceR: 100, damage: 35000, maxDur: 25000, limited: true, cd: 2000 },
        { name: 'Драконий меч', priceZ: 0, priceR: 150, damage: 25000, maxDur: 30000, limited: true, cd: 3000 },
        { name: 'Меч молнии', priceZ: 0, priceR: 185, damage: 100000, maxDur: 65000, limited: true, cd: 3000 },
        { name: 'Смертельный цветок', priceZ: 0, priceR: 0, damage: 2500, maxDur: 8888, limited: false, cd: 2000 },
        { name: 'Конфетный меч', priceZ: 0, priceR: 0, damage: 161616, maxDur: -1, limited: false, cd: 2000 }
    ];

    const ZOMBIES = [
        { name: 'Зомби-страх', hp: 100, dmg: 30, reward: 10 },
        { name: 'Зомби-силач', hp: 500, dmg: 100, reward: 30 },
        { name: 'Зомби-хакер', hp: 1000, dmg: 300, reward: 65 },
        { name: 'Зомби-невидимка', hp: 5000, dmg: 1000, reward: 100 },
        { name: 'Зомби-прыгун', hp: 8000, dmg: 1200, reward: 500 },
        { name: 'Зомби-скелет', hp: 10000, dmg: 1800, reward: 850 },
        { name: 'Big Zombie', hp: 100000, dmg: 5000, reward: 1000 }
    ];

    const UNITS = [
        { name: 'Инженер', priceZ: 100000, priceR: 0, desc: 'Чинит оружие раз в минуту' },
        { name: 'Саня механик', priceZ: 0, priceR: 100, desc: 'Чинит + урон 1000' }
    ];

    // Рецепты крафта
    const RECIPES = [
        { id: 'r1', name: 'Улучшенный нож', result: 'Мачете', ingredients: [{ weapon: 'Нож кухонный', count: 2 }] },
        { id: 'r2', name: 'Стихийный меч', result: 'Меч молнии', ingredients: [{ weapon: 'Драконий меч', count: 1 }, { weapon: 'Радужный дробовик', count: 1 }] }
    ];

    const PROMOS = {
        'KWLX927': { type: 'money', val: 5000 },
        'LSKBAOW': { type: 'money', val: 11111 },
        'MAGXWZ': { type: 'money', val: 30000 },
        'XGWWDK': { type: 'money', val: 88888 },
        'KQVDEW': { type: 'weapon', val: 'Пулемёт' },
        'KWHDBN': { type: 'weapon', val: 'Дробовик' },
        'KEBWL826': { type: 'weapon', val: 'Радужный дробовик' },
        'KEYCB836$#': { type: 'rainbow', val: 100 },
        'JDG82HSJ': { type: 'rainbow', val: 500 },
        'KWUXHEV': { type: 'special', pass: 'KSN#&826' }
    };

    // ========== СОСТОЯНИЕ ==========
    let battle = {
        mode: null,
        zombies: [],
        baseHp: 5000,
        curIdx: 0,
        selWeapon: null,
        wave: 0,
        lastAttack: {},
        unitTimers: []
    };
    let battleRefreshInterval = null;
    let touchStartX = 0;
    let touchEndX = 0;

    // DOM элементы
    const el = {
        money: document.getElementById('money'),
        rainbow: document.getElementById('rainbow-money'),
        topName: document.getElementById('player-name'),
        tabs: document.querySelectorAll('.tab-btn'),
        screens: document.querySelectorAll('.screen'),
        battleContent: document.getElementById('battle-content'),
        backBtn: document.getElementById('back-to-main'),
        weaponShop: document.getElementById('weapon-shop'),
        limitedShop: document.getElementById('limited-shop'),
        inventory: document.getElementById('inventory-list'),
        unitsShop: document.getElementById('units-shop'),
        craftRecipe: document.getElementById('craft-recipe'),
        craftButton: document.getElementById('craft-button'),
        craftMsg: document.getElementById('craft-message'),
        promoInput: document.getElementById('promo-code'),
        promoApply: document.getElementById('apply-promo'),
        promoMsg: document.getElementById('promo-message'),
        passDialog: document.getElementById('password-dialog'),
        passInput: document.getElementById('promo-password'),
        passSubmit: document.getElementById('submit-password'),
        profileName: document.getElementById('current-name'),
        profileAvatar: document.getElementById('current-avatar'),
        profileWaves: document.getElementById('profile-waves'),
        avatars: document.querySelectorAll('.avatar-option'),
        newName: document.getElementById('new-name'),
        changeName: document.getElementById('change-name-btn'),
        createLinkBtn: document.getElementById('create-trade-link'),
        tradeLinkContainer: document.getElementById('trade-link-container'),
        tradeLink: document.getElementById('trade-link'),
        acceptLinkInput: document.getElementById('accept-link'),
        acceptBtn: document.getElementById('accept-trade'),
        myOfferSection: document.getElementById('my-offer-section'),
        offerWeapon: document.getElementById('offer-weapon'),
        offerZombie: document.getElementById('offer-zombie'),
        offerRainbow: document.getElementById('offer-rainbow'),
        sendOfferBtn: document.getElementById('send-offer'),
        tradeStatus: document.getElementById('trade-status'),
        fullscreenBtn: document.getElementById('fullscreen-btn')
    };

    // ========== ВСПОМОГАТЕЛЬНЫЕ ==========
    function updateUI() {
        if (el.money) el.money.textContent = Game.getMoney();
        if (el.rainbow) el.rainbow.textContent = Game.getRainbowMoney();
        if (el.topName) el.topName.textContent = Game.getName();
    }

    function switchTab(tabId) {
        el.tabs.forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-tab="${tabId}"]`);
        if (activeBtn) activeBtn.classList.add('active');
        el.screens.forEach(s => s.classList.remove('active'));
        const target = document.getElementById(`${tabId}-screen`);
        if (target) target.classList.add('active');

        if (tabId === 'shop') renderShop();
        if (tabId === 'limited') renderLimited();
        if (tabId === 'inventory') renderInventory();
        if (tabId === 'units') renderUnits();
        if (tabId === 'craft') renderCraft();
        if (tabId === 'profile') updateProfile();
    }

    // ========== МАГАЗИНЫ ==========
    function renderShop() {
        if (!el.weaponShop) return;
        el.weaponShop.innerHTML = '';
        WEAPONS.filter(w => !w.limited && w.priceZ > 0).forEach(w => {
            const card = document.createElement('div');
            card.className = 'item-card';
            const owned = Game.hasWeapon(w.name);
            card.innerHTML = `
                <strong>${w.name}</strong><br>
                💰 ${w.priceZ}<br>
                ⚔️ ${w.damage}<br>
                🔧 ${w.maxDur === -1 ? '∞' : w.maxDur}<br>
                ⏱️ ${w.cd/1000}с<br>
                <button ${owned ? 'disabled' : ''} data-weapon="${w.name}" data-price="${w.priceZ}" data-cur="z">${owned ? 'Куплено' : 'Купить'}</button>
            `;
            el.weaponShop.appendChild(card);
        });
    }

    function renderLimited() {
        if (!el.limitedShop) return;
        el.limitedShop.innerHTML = '';
        WEAPONS.filter(w => w.limited).forEach(w => {
            const card = document.createElement('div');
            card.className = 'item-card';
            const owned = Game.hasWeapon(w.name);
            const blocked = Game.isDonateBlocked();
            card.innerHTML = `
                <strong>${w.name}</strong><br>
                🌈 ${w.priceR}<br>
                ⚔️ ${w.damage}<br>
                🔧 ${w.maxDur}<br>
                ⏱️ ${w.cd/1000}с<br>
                <button ${owned || blocked ? 'disabled' : ''} data-weapon="${w.name}" data-price="${w.priceR}" data-cur="r">${owned ? 'Куплено' : (blocked ? 'Заблок.' : 'Купить')}</button>
            `;
            el.limitedShop.appendChild(card);
        });
    }

    function renderUnits() {
        if (!el.unitsShop) return;
        el.unitsShop.innerHTML = '';
        UNITS.forEach(u => {
            const card = document.createElement('div');
            card.className = 'item-card';
            const owned = Game.hasUnit(u.name);
            const blocked = Game.isDonateBlocked();
            card.innerHTML = `
                <strong>${u.name}</strong><br>
                ${u.priceZ > 0 ? '💰 ' + u.priceZ : ''} ${u.priceR > 0 ? '🌈 ' + u.priceR : ''}<br>
                <small>${u.desc}</small><br>
                ${!owned ? `<button data-unit="${u.name}" data-pz="${u.priceZ}" data-pr="${u.priceR}" ${blocked && u.priceR > 0 ? 'disabled' : ''}>Купить</button>` : '<button disabled>Куплено</button>'}
            `;
            el.unitsShop.appendChild(card);
        });
    }

    function renderInventory() {
        if (!el.inventory) return;
        el.inventory.innerHTML = '';
        const weapons = Game.getWeapons();
        if (!weapons.length) {
            el.inventory.innerHTML = '<p>Пусто</p>';
            return;
        }
        weapons.forEach(w => {
            const wd = WEAPONS.find(wd => wd.name === w.name);
            if (!wd) return;
            const max = wd.maxDur;
            let durText = max === -1 ? '∞' : `${Math.floor((w.durability / max) * 100)}% (${w.durability}/${max})`;
            const card = document.createElement('div');
            card.className = 'item-card';
            card.innerHTML = `
                <strong>${w.name}</strong><br>
                🔧 ${durText}<br>
                ⏱️ ${wd.cd/1000}с<br>
                ${max !== -1 && w.durability < max ? '<button class="repair-btn" data-weapon="' + w.name + '">🔧 Починить (1000)</button>' : ''}
            `;
            el.inventory.appendChild(card);
        });
        document.querySelectorAll('.repair-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                repairWeapon(btn.dataset.weapon);
            });
        });
    }

    function repairWeapon(name) {
        const w = Game.getWeapon(name);
        if (!w) return;
        const wd = WEAPONS.find(wd => wd.name === name);
        if (!wd || wd.maxDur === -1) return;
        if (w.durability >= wd.maxDur) { alert('Уже починено'); return; }
        if (Game.getMoney() < 1000) { alert('Не хватает денег'); return; }
        Game.deductMoney(1000);
        Game.updateWeaponDurability(name, wd.maxDur);
        updateUI();
        renderInventory();
    }

    // ========== ПОКУПКИ (делегирование) ==========
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;

        // Магазин оружия
        if (btn.dataset.weapon) {
            const w = WEAPONS.find(w => w.name === btn.dataset.weapon);
            if (!w) return;
            if (btn.dataset.cur === 'z') {
                if (Game.deductMoney(w.priceZ)) {
                    Game.addWeapon({ name: w.name, durability: w.maxDur });
                    updateUI();
                    renderShop();
                    renderInventory();
                } else alert('Недостаточно Zombie Coins');
            } else if (btn.dataset.cur === 'r') {
                if (Game.isDonateBlocked()) { alert('Покупка заблокирована'); return; }
                if (Game.deductRainbowMoney(w.priceR)) {
                    Game.addWeapon({ name: w.name, durability: w.maxDur });
                    updateUI();
                    renderLimited();
                    renderInventory();
                } else alert('Недостаточно Rainbow Coins');
            }
        }

        // Юниты
        if (btn.dataset.unit) {
            const u = UNITS.find(u => u.name === btn.dataset.unit);
            if (!u) return;
            if (Game.hasUnit(u.name)) { alert('Уже есть'); return; }
            if (Game.isDonateBlocked() && u.priceR > 0) { alert('Покупка заблокирована'); return; }
            if (u.priceZ > 0 && Game.deductMoney(u.priceZ)) {
                Game.addUnit(u.name);
                updateUI();
                renderUnits();
            } else if (u.priceR > 0 && Game.deductRainbowMoney(u.priceR)) {
                Game.addUnit(u.name);
                updateUI();
                renderUnits();
            } else alert('Недостаточно средств');
        }
    });

    // ========== ПРОМОКОДЫ ==========
    let pendingSpecial = null;
    if (el.promoApply) {
        el.promoApply.addEventListener('click', () => {
            const code = el.promoInput.value.trim().toUpperCase();
            const promo = PROMOS[code];
            if (!promo) { el.promoMsg.textContent = '❌ Неверный код'; return; }
            if (Game.isPromoUsed(code)) { el.promoMsg.textContent = '⚠️ Уже активирован'; return; }
            if (promo.type === 'special') {
                pendingSpecial = code;
                el.passDialog.style.display = 'block';
                el.promoMsg.textContent = 'Введите пароль:';
            } else {
                applyPromo(code, promo);
            }
        });
    }

    if (el.passSubmit) {
        el.passSubmit.addEventListener('click', () => {
            const pass = el.passInput.value;
            const promo = PROMOS[pendingSpecial];
            if (promo && promo.pass === pass) {
                applyPromo(pendingSpecial, promo);
                el.passDialog.style.display = 'none';
                el.passInput.value = '';
                pendingSpecial = null;
            } else alert('Неверный пароль');
        });
    }

    function applyPromo(code, promo) {
        let msg = '';
        if (promo.type === 'money') { Game.addMoney(promo.val); msg = `✅ +${promo.val} монет`; }
        else if (promo.type === 'rainbow') { Game.addRainbowMoney(promo.val); msg = `✅ +${promo.val} Rainbow`; }
        else if (promo.type === 'weapon') {
            const w = WEAPONS.find(w => w.name === promo.val);
            if (w && !Game.hasWeapon(w.name)) {
                Game.addWeapon({ name: w.name, durability: w.maxDur });
                msg = `✅ Получено: ${w.name}`;
            } else msg = '⚠️ Уже есть';
        } else if (promo.type === 'special') {
            WEAPONS.forEach(w => {
                if (w.name !== 'Нож кухонный' && !Game.hasWeapon(w.name)) {
                    Game.addWeapon({ name: w.name, durability: w.maxDur });
                }
            });
            UNITS.forEach(u => { if (!Game.hasUnit(u.name)) Game.addUnit(u.name); });
            Game.setMoney(1e9);
            Game.setRainbowMoney(1e9);
            Game.setDonateBlock(true);
            msg = '✅ Спецкод! Всё получено, донаты заблокированы';
        }
        if (msg) el.promoMsg.textContent = msg;
        Game.addUsedPromo(code);
        updateUI();
        renderInventory();
        renderShop();
        renderLimited();
        renderUnits();
        el.promoInput.value = '';
    }

    // ========== РЕЖИМЫ ==========
    document.querySelectorAll('[data-mode]').forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.dataset.mode;
            if (mode === 'kill25') startKill25();
            else if (mode === 'farm') startFarm();
            else if (mode === 'tower') startTower();
        });
    });

    function startKill25() {
        battle.mode = 'kill25';
        battle.zombies = [
            ...Array(5).fill(ZOMBIES[0]), ...Array(5).fill(ZOMBIES[1]),
            ...Array(5).fill(ZOMBIES[2]), ...Array(10).fill(ZOMBIES[3])
        ].map(z => ({ ...z, curHp: z.hp }));
        battle.curIdx = 0;
        battle.selWeapon = Game.getWeaponNames()[0] || null;
        switchTab('battle');
        startBattleRefresh();
        renderBattle();
    }

    function startFarm() {
        if (Game.getMoney() < 15000) { alert('Нужно 15000 Zombie Coins'); return; }
        Game.deductMoney(15000);
        updateUI();
        battle.mode = 'farm';
        battle.zombies = [{ ...ZOMBIES[0], curHp: ZOMBIES[0].hp }];
        battle.curIdx = 0;
        battle.selWeapon = Game.getWeaponNames()[0] || null;
        switchTab('battle');
        startBattleRefresh();
        renderBattle();
    }

    function startTower() {
        battle.mode = 'tower';
        battle.wave = 0;
        battle.baseHp = 5000;
        battle.zombies = generateWave(0);
        battle.wave = 1;
        battle.selWeapon = Game.getWeaponNames()[0] || null;
        switchTab('battle');
        startBattleRefresh();
        renderBattle();
        if (battle.zombies.length) scheduleZombieAttack(battle.zombies[0]);
    }

    function generateWave(wave) {
        let z = [];
        if (wave < 13) {
            const patterns = [
                [{ type: 'Зомби-страх', cnt: 10 }],
                [{ type: 'Зомби-страх', cnt: 5 }, { type: 'Зомби-силач', cnt: 5 }],
                [{ type: 'Зомби-страх', cnt: 1 }, { type: 'Зомби-силач', cnt: 10 }],
                [{ type: 'Зомби-страх', cnt: 25 }],
                [{ type: 'Зомби-хакер', cnt: 10 }],
                [{ type: 'Зомби-хакер', cnt: 15 }],
                [{ type: 'Зомби-невидимка', cnt: 1 }, { type: 'Зомби-хакер', cnt: 20 }],
                [{ type: 'Зомби-невидимка', cnt: 5 }, { type: 'Зомби-хакер', cnt: 5 }],
                [{ type: 'Зомби-хакер', cnt: 15 }, { type: 'Зомби-невидимка', cnt: 10 }],
                [{ type: 'Зомби-невидимка', cnt: 15 }],
                [{ type: 'Зомби-невидимка', cnt: 5 }, { type: 'Зомби-прыгун', cnt: 10 }],
                [{ type: 'Зомби-прыгун', cnt: 5 }],
                [{ type: 'Зомби-прыгун', cnt: 15 }]
            ];
            const pat = patterns[wave] || patterns[12];
            pat.forEach(p => {
                const zt = ZOMBIES.find(z => z.name === p.type);
                for (let i = 0; i < p.cnt; i++) z.push({ ...zt, curHp: zt.hp });
            });
        } else if (wave < 35) {
            let cnt = 15 + (wave - 13) * 3;
            for (let i = 0; i < cnt; i++) z.push({ ...ZOMBIES[4], curHp: ZOMBIES[4].hp });
        } else if (wave < 100) {
            let cnt = 1 + (wave - 35);
            for (let i = 0; i < cnt; i++) z.push({ ...ZOMBIES[5], curHp: ZOMBIES[5].hp });
        } else if (wave < 900) {
            for (let i = 0; i < 30; i++) {
                const r = Math.floor(Math.random() * 3);
                let type = r === 0 ? ZOMBIES[3] : r === 1 ? ZOMBIES[4] : ZOMBIES[5];
                z.push({ ...type, curHp: type.hp });
            }
        } else {
            let cnt = 1 + (wave - 900);
            for (let i = 0; i < cnt; i++) z.push({ ...ZOMBIES[6], curHp: ZOMBIES[6].hp });
        }
        return z;
    }

    // ========== БИТВА ==========
    function startBattleRefresh() {
        if (battleRefreshInterval) clearInterval(battleRefreshInterval);
        battleRefreshInterval = setInterval(() => {
            if (battle.mode) {
                if (battle.mode === 'tower') renderTower();
                else renderSimple();
            }
        }, 500);
    }

    function renderBattle() {
        if (!battle.mode) return;
        if (battle.mode === 'tower') renderTower();
        else renderSimple();
    }

    function renderSimple() {
        if (battle.curIdx >= battle.zombies.length) {
            if (battle.mode === 'farm') {
                battle.zombies.push({ ...ZOMBIES[0], curHp: ZOMBIES[0].hp });
            } else {
                el.battleContent.innerHTML = '<h2>🎉 Победа!</h2><button class="back-btn" id="back-from-battle">В меню</button>';
                document.getElementById('back-from-battle')?.addEventListener('click', exitBattle);
                return;
            }
        }
        const zombie = battle.zombies[battle.curIdx];
        const weapons = Game.getWeaponNames();
        if (!battle.selWeapon || !weapons.includes(battle.selWeapon)) {
            battle.selWeapon = weapons[0] || null;
        }
        if (!battle.selWeapon) { el.battleContent.innerHTML = '<p>Нет оружия</p>'; return; }
        const wd = WEAPONS.find(w => w.name === battle.selWeapon);
        if (!wd) return;

        const now = Date.now();
        const last = battle.lastAttack[battle.selWeapon] || 0;
        const canAttack = now - last >= wd.cd;

        let selHtml = '<div class="weapon-selector" id="weapon-scroll">';
        weapons.forEach(name => {
            const w = WEAPONS.find(w => w.name === name);
            if (!w) return;
            const l = battle.lastAttack[name] || 0;
            const rem = Math.max(0, w.cd - (now - l));
            const cls = rem > 0 ? 'cooldown' : '';
            const sel = name === battle.selWeapon ? 'selected' : '';
            selHtml += `<span class="weapon-option ${sel} ${cls}" data-weapon="${name}">${name} (${w.damage})${rem > 0 ? ' 🔄' + Math.ceil(rem/1000) + 'с' : ''}</span>`;
        });
        selHtml += '</div>';

        el.battleContent.innerHTML = `
            <div class="zombie-stats">
                <h2>${zombie.name}</h2>
                <p>❤️ ${zombie.curHp} / ${zombie.hp}</p>
                <p>💀 Урон: ${zombie.dmg}</p>
            </div>
            ${selHtml}
            <button class="attack-btn" id="attack-btn" ${!canAttack ? 'disabled' : ''}>⚔️ АТАКОВАТЬ</button>
        `;

        const scrollDiv = document.getElementById('weapon-scroll');
        if (scrollDiv) {
            scrollDiv.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });
            scrollDiv.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe(weapons);
            });
        }

        document.querySelectorAll('.weapon-option').forEach(el => {
            el.addEventListener('click', (e) => {
                battle.selWeapon = e.target.dataset.weapon;
                renderBattle();
            });
        });

        document.getElementById('attack-btn').addEventListener('click', () => {
            const now = Date.now();
            const last = battle.lastAttack[battle.selWeapon] || 0;
            if (now - last < wd.cd) { alert('Оружие перезаряжается!'); return; }
            battle.lastAttack[battle.selWeapon] = now;
            if (navigator.vibrate) navigator.vibrate(50);

            const wep = Game.getWeapon(battle.selWeapon);
            if (wep && wep.durability !== -1) {
                let newDur = wep.durability - 1;
                if (newDur <= 0) {
                    Game.removeWeapon(battle.selWeapon);
                    if (Game.getWeaponNames().length === 0) {
                        Game.addWeapon({ name: 'Нож кухонный', durability: -1 });
                    }
                    if (battle.selWeapon === wep.name) {
                        battle.selWeapon = Game.getWeaponNames()[0] || null;
                    }
                } else {
                    Game.updateWeaponDurability(battle.selWeapon, newDur);
                }
            }

            zombie.curHp -= wd.damage;
            if (zombie.curHp <= 0) {
                Game.addMoney(zombie.reward);
                Game.addZombieKill(zombie.name);
                battle.curIdx++;
                updateUI();
            }
            renderBattle();
        });
    }

    function handleSwipe(weapons) {
        if (weapons.length === 0) return;
        let currentIndex = weapons.indexOf(battle.selWeapon);
        if (currentIndex === -1) currentIndex = 0;
        if (touchEndX < touchStartX - 50) {
            currentIndex = (currentIndex + 1) % weapons.length;
            battle.selWeapon = weapons[currentIndex];
            renderBattle();
        } else if (touchEndX > touchStartX + 50) {
            currentIndex = (currentIndex - 1 + weapons.length) % weapons.length;
            battle.selWeapon = weapons[currentIndex];
            renderBattle();
        }
    }

    function renderTower() {
        if (battle.baseHp <= 0) {
            endGame('💔 Поражение', battle.wave - 1);
            return;
        }
        if (battle.wave > 1000 && battle.zombies.length === 0) {
            endGame('🏆 Абсолютная победа!', 1000);
            return;
        }
        if (battle.zombies.length === 0) {
            battle.zombies = generateWave(battle.wave);
            battle.wave++;
            if (battle.zombies.length) scheduleZombieAttack(battle.zombies[0]);
        }

        const zombie = battle.zombies[0];
        const weapons = Game.getWeaponNames();
        if (!battle.selWeapon || !weapons.includes(battle.selWeapon)) {
            battle.selWeapon = weapons[0] || null;
        }
        if (!battle.selWeapon) { el.battleContent.innerHTML = '<p>Нет оружия</p>'; return; }
        const wd = WEAPONS.find(w => w.name === battle.selWeapon);
        if (!wd) return;

        const now = Date.now();
        const last = battle.lastAttack[battle.selWeapon] || 0;
        const canAttack = now - last >= wd.cd;

        let selHtml = '<div class="weapon-selector" id="weapon-scroll">';
        weapons.forEach(name => {
            const w = WEAPONS.find(w => w.name === name);
            if (!w) return;
            const l = battle.lastAttack[name] || 0;
            const rem = Math.max(0, w.cd - (now - l));
            const cls = rem > 0 ? 'cooldown' : '';
            const sel = name === battle.selWeapon ? 'selected' : '';
            selHtml += `<span class="weapon-option ${sel} ${cls}" data-weapon="${name}">${name} (${w.damage})${rem > 0 ? ' 🔄' + Math.ceil(rem/1000) + 'с' : ''}</span>`;
        });
        selHtml += '</div>';

        el.battleContent.innerHTML = `
            <h3>Волна ${battle.wave - 1}</h3>
            <p>🏰 База: ${battle.baseHp}</p>
            <p>🧟 Осталось: ${battle.zombies.length}</p>
            <div class="zombie-stats">
                <strong>${zombie.name}</strong> ❤️ ${zombie.curHp}/${zombie.hp}
            </div>
            ${selHtml}
            <button class="attack-btn" id="td-attack" ${!canAttack ? 'disabled' : ''}>⚔️ Атаковать</button>
        `;

        const scrollDiv = document.getElementById('weapon-scroll');
        if (scrollDiv) {
            scrollDiv.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });
            scrollDiv.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe(weapons);
            });
        }

        document.querySelectorAll('.weapon-option').forEach(el => {
            el.addEventListener('click', (e) => {
                battle.selWeapon = e.target.dataset.weapon;
                renderTower();
            });
        });

        document.getElementById('td-attack').addEventListener('click', () => {
            const now = Date.now();
            const last = battle.lastAttack[battle.selWeapon] || 0;
            if (now - last < wd.cd) { alert('Оружие перезаряжается!'); return; }
            battle.lastAttack[battle.selWeapon] = now;
            if (navigator.vibrate) navigator.vibrate(50);

            clearZombieTimer(zombie);
            const wep = Game.getWeapon(battle.selWeapon);
            if (wep && wep.durability !== -1) {
                let newDur = wep.durability - 1;
                if (newDur <= 0) {
                    Game.removeWeapon(battle.selWeapon);
                    if (Game.getWeaponNames().length === 0) {
                        Game.addWeapon({ name: 'Нож кухонный', durability: -1 });
                    }
                    if (battle.selWeapon === wep.name) {
                        battle.selWeapon = Game.getWeaponNames()[0] || null;
                    }
                } else {
                    Game.updateWeaponDurability(battle.selWeapon, newDur);
                }
            }

            zombie.curHp -= wd.damage;
            if (zombie.curHp <= 0) {
                battle.zombies.shift();
                Game.addMoney(zombie.reward);
                Game.addZombieKill(zombie.name);
                updateUI();
                if (battle.zombies.length) scheduleZombieAttack(battle.zombies[0]);
            } else {
                scheduleZombieAttack(zombie);
            }
            renderTower();
        });
    }

    function endGame(title, waves) {
        if (waves > 0) Game.setMaxWave(waves);
        el.battleContent.innerHTML = `<h2>${title}</h2><p>Пройдено волн: ${waves}</p><button class="back-btn" id="back-from-battle">В меню</button>`;
        document.getElementById('back-from-battle')?.addEventListener('click', exitBattle);
    }

    let timers = [];
    function scheduleZombieAttack(zombie) {
        clearZombieTimer(zombie);
        zombie._timer = setTimeout(() => {
            if (zombie.curHp > 0 && battle.baseHp > 0) {
                battle.baseHp -= zombie.dmg;
                if (battle.baseHp < 0) battle.baseHp = 0;
                renderTower();
                if (battle.baseHp > 0) scheduleZombieAttack(zombie);
            }
        }, 10000);
        timers.push(zombie._timer);
    }

    function clearZombieTimer(zombie) {
        if (zombie._timer) { clearTimeout(zombie._timer); zombie._timer = null; }
    }

    function exitBattle() {
        if (battleRefreshInterval) clearInterval(battleRefreshInterval);
        battleRefreshInterval = null;
        timers.forEach(t => clearTimeout(t));
        timers = [];
        battle.mode = null;
        switchTab('main');
    }

    if (el.backBtn) el.backBtn.addEventListener('click', exitBattle);

    // ========== КРАФТ ==========
    function renderCraft() {
        if (!el.craftRecipe) return;
        el.craftRecipe.innerHTML = '';
        RECIPES.forEach(r => {
            const opt = document.createElement('option');
            opt.value = r.id;
            opt.textContent = r.name;
            el.craftRecipe.appendChild(opt);
        });
    }

    if (el.craftButton) {
        el.craftButton.addEventListener('click', () => {
            const id = el.craftRecipe.value;
            const recipe = RECIPES.find(r => r.id === id);
            if (!recipe) return;

            // Проверка ингредиентов (достаточно одного экземпляра)
            for (let ing of recipe.ingredients) {
                if (!Game.hasWeapon(ing.weapon)) {
                    el.craftMsg.textContent = `❌ Нужен ${ing.weapon}`;
                    return;
                }
            }

            // Списываем ингредиенты
            recipe.ingredients.forEach(ing => {
                Game.removeWeapon(ing.weapon);
            });

            // Добавляем результат
            const resultWeapon = WEAPONS.find(w => w.name === recipe.result);
            if (resultWeapon) {
                Game.addWeapon({ name: resultWeapon.name, durability: resultWeapon.maxDur });
                el.craftMsg.textContent = '✅ Создано!';
                updateUI();
                renderInventory();
            }
        });
    }

    // ========== ОБМЕН ==========
    const TRADE_PREFIX = 'trade_';

    if (el.createLinkBtn) {
        el.createLinkBtn.addEventListener('click', () => {
            const id = Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
            const tradeData = {
                creator: Game.getName(),
                weapon: null,
                zombie: 0,
                rainbow: 0,
                expires: Date.now() + 10 * 60 * 1000
            };
            localStorage.setItem(TRADE_PREFIX + id, JSON.stringify(tradeData));
            // Формируем ссылку, которая точно будет работать
            const base = window.location.href.split('?')[0];
            const tradeUrl = base + '?trade=' + id;
            el.tradeLink.value = tradeUrl;
            el.tradeLinkContainer.style.display = 'block';
            el.tradeStatus.textContent = '✅ Ссылка создана!';
        });
    }

    if (el.acceptBtn) {
        el.acceptBtn.addEventListener('click', () => {
            const link = el.acceptLinkInput.value.trim();
            if (!link) {
                el.tradeStatus.textContent = '❌ Введите ссылку';
                return;
            }
            let tradeId = null;
            // Пытаемся извлечь ID из ссылки
            const match = link.match(/[?&]trade=([^&]+)/);
            if (match) tradeId = match[1];
            if (!tradeId) {
                el.tradeStatus.textContent = '❌ Неверная ссылка (нет ID)';
                return;
            }
            const dataStr = localStorage.getItem(TRADE_PREFIX + tradeId);
            if (!dataStr) {
                el.tradeStatus.textContent = '❌ Ссылка недействительна';
                return;
            }
            const data = JSON.parse(dataStr);
            if (data.expires < Date.now()) {
                localStorage.removeItem(TRADE_PREFIX + tradeId);
                el.tradeStatus.textContent = '❌ Срок действия истёк';
                return;
            }
            el.offerWeapon.innerHTML = '<option value="">— нет —</option>';
            if (data.weapon) {
                const opt = document.createElement('option');
                opt.value = data.weapon;
                opt.textContent = data.weapon;
                opt.selected = true;
                el.offerWeapon.appendChild(opt);
            }
            el.offerZombie.value = data.zombie;
            el.offerRainbow.value = data.rainbow;
            el.myOfferSection.dataset.tradeId = tradeId;
            el.myOfferSection.style.display = 'block';
            el.tradeStatus.textContent = `✅ Предложение от ${data.creator}`;
        });
    }

    if (el.sendOfferBtn) {
        el.sendOfferBtn.addEventListener('click', () => {
            const weapon = el.offerWeapon.value;
            const zombie = parseInt(el.offerZombie.value) || 0;
            const rainbow = parseInt(el.offerRainbow.value) || 0;
            const tradeId = el.myOfferSection.dataset.tradeId;

            if (!tradeId) {
                // Создатель обновляет последнее предложение
                const keys = Object.keys(localStorage).filter(k => k.startsWith(TRADE_PREFIX));
                if (keys.length === 0) {
                    alert('Сначала создайте ссылку');
                    return;
                }
                keys.sort().reverse();
                const latestKey = keys[0];
                const dataStr = localStorage.getItem(latestKey);
                if (!dataStr) return;
                const data = JSON.parse(dataStr);
                data.weapon = weapon || null;
                data.zombie = zombie;
                data.rainbow = rainbow;
                localStorage.setItem(latestKey, JSON.stringify(data));
                el.tradeStatus.textContent = '✅ Предложение обновлено!';
            } else {
                // Принимающая сторона
                const dataStr = localStorage.getItem(TRADE_PREFIX + tradeId);
                if (!dataStr) {
                    alert('Ошибка: предложение не найдено');
                    return;
                }
                const data = JSON.parse(dataStr);
                if (data.expires < Date.now()) {
                    localStorage.removeItem(TRADE_PREFIX + tradeId);
                    alert('Срок действия истёк');
                    return;
                }
                if (data.weapon && !Game.hasWeapon(data.weapon)) {
                    alert('У вас нет такого оружия');
                    return;
                }
                if (data.zombie > Game.getMoney()) {
                    alert('Недостаточно Zombie Coins');
                    return;
                }
                if (data.rainbow > Game.getRainbowMoney()) {
                    alert('Недостаточно Rainbow Coins');
                    return;
                }
                if (data.weapon) {
                    const wd = WEAPONS.find(w => w.name === data.weapon);
                    if (wd) Game.addWeapon({ name: data.weapon, durability: wd.maxDur });
                }
                Game.addMoney(data.zombie);
                Game.addRainbowMoney(data.rainbow);
                updateUI();
                renderInventory();
                localStorage.removeItem(TRADE_PREFIX + tradeId);
                el.myOfferSection.style.display = 'none';
                el.tradeStatus.textContent = '✅ Обмен совершён!';
                alert('Обмен успешно завершён!');
            }
        });
    }

    // Автоматическое заполнение при переходе по ссылке
    (function checkTradeFromURL() {
        const match = window.location.href.match(/[?&]trade=([^&]+)/);
        if (match) {
            const tradeId = match[1];
            const base = window.location.href.split('?')[0];
            const fullLink = base + '?trade=' + tradeId;
            el.acceptLinkInput.value = fullLink;
            setTimeout(() => {
                if (el.acceptBtn) el.acceptBtn.click();
            }, 100);
        }
    })();

    // ========== ПОЛНОЭКРАННЫЙ РЕЖИМ ==========
    if (el.fullscreenBtn) {
        el.fullscreenBtn.addEventListener('click', () => {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            }
        });
    }

    // ========== ПРОФИЛЬ ==========
    function updateProfile() {
        if (el.profileName) el.profileName.textContent = Game.getName();
        if (el.profileAvatar) el.profileAvatar.textContent = Game.getAvatar();
        if (el.profileWaves) el.profileWaves.textContent = Game.getMaxWave();
        el.avatars.forEach(opt => {
            opt.classList.toggle('selected', opt.dataset.avatar === Game.getAvatar());
        });
    }

    el.avatars.forEach(opt => {
        opt.addEventListener('click', () => {
            Game.setAvatar(opt.dataset.avatar);
            updateProfile();
        });
    });

    if (el.changeName) {
        el.changeName.addEventListener('click', () => {
            const n = el.newName.value.trim();
            if (n) { Game.setName(n); updateUI(); updateProfile(); el.newName.value = ''; }
        });
    }

    // ========== ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК ==========
    el.tabs.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Инициализация
    updateUI();
    updateProfile();
    renderShop();
    renderLimited();
    renderInventory();
    renderUnits();
    renderCraft();
})();