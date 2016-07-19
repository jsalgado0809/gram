(function(){
    'use strict';
    window.addEventListener('load',init,false);
    var canvas=null,ctx=null;
    var time=0;
    var mousex=0,mousey=0;
    var player=new Circle(0,0,5);
    var target=new Circle(100,100,10);

    function init(){
        canvas=document.getElementById('canvas');
        ctx=canvas.getContext('2d');
        canvas.width=300;
        canvas.height=200;
        
        run();
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
        
        if(target.distance(player)>0){
            var angle=player.getAngle(target);
            target.move(angle,deltaTime/10);
        }
    }

    function paint(ctx){
        ctx.fillStyle='#000';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        
        ctx.strokeStyle='#0f0';
        player.stroke(ctx);
        ctx.strokeStyle='#f00';
        target.stroke(ctx);
        
        ctx.fillStyle='#fff';
        ctx.fillText('Distance: '+player.distance(target).toFixed(1),10,10);
        ctx.fillText('Angle: '+(player.getAngle(target)*(180/Math.PI)).toFixed(1),10,20);
    }

    document.addEventListener('mousemove',function(evt){
        mousex=evt.pageX-canvas.offsetLeft;
        mousey=evt.pageY-canvas.offsetTop;
    },false);

    function Circle(x,y,radius){
        this.x=(x==null)?0:x;
        this.y=(y==null)?0:y;
        this.radius=(radius==null)?0:radius;
        
        this.distance=function(circle){
            if(circle!=null){
                var dx=this.x-circle.x;
                var dy=this.y-circle.y;
                return (Math.sqrt(dx*dx+dy*dy)-(this.radius+circle.radius));
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
        this.getAngle=function(circle){
            if(circle!=null)
                return (Math.atan2(this.y-circle.y,this.x-circle.x));
        }
        
        this.move=function(angle,speed){
            if(speed!=null){
                this.x+=Math.cos(angle)*speed;
                this.y+=Math.sin(angle)*speed;
            }
        }
        
        this.stroke=function(ctx){
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
            ctx.stroke();
        }
    }

    window.requestAnimationFrame=(function(){
        return window.requestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame || 
            function(callback){window.setTimeout(callback,17);};
    })();
})();