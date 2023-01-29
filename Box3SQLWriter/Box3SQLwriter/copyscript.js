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
    var v1t = getQueryVariable("v1t");
    var v2t = getQueryVariable("v2t");
    var v1 = getQueryVariable("v1");
    var v2 = getQueryVariable("v2");
    var tn = getQueryVariable("tn");
    if (!v1 || !v2 || !tn) {
        mdui.alert("No variables!您没有输入完整的参数，请返回主页输入。");
        window.open("./index.html?url=false");
        return false;
    } else if (!v1t || !v2t) {
        mdui.alert("No variables!您没有输入完整的参数，请返回次页输入。");
        window.open("./inputtype.html?url=false");
        return false;
    }

    searchById('tn-app').innerHTML = tn;
    searchById('v1n-app').innerHTML = v1;
    searchById('v2n-app').innerHTML = v2;
    searchById('v1nt-app').innerHTML = v1t;
    searchById('v2nt-app').innerHTML = v2t;
    searchById('tn-app').style.color = "red";
    searchById('v1n-app').style.color = "red";
    searchById('v2n-app').style.color = "red";
    searchById('v1nt-app').style.color = "red";
    searchById('v2nt-app').style.color = "red";
}

async function dotext() {
    var value1type = getQueryVariable("v1t");
    var value2type = getQueryVariable("v2t");
    var value1 = getQueryVariable("v1");
    var value2 = getQueryVariable("v2");
    var tableName = getQueryVariable("tn");
    alert(copyContent("//------------------------------------------------------------sql 数据库\n\nasync function createTable() {\n    await db.sql`\n        CREATE TABLE IF NOT EXISTS " + tableName + " (\n            " + value1 + " " + value1type + " NOT NULL,\n            " + value2 + " " + value2type + " NOT NULL,\n            name TEXT NOT NULL,\n            userKey TEXT PRIMARY KEY UNIQUE NOT NULL\n        )\n    `\n};\ncreateTable();\n\nasync function saveData(entity) {\n    if (entity.player.userKey) {\n        await db.sql`\n            INSERT INTO " + tableName + " (\n                " + value1 + ",\n                " + value2 + ",\n                name,\n                userKey\n            )\n            VALUES (\n                ${entity.player." + value1 + "},\n                ${entity.player." + value2 + "},\n                ${entity.player.name},\n                ${entity.player.userKey}\n            )\n            ON CONFLICT(userKey)\n            DO UPDATE SET\n            " + value1 + " = excluded." + value1 + ",\n            " + value2 + " = excluded." + value2 + ",\n            name = excluded.name,\n            userKey = excluded.userKey\n        `\n    } else {\n        console.log('游客不能存储sql');\n    }\n }\n\nworld.onPlayerLeave(async ({ entity }) => {\n    await saveData(entity);\n});\n\nasync function loadData(entity) {\n    const data = (\n        await (\n            db.sql`\n                SELECT * FROM " + tableName + " WHERE userKey = ${entity.player.userKey} limit 1\n            `\n        )\n    )[0];\n    if (data) {\n        entity.player." + value1 + " = data." + value1 + ";\n        entity.player." + value2 + " = data." + value2 + ";\n        entity.player.name = data.name;\n        entity.player.directMessage('已读取数据');\n    } else {\n        entity.player.directMessage('欢迎！新人欢迎');\n    }\n}\n\nasync function removePlayerRecord(name) {\n    await db.sql`DELETE FROM " + tableName + " WHERE name = ${name}`\n}\n\nasync function dropTable() {\n    await db.sql`DROP TABLE " + tableName + "`\n}\n\nworld.onPlayerJoin(async ({ entity }) => {\n    entity.player." + value1 + " = 0;\n    entity.player." + value2 + " = 0;\n    await loadData(entity);\n});\n\nasync function insertRecord(" + value1 + ", " + value2 + ", name, userKey) {\n    try{\n        await db.sql`\n            INSERT INTO player (" + value1 + ", " + value2 + ", name, userKey)\n            VALUES (${" + value1 + "}, ${" + value2 + "}, ${name}, ${userKey})\n        `;\n    } catch (e) {\n        console.log(`insert sql error: ${e}`);\n    }\n}\n\nworld.onPress(async ({ entity, button }) => {\n    if (button != 'action1') return;\n    if (entity.player.walkState != Box3PlayerWalkState.CROUCH) return;\n    await entity.player.dialog({\n        type: 'select',\n        title: 'sql查看页面',\n        content: `您的数据：\n        " + value1 + " : ${entity.player." + value1 + "}\n        " + value2 + " : ${entity.player." + value2 + "}`\n    });\n});\n"));
    searchById('codetext-app').innerHTML = `(代码已经复制到剪贴板，预览如上，可打开windows + v查看，直接复制到代码岛box3.codemao.cn运行即可。)`;
}

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
    return text;
}

function copyContent(content) {
    // 使用textarea支持换行，使用input不支持换行
    const textarea = document.createElement('textarea');
    textarea.value = content;
    document.body.appendChild(textarea);

    textarea.select();
    if (navigator.clipboard.writeText(content)) {
        navigator.clipboard.writeText(content);
    }
    document.body.removeChild(textarea);
    return content;
}

