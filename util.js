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
<script>
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
   window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
    </script>






.mapContainer {
  height: calc(100vh - 120px);
  height: calc((var(--vh, 1vh) * 100) - 120px);
  width: 100%;
}
