var fragNumber;

function regFragment(fragment){
   parent.contFrame.document.getElementById("fragment").innerHTML=fragment;
}

function regPlayName (playName) {
    parent.contFrame.document.getElementById("playName").innerHTML="<i>" + playName + "</i>";
}

function regSource (source) {
    parent.contFrame.document.getElementById("source").innerHTML=source;
}

function regBuildInfo (buildInfo) {
    parent.contFrame.document.getElementById("buildInfo").innerHTML=buildInfo;
}

function loadTags(fragNumber) {
  this.fragNumber = fragNumber;
    var tableID= "1zaUYJa9cPl90Buj5l8QsmJwyEBKRDWJtGuMwrHg";
    var key ="AIzaSyCblijNi4TBgM8rF6aaGurTGRrnhsgHxf0";
    var queryHeader = "https://www.googleapis.com/fusiontables/v1/query?sql=";
   query = queryHeader + "SELECT Tag FROM " + tableID + " WHERE Number=" + fragNumber + "&key=" + key;
   var fusionResponse = null;

   fusionResponse = new XMLHttpRequest();
   fusionResponse.open( "GET", query, false );
   fusionResponse.send(null);
   var tagList = JSON.parse(fusionResponse.responseText);
   tags = "";
   n=0;
   while (n!=tagList.rows.length) {

       if (n!=0) {
           tags = tags + "; "
       }
       tags = tags + tagList.rows[n]
       n++;
   }
        parent.contFrame.document.getElementById("tags").innerHTML=tags;
      
 
        tagEntry(); 
}

function tagEntry() {
        var label = parent.contFrame.document.createElement("label");
        label.innerHTML = "Add a new tag:"
        var tagEntry = parent.contFrame.document.createElement("input");
        tagEntry.setAttribute("type", "text")
        tagEntry.setAttribute("id", "newTag");
        tagEntry.setAttribute("name", "Add a Tag:")
        var tagButton = parent.contFrame.document.createElement("input");
        tagButton.setAttribute("type", "button");
        tagButton.setAttribute("value", "Submit");
        label.appendChild(tagEntry);
        label.appendChild(tagButton);
        parent.contFrame.document.getElementById("addTag").appendChild(label);
        tagButton.onclick = addTag;

}

function addTag () {
       newTag = parent.contFrame.document.getElementById("newTag").value; 
       //send fragNumber and newTag to PHP script insertTags
}



function manageContext() {    
/*    document.getElementById("sourceText").insertAdjacentHTML('afterbegin', "<span id='preContext'>");
    document.getElementById("fragment").insertAdjacentHTML('beforebegin', "</span>");
    var oDiv = document.getElementById("text");
var firstText = "";
for (var i = 0; i < oDiv.childNodes.length; i++) {
    var curNode = oDiv.childNodes[i];
    if (curNode.nodeName === "#text") {
        firstText = curNode.nodeValue;
        break;
    }
}
firstTextWrapped = '<span id="preContext">' + firstText + '</span>';
oDiv.innerHTML = oDiv.innerHTML.replace(firstText, firstTextWrapped);
    
    
    */
    console.log(document.getElementById("sourceText").innerHTML);
    var label = parent.contFrame.document.createElement("label");
    label.innerHTML = "Show Context";    
    var contextCheck = parent.contFrame.document.createElement("input");
    contextCheck.setAttribute("type", "checkbox")
    contextCheck.setAttribute("id", "contextCheck");
    contextCheck.setAttribute("checked", "true");
    contextCheck.onclick=displayContext;
    label.appendChild(contextCheck);
    parent.contFrame.document.getElementById("contextManager").appendChild(label);        
}

function displayContext() {
    document.getElementById("contextCheck")
        if (parent.contFrame.document.getElementById("contextCheck").checked==0) {
            document.getElementById("fullContext").style.display = 'none';
            document.getElementById("noContext").style.display = 'inline';
        }
        else {
//            document.getElementById("noContext").style.display = 'none';
  //          document.getElementById("fullContext").style.display = 'block';
            
        }
}