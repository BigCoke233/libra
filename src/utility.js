const utility = {
  generateUniqueId: (str) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = crypto.subtle.digest('SHA-256', data); // SHA-256 hash
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to array
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex; // Return the hex string
  }
}

export default utility;
