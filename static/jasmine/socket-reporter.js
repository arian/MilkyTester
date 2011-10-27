
jasmine.SocketReporter = (function(){

var noop = function(){};

SocketReporter = function(socket){
	this.socket = socket;
};

SocketReporter.prototype = {

	reportRunnerStarting: function(runner) {
		this.start_ = +(new Date);
	},

	reportRunnerResults: function(runner){
		var results = runner.results()
		socket.emit('results', {
			results: results,
			ua: navigator.userAgent,
			time: +(new Date) - this.start_
		});
	}

};

return SocketReporter;

})();
