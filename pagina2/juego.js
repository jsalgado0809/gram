var canvasBg1 = document.getElementById("canvasBg1");
var contextoBg1 = canvasBg1.getContext("2d");

var canvasBg2 = document.getElementById("canvasBg2");
var contextoBg2 = canvasBg2.getContext("2d");

var canvasAnimal = document.getElementById("canvasAnimal");
var contextoAnimal = canvasAnimal.getContext("2d");

var oCanvas = document.getElementById("canvasFotos");
var oCtx = oCanvas.getContext("2d");

 //INICIO Este Canvas no se ve
var canvasOculto = document.getElementById("canvasOculto");
var contextoOculto = canvasOculto.getContext("2d");

 //FINAL Este canvas no se ve

var fotosTomadas = new Array();
var animalAFotografiar = 0;

//Coordenadas del Mouse
var canvasMouse = document.getElementById("canvasMouse");
var contextoMouse = canvasMouse.getContext("2d");

var canvasPuntaje = document.getElementById("canvasPuntaje");
var contextoPuntaje = canvasPuntaje.getContext("2d");

var canvasInicial = document.getElementById("canvasInicial");
var contextoInicial = canvasInicial.getContext("2d");

var canvasJugar = document.getElementById("canvasJugar");
var contextoJugar = canvasJugar.getContext("2d");

var canvasFinal = document.getElementById("canvasFinal");
var contextoFinal = canvasFinal.getContext("2d");

var canvasAlbum = document.getElementById("canvasAlbum");
var contextoAlbum = canvasAlbum.getContext("2d");
var posicionAlbum = 0;


canvasInicial.addEventListener("click", clickPantallaInicial, false);
canvasInicial.addEventListener("mousemove", movimiento, false);
var posicionIX, posicionIY;

canvasFinal.addEventListener("click", clickPantallaFinal, false);
canvasFinal.addEventListener("mousemove", movimientoFinal, false);
var posicionFX, posicionFY;

canvasJugar.addEventListener("click", clickPantallaJugar, false);
canvasJugar.addEventListener("mousemove", movimientoJugar, false);
var posicionJX, posicionJY;

canvasAlbum.addEventListener("click", clickPantallaAlbum, false);
canvasAlbum.addEventListener("mousemove", movimientoAlbum, false);
var posicionAX, posicionAY;

function movimientoAlbum(e){
	posicionAX = e.pageX - canvasFinal.offsetLeft;
	posicionAY = e.pageY - canvasFinal.offsetTop;	
}

function clickPantallaAlbum(e){
	if(posicionAX > 100 && posicionAX < 148 && posicionAY > 180 &&  posicionAY < 228 ){
		posicionAlbum--;
		pintarFotoAlbum();
	}else if(posicionAX > 531 && posicionAX < 579 && posicionAY > 180 &&  posicionAY < 228){
		posicionAlbum++;
		pintarFotoAlbum();
	}else if(posicionAX > 580 && posicionAX < 650 && posicionAY > 0 &&  posicionAY < 70){
		canvasAlbum.style.display = "none";
		posicionAlbum = 0;
	}
}

function movimientoFinal(e){
	posicionFX = e.pageX - canvasFinal.offsetLeft;
	posicionFY = e.pageY - canvasFinal.offsetTop;	
}

function clickPantallaFinal(e){
	if(posicionFX > 150 && posicionFX < 270 && posicionFY > 260 &&  posicionFY < 380 ){
		canvasFinal.style.display="none";
		dibujarPantallaJugar();
	}else if(posicionFX > 380 && posicionFX < 500 && posicionFY > 260 &&  posicionFY < 380){
		pintarAlbum();
	}
}

function movimientoJugar(e){
	posicionJX = e.pageX - canvasJugar.offsetLeft;
	posicionJY = e.pageY - canvasJugar.offsetTop;	
}

function clickPantallaJugar(e){
	if(posicionJX > 268 && posicionJX < 413 && posicionJY > 182 &&  posicionJY < 328 ){
		canvasJugar.style.display="none";
		init();
	}
}

function pintarAlbum(){
	canvasAlbum.style.display = "block";
	pintarFotoAlbum();
}

function pintarFotoAlbum(){
	if(posicionAlbum<0){
		posicionAlbum = fotosTomadas.length-1;
	}else if(posicionAlbum>=fotosTomadas.length){
		posicionAlbum = 0;	
	}
	contextoAlbum.clearRect(0,0,650, 400);
	contextoAlbum.drawImage(imagenAlbum, 0,0, 650, 400, 0,0, 650, 400);	
	contextoAlbum.drawImage(fotosTomadas[posicionAlbum], 0,0, 300, 300, 169, 35, 341, 276);
}

