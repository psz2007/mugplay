function readTextFile(file, ext, callback, isLocked = true) {
    let xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/" + ext);
    xhr.open("GET", file, !isLocked);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4)
            callback(xhr.responseText, xhr.status);
    }
    xhr.send();
}

function buildList() {
    let trackList;
    readTextFile("list.json", "json", function (txt) {
        try {
            trackList = JSON.parse(txt);
        } catch {
            alert("list parse error");
            return;
        }
    });
    console.log(trackList);
    if (trackList == undefined)
        return;
    for (let i in trackList) {
        let trk = trackList[i], d = trk.level.split("/"),
            ez = Number(d[0]), nm = Number(d[1]), hd = Number(d[2]);
        document.write("\
            <div class='ui card'>\
                <div class='content'>\
                    <a class='header' href='" + i + "/'>\
                        " + trk.title + "&nbsp;");
        if (hd > 0)
            document.write("<div class='ui right floated red label'>" + hd + "</div>");
        if (nm > 0)
            document.write("<div class='ui right floated yellow label'>" + nm + "</div>");
        if (ez > 0)
            document.write("<div class='ui right floated green label'>" + ez + "</div>");
        document.write("\
                    </a>\
                    <div class='meta'>" + trk.artist + "</div>\
                    <p>" + trk.description + "</p>\
                </div>\
            </div>");
    }
}
