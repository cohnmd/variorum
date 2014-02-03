var fragNumber;
var oldTag = "";

function regFragment(fragment) {
    parent.contFrame.document.onload = function() { parent.contFrame.document.getElementById("fragment").innerHTML = fragment };
    parent.title = fragment;
}

function regPlayName(playName) {
    parent.contFrame.document.onload = function() { parent.contFrame.document.getElementById("playName").innerHTML = "<i>" + playName + "</i>" } ;
}

function regSource(source) {
    parent.contFrame.document.onload = function() { parent.contFrame.document.getElementById("source").innerHTML = source };
}

function regBuildInfo(buildInfo) {
    parent.contFrame.document.onload = function() { parent.contFrame.document.getElementById("buildInfo").innerHTML = buildInfo };
}

function loadTags(fragNumber) {
    parent.contFrame.document.getElementById("tags").innerHTML = "Loading. . ."
    this.fragNumber = fragNumber;
    var tableID = "1zaUYJa9cPl90Buj5l8QsmJwyEBKRDWJtGuMwrHg";
    var key = "AIzaSyCblijNi4TBgM8rF6aaGurTGRrnhsgHxf0";
    var queryHeader = "https://www.googleapis.com/fusiontables/v1/query?sql=";
    query = queryHeader + "SELECT Tag FROM " + tableID + " WHERE Number=" + fragNumber + "&key=" + key;
    fusionResponse = new XMLHttpRequest();
    fusionResponse.onreadystatechange = function () {
        if (fusionResponse.readyState == 4 && fusionResponse.status == 200) {
            var tagList = JSON.parse(fusionResponse.responseText);
            tags = "";
            n = 0;
	if (tagList.rows!=null) {
	    while (n != tagList.rows.length) {

                if (n != 0) {
                    tags = tags + "; "
                }
                tags = tags + tagList.rows[n]
                n++;
            }
	}
            parent.contFrame.document.getElementById("tags").innerHTML = tags;
	
            tagEntry();
        }
    }
    fusionResponse.open("GET", query, true);
    fusionResponse.send();


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
    tagButton.setAttribute("id", "tagButton");
    tagButton.setAttribute("value", "Submit");
    label.appendChild(tagEntry);
    label.appendChild(tagButton);
    parent.contFrame.document.getElementById("addTag").appendChild(label);
    tagButton.onclick = addTag;
}

function addTag() {
    newTag = parent.contFrame.document.getElementById("newTag").value;
    

    if (newTag.indexOf(",") > -1) {
        alert("Please only submit one tag at a time.");
    }
    
    else {
        if (newTag != "" && newTag != oldTag) {
            parent.contFrame.document.getElementById("tagButton").disabled = true;
            parent.contFrame.document.getElementById("newTag").value = "Adding tag. . .";
            var phpHook = new XMLHttpRequest();
            query = "http://" + document.location.hostname + "/demo/scripts/tableManager.php?num=" + fragNumber + "&tag=" + "'" + newTag + "'";
            phpHook.onreadystatechange = function () {
                if (phpHook.readyState == 4 && phpHook.status == 200) {
                    parent.contFrame.document.getElementById("tagButton").disabled = false;
                    parent.contFrame.document.getElementById("newTag").value = "";
                    parent.contFrame.document.getElementById("tags").innerHTML = parent.contFrame.document.getElementById("tags").innerHTML + "; " + newTag;
                    oldTag = newTag;
                }
            }
            phpHook.open("GET", query, true);
            phpHook.send();

        }
        else { parent.contFrame.document.getElementById("newTag").value = "Enter a new tag."; }
    
    }
}



function manageContext() {
    var preText = "";
    var node = document.getElementById("sourceText").firstChild;
    while (node!=null) {
        if (node.nodeName == "#text" && node.nodeValue != "") {
            preText = node.nodeValue;
            break;
        }
        node = node.nextSibling;
    }

    preTextTagged = "<span id='preContext'>" + preText + "</span>";
    document.getElementById("sourceText").innerHTML = document.getElementById("sourceText").innerHTML.replace(preText, preTextTagged);


    var postText = "";
    var node = document.getElementById("fragment").nextSibling;
    while (node!=null) {
        if (node.nodeName == "#text" && node.nodeValue != "") {
            postText = node.nodeValue;
            break;
        }
        node = node.nextSibling;
    }

    postTextTagged = "<span id='postContext'>" + postText + "</span>"
    document.getElementById("sourceText").innerHTML = document.getElementById("sourceText").innerHTML.replace(postText, postTextTagged);
    var label = parent.contFrame.document.createElement("label");
    label.innerHTML = "Show Context";
    var contextCheck = parent.contFrame.document.createElement("input");
    contextCheck.setAttribute("type", "checkbox")
    contextCheck.setAttribute("id", "contextCheck");
    contextCheck.setAttribute("checked", "true");
    contextCheck.onclick = displayContext;
    label.appendChild(contextCheck);
    parent.contFrame.document.getElementById("contextManager").appendChild(label);
}

function displayContext() {
    document.getElementById("contextCheck")
    if (parent.contFrame.document.getElementById("contextCheck").checked == 0) {
        document.getElementById("preContext").style.display = 'none';
        document.getElementById("postContext").style.display = 'none';
    } else {
        document.getElementById("preContext").style.display = 'block';
        document.getElementById("postContext").style.display = 'block';

    }
}