(function(){
    'use strict';
    window.addEventListener('load',init,false);
    var KEY_ENTER=13;
    var KEY_LEFT=37;
    var KEY_UP=38;
    var KEY_RIGHT=39;
    var KEY_DOWN=40;

    var canvas=null,ctx=null;
    var lastPress=null;
    var pressing=[];
    var pause;
    var gameover=true;
    var player=new Rectangle(40,40,10,10);
    var wall=[];
    var lava=[];
    var map1=[
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,2,2,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,2,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,
    1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,1,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,1,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,1,0,0,1,
    1,0,0,0,0,0,2,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,2,2,0,0,1,0,0,1,
    0,0,0,0,0,0,2,0,0,0,0,2,0,0,0,2,0,0,0,2,0,0,2,2,0,0,1,0,0,0,
    0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,2,2,0,0,1,0,0,0,
    1,0,0,0,0,0,2,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,2,2,0,0,1,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,1,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,1,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,1,0,0,0,0,0,0,1,0,0,1,
    1,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ];

    function setMap(map,columns,blockSize){
        var col=0;
        var row=0;
        wall.length=0;
        lava.length=0;
        for(var i=0;i<map.length;i++){
            if(map[i]==1)
                wall.push(new Rectangle(col*blockSize,row*blockSize,blockSize,blockSize));
            else if(map[i]==2)
                lava.push(new Rectangle(col*blockSize,row*blockSize,blockSize,blockSize));
            col++
            if(col>=columns){
                row++;
                col=0;
            }
        }
    }

    function init(){
        canvas=document.getElementById('canvas');
        ctx=canvas.getContext('2d');
        canvas.width=300;
        canvas.height=200;
        
        setMap(map1,30,10);
        run();
        repaint();
    }

    function run(){
        setTimeout(run,50);
        act();
    }

    function repaint(){
        requestAnimationFrame(repaint);
        paint(ctx);
    }

    function reset(){
        player.x=40;
        player.y=40;
        gameover=false;
    }

    function act(){
        if(!pause){
            // GameOver Reset
            if(gameover)
                reset();
            
            // Move Rect
            if(pressing[KEY_UP]){
                player.y-=10;
                for(var i=0;i<wall.length;i++){
                    if(player.intersects(wall[i])){
                        player.y+=10;
                    }
                }
            }
            if(pressing[KEY_RIGHT]){
                player.x+=10;
                for(var i=0;i<wall.length;i++){
                    if(player.intersects(wall[i])){
                        player.x-=10;
                    }
                }
            }
            if(pressing[KEY_DOWN]){
                player.y+=10;
                for(var i=0;i<wall.length;i++){
                    if(player.intersects(wall[i])){
                        player.y-=10;
                    }
                }
            }
            if(pressing[KEY_LEFT]){
                player.x-=10;
                for(var i=0;i<wall.length;i++){
                    if(player.intersects(wall[i])){
                        player.x+=10;
                    }
                }
            }
            
            // Out Screen
            if(player.x>canvas.width)
                player.x=0;
            if(player.y>canvas.height)
                player.y=0;
            if(player.x<0)
                player.x=canvas.width;
            if(player.y<0)
                player.y=canvas.height;
                
            // Player Intersects Lava
            for(var i=0;i<lava.length;i++){
                if(player.intersects(lava[i])){
                    gameover=true;
                    pause=true;
                }
            }
        }
        // Pause/Unpause
        if(lastPress==KEY_ENTER){
            pause=!pause;
            lastPress=null;
        }
    }

    function paint(ctx){
        ctx.fillStyle='#000';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        
        ctx.fillStyle='#0f0';
        player.fill(ctx);
        ctx.fillStyle='#999';
        for(var i=0;i<wall.length;i++)
            wall[i].fill(ctx);
        ctx.fillStyle='#f00';
        for(var i=0;i<lava.length;i++)
            lava[i].fill(ctx);
        
        ctx.fillStyle='#fff';
        ctx.fillText('Last Key: '+lastPress,0,20);
        if(pause){
            ctx.textAlign='center';
            if(gameover)
                ctx.fillText('GAMEOVER',150,75);
            else
                ctx.fillText('PAUSE',150,75);
            ctx.textAlign='left';
        }
    }

    document.addEventListener('keydown',function(evt){
        lastPress=evt.keyCode;
        pressing[evt.keyCode]=true;
    },false);

    document.addEventListener('keyup',function(evt){
        pressing[evt.keyCode]=false;
    },false);

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
    }
})();