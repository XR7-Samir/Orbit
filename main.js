// Base variables

var projectName = "Orbit";
var projectID = "orbit";
var projectVersion = 1;

var seed;
var canvasID = "canvas";
var ctx, canvas, canvasSize;
var bg;
var dt, currentTimestep, paused, maxTimesteps;



function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}



function setupBackground() {
  bg = randomDarkColour();
  $("html").css("background-color", "rgb(" + bg.r + "," + bg.g + "," + bg.b + ")");
}



function setupAll() {
 
  // Base variable setup
	dt = 1;
	currentTimestep = 1;
	paused = false;
	maxTimesteps = 50000000;
    
   canvasSize = {
		width: 700,
		height: 700
	};
  
	var container = $("#canvas-container");
	canvas.width = canvasSize.width;
	canvas.height = canvasSize.height;
  
  
  initSeedSystem();
  
  setupBackground();
  
  setupSatellites(seed, maxTimesteps, ctx, canvasSize, canvas);
  
}




function init(seed) {
    
  canvas = document.getElementById(canvasID);
	ctx = canvas.getContext('2d');
  ctx.globalAlpha = 1;
  ctx.translate(0, 0);
  ctx.moveTo(0, 0);

  setupAll();    
	clearCanvas(ctx);

  drawBackground(1);
  
  window.requestAnimationFrame(main);
  
}



function drawBackground(opacity = 1) {
  var oldAlpha = ctx.globalAlpha;
  ctx.globalAlpha = opacity;
	ctx.fillStyle = 'rgb(' + bg.r + ', ' + bg.g + ', ' + bg.b + ')';	
	ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = oldAlpha;
}



function draw() {
  
  drawBackground(1);
  drawSatellites(ctx);
  
}



function update() {
  currentTimestep += 1;
    
  if ( currentTimestep % 1 == 0 ) {
      updateSatellites(dt, currentTimestep, paused);
  }

  if ( currentTimestep > maxTimesteps ) {
      paused = true;
  }  
}



function main() {
	if (!paused) {
		update();
		draw();
		if (currentTimestep < maxTimesteps) {
			currentTimestep++;
			window.requestAnimationFrame(main);	
		} else {
			console.log("COMPLETE");
		}
	}
}



// Page logic

$(document).ready(function() { 
  
  seed = generateSeed();
  init();
  
  $("#seed-label").html(seed);
  $("#project-name").html(projectName);
  $("#project-version").html(projectVersion);
  
  $("#reseed").click(function() {
    // TODO: reseed without refreshing whole page
    var url = document.location.href;
    var urlWithoutParams = url.split("?")[0];
    var urlWithoutSeed = urlWithoutParams;
    document.location = urlWithoutSeed;
  });
  
  $("#download-link").click(function() {
    
    $("#download-link").attr("download", "n-schede_" + projectID + "-v" + projectVersion + "_s" + seed + "_t" + currentTimestep );
    
    var image = canvas.toDataURL("image/png");
    this.href = image;
  });

  
});