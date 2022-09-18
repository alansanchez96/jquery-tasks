$(document).ready(() => {

    $('#cardSearch').hide();
    mostrarTasks();

    $('#searchBtn').keyup(() => {
        searchTask();
    });

    $('#taskCreate').submit((e) => {
        e.preventDefault();
        createTask();
        mostrarTasks();
    });

    $(document).on('click', '.task-delete', deleteTask);

});

const mostrarTasks = () => {
    $.ajax({
        url: 'task-list.php',
        type: 'GET',
        success: response => {

            const tasks = JSON.parse(response);
            let template = '';

            tasks.forEach(task => {
                template += `
                <tr taskId="${task.id}">
                    <td>${task.id}</td>
                    <td>${task.task}</td>
                    <td>${task.descripcion}</td>
                    <td>
                        <button class="task-delete btn btn-danger">Eliminar</button>
                    </td>
                </tr>`;
            });

            $('#taskList').html(template);

        }
    });
}

searchTask = () => {
    if ($('#searchBtn').val()) {
        let search = $('#searchBtn').val();

        $.ajax({
            url: 'task-search.php',
            type: 'POST',
            data: { search: search },      // o { search } - jQuery es suficientemente inteligente
            success: response => {

                const tasks = JSON.parse(response);
                let template = '';

                tasks.forEach(task => {
                    template += `<li class="list-group-item d-flex justify-content-between align-items-center">
                    ${task.task}
                </li>`;
                });

                $('#cardBody').html(template);
                $('#cardSearch').show();
            }
        });
    } else {
        $('#cardSearch').hide();
    }
}

createTask = () => {

    const postData = {
        'id': $('#id').val(),
        'task': $('#taskName').val(),
        'descripcion': $('#taskDescription').val()
    }

    $.post('task-create.php', postData, respuesta => {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Tarea creada con éxito',
            showConfirmButton: false,
            timer: 1500
        });
        console.log(respuesta);
        $('#taskCreate').trigger('reset');
    });

}

const deleteTask = (e) => {

    Swal.fire({
        title: 'Estás seguro de querer eliminar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Tarea Eliminada',
                'La tarea se eliminó correctamente',
                'success'
            )
            let btnDelete = e.target.parentElement.parentElement;
            let id = $(btnDelete).attr('taskId');

            $.post('task-delete.php', { id }, (response) => {
                console.log(response);
                mostrarTasks();
            });
        }
    })



}