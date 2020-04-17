$('#importFileModal').hide();
$('#updateFileModal').hide();
$('#exportFileTableModal').hide();
var exportTableCounter = 0;
var expTable = $('#exportTable').DataTable({
    "ajax": {
        url: "PLM/GetAllFileData",
        cache: true,
    },
    "language": {
        "infoEmpty": "No records available - Got it?",
    },
    "paging": true,
    "info": true,
    "retrieve": true,
    bSortable: true,
    bProcessing: true,
    "lengthChange": false,
    "bLengthChange": false,
    "scrollX": true,
    "drawCallback": function (settings) {

        $('[data-toggle="tooltip"]').tooltip({
            placement: 'bottom',
        });
    },
    "columns": [
        {
            "data": "sr_no",
            "render": function (data, type, row, meta) {
                ++exportTableCounter;
                return '<div>' + exportTableCounter + '</div>';
            }
        },
        {
            "data": "filename",
            "width": 200,
            "render": function (data, type, row, meta) {
                return '<div data-toggle="tooltip" data-original-title=' + row.filename + ' value=' + row.filename + ' class="filename">' + row.filename + '</div>';
            }
        },
        {
            "data": "totalsites",
            "width": 100,
            "render": function (data, type, row, meta) {
                return '<div>' + row.totalsites + '</div>';
            }
        },
        {
            "data": "smssent",
            "width": 100,
            "render": function (data, type, row, meta) {
                return '<div>' + row.smssent + '</div>';
            }
        },
        {
            "data": "verified",
            "width": 100,
            "render": function (data, type, row, meta) {
                return '<div>' + row.verified + '</div>';
            }
        },
        {
            "data": "notverified",
            "width": 120,
            "render": function (data, type, row, meta) {
                return '<div>' + (row.totalsites - row.verified) + '</div>';
            }
        },
        {
            "data": "uploadedby",
            "width": 120,
            "render": function (data, type, row, meta) {
                return '<div>' + row.uploadedby + '</div>';
            }
        },
        {
            "data": "uploadedon",
            "width": 120,
            "render": function (data, type, row, meta) {
                return '<div>' + row.uploadedon + '</div>';
            }
        },
        {
            "data": "exportedby",
            "width": 120,
            "render": function (data, type, row, meta) {
                return '<div>' + row.exportedby + '</div>';
            }
        },
        {
            "data": "exportedon",
            "width": 120,
            "render": function (data, type, row, meta) {
                return '<div>' + row.exportedon + '</div>';
            }
        },
        {
            "data": "updatedby",
            "width": 120,
            "render": function (data, type, row, meta) {
                return '<div>' + row.updatedby + '</div>';
            }
        },
        {
            "data": "updatedon",
            "width": 120,
            "render": function (data, type, row, meta) {
                return '<div>' + row.updatedon + '</div>';
            }
        },
        {
            "width": 100,
            "render": function (data, type, row, meta) {
                return '<div>   <span><img data-toggle="tooltip" data-original-title="Send SMS" src="/Areas/Admin/images/sms.png" class="sendsmsbtn" style="width: 14px;cursor:pointer;margin-right:4px;" /></span> <span><img data-toggle="tooltip" data-original-title="Edit File" src="/Areas/Admin/images/editRow.png" class="rowEditbtn" style="width: 14px;cursor:pointer;margin-right:4px;" /></span> <span><img data-toggle="tooltip" data-original-title="Export" src="/Areas/Admin/images/excel_export.png" class="exportFileXcelbtn" style="width: 14px;cursor:pointer;margin-right:4px;" /></span> <span><img data-toggle="tooltip" data-original-title="Delete" src="/Areas/Admin/images/deleteRow.png" class="exportTblDelete" style="width: 14px;cursor:pointer;" /></span> </div>';
            }
        },
        //{
        //    "render": function (data, type, row, meta) {

        //        return '<button class="btn btn-primary btn-sm sendsmsbtn" style="font-size : 12px;padding:2px 3px;" >Send SMS</button>';
        //        }
        //},     
    ],
});
$('#exportTable').removeClass('form-inline dt-bootstrap no-footer dataTable');
$('#exportTable_wrapper').removeClass('dataTables_wrapper form-inline dt-bootstrap no-footer');

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
            $('#deleteConfirmation').hide();
        });
}
function closeConfirmationBox() { $('#deleteConfirmation').hide(); }
function closeSnoAlertBox() {
    window.setTimeout(function () {
        $("#snoAlertBox").fadeOut(300)
    }, 5000);
}

$('#exportTable').on('click', 'tbody .sendsmsbtn', function () {
    var expTableData = expTable.row($(this).closest('tr')).data();
    var filename = expTableData.filename;
    $.ajax({ method: "POST", url: "/PLM/SendSMS", contentType: 'application/json; charset=utf-8', datatype: 'json', data: JSON.stringify({ 'fileName': filename }) })
        .done(function (response) {
            debugger;
            $("#snoAlertBox").empty();    
            $("#snoAlertBox").fadeIn();
            $('<p style="font-size:12px">SMS sent.</p>').appendTo('#snoAlertBox');
            closeSnoAlertBox();
            debugger;
            exportTableCounter = 0;
            expTable.ajax.reload();
        });
})



$('.exportTblRefresh').on('click', function () {
    expTable.ajax.reload();
});

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip({
        placement: 'bottom'
    });
});

$('#exportTable').on('click', 'tbody .exportFileXcelbtn', function () {
    var expTableData = expTable.row($(this).closest('tr')).data();
    var filename = expTableData.filename;
    //$.ajax({ method: "GET", url: "/PLM/DownloadFilePlm", contentType: 'application/json; charset=utf-8', datatype: 'json', data: JSON.stringify({ 'filenameToDownload': filename }) })
    //   .done(function (response) { console.log("Data Saved: " + response.responsetext); });
    ExportExcelFile(filename);
})
function ExportExcelFile(filename) {
    urltoexport = "PLM/DownloadFilePlm";
    //var name = $("#hdnReportExcelFileName").val();
    //var path
    window.location = urltoexport + "/?filenameToDownload=" + filename;
    //expTable.ajax.reload();
}

function closeFileDataModal() {
    $('#exportTableModal').hide();
}
function updateFileDataAPI() {
    var arrData1 = [];
    var data2 = expFileTable.rows().data().toArray();
    data2.map(function (item, indx) {

        var data = {
            siteid: item.siteid,
            vendor: item.vendor,
            name1: item.name1,
            address1: item.address1,
            city: item.city,
            state: item.state,
            type: item.type,
            spocname: item.spocname,
            spocmobilenumber: item.spocmobilenumber,
            name2: item.name2,
            address2: item.address2,
            address3: item.address3,
            pin: item.pin,
            lat: item.lat,
            lon: item.lon,
            l1feasibility: item.l1feasibility

        };

        arrData1.push(data);

    });
    $.ajax({ method: "POST", url: "/PLM/UpdateSiteData", contentType: 'application/json; charset=utf-8', datatype: 'json', data: JSON.stringify({ 'data': arrData1 }) })
        .done(function (response) { console.log("Data Saved: " + response.responsetext); });
    closeFileDataModal();
}

var updateFileData;

$('#exportTable').on('click', 'tbody .rowEditbtn', function () {
    updateFileData = expTable.row($(this).closest('tr')).data();
    $('#updateFileModal').show();
})

function hideUpdateFileModal() {
    $('#updateFileModal').hide();
}

$('#importNewFilebtn').on('click', function () {
    $('#importFileModal').show();
})

function hideImportFileModal() {
    $('#importFileModal').hide();
}