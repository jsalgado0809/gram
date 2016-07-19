(function(){
    'use strict';
    window.addEventListener('load',init,false); 
	ParticleSystem.prototype=[];
    var canvas=null,ctx=null;
		var Maxi=10;
    var time=0;
	var gravedad=0.098;
	var lastPress=null;
	var lastRelease=null;
	var player=new Circle(0,0,0);
	var dragging=null;
	var mousex=0,mousey=0;
	var draggables=[];
	var pelota= new Image();
	pelota.src='./assets/pelota1.png';
	var botonBack=new  Circle(650-75,30,25);
	var botonRefresh=new Circle(650-25,30,25);
	var ibotonBack= new Image();
	var iuso= new Image();
	var ibotonrefresh=new Image();	
	ibotonBack.src='./assets/Back2.png';
	ibotonrefresh.src='./assets/view_refresh.png';
	var respuesta;
		var rotulo= new Circle(425, 110,120);
	var correcto;
	var destruir= null;
	var background= new Image();
	background.src='./assets/numeros.png';
	var rotulo1=false;
	  var botonNext = new Circle(325-13,260,40);
	  	var inext = new Image();
		 inext.src = 'assets/next.png';
 var iwin= new Image();
      iwin.src='assets/gano4.png';
	var t1;
	var t2;
    function init(){
        canvas=document.getElementById('canvas');
        ctx=canvas.getContext('2d');
        canvas.width=650;
        canvas.height=300;
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
	
	
	function cargar(){
	respuesta = random2(2,Maxi);
	 t1 = random3(1,Maxi,respuesta);
	 t2 = respuesta -t1;
	var mala1 = random3(1,Maxi,respuesta);
		var mala2 = random4(1,Maxi,respuesta,mala1);
	for(var i=0;draggables.length<3;i++){
	var posicionx=random2(25,600);
	var posiciony=random2(150,250);
	var temp=new Circle(posicionx,posiciony,50);
	if(verificarm(temp))
              draggables.push(temp);
	}
	draggables[0].vx=0.5;
				draggables[1].vx=0.5;
				draggables[2].vx=0.5;
	
				draggables[0].text=respuesta.toString();
				draggables[0].correcto=true;
				draggables[1].text=mala1.toString();
				draggables[2].text=mala2.toString();
	}

	function reset(){  // RESETTTTT
gravedad=0.098;
correcto=false;
	draggables=[];
time=0;
	cargar();
	botonNext.enable=false;
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
        paint(ctx);
    }

	function arrastrar(){
	     for(var i=0;i<draggables.length;i++){
                if(player.distance(draggables[i])<0){
                    dragging=i;
                    break;
                }
            }
	}
	
    function act(deltaTime){
	ubicarMouse();
  for(var i=0,l=draggables.length;i<l;i++){
     draggables[i].gravedad(gravedad,canvas);
            }
 if(lastPress==1){
           for(var i=0;i<draggables.length;i++){
                if(player.distance(draggables[i])<0){
				if (draggables[i].correcto){
                  draggables[i].vx=0;
				 draggables[i].vy=0;
				 gravedad=0;
				 correcto=true;
                    break;
                }
				else{
				 destruir=i;
				}
				}
            }
			
			
			        if(player.distance(botonNext)<=0 && botonNext.enable){
					Maxi+=1/3;
          reset();
        }
			
	if(player.distance(botonRefresh)<=0 ){
	reset();
	}
	if(player.distance(botonBack)<=0){
	window.location="./index.html"
	}	
        }
        else 
		if(lastRelease==1)
            dragging=null; 
        if(dragging!=null){
			if(player.x >  draggables[dragging].radius && player.x < canvas.width-draggables[dragging].radius){
				      draggables[dragging].x=player.x;
					   draggables[dragging].vx=player.vx;
				}
      		if(player.y >  draggables[dragging].radius && (player.y+draggables[dragging].radius) < canvas.height){
				 draggables[dragging].y=player.y;
			draggables[dragging].vy=0;;
		draggables[dragging].vy+=player.vy;;
			}
           
        }
		if( correcto){
		draggables[0].ganadora(420,75);
	draggables[1].encoger();	
		draggables[2].encoger();
		
		}
		
		if (destruir != null){
		draggables[destruir].encoger();
		}
		
   lastPress=null;
        lastRelease=null;
	
    }
	function rebotes(){
			for(var i=0;i<draggables.length;i++){
		for(var j=0;j<draggables.length;j++){
		if(i!=j){
		if(draggables[i].distance(draggables[j])<=5){
		var tx=draggables[j].vx;
		var ty=draggables[j].vy;
		draggables[j].vx-=draggables[i].vx;
		//draggables[j].vy-=draggables[i].vy;
		draggables[i].vx-=tx;
		//draggables[i].vy-=ty;
		}
		}
		}
		}
	}
	
	function ubicarMouse(){
	player.cvelocidad(mousex,mousey);
      //  player.y=mousey;
        if(player.x<0)
            player.x=0;
        if(player.x>canvas.width)
            player.x=canvas.width;
        if(player.y<0)
            player.y=0;
        if(player.y>canvas.height)
            player.y=canvas.height;
	}


    function paint(ctx){

 if(background.width){
            ctx.drawImage(background,0,0);
        }
        else{
      ctx.fillStyle='#000';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        }
		   ctx.fillStyle='#fff';
		     for(var i=0,l=draggables.length;i<l;i++){
     draggables[i].drawImageArea1(ctx,pelota,0,0,pelota.width,pelota.height);
            }
			ctx.fillStyle='#000';
			ctx.font="100px ARIAL";
ctx.fillText(t1,190-t1.toString().length*50,100);
if(t2>0){
ctx.fillText("+",200,100);
ctx.fillText(t2+"=",250,100);}
else{
ctx.fillText(t2+"=",200,100);
}
        botonBack.drawImageArea1(ctx,ibotonBack,0,0,128,128);          
        botonRefresh.drawImageArea1(ctx,ibotonrefresh,5,5,123,123);
		if (correcto){
		 iuso=iwin;
botonNext.drawImageArea1(ctx,inext,0,0,128,128);
botonNext.enable=true;
 rotulo.drawImageArea1(ctx,iuso,0,0,240,240); 
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
		this.valor=0;
		this.text=null;
        this.correcto=false;
		this.ganadora=function(x2,y2){
		if(this.x>x2)
		this.x-=3;
		if(this.y>y2)
		this.y-=3;
		if(this.x<x2)
		this.x+=3;
		if(this.y<y2)
		this.y+=3;
		}
		this.encoger=function(){
		if (this.radius>0)
		this.radius-=2;
		else
		destruir=null;
		}
        this.distance=function(circle){
            if(circle!=null){
                var dx=this.x-circle.x;
                var dy=this.y-circle.y;
                return (Math.sqrt(dx*dx+dy*dy)-(this.radius+circle.radius));
            }
        }
		this.cvelocidad=function(x,y){
		this.valor1=this.x;
		this.valor2=this.y;
		this.x=x;
		this.y=y;
		this.vx=x-this.valor1;
		this.vy=y-this.valor2;
			}
		this.gravedad=function (g,object){
		var puntoy1=this.y+this.radius;
		var puntoy2=this.y-this.radius;
		var puntox1=this.x+this.radius;
		var puntox2=this.x-this.radius;
		if(puntoy1<object.height){
	this.vy+=g;
	}else{
			this.y=object.height-this.radius;
	this.vy=-this.vy;
	}
		if(puntox1<object.width){
	}else{
		this.x=object.width-this.radius;
	this.vx=-this.vx;
	}
			if(puntox2<0){
				this.x=this.radius;
				this.vx=-this.vx;
	}			if(puntoy2<0){
				this.y=this.radius;
				this.vy=-this.vy;
	}
	
	this.y+=this.vy
	this.x+=this.vx;
	}
        this.fill=function(ctx){
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
            ctx.fill();
        }
		this.drawImageArea1=function(ctx,img,sx,sy,sw,sh){
    ctx.drawImage(img,sx,sy,sw,sh,this.x-this.radius,this.y-this.radius,this.radius*2,this.radius*2);
if(this.text!=null){
	ctx.fillStyle='#fff';
				if(this.text.length==2){
		 ctx.font=this.radius+'px Verdana';
	
	ctx.fillText(this.text,this.x-5*this.radius/7,this.y+this.radius/4);	
		}else{	
		if(this.text.length==1){
					 ctx.font=this.radius+'px Verdana';
	ctx.fillText(this.text,this.x-this.radius/3,this.y+this.radius/4);	
			}}
	}
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