<?php

class conexion{
	    private $user = 'admin';
    private $passwd = 'admin';
    private $db = 'flujograma';
    private $port = '3307';
    private $host = 'localhost';
    private $cadena;
    private $con;
    private $query;
    private $valor;
	private $limite=9;
	private $actual;
	private $paginas;
	
	
	public function get_user(){
		return $this->user;
	}
		public function get_passwd(){
		return $this->passwd;
	}
		public function get_db(){
		return $this->db;
	}
		public function get_host(){
		return $this->host;
	}
	
function __construct() {
 mysql_connect($this->host, $this->user, $this-> passwd) or die(mysql_error()) ;
 mysql_select_db($this->db) or die(mysql_error()) ;
    }
			
			 public function generarSelect($tabla,$name){
		$comando = mysql_query("SELECT * FROM ".$tabla);
		echo "<select name='".$name."' >";
	 while($result=mysql_fetch_assoc($comando)){
	echo "<option value='".$result["id"]."'>".$result["name"]."</option>";
		 }
		 echo "</select>";
		}
		
public function getAsignatures($career){
		$comando = mysql_query("SELECT * FROM asignature_career AS ac INNER JOIN asignature a ON ac.asignature_id = a.id WHERE ac.career_id = ".$career);
		$asignatures;
	 while($result=mysql_fetch_assoc($comando)){
		$asignatures[]=$result;
		 }
return $asignatures;
		}		
		
					 public function generarSelect5($tabla,$name){
		$comando = mysql_query("SELECT * FROM ".$tabla);
					 echo "<select name='".$name."' id=".$name." onchange='change();'>";
	 while($result=mysql_fetch_assoc($comando)){
	 if(isset($_GET["career_id"])){
		 		 if($result["id"]==$_GET["career_id"]){
			 echo "<option value='".$result["id"]."' selected>".$result["name"]."</option>";
		 }else{
			echo "<option value='".$result["id"]."'>".$result["name"]."</option>"; 
			 
		 }
	 }else{
		 
		  header("location: asignaturacareer.php?career_id=".$result["id"]);
	 }

	
		 }
		 echo "</select>";
		}
							 public function generarSelect6($tabla,$name){
		$comando = mysql_query("SELECT * FROM ".$tabla);
					 echo "<select name='".$name."' id=".$name." onchange='change();'>";
	 while($result=mysql_fetch_assoc($comando)){
	 if(isset($_GET["career_id"])){
		 		 if($result["id"]==$_GET["career_id"]){
			 echo "<option value='".$result["id"]."' selected>".$result["name"]."</option>";
		 }else{
			echo "<option value='".$result["id"]."'>".$result["name"]."</option>"; 
			 
		 }
	 }else{
		 
		  header("location: editesquema.php?career_id=".$result["id"]);
	 }

	
		 }
		 echo "</select>";
		}
					 public function generarSelect2($tabla,$name){
		$comando = mysql_query("SELECT * FROM ".$tabla);
		echo "<select name='".$name."' required>";
	 while($result=mysql_fetch_assoc($comando)){
	echo "<option value='".$result["id"]."'>".$result["name"]."-".$result["years"]."</option>";
		 }
		 echo "</select>";
		}
						 public function generarSelect3($career,$name){
		$comando = mysql_query("SELECT * FROM asignature WHERE id not in (select asignature_id from asignature_career where career_id = '".$career."')");
		echo "<select name='".$name."' >";
	 while($result=mysql_fetch_assoc($comando)){
	echo "<option value='".$result["id"]."'>".$result["name"]."</option>";
		 }
		 echo "</select>";
		}
	 public function generarSelect4($career,$name){
		$comando = mysql_query("SELECT * FROM asignature WHERE id in (select asignature_id from asignature_career where career_id = '".$career."')");
		echo "<select name='".$name."' size='10'>";
	 while($result=mysql_fetch_assoc($comando)){
	echo "<option value='".$result["id"]."'>".$result["name"]."</option>";
		 }
		 echo "</select>";
		}
public function registrarStudent(){
		$imagen_temporal  = $_FILES['userfile']['tmp_name'];
		$tipo = $_FILES['userfile']['type'];
                $fp     = fopen($imagen_temporal, 'r+b');
                $data = fread($fp, filesize($imagen_temporal));
                fclose($fp);
                $data = mysql_real_escape_string($data); 
        $query = "INSERT INTO student (name,id,brithday,pic,tipof ) ".
                 "VALUES ('".$_POST['txtnombre']."', ".$_POST['txtcuenta']." ,'".$_POST['txtnacimiento']."', '$data', '$tipo')";
   @mysql_query($query) or die('Error, query failed'); 		
			}
		public function registrarTeacher(){
			if(isset($_POST['txtnombre']) && isset($_POST['txtcuenta']) && isset($_POST['txtnacimiento']) ){
				
				        $query = "INSERT INTO teachers (name,id,brithday ) ".
                 "VALUES ('".$_POST['txtnombre']."', ".$_POST['txtcuenta']." ,'".$_POST['txtnacimiento']."')";
         @mysql_query($query) or die('Error, query failed'); 
			}

			
			}	
		public function addasignature(){
				if(isset($_POST['txtcareer']) && isset($_POST['txtasignature']) ){
					        $query = "INSERT INTO asignature_career (asignature_id,career_id ) ".
                 "VALUES ('".$_POST['txtasignature']."','".$_POST['txtcareer']."')";
         @mysql_query($query) or die('Error, query failed'); 
			 header("location: asignaturacareer.php?career_id=".$_POST['txtcareer']);
				}

			}	
					public function removeasignature(){
				if(isset($_POST['txtcareer']) && isset($_POST['txtasignature_val']) ){
					        $query = "DELETE FROM asignature_career ".
                 "WHERE asignature_id = '".$_POST['txtasignature_val']."' AND career_id = '".$_POST['txtcareer']."'";
         @mysql_query($query) or die('Error, query failed'); 
			 header("location: asignaturacareer.php?career_id=".$_POST['txtcareer']);
				}

			}
			