var imagenInicial = new Image();
imagenInicial.src = "img/pantallaInicial.png";

var imagenJugar = new Image();
imagenJugar.src = "img/pantallaJugar.png";

function movimiento(e){
	posicionIX = e.pageX - canvasInicial.offsetLeft;
	posicionIY = e.pageY - canvasInicial.offsetTop;
}

function clickPantallaInicial(e){
	if(posicionIX > 240 && posicionIX < 440 && posicionIY > 104 &&  posicionIY < 180 ){
		dibujarPantallaJugar();	
		canvasInicial.style.display = "none";
		
	}
}


var puntaje = 0;
var mouseX, mouseY;
canvasMouse.addEventListener("mousemove", mouseMoved, false);
canvasMouse.addEventListener("click", mouseClicked, false);

function mouseMoved(e){
	mouseX = e.pageX - canvasMouse.offsetLeft;
	mouseY = e.pageY - canvasMouse.offsetTop;
	drawCamara(mouseX, mouseY);
}

function mouseClicked(e){
	tomarFoto(mouseX-80, mouseY-55);
	calcularPuntaje();
	mostrarPuntaje();
}

function calcularPuntaje(){
	if(animalSel == animalAFotografiar){
		var difX = (mouseX - 80) - listaAnimales[animalSel].drawX;
		var difY = (mouseY-55) - 119;
		var distancia = Math.sqrt(Math.pow(difX, 2)+Math.pow(difY, 2));
		if(distancia < 5){
			puntaje += 100;	
		}else if(distancia < 15){
			puntaje += 95;	
		}else if(distancia < 20){
			puntaje += 80;	
		}else if(distancia < 30){
			puntaje += 70;	
		}else if(distancia < 40){
			puntaje += 60;	
		}else if(distancia < 50){
			puntaje += 50;	
		}else if(distancia < 60){
			puntaje += 40;	
		}else if(distancia < 70){
			puntaje += 30;	
		}else if(distancia < 80){
			puntaje += 20;	
		}else if(distancia < 90){
			puntaje += 10;	
		}else if(distancia < 100){
			puntaje += 5;	
		}
	}
}

function mostrarPuntaje(){
	contextoPuntaje.clearRect(500, 10, 150, 30);
	contextoPuntaje.font="24px Georgia";
	contextoPuntaje.fillStyle = "#FFF";
	contextoPuntaje.fillText("Puntaje: "+puntaje, 500, 30);
}

//Fin Coordenadas del Mouse

//Dibujando Camara
var imgCamara = new Image();
imgCamara.src = "img/camara.png";

function drawCamara(X, Y){
	contextoMouse.clearRect(0,0,anchoJuego,altoJuego);
	contextoMouse.drawImage(imgCamara, 0, 0, 160, 110, X-80, Y-55, 160, 110);
}

//Fin de Dibujando Camara

//Funciones para Recortar Imagenes
function tomarFoto(X, Y) {
  var aImages = new Image();
  aImages.src = canvasAnimal.toDataURL("image/png");
  
  var aImages1 = new Image();
  aImages1.src = canvasBg1.toDataURL("image/png");
  
  var aImages2 = new Image();
  aImages2.src = canvasBg2.toDataURL("image/png");
  
      var nImgsLen = 1;      
      
  for (var nWidth, nHeight, oImgData, oGrayImg, nPixel, aPix, nPixLen, nImgId = 0; nImgId < nImgsLen; nImgId++) {
    oColorImg = aImages;
    nWidth = oColorImg.offsetWidth-1;
    nHeight = oColorImg.offsetHeight-1;
	
    oCanvas.width = 650;    
	oCanvas.height = 100;
	
	//Canvas no se ve
		contextoOculto.drawImage(aImages2, X, Y, 120, 120, 0,0, 300,300);
	//Fin de Canvas no se ve

	//Canvas no se ve
		contextoOculto.drawImage(aImages1, X, Y, 120, 120, 0,0, 300,300);
	//Fin de Canvas no se ve	
	
	//Canvas no se ve
		contextoOculto.drawImage(oColorImg, X, Y, 120, 120, 0,0, 300,300);
	//Fin de Canvas no se ve
	
	var fotoFinal = new Image();
  	fotoFinal.src = canvasOculto.toDataURL("image/png");	
	fotosTomadas[fotosTomadas.length] = fotoFinal;
	
	
  }
  DibujarImagenes();
}

