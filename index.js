var settings = require("./Settings");
var hbshelper = require("./hbsHelpers");
var APIDOC = require("./PumAPIDOC");
var d2sql = require("./datatable2sql");
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const { uuid } = require('uuidv4');
const bodyParser = require('body-parser');
const sql = require('mssql');
const device = require('express-device');
var cookieParser = require('cookie-parser');
var multer = require('multer');
const { raw } = require("body-parser");
var pdf = require("pdf-creator-node");
const pdfreader = require("pdfreader");
var fs = require('fs');
const { gunzip } = require("zlib");

// var html = fs.readFileSync('./views/CertificateTemp.vepa', 'utf8');

// var billhtml = fs.readFileSync('./views/BillTemp.vepa', 'utf8');
// var billhtml2 = fs.readFileSync('./views/BillTemp2.vepa', 'utf8');


const download = (url, path, callback) => {
    request.head(url, (err, res, body) => {
        request(url)
            .pipe(fs.createWriteStream(path))
            .on('close', callback)
    })
}

var certificaoptions = {
    format: "A3",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "45mm",
        contents: "<img src='image path' />"
    },
    footer: {
        "height": "28mm",
        "contents": {
            first: 'Cover page',
            2: 'Second page', // Any page number is working. 1-based index
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: 'Last Page'
        }
    }
};



var aboutimagesori = 0;

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, settings.imgpath);
//     },
//     filename: function (req, file, cb) {
//         cb(null, uuid() + "_" + file.originalname);
//     }
// });
// var upload = multer({ storage: storage });

// var storage2 = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, settings.GorselYonetim);
//     },
//     filename: function (req, file, cb) {
//         cb(null, uuid() + "_" + file.originalname);
//     }
// });
// var uploadGorselYonetim = multer({ storage: storage2 });

var storage3 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, settings.TiyatromFiles);
    },
    filename: function (req, file, cb) {
        cb(null, uuid() + "_" + file.originalname);
    }
});
var uploadTiyatromFiles = multer({ storage: storage3 });



const app = express();




sql.on('error', function (err) {
    console.log(err);
});

function changetemp(Tname, dest, callbackfunction) {

}

String.prototype.replaceAll = function (searchStr, replaceStr) {
    var str = this;
    // no match exists in string?
    if (str.indexOf(searchStr) === -1) {
        // return string
        return str;
    }
    // replace and remove first match, and do another recursirve search/replace
    return (str.replace(searchStr, replaceStr)).replaceAll(searchStr, replaceStr);
}

function secureSQLparams(sqltext, params) {
    for (let i = 0; i < params.length; i++) {
        const el = params[i];
        var val = el.value;
        if (typeof val == "string") {
            console.log(val);
            val = val.replaceAll("'", "");
            val = "'" + val + "' ";
        }
        sqltext = sqltext.toString().replaceAll("@" + el.name, val)
    }
    return sqltext.toString();
}

function secureSQLparams4update(sqltext) {
    sqltext = sqltext.toString();
    sqltext = sqltext.replaceAll("'", "");
    sqltext = "'" + sqltext + "'";

    return sqltext;
}
function runSQL(sqltext, params = null, callbackfunction) {
    if (sqltext) {
        if (params && Array.isArray(params)) { sqltext = secureSQLparams(sqltext, params) }
        sql.close();
        sql.connect(settings.MSQLConfig).then(pool => {
            console.log(sqltext);
            return pool.request().query(sqltext)
        }).then(callbackfunction).catch(callbackfunction)
    } else {
        console.log("Sql text giriniz");
    }

}

app.set('views', path.join(__dirname + '/views/'));
app.engine(settings.hbsextension, exphbs({ helpers: hbshelper, extname: settings.hbsextension, defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/Layouts/', partialsDir: __dirname + "/views/Partials" }));
app.set('view engine', settings.hbsextension);
app.use('/assets', express.static(__dirname + '/assets'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(device.capture());
app.use(cookieParser());
function renderParams(data, user, gridprop, layout = "mainLayout") {
    var renderedOBJ = {};
    if (data) {
        renderedOBJ.data = data;
        renderedOBJ.JSONdata = JSON.stringify(data);
    }
    if (user) {
        renderedOBJ.user = user;
        renderedOBJ.JSONuser = JSON.stringify(user);
    }
    if (gridprop) {
        renderedOBJ.gridprop = gridprop;
        renderedOBJ.JSONgridprop = JSON.stringify(gridprop);
    }
    renderedOBJ.layout = layout;
    renderedOBJ.settings = settings;
    return renderedOBJ;
}

app.get("/", function (req, res) {
        res.render("index", renderParams(null, null, null));
});
app.listen(settings._Port, function (err, data) {
    if (!err) {
        console.log("server started in " + settings._Port + " port");
    }
}),
3
