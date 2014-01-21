function loadTrans(fragNumber) {

    var tableID= "10nvdo3g6hAmj_oKpYJfrt3zRm2ez0693iXp_P6U";
    var key ="AIzaSyCblijNi4TBgM8rF6aaGurTGRrnhsgHxf0";
    var queryHeader = "https://www.googleapis.com/fusiontables/v1/query?sql=";
    query = queryHeader + "SELECT Translation FROM " + tableID + " WHERE Number=" + fragNumber + "&key=" + key;

   var fusionResponse = null;
   fusionResponse = new XMLHttpRequest();
   fusionResponse.open( "GET", query, false );
   fusionResponse.send( null );
   var test = JSON.parse(fusionResponse.responseText);
   parent.contFrame.document.getElementById("trans").innerHTML=test.rows[0];
}

