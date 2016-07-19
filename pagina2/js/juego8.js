var canvasPrincipal = document.getElementById("canvasPrincipal");
var contextoPrincipal = canvasPrincipal.getContext("2d");

var canvasFinal = document.getElementById("canvasFinal");
var contextoFinal = canvasFinal.getContext("2d");

canvasPrincipal.addEventListener("mousemove", movimientoPrincipal, false);
canvasPrincipal.addEventListener("click", clickPrincipal, false);
var posicionPX, posicionPY;

canvasFinal.addEventListener("mousemove", movimientoFinal, false);
canvasFinal.addEventListener("click", clickFinal, false);
var posicionFX, posicionFY;


function movimientoFinal(e){
	posicionFX = e.pageX - canvasFinal.offsetLeft;
	posicionFY = e.pageY - canvasFinal.offsetTop;	
}

function clickFinal(e){
	if(posicionFX>275 && posicionFX<375 && posicionFY>150 && posicionFY<250){
		puntaje=0;
		correctas=0;
		incorrectas=0;
		canvasFinal.style.display = "none";
		init();
	}
}

function movimientoPrincipal(e){
	posicionPX = e.pageX - canvasPrincipal.offsetLeft;
	posicionPY = e.pageY - canvasPrincipal.offsetTop;	
}

function clickPrincipal(e){
	if(posicionPX > 70 && posicionPX < 170 && posicionPY > 190 &&  posicionPY < 290 && posicionCorrecta==1){
		correctas++;
		init();
	}else if(posicionPX > 250 && posicionPX < 350 && posicionPY > 190 &&  posicionPY < 290 && posicionCorrecta==2){
		correctas++;
		init();
	}else if(posicionPX > 430 && posicionPX < 530 && posicionPY > 190 &&  posicionPY < 290 && posicionCorrecta==3){
		correctas++;
		init();
	}else if(posicionPX > 70 && posicionPX < 170 && posicionPY > 190 &&  posicionPY < 290){
		incorrectas++;
		init();
	}else if(posicionPX > 250 && posicionPX < 350 && posicionPY > 190 &&  posicionPY < 290){
		incorrectas++;
		init();
	}else if(posicionPX > 430 && posicionPX < 530 && posicionPY > 190 &&  posicionPY < 290){
		incorrectas++;
		init();
	}
}

var requestAnimFrame = 	window.requestAnimationFrame || 
					   	window.webkitRequestAnimationFrame ||
						window.mozRequestAnimationFrame ||
						window.msRequestAnimationFrame ||
						window.oRequestAnimationFrame  ||
						function(callback){
							window.setTimeout(callback, 1000/60);	
						};

var imagenFondo = new Image();
imagenFondo.src = "img/fondo.png";

var imagenFinal = new Image();
imagenFinal.src = "img/pantallaFinal.png";

imagenFondo.addEventListener("load", init, false);

var listaImagenes = new Array();
var listaPreguntas = new Array();
var preguntaSel=0;
var imagenSel=0;
var posicionCorrecta;
var correctas=0;
var incorrectas =0;
var puntaje=0;

function init(){
	pintarPrincipal();
	llenarImagenes();
	llenarPreguntas();
	cargarPregunta();
	if((correctas+incorrectas)==10){
		dibujarPantallaFinal();
	}
	if(correctas>0 || incorrectas>0){
		puntaje = Math.floor(((correctas/(correctas+incorrectas))*100));	
	}
	mostrarPuntaje();
	loop();	
}

function mostrarPuntaje(){
	//contextoPrincipal.clearRect(590, 0, 160, 30);
	contextoPrincipal.font="24px Georgia";
	contextoPrincipal.fillStyle = "#FFF";
	contextoPrincipal.fillText("Puntaje: "+puntaje+"%", 490, 25);	
}

function dibujarPantallaFinal(){
	canvasFinal.style.display="block";
	contextoFinal.clearRect(0, 0, 650, 300);
	contextoFinal.drawImage(imagenFinal, 0,0,650,300,0,0,650,300);	
	contextoFinal.font="36px Georgia";
	contextoFinal.fillStyle = "#000";
	contextoFinal.fillText("Tu Puntaje: "+puntaje+"%", 200, 140);
	
}

function pintarPrincipal(){
	contextoPrincipal.clearRect(0,0, 650, 300);
	contextoPrincipal.drawImage(imagenFondo, 0,0, 650, 300, 0,0, 650, 400);	
}

