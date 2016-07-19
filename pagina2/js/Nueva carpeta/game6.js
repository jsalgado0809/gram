(function(){
    'use strict';
    window.addEventListener('load',init,false);
    ParticleSystem.prototype=[];
    var canvas=null,ctx=null;
    var lastPress=null;
    var time=0;
    var mousex=0,mousey=0;
    var player=new Circle(0,0,5);
    var ps=new ParticleSystem();

    function init(){
        canvas=document.getElementById('canvas');
        ctx=canvas.getContext('2d');
        canvas.width=300;
        canvas.height=200;

        enableInputs();
        run();
    }

    function random(max){
        return ~~(Math.random()*max);
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

        if(lastPress==1){
            canvas.style.background='#333';
            var color='rgb('+random(255)+','+random(255)+','+random(255)+')';
            for(var i=0;i<200;i++)
                ps.push(new Particle(player.x,player.y,1,500+random(500),random(100),random(360),color));
        }
        else
            canvas.style.background='#000';
        
        ps.move(deltaTime);
    }

    function paint(ctx){
        ctx.fillStyle='#000';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        
        ps.fill(ctx);
        ctx.strokeStyle='#0f0';
        player.stroke(ctx);

        ctx.fillStyle='#fff';
        ctx.fillText('Particles: '+ps.length,0,20);
        lastPress=null;
    }

    function enableInputs(){
        document.addEventListener('mousemove',function(evt){
            mousex=evt.pageX-canvas.offsetLeft;
            mousey=evt.pageY-canvas.offsetTop;
        },false);
        canvas.addEventListener('mousedown',function(evt){
            lastPress=evt.which;
        },false);
    }

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
        
        this.stroke=function(ctx){
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
            ctx.stroke();
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