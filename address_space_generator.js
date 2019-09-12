
const fs = require("fs");
const opcua = require("node-opcua");
const types = require("./node-opcua-types");

//Load config file for this module
const generator_config = JSON.parse(fs.readFileSync("config/generator.cfg"));

//MTConnect Units to UA EUInfo Map
const eumap = generator_config.maps.eu_map;
//Category MTConnect to UA 
const category_enum = generator_config.maps.category_map;

//Declare global variables
var file_string = String();
var ua_dict = {};
var dataitemkeys = [];
var dataitemvals = [];
var extensions = [];
var type_extensions = [];

var addressSpace;
var namespace;
var mtconnect;

var contvocabeventtypes;
var numericeventtypes;
var stringeventtypes;

//Generator for addressSpace
function address_space_generator(server, json_obj) {

	//addressSpace and namespace definitions for generator
	addressSpace = server.engine.addressSpace;
	namespace = addressSpace.getOwnNamespace();
	mtconnect = addressSpace.getNamespace("http://opcfoundation.org/UA/MTConnect/v2/");
	
	//List of different objectTypes of EVENT category
	contvocabeventtypes = Object.getOwnPropertyNames(mtconnect.findObjectType("MTControlledVocabEventClassType"));
	numericeventtypes = Object.getOwnPropertyNames(mtconnect.findObjectType("MTNumericEventClassType"));
	stringeventtypes = Object.getOwnPropertyNames(mtconnect.findObjectType("MTStringEventClassType"));


	//create all UA types in the mtconnect namespace
	mtconnectdevices(json_obj.MTConnectDevices.Devices[0].Device);

	//addressSpace and namespace definitions
	mtconnect_namespace();
	
	//write into constructor JS file
	fs.writeFileSync(generator_config.dest_file.name, file_string, function(err) {
		console.log(err);
	});
};	

//Namespace definitions for the constructor .js file
function mtconnect_namespace() {
	//addressSpace and namespace definitions
	//global variable declarations
	let file_string_prepend  = `
const opcua = require("node-opcua");
const types = require("../packages/node-opcua-types");
const adapter = require("./adapter");
var data_item_dict = {${dataitemkeys.join(",")}};
var data_item_val = {\n\t${dataitemvals.join(",\n\t")}\n};

//Constructor for device specific mtconnect addressSpace
function construct_address_space(server) {
    
	//addressSpace and namespace definitions
    const addressSpace = server.engine.addressSpace;
    const namespace = addressSpace.getOwnNamespace();
	const mtconnect = addressSpace.getNamespace("http://opcfoundation.org/UA/MTConnect/v2/");

`;
	//device adapter instantiation
	let file_string_append = `
	
	//Device Adapter Instantiation
	adapter(data_item_dict); 
};

module.exports = construct_address_space;
`;
	//output file string for constructor .js file
	file_string = file_string_prepend + file_string + file_string_append;
};


//Add device information to file string
function mtconnectdevices(device) {
	var i = 0, j=0;
	var attribs;
	var devices_list = [];
	var device_variable_name;
  
	//Track all the devices
	for (i=0;i<device.length;i++) {
		devices_list.push(device[i].$.name);
	};
  
	//Add device specific node information to file string
    for (i=0;i<devices_list.length;i++) {
	  
		//Attributes of the device
		attribs = device[i].$;
	  
		//Determine device_name (browseName) 
		if (getOccurrences(devices_list, attribs.name).length > 1){
			device_name = attribs.name+"["+attribs.id+"]"; //for duplicate device names 
		} else {
			device_name = attribs.name;
		};
	
		//Device variable name that would appear in the constructor .js file
		device_variable_name = "device"+i.toString();
	  
		file_string += `
	//Device : ${device_name}
	const ${device_variable_name} = mtconnect.addObject({
		organizedBy: addressSpace.rootFolder.objects,
		browseName: "${device_name}",
		eventNotifier: 1,
		typeDefinition: mtconnect.findObjectType("MTDeviceType")
	});
`
		//Create device specific node information
		add_description(device[i], device_variable_name);
		add_attributes(device[i], device_variable_name);
		add_dataitems(device[i], device_variable_name);
		add_components(device[i], device_variable_name);
	};
};

