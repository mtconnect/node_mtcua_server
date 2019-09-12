
const opcua = require("node-opcua");
const types = require("./node-opcua-types");
const xml2js = require("xml2js");
const address_space_generator = require("./address_space_generator");
const fs = require("fs");
const server_config = JSON.parse(fs.readFileSync("config/mtc_ua_server.cfg"));

var construct_address_space, device_json;

//Instance of OPCUAServer
const server = new opcua.OPCUAServer({
	
	//Load the server config information
	port: server_config.server.port,
    resourcePath: server_config.server.resourcePath,
	
	//Nodeset file paths for UA and MTConnect
	nodeset_filename: server_config.server.nodeset_filename,
    buildInfo : {
        productName: server_config.server.productName,
        buildNumber: server_config.server.buildNumber,
        buildDate: new Date(2019,9,9)
    }
});


//Generate mtconnect address space
function post_initialize() {
    
	//generate "construct address space"  module
	address_space_generator(server, device_json);
	
	//Import and load "construct address space" module
    construct_address_space = require("./construct_address_space");
	construct_address_space(server);
	
	//Initialize server
    console.log("Initializing Server ...");
    server.start(function() {
        console.log("Server is now listening ... (press CTRL+C to stop)");
        const endpointUrl = server.endpoints[0].endpointDescriptions()[0].endpointUrl;
        console.log("The primary server endpoint url is :", endpointUrl );
		console.log("-----------------------------------");
    });
}

//Parse the MTConnect XML Device File
fs.readFile(__dirname + server_config.device.device_file, "utf8", function(err, device_xml) {
	xml2js.parseString(device_xml, function (err, jsonObj) {
		device_json = jsonObj;
	});
});

//Initialize UA Server
server.initialize(post_initialize);