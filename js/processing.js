var model

async function load_model() {

  model = await tf.loadGraphModel('TFJS-1/model.json')
  
}

function predictImage() {
	
	let image = cv.imread(canvas);
	cv.cvtColor(image, image, cv.COLOR_RGBA2GRAY,0);
	cv.threshold(image, image, 175, 255, cv.THRESH_BINARY);
	let contours = new cv.MatVector();
	let hierarchy = new cv.Mat();
	cv.findContours(image, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
	// crop the image
	let cnt = contours.get(0);
	let rect = cv.boundingRect(cnt);
	image = image.roi(rect);

	var height = image.rows;
	var width = image.cols;
	if (height > width){
		height = 20;
		const scaleFactor = image.rows/height;  
		width = Math.round(image.cols/scaleFactor);
	}else{
		width = 20;
		const scaleFactor = image.cols/width;  
		height = Math.round(image.cols/scaleFactor);

	}

	let newSize = new cv.Size(width, height);
	cv.resize(image,  image, newSize, 0, 0, cv.INTER_AREA);
	const LEFT = Math.ceil(4+(20-width)/2);
	const RIGHT = Math.floor(4+(20-width)/2);
	const TOP = Math.ceil(4+(20-height)/2);	
	const BOTTOM = Math.floor(4+(20-height)/2);	
	const BLACK = new cv.Scalar(0, 0, 0, 0);

	cv.copyMakeBorder(image, image, TOP, BOTTOM, LEFT, RIGHT, cv.BORDER_CONSTANT, BLACK);

	// Find the center of mass
	cv.findContours(image, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
	cnt = contours.get(0);
	
	const Moments = cv.moments(cnt, false);
	const cx = Moments.m10/Moments.m00;
	const cy  = Moments.m01/Moments.m00;
	const xShift = Math.round(image.cols/2.0-cx);
	const yShift = Math.round(image.rows/2.0-cy);
	newSize = new cv.Size(image.cols, image.rows);
	const M = cv.matFromArray(2,3, cv.CV_64FC1, [1,0,xShift,0,1,yShift]);
	cv.warpAffine(image, image, M, newSize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, BLACK);

	let pixelValues = image.data;
	pixelValues = Float32Array.from(pixelValues);
	pixelValues =  pixelValues.map(function(item) {
		return item / 255.0;
	});

	const X = tf.tensor([pixelValues]);
	const result = model.predict(X);
  	result.print();
  	const output = result.dataSync()[0];
	image.delete();
	contours.delete();
	cnt.delete();
	hierarchy.delete();
	M.delete();
	X.dispose();
	result.dispose();

	return output;
}
