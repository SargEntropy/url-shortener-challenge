const uuidv4 = require('uuid/v4');
const { domain } = require('../../environment');
const SERVER = `${domain.protocol}://${domain.host}`;

const UrlModel = require('./schema');
const parseUrl = require('url').parse;
const validUrl = require('valid-url');

/**
 * Lookup for existant, active shortened URLs by hash.
 * 'null' will be returned when no matches were found.
 * @param {string} hash
 * @returns {object}
 */
async function getUrl(hash) {
  let source = await UrlModel.findOne({ active: true, hash });
  return source;
}

/**
 * Generate an unique hash-ish- for an URL.
 * TODO: Deprecated the use of UUIDs.
 * TODO: Implement a shortening algorithm
 * @param {string} id
 * @returns {string} hash
 */
function generateHash(url) {
  // return uuidv5(url, uuidv5.URL);
  return uuidv4();
}

/**
 * Generate a random token that will allow URLs to be (logical) removed
 * @returns {string} uuid v4
 */
function generateRemoveToken() {
  return uuidv4();
}

/**
 * Create an instance of a shortened URL in the DB.
 * Parse the URL destructuring into base components (Protocol, Host, Path).
 * An Error will be thrown if the URL is not valid or saving fails.
 * @param {string} url
 * @param {string} hash
 * @returns {object}
 */
async function shorten(url, hash) {

  if (!isValid(url)) {
    throw new Error('Invalid URL');
  }
  console.log('Url provided is valid')

  // Get URL components for metrics sake
  const urlComponents = parseUrl(url);
  console.log(urlComponents);
  const protocol = urlComponents.protocol || '';
  console.log(protocol);
  const domain = `${urlComponents.host || ''}${urlComponents.auth || ''}`;
  console.log(domain);
  const path = `${urlComponents.path || ''}${urlComponents.hash || ''}`;
  console.log(path);

  // Generate a token that will allow an URL to be removed (logical)
  // const removeToken = generateRemoveToken();

  // Create a new model instance
  // const shortUrl = new UrlModel({
  //   url,
  //   protocol,
  //   domain,
  //   path,
  //   hash,
  //   isCustom: false,
  //   removeToken,
  //   active: true
  // });
  const shortUrl = new UrlModel({
    url,
    protocol,
    domain,
    path,
    isCustom: false,
    active: true,
    createdAt: new Date()
  });

  
    // const saved = await shortUrl.save();
    // TODO: Handle save errors
  try {
    const saved = await shortUrl.save();
  } catch (e) {
    console.log(e);
  }

  // return {
  //   url,
  //   shorten: `${SERVER}/${hash}`,
  //   hash,
  //   removeUrl: `${SERVER}/${hash}/remove/${removeToken}`
  // };
  return url;

}

/**
 * Validate URI
 * @param {any} url
 * @returns {boolean}
 */
function isValid(url) {
  return validUrl.isUri(url);
}

module.exports = {
  shorten,
  getUrl,
  generateHash,
  generateRemoveToken,
  isValid
}
