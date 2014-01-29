function loadTrans(fragNumber) {

    var tableID = "10nvdo3g6hAmj_oKpYJfrt3zRm2ez0693iXp_P6U";
    var key = "AIzaSyCblijNi4TBgM8rF6aaGurTGRrnhsgHxf0";
    var queryHeader = "https://www.googleapis.com/fusiontables/v1/query?sql=";
    query = queryHeader + "SELECT Translation FROM " + tableID + " WHERE Number=" + fragNumber + "&key=" + key;
    parent.contFrame.document.getElementById("trans").innerHTML = "Loading. . ."
    var fusionResponse = null;
    fusionResponse = new XMLHttpRequest();
    fusionResponse.onreadystatechange = function () {
        if (fusionResponse.readyState == 4 && fusionResponse.status == 200) {
            var parsedResult = JSON.parse(fusionResponse.responseText);
            parent.contFrame.document.getElementById("trans").innerHTML = parsedResult.rows[0];
        }
    }
    fusionResponse.open("GET", query, true);
    fusionResponse.send();

}