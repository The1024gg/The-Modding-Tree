addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new EN(0),
    }},
    color: "#00FF00",
    requires: new EN(10), // Can be a function that takes requirement increases into account
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
			cost: new EN(1)
		},
		12: {
			title: "Tripler",
			description: "x3 point gain",
			cost: new EN(2),
			unlocked() {return player.adds.points.gte(2)}
		},
		13: {
			title: "Quadrupler",
			description: "x4 point gain",
			cost: new EN(3),
			unlocked() {return player.adds.points.gte(2)}
		},
	}
})
