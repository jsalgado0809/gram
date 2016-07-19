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
	var idialogo= new Image();
	var ibotonBack= new Image();
	var ibotonrefresh=new Image();		
	var inumero=new Image();
	var irotulo =new Image();
	var imanzana= new Image();
    var ifondoR1 = new Image();	
	var background= new Image();
    var iwin= new Image();
	var ifondoR2 = new Image();

	
	
	var dialogo= new Circle(325, 140,0);
	var botonBack=new  Circle(650-75,30,25);
	var botonRefresh=new Circle(650-25,30,25);
	var rotulo= new Circle(325, 110,120);
	var ilose = new Image();
	var inext = new Image();
	var iuso=new Image();
	//var vnumero= new Circle(100, 100,18);
	var mrandom=0;
	var respuesta=false;
	var respuesta2=false;
        var impVerificacion=false;
        var impResultado=false;
        var win= new Circle(325,150,120);
        var fondoR1 = new Rectangle(-325,0,325,300);// simular puerta izquierda
        var fondoR2 = new Rectangle(650,0,325,300);//simular puerta derecha
        var renable = false;
        var botonNext = new Circle(325-13,260,40);
		var ps=new ParticleSystem();
	var tcarga;
	var cargando=true;
function CargarI(ctx){
    var elem = document.getElementById('canvas');
    // Check the canvas support with the help of browser
    if (!elem || !elem.getContext) {
        return;
    }
 
    context = elem.getContext('2d');
    if (!context) {
        return;
    }
 
    // Text?s font of the progress
    context.font = "16px Verdana";
 
    // Gradient of the progress 
    var progress_lingrad = context.createLinearGradient(0,initial_y+total_height,0,0);
    progress_lingrad.addColorStop(0, '#4DA4F3');
    progress_lingrad.addColorStop(0.4, '#ADD9FF');
    progress_lingrad.addColorStop(1, '#9ED1FF');
    context.fillStyle = progress_lingrad;
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

	background.src='./assets/fondo2.jpg';

}
    function init(){
	
        canvas=document.getElementById('canvas');
        ctx=canvas.getContext('2d');
        canvas.width=650;
        canvas.height=300;

		CargarI(ctx);
	
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
	
	function cargarManzanas(){
            draggables=[];
       
        for(var i=0;draggables.length<mrandom;i++){
  
            var posicionx=random(canvas.width-50);
            var posiciony=random(80);
var temp=new Circle(posicionx,posiciony,rmanzana);
if(verificarm(temp))
              draggables.push(temp);
          }
        
            
        }
        
        
	function cargarRotulos(){
	numeros=[];
 
 
  numeros.push(new Circle(random2(50,213-50),random2(50,canvas.height-50),50));
	numeros.push(new Circle(random2(213+50,426-50),random2(240,canvas.height-50),50));
	numeros.push(new Circle(random2(426+50,650-50),random2(100,canvas.height-50),50));
       var a1=random(3);
         var a2=random3(0,3,a1);
           var a3=random4(0,3,a1,a2);
           var r2=random3(1,MAX,mrandom);
           var r3=random4(1,MAX,mrandom,r2);
      numeros[a1].valor=mrandom;
       numeros[a1].correcto=true;
       numeros[a2].valor=r2;
         numeros[a3].valor=r3;
	}
	
function aumentarnivel(){
	nivel=nivel+0.005;
}
	function reset(){
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
cargarRotulos();
cargarManzanas();

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
            
     
        if(!cargando){
		   var now=Date.now();
        var deltaTime=now-time;
        if(deltaTime>1000)deltaTime=0;
        time=now;
        act(deltaTime);
        paint(ctx);
    }else{
	draw();
	}
	
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

		for(var i=0;i<draggables.length;i++){
		
				 if(draggables[i].y <= canvas.height){
				  draggables[i].vy+=nivel;
            if(draggables[i].vy>10.8){
                draggables[i].vy=10.8;}
				
				 draggables[i].y+=draggables[i].vy;
				 }else{
			
				 respuesta2=true;
				 
				 }	 
		}
		if(respuesta2){
		 if(aTimer<80)
		 aTimer++;
		 if(aTimer>=80)
		 respuesta=true;
          
		}
			
	
			
			
			
        if(lastPress==1){
            if(renable){
   if(player.distance(numeros[0])<=0){
                impVerificacion=true;
                if(numeros[0].correcto){
                    impResultado=true;
                }else{
                    impResultado=false;
                }
                
            }
                      if(player.distance(numeros[1])<=0){
                impVerificacion=true;
                if(numeros[1].correcto){
                    impResultado=true;
                }else{
                    impResultado=false;
                }
                
            }
                      if(player.distance(numeros[2])<=0){
                impVerificacion=true;
                if(numeros[2].correcto){
                    impResultado=true;
                }else{
                    impResultado=false;
                }
                
            }                
            }
         
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
            for(var i=0,l=draggables.length;i<l;i++){
                if(player.distance(draggables[i])<0){
                    dragging=i;
                    break;
                }
            }
        }
        else if(lastRelease==1)
            dragging=null;
        
        if(dragging!=null){
            draggables[dragging].x=player.x;
            draggables[dragging].y=player.y;
        }
	
	
     
           var color='rgb('+random(255)+','+random(255)+','+random(255)+')';
        
              //  ps.push(new Particle(player.x,player.y,1,500+random(500),random(100),random(360),color));
			  ps.push(new Particle(random(canvas.width),random(canvas.height),1,500+random(500),random(100),random(360),color));
        ps.move(deltaTime);
		
    }

    function paint(ctx){

  if(background.width){
            ctx.drawImage(background,0,0);
        }
        else{
      ctx.fillStyle='#000';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        }
			//
	
        ctx.fillStyle='#0fc';
        for(var i=0,l=draggables.length;i<l;i++) {
		 
		   //draggables[i].fill(ctx);
	
		draggables[i].drawImageArea1(ctx,imanzana,0,0,280,320); 
		  }
        ctx.fillStyle='#0f0';
        player.fill(ctx);
	 ps.fill(ctx);
        ctx.fillStyle='#fff';
     //   ctx.fillText('Dragging: '+dragging,0,10);
        
        lastPress=null;
        lastRelease=null;
		
		if(respuesta2){
		if(fondoR1.x<0){
                   fondoR1.x+=aTimer/10;
                }else{
                    fondoR1.x=0;
                    renable=true;
                }
               	if(fondoR2.x>325){
                   fondoR2.x-=aTimer/10;
                }else{
                    fondoR2.x=325;
                }
		dialogo.radius=aTimer*2;
		
		}
                
               fondoR1.drawImage(ctx,ifondoR1);
               fondoR2.drawImage(ctx,ifondoR2);
               dialogo.drawImageArea1(ctx,idialogo,0,0,251,225);
               
                     botonBack.drawImageArea1(ctx,ibotonBack,0,0,128,128);
                        
        botonRefresh.drawImageArea1(ctx,ibotonrefresh,5,5,123,123);
				if(respuesta){
				
                                rotulo.drawImageArea1(ctx,iuso,0,0,240,240); 
			 ctx.font='50px Verdana';
// Create gradient
var gradient=ctx.createLinearGradient(0,0,canvas.width,0);
gradient.addColorStop('0.15','red');
gradient.addColorStop('0.30','magenta');
gradient.addColorStop('0.45','blue');
gradient.addColorStop('0.60','yellow');
gradient.addColorStop('0.75','green');
gradient.addColorStop('0.90','black');
gradient.addColorStop('0.98','white');
ctx.fillStyle=gradient;

		for(var i=0;i<numeros.length;i++){
		numeros[i].drawImageArea1(ctx,inumero,0,0,640,640); 
                if(numeros[i].valor<10){
	ctx.fillText(numeros[i].valor,numeros[i].x-20,numeros[i].y+20);}else
        {
          ctx.fillText(numeros[i].valor,numeros[i].x-35,numeros[i].y+20); 
        }
		}
                
     
        
                if(impVerificacion){
                    numeros=[];
                    if(impResultado){
                      iuso=iwin;
                      botonNext.drawImageArea1(ctx,inext,0,0,128,128);
                      botonNext.enable=true;
                    }else{
                        //ctx.fillText('Respuesta Incorrecta',225,90);
                        iuso=ilose;
                    }
                }


			}
		
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
         //  ctx.drawImage(img, sx,sy,sw,sy, this.x-this.radius,this.y-this.radius,this.radius*2,this.radius*2);
   
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
	
	
function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arc(x+width-radius, y+radius, radius, -Math.PI/2, Math.PI/2, false);
    ctx.lineTo(x + radius, y + height);
    ctx.arc(x+radius, y+radius, radius, Math.PI/2, 3*Math.PI/2, false);
    ctx.closePath();
    ctx.fill();
}


function progressLayerRect(ctx, x, y, width, height, radius) {
    ctx.save();
    // Define the shadows
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 5;
    ctx.shadowColor = '#666';
 
     // first grey layer
    ctx.fillStyle = 'rgba(189,189,189,1)';
    roundRect(ctx, x, y, width, height, radius);
 
    // second layer with gradient
    // remove the shadow
    ctx.shadowColor = 'rgba(0,0,0,0)';
    var lingrad = ctx.createLinearGradient(0,y+height,0,0);
    lingrad.addColorStop(0, 'rgba(255,255,255, 0.1)');
    lingrad.addColorStop(0.4, 'rgba(255,255,255, 0.7)');
    lingrad.addColorStop(1, 'rgba(255,255,255,0.4)');
    ctx.fillStyle = lingrad;
    roundRect(ctx, x, y, width, height, radius);
 
    ctx.restore();
}


function progressBarRect(ctx, x, y, width, height, radius, max) {
    // deplacement for chord drawing
    var offset = 0;
    ctx.beginPath();
    if (width<radius) {
        offset = radius - Math.sqrt(Math.pow(radius,2)-Math.pow((radius-width),2));
        // Left angle
        var left_angle = Math.acos((radius - width) / radius);
        ctx.moveTo(x + width, y+offset);
        ctx.lineTo(x + width, y+height-offset);
        ctx.arc(x + radius, y + radius, radius, Math.PI - left_angle, Math.PI + left_angle, false);
    }
    else if (width+radius>max) {
        offset = radius - Math.sqrt(Math.pow(radius,2)-Math.pow((radius - (max-width)),2));
        // Right angle
        var right_angle = Math.acos((radius - (max-width)) / radius);
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width, y);
        ctx.arc(x+max-radius, y + radius, radius, -Math.PI/2, -right_angle, false);
        ctx.lineTo(x + width, y+height-offset);
        ctx.arc(x+max-radius, y + radius, radius, right_angle, Math.PI/2, false);
        ctx.lineTo(x + radius, y + height);
        ctx.arc(x+radius, y+radius, radius, Math.PI/2, 3*Math.PI/2, false);
    }
    else {
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width, y);
        ctx.lineTo(x + width, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.arc(x+radius, y+radius, radius, Math.PI/2, 3*Math.PI/2, false);
    }
    ctx.closePath();
    ctx.fill();
 
    // shadow on the right
    if (width<max-1) {
        ctx.save();
        ctx.shadowOffsetX = 1;
        ctx.shadowBlur = 1;
        ctx.shadowColor = '#666';
        if (width+radius>max)
            offset = offset+1;
        ctx.fillRect(x+width,y+offset,1,total_height-offset*2);
        ctx.restore();
    }
}


