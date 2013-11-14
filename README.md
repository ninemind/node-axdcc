#Node.js advanced XDCC library.
example requires Node.js IRC library. (`npm install irc`)

IRC library for downloading files from XDCC bots.

Works with Windows and Linux

##Usage

    var axdcc = require('./lib/axdcc');
    var request = new axdcc.Request(client, args);
    request.emit("start");

Requests an XDCC from `{client}` based on `{args}`

`{client}` IRC client (from IRC library)

`{args}` Information about the XDCC pack
    
    args = {
        "pack"              : < XDCC Pack ID >,
        "nick"              : < XDCC Bot Nick >,
        "path"              : < Path to download to >,
        "resume"            : < Boolean, overwrite instead of resume >,
        "progressInterval"  : < Interval in seconds progress is updated >
    }

##Callbacks

    request.on('connect', pack);
Emitted when an XDCC transfer starts

`{pack}`      is the XDCC pack information, see `Pack format` below

-------

    request.on('progress', pack, recieved);
Emitted when an XDCC transfer receives data

`{pack}`      is the XDCC pack information, see `Pack format` below

`{recieved}`  is the amount of data received
 
-------
 
    request.on('complete', pack);
Emitted when an XDCC transfer is complete

`{pack}`      is the XDCC pack information, see `Pack format` below

-------

    request.on('dlerror', pack, error);
Emitted when an XDCC transfer encounters an error

`{pack}`      is the XDCC pack information, see `Pack format` below

`{error}`     is the error data
 
##Listeners

    request.emit('start');
When emitted, XDCC transfer starts.

-------

    request.emit('cancel');
When emitted, all XDCC transfers are cancelled.

-------

    request.emit('kill');
When emitted, Request don't react on irc anymore.

##Pack format
    pack = {
        "command"   : <DCC command of transfer(SEND/ACCEPT)>
        "filename"  : <Name of file being transferred>
        "ip"        : <IP of file sender>
        "port"      : <Port of file sender>
        "filesize"  : <Size of file being transferred>
        "resumepos" : <Resume position of the file>
        "location"  : <Path to download to>
    }