var dataTable;
$(document).ready(function () {
    loadDataTable();     
});
function loadDataTable() {
    dataTable = $('#DT_Book').dataTable({
        "ajax": {
            "url": "/api/book",
            "type": "GET",
            "datatype":"json"
        },
        "columns": [
            { "data": "name", "widht": "20%"},
            { "data": "author", "widht": "20%" },
            { "data": "isbn", "widht": "20%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                              <a href="/BookList/Edit?id=${data}" class='btn btn-success text-white' style='cursor:pointer:width:70px;'>Edit</a>
                            &nbsp;
                            <a  class='btn btn-danger text-white' style='cursor:pointer:width:70px;'>Delete</a>
                            <div>`;
                },"widht":"20%"
            }
        ],
        "language": {
            "emptyTable":"No data found"
        }
    });
}