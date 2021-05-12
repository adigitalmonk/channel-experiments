// https://hexdocs.pm/phoenix/js
const phoenix = require("phoenix")
const WebSocket = global.WebSocket || require('websocket').w3cwebsocket

module.exports = (channel_name, userToken, channel_host = "http://localhost:4000") => {

    // Create a Websocket pointing to the host where the channel is running
    const socket = new phoenix.Socket(`${channel_host}`, {
        params: { userToken },
        transport: WebSocket
    });

    socket.onError( (error) => console.log("there was an error with the connection!", error) )
    socket.onClose( (msg) => {
        console.log("the connection dropped", msg)
        process.exit(1);
    })
 
    socket.connect();

    // Over the socket, connect to a Phoenix Channel for a given name (and no parameters)
    const channel = socket.channel(channel_name, { });
    
    // Any time an "update" event is fired by the channel, take the payload and log it out
    channel.on("update", payload => {
        console.log(Date.now(), "::Event::", payload)
    });
      
    channel.onError( () => console.log("there was an error!") )
    channel.onClose( () => console.log("the channel has gone away gracefully") );    

    // General events for connecting an failing to connect
    channel.join()
        .receive("ok", resp => { console.log("Listening", resp) })
        .receive("error", resp => { console.log("Error Listening", resp) })
        .receive("timeout", () => console.log("Networking issue. Still waiting..."));

        
    return { socket, channel }
}
