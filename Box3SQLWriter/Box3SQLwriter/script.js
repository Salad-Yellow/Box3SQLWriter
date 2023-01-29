function searchByClassName(className){
    return document.getElementsByClassName(className);
}

function submit(){
    var tn = searchByClassName('tn')[0];
    var v1 = searchByClassName('v1')[0];
    var v2 = searchByClassName('v2')[0];
    var url = getQueryVariable("url");
    if (url == "false"){
        mdui.alert('怎么这么不听话，还没看我就先去下一个了，哼~');
    }else if (!tn.value || !v1.value || !v2.value){
        mdui.alert('请输入完整哦，三个量必不可少！');
        return false;
    };
    var name = tn.value;
    var value1 = v1.value;
    var value2 = v2.value;
    var url = './inputtype.html?' + 'v1=' + value1 + '&v2=' + value2 + '&tn=' + name;  
    window.open(url, '_blank');
    return true;
}


function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}

function download(name, data) {
    var urlObject = window.URL || window.webkitURL || window;

    var downloadData = new Blob([data]);

    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
    save_link.href = urlObject.createObjectURL(downloadData);
    save_link.download = name;
    fake_click(save_link);
}


function fake_click(obj) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent(
        "click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null
    );
    obj.dispatchEvent(ev);
}