const normalizeKey = (k) => {
  const n = parseInt(k, 10);
  if (Number.isNaN(n)) return 0;
  return ((n % 26) + 26) % 26;
};

const shiftChar = (ch, key, mode = 'encrypt') => {
  const code = ch.charCodeAt(0);
  const isUpper = code >= 65 && code <= 90;
  const isLower = code >= 97 && code <= 122;
  if (!isUpper && !isLower) return ch;

  const base = isUpper ? 65 : 97;
  const k = normalizeKey(key) * (mode === 'encrypt' ? 1 : -1);
  const shifted = ((code - base + k + 26) % 26) + base;
  return String.fromCharCode(shifted);
};

const transform = (text, key, mode) =>
  (text || '').split('').map((ch) => shiftChar(ch, key, mode)).join('');

module.exports.encrypt = (text, key) => transform(text, key, 'encrypt');
module.exports.decrypt = (text, key) => transform(text, key, 'decrypt');
module.exports.normalizeKey = normalizeKey;