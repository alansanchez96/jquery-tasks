<?php 

include('database.php');
include('funciones.php');

$id = $_POST['id'];

if(isset($id)){
    $query = "SELECT * FROM tasks WHERE id = '" . $id . "';";

    $result = mysqli_query($db, $query);

    if(!$result){
        echo 'Error Conexion';
    } else{
        
        $json = [];

        while($row = mysqli_fetch_array($result)){
            $json[] = [
                'id' => $row['id'],
                'task' => $row['task'],
                'descripcion' => $row['descripcion']
            ];
        }

        $jsonString = json_encode($json);
    }

}