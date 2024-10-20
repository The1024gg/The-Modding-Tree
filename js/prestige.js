addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#00FF00",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    row: 0,
    layerShown(){return player.adds.points.gte(1)},
	upgrades: {
		11: {
			title: "Doubler",
			description: "x2 point gain",
			cost: new Decimal(1)
		},
		12: {
			title: "Tripler",
			description: "x3 point gain",
			cost: new Decimal(2),
			unlocked() {return player.adds.points.gte(2)}
		},
		13: {
			title: "Quadrupler",
			description: "x4 point gain",
			cost: new Decimal(3),
			unlocked() {return player.adds.points.gte(2)}
		},
		14: {
            title: "Boosting I",
            description: "Basic points boost point fragments.",
            cost: new Decimal(3),
            effect() {
                eff = softcap(eff, new Decimal("ee8"), 0.5)
                eff = softcap(eff, new Decimal("ee50"), 0.4)
                return eff
            },
            effectDisplay() {
                let softcapDescription = ""
                let upgEffect = upgradeEffect(this.layer, this.id)
                if (upgEffect.gte(new Decimal("e100000000")) ) {
                    softcapDescription = " (softcapped)"
                }
                if (upgEffect.gte(new Decimal("e1e50")) ) {
                    softcapDescription = " (softcapped^2)"
                }
                return (upgEffect)+"x" + softcapDescription
            },
            unlocked() { return player.adds.poins.gte(2) },
		}
	}
})