		public function registrarPeriod(){
				if(isset($_POST['txtnombre']) && isset($_POST['txtanio']) ){
				     $query = "INSERT INTO period (name,years ) ".
                 "VALUES ('".$_POST['txtnombre']."',".$_POST['txtanio'].")";
         @mysql_query($query) or die('Error, query failed'); 	
					
				}
		}
	public function Update($array,$career){
							for($i=0;$i<count($array);$i++){
							$query= "UPDATE asignature_career SET px = ".$array[$i][1]." , py= ".$array[$i][2]." WHERE asignature_id= ".$array[$i][0]." AND career_id = ".$career;
							   echo $query;
							   @mysql_query($query) or die('Error, query failed');
							}
			
				     

				
   
			}	
			
		public function registrarAsignature(){
				if(isset($_POST['txtnombre']) && isset($_POST['txtcode']) && isset($_POST['txtcategoria']) ){
				  $query = "INSERT INTO asignature (name,code,uv,category_id ) ".
                 "VALUES ('".$_POST['txtnombre']."','".$_POST['txtcode']."','".$_POST['txtuv']."','".$_POST['txtcategoria']."')";
         @mysql_query($query) or die($query); 	
					
				}
      
			}			
	
		public function registrarCategory(){
				if(isset($_POST['txtnombre']) && isset($_POST['txtcategoria']) ){
					   $query = "INSERT INTO asignature_category (name,departament_id ) ".
                 "VALUES ('".$_POST['txtnombre']."','".$_POST['txtcategoria']."')";
         @mysql_query($query) or die('Error, query failed'); 
					
				}
     
			}	
					public function registerCareer(){
							if(isset($_POST['txtnombre']) && isset($_POST['txtcategoria']) ){
					   $query = "INSERT INTO career (name,departament_id ) ".
                 "VALUES ('".$_POST['txtnombre']."','".$_POST['txtcategoria']."')";
         @mysql_query($query) or die('Error, query failed'); 			
								
							}
     
			}	
					public function registrarDepto(){
							if(isset($_POST['txtnombre'])){
								
							   $query = "INSERT INTO departament (name ) ".
                 "VALUES ('".$_POST['txtnombre']."')";
         @mysql_query($query) or die('Error, query failed'); 	
							}
     
			}	
		public function registrarSeccion(){
				if(isset($_POST['txtcode']) && isset($_POST['txtteacher']) && isset($_POST['txtasignature'])&& isset($_POST['txtperiod'])&& isset($_POST['txtmax']) ){
					
					$query = "INSERT INTO seccion (code,teacher_id,asignature_id,period_id,nro_max_stundet ) ".
                 "VALUES ('".$_POST['txtcode']."','".$_POST['txtteacher']."','".$_POST['txtasignature']."','".$_POST['txtperiod']."','".$_POST['txtmax']."')";
         @mysql_query($query) or die('Error, query failed'); 
				}
        
			}	
			
			
public function verimagen($id){
	$consulta = "SELECT pic, tipof FROM student WHERE id = $id";
	$resultado= @mysql_query($consulta) or die(mysql_error());
	$datos = mysql_fetch_assoc($resultado);
	$imagen = $datos['pic'];
	$tipo = $datos['tipof'];
	header("Content-type: $tipo");
	echo $imagen;
}
	
