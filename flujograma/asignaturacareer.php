<?php
require_once 'appcode/conexion.php';
$con = new conexion();
session_start();

	  if(isset($_POST['Aceptar']))
{
$con->addasignature();                    
} 
	  if(isset($_POST['Borrar']))
{
$con->removeasignature();                    
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
  location.href="asignaturacareer.php?career_id="+myselect.options[myselect.selectedIndex].value;
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


    
 <form enctype="multipart/form-data" name="uploadform" method="post" action="">
 
 <table width="400px" border="0" align="center">
    <tr><td>
 <h1>Carrera</h1>
 </td><td>
 <?php
$con->generarSelect5("career","txtcareer");
 ?>
 </td></tr>
     <tr><td>
 <h1>Asignatura</h1>
 </td><td>
 <?php
 if(isset($_GET["career_id"])){
	 $con->generarSelect3($_GET["career_id"],"txtasignature");
 }else{
	$con->generarSelect("asignature","txtasignature"); 
	 
 }
 ?>
 </td></tr>
      <tr><td>
  <h1>Asignaturas Disponibles </h1>
 </td><td>
 <?php
 if(isset($_GET["career_id"])){
	 $con->generarSelect4($_GET["career_id"],"txtasignature_val");
 }
 ?>
 </td></tr>
 
    <tr><td>
<input type="submit" name="Borrar" value="Borrar"/>
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