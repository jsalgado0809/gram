<?php
require_once 'appcode/conexion.php';
$con = new conexion();
session_start();
	  if(isset($_POST['Aceptar']))
{
$con->registrarAsignature();                    
        header("location: index.php");
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
	<title>Distinctive - web development company</title>
</head>
<body>
	<div id="content">
		<p id="top">Duis rutrum dapibus diam. Sed turpis sem, suscipit et, ullamcorper vel, aliquam in, tellus.</p>
		<div id="logo">
			<h1><a href="index.php">distinctive</a></h1>
		</div>
		<ul id="menu">
			<li class="current"><a href="index.php">Home</a></li>
			<li><a href="#">News</a></li>
			<li><a href="registrarstudent.php">Registrar Alumno</a></li>
		<li><a href="registrarteacher.php">Registrar Maestro</a></li>
			<li><a href="#">Services</a></li>
			<li><a href="#">About</a></li>
			<li><a href="#">Contact</a></li>
		</ul>
		<div class="line"></div>


    
 <form enctype="multipart/form-data" name="uploadform" method="post" action="registrarasignatura.php">
 
 <table width="400px" border="0" align="center">
 <tr><td>
 <h1>Nombre</h1>
 </td><td>
 <input type="text" name="txtnombre" required />
 </td></tr>
  <tr><td>
 <h1>Codigo</h1>
 </td><td>
 <input type="text" name="txtcode" required />
 </td></tr>
   <tr><td>
 <h1>UV</h1>
 </td><td>
 <input type="number" name="txtuv" required />
 </td></tr>
   <tr><td>
 <h1>Departamento</h1>
 </td><td>
 <?php
$con->generarSelect("asignature_category","txtcategoria");
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
			<p>&copy; Copyright 2009 Distinctive &minus; Design: Luka Cvrk, <a href="http://www.solucija.com" title="Free CSS Templates">Solucija</a></p>
		</div>	
	</div>
</body>
</html>