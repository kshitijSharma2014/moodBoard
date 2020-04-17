var Upload = function (file) {
    this.file = file;
};

Upload.prototype.getType = function () {
    return this.file.type;
};
Upload.prototype.getSize = function () {
    return this.file.size;
};
Upload.prototype.getName = function () {
    return this.file.name;
};


function DownloadFeedbackFile(filename) {
    urltoexport = "PLM/DownloadFeedback";
    window.location = urltoexport + "/?fileName=" + filename.data;
}
Upload.prototype.doUpload = function (url) {
    var that = this;
    var msgid = 'snoAlertBox';
    var formData = new FormData();
    formData.append("file", this.file, this.getName());
    formData.append("upload_file", true);
    var msg = '';
    $.ajax({
        type: "POST",
        url: url, //"/PLM/UploadFile",
        processData: false,
        success: function (data) {
            if (data.data != null) {
                DownloadFeedbackFile(data);
                msg = 'File not imported. Check feedback report for error.';
                $("#snoAlertDangerBox").empty();
                $("#snoAlertDangerBox").fadeIn();
                $('<p style="font-size:12px">File not imported. Check feedback report for error.</p>').appendTo('#snoAlertDangerBox');
                closeSnoDangerAlertBox();
                //$("#" + msgid).css({ "visibility": "visible", "color": "red" });
            }
            else {
                msg = data.result;
                $("#snoAlertBox").empty();
                $("#snoAlertBox").fadeIn();
                $('<p style="font-size:12px">' + msg + '</p>').appendTo('#' + msgid);
                closeSnoAlertBox();
               // $("#" + msgid).css({ "visibility": "visible", "color": "blue" });
                exportTableCounter = 0;
                expTable.ajax.reload();
            }
        },
        error: function (error) {
            console.log("error");
            $("#snoAlertDangerBox").empty();
            $("#snoAlertDangerBox").fadeIn();
            $('<p style="font-size:12px">API failed.</p>').appendTo('#snoAlertDangerBox');
            closeSnoDangerAlertBox();
            // handle error
        },
        async: true,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        timeout: 60000
    });
};

Upload.prototype.progressHandling = function (event) {
    var percent = 0;
    var position = event.loaded || event.position;
    var total = event.total;
    var progress_bar_id = "#progress-wrp";
    if (event.lengthComputable) {
        percent = Math.ceil(position / total * 100);
    }
    // update progressbars classes so it fits your code
    $(progress_bar_id + " .progress-bar").css("width", +percent + "%");
    $(progress_bar_id + " .status").text(percent + "%");
};


var upload;

$("#fileimport").on("change", function (e) {
    var file = $(this)[0].files[0];
    upload = new Upload(file);
});
$("#fileimport").on("click", function (e) {
   // $("#importFileMsg").empty();    
   // $("#snoAlertBox").empty();    
});


//Change id to your id
$("#btnFileImport").on("click", function (e) {
    upload.doUpload("/PLM/UploadFile", 'importFileMsg');
    hideImportFileModal();
    $('fileimport').val('')
    exportTableCounter = 0;
    expTable.ajax.reload();
});

var update;

$("#fileupdate").on("change", function (e) {
    var file = $(this)[0].files[0];
    update = new Upload(file);
});
$("#fileupdate").on("click", function (e) {
   // $("#updateFileMsg").empty();
    $("#snoAlertBox").empty();
});


//Change id to your id
$("#btnFileUpdate").on("click", function (e) {
    update.doUpload("/PLM/UploadModifiedFile", 'updateFileMsg');
    hideUpdateFileModal();
    $('fileupdate').val('');
    exportTableCounter = 0;
    expTable.ajax.reload();
});


$('#dwldTemplate').on('click', function () {
    urltoexport = "PLM/DownloadTemplatePlm";
    window.location = urltoexport ;    
})

$('#dwldFileToUpdate').on('click', function () {
    var filename = updateFileData.filename;
    urltoexport = "PLM/DownloadFileToModify?filenameToDownload=" + filename;
    window.location = urltoexport;

})

// $(document).ready(function () {
//     $('#selectFileToDownload').chosen();

//     $.ajax({
//         url: "/PLM/GetFileListDropdown",
//         dataType: "json",
//     }).done(function (data) {
//         data.data.map(function (item) {
//             $('#selectFileToDownload').append('<option value=' + item + '>' + item + '</option>');
//         });
//         $("#selectFileToDownload").trigger("chosen:updated");
//     });
// })

