import styles from "./style.scss";
import "jquery";

String.prototype.format = function() {
    var txt = this.toString();
    for (var i = 0; i < arguments.length; i++) {
        var exp = getStringFormatPlaceHolderRegEx(i);
        arguments[i] = String(arguments[i]).replace(/\$/gm, "♒☯◈∭");
        txt = txt.replace(exp, arguments[i] == null ? "" : arguments[i]);
        txt = txt.replace(/♒☯◈∭/gm, "$");
    }
    return cleanStringFormatResult(txt);
};

createCells(50, 50);
function createCells(width, height) {
    var tmp = "";
    for (var i = 0; i < width; i++) tmp += createElement("td", "");
    var el = createElement("tr", tmp);
    tmp = "";
    for (var i = 0; i < height; i++) tmp += el;
    var ret = createElement("tbody", tmp);
    ret = createElement("table", ret);

    // print(ret);
    $("body").prepend(ret);
}
function createElement(tag, content) {
    return "<" + tag + ">" + content + "</" + tag + ">";
}
