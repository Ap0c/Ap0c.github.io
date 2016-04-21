// ----- Modules ----- //

// Handles the electron circuit animation.
var electronCircuit = (function electronCircuit () {

	// Object to manage the properties of an electron and handle redrawing.
	function Electron (initX, initY, initDx, initDy, r) {

		var x = initX;
		var y = initY;
		var dx = initDx;
		var dy = initDy;

		function updatePosition () {

			if (x == 474 && y == 26) {
				dx = 0;
				dy = 1;
			} else if (y == 374 && x == 474) {
				dx = -1;
				dy = 0;
			} else if (x == 26 && y == 374) {
				dx = 0;
				dy = -1;
			} else if (y == 26 && x == 26) {
				dx = 1;
				dy = 0;
			}

			x += dx;
			y += dy;

		}

		function drawElectron (ctx) {

			updatePosition();

			ctx.beginPath();
			ctx.fillStyle = '#c0dfd9';
			ctx.arc(x, y, r, 0, Math.PI*2);
			ctx.fill();
			ctx.closePath();

		}

		return {
			draw: drawElectron
		};

	}

	// Draws the circuit outline.
	function drawCircuit (ctx) {

		ctx.strokeStyle = '#3b3a36';
		ctx.strokeRect(20, 20, 460, 360);
		ctx.strokeRect(32, 32, 436, 336);

	}

	// Draws the battery and lightbulb.
	function drawComponents (ctx) {

		// Battery.
		ctx.fillStyle = '#3b3a36';
		ctx.strokeStyle = '#e9ece5';
		ctx.fillRect(5, 150, 42, 100);
		ctx.fillStyle = '#b3c2bf';
		ctx.fillRect(5, 220, 42, 30);
		ctx.fillStyle = '#fff';
		ctx.font = '30px sans-serif';
		ctx.fillText('-', 21, 170);
		ctx.fillText('+', 17, 245);

		// Light.
		ctx.beginPath();
		ctx.fillStyle = '#c0dfd9';
		ctx.strokeStyle = '#e9ece5';
		ctx.arc(474, 200, 25, 0, Math.PI*2);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();

		// Labels.
		ctx.fillStyle = '#b3c2bf';
		ctx.fillText('Battery', 60, 210);
		ctx.fillText('Lightbulb', 310, 210);

	}

	// Draws objects on the canvas.
	function draw (canvas, ctx, electrons) {

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawCircuit(ctx);

		for (var electron of electrons) {
			electron.draw(ctx);
		}

		drawComponents(ctx);

	}

	return function initAnim () {

		var canvas = document.getElementById('electrons-anim');
		var ctx = canvas.getContext('2d');

		var electrons = [
			Electron(250, 26, 1, 0, 5),
			Electron(474, 200, 0, 1, 5),
			Electron(250, 374, -1, 0, 5),
			Electron(26, 200, 0, -1, 5),
		];

		// Renders the canvas image.
		function render () {
			draw(canvas, ctx, electrons);
		}

		return render;

	};

})();


// ----- Functions ----- //

// Sets up the canvas elements.
function setup () {

	var animOne = electronCircuit();

	function runAnimations () {

		animOne();
		window.requestAnimationFrame(runAnimations);

	}

	runAnimations();

}


// ----- DOM Loaded ----- //

document.addEventListener('DOMContentLoaded', setup);
