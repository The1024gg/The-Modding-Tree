addLayer("a", {
    name: "achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFFF00",
    requires: new Decimal(80085), // Can be a function that takes requirement increases into account
    tooltip: "Achievements",
    resource: "achis", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
    achievements: {
        11: {
            name: "The first one's always free",
            tooltip: "If you don't have this, you don't exist",
            done() {return true}
        },
	12: {
		name: "You gotta start somewhere",
		tooltip: "Get 1 prestige point.",
		done() {return player['p'].points.gte(1)}
	},
	13: {
		name: "First productions",
		tooltip: "Get prestige upgrade 11",
		done() {return hasUpgrade('p',11)}
	},
	14: {
		name: "DYNAMIC BOOSTS?",
		tooltip: "Get prestige upgrade 14",
		done() {return hasUpgrade('p',14)}
	},
	15: {
		name: "The another row",
		tooltip: "Get prestige upgrade 21",
		done() {return hasUpgrade('p',21)}
	},
	16: {
		name: "Dynamic again",
		tooltip: "Get prestige upgrade 24",
		done() {return hasUpgrade('p',24)}
	},
	17: {
		name: "HALF LIFE 3 CONFIRMED",
		tooltip: "Get prestige upgrade 31",
		done() {return hasUpgrade('p',31)}
	},
	18: {
		name: "3333Tri",
		tooltip: "Get prestige upgrade 33",
		done() {return hasUpgrade('p',33)}
	},
	19: {
		name: "New layer?",
		tooltip: "Unlock steel",
		done() {return hasUpgrade('p',34)}
	},
	21: {
		name: "Steelie awaits...",
		tooltip: "Get 1 steel",
		done() {return player['s'].points.gte(1)}
	},
	22: {
		name: "Foundry unlocked",
		tooltip: "Get steel upgrade 11",
		done() {return hasUpgrade('s',11)}
	},
	23: {
		name: "Scrap Metal",
		tooltip: "Get 10 steel",
		done() {return player['s'].points.gte(10)}
	},
    }
})
addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#808080",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	if (hasUpgrade('s',13)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
	upgrades: {
		rows: 4,
		cols: 4,
		11: {
			title: "Begin",
			description: "Gain 1 point per second.",
			cost: new Decimal(1),
		},
		12: {
			title: "Point generation",
			description: "Gain 1 point per second again.",
			cost: new Decimal(1),
			unlocked() { return hasUpgrade('p',11) },
		},
		13: {
			title: "Scalar",
			description: "Multiplies points based off of points",
			cost: new Decimal(5),
			effect() {
				return player.points.add(1).pow(0.4)
			},
			effectDisplay() { return 'x' + format(upgradeEffect(this.layer, this.id))},
			tooltip: "(points+1)<sup>0.4</sup>",
			unlocked() { return hasUpgrade('p',12) },
		},
		14: {
			title: "Points boost points",
			description: "x1.5 point gain.",
			cost: new Decimal(20),
			unlocked() { return hasUpgrade('p',13) },
		},
		21: {
			title: "More?",
			description: "Multiplies prestige points based off of points again.",
			cost: new Decimal(50),
			effect() {
				return player.points.add(1).pow(0.1)
			},
			effectDisplay() { return 'x' + format(upgradeEffect(this.layer, this.id))},
			tooltip: "(points+1)<sup>0.1</sup>",
			unlocked() { return hasUpgrade('p',14) },
		},
		22: {
			title: "Base Point gain is 1.35x",
			description: "x1.35 point gain.",
			cost: new Decimal(75),
			unlocked() { return hasUpgrade('p',21) },
		},
		23: {
			title: "Doubled",
			description: "x2 point gain.",
			cost: new Decimal(90),
			unlocked() { return hasUpgrade('p',22) },
		},
		24: {
			title: "More but Reversed",
			description: "Multiplies prestige points based off of points again but another?",
			cost: new Decimal(100),
			effect() {
				return player.points.add(1).pow(0.09)
			},
			effectDisplay() { return 'x' + format(upgradeEffect(this.layer, this.id))},
			tooltip: "(points+1)<sup>0.09</sup>",
			unlocked() { return hasUpgrade('p',23) },
		},
		31: {
			title: "Booster",
			description: "x1.15 point gain.",
			cost: new Decimal(150),
			unlocked() { return hasUpgrade('p',24) },
		},
		32: {
			title: "Where's the Double?",
			description: "x1.5 point gain.",
			cost: new Decimal(200),
			unlocked() { return hasUpgrade('p',31) },
		},
		33: {
			title: "Doubled but Again",
			description: "x2 point gain.",
			cost: new Decimal(300),
			unlocked() { return hasUpgrade('p',32) },
		},
		34: {
			title: "The end of Prestige...",
			description: "Unlock a new layer.",
			cost: new Decimal(1000),
			unlocked() { return hasUpgrade('p',33) },
		},
		41: {
			title: "Conversion",
			description: "x1.05 point gain.",
			cost: new Decimal(20000),
			unlocked() { return hasUpgrade('s',11) },
		},
		42: {
			title: "Conversion II",
			description: "x1.45 point gain.",
			cost: new Decimal(50000),
			unlocked() { return hasUpgrade('p',12) },
		},
	}
})
addLayer("s", {
    name: "steel", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#aaaaaa",
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "steel", // Name of prestige currency
    branches: ['p'],
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for steel", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade('basic', 34) || player.rebirth.unlocked},
	upgrades: {
		rows: 2,
		cols: 4,
		11: {
			title: "Foundry",
			description: "2 new prestige upgrades, x3 point gain.",
			cost: new Decimal(1),
		12: {
			title: "Generator",
			description: "Boost point gain multiplier.",
			cost: new Decimal(2),
			effect() {
				return player.points.add(1).pow(0.2)
			},
			effectDisplay() { return 'x' + format(upgradeEffect(this.layer, this.id))},
			tooltip: "(points+1)<sup>0.2</sup>",
			unlocked() { return hasUpgrade('s',11) },
		},
		13: {
			title: "Charger",
			description: "x2 prestige gain.",
			cost: new Decimal(5),
			unlocked() { return hasUpgrade('s',12) },
		},
	}
})
