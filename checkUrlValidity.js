const dns = require("dns");
const url = require("url");

function checkUrlValidity(inputUrl, callback) {
  // Parse the URL to get the hostname
  const parsedUrl = url.parse(inputUrl);
  const hostname = parsedUrl.hostname;

  if (!hostname) {
    callback(false);
    return;
  }

  // Resolve the hostname using dns.lookup
  dns.lookup(hostname, (err) => {
    if (err) {
      callback(false);
    } else {
      callback(true);
    }
  });
}

// Example usage
module.exports = checkUrlValidity;
