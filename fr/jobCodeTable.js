
var jobCodeTableCounter=0;
var empOrderBy = 'ilastupdatedon';

var jobCodeTable = $('#jobCodeTable').DataTable({
    "ajax": {
        url:"/FR/GetRoleData?orderBy="+empOrderBy,
        cache: true,
    },
    "language": {
        "infoEmpty": "No records available - Got it?",
    },
    "paging": true,
    "info": true,
    "retrieve": true,
    "ordering": false,
    bSortable: false,
    bProcessing: true,
    "lengthChange": false,
    "bLengthChange": false,
    "columns": [
        {
            "data": "sr_no",
            "render": function (data, type, row, meta) {
                ++jobCodeTableCounter;
                return '<div>' + jobCodeTableCounter + '</div>';
            }
        },
        {
            "data": "jobcode",
            "render": function (data, type, row, meta) {
                return '<div>' + row.jobcode + '</div>';
            }
        },
        {
            "data": "createdby",
            "render": function (data, type, row, meta) {
                return '<div value=' + row.createdby + ' class="jobIdSelect">' + row.createdby + '</div>';
            }
        },
        {
            "data": "createdon",
            "render": function (data, type, row, meta) {
                return '<div value=' + row.createdon + ' >' + row.createdon + '</div>';
            }
        },
        {
            "data": "MODIFIEDBY",
            "render": function (data, type, row, meta) {
                return '<div>' + row.MODIFIEDBY + '</div>';
            }
        },
        {
            "data": "modifiedon",
            "render": function (data, type, row, meta) {
                return '<div value=' + row.modifiedon + ' >' + row.modifiedon + '</div>';
            }
        },
        {
            "data": "ifavailable",
            "render": function (data, type, row, meta) {
                return '<div>' + row.ifavailable + '</div>';
            }
        },
        {
            "data": "ifmandatory",
            "render": function (data, type, row, meta) {
                return '<div>' + row.ifmandatory + '</div>';
            }
        },
        {
            "render": function (data, type, row, meta) {
                return '<img src="/Areas/Admin/images/editRow.png" class="jobRoleEdit" style="width: 14px;cursor:pointer;" id="jobRoleEdit" />' +
                    '<img src="/Areas/Admin/images/deleteRow.png" class="jobRoleDelete" style="width: 14px;margin-left: 10px;cursor:pointer;" id="jobRoleDelete"  />';
            }
        },
    ]
});
$('#jobCodeTable').removeClass('form-inline dt-bootstrap no-footer dataTable');
$('#jobCodeTable_wrapper').removeClass('dataTables_wrapper form-inline dt-bootstrap no-footer');



function onChangejobCodeSort(e) {
    let value = e.target.value;
    empOrderBy = value;
    jobCodeTableCounter = 0;
    esaTable.ajax.url("/FR/GetRoleData?orderBy=" + empOrderBy).load()
}

    function onjobCodeClick(e) {
        var jobCodeVal = e.target.id;
        $('#addJobCode').val(jobCodeVal);
        $('#jobCodeList').hide();
        $('#jobCodeList').empty();

    }

 $('#addRole').on('click', function () {

        $('#newRoleModal').show();
        dragElement(document.getElementById("newRoleModal"));
    });

      $('#jobCodeTable').on('click', 'tbody .jobRoleEdit', function () {
        var data_row = empTable.row($(this).closest('tr')).data();
        jobRoleEditMode = true;
        $("#newRoleModal").show();
       $('#jobCodeInput').val(data_row.jobcode);
        $("#jobCodeInput").prop('disabled', true);
        $("input[name=jobCodeMandatory][value=" + data_row.ifmandatory + "]").attr('checked', 'checked');
       $("input[name=jobCodeAvailable][value=" + data_row.ifavailable + "]").attr('checked', 'checked');
       $("input[name=jobCodeRegistered][value=" + data_row.ifregistered + "]").attr('checked', 'checked');
    });



function addJobRoleRow() {

    var datatableData = {
        ifmandatory: $("input[name=jobCodeMandatory]").val(),
        ifavailable: $("input[name=jobCodeAvailable]").val(),
        ifregistered: $("input[name=jobCodeRegistered]").val(),
       jobcode: $('#jobCodeInput').val(),
    }

     $.ajax({
            type: "POST",
            url: '/FR/AddUppdateRole',
            data: { 'FrRoleData': datatableData },
            'Content-Type': 'application/json; charset=utf-8',
            async: false,
            success: function (data) {
                
             }
        });
        closeJobRoleModal();
}


function closeJobRoleModal() {
        $('#jobCodeInput').val('');
        $('#jobCodeList').empty();
        $("#jobCodeInput").prop('disabled', false);
        $('#jobCodeList').hide();
        $('#newRoleModal').hide();

}

function roleTablExport() {
    $.ajax({
           url: "/FR/DownloadFIle?ifEmpRole=ROLE",
           type: 'GET',
           contentType: 'application/x-www-form-urlencoded',
        }).done(function (data) {

        });
}


function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV: 
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}