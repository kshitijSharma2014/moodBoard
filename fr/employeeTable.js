
var empTableCounter=0;
var empOrderBy = 'EMPLOYEEID';
var empEditMode = false;
var empTable = $('#empTable').DataTable({
    "ajax": {
        url:"/FR/GetEmpData?orderBy="+empOrderBy,
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
            "data": "EMPLOYEEID",
            "render": function (data, type, row, meta) {
                return '<div>' + row.EMPLOYEEID + '</div>';
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
            "data": "ifRegistered",
            "render": function (data, type, row, meta) {
                return '<div>' + row.ifregistered + '</div>';
            }
        },
        {
            "render": function (data, type, row, meta) {
                return '<img src="/Areas/Admin/images/editRow.png" class="empEdit" style="width: 14px;cursor:pointer;" id="empEdit" />' +
                    '<img src="/Areas/Admin/images/deleteRow.png" class="empDelete" style="width: 14px;margin-left: 10px;cursor:pointer;" id="empDelete"  />';
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
    esaTable.ajax.url("/FR/GetEmpData?orderBy=" + empOrderBy).load()
}

    function onEmpIdClick(e) {
        var empId = e.target.id;
        $('#addEmpId').val(empId);
        $('#empList').hide();
        $('#empList').empty();

    }

 $('#empAdd').on('click', function () {

        $('#newEmpModal').show();
        dragElement(document.getElementById("newEmpModal"));
       
        $('#addEmpId').on("input", SearchEmpSolr);
    });


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
                url: '/FR/hotSpotSearch?srchTxt=' + queryParam + 'layerid=emp',
                'Content-Type': 'application/html; charset=utf-8',
                success: function (responnse) {

                    let data = JSON.parse(responnse).response.docs || [];
                    if(data.length === 0) {
                        $('#empList').hide();
                    } else {
                        $('#empList').show();
                    }
                    
                    $('#empList').empty();
                    data.map(function (item) {

                        $('#empList').append('<div onclick="onEmpIdClick(event)" id=' + item.EMPLOYEEID + ' class="employeeId" value=' + item.EMPLOYEEID + '>' + item.EMPLOYEEID + '</div>');
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
       $('#addEmpId').val(data_row.EMPLOYEEID);
        $("#addEmpId").prop('disabled', true);
        $("input[name=empMandatory][value=" + data_row.ifmandatory + "]").attr('checked', 'checked');
       $("input[name=empAvailable][value=" + data_row.ifavailable + "]").attr('checked', 'checked');
       $("input[name=empRegistered][value=" + data_row.ifregistered + "]").attr('checked', 'checked');

    });

function empAddRow() {

    var datatableData = {
        ifmandatory: $("input[name=empMandatory]").val(),
        ifavailable: $("input[name=empAvailable]").val(),
        ifregistered: $("input[name=empRegistered]").val(),
       EMPLOYEEID: $('#addEmpId').val(),
    }

     $.ajax({
            type: "POST",
            url: '/FR/AddUppdateRole',
            data: { 'empdata': datatableData },
            'Content-Type': 'application/json; charset=utf-8',
            async: false,
            success: function (data) {
                if (esaEditMode) {
                    // rwaTable.row(rwaRowNumEdit).data(datatableData[0]).draw()
                    esaEditMode = false;
                    empTableCounter = 0;
                    esaTable.ajax.reload();
                }
                else {
                    empTableCounter = 0;
                    esaTable.ajax.reload();

                   /* for (let i = 0; i < datatableData.length; ++i) {
                        esaTable.row.add(datatableData[i]).draw(false);
                    }*/

                }
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







