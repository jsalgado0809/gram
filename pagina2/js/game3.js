(function(){
    'use strict';
    window.addEventListener('load',init,false);
    var canvas=null,ctx=null;
    var lastPress=null;
    var lastRelease=null;
		var nivel=0.00005;  
    var mousex=0,mousey=0;
    var dragging=null;
	var aTimer=0;
    var time=0;
    var player=new Circle(0,0,0);
    var draggables=[];
	var spritesheet=new Image();
	var dialogo= new Circle(325, 150,0);
	var idialogo= new Image();
	var botonBack=new  Circle(650-80,24,24);
	var ibotonBack= new Image();
	var botonRefresh=new Circle(650-32,24,26);
	var ibotonrefresh=new Image();
	var icanasta= new Image();
	var irotulo =new Image();
	var activo;
		var rotulo= new Circle(325, 120,120);
		irotulo.src='./assets/rotulo2.png';
	var mrandom=0;
	var respuesta=false;
	var respuesta2=false;
	var background= new Image();
	var ArrayAnimales=[];
	var ArrayFondosAn = [];
	var tipoAnimal;
	var animalGanador;
	var ArrayAnimalI=[];
	var ArrayAnimalC=[];
		var correcto;
		var incorrecto;
			var iuso= new Image();
				  var botonNext = new Circle(325-13,260,40);
	  	var inext = new Image();
		var burbuja = new Rectangle(50,225,550,100);
		var iburbuja = new Image();
		iburbuja.src= 'assets/burbuja.png';
		 inext.src = 'assets/next.png';
	idialogo.src='./assets/dialogo3.png';
	icanasta.src='./assets/Canasta.png';
	ibotonBack.src='./assets/Back2.png';
	ibotonrefresh.src='./assets/view_refresh.png';
	spritesheet.src='assets/draganddrop.png';
	background.src='./assets/selva.png';
 var iwin= new Image();
      iwin.src='assets/gano4.png';
	  	var ilose = new Image();
		    ilose.src = 'assets/lose.png';
	  
	function llenarArrayAnimales(){
	
	
	//Animales de  selva

	ArrayAnimales.push('./assets/selva/cocodrilo.png');
	ArrayAnimales.push('./assets/selva/leon.png');
	ArrayAnimales.push('./assets/selva/oruga.png');
	ArrayAnimales.push('./assets/selva/hipopotamo.png');
	ArrayAnimales.push('./assets/selva/zorro.png');
	ArrayAnimales.push('./assets/selva/zebra.png');
	ArrayAnimales.push('./assets/selva/elefante.png');
		ArrayAnimales.push('./assets/selva/gorila.png');
	//Animales de granja

	ArrayAnimales.push('./assets/granja/gallina.png');
	ArrayAnimales.push('./assets/granja/cerdo.png');
	ArrayAnimales.push('./assets/granja/pollo.png');
	ArrayAnimales.push('./assets/granja/caballo.png');
	ArrayAnimales.push('./assets/granja/vaca.png');
	//animales domesticos
	ArrayAnimales.push('./assets/domestico/gato.png');
	ArrayAnimales.push('./assets/domestico/perro.png');
	ArrayAnimales.push('./assets/domestico/pez.png');
	ArrayAnimales.push('./assets/domestico/tortuga.png');
	//otros animales
	ArrayAnimales.push('./assets/abeja.png');
	ArrayAnimales.push('./assets/largatija.png');
	ArrayAnimales.push('./assets/caracol.png');
	ArrayFondosAn.push(new Image());
	ArrayFondosAn.push(new Image());
	ArrayFondosAn.push(new Image());
	ArrayFondosAn[0].src=('./assets/selva.png');
	ArrayFondosAn[1].src=('./assets/granja.png');
	ArrayFondosAn[2].src=('./assets/casa.png');
	
	}
	function escogerAnimal(){
	tipoAnimal=random(3);

	if(tipoAnimal==0){
		background=ArrayFondosAn[0];
		animalGanador=random(8);
		ArrayAnimalI.push(new Image());
		ArrayAnimalC.push(new Circle(draggables[0].x,draggables[0].y,draggables[0].radius-13));
		ArrayAnimalC.correcto=true;
		ArrayAnimalI[0].src=ArrayAnimales[animalGanador];
		for(var i=1;i<5;i++){
		ArrayAnimalI.push(new Image());
		ArrayAnimalC.push(new Circle(draggables[i].x,draggables[i].y,draggables[i].radius-13));
		ArrayAnimalI[i].src=ArrayAnimales[random2(8,18)];
		}
		
			burbuja.text="de la selva";
	}
		if(tipoAnimal==1){	
		background=ArrayFondosAn[1];
		animalGanador=random2(8,13);
		ArrayAnimalI.push(new Image());
		ArrayAnimalC.push(new Circle(draggables[0].x,draggables[0].y,draggables[0].radius-13));
			ArrayAnimalC.correcto=true;
		ArrayAnimalI[0].src=ArrayAnimales[animalGanador];
		for(var i=1;i<5;i++){
		ArrayAnimalI.push(new Image());
		ArrayAnimalC.push(new Circle(draggables[i].x,draggables[i].y,draggables[i].radius-13));
		if(random(2)){ArrayAnimalI[i].src=ArrayAnimales[random2(0,7)];}else{
		ArrayAnimalI[i].src=ArrayAnimales[random2(13,18)];}
		}
			burbuja.text="de la granja";
	}
		if(tipoAnimal==2){
		background=ArrayFondosAn[2];
		animalGanador=random2(13,17);
		ArrayAnimalI.push(new Image());
		ArrayAnimalC.push(new Circle(draggables[0].x,draggables[0].y,draggables[0].radius-13));
			ArrayAnimalC.correcto=true;
		ArrayAnimalI[0].src=ArrayAnimales[animalGanador];
		
		for(var i=1;i<5;i++){
		ArrayAnimalI.push(new Image());
		ArrayAnimalC.push(new Circle(draggables[i].x,draggables[i].y,draggables[i].radius-13));
		ArrayAnimalI[i].src=ArrayAnimales[random2(0,13)];
		}
			burbuja.text="domestico";
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
    function init(){
        canvas=document.getElementById('canvas');
        ctx=canvas.getContext('2d');
        canvas.width=650;
        canvas.height=300;
		llenarArrayAnimales();
		reset();
        enableInputs();
        run();
    }

			function verificarm(temp){
	for(var i=0;i<draggables.length;i++)
	{
	if(draggables[i].distance(temp)<=0)
	return false;
	}
	return true;
	}
	
	function reset(){
	botonNext.enable=false;
	activo=false;
	ArrayAnimalI=[];
	ArrayAnimalC=[];
	burbuja.y=225;
	aTimer=0;
	dialogo.radius=150;
	respuesta=false;
	respuesta2=false;
	draggables=[];
	correcto =false;
	incorrecto=false;
	mrandom=random(12);
	if(mrandom==0)
	mrandom=1;
	var cx;
	var cy; 
	for(var i=0;draggables.length<5;i++){
			cx =random2(55,620);
			  cy =random2(55,canvas.height-100);
			  var temp = new Circle(cx,cy,55);
			  if(verificarm(temp)){
			   draggables.push(temp);
			  }
		          
            }

			 escogerAnimal();
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

    function run(){
        requestAnimationFrame(run);
        act();
        paint(ctx);
    }

    function act(){
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
		
		if (respuesta2){
for(var i=0;i<draggables.length;i++){
				 if(draggables[i].y >=-draggables[i].radius){
				  draggables[i].vy+=nivel;
            if(draggables[i].vy<10.8){
                draggables[i].vy=10.8;}
				burbuja.y+=1;
				 draggables[i].y-=draggables[i].vy;
				 }else{
				activo=true;
			respuesta2=false;
				 }	 
		}}
		
if(aTimer<150){
		 aTimer++;}
		 else{
		 respuesta2=true;
}
	
		
	
			
			
			
        if(lastPress==1){
		
			if(player.distance(botonRefresh)<=0){
	reset();
	}
	if(player.distance(botonBack)<=0){
	window.location="./index.html"
	}	
	
if(player.distance(botonNext)<=0 && botonNext.enable){
          reset();
        }

	if(activo){
	for (var i =1;i< ArrayAnimalC.length;i++){
	if(player.distance(ArrayAnimalC[i])<=0 ){
	incorrecto =true;
	}
	}
	
	if(player.distance(ArrayAnimalC[0])<=0 ){
	 correcto=true;
	}
	
	}
	

        }

	
		
		  lastPress=null;
        lastRelease=null;
		
    }

    function paint(ctx){
	
  if(background.width){
            ctx.drawImage(background,0,0);
        }
  
			
		botonBack.drawImageArea1(ctx,ibotonBack,0,0,128,128);
        botonRefresh.drawImageArea1(ctx,ibotonrefresh,5,5,123,123);
        ctx.fillStyle='#0fc';
		

		if(correcto){
				iuso=iwin;
				botonNext.enable=true;
				botonNext.drawImageArea1(ctx,inext,0,0,128,128);
dialogo.drawImageArea1(ctx,idialogo,0,0,251,225);
 rotulo.drawImageArea1(ctx,iuso,0,0,240,240); 
  ArrayAnimalC[0].x=325;
    ArrayAnimalC[0].y=85;
	 for(var i=1;i<ArrayAnimalC.length;i++){		  
		  ArrayAnimalC[i].radius=0;
		  }
				
				}
				 	if(incorrecto){
				  iuso=ilose;
				  botonNext.enable=true;
	botonNext.drawImageArea1(ctx,ibotonrefresh,0,0,128,128);		
dialogo.drawImageArea1(ctx,idialogo,0,0,251,225);
 rotulo.drawImageArea1(ctx,iuso,0,0,240,240); 
  ArrayAnimalC[0].x=325;
    ArrayAnimalC[0].y=85;
	 for(var i=1;i<ArrayAnimalC.length;i++){		  
		  ArrayAnimalC[i].radius=0;
		  }	
				 }

		
				
		
         for(var i=0;i<ArrayAnimalC.length;i++){		  
		  ArrayAnimalC[i].drawImageArea1(ctx,ArrayAnimalI[i],0,0,120,120);
		  }
	   for(var i=0,l=draggables.length;i<l;i++) {
draggables[i].drawImageArea1(ctx,icanasta,0,0,120,120); 
		  }
  
        ctx.fillStyle='#0f0';
        player.fill(ctx);
	 
        ctx.fillStyle='#fff';
		
	burbuja.drawImageArea1(ctx,iburbuja,0,0,550,100);

			  lastPress=null;
        lastRelease=null;
		
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
        this.vx=0;
        this.vy=0;
		this.w;
		this.h;
		this.x2;
		this.y2;
		this.estado=0;
		this.text=" ";

		this.drawImageArea1=function(ctx,img,sx,sy,sw,sh){
        if(img.width){
            ctx.drawImage(img,sx,sy,sw,sh,this.x,this.y,this.width,this.height);
			   ctx.fillStyle='#000';
						 ctx.font='25px Verdana';
  ctx.fillText("Encuentre el animal "+this.text,this.x+50,this.y+50); 
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

        
        this.fill=function(ctx,cam){
            if(cam!=null)
                ctx.fillRect(this.x-cam.x,this.y-cam.y,this.width,this.height);
            else
                ctx.fillRect(this.x,this.y,this.width,this.height);
        }
    }

    Rectangle.prototype.fill=function(ctx){
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }

 
	
	
    function Circle(x,y,radius){
        this.x=(x==null)?0:x;
        this.y=(y==null)?0:y;
        this.radius=(radius==null)?0:radius;
 this.vx=0;
        this.vy=0;
		this.correcto=false;
        this.distance=function(circle){
            if(circle!=null){
                var dx=this.x-circle.x;
                var dy=this.y-circle.y;
                return (Math.sqrt(dx*dx+dy*dy)-(this.radius+circle.radius));
            }
        }
		   this.distance2=function(cx,cy,radio){
           
                var dx=this.x-cx;
                var dy=this.y-cy;
                return (Math.sqrt(dx*dx+dy*dy)-(this.radius+radio));
            
        }
        
        this.fill=function(ctx){
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
            ctx.fill();
        }
		this.drawImageArea1=function(ctx,img,sx,sy,sw,sh){
    ctx.drawImage(img,sx,sy,sw,sh,this.x-this.radius,this.y-this.radius,this.radius*2,this.radius*2);
    }
    }


	
    window.requestAnimationFrame=(function(){
        return window.requestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame || 
            function(callback){window.setTimeout(callback,17);};
    })();
})();