var Snake = Snake || {};

Snake.loadImages = function() {
	// set up images
	Snake.imageFiles[Snake.gridTypes.FLOOR] = ['img/floor.png', null];
	Snake.imageFiles[Snake.gridTypes.WALL] = ['img/wall.png', null];
	Snake.imageFiles[Snake.gridTypes.BODYX] = ['img/body.png', null];
	Snake.imageFiles[Snake.gridTypes.BODYY] = ['img/body.png', null];
	Snake.imageFiles[Snake.gridTypes.FOOD] = ['img/food0.png', null];
	Snake.imageFiles[Snake.gridTypes.HEADRIGHT] = ['img/headright.png', null];
	Snake.imageFiles[Snake.gridTypes.HEADLEFT] = ['img/headleft.png', null];
	Snake.imageFiles[Snake.gridTypes.HEADUP] = ['img/headup.png', null];
	Snake.imageFiles[Snake.gridTypes.HEADDOWN] = ['img/headdown.png', null];

	
	Snake.listFoods=['img/food0.png', 'img/food1.png', 'img/food2.png', 'img/food3.png', 'img/food4.png',
					'img/food5.png', 'img/food6.png', 'img/food7.png', 'img/food8.png', 'img/food9.png',
					'img/food10.png', 'img/food11.png', 'img/food12.png', 'img/food13.png', 'img/food14.png',
					'img/food15.png', 'img/food16.png', 'img/food17.png', 'img/food18.png', 'img/food19.png',
					'img/food20.png', 'img/food21.png', 'img/food22.png', 'img/food23.png', 'img/food24.png',
					'img/food25.png'];
	Snake.foods=[];
	for(var x=0; x<Snake.listFoods.length; x++){
		var img= new Image();
		img.src = Snake.listFoods[x];
		Snake.foods[x] = img;
	}
	
	Snake.imagesLoaded = 0;
	
	for(var i = 0; i < Snake.imageFiles.length; i++) {
		var item = Snake.imageFiles[i];
		item[1] = new Image();
		item[1].src = item[0];
		item[1].onload = Snake.onImageLoaded;
	}
}

Snake.onImageLoaded = function() {
	Snake.imagesLoaded++;
}

Snake.waitForImages = function(callback) {
	window.setTimeout(function() {
		if(Snake.imagesLoaded != Snake.imageFiles.length) {
			window.setTimeout(arguments.callee, 0);
		}
		else {
			callback();
		}
	}, 0);
}

