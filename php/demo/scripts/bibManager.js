function loadBib (fragNumber) {

    var tableID= "1yoWR-RMIDTDzajMKJrtn_QojabB8927R61fkYpw"; //table ID for bibliography
    var key ="AIzaSyCblijNi4TBgM8rF6aaGurTGRrnhsgHxf0";
    var queryHeader = "https://www.googleapis.com/fusiontables/v1/query?sql=";
    query = queryHeader + "SELECT Classification, Entry FROM " + tableID + " WHERE Number=" + fragNumber + "&key=" + key;
    var fusionResponse = null;
    fusionResponse = new XMLHttpRequest();
   fusionResponse.open( "GET", query, false );
   fusionResponse.send( null );
   var bibArray = JSON.parse(fusionResponse.responseText);
   editionsContainer = parent.contFrame.document.createElement("span");
   editionsContainer.setAttribute("id", "editions")
   editionsContainer.innerHTML = "<b>Editions</b><BR>"
   translationsContainer = parent.contFrame.document.createElement("span");
    translationsContainer.setAttribute("id", "translations");
    translationsContainer.innerHTML = "<b>Translations</b><BR>";
   miscContainer = parent.contFrame.document.createElement("span")
   miscContainer.setAttribute("id", "others")
   miscContainer.innerHTML = "<b>Other Sources</b><BR>";
   var index = 0;
   while(index!=bibArray.rows.length) {
       if (bibArray.rows[index][0]=="Edition") {
           editionsContainer.innerHTML = editionsContainer.innerHTML + bibArray.rows[index][1] + "<BR><BR>";
       }
       else if (bibArray.rows[index][0]=="Translation") {
           translationsContainer.innerHTML = translationsContainer.innerHTML + bibArray.rows[index][1] + "<BR><BR>" ;
            }
      else {
            miscContainer.innerHTML = miscContainer.innerHTML + bibArray.rows[index][1] + "<BR><BR>" ;
        }
       index++;    
    }
    
        parent.contFrame.document.getElementById("bib").appendChild(editionsContainer);
        parent.contFrame.document.getElementById("bib").appendChild(translationsContainer);
        parent.contFrame.document.getElementById("bib").appendChild(miscContainer);    
}