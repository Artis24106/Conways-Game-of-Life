import styles from "./style.scss";
import "jquery";

let Array2D = (r, c) => [...Array(r)].map(x => Array(c).fill(0));
async function sleep(ms = 0) {
    return new Promise(r => setTimeout(r, ms));
}
String.prototype.format = String.prototype.f = function() {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp("\\{" + i + "\\}", "gm"), arguments[i]);
    }
    return s;
};

function createElement(tag, content) {
    return "<{0}>{1}</{0}>".format(tag, content);
}

class Table {
    constructor(width, height) {
        this.name = 123;
        this.createCells(width, height);
    }

    createCells(width, height) {
        var tmp = "";
        for (var i = 0; i < width; i++) tmp += createElement("td", "");
        var el = createElement("tr", tmp);
        tmp = "";
        for (var i = 0; i < height; i++) tmp += el;
        var ret = createElement("tbody", tmp);
        ret = createElement("table", ret);
        $("body").prepend(ret);
    }

    changeColor(y, x) {
        let $el = $(
            "tbody>:nth-child({0})>:nth-child({1})".format(y + 1, x + 1)
        );
        if ($el.hasClass("alive")) {
            $el.removeClass("alive");
        } else {
            $el.addClass("alive");
        }
    }
}

class Game {
    constructor(size) {
        this.size = size;
        this.nowStatus = Array2D(size, size);
        this.preStatus = Array2D(size, size);
        this.table = new Table(size, size);

        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                if (Math.round(Math.random())) {
                    this.fill(i, j);
                }
            }
        }
        // this.fill(2, 2);
        // this.fill(2, 3);
        // this.fill(3, 2);
        // this.fill(3, 3);
        // this.fill(4, 4);
        // this.fill(4, 5);
        // this.fill(5, 4);
        // this.fill(5, 5);
    }

    fill(y, x) {
        this.preStatus[y][x] = 1;
        this.table.changeColor(y, x);
    }

    next() {
        var notChange = true;
        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                var count = 0;
                for (var p = -1; p <= 1; p++) {
                    for (var q = -1; q <= 1; q++) {
                        if ((p | q) === 0) continue;
                        count += this.checkAlive(i + p, j + q);
                    }
                }
                if (this.checkAlive(i, j)) {
                    this.nowStatus[i][j] = count === 2 || count === 3 ? 1 : 0;
                } else {
                    this.nowStatus[i][j] = count === 3 ? 1 : 0;
                }
                if (this.nowStatus[i][j] != this.preStatus[i][j]) {
                    this.table.changeColor(i, j);
                    notChange = false;
                }
            }
        }
        // var toPrint = "[PRE]\n",
        //     toPrint2 = "[NOW]\n";
        // for (var i = 0; i < 10; i++) {
        //     for (var j = 0; j < 10; j++) {
        //         toPrint += " {0}".format(this.preStatus[i][j]);
        //         toPrint2 += " {0}".format(this.nowStatus[i][j]);
        //     }
        //     toPrint += "\n";
        //     toPrint2 += "\n";
        // }
        // console.log(toPrint);
        // console.log(toPrint2);
        this.preStatus = JSON.parse(JSON.stringify(this.nowStatus));
        return !notChange;
    }

    checkAlive(y, x) {
        if (y > this.size - 1 || y < 0 || x > this.size - 1 || x < 0) return 0;
        return this.preStatus[y][x];
    }
}

async function main() {
    var game = new Game(50);
    var sleepTime = 50;
    await sleep(sleepTime);
    while (game.next()) {
        await sleep(sleepTime);
    }
    $("body").append(createElement("h2", "FINISH"));
}

main();
