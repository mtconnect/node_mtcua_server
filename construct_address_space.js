
const opcua = require("node-opcua");
const types = require("../packages/node-opcua-types");
const adapter = require("./adapter");
var data_item_dict = {};
var data_item_val = {
	"avail":{"AVAILABLE":0,"UNAVAILABLE":1},
	"functionalmode":{"MAINTENANCE":0,"PRODUCTION":1,"PROCESS_DEVELOPMENT":2,"SETUP":3,"TEARDOWN":4,"UNAVAILABLE":0},
	"crfunc":{"CONTOUR":0,"INDEX":1,"SPINDLE":2,"UNAVAILABLE":0},
	"arfunc":{"CONTOUR":0,"INDEX":1,"SPINDLE":2,"UNAVAILABLE":0},
	"brfunc":{"CONTOUR":0,"INDEX":1,"SPINDLE":2,"UNAVAILABLE":0},
	"estop":{"ARMED":0,"TRIGGERED":1,"UNAVAILABLE":0},
	"peditmode":{"ACTIVE":0,"NOT_READY":1,"READY":2,"UNAVAILABLE":0},
	"execution":{"ACTIVE":0,"FEED_HOLD":1,"INTERRUPTED":2,"OPTIONAL_STOP":3,"READY":4,"PROGRAM_COMPLETED":5,"PROGRAM_STOPPED":6,"STOPPED":7,"UNAVAILABLE":0},
	"mode":{"AUTOMATIC":0,"EDIT":1,"MANUAL":2,"MANUAL_DATA_INPUT":3,"SEMI_AUTOMATIC":4,"UNAVAILABLE":0},
	"doorstate":{"CLOSED":0,"OPEN":1,"UNLATCHED":2,"UNAVAILABLE":0}
};

