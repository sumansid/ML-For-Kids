const bgColor = '#000000';
const linecolor = '#FFFFFF';
const linewidth = 15;

var currentX = 0;
var currentY = 0;
var prevX = 0;
var prevY = 0;

var canvas;
var context;

function prepareCanvas() {
	// console.log('Preparing Canvas');
	canvas = document.getElementById('my_canvas');
	context = canvas.getContext('2d');
	context.fillStyle=bgColor;
	context.fillRect(0,0, canvas.clientWidth, canvas.clientHeight);
	context.strokeStyle=linecolor;
	context.lineWidth = linewidth;
	context.lineJoin = 'round';
	var isPainting = false;

	document.addEventListener('mousedown', function (event){

		// console.log('X coordinate'+ event.clientX);
		isPainting=true;
		currentX = event.clientX - canvas.offsetLeft;
		currentY = event.clientY - canvas.offsetTop;


	});

	document.addEventListener('mousemove', function (event){
		if (isPainting) {
			prevX = currentX; 
			currentX = event.clientX - canvas.offsetLeft;
			prevY = currentY; 
			currentY = event.clientY - canvas.offsetTop;
			// console.log(`Current X : ${currentX}`);
			context.beginPath();
			context.moveTo(prevX, prevY);
			context.lineTo(currentX, currentY);
			context.closePath();
			context.stroke();

		} 
		
	});

	document.addEventListener('mouseup', function (event){
		// console.log('Mouse Released');
		isPainting = false;
		 

	});
	canvas.addEventListener('mouseleave', function (event){
		
		isPainting = false;
		 

	});
	// Touch Events
	canvas.addEventListener('touchstart', function (event){

		// console.log('Touch');
		isPainting=true;
		currentX = event.touches[0].clientX - canvas.offsetLeft;
		currentY = event.touches[0].clientY - canvas.offsetTop;


	});
	canvas.addEventListener('touchend', function (event){
		
		isPainting = false;
		 

	});

	canvas.addEventListener('touchcancel', function (event){
		
		isPainting = false;
		 

	});

	canvas.addEventListener('touchmove', function (event){
		if (isPainting) {
			prevX = currentX; 
			currentX = event.touches[0].clientX - canvas.offsetLeft;
			prevY = currentY; 
			currentY = event.touches[0].clientY - canvas.offsetTop;

			// console.log(`Current X : ${currentX}`);
			context.beginPath();
			context.moveTo(prevX, prevY);
			context.lineTo(currentX, currentY);
			context.closePath();
			context.stroke();

	} 
	

	});

}

function clearCanvas(){
	
	currentX = 0;
	currentY = 0;
	prevX = 0;
	prevY = 0;
	context.fillRect(0,0, canvas.clientWidth, canvas.clientHeight);
	
}