//Add component specific node information to file string
function add_components(parent_node, parent_variable_name) {
	
	//Return if no "Components"
	if (parent_node.Components == undefined || parent_node.Components == null){
		return
	};
	
	//Declare variables
	var i = 0, j = 0;
	var components_list = [];
	var attribs, component_variable_name, components_variable_name;
	var component_name, component_type;
    
	//"Components" variable name 
	components_variable_name = parent_variable_name+"_components";
  	file_string += `
	//Components Folder
	const ${components_variable_name} = mtconnect.addObject({
		organizedBy: ${parent_variable_name},
		browseName: "Components",
		eventNotifier: 1,
		typeDefinition: "FolderType"
	});

	//Add HasNotifier Reference
	${components_variable_name}.addReference({
		nodeId: ${parent_variable_name}.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
`

	//Track all the Components within the "Components" folder
	for (component in parent_node.Components[0]) {
	    components_list.push(component);
	};
	
	//Create nodes for specific Components 
    for (i=0;i<components_list.length;i++) {
		component_type = components_list[i];
		
		//Iterate through each Component
		for (j=0;j<parent_node.Components[0][component_type].length;j++) {
			attribs = parent_node.Components[0][component_type][j].$;
			
			//component_name (browseName)
			if (parent_node.Components[0][component_type].length > 1){
				component_name = component_type+"["+attribs.name+"]"; //for duplicates
			} else {
				component_name = component_type;
			};
		
			//Component Variable Name that would appear in the constructor file
			component_variable_name = components_variable_name+"_"+i.toString()+"_"+j.toString();
			component_typedefinition = component_type + "Type";
		  
			file_string += `
	//Add Component: ${component_name}
	const ${component_variable_name} = mtconnect.addObject({
		organizedBy: ${components_variable_name},
		browseName: "${component_name}",
		eventNotifier: 1,
		typeDefinition: mtconnect.findObjectType("${component_typedefinition}")
	});

	//Add HasNotifier Reference
	${component_variable_name}.addReference({
		nodeId: ${components_variable_name}.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	`
			//Component specific node information
			add_description(parent_node.Components[0][component_type][j], component_variable_name);
			add_attributes(parent_node.Components[0][component_type][j], component_variable_name);
			add_dataitems(parent_node.Components[0][component_type][j], component_variable_name);
			add_components(parent_node.Components[0][component_type][j], component_variable_name);			
		};

	};
};

