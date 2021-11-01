'use strict';

const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

// Instantiates a client
const client = new SecretManagerServiceClient();

const accessSecretVersion = async name => {
  const [version] = await client.accessSecretVersion({ name });

  // Extract the payload as a string.
  // @ts-ignore
  const payload = version.payload.data.toString('utf8');

  return payload;
};
// [END secretmanager_access_secret_version]

module.exports = accessSecretVersion;
