import CryptoJS from 'crypto-js';

// Encryption function
function encrypt(pin, plaintext) {
    const key = CryptoJS.SHA256(pin);
    const iv = CryptoJS.lib.WordArray.random(16);

    const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
        iv: iv,
    });

    return {
        iv: iv.toString(CryptoJS.enc.Base64),
        ciphertext: encrypted.toString(),
    };
}

// Decryption function
function decrypt(pin, encryptedData) {
    const key = CryptoJS.SHA256(pin);
    const iv = CryptoJS.enc.Base64.parse(encryptedData.iv);

    const decrypted = CryptoJS.AES.decrypt(encryptedData.ciphertext, key, {
        iv: iv,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
}

export { encrypt, decrypt };