function DibujarImagenes(){
	oCtx.clearRect(0,0, anchoJuego, altoJuego);
	if(fotosTomadas.length>=5){
		oCtx.drawImage(fotosTomadas[fotosTomadas.length-1], 0, 0, 300, 300, 20, 10, 100, 80);
		oCtx.drawImage(fotosTomadas[fotosTomadas.length-2], 0, 0, 300, 300, 145,10, 100, 80);
		oCtx.drawImage(fotosTomadas[fotosTomadas.length-3], 0, 0, 300, 300, 270,10, 100, 80);
		oCtx.drawImage(fotosTomadas[fotosTomadas.length-4], 0, 0, 300, 300, 395,10, 100, 80);
		oCtx.drawImage(fotosTomadas[fotosTomadas.length-5], 0, 0, 300, 300, 520,10, 100, 80);
	}else if(fotosTomadas.length>=4){
		oCtx.drawImage(fotosTomadas[fotosTomadas.length-1], 0, 0, 300, 300, 20, 10, 100, 80);
		oCtx.drawImage(fotosTomadas[fotosTomadas.length-2], 0, 0, 300, 300, 145,10, 100, 80);
		oCtx.drawImage(fotosTomadas[fotosTomadas.length-3], 0, 0, 300, 300, 270,10, 100, 80);
		oCtx.drawImage(fotosTomadas[fotosTomadas.length-4], 0, 0, 300, 300, 395,10, 100, 80);
	}else if(fotosTomadas.length>=3){
		oCtx.drawImage(fotosTomadas[fotosTomadas.length-1], 0, 0, 300, 300, 20, 10, 100, 80);
		oCtx.drawImage(fotosTomadas[fotosTomadas.length-2], 0, 0, 300, 300, 145,10, 100, 80);
		oCtx.drawImage(fotosTomadas[fotosTomadas.length-3], 0, 0, 300, 300, 270,10, 100, 80);
	}else if(fotosTomadas.length>=2){
		oCtx.drawImage(fotosTomadas[fotosTomadas.length-1], 0, 0, 300, 300, 20, 10, 100, 80);
		oCtx.drawImage(fotosTomadas[fotosTomadas.length-2], 0, 0, 300, 300, 145,10, 100, 80);
	}else if(fotosTomadas.length>=1){
		oCtx.drawImage(fotosTomadas[fotosTomadas.length-1], 0, 0, 300, 300, 20, 10, 100, 80);
	}
}

//FIN DE FUNCIONES PARA RECORTAR IMAGEN



var imgSprite1 = new Image();
imgSprite1.src = "img/sprite1.png";
var imgSprite2 = new Image();
imgSprite2.src = "img/sprite2.png";
var imagenFinal = new Image();
imagenFinal.src = "img/pantallaFinal.png";

var imagenAlbum = new Image();
imagenAlbum.src = "img/album.png";

imgSprite1.addEventListener("load", init, false);



var anchoJuego=canvasBg1.width;
var altoJuego=canvasBg1.height;

var bg1DrawX1 = 0;
var bg1DrawX2 = 1300;

var bg2DrawX1 = 0;
var bg2DrawX2 = 1300;

//

var listaAnimales = new Array();
var animalSel = 0;

var contador = 0;
//

var requestAnimFrame = 	window.requestAnimationFrame || 
					   	window.webkitRequestAnimationFrame ||
						window.mozRequestAnimationFrame ||
						window.msRequestAnimationFrame ||
						window.oRequestAnimationFrame  ||
						function(callback){
							window.setTimeout(callback, 1000/60);	
						};

function init(){
	//dibujarPantallaJugar();
	dibujarPantallaInicial();
	llenarAnimales();
	animalSel = Math.floor(Math.random() * (listaAnimales.length));
	puntaje=0;	
	fotosTomadas = new Array();
	DibujarImagenes();
	mostrarPuntaje();
	dibujarBg1();
	dibujarBg2();
	//
	dibujarAnimal();
	//
	loop();
}

function dibujarPantallaInicial(){
	contextoInicial.clearRect(0,0,anchoJuego,altoJuego);
	contextoInicial.drawImage(imagenInicial, 0, 0,  650, 400, 0, 0, 650, 400);
}

function dibujarPantallaJugar(){
	canvasJugar.style.display = "block";
	animalAFotografiar = Math.floor(Math.random() * (listaAnimales.length));
	contextoJugar.clearRect(0,0,anchoJuego,altoJuego);
	contextoJugar.drawImage(imagenJugar, 0, 0,  650, 400, 0, 0, 650, 400);
	contextoJugar.font="24px Georgia";
	contextoJugar.fillStyle = "#000";
	contextoJugar.fillText("Tomale al Siguiente Animal", 200, 100);
	contextoJugar.fillText(""+listaAnimales[animalAFotografiar].nombre, 280, 150);
}

