var $ = mdui.$;

function searchByClassName(className) {
    return document.getElementsByClassName(className);
}

function searchById(id) {
    return document.getElementById(id);
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

function getValue() {
    var v1 = getQueryVariable("v1");
    var v2 = getQueryVariable("v2");
    var tn = getQueryVariable("tn");
    var url = getQueryVariable("url");
    if (url == "false"){
        mdui.alert('怎么这么不听话，还没看我就先去下一个了，哼~');
    }else if (!v1 || !v2 || !tn) {
        mdui.alert("No variables!您没有输入完整的参数，请返回主页输入。");
        window.open("./index.html?url=false");
        return false;
    };
    console.log(v1, v2, tn);
    searchById('tn-app').innerHTML = tn;
    searchById('v1n-app').innerHTML = v1;
    searchById('v2n-app').innerHTML = v2;
    searchById('tn-app').style.color = "red";
    searchById('v1n-app').style.color = "red";
    searchById('v2n-app').style.color = "red";
}

function submit() {
    var selection1 = searchByClassName('v1sc')[0];
    var selection2 = searchByClassName('v2sc')[0];
    var s1t = '';
    var s2t = '';
    var i1 = selection1.getElementsByClassName('input');
    console.log(i1);
    for (var m of i1) {
        if (m.checked) {
            s1t = m.value;
            var i2 = selection2.getElementsByClassName('input');
            for (var n of i2) {
                if (n.checked) {
                    s2t = n.value;
                    mdui.alert('选择成功。value1 type : ' + s1t + ' ; value2 type : ' + s2t + ';');
                    var v1 = getQueryVariable("v1");
                    var v2 = getQueryVariable("v2");
                    var tn = getQueryVariable("tn");
                    window.open('./copy.html?v1t=' + s1t + '&v2t=' + s2t + '&tn=' + tn + '&v1=' + v1 + '&v2=' + v2 + '&tn=' + tn, '_blank');
                    return true;
                };
            };
        };
    }
};

function download(name, data) {
    var urlObject = window.URL || window.webkitURL || window;

    var downloadData = new Blob([data]);

    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
    save_link.href = urlObject.createObjectURL(downloadData);
    save_link.download = name;
    fake_click(save_link);
}

//复制一段文字到剪贴板
function copyText(text) {
    navigator.clipboard.writeText(text);
}

function fake_click(obj) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent(
        "click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null
    );
    obj.dispatchEvent(ev);
}

