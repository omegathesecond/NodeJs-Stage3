///E-VOTING MANAGER

const fs = require("fs");
const http = require("http");
const url = require("url");
const formidable = require("formidable");
const voterManager = require("./voter.js");
const events = require("events");
const logManager = require("./log.js");


var eventEmmiter = new events.EventEmitter;



///loding serve
http.createServer((req, res) => {
    var pathToRedirectTo;
    switch (req.url) {
        case "/register":
            pathToRedirectTo = "./register.html";
            //check if user submitted form
            if (req.method.toLowerCase() === "post") {
                var form = formidable.IncomingForm();
                form.parse(req, (err, fields, files) => {
                    var names = fields.names;
                    var idNumber = fields.id_number;
                    var voter = new voterManager.voter(idNumber, names);
                    if (voter.exists()) {
                        console.log("voter exists already");
                    } else {
                        voter.registerVoter();
                        ///update our log file
                        eventEmmiter.emit("voterRegistered", idNumber, names);

                    }
                });
            }
            ///process the registration
            ///use formidable to grab information
            break;
        case "/vote":
            pathToRedirectTo = "./vote.html";
            break;
        case "/show_results":
            pathToRedirectTo = "./show_basic_results.html";
            break;
        case "/delete":
            pathToRedirectTo = "./delete.html";
            if (req.method.toLowerCase() === "post") {
                var form = formidable.IncomingForm();
                form.parse(req, (error, fields, files) => {
                    var voterToDelete = fields.names;
                    var voter = new voterManager.voter("", voterToDelete);
                    voter.deleteVoter();
                    eventEmmiter.emit("voterDeleted", voterToDelete);

                });
            }
            break;
        default:
            pathToRedirectTo = "./index.html"
    };

    var indexPage = fs.readFile(pathToRedirectTo, function (error, data) {
        if (error) throw errow;
        res.writeHead(200, { "Content-type": "text/html" });
        res.write(data, function (error) {
            console.log(error)
        });
        res.end();
    });
}).listen("2020", function (error) {
    if (error) throw error;
    console.log("Server running: http://127.0.0.1:2020");
});



eventEmmiter.on("voterRegistered", function (idNumber, names) {
    ///update log file

    var log = new logManager.log("registered:", `${idNumber} - ${names}`);
    log.updateLogFile();


});

eventEmmiter.on("voterDeleted", function (names) {
    var log = new logManager.log("deleted", `${names} was deleted`);
    log.updateLogFile();
});
