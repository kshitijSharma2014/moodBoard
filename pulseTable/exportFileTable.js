var expFileTableCounter = 0;

var expFileTable = $('#exportFileTable').DataTable({
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
                ++expFileTableCounter;
                return '<div>' + expFileTableCounter + '</div>';
            }
        },
        {
            "data": "siteid",
            "render": function (data, type, row, meta) {
                return '<div value=' + row.siteid + '>'+row.site_id+'</div>';
            }
        },
        {
            "data": "vendor",
            "render": function (data, type, row, meta) {
                return '<div value=' + row.vendor + '>' + row.vendor + '</div>';
            }
        },
     
        {
            "data": "name1",
            "render": function (data, type, row, meta) {
                return '<div>' + row.name1 + '</div>';
            }
        },
        {
            "data": "name2",
            "render": function (data, type, row, meta) {
                return '<div>' + row.name2 + '</div>';
            }
        },
        {
            "data": "spocmobilenumber",
            "render": function (data, type, row, meta) {
                return '<div>' + row.spocmobilenumber + '</div>';
            }
        },
        {
            "data": "spocname",
            "render": function (data, type, row, meta) {
                return '<div>' + row.spocname + '</div>';
            }
        },
        {
            "data": "type",
            "render": function (data, type, row, meta) {
                return '<div>' + row.type + '</div>';
            }
        },
        {
            "data": "address1",
            "render": function (data, type, row, meta) {
                return '<div>' + row.address1 + '</div>';
            }
        },
        {
            "data": "address2",
            "render": function (data, type, row, meta) {
                return '<div>' + row.address2 + '</div>';
            }
        },
        {
            "data": "address3",
            "render": function (data, type, row, meta) {
                return '<div>' + row.address3 + '</div>';
            }
        },
        {
            "data": "city",
            "render": function (data, type, row, meta) {
                return '<div>' + row.city + '</div>';
            }
        },
        {
            "data": "pin",
            "render": function (data, type, row, meta) {
                return '<div>' + row.pin + '</div>';
            }
        },
        {
            "data": "state",
            "render": function (data, type, row, meta) {
                return '<div>' + row.state + '</div>';
            }
        },
        {
            "data": "lat",
            "render": function (data, type, row, meta) {
                return '<div>' + row.lat + '</div>';
            }
        },
        {
            "data": "lon",
            "render": function (data, type, row, meta) {
                return '<div>' + row.lon + '</div>';
            }
        },
        {
            "data": "l1feasibility",
            "render": function (data, type, row, meta) {
                return '<div>' + row.l1feasibility + '</div>';
            }
        },
    ],
});
$('#expFileTable').removeClass('form-inline dt-bootstrap no-footer dataTable');
$('#expFileTable_wrapper').removeClass('dataTables_wrapper form-inline dt-bootstrap no-footer');

$('#expFileTable').on( 'click', 'tbody td:not(:first-child)', function (e) {
    editor.inline( this );
} );