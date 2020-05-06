
var CryptoJS = require("crypto-js");

var key = CryptoJS.enc.Utf8.parse('8080808080808080');  
var iv = CryptoJS.enc.Utf8.parse('8080808080808080');  
// var decrypted = CryptoJS.TripleDES.decrypt({
//     ciphertext: CryptoJS.enc.Hex.parse('5BB+iGDav8btWIWaBw3SEA==')
// }, key, { 
//     iv : iv, 
//     mode:CryptoJS.mode.CBC
// });

var decrypted = CryptoJS.AES.decrypt('5BB+iGDav8btWIWaBw3SEA==', key, { 
    iv : iv
});



var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse('9662035550'), key,  
{
   iv: iv,  
   mode: CryptoJS.mode.CBC,  
   padding: CryptoJS.pad.Pkcs7 
});  


console.log('new encrypted: ' + encrypted); 

// Decrypt
console.log('new decrypted: ' + decrypted.toString(CryptoJS.enc.Utf8)); 
