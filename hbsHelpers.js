'use strict';
exports.debug = function (optionalValue) {
    console.log("Current Context");
    console.log("====================");
    console.log(this);

    if (optionalValue) {
        console.log("Value");
        console.log("====================");
        console.log(optionalValue);
    }
    else {
        console.log("NegatifValue");
        console.log("====================");
        console.log(optionalValue);
    }
};


exports.ifCond = function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
};



exports.starloop = function (n, block) {
    var accum = '';
    // var n = cikar - n;
    // n = Math.abs(n);
    for (var i = 0; i < 5; ++i) {
        if (i < n) {
            accum += '<img src="/assets/img/paintedstar.png" alt="">'
        }
        else {
            accum += '<img src="/assets/img/unpaintedstar.png" alt="">'
        }

    }
    return accum;
}

exports.toFixed = function (sayi) {
    var sonuc = parseFloat(sayi).toFixed(2)
    if (sonuc == 'NaN') {
        sonuc = parseFloat(0).toFixed(2)
    }
    return sonuc;
}
exports.formatDate = function (date) {
    if (date != "güncel") {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    else {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;


        return [year, month, day].join('-');
    }
}
exports.formatDateDay = function (date) {
    if (date != "güncel") {
        var d = new Date(date),
            day = '' + d.getDate()

        if (day.length < 2)
            day = '0' + day;
        return day;
    }
    else {
        var d = new Date(),
            day = '' + d.getDate()


        if (day.length < 2)
            day = '0' + day;
        return day
    }
}

exports.formatDateHours = function (date) {
    if (date != "güncel") {
        var d = new Date(date),
            hours = d.getUTCHours(),
            minute = d.getUTCMinutes();
        return [hours, minute].join(':');
    }
    else {
        var d = new Date(),
            hours = d.getUTCHours(),
            minute = d.getUTCMinutes();
        return [hours, minute].join(':');
    }
}
exports.textcrop = function (start, end, text, character) {
    if (typeof (character) == 'object') {
        character = '...'
    }
    return ' ' + text.substring(start, end) + character;
}