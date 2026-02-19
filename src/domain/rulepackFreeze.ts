type FrozenRulepackMetadata = {
  rulePackId: string;
  versionTag: string;
  frozen: boolean;
  frozenAt: string;
  artifactPath: string;
  artifactSha256: string;
};

const frozenRulepackMetadata = require('../../SOURCES/rulepack.v1.freeze.json') as FrozenRulepackMetadata;
const frozenRulepackArtifact = require('../../SOURCES/rulepack.v1.json') as Record<string, unknown>;

const frozenRulepackArtifactText = `${JSON.stringify(frozenRulepackArtifact, null, 2)}\n`;

const K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4,
  0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe,
  0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f,
  0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
  0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc,
  0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
  0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116,
  0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7,
  0xc67178f2,
] as const;

const H0 = [
  0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab,
  0x5be0cd19,
] as const;

const rotateRight = (value: number, bits: number): number =>
  (value >>> bits) | (value << (32 - bits));

const sha256Hex = (message: string): string => {
  const messageBytes = new TextEncoder().encode(message);
  const messageLength = messageBytes.length;
  const bitLength = BigInt(messageLength) * 8n;

  const totalLength = ((messageLength + 9 + 63) >> 6) << 6;
  const padded = new Uint8Array(totalLength);
  padded.set(messageBytes);
  padded[messageLength] = 0x80;

  for (let i = 0; i < 8; i += 1) {
    padded[totalLength - 1 - i] = Number((bitLength >> BigInt(i * 8)) & 0xffn);
  }

  const h = new Uint32Array(H0);
  const w = new Uint32Array(64);

  for (let offset = 0; offset < padded.length; offset += 64) {
    for (let i = 0; i < 16; i += 1) {
      const base = offset + i * 4;
      w[i] =
        (padded[base] << 24) |
        (padded[base + 1] << 16) |
        (padded[base + 2] << 8) |
        padded[base + 3];
    }

    for (let i = 16; i < 64; i += 1) {
      const s0 = rotateRight(w[i - 15], 7) ^ rotateRight(w[i - 15], 18) ^ (w[i - 15] >>> 3);
      const s1 = rotateRight(w[i - 2], 17) ^ rotateRight(w[i - 2], 19) ^ (w[i - 2] >>> 10);
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
    }

    let a = h[0];
    let b = h[1];
    let c = h[2];
    let d = h[3];
    let e = h[4];
    let f = h[5];
    let g = h[6];
    let hh = h[7];

    for (let i = 0; i < 64; i += 1) {
      const s1 = rotateRight(e, 6) ^ rotateRight(e, 11) ^ rotateRight(e, 25);
      const ch = (e & f) ^ (~e & g);
      const temp1 = (hh + s1 + ch + K[i] + w[i]) >>> 0;
      const s0 = rotateRight(a, 2) ^ rotateRight(a, 13) ^ rotateRight(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (s0 + maj) >>> 0;

      hh = g;
      g = f;
      f = e;
      e = (d + temp1) >>> 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) >>> 0;
    }

    h[0] = (h[0] + a) >>> 0;
    h[1] = (h[1] + b) >>> 0;
    h[2] = (h[2] + c) >>> 0;
    h[3] = (h[3] + d) >>> 0;
    h[4] = (h[4] + e) >>> 0;
    h[5] = (h[5] + f) >>> 0;
    h[6] = (h[6] + g) >>> 0;
    h[7] = (h[7] + hh) >>> 0;
  }

  return Array.from(h, (value) => value.toString(16).padStart(8, '0')).join('').toUpperCase();
};

export interface RulepackIntegrityResult {
  ok: boolean;
  expected: string;
  actual: string;
  artifactPath: string;
  rulePackId: string;
}

export const verifyRulepackIntegrity = async (): Promise<RulepackIntegrityResult> => {
  const actual = sha256Hex(frozenRulepackArtifactText);

  return {
    ok: actual === frozenRulepackMetadata.artifactSha256,
    expected: frozenRulepackMetadata.artifactSha256,
    actual,
    artifactPath: frozenRulepackMetadata.artifactPath,
    rulePackId: frozenRulepackMetadata.rulePackId,
  };
};
