var dataTable;
$(document).ready(function () {
    loadDataTable();     
});
function loadDataTable() {
    dataTable = $('#DT_Book').dataTable({
        "ajax": {
            "url": "/api/book",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "name", "widht": "20%" },
            { "data": "author", "widht": "20%" },
            { "data": "isbn", "widht": "20%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                              <a href="/BookList/Upsert?id=${data}" class='btn btn-success text-white' style='cursor:pointer:width:70px;'>Edit</a>
                            &nbsp;
                            <a onclick="Delete('/api/Book?id='+${data})"  class='btn btn-danger text-white' style='cursor:pointer:width:70px;'>Delete</a>
                            <div>`;
                }, "widht": "20%"
            }
        ],
        "language": {
            "emptyTable": "No data found"
        }
    });
}
function Delete(url) {
        swal({
            title: "Are you sure?",
            text: "Once Deleted , you will not be able to recover",
            icon: "warning",
            buttons: true,
            dangerMode: true,

        }).then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    url: url,
                    type: "DELETE",
                    success: function (data) {
                        if (data.success) {
                            toastr.success(data.message);
                            dataTable.api().ajax.reload();
                        } else {
                            toastr.error(data.message);
                        }
                    }
                });
            }
        });
    }