
var memberId = `{"MemberId":17, "NowDateTime": "${moment().format('YYYY/MM/DD HH:mm:ss')}" }`;

// 固定密鑰
var iv = CryptoJS.enc.Utf8.parse('e77bafeed75e74d7');
var key = CryptoJS.enc.Utf8.parse('c12a57339b00aa8d33ea33b5a6d7db67');

// encrypt 加密
function encrypt(param) {
   var msg = CryptoJS.enc.Utf8.parse(param);
  // AES 加密
  var encrypted = CryptoJS.AES.encrypt(msg, key, { 
    iv: iv, 
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  });
  
  return encrypted.toString()
}

// decrypt 我方解密函數
function decrypt(param) {
  var decrypted = CryptoJS.AES.decrypt(param, key, {
    iv: iv, 
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  });
  var decoded = CryptoJS.enc.Utf8.stringify(decrypted);
  return decoded;
}

// 測試範例demo
var test = encrypt(memberId);
console.log(test);
document.getElementById("txt").innerHTML = `34.201.48.56?memberId=${test}`;  
// 解密函數
var result = decrypt(test);
console.log(result);
// 接這拿 result 的 NowDateTime(UTC+0)
// 去比對是否五分鐘內，如不是即導出頁面 