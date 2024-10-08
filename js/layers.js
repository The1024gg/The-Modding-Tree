addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
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
		rows: 3,
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
	}
})