//Add DataItems specifc node information to file_string
function add_dataitems(parent_node, parent_variable_name){
	
	//Return if no dataitems
	if (parent_node.DataItems == undefined || parent_node.DataItems == null){
		return
	};
	
	//Declare variables
	var browsename = String();
	var i=0; var k=0;
	var variable_name;
	var dataitem_variable_name; var dataitem_val; var init_val;
	var typedefinition; var hasmtclasstype; var hasmtsubclasstype;
	var datatype; var value_datatype;
	var dataitems = parent_node.DataItems[0].DataItem;
	var dataitem_type_list = [];
	var subtype_prepend = String();
    
	//Track all dataitems
	for (i=0;i<dataitems.length;i++) {
		if (dataitems[i].$.subType != null){
			subtype_prepend = dataitems[i].$.subType.split(":").pop();
		};
		//Removing MTConnect extension (XML namespace) prefixes, eg "x:", only for tracking
	    dataitem_type_list.push(subtype_prepend+dataitems[i].$.type.split(":").pop());
	};
	
	//Dataitems specific node information
	for (i=0;i<dataitems.length;i++) {
		
		//*PLACEHOLDER* for CONDITION dataitems
		//TO BE COMPLETED
		if (dataitems[i].$.category === "CONDITION"){
			
			//browsename for condition type (Removing extension namespace)
			var cond_browsename = toPascalCase(dataitems[i].$.type.split(":").pop())+"Condition";
			
			//Condition variable name
			var cond_variable_name = parent_variable_name+"_"+cond_browsename;
			
			file_string += `
	//Condition type: ${cond_browsename}
	const ${cond_variable_name} = mtconnect.addObject({
		organizedBy: ${parent_variable_name},
		browseName: "${cond_browsename}",
		typeDefinition: "AlarmConditionType"
	});
	
	//Add HasNotifier Reference
	${cond_variable_name}.addReference({
		nodeId: ${parent_variable_name}.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	//Add HasCondition Reference
	${cond_variable_name}.addReference({
		nodeId: ${parent_variable_name}.nodeId,
		referenceType: addressSpace.findReferenceType("HasCondition"),
		isForward: false
	});
	`
			continue; 
		};
		
		//browsenames for all dataitems
		browsename = String();
		
		//Prefix for browsename if subtype exists
		if (dataitems[i].$.subType != null){
			browsename = toPascalCase(dataitems[i].$.subType.split(":").pop()); //remove extension namespace from browsename
		};
		
		//browsename append type 
		browsename += toPascalCase(dataitems[i].$.type.split(":").pop()); //remove extension namespace from browsename

		//Dataitem Variable Name
		variable_name = parent_variable_name + "_" + dataitems[i].$.id;
		
		//DataItem Variable Name for constructor to keep track of all dataitem variables
		dataitem_variable_name = dataitems[i].$.name;
		
		//typeDefinition, DataType for Object, DataType for Value, Initial Value
		[typedefinition, datatype, value_datatype, init_val] = get_typedefinition(dataitems[i].$);

		//Addressing for unique cases for adapter data values to UA data
		//MTControlledVocabEventType Data Value Mapping
		if (typedefinition === `mtconnect.findVariableType("MTControlledVocabEventType")`){

			//Determining DataType Defintions for Specific EVENT MTControlledVocabEventType
			//Example: AvailabilityDataType => AVAILABLE:0, UNAVAILABLE:1
			if (dataitems[i].$.type === "DOOR_STATE") { //TEMPORARY fix: usually is for interface dataitems
				var enum_strings = mtconnect.findDataType("OpenStateDataType").definition;
			}else{
				var enum_strings = mtconnect.findDataType(toPascalCase(dataitems[i].$.type)+"DataType").definition;
			};
			
			var enum_string = [];
			var enum_localizedtext = [];
			
			//Reading Definitions
			for (k=0; k<enum_strings.length;k++){
				enum_string.push(`"${enum_strings[k].name}":${enum_strings[k].value}`);
				enum_localizedtext.push(`{"text":"${enum_strings[k].name}"}`);
			};
			
			//Temporary fix instead of status codes
			//When Data is Unavailable then value is 0
			if (dataitems[i].$.type !== "AVAILABILITY"){
				`"UNAVAILABLE":0`
				enum_string.push(`"UNAVAILABLE":0`);
			};
			
			//Writing dataitem maps to constructor .js file
			dataitemvals.push(`"${dataitem_variable_name}":{${enum_string.join(",")}}`);
			dataitem_val = `data_item_val["${dataitem_variable_name}"][data_item_dict.${dataitem_variable_name}]`;
			
		
		} else if (typedefinition ===`mtconnect.findVariableType("MTThreeSpaceSampleType")`) {
			//MTThreeSpaceSampleType
			file_string += `
	// Variable for MTThreeSpaceSampleType
	var ${variable_name+"_val"} = new types.ThreeSpaceSampleDataType({});

	${variable_name+"_val"}.x = data_item_dict.${dataitem_variable_name}.split(" ")[0];
	${variable_name+"_val"}.y = data_item_dict.${dataitem_variable_name}.split(" ")[1];
	${variable_name+"_val"}.z = data_item_dict.${dataitem_variable_name}.split(" ")[2];
	
	`;
			dataitem_val = `${variable_name+"_val"}`;
		} else {
			//All the Dataitems
			dataitem_val = `data_item_dict.${dataitem_variable_name}`;
		};


		file_string += ` 
	//Add DataItem : ${browsename}
	data_item_dict.${dataitem_variable_name} = ${init_val};
	const ${variable_name} = mtconnect.addVariable({
			componentOf: ${parent_variable_name},
			browseName: "${browsename}",
			typeDefinition: ${typedefinition},
			dataType: ${datatype},
			value: {
				get: function () {
					return new opcua.Variant({dataType: ${value_datatype}, value: ${dataitem_val}});
				}
			}
		});
`

		//Adding Properties (Attributes and SubElements)
		if (typedefinition === `mtconnect.findVariableType("MTControlledVocabEventType")`){
			//MTControlledVocabEventType specific properties
			file_string += `
	//Add Property ValueAsText for ${variable_name}
	const ${variable_name+"_text"} = mtconnect.addVariable({
		propertyOf: ${variable_name},
		browseName: "ValueAsText",
		dataType: "LocalizedText",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.LocalizedText, value: {"text":data_item_dict.${dataitem_variable_name}}});
			}
		}
	});
	`;
			file_string += ` 
	//Add Property EnumStrings for ${variable_name}
	const ${variable_name+"_enumstrings"} = mtconnect.addVariable({
		propertyOf: ${variable_name},
		browseName: "EnumStrings",
		dataType: "LocalizedText",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.LocalizedText, value: [${enum_localizedtext.join(",")}]});
			}
		}
	});
	`;
		} else if (dataitems[i].$.category === "SAMPLE" && eumap[dataitems[i].$.units] !== null) {
			//SAMPLE category specific properties
			file_string +=`
	//Add EUInformation for ${variable_name}
	const ${variable_name+"_euinfo_val"} = new opcua.makeEUInformation({});
	
	${variable_name+"_euinfo_val"}.unitId = ${eumap[dataitems[i].$.units][0]};
	${variable_name+"_euinfo_val"}.description = opcua.coerceLocalizedText("${eumap[dataitems[i].$.units][1]}");
	${variable_name+"_euinfo_val"}.displayName = opcua.coerceLocalizedText("${eumap[dataitems[i].$.units][2]}");
	
	const ${variable_name+"_euinfo"} = mtconnect.addVariable({
		propertyOf: ${variable_name},
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: ${variable_name+"_euinfo_val"}  });
			}
		}
	});
	`;
		};

		//Add HasMTClassType Reference
		if (dataitems[i].$.type.split(":").length>1) {//For extended Types defined.
			
			hasmtclasstype = toPascalCase(dataitems[i].$.type.split(":")[1])+"ClassType";

			//Create new object for extended type
			if (type_extensions.indexOf(hasmtclasstype)<0){ //check if it already has been created
				type_extensions.push(hasmtclasstype);
				file_string +=`
	//New Object for Extended type ${hasmtclasstype}
	const ${hasmtclasstype} = mtconnect.addObject({
			browseName: "${hasmtclasstype}"
		});
		`;
			};
			
			//NodeId for the new Object
			var nodeid_val = `${hasmtclasstype}.nodeId.value`;

		}else{
			//For non extended types defined by MTConnect standard
			hasmtclasstype = toPascalCase(dataitems[i].$.type)+"ClassType";
			var nodeid_val = `mtconnect.findObjectType("${hasmtclasstype}").nodeId`;
		};
		
		file_string +=`
	//Add HasMTClassType Reference
	${variable_name}.addReference({
		nodeId: ${nodeid_val},
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		`
		
		//Add HasMTSubClassType Reference
		if (dataitems[i].$.subType != null){
			
			//Address for extended subtypes
			if (dataitems[i].$.subType.split(":").length >1){
				hasmtsubclasstype = toPascalCase(dataitems[i].$.subType.split(":")[1])+"SubClassType";

				//Check if extended subtype related object has been already defined
				if (extensions.indexOf(hasmtsubclasstype)<0){
					extensions.push(hasmtsubclasstype);
					file_string +=`
	//New Object for Extended subtype ${hasmtsubclasstype}
	const ${hasmtsubclasstype} = mtconnect.addObject({
				browseName: "${hasmtsubclasstype}"
		});
		`;
				};
				var nodeid_val = `${hasmtsubclasstype}.nodeId.value`;
				
			}else{
				hasmtsubclasstype = toPascalCase(dataitems[i].$.subType)+"SubClassType";
				var nodeid_val = `mtconnect.findObjectType("${hasmtsubclasstype}").nodeId`;
			};
			file_string +=`
	//Add HasMTSubClassType Reference
	${variable_name}.addReference({
		nodeId: ${nodeid_val},
		referenceType: mtconnect.findReferenceType("HasMTSubClassType")
	});
	`
		};
		
		//Add all other attributes wrt this dataitem
		add_attributes(dataitems[i], variable_name);
	};
};

