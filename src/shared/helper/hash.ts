/**
 * @function generateHash
 * @description 해시 생성 (단반향 암호화)
 * @param str
 * @param secret
 * @returns string
 *
 * @example
 * const generateHash = await generateHash(this.fcmToken$, this.$auth.user.pid);
 */
export const generateHash = async (str: string, secret: string | null = null) => {
  if (typeof str !== 'string' || str.length === 0) {
    throw new Error('The input data must be of string type.');
  }

  const combineStr = secret ? secret.toString() + str : str;

  const encoder = new TextEncoder();
  const data = encoder.encode(combineStr);

  // 해시 값을 16진수 문자열로 변환
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * @function generateHmac
 * @description HMAC 해시 생성 (단반향 암호화)
 * @param secret
 * @param str
 * @returns string
 *
 * @example
 * const generateHmac = await generateHmac(this.$auth.user.pid, this.fcmToken$);
 */
export const generateHmac = async (secret: string, str: string) => {
  if (typeof secret !== 'string' || typeof str !== 'string') {
    throw new Error('The secret key and input data must be strings.');
  }

  // TextEncoder를 사용하여 데이터와 키를 바이트 배열로 변환
  const encoder = new TextEncoder();
  const secretKey = encoder.encode(secret);
  const data = encoder.encode(str);

  // SubtleCrypto 객체를 사용하여 HMAC을 생성
  const hmacKey = await window.crypto.subtle.importKey('raw', secretKey, {name: 'HMAC', hash: {name: 'SHA-256'}}, false, ['sign']);
  const hmacSignature = await window.crypto.subtle.sign('HMAC', hmacKey, data);

  // HMAC 시그니처를 16진수 문자열로 변환
  const hmacArray = Array.from(new Uint8Array(hmacSignature));

  return hmacArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
};
