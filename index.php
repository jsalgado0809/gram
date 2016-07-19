<?php
require_once 'appcode/conexion.php';
$con = new conexion();
session_start();

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

		<div>
			<canvas id="canvas">
			</canvas>
		</div>	

		<div id="footer">
			<p>Generador de Flujos</p>
		</div>	
	</div>
</body>
</html>