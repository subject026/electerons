import * as openpgp from "openpgp";

export async function generateKey(email, password) {
  const name =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  return await openpgp.generateKey({
    curve: "curve25519",
    userIds: [{ name: name, email: email }],
    passphrase: password,
  });
}

// export async function encrypt(text, key) {
//   const message = openpgp.message.fromText(text);
//   const publicKeyArmored = key;

//   const { data: encrypted } = await openpgp.encrypt({
//     message: message,
//     publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys,
//   });

//   return encrypted;
// }

// export async function decrypt(text, key, passphrase) {
//   await loadPGP();
//   const privateKeyArmored = key;
//   const {
//     keys: [privateKey],
//   } = await openpgp.key.readArmored(privateKeyArmored);
//   await privateKey.decrypt(passphrase);

//   const { data: decrypted } = await openpgp.decrypt({
//     message: await openpgp.message.readArmored(text),
//     privateKeys: [privateKey],
//   });

//   return decrypted;
// }

export default {
  generateKey,
  //  encrypt,
  // decrypt
};
