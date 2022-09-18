<?php 

    include('database.php');
    include('funciones.php');

    $query = "SELECT * FROM tasks";

    $resultado = mysqli_query($db, $query);

    if($resultado){

        $json = [];

        while ($row = mysqli_fetch_array($resultado)) {
            $json[] = [
                'id' => $row['id'],
                'task' => $row['task'],
                'descripcion' => $row['descripcion']
            ];
        }

        $jsonString = json_encode($json);

        echo $jsonString;
    }