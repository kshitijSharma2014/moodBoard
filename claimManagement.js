var roleIdData = [
    {
        id: 0,
        text: 'enhancement'
    },
    {
        id: 1,
        text: 'bug'
    },
    {
        id: 2,
        text: 'duplicate'
    },
    {
        id: 3,
        text: 'invalid'
    },
];
var sapApiData = [
    {
        id: 4,
        text: '12345'
    },
    {
        id: 5,
        text: '67890'
    },
    {
        id: 6,
        text: '1234567'
    },
    {
        id: 7,
        text: '098766'
    },
];
var vehicleTypeData = [
    {
        id: 8,
        text: 'two Wheeler'
    },
    {
        id: 9,
        text: 'four Wheeler'
    }
];

var jId = "jID";
var jesaId = "jesaId";
var vehicleId = "vehicleId";
var esavehicleId = "esavehicleId";
var sapApId = "sapApId";

$('#newRWA').hide();
$('#newESA').hide();


var waitForEl = function (selector, callback) {
    if (jQuery(selector).length) {
        callback();
    } else {
        setTimeout(function () {
            waitForEl(selector, callback);
        }, 100);
    }
};

$('#rWAListTable').DataTable({
    "ajax": "https://raw.githubusercontent.com/kshitijSharma2014/moodBoard/master/rwa.txt",
    "paging": false,
    "searching": false,
    "info": false,
    "retrieve": true,
    serverSide: true,
    bProcessing: true,
    columnDefs: [
        { width: 300, targets: 4 }
    ],
    aoColumnDefs: [
        {
            bSortable: false,
            aTargets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        }
    ],
    "columns": [
        {
            "data": "sr_no",
            "render": function (data, type, row, meta) {
                return '<div>' + data + '</div>';
            }
        },
        {
            "data": "roleId",
            "render": function (data, type, row, meta) {
                var id = '#' + jId + row.sr_no;
                waitForEl(id, function () {
                    $(id).select2({
                        data: roleIdData,
                        placeholder: "Select Role ID",
                        allowClear: true,
                        closeOnSelect: false,
                        width: '180px',
                        multiple: true,
                    });

                })
                return '<div id=' + jId + row.sr_no + ' class="jobIdSelect"></div>';
            }
        },
        {
            "data": "job_family",
            "render": function (data, type, row, meta) {
                return '<div>' + data + '</div>';
            }
        },
        {
            "data": "role_type",
            "render": function (data, type, row, meta) {
                return '<div>' + data + '</div>';
            }
        },
        {
            "data": "vehicle_type",
            "render": function (data, type, row, meta) {
                var id = '#' + vehicleId + row.sr_no;
                waitForEl(id, function () {
                    $(id).select2({
                        data: vehicleTypeData,
                        placeholder: "Select Vehicle Type",
                        allowClear: true,
                        closeOnSelect: false,
                        width: '180px',
                        multiple: true,
                    });
                })
                return '<div id=' + vehicleId + row.sr_no + ' class="vehicleTypeSelect"></div>';
            }
        },
        {
            "data": "childId",
            "render": function (data, type, row, meta) {
                return '<div>' + data + '</div>';
            }
        },
        {
            "data": "sap_api",
            "render": function (data, type, row, meta) {
                return '<div id=' + sapApId + row.sr_no + ' class="sapApiSelect">1234</div>';
            }
        },
        {
            "data": "perdiem",
            "render": function (data, type, row, meta) {
                return '<div>' + data + '</div>';
            }
        },
        {
            "targets": 7,
            "data": "dateRange",
            "render": function (data, type, row, meta) {
                var id = '#start' + row.sr_no;
                waitForEl(id, function () {
                    $(id).daterangepicker({
                        singleDatePicker: true,
                        timePicker: true,
                        startDate: moment().startOf('hour'),
                        endDate: moment().startOf('hour').add(32, 'hour'),
                        locale: {
                            format: 'M-DD-YYYY hh:mm A'
                        }
                    }, function (start) {
                        $(id).val(start);
                    });
                })
                return '<input id=' + 'start' + row.sr_no + ' class="RWAdateRangepicker CMAdateRangePicker" />';
            }
        },
        {
            "targets": 8,
            "data": "dateRange",
            "render": function (data, type, row, meta) {
                var id = '#end' + row.sr_no;
                waitForEl(id, function () {
                    $(id).daterangepicker({
                        singleDatePicker: true,
                        timePicker: true,
                        startDate: moment().startOf('hour'),
                        endDate: moment().startOf('hour').add(32, 'hour'),
                        locale: {
                            format: 'M-DD-YYYY hh:mm A'
                        }
                    }, function (start) {
                        $(id).val(start);
                    });
                })
                return '<input id=' + 'end' + row.sr_no + ' class="RWAdateRangepicker CMAdateRangePicker" />';
            }
        },
        {
            "data": "lastUpdatedOn",
            "render": function (data, type, row, meta) {
                return '<div>' + data + '</div>';
            }
        },
    ]
});
$('#rWAListTable').removeClass('form-inline dt-bootstrap no-footer dataTable');
$('#rWAListTable_wrapper').removeClass('dataTables_wrapper form-inline dt-bootstrap no-footer');