//Constructor for device specific mtconnect addressSpace
function construct_address_space(server) {
    
	//addressSpace and namespace definitions
    const addressSpace = server.engine.addressSpace;
    const namespace = addressSpace.getOwnNamespace();
	const mtconnect = addressSpace.getNamespace("http://opcfoundation.org/UA/MTConnect/v2/");


	//Device : pocketNC
	const device0 = mtconnect.addObject({
		organizedBy: addressSpace.rootFolder.objects,
		browseName: "pocketNC",
		eventNotifier: 1,
		typeDefinition: mtconnect.findObjectType("MTDeviceType")
	});
    
	//Add Description for device0
	const device0_Description = mtconnect.addObject({
		componentOf: device0,
		browseName: "Description",
		typeDefinition: mtconnect.findObjectType("MTDescriptionType")
	});
    
	//Data For Description
	const device0_Description_data = mtconnect.addVariable({
		propertyOf: device0_Description,
		browseName: "Data",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Pocket NC : Machine Kit"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_id = mtconnect.addVariable({
		propertyOf: device0,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "d1"});
			}
		}
	});

	
	//Add Property Uuid
	const device0_uuid = mtconnect.addVariable({
		propertyOf: device0,
		browseName: "Uuid",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "pNC001"});
			}
		}
	});

	
	//Add Property Name
	const device0_name = mtconnect.addVariable({
		propertyOf: device0,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "pocketNC"});
			}
		}
	});
 
	//Add DataItem : Availability
	data_item_dict.avail = "UNAVAILABLE";
	const device0_avail = mtconnect.addVariable({
			componentOf: device0,
			browseName: "Availability",
			typeDefinition: mtconnect.findVariableType("MTControlledVocabEventType"),
			dataType: "UInt32",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.UInt32, value: data_item_val["avail"][data_item_dict.avail]});
				}
			}
		});

	//Add Property ValueAsText for device0_avail
	const device0_avail_text = mtconnect.addVariable({
		propertyOf: device0_avail,
		browseName: "ValueAsText",
		dataType: "LocalizedText",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.LocalizedText, value: {"text":data_item_dict.avail}});
			}
		}
	});
	 
	//Add Property EnumStrings for device0_avail
	const device0_avail_enumstrings = mtconnect.addVariable({
		propertyOf: device0_avail,
		browseName: "EnumStrings",
		dataType: "LocalizedText",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.LocalizedText, value: [{"text":"AVAILABLE"},{"text":"UNAVAILABLE"}]});
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_avail.addReference({
		nodeId: mtconnect.findObjectType("AvailabilityClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property XmlId
	const device0_avail_id = mtconnect.addVariable({
		propertyOf: device0_avail,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "avail"});
			}
		}
	});

	
	//Add Property Name
	const device0_avail_name = mtconnect.addVariable({
		propertyOf: device0_avail,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "avail"});
			}
		}
	});

	
	//Add Property MTTypeName
	const device0_avail_type = mtconnect.addVariable({
		propertyOf: device0_avail,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "AVAILABILITY"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_avail_category_category = new opcua.EnumValueType({});
	
	device0_avail_category_category.description = opcua.coerceLocalizedText("EVENT");
	device0_avail_category_category.value = 0;
	
	
	//Add Property Category
	const device0_avail_category = mtconnect.addVariable({
		propertyOf: device0_avail,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_avail_category_category});
			}
		}
	});
 
	//Add DataItem : FunctionalMode
	data_item_dict.functionalmode = "UNAVAILABLE";
	const device0_functionalmode = mtconnect.addVariable({
			componentOf: device0,
			browseName: "FunctionalMode",
			typeDefinition: mtconnect.findVariableType("MTControlledVocabEventType"),
			dataType: "UInt32",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.UInt32, value: data_item_val["functionalmode"][data_item_dict.functionalmode]});
				}
			}
		});

	//Add Property ValueAsText for device0_functionalmode
	const device0_functionalmode_text = mtconnect.addVariable({
		propertyOf: device0_functionalmode,
		browseName: "ValueAsText",
		dataType: "LocalizedText",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.LocalizedText, value: {"text":data_item_dict.functionalmode}});
			}
		}
	});
	 
	//Add Property EnumStrings for device0_functionalmode
	const device0_functionalmode_enumstrings = mtconnect.addVariable({
		propertyOf: device0_functionalmode,
		browseName: "EnumStrings",
		dataType: "LocalizedText",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.LocalizedText, value: [{"text":"MAINTENANCE"},{"text":"PRODUCTION"},{"text":"PROCESS_DEVELOPMENT"},{"text":"SETUP"},{"text":"TEARDOWN"}]});
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_functionalmode.addReference({
		nodeId: mtconnect.findObjectType("FunctionalModeClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property XmlId
	const device0_functionalmode_id = mtconnect.addVariable({
		propertyOf: device0_functionalmode,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "functionalmode"});
			}
		}
	});

	
	//Add Property Name
	const device0_functionalmode_name = mtconnect.addVariable({
		propertyOf: device0_functionalmode,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "functionalmode"});
			}
		}
	});

	
	//Add Property MTTypeName
	const device0_functionalmode_type = mtconnect.addVariable({
		propertyOf: device0_functionalmode,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "FUNCTIONAL_MODE"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_functionalmode_category_category = new opcua.EnumValueType({});
	
	device0_functionalmode_category_category.description = opcua.coerceLocalizedText("EVENT");
	device0_functionalmode_category_category.value = 0;
	
	
	//Add Property Category
	const device0_functionalmode_category = mtconnect.addVariable({
		propertyOf: device0_functionalmode,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_functionalmode_category_category});
			}
		}
	});

	//Components Folder
	const device0_components = mtconnect.addObject({
		organizedBy: device0,
		browseName: "Components",
		eventNotifier: 1,
		typeDefinition: "FolderType"
	});

	//Add HasNotifier Reference
	device0_components.addReference({
		nodeId: device0.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});

	//Add Component: Axes
	const device0_components_0_0 = mtconnect.addObject({
		organizedBy: device0_components,
		browseName: "Axes",
		eventNotifier: 1,
		typeDefinition: mtconnect.findObjectType("AxesType")
	});

	//Add HasNotifier Reference
	device0_components_0_0.addReference({
		nodeId: device0_components.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	
	//Add Property XmlId
	const device0_components_0_0_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "a"});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "base"});
			}
		}
	});

	//Condition type: ActuatorCondition
	const device0_components_0_0_ActuatorCondition = mtconnect.addObject({
		organizedBy: device0_components_0_0,
		browseName: "ActuatorCondition",
		typeDefinition: "AlarmConditionType"
	});
	
	//Add HasNotifier Reference
	device0_components_0_0_ActuatorCondition.addReference({
		nodeId: device0_components_0_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	//Add HasCondition Reference
	device0_components_0_0_ActuatorCondition.addReference({
		nodeId: device0_components_0_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasCondition"),
		isForward: false
	});
	
	//Condition type: SystemCondition
	const device0_components_0_0_SystemCondition = mtconnect.addObject({
		organizedBy: device0_components_0_0,
		browseName: "SystemCondition",
		typeDefinition: "AlarmConditionType"
	});
	
	//Add HasNotifier Reference
	device0_components_0_0_SystemCondition.addReference({
		nodeId: device0_components_0_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	//Add HasCondition Reference
	device0_components_0_0_SystemCondition.addReference({
		nodeId: device0_components_0_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasCondition"),
		isForward: false
	});
	
	//Components Folder
	const device0_components_0_0_components = mtconnect.addObject({
		organizedBy: device0_components_0_0,
		browseName: "Components",
		eventNotifier: 1,
		typeDefinition: "FolderType"
	});

	//Add HasNotifier Reference
	device0_components_0_0_components.addReference({
		nodeId: device0_components_0_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});

	//Add Component: Linear[X]
	const device0_components_0_0_components_0_0 = mtconnect.addObject({
		organizedBy: device0_components_0_0_components,
		browseName: "Linear[X]",
		eventNotifier: 1,
		typeDefinition: mtconnect.findObjectType("LinearType")
	});

	//Add HasNotifier Reference
	device0_components_0_0_components_0_0.addReference({
		nodeId: device0_components_0_0_components.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	
	//Add Property XmlId
	const device0_components_0_0_components_0_0_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_0,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "x"});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_0_0_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_0,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "X"});
			}
		}
	});
 
	//Add DataItem : ActualPosition
	data_item_dict.Xabs = 0;
	const device0_components_0_0_components_0_0_xpm = mtconnect.addVariable({
			componentOf: device0_components_0_0_components_0_0,
			browseName: "ActualPosition",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.Xabs});
				}
			}
		});

	//Add EUInformation for device0_components_0_0_components_0_0_xpm
	const device0_components_0_0_components_0_0_xpm_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_0_0_components_0_0_xpm_euinfo_val.unitId = 5066068;
	device0_components_0_0_components_0_0_xpm_euinfo_val.description = opcua.coerceLocalizedText("millimetre");
	device0_components_0_0_components_0_0_xpm_euinfo_val.displayName = opcua.coerceLocalizedText("mm");
	
	const device0_components_0_0_components_0_0_xpm_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_0_xpm,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_0_0_components_0_0_xpm_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_0_0_components_0_0_xpm.addReference({
		nodeId: mtconnect.findObjectType("PositionClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	//Add HasMTSubClassType Reference
	device0_components_0_0_components_0_0_xpm.addReference({
		nodeId: mtconnect.findObjectType("ActualSubClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTSubClassType")
	});
	
	
	//Add Property MTTypeName
	const device0_components_0_0_components_0_0_xpm_type = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_0_xpm,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "POSITION"});
			}
		}
	});

	
	//Add Property MTSubTypeName
	const device0_components_0_0_components_0_0_xpm_subType = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_0_xpm,
		browseName: "MTSubTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ACTUAL"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_0_0_components_0_0_xpm_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_0_xpm,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "xpm"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_0_0_components_0_0_xpm_category_category = new opcua.EnumValueType({});
	
	device0_components_0_0_components_0_0_xpm_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_0_0_components_0_0_xpm_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_0_0_components_0_0_xpm_category = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_0_xpm,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_0_0_components_0_0_xpm_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_0_0_xpm_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_0_xpm,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Xabs"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_0_0_components_0_0_xpm_units = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_0_xpm,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "MILLIMETER"});
			}
		}
	});

	
	//Add Property CoordinateSystem
	const device0_components_0_0_components_0_0_xpm_coordinateSystem = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_0_xpm,
		browseName: "CoordinateSystem",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "MACHINE"});
			}
		}
	});
 
	//Add DataItem : ActualPosition
	data_item_dict.Xpos = 0;
	const device0_components_0_0_components_0_0_xpw = mtconnect.addVariable({
			componentOf: device0_components_0_0_components_0_0,
			browseName: "ActualPosition",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.Xpos});
				}
			}
		});

	//Add EUInformation for device0_components_0_0_components_0_0_xpw
	const device0_components_0_0_components_0_0_xpw_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_0_0_components_0_0_xpw_euinfo_val.unitId = 5066068;
	device0_components_0_0_components_0_0_xpw_euinfo_val.description = opcua.coerceLocalizedText("millimetre");
	device0_components_0_0_components_0_0_xpw_euinfo_val.displayName = opcua.coerceLocalizedText("mm");
	
	const device0_components_0_0_components_0_0_xpw_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_0_xpw,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_0_0_components_0_0_xpw_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_0_0_components_0_0_xpw.addReference({
		nodeId: mtconnect.findObjectType("PositionClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	//Add HasMTSubClassType Reference
	device0_components_0_0_components_0_0_xpw.addReference({
		nodeId: mtconnect.findObjectType("ActualSubClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTSubClassType")
	});
	
	
	//Add Property MTTypeName
	const device0_components_0_0_components_0_0_xpw_type = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_0_xpw,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "POSITION"});
			}
		}
	});

	
	//Add Property MTSubTypeName
	const device0_components_0_0_components_0_0_xpw_subType = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_0_xpw,
		browseName: "MTSubTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ACTUAL"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_0_0_components_0_0_xpw_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_0_xpw,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "xpw"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_0_0_components_0_0_xpw_category_category = new opcua.EnumValueType({});
	
	device0_components_0_0_components_0_0_xpw_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_0_0_components_0_0_xpw_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_0_0_components_0_0_xpw_category = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_0_xpw,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_0_0_components_0_0_xpw_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_0_0_xpw_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_0_xpw,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Xpos"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_0_0_components_0_0_xpw_units = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_0_xpw,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "MILLIMETER"});
			}
		}
	});

	
	//Add Property CoordinateSystem
	const device0_components_0_0_components_0_0_xpw_coordinateSystem = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_0_xpw,
		browseName: "CoordinateSystem",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "WORK"});
			}
		}
	});

	//Condition type: PositionCondition
	const device0_components_0_0_components_0_0_PositionCondition = mtconnect.addObject({
		organizedBy: device0_components_0_0_components_0_0,
		browseName: "PositionCondition",
		typeDefinition: "AlarmConditionType"
	});
	
	//Add HasNotifier Reference
	device0_components_0_0_components_0_0_PositionCondition.addReference({
		nodeId: device0_components_0_0_components_0_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	//Add HasCondition Reference
	device0_components_0_0_components_0_0_PositionCondition.addReference({
		nodeId: device0_components_0_0_components_0_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasCondition"),
		isForward: false
	});
	 
	//Add DataItem : Load
	data_item_dict.Xload = 0;
	const device0_components_0_0_components_0_0_xl = mtconnect.addVariable({
			componentOf: device0_components_0_0_components_0_0,
			browseName: "Load",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.Xload});
				}
			}
		});

	//Add EUInformation for device0_components_0_0_components_0_0_xl
	const device0_components_0_0_components_0_0_xl_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_0_0_components_0_0_xl_euinfo_val.unitId = 20529;
	device0_components_0_0_components_0_0_xl_euinfo_val.description = opcua.coerceLocalizedText("Percent");
	device0_components_0_0_components_0_0_xl_euinfo_val.displayName = opcua.coerceLocalizedText("%");
	
	const device0_components_0_0_components_0_0_xl_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_0_xl,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_0_0_components_0_0_xl_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_0_0_components_0_0_xl.addReference({
		nodeId: mtconnect.findObjectType("LoadClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property MTTypeName
	const device0_components_0_0_components_0_0_xl_type = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_0_xl,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "LOAD"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_0_0_components_0_0_xl_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_0_xl,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "xl"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_0_0_components_0_0_xl_category_category = new opcua.EnumValueType({});
	
	device0_components_0_0_components_0_0_xl_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_0_0_components_0_0_xl_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_0_0_components_0_0_xl_category = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_0_xl,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_0_0_components_0_0_xl_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_0_0_xl_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_0_xl,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Xload"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_0_0_components_0_0_xl_units = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_0_xl,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "PERCENT"});
			}
		}
	});
 
	//Add DataItem : AxisFeedrate
	data_item_dict.Xfrt = 0;
	const device0_components_0_0_components_0_0_xf = mtconnect.addVariable({
			componentOf: device0_components_0_0_components_0_0,
			browseName: "AxisFeedrate",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.Xfrt});
				}
			}
		});

	//Add EUInformation for device0_components_0_0_components_0_0_xf
	const device0_components_0_0_components_0_0_xf_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_0_0_components_0_0_xf_euinfo_val.unitId = 4403510;
	device0_components_0_0_components_0_0_xf_euinfo_val.description = opcua.coerceLocalizedText("millimetre per second");
	device0_components_0_0_components_0_0_xf_euinfo_val.displayName = opcua.coerceLocalizedText("mm/s");
	
	const device0_components_0_0_components_0_0_xf_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_0_xf,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_0_0_components_0_0_xf_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_0_0_components_0_0_xf.addReference({
		nodeId: mtconnect.findObjectType("AxisFeedrateClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property MTTypeName
	const device0_components_0_0_components_0_0_xf_type = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_0_xf,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "AXIS_FEEDRATE"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_0_0_components_0_0_xf_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_0_xf,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "xf"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_0_0_components_0_0_xf_category_category = new opcua.EnumValueType({});
	
	device0_components_0_0_components_0_0_xf_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_0_0_components_0_0_xf_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_0_0_components_0_0_xf_category = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_0_xf,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_0_0_components_0_0_xf_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_0_0_xf_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_0_xf,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Xfrt"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_0_0_components_0_0_xf_units = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_0_xf,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "MILLIMETER/SECOND"});
			}
		}
	});

	//Add Component: Linear[Y]
	const device0_components_0_0_components_0_1 = mtconnect.addObject({
		organizedBy: device0_components_0_0_components,
		browseName: "Linear[Y]",
		eventNotifier: 1,
		typeDefinition: mtconnect.findObjectType("LinearType")
	});

	//Add HasNotifier Reference
	device0_components_0_0_components_0_1.addReference({
		nodeId: device0_components_0_0_components.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	
	//Add Property XmlId
	const device0_components_0_0_components_0_1_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_1,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "y"});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_0_1_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_1,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Y"});
			}
		}
	});
 
	//Add DataItem : ActualPosition
	data_item_dict.Yabs = 0;
	const device0_components_0_0_components_0_1_ypm = mtconnect.addVariable({
			componentOf: device0_components_0_0_components_0_1,
			browseName: "ActualPosition",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.Yabs});
				}
			}
		});

	//Add EUInformation for device0_components_0_0_components_0_1_ypm
	const device0_components_0_0_components_0_1_ypm_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_0_0_components_0_1_ypm_euinfo_val.unitId = 5066068;
	device0_components_0_0_components_0_1_ypm_euinfo_val.description = opcua.coerceLocalizedText("millimetre");
	device0_components_0_0_components_0_1_ypm_euinfo_val.displayName = opcua.coerceLocalizedText("mm");
	
	const device0_components_0_0_components_0_1_ypm_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_1_ypm,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_0_0_components_0_1_ypm_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_0_0_components_0_1_ypm.addReference({
		nodeId: mtconnect.findObjectType("PositionClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	//Add HasMTSubClassType Reference
	device0_components_0_0_components_0_1_ypm.addReference({
		nodeId: mtconnect.findObjectType("ActualSubClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTSubClassType")
	});
	
	
	//Add Property MTTypeName
	const device0_components_0_0_components_0_1_ypm_type = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_1_ypm,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "POSITION"});
			}
		}
	});

	
	//Add Property MTSubTypeName
	const device0_components_0_0_components_0_1_ypm_subType = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_1_ypm,
		browseName: "MTSubTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ACTUAL"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_0_0_components_0_1_ypm_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_1_ypm,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ypm"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_0_0_components_0_1_ypm_category_category = new opcua.EnumValueType({});
	
	device0_components_0_0_components_0_1_ypm_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_0_0_components_0_1_ypm_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_0_0_components_0_1_ypm_category = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_1_ypm,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_0_0_components_0_1_ypm_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_0_1_ypm_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_1_ypm,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Yabs"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_0_0_components_0_1_ypm_units = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_1_ypm,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "MILLIMETER"});
			}
		}
	});

	
	//Add Property CoordinateSystem
	const device0_components_0_0_components_0_1_ypm_coordinateSystem = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_1_ypm,
		browseName: "CoordinateSystem",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "MACHINE"});
			}
		}
	});
 
	//Add DataItem : ActualPosition
	data_item_dict.Ypos = 0;
	const device0_components_0_0_components_0_1_ypw = mtconnect.addVariable({
			componentOf: device0_components_0_0_components_0_1,
			browseName: "ActualPosition",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.Ypos});
				}
			}
		});

	//Add EUInformation for device0_components_0_0_components_0_1_ypw
	const device0_components_0_0_components_0_1_ypw_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_0_0_components_0_1_ypw_euinfo_val.unitId = 5066068;
	device0_components_0_0_components_0_1_ypw_euinfo_val.description = opcua.coerceLocalizedText("millimetre");
	device0_components_0_0_components_0_1_ypw_euinfo_val.displayName = opcua.coerceLocalizedText("mm");
	
	const device0_components_0_0_components_0_1_ypw_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_1_ypw,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_0_0_components_0_1_ypw_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_0_0_components_0_1_ypw.addReference({
		nodeId: mtconnect.findObjectType("PositionClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	//Add HasMTSubClassType Reference
	device0_components_0_0_components_0_1_ypw.addReference({
		nodeId: mtconnect.findObjectType("ActualSubClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTSubClassType")
	});
	
	
	//Add Property MTTypeName
	const device0_components_0_0_components_0_1_ypw_type = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_1_ypw,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "POSITION"});
			}
		}
	});

	
	//Add Property MTSubTypeName
	const device0_components_0_0_components_0_1_ypw_subType = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_1_ypw,
		browseName: "MTSubTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ACTUAL"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_0_0_components_0_1_ypw_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_1_ypw,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ypw"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_0_0_components_0_1_ypw_category_category = new opcua.EnumValueType({});
	
	device0_components_0_0_components_0_1_ypw_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_0_0_components_0_1_ypw_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_0_0_components_0_1_ypw_category = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_1_ypw,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_0_0_components_0_1_ypw_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_0_1_ypw_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_1_ypw,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Ypos"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_0_0_components_0_1_ypw_units = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_1_ypw,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "MILLIMETER"});
			}
		}
	});

	
	//Add Property CoordinateSystem
	const device0_components_0_0_components_0_1_ypw_coordinateSystem = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_1_ypw,
		browseName: "CoordinateSystem",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "WORK"});
			}
		}
	});

	//Condition type: PositionCondition
	const device0_components_0_0_components_0_1_PositionCondition = mtconnect.addObject({
		organizedBy: device0_components_0_0_components_0_1,
		browseName: "PositionCondition",
		typeDefinition: "AlarmConditionType"
	});
	
	//Add HasNotifier Reference
	device0_components_0_0_components_0_1_PositionCondition.addReference({
		nodeId: device0_components_0_0_components_0_1.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	//Add HasCondition Reference
	device0_components_0_0_components_0_1_PositionCondition.addReference({
		nodeId: device0_components_0_0_components_0_1.nodeId,
		referenceType: addressSpace.findReferenceType("HasCondition"),
		isForward: false
	});
	 
	//Add DataItem : Load
	data_item_dict.Yload = 0;
	const device0_components_0_0_components_0_1_yl = mtconnect.addVariable({
			componentOf: device0_components_0_0_components_0_1,
			browseName: "Load",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.Yload});
				}
			}
		});

	//Add EUInformation for device0_components_0_0_components_0_1_yl
	const device0_components_0_0_components_0_1_yl_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_0_0_components_0_1_yl_euinfo_val.unitId = 20529;
	device0_components_0_0_components_0_1_yl_euinfo_val.description = opcua.coerceLocalizedText("Percent");
	device0_components_0_0_components_0_1_yl_euinfo_val.displayName = opcua.coerceLocalizedText("%");
	
	const device0_components_0_0_components_0_1_yl_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_1_yl,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_0_0_components_0_1_yl_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_0_0_components_0_1_yl.addReference({
		nodeId: mtconnect.findObjectType("LoadClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property MTTypeName
	const device0_components_0_0_components_0_1_yl_type = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_1_yl,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "LOAD"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_0_0_components_0_1_yl_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_1_yl,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "yl"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_0_0_components_0_1_yl_category_category = new opcua.EnumValueType({});
	
	device0_components_0_0_components_0_1_yl_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_0_0_components_0_1_yl_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_0_0_components_0_1_yl_category = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_1_yl,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_0_0_components_0_1_yl_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_0_1_yl_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_1_yl,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Yload"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_0_0_components_0_1_yl_units = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_1_yl,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "PERCENT"});
			}
		}
	});
 
	//Add DataItem : AxisFeedrate
	data_item_dict.Yfrt = 0;
	const device0_components_0_0_components_0_1_yf = mtconnect.addVariable({
			componentOf: device0_components_0_0_components_0_1,
			browseName: "AxisFeedrate",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.Yfrt});
				}
			}
		});

	//Add EUInformation for device0_components_0_0_components_0_1_yf
	const device0_components_0_0_components_0_1_yf_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_0_0_components_0_1_yf_euinfo_val.unitId = 4403510;
	device0_components_0_0_components_0_1_yf_euinfo_val.description = opcua.coerceLocalizedText("millimetre per second");
	device0_components_0_0_components_0_1_yf_euinfo_val.displayName = opcua.coerceLocalizedText("mm/s");
	
	const device0_components_0_0_components_0_1_yf_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_1_yf,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_0_0_components_0_1_yf_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_0_0_components_0_1_yf.addReference({
		nodeId: mtconnect.findObjectType("AxisFeedrateClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property MTTypeName
	const device0_components_0_0_components_0_1_yf_type = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_1_yf,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "AXIS_FEEDRATE"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_0_0_components_0_1_yf_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_1_yf,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "yf"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_0_0_components_0_1_yf_category_category = new opcua.EnumValueType({});
	
	device0_components_0_0_components_0_1_yf_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_0_0_components_0_1_yf_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_0_0_components_0_1_yf_category = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_1_yf,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_0_0_components_0_1_yf_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_0_1_yf_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_1_yf,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Yfrt"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_0_0_components_0_1_yf_units = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_1_yf,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "MILLIMETER/SECOND"});
			}
		}
	});

	//Add Component: Linear[Z]
	const device0_components_0_0_components_0_2 = mtconnect.addObject({
		organizedBy: device0_components_0_0_components,
		browseName: "Linear[Z]",
		eventNotifier: 1,
		typeDefinition: mtconnect.findObjectType("LinearType")
	});

	//Add HasNotifier Reference
	device0_components_0_0_components_0_2.addReference({
		nodeId: device0_components_0_0_components.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	
	//Add Property XmlId
	const device0_components_0_0_components_0_2_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_2,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "z"});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_0_2_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_2,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Z"});
			}
		}
	});
 
	//Add DataItem : ActualPosition
	data_item_dict.Zabs = 0;
	const device0_components_0_0_components_0_2_zpm = mtconnect.addVariable({
			componentOf: device0_components_0_0_components_0_2,
			browseName: "ActualPosition",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.Zabs});
				}
			}
		});

	//Add EUInformation for device0_components_0_0_components_0_2_zpm
	const device0_components_0_0_components_0_2_zpm_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_0_0_components_0_2_zpm_euinfo_val.unitId = 5066068;
	device0_components_0_0_components_0_2_zpm_euinfo_val.description = opcua.coerceLocalizedText("millimetre");
	device0_components_0_0_components_0_2_zpm_euinfo_val.displayName = opcua.coerceLocalizedText("mm");
	
	const device0_components_0_0_components_0_2_zpm_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_2_zpm,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_0_0_components_0_2_zpm_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_0_0_components_0_2_zpm.addReference({
		nodeId: mtconnect.findObjectType("PositionClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	//Add HasMTSubClassType Reference
	device0_components_0_0_components_0_2_zpm.addReference({
		nodeId: mtconnect.findObjectType("ActualSubClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTSubClassType")
	});
	
	
	//Add Property MTTypeName
	const device0_components_0_0_components_0_2_zpm_type = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_2_zpm,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "POSITION"});
			}
		}
	});

	
	//Add Property MTSubTypeName
	const device0_components_0_0_components_0_2_zpm_subType = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_2_zpm,
		browseName: "MTSubTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ACTUAL"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_0_0_components_0_2_zpm_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_2_zpm,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "zpm"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_0_0_components_0_2_zpm_category_category = new opcua.EnumValueType({});
	
	device0_components_0_0_components_0_2_zpm_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_0_0_components_0_2_zpm_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_0_0_components_0_2_zpm_category = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_2_zpm,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_0_0_components_0_2_zpm_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_0_2_zpm_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_2_zpm,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Zabs"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_0_0_components_0_2_zpm_units = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_2_zpm,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "MILLIMETER"});
			}
		}
	});

	
	//Add Property CoordinateSystem
	const device0_components_0_0_components_0_2_zpm_coordinateSystem = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_2_zpm,
		browseName: "CoordinateSystem",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "MACHINE"});
			}
		}
	});
 
	//Add DataItem : ActualPosition
	data_item_dict.Zpos = 0;
	const device0_components_0_0_components_0_2_zpw = mtconnect.addVariable({
			componentOf: device0_components_0_0_components_0_2,
			browseName: "ActualPosition",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.Zpos});
				}
			}
		});

	//Add EUInformation for device0_components_0_0_components_0_2_zpw
	const device0_components_0_0_components_0_2_zpw_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_0_0_components_0_2_zpw_euinfo_val.unitId = 5066068;
	device0_components_0_0_components_0_2_zpw_euinfo_val.description = opcua.coerceLocalizedText("millimetre");
	device0_components_0_0_components_0_2_zpw_euinfo_val.displayName = opcua.coerceLocalizedText("mm");
	
	const device0_components_0_0_components_0_2_zpw_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_2_zpw,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_0_0_components_0_2_zpw_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_0_0_components_0_2_zpw.addReference({
		nodeId: mtconnect.findObjectType("PositionClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	//Add HasMTSubClassType Reference
	device0_components_0_0_components_0_2_zpw.addReference({
		nodeId: mtconnect.findObjectType("ActualSubClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTSubClassType")
	});
	
	
	//Add Property MTTypeName
	const device0_components_0_0_components_0_2_zpw_type = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_2_zpw,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "POSITION"});
			}
		}
	});

	
	//Add Property MTSubTypeName
	const device0_components_0_0_components_0_2_zpw_subType = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_2_zpw,
		browseName: "MTSubTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ACTUAL"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_0_0_components_0_2_zpw_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_2_zpw,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "zpw"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_0_0_components_0_2_zpw_category_category = new opcua.EnumValueType({});
	
	device0_components_0_0_components_0_2_zpw_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_0_0_components_0_2_zpw_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_0_0_components_0_2_zpw_category = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_2_zpw,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_0_0_components_0_2_zpw_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_0_2_zpw_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_2_zpw,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Zpos"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_0_0_components_0_2_zpw_units = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_2_zpw,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "MILLIMETER"});
			}
		}
	});

	
	//Add Property CoordinateSystem
	const device0_components_0_0_components_0_2_zpw_coordinateSystem = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_2_zpw,
		browseName: "CoordinateSystem",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "WORK"});
			}
		}
	});

	//Condition type: PositionCondition
	const device0_components_0_0_components_0_2_PositionCondition = mtconnect.addObject({
		organizedBy: device0_components_0_0_components_0_2,
		browseName: "PositionCondition",
		typeDefinition: "AlarmConditionType"
	});
	
	//Add HasNotifier Reference
	device0_components_0_0_components_0_2_PositionCondition.addReference({
		nodeId: device0_components_0_0_components_0_2.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	//Add HasCondition Reference
	device0_components_0_0_components_0_2_PositionCondition.addReference({
		nodeId: device0_components_0_0_components_0_2.nodeId,
		referenceType: addressSpace.findReferenceType("HasCondition"),
		isForward: false
	});
	 
	//Add DataItem : Load
	data_item_dict.Zload = 0;
	const device0_components_0_0_components_0_2_zl = mtconnect.addVariable({
			componentOf: device0_components_0_0_components_0_2,
			browseName: "Load",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.Zload});
				}
			}
		});

	//Add EUInformation for device0_components_0_0_components_0_2_zl
	const device0_components_0_0_components_0_2_zl_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_0_0_components_0_2_zl_euinfo_val.unitId = 20529;
	device0_components_0_0_components_0_2_zl_euinfo_val.description = opcua.coerceLocalizedText("Percent");
	device0_components_0_0_components_0_2_zl_euinfo_val.displayName = opcua.coerceLocalizedText("%");
	
	const device0_components_0_0_components_0_2_zl_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_2_zl,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_0_0_components_0_2_zl_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_0_0_components_0_2_zl.addReference({
		nodeId: mtconnect.findObjectType("LoadClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property MTTypeName
	const device0_components_0_0_components_0_2_zl_type = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_2_zl,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "LOAD"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_0_0_components_0_2_zl_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_2_zl,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "zl"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_0_0_components_0_2_zl_category_category = new opcua.EnumValueType({});
	
	device0_components_0_0_components_0_2_zl_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_0_0_components_0_2_zl_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_0_0_components_0_2_zl_category = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_2_zl,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_0_0_components_0_2_zl_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_0_2_zl_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_2_zl,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Zload"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_0_0_components_0_2_zl_units = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_2_zl,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "PERCENT"});
			}
		}
	});
 
	//Add DataItem : AxisFeedrate
	data_item_dict.Zfrt = 0;
	const device0_components_0_0_components_0_2_zf = mtconnect.addVariable({
			componentOf: device0_components_0_0_components_0_2,
			browseName: "AxisFeedrate",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.Zfrt});
				}
			}
		});

	//Add EUInformation for device0_components_0_0_components_0_2_zf
	const device0_components_0_0_components_0_2_zf_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_0_0_components_0_2_zf_euinfo_val.unitId = 4403510;
	device0_components_0_0_components_0_2_zf_euinfo_val.description = opcua.coerceLocalizedText("millimetre per second");
	device0_components_0_0_components_0_2_zf_euinfo_val.displayName = opcua.coerceLocalizedText("mm/s");
	
	const device0_components_0_0_components_0_2_zf_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_2_zf,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_0_0_components_0_2_zf_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_0_0_components_0_2_zf.addReference({
		nodeId: mtconnect.findObjectType("AxisFeedrateClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property MTTypeName
	const device0_components_0_0_components_0_2_zf_type = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_2_zf,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "AXIS_FEEDRATE"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_0_0_components_0_2_zf_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_2_zf,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "zf"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_0_0_components_0_2_zf_category_category = new opcua.EnumValueType({});
	
	device0_components_0_0_components_0_2_zf_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_0_0_components_0_2_zf_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_0_0_components_0_2_zf_category = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_2_zf,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_0_0_components_0_2_zf_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_0_2_zf_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_2_zf,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Zfrt"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_0_0_components_0_2_zf_units = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_0_2_zf,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "MILLIMETER/SECOND"});
			}
		}
	});

	//Add Component: Rotary[C]
	const device0_components_0_0_components_1_0 = mtconnect.addObject({
		organizedBy: device0_components_0_0_components,
		browseName: "Rotary[C]",
		eventNotifier: 1,
		typeDefinition: mtconnect.findObjectType("RotaryType")
	});

	//Add HasNotifier Reference
	device0_components_0_0_components_1_0.addReference({
		nodeId: device0_components_0_0_components.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	
	//Add Property XmlId
	const device0_components_0_0_components_1_0_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "c"});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_1_0_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "C"});
			}
		}
	});
 
	//Add DataItem : Load
	data_item_dict.Cload = 0;
	const device0_components_0_0_components_1_0_cl = mtconnect.addVariable({
			componentOf: device0_components_0_0_components_1_0,
			browseName: "Load",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.Cload});
				}
			}
		});

	//Add EUInformation for device0_components_0_0_components_1_0_cl
	const device0_components_0_0_components_1_0_cl_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_0_0_components_1_0_cl_euinfo_val.unitId = 20529;
	device0_components_0_0_components_1_0_cl_euinfo_val.description = opcua.coerceLocalizedText("Percent");
	device0_components_0_0_components_1_0_cl_euinfo_val.displayName = opcua.coerceLocalizedText("%");
	
	const device0_components_0_0_components_1_0_cl_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cl,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_0_0_components_1_0_cl_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_0_0_components_1_0_cl.addReference({
		nodeId: mtconnect.findObjectType("LoadClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property MTTypeName
	const device0_components_0_0_components_1_0_cl_type = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cl,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "LOAD"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_0_0_components_1_0_cl_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cl,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "cl"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_0_0_components_1_0_cl_category_category = new opcua.EnumValueType({});
	
	device0_components_0_0_components_1_0_cl_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_0_0_components_1_0_cl_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_0_0_components_1_0_cl_category = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cl,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_0_0_components_1_0_cl_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_1_0_cl_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cl,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Cload"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_0_0_components_1_0_cl_units = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cl,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "PERCENT"});
			}
		}
	});
 
	//Add DataItem : Load
	data_item_dict.Sload = 0;
	const device0_components_0_0_components_1_0_sl = mtconnect.addVariable({
			componentOf: device0_components_0_0_components_1_0,
			browseName: "Load",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.Sload});
				}
			}
		});

	//Add EUInformation for device0_components_0_0_components_1_0_sl
	const device0_components_0_0_components_1_0_sl_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_0_0_components_1_0_sl_euinfo_val.unitId = 20529;
	device0_components_0_0_components_1_0_sl_euinfo_val.description = opcua.coerceLocalizedText("Percent");
	device0_components_0_0_components_1_0_sl_euinfo_val.displayName = opcua.coerceLocalizedText("%");
	
	const device0_components_0_0_components_1_0_sl_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_sl,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_0_0_components_1_0_sl_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_0_0_components_1_0_sl.addReference({
		nodeId: mtconnect.findObjectType("LoadClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property MTTypeName
	const device0_components_0_0_components_1_0_sl_type = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_sl,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "LOAD"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_0_0_components_1_0_sl_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_sl,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "sl"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_0_0_components_1_0_sl_category_category = new opcua.EnumValueType({});
	
	device0_components_0_0_components_1_0_sl_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_0_0_components_1_0_sl_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_0_0_components_1_0_sl_category = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_sl,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_0_0_components_1_0_sl_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_1_0_sl_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_sl,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Sload"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_0_0_components_1_0_sl_units = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_sl,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "PERCENT"});
			}
		}
	});

	//Condition type: AngleCondition
	const device0_components_0_0_components_1_0_AngleCondition = mtconnect.addObject({
		organizedBy: device0_components_0_0_components_1_0,
		browseName: "AngleCondition",
		typeDefinition: "AlarmConditionType"
	});
	
	//Add HasNotifier Reference
	device0_components_0_0_components_1_0_AngleCondition.addReference({
		nodeId: device0_components_0_0_components_1_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	//Add HasCondition Reference
	device0_components_0_0_components_1_0_AngleCondition.addReference({
		nodeId: device0_components_0_0_components_1_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasCondition"),
		isForward: false
	});
	 
	//Add DataItem : AngularVelocity
	data_item_dict.Cfrt = 0;
	const device0_components_0_0_components_1_0_cf = mtconnect.addVariable({
			componentOf: device0_components_0_0_components_1_0,
			browseName: "AngularVelocity",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.Cfrt});
				}
			}
		});

	//Add EUInformation for device0_components_0_0_components_1_0_cf
	const device0_components_0_0_components_1_0_cf_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_0_0_components_1_0_cf_euinfo_val.unitId = 4536630;
	device0_components_0_0_components_1_0_cf_euinfo_val.description = opcua.coerceLocalizedText("Angular degrees per second");
	device0_components_0_0_components_1_0_cf_euinfo_val.displayName = opcua.coerceLocalizedText("◦/s");
	
	const device0_components_0_0_components_1_0_cf_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cf,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_0_0_components_1_0_cf_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_0_0_components_1_0_cf.addReference({
		nodeId: mtconnect.findObjectType("AngularVelocityClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property MTTypeName
	const device0_components_0_0_components_1_0_cf_type = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cf,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ANGULAR_VELOCITY"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_0_0_components_1_0_cf_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cf,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "cf"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_0_0_components_1_0_cf_category_category = new opcua.EnumValueType({});
	
	device0_components_0_0_components_1_0_cf_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_0_0_components_1_0_cf_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_0_0_components_1_0_cf_category = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cf,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_0_0_components_1_0_cf_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_1_0_cf_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cf,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Cfrt"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_0_0_components_1_0_cf_units = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cf,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "DEGREE/SECOND"});
			}
		}
	});

	
	//Add Property NativeUnits
	const device0_components_0_0_components_1_0_cf_nativeUnits = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cf,
		browseName: "NativeUnits",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "DEGREE/MINUTE"});
			}
		}
	});
 
	//Add DataItem : ActualRotaryVelocity
	data_item_dict.Srpm = 0;
	const device0_components_0_0_components_1_0_cs = mtconnect.addVariable({
			componentOf: device0_components_0_0_components_1_0,
			browseName: "ActualRotaryVelocity",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.Srpm});
				}
			}
		});

	//Add EUInformation for device0_components_0_0_components_1_0_cs
	const device0_components_0_0_components_1_0_cs_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_0_0_components_1_0_cs_euinfo_val.unitId = 5394509;
	device0_components_0_0_components_1_0_cs_euinfo_val.description = opcua.coerceLocalizedText("revolutions per minute");
	device0_components_0_0_components_1_0_cs_euinfo_val.displayName = opcua.coerceLocalizedText("r/min");
	
	const device0_components_0_0_components_1_0_cs_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cs,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_0_0_components_1_0_cs_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_0_0_components_1_0_cs.addReference({
		nodeId: mtconnect.findObjectType("RotaryVelocityClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	//Add HasMTSubClassType Reference
	device0_components_0_0_components_1_0_cs.addReference({
		nodeId: mtconnect.findObjectType("ActualSubClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTSubClassType")
	});
	
	
	//Add Property MTTypeName
	const device0_components_0_0_components_1_0_cs_type = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cs,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ROTARY_VELOCITY"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_0_0_components_1_0_cs_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cs,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "cs"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_0_0_components_1_0_cs_category_category = new opcua.EnumValueType({});
	
	device0_components_0_0_components_1_0_cs_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_0_0_components_1_0_cs_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_0_0_components_1_0_cs_category = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cs,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_0_0_components_1_0_cs_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_1_0_cs_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cs,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Srpm"});
			}
		}
	});

	
	//Add Property MTSubTypeName
	const device0_components_0_0_components_1_0_cs_subType = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cs,
		browseName: "MTSubTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ACTUAL"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_0_0_components_1_0_cs_units = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cs,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "REVOLUTION/MINUTE"});
			}
		}
	});
 
	//Add DataItem : Temperature
	data_item_dict.Stemp = 0;
	const device0_components_0_0_components_1_0_ctemp = mtconnect.addVariable({
			componentOf: device0_components_0_0_components_1_0,
			browseName: "Temperature",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.Stemp});
				}
			}
		});

	//Add EUInformation for device0_components_0_0_components_1_0_ctemp
	const device0_components_0_0_components_1_0_ctemp_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_0_0_components_1_0_ctemp_euinfo_val.unitId = 4408652;
	device0_components_0_0_components_1_0_ctemp_euinfo_val.description = opcua.coerceLocalizedText("Degrees Celsius");
	device0_components_0_0_components_1_0_ctemp_euinfo_val.displayName = opcua.coerceLocalizedText("◦Celsuis");
	
	const device0_components_0_0_components_1_0_ctemp_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_ctemp,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_0_0_components_1_0_ctemp_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_0_0_components_1_0_ctemp.addReference({
		nodeId: mtconnect.findObjectType("TemperatureClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property MTTypeName
	const device0_components_0_0_components_1_0_ctemp_type = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_ctemp,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "TEMPERATURE"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_0_0_components_1_0_ctemp_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_ctemp,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ctemp"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_0_0_components_1_0_ctemp_category_category = new opcua.EnumValueType({});
	
	device0_components_0_0_components_1_0_ctemp_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_0_0_components_1_0_ctemp_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_0_0_components_1_0_ctemp_category = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_ctemp,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_0_0_components_1_0_ctemp_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_1_0_ctemp_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_ctemp,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Stemp"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_0_0_components_1_0_ctemp_units = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_ctemp,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "CELSIUS"});
			}
		}
	});
 
	//Add DataItem : ActualAngle
	data_item_dict.Cabs = 0;
	const device0_components_0_0_components_1_0_cposm = mtconnect.addVariable({
			componentOf: device0_components_0_0_components_1_0,
			browseName: "ActualAngle",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.Cabs});
				}
			}
		});

	//Add EUInformation for device0_components_0_0_components_1_0_cposm
	const device0_components_0_0_components_1_0_cposm_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_0_0_components_1_0_cposm_euinfo_val.unitId = 17476;
	device0_components_0_0_components_1_0_cposm_euinfo_val.description = opcua.coerceLocalizedText("degree [unit of angle]");
	device0_components_0_0_components_1_0_cposm_euinfo_val.displayName = opcua.coerceLocalizedText("◦");
	
	const device0_components_0_0_components_1_0_cposm_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cposm,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_0_0_components_1_0_cposm_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_0_0_components_1_0_cposm.addReference({
		nodeId: mtconnect.findObjectType("AngleClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	//Add HasMTSubClassType Reference
	device0_components_0_0_components_1_0_cposm.addReference({
		nodeId: mtconnect.findObjectType("ActualSubClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTSubClassType")
	});
	
	
	//Add Property MTTypeName
	const device0_components_0_0_components_1_0_cposm_type = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cposm,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ANGLE"});
			}
		}
	});

	
	//Add Property CoordinateSystem
	const device0_components_0_0_components_1_0_cposm_coordinateSystem = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cposm,
		browseName: "CoordinateSystem",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "MACHINE"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_0_0_components_1_0_cposm_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cposm,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "cposm"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_0_0_components_1_0_cposm_category_category = new opcua.EnumValueType({});
	
	device0_components_0_0_components_1_0_cposm_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_0_0_components_1_0_cposm_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_0_0_components_1_0_cposm_category = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cposm,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_0_0_components_1_0_cposm_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_1_0_cposm_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cposm,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Cabs"});
			}
		}
	});

	
	//Add Property MTSubTypeName
	const device0_components_0_0_components_1_0_cposm_subType = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cposm,
		browseName: "MTSubTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ACTUAL"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_0_0_components_1_0_cposm_units = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cposm,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "DEGREE"});
			}
		}
	});
 
	//Add DataItem : ActualAngle
	data_item_dict.Cpos = 0;
	const device0_components_0_0_components_1_0_cposw = mtconnect.addVariable({
			componentOf: device0_components_0_0_components_1_0,
			browseName: "ActualAngle",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.Cpos});
				}
			}
		});

	//Add EUInformation for device0_components_0_0_components_1_0_cposw
	const device0_components_0_0_components_1_0_cposw_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_0_0_components_1_0_cposw_euinfo_val.unitId = 17476;
	device0_components_0_0_components_1_0_cposw_euinfo_val.description = opcua.coerceLocalizedText("degree [unit of angle]");
	device0_components_0_0_components_1_0_cposw_euinfo_val.displayName = opcua.coerceLocalizedText("◦");
	
	const device0_components_0_0_components_1_0_cposw_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cposw,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_0_0_components_1_0_cposw_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_0_0_components_1_0_cposw.addReference({
		nodeId: mtconnect.findObjectType("AngleClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	//Add HasMTSubClassType Reference
	device0_components_0_0_components_1_0_cposw.addReference({
		nodeId: mtconnect.findObjectType("ActualSubClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTSubClassType")
	});
	
	
	//Add Property MTTypeName
	const device0_components_0_0_components_1_0_cposw_type = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cposw,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ANGLE"});
			}
		}
	});

	
	//Add Property CoordinateSystem
	const device0_components_0_0_components_1_0_cposw_coordinateSystem = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cposw,
		browseName: "CoordinateSystem",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "WORK"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_0_0_components_1_0_cposw_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cposw,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "cposw"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_0_0_components_1_0_cposw_category_category = new opcua.EnumValueType({});
	
	device0_components_0_0_components_1_0_cposw_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_0_0_components_1_0_cposw_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_0_0_components_1_0_cposw_category = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cposw,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_0_0_components_1_0_cposw_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_1_0_cposw_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cposw,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Cpos"});
			}
		}
	});

	
	//Add Property MTSubTypeName
	const device0_components_0_0_components_1_0_cposw_subType = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cposw,
		browseName: "MTSubTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ACTUAL"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_0_0_components_1_0_cposw_units = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_cposw,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "DEGREE"});
			}
		}
	});
 
	//Add DataItem : RotaryMode
	data_item_dict.crfunc = "UNAVAILABLE";
	const device0_components_0_0_components_1_0_rf = mtconnect.addVariable({
			componentOf: device0_components_0_0_components_1_0,
			browseName: "RotaryMode",
			typeDefinition: mtconnect.findVariableType("MTControlledVocabEventType"),
			dataType: "UInt32",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.UInt32, value: data_item_val["crfunc"][data_item_dict.crfunc]});
				}
			}
		});

	//Add Property ValueAsText for device0_components_0_0_components_1_0_rf
	const device0_components_0_0_components_1_0_rf_text = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_rf,
		browseName: "ValueAsText",
		dataType: "LocalizedText",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.LocalizedText, value: {"text":data_item_dict.crfunc}});
			}
		}
	});
	 
	//Add Property EnumStrings for device0_components_0_0_components_1_0_rf
	const device0_components_0_0_components_1_0_rf_enumstrings = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_rf,
		browseName: "EnumStrings",
		dataType: "LocalizedText",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.LocalizedText, value: [{"text":"CONTOUR"},{"text":"INDEX"},{"text":"SPINDLE"}]});
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_0_0_components_1_0_rf.addReference({
		nodeId: mtconnect.findObjectType("RotaryModeClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property MTTypeName
	const device0_components_0_0_components_1_0_rf_type = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_rf,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ROTARY_MODE"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_0_0_components_1_0_rf_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_rf,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "rf"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_0_0_components_1_0_rf_category_category = new opcua.EnumValueType({});
	
	device0_components_0_0_components_1_0_rf_category_category.description = opcua.coerceLocalizedText("EVENT");
	device0_components_0_0_components_1_0_rf_category_category.value = 0;
	
	
	//Add Property Category
	const device0_components_0_0_components_1_0_rf_category = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_rf,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_0_0_components_1_0_rf_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_1_0_rf_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_0_rf,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "crfunc"});
			}
		}
	});

	//Condition type: LoadCondition
	const device0_components_0_0_components_1_0_LoadCondition = mtconnect.addObject({
		organizedBy: device0_components_0_0_components_1_0,
		browseName: "LoadCondition",
		typeDefinition: "AlarmConditionType"
	});
	
	//Add HasNotifier Reference
	device0_components_0_0_components_1_0_LoadCondition.addReference({
		nodeId: device0_components_0_0_components_1_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	//Add HasCondition Reference
	device0_components_0_0_components_1_0_LoadCondition.addReference({
		nodeId: device0_components_0_0_components_1_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasCondition"),
		isForward: false
	});
	
	//Condition type: TemperatureCondition
	const device0_components_0_0_components_1_0_TemperatureCondition = mtconnect.addObject({
		organizedBy: device0_components_0_0_components_1_0,
		browseName: "TemperatureCondition",
		typeDefinition: "AlarmConditionType"
	});
	
	//Add HasNotifier Reference
	device0_components_0_0_components_1_0_TemperatureCondition.addReference({
		nodeId: device0_components_0_0_components_1_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	//Add HasCondition Reference
	device0_components_0_0_components_1_0_TemperatureCondition.addReference({
		nodeId: device0_components_0_0_components_1_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasCondition"),
		isForward: false
	});
	
	//Add Component: Rotary[A]
	const device0_components_0_0_components_1_1 = mtconnect.addObject({
		organizedBy: device0_components_0_0_components,
		browseName: "Rotary[A]",
		eventNotifier: 1,
		typeDefinition: mtconnect.findObjectType("RotaryType")
	});

	//Add HasNotifier Reference
	device0_components_0_0_components_1_1.addReference({
		nodeId: device0_components_0_0_components.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	
	//Add Property XmlId
	const device0_components_0_0_components_1_1_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ar"});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_1_1_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "A"});
			}
		}
	});
 
	//Add DataItem : Load
	data_item_dict.Aload = 0;
	const device0_components_0_0_components_1_1_al = mtconnect.addVariable({
			componentOf: device0_components_0_0_components_1_1,
			browseName: "Load",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.Aload});
				}
			}
		});

	//Add EUInformation for device0_components_0_0_components_1_1_al
	const device0_components_0_0_components_1_1_al_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_0_0_components_1_1_al_euinfo_val.unitId = 20529;
	device0_components_0_0_components_1_1_al_euinfo_val.description = opcua.coerceLocalizedText("Percent");
	device0_components_0_0_components_1_1_al_euinfo_val.displayName = opcua.coerceLocalizedText("%");
	
	const device0_components_0_0_components_1_1_al_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_al,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_0_0_components_1_1_al_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_0_0_components_1_1_al.addReference({
		nodeId: mtconnect.findObjectType("LoadClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property MTTypeName
	const device0_components_0_0_components_1_1_al_type = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_al,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "LOAD"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_0_0_components_1_1_al_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_al,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "al"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_0_0_components_1_1_al_category_category = new opcua.EnumValueType({});
	
	device0_components_0_0_components_1_1_al_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_0_0_components_1_1_al_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_0_0_components_1_1_al_category = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_al,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_0_0_components_1_1_al_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_1_1_al_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_al,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Aload"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_0_0_components_1_1_al_units = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_al,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "PERCENT"});
			}
		}
	});
 
	//Add DataItem : AngularVelocity
	data_item_dict.Afrt = 0;
	const device0_components_0_0_components_1_1_af = mtconnect.addVariable({
			componentOf: device0_components_0_0_components_1_1,
			browseName: "AngularVelocity",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.Afrt});
				}
			}
		});

	//Add EUInformation for device0_components_0_0_components_1_1_af
	const device0_components_0_0_components_1_1_af_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_0_0_components_1_1_af_euinfo_val.unitId = 4536630;
	device0_components_0_0_components_1_1_af_euinfo_val.description = opcua.coerceLocalizedText("Angular degrees per second");
	device0_components_0_0_components_1_1_af_euinfo_val.displayName = opcua.coerceLocalizedText("◦/s");
	
	const device0_components_0_0_components_1_1_af_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_af,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_0_0_components_1_1_af_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_0_0_components_1_1_af.addReference({
		nodeId: mtconnect.findObjectType("AngularVelocityClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property MTTypeName
	const device0_components_0_0_components_1_1_af_type = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_af,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ANGULAR_VELOCITY"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_0_0_components_1_1_af_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_af,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "af"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_0_0_components_1_1_af_category_category = new opcua.EnumValueType({});
	
	device0_components_0_0_components_1_1_af_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_0_0_components_1_1_af_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_0_0_components_1_1_af_category = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_af,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_0_0_components_1_1_af_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_1_1_af_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_af,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Afrt"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_0_0_components_1_1_af_units = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_af,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "DEGREE/SECOND"});
			}
		}
	});

	
	//Add Property NativeUnits
	const device0_components_0_0_components_1_1_af_nativeUnits = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_af,
		browseName: "NativeUnits",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "DEGREE/MINUTE"});
			}
		}
	});

	//Condition type: AngleCondition
	const device0_components_0_0_components_1_1_AngleCondition = mtconnect.addObject({
		organizedBy: device0_components_0_0_components_1_1,
		browseName: "AngleCondition",
		typeDefinition: "AlarmConditionType"
	});
	
	//Add HasNotifier Reference
	device0_components_0_0_components_1_1_AngleCondition.addReference({
		nodeId: device0_components_0_0_components_1_1.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	//Add HasCondition Reference
	device0_components_0_0_components_1_1_AngleCondition.addReference({
		nodeId: device0_components_0_0_components_1_1.nodeId,
		referenceType: addressSpace.findReferenceType("HasCondition"),
		isForward: false
	});
	 
	//Add DataItem : ActualAngle
	data_item_dict.Aabs = 0;
	const device0_components_0_0_components_1_1_aposm = mtconnect.addVariable({
			componentOf: device0_components_0_0_components_1_1,
			browseName: "ActualAngle",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.Aabs});
				}
			}
		});

	//Add EUInformation for device0_components_0_0_components_1_1_aposm
	const device0_components_0_0_components_1_1_aposm_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_0_0_components_1_1_aposm_euinfo_val.unitId = 17476;
	device0_components_0_0_components_1_1_aposm_euinfo_val.description = opcua.coerceLocalizedText("degree [unit of angle]");
	device0_components_0_0_components_1_1_aposm_euinfo_val.displayName = opcua.coerceLocalizedText("◦");
	
	const device0_components_0_0_components_1_1_aposm_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_aposm,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_0_0_components_1_1_aposm_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_0_0_components_1_1_aposm.addReference({
		nodeId: mtconnect.findObjectType("AngleClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	//Add HasMTSubClassType Reference
	device0_components_0_0_components_1_1_aposm.addReference({
		nodeId: mtconnect.findObjectType("ActualSubClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTSubClassType")
	});
	
	
	//Add Property MTTypeName
	const device0_components_0_0_components_1_1_aposm_type = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_aposm,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ANGLE"});
			}
		}
	});

	
	//Add Property CoordinateSystem
	const device0_components_0_0_components_1_1_aposm_coordinateSystem = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_aposm,
		browseName: "CoordinateSystem",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "MACHINE"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_0_0_components_1_1_aposm_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_aposm,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "aposm"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_0_0_components_1_1_aposm_category_category = new opcua.EnumValueType({});
	
	device0_components_0_0_components_1_1_aposm_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_0_0_components_1_1_aposm_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_0_0_components_1_1_aposm_category = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_aposm,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_0_0_components_1_1_aposm_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_1_1_aposm_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_aposm,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Aabs"});
			}
		}
	});

	
	//Add Property MTSubTypeName
	const device0_components_0_0_components_1_1_aposm_subType = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_aposm,
		browseName: "MTSubTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ACTUAL"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_0_0_components_1_1_aposm_units = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_aposm,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "DEGREE"});
			}
		}
	});
 
	//Add DataItem : ActualAngle
	data_item_dict.Apos = 0;
	const device0_components_0_0_components_1_1_aposw = mtconnect.addVariable({
			componentOf: device0_components_0_0_components_1_1,
			browseName: "ActualAngle",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.Apos});
				}
			}
		});

	//Add EUInformation for device0_components_0_0_components_1_1_aposw
	const device0_components_0_0_components_1_1_aposw_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_0_0_components_1_1_aposw_euinfo_val.unitId = 17476;
	device0_components_0_0_components_1_1_aposw_euinfo_val.description = opcua.coerceLocalizedText("degree [unit of angle]");
	device0_components_0_0_components_1_1_aposw_euinfo_val.displayName = opcua.coerceLocalizedText("◦");
	
	const device0_components_0_0_components_1_1_aposw_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_aposw,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_0_0_components_1_1_aposw_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_0_0_components_1_1_aposw.addReference({
		nodeId: mtconnect.findObjectType("AngleClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	//Add HasMTSubClassType Reference
	device0_components_0_0_components_1_1_aposw.addReference({
		nodeId: mtconnect.findObjectType("ActualSubClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTSubClassType")
	});
	
	
	//Add Property MTTypeName
	const device0_components_0_0_components_1_1_aposw_type = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_aposw,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ANGLE"});
			}
		}
	});

	
	//Add Property CoordinateSystem
	const device0_components_0_0_components_1_1_aposw_coordinateSystem = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_aposw,
		browseName: "CoordinateSystem",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "WORK"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_0_0_components_1_1_aposw_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_aposw,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "aposw"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_0_0_components_1_1_aposw_category_category = new opcua.EnumValueType({});
	
	device0_components_0_0_components_1_1_aposw_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_0_0_components_1_1_aposw_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_0_0_components_1_1_aposw_category = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_aposw,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_0_0_components_1_1_aposw_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_1_1_aposw_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_aposw,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Apos"});
			}
		}
	});

	
	//Add Property MTSubTypeName
	const device0_components_0_0_components_1_1_aposw_subType = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_aposw,
		browseName: "MTSubTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ACTUAL"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_0_0_components_1_1_aposw_units = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_aposw,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "DEGREE"});
			}
		}
	});
 
	//Add DataItem : RotaryMode
	data_item_dict.arfunc = "UNAVAILABLE";
	const device0_components_0_0_components_1_1_arf = mtconnect.addVariable({
			componentOf: device0_components_0_0_components_1_1,
			browseName: "RotaryMode",
			typeDefinition: mtconnect.findVariableType("MTControlledVocabEventType"),
			dataType: "UInt32",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.UInt32, value: data_item_val["arfunc"][data_item_dict.arfunc]});
				}
			}
		});

	//Add Property ValueAsText for device0_components_0_0_components_1_1_arf
	const device0_components_0_0_components_1_1_arf_text = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_arf,
		browseName: "ValueAsText",
		dataType: "LocalizedText",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.LocalizedText, value: {"text":data_item_dict.arfunc}});
			}
		}
	});
	 
	//Add Property EnumStrings for device0_components_0_0_components_1_1_arf
	const device0_components_0_0_components_1_1_arf_enumstrings = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_arf,
		browseName: "EnumStrings",
		dataType: "LocalizedText",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.LocalizedText, value: [{"text":"CONTOUR"},{"text":"INDEX"},{"text":"SPINDLE"}]});
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_0_0_components_1_1_arf.addReference({
		nodeId: mtconnect.findObjectType("RotaryModeClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property MTTypeName
	const device0_components_0_0_components_1_1_arf_type = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_arf,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ROTARY_MODE"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_0_0_components_1_1_arf_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_arf,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "arf"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_0_0_components_1_1_arf_category_category = new opcua.EnumValueType({});
	
	device0_components_0_0_components_1_1_arf_category_category.description = opcua.coerceLocalizedText("EVENT");
	device0_components_0_0_components_1_1_arf_category_category.value = 0;
	
	
	//Add Property Category
	const device0_components_0_0_components_1_1_arf_category = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_arf,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_0_0_components_1_1_arf_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_1_1_arf_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_1_arf,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "arfunc"});
			}
		}
	});

	//Add Component: Rotary[B]
	const device0_components_0_0_components_1_2 = mtconnect.addObject({
		organizedBy: device0_components_0_0_components,
		browseName: "Rotary[B]",
		eventNotifier: 1,
		typeDefinition: mtconnect.findObjectType("RotaryType")
	});

	//Add HasNotifier Reference
	device0_components_0_0_components_1_2.addReference({
		nodeId: device0_components_0_0_components.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	
	//Add Property XmlId
	const device0_components_0_0_components_1_2_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "br"});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_1_2_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "B"});
			}
		}
	});
 
	//Add DataItem : Load
	data_item_dict.Bload = 0;
	const device0_components_0_0_components_1_2_bl = mtconnect.addVariable({
			componentOf: device0_components_0_0_components_1_2,
			browseName: "Load",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.Bload});
				}
			}
		});

	//Add EUInformation for device0_components_0_0_components_1_2_bl
	const device0_components_0_0_components_1_2_bl_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_0_0_components_1_2_bl_euinfo_val.unitId = 20529;
	device0_components_0_0_components_1_2_bl_euinfo_val.description = opcua.coerceLocalizedText("Percent");
	device0_components_0_0_components_1_2_bl_euinfo_val.displayName = opcua.coerceLocalizedText("%");
	
	const device0_components_0_0_components_1_2_bl_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_bl,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_0_0_components_1_2_bl_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_0_0_components_1_2_bl.addReference({
		nodeId: mtconnect.findObjectType("LoadClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property MTTypeName
	const device0_components_0_0_components_1_2_bl_type = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_bl,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "LOAD"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_0_0_components_1_2_bl_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_bl,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "bl"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_0_0_components_1_2_bl_category_category = new opcua.EnumValueType({});
	
	device0_components_0_0_components_1_2_bl_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_0_0_components_1_2_bl_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_0_0_components_1_2_bl_category = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_bl,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_0_0_components_1_2_bl_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_1_2_bl_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_bl,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Bload"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_0_0_components_1_2_bl_units = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_bl,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "PERCENT"});
			}
		}
	});
 
	//Add DataItem : AngularVelocity
	data_item_dict.Bfrt = 0;
	const device0_components_0_0_components_1_2_bf = mtconnect.addVariable({
			componentOf: device0_components_0_0_components_1_2,
			browseName: "AngularVelocity",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.Bfrt});
				}
			}
		});

	//Add EUInformation for device0_components_0_0_components_1_2_bf
	const device0_components_0_0_components_1_2_bf_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_0_0_components_1_2_bf_euinfo_val.unitId = 4536630;
	device0_components_0_0_components_1_2_bf_euinfo_val.description = opcua.coerceLocalizedText("Angular degrees per second");
	device0_components_0_0_components_1_2_bf_euinfo_val.displayName = opcua.coerceLocalizedText("◦/s");
	
	const device0_components_0_0_components_1_2_bf_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_bf,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_0_0_components_1_2_bf_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_0_0_components_1_2_bf.addReference({
		nodeId: mtconnect.findObjectType("AngularVelocityClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property MTTypeName
	const device0_components_0_0_components_1_2_bf_type = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_bf,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ANGULAR_VELOCITY"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_0_0_components_1_2_bf_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_bf,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "bf"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_0_0_components_1_2_bf_category_category = new opcua.EnumValueType({});
	
	device0_components_0_0_components_1_2_bf_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_0_0_components_1_2_bf_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_0_0_components_1_2_bf_category = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_bf,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_0_0_components_1_2_bf_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_1_2_bf_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_bf,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Bfrt"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_0_0_components_1_2_bf_units = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_bf,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "DEGREE/SECOND"});
			}
		}
	});

	
	//Add Property NativeUnits
	const device0_components_0_0_components_1_2_bf_nativeUnits = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_bf,
		browseName: "NativeUnits",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "DEGREE/MINUTE"});
			}
		}
	});

	//Condition type: AngleCondition
	const device0_components_0_0_components_1_2_AngleCondition = mtconnect.addObject({
		organizedBy: device0_components_0_0_components_1_2,
		browseName: "AngleCondition",
		typeDefinition: "AlarmConditionType"
	});
	
	//Add HasNotifier Reference
	device0_components_0_0_components_1_2_AngleCondition.addReference({
		nodeId: device0_components_0_0_components_1_2.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	//Add HasCondition Reference
	device0_components_0_0_components_1_2_AngleCondition.addReference({
		nodeId: device0_components_0_0_components_1_2.nodeId,
		referenceType: addressSpace.findReferenceType("HasCondition"),
		isForward: false
	});
	 
	//Add DataItem : ActualAngle
	data_item_dict.Babs = 0;
	const device0_components_0_0_components_1_2_bposm = mtconnect.addVariable({
			componentOf: device0_components_0_0_components_1_2,
			browseName: "ActualAngle",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.Babs});
				}
			}
		});

	//Add EUInformation for device0_components_0_0_components_1_2_bposm
	const device0_components_0_0_components_1_2_bposm_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_0_0_components_1_2_bposm_euinfo_val.unitId = 17476;
	device0_components_0_0_components_1_2_bposm_euinfo_val.description = opcua.coerceLocalizedText("degree [unit of angle]");
	device0_components_0_0_components_1_2_bposm_euinfo_val.displayName = opcua.coerceLocalizedText("◦");
	
	const device0_components_0_0_components_1_2_bposm_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_bposm,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_0_0_components_1_2_bposm_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_0_0_components_1_2_bposm.addReference({
		nodeId: mtconnect.findObjectType("AngleClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	//Add HasMTSubClassType Reference
	device0_components_0_0_components_1_2_bposm.addReference({
		nodeId: mtconnect.findObjectType("ActualSubClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTSubClassType")
	});
	
	
	//Add Property MTTypeName
	const device0_components_0_0_components_1_2_bposm_type = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_bposm,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ANGLE"});
			}
		}
	});

	
	//Add Property CoordinateSystem
	const device0_components_0_0_components_1_2_bposm_coordinateSystem = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_bposm,
		browseName: "CoordinateSystem",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "MACHINE"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_0_0_components_1_2_bposm_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_bposm,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "bposm"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_0_0_components_1_2_bposm_category_category = new opcua.EnumValueType({});
	
	device0_components_0_0_components_1_2_bposm_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_0_0_components_1_2_bposm_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_0_0_components_1_2_bposm_category = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_bposm,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_0_0_components_1_2_bposm_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_1_2_bposm_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_bposm,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Babs"});
			}
		}
	});

	
	//Add Property MTSubTypeName
	const device0_components_0_0_components_1_2_bposm_subType = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_bposm,
		browseName: "MTSubTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ACTUAL"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_0_0_components_1_2_bposm_units = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_bposm,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "DEGREE"});
			}
		}
	});
 
	//Add DataItem : ActualAngle
	data_item_dict.Bpos = 0;
	const device0_components_0_0_components_1_2_bposw = mtconnect.addVariable({
			componentOf: device0_components_0_0_components_1_2,
			browseName: "ActualAngle",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.Bpos});
				}
			}
		});

	//Add EUInformation for device0_components_0_0_components_1_2_bposw
	const device0_components_0_0_components_1_2_bposw_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_0_0_components_1_2_bposw_euinfo_val.unitId = 17476;
	device0_components_0_0_components_1_2_bposw_euinfo_val.description = opcua.coerceLocalizedText("degree [unit of angle]");
	device0_components_0_0_components_1_2_bposw_euinfo_val.displayName = opcua.coerceLocalizedText("◦");
	
	const device0_components_0_0_components_1_2_bposw_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_bposw,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_0_0_components_1_2_bposw_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_0_0_components_1_2_bposw.addReference({
		nodeId: mtconnect.findObjectType("AngleClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	//Add HasMTSubClassType Reference
	device0_components_0_0_components_1_2_bposw.addReference({
		nodeId: mtconnect.findObjectType("ActualSubClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTSubClassType")
	});
	
	
	//Add Property MTTypeName
	const device0_components_0_0_components_1_2_bposw_type = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_bposw,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ANGLE"});
			}
		}
	});

	
	//Add Property CoordinateSystem
	const device0_components_0_0_components_1_2_bposw_coordinateSystem = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_bposw,
		browseName: "CoordinateSystem",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "WORK"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_0_0_components_1_2_bposw_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_bposw,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "bposw"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_0_0_components_1_2_bposw_category_category = new opcua.EnumValueType({});
	
	device0_components_0_0_components_1_2_bposw_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_0_0_components_1_2_bposw_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_0_0_components_1_2_bposw_category = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_bposw,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_0_0_components_1_2_bposw_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_1_2_bposw_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_bposw,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Bpos"});
			}
		}
	});

	
	//Add Property MTSubTypeName
	const device0_components_0_0_components_1_2_bposw_subType = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_bposw,
		browseName: "MTSubTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ACTUAL"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_0_0_components_1_2_bposw_units = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_bposw,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "DEGREE"});
			}
		}
	});
 
	//Add DataItem : RotaryMode
	data_item_dict.brfunc = "UNAVAILABLE";
	const device0_components_0_0_components_1_2_brf = mtconnect.addVariable({
			componentOf: device0_components_0_0_components_1_2,
			browseName: "RotaryMode",
			typeDefinition: mtconnect.findVariableType("MTControlledVocabEventType"),
			dataType: "UInt32",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.UInt32, value: data_item_val["brfunc"][data_item_dict.brfunc]});
				}
			}
		});

	//Add Property ValueAsText for device0_components_0_0_components_1_2_brf
	const device0_components_0_0_components_1_2_brf_text = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_brf,
		browseName: "ValueAsText",
		dataType: "LocalizedText",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.LocalizedText, value: {"text":data_item_dict.brfunc}});
			}
		}
	});
	 
	//Add Property EnumStrings for device0_components_0_0_components_1_2_brf
	const device0_components_0_0_components_1_2_brf_enumstrings = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_brf,
		browseName: "EnumStrings",
		dataType: "LocalizedText",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.LocalizedText, value: [{"text":"CONTOUR"},{"text":"INDEX"},{"text":"SPINDLE"}]});
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_0_0_components_1_2_brf.addReference({
		nodeId: mtconnect.findObjectType("RotaryModeClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property MTTypeName
	const device0_components_0_0_components_1_2_brf_type = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_brf,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ROTARY_MODE"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_0_0_components_1_2_brf_id = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_brf,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "brf"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_0_0_components_1_2_brf_category_category = new opcua.EnumValueType({});
	
	device0_components_0_0_components_1_2_brf_category_category.description = opcua.coerceLocalizedText("EVENT");
	device0_components_0_0_components_1_2_brf_category_category.value = 0;
	
	
	//Add Property Category
	const device0_components_0_0_components_1_2_brf_category = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_brf,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_0_0_components_1_2_brf_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_0_0_components_1_2_brf_name = mtconnect.addVariable({
		propertyOf: device0_components_0_0_components_1_2_brf,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "brfunc"});
			}
		}
	});

	//Add Component: Controller
	const device0_components_1_0 = mtconnect.addObject({
		organizedBy: device0_components,
		browseName: "Controller",
		eventNotifier: 1,
		typeDefinition: mtconnect.findObjectType("ControllerType")
	});

	//Add HasNotifier Reference
	device0_components_1_0.addReference({
		nodeId: device0_components.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	
	//Add Property XmlId
	const device0_components_1_0_id = mtconnect.addVariable({
		propertyOf: device0_components_1_0,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "cont"});
			}
		}
	});

	
	//Add Property Name
	const device0_components_1_0_name = mtconnect.addVariable({
		propertyOf: device0_components_1_0,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "controller"});
			}
		}
	});

	//Condition type: CommunicationsCondition
	const device0_components_1_0_CommunicationsCondition = mtconnect.addObject({
		organizedBy: device0_components_1_0,
		browseName: "CommunicationsCondition",
		typeDefinition: "AlarmConditionType"
	});
	
	//Add HasNotifier Reference
	device0_components_1_0_CommunicationsCondition.addReference({
		nodeId: device0_components_1_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	//Add HasCondition Reference
	device0_components_1_0_CommunicationsCondition.addReference({
		nodeId: device0_components_1_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasCondition"),
		isForward: false
	});
	
	//Condition type: LogicProgramCondition
	const device0_components_1_0_LogicProgramCondition = mtconnect.addObject({
		organizedBy: device0_components_1_0,
		browseName: "LogicProgramCondition",
		typeDefinition: "AlarmConditionType"
	});
	
	//Add HasNotifier Reference
	device0_components_1_0_LogicProgramCondition.addReference({
		nodeId: device0_components_1_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	//Add HasCondition Reference
	device0_components_1_0_LogicProgramCondition.addReference({
		nodeId: device0_components_1_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasCondition"),
		isForward: false
	});
	
	//Condition type: SystemCondition
	const device0_components_1_0_SystemCondition = mtconnect.addObject({
		organizedBy: device0_components_1_0,
		browseName: "SystemCondition",
		typeDefinition: "AlarmConditionType"
	});
	
	//Add HasNotifier Reference
	device0_components_1_0_SystemCondition.addReference({
		nodeId: device0_components_1_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	//Add HasCondition Reference
	device0_components_1_0_SystemCondition.addReference({
		nodeId: device0_components_1_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasCondition"),
		isForward: false
	});
	 
	//Add DataItem : EmergencyStop
	data_item_dict.estop = "UNAVAILABLE";
	const device0_components_1_0_estop = mtconnect.addVariable({
			componentOf: device0_components_1_0,
			browseName: "EmergencyStop",
			typeDefinition: mtconnect.findVariableType("MTControlledVocabEventType"),
			dataType: "UInt32",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.UInt32, value: data_item_val["estop"][data_item_dict.estop]});
				}
			}
		});

	//Add Property ValueAsText for device0_components_1_0_estop
	const device0_components_1_0_estop_text = mtconnect.addVariable({
		propertyOf: device0_components_1_0_estop,
		browseName: "ValueAsText",
		dataType: "LocalizedText",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.LocalizedText, value: {"text":data_item_dict.estop}});
			}
		}
	});
	 
	//Add Property EnumStrings for device0_components_1_0_estop
	const device0_components_1_0_estop_enumstrings = mtconnect.addVariable({
		propertyOf: device0_components_1_0_estop,
		browseName: "EnumStrings",
		dataType: "LocalizedText",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.LocalizedText, value: [{"text":"ARMED"},{"text":"TRIGGERED"}]});
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_1_0_estop.addReference({
		nodeId: mtconnect.findObjectType("EmergencyStopClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property MTTypeName
	const device0_components_1_0_estop_type = mtconnect.addVariable({
		propertyOf: device0_components_1_0_estop,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "EMERGENCY_STOP"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_1_0_estop_id = mtconnect.addVariable({
		propertyOf: device0_components_1_0_estop,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "estop"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_1_0_estop_category_category = new opcua.EnumValueType({});
	
	device0_components_1_0_estop_category_category.description = opcua.coerceLocalizedText("EVENT");
	device0_components_1_0_estop_category_category.value = 0;
	
	
	//Add Property Category
	const device0_components_1_0_estop_category = mtconnect.addVariable({
		propertyOf: device0_components_1_0_estop,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_1_0_estop_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_1_0_estop_name = mtconnect.addVariable({
		propertyOf: device0_components_1_0_estop,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "estop"});
			}
		}
	});
 
	//Add DataItem : AutoAccumulatedTime
	data_item_dict.auto_time = 0;
	const device0_components_1_0_atime = mtconnect.addVariable({
			componentOf: device0_components_1_0,
			browseName: "AutoAccumulatedTime",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.auto_time});
				}
			}
		});

	//Add EUInformation for device0_components_1_0_atime
	const device0_components_1_0_atime_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_1_0_atime_euinfo_val.unitId = 5457219;
	device0_components_1_0_atime_euinfo_val.description = opcua.coerceLocalizedText("second [unit of time]");
	device0_components_1_0_atime_euinfo_val.displayName = opcua.coerceLocalizedText("s");
	
	const device0_components_1_0_atime_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_1_0_atime,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_1_0_atime_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_1_0_atime.addReference({
		nodeId: mtconnect.findObjectType("AccumulatedTimeClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	//New Object for Extended subtype AutoSubClassType
	const AutoSubClassType = mtconnect.addObject({
				browseName: "AutoSubClassType"
		});
		
	//Add HasMTSubClassType Reference
	device0_components_1_0_atime.addReference({
		nodeId: AutoSubClassType.nodeId.value,
		referenceType: mtconnect.findReferenceType("HasMTSubClassType")
	});
	
	
	//Add Property MTTypeName
	const device0_components_1_0_atime_type = mtconnect.addVariable({
		propertyOf: device0_components_1_0_atime,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ACCUMULATED_TIME"});
			}
		}
	});

	
	//Add Property MTSubTypeName
	const device0_components_1_0_atime_subType = mtconnect.addVariable({
		propertyOf: device0_components_1_0_atime,
		browseName: "MTSubTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "x:AUTO"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_1_0_atime_category_category = new opcua.EnumValueType({});
	
	device0_components_1_0_atime_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_1_0_atime_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_1_0_atime_category = mtconnect.addVariable({
		propertyOf: device0_components_1_0_atime,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_1_0_atime_category_category});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_1_0_atime_id = mtconnect.addVariable({
		propertyOf: device0_components_1_0_atime,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "atime"});
			}
		}
	});

	
	//Add Property Name
	const device0_components_1_0_atime_name = mtconnect.addVariable({
		propertyOf: device0_components_1_0_atime,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "auto_time"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_1_0_atime_units = mtconnect.addVariable({
		propertyOf: device0_components_1_0_atime,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "SECOND"});
			}
		}
	});
 
	//Add DataItem : TotalAccumulatedTime
	data_item_dict.total_time = 0;
	const device0_components_1_0_yltime = mtconnect.addVariable({
			componentOf: device0_components_1_0,
			browseName: "TotalAccumulatedTime",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.total_time});
				}
			}
		});

	//Add EUInformation for device0_components_1_0_yltime
	const device0_components_1_0_yltime_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_1_0_yltime_euinfo_val.unitId = 5457219;
	device0_components_1_0_yltime_euinfo_val.description = opcua.coerceLocalizedText("second [unit of time]");
	device0_components_1_0_yltime_euinfo_val.displayName = opcua.coerceLocalizedText("s");
	
	const device0_components_1_0_yltime_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_1_0_yltime,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_1_0_yltime_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_1_0_yltime.addReference({
		nodeId: mtconnect.findObjectType("AccumulatedTimeClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	//New Object for Extended subtype TotalSubClassType
	const TotalSubClassType = mtconnect.addObject({
				browseName: "TotalSubClassType"
		});
		
	//Add HasMTSubClassType Reference
	device0_components_1_0_yltime.addReference({
		nodeId: TotalSubClassType.nodeId.value,
		referenceType: mtconnect.findReferenceType("HasMTSubClassType")
	});
	
	
	//Add Property MTTypeName
	const device0_components_1_0_yltime_type = mtconnect.addVariable({
		propertyOf: device0_components_1_0_yltime,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ACCUMULATED_TIME"});
			}
		}
	});

	
	//Add Property MTSubTypeName
	const device0_components_1_0_yltime_subType = mtconnect.addVariable({
		propertyOf: device0_components_1_0_yltime,
		browseName: "MTSubTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "x:TOTAL"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_1_0_yltime_category_category = new opcua.EnumValueType({});
	
	device0_components_1_0_yltime_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_1_0_yltime_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_1_0_yltime_category = mtconnect.addVariable({
		propertyOf: device0_components_1_0_yltime,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_1_0_yltime_category_category});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_1_0_yltime_id = mtconnect.addVariable({
		propertyOf: device0_components_1_0_yltime,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "yltime"});
			}
		}
	});

	
	//Add Property Name
	const device0_components_1_0_yltime_name = mtconnect.addVariable({
		propertyOf: device0_components_1_0_yltime,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "total_time"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_1_0_yltime_units = mtconnect.addVariable({
		propertyOf: device0_components_1_0_yltime,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "SECOND"});
			}
		}
	});
 
	//Add DataItem : CutAccumulatedTime
	data_item_dict.cut_time = 0;
	const device0_components_1_0_ctime = mtconnect.addVariable({
			componentOf: device0_components_1_0,
			browseName: "CutAccumulatedTime",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.cut_time});
				}
			}
		});

	//Add EUInformation for device0_components_1_0_ctime
	const device0_components_1_0_ctime_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_1_0_ctime_euinfo_val.unitId = 5457219;
	device0_components_1_0_ctime_euinfo_val.description = opcua.coerceLocalizedText("second [unit of time]");
	device0_components_1_0_ctime_euinfo_val.displayName = opcua.coerceLocalizedText("s");
	
	const device0_components_1_0_ctime_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_1_0_ctime,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_1_0_ctime_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_1_0_ctime.addReference({
		nodeId: mtconnect.findObjectType("AccumulatedTimeClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	//New Object for Extended subtype CutSubClassType
	const CutSubClassType = mtconnect.addObject({
				browseName: "CutSubClassType"
		});
		
	//Add HasMTSubClassType Reference
	device0_components_1_0_ctime.addReference({
		nodeId: CutSubClassType.nodeId.value,
		referenceType: mtconnect.findReferenceType("HasMTSubClassType")
	});
	
	
	//Add Property MTTypeName
	const device0_components_1_0_ctime_type = mtconnect.addVariable({
		propertyOf: device0_components_1_0_ctime,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ACCUMULATED_TIME"});
			}
		}
	});

	
	//Add Property MTSubTypeName
	const device0_components_1_0_ctime_subType = mtconnect.addVariable({
		propertyOf: device0_components_1_0_ctime,
		browseName: "MTSubTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "x:CUT"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_1_0_ctime_category_category = new opcua.EnumValueType({});
	
	device0_components_1_0_ctime_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_1_0_ctime_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_1_0_ctime_category = mtconnect.addVariable({
		propertyOf: device0_components_1_0_ctime,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_1_0_ctime_category_category});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_1_0_ctime_id = mtconnect.addVariable({
		propertyOf: device0_components_1_0_ctime,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ctime"});
			}
		}
	});

	
	//Add Property Name
	const device0_components_1_0_ctime_name = mtconnect.addVariable({
		propertyOf: device0_components_1_0_ctime,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "cut_time"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_1_0_ctime_units = mtconnect.addVariable({
		propertyOf: device0_components_1_0_ctime,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "SECOND"});
			}
		}
	});
 
	//Add DataItem : PalletId
	data_item_dict.pallet_num = String();
	const device0_components_1_0_pltnum = mtconnect.addVariable({
			componentOf: device0_components_1_0,
			browseName: "PalletId",
			typeDefinition: mtconnect.findVariableType("MTStringEventType"),
			dataType: "String",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.String, value: data_item_dict.pallet_num});
				}
			}
		});

	//Add HasMTClassType Reference
	device0_components_1_0_pltnum.addReference({
		nodeId: mtconnect.findObjectType("PalletIdClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property MTTypeName
	const device0_components_1_0_pltnum_type = mtconnect.addVariable({
		propertyOf: device0_components_1_0_pltnum,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "PALLET_ID"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_1_0_pltnum_id = mtconnect.addVariable({
		propertyOf: device0_components_1_0_pltnum,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "pltnum"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_1_0_pltnum_category_category = new opcua.EnumValueType({});
	
	device0_components_1_0_pltnum_category_category.description = opcua.coerceLocalizedText("EVENT");
	device0_components_1_0_pltnum_category_category.value = 0;
	
	
	//Add Property Category
	const device0_components_1_0_pltnum_category = mtconnect.addVariable({
		propertyOf: device0_components_1_0_pltnum,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_1_0_pltnum_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_1_0_pltnum_name = mtconnect.addVariable({
		propertyOf: device0_components_1_0_pltnum,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "pallet_num"});
			}
		}
	});

	//Components Folder
	const device0_components_1_0_components = mtconnect.addObject({
		organizedBy: device0_components_1_0,
		browseName: "Components",
		eventNotifier: 1,
		typeDefinition: "FolderType"
	});

	//Add HasNotifier Reference
	device0_components_1_0_components.addReference({
		nodeId: device0_components_1_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});

	//Add Component: Path
	const device0_components_1_0_components_0_0 = mtconnect.addObject({
		organizedBy: device0_components_1_0_components,
		browseName: "Path",
		eventNotifier: 1,
		typeDefinition: mtconnect.findObjectType("PathType")
	});

	//Add HasNotifier Reference
	device0_components_1_0_components_0_0.addReference({
		nodeId: device0_components_1_0_components.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	
	//Add Property XmlId
	const device0_components_1_0_components_0_0_id = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "path1"});
			}
		}
	});

	
	//Add Property Name
	const device0_components_1_0_components_0_0_name = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "path"});
			}
		}
	});
 
	//Add DataItem : ProgramEdit
	data_item_dict.peditmode = "UNAVAILABLE";
	const device0_components_1_0_components_0_0_peditmode = mtconnect.addVariable({
			componentOf: device0_components_1_0_components_0_0,
			browseName: "ProgramEdit",
			typeDefinition: mtconnect.findVariableType("MTControlledVocabEventType"),
			dataType: "UInt32",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.UInt32, value: data_item_val["peditmode"][data_item_dict.peditmode]});
				}
			}
		});

	//Add Property ValueAsText for device0_components_1_0_components_0_0_peditmode
	const device0_components_1_0_components_0_0_peditmode_text = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_peditmode,
		browseName: "ValueAsText",
		dataType: "LocalizedText",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.LocalizedText, value: {"text":data_item_dict.peditmode}});
			}
		}
	});
	 
	//Add Property EnumStrings for device0_components_1_0_components_0_0_peditmode
	const device0_components_1_0_components_0_0_peditmode_enumstrings = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_peditmode,
		browseName: "EnumStrings",
		dataType: "LocalizedText",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.LocalizedText, value: [{"text":"ACTIVE"},{"text":"NOT_READY"},{"text":"READY"}]});
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_1_0_components_0_0_peditmode.addReference({
		nodeId: mtconnect.findObjectType("ProgramEditClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property XmlId
	const device0_components_1_0_components_0_0_peditmode_id = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_peditmode,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "peditmode"});
			}
		}
	});

	
	//Add Property MTTypeName
	const device0_components_1_0_components_0_0_peditmode_type = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_peditmode,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "PROGRAM_EDIT"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_1_0_components_0_0_peditmode_category_category = new opcua.EnumValueType({});
	
	device0_components_1_0_components_0_0_peditmode_category_category.description = opcua.coerceLocalizedText("EVENT");
	device0_components_1_0_components_0_0_peditmode_category_category.value = 0;
	
	
	//Add Property Category
	const device0_components_1_0_components_0_0_peditmode_category = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_peditmode,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_1_0_components_0_0_peditmode_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_1_0_components_0_0_peditmode_name = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_peditmode,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "peditmode"});
			}
		}
	});
 
	//Add DataItem : ProgramEditName
	data_item_dict.peditname = String();
	const device0_components_1_0_components_0_0_peditname = mtconnect.addVariable({
			componentOf: device0_components_1_0_components_0_0,
			browseName: "ProgramEditName",
			typeDefinition: mtconnect.findVariableType("MTStringEventType"),
			dataType: "String",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.String, value: data_item_dict.peditname});
				}
			}
		});

	//Add HasMTClassType Reference
	device0_components_1_0_components_0_0_peditname.addReference({
		nodeId: mtconnect.findObjectType("ProgramEditNameClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property XmlId
	const device0_components_1_0_components_0_0_peditname_id = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_peditname,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "peditname"});
			}
		}
	});

	
	//Add Property MTTypeName
	const device0_components_1_0_components_0_0_peditname_type = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_peditname,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "PROGRAM_EDIT_NAME"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_1_0_components_0_0_peditname_category_category = new opcua.EnumValueType({});
	
	device0_components_1_0_components_0_0_peditname_category_category.description = opcua.coerceLocalizedText("EVENT");
	device0_components_1_0_components_0_0_peditname_category_category.value = 0;
	
	
	//Add Property Category
	const device0_components_1_0_components_0_0_peditname_category = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_peditname,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_1_0_components_0_0_peditname_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_1_0_components_0_0_peditname_name = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_peditname,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "peditname"});
			}
		}
	});
 
	//Add DataItem : RapidPathFeedrateOverride
	data_item_dict.Frapidovr = 0;
	const device0_components_1_0_components_0_0_pfr = mtconnect.addVariable({
			componentOf: device0_components_1_0_components_0_0,
			browseName: "RapidPathFeedrateOverride",
			typeDefinition: mtconnect.findVariableType("MTNumericEventType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.Frapidovr});
				}
			}
		});

	//Add HasMTClassType Reference
	device0_components_1_0_components_0_0_pfr.addReference({
		nodeId: mtconnect.findObjectType("PathFeedrateOverrideClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	//Add HasMTSubClassType Reference
	device0_components_1_0_components_0_0_pfr.addReference({
		nodeId: mtconnect.findObjectType("RapidSubClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTSubClassType")
	});
	
	//category attribute of EnumValueType
	const device0_components_1_0_components_0_0_pfr_category_category = new opcua.EnumValueType({});
	
	device0_components_1_0_components_0_0_pfr_category_category.description = opcua.coerceLocalizedText("EVENT");
	device0_components_1_0_components_0_0_pfr_category_category.value = 0;
	
	
	//Add Property Category
	const device0_components_1_0_components_0_0_pfr_category = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_pfr,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_1_0_components_0_0_pfr_category_category});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_1_0_components_0_0_pfr_id = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_pfr,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "pfr"});
			}
		}
	});

	
	//Add Property Name
	const device0_components_1_0_components_0_0_pfr_name = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_pfr,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Frapidovr"});
			}
		}
	});

	
	//Add Property MTSubTypeName
	const device0_components_1_0_components_0_0_pfr_subType = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_pfr,
		browseName: "MTSubTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "RAPID"});
			}
		}
	});

	
	//Add Property MTTypeName
	const device0_components_1_0_components_0_0_pfr_type = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_pfr,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "PATH_FEEDRATE_OVERRIDE"});
			}
		}
	});
 
	//Add DataItem : ProgrammedPathFeedrateOverride
	data_item_dict.Fovr = 0;
	const device0_components_1_0_components_0_0_pfo = mtconnect.addVariable({
			componentOf: device0_components_1_0_components_0_0,
			browseName: "ProgrammedPathFeedrateOverride",
			typeDefinition: mtconnect.findVariableType("MTNumericEventType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.Fovr});
				}
			}
		});

	//Add HasMTClassType Reference
	device0_components_1_0_components_0_0_pfo.addReference({
		nodeId: mtconnect.findObjectType("PathFeedrateOverrideClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	//Add HasMTSubClassType Reference
	device0_components_1_0_components_0_0_pfo.addReference({
		nodeId: mtconnect.findObjectType("ProgrammedSubClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTSubClassType")
	});
	
	//category attribute of EnumValueType
	const device0_components_1_0_components_0_0_pfo_category_category = new opcua.EnumValueType({});
	
	device0_components_1_0_components_0_0_pfo_category_category.description = opcua.coerceLocalizedText("EVENT");
	device0_components_1_0_components_0_0_pfo_category_category.value = 0;
	
	
	//Add Property Category
	const device0_components_1_0_components_0_0_pfo_category = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_pfo,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_1_0_components_0_0_pfo_category_category});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_1_0_components_0_0_pfo_id = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_pfo,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "pfo"});
			}
		}
	});

	
	//Add Property Name
	const device0_components_1_0_components_0_0_pfo_name = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_pfo,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Fovr"});
			}
		}
	});

	
	//Add Property MTSubTypeName
	const device0_components_1_0_components_0_0_pfo_subType = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_pfo,
		browseName: "MTSubTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "PROGRAMMED"});
			}
		}
	});

	
	//Add Property MTTypeName
	const device0_components_1_0_components_0_0_pfo_type = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_pfo,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "PATH_FEEDRATE_OVERRIDE"});
			}
		}
	});
 
	//Add DataItem : RotaryVelocityOverride
	data_item_dict.Sovr = 0;
	const device0_components_1_0_components_0_0_Sovr = mtconnect.addVariable({
			componentOf: device0_components_1_0_components_0_0,
			browseName: "RotaryVelocityOverride",
			typeDefinition: mtconnect.findVariableType("MTNumericEventType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.Sovr});
				}
			}
		});

	//Add HasMTClassType Reference
	device0_components_1_0_components_0_0_Sovr.addReference({
		nodeId: mtconnect.findObjectType("RotaryVelocityOverrideClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	//category attribute of EnumValueType
	const device0_components_1_0_components_0_0_Sovr_category_category = new opcua.EnumValueType({});
	
	device0_components_1_0_components_0_0_Sovr_category_category.description = opcua.coerceLocalizedText("EVENT");
	device0_components_1_0_components_0_0_Sovr_category_category.value = 0;
	
	
	//Add Property Category
	const device0_components_1_0_components_0_0_Sovr_category = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_Sovr,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_1_0_components_0_0_Sovr_category_category});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_1_0_components_0_0_Sovr_id = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_Sovr,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Sovr"});
			}
		}
	});

	
	//Add Property Name
	const device0_components_1_0_components_0_0_Sovr_name = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_Sovr,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Sovr"});
			}
		}
	});

	
	//Add Property MTTypeName
	const device0_components_1_0_components_0_0_Sovr_type = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_Sovr,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ROTARY_VELOCITY_OVERRIDE"});
			}
		}
	});
 
	//Add DataItem : Program
	data_item_dict.program = String();
	const device0_components_1_0_components_0_0_pgm = mtconnect.addVariable({
			componentOf: device0_components_1_0_components_0_0,
			browseName: "Program",
			typeDefinition: mtconnect.findVariableType("MTStringEventType"),
			dataType: "String",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.String, value: data_item_dict.program});
				}
			}
		});

	//Add HasMTClassType Reference
	device0_components_1_0_components_0_0_pgm.addReference({
		nodeId: mtconnect.findObjectType("ProgramClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property MTTypeName
	const device0_components_1_0_components_0_0_pgm_type = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_pgm,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "PROGRAM"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_1_0_components_0_0_pgm_id = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_pgm,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "pgm"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_1_0_components_0_0_pgm_category_category = new opcua.EnumValueType({});
	
	device0_components_1_0_components_0_0_pgm_category_category.description = opcua.coerceLocalizedText("EVENT");
	device0_components_1_0_components_0_0_pgm_category_category.value = 0;
	
	
	//Add Property Category
	const device0_components_1_0_components_0_0_pgm_category = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_pgm,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_1_0_components_0_0_pgm_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_1_0_components_0_0_pgm_name = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_pgm,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "program"});
			}
		}
	});
 
	//Add DataItem : SubProgram
	data_item_dict.subprogram = String();
	const device0_components_1_0_components_0_0_spgm = mtconnect.addVariable({
			componentOf: device0_components_1_0_components_0_0,
			browseName: "SubProgram",
			typeDefinition: mtconnect.findVariableType("MTStringEventType"),
			dataType: "String",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.String, value: data_item_dict.subprogram});
				}
			}
		});

	//Add HasMTClassType Reference
	device0_components_1_0_components_0_0_spgm.addReference({
		nodeId: mtconnect.findObjectType("ProgramClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	//New Object for Extended subtype SubSubClassType
	const SubSubClassType = mtconnect.addObject({
				browseName: "SubSubClassType"
		});
		
	//Add HasMTSubClassType Reference
	device0_components_1_0_components_0_0_spgm.addReference({
		nodeId: SubSubClassType.nodeId.value,
		referenceType: mtconnect.findReferenceType("HasMTSubClassType")
	});
	
	
	//Add Property MTTypeName
	const device0_components_1_0_components_0_0_spgm_type = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_spgm,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "PROGRAM"});
			}
		}
	});

	
	//Add Property MTSubTypeName
	const device0_components_1_0_components_0_0_spgm_subType = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_spgm,
		browseName: "MTSubTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "x:SUB"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_1_0_components_0_0_spgm_id = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_spgm,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "spgm"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_1_0_components_0_0_spgm_category_category = new opcua.EnumValueType({});
	
	device0_components_1_0_components_0_0_spgm_category_category.description = opcua.coerceLocalizedText("EVENT");
	device0_components_1_0_components_0_0_spgm_category_category.value = 0;
	
	
	//Add Property Category
	const device0_components_1_0_components_0_0_spgm_category = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_spgm,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_1_0_components_0_0_spgm_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_1_0_components_0_0_spgm_name = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_spgm,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "subprogram"});
			}
		}
	});
 
	//Add DataItem : Line
	data_item_dict.line = String();
	const device0_components_1_0_components_0_0_ln = mtconnect.addVariable({
			componentOf: device0_components_1_0_components_0_0,
			browseName: "Line",
			typeDefinition: mtconnect.findVariableType("MTStringEventType"),
			dataType: "String",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.String, value: data_item_dict.line});
				}
			}
		});

	//Add HasMTClassType Reference
	device0_components_1_0_components_0_0_ln.addReference({
		nodeId: mtconnect.findObjectType("LineClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property MTTypeName
	const device0_components_1_0_components_0_0_ln_type = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_ln,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "LINE"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_1_0_components_0_0_ln_id = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_ln,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ln"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_1_0_components_0_0_ln_category_category = new opcua.EnumValueType({});
	
	device0_components_1_0_components_0_0_ln_category_category.description = opcua.coerceLocalizedText("EVENT");
	device0_components_1_0_components_0_0_ln_category_category.value = 0;
	
	
	//Add Property Category
	const device0_components_1_0_components_0_0_ln_category = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_ln,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_1_0_components_0_0_ln_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_1_0_components_0_0_ln_name = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_ln,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "line"});
			}
		}
	});
 
	//Add DataItem : Unit
	data_item_dict.unitNum = String();
	const device0_components_1_0_components_0_0_unit = mtconnect.addVariable({
			componentOf: device0_components_1_0_components_0_0,
			browseName: "Unit",
			typeDefinition: mtconnect.findVariableType("MTStringEventType"),
			dataType: "String",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.String, value: data_item_dict.unitNum});
				}
			}
		});

	//New Object for Extended type UnitClassType
	const UnitClassType = mtconnect.addObject({
			browseName: "UnitClassType"
		});
		
	//Add HasMTClassType Reference
	device0_components_1_0_components_0_0_unit.addReference({
		nodeId: UnitClassType.nodeId.value,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property MTTypeName
	const device0_components_1_0_components_0_0_unit_type = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_unit,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "x:UNIT"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_1_0_components_0_0_unit_id = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_unit,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "unit"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_1_0_components_0_0_unit_category_category = new opcua.EnumValueType({});
	
	device0_components_1_0_components_0_0_unit_category_category.description = opcua.coerceLocalizedText("EVENT");
	device0_components_1_0_components_0_0_unit_category_category.value = 0;
	
	
	//Add Property Category
	const device0_components_1_0_components_0_0_unit_category = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_unit,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_1_0_components_0_0_unit_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_1_0_components_0_0_unit_name = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_unit,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "unitNum"});
			}
		}
	});
 
	//Add DataItem : SequenceNumber
	data_item_dict.sequenceNum = String();
	const device0_components_1_0_components_0_0_seq = mtconnect.addVariable({
			componentOf: device0_components_1_0_components_0_0,
			browseName: "SequenceNumber",
			typeDefinition: mtconnect.findVariableType("MTStringEventType"),
			dataType: "String",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.String, value: data_item_dict.sequenceNum});
				}
			}
		});

	//New Object for Extended type SequenceNumberClassType
	const SequenceNumberClassType = mtconnect.addObject({
			browseName: "SequenceNumberClassType"
		});
		
	//Add HasMTClassType Reference
	device0_components_1_0_components_0_0_seq.addReference({
		nodeId: SequenceNumberClassType.nodeId.value,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property MTTypeName
	const device0_components_1_0_components_0_0_seq_type = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_seq,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "x:SEQUENCE_NUMBER"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_1_0_components_0_0_seq_id = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_seq,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "seq"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_1_0_components_0_0_seq_category_category = new opcua.EnumValueType({});
	
	device0_components_1_0_components_0_0_seq_category_category.description = opcua.coerceLocalizedText("EVENT");
	device0_components_1_0_components_0_0_seq_category_category.value = 0;
	
	
	//Add Property Category
	const device0_components_1_0_components_0_0_seq_category = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_seq,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_1_0_components_0_0_seq_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_1_0_components_0_0_seq_name = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_seq,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "sequenceNum"});
			}
		}
	});
 
	//Add DataItem : PartCount
	data_item_dict.PartCountAct = 0;
	const device0_components_1_0_components_0_0_pc = mtconnect.addVariable({
			componentOf: device0_components_1_0_components_0_0,
			browseName: "PartCount",
			typeDefinition: mtconnect.findVariableType("MTNumericEventType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.PartCountAct});
				}
			}
		});

	//Add HasMTClassType Reference
	device0_components_1_0_components_0_0_pc.addReference({
		nodeId: mtconnect.findObjectType("PartCountClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property MTTypeName
	const device0_components_1_0_components_0_0_pc_type = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_pc,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "PART_COUNT"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_1_0_components_0_0_pc_id = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_pc,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "pc"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_1_0_components_0_0_pc_category_category = new opcua.EnumValueType({});
	
	device0_components_1_0_components_0_0_pc_category_category.description = opcua.coerceLocalizedText("EVENT");
	device0_components_1_0_components_0_0_pc_category_category.value = 0;
	
	
	//Add Property Category
	const device0_components_1_0_components_0_0_pc_category = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_pc,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_1_0_components_0_0_pc_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_1_0_components_0_0_pc_name = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_pc,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "PartCountAct"});
			}
		}
	});
 
	//Add DataItem : ActualPathFeedrate
	data_item_dict.Fact = 0;
	const device0_components_1_0_components_0_0_pf = mtconnect.addVariable({
			componentOf: device0_components_1_0_components_0_0,
			browseName: "ActualPathFeedrate",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.Fact});
				}
			}
		});

	//Add EUInformation for device0_components_1_0_components_0_0_pf
	const device0_components_1_0_components_0_0_pf_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_1_0_components_0_0_pf_euinfo_val.unitId = 4403510;
	device0_components_1_0_components_0_0_pf_euinfo_val.description = opcua.coerceLocalizedText("millimetre per second");
	device0_components_1_0_components_0_0_pf_euinfo_val.displayName = opcua.coerceLocalizedText("mm/s");
	
	const device0_components_1_0_components_0_0_pf_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_pf,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_1_0_components_0_0_pf_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_1_0_components_0_0_pf.addReference({
		nodeId: mtconnect.findObjectType("PathFeedrateClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	//Add HasMTSubClassType Reference
	device0_components_1_0_components_0_0_pf.addReference({
		nodeId: mtconnect.findObjectType("ActualSubClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTSubClassType")
	});
	
	
	//Add Property MTTypeName
	const device0_components_1_0_components_0_0_pf_type = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_pf,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "PATH_FEEDRATE"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_1_0_components_0_0_pf_id = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_pf,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "pf"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_1_0_components_0_0_pf_category_category = new opcua.EnumValueType({});
	
	device0_components_1_0_components_0_0_pf_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_1_0_components_0_0_pf_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_1_0_components_0_0_pf_category = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_pf,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_1_0_components_0_0_pf_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_1_0_components_0_0_pf_name = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_pf,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Fact"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_1_0_components_0_0_pf_units = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_pf,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "MILLIMETER/SECOND"});
			}
		}
	});

	
	//Add Property MTSubTypeName
	const device0_components_1_0_components_0_0_pf_subType = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_pf,
		browseName: "MTSubTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "ACTUAL"});
			}
		}
	});

	
	//Add Property CoordinateSystem
	const device0_components_1_0_components_0_0_pf_coordinateSystem = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_pf,
		browseName: "CoordinateSystem",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "WORK"});
			}
		}
	});
 
	//Add DataItem : ToolNumber
	data_item_dict.Tool_number = String();
	const device0_components_1_0_components_0_0_tid = mtconnect.addVariable({
			componentOf: device0_components_1_0_components_0_0,
			browseName: "ToolNumber",
			typeDefinition: mtconnect.findVariableType("MTStringEventType"),
			dataType: "String",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.String, value: data_item_dict.Tool_number});
				}
			}
		});

	//Add HasMTClassType Reference
	device0_components_1_0_components_0_0_tid.addReference({
		nodeId: mtconnect.findObjectType("ToolNumberClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property MTTypeName
	const device0_components_1_0_components_0_0_tid_type = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_tid,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "TOOL_NUMBER"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_1_0_components_0_0_tid_id = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_tid,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "tid"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_1_0_components_0_0_tid_category_category = new opcua.EnumValueType({});
	
	device0_components_1_0_components_0_0_tid_category_category.description = opcua.coerceLocalizedText("EVENT");
	device0_components_1_0_components_0_0_tid_category_category.value = 0;
	
	
	//Add Property Category
	const device0_components_1_0_components_0_0_tid_category = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_tid,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_1_0_components_0_0_tid_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_1_0_components_0_0_tid_name = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_tid,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Tool_number"});
			}
		}
	});
 
	//Add DataItem : ToolGroup
	data_item_dict.Tool_group = String();
	const device0_components_1_0_components_0_0_tid2 = mtconnect.addVariable({
			componentOf: device0_components_1_0_components_0_0,
			browseName: "ToolGroup",
			typeDefinition: mtconnect.findVariableType("MTStringEventType"),
			dataType: "String",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.String, value: data_item_dict.Tool_group});
				}
			}
		});

	//New Object for Extended type ToolGroupClassType
	const ToolGroupClassType = mtconnect.addObject({
			browseName: "ToolGroupClassType"
		});
		
	//Add HasMTClassType Reference
	device0_components_1_0_components_0_0_tid2.addReference({
		nodeId: ToolGroupClassType.nodeId.value,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property MTTypeName
	const device0_components_1_0_components_0_0_tid2_type = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_tid2,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "x:TOOL_GROUP"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_1_0_components_0_0_tid2_id = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_tid2,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "tid2"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_1_0_components_0_0_tid2_category_category = new opcua.EnumValueType({});
	
	device0_components_1_0_components_0_0_tid2_category_category.description = opcua.coerceLocalizedText("EVENT");
	device0_components_1_0_components_0_0_tid2_category_category.value = 0;
	
	
	//Add Property Category
	const device0_components_1_0_components_0_0_tid2_category = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_tid2,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_1_0_components_0_0_tid2_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_1_0_components_0_0_tid2_name = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_tid2,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Tool_group"});
			}
		}
	});
 
	//Add DataItem : ToolSuffix
	data_item_dict.Tool_suffix = String();
	const device0_components_1_0_components_0_0_tid3 = mtconnect.addVariable({
			componentOf: device0_components_1_0_components_0_0,
			browseName: "ToolSuffix",
			typeDefinition: mtconnect.findVariableType("MTStringEventType"),
			dataType: "String",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.String, value: data_item_dict.Tool_suffix});
				}
			}
		});

	//New Object for Extended type ToolSuffixClassType
	const ToolSuffixClassType = mtconnect.addObject({
			browseName: "ToolSuffixClassType"
		});
		
	//Add HasMTClassType Reference
	device0_components_1_0_components_0_0_tid3.addReference({
		nodeId: ToolSuffixClassType.nodeId.value,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property MTTypeName
	const device0_components_1_0_components_0_0_tid3_type = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_tid3,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "x:TOOL_SUFFIX"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_1_0_components_0_0_tid3_id = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_tid3,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "tid3"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_1_0_components_0_0_tid3_category_category = new opcua.EnumValueType({});
	
	device0_components_1_0_components_0_0_tid3_category_category.description = opcua.coerceLocalizedText("EVENT");
	device0_components_1_0_components_0_0_tid3_category_category.value = 0;
	
	
	//Add Property Category
	const device0_components_1_0_components_0_0_tid3_category = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_tid3,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_1_0_components_0_0_tid3_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_1_0_components_0_0_tid3_name = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_tid3,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "Tool_suffix"});
			}
		}
	});
 
	//Add DataItem : Execution
	data_item_dict.execution = "UNAVAILABLE";
	const device0_components_1_0_components_0_0_exec = mtconnect.addVariable({
			componentOf: device0_components_1_0_components_0_0,
			browseName: "Execution",
			typeDefinition: mtconnect.findVariableType("MTControlledVocabEventType"),
			dataType: "UInt32",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.UInt32, value: data_item_val["execution"][data_item_dict.execution]});
				}
			}
		});

	//Add Property ValueAsText for device0_components_1_0_components_0_0_exec
	const device0_components_1_0_components_0_0_exec_text = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_exec,
		browseName: "ValueAsText",
		dataType: "LocalizedText",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.LocalizedText, value: {"text":data_item_dict.execution}});
			}
		}
	});
	 
	//Add Property EnumStrings for device0_components_1_0_components_0_0_exec
	const device0_components_1_0_components_0_0_exec_enumstrings = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_exec,
		browseName: "EnumStrings",
		dataType: "LocalizedText",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.LocalizedText, value: [{"text":"ACTIVE"},{"text":"FEED_HOLD"},{"text":"INTERRUPTED"},{"text":"OPTIONAL_STOP"},{"text":"READY"},{"text":"PROGRAM_COMPLETED"},{"text":"PROGRAM_STOPPED"},{"text":"STOPPED"}]});
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_1_0_components_0_0_exec.addReference({
		nodeId: mtconnect.findObjectType("ExecutionClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property MTTypeName
	const device0_components_1_0_components_0_0_exec_type = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_exec,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "EXECUTION"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_1_0_components_0_0_exec_id = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_exec,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "exec"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_1_0_components_0_0_exec_category_category = new opcua.EnumValueType({});
	
	device0_components_1_0_components_0_0_exec_category_category.description = opcua.coerceLocalizedText("EVENT");
	device0_components_1_0_components_0_0_exec_category_category.value = 0;
	
	
	//Add Property Category
	const device0_components_1_0_components_0_0_exec_category = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_exec,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_1_0_components_0_0_exec_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_1_0_components_0_0_exec_name = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_exec,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "execution"});
			}
		}
	});
 
	//Add DataItem : ControllerMode
	data_item_dict.mode = "UNAVAILABLE";
	const device0_components_1_0_components_0_0_mode = mtconnect.addVariable({
			componentOf: device0_components_1_0_components_0_0,
			browseName: "ControllerMode",
			typeDefinition: mtconnect.findVariableType("MTControlledVocabEventType"),
			dataType: "UInt32",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.UInt32, value: data_item_val["mode"][data_item_dict.mode]});
				}
			}
		});

	//Add Property ValueAsText for device0_components_1_0_components_0_0_mode
	const device0_components_1_0_components_0_0_mode_text = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_mode,
		browseName: "ValueAsText",
		dataType: "LocalizedText",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.LocalizedText, value: {"text":data_item_dict.mode}});
			}
		}
	});
	 
	//Add Property EnumStrings for device0_components_1_0_components_0_0_mode
	const device0_components_1_0_components_0_0_mode_enumstrings = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_mode,
		browseName: "EnumStrings",
		dataType: "LocalizedText",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.LocalizedText, value: [{"text":"AUTOMATIC"},{"text":"EDIT"},{"text":"MANUAL"},{"text":"MANUAL_DATA_INPUT"},{"text":"SEMI_AUTOMATIC"}]});
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_1_0_components_0_0_mode.addReference({
		nodeId: mtconnect.findObjectType("ControllerModeClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property MTTypeName
	const device0_components_1_0_components_0_0_mode_type = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_mode,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "CONTROLLER_MODE"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_1_0_components_0_0_mode_id = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_mode,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "mode"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_1_0_components_0_0_mode_category_category = new opcua.EnumValueType({});
	
	device0_components_1_0_components_0_0_mode_category_category.description = opcua.coerceLocalizedText("EVENT");
	device0_components_1_0_components_0_0_mode_category_category.value = 0;
	
	
	//Add Property Category
	const device0_components_1_0_components_0_0_mode_category = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_mode,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_1_0_components_0_0_mode_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_1_0_components_0_0_mode_name = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_mode,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "mode"});
			}
		}
	});
 
	//Add DataItem : ProgramComment
	data_item_dict.program_cmt = String();
	const device0_components_1_0_components_0_0_pcmt = mtconnect.addVariable({
			componentOf: device0_components_1_0_components_0_0,
			browseName: "ProgramComment",
			typeDefinition: mtconnect.findVariableType("MTStringEventType"),
			dataType: "String",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.String, value: data_item_dict.program_cmt});
				}
			}
		});

	//Add HasMTClassType Reference
	device0_components_1_0_components_0_0_pcmt.addReference({
		nodeId: mtconnect.findObjectType("ProgramCommentClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property MTTypeName
	const device0_components_1_0_components_0_0_pcmt_type = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_pcmt,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "PROGRAM_COMMENT"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_1_0_components_0_0_pcmt_category_category = new opcua.EnumValueType({});
	
	device0_components_1_0_components_0_0_pcmt_category_category.description = opcua.coerceLocalizedText("EVENT");
	device0_components_1_0_components_0_0_pcmt_category_category.value = 0;
	
	
	//Add Property Category
	const device0_components_1_0_components_0_0_pcmt_category = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_pcmt,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_1_0_components_0_0_pcmt_category_category});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_1_0_components_0_0_pcmt_id = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_pcmt,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "pcmt"});
			}
		}
	});

	
	//Add Property Name
	const device0_components_1_0_components_0_0_pcmt_name = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_pcmt,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "program_cmt"});
			}
		}
	});
 
	//Add DataItem : SubProgramComment
	data_item_dict.subprogram_cmt = String();
	const device0_components_1_0_components_0_0_spcmt = mtconnect.addVariable({
			componentOf: device0_components_1_0_components_0_0,
			browseName: "SubProgramComment",
			typeDefinition: mtconnect.findVariableType("MTStringEventType"),
			dataType: "String",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.String, value: data_item_dict.subprogram_cmt});
				}
			}
		});

	//Add HasMTClassType Reference
	device0_components_1_0_components_0_0_spcmt.addReference({
		nodeId: mtconnect.findObjectType("ProgramCommentClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	//Add HasMTSubClassType Reference
	device0_components_1_0_components_0_0_spcmt.addReference({
		nodeId: SubSubClassType.nodeId.value,
		referenceType: mtconnect.findReferenceType("HasMTSubClassType")
	});
	
	
	//Add Property MTTypeName
	const device0_components_1_0_components_0_0_spcmt_type = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_spcmt,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "PROGRAM_COMMENT"});
			}
		}
	});

	
	//Add Property MTSubTypeName
	const device0_components_1_0_components_0_0_spcmt_subType = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_spcmt,
		browseName: "MTSubTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "x:SUB"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_1_0_components_0_0_spcmt_category_category = new opcua.EnumValueType({});
	
	device0_components_1_0_components_0_0_spcmt_category_category.description = opcua.coerceLocalizedText("EVENT");
	device0_components_1_0_components_0_0_spcmt_category_category.value = 0;
	
	
	//Add Property Category
	const device0_components_1_0_components_0_0_spcmt_category = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_spcmt,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_1_0_components_0_0_spcmt_category_category});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_1_0_components_0_0_spcmt_id = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_spcmt,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "spcmt"});
			}
		}
	});

	
	//Add Property Name
	const device0_components_1_0_components_0_0_spcmt_name = mtconnect.addVariable({
		propertyOf: device0_components_1_0_components_0_0_spcmt,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "subprogram_cmt"});
			}
		}
	});

	//Condition type: MotionProgramCondition
	const device0_components_1_0_components_0_0_MotionProgramCondition = mtconnect.addObject({
		organizedBy: device0_components_1_0_components_0_0,
		browseName: "MotionProgramCondition",
		typeDefinition: "AlarmConditionType"
	});
	
	//Add HasNotifier Reference
	device0_components_1_0_components_0_0_MotionProgramCondition.addReference({
		nodeId: device0_components_1_0_components_0_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	//Add HasCondition Reference
	device0_components_1_0_components_0_0_MotionProgramCondition.addReference({
		nodeId: device0_components_1_0_components_0_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasCondition"),
		isForward: false
	});
	
	//Condition type: SystemCondition
	const device0_components_1_0_components_0_0_SystemCondition = mtconnect.addObject({
		organizedBy: device0_components_1_0_components_0_0,
		browseName: "SystemCondition",
		typeDefinition: "AlarmConditionType"
	});
	
	//Add HasNotifier Reference
	device0_components_1_0_components_0_0_SystemCondition.addReference({
		nodeId: device0_components_1_0_components_0_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	//Add HasCondition Reference
	device0_components_1_0_components_0_0_SystemCondition.addReference({
		nodeId: device0_components_1_0_components_0_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasCondition"),
		isForward: false
	});
	
	//Add Component: Door
	const device0_components_2_0 = mtconnect.addObject({
		organizedBy: device0_components,
		browseName: "Door",
		eventNotifier: 1,
		typeDefinition: mtconnect.findObjectType("DoorType")
	});

	//Add HasNotifier Reference
	device0_components_2_0.addReference({
		nodeId: device0_components.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	
	//Add Property XmlId
	const device0_components_2_0_id = mtconnect.addVariable({
		propertyOf: device0_components_2_0,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "door1"});
			}
		}
	});

	
	//Add Property Name
	const device0_components_2_0_name = mtconnect.addVariable({
		propertyOf: device0_components_2_0,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "door"});
			}
		}
	});
 
	//Add DataItem : DoorState
	data_item_dict.doorstate = "UNAVAILABLE";
	const device0_components_2_0_door = mtconnect.addVariable({
			componentOf: device0_components_2_0,
			browseName: "DoorState",
			typeDefinition: mtconnect.findVariableType("MTControlledVocabEventType"),
			dataType: "UInt32",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.UInt32, value: data_item_val["doorstate"][data_item_dict.doorstate]});
				}
			}
		});

	//Add Property ValueAsText for device0_components_2_0_door
	const device0_components_2_0_door_text = mtconnect.addVariable({
		propertyOf: device0_components_2_0_door,
		browseName: "ValueAsText",
		dataType: "LocalizedText",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.LocalizedText, value: {"text":data_item_dict.doorstate}});
			}
		}
	});
	 
	//Add Property EnumStrings for device0_components_2_0_door
	const device0_components_2_0_door_enumstrings = mtconnect.addVariable({
		propertyOf: device0_components_2_0_door,
		browseName: "EnumStrings",
		dataType: "LocalizedText",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.LocalizedText, value: [{"text":"CLOSED"},{"text":"OPEN"},{"text":"UNLATCHED"}]});
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_2_0_door.addReference({
		nodeId: mtconnect.findObjectType("DoorStateClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property XmlId
	const device0_components_2_0_door_id = mtconnect.addVariable({
		propertyOf: device0_components_2_0_door,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "door"});
			}
		}
	});

	
	//Add Property MTTypeName
	const device0_components_2_0_door_type = mtconnect.addVariable({
		propertyOf: device0_components_2_0_door,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "DOOR_STATE"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_2_0_door_category_category = new opcua.EnumValueType({});
	
	device0_components_2_0_door_category_category.description = opcua.coerceLocalizedText("EVENT");
	device0_components_2_0_door_category_category.value = 0;
	
	
	//Add Property Category
	const device0_components_2_0_door_category = mtconnect.addVariable({
		propertyOf: device0_components_2_0_door,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_2_0_door_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_2_0_door_name = mtconnect.addVariable({
		propertyOf: device0_components_2_0_door,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "doorstate"});
			}
		}
	});

	//Add Component: Systems
	const device0_components_3_0 = mtconnect.addObject({
		organizedBy: device0_components,
		browseName: "Systems",
		eventNotifier: 1,
		typeDefinition: mtconnect.findObjectType("SystemsType")
	});

	//Add HasNotifier Reference
	device0_components_3_0.addReference({
		nodeId: device0_components.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	
	//Add Property XmlId
	const device0_components_3_0_id = mtconnect.addVariable({
		propertyOf: device0_components_3_0,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "systems"});
			}
		}
	});

	
	//Add Property Name
	const device0_components_3_0_name = mtconnect.addVariable({
		propertyOf: device0_components_3_0,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "systems"});
			}
		}
	});

	//Components Folder
	const device0_components_3_0_components = mtconnect.addObject({
		organizedBy: device0_components_3_0,
		browseName: "Components",
		eventNotifier: 1,
		typeDefinition: "FolderType"
	});

	//Add HasNotifier Reference
	device0_components_3_0_components.addReference({
		nodeId: device0_components_3_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});

	//Add Component: Electric
	const device0_components_3_0_components_0_0 = mtconnect.addObject({
		organizedBy: device0_components_3_0_components,
		browseName: "Electric",
		eventNotifier: 1,
		typeDefinition: mtconnect.findObjectType("ElectricType")
	});

	//Add HasNotifier Reference
	device0_components_3_0_components_0_0.addReference({
		nodeId: device0_components_3_0_components.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	
	//Add Property Name
	const device0_components_3_0_components_0_0_name = mtconnect.addVariable({
		propertyOf: device0_components_3_0_components_0_0,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "electric"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_3_0_components_0_0_id = mtconnect.addVariable({
		propertyOf: device0_components_3_0_components_0_0,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "elec"});
			}
		}
	});

	//Condition type: SystemCondition
	const device0_components_3_0_components_0_0_SystemCondition = mtconnect.addObject({
		organizedBy: device0_components_3_0_components_0_0,
		browseName: "SystemCondition",
		typeDefinition: "AlarmConditionType"
	});
	
	//Add HasNotifier Reference
	device0_components_3_0_components_0_0_SystemCondition.addReference({
		nodeId: device0_components_3_0_components_0_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	//Add HasCondition Reference
	device0_components_3_0_components_0_0_SystemCondition.addReference({
		nodeId: device0_components_3_0_components_0_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasCondition"),
		isForward: false
	});
	
	//Add Component: Hydraulic
	const device0_components_3_0_components_1_0 = mtconnect.addObject({
		organizedBy: device0_components_3_0_components,
		browseName: "Hydraulic",
		eventNotifier: 1,
		typeDefinition: mtconnect.findObjectType("HydraulicType")
	});

	//Add HasNotifier Reference
	device0_components_3_0_components_1_0.addReference({
		nodeId: device0_components_3_0_components.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	
	//Add Property Name
	const device0_components_3_0_components_1_0_name = mtconnect.addVariable({
		propertyOf: device0_components_3_0_components_1_0,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "hydraulic"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_3_0_components_1_0_id = mtconnect.addVariable({
		propertyOf: device0_components_3_0_components_1_0,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "hydraulic"});
			}
		}
	});

	//Condition type: SystemCondition
	const device0_components_3_0_components_1_0_SystemCondition = mtconnect.addObject({
		organizedBy: device0_components_3_0_components_1_0,
		browseName: "SystemCondition",
		typeDefinition: "AlarmConditionType"
	});
	
	//Add HasNotifier Reference
	device0_components_3_0_components_1_0_SystemCondition.addReference({
		nodeId: device0_components_3_0_components_1_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	//Add HasCondition Reference
	device0_components_3_0_components_1_0_SystemCondition.addReference({
		nodeId: device0_components_3_0_components_1_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasCondition"),
		isForward: false
	});
	
	//Add Component: Coolant
	const device0_components_3_0_components_2_0 = mtconnect.addObject({
		organizedBy: device0_components_3_0_components,
		browseName: "Coolant",
		eventNotifier: 1,
		typeDefinition: mtconnect.findObjectType("CoolantType")
	});

	//Add HasNotifier Reference
	device0_components_3_0_components_2_0.addReference({
		nodeId: device0_components_3_0_components.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	
	//Add Property Name
	const device0_components_3_0_components_2_0_name = mtconnect.addVariable({
		propertyOf: device0_components_3_0_components_2_0,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "coolant"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_3_0_components_2_0_id = mtconnect.addVariable({
		propertyOf: device0_components_3_0_components_2_0,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "coolant"});
			}
		}
	});

	//Condition type: SystemCondition
	const device0_components_3_0_components_2_0_SystemCondition = mtconnect.addObject({
		organizedBy: device0_components_3_0_components_2_0,
		browseName: "SystemCondition",
		typeDefinition: "AlarmConditionType"
	});
	
	//Add HasNotifier Reference
	device0_components_3_0_components_2_0_SystemCondition.addReference({
		nodeId: device0_components_3_0_components_2_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	//Add HasCondition Reference
	device0_components_3_0_components_2_0_SystemCondition.addReference({
		nodeId: device0_components_3_0_components_2_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasCondition"),
		isForward: false
	});
	 
	//Add DataItem : Temperature
	data_item_dict.cooltemp = 0;
	const device0_components_3_0_components_2_0_cooltemp = mtconnect.addVariable({
			componentOf: device0_components_3_0_components_2_0,
			browseName: "Temperature",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.cooltemp});
				}
			}
		});

	//Add EUInformation for device0_components_3_0_components_2_0_cooltemp
	const device0_components_3_0_components_2_0_cooltemp_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_3_0_components_2_0_cooltemp_euinfo_val.unitId = 4408652;
	device0_components_3_0_components_2_0_cooltemp_euinfo_val.description = opcua.coerceLocalizedText("Degrees Celsius");
	device0_components_3_0_components_2_0_cooltemp_euinfo_val.displayName = opcua.coerceLocalizedText("◦Celsuis");
	
	const device0_components_3_0_components_2_0_cooltemp_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_3_0_components_2_0_cooltemp,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_3_0_components_2_0_cooltemp_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_3_0_components_2_0_cooltemp.addReference({
		nodeId: mtconnect.findObjectType("TemperatureClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property XmlId
	const device0_components_3_0_components_2_0_cooltemp_id = mtconnect.addVariable({
		propertyOf: device0_components_3_0_components_2_0_cooltemp,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "cooltemp"});
			}
		}
	});

	
	//Add Property MTTypeName
	const device0_components_3_0_components_2_0_cooltemp_type = mtconnect.addVariable({
		propertyOf: device0_components_3_0_components_2_0_cooltemp,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "TEMPERATURE"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_3_0_components_2_0_cooltemp_category_category = new opcua.EnumValueType({});
	
	device0_components_3_0_components_2_0_cooltemp_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_3_0_components_2_0_cooltemp_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_3_0_components_2_0_cooltemp_category = mtconnect.addVariable({
		propertyOf: device0_components_3_0_components_2_0_cooltemp,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_3_0_components_2_0_cooltemp_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_3_0_components_2_0_cooltemp_name = mtconnect.addVariable({
		propertyOf: device0_components_3_0_components_2_0_cooltemp,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "cooltemp"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_3_0_components_2_0_cooltemp_units = mtconnect.addVariable({
		propertyOf: device0_components_3_0_components_2_0_cooltemp,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "CELSIUS"});
			}
		}
	});
 
	//Add DataItem : Concentration
	data_item_dict.CONCENTRATION = 0;
	const device0_components_3_0_components_2_0_concentration = mtconnect.addVariable({
			componentOf: device0_components_3_0_components_2_0,
			browseName: "Concentration",
			typeDefinition: mtconnect.findVariableType("MTSampleType"),
			dataType: "Double",
			value: {
				get: function () {
					return new opcua.Variant({dataType: opcua.DataType.Double, value: data_item_dict.CONCENTRATION});
				}
			}
		});

	//Add EUInformation for device0_components_3_0_components_2_0_concentration
	const device0_components_3_0_components_2_0_concentration_euinfo_val = new opcua.makeEUInformation({});
	
	device0_components_3_0_components_2_0_concentration_euinfo_val.unitId = 20529;
	device0_components_3_0_components_2_0_concentration_euinfo_val.description = opcua.coerceLocalizedText("Percent");
	device0_components_3_0_components_2_0_concentration_euinfo_val.displayName = opcua.coerceLocalizedText("%");
	
	const device0_components_3_0_components_2_0_concentration_euinfo = mtconnect.addVariable({
		propertyOf: device0_components_3_0_components_2_0_concentration,
		browseName: "EUInformation",
		dataType: "EUInformation",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject,
				value: device0_components_3_0_components_2_0_concentration_euinfo_val  });
			}
		}
	});
	
	//Add HasMTClassType Reference
	device0_components_3_0_components_2_0_concentration.addReference({
		nodeId: mtconnect.findObjectType("ConcentrationClassType").nodeId,
		referenceType: mtconnect.findReferenceType("HasMTClassType")
	});
		
	
	//Add Property XmlId
	const device0_components_3_0_components_2_0_concentration_id = mtconnect.addVariable({
		propertyOf: device0_components_3_0_components_2_0_concentration,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "concentration"});
			}
		}
	});

	
	//Add Property MTTypeName
	const device0_components_3_0_components_2_0_concentration_type = mtconnect.addVariable({
		propertyOf: device0_components_3_0_components_2_0_concentration,
		browseName: "MTTypeName",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "CONCENTRATION"});
			}
		}
	});

	//category attribute of EnumValueType
	const device0_components_3_0_components_2_0_concentration_category_category = new opcua.EnumValueType({});
	
	device0_components_3_0_components_2_0_concentration_category_category.description = opcua.coerceLocalizedText("SAMPLE");
	device0_components_3_0_components_2_0_concentration_category_category.value = 2;
	
	
	//Add Property Category
	const device0_components_3_0_components_2_0_concentration_category = mtconnect.addVariable({
		propertyOf: device0_components_3_0_components_2_0_concentration,
		browseName: "Category",
		dataType: mtconnect.findDataType("MTCategoryType"),
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.ExtensionObject, value: device0_components_3_0_components_2_0_concentration_category_category});
			}
		}
	});

	
	//Add Property Name
	const device0_components_3_0_components_2_0_concentration_name = mtconnect.addVariable({
		propertyOf: device0_components_3_0_components_2_0_concentration,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "CONCENTRATION"});
			}
		}
	});

	
	//Add Property Units
	const device0_components_3_0_components_2_0_concentration_units = mtconnect.addVariable({
		propertyOf: device0_components_3_0_components_2_0_concentration,
		browseName: "Units",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "PERCENT"});
			}
		}
	});

	//Add Component: Pneumatic
	const device0_components_3_0_components_3_0 = mtconnect.addObject({
		organizedBy: device0_components_3_0_components,
		browseName: "Pneumatic",
		eventNotifier: 1,
		typeDefinition: mtconnect.findObjectType("PneumaticType")
	});

	//Add HasNotifier Reference
	device0_components_3_0_components_3_0.addReference({
		nodeId: device0_components_3_0_components.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	
	//Add Property Name
	const device0_components_3_0_components_3_0_name = mtconnect.addVariable({
		propertyOf: device0_components_3_0_components_3_0,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "pneumatic"});
			}
		}
	});

	
	//Add Property XmlId
	const device0_components_3_0_components_3_0_id = mtconnect.addVariable({
		propertyOf: device0_components_3_0_components_3_0,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "pneumatic"});
			}
		}
	});

	//Condition type: SystemCondition
	const device0_components_3_0_components_3_0_SystemCondition = mtconnect.addObject({
		organizedBy: device0_components_3_0_components_3_0,
		browseName: "SystemCondition",
		typeDefinition: "AlarmConditionType"
	});
	
	//Add HasNotifier Reference
	device0_components_3_0_components_3_0_SystemCondition.addReference({
		nodeId: device0_components_3_0_components_3_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	//Add HasCondition Reference
	device0_components_3_0_components_3_0_SystemCondition.addReference({
		nodeId: device0_components_3_0_components_3_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasCondition"),
		isForward: false
	});
	
	//Add Component: Lubrication
	const device0_components_3_0_components_4_0 = mtconnect.addObject({
		organizedBy: device0_components_3_0_components,
		browseName: "Lubrication",
		eventNotifier: 1,
		typeDefinition: mtconnect.findObjectType("LubricationType")
	});

	//Add HasNotifier Reference
	device0_components_3_0_components_4_0.addReference({
		nodeId: device0_components_3_0_components.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	
	//Add Property XmlId
	const device0_components_3_0_components_4_0_id = mtconnect.addVariable({
		propertyOf: device0_components_3_0_components_4_0,
		browseName: "XmlId",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "lubrication"});
			}
		}
	});

	
	//Add Property Name
	const device0_components_3_0_components_4_0_name = mtconnect.addVariable({
		propertyOf: device0_components_3_0_components_4_0,
		browseName: "Name",
		dataType: "String",
		value: {
			get: function () {
				return new opcua.Variant({dataType: opcua.DataType.String, value: "lubrication"});
			}
		}
	});

	//Condition type: SystemCondition
	const device0_components_3_0_components_4_0_SystemCondition = mtconnect.addObject({
		organizedBy: device0_components_3_0_components_4_0,
		browseName: "SystemCondition",
		typeDefinition: "AlarmConditionType"
	});
	
	//Add HasNotifier Reference
	device0_components_3_0_components_4_0_SystemCondition.addReference({
		nodeId: device0_components_3_0_components_4_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasNotifier"),
		isForward: false
	});
	
	//Add HasCondition Reference
	device0_components_3_0_components_4_0_SystemCondition.addReference({
		nodeId: device0_components_3_0_components_4_0.nodeId,
		referenceType: addressSpace.findReferenceType("HasCondition"),
		isForward: false
	});
	
	
	//Device Adapter Instantiation
	adapter(data_item_dict); 
};

module.exports = construct_address_space;
