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
    var pause=true,gameover=true;
    var body=[];
    var food=new Rectangle(80,80,10,10);
    //var wall=[];
    var highscores=[];
    var posHighscore=10;
    var dir=0,score=0;
    var iBody=new Image(),iFood=new Image();
    var aEat=new Audio(),aDie=new Audio();

    iBody.src='assets/body.png';
    iFood.src='assets/fruit.png';
    aEat.src='assets/chomp.m4a';
    aDie.src='assets/dies.m4a';

    //wall.push(new Rectangle(50,50,10,10));
    //wall.push(new Rectangle(50,100,10,10));
    //wall.push(new Rectangle(100,50,10,10));
    //wall.push(new Rectangle(100,100,10,10));

    function random(max){
        return ~~(Math.random()*max);
    }

    function init(){
        canvas=document.getElementById('canvas');
        ctx=canvas.getContext('2d');
        canvas.width=300;
        canvas.height=200;
        
        if(localStorage.highscores)
            highscores=localStorage.highscores.split('\n');
        run();
        repaint();
    }

    function addHighscore(score){
        posHighscore=0;
        while(highscores[posHighscore]>score&&posHighscore<highscores.length)
            posHighscore++;
        highscores.splice(posHighscore,0,score);
        if(highscores.length>10)
            highscores.length=10;
        localStorage.highscores=highscores.join('\n');
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
        score=0;
        dir=1;
        body.length=0;
        body.push(new Rectangle(40,40,10,10));
        body.push(new Rectangle(0,0,10,10));
        body.push(new Rectangle(0,0,10,10));
        food.x=random(canvas.width/10-1)*10;
        food.y=random(canvas.height/10-1)*10;
        gameover=false;
    }

    function act(){
        if(!pause){
            // GameOver Reset
            if(gameover)
                reset();
            
            // Move Body
            for(var i=body.length-1;i>0;i--){
                body[i].x=body[i-1].x;
                body[i].y=body[i-1].y;
            }

            // Change Direction
            if(lastPress==KEY_UP&&dir!=2)
                dir=0;
            if(lastPress==KEY_RIGHT&&dir!=3)
                dir=1;
            if(lastPress==KEY_DOWN&&dir!=0)
                dir=2;
            if(lastPress==KEY_LEFT&&dir!=1)
                dir=3;

            // Move Head
            if(dir==0)
                body[0].y-=10;
            if(dir==1)
                body[0].x+=10;
            if(dir==2)
                body[0].y+=10;
            if(dir==3)
                body[0].x-=10;

            // Out Screen
            if(body[0].x>canvas.width-body[0].width)
                body[0].x=0;
            if(body[0].y>canvas.height-body[0].height)
                body[0].y=0;
            if(body[0].x<0)
                body[0].x=canvas.width-body[0].width;
            if(body[0].y<0)
                body[0].y=canvas.height-body[0].height;

            // Food Intersects
            if(body[0].intersects(food)){
                body.push(new Rectangle(0,0,10,10));
                score++;
                food.x=random(canvas.width/10-1)*10;
                food.y=random(canvas.height/10-1)*10;
                aEat.play();
            }

            // Wall Intersects
            //for(var i=0,l=wall.length;i<l;i++){
            // if(food.intersects(wall[i])){
            //  food.x=random(canvas.width/10-1)*10;
            //  food.y=random(canvas.height/10-1)*10;
            // }
            // 
            // if(body[0].intersects(wall[i])){
            //  gameover=true;
            //  pause=true;
            // }
            //}

            // Body Intersects
            for(var i=2,l=body.length;i<l;i++){
                if(body[0].intersects(body[i])){
                    gameover=true;
                    pause=true;
                    aDie.play();
                    addHighscore(score);
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
        ctx.fillStyle='#030';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        
        ctx.strokeStyle='#0f0';
        for(var i=0,l=body.length;i<l;i++){
            body[i].drawImage(ctx,iBody);
        }
        //ctx.fillStyle='#999';
        //for(var i=0,l=wall.length;i<l;i++){
            //wall[i].fill(ctx);
        //}
        ctx.strokeStyle='#f00';
        food.drawImage(ctx,iFood);
        
        ctx.fillStyle='#fff';
        ctx.fillText('Score: '+score,0,10);
        //ctx.fillText('Last Press: '+lastPress,0,20);
        if(pause){
            ctx.textAlign='center';
            if(gameover){
                //ctx.fillText('GAME OVER',150,100);
                ctx.fillText('HIGH SCORES',150,50);
                ctx.textAlign='right';
                for(var i=0,l=highscores.length;i<l;i++){
                    if(i==posHighscore)
                        ctx.fillText('*'+highscores[i],180,60+i*10);
                    else
                        ctx.fillText(highscores[i],180,60+i*10);
                }
            }
            else
                ctx.fillText('PAUSE',150,100);
            ctx.textAlign='left';
        }
    }

    document.addEventListener('keydown',function(evt){
        lastPress=evt.keyCode;
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
  
        this.drawImage=function(ctx,img){
            if(img.width)
                ctx.drawImage(img,this.x,this.y);
            else
                ctx.strokeRect(this.x,this.y,this.width,this.height);
        }
    }

    window.requestAnimationFrame=(function(){
        return window.requestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame || 
            function(callback){window.setTimeout(callback,17);};
    })();
})();