$('#ESAListTable').DataTable({
    "ajax": "https://raw.githubusercontent.com/kshitijSharma2014/moodBoard/master/esa.txt",
    "paging": false,
    "searching": false,
    "info": false,
    "retrieve": true,
    serverSide: true,
    bProcessing: true,
    columnDefs: [
        { width: 300, targets: 4 }
    ],
    aoColumnDefs: [
        {
            bSortable: false,
            aTargets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        }
    ],
    "columns": [
        {
            "data": "sr_no",
            "render": function (data, type, row, meta) {
                return '<div>' + data + '</div>';
            }
        },
        {
            "data": "employeeId",
            "render": function (data, type, row, meta) {
                return '<div>' + data + '</div>';
            }
        },
        {
            "data": "roleId",
            "render": function (data, type, row, meta) {
                var id = '#' + jesaId + row.sr_no;
                waitForEl(id, function () {
                    $(id).select2({
                        data: roleIdData,
                        placeholder: "Select Role ID",
                        allowClear: true,
                        closeOnSelect: false,
                        width: '180px',
                        multiple: true,
                    });

                })
                return '<div id=' + jesaId + row.sr_no + ' class="jobIdSelect"></div>';
            }
        },
        {
            "data": "job_role_family",
            "render": function (data, type, row, meta) {
                return '<div>' + data + '</div>';
            }
        },
        {
            "data": "role_type",
            "render": function (data, type, row, meta) {
                return '<div>' + data + '</div>';
            }
        },
        {
            "data": "vehicle_type",
            "render": function (data, type, row, meta) {
                var id = '#' + esavehicleId + row.sr_no;
                waitForEl(id, function () {
                    $(id).select2({
                        data: vehicleTypeData,
                        placeholder: "Select Vehicle Type",
                        allowClear: true,
                        closeOnSelect: false,
                        width: '180px',
                        multiple: true,
                    });
                })
                return '<div id=' + esavehicleId + row.sr_no + ' class="vehicleTypeSelect"></div>';
            }
        },
        {
            "data": "perdiem",
            "render": function (data, type, row, meta) {
                return '<div>' + data + '</div>';
            }
        },
        {
            "data": "access",
            "render": function (data, type, row, meta) {
                return '<div><input type="radio" name=' + "CMAaccess" + row.sr_no + '>Access</input>' +
                    '<input type="radio" name=' + "CMAaccess" + row.sr_no + '>No Access</input></div>'
            }
        },
        {
            "data": "startDate",
            "render": function (data, type, row, meta) {
                var id = '#startesa' + row.sr_no;
                waitForEl(id, function () {
                    $(id).daterangepicker({
                        singleDatePicker: true,
                        timePicker: true,
                        startDate: moment().startOf('hour'),
                        endDate: moment().startOf('hour').add(32, 'hour'),
                        locale: {
                            format: 'M-DD-YYYY hh:mm A'
                        }
                    }, function (start) {
                        $(id).val(start);
                    });
                })
                return '<input id=' + 'startesa' + row.sr_no + ' class="RWAdateRangepicker CMAdateRangePicker" />';
            }
        },
        {
            "data": "endDate",
            "render": function (data, type, row, meta) {
                var id = '#endesa' + row.sr_no;
                waitForEl(id, function () {
                    $(id).daterangepicker({
                        singleDatePicker: true,
                        timePicker: true,
                        startDate: moment().startOf('hour'),
                        endDate: moment().startOf('hour').add(32, 'hour'),
                        locale: {
                            format: 'M-DD-YYYY hh:mm A'
                        }
                    }, function (start) {
                        $(id).val(start);
                    });
                })
                return '<input id=' + 'endesa' + row.sr_no + ' class="RWAdateRangepicker CMAdateRangePicker" />';
            }
        },
        {
            "data": "lastUpdatedOn",
            "render": function (data, type, row, meta) {
                return '<div>' + data + '</div>';
            }
        },
    ]
});
$('#ESAListTable').removeClass('form-inline dt-bootstrap no-footer dataTable');
$('#ESAListTable_wrapper').removeClass('dataTables_wrapper form-inline dt-bootstrap no-footer');

