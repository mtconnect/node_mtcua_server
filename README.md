# MTConnect OPC UA Companion Specification Implementation (PoC)

## Getting Started

### Install `node-opcua`

#### If you already have `node-opcua` installed, then

	$ cd ~/path-to/node-opcua
	
#### Else Install `node-opcua`

	$ git clone https://github.com/node-opcua/node-opcua.git
	$ cd node-opcua
	$ npm install

### Clone `node_mtcua_server` repository 

	$ git clone https://github.com/mtconnect/node_mtcua_server.git
	$ cd node_mtcua_server
	
### Update Configuration

	$ cd config
	
#### Adapter Configuration

Update `host` and `port` information to reflect the Device adapter.

#### MTC UA Server Configuration

Update `port` if the current port number is already in use.

NodeSet file name/path information can be updated or added here.

Update the `device_file` to point to the MTConnect XML Device File (can have multiple device information) that the server is running for.

### Run the server

	$ cd ../node_mtcua_server
	$ node mtc_device.js

## Supported MTConnect Features in UA

### What is available:

* Devices

* Components

* References

* DataItem types; category SAMPLE

* DataItem types; category EVENT

* Description

* Attributes (except for representation)


### Not yet implemented:

* Compositions

* Configuration

* DataItem types; category CONDITION (placeholders for them added)

There are a few other lower level details not yet implemented.

