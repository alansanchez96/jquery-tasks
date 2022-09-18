<?php

include 'database.php';
include 'funciones.php';

$search = $_POST['search'];

if (!empty($search)) {

    $query = 'SELECT * FROM tasks WHERE task LIKE "'. $search . '%" LIMIT 1;';

    $resultado = mysqli_query(
        $db,
        $query
    );

    if (!$resultado) {
        die('Error query' . mysqli_error($db));
    }
    else{
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

}
