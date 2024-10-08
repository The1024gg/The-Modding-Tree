let modInfo = {
	name: "The Tree Tree Tree",
	id: "1024gg",
	author: "The1024gg",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0.1.3",
	name: "The End of v0.0.x",
}

let changelog = `tw.2s4.me has a changelog you dont need this one!`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0)
	// Prestige
	if (hasUpgrade('p',11)) gain = gain.plus(1)
	if (hasUpgrade('p',12)) gain = gain.plus(1)
	if (hasUpgrade('p',13)) gain = gain.times(upgradeEffect('p',13))
	if (hasUpgrade('p',14)) gain = gain.times(1.5)
	if (hasUpgrade('p',21)) gain = gain.times(upgradeEffect('p',21))
	if (hasUpgrade('p',22)) gain = gain.times(1.35)
	if (hasUpgrade('p',23)) gain = gain.times(2)
	if (hasUpgrade('p',24)) gain = gain.times(upgradeEffect('p',24))
	if (hasUpgrade('p',31)) gain = gain.times(1.15)
	if (hasUpgrade('p',32)) gain = gain.times(1.5)
	if (hasUpgrade('p',33)) gain = gain.times(2)
	if (hasUpgrade('p',41)) gain = gain.times(1.05)
	if (hasUpgrade('p',42)) gain = gain.times(1.45)
	// Steel
	if (hasUpgrade('s',11)) gain = gain.times(3)
	if (hasUpgrade('s',12)) gain = gain.times(upgradeEffect('s',12))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	"Endgame: 100B points",
	function() {
		if (player.points.lte(1e3)) {
			return "If 1 point is a gramm, you'd have " + format(player.points) + "g"
		}
		if (player.points.lte(1e6)) {
			return "If 1 point is a gramm, you'd have " + format(player.points.div(1000)) + "kg"
		}
		if (player.points.lte(1.619e20)) {
			return "If 1 point is a gramm, you'd have " + format(player.points.div(1e6)) + " tonne"
		}
		return "If you write 1 digit/s, you'd have to write for " + formatTime(player.points.log10().floor())
	}
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e1000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
