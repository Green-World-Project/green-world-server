import * as crypto from "crypto";

// AES Encryption and Decryption Class
export class AES {
    private algorithm: string; // Encryption algorithm
    private key: Buffer;       // Secret key
    private iv: Buffer;        // Initialization vector

    constructor(secretKey: string) {
        this.algorithm = "aes-256-cbc"; // AES with 256-bit key and CBC mode

        // Derive a 256-bit key from the provided secret
        this.key = crypto.createHash("sha256").update(secretKey).digest();

        // Generate a fixed 16-byte Initialization Vector (IV)
        this.iv = Buffer.alloc(16, 0); // 16 null bytes as IV (you can customize this)
    }

    // Encrypt a plaintext string
    encrypt(plainText: string): string {
        const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
        let encrypted = cipher.update(plainText, "utf8", "hex");
        encrypted += cipher.final("hex");
        return encrypted;
    }

    // Decrypt an encrypted string
    decrypt(cipherText: string): string {
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
        let decrypted = decipher.update(cipherText, "hex", "utf8");
        decrypted += decipher.final("utf8");
        return decrypted;
    }
}


// const secretKey = "my-strong-secret-key"; // A user-defined secret key
// const aes = new AES(secretKey);

// aes.encrypt(password);

// aes.decrypt(password);
