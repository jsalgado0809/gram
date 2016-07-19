(function(){
    'use strict';
    window.addEventListener('load',init,false);
    var canvas=null,ctx=null;
    var lastPress=null;
    var lastRelease=null;
    var mousex=0,mousey=0;
    var dragging=null;
	var aTimer=0;
    var bgTimer=0;
    var player=new Circle(0,0,0);
    var draggables=[];
	var botones=[];
	var spritesheet=new Image();
	var background= new Image();
	var matematica= new Image();
	matematica.src='./assets/matematicas.png';
	var rotulo=new Rectangle(25,70,150,50);
	var boton1= new Image();
	boton1.src='./assets/engrane1.png';
	var boton2= new Image();
	boton2.src='./assets/engrane.png';
	var boton3= new Image();
	boton3.src='./assets/engrane3.png';
		var boton4= new Image();
	boton4.src='./assets/engrane4.png';
	var boton= new Image();
	boton.src='./assets/engrane2.png';
	spritesheet.src='./assets/draganddrop.png';
    background.src='./assets/fondo1.jpg';
    function init(){
		alert("hola");
		var arreglo  = JSON.parse( '<?php echo ($products) ?>' );
		alert(arreglo);
        canvas=document.getElementById('canvas');
        ctx=canvas.getContext('2d');
        canvas.width=650;
        canvas.height=300;
  for(var i=0;i<0;i++)
            draggables.push(new Circle(random(canvas.width),random(canvas.height),15));

		
         botones.push(new Circle(75,75,75));
		botones.push(new Circle(575,100,80));
       botones.push(new Circle(225,150,75));
	     botones.push(new Circle(350,200,100));
	   botones.push(new Circle(540,250,50));

        enableInputs();
        run();
    }

    function random(max){
        return ~~(Math.random()*max);
    }

    function run(){
        requestAnimationFrame(run);
        act();
        paint(ctx);
    }

    function act(){
	
	 if(lastPress==1){
            
                if(player.distance(botones[0])<=0){
                document.location.href='Juego1.html';
                }
				if(player.distance(botones[1])<=0){
                document.location.href='Juego2.html';
                }
				if(player.distance(botones[2])<=0){
                document.location.href='Juego3.html';
                }
					if(player.distance(botones[3])<=0){
                document.location.href='Juego6.html';
                }
					if(player.distance(botones[4])<=0){
                document.location.href='Juego5.html';
                }		
				
            }
	
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
		
		   if(botones[0].distance(player)<=0){
		   var scrip = document.getElementById('principal');
	scrip.src='js/game5.js';
			botones[0].rotation+=2;
		   rotulo.width=300;
		   rotulo.height=100;
		 
        }
		 if(botones[0].distance(player)>0){
    
		   rotulo.width=150;
		   rotulo.height=50;
	
		   
        }
			   if(botones[1].distance(player)<=0){
			botones[1].rotation+=2;
        }
			   if(botones[2].distance(player)<=0){
			botones[2].rotation+=2;
        }
		   if(botones[3].distance(player)<=0){
			botones[3].rotation+=2;
        }
		   if(botones[4].distance(player)<=0){
			botones[4].rotation+=2;
        }

		
		
		
		    aTimer++;
            if(aTimer>360)
                aTimer-=360;
            bgTimer++;
            if(bgTimer>0)
                bgTimer-=300;
				
		
		
    }

    function paint(ctx){
	  if(background.width){
            ctx.drawImage(background,0,0);
        }
        else{
      ctx.fillStyle='#9cc';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        }
	     ctx.fillStyle='#9cc';
        ctx.fillRect(0,0,canvas.width,canvas.height);
	
     
		botones[0].drawImageArea2(ctx,boton,0,0,442,442); 
		botones[1].drawImageArea2(ctx,boton1,0,0,442,442); 
		botones[2].drawImageArea2(ctx,boton2,0,0,442,442); 
		botones[3].drawImageArea2(ctx,boton3,0,0,442,442); 	
		botones[4].drawImageArea2(ctx,boton4,0,0,442,442); 
	botones[5].drawImageArea2(ctx,boton4,0,0,442,442); 
		botones[6].drawImageArea2(ctx,boton2,0,0,442,442); 
		  rotulo.drawImageArea(ctx,matematica,0,0,150,50);
        
        ctx.fillStyle='#0fc';
        for(var i=0,l=draggables.length;i<l;i++) {
		draggables[i].drawImageArea1(ctx,spritesheet,0,0,40,40); 
		  }
		  
        ctx.fillStyle='#0f0';
        player.fill(ctx);
	 
        ctx.fillStyle='#fff';
        ctx.fillText('Dragging: '+dragging,0,10);
        
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

    Rectangle.prototype.drawImageArea=function(ctx,img,sx,sy,sw,sh){
        if(img.width)
            ctx.drawImage(img,sx,sy,sw,sh,this.x,this.y,this.width,this.height);
        else
            ctx.strokeRect(this.x,this.y,this.width,this.height);
    }
    function Circle(x,y,radius){
        this.x=(x==null)?0:x;
        this.y=(y==null)?0:y;
        this.radius=(radius==null)?0:radius;
  this.rotation=0;
        this.distance=function(circle){
            if(circle!=null){
                var dx=this.x-circle.x;
                var dy=this.y-circle.y;
                return (Math.sqrt(dx*dx+dy*dy)-(this.radius+circle.radius));
            }
        }
            this.getAngle=function(circle){
            if(circle!=null)
                return (Math.atan2(this.y-circle.y,this.x-circle.x));
        }
        this.fill=function(ctx){
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
            ctx.fill();
        }
		this.drawImageArea1=function(ctx,img,sx,sy,sw,sh){
	ctx.save();
                //ctx.translate(this.x,this.y);
          
		 //ctx.rotate(this.rotation);
    ctx.drawImage(img,sx,sy,sw,sh,this.x-this.radius,this.y-this.radius,this.radius*2,this.radius*2);
	 ctx.restore();
         //  ctx.drawImage(img, sx,sy,sw,sy, this.x-this.radius,this.y-this.radius,this.radius*2,this.radius*2);
   
    }
			this.drawImageArea2=function(ctx,img,sx,sy,sw,sh){
  if(img.width){
                ctx.save();
                ctx.translate(this.x,this.y);
                //ctx.scale(this.scale,this.scale);
                ctx.rotate(this.rotation*Math.PI/180);
                ctx.drawImage(img,sx,sy,sw,sh,-this.radius,-this.radius,this.radius*2,this.radius*2);
                ctx.restore();
            }
            else
                this.stroke(ctx);
    }
    }
	function loadjscssfile(filename, filetype)
{
if (filetype=="js"){ //if filename is a external JavaScript file
var fileref=document.createElement('script')
fileref.setAttribute("type","text/javascript")
fileref.setAttribute("src", filename)
}
else if (filetype=="css"){ //if filename is an external CSS file
var fileref=document.createElement('link')
fileref.setAttribute('rel', 'stylesheet')
fileref.setAttribute('type', 'text/css')
fileref.setAttribute('href', filename)
}
if (typeof fileref!="undefined")
document.getElementsByTagName("head")[0].appendChild(fileref)
}


	
    window.requestAnimationFrame=(function(){
        return window.requestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame || 
            function(callback){window.setTimeout(callback,17);};
    })();
})();