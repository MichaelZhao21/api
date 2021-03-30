function randInt(min, max) {
	return Math.random() * (max - min) + max;
}

module.exports = { randInt };
