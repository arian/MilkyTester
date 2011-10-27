
var app = require('http').createServer(handler),
	io = require('socket.io').listen(app),
	fs = require('fs'),
	repl = require('repl');

app.listen(8080);

function handler (req, res) {
	var url = req.url;
	if (url == '/') url = '/index.html';
	var file = __dirname + '/static' + url;
	fs.readFile(file, function (err, data) {
		if (err) {
			res.writeHead(500);
			return res.end('Error loading index.html');
		}
		res.writeHead(200);
		res.end(data);
	});
}

var sockets = [];

io.set('log level', 1);

io.sockets.on('connection', function (socket){
	sockets.push(socket);
	
	socket.on('disconnect', function(){
		var i = sockets.indexOf(socket);
		if (i != -1) sockets.splice(i, 1);
	});
	
	socket.on('results', prettyLogResults);
	
});

var context = repl.start('yo dawgh > ').context;

context.test = function(timeout){
	sockets.forEach(function(socket){
		socket.emit('reload', timeout || 'now');
	});
	
	log.yellow('Testing with ' + sockets.length + ' connections');
	
};

var prettyLogResults = function(results){
	log.cyan('\n' + results.ua + '\n');

	var tests = results.results;
	
	log.log(  '- Finished in  : ' + (results.time / 1000) + 's');
	
	log.log(  '- Total tests  : ' + tests.totalCount);
	log.green('- Passed tests : ' + tests.passedCount);
	log.red(  '- Faield tests : ' + tests.failedCount + '\n');

	if (tests.failedCount){
		log.log('Failed tests:');
		prettyLogFailures(tests.items_);
	}
};

var prettyLogFailures = function(items, level){
	if (!level) level = 1;
	items.forEach(function(item){
		if (item.failedCount == undefined){
			if (item.passed_ == false){
				log.red(new Array(level + 1).join('-') + ' ' + item.message + '\n');
			}
		} else if (item.items_ && item.failedCount){
			if (item.description){
				log.red(new Array(level + 1).join('-') + ' ' + item.description);
			}
			prettyLogFailures(item.items_, level++);
		}
	});
};

var log = {
	ANSIColors: {
		green:  '\033[32m',
		red:    '\033[31m',
		cyan:   '\033[36m',
		yellow: '\033[1;33m',
		normal: '\033[0m'
	},
	log: function(msg, color){
		console.log((this.ANSIColors[color] || this.ANSIColors.normal) + msg + this.ANSIColors.normal);
	}
};
for (var col in log.ANSIColors) (function(col){
	log[col] = function(msg){
		this.log(msg, col);
	};
})(col);



