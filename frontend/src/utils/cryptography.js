import { ethers } from "ethers";
import getRandomPrimes from "./prime";

export const encryptMessage = (msg, e, n) => {
  let cipher = "";
  for (const i in msg) {
    const temp = msg[i].charCodeAt(0);
    cipher += getModularExponentiation(temp, e, n) + " ";
  }
  //console.log(cipher);
  return cipher;
};

export const decryptMessage = (cipher, d, n) => {
  let decryptedMsg = "";
  const parts = cipher.split(" ");
  for (const i in parts) {
    if (parts[i]) {
      const temp = getModularExponentiation(parts[i], d, n);
      decryptedMsg += String.fromCharCode(temp);
    }
  }
  return decryptedMsg;
};

const gcd = (a, b) => {
  if (!b) {
    return a;
  }
  return gcd(b, a % b);
};

const getModularExponentiation = (a, b, n) => {
  // a ^ b mod n (a**b%n doesn't work)
  a = a % n;
  let result = 1;
  let x = a;

  while (b > 0) {
    let leastSignificantBit = b % 2;
    b = Math.floor(b / 2);

    if (leastSignificantBit == 1) {
      result = result * x;
      result = result % n;
    }

    x = x * x;
    x = x % n;
  }
  return result;
};

export const getCryptographyKeys = () => {
  const randomPrimes = getRandomPrimes(700, 1500);
  const p = randomPrimes[0];
  const q = randomPrimes[1];

  const n = p * q;

  let e = 2;
  let k = 1;

  const phi = (p - 1) * (q - 1);
  let d;

  while (e < phi) {
    if (gcd(phi, e) === 1) {
      break;
    } else {
      e++;
    }
  }

  while (true) {
    d = (k * phi + 1) / e;
    if (Number.isInteger(d)) {
      break;
    } else {
      k++;
    }
  }
  return [e, d, n];
};

export const generateMerkleRoot = (hashes) => {
  const hashPair = (a, b) =>
    ethers.utils.keccak256(
      ethers.utils.defaultAbiCoder.encode(["bytes32", "bytes32"], [a, b])
    );

  while (hashes.length > 1) {
    if (hashes.length % 2 !== 0) {
      hashes.push(hashes[hashes.length - 1]);
    }
    let newLevel = [];
    for (let i = 0; i < hashes.length; i += 2) {
      newLevel.push(hashPair(hashes[i], hashes[i + 1]));
    }
    hashes = newLevel;
  }
  return hashes[0];
};