//Add attribute specifc node information to file_string
function add_attributes(parent_node, parent_variable_name) {
	
	//Return if no attributes
	if (parent_node.$ == undefined || parent_node.$ == null){
		return
	};	
	
	//Declare variables
	var browsename = String;
	var datatype, value_datatype;
	var i=0; var attrib_val_name;
	var variable_name, val;
	
	//Track all attributes
	attrib_keys = Object.getOwnPropertyNames(parent_node.$);
	
	for (i=0;i<attrib_keys.length;i++) { 
	
		//For type/subType/category attributes
		if (attrib_keys[i] === "type" || attrib_keys[i] === "subType" || attrib_keys[i] === "category") {
			
			if (attrib_keys[i] === "category") {
				
				//category related definitions
				browsename = "Category";
				datatype = `mtconnect.findDataType("MTCategoryType")`;
				attrib_val_name = parent_variable_name + "_" + attrib_keys[i] + "_category";

				file_string += `
	//category attribute of EnumValueType
	const ${attrib_val_name} = new opcua.EnumValueType({});
	
	${attrib_val_name}.description = opcua.coerceLocalizedText("${parent_node.$[attrib_keys[i]]}");
	${attrib_val_name}.value = ${category_enum[parent_node.$[attrib_keys[i]]]};
	`;
				val = attrib_val_name;
				value_datatype = `opcua.DataType.ExtensionObject`;
				
			} else if (attrib_keys[i] === "type"){
				
				//type related definitions
				browsename = "MTTypeName";
				datatype = `"String"`;
				value_datatype = `opcua.DataType.String`;
				val = `"${parent_node.$.type}"`;
			
			} else if (attrib_keys[i] === "subType") {
				
				//subType related definitions
				browsename = "MTSubTypeName";
				datatype = `"String"`;
				value_datatype = `opcua.DataType.String`;
				val = `"${parent_node.$.subType}"`;
			};
			
		}else {
			//For all other attributes
			if (attrib_keys[i] === "id") {
				browsename = "XmlId";
			}else {
				browsename = attrib_keys[i].charAt(0).toUpperCase() + attrib_keys[i].slice(1);
			};
			
			//attribute definitions
			datatype = `"String"`;
			val = `"${parent_node.$[attrib_keys[i]]}"`;
			value_datatype = `opcua.DataType.String`;
		};

		//Attribute Variable Name as it would appear in Constructor .js file
		variable_name = parent_variable_name + "_" + attrib_keys[i];
		
		file_string += `
	
	//Add Property ${browsename}
	const ${variable_name} = mtconnect.addVariable({
		propertyOf: ${parent_variable_name},
		browseName: "${browsename}",
		dataType: ${datatype},
		value: {
			get: function () {
				return new opcua.Variant({dataType: ${value_datatype}, value: ${val}});
			}
		}
	});
`
	};
};

