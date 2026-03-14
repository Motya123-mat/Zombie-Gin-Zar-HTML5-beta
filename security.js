(function() {
    'use strict';

    const SAVE_KEY = 'zgz_save';
    const SAVE_INTERVAL = 2000;
    const GIFT_DURATION = 86400000; // 24ч

    const DEFAULT_PLAYER = {
        name: 'Gin Zar',
        avatar: '🧟',
        money: 1000,
        rainbowMoney: 0,
        weapons: [{ name: 'Нож кухонный', durability: -1 }],
        units: [],
        zombieKills: {
            'Зомби-страх': 0,
            'Зомби-силач': 0,
            'Зомби-хакер': 0,
            'Зомби-невидимка': 0,
            'Зомби-прыгун': 0,
            'Зомби-скелет': 0,
            'Big Zombie': 0,
            'Зомби-женщина': 0
        },
        maxWave: 0,
        usedPromos: [],
        promoBlockDonate: false,
        giftReceived: false,
        giftExpire: 0
    };

    let player = JSON.parse(JSON.stringify(DEFAULT_PLAYER));

    function loadGame() {
        try {
            const saved = localStorage.getItem(SAVE_KEY);
            if (!saved) return false;
            const data = JSON.parse(saved);
            player = { ...DEFAULT_PLAYER, ...data };
            player.zombieKills = { ...DEFAULT_PLAYER.zombieKills, ...data.zombieKills };
            player.usedPromos = Array.isArray(data.usedPromos) ? data.usedPromos : [];
            player.units = Array.isArray(data.units) ? data.units : [];

            if (!Array.isArray(player.weapons)) player.weapons = [];
            player.weapons = player.weapons.map(w => {
                if (typeof w === 'string') return { name: w, durability: -1 };
                return w;
            });
            if (!player.weapons.some(w => w.name === 'Нож кухонный')) {
                player.weapons.push({ name: 'Нож кухонный', durability: -1 });
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    function saveGame() {
        try {
            localStorage.setItem(SAVE_KEY, JSON.stringify(player));
        } catch (e) {}
    }

    if (!loadGame()) {
        saveGame();
    }

    setInterval(saveGame, SAVE_INTERVAL);
    window.addEventListener('beforeunload', saveGame);

    if (!player.giftReceived) {
        player.giftReceived = true;
        player.giftExpire = Date.now() + GIFT_DURATION;
        if (!player.weapons.some(w => w.name === 'Конфетный меч')) {
            player.weapons.push({ name: 'Конфетный меч', durability: -1 });
        }
        saveGame();
    } else if (player.giftExpire < Date.now()) {
        player.weapons = player.weapons.filter(w => w.name !== 'Конфетный меч');
        saveGame();
    }

    window.Game = {
        getMoney: () => player.money,
        getRainbowMoney: () => player.rainbowMoney,
        getWeapons: () => player.weapons.map(w => ({ ...w })),
        getWeaponNames: () => player.weapons.map(w => w.name),
        hasWeapon: (name) => player.weapons.some(w => w.name === name),
        getWeapon: (name) => player.weapons.find(w => w.name === name),
        getUnits: () => [...player.units],
        hasUnit: (name) => player.units.includes(name),
        getName: () => player.name,
        getAvatar: () => player.avatar,
        getMaxWave: () => player.maxWave,
        isPromoUsed: (code) => player.usedPromos.includes(code),
        isDonateBlocked: () => player.promoBlockDonate,

        addMoney: (amount) => { player.money += amount; saveGame(); },
        deductMoney: (amount) => { 
            if (player.money >= amount) { player.money -= amount; saveGame(); return true; }
            return false;
        },
        addRainbowMoney: (amount) => { player.rainbowMoney += amount; saveGame(); },
        deductRainbowMoney: (amount) => {
            if (player.rainbowMoney >= amount && !player.promoBlockDonate) {
                player.rainbowMoney -= amount; saveGame(); return true;
            }
            return false;
        },
        setMoney: (amount) => { player.money = amount; saveGame(); },
        setRainbowMoney: (amount) => { player.rainbowMoney = amount; saveGame(); },

        addWeapon: (weapon) => {
            if (!player.weapons.some(w => w.name === weapon.name)) {
                player.weapons.push(weapon);
                saveGame();
                return true;
            }
            return false;
        },
        removeWeapon: (name) => {
            const idx = player.weapons.findIndex(w => w.name === name);
            if (idx >= 0) { player.weapons.splice(idx, 1); saveGame(); return true; }
            return false;
        },
        updateWeaponDurability: (name, dur) => {
            const w = player.weapons.find(w => w.name === name);
            if (w) { w.durability = dur; saveGame(); return true; }
            return false;
        },

        addUnit: (name) => { if (!player.units.includes(name)) { player.units.push(name); saveGame(); } },

        addZombieKill: (zombieName) => { if (player.zombieKills.hasOwnProperty(zombieName)) { player.zombieKills[zombieName]++; saveGame(); } },

        setMaxWave: (wave) => { if (wave > player.maxWave) { player.maxWave = wave; saveGame(); } },

        addUsedPromo: (code) => { if (!player.usedPromos.includes(code)) { player.usedPromos.push(code); saveGame(); } },

        setDonateBlock: (block) => { player.promoBlockDonate = block; saveGame(); },

        setName: (name) => { if (name) { player.name = name; saveGame(); } },
        setAvatar: (avatar) => { player.avatar = avatar; saveGame(); },

        reset: () => { player = JSON.parse(JSON.stringify(DEFAULT_PLAYER)); saveGame(); }
    };
})();