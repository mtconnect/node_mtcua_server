/**
 * @module node-opcua-types
 */
import { Byte, ByteString, DateTime, Double, Float, Guid, Int16, Int32, Int64, UABoolean, UAString, UInt16, UInt32 } from "node-opcua-basic-types";
import { Enum } from "node-opcua-enum";
import { BinaryStream, OutputBinaryStream } from "node-opcua-binary-stream";
import { BrowseDirection, DiagnosticInfo, LocalizedText, LocalizedTextLike, QualifiedName, QualifiedNameLike } from "node-opcua-data-model";
import { DataValue, DataValueLike, TimestampsToReturn } from "node-opcua-data-value";
import { ExtensionObject } from "node-opcua-extension-object";
import { BaseUAObject, StructuredTypeSchema } from "node-opcua-factory";
import { ExpandedNodeId, NodeId, NodeIdLike } from "node-opcua-nodeid";
import { NumericRange } from "node-opcua-numeric-range";
import { StatusCode } from "node-opcua-status-code";
import { Variant, VariantLike } from "node-opcua-variant";
export declare class DataTypeDefinition extends BaseUAObject {
    constructor(options: any);
}
export interface EUInformationOptions {
    namespaceUri?: UAString;
    unitId?: Int32;
    displayName?: (LocalizedTextLike | null);
    description?: (LocalizedTextLike | null);
}
export declare class EUInformation extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    namespaceUri: UAString;
    unitId: Int32;
    displayName: LocalizedText;
    description: LocalizedText;
    constructor(options?: EUInformationOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface RangeOptions {
    low?: Double;
    high?: Double;
}
export declare class Range extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    low: Double;
    high: Double;
    constructor(options?: RangeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export declare enum AxisScaleEnumeration {
    Linear = 0,
    Log = 1,
    Ln = 2,
    Invalid = 4294967295
}
export declare const _enumerationAxisScaleEnumeration: Enum;
export interface AxisInformationOptions {
    engineeringUnits?: EUInformationOptions;
    euRange?: RangeOptions;
    title?: (LocalizedTextLike | null);
    axisScaleType?: AxisScaleEnumeration;
    axisSteps?: Double[] | null;
}
export declare class AxisInformation extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    engineeringUnits: EUInformation;
    euRange: Range;
    title: LocalizedText;
    axisScaleType: AxisScaleEnumeration;
    axisSteps: Double[] | null;
    constructor(options?: AxisInformationOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setAxisScaleType(value: any): AxisScaleEnumeration;
    readonly schema: StructuredTypeSchema;
}
export interface FilterOperandOptions {
}
export declare class FilterOperand extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    constructor(options?: FilterOperandOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface SimpleAttributeOperandOptions extends FilterOperandOptions {
    typeDefinitionId?: (NodeIdLike | null);
    browsePath?: (QualifiedNameLike | null)[] | null;
    attributeId?: UInt32;
    indexRange?: NumericRange;
}
export declare class SimpleAttributeOperand extends FilterOperand {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    typeDefinitionId: NodeId;
    browsePath: QualifiedName[] | null;
    attributeId: UInt32;
    indexRange: NumericRange;
    constructor(options?: SimpleAttributeOperandOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface KeyValuePairOptions {
    key?: (QualifiedNameLike | null);
    value?: (VariantLike | null);
}
export declare class KeyValuePair extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    key: QualifiedName;
    value: Variant;
    constructor(options?: KeyValuePairOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface AdditionalParametersTypeOptions {
    parameters?: KeyValuePairOptions[] | null;
}
export declare class AdditionalParametersType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    parameters: KeyValuePair[] | null;
    constructor(options?: AdditionalParametersTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface EphemeralKeyTypeOptions {
    publicKey?: ByteString;
    signature?: ByteString;
}
export declare class EphemeralKeyType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    publicKey: ByteString;
    signature: ByteString;
    constructor(options?: EphemeralKeyTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export declare enum MessageSecurityMode {
    Invalid = 0,
    None = 1,
    Sign = 2,
    SignAndEncrypt = 3
}
export declare const _enumerationMessageSecurityMode: Enum;
export interface EndpointTypeOptions {
    endpointUrl?: UAString;
    securityMode?: MessageSecurityMode;
    securityPolicyUri?: UAString;
    transportProfileUri?: UAString;
}
export declare class EndpointType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    endpointUrl: UAString;
    securityMode: MessageSecurityMode;
    securityPolicyUri: UAString;
    transportProfileUri: UAString;
    constructor(options?: EndpointTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setSecurityMode(value: any): MessageSecurityMode;
    readonly schema: StructuredTypeSchema;
}
export declare enum IdentityCriteriaType {
    UserName = 1,
    Thumbprint = 2,
    Role = 3,
    GroupId = 4,
    Anonymous = 5,
    AuthenticatedUser = 6,
    Invalid = 4294967295
}
export declare const _enumerationIdentityCriteriaType: Enum;
export interface IdentityMappingRuleTypeOptions {
    criteriaType?: IdentityCriteriaType;
    criteria?: UAString;
}
export declare class IdentityMappingRuleType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    criteriaType: IdentityCriteriaType;
    criteria: UAString;
    constructor(options?: IdentityMappingRuleTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setCriteriaType(value: any): IdentityCriteriaType;
    readonly schema: StructuredTypeSchema;
}
export interface TrustListDataTypeOptions {
    specifiedLists?: UInt32;
    trustedCertificates?: ByteString[] | null;
    trustedCrls?: ByteString[] | null;
    issuerCertificates?: ByteString[] | null;
    issuerCrls?: ByteString[] | null;
}
export declare class TrustListDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    specifiedLists: UInt32;
    trustedCertificates: ByteString[] | null;
    trustedCrls: ByteString[] | null;
    issuerCertificates: ByteString[] | null;
    issuerCrls: ByteString[] | null;
    constructor(options?: TrustListDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface DecimalDataTypeOptions {
    scale?: Int16;
    value?: ByteString;
}
export declare class DecimalDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    scale: Int16;
    value: ByteString;
    constructor(options?: DecimalDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface StructureFieldOptions {
    name?: UAString;
    description?: (LocalizedTextLike | null);
    dataType?: (NodeIdLike | null);
    valueRank?: Int32;
    arrayDimensions?: UInt32[] | null;
    maxStringLength?: UInt32;
    isOptional?: UABoolean;
}
export declare class StructureField extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    name: UAString;
    description: LocalizedText;
    dataType: NodeId;
    valueRank: Int32;
    arrayDimensions: UInt32[] | null;
    maxStringLength: UInt32;
    isOptional: UABoolean;
    constructor(options?: StructureFieldOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export declare enum StructureType {
    Structure = 0,
    StructureWithOptionalFields = 1,
    Union = 2,
    Invalid = 4294967295
}
export declare const _enumerationStructureType: Enum;
export interface StructureDefinitionOptions {
    defaultEncodingId?: (NodeIdLike | null);
    baseDataType?: (NodeIdLike | null);
    structureType?: StructureType;
    fields?: StructureFieldOptions[] | null;
}
export declare class StructureDefinition extends DataTypeDefinition {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    defaultEncodingId: NodeId;
    baseDataType: NodeId;
    structureType: StructureType;
    fields: StructureField[] | null;
    constructor(options?: StructureDefinitionOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setStructureType(value: any): StructureType;
    readonly schema: StructuredTypeSchema;
}
export interface DataTypeDescriptionOptions {
    dataTypeId?: (NodeIdLike | null);
    name?: (QualifiedNameLike | null);
}
export declare class DataTypeDescription extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    dataTypeId: NodeId;
    name: QualifiedName;
    constructor(options?: DataTypeDescriptionOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface StructureDescriptionOptions extends DataTypeDescriptionOptions {
    structureDefinition?: StructureDefinitionOptions;
}
export declare class StructureDescription extends DataTypeDescription {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    structureDefinition: StructureDefinition;
    constructor(options?: StructureDescriptionOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface EnumValueTypeOptions {
    value?: Int64;
    displayName?: (LocalizedTextLike | null);
    description?: (LocalizedTextLike | null);
}
export declare class EnumValueType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    value: Int64;
    displayName: LocalizedText;
    description: LocalizedText;
    constructor(options?: EnumValueTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface EnumFieldOptions extends EnumValueTypeOptions {
    name?: UAString;
}
export declare class EnumField extends EnumValueType {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    name: UAString;
    constructor(options?: EnumFieldOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface EnumDefinitionOptions {
    fields?: EnumFieldOptions[] | null;
}
export declare class EnumDefinition extends DataTypeDefinition {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    fields: EnumField[] | null;
    constructor(options?: EnumDefinitionOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface EnumDescriptionOptions extends DataTypeDescriptionOptions {
    enumDefinition?: EnumDefinitionOptions;
    builtInType?: Byte;
}
export declare class EnumDescription extends DataTypeDescription {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    enumDefinition: EnumDefinition;
    builtInType: Byte;
    constructor(options?: EnumDescriptionOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface SimpleTypeDescriptionOptions extends DataTypeDescriptionOptions {
    baseDataType?: (NodeIdLike | null);
    builtInType?: Byte;
}
export declare class SimpleTypeDescription extends DataTypeDescription {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    baseDataType: NodeId;
    builtInType: Byte;
    constructor(options?: SimpleTypeDescriptionOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface DataTypeSchemaHeaderOptions {
    namespaces?: UAString[] | null;
    structureDataTypes?: StructureDescriptionOptions[] | null;
    enumDataTypes?: EnumDescriptionOptions[] | null;
    simpleDataTypes?: SimpleTypeDescriptionOptions[] | null;
}
export declare class DataTypeSchemaHeader extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    namespaces: UAString[] | null;
    structureDataTypes: StructureDescription[] | null;
    enumDataTypes: EnumDescription[] | null;
    simpleDataTypes: SimpleTypeDescription[] | null;
    constructor(options?: DataTypeSchemaHeaderOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface UABinaryFileDataTypeOptions extends DataTypeSchemaHeaderOptions {
    namespaces?: UAString[] | null;
    structureDataTypes?: StructureDescriptionOptions[] | null;
    enumDataTypes?: EnumDescriptionOptions[] | null;
    simpleDataTypes?: SimpleTypeDescriptionOptions[] | null;
    schemaLocation?: UAString;
    fileHeader?: KeyValuePairOptions[] | null;
    body?: (VariantLike | null);
}
export declare class UABinaryFileDataType extends DataTypeSchemaHeader {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    namespaces: UAString[] | null;
    structureDataTypes: StructureDescription[] | null;
    enumDataTypes: EnumDescription[] | null;
    simpleDataTypes: SimpleTypeDescription[] | null;
    schemaLocation: UAString;
    fileHeader: KeyValuePair[] | null;
    body: Variant;
    constructor(options?: UABinaryFileDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export declare enum DataSetFieldFlags {
    None = 0,
    PromotedField = 1,
    Invalid = 4294967295
}
export declare const _enumerationDataSetFieldFlags: Enum;
export interface FieldMetaDataOptions {
    name?: UAString;
    description?: (LocalizedTextLike | null);
    fieldFlags?: DataSetFieldFlags;
    builtInType?: Byte;
    dataType?: (NodeIdLike | null);
    valueRank?: Int32;
    arrayDimensions?: UInt32[] | null;
    maxStringLength?: UInt32;
    dataSetFieldId?: Guid;
    properties?: KeyValuePairOptions[] | null;
}
export declare class FieldMetaData extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    name: UAString;
    description: LocalizedText;
    fieldFlags: DataSetFieldFlags;
    builtInType: Byte;
    dataType: NodeId;
    valueRank: Int32;
    arrayDimensions: UInt32[] | null;
    maxStringLength: UInt32;
    dataSetFieldId: Guid;
    properties: KeyValuePair[] | null;
    constructor(options?: FieldMetaDataOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setFieldFlags(value: any): DataSetFieldFlags;
    readonly schema: StructuredTypeSchema;
}
export interface ConfigurationVersionDataTypeOptions {
    majorVersion?: UInt32;
    minorVersion?: UInt32;
}
export declare class ConfigurationVersionDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    majorVersion: UInt32;
    minorVersion: UInt32;
    constructor(options?: ConfigurationVersionDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface DataSetMetaDataTypeOptions extends DataTypeSchemaHeaderOptions {
    namespaces?: UAString[] | null;
    structureDataTypes?: StructureDescriptionOptions[] | null;
    enumDataTypes?: EnumDescriptionOptions[] | null;
    simpleDataTypes?: SimpleTypeDescriptionOptions[] | null;
    name?: UAString;
    description?: (LocalizedTextLike | null);
    fields?: FieldMetaDataOptions[] | null;
    dataSetClassId?: Guid;
    configurationVersion?: ConfigurationVersionDataTypeOptions;
}
export declare class DataSetMetaDataType extends DataTypeSchemaHeader {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    namespaces: UAString[] | null;
    structureDataTypes: StructureDescription[] | null;
    enumDataTypes: EnumDescription[] | null;
    simpleDataTypes: SimpleTypeDescription[] | null;
    name: UAString;
    description: LocalizedText;
    fields: FieldMetaData[] | null;
    dataSetClassId: Guid;
    configurationVersion: ConfigurationVersionDataType;
    constructor(options?: DataSetMetaDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface PublishedDataSetDataTypeOptions {
    name?: UAString;
    dataSetFolder?: UAString[] | null;
    dataSetMetaData?: DataSetMetaDataTypeOptions;
    extensionFields?: KeyValuePairOptions[] | null;
    dataSetSource?: (ExtensionObject | null);
}
export declare class PublishedDataSetDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    name: UAString;
    dataSetFolder: UAString[] | null;
    dataSetMetaData: DataSetMetaDataType;
    extensionFields: KeyValuePair[] | null;
    dataSetSource: (ExtensionObject | null);
    constructor(options?: PublishedDataSetDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface PublishedDataSetSourceDataTypeOptions {
}
export declare class PublishedDataSetSourceDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    constructor(options?: PublishedDataSetSourceDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface PublishedVariableDataTypeOptions {
    publishedVariable?: (NodeIdLike | null);
    attributeId?: UInt32;
    samplingIntervalHint?: Double;
    deadbandType?: UInt32;
    deadbandValue?: Double;
    indexRange?: NumericRange;
    substituteValue?: (VariantLike | null);
    metaDataProperties?: (QualifiedNameLike | null)[] | null;
}
export declare class PublishedVariableDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    publishedVariable: NodeId;
    attributeId: UInt32;
    samplingIntervalHint: Double;
    deadbandType: UInt32;
    deadbandValue: Double;
    indexRange: NumericRange;
    substituteValue: Variant;
    metaDataProperties: QualifiedName[] | null;
    constructor(options?: PublishedVariableDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface PublishedDataItemsDataTypeOptions extends PublishedDataSetSourceDataTypeOptions {
    publishedData?: PublishedVariableDataTypeOptions[] | null;
}
export declare class PublishedDataItemsDataType extends PublishedDataSetSourceDataType {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    publishedData: PublishedVariableDataType[] | null;
    constructor(options?: PublishedDataItemsDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export declare enum FilterOperator {
    Equals = 0,
    IsNull = 1,
    GreaterThan = 2,
    LessThan = 3,
    GreaterThanOrEqual = 4,
    LessThanOrEqual = 5,
    Like = 6,
    Not = 7,
    Between = 8,
    InList = 9,
    And = 10,
    Or = 11,
    Cast = 12,
    InView = 13,
    OfType = 14,
    RelatedTo = 15,
    BitwiseAnd = 16,
    BitwiseOr = 17,
    Invalid = 4294967295
}
export declare const _enumerationFilterOperator: Enum;
export interface ContentFilterElementOptions {
    filterOperator?: FilterOperator;
    filterOperands?: (ExtensionObject | null)[] | null;
}
export declare class ContentFilterElement extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    filterOperator: FilterOperator;
    filterOperands: (ExtensionObject | null)[] | null;
    constructor(options?: ContentFilterElementOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setFilterOperator(value: any): FilterOperator;
    readonly schema: StructuredTypeSchema;
}
export interface ContentFilterOptions {
    elements?: ContentFilterElementOptions[] | null;
}
export declare class ContentFilter extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    elements: ContentFilterElement[] | null;
    constructor(options?: ContentFilterOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface PublishedEventsDataTypeOptions extends PublishedDataSetSourceDataTypeOptions {
    eventNotifier?: (NodeIdLike | null);
    selectedFields?: SimpleAttributeOperandOptions[] | null;
    filter?: ContentFilterOptions;
}
export declare class PublishedEventsDataType extends PublishedDataSetSourceDataType {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    eventNotifier: NodeId;
    selectedFields: SimpleAttributeOperand[] | null;
    filter: ContentFilter;
    constructor(options?: PublishedEventsDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export declare enum DataSetFieldContentMask {
    None = 0,
    StatusCode = 1,
    SourceTimestamp = 2,
    ServerTimestamp = 4,
    SourcePicoSeconds = 8,
    ServerPicoSeconds = 16,
    RawData = 32,
    Invalid = 4294967295
}
export declare const _enumerationDataSetFieldContentMask: Enum;
export interface DataSetWriterDataTypeOptions {
    name?: UAString;
    enabled?: UABoolean;
    dataSetWriterId?: UInt16;
    dataSetFieldContentMask?: DataSetFieldContentMask;
    keyFrameCount?: UInt32;
    dataSetName?: UAString;
    dataSetWriterProperties?: KeyValuePairOptions[] | null;
    transportSettings?: (ExtensionObject | null);
    messageSettings?: (ExtensionObject | null);
}
export declare class DataSetWriterDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    name: UAString;
    enabled: UABoolean;
    dataSetWriterId: UInt16;
    dataSetFieldContentMask: DataSetFieldContentMask;
    keyFrameCount: UInt32;
    dataSetName: UAString;
    dataSetWriterProperties: KeyValuePair[] | null;
    transportSettings: (ExtensionObject | null);
    messageSettings: (ExtensionObject | null);
    constructor(options?: DataSetWriterDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setDataSetFieldContentMask(value: any): DataSetFieldContentMask;
    readonly schema: StructuredTypeSchema;
}
export interface DataSetWriterTransportDataTypeOptions {
}
export declare class DataSetWriterTransportDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    constructor(options?: DataSetWriterTransportDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface DataSetWriterMessageDataTypeOptions {
}
export declare class DataSetWriterMessageDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    constructor(options?: DataSetWriterMessageDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export declare enum ApplicationType {
    Server = 0,
    Client = 1,
    ClientAndServer = 2,
    DiscoveryServer = 3,
    Invalid = 4294967295
}
export declare const _enumerationApplicationType: Enum;
export interface ApplicationDescriptionOptions {
    applicationUri?: UAString;
    productUri?: UAString;
    applicationName?: (LocalizedTextLike | null);
    applicationType?: ApplicationType;
    gatewayServerUri?: UAString;
    discoveryProfileUri?: UAString;
    discoveryUrls?: UAString[] | null;
}
export declare class ApplicationDescription extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    applicationUri: UAString;
    productUri: UAString;
    applicationName: LocalizedText;
    applicationType: ApplicationType;
    gatewayServerUri: UAString;
    discoveryProfileUri: UAString;
    discoveryUrls: UAString[] | null;
    constructor(options?: ApplicationDescriptionOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setApplicationType(value: any): ApplicationType;
    readonly schema: StructuredTypeSchema;
}
export declare enum UserTokenType {
    Anonymous = 0,
    UserName = 1,
    Certificate = 2,
    IssuedToken = 3,
    Invalid = 4294967295
}
export declare const _enumerationUserTokenType: Enum;
export interface UserTokenPolicyOptions {
    policyId?: UAString;
    tokenType?: UserTokenType;
    issuedTokenType?: UAString;
    issuerEndpointUrl?: UAString;
    securityPolicyUri?: UAString;
}
export declare class UserTokenPolicy extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    policyId: UAString;
    tokenType: UserTokenType;
    issuedTokenType: UAString;
    issuerEndpointUrl: UAString;
    securityPolicyUri: UAString;
    constructor(options?: UserTokenPolicyOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setTokenType(value: any): UserTokenType;
    readonly schema: StructuredTypeSchema;
}
export interface EndpointDescriptionOptions {
    endpointUrl?: UAString;
    server?: ApplicationDescriptionOptions;
    serverCertificate?: ByteString;
    securityMode?: MessageSecurityMode;
    securityPolicyUri?: UAString;
    userIdentityTokens?: UserTokenPolicyOptions[] | null;
    transportProfileUri?: UAString;
    securityLevel?: Byte;
}
export declare class EndpointDescription extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    endpointUrl: UAString;
    server: ApplicationDescription;
    serverCertificate: ByteString;
    securityMode: MessageSecurityMode;
    securityPolicyUri: UAString;
    userIdentityTokens: UserTokenPolicy[] | null;
    transportProfileUri: UAString;
    securityLevel: Byte;
    constructor(options?: EndpointDescriptionOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setSecurityMode(value: any): MessageSecurityMode;
    readonly schema: StructuredTypeSchema;
}
export interface PubSubGroupDataTypeOptions {
    name?: UAString;
    enabled?: UABoolean;
    securityMode?: MessageSecurityMode;
    securityGroupId?: UAString;
    securityKeyServices?: EndpointDescriptionOptions[] | null;
    maxNetworkMessageSize?: UInt32;
    groupProperties?: KeyValuePairOptions[] | null;
}
export declare class PubSubGroupDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    name: UAString;
    enabled: UABoolean;
    securityMode: MessageSecurityMode;
    securityGroupId: UAString;
    securityKeyServices: EndpointDescription[] | null;
    maxNetworkMessageSize: UInt32;
    groupProperties: KeyValuePair[] | null;
    constructor(options?: PubSubGroupDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setSecurityMode(value: any): MessageSecurityMode;
    readonly schema: StructuredTypeSchema;
}
export interface WriterGroupDataTypeOptions extends PubSubGroupDataTypeOptions {
    securityKeyServices?: EndpointDescriptionOptions[] | null;
    groupProperties?: KeyValuePairOptions[] | null;
    writerGroupId?: UInt16;
    publishingInterval?: Double;
    keepAliveTime?: Double;
    priority?: Byte;
    localeIds?: UAString[] | null;
    headerLayoutUri?: UAString;
    transportSettings?: (ExtensionObject | null);
    messageSettings?: (ExtensionObject | null);
    dataSetWriters?: DataSetWriterDataTypeOptions[] | null;
}
export declare class WriterGroupDataType extends PubSubGroupDataType {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    securityKeyServices: EndpointDescription[] | null;
    groupProperties: KeyValuePair[] | null;
    writerGroupId: UInt16;
    publishingInterval: Double;
    keepAliveTime: Double;
    priority: Byte;
    localeIds: UAString[] | null;
    headerLayoutUri: UAString;
    transportSettings: (ExtensionObject | null);
    messageSettings: (ExtensionObject | null);
    dataSetWriters: DataSetWriterDataType[] | null;
    constructor(options?: WriterGroupDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface WriterGroupTransportDataTypeOptions {
}
export declare class WriterGroupTransportDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    constructor(options?: WriterGroupTransportDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface WriterGroupMessageDataTypeOptions {
}
export declare class WriterGroupMessageDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    constructor(options?: WriterGroupMessageDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface DataSetReaderDataTypeOptions {
    name?: UAString;
    enabled?: UABoolean;
    publisherId?: (VariantLike | null);
    writerGroupId?: UInt16;
    dataSetWriterId?: UInt16;
    dataSetMetaData?: DataSetMetaDataTypeOptions;
    dataSetFieldContentMask?: DataSetFieldContentMask;
    messageReceiveTimeout?: Double;
    keyFrameCount?: UInt32;
    headerLayoutUri?: UAString;
    securityMode?: MessageSecurityMode;
    securityGroupId?: UAString;
    securityKeyServices?: EndpointDescriptionOptions[] | null;
    dataSetReaderProperties?: KeyValuePairOptions[] | null;
    transportSettings?: (ExtensionObject | null);
    messageSettings?: (ExtensionObject | null);
    subscribedDataSet?: (ExtensionObject | null);
}
export declare class DataSetReaderDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    name: UAString;
    enabled: UABoolean;
    publisherId: Variant;
    writerGroupId: UInt16;
    dataSetWriterId: UInt16;
    dataSetMetaData: DataSetMetaDataType;
    dataSetFieldContentMask: DataSetFieldContentMask;
    messageReceiveTimeout: Double;
    keyFrameCount: UInt32;
    headerLayoutUri: UAString;
    securityMode: MessageSecurityMode;
    securityGroupId: UAString;
    securityKeyServices: EndpointDescription[] | null;
    dataSetReaderProperties: KeyValuePair[] | null;
    transportSettings: (ExtensionObject | null);
    messageSettings: (ExtensionObject | null);
    subscribedDataSet: (ExtensionObject | null);
    constructor(options?: DataSetReaderDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setDataSetFieldContentMask(value: any): DataSetFieldContentMask;
    setSecurityMode(value: any): MessageSecurityMode;
    readonly schema: StructuredTypeSchema;
}
export interface ReaderGroupDataTypeOptions extends PubSubGroupDataTypeOptions {
    securityKeyServices?: EndpointDescriptionOptions[] | null;
    groupProperties?: KeyValuePairOptions[] | null;
    transportSettings?: (ExtensionObject | null);
    messageSettings?: (ExtensionObject | null);
    dataSetReaders?: DataSetReaderDataTypeOptions[] | null;
}
export declare class ReaderGroupDataType extends PubSubGroupDataType {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    securityKeyServices: EndpointDescription[] | null;
    groupProperties: KeyValuePair[] | null;
    transportSettings: (ExtensionObject | null);
    messageSettings: (ExtensionObject | null);
    dataSetReaders: DataSetReaderDataType[] | null;
    constructor(options?: ReaderGroupDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface PubSubConnectionDataTypeOptions {
    name?: UAString;
    enabled?: UABoolean;
    publisherId?: (VariantLike | null);
    transportProfileUri?: UAString;
    address?: (ExtensionObject | null);
    connectionProperties?: KeyValuePairOptions[] | null;
    transportSettings?: (ExtensionObject | null);
    writerGroups?: WriterGroupDataTypeOptions[] | null;
    readerGroups?: ReaderGroupDataTypeOptions[] | null;
}
export declare class PubSubConnectionDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    name: UAString;
    enabled: UABoolean;
    publisherId: Variant;
    transportProfileUri: UAString;
    address: (ExtensionObject | null);
    connectionProperties: KeyValuePair[] | null;
    transportSettings: (ExtensionObject | null);
    writerGroups: WriterGroupDataType[] | null;
    readerGroups: ReaderGroupDataType[] | null;
    constructor(options?: PubSubConnectionDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ConnectionTransportDataTypeOptions {
}
export declare class ConnectionTransportDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    constructor(options?: ConnectionTransportDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface NetworkAddressDataTypeOptions {
    networkInterface?: UAString;
}
export declare class NetworkAddressDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    networkInterface: UAString;
    constructor(options?: NetworkAddressDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface NetworkAddressUrlDataTypeOptions extends NetworkAddressDataTypeOptions {
    url?: UAString;
}
export declare class NetworkAddressUrlDataType extends NetworkAddressDataType {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    url: UAString;
    constructor(options?: NetworkAddressUrlDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ReaderGroupTransportDataTypeOptions {
}
export declare class ReaderGroupTransportDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    constructor(options?: ReaderGroupTransportDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ReaderGroupMessageDataTypeOptions {
}
export declare class ReaderGroupMessageDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    constructor(options?: ReaderGroupMessageDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface DataSetReaderTransportDataTypeOptions {
}
export declare class DataSetReaderTransportDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    constructor(options?: DataSetReaderTransportDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface DataSetReaderMessageDataTypeOptions {
}
export declare class DataSetReaderMessageDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    constructor(options?: DataSetReaderMessageDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface SubscribedDataSetDataTypeOptions {
}
export declare class SubscribedDataSetDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    constructor(options?: SubscribedDataSetDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export declare enum OverrideValueHandling {
    Disabled = 0,
    LastUsableValue = 1,
    OverrideValue = 2,
    Invalid = 4294967295
}
export declare const _enumerationOverrideValueHandling: Enum;
export interface FieldTargetDataTypeOptions {
    dataSetFieldId?: Guid;
    receiverIndexRange?: UAString;
    targetNodeId?: (NodeIdLike | null);
    attributeId?: UInt32;
    writeIndexRange?: UAString;
    overrideValueHandling?: OverrideValueHandling;
    overrideValue?: (VariantLike | null);
}
export declare class FieldTargetDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    dataSetFieldId: Guid;
    receiverIndexRange: UAString;
    targetNodeId: NodeId;
    attributeId: UInt32;
    writeIndexRange: UAString;
    overrideValueHandling: OverrideValueHandling;
    overrideValue: Variant;
    constructor(options?: FieldTargetDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setOverrideValueHandling(value: any): OverrideValueHandling;
    readonly schema: StructuredTypeSchema;
}
export interface TargetVariablesDataTypeOptions extends SubscribedDataSetDataTypeOptions {
    targetVariables?: FieldTargetDataTypeOptions[] | null;
}
export declare class TargetVariablesDataType extends SubscribedDataSetDataType {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    targetVariables: FieldTargetDataType[] | null;
    constructor(options?: TargetVariablesDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export declare enum PermissionType {
    None = 0,
    Browse = 1,
    ReadRolePermissions = 2,
    WriteAttribute = 4,
    WriteRolePermissions = 8,
    WriteHistorizing = 16,
    Read = 32,
    Write = 64,
    ReadHistory = 128,
    InsertHistory = 256,
    ModifyHistory = 512,
    DeleteHistory = 1024,
    ReceiveEvents = 2048,
    Call = 4096,
    AddReference = 8192,
    RemoveReference = 16384,
    DeleteNode = 32768,
    AddNode = 65536,
    Invalid = 4294967295
}
export declare const _enumerationPermissionType: Enum;
export interface RolePermissionTypeOptions {
    roleId?: (NodeIdLike | null);
    permissions?: PermissionType;
}
export declare class RolePermissionType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    roleId: NodeId;
    permissions: PermissionType;
    constructor(options?: RolePermissionTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setPermissions(value: any): PermissionType;
    readonly schema: StructuredTypeSchema;
}
export interface SubscribedDataSetMirrorDataTypeOptions extends SubscribedDataSetDataTypeOptions {
    parentNodeName?: UAString;
    rolePermissions?: RolePermissionTypeOptions[] | null;
}
export declare class SubscribedDataSetMirrorDataType extends SubscribedDataSetDataType {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    parentNodeName: UAString;
    rolePermissions: RolePermissionType[] | null;
    constructor(options?: SubscribedDataSetMirrorDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface PubSubConfigurationDataTypeOptions {
    publishedDataSets?: PublishedDataSetDataTypeOptions[] | null;
    connections?: PubSubConnectionDataTypeOptions[] | null;
    enabled?: UABoolean;
}
export declare class PubSubConfigurationDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    publishedDataSets: PublishedDataSetDataType[] | null;
    connections: PubSubConnectionDataType[] | null;
    enabled: UABoolean;
    constructor(options?: PubSubConfigurationDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export declare enum DataSetOrderingType {
    Undefined = 0,
    AscendingWriterId = 1,
    AscendingWriterIdSingle = 2,
    Invalid = 4294967295
}
export declare const _enumerationDataSetOrderingType: Enum;
export declare enum UadpNetworkMessageContentMask {
    None = 0,
    PublisherId = 1,
    GroupHeader = 2,
    WriterGroupId = 4,
    GroupVersion = 8,
    NetworkMessageNumber = 16,
    SequenceNumber = 32,
    PayloadHeader = 64,
    Timestamp = 128,
    PicoSeconds = 256,
    DataSetClassId = 512,
    PromotedFields = 1024,
    Invalid = 4294967295
}
export declare const _enumerationUadpNetworkMessageContentMask: Enum;
export interface UadpWriterGroupMessageDataTypeOptions extends WriterGroupMessageDataTypeOptions {
    groupVersion?: UInt32;
    dataSetOrdering?: DataSetOrderingType;
    networkMessageContentMask?: UadpNetworkMessageContentMask;
    samplingOffset?: Double;
    publishingOffset?: Double[] | null;
}
export declare class UadpWriterGroupMessageDataType extends WriterGroupMessageDataType {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    groupVersion: UInt32;
    dataSetOrdering: DataSetOrderingType;
    networkMessageContentMask: UadpNetworkMessageContentMask;
    samplingOffset: Double;
    publishingOffset: Double[] | null;
    constructor(options?: UadpWriterGroupMessageDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setDataSetOrdering(value: any): DataSetOrderingType;
    setNetworkMessageContentMask(value: any): UadpNetworkMessageContentMask;
    readonly schema: StructuredTypeSchema;
}
export declare enum UadpDataSetMessageContentMask {
    None = 0,
    Timestamp = 1,
    PicoSeconds = 2,
    Status = 4,
    MajorVersion = 8,
    MinorVersion = 16,
    SequenceNumber = 32,
    Invalid = 4294967295
}
export declare const _enumerationUadpDataSetMessageContentMask: Enum;
export interface UadpDataSetWriterMessageDataTypeOptions extends DataSetWriterMessageDataTypeOptions {
    dataSetMessageContentMask?: UadpDataSetMessageContentMask;
    configuredSize?: UInt16;
    networkMessageNumber?: UInt16;
    dataSetOffset?: UInt16;
}
export declare class UadpDataSetWriterMessageDataType extends DataSetWriterMessageDataType {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    dataSetMessageContentMask: UadpDataSetMessageContentMask;
    configuredSize: UInt16;
    networkMessageNumber: UInt16;
    dataSetOffset: UInt16;
    constructor(options?: UadpDataSetWriterMessageDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setDataSetMessageContentMask(value: any): UadpDataSetMessageContentMask;
    readonly schema: StructuredTypeSchema;
}
export interface UadpDataSetReaderMessageDataTypeOptions extends DataSetReaderMessageDataTypeOptions {
    groupVersion?: UInt32;
    networkMessageNumber?: UInt16;
    dataSetOffset?: UInt16;
    dataSetClassId?: Guid;
    networkMessageContentMask?: UadpNetworkMessageContentMask;
    dataSetMessageContentMask?: UadpDataSetMessageContentMask;
    publishingInterval?: Double;
    receiveOffset?: Double;
    processingOffset?: Double;
}
export declare class UadpDataSetReaderMessageDataType extends DataSetReaderMessageDataType {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    groupVersion: UInt32;
    networkMessageNumber: UInt16;
    dataSetOffset: UInt16;
    dataSetClassId: Guid;
    networkMessageContentMask: UadpNetworkMessageContentMask;
    dataSetMessageContentMask: UadpDataSetMessageContentMask;
    publishingInterval: Double;
    receiveOffset: Double;
    processingOffset: Double;
    constructor(options?: UadpDataSetReaderMessageDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setNetworkMessageContentMask(value: any): UadpNetworkMessageContentMask;
    setDataSetMessageContentMask(value: any): UadpDataSetMessageContentMask;
    readonly schema: StructuredTypeSchema;
}
export declare enum JsonNetworkMessageContentMask {
    None = 0,
    NetworkMessageHeader = 1,
    DataSetMessageHeader = 2,
    SingleDataSetMessage = 4,
    PublisherId = 8,
    DataSetClassId = 16,
    ReplyTo = 32,
    Invalid = 4294967295
}
export declare const _enumerationJsonNetworkMessageContentMask: Enum;
export interface JsonWriterGroupMessageDataTypeOptions extends WriterGroupMessageDataTypeOptions {
    networkMessageContentMask?: JsonNetworkMessageContentMask;
}
export declare class JsonWriterGroupMessageDataType extends WriterGroupMessageDataType {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    networkMessageContentMask: JsonNetworkMessageContentMask;
    constructor(options?: JsonWriterGroupMessageDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setNetworkMessageContentMask(value: any): JsonNetworkMessageContentMask;
    readonly schema: StructuredTypeSchema;
}
export declare enum JsonDataSetMessageContentMask {
    None = 0,
    DataSetWriterId = 1,
    MetaDataVersion = 2,
    SequenceNumber = 4,
    Timestamp = 8,
    Status = 16,
    Invalid = 4294967295
}
export declare const _enumerationJsonDataSetMessageContentMask: Enum;
export interface JsonDataSetWriterMessageDataTypeOptions extends DataSetWriterMessageDataTypeOptions {
    dataSetMessageContentMask?: JsonDataSetMessageContentMask;
}
export declare class JsonDataSetWriterMessageDataType extends DataSetWriterMessageDataType {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    dataSetMessageContentMask: JsonDataSetMessageContentMask;
    constructor(options?: JsonDataSetWriterMessageDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setDataSetMessageContentMask(value: any): JsonDataSetMessageContentMask;
    readonly schema: StructuredTypeSchema;
}
export interface JsonDataSetReaderMessageDataTypeOptions extends DataSetReaderMessageDataTypeOptions {
    networkMessageContentMask?: JsonNetworkMessageContentMask;
    dataSetMessageContentMask?: JsonDataSetMessageContentMask;
}
export declare class JsonDataSetReaderMessageDataType extends DataSetReaderMessageDataType {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    networkMessageContentMask: JsonNetworkMessageContentMask;
    dataSetMessageContentMask: JsonDataSetMessageContentMask;
    constructor(options?: JsonDataSetReaderMessageDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setNetworkMessageContentMask(value: any): JsonNetworkMessageContentMask;
    setDataSetMessageContentMask(value: any): JsonDataSetMessageContentMask;
    readonly schema: StructuredTypeSchema;
}
export interface DatagramConnectionTransportDataTypeOptions extends ConnectionTransportDataTypeOptions {
    discoveryAddress?: (ExtensionObject | null);
}
export declare class DatagramConnectionTransportDataType extends ConnectionTransportDataType {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    discoveryAddress: (ExtensionObject | null);
    constructor(options?: DatagramConnectionTransportDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface DatagramWriterGroupTransportDataTypeOptions extends WriterGroupTransportDataTypeOptions {
    messageRepeatCount?: Byte;
    messageRepeatDelay?: Double;
}
export declare class DatagramWriterGroupTransportDataType extends WriterGroupTransportDataType {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    messageRepeatCount: Byte;
    messageRepeatDelay: Double;
    constructor(options?: DatagramWriterGroupTransportDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface BrokerConnectionTransportDataTypeOptions extends ConnectionTransportDataTypeOptions {
    resourceUri?: UAString;
    authenticationProfileUri?: UAString;
}
export declare class BrokerConnectionTransportDataType extends ConnectionTransportDataType {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    resourceUri: UAString;
    authenticationProfileUri: UAString;
    constructor(options?: BrokerConnectionTransportDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export declare enum BrokerTransportQualityOfService {
    NotSpecified = 0,
    BestEffort = 1,
    AtLeastOnce = 2,
    AtMostOnce = 3,
    ExactlyOnce = 4,
    Invalid = 4294967295
}
export declare const _enumerationBrokerTransportQualityOfService: Enum;
export interface BrokerWriterGroupTransportDataTypeOptions extends WriterGroupTransportDataTypeOptions {
    queueName?: UAString;
    resourceUri?: UAString;
    authenticationProfileUri?: UAString;
    requestedDeliveryGuarantee?: BrokerTransportQualityOfService;
}
export declare class BrokerWriterGroupTransportDataType extends WriterGroupTransportDataType {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    queueName: UAString;
    resourceUri: UAString;
    authenticationProfileUri: UAString;
    requestedDeliveryGuarantee: BrokerTransportQualityOfService;
    constructor(options?: BrokerWriterGroupTransportDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setRequestedDeliveryGuarantee(value: any): BrokerTransportQualityOfService;
    readonly schema: StructuredTypeSchema;
}
export interface BrokerDataSetWriterTransportDataTypeOptions extends DataSetWriterTransportDataTypeOptions {
    queueName?: UAString;
    resourceUri?: UAString;
    authenticationProfileUri?: UAString;
    requestedDeliveryGuarantee?: BrokerTransportQualityOfService;
    metaDataQueueName?: UAString;
    metaDataUpdateTime?: Double;
}
export declare class BrokerDataSetWriterTransportDataType extends DataSetWriterTransportDataType {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    queueName: UAString;
    resourceUri: UAString;
    authenticationProfileUri: UAString;
    requestedDeliveryGuarantee: BrokerTransportQualityOfService;
    metaDataQueueName: UAString;
    metaDataUpdateTime: Double;
    constructor(options?: BrokerDataSetWriterTransportDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setRequestedDeliveryGuarantee(value: any): BrokerTransportQualityOfService;
    readonly schema: StructuredTypeSchema;
}
export interface BrokerDataSetReaderTransportDataTypeOptions extends DataSetReaderTransportDataTypeOptions {
    queueName?: UAString;
    resourceUri?: UAString;
    authenticationProfileUri?: UAString;
    requestedDeliveryGuarantee?: BrokerTransportQualityOfService;
    metaDataQueueName?: UAString;
}
export declare class BrokerDataSetReaderTransportDataType extends DataSetReaderTransportDataType {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    queueName: UAString;
    resourceUri: UAString;
    authenticationProfileUri: UAString;
    requestedDeliveryGuarantee: BrokerTransportQualityOfService;
    metaDataQueueName: UAString;
    constructor(options?: BrokerDataSetReaderTransportDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setRequestedDeliveryGuarantee(value: any): BrokerTransportQualityOfService;
    readonly schema: StructuredTypeSchema;
}
export interface ReferenceNodeOptions {
    referenceTypeId?: (NodeIdLike | null);
    isInverse?: UABoolean;
    targetId?: ExpandedNodeId;
}
export declare class ReferenceNode extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    referenceTypeId: NodeId;
    isInverse: UABoolean;
    targetId: ExpandedNodeId;
    constructor(options?: ReferenceNodeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export declare enum NodeClass {
    Unspecified = 0,
    Object = 1,
    Variable = 2,
    Method = 4,
    ObjectType = 8,
    VariableType = 16,
    ReferenceType = 32,
    DataType = 64,
    View = 128,
    Invalid = 4294967295
}
export declare const _enumerationNodeClass: Enum;
export interface NodeOptions {
    nodeId?: (NodeIdLike | null);
    nodeClass?: NodeClass;
    browseName?: (QualifiedNameLike | null);
    displayName?: (LocalizedTextLike | null);
    description?: (LocalizedTextLike | null);
    writeMask?: UInt32;
    userWriteMask?: UInt32;
    rolePermissions?: RolePermissionTypeOptions[] | null;
    userRolePermissions?: RolePermissionTypeOptions[] | null;
    accessRestrictions?: UInt16;
    references?: ReferenceNodeOptions[] | null;
}
export declare class Node extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    nodeId: NodeId;
    nodeClass: NodeClass;
    browseName: QualifiedName;
    displayName: LocalizedText;
    description: LocalizedText;
    writeMask: UInt32;
    userWriteMask: UInt32;
    rolePermissions: RolePermissionType[] | null;
    userRolePermissions: RolePermissionType[] | null;
    accessRestrictions: UInt16;
    references: ReferenceNode[] | null;
    constructor(options?: NodeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setNodeClass(value: any): NodeClass;
    readonly schema: StructuredTypeSchema;
}
export interface InstanceNodeOptions extends NodeOptions {
    rolePermissions?: RolePermissionTypeOptions[] | null;
    userRolePermissions?: RolePermissionTypeOptions[] | null;
    references?: ReferenceNodeOptions[] | null;
}
export declare class InstanceNode extends Node {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    rolePermissions: RolePermissionType[] | null;
    userRolePermissions: RolePermissionType[] | null;
    references: ReferenceNode[] | null;
    constructor(options?: InstanceNodeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface TypeNodeOptions extends NodeOptions {
    rolePermissions?: RolePermissionTypeOptions[] | null;
    userRolePermissions?: RolePermissionTypeOptions[] | null;
    references?: ReferenceNodeOptions[] | null;
}
export declare class TypeNode extends Node {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    rolePermissions: RolePermissionType[] | null;
    userRolePermissions: RolePermissionType[] | null;
    references: ReferenceNode[] | null;
    constructor(options?: TypeNodeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ObjectNodeOptions extends InstanceNodeOptions {
    rolePermissions?: RolePermissionTypeOptions[] | null;
    userRolePermissions?: RolePermissionTypeOptions[] | null;
    references?: ReferenceNodeOptions[] | null;
    eventNotifier?: Byte;
}
export declare class ObjectNode extends InstanceNode {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    rolePermissions: RolePermissionType[] | null;
    userRolePermissions: RolePermissionType[] | null;
    references: ReferenceNode[] | null;
    eventNotifier: Byte;
    constructor(options?: ObjectNodeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ObjectTypeNodeOptions extends TypeNodeOptions {
    rolePermissions?: RolePermissionTypeOptions[] | null;
    userRolePermissions?: RolePermissionTypeOptions[] | null;
    references?: ReferenceNodeOptions[] | null;
    isAbstract?: UABoolean;
}
export declare class ObjectTypeNode extends TypeNode {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    rolePermissions: RolePermissionType[] | null;
    userRolePermissions: RolePermissionType[] | null;
    references: ReferenceNode[] | null;
    isAbstract: UABoolean;
    constructor(options?: ObjectTypeNodeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface VariableNodeOptions extends InstanceNodeOptions {
    rolePermissions?: RolePermissionTypeOptions[] | null;
    userRolePermissions?: RolePermissionTypeOptions[] | null;
    references?: ReferenceNodeOptions[] | null;
    value?: (VariantLike | null);
    dataType?: (NodeIdLike | null);
    valueRank?: Int32;
    arrayDimensions?: UInt32[] | null;
    accessLevel?: Byte;
    userAccessLevel?: Byte;
    minimumSamplingInterval?: Double;
    historizing?: UABoolean;
    accessLevelEx?: UInt32;
}
export declare class VariableNode extends InstanceNode {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    rolePermissions: RolePermissionType[] | null;
    userRolePermissions: RolePermissionType[] | null;
    references: ReferenceNode[] | null;
    value: Variant;
    dataType: NodeId;
    valueRank: Int32;
    arrayDimensions: UInt32[] | null;
    accessLevel: Byte;
    userAccessLevel: Byte;
    minimumSamplingInterval: Double;
    historizing: UABoolean;
    accessLevelEx: UInt32;
    constructor(options?: VariableNodeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface VariableTypeNodeOptions extends TypeNodeOptions {
    rolePermissions?: RolePermissionTypeOptions[] | null;
    userRolePermissions?: RolePermissionTypeOptions[] | null;
    references?: ReferenceNodeOptions[] | null;
    value?: (VariantLike | null);
    dataType?: (NodeIdLike | null);
    valueRank?: Int32;
    arrayDimensions?: UInt32[] | null;
    isAbstract?: UABoolean;
}
export declare class VariableTypeNode extends TypeNode {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    rolePermissions: RolePermissionType[] | null;
    userRolePermissions: RolePermissionType[] | null;
    references: ReferenceNode[] | null;
    value: Variant;
    dataType: NodeId;
    valueRank: Int32;
    arrayDimensions: UInt32[] | null;
    isAbstract: UABoolean;
    constructor(options?: VariableTypeNodeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ReferenceTypeNodeOptions extends TypeNodeOptions {
    rolePermissions?: RolePermissionTypeOptions[] | null;
    userRolePermissions?: RolePermissionTypeOptions[] | null;
    references?: ReferenceNodeOptions[] | null;
    isAbstract?: UABoolean;
    symmetric?: UABoolean;
    inverseName?: (LocalizedTextLike | null);
}
export declare class ReferenceTypeNode extends TypeNode {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    rolePermissions: RolePermissionType[] | null;
    userRolePermissions: RolePermissionType[] | null;
    references: ReferenceNode[] | null;
    isAbstract: UABoolean;
    symmetric: UABoolean;
    inverseName: LocalizedText;
    constructor(options?: ReferenceTypeNodeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface MethodNodeOptions extends InstanceNodeOptions {
    rolePermissions?: RolePermissionTypeOptions[] | null;
    userRolePermissions?: RolePermissionTypeOptions[] | null;
    references?: ReferenceNodeOptions[] | null;
    executable?: UABoolean;
    userExecutable?: UABoolean;
}
export declare class MethodNode extends InstanceNode {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    rolePermissions: RolePermissionType[] | null;
    userRolePermissions: RolePermissionType[] | null;
    references: ReferenceNode[] | null;
    executable: UABoolean;
    userExecutable: UABoolean;
    constructor(options?: MethodNodeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ViewNodeOptions extends InstanceNodeOptions {
    rolePermissions?: RolePermissionTypeOptions[] | null;
    userRolePermissions?: RolePermissionTypeOptions[] | null;
    references?: ReferenceNodeOptions[] | null;
    containsNoLoops?: UABoolean;
    eventNotifier?: Byte;
}
export declare class ViewNode extends InstanceNode {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    rolePermissions: RolePermissionType[] | null;
    userRolePermissions: RolePermissionType[] | null;
    references: ReferenceNode[] | null;
    containsNoLoops: UABoolean;
    eventNotifier: Byte;
    constructor(options?: ViewNodeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface DataTypeNodeOptions extends TypeNodeOptions {
    rolePermissions?: RolePermissionTypeOptions[] | null;
    userRolePermissions?: RolePermissionTypeOptions[] | null;
    references?: ReferenceNodeOptions[] | null;
    isAbstract?: UABoolean;
    dataTypeDefinition?: (ExtensionObject | null);
}
export declare class DataTypeNode extends TypeNode {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    rolePermissions: RolePermissionType[] | null;
    userRolePermissions: RolePermissionType[] | null;
    references: ReferenceNode[] | null;
    isAbstract: UABoolean;
    dataTypeDefinition: (ExtensionObject | null);
    constructor(options?: DataTypeNodeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ArgumentOptions {
    name?: UAString;
    dataType?: (NodeIdLike | null);
    valueRank?: Int32;
    arrayDimensions?: UInt32[] | null;
    description?: (LocalizedTextLike | null);
}
export declare class Argument extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    name: UAString;
    dataType: NodeId;
    valueRank: Int32;
    arrayDimensions: UInt32[] | null;
    description: LocalizedText;
    constructor(options?: ArgumentOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface OptionSetOptions {
    value?: ByteString;
    validBits?: ByteString;
}
export declare class OptionSet extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    value: ByteString;
    validBits: ByteString;
    constructor(options?: OptionSetOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface UnionOptions {
}
export declare class Union extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    constructor(options?: UnionOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface TimeZoneDataTypeOptions {
    offset?: Int16;
    daylightSavingInOffset?: UABoolean;
}
export declare class TimeZoneDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    offset: Int16;
    daylightSavingInOffset: UABoolean;
    constructor(options?: TimeZoneDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface RequestHeaderOptions {
    authenticationToken?: (NodeIdLike | null);
    timestamp?: DateTime;
    requestHandle?: UInt32;
    returnDiagnostics?: UInt32;
    auditEntryId?: UAString;
    timeoutHint?: UInt32;
    additionalHeader?: (ExtensionObject | null);
}
export declare class RequestHeader extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    authenticationToken: NodeId;
    timestamp: DateTime;
    requestHandle: UInt32;
    returnDiagnostics: UInt32;
    auditEntryId: UAString;
    timeoutHint: UInt32;
    additionalHeader: (ExtensionObject | null);
    constructor(options?: RequestHeaderOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ResponseHeaderOptions {
    timestamp?: DateTime;
    requestHandle?: UInt32;
    serviceResult?: StatusCode;
    serviceDiagnostics?: DiagnosticInfo;
    stringTable?: UAString[] | null;
    additionalHeader?: (ExtensionObject | null);
}
export declare class ResponseHeader extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    timestamp: DateTime;
    requestHandle: UInt32;
    serviceResult: StatusCode;
    serviceDiagnostics: DiagnosticInfo;
    stringTable: UAString[] | null;
    additionalHeader: (ExtensionObject | null);
    constructor(options?: ResponseHeaderOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ServiceFaultOptions {
    responseHeader?: ResponseHeaderOptions;
}
export declare class ServiceFault extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    constructor(options?: ServiceFaultOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface SessionlessInvokeRequestTypeOptions {
    urisVersion?: UInt32[] | null;
    namespaceUris?: UAString[] | null;
    serverUris?: UAString[] | null;
    localeIds?: UAString[] | null;
    serviceId?: UInt32;
}
export declare class SessionlessInvokeRequestType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    urisVersion: UInt32[] | null;
    namespaceUris: UAString[] | null;
    serverUris: UAString[] | null;
    localeIds: UAString[] | null;
    serviceId: UInt32;
    constructor(options?: SessionlessInvokeRequestTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface SessionlessInvokeResponseTypeOptions {
    namespaceUris?: UAString[] | null;
    serverUris?: UAString[] | null;
    serviceId?: UInt32;
}
export declare class SessionlessInvokeResponseType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    namespaceUris: UAString[] | null;
    serverUris: UAString[] | null;
    serviceId: UInt32;
    constructor(options?: SessionlessInvokeResponseTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface FindServersRequestOptions {
    requestHeader?: RequestHeaderOptions;
    endpointUrl?: UAString;
    localeIds?: UAString[] | null;
    serverUris?: UAString[] | null;
}
export declare class FindServersRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    endpointUrl: UAString;
    localeIds: UAString[] | null;
    serverUris: UAString[] | null;
    constructor(options?: FindServersRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface FindServersResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    servers?: ApplicationDescriptionOptions[] | null;
}
export declare class FindServersResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    servers: ApplicationDescription[] | null;
    constructor(options?: FindServersResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ServerOnNetworkOptions {
    recordId?: UInt32;
    serverName?: UAString;
    discoveryUrl?: UAString;
    serverCapabilities?: UAString[] | null;
}
export declare class ServerOnNetwork extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    recordId: UInt32;
    serverName: UAString;
    discoveryUrl: UAString;
    serverCapabilities: UAString[] | null;
    constructor(options?: ServerOnNetworkOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface FindServersOnNetworkRequestOptions {
    requestHeader?: RequestHeaderOptions;
    startingRecordId?: UInt32;
    maxRecordsToReturn?: UInt32;
    serverCapabilityFilter?: UAString[] | null;
}
export declare class FindServersOnNetworkRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    startingRecordId: UInt32;
    maxRecordsToReturn: UInt32;
    serverCapabilityFilter: UAString[] | null;
    constructor(options?: FindServersOnNetworkRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface FindServersOnNetworkResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    lastCounterResetTime?: DateTime;
    servers?: ServerOnNetworkOptions[] | null;
}
export declare class FindServersOnNetworkResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    lastCounterResetTime: DateTime;
    servers: ServerOnNetwork[] | null;
    constructor(options?: FindServersOnNetworkResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface GetEndpointsRequestOptions {
    requestHeader?: RequestHeaderOptions;
    endpointUrl?: UAString;
    localeIds?: UAString[] | null;
    profileUris?: UAString[] | null;
}
export declare class GetEndpointsRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    endpointUrl: UAString;
    localeIds: UAString[] | null;
    profileUris: UAString[] | null;
    constructor(options?: GetEndpointsRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface GetEndpointsResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    endpoints?: EndpointDescriptionOptions[] | null;
}
export declare class GetEndpointsResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    endpoints: EndpointDescription[] | null;
    constructor(options?: GetEndpointsResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface RegisteredServerOptions {
    serverUri?: UAString;
    productUri?: UAString;
    serverNames?: (LocalizedTextLike | null)[] | null;
    serverType?: ApplicationType;
    gatewayServerUri?: UAString;
    discoveryUrls?: UAString[] | null;
    semaphoreFilePath?: UAString;
    isOnline?: UABoolean;
}
export declare class RegisteredServer extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    serverUri: UAString;
    productUri: UAString;
    serverNames: LocalizedText[] | null;
    serverType: ApplicationType;
    gatewayServerUri: UAString;
    discoveryUrls: UAString[] | null;
    semaphoreFilePath: UAString;
    isOnline: UABoolean;
    constructor(options?: RegisteredServerOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setServerType(value: any): ApplicationType;
    readonly schema: StructuredTypeSchema;
}
export interface RegisterServerRequestOptions {
    requestHeader?: RequestHeaderOptions;
    server?: RegisteredServerOptions;
}
export declare class RegisterServerRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    server: RegisteredServer;
    constructor(options?: RegisterServerRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface RegisterServerResponseOptions {
    responseHeader?: ResponseHeaderOptions;
}
export declare class RegisterServerResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    constructor(options?: RegisterServerResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface DiscoveryConfigurationOptions {
}
export declare class DiscoveryConfiguration extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    constructor(options?: DiscoveryConfigurationOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface MdnsDiscoveryConfigurationOptions extends DiscoveryConfigurationOptions {
    mdnsServerName?: UAString;
    serverCapabilities?: UAString[] | null;
}
export declare class MdnsDiscoveryConfiguration extends DiscoveryConfiguration {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    mdnsServerName: UAString;
    serverCapabilities: UAString[] | null;
    constructor(options?: MdnsDiscoveryConfigurationOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface RegisterServer2RequestOptions {
    requestHeader?: RequestHeaderOptions;
    server?: RegisteredServerOptions;
    discoveryConfiguration?: (ExtensionObject | null)[] | null;
}
export declare class RegisterServer2Request extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    server: RegisteredServer;
    discoveryConfiguration: (ExtensionObject | null)[] | null;
    constructor(options?: RegisterServer2RequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface RegisterServer2ResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    configurationResults?: StatusCode[] | null;
    diagnosticInfos?: DiagnosticInfo[] | null;
}
export declare class RegisterServer2Response extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    configurationResults: StatusCode[] | null;
    diagnosticInfos: DiagnosticInfo[] | null;
    constructor(options?: RegisterServer2ResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ChannelSecurityTokenOptions {
    channelId?: UInt32;
    tokenId?: UInt32;
    createdAt?: DateTime;
    revisedLifetime?: UInt32;
}
export declare class ChannelSecurityToken extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    channelId: UInt32;
    tokenId: UInt32;
    createdAt: DateTime;
    revisedLifetime: UInt32;
    constructor(options?: ChannelSecurityTokenOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export declare enum SecurityTokenRequestType {
    Issue = 0,
    Renew = 1,
    Invalid = 4294967295
}
export declare const _enumerationSecurityTokenRequestType: Enum;
export interface OpenSecureChannelRequestOptions {
    requestHeader?: RequestHeaderOptions;
    clientProtocolVersion?: UInt32;
    requestType?: SecurityTokenRequestType;
    securityMode?: MessageSecurityMode;
    clientNonce?: ByteString;
    requestedLifetime?: UInt32;
}
export declare class OpenSecureChannelRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    clientProtocolVersion: UInt32;
    requestType: SecurityTokenRequestType;
    securityMode: MessageSecurityMode;
    clientNonce: ByteString;
    requestedLifetime: UInt32;
    constructor(options?: OpenSecureChannelRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setRequestType(value: any): SecurityTokenRequestType;
    setSecurityMode(value: any): MessageSecurityMode;
    readonly schema: StructuredTypeSchema;
}
export interface OpenSecureChannelResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    serverProtocolVersion?: UInt32;
    securityToken?: ChannelSecurityTokenOptions;
    serverNonce?: ByteString;
}
export declare class OpenSecureChannelResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    serverProtocolVersion: UInt32;
    securityToken: ChannelSecurityToken;
    serverNonce: ByteString;
    constructor(options?: OpenSecureChannelResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface CloseSecureChannelRequestOptions {
    requestHeader?: RequestHeaderOptions;
}
export declare class CloseSecureChannelRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    constructor(options?: CloseSecureChannelRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface CloseSecureChannelResponseOptions {
    responseHeader?: ResponseHeaderOptions;
}
export declare class CloseSecureChannelResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    constructor(options?: CloseSecureChannelResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface SignedSoftwareCertificateOptions {
    certificateData?: ByteString;
    signature?: ByteString;
}
export declare class SignedSoftwareCertificate extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    certificateData: ByteString;
    signature: ByteString;
    constructor(options?: SignedSoftwareCertificateOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface SignatureDataOptions {
    algorithm?: UAString;
    signature?: ByteString;
}
export declare class SignatureData extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    algorithm: UAString;
    signature: ByteString;
    constructor(options?: SignatureDataOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface CreateSessionRequestOptions {
    requestHeader?: RequestHeaderOptions;
    clientDescription?: ApplicationDescriptionOptions;
    serverUri?: UAString;
    endpointUrl?: UAString;
    sessionName?: UAString;
    clientNonce?: ByteString;
    clientCertificate?: ByteString;
    requestedSessionTimeout?: Double;
    maxResponseMessageSize?: UInt32;
}
export declare class CreateSessionRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    clientDescription: ApplicationDescription;
    serverUri: UAString;
    endpointUrl: UAString;
    sessionName: UAString;
    clientNonce: ByteString;
    clientCertificate: ByteString;
    requestedSessionTimeout: Double;
    maxResponseMessageSize: UInt32;
    constructor(options?: CreateSessionRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface CreateSessionResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    sessionId?: (NodeIdLike | null);
    authenticationToken?: (NodeIdLike | null);
    revisedSessionTimeout?: Double;
    serverNonce?: ByteString;
    serverCertificate?: ByteString;
    serverEndpoints?: EndpointDescriptionOptions[] | null;
    serverSoftwareCertificates?: SignedSoftwareCertificateOptions[] | null;
    serverSignature?: SignatureDataOptions;
    maxRequestMessageSize?: UInt32;
}
export declare class CreateSessionResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    sessionId: NodeId;
    authenticationToken: NodeId;
    revisedSessionTimeout: Double;
    serverNonce: ByteString;
    serverCertificate: ByteString;
    serverEndpoints: EndpointDescription[] | null;
    serverSoftwareCertificates: SignedSoftwareCertificate[] | null;
    serverSignature: SignatureData;
    maxRequestMessageSize: UInt32;
    constructor(options?: CreateSessionResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface UserIdentityTokenOptions {
    policyId?: UAString;
}
export declare class UserIdentityToken extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    policyId: UAString;
    constructor(options?: UserIdentityTokenOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface AnonymousIdentityTokenOptions extends UserIdentityTokenOptions {
}
export declare class AnonymousIdentityToken extends UserIdentityToken {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    constructor(options?: AnonymousIdentityTokenOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface UserNameIdentityTokenOptions extends UserIdentityTokenOptions {
    userName?: UAString;
    password?: ByteString;
    encryptionAlgorithm?: UAString;
}
export declare class UserNameIdentityToken extends UserIdentityToken {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    userName: UAString;
    password: ByteString;
    encryptionAlgorithm: UAString;
    constructor(options?: UserNameIdentityTokenOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface X509IdentityTokenOptions extends UserIdentityTokenOptions {
    certificateData?: ByteString;
}
export declare class X509IdentityToken extends UserIdentityToken {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    certificateData: ByteString;
    constructor(options?: X509IdentityTokenOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface IssuedIdentityTokenOptions extends UserIdentityTokenOptions {
    tokenData?: ByteString;
    encryptionAlgorithm?: UAString;
}
export declare class IssuedIdentityToken extends UserIdentityToken {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    tokenData: ByteString;
    encryptionAlgorithm: UAString;
    constructor(options?: IssuedIdentityTokenOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ActivateSessionRequestOptions {
    requestHeader?: RequestHeaderOptions;
    clientSignature?: SignatureDataOptions;
    clientSoftwareCertificates?: SignedSoftwareCertificateOptions[] | null;
    localeIds?: UAString[] | null;
    userIdentityToken?: (ExtensionObject | null);
    userTokenSignature?: SignatureDataOptions;
}
export declare class ActivateSessionRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    clientSignature: SignatureData;
    clientSoftwareCertificates: SignedSoftwareCertificate[] | null;
    localeIds: UAString[] | null;
    userIdentityToken: (ExtensionObject | null);
    userTokenSignature: SignatureData;
    constructor(options?: ActivateSessionRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ActivateSessionResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    serverNonce?: ByteString;
    results?: StatusCode[] | null;
    diagnosticInfos?: DiagnosticInfo[] | null;
}
export declare class ActivateSessionResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    serverNonce: ByteString;
    results: StatusCode[] | null;
    diagnosticInfos: DiagnosticInfo[] | null;
    constructor(options?: ActivateSessionResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface CloseSessionRequestOptions {
    requestHeader?: RequestHeaderOptions;
    deleteSubscriptions?: UABoolean;
}
export declare class CloseSessionRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    deleteSubscriptions: UABoolean;
    constructor(options?: CloseSessionRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface CloseSessionResponseOptions {
    responseHeader?: ResponseHeaderOptions;
}
export declare class CloseSessionResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    constructor(options?: CloseSessionResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface CancelRequestOptions {
    requestHeader?: RequestHeaderOptions;
    requestHandle?: UInt32;
}
export declare class CancelRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    requestHandle: UInt32;
    constructor(options?: CancelRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface CancelResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    cancelCount?: UInt32;
}
export declare class CancelResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    cancelCount: UInt32;
    constructor(options?: CancelResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface NodeAttributesOptions {
    specifiedAttributes?: UInt32;
    displayName?: (LocalizedTextLike | null);
    description?: (LocalizedTextLike | null);
    writeMask?: UInt32;
    userWriteMask?: UInt32;
}
export declare class NodeAttributes extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    specifiedAttributes: UInt32;
    displayName: LocalizedText;
    description: LocalizedText;
    writeMask: UInt32;
    userWriteMask: UInt32;
    constructor(options?: NodeAttributesOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ObjectAttributesOptions extends NodeAttributesOptions {
    eventNotifier?: Byte;
}
export declare class ObjectAttributes extends NodeAttributes {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    eventNotifier: Byte;
    constructor(options?: ObjectAttributesOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface VariableAttributesOptions extends NodeAttributesOptions {
    value?: (VariantLike | null);
    dataType?: (NodeIdLike | null);
    valueRank?: Int32;
    arrayDimensions?: UInt32[] | null;
    accessLevel?: Byte;
    userAccessLevel?: Byte;
    minimumSamplingInterval?: Double;
    historizing?: UABoolean;
}
export declare class VariableAttributes extends NodeAttributes {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    value: Variant;
    dataType: NodeId;
    valueRank: Int32;
    arrayDimensions: UInt32[] | null;
    accessLevel: Byte;
    userAccessLevel: Byte;
    minimumSamplingInterval: Double;
    historizing: UABoolean;
    constructor(options?: VariableAttributesOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface MethodAttributesOptions extends NodeAttributesOptions {
    executable?: UABoolean;
    userExecutable?: UABoolean;
}
export declare class MethodAttributes extends NodeAttributes {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    executable: UABoolean;
    userExecutable: UABoolean;
    constructor(options?: MethodAttributesOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ObjectTypeAttributesOptions extends NodeAttributesOptions {
    isAbstract?: UABoolean;
}
export declare class ObjectTypeAttributes extends NodeAttributes {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    isAbstract: UABoolean;
    constructor(options?: ObjectTypeAttributesOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface VariableTypeAttributesOptions extends NodeAttributesOptions {
    value?: (VariantLike | null);
    dataType?: (NodeIdLike | null);
    valueRank?: Int32;
    arrayDimensions?: UInt32[] | null;
    isAbstract?: UABoolean;
}
export declare class VariableTypeAttributes extends NodeAttributes {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    value: Variant;
    dataType: NodeId;
    valueRank: Int32;
    arrayDimensions: UInt32[] | null;
    isAbstract: UABoolean;
    constructor(options?: VariableTypeAttributesOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ReferenceTypeAttributesOptions extends NodeAttributesOptions {
    isAbstract?: UABoolean;
    symmetric?: UABoolean;
    inverseName?: (LocalizedTextLike | null);
}
export declare class ReferenceTypeAttributes extends NodeAttributes {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    isAbstract: UABoolean;
    symmetric: UABoolean;
    inverseName: LocalizedText;
    constructor(options?: ReferenceTypeAttributesOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface DataTypeAttributesOptions extends NodeAttributesOptions {
    isAbstract?: UABoolean;
}
export declare class DataTypeAttributes extends NodeAttributes {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    isAbstract: UABoolean;
    constructor(options?: DataTypeAttributesOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ViewAttributesOptions extends NodeAttributesOptions {
    containsNoLoops?: UABoolean;
    eventNotifier?: Byte;
}
export declare class ViewAttributes extends NodeAttributes {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    containsNoLoops: UABoolean;
    eventNotifier: Byte;
    constructor(options?: ViewAttributesOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface GenericAttributeValueOptions {
    attributeId?: UInt32;
    value?: (VariantLike | null);
}
export declare class GenericAttributeValue extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    attributeId: UInt32;
    value: Variant;
    constructor(options?: GenericAttributeValueOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface GenericAttributesOptions extends NodeAttributesOptions {
    attributeValues?: GenericAttributeValueOptions[] | null;
}
export declare class GenericAttributes extends NodeAttributes {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    attributeValues: GenericAttributeValue[] | null;
    constructor(options?: GenericAttributesOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface AddNodesItemOptions {
    parentNodeId?: ExpandedNodeId;
    referenceTypeId?: (NodeIdLike | null);
    requestedNewNodeId?: ExpandedNodeId;
    browseName?: (QualifiedNameLike | null);
    nodeClass?: NodeClass;
    nodeAttributes?: (ExtensionObject | null);
    typeDefinition?: ExpandedNodeId;
}
export declare class AddNodesItem extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    parentNodeId: ExpandedNodeId;
    referenceTypeId: NodeId;
    requestedNewNodeId: ExpandedNodeId;
    browseName: QualifiedName;
    nodeClass: NodeClass;
    nodeAttributes: (ExtensionObject | null);
    typeDefinition: ExpandedNodeId;
    constructor(options?: AddNodesItemOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setNodeClass(value: any): NodeClass;
    readonly schema: StructuredTypeSchema;
}
export interface AddNodesResultOptions {
    statusCode?: StatusCode;
    addedNodeId?: (NodeIdLike | null);
}
export declare class AddNodesResult extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    statusCode: StatusCode;
    addedNodeId: NodeId;
    constructor(options?: AddNodesResultOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface AddNodesRequestOptions {
    requestHeader?: RequestHeaderOptions;
    nodesToAdd?: AddNodesItemOptions[] | null;
}
export declare class AddNodesRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    nodesToAdd: AddNodesItem[] | null;
    constructor(options?: AddNodesRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface AddNodesResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    results?: AddNodesResultOptions[] | null;
    diagnosticInfos?: DiagnosticInfo[] | null;
}
export declare class AddNodesResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    results: AddNodesResult[] | null;
    diagnosticInfos: DiagnosticInfo[] | null;
    constructor(options?: AddNodesResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface AddReferencesItemOptions {
    sourceNodeId?: (NodeIdLike | null);
    referenceTypeId?: (NodeIdLike | null);
    isForward?: UABoolean;
    targetServerUri?: UAString;
    targetNodeId?: ExpandedNodeId;
    targetNodeClass?: NodeClass;
}
export declare class AddReferencesItem extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    sourceNodeId: NodeId;
    referenceTypeId: NodeId;
    isForward: UABoolean;
    targetServerUri: UAString;
    targetNodeId: ExpandedNodeId;
    targetNodeClass: NodeClass;
    constructor(options?: AddReferencesItemOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setTargetNodeClass(value: any): NodeClass;
    readonly schema: StructuredTypeSchema;
}
export interface AddReferencesRequestOptions {
    requestHeader?: RequestHeaderOptions;
    referencesToAdd?: AddReferencesItemOptions[] | null;
}
export declare class AddReferencesRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    referencesToAdd: AddReferencesItem[] | null;
    constructor(options?: AddReferencesRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface AddReferencesResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    results?: StatusCode[] | null;
    diagnosticInfos?: DiagnosticInfo[] | null;
}
export declare class AddReferencesResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    results: StatusCode[] | null;
    diagnosticInfos: DiagnosticInfo[] | null;
    constructor(options?: AddReferencesResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface DeleteNodesItemOptions {
    nodeId?: (NodeIdLike | null);
    deleteTargetReferences?: UABoolean;
}
export declare class DeleteNodesItem extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    nodeId: NodeId;
    deleteTargetReferences: UABoolean;
    constructor(options?: DeleteNodesItemOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface DeleteNodesRequestOptions {
    requestHeader?: RequestHeaderOptions;
    nodesToDelete?: DeleteNodesItemOptions[] | null;
}
export declare class DeleteNodesRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    nodesToDelete: DeleteNodesItem[] | null;
    constructor(options?: DeleteNodesRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface DeleteNodesResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    results?: StatusCode[] | null;
    diagnosticInfos?: DiagnosticInfo[] | null;
}
export declare class DeleteNodesResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    results: StatusCode[] | null;
    diagnosticInfos: DiagnosticInfo[] | null;
    constructor(options?: DeleteNodesResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface DeleteReferencesItemOptions {
    sourceNodeId?: (NodeIdLike | null);
    referenceTypeId?: (NodeIdLike | null);
    isForward?: UABoolean;
    targetNodeId?: ExpandedNodeId;
    deleteBidirectional?: UABoolean;
}
export declare class DeleteReferencesItem extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    sourceNodeId: NodeId;
    referenceTypeId: NodeId;
    isForward: UABoolean;
    targetNodeId: ExpandedNodeId;
    deleteBidirectional: UABoolean;
    constructor(options?: DeleteReferencesItemOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface DeleteReferencesRequestOptions {
    requestHeader?: RequestHeaderOptions;
    referencesToDelete?: DeleteReferencesItemOptions[] | null;
}
export declare class DeleteReferencesRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    referencesToDelete: DeleteReferencesItem[] | null;
    constructor(options?: DeleteReferencesRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface DeleteReferencesResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    results?: StatusCode[] | null;
    diagnosticInfos?: DiagnosticInfo[] | null;
}
export declare class DeleteReferencesResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    results: StatusCode[] | null;
    diagnosticInfos: DiagnosticInfo[] | null;
    constructor(options?: DeleteReferencesResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ViewDescriptionOptions {
    viewId?: (NodeIdLike | null);
    timestamp?: DateTime;
    viewVersion?: UInt32;
}
export declare class ViewDescription extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    viewId: NodeId;
    timestamp: DateTime;
    viewVersion: UInt32;
    constructor(options?: ViewDescriptionOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface BrowseDescriptionOptions {
    nodeId?: (NodeIdLike | null);
    browseDirection?: BrowseDirection;
    referenceTypeId?: (NodeIdLike | null);
    includeSubtypes?: UABoolean;
    nodeClassMask?: UInt32;
    resultMask?: UInt32;
}
export declare class BrowseDescription extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    nodeId: NodeId;
    browseDirection: BrowseDirection;
    referenceTypeId: NodeId;
    includeSubtypes: UABoolean;
    nodeClassMask: UInt32;
    resultMask: UInt32;
    constructor(options?: BrowseDescriptionOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setBrowseDirection(value: any): BrowseDirection;
    readonly schema: StructuredTypeSchema;
}
export interface ReferenceDescriptionOptions {
    referenceTypeId?: (NodeIdLike | null);
    isForward?: UABoolean;
    nodeId?: ExpandedNodeId;
    browseName?: (QualifiedNameLike | null);
    displayName?: (LocalizedTextLike | null);
    nodeClass?: NodeClass;
    typeDefinition?: ExpandedNodeId;
}
export declare class ReferenceDescription extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    referenceTypeId: NodeId;
    isForward: UABoolean;
    nodeId: ExpandedNodeId;
    browseName: QualifiedName;
    displayName: LocalizedText;
    nodeClass: NodeClass;
    typeDefinition: ExpandedNodeId;
    constructor(options?: ReferenceDescriptionOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setNodeClass(value: any): NodeClass;
    readonly schema: StructuredTypeSchema;
}
export interface BrowseResultOptions {
    statusCode?: StatusCode;
    continuationPoint?: ByteString;
    references?: ReferenceDescriptionOptions[] | null;
}
export declare class BrowseResult extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    statusCode: StatusCode;
    continuationPoint: ByteString;
    references: ReferenceDescription[] | null;
    constructor(options?: BrowseResultOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface BrowseRequestOptions {
    requestHeader?: RequestHeaderOptions;
    view?: ViewDescriptionOptions;
    requestedMaxReferencesPerNode?: UInt32;
    nodesToBrowse?: BrowseDescriptionOptions[] | null;
}
export declare class BrowseRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    view: ViewDescription;
    requestedMaxReferencesPerNode: UInt32;
    nodesToBrowse: BrowseDescription[] | null;
    constructor(options?: BrowseRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface BrowseResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    results?: BrowseResultOptions[] | null;
    diagnosticInfos?: DiagnosticInfo[] | null;
}
export declare class BrowseResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    results: BrowseResult[] | null;
    diagnosticInfos: DiagnosticInfo[] | null;
    constructor(options?: BrowseResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface BrowseNextRequestOptions {
    requestHeader?: RequestHeaderOptions;
    releaseContinuationPoints?: UABoolean;
    continuationPoints?: ByteString[] | null;
}
export declare class BrowseNextRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    releaseContinuationPoints: UABoolean;
    continuationPoints: ByteString[] | null;
    constructor(options?: BrowseNextRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface BrowseNextResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    results?: BrowseResultOptions[] | null;
    diagnosticInfos?: DiagnosticInfo[] | null;
}
export declare class BrowseNextResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    results: BrowseResult[] | null;
    diagnosticInfos: DiagnosticInfo[] | null;
    constructor(options?: BrowseNextResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface RelativePathElementOptions {
    referenceTypeId?: (NodeIdLike | null);
    isInverse?: UABoolean;
    includeSubtypes?: UABoolean;
    targetName?: (QualifiedNameLike | null);
}
export declare class RelativePathElement extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    referenceTypeId: NodeId;
    isInverse: UABoolean;
    includeSubtypes: UABoolean;
    targetName: QualifiedName;
    constructor(options?: RelativePathElementOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface RelativePathOptions {
    elements?: RelativePathElementOptions[] | null;
}
export declare class RelativePath extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    elements: RelativePathElement[] | null;
    constructor(options?: RelativePathOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface BrowsePathOptions {
    startingNode?: (NodeIdLike | null);
    relativePath?: RelativePathOptions;
}
export declare class BrowsePath extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    startingNode: NodeId;
    relativePath: RelativePath;
    constructor(options?: BrowsePathOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface BrowsePathTargetOptions {
    targetId?: ExpandedNodeId;
    remainingPathIndex?: UInt32;
}
export declare class BrowsePathTarget extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    targetId: ExpandedNodeId;
    remainingPathIndex: UInt32;
    constructor(options?: BrowsePathTargetOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface BrowsePathResultOptions {
    statusCode?: StatusCode;
    targets?: BrowsePathTargetOptions[] | null;
}
export declare class BrowsePathResult extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    statusCode: StatusCode;
    targets: BrowsePathTarget[] | null;
    constructor(options?: BrowsePathResultOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface TranslateBrowsePathsToNodeIdsRequestOptions {
    requestHeader?: RequestHeaderOptions;
    browsePaths?: BrowsePathOptions[] | null;
}
export declare class TranslateBrowsePathsToNodeIdsRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    browsePaths: BrowsePath[] | null;
    constructor(options?: TranslateBrowsePathsToNodeIdsRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface TranslateBrowsePathsToNodeIdsResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    results?: BrowsePathResultOptions[] | null;
    diagnosticInfos?: DiagnosticInfo[] | null;
}
export declare class TranslateBrowsePathsToNodeIdsResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    results: BrowsePathResult[] | null;
    diagnosticInfos: DiagnosticInfo[] | null;
    constructor(options?: TranslateBrowsePathsToNodeIdsResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface RegisterNodesRequestOptions {
    requestHeader?: RequestHeaderOptions;
    nodesToRegister?: (NodeIdLike | null)[] | null;
}
export declare class RegisterNodesRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    nodesToRegister: NodeId[] | null;
    constructor(options?: RegisterNodesRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface RegisterNodesResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    registeredNodeIds?: (NodeIdLike | null)[] | null;
}
export declare class RegisterNodesResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    registeredNodeIds: NodeId[] | null;
    constructor(options?: RegisterNodesResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface UnregisterNodesRequestOptions {
    requestHeader?: RequestHeaderOptions;
    nodesToUnregister?: (NodeIdLike | null)[] | null;
}
export declare class UnregisterNodesRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    nodesToUnregister: NodeId[] | null;
    constructor(options?: UnregisterNodesRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface UnregisterNodesResponseOptions {
    responseHeader?: ResponseHeaderOptions;
}
export declare class UnregisterNodesResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    constructor(options?: UnregisterNodesResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface EndpointConfigurationOptions {
    operationTimeout?: Int32;
    useBinaryEncoding?: UABoolean;
    maxStringLength?: Int32;
    maxByteStringLength?: Int32;
    maxArrayLength?: Int32;
    maxMessageSize?: Int32;
    maxBufferSize?: Int32;
    channelLifetime?: Int32;
    securityTokenLifetime?: Int32;
}
export declare class EndpointConfiguration extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    operationTimeout: Int32;
    useBinaryEncoding: UABoolean;
    maxStringLength: Int32;
    maxByteStringLength: Int32;
    maxArrayLength: Int32;
    maxMessageSize: Int32;
    maxBufferSize: Int32;
    channelLifetime: Int32;
    securityTokenLifetime: Int32;
    constructor(options?: EndpointConfigurationOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface QueryDataDescriptionOptions {
    relativePath?: RelativePathOptions;
    attributeId?: UInt32;
    indexRange?: NumericRange;
}
export declare class QueryDataDescription extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    relativePath: RelativePath;
    attributeId: UInt32;
    indexRange: NumericRange;
    constructor(options?: QueryDataDescriptionOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface NodeTypeDescriptionOptions {
    typeDefinitionNode?: ExpandedNodeId;
    includeSubTypes?: UABoolean;
    dataToReturn?: QueryDataDescriptionOptions[] | null;
}
export declare class NodeTypeDescription extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    typeDefinitionNode: ExpandedNodeId;
    includeSubTypes: UABoolean;
    dataToReturn: QueryDataDescription[] | null;
    constructor(options?: NodeTypeDescriptionOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface QueryDataSetOptions {
    nodeId?: ExpandedNodeId;
    typeDefinitionNode?: ExpandedNodeId;
    values?: (VariantLike | null)[] | null;
}
export declare class QueryDataSet extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    nodeId: ExpandedNodeId;
    typeDefinitionNode: ExpandedNodeId;
    values: Variant[] | null;
    constructor(options?: QueryDataSetOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface NodeReferenceOptions {
    nodeId?: (NodeIdLike | null);
    referenceTypeId?: (NodeIdLike | null);
    isForward?: UABoolean;
    referencedNodeIds?: (NodeIdLike | null)[] | null;
}
export declare class NodeReference extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    nodeId: NodeId;
    referenceTypeId: NodeId;
    isForward: UABoolean;
    referencedNodeIds: NodeId[] | null;
    constructor(options?: NodeReferenceOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ElementOperandOptions extends FilterOperandOptions {
    index?: UInt32;
}
export declare class ElementOperand extends FilterOperand {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    index: UInt32;
    constructor(options?: ElementOperandOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface LiteralOperandOptions extends FilterOperandOptions {
    value?: (VariantLike | null);
}
export declare class LiteralOperand extends FilterOperand {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    value: Variant;
    constructor(options?: LiteralOperandOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface AttributeOperandOptions extends FilterOperandOptions {
    nodeId?: (NodeIdLike | null);
    alias?: UAString;
    browsePath?: RelativePathOptions;
    attributeId?: UInt32;
    indexRange?: NumericRange;
}
export declare class AttributeOperand extends FilterOperand {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    nodeId: NodeId;
    alias: UAString;
    browsePath: RelativePath;
    attributeId: UInt32;
    indexRange: NumericRange;
    constructor(options?: AttributeOperandOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ContentFilterElementResultOptions {
    statusCode?: StatusCode;
    operandStatusCodes?: StatusCode[] | null;
    operandDiagnosticInfos?: DiagnosticInfo[] | null;
}
export declare class ContentFilterElementResult extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    statusCode: StatusCode;
    operandStatusCodes: StatusCode[] | null;
    operandDiagnosticInfos: DiagnosticInfo[] | null;
    constructor(options?: ContentFilterElementResultOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ContentFilterResultOptions {
    elementResults?: ContentFilterElementResultOptions[] | null;
    elementDiagnosticInfos?: DiagnosticInfo[] | null;
}
export declare class ContentFilterResult extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    elementResults: ContentFilterElementResult[] | null;
    elementDiagnosticInfos: DiagnosticInfo[] | null;
    constructor(options?: ContentFilterResultOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ParsingResultOptions {
    statusCode?: StatusCode;
    dataStatusCodes?: StatusCode[] | null;
    dataDiagnosticInfos?: DiagnosticInfo[] | null;
}
export declare class ParsingResult extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    statusCode: StatusCode;
    dataStatusCodes: StatusCode[] | null;
    dataDiagnosticInfos: DiagnosticInfo[] | null;
    constructor(options?: ParsingResultOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface QueryFirstRequestOptions {
    requestHeader?: RequestHeaderOptions;
    view?: ViewDescriptionOptions;
    nodeTypes?: NodeTypeDescriptionOptions[] | null;
    filter?: ContentFilterOptions;
    maxDataSetsToReturn?: UInt32;
    maxReferencesToReturn?: UInt32;
}
export declare class QueryFirstRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    view: ViewDescription;
    nodeTypes: NodeTypeDescription[] | null;
    filter: ContentFilter;
    maxDataSetsToReturn: UInt32;
    maxReferencesToReturn: UInt32;
    constructor(options?: QueryFirstRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface QueryFirstResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    queryDataSets?: QueryDataSetOptions[] | null;
    continuationPoint?: ByteString;
    parsingResults?: ParsingResultOptions[] | null;
    diagnosticInfos?: DiagnosticInfo[] | null;
    filterResult?: ContentFilterResultOptions;
}
export declare class QueryFirstResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    queryDataSets: QueryDataSet[] | null;
    continuationPoint: ByteString;
    parsingResults: ParsingResult[] | null;
    diagnosticInfos: DiagnosticInfo[] | null;
    filterResult: ContentFilterResult;
    constructor(options?: QueryFirstResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface QueryNextRequestOptions {
    requestHeader?: RequestHeaderOptions;
    releaseContinuationPoint?: UABoolean;
    continuationPoint?: ByteString;
}
export declare class QueryNextRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    releaseContinuationPoint: UABoolean;
    continuationPoint: ByteString;
    constructor(options?: QueryNextRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface QueryNextResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    queryDataSets?: QueryDataSetOptions[] | null;
    revisedContinuationPoint?: ByteString;
}
export declare class QueryNextResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    queryDataSets: QueryDataSet[] | null;
    revisedContinuationPoint: ByteString;
    constructor(options?: QueryNextResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ReadValueIdOptions {
    nodeId?: (NodeIdLike | null);
    attributeId?: UInt32;
    indexRange?: NumericRange;
    dataEncoding?: (QualifiedNameLike | null);
}
export declare class ReadValueId extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    nodeId: NodeId;
    attributeId: UInt32;
    indexRange: NumericRange;
    dataEncoding: QualifiedName;
    constructor(options?: ReadValueIdOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ReadRequestOptions {
    requestHeader?: RequestHeaderOptions;
    maxAge?: Double;
    timestampsToReturn?: TimestampsToReturn;
    nodesToRead?: ReadValueIdOptions[] | null;
}
export declare class ReadRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    maxAge: Double;
    timestampsToReturn: TimestampsToReturn;
    nodesToRead: ReadValueId[] | null;
    constructor(options?: ReadRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setTimestampsToReturn(value: any): TimestampsToReturn;
    readonly schema: StructuredTypeSchema;
}
export interface ReadResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    results?: (DataValueLike | null)[] | null;
    diagnosticInfos?: DiagnosticInfo[] | null;
}
export declare class ReadResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    results: DataValue[] | null;
    diagnosticInfos: DiagnosticInfo[] | null;
    constructor(options?: ReadResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface HistoryReadValueIdOptions {
    nodeId?: (NodeIdLike | null);
    indexRange?: NumericRange;
    dataEncoding?: (QualifiedNameLike | null);
    continuationPoint?: ByteString;
}
export declare class HistoryReadValueId extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    nodeId: NodeId;
    indexRange: NumericRange;
    dataEncoding: QualifiedName;
    continuationPoint: ByteString;
    constructor(options?: HistoryReadValueIdOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface HistoryReadResultOptions {
    statusCode?: StatusCode;
    continuationPoint?: ByteString;
    historyData?: (ExtensionObject | null);
}
export declare class HistoryReadResult extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    statusCode: StatusCode;
    continuationPoint: ByteString;
    historyData: (ExtensionObject | null);
    constructor(options?: HistoryReadResultOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface HistoryReadDetailsOptions {
}
export declare class HistoryReadDetails extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    constructor(options?: HistoryReadDetailsOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface MonitoringFilterOptions {
}
export declare class MonitoringFilter extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    constructor(options?: MonitoringFilterOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface EventFilterOptions extends MonitoringFilterOptions {
    selectClauses?: SimpleAttributeOperandOptions[] | null;
    whereClause?: ContentFilterOptions;
}
export declare class EventFilter extends MonitoringFilter {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    selectClauses: SimpleAttributeOperand[] | null;
    whereClause: ContentFilter;
    constructor(options?: EventFilterOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ReadEventDetailsOptions extends HistoryReadDetailsOptions {
    numValuesPerNode?: UInt32;
    startTime?: DateTime;
    endTime?: DateTime;
    filter?: EventFilterOptions;
}
export declare class ReadEventDetails extends HistoryReadDetails {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    numValuesPerNode: UInt32;
    startTime: DateTime;
    endTime: DateTime;
    filter: EventFilter;
    constructor(options?: ReadEventDetailsOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ReadRawModifiedDetailsOptions extends HistoryReadDetailsOptions {
    isReadModified?: UABoolean;
    startTime?: DateTime;
    endTime?: DateTime;
    numValuesPerNode?: UInt32;
    returnBounds?: UABoolean;
}
export declare class ReadRawModifiedDetails extends HistoryReadDetails {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    isReadModified: UABoolean;
    startTime: DateTime;
    endTime: DateTime;
    numValuesPerNode: UInt32;
    returnBounds: UABoolean;
    constructor(options?: ReadRawModifiedDetailsOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface AggregateConfigurationOptions {
    useServerCapabilitiesDefaults?: UABoolean;
    treatUncertainAsBad?: UABoolean;
    percentDataBad?: Byte;
    percentDataGood?: Byte;
    useSlopedExtrapolation?: UABoolean;
}
export declare class AggregateConfiguration extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    useServerCapabilitiesDefaults: UABoolean;
    treatUncertainAsBad: UABoolean;
    percentDataBad: Byte;
    percentDataGood: Byte;
    useSlopedExtrapolation: UABoolean;
    constructor(options?: AggregateConfigurationOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ReadProcessedDetailsOptions extends HistoryReadDetailsOptions {
    startTime?: DateTime;
    endTime?: DateTime;
    processingInterval?: Double;
    aggregateType?: (NodeIdLike | null)[] | null;
    aggregateConfiguration?: AggregateConfigurationOptions;
}
export declare class ReadProcessedDetails extends HistoryReadDetails {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    startTime: DateTime;
    endTime: DateTime;
    processingInterval: Double;
    aggregateType: NodeId[] | null;
    aggregateConfiguration: AggregateConfiguration;
    constructor(options?: ReadProcessedDetailsOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ReadAtTimeDetailsOptions extends HistoryReadDetailsOptions {
    reqTimes?: DateTime[] | null;
    useSimpleBounds?: UABoolean;
}
export declare class ReadAtTimeDetails extends HistoryReadDetails {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    reqTimes: DateTime[] | null;
    useSimpleBounds: UABoolean;
    constructor(options?: ReadAtTimeDetailsOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface HistoryDataOptions {
    dataValues?: (DataValueLike | null)[] | null;
}
export declare class HistoryData extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    dataValues: DataValue[] | null;
    constructor(options?: HistoryDataOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export declare enum HistoryUpdateType {
    Insert = 1,
    Replace = 2,
    Update = 3,
    Delete = 4,
    Invalid = 4294967295
}
export declare const _enumerationHistoryUpdateType: Enum;
export interface ModificationInfoOptions {
    modificationTime?: DateTime;
    updateType?: HistoryUpdateType;
    userName?: UAString;
}
export declare class ModificationInfo extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    modificationTime: DateTime;
    updateType: HistoryUpdateType;
    userName: UAString;
    constructor(options?: ModificationInfoOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setUpdateType(value: any): HistoryUpdateType;
    readonly schema: StructuredTypeSchema;
}
export interface HistoryModifiedDataOptions extends HistoryDataOptions {
    dataValues?: (DataValueLike | null)[] | null;
    modificationInfos?: ModificationInfoOptions[] | null;
}
export declare class HistoryModifiedData extends HistoryData {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    dataValues: DataValue[] | null;
    modificationInfos: ModificationInfo[] | null;
    constructor(options?: HistoryModifiedDataOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface HistoryEventFieldListOptions {
    eventFields?: (VariantLike | null)[] | null;
}
export declare class HistoryEventFieldList extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    eventFields: Variant[] | null;
    constructor(options?: HistoryEventFieldListOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface HistoryEventOptions {
    events?: HistoryEventFieldListOptions[] | null;
}
export declare class HistoryEvent extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    events: HistoryEventFieldList[] | null;
    constructor(options?: HistoryEventOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface HistoryReadRequestOptions {
    requestHeader?: RequestHeaderOptions;
    historyReadDetails?: (ExtensionObject | null);
    timestampsToReturn?: TimestampsToReturn;
    releaseContinuationPoints?: UABoolean;
    nodesToRead?: HistoryReadValueIdOptions[] | null;
}
export declare class HistoryReadRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    historyReadDetails: (ExtensionObject | null);
    timestampsToReturn: TimestampsToReturn;
    releaseContinuationPoints: UABoolean;
    nodesToRead: HistoryReadValueId[] | null;
    constructor(options?: HistoryReadRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setTimestampsToReturn(value: any): TimestampsToReturn;
    readonly schema: StructuredTypeSchema;
}
export interface HistoryReadResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    results?: HistoryReadResultOptions[] | null;
    diagnosticInfos?: DiagnosticInfo[] | null;
}
export declare class HistoryReadResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    results: HistoryReadResult[] | null;
    diagnosticInfos: DiagnosticInfo[] | null;
    constructor(options?: HistoryReadResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface WriteValueOptions {
    nodeId?: (NodeIdLike | null);
    attributeId?: UInt32;
    indexRange?: NumericRange;
    value?: (DataValueLike | null);
}
export declare class WriteValue extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    nodeId: NodeId;
    attributeId: UInt32;
    indexRange: NumericRange;
    value: DataValue;
    constructor(options?: WriteValueOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface WriteRequestOptions {
    requestHeader?: RequestHeaderOptions;
    nodesToWrite?: WriteValueOptions[] | null;
}
export declare class WriteRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    nodesToWrite: WriteValue[] | null;
    constructor(options?: WriteRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface WriteResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    results?: StatusCode[] | null;
    diagnosticInfos?: DiagnosticInfo[] | null;
}
export declare class WriteResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    results: StatusCode[] | null;
    diagnosticInfos: DiagnosticInfo[] | null;
    constructor(options?: WriteResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface HistoryUpdateDetailsOptions {
    nodeId?: (NodeIdLike | null);
}
export declare class HistoryUpdateDetails extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    nodeId: NodeId;
    constructor(options?: HistoryUpdateDetailsOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export declare enum PerformUpdateType {
    Insert = 1,
    Replace = 2,
    Update = 3,
    Remove = 4,
    Invalid = 4294967295
}
export declare const _enumerationPerformUpdateType: Enum;
export interface UpdateDataDetailsOptions extends HistoryUpdateDetailsOptions {
    performInsertReplace?: PerformUpdateType;
    updateValues?: (DataValueLike | null)[] | null;
}
export declare class UpdateDataDetails extends HistoryUpdateDetails {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    performInsertReplace: PerformUpdateType;
    updateValues: DataValue[] | null;
    constructor(options?: UpdateDataDetailsOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setPerformInsertReplace(value: any): PerformUpdateType;
    readonly schema: StructuredTypeSchema;
}
export interface UpdateStructureDataDetailsOptions extends HistoryUpdateDetailsOptions {
    performInsertReplace?: PerformUpdateType;
    updateValues?: (DataValueLike | null)[] | null;
}
export declare class UpdateStructureDataDetails extends HistoryUpdateDetails {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    performInsertReplace: PerformUpdateType;
    updateValues: DataValue[] | null;
    constructor(options?: UpdateStructureDataDetailsOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setPerformInsertReplace(value: any): PerformUpdateType;
    readonly schema: StructuredTypeSchema;
}
export interface UpdateEventDetailsOptions extends HistoryUpdateDetailsOptions {
    performInsertReplace?: PerformUpdateType;
    filter?: EventFilterOptions;
    eventData?: HistoryEventFieldListOptions[] | null;
}
export declare class UpdateEventDetails extends HistoryUpdateDetails {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    performInsertReplace: PerformUpdateType;
    filter: EventFilter;
    eventData: HistoryEventFieldList[] | null;
    constructor(options?: UpdateEventDetailsOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setPerformInsertReplace(value: any): PerformUpdateType;
    readonly schema: StructuredTypeSchema;
}
export interface DeleteRawModifiedDetailsOptions extends HistoryUpdateDetailsOptions {
    isDeleteModified?: UABoolean;
    startTime?: DateTime;
    endTime?: DateTime;
}
export declare class DeleteRawModifiedDetails extends HistoryUpdateDetails {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    isDeleteModified: UABoolean;
    startTime: DateTime;
    endTime: DateTime;
    constructor(options?: DeleteRawModifiedDetailsOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface DeleteAtTimeDetailsOptions extends HistoryUpdateDetailsOptions {
    reqTimes?: DateTime[] | null;
}
export declare class DeleteAtTimeDetails extends HistoryUpdateDetails {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    reqTimes: DateTime[] | null;
    constructor(options?: DeleteAtTimeDetailsOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface DeleteEventDetailsOptions extends HistoryUpdateDetailsOptions {
    eventIds?: ByteString[] | null;
}
export declare class DeleteEventDetails extends HistoryUpdateDetails {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    eventIds: ByteString[] | null;
    constructor(options?: DeleteEventDetailsOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface HistoryUpdateResultOptions {
    statusCode?: StatusCode;
    operationResults?: StatusCode[] | null;
    diagnosticInfos?: DiagnosticInfo[] | null;
}
export declare class HistoryUpdateResult extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    statusCode: StatusCode;
    operationResults: StatusCode[] | null;
    diagnosticInfos: DiagnosticInfo[] | null;
    constructor(options?: HistoryUpdateResultOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface HistoryUpdateRequestOptions {
    requestHeader?: RequestHeaderOptions;
    historyUpdateDetails?: (ExtensionObject | null)[] | null;
}
export declare class HistoryUpdateRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    historyUpdateDetails: (ExtensionObject | null)[] | null;
    constructor(options?: HistoryUpdateRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface HistoryUpdateResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    results?: HistoryUpdateResultOptions[] | null;
    diagnosticInfos?: DiagnosticInfo[] | null;
}
export declare class HistoryUpdateResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    results: HistoryUpdateResult[] | null;
    diagnosticInfos: DiagnosticInfo[] | null;
    constructor(options?: HistoryUpdateResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface CallMethodRequestOptions {
    objectId?: (NodeIdLike | null);
    methodId?: (NodeIdLike | null);
    inputArguments?: (VariantLike | null)[] | null;
}
export declare class CallMethodRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    objectId: NodeId;
    methodId: NodeId;
    inputArguments: Variant[] | null;
    constructor(options?: CallMethodRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface CallMethodResultOptions {
    statusCode?: StatusCode;
    inputArgumentResults?: StatusCode[] | null;
    inputArgumentDiagnosticInfos?: DiagnosticInfo[] | null;
    outputArguments?: (VariantLike | null)[] | null;
}
export declare class CallMethodResult extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    statusCode: StatusCode;
    inputArgumentResults: StatusCode[] | null;
    inputArgumentDiagnosticInfos: DiagnosticInfo[] | null;
    outputArguments: Variant[] | null;
    constructor(options?: CallMethodResultOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface CallRequestOptions {
    requestHeader?: RequestHeaderOptions;
    methodsToCall?: CallMethodRequestOptions[] | null;
}
export declare class CallRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    methodsToCall: CallMethodRequest[] | null;
    constructor(options?: CallRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface CallResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    results?: CallMethodResultOptions[] | null;
    diagnosticInfos?: DiagnosticInfo[] | null;
}
export declare class CallResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    results: CallMethodResult[] | null;
    diagnosticInfos: DiagnosticInfo[] | null;
    constructor(options?: CallResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export declare enum DataChangeTrigger {
    Status = 0,
    StatusValue = 1,
    StatusValueTimestamp = 2,
    Invalid = 4294967295
}
export declare const _enumerationDataChangeTrigger: Enum;
export interface DataChangeFilterOptions extends MonitoringFilterOptions {
    trigger?: DataChangeTrigger;
    deadbandType?: UInt32;
    deadbandValue?: Double;
}
export declare class DataChangeFilter extends MonitoringFilter {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    trigger: DataChangeTrigger;
    deadbandType: UInt32;
    deadbandValue: Double;
    constructor(options?: DataChangeFilterOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setTrigger(value: any): DataChangeTrigger;
    readonly schema: StructuredTypeSchema;
}
export interface ThreeSpaceSampleDataTypeOptions {
    x?: Double;
    y?: Double;
    z?: Double;
}
export declare class ThreeSpaceSampleDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    x: Double;
    y: Double;
    z: Double;
    constructor(options?: ThreeSpaceSampleDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface AggregateFilterOptions extends MonitoringFilterOptions {
    startTime?: DateTime;
    aggregateType?: (NodeIdLike | null);
    processingInterval?: Double;
    aggregateConfiguration?: AggregateConfigurationOptions;
}
export declare class AggregateFilter extends MonitoringFilter {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    startTime: DateTime;
    aggregateType: NodeId;
    processingInterval: Double;
    aggregateConfiguration: AggregateConfiguration;
    constructor(options?: AggregateFilterOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface MonitoringFilterResultOptions {
}
export declare class MonitoringFilterResult extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    constructor(options?: MonitoringFilterResultOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface EventFilterResultOptions extends MonitoringFilterResultOptions {
    selectClauseResults?: StatusCode[] | null;
    selectClauseDiagnosticInfos?: DiagnosticInfo[] | null;
    whereClauseResult?: ContentFilterResultOptions;
}
export declare class EventFilterResult extends MonitoringFilterResult {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    selectClauseResults: StatusCode[] | null;
    selectClauseDiagnosticInfos: DiagnosticInfo[] | null;
    whereClauseResult: ContentFilterResult;
    constructor(options?: EventFilterResultOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface AggregateFilterResultOptions extends MonitoringFilterResultOptions {
    revisedStartTime?: DateTime;
    revisedProcessingInterval?: Double;
    revisedAggregateConfiguration?: AggregateConfigurationOptions;
}
export declare class AggregateFilterResult extends MonitoringFilterResult {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    revisedStartTime: DateTime;
    revisedProcessingInterval: Double;
    revisedAggregateConfiguration: AggregateConfiguration;
    constructor(options?: AggregateFilterResultOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface MonitoringParametersOptions {
    clientHandle?: UInt32;
    samplingInterval?: Double;
    filter?: (ExtensionObject | null);
    queueSize?: UInt32;
    discardOldest?: UABoolean;
}
export declare class MonitoringParameters extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    clientHandle: UInt32;
    samplingInterval: Double;
    filter: (ExtensionObject | null);
    queueSize: UInt32;
    discardOldest: UABoolean;
    constructor(options?: MonitoringParametersOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export declare enum MonitoringMode {
    Disabled = 0,
    Sampling = 1,
    Reporting = 2,
    Invalid = 4294967295
}
export declare const _enumerationMonitoringMode: Enum;
export interface MonitoredItemCreateRequestOptions {
    itemToMonitor?: ReadValueIdOptions;
    monitoringMode?: MonitoringMode;
    requestedParameters?: MonitoringParametersOptions;
}
export declare class MonitoredItemCreateRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    itemToMonitor: ReadValueId;
    monitoringMode: MonitoringMode;
    requestedParameters: MonitoringParameters;
    constructor(options?: MonitoredItemCreateRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setMonitoringMode(value: any): MonitoringMode;
    readonly schema: StructuredTypeSchema;
}
export interface MonitoredItemCreateResultOptions {
    statusCode?: StatusCode;
    monitoredItemId?: UInt32;
    revisedSamplingInterval?: Double;
    revisedQueueSize?: UInt32;
    filterResult?: (ExtensionObject | null);
}
export declare class MonitoredItemCreateResult extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    statusCode: StatusCode;
    monitoredItemId: UInt32;
    revisedSamplingInterval: Double;
    revisedQueueSize: UInt32;
    filterResult: (ExtensionObject | null);
    constructor(options?: MonitoredItemCreateResultOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface CreateMonitoredItemsRequestOptions {
    requestHeader?: RequestHeaderOptions;
    subscriptionId?: UInt32;
    timestampsToReturn?: TimestampsToReturn;
    itemsToCreate?: MonitoredItemCreateRequestOptions[] | null;
}
export declare class CreateMonitoredItemsRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    subscriptionId: UInt32;
    timestampsToReturn: TimestampsToReturn;
    itemsToCreate: MonitoredItemCreateRequest[] | null;
    constructor(options?: CreateMonitoredItemsRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setTimestampsToReturn(value: any): TimestampsToReturn;
    readonly schema: StructuredTypeSchema;
}
export interface CreateMonitoredItemsResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    results?: MonitoredItemCreateResultOptions[] | null;
    diagnosticInfos?: DiagnosticInfo[] | null;
}
export declare class CreateMonitoredItemsResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    results: MonitoredItemCreateResult[] | null;
    diagnosticInfos: DiagnosticInfo[] | null;
    constructor(options?: CreateMonitoredItemsResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface MonitoredItemModifyRequestOptions {
    monitoredItemId?: UInt32;
    requestedParameters?: MonitoringParametersOptions;
}
export declare class MonitoredItemModifyRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    monitoredItemId: UInt32;
    requestedParameters: MonitoringParameters;
    constructor(options?: MonitoredItemModifyRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface MonitoredItemModifyResultOptions {
    statusCode?: StatusCode;
    revisedSamplingInterval?: Double;
    revisedQueueSize?: UInt32;
    filterResult?: (ExtensionObject | null);
}
export declare class MonitoredItemModifyResult extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    statusCode: StatusCode;
    revisedSamplingInterval: Double;
    revisedQueueSize: UInt32;
    filterResult: (ExtensionObject | null);
    constructor(options?: MonitoredItemModifyResultOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ModifyMonitoredItemsRequestOptions {
    requestHeader?: RequestHeaderOptions;
    subscriptionId?: UInt32;
    timestampsToReturn?: TimestampsToReturn;
    itemsToModify?: MonitoredItemModifyRequestOptions[] | null;
}
export declare class ModifyMonitoredItemsRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    subscriptionId: UInt32;
    timestampsToReturn: TimestampsToReturn;
    itemsToModify: MonitoredItemModifyRequest[] | null;
    constructor(options?: ModifyMonitoredItemsRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setTimestampsToReturn(value: any): TimestampsToReturn;
    readonly schema: StructuredTypeSchema;
}
export interface ModifyMonitoredItemsResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    results?: MonitoredItemModifyResultOptions[] | null;
    diagnosticInfos?: DiagnosticInfo[] | null;
}
export declare class ModifyMonitoredItemsResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    results: MonitoredItemModifyResult[] | null;
    diagnosticInfos: DiagnosticInfo[] | null;
    constructor(options?: ModifyMonitoredItemsResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface SetMonitoringModeRequestOptions {
    requestHeader?: RequestHeaderOptions;
    subscriptionId?: UInt32;
    monitoringMode?: MonitoringMode;
    monitoredItemIds?: UInt32[] | null;
}
export declare class SetMonitoringModeRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    subscriptionId: UInt32;
    monitoringMode: MonitoringMode;
    monitoredItemIds: UInt32[] | null;
    constructor(options?: SetMonitoringModeRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setMonitoringMode(value: any): MonitoringMode;
    readonly schema: StructuredTypeSchema;
}
export interface SetMonitoringModeResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    results?: StatusCode[] | null;
    diagnosticInfos?: DiagnosticInfo[] | null;
}
export declare class SetMonitoringModeResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    results: StatusCode[] | null;
    diagnosticInfos: DiagnosticInfo[] | null;
    constructor(options?: SetMonitoringModeResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface SetTriggeringRequestOptions {
    requestHeader?: RequestHeaderOptions;
    subscriptionId?: UInt32;
    triggeringItemId?: UInt32;
    linksToAdd?: UInt32[] | null;
    linksToRemove?: UInt32[] | null;
}
export declare class SetTriggeringRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    subscriptionId: UInt32;
    triggeringItemId: UInt32;
    linksToAdd: UInt32[] | null;
    linksToRemove: UInt32[] | null;
    constructor(options?: SetTriggeringRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface SetTriggeringResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    addResults?: StatusCode[] | null;
    addDiagnosticInfos?: DiagnosticInfo[] | null;
    removeResults?: StatusCode[] | null;
    removeDiagnosticInfos?: DiagnosticInfo[] | null;
}
export declare class SetTriggeringResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    addResults: StatusCode[] | null;
    addDiagnosticInfos: DiagnosticInfo[] | null;
    removeResults: StatusCode[] | null;
    removeDiagnosticInfos: DiagnosticInfo[] | null;
    constructor(options?: SetTriggeringResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface DeleteMonitoredItemsRequestOptions {
    requestHeader?: RequestHeaderOptions;
    subscriptionId?: UInt32;
    monitoredItemIds?: UInt32[] | null;
}
export declare class DeleteMonitoredItemsRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    subscriptionId: UInt32;
    monitoredItemIds: UInt32[] | null;
    constructor(options?: DeleteMonitoredItemsRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface DeleteMonitoredItemsResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    results?: StatusCode[] | null;
    diagnosticInfos?: DiagnosticInfo[] | null;
}
export declare class DeleteMonitoredItemsResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    results: StatusCode[] | null;
    diagnosticInfos: DiagnosticInfo[] | null;
    constructor(options?: DeleteMonitoredItemsResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface CreateSubscriptionRequestOptions {
    requestHeader?: RequestHeaderOptions;
    requestedPublishingInterval?: Double;
    requestedLifetimeCount?: UInt32;
    requestedMaxKeepAliveCount?: UInt32;
    maxNotificationsPerPublish?: UInt32;
    publishingEnabled?: UABoolean;
    priority?: Byte;
}
export declare class CreateSubscriptionRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    requestedPublishingInterval: Double;
    requestedLifetimeCount: UInt32;
    requestedMaxKeepAliveCount: UInt32;
    maxNotificationsPerPublish: UInt32;
    publishingEnabled: UABoolean;
    priority: Byte;
    constructor(options?: CreateSubscriptionRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface CreateSubscriptionResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    subscriptionId?: UInt32;
    revisedPublishingInterval?: Double;
    revisedLifetimeCount?: UInt32;
    revisedMaxKeepAliveCount?: UInt32;
}
export declare class CreateSubscriptionResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    subscriptionId: UInt32;
    revisedPublishingInterval: Double;
    revisedLifetimeCount: UInt32;
    revisedMaxKeepAliveCount: UInt32;
    constructor(options?: CreateSubscriptionResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ModifySubscriptionRequestOptions {
    requestHeader?: RequestHeaderOptions;
    subscriptionId?: UInt32;
    requestedPublishingInterval?: Double;
    requestedLifetimeCount?: UInt32;
    requestedMaxKeepAliveCount?: UInt32;
    maxNotificationsPerPublish?: UInt32;
    priority?: Byte;
}
export declare class ModifySubscriptionRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    subscriptionId: UInt32;
    requestedPublishingInterval: Double;
    requestedLifetimeCount: UInt32;
    requestedMaxKeepAliveCount: UInt32;
    maxNotificationsPerPublish: UInt32;
    priority: Byte;
    constructor(options?: ModifySubscriptionRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ModifySubscriptionResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    revisedPublishingInterval?: Double;
    revisedLifetimeCount?: UInt32;
    revisedMaxKeepAliveCount?: UInt32;
}
export declare class ModifySubscriptionResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    revisedPublishingInterval: Double;
    revisedLifetimeCount: UInt32;
    revisedMaxKeepAliveCount: UInt32;
    constructor(options?: ModifySubscriptionResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface SetPublishingModeRequestOptions {
    requestHeader?: RequestHeaderOptions;
    publishingEnabled?: UABoolean;
    subscriptionIds?: UInt32[] | null;
}
export declare class SetPublishingModeRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    publishingEnabled: UABoolean;
    subscriptionIds: UInt32[] | null;
    constructor(options?: SetPublishingModeRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface SetPublishingModeResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    results?: StatusCode[] | null;
    diagnosticInfos?: DiagnosticInfo[] | null;
}
export declare class SetPublishingModeResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    results: StatusCode[] | null;
    diagnosticInfos: DiagnosticInfo[] | null;
    constructor(options?: SetPublishingModeResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface NotificationMessageOptions {
    sequenceNumber?: UInt32;
    publishTime?: DateTime;
    notificationData?: (ExtensionObject | null)[] | null;
}
export declare class NotificationMessage extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    sequenceNumber: UInt32;
    publishTime: DateTime;
    notificationData: (ExtensionObject | null)[] | null;
    constructor(options?: NotificationMessageOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface NotificationDataOptions {
}
export declare class NotificationData extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    constructor(options?: NotificationDataOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface MonitoredItemNotificationOptions {
    clientHandle?: UInt32;
    value?: (DataValueLike | null);
}
export declare class MonitoredItemNotification extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    clientHandle: UInt32;
    value: DataValue;
    constructor(options?: MonitoredItemNotificationOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface DataChangeNotificationOptions extends NotificationDataOptions {
    monitoredItems?: MonitoredItemNotificationOptions[] | null;
    diagnosticInfos?: DiagnosticInfo[] | null;
}
export declare class DataChangeNotification extends NotificationData {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    monitoredItems: MonitoredItemNotification[] | null;
    diagnosticInfos: DiagnosticInfo[] | null;
    constructor(options?: DataChangeNotificationOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface EventFieldListOptions {
    clientHandle?: UInt32;
    eventFields?: (VariantLike | null)[] | null;
}
export declare class EventFieldList extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    clientHandle: UInt32;
    eventFields: Variant[] | null;
    constructor(options?: EventFieldListOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface EventNotificationListOptions extends NotificationDataOptions {
    events?: EventFieldListOptions[] | null;
}
export declare class EventNotificationList extends NotificationData {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    events: EventFieldList[] | null;
    constructor(options?: EventNotificationListOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface StatusChangeNotificationOptions extends NotificationDataOptions {
    status?: StatusCode;
    diagnosticInfo?: DiagnosticInfo;
}
export declare class StatusChangeNotification extends NotificationData {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    status: StatusCode;
    diagnosticInfo: DiagnosticInfo;
    constructor(options?: StatusChangeNotificationOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface SubscriptionAcknowledgementOptions {
    subscriptionId?: UInt32;
    sequenceNumber?: UInt32;
}
export declare class SubscriptionAcknowledgement extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    subscriptionId: UInt32;
    sequenceNumber: UInt32;
    constructor(options?: SubscriptionAcknowledgementOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface PublishRequestOptions {
    requestHeader?: RequestHeaderOptions;
    subscriptionAcknowledgements?: SubscriptionAcknowledgementOptions[] | null;
}
export declare class PublishRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    subscriptionAcknowledgements: SubscriptionAcknowledgement[] | null;
    constructor(options?: PublishRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface PublishResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    subscriptionId?: UInt32;
    availableSequenceNumbers?: UInt32[] | null;
    moreNotifications?: UABoolean;
    notificationMessage?: NotificationMessageOptions;
    results?: StatusCode[] | null;
    diagnosticInfos?: DiagnosticInfo[] | null;
}
export declare class PublishResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    subscriptionId: UInt32;
    availableSequenceNumbers: UInt32[] | null;
    moreNotifications: UABoolean;
    notificationMessage: NotificationMessage;
    results: StatusCode[] | null;
    diagnosticInfos: DiagnosticInfo[] | null;
    constructor(options?: PublishResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface RepublishRequestOptions {
    requestHeader?: RequestHeaderOptions;
    subscriptionId?: UInt32;
    retransmitSequenceNumber?: UInt32;
}
export declare class RepublishRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    subscriptionId: UInt32;
    retransmitSequenceNumber: UInt32;
    constructor(options?: RepublishRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface RepublishResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    notificationMessage?: NotificationMessageOptions;
}
export declare class RepublishResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    notificationMessage: NotificationMessage;
    constructor(options?: RepublishResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface TransferResultOptions {
    statusCode?: StatusCode;
    availableSequenceNumbers?: UInt32[] | null;
}
export declare class TransferResult extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    statusCode: StatusCode;
    availableSequenceNumbers: UInt32[] | null;
    constructor(options?: TransferResultOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface TransferSubscriptionsRequestOptions {
    requestHeader?: RequestHeaderOptions;
    subscriptionIds?: UInt32[] | null;
    sendInitialValues?: UABoolean;
}
export declare class TransferSubscriptionsRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    subscriptionIds: UInt32[] | null;
    sendInitialValues: UABoolean;
    constructor(options?: TransferSubscriptionsRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface TransferSubscriptionsResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    results?: TransferResultOptions[] | null;
    diagnosticInfos?: DiagnosticInfo[] | null;
}
export declare class TransferSubscriptionsResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    results: TransferResult[] | null;
    diagnosticInfos: DiagnosticInfo[] | null;
    constructor(options?: TransferSubscriptionsResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface DeleteSubscriptionsRequestOptions {
    requestHeader?: RequestHeaderOptions;
    subscriptionIds?: UInt32[] | null;
}
export declare class DeleteSubscriptionsRequest extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    requestHeader: RequestHeader;
    subscriptionIds: UInt32[] | null;
    constructor(options?: DeleteSubscriptionsRequestOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface DeleteSubscriptionsResponseOptions {
    responseHeader?: ResponseHeaderOptions;
    results?: StatusCode[] | null;
    diagnosticInfos?: DiagnosticInfo[] | null;
}
export declare class DeleteSubscriptionsResponse extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    responseHeader: ResponseHeader;
    results: StatusCode[] | null;
    diagnosticInfos: DiagnosticInfo[] | null;
    constructor(options?: DeleteSubscriptionsResponseOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface BuildInfoOptions {
    productUri?: UAString;
    manufacturerName?: UAString;
    productName?: UAString;
    softwareVersion?: UAString;
    buildNumber?: UAString;
    buildDate?: DateTime;
}
export declare class BuildInfo extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    productUri: UAString;
    manufacturerName: UAString;
    productName: UAString;
    softwareVersion: UAString;
    buildNumber: UAString;
    buildDate: DateTime;
    constructor(options?: BuildInfoOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export declare enum ServerState {
    Running = 0,
    Failed = 1,
    NoConfiguration = 2,
    Suspended = 3,
    Shutdown = 4,
    Test = 5,
    CommunicationFault = 6,
    Unknown = 7,
    Invalid = 4294967295
}
export declare const _enumerationServerState: Enum;
export interface RedundantServerDataTypeOptions {
    serverId?: UAString;
    serviceLevel?: Byte;
    serverState?: ServerState;
}
export declare class RedundantServerDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    serverId: UAString;
    serviceLevel: Byte;
    serverState: ServerState;
    constructor(options?: RedundantServerDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setServerState(value: any): ServerState;
    readonly schema: StructuredTypeSchema;
}
export interface EndpointUrlListDataTypeOptions {
    endpointUrlList?: UAString[] | null;
}
export declare class EndpointUrlListDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    endpointUrlList: UAString[] | null;
    constructor(options?: EndpointUrlListDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface NetworkGroupDataTypeOptions {
    serverUri?: UAString;
    networkPaths?: EndpointUrlListDataTypeOptions[] | null;
}
export declare class NetworkGroupDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    serverUri: UAString;
    networkPaths: EndpointUrlListDataType[] | null;
    constructor(options?: NetworkGroupDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface SamplingIntervalDiagnosticsDataTypeOptions {
    samplingInterval?: Double;
    monitoredItemCount?: UInt32;
    maxMonitoredItemCount?: UInt32;
    disabledMonitoredItemCount?: UInt32;
}
export declare class SamplingIntervalDiagnosticsDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    samplingInterval: Double;
    monitoredItemCount: UInt32;
    maxMonitoredItemCount: UInt32;
    disabledMonitoredItemCount: UInt32;
    constructor(options?: SamplingIntervalDiagnosticsDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ServerDiagnosticsSummaryDataTypeOptions {
    serverViewCount?: UInt32;
    currentSessionCount?: UInt32;
    cumulatedSessionCount?: UInt32;
    securityRejectedSessionCount?: UInt32;
    rejectedSessionCount?: UInt32;
    sessionTimeoutCount?: UInt32;
    sessionAbortCount?: UInt32;
    currentSubscriptionCount?: UInt32;
    cumulatedSubscriptionCount?: UInt32;
    publishingIntervalCount?: UInt32;
    securityRejectedRequestsCount?: UInt32;
    rejectedRequestsCount?: UInt32;
}
export declare class ServerDiagnosticsSummaryDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    serverViewCount: UInt32;
    currentSessionCount: UInt32;
    cumulatedSessionCount: UInt32;
    securityRejectedSessionCount: UInt32;
    rejectedSessionCount: UInt32;
    sessionTimeoutCount: UInt32;
    sessionAbortCount: UInt32;
    currentSubscriptionCount: UInt32;
    cumulatedSubscriptionCount: UInt32;
    publishingIntervalCount: UInt32;
    securityRejectedRequestsCount: UInt32;
    rejectedRequestsCount: UInt32;
    constructor(options?: ServerDiagnosticsSummaryDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ServerStatusDataTypeOptions {
    startTime?: DateTime;
    currentTime?: DateTime;
    state?: ServerState;
    buildInfo?: BuildInfoOptions;
    secondsTillShutdown?: UInt32;
    shutdownReason?: (LocalizedTextLike | null);
}
export declare class ServerStatusDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    startTime: DateTime;
    currentTime: DateTime;
    state: ServerState;
    buildInfo: BuildInfo;
    secondsTillShutdown: UInt32;
    shutdownReason: LocalizedText;
    constructor(options?: ServerStatusDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setState(value: any): ServerState;
    readonly schema: StructuredTypeSchema;
}
export interface ServiceCounterDataTypeOptions {
    totalCount?: UInt32;
    errorCount?: UInt32;
}
export declare class ServiceCounterDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    totalCount: UInt32;
    errorCount: UInt32;
    constructor(options?: ServiceCounterDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface SessionDiagnosticsDataTypeOptions {
    sessionId?: (NodeIdLike | null);
    sessionName?: UAString;
    clientDescription?: ApplicationDescriptionOptions;
    serverUri?: UAString;
    endpointUrl?: UAString;
    localeIds?: UAString[] | null;
    actualSessionTimeout?: Double;
    maxResponseMessageSize?: UInt32;
    clientConnectionTime?: DateTime;
    clientLastContactTime?: DateTime;
    currentSubscriptionsCount?: UInt32;
    currentMonitoredItemsCount?: UInt32;
    currentPublishRequestsInQueue?: UInt32;
    totalRequestCount?: ServiceCounterDataTypeOptions;
    unauthorizedRequestCount?: UInt32;
    readCount?: ServiceCounterDataTypeOptions;
    historyReadCount?: ServiceCounterDataTypeOptions;
    writeCount?: ServiceCounterDataTypeOptions;
    historyUpdateCount?: ServiceCounterDataTypeOptions;
    callCount?: ServiceCounterDataTypeOptions;
    createMonitoredItemsCount?: ServiceCounterDataTypeOptions;
    modifyMonitoredItemsCount?: ServiceCounterDataTypeOptions;
    setMonitoringModeCount?: ServiceCounterDataTypeOptions;
    setTriggeringCount?: ServiceCounterDataTypeOptions;
    deleteMonitoredItemsCount?: ServiceCounterDataTypeOptions;
    createSubscriptionCount?: ServiceCounterDataTypeOptions;
    modifySubscriptionCount?: ServiceCounterDataTypeOptions;
    setPublishingModeCount?: ServiceCounterDataTypeOptions;
    publishCount?: ServiceCounterDataTypeOptions;
    republishCount?: ServiceCounterDataTypeOptions;
    transferSubscriptionsCount?: ServiceCounterDataTypeOptions;
    deleteSubscriptionsCount?: ServiceCounterDataTypeOptions;
    addNodesCount?: ServiceCounterDataTypeOptions;
    addReferencesCount?: ServiceCounterDataTypeOptions;
    deleteNodesCount?: ServiceCounterDataTypeOptions;
    deleteReferencesCount?: ServiceCounterDataTypeOptions;
    browseCount?: ServiceCounterDataTypeOptions;
    browseNextCount?: ServiceCounterDataTypeOptions;
    translateBrowsePathsToNodeIdsCount?: ServiceCounterDataTypeOptions;
    queryFirstCount?: ServiceCounterDataTypeOptions;
    queryNextCount?: ServiceCounterDataTypeOptions;
    registerNodesCount?: ServiceCounterDataTypeOptions;
    unregisterNodesCount?: ServiceCounterDataTypeOptions;
}
export declare class SessionDiagnosticsDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    sessionId: NodeId;
    sessionName: UAString;
    clientDescription: ApplicationDescription;
    serverUri: UAString;
    endpointUrl: UAString;
    localeIds: UAString[] | null;
    actualSessionTimeout: Double;
    maxResponseMessageSize: UInt32;
    clientConnectionTime: DateTime;
    clientLastContactTime: DateTime;
    currentSubscriptionsCount: UInt32;
    currentMonitoredItemsCount: UInt32;
    currentPublishRequestsInQueue: UInt32;
    totalRequestCount: ServiceCounterDataType;
    unauthorizedRequestCount: UInt32;
    readCount: ServiceCounterDataType;
    historyReadCount: ServiceCounterDataType;
    writeCount: ServiceCounterDataType;
    historyUpdateCount: ServiceCounterDataType;
    callCount: ServiceCounterDataType;
    createMonitoredItemsCount: ServiceCounterDataType;
    modifyMonitoredItemsCount: ServiceCounterDataType;
    setMonitoringModeCount: ServiceCounterDataType;
    setTriggeringCount: ServiceCounterDataType;
    deleteMonitoredItemsCount: ServiceCounterDataType;
    createSubscriptionCount: ServiceCounterDataType;
    modifySubscriptionCount: ServiceCounterDataType;
    setPublishingModeCount: ServiceCounterDataType;
    publishCount: ServiceCounterDataType;
    republishCount: ServiceCounterDataType;
    transferSubscriptionsCount: ServiceCounterDataType;
    deleteSubscriptionsCount: ServiceCounterDataType;
    addNodesCount: ServiceCounterDataType;
    addReferencesCount: ServiceCounterDataType;
    deleteNodesCount: ServiceCounterDataType;
    deleteReferencesCount: ServiceCounterDataType;
    browseCount: ServiceCounterDataType;
    browseNextCount: ServiceCounterDataType;
    translateBrowsePathsToNodeIdsCount: ServiceCounterDataType;
    queryFirstCount: ServiceCounterDataType;
    queryNextCount: ServiceCounterDataType;
    registerNodesCount: ServiceCounterDataType;
    unregisterNodesCount: ServiceCounterDataType;
    constructor(options?: SessionDiagnosticsDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface SessionSecurityDiagnosticsDataTypeOptions {
    sessionId?: (NodeIdLike | null);
    clientUserIdOfSession?: UAString;
    clientUserIdHistory?: UAString[] | null;
    authenticationMechanism?: UAString;
    encoding?: UAString;
    transportProtocol?: UAString;
    securityMode?: MessageSecurityMode;
    securityPolicyUri?: UAString;
    clientCertificate?: ByteString;
}
export declare class SessionSecurityDiagnosticsDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    sessionId: NodeId;
    clientUserIdOfSession: UAString;
    clientUserIdHistory: UAString[] | null;
    authenticationMechanism: UAString;
    encoding: UAString;
    transportProtocol: UAString;
    securityMode: MessageSecurityMode;
    securityPolicyUri: UAString;
    clientCertificate: ByteString;
    constructor(options?: SessionSecurityDiagnosticsDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    setSecurityMode(value: any): MessageSecurityMode;
    readonly schema: StructuredTypeSchema;
}
export interface StatusResultOptions {
    statusCode?: StatusCode;
    diagnosticInfo?: DiagnosticInfo;
}
export declare class StatusResult extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    statusCode: StatusCode;
    diagnosticInfo: DiagnosticInfo;
    constructor(options?: StatusResultOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface SubscriptionDiagnosticsDataTypeOptions {
    sessionId?: (NodeIdLike | null);
    subscriptionId?: UInt32;
    priority?: Byte;
    publishingInterval?: Double;
    maxKeepAliveCount?: UInt32;
    maxLifetimeCount?: UInt32;
    maxNotificationsPerPublish?: UInt32;
    publishingEnabled?: UABoolean;
    modifyCount?: UInt32;
    enableCount?: UInt32;
    disableCount?: UInt32;
    republishRequestCount?: UInt32;
    republishMessageRequestCount?: UInt32;
    republishMessageCount?: UInt32;
    transferRequestCount?: UInt32;
    transferredToAltClientCount?: UInt32;
    transferredToSameClientCount?: UInt32;
    publishRequestCount?: UInt32;
    dataChangeNotificationsCount?: UInt32;
    eventNotificationsCount?: UInt32;
    notificationsCount?: UInt32;
    latePublishRequestCount?: UInt32;
    currentKeepAliveCount?: UInt32;
    currentLifetimeCount?: UInt32;
    unacknowledgedMessageCount?: UInt32;
    discardedMessageCount?: UInt32;
    monitoredItemCount?: UInt32;
    disabledMonitoredItemCount?: UInt32;
    monitoringQueueOverflowCount?: UInt32;
    nextSequenceNumber?: UInt32;
    eventQueueOverFlowCount?: UInt32;
}
export declare class SubscriptionDiagnosticsDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    sessionId: NodeId;
    subscriptionId: UInt32;
    priority: Byte;
    publishingInterval: Double;
    maxKeepAliveCount: UInt32;
    maxLifetimeCount: UInt32;
    maxNotificationsPerPublish: UInt32;
    publishingEnabled: UABoolean;
    modifyCount: UInt32;
    enableCount: UInt32;
    disableCount: UInt32;
    republishRequestCount: UInt32;
    republishMessageRequestCount: UInt32;
    republishMessageCount: UInt32;
    transferRequestCount: UInt32;
    transferredToAltClientCount: UInt32;
    transferredToSameClientCount: UInt32;
    publishRequestCount: UInt32;
    dataChangeNotificationsCount: UInt32;
    eventNotificationsCount: UInt32;
    notificationsCount: UInt32;
    latePublishRequestCount: UInt32;
    currentKeepAliveCount: UInt32;
    currentLifetimeCount: UInt32;
    unacknowledgedMessageCount: UInt32;
    discardedMessageCount: UInt32;
    monitoredItemCount: UInt32;
    disabledMonitoredItemCount: UInt32;
    monitoringQueueOverflowCount: UInt32;
    nextSequenceNumber: UInt32;
    eventQueueOverFlowCount: UInt32;
    constructor(options?: SubscriptionDiagnosticsDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ModelChangeStructureDataTypeOptions {
    affected?: (NodeIdLike | null);
    affectedType?: (NodeIdLike | null);
    verb?: Byte;
}
export declare class ModelChangeStructureDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    affected: NodeId;
    affectedType: NodeId;
    verb: Byte;
    constructor(options?: ModelChangeStructureDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface SemanticChangeStructureDataTypeOptions {
    affected?: (NodeIdLike | null);
    affectedType?: (NodeIdLike | null);
}
export declare class SemanticChangeStructureDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    affected: NodeId;
    affectedType: NodeId;
    constructor(options?: SemanticChangeStructureDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ComplexNumberTypeOptions {
    real?: Float;
    imaginary?: Float;
}
export declare class ComplexNumberType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    real: Float;
    imaginary: Float;
    constructor(options?: ComplexNumberTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface DoubleComplexNumberTypeOptions {
    real?: Double;
    imaginary?: Double;
}
export declare class DoubleComplexNumberType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    real: Double;
    imaginary: Double;
    constructor(options?: DoubleComplexNumberTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface XVTypeOptions {
    x?: Double;
    value?: Float;
}
export declare class XVType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    x: Double;
    value: Float;
    constructor(options?: XVTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ProgramDiagnosticDataTypeOptions {
    createSessionId?: (NodeIdLike | null);
    createClientName?: UAString;
    invocationCreationTime?: DateTime;
    lastTransitionTime?: DateTime;
    lastMethodCall?: UAString;
    lastMethodSessionId?: (NodeIdLike | null);
    lastMethodInputArguments?: ArgumentOptions[] | null;
    lastMethodOutputArguments?: ArgumentOptions[] | null;
    lastMethodCallTime?: DateTime;
    lastMethodReturnStatus?: StatusResultOptions;
}
export declare class ProgramDiagnosticDataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    createSessionId: NodeId;
    createClientName: UAString;
    invocationCreationTime: DateTime;
    lastTransitionTime: DateTime;
    lastMethodCall: UAString;
    lastMethodSessionId: NodeId;
    lastMethodInputArguments: Argument[] | null;
    lastMethodOutputArguments: Argument[] | null;
    lastMethodCallTime: DateTime;
    lastMethodReturnStatus: StatusResult;
    constructor(options?: ProgramDiagnosticDataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface ProgramDiagnostic2DataTypeOptions {
    createSessionId?: (NodeIdLike | null);
    createClientName?: UAString;
    invocationCreationTime?: DateTime;
    lastTransitionTime?: DateTime;
    lastMethodCall?: UAString;
    lastMethodSessionId?: (NodeIdLike | null);
    lastMethodInputArguments?: ArgumentOptions[] | null;
    lastMethodOutputArguments?: ArgumentOptions[] | null;
    lastMethodInputValues?: (VariantLike | null)[] | null;
    lastMethodOutputValues?: (VariantLike | null)[] | null;
    lastMethodCallTime?: DateTime;
    lastMethodReturnStatus?: StatusResultOptions;
}
export declare class ProgramDiagnostic2DataType extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    createSessionId: NodeId;
    createClientName: UAString;
    invocationCreationTime: DateTime;
    lastTransitionTime: DateTime;
    lastMethodCall: UAString;
    lastMethodSessionId: NodeId;
    lastMethodInputArguments: Argument[] | null;
    lastMethodOutputArguments: Argument[] | null;
    lastMethodInputValues: Variant[] | null;
    lastMethodOutputValues: Variant[] | null;
    lastMethodCallTime: DateTime;
    lastMethodReturnStatus: StatusResult;
    constructor(options?: ProgramDiagnostic2DataTypeOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
export interface AnnotationOptions {
    message?: UAString;
    userName?: UAString;
    annotationTime?: DateTime;
}
export declare class Annotation extends ExtensionObject {
    static readonly schema: StructuredTypeSchema;
    static possibleFields: string[];
    static encodingDefaultBinary: ExpandedNodeId;
    static encodingDefaultXml: ExpandedNodeId;
    message: UAString;
    userName: UAString;
    annotationTime: DateTime;
    constructor(options?: AnnotationOptions);
    encode(stream: OutputBinaryStream): void;
    decode(stream: BinaryStream): void;
    readonly schema: StructuredTypeSchema;
}
