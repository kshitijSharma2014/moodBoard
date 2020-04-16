var data_row;

$('#exportTable').on('click', 'tbody .exportTblDelete', function () { 
    $('#deleteConfirmation').show(); 
    data_row = expTable.row($(this).closest('tr')).data(); 
    
});

function deleteFileApi() {
    $.ajax({ url: "/PLM/DeleteFileData?filenameToDelete=" + data_row.filename, dataType: "json", })
    .done(function (data) { 
        exportTableCounter = 0; 
        expTable.ajax.reload(); 
    }); 
}


in html on delete confirm btn

onclick="deleteFileApi()"