//Add Description node information to file_string
function add_description(parent_node, parent_variable_name){
	
	//Return if no Description
	if (parent_node.Description == undefined || parent_node.Description == null){
		return
	};
	
	//Declare Variables
	var browsename;
	var i=0;
	var typedefinition;
	var variable_name;
	var variable_name_data;

	//Browsename for Description
    browsename = "Description";
	
	//Variable Name as it would appear in constructor .js
	variable_name = parent_variable_name + "_" + browsename;
	
	typedefinition = `mtconnect.findObjectType("MTDescriptionType")`;

	file_string += `    
	//Add Description for ${parent_variable_name}
	const ${variable_name} = mtconnect.addObject({
		componentOf: ${parent_variable_name},
		browseName: "${browsename}",
		typeDefinition: ${typedefinition}
	});
`
	
	//Check if Description has attributes
	if (typeof(parent_node.Description[0])==="string"){
		description_data = parent_node.Description[0];
	}else{
		//Add Description data
		description_data = parent_node.Description[0]._;
		//Add Description Attributes
		add_attributes(parent_node.Description[0], variable_name);
	};
	
	//Variable Name for Description Data
	variable_name_data = variable_name+"_data";
	file_string += `    
	//Data For Description
	const ${variable_name_data} = mtconnect.addVariable({
		propertyOf: ${variable_name},
		browseName: "Data",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "${description_data}"});
			}
		}
	});
`

};


