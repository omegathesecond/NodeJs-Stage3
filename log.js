const fs = require("fs");
const os = require("os");




exports.log = class Log {


    ///action - action commited e.g "User Voted"
    ///description - description of action

    constructor(action, description) {
        this.action = action;
        this.description = description
    }


    ///updates log file by writing to our log.txt
    updateLogFile() {
        console.log("updating log");
        fs.writeFileSync("log.txt", this.action + ":" + this.description + os.EOL, { "encoding": "utf-8", "flag": "a+" });
    }
}