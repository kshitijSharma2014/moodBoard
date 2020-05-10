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
          