function llenarPreguntas(){
	listaPreguntas[0] = new Pregunta("Figura geométrica que solo contiene un lado y que es semejante a un balon.", "circulo");
	listaPreguntas[1] = new Pregunta("Figura geométrica de tres lados y que es semejante a una piramide vista desde una cara.", "triangulo");
	listaPreguntas[2] = new Pregunta("Figura geométrica con 4 lados iguales.", "cuadrado");
	listaPreguntas[3]  = new Pregunta("Busca entre las imágenes un cilindro", "cilindro");
	listaPreguntas[4]  = new Pregunta("Busca entre las imágenes un circulo", "circulo");
	listaPreguntas[5]  = new Pregunta("Busca entre las imágenes un cono", "cono");
	listaPreguntas[6]  = new Pregunta("Busca entre las imágenes un cuadrado", "cuadrado");
	listaPreguntas[7]  = new Pregunta("Busca entre las imágenes un cubo", "cubo");
	listaPreguntas[8]  = new Pregunta("Busca entre las imágenes un heptagono", "heptagono");
	listaPreguntas[9]  = new Pregunta("Busca entre las imágenes un hexagono", "hexagono");
	listaPreguntas[10]  = new Pregunta("Busca entre las imágenes un octagono", "octagono");
	listaPreguntas[11]  = new Pregunta("Busca entre las imágenes un ovalo", "ovalo");
	listaPreguntas[12]  = new Pregunta("Busca entre las imágenes un pentagono", "pentagono");
	listaPreguntas[13]  = new Pregunta("Busca entre las imágenes un piramide", "piramide");
	listaPreguntas[14]  = new Pregunta("Busca entre las imágenes un prisma", "prisma");
	listaPreguntas[15]  = new Pregunta("Busca entre las imágenes un rectangulo", "rectangulo");
	listaPreguntas[16]  = new Pregunta("Busca entre las imágenes un trapecio", "trapecio");
	listaPreguntas[17]  = new Pregunta("Busca entre las imágenes un triangulo", "triangulo");
	
}

function llenarImagenes(){
	listaImagenes[0] = new Imagen("cilindro");
	listaImagenes[1] = new Imagen("circulo");
	listaImagenes[2] = new Imagen("cono");
	listaImagenes[3] = new Imagen("cuadrado");
	listaImagenes[4] = new Imagen("cubo");
	listaImagenes[5] = new Imagen("heptagono");
	listaImagenes[6] = new Imagen("hexagono");
	listaImagenes[7] = new Imagen("octagono");
	listaImagenes[8] = new Imagen("ovalo");
	listaImagenes[9] = new Imagen("pentagono");
	listaImagenes[10] = new Imagen("piramide");
	listaImagenes[11] = new Imagen("prisma");
	listaImagenes[12] = new Imagen("rectangulo");
	listaImagenes[13] = new Imagen("trapecio");
	listaImagenes[14] = new Imagen("triangulo");
}

function cargarPregunta(){
	preguntaSel = Math.floor(Math.random() * (listaPreguntas.length));
	imagenSel = buscarImagenPregunta();
	contextoPrincipal.font="24px Georgia";
	contextoPrincipal.fillStyle = "#000";
	contextoPrincipal.fillText(listaPreguntas[preguntaSel].pregunta, 80, 120, 480);
	llenarImagenRespuestas();
}

function llenarImagenRespuestas(){
	posicionCorrecta = Math.floor(Math.random() * 3) + 1;
	
	var respuesta2 = Math.floor(Math.random() * (listaImagenes.length));
	while(respuesta2 == imagenSel){
		respuesta2 = Math.floor(Math.random() * (listaImagenes.length));
	}
	
	var respuesta3 = Math.floor(Math.random() * (listaImagenes.length));
	while(respuesta3 == imagenSel || respuesta3 == respuesta2){
		respuesta3 = Math.floor(Math.random() * (listaImagenes.length));
	}
	
	if(posicionCorrecta == 1){
		contextoPrincipal.drawImage(listaImagenes[imagenSel].image, 0,0, 100,100, 80, 190, 100, 100);
		contextoPrincipal.drawImage(listaImagenes[respuesta2].image, 0,0, 100,100, 275, 190, 100, 100);
		contextoPrincipal.drawImage(listaImagenes[respuesta3].image, 0,0, 100,100, 460, 190, 100, 100);
	}else if(posicionCorrecta == 2){
		contextoPrincipal.drawImage(listaImagenes[respuesta2].image, 0,0, 100,100, 80, 190, 100, 100);
		contextoPrincipal.drawImage(listaImagenes[imagenSel].image, 0,0, 100,100, 275, 190, 100, 100);
		contextoPrincipal.drawImage(listaImagenes[respuesta3].image, 0,0, 100,100, 460, 190, 100, 100);
	}else if(posicionCorrecta == 3){
		contextoPrincipal.drawImage(listaImagenes[respuesta2].image, 0,0, 100,100, 80, 190, 100, 100);
		contextoPrincipal.drawImage(listaImagenes[respuesta3].image, 0,0, 100,100, 275, 190, 100, 100);
		contextoPrincipal.drawImage(listaImagenes[imagenSel].image, 0,0, 100,100, 460, 190, 100, 100);
	}	
}

function buscarImagenPregunta(){
	for(var i = 0; i<listaImagenes.length; i++){
		if(listaImagenes[i].nombre == listaPreguntas[preguntaSel].respuesta){
			return i;	
		}
	}	
}

function loop(){
	requestAnimFrame(loop);		
}




function Pregunta(pregunta, respuesta){
	this.pregunta = pregunta;
	this.respuesta = respuesta;
}

function Imagen(nombre){
	this.nombre = nombre;
	this.srcX = 0;
	this.srcY = 0;
	this.width = 100;
	this.height = 100;
	this.drawX = 0;
	this.drawY = 0;
	this.image = new Image();
	this.image.src = "img/"+this.nombre+".png";
}