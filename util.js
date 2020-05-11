export const dynamicsort = (property,order = "asc") => {
    var sort_order = 1;
    if(order === "desc"){
        sort_order = -1;
    }
    return function (a, b){
        // a should come before b in the sorted order
        if(a[property] < b[property]){
                return -1 * sort_order;
        // a should come after b in the sorted order
        }else if(a[property] > b[property]){
                return 1 * sort_order;
        // a and b are the same
        }else{
                return 0 * sort_order;
        }
    }
}



change in navigationbar.js 

options={this.props.sites.sort(dynamicsort("verified","asc"))}
//options={[{ label: "kshitij sharma kshitij sharma kshitij sharma verified", value: "kshitij", verified: 1 }, { label: "kshitij sharma kshitij sharma kshitij sharma", value: "sharma", verified: 0 }].sort(dynamicsort("verified","asc"))}
          
function onDateFilterApply() {
        dateFilterType = $('#dateFilterType').val();
        dateValue = $('#dateFilterValue').val();
        if (dateFilterType !== 'Select filter type' && dateValue !== '') {
                expTable.ajax.reload();
        } else {
            $("#snoAlertDangerBox").empty();
            $("#snoAlertDangerBox").fadeIn();
            $('<p style="font-size:12px">Please select all values</p>').appendTo('#snoAlertDangerBox');
            closeSnoDangerAlertBox();
        }
    }


.otpResend {
  text-align: center;
  color: #ffffff;
  margin-left: auto;
  margin-right: auto;
  bottom: 50px;
  margin-top: 50px;
  width: 100%;
  text-decoration: underline;
}

.titleContainer {
    height: 170px;
    padding: 20px;
    color: grey;
}


.boxbtnGrp {
    align-items: center;
    justify-content: flex-end;
    padding: 10px;
    border-top: 1px solid #e9ecef;
    height: 30px;
}

.confirmationBoxContainer -> 260px

confirmationbox.js df fc