	public function fav($usuario,$producto){
		$query="INSERT INTO favorito(id_producto,id_usuario) VALUES ('".$producto."',  '".$usuario."'
)";
			$comando = mysqli_query($this->con,$query);

		}
	public function desfav($usuario,$producto){
		$query="delete  from favorito where id_producto = '".$producto."' and id_usuario = '".$usuario."'";
			$comando = mysqli_query($this->con,$query);
		
		}
	
	 public function getCategoria(){
		$comando = mysqli_query($this->con,"SELECT * FROM categoria");
		$base =true;
	 while($result=mysqli_fetch_array($comando)){
		 echo " <li class=";
		 if($base)
		 echo "'odd'";
		 else
		 echo "'even'";
		echo "><a href='catalogo.php?id_categoria=".$result[0]."'>";
		echo $result[1];
		echo "</a></li>";
		 $base =!$base;
		 }
		}
		

		
		public function getProducto($pagina,$categoria,$fusuario){
			$consulta = "SELECT * FROM producto";
			if(isset($_GET['id_categoria']))
			$consulta = $consulta." where id_categoria = ".$_GET['id_categoria'];
				if(isset($_GET['id_Marca']))
			$consulta = $consulta." where id_marca = ".$_GET['id_Marca'];
				$comando = mysqli_query($this->con,$consulta);
				$this->paginas =mysqli_num_rows($comando);
		$this->actual=$pagina;
			$lim0=($pagina-1)*$this->limite;
			$lim1=($pagina)*($this->limite-1);
		$consulta2=$consulta." Limit ".$lim0." , ".$this->limite;
				$comando = mysqli_query($this->con,$consulta2);			
		$base =true;
	 while($result=mysqli_fetch_array($comando)){	
echo 
'<div class="prod_box">
        	<div class="top_prod_box"></div>
            <div class="center_prod_box">            
                 <div class="product_title"><a href="details.html">';
				 echo $result[1];
				 echo '</a></div>
                 <div class="product_img"><a href="details.html"><img src="appcode/imagen.php?id=';
				 echo $result[0];
				 echo'" alt="" title="" border="0" width="94" height="92" /></a></div>
                 <div class="prod_price"><span class="reduce">';
				 echo $result[2];
				 echo '$</span> <span class="price">';
				 echo $result[2];
				 echo '$</span></div>                        
            </div>
            <div class="bottom_prod_box"></div>             
            <div class="prod_details_tab">';
			if(isset($_SESSION['tipo'])){
				$c="'";
			echo '
			<input class="number" id="n'.$result[0].'"  type="number" min="1" value="1"  />';

 
			if(isset($_SESSION['usuario'])){
			$cadena="?";
			if(isset($_GET['id_categoria'])){
				$cadena=$cadena."id_categoria=".$_GET['id_categoria'];
				if(isset($_GET['page'])){
					$cadena=$cadena."&&page=".$_GET['page'];
					}
				}else{
								if(isset($_GET['id_Marca'])){
				$cadena=$cadena."id_Marca=".$_GET['id_Marca'];
				if(isset($_GET['page'])){
					$cadena=$cadena."&&page=".$_GET['page'];
					}
				}else{
						if(isset($_GET['page'])){
					$cadena=$cadena."page=".$_GET['page'];
					}
					}
					}
		
				if($cadena=="?")
				$cadena=$cadena."add=".$result[0];
				else
				$cadena=$cadena."&add=".$result[0];
				
						echo'
            <a onclick="cambiarlink('.$c.'v'.$result[0].$c.','.$c.'n'.$result[0].$c.');" id="v'.$result[0].'" href="'.$cadena.'" title="header=[Add to cart]   body=[&nbsp;] fade=[on]"><img src="images/cart.gif" alt="" title="" border="0" class="left_bt" /></a>';
				}else{
									echo'
            <a  title="header=[Add to cart] body=[&nbsp;] fade=[on]"><img src="images/cart.gif" alt="" title="" border="0" class="left_bt" /></a>';
						}


			
			
			if(isset($_SESSION['usuario'])){
			$cadena="?";
			if(isset($_GET['id_categoria'])){
				$cadena=$cadena."id_categoria=".$_GET['id_categoria'];
				if(isset($_GET['page'])){
					$cadena=$cadena."&&page=".$_GET['page'];
					}
				}else{
								if(isset($_GET['id_Marca'])){
				$cadena=$cadena."id_Marca=".$_GET['id_Marca'];
				if(isset($_GET['page'])){
					$cadena=$cadena."&&page=".$_GET['page'];
					}
				}else{
						if(isset($_GET['page'])){
					$cadena=$cadena."page=".$_GET['page'];
					}
					}
					}
			if($this->esFav($_SESSION['usuario'],$result[0])){
				if($cadena=="?")
				$cadena=$cadena."desfa=".$result[0];
				else
				$cadena=$cadena."&&desfa=".$result[0];
				
						echo'
            <a href="'.$cadena.'" title="header=[Favorito] body=[&nbsp;] fade=[on]"><img src="images/favs.gif" alt="" title="" border="0" class="left_bt" /></a>';
				}else{
							if($cadena=="?")
				$cadena=$cadena."fa=".$result[0];
				else
				$cadena=$cadena."&&fa=".$result[0];
								echo'
            <a href="'.$cadena.'" title="header=[Favorito] body=[&nbsp;] fade=[on]"><img src="images/favs2.gif" alt="" title="" border="0" class="left_bt" /></a>';
					}}else{
									echo'
            <a href="#" title="header=[Favorito] body=[&nbsp;] fade=[on]"><img src="images/favs2.gif" alt="" title="" border="0" class="left_bt" /></a>';
						}

			
			echo'
         
                     
             ';
			}
			
			
			echo '<a href="details.html" class="prod_details">detalles</a>   </div> </div>  ';
 }
			}
		
	
		
		
			public function getProductoF($pagina,$categoria,$fusuario){
			$consulta = "SELECT * FROM producto WHERE id_producto IN (
SELECT id_producto
FROM favorito
WHERE id_usuario =  '".$fusuario."'
)";
			if(isset($_GET['id_categoria']))
			$consulta = $consulta." AND id_categoria = ".$_GET['id_categoria'];
				if(isset($_GET['id_Marca']))
			$consulta = $consulta."  AND id_marca = ".$_GET['id_Marca'];
				$comando = mysqli_query($this->con,$consulta);
				$this->paginas =mysqli_num_rows($comando);
		$this->actual=$pagina;
			$lim0=($pagina-1)*$this->limite;
			$lim1=($pagina)*($this->limite-1);
		$consulta2=$consulta." Limit ".$lim0." , ".$this->limite;
				$comando = mysqli_query($this->con,$consulta2);			
		$base =true;
	 while($result=mysqli_fetch_array($comando)){	
echo 
'<div class="prod_box">
        	<div class="top_prod_box"></div>
            <div class="center_prod_box">            
                 <div class="product_title"><a href="details.html">';
				 echo $result[1];
				 echo '</a></div>
                 <div class="product_img"><a href="details.html"><img src="appcode/imagen.php?id=';
				 echo $result[0];
				 echo'" alt="" title="" border="0" width="94" height="92" /></a></div>
                 <div class="prod_price"><span class="reduce">';
				 echo $result[2];
				 echo '$</span> <span class="price">';
				 echo $result[2];
				 echo '$</span></div>                        
            </div>
            <div class="bottom_prod_box"></div>             
            <div class="prod_details_tab">';
if(isset($_SESSION['tipo'])){
				$c="'";
			echo '
			<input class="number" id="n'.$result[0].'"  type="number" min="1" value="1"  />';

 
			if(isset($_SESSION['usuario'])){
			$cadena="?";
			if(isset($_GET['id_categoria'])){
				$cadena=$cadena."id_categoria=".$_GET['id_categoria'];
				if(isset($_GET['page'])){
					$cadena=$cadena."&&page=".$_GET['page'];
					}
				}else{
								if(isset($_GET['id_Marca'])){
				$cadena=$cadena."id_Marca=".$_GET['id_Marca'];
				if(isset($_GET['page'])){
					$cadena=$cadena."&&page=".$_GET['page'];
					}
				}else{
						if(isset($_GET['page'])){
					$cadena=$cadena."page=".$_GET['page'];
					}
					}
					}
		
				if($cadena=="?")
				$cadena=$cadena."add=".$result[0];
				else
				$cadena=$cadena."&add=".$result[0];
				
						echo'
            <a onclick="cambiarlink('.$c.'v'.$result[0].$c.','.$c.'n'.$result[0].$c.');" id="v'.$result[0].'" href="'.$cadena.'"  title="header=[Add to cart] body=[&nbsp;] fade=[on]"><img src="images/cart.gif" alt="" title="" border="0" class="left_bt" /></a>';
				}else{
									echo'
            <a  title="header=[Add to cart] body=[&nbsp;]  fade=[on]"><img src="images/cart.gif" alt="" title="" border="0" class="left_bt" /></a>';
						}
			if(isset($_SESSION['usuario'])){
			$cadena="?";
			if(isset($_GET['id_categoria'])){
				$cadena=$cadena."id_categoria=".$_GET['id_categoria'];
				if(isset($_GET['page'])){
					$cadena=$cadena."&&page=".$_GET['page'];
					}
				}else{
								if(isset($_GET['id_Marca'])){
				$cadena=$cadena."id_Marca=".$_GET['id_Marca'];
				if(isset($_GET['page'])){
					$cadena=$cadena."&&page=".$_GET['page'];
					}
				}else{
						if(isset($_GET['page'])){
					$cadena=$cadena."page=".$_GET['page'];
					}
					}
					}
			if($this->esFav($_SESSION['usuario'],$result[0])){
				if($cadena=="?")
				$cadena=$cadena."desfa=".$result[0];
				else
				$cadena=$cadena."&&desfa=".$result[0];
				
						echo'
            <a href="'.$cadena.'" title="header=[Favorito] body=[&nbsp;] fade=[on]"><img src="images/favs.gif" alt="" title="" border="0" class="left_bt" /></a>';
				}else{
							if($cadena=="?")
				$cadena=$cadena."fa=".$result[0];
				else
				$cadena=$cadena."&&fa=".$result[0];
								echo'
            <a href="'.$cadena.'" title="header=[Favorito] body=[&nbsp;] fade=[on]"><img src="images/favs2.gif" alt="" title="" border="0" class="left_bt" /></a>';
					}}else{
									echo'
            <a href="#" title="header=[Favorito] body=[&nbsp;] fade=[on]"><img src="images/favs2.gif" alt="" title="" border="0" class="left_bt" /></a>';
						}

			
			echo'
          
                     
             ';
			}
			
			
			echo '<a href="details.html" class="prod_details">detalles</a>   </div> </div>  ';
 }
			}	
		
		
		public function productoEspecial(){
					$consulta = "SELECT * FROM producto";
				$comando = mysqli_query($this->con,$consulta);
				$numero = rand(1,mysqli_num_rows($comando));
				for($i=0;$i<$numero;$i++){
					$result=mysqli_fetch_array($comando);
					}
			
echo '<div class="border_box"> <div class="product_title"><a href="details.html">'.$result[1].'</a></div>
         <div class="product_img"><a href="details.html"><img  width="100" height="100" src="appcode/imagen.php?id='.$result[0].'" alt="" title="" border="0" /></a></div><div class="prod_price"><span class="reduce">'.$result[2].'$</span> <span class="price">'.$result[2].'$</span></div> </div>  ';
			}
		
		
			
