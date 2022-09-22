<?php

include('database.php');
include('funciones.php');

$id = $_POST['id'];
$task = $_POST['task'];
$descripcion = $_POST['descripcion'];

if(isset($id)){
    $query = "UPDATE tasks SET task = '". $task . "', descripcion = '". $descripcion ."' WHERE id = '". $id ."'";
    $result = mysqli_query($db, $query);

    if($result){
        echo 'Tarea Actualizada';
    } else{
        echo 'No se pudo actualizar';
    }

}