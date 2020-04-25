const fs = require("fs");
var event = require("events");




exports.voter = class Voter {



    constructor(idNumber = "", names) {
        this.idNumber = idNumber;
        this.names = names;
    }

    voted() {
        //return true or false if user voted
    }

    exists() {
        //returns true if user exists and false if not
        return fs.existsSync(this.names + ".txt");
    }

    registerVoter() {


        //registers new voter
        fs.writeFileSync(this.names + ".txt", this.getVoterInformation());

        fs.writeFileSync("voters_list.txt", this.names + " just registered. \n", { "encoding": "utf-8", "flag": "a+" });


    }

    votedFor() {
        //returns name of political party voted for

    }

    updateLogs() {
        console.log(JSON.stringify(this.eventEmitter));

    }


    getVoterInformation() {
        return `Names: ${this.names} \n ID Number: ${this.idNumber}`;
    }

    deleteVoter() {
        fs.unlinkSync(`${this.names}.txt`);

    }




}

