// https://hexdocs.pm/phoenix/js/index.html
const phoenix = require("phoenix")
const WebSocket = global.WebSocket || require('websocket').w3cwebsocket

module.exports = (channel_name, userToken, channel_host = "localhost:4000") => {

    // Create a Websocket pointing to the host where the channel is running
    const socket = new phoenix.Socket(`http://${channel_host}/socket`, {
        params: { userToken }, 
        transport: WebSocket 
    });
    socket.connect();

    // Over the socket, connect to a Phoenix Channel for a given name (and no parameters)
    const channel = socket.channel(channel_name, {});
    
    // Any time an "update" event is fired by the channel, take the payload and log it out
    channel.on("update", payload => {
        console.log(payload)
    });
      
    // General events for connecting an failing to connect
    channel.join()
        .receive("ok", resp => { console.log("Listening", resp) })
        .receive("error", resp => { console.log("Error Listening", resp) });

    return { socket, channel }
}
