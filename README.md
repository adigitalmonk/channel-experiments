# Phoenix Channel Experimentation

Just a simple library to use Phoenix Channels from within a standard Node application.

The module takes some channel name and a user token.
Then tries to connect to a Phoenix server running at localhost with that channel available.

Anytime the channel sends an `update` message, the payload is simply logged to the console.

## Usage

There's a basic `.envrc.example` where we put the `AUTH_TOKEN` for this example, but you can provide it however.

```javascript
const connect = require("./index");
const { _channel } = connect("some_channel:some_identifier", process.env.AUTH_TOKEN);
```

See more: <https://hexdocs.pm/phoenix/js/index.html>
