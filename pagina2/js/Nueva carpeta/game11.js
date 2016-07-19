(function(){
    'use strict';
    window.addEventListener('load',init,false);
    var canvas=null,ctx=null;
    var bgTimer=0;
    var background=new Image();
    background.src='assets/mosaic3.png';

    function init(){
        canvas=document.getElementById('canvas');
        ctx=canvas.getContext('2d');
        canvas.width=300;
        canvas.height=200;
        
        run();
    }

    function run(){
        requestAnimationFrame(run);
        //act();
        paint(ctx);
    }

    function paint(ctx){
        if(background.width){
             ctx.drawImage(background,bgTimer,0);
             ctx.drawImage(background,bgTimer-background.width,0);
             
             bgTimer--;
             if(bgTimer<0)
                 bgTimer+=background.width;
        }
    }

    window.requestAnimationFrame=(function(){
        return window.requestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame || 
            function(callback){window.setTimeout(callback,17);};
    })();
})();