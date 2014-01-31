var entries = [];
var i = 0;
var lineIndex = 0;
var globalHighlight = 0;
var appCount = 0;


function app(position, line, reading, editor) {
    this.position = position;
    this.line = line;
    this.reading = reading;
    this.editor = editor;

}

function regEntry(position, line, reading, editor) {
    entries[i] = new app(position, line, reading, editor);
    i++;
}

function loadApp() {
    var n = 0;
    defaultFlag = 1;
    appIndex = -1;
    appTitle = 1;
    var appHeader;

    while (n < i) {
        if (appIndex != entries[n].position) {
            if (lineIndex != entries[n].line) {
                lineHeader = parent.contFrame.document.createElement("B");
                lineHeader.innerHTML = "<BR>Line " + entries[n].line;
                lineIndex = entries[n].line;
                parent.contFrame.document.getElementById("wit").appendChild(lineHeader);
            }
            appCount++;
            appIndex = entries[n].position;
            appHeader = parent.contFrame.document.createElement("span");
            appHeader.setAttribute("id", entries[n].position);
            defaultFlag = 0;
        }


        var label = parent.contFrame.document.createElement("label");
        label.innerHTML = entries[n].editor + ": " + entries[n].reading;
        var x = parent.contFrame.document.createElement("input");
        x.setAttribute("type", "radio");
        x.setAttribute("value", n);
        x.setAttribute("name", entries[n].position);
        if (defaultFlag == 0) {
            x.setAttribute("checked", "checked");
            defaultFlag = 1;
        }
        label.appendChild(x);
        x.onclick = changeEm;
        appHeader.onmouseover = highlightEm;
        appHeader.onmouseout = unHighlightEm;
        appHeader.appendChild(label);
        space = parent.contFrame.document.createElement("BR");
        appHeader.appendChild(space);
        parent.contFrame.document.getElementById("wit").appendChild(appHeader);
        n++;
    }

}

function changeEm() {
    if (globalHighlight == 0) {
        marker = document.createElement("mark");
        marker.innerHTML = entries[this.value].reading;
        document.getElementById(entries[this.value].position).innerHTML = "";
        document.getElementById(entries[this.value].position).appendChild(marker);
    } else {
        document.getElementById(entries[this.value].position).firstChild.innerHTML = entries[this.value].reading;
    }
}

function highlightEm() {
    if (globalHighlight == 0) {
        marker = document.createElement("mark");
        marker.innerHTML = document.getElementById(this.id).innerHTML;
        document.getElementById(this.id).innerHTML = "";
        document.getElementById(this.id).appendChild(marker);
    }
}

function unHighlightEm() {
    if (globalHighlight == 0) {
        document.getElementById(this.id).innerHTML = document.getElementById(this.id).firstChild.innerHTML;
    }
}

function highlightCruces(check) {

    if (check.checked == true) {
        globalHighlight = 1;
        var n = 0;

        while (n < appCount) {
            marker = document.createElement("mark");
            marker.innerHTML = document.getElementById(n).innerHTML;
            document.getElementById(n).innerHTML = "";
            document.getElementById(n).appendChild(marker);
            n = n + 1;
        }
    } else {
        globalHighlight = 0;
        var n = 0;
        while (n < appCount) {
            document.getElementById(n).innerHTML = document.getElementById(n).firstChild.innerHTML;
            n = n + 1;
        }
    }
}