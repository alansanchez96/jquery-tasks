$(document).ready(() => {

    let editar = false;

    $('#cardSearch').hide();
    mostrarTasks();

    $('#submitSearch').click( e =>{
        e.preventDefault();
    });

    $('#searchBtn').keyup(() => {
        searchTask();
    });

    $('#taskCreate').submit((e) => {
        e.preventDefault();
        let url = editar === false ? 'task-create.php' : 'task-update.php';

        const postData = {
            'id': $('#taskId').val(),
            'task': $('#taskName').val(),
            'descripcion': $('#taskDescription').val()
        }

        $.ajax({
            url: url,
            type: 'post',
            data: postData,
            success: response => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Tarea guardada con éxito',
                    showConfirmButton: false,
                    timer: 1500
                });
                $('#taskCreate').trigger('reset');
                console.log(response);
            }
        });

        mostrarTasks();
    });

    // Eliminar
    $(document).on('click', '.task-delete', deleteTask);
    // Postear datos existentes en formulario
    $(document).on('click', '.task-edit', (e) => {

        editar = true;

        let element = e.target.parentElement.parentElement;
        let id = $(element).attr('taskId');

        $.ajax({
            url: 'task-single.php',
            type: 'post',
            data: { id },
            success: (response) => {
                const task = JSON.parse(response);
                $('#taskId').val(id);
                $('#taskName').val(task[0].task);
                $('#taskDescription').val(task[0].descripcion);
            }
        });
    });

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
                    <td><a href="#" class="task-edit">${task.task}</a></td>
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

const searchTask = () => {
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
    });
}