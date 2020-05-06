var CryptoJS = require("crypto-js");

// Encrypt
var ciphertext = CryptoJS.AES.encrypt('7303350235', 'ja17pgchjdg37xs3');
console.log('ciphertext', ciphertext.toString())
//('wXVV7ChF4KqQ4orIOvewH5pC4D2Ql46PCtfv%20taxXuI=', 'ja17pgchjdg37xs3');
// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(CryptoJS.enc.Unicode), 'ja17pgchjdg37xs3');
var plaintext = bytes.toString(CryptoJS.enc.Utf8);
console.log('bytes', bytes)
console.log('plaintext', plaintext)


var byteKey = [70,200,194,219,180,167,126,150,103,7,134,32,79,250,187,212,26,184,176,60,188,67,144,115,237,37,29,91,127,76,165,119]; 
var byteIV  = [205,168, 215,148,19,183,138,126,61,205,236,101,59,220,24,248];

var testkey = CryptoJS.enc.Hex.parse(CryptoJS.lib.WordArray.create(byteKey));
var testiv = CryptoJS.enc.Hex.parse(CryptoJS.lib.WordArray.create(byteIV));

var  message = '7303350235'
var encrypted =  CryptoJS.AES.encrypt(message, testkey, {
  'iv': testiv
});

console.log('encripted: ' + encrypted.toString()); 


var decrypted = CryptoJS.AES.decrypt(encrypted, testkey, {
  'iv': testiv
});

console.log('Output: ' + decrypted.toString(CryptoJS.enc.Utf8)); 
