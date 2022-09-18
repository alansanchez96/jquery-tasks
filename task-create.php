<?php 

    include('database.php');
    include('funciones.php');

    $task_name = $_POST['task'];
    $task_description = $_POST['descripcion'];

    if(isset($task_name)){
        $query = "INSERT INTO tasks (task, descripcion) VALUES ('".$task_name."', '".$task_description."');";

        $resultado = mysqli_query($db, $query);

        if($resultado){
            echo 'Tarea agregada correctamente';
        }
    }
?>