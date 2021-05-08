var statesObj;
var districtObj;
var selectedDistrictId = -1;
function showStateInDropDown() {
  var sobj = new XMLHttpRequest();
  sobj.open(
    "GET",
    "https://cdn-api.co-vin.in/api/v2/admin/location/states",
    true
  );
  sobj.onload = function () {
    if (this.status == 200) {
      statesObj = JSON.parse(this.responseText);

      // get into dropdown
      let statelist = document.getElementById("states");
      var str = " ";
      for (i in statesObj.states) {
        str += "<option>" + statesObj.states[i].state_name + "</option>";
      }
      statelist.innerHTML = str;
    }
  };
  sobj.setRequestHeader("accept", "application/json");
  sobj.send();
}

function changeStatesInOption() {
  var stateindex = document.getElementById("states").selectedIndex;
  console.log(stateindex);
  var stateId = statesObj.states[stateindex].state_id;
  selectedDistrictId = -1;

  var sobj = new XMLHttpRequest();
  sobj.open(
    "GET",
    "https://cdn-api.co-vin.in/api/v2/admin/location/districts/" + stateId,
    true
  );
  sobj.onload = function () {
    if (this.status == 200) {
      districtObj = JSON.parse(this.responseText);

      // get into dropdown
      let districtlist = document.getElementById("districts");
      var str = " ";
      for (i in districtObj.districts) {
        str +=
          "<option>" + districtObj.districts[i].district_name + "</option>";
      }
      districtlist.innerHTML = str;
    }
  };
  sobj.setRequestHeader("accept", "application/json");
  sobj.send();
}

function changeDistricsInOption() {
  selectedDistrictId = document.getElementById("districts").selectedIndex;
}

function submitForm() {
  var selectedDate = document.getElementById("date").value;

  if (selectedDate != "" && selectedDistrictId != -1) {
   //pass dummy session object here
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var strResponse = this.responseText;
        console.log(strResponse);
         var myObj = JSON.parse(strResponse);
         if (myObj.sessions !=""){
          renderTable(myObj);

         }else {
           alert('sessions are not avaliable');
         }

              }
  
    };
    xmlHttpRequest.open(
        "GET",
        "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" +
          selectedDistrictId +
          "&date=" +
          selectedDate,
        true
      );
    xmlHttpRequest.setRequestHeader("accept", "application/json");
    xmlHttpRequest.send();
  } else {
    alert("fill the details");
  }

}

function renderTable(obj){
  var i;
  var str = "";
  
for (i in obj.sessions){
  
    var xTable = document.getElementById('sessiont');
    str += '<tr><div><p>' +   obj.sessions[i].name    +'</p></div></tr>';
    xTable.innerHTML = str;
    console.log(str); 
}
}

/* window.addEventListener('error', function(e) {
    console.log(e);
}, true);*/
