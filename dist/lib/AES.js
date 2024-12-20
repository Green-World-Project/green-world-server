"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AES = void 0;
const crypto = __importStar(require("crypto"));
// AES Encryption and Decryption Class
class AES {
    constructor(secretKey) {
        this.algorithm = "aes-256-cbc"; // AES with 256-bit key and CBC mode
        // Derive a 256-bit key from the provided secret
        this.key = crypto.createHash("sha256").update(secretKey).digest();
        // Generate a fixed 16-byte Initialization Vector (IV)
        this.iv = Buffer.alloc(16, 0); // 16 null bytes as IV (you can customize this)
    }
    // Encrypt a plaintext string
    encrypt(plainText) {
        const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
        let encrypted = cipher.update(plainText, "utf8", "hex");
        encrypted += cipher.final("hex");
        return encrypted;
    }
    // Decrypt an encrypted string
    decrypt(cipherText) {
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
        let decrypted = decipher.update(cipherText, "hex", "utf8");
        decrypted += decipher.final("utf8");
        return decrypted;
    }
}
exports.AES = AES;
// const secretKey = "my-strong-secret-key"; // A user-defined secret key
// const aes = new AES(secretKey);
// aes.encrypt(password);
// aes.decrypt(password);
