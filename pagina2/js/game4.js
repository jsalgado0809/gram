(function(){
    'use strict';
    window.addEventListener('load',init,false);
    var MAX=10;
	var rmanzana=30;
	ParticleSystem.prototype=[];
	var nivel=0.00005;    
    var canvas=null,ctx=null;
    var lastPress=null;var nivel=0.02;
    var lastRelease=null;
    var mousex=0,mousey=0;
    var dragging=null;
	var aTimer=0;
    var time=0;
    var player=new Circle(0,0,0);
    var draggables=[];
	    var numeros=[];
	var spritesheet=new Image();
	var spritesnumber=new Image();
	var dialogo= new Circle(325, 140,0);
	var idialogo= new Image();
	var botonBack=new  Circle(650-75,30,25);
	var ibotonBack= new Image();
	var botonRefresh=new Circle(650-25,30,25);
	var rotulo= new Circle(325, 110,120);
	var ibotonrefresh=new Image();
	var inumero=new Image();
	var irotulo =new Image();
	var imanzana= new Image();
	var ArrayFigura=[];
	var ArrayI=[];
	var ArrayObjetos = [];
	var ArrayCC=[];
	//var vnumero= new Circle(100, 100,18);
	var mrandom=0;
	var respuesta=false;
	var respuesta2=false;
        var impVerificacion=false;
        var impResultado=false;
	var background= new Image();
        var iwin= new Image();
        var win= new Circle(325,150,120);
        var ifondoR1 = new Image();
        var fondoR1 = new Rectangle(-325,0,325,300);// simular puerta izquierda
        var ifondoR2 = new Image();
        var fondoR2 = new Rectangle(650,0,325,300);//simular puerta derecha
        var ilose = new Image();
        var renable = false;
        var botonNext = new Circle(325-13,260,40);
        var inext = new Image();
		var ps=new ParticleSystem();
		var radios=[];
		var relegido;
		var radios2=[];
		var correcta=false;
		var burbuja = new Rectangle(50,300,550,100);
		var iburbuja = new Image();
		iburbuja.src= 'assets/burbuja.png';
var iuso=new Image();

function cargarFigura(object,max){

for(var i = 0;i<max;i++){
ArrayFigura.push('./assets/rompecabezasA/'+object+'/'+i+'.png');
ArrayI.push(new Image());
ArrayI[i].src=ArrayFigura[i];
}



}

function cargarG2(){
ArrayCC.push(new punto(0,0));
ArrayCC.push(new punto(0,0));
ArrayCC.push(new punto(12,18));
ArrayCC.push(new punto(3,1));
ArrayCC.push(new punto(58,72));
ArrayCC.push(new punto(50,94));
ArrayCC.push(new punto(65,98));
ArrayCC.push(new punto(84,103));
ArrayCC.push(new punto(96,91));
ArrayCC.push(new punto(98,31));
}

function validarRespuesta(dragging){
if(ArrayCC.lenght==0)
return false;
for(var i=2;i<ArrayCC.lenght;i++){
	var sx=	ArrayObjetos[i].x -ArrayObjetos[0].x;
	var sy=	ArrayObjetos[i].y-ArrayObjetos[0].y;
	//if((ArrayCC[i].x +5>sx && ArrayCC[i].x - 5 <sx)){
	if(ArrayCC[i].x==sx){
	}
	else
		return false;
		
	
}
return true;
}

function distribucionP1(){ // GUAF
radios.push(256);
radios.push(256);
radios.push(152);
radios.push(108);
radios.push(226);
radios.push(38);
radios.push(56);
radios.push(45);
radios.push(58);
radios.push(81);

radios2.push(256);
radios2.push(256);
radios2.push(144);
radios2.push(27);
radios2.push(135);
radios2.push(51);
radios2.push(86);
radios2.push(63);
radios2.push(70);
radios2.push(80);
ArrayObjetos.push(new Rectangle(canvas.width/2-radios[0]/4,canvas.height/2-radios[0]/4,radios[0]/2,radios[0]/2));
ArrayObjetos.push(new Rectangle(0,canvas.height/2-radios[0]/4,radios[0]/2,radios[0]/2));
for(var i=2;i<ArrayFigura.length;i++){
 var posicionx=random2(64,canvas.width-64);
            var posiciony=random(250);

ArrayObjetos.push(new Rectangle(posicionx,posiciony,radios[i]/2,radios2[i]/2));

}

}

function distribucionP2(){
radios.push(256);
radios.push(256);
radios.push(91);
radios.push(58);
radios.push(171);
radios.push(28);
radios.push(54);
radios.push(29);
radios.push(66);
radios.push(87);

radios2.push(256);
radios2.push(256);
radios2.push(65);
radios2.push(29);
radios2.push(145);
radios2.push(29);
radios2.push(66);
radios2.push(43);
radios2.push(80);
radios2.push(70);
ArrayObjetos.push(new Rectangle(canvas.width/2-radios[0]/4,canvas.height/2-radios[0]/4,radios[0]/2,radios[0]/2));
ArrayObjetos.push(new Rectangle(0,canvas.height/2-radios[0]/4,radios[0]/2,radios[0]/2));
for(var i=2;i<ArrayFigura.length;i++){
 var posicionx=random2(64,canvas.width-64);
            var posiciony=random(250);

ArrayObjetos.push(new Rectangle(posicionx,posiciony,radios[i]/2,radios2[i]/2));

}
}

function distribucionP3(){
radios.push(256);
radios.push(256);
radios.push(167);
radios.push(218);
radios.push(206);
radios.push(56);
radios.push(58);
radios.push(45);
radios.push(34);
radios.push(36);

radios2.push(256);
radios2.push(256);
radios2.push(164);
radios2.push(106);
radios2.push(108);
radios2.push(76);
radios2.push(73);
radios2.push(66);
radios2.push(45);
radios2.push(45);
ArrayObjetos.push(new Rectangle(canvas.width/2-radios[0]/4,canvas.height/2-radios[0]/4,radios[0]/2,radios[0]/2));
ArrayObjetos.push(new Rectangle(0,canvas.height/2-radios[0]/4,radios[0]/2,radios[0]/2));
for(var i=2;i<ArrayFigura.length;i++){
 var posicionx=random2(64,canvas.width-64);
            var posiciony=random(250);

ArrayObjetos.push(new Rectangle(posicionx,posiciony,radios[i]/2,radios2[i]/2));

}
}

function distribucionP4(){
radios.push(256);
radios.push(256);
radios.push(197);
radios.push(134);
radios.push(155);
radios.push(52);
radios.push(57);
radios.push(44);
radios.push(31);
radios.push(73);

radios2.push(256);
radios2.push(256);
radios2.push(185);
radios2.push(51);
radios2.push(85);
radios2.push(69);
radios2.push(100);
radios2.push(65);
radios2.push(37);
radios2.push(85);
ArrayObjetos.push(new Rectangle(canvas.width/2-radios[0]/4,canvas.height/2-radios[0]/4,radios[0]/2,radios[0]/2));
ArrayObjetos.push(new Rectangle(0,canvas.height/2-radios[0]/4,radios[0]/2,radios[0]/2));
for(var i=2;i<ArrayFigura.length;i++){
 var posicionx=random2(radios[0]/2,canvas.width-radios[0]/2);
            var posiciony=random(canvas.height-radios2[i]/2);

ArrayObjetos.push(new Rectangle(posicionx,posiciony,radios[i]/2,radios2[i]/2));

}
}

function distribucionG1(){
radios.push(256);
radios.push(256);
radios.push(126);
radios.push(87);
radios.push(89);
radios.push(27);
radios.push(50);
radios.push(22);
radios.push(46);
radios.push(47);

radios2.push(256);
radios2.push(256);
radios2.push(128);
radios2.push(41);
radios2.push(78);
radios2.push(24);
radios2.push(51);
radios2.push(33);
radios2.push(56);
radios2.push(87);
ArrayObjetos.push(new Rectangle(canvas.width/2-radios[0]/4,canvas.height/2-radios[0]/4,radios[0]/2,radios[0]/2));
ArrayObjetos.push(new Rectangle(0,canvas.height/2-radios[0]/4,radios[0]/2,radios[0]/2));
for(var i=2;i<ArrayFigura.length;i++){
 var posicionx=random2(radios[0]/2,canvas.width-radios[0]/2);
            var posiciony=random(canvas.height-radios2[i]/2);

ArrayObjetos.push(new Rectangle(posicionx,posiciony,radios[i]/2,radios2[i]/2));

}
}

function distribucionG2(){
radios.push(256);
radios.push(256);
radios.push(147);
radios.push(151);
radios.push(101);
radios.push(36);
radios.push(37);
radios.push(24);
radios.push(61);
radios.push(60);

radios2.push(256);
radios2.push(256);
radios2.push(135);
radios2.push(105);
radios2.push(64);
radios2.push(52);
radios2.push(60);
radios2.push(30);
radios2.push(58);
radios2.push(99);
ArrayObjetos.push(new Rectangle(canvas.width/2-radios[0]/4,canvas.height/2-radios[0]/4,radios[0]/2,radios[0]/2));
ArrayObjetos.push(new Rectangle(0,canvas.height/2-radios[0]/4,radios[0]/2,radios[0]/2));
for(var i=2;i<ArrayFigura.length;i++){
 var posicionx=random2(radios[0]/2,canvas.width-radios[0]/2);
            var posiciony=random(canvas.height-radios2[i]/2);

ArrayObjetos.push(new Rectangle(posicionx,posiciony,radios[i]/2,radios2[i]/2));

}
cargarG2();
}

function distribucionG3(){
radios.push(256);
radios.push(256);
radios.push(61);
radios.push(55);
radios.push(144);
radios.push(43);
radios.push(34);
radios.push(42);
radios.push(81);
radios.push(84);

radios2.push(256);
radios2.push(256);
radios2.push(65);
radios2.push(40);
radios2.push(94);
radios2.push(94);
radios2.push(91);
radios2.push(83);
radios2.push(126);
radios2.push(111);
ArrayObjetos.push(new Rectangle(canvas.width/2-radios[0]/4,canvas.height/2-radios[0]/4,radios[0]/2,radios[0]/2));
ArrayObjetos.push(new Rectangle(0,canvas.height/2-radios[0]/4,radios[0]/2,radios[0]/2));
for(var i=2;i<ArrayFigura.length;i++){
 var posicionx=random2(radios[0]/2,canvas.width-radios[0]/2);
            var posiciony=random(canvas.height-radios2[i]/2);

ArrayObjetos.push(new Rectangle(posicionx,posiciony,radios[i]/2,radios2[i]/2));

}
}

function distribucionO1(){
radios.push(256);
radios.push(256);
radios.push(60);
radios.push(31);
radios.push(190);
radios.push(111);
//radios.push(60);// pata 5
//radios.push(80);// pata 6
radios.push(73);
//radios.push(32);// pata 7
//radios.push(63);// pata 8


radios2.push(256);
radios2.push(256);
radios2.push(80);
radios2.push(35);
radios2.push(159);
radios2.push(131);
//radios.push(104);// pata 5
//radios.push(130);// pata 6
radios2.push(85);
//radios.push(61);// pata 7
//radios.push(87);// pata 8

ArrayObjetos.push(new Rectangle(canvas.width/2-radios[0]/4,canvas.height/2-radios[0]/4,radios[0]/2,radios[0]/2));
ArrayObjetos.push(new Rectangle(0,canvas.height/2-radios[0]/4,radios[0]/2,radios[0]/2));
for(var i=2;i<ArrayFigura.length;i++){
 var posicionx=random2(radios[0]/2,canvas.width-radios[0]/2);
            var posiciony=random(canvas.height-radios2[i]/2);

ArrayObjetos.push(new Rectangle(posicionx,posiciony,radios[i]/2,radios2[i]/2));

}
}

function distribucionO2(){
radios.push(256);
radios.push(256);
radios.push(87);
radios.push(84);
radios.push(220);
radios.push(85);
//radios.push(44);// pata 5
//radios.push(48);// pata 6
radios.push(86);
//radios.push(34);// pata 7
//radios.push(85);// pata 8


radios2.push(256);
radios2.push(256);
radios2.push(123);
radios2.push(31);
radios2.push(195);
radios2.push(97);
//radios.push(92);// pata 5
//radios.push(88);// pata 6
radios2.push(140);
//radios.push(62);// pata 7
//radios.push(139);// pata 8

ArrayObjetos.push(new Rectangle(canvas.width/2-radios[0]/4,canvas.height/2-radios[0]/4,radios[0]/2,radios[0]/2));
ArrayObjetos.push(new Rectangle(0,canvas.height/2-radios[0]/4,radios[0]/2,radios[0]/2));
for(var i=2;i<ArrayFigura.length;i++){
 var posicionx=random2(radios[0]/2,canvas.width-radios[0]/2);
            var posiciony=random(canvas.height-radios2[i]/2);

ArrayObjetos.push(new Rectangle(posicionx,posiciony,radios[i]/2,radios2[i]/2));

}
}

function distribucionO3(){
radios.push(256);
radios.push(256);
radios.push(94);
radios.push(95);
radios.push(206);
radios.push(79);
//radios.push(36);// pata 5
//radios.push(56);// pata 6
radios.push(88);
//radios.push(33);// pata 7
//radios.push(75);// pata 8


radios2.push(256);
radios2.push(256);
radios2.push(116);
radios2.push(58);
radios2.push(173);
radios2.push(121);
//radios.push(91);// pata 5
//radios.push(122);// pata 6
radios2.push(176);
//radios.push(69);// pata 7
//radios.push(176);// pata 8

ArrayObjetos.push(new Rectangle(canvas.width/2-radios[0]/4,canvas.height/2-radios[0]/4,radios[0]/2,radios[0]/2));
ArrayObjetos.push(new Rectangle(0,canvas.height/2-radios[0]/4,radios[0]/2,radios[0]/2));
for(var i=2;i<ArrayFigura.length;i++){
 var posicionx=random2(radios[0]/2,canvas.width-radios[0]/2);
            var posiciony=random(canvas.height-radios2[i]/2);

ArrayObjetos.push(new Rectangle(posicionx,posiciony,radios[i]/2,radios2[i]/2));

}
}

function distribucionV1(){
radios.push(256);
radios.push(256);
radios.push(112);
radios.push(126);
radios.push(71);
radios.push(119);
radios.push(102);
radios.push(49);
radios.push(128);
radios.push(46);

radios2.push(256);
radios2.push(256);
radios2.push(138);
radios2.push(24);
radios2.push(28);
radios2.push(82);
radios2.push(84);
radios2.push(28);
radios2.push(79);
radios2.push(59);
ArrayObjetos.push(new Rectangle(canvas.width/2-radios[0]/4,canvas.height/2-radios[0]/4,radios[0]/2,radios[0]/2));
ArrayObjetos.push(new Rectangle(0,canvas.height/2-radios[0]/4,radios[0]/2,radios[0]/2));
for(var i=2;i<ArrayFigura.length;i++){
 var posicionx=random2(radios[0]/2,canvas.width-radios[0]/2);
            var posiciony=random(canvas.height-radios2[i]/2);

ArrayObjetos.push(new Rectangle(posicionx,posiciony,radios[i]/2,radios2[i]/2));

}
}

function distribucionV2(){
radios.push(256);
radios.push(256);
radios.push(123);
radios.push(179);
radios.push(118);
radios.push(69);
radios.push(78);
radios.push(50);
radios.push(187);
radios.push(31);

radios2.push(256);
radios2.push(256);
radios2.push(142);
radios2.push(36);
radios2.push(45);
radios2.push(77);
radios2.push(79);
radios2.push(30);
radios2.push(139);
radios2.push(50);
ArrayObjetos.push(new Rectangle(canvas.width/2-radios[0]/4,canvas.height/2-radios[0]/4,radios[0]/2,radios[0]/2));
ArrayObjetos.push(new Rectangle(0,canvas.height/2-radios[0]/4,radios[0]/2,radios[0]/2));
for(var i=2;i<ArrayFigura.length;i++){
 var posicionx=random2(radios[0]/2,canvas.width-radios[0]/2);
            var posiciony=random(canvas.height-radios2[i]/2);

ArrayObjetos.push(new Rectangle(posicionx,posiciony,radios[i]/2,radios2[i]/2));

}
}

function distribucionV3(){
radios.push(256);
radios.push(256);
radios.push(115);
radios.push(119);
radios.push(64);
radios.push(70);
radios.push(61);
radios.push(40);
radios.push(154);
radios.push(44);

radios2.push(256);
radios2.push(256);
radios2.push(170);
radios2.push(80);
radios2.push(65);
radios2.push(86);
radios2.push(75);
radios2.push(36);
radios2.push(133);
radios2.push(92);
ArrayObjetos.push(new Rectangle(canvas.width/2-radios[0]/4,canvas.height/2-radios[0]/4,radios[0]/2,radios[0]/2));
ArrayObjetos.push(new Rectangle(0,canvas.height/2-radios[0]/4,radios[0]/2,radios[0]/2));
for(var i=2;i<ArrayFigura.length;i++){
 var posicionx=random2(radios[0]/2,canvas.width-radios[0]/2);
            var posiciony=random(canvas.height-radios2[i]/2);

ArrayObjetos.push(new Rectangle(posicionx,posiciony,radios[i]/2,radios2[i]/2));

}
}

function distribucionV4(){
radios.push(256); 
radios.push(256);
radios.push(134);
radios.push(100);
radios.push(51);
radios.push(36);
radios.push(64);
radios.push(36);
radios.push(123);
radios.push(27);

radios2.push(256);
radios2.push(256);
radios2.push(142);
radios2.push(26);
radios2.push(39);
radios2.push(72);
radios2.push(65);
radios2.push(34);
radios2.push(135);
radios2.push(91);
ArrayObjetos.push(new Rectangle(canvas.width/2-radios[0]/4,canvas.height/2-radios[0]/4,radios[0]/2,radios[0]/2));
ArrayObjetos.push(new Rectangle(0,canvas.height/2-radios[0]/4,radios[0]/2,radios[0]/2));
for(var i=2;i<ArrayFigura.length;i++){
 var posicionx=random2(radios[0]/2,canvas.width-radios[0]/2);
            var posiciony=random(canvas.height-radios2[i]/2);

ArrayObjetos.push(new Rectangle(posicionx,posiciony,radios[i]/2,radios2[i]/2));

}
}



function CargarI(ctx){
ctx.fillStyle='#000';
ctx.fillRect(0,0,canvas.width,canvas.height);
        inext.src = 'assets/next.png';
        ilose.src = 'assets/lose.png';
        ifondoR1.src='assets/puerta3.png';
        ifondoR2.src='assets/puerta4.png';
        iwin.src='assets/gano4.png';
	inumero.src='assets/answershow2.png';
	irotulo.src='./assets/rotulo2.png';
	idialogo.src='./assets/dialogo3.png';
	imanzana.src='./assets/apple.png';
	ibotonBack.src='./assets/Back2.png';
	ibotonrefresh.src='./assets/view_refresh.png';
	spritesheet.src='assets/draganddrop.png';
	spritesnumber.src='assets/spritenumber.png';
	//background.src='./assets/fondo2.jpg';
}
    function init(){
        canvas=document.getElementById('canvas');
        ctx=canvas.getContext('2d');
        canvas.width=650;
        canvas.height=300;
	
reset();

        enableInputs();
        run();
    }
	function verificar(temp){
	for(var i=0;i<draggables.length;i++){
	if(draggables[i].distance(temp)<=0)
	return false;
	}
	return true;
	}
	
	
	function verificarm(temp){
	for(var i=0;i<draggables.length;i++)
	{
	if(draggables[i].distance(temp)<=0)
	return false;
	}
	return true;
	}
	

        
        


	function reset(){  // RESETTTTT
            botonNext.enable=false;
         iuso=irotulo;
        renable = false;
impVerificacion=false;
//aumentarnivel();
	fondoR1.x=-325;
        fondoR2.x=650;
	aTimer=0;
dialogo.radius=aTimer*2;
	respuesta=false;
	respuesta2=false;
	
mrandom=random2(1,MAX);

	CargarI(ctx);
	radios=[];
	radios2=[];
		ArrayFigura=[];
 ArrayI=[];
ArrayObjetos = [];
ArrayCC= [];
 var relegidoA=random2(1,5);
 if(relegidoA ==1){
		relegido=random2(1,5);
		cargarFigura('perro'+relegido,10);
	if(relegido==1){
distribucionP1();
	}
		if(relegido==2){
		
		distribucionP2();}
			if(relegido==3){
			distribucionP3();
			}
				if(relegido==4){
				distribucionP4();
				}
 }
 if(relegidoA ==2){
		relegido=random2(1,4);
		cargarFigura('gato'+relegido,10);
	if(relegido==1){
distribucionG1();
	}
		if(relegido==2){
		
		distribucionG2();}
			if(relegido==3){
			distribucionG3();
			}
				if(relegido==4){
				distribucionG4();
				}
 }
  if(relegidoA ==3){
		relegido=random2(1,5);
		cargarFigura('vaca'+relegido,10);
	if(relegido==1){
distribucionV1();
	}
		if(relegido==2){
		
		distribucionV2();}
			if(relegido==3){
			distribucionV3();
			}
				if(relegido==4){
				distribucionV4();
				}
 }
 
   if(relegidoA ==4){
		relegido=random2(1,4);
		cargarFigura('oso'+relegido,7);
	if(relegido==1){
distribucionO1();
	}
		if(relegido==2){
		distribucionO2();}
			if(relegido==3){
			distribucionO3();
			}

 }
	
	}
	
    function random(max){
        return ~~(Math.random()*max);
    }
	function random2(min,max){
	 var valor = ~~(Math.random()*max);
	 if(valor<min)
        return (random2(min,max));
		return valor;
    }
    	function random3(min,max,no){
	 var valor = ~~(Math.random()*max);
	 if(valor<min||valor==no)
        return (random3(min,max,no));
		return valor;
    }
    	function random4(min,max,no,no2){
	 var valor = ~~(Math.random()*max);
	 if(valor<min||valor==no||valor==no2)
        return (random4(min,max,no,no2));
		return valor;
    }

     function run(){
        requestAnimationFrame(run);
            
        var now=Date.now();
        var deltaTime=now-time;
        if(deltaTime>1000)deltaTime=0;
        time=now;
        
        act(deltaTime);
        paint();
    }

    function act(deltaTime){
        
		player.x=mousex;
        player.y=mousey;

        if(player.x<0)
            player.x=0;
        if(player.x>canvas.width)
            player.x=canvas.width;
        if(player.y<0)
            player.y=0;
        if(player.y>canvas.height)
            player.y=canvas.height;


        if(lastPress==1){
		   if(burbuja.y>225)
		burbuja.y=225;
		

         
		if(player.distance(botonRefresh)<=0 ){
	
	reset();
	}
	if(player.distance(botonBack)<=0){
	window.location="./index.html"
	}
        if(player.distance(botonNext)<=0 && botonNext.enable){
         aumentarnivel();
          reset(); 
        }
         
		
			 for(var l=ArrayObjetos.length-1;l>1;l--){
                if(ArrayObjetos[l].ispressed(player)){
                    dragging=l;
							correcta=validarRespuesta(dragging);
                    break;
                }
            }
        }
        else if(lastRelease==1)
            dragging=null;
        if(burbuja.y<300)
		burbuja.y=300;
  
	
	        if(dragging!=null){
            ArrayObjetos[dragging].x=player.x-ArrayObjetos[dragging].width/2;
            ArrayObjetos[dragging].y=player.y-ArrayObjetos[dragging].height/2;
        }
	
     
           var color='rgb('+random(255)+','+random(255)+','+random(255)+')';

			  ps.push(new Particle(random(canvas.width),random(canvas.height),1,500+random(500),random(100),random(360),color));
        ps.move(deltaTime);
		


    }
		function pperro1(ctx){
				for(var i=0;i<ArrayObjetos.length;i++){
					ArrayObjetos[i].drawImageArea(ctx,ArrayI[i],0,0,ArrayI[i].width,ArrayI[i].height);
				}
	}
	
		function pperro12(ctx){
				for(var i=0;i<10;i++){
					ArrayObjetos[i].drawImageArea(ctx,ArrayI[i],0,0,radios[i],radios2[i]);
				}
	}
	
    function paint(){
	
  if(background.width){
            ctx.drawImage(background,0,0);
        }
        else{
      ctx.fillStyle='#000';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        }
		
		
		
 ctx.fillStyle='#0fc';

        ctx.fillStyle='#0f0';

	 ps.fill(ctx);
        ctx.fillStyle='#fff';

        botonBack.drawImageArea1(ctx,ibotonBack,0,0,128,128);
        botonRefresh.drawImageArea1(ctx,ibotonrefresh,5,5,123,123);
		pperro1(ctx);

	   lastPress=null;
        lastRelease=null;
ctx.font='10px Verdana';
	ctx.fillStyle='#fff';
	    ctx.fillText("hghgh",0,10);
			burbuja.drawImageArea1(ctx,iburbuja,0,0,550,100);

    }

    function enableInputs(){
        document.addEventListener('mousemove',function(evt){
            mousex=evt.pageX-canvas.offsetLeft;
            mousey=evt.pageY-canvas.offsetTop;
        },false);
        document.addEventListener('mouseup',function(evt){
            lastRelease=evt.which;
        },false);
        canvas.addEventListener('mousedown',function(evt){
            evt.preventDefault();
            lastPress=evt.which;
        },false);
        canvas.addEventListener('touchmove',function(evt){
            evt.preventDefault();
            var t=evt.targetTouches;
            mousex=t[0].pageX-canvas.offsetLeft;
            mousey=t[0].pageY-canvas.offsetTop;
        },false);
        canvas.addEventListener('touchstart',function(evt){
            evt.preventDefault();
            lastPress=1;
            var t=evt.targetTouches;
            mousex=t[0].pageX-canvas.offsetLeft;
            mousey=t[0].pageY-canvas.offsetTop;
        },false);
        canvas.addEventListener('touchend',function(evt){
            lastRelease=1;
        },false);
        canvas.addEventListener('touchcancel',function(evt){
            lastRelease=1;
        },false);
    }

    function Rectangle(x,y,width,height){
        this.x=(x==null)?0:x;
        this.y=(y==null)?0:y;
        this.width=(width==null)?0:width;
        this.height=(height==null)?this.width:height;
		this.text=" ";

		this.drawImageArea1=function(ctx,img,sx,sy,sw,sh){
        if(img.width){
            ctx.drawImage(img,sx,sy,sw,sh,this.x,this.y,this.width,this.height);
			   ctx.fillStyle='#000';
						 ctx.font='25px Verdana';
  ctx.fillText(" "+this.text,this.x+50,this.y+50); 
       } 
    }
        this.intersects=function(rect){
            if(rect!=null){
                return(this.x<rect.x+rect.width&&
                    this.x+this.width>rect.x&&
                    this.y<rect.y+rect.height&&
                    this.y+this.height>rect.y);
            }
        }
        
        this.fill=function(ctx){
            ctx.fillRect(this.x,this.y,this.width,this.height);
        }
  
        this.drawImage=function(ctx,img){
            if(img.width)
                ctx.drawImage(img,this.x,this.y);
            else
                ctx.strokeRect(this.x,this.y,this.width,this.height);
        }
		this.ispressed=function(circle){
		if(circle.x>=this.x && circle.x < (this.x+this.width) && circle.y>this.y && circle.y+circle.radius<this.y+this.height )
		return true;
		return false;
		}
		
		this.drawImageArea=function(ctx,img,sx,sy,sw,sh){
        if(img.width)
            ctx.drawImage(img,sx,sy,sw,sh,this.x,this.y,this.width,this.height);
        else
            ctx.strokeRect(this.x,this.y,this.width,this.height);
    }
    }
	
	
    function Circle(x,y,radius){
        this.x=(x==null)?0:x;
        this.y=(y==null)?0:y;
        this.radius=(radius==null)?0:radius;
        this.enable=false;
 this.vx=0;
        this.vy=0;
        this.distance=function(circle){
            if(circle!=null){
                var dx=this.x-circle.x;
                var dy=this.y-circle.y;
                return (Math.sqrt(dx*dx+dy*dy)-(this.radius+circle.radius));
            }
        }
        this.valor=0;
        this.correcto=false;
        this.fill=function(ctx){
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
            ctx.fill();
        }
		this.drawImageArea1=function(ctx,img,sx,sy,sw,sh){
    ctx.drawImage(img,sx,sy,sw,sh,this.x-this.radius,this.y-this.radius,this.radius*2,this.radius*2);
    }
    }
	
	function punto(x,y){
	this.x=x;
	this.y=y;
	this.fill=function(ctx,x,y){
		ctx.fillStyle='#ccc';
	 ctx.fillText(this.x + '   ' + this.y,x,y);
	  
	}
	
	}
	   function setFullscreen(){
            var w=window.innerWidth/canvas.width;
            var h=window.innerHeight/canvas.height;
            var scale=Math.min(h,w);

            canvas.style.width=(canvas.width*scale)+'px';
            canvas.style.height=(canvas.height*scale)+'px';
            canvas.style.position='fixed';
            canvas.style.left='50%';
            canvas.style.top='50%';
            canvas.style.marginLeft=-(canvas.width*scale)/2+'px';
            canvas.style.marginTop=-(canvas.height*scale)/2+'px';
        }
		    function unsetFullscreen(){
            canvas.style.width='';
            canvas.style.height='';
            canvas.style.position='';
            canvas.style.left='';
            canvas.style.top='';
            canvas.style.marginLeft='';
            canvas.style.marginTop='';
        }

	
    function Particle(x,y,radius,life,speed,angle,color){
        this.x=(x==null)?0:x;
        this.y=(y==null)?0:y;
        this.radius=(radius==null)?1:radius;
        this.life=(life==null)?0:life;
        this.speed=(speed==null)?0:speed;
        this.angle=(angle==null)?0:angle;
        this.color=(color==null)?'#fff':color;
    }
    
    function ParticleSystem(){
        this.move=function(deltaTime){
            for(var i=0,l=this.length;i<l;i++){
                this[i].life-=deltaTime;
                if(this[i].life<0){
                    this.splice(i--,1);
                    l--;
                }
                else{
                    this[i].x+=Math.cos(this[i].angle)*this[i].speed*(deltaTime/1000);
                    this[i].y+=Math.sin(this[i].angle)*this[i].speed*(deltaTime/1000);
                }
            }
        }
        
        this.fill=function(ctx){
            for(var i=0,l=this.length;i<l;i++){
                ctx.fillStyle=this[i].color;
                ctx.beginPath();
                ctx.arc(this[i].x,this[i].y,this[i].radius,0,Math.PI*2,true);
                ctx.fill();
            }
        }
    }
	
	
    window.requestAnimationFrame=(function(){
        return window.requestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame || 
            function(callback){window.setTimeout(callback,17);};
    })();
})();