var path = "/demo/scripts";

function result(loc, hit) {
    this.loc = loc;
    this.hit = hit;
}

function searchFragText(searchTerm, includeCon) {
    query = path + "/fragmentSearch.php?q=" + searchTerm + "&con=" + includeCon;
    var searchResponse = new XMLHttpRequest();
    /*searchResponse.onreadystatechange= function() {
	        if (searchResponse.readyState==4 && searchResponse.status==200) {
			console.log(searchResponse.responseText);
			results = JSON.parse(searchResponse.responseText);
			return results;			
			}
		}*/

    searchResponse.open("GET", query, false);
    searchResponse.send();
    
    return JSON.parse(searchResponse.responseText);
}


function searchTags(searchTerm) {
    var tableID = "1zaUYJa9cPl90Buj5l8QsmJwyEBKRDWJtGuMwrHg";
    var key = "AIzaSyCblijNi4TBgM8rF6aaGurTGRrnhsgHxf0";
    var queryHeader = "https://www.googleapis.com/fusiontables/v1/query?sql=";
    var results = [];
    query = queryHeader + "SELECT 'Number', 'Tag' FROM " + tableID + " WHERE 'Tag' CONTAINS '" + searchTerm + "' ORDER BY 'Number' ASC&key=" + key;
    var fusionResponse = null;
    fusionResponse = new XMLHttpRequest();
    fusionResponse.open("GET", query, false);
    fusionResponse.send(null);
    var parsedResults = JSON.parse(fusionResponse.responseText);
    var i = 0;
    if (parsedResults.rows==null) {
        return 0;
    }
    else {
    while (i != parsedResults.rows.length) {
        results[i] = new result("kratesfr" + parsedResults.rows[i][0], parsedResults.rows[i][1]);
        i++;
    } }
    return results;
}

function searchBib(searchTerm) {
    var tableID = "1yoWR-RMIDTDzajMKJrtn_QojabB8927R61fkYpw";
    var key = "AIzaSyCblijNi4TBgM8rF6aaGurTGRrnhsgHxf0";
    var queryHeader = "https://www.googleapis.com/fusiontables/v1/query?sql=";
    var results = [];
    var query = queryHeader + "SELECT 'Number', 'Entry' FROM " + tableID + " WHERE 'Entry' CONTAINS '" + searchTerm + "' ORDER BY 'Number' ASC&key=" + key;
    var fusionResponse = null;
    fusionResponse = new XMLHttpRequest();
    fusionResponse.open("GET", query, false);
    fusionResponse.send(null);
    var parsedResults = JSON.parse(fusionResponse.responseText);
    var i = 0;
    if (parsedResults.rows==null) {
        return 0;
    }
    else {
    while (i != parsedResults.rows.length) {
        results[i] = new result("kratesfr" + parsedResults.rows[i][0], parsedResults.rows[i][1]);
        i++;
    }
    return results;
    }
}

function searchTrans(searchTerm) {
    var tableID = "10nvdo3g6hAmj_oKpYJfrt3zRm2ez0693iXp_P6U";
    var key = "AIzaSyCblijNi4TBgM8rF6aaGurTGRrnhsgHxf0";
    var queryHeader = "https://www.googleapis.com/fusiontables/v1/query?sql=";
    var results = [];
    var query = queryHeader + "SELECT 'Number' FROM " + tableID + " WHERE 'Translation' CONTAINS '" + searchTerm + "' ORDER BY 'Number' ASC&key=" + key;
    var fusionResponse = null;
    fusionResponse = new XMLHttpRequest();
    fusionResponse.open("GET", query, false);
    fusionResponse.send(null);
    var parsedResults = JSON.parse(fusionResponse.responseText);
    var i = 0;
    if (parsedResults.rows==null) {
        return 0;
    }
    else {
    while (i != parsedResults.rows.length) {
        results[i] = "kratesfr" + parsedResults.rows[i];
        i++;
    }
    return results;
}}