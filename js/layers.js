addLayer("r", {
        name: "ranks", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { return {
            unlocked: true,
		points: new Decimal(1),
		time: new Decimal(0),
        }},
        color: "#ffffff",
        requires:10, // Can be a function that takes requirement increases into account
        resource: "ranks", // Name of prestige currency
	base: 2,
        baseResource: "g of mass", // Name of resource prestige is based on
        baseAmount() {return player.points}, // Get the current amount of baseResource
        type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: 1.5, // Prestige currency exponent
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new Decimal(1)

            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
		exp=new Decimal(1)
		if (player.t.points.gte(1)) exp = exp.times(1.25)
		if (player.t.points.gte(3)) exp = exp.times(Decimal.pow(1.1,player.t.points))		
		if (hasAchievement("a",43)) exp = exp.times(1.025)
            return exp
        },
        row: 0, // Row the layer is in on the tree (0 is the first row)
        hotkeys: [
            {key: "r", description: "Rank Reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
        ],
        layerShown(){return true},
	update(diff){
	player.r.time=player.r.time.add(diff)
	},
	onReset() {player.r.time=new Decimal(0)},
})
addLayer("t", {
        name: "tiers", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	branches:["r"],
        startData() { return {
            unlocked: true,
			points: new Decimal(0),
        }},
        color: "#dddddd",
        requires: 1, // Can be a function that takes requirement increases into account
        resource: "tiers", // Name of prestige currency
        baseResource: "ranks", // Name of resource prestige is based on
        baseAmount() {return player.r.points}, // Get the current amount of baseResource
        type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: 1.5, // Prestige currency exponent
	base: 1,
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new Decimal(1)
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            return new Decimal(1)
        },
        row: 1, // Row the layer is in on the tree (0 is the first row)
        hotkeys: [
            {key: "t", description: "Tier reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
        ],
        layerShown(){return true},
})
addLayer("a", {
        startData() { return {
            unlocked: true,
        }},
        color: "yellow",
        row: "side",
        layerShown() {return true}, 
        tooltip() { // Optional, tooltip displays when the layer is locked
            return ("Achievements")
        },
        achievements: {
            rows: 4,
            cols: 4,
            11: {
                name: "Pushing Mass",
                done() { return player.points.gte(100) },
                tooltip: "Reach 100g of mass",
            },
		12: {
                name: "Ranking up",
                done() { return player.r.points.gte(1) },
                tooltip: "Rank up",
            },
		13: {
                name: "Tier out",
                done() { return player.t.points.gte(1) },
                tooltip: "Tier up",
            },
		14: {
                name: "Chapter 2: Rage",
                done() { return player.rage.points.gte(1) },
                tooltip: "Rage Reset",
            },
		21: {
                name: "Mass of Everest",
                done() { return player.points.gte(1.619e20) },
                tooltip: "Travel 1 MME",
            },
		22: {
                name: "Ranking up 2",
                done() { return player.r.points.gte(8) },
                tooltip: "Reach rank 8",
            },
		23: {
                name: "Push up",
                done() { return player.t.points.gte(3) },
                tooltip: "Reach tier 3",
            },
		24: {
                name: "RAGE!!!",
                done() { return player.rage.points.gte(2) },
                tooltip: "Get 2 rage powers",
            },
		31: {
                name: "Earth mass!!!",
                done() { return player.points.gte(5.97e21) },
                tooltip: "Reach 1 Earth Mass",
            },
		32: {
                name: "Pushing Mass Simulator",
                done() { return player.r.points.gte(12) },
                tooltip: "Reach rank 12",
            },
		33: {
                name: "IV test",
                done() { return player.t.points.gte(4) },
                tooltip: "Reach tier 4",
            },
		34: {
                name: "Rage III",
                done() { return player.rage.points.gte(10) },
                tooltip: "Get 10 rage powers",
            },
		41: {
                name: "Solar masses",
                done() { return player.points.gte(1.98e27) },
                tooltip: "Push 1 solar masses",
            },
		42: {
                name: "Mass Pusher",
                done() { return player.r.points.gte(20) },
                tooltip: "Reach rank 20",
            },
		43: {
                name: "Confusion",
                done() { return player.t.points.gte(5) },
                tooltip: "Reach tier 5",
            },
		44: {
                name: "Mass Pusher v0.1",
                done() { return player.rage.points.gte(100000) },
                tooltip: "Get 100,000 rage powers",
            },
        },
        midsection: [
            "achievements",
        ]
    }, 
)
addLayer("rage", {
        name: "rage", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "RP", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { return {
            unlocked: false,
		points: new Decimal(0),
        }},
        color: "#ff0000",
        requires:5e7, // Can be a function that takes requirement increases into account
	branches:["t"],
        resource: "rage powers", // Name of prestige currency
	base: 1,
        baseResource: "g of mass", // Name of resource prestige is based on
        baseAmount() {return player.points}, // Get the current amount of baseResource
        type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: new Decimal(5/24), // Prestige currency exponent
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new Decimal(1)
		if (hasAchievement("a",34)) mult=mult.times(1.1)
		if (hasAchievement("a",44)) mult=mult.times(1.15)
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
		exp=new Decimal(1)	
            return exp
        },
        row: 2, // Row the layer is in on the tree (0 is the first row)
        hotkeys: [
            {key: "o", description: "Rocket Reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
        ],
        layerShown(){return (player.points.gte(1e15)||player.rage.points.gte(1)||hasAchievement("a",14))},
	upgrades: {
		rows: 2,
		cols: 5,
		11: {
			name: "Rage 11",
			description: "Booster adds Muscler.",
			cost: new Decimal (1)
		},
	},
}
})

addLayer("u", {
        name: "Upgrades", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "U", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { return {
            unlocked: false,
		points: new Decimal(0),
        }},
        color: "#ffffff",
	base: 1,
        baseResource: "g of mass", // Name of resource prestige is based on
        baseAmount() {return player.points}, // Get the current amount of baseResource
        type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have. custom: You can define everything
        exponent: new Decimal(5/24), // Prestige currency exponent
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new Decimal(1)
		if (hasAchievement("a",34)) mult=mult.times(1.1)
		if (hasAchievement("a",44)) mult=mult.times(1.15)
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
		exp=new Decimal(1)	
            return exp
        },
        row: side, // Row the layer is in on the tree (0 is the first row)
        hotkeys: [
            {key: "o", description: "Rocket Reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
        ],
        layerShown(){return (player.r.points.gte(1)||player.hasAchievement("a",12))},
	upgrades: {
		rows: 2,
		cols: 5,
		11: {
			name: "Mass 11",
			description: "Double mass gain.",
			currencyDisplayName: "rage powers",
			currencyInternalName: "rage",
			currencyLayer: "rage",
			cost: new Decimal (1)
		},
	},
}
})
