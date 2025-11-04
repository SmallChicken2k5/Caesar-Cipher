// Thuật toán Vigenère: chỉ dịch các chữ cái, giữ nguyên ký tự khác.
const toShiftArray = (key) =>
  key.replace(/[^a-zA-Z]/g, '').toUpperCase().split('').map(c => c.charCodeAt(0) - 65);

const shiftChar = (ch, s) => {
  const code = ch.charCodeAt(0);
  if (code >= 65 && code <= 90) return String.fromCharCode(((code - 65 + s + 26) % 26) + 65);
  if (code >= 97 && code <= 122) return String.fromCharCode(((code - 97 + s + 26) % 26) + 97);
  return ch;
};

function normalizeKey(input) {
  return (input || '').replace(/[^a-zA-Z]/g, '');
}

function transform(text, key, mode) {
  const shifts = toShiftArray(key);
  if (shifts.length === 0) return text; // không có khóa ⇒ trả nguyên văn
  let j = 0;
  return Array.from(text).map(ch => {
    const code = ch.charCodeAt(0);
    const isLetter = (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
    if (!isLetter) return ch;
    const s = shifts[j % shifts.length] * (mode === 'decrypt' ? -1 : 1);
    j++;
    return shiftChar(ch, s);
  }).join('');
}

function encrypt(text, key) {
  return transform(text, key, 'encrypt');
}

function decrypt(text, key) {
  return transform(text, key, 'decrypt');
}

module.exports = { encrypt, decrypt, normalizeKey };