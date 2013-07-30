/*  
 *  For this to run, just exec npm install
 */

// Get dependencies
var irc = require('irc');
var axdcc = require('./lib/axdcc');
var stdin = process.openStdin();



// Set IRC configuration
var config = {
    server: 'irc.rizon.net',
    nick: 'xdcc-er',
    options: {
        channels: ['#Chan'],
        userName: 'xdcc-er',
        realName: 'xdcc-er',
        debug: false,
        stripColors: true
    }
};

// Connect to the server
var client = new irc.Client(config.server, config.nick, config.options);
console.log("-- CONNECTING TO " + config.server + " AS " + config.nick);

// Create a new Request and attach the event handlers
// Request pack #1337 from ``XDCC-Bot''
// Store the file in ``/path/to/Downloads''
// Resume if the file is existent
var request = new axdcc.Request(client, {
    pack: '#1337',
    nick: 'XDCC-Bot',
    path: '/path/to/Downloads',
    resume: true
}).on("dlerror", error).on("connect", connect).on("progress", progress).on("complete", complete);



client.on('join', function (channel, nick, message) {
    if (nick == config.nick && channel == config.options.channels[0]) {
        console.log('-- Joined ' + channel);


        stdin.addListener("data", function(d) {
            if(d.toString().substring(0, 1) == "S") {
                request.emit("start");
            }
            if(d.toString().substring(0, 1) == "C") {
                request.emit("cancel");
            }
        });
    }
});

// XDCC handlers
function connect (pack) {
    console.log("-- BEGINING XDCC OF " + pack.filename);
}

function progress (pack, recieved) {
    var progress = Math.floor(recieved / pack.filesize * 100);
    process.stdout.write("\033[s");
    process.stdout.write("-- " + progress + "% DONE " + pack.filename);
    process.stdout.write("\033[u");
}

function complete (pack) {
    console.log("-- COMPLETED XDCC OF " + pack.filename);
}

function error (pack, error) {
    console.log("-- XDCC ERROR WITH " + pack.filename + ": " + JSON.stringify(error));
}

client.on("error", function (message) {
    console.log("-- IRC ERROR: " + JSON.stringify(message));
});
