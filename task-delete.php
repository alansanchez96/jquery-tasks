<?php 

include('database.php');
include('funciones.php');

if(isset($_POST['id'])){

    $query = "DELETE FROM tasks WHERE id = '". $_POST['id'] . "'";

    $result = mysqli_query($db, $query);

    if(!$result){
        echo 'Mal ahi';
    } else {
        echo 'bien hecho';
    }

}