public function esFav($usuario,$producto){
				$comando = mysqli_query($this->con,"SELECT COUNT( id_producto ) 
FROM favorito where id_usuario = '".$usuario."' AND id_producto = '".$producto."'");
$result=mysqli_fetch_array($comando);
if( $result[0]>0)
return true;
else
return false;
				}
		
		public function generarPaginas(){
			
			$div = ($this->paginas / $this->limite);
		if(isset($_GET['id_categoria'])){
						for($i =0;$i<$div;$i++){
				if(($i+1)==$this->actual)
			echo  ' <b>'.($i+1).'</b>';
						
			if(($i+1)!=$this->actual)
			echo  ' <a href="?id_categoria='.$_GET['id_categoria'].'&&page='.($i+1).'">'.($i+1).'</a>';
			}

			
			}else{
				if(isset($_GET['id_Marca'])){
										for($i =0;$i<$div;$i++){
													if(($i+1)==$this->actual)
			echo  ' <b>'.($i+1).'</b>';
			if(($i+1)!=$this->actual)
			echo  ' <a href="?id_Marca='.$_GET['id_Marca'].'&&page='.($i+1).'">'.($i+1).'</a>';
			}
					
					}else{
								for($i =0;$i<$div;$i++){
											if(($i+1)==$this->actual)
			echo  ' <b>'.($i+1).'</b>';
			if(($i+1)!=$this->actual)
			echo  ' <a  href="?page='.($i+1).'">'.($i+1).'</a>';
			}
				}		
                                                }
                          }
                

		
		public function registrarMarca(){
				if(isset($_POST['txtNombreMarca']) && isset($_POST['txtOrigenMarca'])){
	$nombre=$_POST['txtNombreMarca'];
	$origen=$_POST['txtOrigenMarca'];
	
	$insertar=sprintf("INSERT INTO marca (Nombre,Origen) VALUES('%s','%s')",$nombre,$origen);
	$resultado = mysqli_query($this->con,$insertar);
	
	}
			}
			
		public function registrarUsuario(){
				if(isset($_POST['txtNombre']) && isset($_POST['txtApellido'])){
	$insertar=sprintf("INSERT INTO  usuario (
Usuario ,
pass ,
Nombre ,
Apellido ,
email ,
direccion ,
Nacimiento,
Tipo
)
VALUES ( '%s',  '%s',  '%s',  '%s',  '%s',  '%s',  '%s',  '0'
);
",$_POST['txtUser'],$_POST['txtPass'],$_POST['txtNombre'],$_POST['txtApellido'],$_POST['txtMail'],$_POST['txtDireccion'],$_POST['txtFecha']);
echo $insertar;
	$resultado = mysqli_query($this->con,$insertar);
	return $resultado;
	}
			}
			
					public function registrarCategoria(){
	if(isset($_POST["txtNombreCategoria"],$_POST["txtDesCategoria"])){
	$nombre =$_POST["txtNombreCategoria"];
	$des =$_POST["txtDesCategoria"];	
	$insertar=sprintf("INSERT INTO categoria (Nombre,Descripcion) VALUES('%s','%s')",$nombre,$des);
	$resultado = mysqli_query($this->con,$insertar);
	}
			}
			
		
		public function generarpaneles($tipo){
echo '
			             <li><a href="index.php" class="nav1">  Home </a></li>
                         <li class="divider"></li>
                         <li><a href="catalogo.php" class="nav2">Producto</a></li>
                         <li class="divider"></li>
						 
';          
if($tipo==0){
echo   '<li><a href="favorito.php" class="nav3">Favoritos</a></li>
                         <li class="divider"></li>
						     <li><a href="#" class="nav5">Shipping </a></li>
                         <li class="divider"></li>
                         <li><a href="contact.html" class="nav4">Contact Us</a></li>
                         <li class="divider"></li>
                         <li class="currencies">Moneda
                         <select>
                         <option>Lps.</option>
                         <option>US Dollar</option>
                         </select>
                         </li>';
						 
	}      if($tipo==1){
echo   '<li><a href="registrarProducto.php" class="nav2">Add Producto</a></li>
                         <li class="divider"></li>
						 <li><a href="registrarMarca.php" class="nav2">Add Marca</a></li>
                         <li class="divider"></li>
                         <li><a href="registrarcategoria.php" class="nav2">Add Cate</a></li>
                         <li class="divider"></li>
                         <li class="currencies">Moneda
                         <select>
                         <option>Lps.</option>
                         <option>US Dollar</option>
                         </select>
                         </li>'
						 ;
	}       
  
						  
echo '						              
          
                            <li class="divider"></li>
                         <li><a href="#" class="nav6">My account</a></li>
                         <li class="divider"></li>                 
';
if(!isset($_SESSION['usuario'])){
	echo '<li><a href="login.php" class="nav6">Login</a></li>';
	}else{
		echo '<li><a href="logout.php" class="nav6">Logout</a></li>';
		}
			}
		
		public function getIdUsuario($user,$pass){
			$consulta = "SELECT * FROM usuario where usuario = '".$user."' and pass = '".$pass."'";
			$comando = mysqli_query($this->con,$consulta);
			$pag=mysqli_num_rows($comando);
			if($pag>0){
				$result=mysqli_fetch_array($comando);	
			return $result[0];}
			else{
				return -1;
				}
			}
			
		public function getTipoUsuario($id){
			
			$consulta = "SELECT tipo FROM usuario where id_usuario = '".$id."'";
						$comando = mysqli_query($this->con,$consulta);	
						$result=mysqli_fetch_array($comando);	
			return $result[0];
			}
		
		
		
			public function getproductoc(){
			$carro=$_SESSION['carro'];
			foreach($carro as $valor){
				$id=$valor->getProducto();
				$can=$valor->getCantidad();
				$consulta = "SELECT nombre,precioBase,Descripcion FROM producto where id_producto = '".$id."'";
			$comando = mysqli_query($this->con,$consulta);	
			
				 while($result=mysqli_fetch_array($comando)){	
echo 
'<div class="prod_box">
        	<div class="top_prod_box"></div>
            <div class="center_prod_box">            
                 <div class="product_title"><a href="details.html">';
				 echo $result[0];
				 echo ' X'.$can.'</a></div>
                 <div class="product_img"><a href="details.html"><img src="appcode/imagen.php?id=';
				 echo $id;
				 echo'" alt="" title="" border="0" width="94" height="92" /></a></div>
                 <div class="prod_price"><span class="reduce">';
				 echo $result[1];
				 echo '$</span> <span class="price">';
				 echo $result[1];
				 echo '$</span></div>      </div>                   
            </div>';}
			
			
				}
			}
		
		public function insertarVenta(){
			$fecha=date('Y-m-d H:i:s');
			$query= "INSERT INTO venta( fecha, entrega ) 
VALUES (
 '".$fecha."',  'false'
)";
			$comando=mysqli_query($this->con,$query);
			
$idVenta= mysqli_insert_id($this->con);
			$carro=$_SESSION['carro'];
			foreach($carro as $valor){
				$id=$valor->getProducto();
				$can=$valor->getCantidad();
				
				}




			}
		
		public function producircarrito(){
					$carro=$_SESSION['carro'];
					
			$total =count($carro);
			$item=0;
			$precio=0;
			for($i=0;$i<$total;$i++){
				$id =$carro[$i]->getProducto();
				$val=intval((int)$carro[$i]->getCantidad());
(int)$item =intval ((int)$item+(int)$val);
						
			$consulta = "SELECT preciobase FROM producto where id_producto = '".$id."'";
			$comando = mysqli_query($this->con,$consulta);	
			$result = mysqli_fetch_array($comando);
(int)$precio= (int)($precio+( (int)$result[0]*$carro[$i]->getCantidad()));
$item= intval ($item);


				}
				
				echo '
			   <div class="cart_details">';
              echo (($item));
			 echo ' items <br />
            <span class="border_cart"></span>
            Total: <span class="price">';echo (($precio));
			echo'$</span>
            </div>';
		


			}
		
			 public function getMarca(){
		$comando = mysqli_query($this->con,"SELECT * FROM marca");
		$base =true;
	 while($result=mysqli_fetch_array($comando)){
		 echo " <li class=";
		 if($base)
		 echo "'odd'";
		 else
		 echo "'even'";
		echo "><a href='catalogo.php?id_Marca=".$result[0]."'>";
		echo $result[1];
		echo "</a></li>";
		 $base =!$base;
		
		 }
		}
		
		}
?>
