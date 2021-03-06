"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const d = require("node-opcua-data-model");
const node_opcua_data_value_1 = require("node-opcua-data-value");
const node_opcua_generator_1 = require("node-opcua-generator");
const n = require("node-opcua-numeric-range");
const node_opcua_variant_1 = require("node-opcua-variant");
const path = require("path");
const force_inclusion = n.NumericRange;
const force_includsion_QualifiedName = d.QualifiedName;
const force_includsion_LocalizedText = d.LocalizedText;
const force_includsion_Variant = node_opcua_variant_1.Variant;
const force_includsion_DataValue = node_opcua_data_value_1.DataValue;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // await build_generated_folder();
            const filename = path.join(__dirname, "../xmlschemas/Opc.Ua.Types.bsd");
            const generatedTypescriptFilename = path.join(__dirname, "_generated_opcua_types.ts");
            yield node_opcua_generator_1.generate(filename, generatedTypescriptFilename);
        }
        catch (err) {
            console.log(err);
        }
    });
}
main().then().catch();
//# sourceMappingURL=generate.js.map