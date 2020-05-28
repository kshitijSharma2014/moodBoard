$('#mandatoryCheckModal').hide();
var empTableCounter = 0;
var empOrderBy = 'createdon';
var empEditMode = false;
var empTable = $('#empTable').DataTable({
    "ajax": {
        url: "/FR/GetEmpData?orderBy=" + empOrderBy,
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
                ++empTableCounter;
                return '<div>' + empTableCounter + '</div>';
            }
        },
        {
            "data": "employeeid",
            "render": function (data, type, row, meta) {
                return '<div>' + row.employeeid + '</div>';
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
            "data": "modifiedby",
            "render": function (data, type, row, meta) {
                return '<div>' + row.modifiedby + '</div>';
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
            "data": "ifRegistered",
            "render": function (data, type, row, meta) {
                return '<div>' + row.ifregistered + '</div>';
            }
        },
        {
            "render": function (data, type, row, meta) {
                return '<img src="/Areas/Admin/images/editRow.png" class="empEdit" style="width: 14px;cursor:pointer;" id="empEdit" />';
            }
        },
    ]
});
$('#empTable').removeClass('form-inline dt-bootstrap no-footer dataTable');
$('#empTable_wrapper').removeClass('dataTables_wrapper form-inline dt-bootstrap no-footer');



function onChangeEmpSort(e) {
    let value = e.target.value;
    empOrderBy = value;
    empTableCounter = 0;
    empTable.ajax.url("/FR/GetEmpData?orderBy=" + empOrderBy).load()
}

function checkIfEmplExists(empId) {
    $.ajax({
        type: "Get",
        url: '/FR/GetEmp?employeeid='+empId,
        'Content-Type': 'application/json; charset=utf-8',
        success: function (data) {
            if (data.createdon !== '') {
                $("#employeeModalTitle").html("Update Employee");
                $("input[name=empMandatory][value=" + data_row.ifmandatory + "]").attr('checked', data.ifmandatory === 'Yes' ? 'checked' : false);
                $("input[name=empAvailable][value=" + data_row.ifavailable + "]").attr('checked', data.ifavailable === 'Yes' ? 'checked' : false);
                $("input[name=empRegistered][value=" + data_row.ifregistered + "]").attr('checked', data.ifregistered === 'Yes' ? 'checked' : false);
            }
        }
    });
}

function onEmpIdClick(e) {
    var empId = e.target.id;
    $('#addEmpId').val(empId);
    $('#empList').hide();
    $('#empList').empty();
    $('#employeeDetails').show();
    var empData =  searchEmpDta.filter(function(item) {
        return item.employeeid == empId;
    });
    debugger;
    $('#employeename').html(empData.employeename);
    $('#username').html(empData.username);
    $('#jobcode').html(empData.jobcode);
    $('#mobile').html(empData.mobile);
    checkIfEmplExists(empId);
}

$('#empAdd').on('click', function () {
    $('#newEmpModal').show();
    $("#employeeModalTitle").html("Add Employee");
    dragElement(document.getElementById("newEmpModal"));
    $("input[name=empMandatory]").attr('checked', false);
    $("input[name=empAvailable]").attr('checked', false);
    $('#addEmpId').on("input", SearchEmpSolr);
});

$('#empTable').on('click', 'th', function() {
    var info = table.fnSettings().aaSorting;
    var idx = info[0][0];
    alert(idx);
});

var searchEmpDta = [];

function SearchEmpSolr(e) {
    var queryParam = e.target.value;
    if (queryParam.length === 0) {
        $('#empList').hide();
        $('#empList').empty();
    }
    if (queryParam.length > 2) {
        var drpItems = [];

        $.ajax({
            type: "GET",
            url: '/FR/hotSpotSearch?srchTxt=' + queryParam + '&layerid=emp',
            'Content-Type': 'application/html; charset=utf-8',
            success: function (responnse) {

                let searchEmpDta = JSON.parse(responnse).response.docs || [];
                if (searchEmpDta.length === 0) {
                    $('#empList').hide();
                } else {
                    $('#empList').show();
                }

                $('#empList').empty();
                searchEmpDta.map(function (item) {

                    $('#empList').append('<div onclick="onEmpIdClick(event)" id=' + item.employeeid + ' class="employeeid" value=' + item.employeeid + '>' + item.employeeid + '</div>');
                });
            }
        });
        $("#addEmpId").val()
    }
}



$('#empTable').on('click', 'tbody .empEdit', function () {
    var data_row = empTable.row($(this).closest('tr')).data();
    empEditMode = true;
    $("#newEmpModal").show();
    $("#employeeModalTitle").html("Update Employee");
    $('#addEmpId').val(data_row.employeeid);
    $("input[name=empMandatory][value=" + data_row.ifmandatory + "]").attr('checked', 'checked');
    $("input[name=empAvailable][value=" + data_row.ifavailable + "]").attr('checked', 'checked');
    $("input[name=empRegistered][value=" + data_row.ifregistered + "]").attr('checked', 'checked');
    $("#addEmpId").prop('disabled', true);
});

function empAddRow() {

    var datatableData = {
        ifmandatory: $("input[name=empMandatory]:checked").val(),
        ifavailable: $("input[name=empAvailable]:checked").val(),
        // ifregistered: $("input[name=empRegistered]:checked").val(),
        employeeid: $('#addEmpId').val(),
    }

    $.ajax({
        type: "POST",
        url: '/FR/AddUpdateEmp',
        data: { 'empdata': datatableData },
        'Content-Type': 'application/json; charset=utf-8',
        async: false,
        success: function (data) {
            empTableCounter = 0;
            empTable.ajax.reload();
        }
    });
    closeEmpModal();
}


function closeEmpModal() {
    $('#addEmpId').val('');
    $('#empList').empty();
    $("#addEmpId").prop('disabled', false);
    $('#empList').hide();
    $('#newEmpModal').hide();    
    $('#employeeDetails').hide();
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

function employeeTableExport() {
    urltoexport = "DownloadFIle?ifEmpRole=EMP";
    window.location = urltoexport;
}

function closeEmpModal() {
    $('#mandatoryCheckModal').hide();
}
