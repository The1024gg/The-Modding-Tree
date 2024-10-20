let modInfo = {
	name: "The Tree Tree Tree",
	id: "1024gg",
	author: "The1024gg",
	pointsName: "points",
	modFiles: ["unlocks.js", "prestige.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "Starting",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

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
		return new EN(0)

	let gain = new EN(1)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
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
	return player.points.gte(new EN("e280000000"))
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
