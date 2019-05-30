
var vehicleTypeData = [
    {
        id: "80",
        text: 'Two Wheeler'
    },
    {
        id: "90",
        text: 'Four Wheeler'
    }
];

var jId = "jID";
var jesaId = "jesaId";
var vehicleId = "vehicleId";
var esavehicleId = "esavehicleId";
var sapApId = "sapApId";

var rwaEditMode = false, rwaRowNumEdit, csRowNumEdit, csEditMode = false, rateRowNumEdit, rateEditMode = false, esaEditMode = false, esaRowNumEdit;

$('#newRWA').hide();
$('#newESA').hide();
$('#newRate').hide();


var waitForEl = function (selector, callback) {
    if (jQuery(selector).length) {
        callback();
    } else {
        setTimeout(function () {
            waitForEl(selector, callback);
        }, 100);
    }
};
var rwaTableCounter = 0;

var rateCardData = new Promise(function (resolve, reject) {
    $.ajax({
        url: '/ClaimManagementAccess/GetClaimRateData',
        success: function (data) {
            resolve(data);
        }
    });
});


function getVehicleNames(vehicles) {
    return vehicles.map(function (vehicle) {
        return vehicle.vehicletype
    }).join(',')
}

var rwaTable = $('#rWAListTable').DataTable({
    "ajax": {
        url: "/ClaimManagementAccess/GetRoleMasterData/",
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
    "columns": [
        {
            "data": "sr_no",
            "render": function (data, type, row, meta) {
                ++rwaTableCounter;
                return '<div>' + rwaTableCounter + '</div>';
            }
        },
        {
            "data": "ijobCode",
            "render": function (data, type, row, meta) {
                return '<div value=' + row.ijobcode + ' class="jobIdSelect">'+row.ijobcode+'</div>';
            }
        },
        {
            "data": "ivehicletype",
            "render": function (data, type, row, meta) {
                return '<div value=' + row.ivehicleid + '>' + row.ivehicletype + '</div>';
            }
        },
     
        {
            "data": "iperdiem",
            "render": function (data, type, row, meta) {
                return '<div>' + row.iperdiem + '</div>';
            }
        },
        {
            "data": "fromdate",
            "render": function (data, type, row, meta) {
                return '<div>' + row.fromdate + '</div>';
            }
        },
        {
            "data": "todate",
            "render": function (data, type, row, meta) {
                return '<div>' + row.todate + '</div>';
            }
        },
        {
            "data": "ilastupdatedon",
            "render": function (data, type, row, meta) {
                return '<div>' + row.ilastupdatedon + '</div>';
            }
        },
        {
            "data": "imodifiedby",
            "render": function (data, type, row, meta) {
                return '<div>' + row.imodifiedby + '</div>';
            }
        },
        {
            "render": function (data, type, row, meta) {
                return '<img src="/Areas/Admin/images/editRow.png" class="rwaEdit" style="width: 14px;cursor:pointer;" id=' + row.ijobcode + '/>';
            }
        },
    ],
});
$('#rWAListTable').removeClass('form-inline dt-bootstrap no-footer dataTable');
$('#rWAListTable_wrapper').removeClass('dataTables_wrapper form-inline dt-bootstrap no-footer');

var rwaTableIDs = [];

rwaTable.on('search.dt', function () {
    //filtered rows data as arrays
    let searchInput = $('#rWAListTable_filter input').val() || "";
    if (searchInput.length === 0) {
        rwaTableIDs = [];
    }
    else {
        let tableData =  rwaTable.rows({ filter: 'applied' }).data();
        let length = tableData.length;
        rwaTableIDs = [];
        for (let i = 0; i < length; ++i) {
            rwaTableIDs.push(tableData[i].ijobcode)
        }
        console.log(rwaTableIDs);
    }
})

var empTableCounter=0;

var esaTable = $('#ESAListTable').DataTable({
    "ajax": {
        url:"/ClaimManagementAccess/GetEmpMasterData",
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
    "columns": [
        {
            "data": "sr_no",
            "render": function (data, type, row, meta) {
                ++empTableCounter;
                return '<div>' + empTableCounter + '</div>';
            }
        },
        {
            "data": "employeeId",
            "render": function (data, type, row, meta) {
                return '<div>' + row.iemployeeid + '</div>';
            }
        },
        {
            "data": "ijobCode",
            "render": function (data, type, row, meta) {
                return '<div value=' + row.ijobcode + ' class="jobIdSelect">' + row.ijobcode + '</div>';
            }
        },
        {
            "data": "ivehicletype",
            "render": function (data, type, row, meta) {
                return '<div value=' + row.ivehicletype + ' >' + row.ivehicletype + '</div>';
            }
        },
        {
            "data": "perdiem",
            "render": function (data, type, row, meta) {
                return '<div>' + row.iperdiem + '</div>';
            }
        },
        {
            "data": "access",
            "render": function (data, type, row, meta) {
                return +row.iclaimaccess ? '<div>Yes</div>' : '<div>No</div>';
            }
        },
        {
            "data": "startDate",
            "render": function (data, type, row, meta) {
                return '<div>' + row.fromdate + '</div>';
            }
        },
        {
            "data": "endDate",
            "render": function (data, type, row, meta) {
                return '<div>' + row.todate + '</div>';
            }
        },
        {
            "data": "ilastupdatedon",
            "render": function (data, type, row, meta) {
                return '<div>' + row.ilastupdatedon + '</div>';
            }
        },
          {
              "data": "imodifiedby",
              "render": function (data, type, row, meta) {
                  return '<div>' + row.imodifiedby + '</div>';
              }
          },
        {
            "render": function (data, type, row, meta) {
                return '<img src="/Areas/Admin/images/editRow.png" class="esaEdit" style="width: 14px;cursor:pointer;" id=' + row.iemployeeid + '/>';
            }
        },
    ]
});
$('#ESAListTable').removeClass('form-inline dt-bootstrap no-footer dataTable');
$('#ESAListTable_wrapper').removeClass('dataTables_wrapper form-inline dt-bootstrap no-footer');


var esaTableIDs = [];

esaTable.on('search.dt', function () {
    //filtered rows data as arrays
    let searchInput = $('#rWAListTable_filter input').val() || "";
    if (searchInput.length === 0) {
        esaTableIDs = [];
    }
    else {
        let tableData = esaTable.rows({ filter: 'applied' }).data();
        let length = tableData.length;
        esaTableIDs = [];
        for (let i = 0; i < length; ++i) {
            esaTableIDs.push(tableData[i].ijobcode)
        }
        console.log(esaTableIDs);
    }
})

var rateCardCount = 0;

var rateCardTable = $('#rateCardTable').DataTable({
    "ajax": '/ClaimManagementAccess/GetClaimRateData',
    "paging": false,
    "info": false,
    "retrieve": true,
    bSortable: true,
    bProcessing: true,
    "searching": false,
    "columns": [
        {
            "data": "sr_no",
            "render": function (data, type, row, meta) {
                ++rateCardCount;
                return '<div>' + rateCardCount + '</div>';
            }
        },
         {
             "data": "vehicletype",
             "render": function (data, type, row, meta) {
                 return '<div id = ' + row.vehicleid + '>' + row.vehicletype + '</div>';
             }
         },
          {
              "data": "perkmrate",
              "render": function (data, type, row, meta) {
                  return '<div>' + data + '</div>';
              }
          },
           {
               "data": "lastupdatedon",
               "render": function (data, type, row, meta) {
                  
                   return '<div>' + data + '</div>';
               }
           },
           {
               "data": "imodifiedby",
               "render": function (data, type, row, meta) {
                   return '<div>' + row.imodifiedby + '</div>';
               }
           },
           {
               "render": function (data, type, row, meta) {
                   return '<img src="/Areas/Admin/images/editRow.png" class="rateEdit" style="width: 14px;cursor:pointer;" />';
               }
           },
    ]
});



$('#rateCardTable').removeClass('form-inline dt-bootstrap no-footer dataTable');
$('#rateCardTable_wrapper').removeClass('dataTables_wrapper form-inline dt-bootstrap no-footer');



var CSTableCounter = 0;
var clientSapTable = $('#clientSapTable').DataTable({
    "ajax": "/ClaimManagementAccess/GetClientSAPAPIData",
    "paging": false,
    "searching": false,
    "info": false,
    "retrieve": true,
    bProcessing: true,
    bSortable: true,
    "columns": [
        {
            "render": function (data, type, row, meta) {
                ++CSTableCounter;
                return '<div>' + CSTableCounter + '</div>';
            }
        },
         {
             "data": "iclientid",
             "render": function (data, type, row, meta) {
                 return '<div>' + row.iclientid + '</div>';
             }
         },
          {
              "data": "isapapiid",
              "render": function (data, type, row, meta) {
                  return '<div>' + row.isapapiid + '</div>';
              }
          },
           {
               "data": "ilastupdatedon",
               "render": function (data, type, row, meta) {

                   return '<div>' + row.ilastupdatedon + '</div>';
               }
           },
           {
               "data": "imodifiedby",
               "render": function (data, type, row, meta) {
                   return '<div>' + row.imodifiedby + '</div>';
               }
           },
           {
               "render": function (data, type, row, meta) {
                   return '<img src="/Areas/Admin/images/editRow.png" class="csEdit" style="width: 14px;cursor:pointer;" />';
               }
           },
    ]
});



$('#clientSapTable').removeClass('form-inline dt-bootstrap no-footer dataTable');
$('#clientSapTable_wrapper').removeClass('dataTables_wrapper form-inline dt-bootstrap no-footer');

function IDGenerator() {
	 
    this.length = 8;
    this.timestamp = +new Date;
		 
    var _getRandomInt = function( min, max ) {
        return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    }
		 
    this.generate = function() {
        var ts = this.timestamp.toString();
        var parts = ts.split( "" ).reverse();
        var id = "";
			 
        for( var i = 0; i < this.length; ++i ) {
            var index = _getRandomInt( 0, parts.length - 1 );
            id += parts[index];	 
        }
			 
        return id;
    }

		 
}

var generator = new IDGenerator();

    $('#rwaAdd').on('click', function () {
        var data;
        $('#newRWA').show();
        $('#addStartDate').datetimepicker({
            format: 'dd-M-yyyy hh:ii',
            startDate: new Date(),
        });
        $('#addEndDate').datetimepicker({
            format: 'dd-M-yyyy hh:ii',
            startDate: new Date(),

        });

        $('#addvehicleType').chosen();
        $('#addvehicleType').empty();
        rateCardData.then(function (data) {
            data.data.map(function (item) {
                $('#addvehicleType').append('<option value=' + item.vehicleid + '>' + item.vehicletype + '</option>');
            });
            $("#addvehicleType").trigger("chosen:updated");
        });
            $('#addRoleId').chosen();
            $('#addRoleId').empty();

        $.ajax({
            url: "/ClaimManagementAccess/GetJobCodeJSON",
            dataType: "json",
        }).done(function (data) {
            data.jobcodes.map(function (item) {
                $('#addRoleId').append('<option value=' + item.jobcode + '>' + item.jobcode + '</option>');
            });
            $('#addRoleId').prop('disabled', false);
            $("#addRoleId").trigger("chosen:updated");
        });
        $(document).on("click", function (e) {
            var container = $("#addRoleId");

            if (!container.is(e.target) && container.has(e.target).length === 0) {
                container.trigger('chosen:close');
            }
        });
    });




    $('#esaAdd').on('click', function () {

        $('#newESA').show();

        $('#addvehicleTypeEsa').chosen();
        $('#addvehicleTypeEsa').empty();
        $.ajax({
            url: "/ClaimManagementAccess/GetClaimRateData",
            dataType: "json",
        }).done(function (data) {
            data.data.map(function (item) {
                $('#addvehicleTypeEsa').append('<option value=' + item.vehicleid + '>' + item.vehicletype + '</option>');
            });
            $("#addvehicleTypeEsa").trigger("chosen:updated");
        });



        $('#addStartDateEsa').datetimepicker({
            startDate: new Date(),
            format: 'dd-M-yyyy hh:ii',
        });
        $('#addEndDateEsa').datetimepicker({
            startDate: new Date(),
            format: 'dd-M-yyyy hh:ii',
        });
        var selectedEmp = [];

        $('#addEmpIdEsa').chosen(function () {
            $('#addEmpIdEsa').val(selectedEmp)
            selectedEmp = $(this).val();
            
        });
        $('#addEmpIdEsa_chosen input').attr("onkeyup", "SearchEmpSolr(this.value)");
       /* $.ajax({
            url: "/ClaimManagementAccess/GetEmplistJSON",
            dataType: "json",
        }).done(function (data) {
            data.map(function (item) {
                $('#addEmpIdEsa').append('<option value=' + item.empid + '>' + item.empid + '</option>');
            });
            $("#addEmpIdEsa").trigger("chosen:updated");
        });*/
        $(document).on("click", function (e) {
            var container = $("#addEmpIdEsa");

            if (!container.is(e.target) && container.has(e.target).length === 0) {
                container.trigger('chosen:close');
            }
        });
    });

    $('#rateAdd').on('click', function () {
        var data;
        $('#newRate').show();

    });



    $('#CSadd').on('click', function () {
        var data;
        $('#newCS').show();
        $('#newClientId').chosen();
        $('#newClientId').empty();

        $.ajax({
            url: "/ClaimManagementAccess/GetClientIDJSON",
            dataType: "json",
        }).done(function (data) {
            data.clientids.map(function (item) {
                $('#newClientId').append('<option value=' + item.clientid + '>' + item.clientid + '</option>');
            });
            $('#newClientId').prop('disabled', false);
            $("#newClientId").trigger("chosen:updated");
        });
    });


    function checkZero(data) {
        if (data.length == 1) {
            data = "0" + data;
        }
        return data;
    }

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    function formatDate(today) {
        var day = today.getDate() + "";
        var month = (today.getMonth() + 1) + "";
        var year = today.getFullYear() + "";
        var hour = today.getHours() + "";
        var minutes = today.getMinutes() + "";
        var seconds = today.getSeconds() + "";

        day = checkZero(day);
        year = checkZero(year);
        hour = checkZero(hour);
        mintues = checkZero(minutes);
        seconds = checkZero(seconds);

        return day + "-" + months[month - 1] + "-" + year + " " + hour + ":" + minutes + ":" + seconds;
    }

    function unFormatDate(date) {
        var dateValAr = date.split(' ')[0];
        var dateAr = dateValAr.split('-');
        var dateVal = dateAr[2] + '-' + dateAr[1] + '-' + dateAr[0] + ' ' + dateValAr[1];
       return new Date(dateVal);
    }


    function rwaAdd() {
        var selectedRoles = $("#addRoleId").val();
        var vehicleId = $("#addvehicleType").val().join(',');
        var iperdiem = $("#rwaPerdiem").val().toString();
        var fromdate = formatDate($('#addStartDate').data("datetimepicker").getDate());
        var todate = formatDate($('#addEndDate').data("datetimepicker").getDate());
        var ilastupdatedon = formatDate(new Date(Date.now()));
        var datatableData = [];
        let selectedVehicles, vehicletype;
        rateCardData.then(function (data) {
            selectedVehicles = data.data.filter(function (value) {
                return value.vehicleid === vehicleId;
            });
            vehicletype = getVehicleNames(selectedVehicles);
            selectedRoles.map(function (selectedRole) {
                datatableData.push({
                    ijobcode: selectedRole,
                    ivehicleid: vehicleId,
                    iperdiem: iperdiem,
                    fromdate: fromdate,
                    todate: todate,
                    ilastupdatedon: ilastupdatedon,
                    ivehicletype: vehicletype,
                });
            });

            $.ajax({
                type: "POST",
                url: '/ClaimManagementAccess/UpdateRoleClaimAccess',
                data: { 'roledata': datatableData },
                'Content-Type': 'application/json; charset=utf-8',
                async: false,
                success: function (response) {
                    if (rwaEditMode)
                    {
                       // rwaTable.row(rwaRowNumEdit).data(datatableData[0]).draw()
                        rwaEditMode = false;
                        rwaTableCounter = 0;
                        rwaTable.ajax.reload();
                    }
                    else {
                        /*for (let i = 0; i < datatableData.length; ++i) {
                            rwaTable.row.add(datatableData[i]).draw(false);

                        }*/
                        rwaTableCounter = 0;
                        rwaTable.ajax.reload();
                    }
                    $("#addRoleId").prop('disabled', false);
                    closeRwaModal();
                }
            });
        });
               
    };

    function ESAaddRow() {
        var selectedEmps = $("#addEmpIdEsa").val();
        var fromdate = formatDate($('#addStartDateEsa').data("datetimepicker").getDate());
        var iperdiem = $("#esaPerdiem").val().toString();
        var todate = formatDate($('#addEndDateEsa').data("datetimepicker").getDate());
        var datatableData = [];
        var vehicleId = $("#addvehicleTypeEsa").val().join(',');
        var ilastupdatedon = formatDate(new Date(Date.now()));
        var datatableData = [];
        let selectedVehicles, vehicletype;
        rateCardData.then(function (data) {
            selectedVehicles = data.data.filter(function (value) {
                return value.vehicleid === vehicleId;
            });
            vehicletype = getVehicleNames(selectedVehicles);
            selectedEmps.map(function (selectedEmp) {
                datatableData.push({
                    iemployeeid: selectedEmp,
                    ijobcode: '',
                    ivehicleid: vehicleId,
                    iperdiem: iperdiem,
                    fromdate: fromdate,
                    todate: todate,
                    ilastupdatedon: ilastupdatedon,
                    ivehicletype: vehicletype,
                    iclaimaccess: $("input[name='addESAaccess']:checked").val() === "yes" ? 1 : 0,
                });
            });
      
        $.ajax({
            type: "POST",
            url: '/ClaimManagementAccess/UpdateEmpClaimAccess',
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

                closeEsaModal();
            }
        });
        });


    }

    function rateaddRow() {
        var vehicleType = $('#newVehicleType').val();
        var perKmRate = $('#perKmRate').val();
        var data = [];
        
        if (rateEditMode) {
            data = [
                {
                    vehicletype: vehicleType,
                    perkmrate: perKmRate,
                    lastupdatedon: formatDate(new Date(Date.now())),
                    vehicleid: $('#newVehicleType').attr('data-id'),
                }
            ];
        }
        else {
            data = [{
                vehicletype: vehicleType,
                perkmrate: perKmRate,
                lastupdatedon: formatDate(new Date(Date.now())),
                vehicleid: generator.generate(),
            }];
        }
        
        $.ajax({
            type: "POST",
            url: '/ClaimManagementAccess/UpdateRateCardData',
            data: { ratedata: data },
            'Content-Type': 'application/json; charset=utf-8',
            async: false,
            success: function (response) {
                if (rateEditMode) {
                    //rateCardTable.row(rateRowNumEdit).data(data[0]).draw();
                    rateEditMode = false;
                    rateCardCount = 0;
                    rateCardTable.ajax.reload();
                }
                else {
                    rateCardCount = 0;
                    rateCardTable.ajax.reload();
                   // rateCardTable.row.add(data[0]).draw(false);

                }
                $("#newVehicleType").prop('disabled', false);
                closeRateModal();
            }
        });
    
    };

    function CsaddRow() {
        var iclientids = $('#newClientId').val();
        var isapapiid = $('#newSapApiId').val();
        var data = [];

        iclientids.map(function (iclientid) {
            data.push({
                iclientid: iclientid,
                isapapiid: isapapiid,
                ilastupdatedon: formatDate(new Date(Date.now())),
            });
        });
        $.ajax({
            type: "POST",
            url: '/ClaimManagementAccess/UpdateCSData',
            data: { csdata: data },
            'Content-Type': 'application/json; charset=utf-8',
            async: false,
            success: function (responnse) {
                if (csEditMode) {
                    //clientSapTable.row(rwaRowNumEdit).data(data[0]).draw()
                    csEditMode = false;
                    CSTableCounter = 0;
                    clientSapTable.ajax.reload();
                }
                else {
                    /*for (var i = 0; i < data.length; ++i) {
                        clientSapTable.row.add(data[i]).draw(false);
                    }*/
                    CSTableCounter = 0;
                    clientSapTable.ajax.reload();
                }
                closeCSModal();
            }
        });
    }

    function SearchEmpSolr(queryParam) {
        if (queryParam.length > 2) {
            var drpItems = [];
           /* $("#addEmpIdEsa").empty().append($('< option>'))
            $("#addEmpIdEsa").trigger("chosen:updated");*/
            $.ajax({
                type: "GET",
                url: '/ClaimManagementAccess/hotSpotSearch?srchTxt=' + queryParam,
                'Content-Type': 'application/html; charset=utf-8',
                success: function (responnse) {
                    $('#addEmpIdEsa_chosen .chosen-results li').remove();

                    let data = JSON.parse(responnse).response.docs || [];
                    data.map(function (item) {
                        $('#addEmpIdEsa').append('<option value=' + item.employeeid + '>' + item.employeeid + '</option>');
                    });
                    $("#addEmpIdEsa").trigger("chosen:updated");
                }
            });

            $("#addEmpIdEsa").val()
        }
       
    }

    $('#rWAListTable').on('click', 'tbody .rwaEdit', function () {
        var data_row = rwaTable.row($(this).closest('tr')).data();
        rwaEditMode = true;
        $("#newRWA").show();

        $('#addStartDate').datetimepicker({
            startDate: new Date(),
            format: 'dd-M-yyyy hh:ii',
        });
//        $('#addStartDate').data("datetimepicker").date = unFormatDate(data_row.fromdate)

        $('#addEndDate').datetimepicker({
            startDate: new Date(),
            format: 'dd-M-yyyy hh:ii',
        });
   //     $('#addEndDate').data("datetimepicker").date = unFormatDate(data_row.todate)

        $('#rwaPerdiem').val(data_row.iperdiem);

        $('#addvehicleType').chosen();
        $('#addvehicleType').empty();
        rateCardData.then(function (data) {
            data.data.map(function (item) {
                $('#addvehicleType').append('<option value=' + item.vehicleid + '>' + item.vehicletype + '</option>');
            });
            $("#addvehicleType").val(data_row.ivehicleid);
            $("#addvehicleType").trigger("chosen:updated");
        });
        $('#addRoleId').chosen();
        $('#addRoleId').empty();

        $.ajax({
            url: "/ClaimManagementAccess/GetJobCodeJSON",
            dataType: "json",
        }).done(function (data) {
            data.jobcodes.map(function (item) {
                $('#addRoleId').append('<option value=' + item.jobcode + '>' + item.jobcode + '</option>');
            });
            $("#addRoleId").val(data_row.ijobcode);
            $('#addRoleId').prop('disabled', true);
            $("#addRoleId").trigger("chosen:updated");

        });
        $(document).on("click", function (e) {
            var container = $("#addRoleId");

            if (!container.is(e.target) && container.has(e.target).length === 0) {
                container.trigger('chosen:close');
            }
        });

        rwaRowNumEdit = rwaTable.row($(this).closest('tr'))[0][0];
    });

    $('#ESAListTable').on('click', 'tbody .esaEdit', function () {
        var data_row = esaTable.row($(this).closest('tr')).data();
        esaEditMode = true;
        $("#newESA").show();

        $('#addStartDateEsa').datetimepicker({
            startDate: new Date(),
            format: 'dd-M-yyyy hh:ii',
        });
        //        $('#addStartDate').data("datetimepicker").date = unFormatDate(data_row.fromdate)

        $('#addEndDateEsa').datetimepicker({
            startDate: new Date(),
            format: 'dd-M-yyyy hh:ii',
        });
        //     $('#addEndDate').data("datetimepicker").date = unFormatDate(data_row.todate)

        $('#esaPerdiem').val(data_row.iperdiem);
        var radioVal = data_row.iclaimaccess === 0 ? "no" : "yes";
        $("input[name=addESAaccess][value=" + radioVal + "]").prop('checked', true);

        $('#addvehicleTypeEsa').chosen();
        $('#addvehicleTypeEsa').empty();
        rateCardData.then(function (data) {
            data.data.map(function (item) {
                $('#addvehicleTypeEsa').append('<option value=' + item.vehicleid + '>' + item.vehicletype + '</option>');
            });
            $("#addvehicleTypeEsa").val(data_row.ivehicleid);
            $("#addvehicleTypeEsa").trigger("chosen:updated");
        });
        $('#addEmpIdEsa').chosen();
        $('#addEmpIdEsa').empty();

        $.ajax({
            url: "/ClaimManagementAccess/GetEmplistJSON",
            dataType: "json",
        }).done(function (data) {
            data.map(function (item) {
                $('#addEmpIdEsa').append('<option value=' + item.empid + '>' + item.empid + '</option>');
            });
            $("#addEmpIdEsa").val(data_row.iemployeeid);
            $('#addEmpIdEsa').prop('disabled', true);
            $("#addEmpIdEsa").trigger("chosen:updated");
        });
        $(document).on("click", function (e) {
            var container = $("#addEmpIdEsa");

            if (!container.is(e.target) && container.has(e.target).length === 0) {
                container.trigger('chosen:close');
            }
        });
        
        esaRowNumEdit = esaTable.row($(this).closest('tr'))[0][0];
    });

    $('#clientSapTable').on('click', 'tbody .csEdit', function () {
        csEditMode = true;
        var data_row = clientSapTable.row($(this).closest('tr')).data();
        rwaEditMode = true;
        $("#newCS").show();

        $('#newClientId').chosen();
        $('#newClientId').empty();

        $.ajax({
            url: "/ClaimManagementAccess/GetClientIDJSON",
            dataType: "json",
        }).done(function (data) {
            data.clientids.map(function (item) {
                $('#newClientId').append('<option value=' + item.clientid + '>' + item.clientid + '</option>');
            });
            $("#newClientId").val(data_row.iclientid);
            $('#newClientId').prop('disabled', true);
            $("#newClientId").trigger("chosen:updated");
        });
        $('#newSapApiId').val(data_row.isapapiid);
        csRowNumEdit = rwaTable.row($(this).closest('tr'))[0][0];
    });

    $('#rateCardTable').on('click', 'tbody .rateEdit', function () {
        csEditMode = true;
        var data_row = rateCardTable.row($(this).closest('tr')).data();
        rateEditMode = true;
        $("#newRate").show();
        $('#newVehicleType').val(data_row.vehicletype);
        $("#newVehicleType").prop('disabled', true);
        $('#newVehicleType').attr('data-id', data_row.vehicleid)
        $('#perKmRate').val(data_row.perkmrate);
        rateRowNumEdit = rateCardTable.row($(this).closest('tr'))[0][0];
    });

    function closeCSModal() {
        $('#newCS').hide();
    }

    function closeRateModal() {
        $('#newRate').hide();

    }

    function closeRwaModal() {
        $('#newRWA').hide();
        $('#addRoleId').chosen('destroy');
        $('#addvehicleType').chosen('destroy');
    }

    function closeEsaModal() {
        $('#newESA').hide();
        $('#addEmpIdEsa').chosen('destroy');
        $('#addvehicleTypeEsa').chosen('destroy');
    }

    function getData(table) {
        var data = table.rows().data();
        delete data.context;
        //delete data.length;   // Do not delete this one! Needed for the loop below.
        delete data.selector;
        delete data.ajax;

        console.log(JSON.stringify(data));

        // Make the resulting "striped" object an array.
        var dataAsArray = [];
        console.log(data.length);

        for (i = 0; i < data.length; i++) {
            dataAsArray.push(data[i]);
        }
        return dataAsArray;
    }

    function tableExport(tabType) {
        let ids = tabType === 1 ? rwaTableIDs : esaTableIDs
        $.ajax({
            url: "/ClaimManagementAccess/ExportData?TabType=" + tabType,
            type: "POST",
            data: { ids: ids }
        }).done(function (data) {
        });
    }