//Get type definitions and properties
function get_typedefinition(dataitem) {
	var typedefinition; var datatype; var value_datatype; var init_val;
	var classtype = toPascalCase(dataitem.type)+"ClassType";
	var getclasstype = classtype.charAt(0).toLowerCase() + classtype.slice(1);
	var k=0;
	
	//Check for category type SAMPLE/EVENT/CONDITION
	if (dataitem.category === "SAMPLE"){
		if (dataitem.type === "PATH_POSITION") {
			typedefinition = `mtconnect.findVariableType("MTThreeSpaceSampleType")`;
			datatype = `mtconnect.findDataType("ThreeSpaceSampleDataType")`;
			value_datatype = `opcua.DataType.ExtensionObject`;
			init_val = `new types.ThreeSpaceSampleDataType({})`;
		} else {
			typedefinition = `mtconnect.findVariableType("MTSampleType")`;
			datatype = `"Double"`;
			value_datatype = `opcua.DataType.Double`;
			init_val = `0`;
		};
	} else if (dataitem.category === "EVENT") {
		if (dataitem.type === "ASSET_CHANGED" || dataitem.type === "ASSET_REMOVED") {
			typedefinition = `mtconnect.findVariableType("MTAssetEventType")`;
			datatype = `"String"`;
			value_datatype = `opcua.DataType.String`;
			init_val = `String()`;
		} else if (contvocabeventtypes.indexOf(getclasstype) >= 0){
			typedefinition = `mtconnect.findVariableType("MTControlledVocabEventType")`;
			datatype = `"UInt32"`;
			value_datatype = `opcua.DataType.UInt32`;
			init_val = `"UNAVAILABLE"`;
		} else if (numericeventtypes.indexOf(getclasstype) >= 0){
			typedefinition = `mtconnect.findVariableType("MTNumericEventType")`;
			datatype = `"Double"`;
			value_datatype = `opcua.DataType.Double`;
			init_val = `0`;
		}else if (stringeventtypes.indexOf(getclasstype) >= 0){
			typedefinition = `mtconnect.findVariableType("MTStringEventType")`;
			datatype = `"String"`;
			value_datatype = `opcua.DataType.String`;
			init_val = `String()`;
		}else {
			typedefinition = `mtconnect.findVariableType("MTStringEventType")`;
			datatype = `"String"`;
			value_datatype = `opcua.DataType.String`;
			init_val = `String()`;
		};
	};
	return [typedefinition, datatype, value_datatype, init_val];
};

//Check for occurrences of a value within an array
function getOccurrences(array, val) {
	var indexes = [], j = 0;
    for(j = 0; j < array.length; j++)
        if (array[j] === val)
            indexes.push(j);
    return indexes;
};

//convert MTConnect type to Pascal Case
function toPascalCase(str) {
	return str.replace(/\_/g," ").replace(
		/\w\S*/g,
		function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		}
	).replace(/\ /g,"");
};


module.exports = address_space_generator;