function progressText(ctx, x, y, width, height, radius, max) {
    ctx.save();
    ctx.fillStyle = 'white';
    var text = Math.floor(width/max*100)+"%";
    var text_width = ctx.measureText(text).width;
    var text_x = x+width-text_width-radius/2;
    if (width<=radius+text_width) {
        text_x = x+radius/2;
    }
    ctx.fillText(text, text_x, y+22);
    ctx.restore();
}
function draw() {
    // augment the length on 1 for every iteration
    i+=50;

 
    // Clear the layer
    context.clearRect(initial_x-5,initial_y-5,total_width+15,total_height+15);
    progressLayerRect(context, initial_x, initial_y, total_width, total_height, radius);
    progressBarRect(context, initial_x, initial_y, i, total_height, radius, total_width);
    progressText(context, initial_x, initial_y, i, total_height, radius, total_width );
    // stop the animation when it reaches 100%
    if (i>=total_width) {
        clearInterval(res);
		cargando=false;
    }
}
	var i = 0;
var res = 0;
var context = null;
var total_width = 400;
var total_height = 40;
var initial_x = 130;
var initial_y = 130;
var radius = total_height/2;

spritesheet.onload = function () {
tcarga+=5;
}
	spritesnumber.onload = function () {
tcarga+=5;
}
idialogo.onload = function () {
tcarga+=5;
}
ibotonBack.onload = function () {
tcarga+=5;
}
	ibotonrefresh.onload = function () {
tcarga+=50;
}
	 inumer.onload = function () {
tcarga+=5;
}
	irotulo.onload = function () {
tcarga+=5;
}
	 imanzana.onload = function () {
tcarga+=5;
}
     ifondoR1.onload = function () {
tcarga+=50;
}
	 background.onload = function () {
tcarga+=50;
}
   iwin.onload = function () {
tcarga+=50;
}
	 ifondoR2.onload = function () {
tcarga+=50;
}
	 ifondoR1.onload = function () {
tcarga+=50;
}



    window.requestAnimationFrame=(function(){
        return window.requestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame || 
            function(callback){window.setTimeout(callback,17);};
    })();
})();