$('#rateCardTable').DataTable({
    "paging": false,
    "searching": false,
    "info": false,
    "retrieve": true,
    "ajax": ''
});


var rWAListTable = $('#rWAListTable').DataTable();
$('#rwaAdd').on('click', function () {
    $('#newRWA').show();
    $('#addRowId').select2({
        data: vehicleTypeData,
        placeholder: "Select Role Id",
        allowClear: true,
        closeOnSelect: false,
        width: '180px',
        multiple: true,
    });
    $('#addvehicleType').select2({
        data: vehicleTypeData,
        placeholder: "Select Vehicle Type",
        allowClear: true,
        closeOnSelect: false,
        width: '180px',
        multiple: true,
    });
    $('#addStartDate').daterangepicker({
        singleDatePicker: true,
        timePicker: true,
        startDate: moment().startOf('hour'),
        endDate: moment().startOf('hour').add(32, 'hour'),
        locale: {
            format: 'M-DD-YYYY hh:mm A'
        }
    }, function (start) {
        $('#addStartDate').val(start);
    });
    $('#addEndDate').daterangepicker({
        singleDatePicker: true,
        timePicker: true,
        startDate: moment().startOf('hour'),
        endDate: moment().startOf('hour').add(32, 'hour'),
        locale: {
            format: 'M-DD-YYYY hh:mm A'
        }
    }, function (start) {
        $('#addEndDate').val(start);
    });
});

$('#esaAdd').on('click', function () {
    $('#newESA').show();
    $('#addRowIdEsa').select2({
        data: vehicleTypeData,
        placeholder: "Select Role Id",
        allowClear: true,
        closeOnSelect: false,
        width: '180px',
        multiple: true,
    });
    $('#addvehicleTypeEsa').select2({
        data: vehicleTypeData,
        placeholder: "Select Vehicle Type",
        allowClear: true,
        closeOnSelect: false,
        width: '180px',
        multiple: true,
    });
    $('#addStartDateEsa').daterangepicker({
        singleDatePicker: true,
        timePicker: true,
        startDate: moment().startOf('hour'),
        endDate: moment().startOf('hour').add(32, 'hour'),
        locale: {
            format: 'M-DD-YYYY hh:mm A'
        }
    }, function (start) {
        $('#addStartDate').val(start);
    });
    $('#addEndDateEsa').daterangepicker({
        singleDatePicker: true,
        timePicker: true,
        startDate: moment().startOf('hour'),
        endDate: moment().startOf('hour').add(32, 'hour'),
        locale: {
            format: 'M-DD-YYYY hh:mm A'
        }
    }, function (start) {
        $('#addEndDateEsa').val(start);
    });
});

$('.closeRwaModal').on('click', function () {
    $('#newRWA').hide();
});
$('.closeESAModal').on('click', function () {
    $('#newESA').hide();
});