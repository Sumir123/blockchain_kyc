// Hashes data using SHA-256
async function hash(data) {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Compute Merkle Root from leaves
export const computeMerkleRoot = async (leaves) => {
  let level = await Promise.all(leaves.map((leaf) => hash(leaf)));

  while (level.length > 1) {
    const newLevel = [];
    for (let i = 0; i < level.length; i += 2) {
      const left = level[i];
      const right = i + 1 < level.length ? level[i + 1] : left; // Handle odd number of leaves
      const combinedHash = await hash(left + right);
      newLevel.push(combinedHash);
    }
    level = newLevel;
  }

  return level[0];
};