function llenarAnimales(){
	listaAnimales[0] = new Animal("Camello");
	listaAnimales[1] = new Animal("Leon");
	listaAnimales[2] = new Animal("Jirafa");
	listaAnimales[3] = new Animal("Caballo");
	listaAnimales[4] = new Animal("Tigre");
	listaAnimales[5] = new Animal("Tortuga");
	listaAnimales[6] = new Animal("Perro");
	listaAnimales[7] = new Animal("Cocodrilo");
	listaAnimales[8] = new Animal("Canguro");
	listaAnimales[8] = new Animal("Gato");
}

function dibujarBg1(){
	contextoBg1.clearRect(0,0,anchoJuego,altoJuego);
	contextoBg1.drawImage(imgSprite1, 0, 0, 1300, altoJuego, bg1DrawX1, 0, 1300, altoJuego);
	contextoBg1.drawImage(imgSprite1, 0, 0, 1300, altoJuego, bg1DrawX2, 0, 1300, altoJuego);	
}
//
function dibujarAnimal(){
	contextoAnimal.clearRect(0,0,anchoJuego,altoJuego);
	contextoAnimal.drawImage(listaAnimales[animalSel].image, listaAnimales[animalSel].srcX, 0, 100, 100, listaAnimales[animalSel].drawX, 119, 100, 100);	
}
//
function dibujarBg2(){
	contextoBg2.clearRect(0,0,anchoJuego,altoJuego);
	contextoBg2.drawImage(imgSprite2, 0, 0, 1300, altoJuego, bg2DrawX1, 0, 1300, altoJuego);
	contextoBg2.drawImage(imgSprite2, 0, 0, 1300, altoJuego, bg2DrawX2, 0, 1300, altoJuego);	
}

function loop(){
	moverBg1();
	moverBg2();
	moveAnimal();
	if(fotosTomadas.length<10){
		requestAnimFrame(loop);	
	}else{
		dibujarPantallaFinal();	
	}
}

function dibujarPantallaFinal(){	
	contextoFinal.clearRect(0,0, 650, 400);
	contextoFinal.drawImage(imagenFinal, 0, 0, 650, 400, 0, 0, 650, 400);
	canvasFinal.style.display = "block";
	
	contextoFinal.font="32px Georgia";
	contextoFinal.fillStyle = "#FFF";
	contextoFinal.fillText(""+puntaje+" puntos", 240, 190);
	
}

//
function moveAnimal(){
	listaAnimales[animalSel].drawX +=1;
	
	if(listaAnimales[animalSel].drawX >= 750){ //cambiar a 1300
		listaAnimales[animalSel].drawX = -100;
		animalSel = Math.floor(Math.random() * (listaAnimales.length));	
	}
		
	if(contador%20==0 && listaAnimales[animalSel].srcX<400){
		listaAnimales[animalSel].srcX += 100;	
	}
	
	if(listaAnimales[animalSel].srcX==400){
		listaAnimales[animalSel].srcX=0;
	}	
	
	contador++;
	dibujarAnimal();
}
//
function moverBg1(){
	bg1DrawX1 -= 1;
	bg1DrawX2 -= 1;
	if(bg1DrawX1 <= -1300){ //cambiar a 1300
		bg1DrawX1 = 1300;	
	}else if(bg1DrawX2 <= -1300){//cambiar a 1300
		bg1DrawX2 = 1300;
	}
	dibujarBg1();
}


function moverBg2(){
	bg2DrawX1 -= 4;
	bg2DrawX2 -= 4;
	if(bg2DrawX1 <= -1300){ //cambiar a 1300
		bg2DrawX1 = 1300;	
	}else if(bg2DrawX2 <= -1300){//cambiar a 1300
		bg2DrawX2 = 1300;
	}
	dibujarBg2();
}

function Animal(nombre){
	this.nombre = nombre;
	this.srcX = 0;
	this.srcY = 0;
	this.drawX = -100;
	this.drawY = 0;
	this.width = 100;
	this.height = 100;
	this.image = new Image();
	this.image.src = "img/"+this.nombre+".png";
}




