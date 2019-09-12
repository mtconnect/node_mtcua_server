
const net = require("net");
const readline = require("readline");
const fs = require("fs");

//Device Adapter//mapping MTConnect values to UA values
function adapter (data_item_dict) {
	
	//Adapter Config Information
	const adapter_config = JSON.parse(fs.readFileSync("config/adapter.cfg"));
	const port = adapter_config.adapter.port;
	const host = adapter_config.adapter.host;

	//Create a client to listen to the Device Adapter
	const client = new net.Socket();

	//Connect as per the specified adapter config
	client.connect({ port: port, host: host });

	//Create a readline interface for the adapter data stream
	const r1 = readline.createInterface({
	  input: client,
	  output: client
	});

	//Event: error in connection: Raise error and close the client
	client.on("error" , function(e) {
	console.log(`Adapter Error Code: ${e.code}`);
		client.end();
	});

	//Event: new data received
	var line;
	r1.on("line", function(line) {
		//Log the new data received; Example: "timestamp|key|val|key2|val2"
		console.log(line);
		
		//Splice off the adapter native timestamp //Not configured to be optional YET
		data_item_list = line.split("|").splice(1,);
		
		//Assigns the value to the ua server defined variables/objects
		for (i = 0; i < data_item_list.length; i=i+2) {
			data_item_dict[data_item_list[i]] = data_item_list[i+1];
		};
	});

};

module.exports = adapter;