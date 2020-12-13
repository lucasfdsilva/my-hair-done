var AWS = require("aws-sdk");

var region = "eu-west-1",
  secret,
  decodedBinarySecret;

var client = new AWS.SecretsManager({
  region: region,
});

module.exports = {
  async getCredentials(secretNameInSecretsManager) {
    return new Promise((resolve, reject) => {
      client.getSecretValue({ SecretId: secretNameInSecretsManager }, function (err, data) {
        if (err) {
          if (err.code === "DecryptionFailureException") throw err;
          else if (err.code === "InternalServiceErrorException") throw err;
          else if (err.code === "InvalidParameterException") throw err;
          else if (err.code === "InvalidRequestException") throw err;
          else if (err.code === "ResourceNotFoundException") throw err;
        } else {
          if ("SecretString" in data) {
            secret = data.SecretString;
            resolve();
          } else {
            let buff = new Buffer(data.SecretBinary, "base64");
            decodedBinarySecret = buff.toString("ascii");
          }
        }
      });
    }).then(function () {
      const credentials = JSON.parse(secret);
      return credentials;
    });
  },
};