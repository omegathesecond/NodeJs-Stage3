///E-VOTING MANAGER

const fs = require("fs");
const http = require("http");
const url = require("url");
const formidable = require("formidable");
const voterManager = require("./voter.js");



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