/*var cnv, ctx, pos_x=0, img, imgTree, selAnimal1 = Math.floor(Math.random()*2), selAnimal2 = Math.floor(Math.random()*2);
while(selAnimal1==selAnimal2){
	selAnimal1 = Math.floor(Math.random()*2); 
	selAnimal2 = Math.floor(Math.random()*2);
}
var arbolX = Math.floor(Math.random()*600), arbolY=Math.floor(Math.random()*110)+80;
var animales = [];		

function anima(){
	
	ctx.save();
	ctx.clearRect(0, 0, 648, 300);
	ctx.drawImage(img, pos_x, 0);
	ctx.drawImage(img, pos_x+649, 0);
	if(arbolY > animales[selAnimal1].y){
		animales[selAnimal1].drawAnimal();
		animales[selAnimal2].drawAnimal();
		ctx.drawImage(imgTree, arbolX+650, arbolY);
	}else{
		ctx.drawImage(imgTree, arbolX+650, arbolY);
		animales[selAnimal1].drawAnimal();
		animales[selAnimal2].drawAnimal();
	}
	pos_x  -= 1;
	arbolX -= 1;
	if(animales[selAnimal1].x%80==0){
		animales[selAnimal1].fotograma++;
	}
	if(animales[selAnimal2].x%80==0){
		animales[selAnimal2].fotograma++;
	}
	
	if(animales[selAnimal1].direccion==0){
		animales[selAnimal1].x+=2;
	}else if(animales[selAnimal1].direccion==1){
		animales[selAnimal1].x-=2;					
	}
	
	if(animales[selAnimal2].direccion==0){
		animales[selAnimal2].x+=2;
	}else if(animales[selAnimal2].direccion==1){
		animales[selAnimal2].x-=2;					
	}
	
	if(arbolX < -730){
		arbolX=Math.floor(Math.random()*600);	
		arbolY=Math.floor(Math.random()*110)+80;
	}
	
	if(animales[selAnimal1].fotograma==4){
		animales[selAnimal1].fotograma=0;
	}
	if(animales[selAnimal1].fotograma==9){
		animales[selAnimal1].fotograma=5;	
	}
	
	if(animales[selAnimal2].fotograma==4){
		animales[selAnimal2].fotograma=0;
	}
	if(animales[selAnimal2].fotograma==9){
		animales[selAnimal2].fotograma=5;	
	}
	
	if(pos_x < -650){
		pos_x = 0;	
	}
	
	if(animales[selAnimal1].x > 650 || animales[selAnimal1].x < -150){
		selAnimal1 = Math.floor(Math.random()*2); 
		while(selAnimal1==selAnimal2){
			selAnimal1 = Math.floor(Math.random()*2); 
		}
		if(selAnimal1==0){
			animales[0] = new Animal("elefante");
		}else if(selAnimal1==1){
			animales[1] = new Animal("leopardo");
		}
		
	}
	
	if(animales[selAnimal2].x > 650 || animales[selAnimal2].x < -150){
		selAnimal2 = Math.floor(Math.random()*2); 
		while(selAnimal1==selAnimal2){
			selAnimal2 = Math.floor(Math.random()*2); 
		}
		if(selAnimal2==0){
			animales[0] = new Animal("elefante");
		}else if(selAnimal2==1){
			animales[1] = new Animal("leopardo");
		}
		
	}
	
	ctx.restore();
	setTimeout(anima, 1);		
	
	
}

function Animal(name){
	this.nombre= name;
	this.fotograma=0;
	this.direccion = Math.floor(Math.random()*2);
	
	if(this.direccion==0){
		this.fotograma=5;
		this.x=-10;
		this.y = Math.floor(Math.random()*110)+80;
	}else if(this.direccion==1){
		this.fotograma = 0;	
		this.y = Math.floor(Math.random()*110)+80;
		this.x=650;
		
	}
	
	
	this.aparecer = true;
	this.imagenes = [];
	for(var i=0; i<5; i++){
		this.imagenes[i] = new Image();
		this.imagenes[i].src = "img/"+this.nombre+"/"+this.nombre+"-derecha"+i+".png";
	}
	for(var i=5; i<10; i++){
		this.imagenes[i] = new Image();
		this.imagenes[i].src = "img/"+this.nombre+"/"+this.nombre+"-izquierda"+(i-5)+".png";
	}
	this.drawAnimal = function(){
		ctx.drawImage(this.imagenes[this.fotograma], this.x, this.y);	
	}
}

window.onload = function(){
	img = new Image();
	img.src = 'img/fondo.jpg';
	imgTree = new Image();
	imgTree.src = "img/tree.png";
	animales[0] = new Animal("elefante");
	animales[1] = new Animal("leopardo");
	cnv = document.getElementById("lienzo");
	ctx = cnv.getContext("2d");			
	anima();	
}; */