<?php
require_once 'appcode/conexion.php';
$con = new conexion();
session_start();

$products;
$jsarray;
	  if(isset($_POST['Aceptar']))
	  {
		 if(isset($_POST['jsarray'])&&isset($_POST['txtcareer'])) {
		        $tok = explode(',',$_POST['jsarray']); 
       
	  for($i=0;$i<count($tok);$i+=3){
		  $jsarray[]=array($tok[$i],$tok[$i+1],$tok[$i+2]);
	  }
		 $products=$con->Update($jsarray,$_POST['txtcareer']);
			 
		 }
 
}

	  if(isset($_GET['career_id']))
{
	$products=$con->getAsignatures($_GET['career_id']);

}
 
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="Robots" content="index,follow" />
	<meta name="author" content="Luka Cvrk (www.solucija.com)" />
	<meta name="description" content="Description" />
	<meta name="keywords" content="key, words" />
	<link rel="stylesheet" type="text/css" href="css/screen.css" media="screen" />
<title>FlujoGrama</title>
</head>
<script type="text/javascript">
function change(){
  var myselect = document.getElementById("txtcareer");
  location.href="editesquema.php?career_id="+myselect.options[myselect.selectedIndex].value;
}
</script>
<body>
	<div id="content">
		<p id="top"></p>
		<div id="logo">
			<h1><a href="index.php">Generador</a></h1>
		</div>
		<ul id="menu">
			<li class="current"><a href="index.php">Inicio</a></li>
					<li><a href="register.php">Registrar</a></li>
			<li><a href="flujograma.php">Flujograma</a></li>
			<li><a href="editesquema.php">Esquema</a></li>
			<li><a href="asignaturacareer.php">Asignar Clases</a></li>
		</ul>
		<div class="line"></div>
		</div>




    
 <form enctype="multipart/form-data" name="uploadform" method="post" action="">
 <input type="hidden" id="jsarray" name="jsarray" value="" />
 		<div id="canvas-container">
			<canvas id="canvas" width="1200" height="600" style="background:#999;">
Canvas not supported by your browser.
</canvas>	
</div>
		<div id="content">
 <table width="400px" border="0" align="center">
     <tr><td>
 <h1>Carrera</h1>
 </td><td>
 <?php
$con->generarSelect6("career","txtcareer");
 ?>
 </td></tr>
    <tr><td>
<input type="reset" value="Reset"/>
 </td><td>
<input type="submit" name="Aceptar" value="Aceptar"/>
 </td></tr>
 
 </table>
 
 </form>		
		
	<div id="footer">
			<p>Generador de Flujos</p>
		</div>	
	</div>
</body>
</html>
<script type="application/javascript">
(function(){
    'use strict';
    window.addEventListener('load',init,false);
	    var canvas=null,ctx=null;
	    var player=new Circle(0,0,0);
        var draggables=[];
		var asignature=[];
		    var lastPress=null;
    var lastRelease=null;
    var mousex=0,mousey=0;
    var dragging=null;
	var aTimer=0;
	var encapsulado;
    var bgTimer=0;
	var jsarray;
	   function init(){
        canvas=document.getElementById('canvas');
        ctx=canvas.getContext('2d');
		jsarray=document.getElementById('jsarray');
	   var arreglo  = <?php echo json_encode($products) ?>;
	   
	   if ((arreglo.length)>0){
		       canvas.width=1200;
        canvas.height=700
		for(var i=0;i<arreglo.length;i++){
			
			asignature.push([arreglo[i]["asignature_id"],arreglo[i]["px"],arreglo[i]["py"]]);
			draggables.push(new Rectangle(arreglo[i]["px"],arreglo[i]["py"],130,50,arreglo[i]["name"],arreglo[i]["asignature_id"]));
			
		}
	   }else{
		      canvas.width=0;
        canvas.height=0; 
	   }
	   
	    enableInputs();
	        run();

    }
	    function run(){
        requestAnimationFrame(run);
        act();
        paint(ctx);
    }
	
	
	
	    function act(){
	
	 if(lastPress==1){
            
				
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
                if(draggables[i].cort(player)){
                    dragging=i;
                    break;
                }
            }
        }
        else if(lastRelease==1)
            dragging=null;
        
        if(dragging!=null){
            draggables[dragging].x=player.x-draggables[dragging].width/2;
            draggables[dragging].y=player.y-draggables[dragging].height/2;
			asignature[dragging][1]=player.x-draggables[dragging].width/2;
			asignature[dragging][2]=player.y-draggables[dragging].height/2;
        }
		
		
		    aTimer++;
            if(aTimer>360)
                aTimer-=360;
            bgTimer++;
            if(bgTimer>0)
                bgTimer-=300;	
			

			jsarray.value=asignature;
    }
	
	
	    function paint(ctx){

	 ctx.fillStyle='#9cc';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle='#0fc';
        for(var i=0,l=draggables.length;i<l;i++) {
		draggables[i].fill(ctx); 
		  }
		  
        ctx.fillStyle='#0f0';
        player.fill(ctx);
	 
        ctx.fillStyle='#fff';
        ctx.fillText('Dragging: '+draggables[dragging].id,0,10);
        
        lastPress=null;
        lastRelease=null;
    }
	     function Rectangle(x,y,width,height,tex,id){
        this.x=(x==null)?0:x;
        this.y=(y==null)?0:y;
        this.width=(width==null)?0:width;
        this.height=(height==null)?this.width:height;
		this.text=tex;
		this.id=id;
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
				ctx.fillStyle='#fff';
                ctx.fillRect(this.x,this.y,this.width,this.height);
						ctx.fillStyle='#000';
				ctx.font='10px Verdana';
				ctx.fillText(this.text,this.x+20,this.y+20); 
        }
    }

    Rectangle.prototype.fill=function(ctx){
		
        ctx.fillRect(this.x,this.y,this.width,this.height);
			ctx.fillStyle='#fff';
				ctx.font='15px Verdana';
				ctx.fillText(this.text,this.x+50,this.y+50); 
    }
	    Rectangle.prototype.cort=function(circle){
            if(circle!=null){
                var dx=circle.x;
                var dy=circle.y;
                return (this.x < dx && this.x+this.width > dx && this.y < dy && this.y+this.height > dy );
            }
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
	    window.requestAnimationFrame=(function(){
        return window.requestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame || 
            function(callback){window.setTimeout(callback,17);};
    })();
})();
</script>