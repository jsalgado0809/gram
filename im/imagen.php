<?php
mysql_connect("localhost", "admin", "admin") or die(mysql_error()) ;
mysql_select_db("flujograma") or die(mysql_error()) ;
$id = $_GET['id'];
if ($id > 0){
	$consulta = "SELECT pic, tipof FROM student WHERE id = $id";
	$resultado= @mysql_query($consulta) or die(mysql_error());
	$datos = mysql_fetch_assoc($resultado);
	$imagen = $datos['pic'];
	$tipo = $datos['tipof'];
	header("Content-type: $tipo");
	echo $imagen;
}

?>