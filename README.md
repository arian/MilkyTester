MilkyTester
===========

With MilkyTester you can run your Jasmine specs in all browser at the same time!

A server is created with Node.js and with Socket.io a socket with communication between browser and server.
Just typing `test()` in the console will reload all browsers and the results will be posted back.

![Screenshot](http://i.imgur.com/TITdk.png)

### Requirements

- Node.js
- Socket.io `npm install socket.io`

### Usage

Start the server with:

	node app.js


Then go to `http://localhost:8080` in all the browsers. The browsers will be connected automatically. Once that's done you can run them all by typing `test()` in the terminal.

### License

MIT-license. 
