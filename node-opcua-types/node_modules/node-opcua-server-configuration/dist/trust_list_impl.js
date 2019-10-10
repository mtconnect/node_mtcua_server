"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class TrustList {
    closeAndUpdate(fileHandle) {
        return __awaiter(this, void 0, void 0, function* () {
            return false;
        });
    }
    addCertificate(certificate, isTrustedCertificate) {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
    removeCertificate(thumbprint, isTrustedCertificate) {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
}
exports.TrustList = TrustList;
//# sourceMappingURL=trust_list_impl.js.map