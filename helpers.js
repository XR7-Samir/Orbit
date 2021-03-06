// General helpers

function difference(x, y) {
    var result = 0;
    if ( x > y ) {
        result = x - y;
    } else {
        result = y - x;
    }
    return result;
}



// Seed helpers

var initialSeed, workingSeed;

var seedRange = 10000;

function initSeedSystem() {
    initialSeed = generateSeed();
    workingSeed = initialSeed;
}

function generateSeed() {
  
  var result;
  
  // Make sure there's no seed in the URL
  var urlParams = new URLSearchParams(window.location.search);
  var urlSeed = urlParams.get('s');
  if (urlSeed > 0) {
      result = urlSeed;
  } else {
    result = Math.floor(Math.random() * Math.floor(seedRange)); // This is the only place where Math.random should be used. After the seed is generated, use random() instead.
    // Add the seed as a URL parameter
    
    var url = document.location.href;
    var urlWithoutParams = url.split("?")[0];
    var urlWithSeed = urlWithoutParams + "?s=" + result;
    window.history.pushState("s", result, urlWithSeed);    

  }
	
	return result;
}



// Random number helpers

function random() {
    var x = Math.sin(workingSeed++) * seedRange;
    return x - Math.floor(x);
}

function randomBetween(min, max) {
	// TODO: don't assume it's an int
	var range = max - min;
	var result = Math.floor(random() * range) + min;
	return result;
}

function pureRandomBetween(min, max) { // a random not in the seed system
	// TODO: don't assume it's an int
	var range = max - min;
	var result = Math.floor(Math.random() * range) + min;
	return result;
}

function randomSign() {
	// returns 1 or -1, randomly
	if ( random() <= 0.5 ) {
		return -1;
	} else {
		return 1;
	}
}

function randomTinyVariation(startingPoint) {
	var random = random();
	return (startingPoint*random) * randomSign();
}



// Colour helpers

function randomNeonColour(variant = randomBetween(1, 6)) {
    
    var maxJiggle = randomBetween(0, 15);
    
    var colour = {};
    var r, g, b;
    
    switch (variant) {
        case 1:
            r = 60; g = 240; b = 200;
            break;
        case 2:
            r = 240; g = 60; b = 200;
            break;
        case 3:
            r = 200; g = 240; b = 60;
            break;
        case 4:
            r = 60; g = 200; b = 240;
            break;
        case 5:
            r = 240; g = 200; b = 60;
            break;
        case 6:
            r = 200; g = 60; b = 240;
            break;
        default:
            r = 235; g = 235; b = 235;
            break;
    }
    
    colour = {
        r: r + randomBetween(0, maxJiggle),
        g: g + randomBetween(0, maxJiggle),
        b: b + randomBetween(0, maxJiggle)
    }
    
    return colour;
}

function randomColourNumber() {
	return randomBetween(0, 255);
}

function randomMidColourNumber() {
	return randomBetween(70, 200);
}

function randomDarkColourNumber() {
	return randomBetween(0, 40);
}

function randomLightColourNumber() {
	return randomBetween(200, 255);
}

function randomColour() {
  var r = randomColourNumber();
  var g = randomColourNumber();
  var b = randomColourNumber();
  var colour = {
    r: r,
    g: g,
    b: b
  }
  return colour;
}

function randomMidColour() {
  var r = randomMidColourNumber();
  var g = randomMidColourNumber();
  var b = randomMidColourNumber();
  var colour = {
    r: r,
    g: g,
    b: b
  }
  return colour;
}

function randomDarkColour() {
  var r = randomDarkColourNumber();
  var g = randomDarkColourNumber();
  var b = randomDarkColourNumber();
  var colour = {
    r: r,
    g: g,
    b: b
  }
  return colour;
}

function randomLightColour() {
  var r = randomLightColourNumber();
  var g = randomLightColourNumber();
  var b = randomLightColourNumber();
  var colour = {
    r: r,
    g: g,
    b: b
  }
  return colour;
}





// Other helpers

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}




