// const uuidv4 = require('uuid/v4');
const { domain } = require('../../environment');
const SERVER = `${domain.protocol}://${domain.host}`;

const UrlModel = require('./schema');
const parseUrl = require('url').parse;
const validUrl = require('valid-url');

const crypto = require('crypto-js');
const btoa = require('btoa');

/**
 * Lookup for existant, active shortened URLs by hash.
 * 'null' will be returned when no matches were found.
 * Along with this clicks counter will increase by 1.
 * @param {string} hash
 * @returns {object}
 */
async function getUrl(hash) {
  let source = await UrlModel.findOneAndUpdate(
    { active: true, hash },
    { $inc: { clicks: 1 } },
    { new: true }
  );
  return source;
}

/**
 * Generate an unique hash-ish- for an URL.
 * TODO: Deprecated the use of UUIDs.
 * TODO: Implement a shortening algorithm
 * @param {string} url
 * @returns {string} hash
 */
function generateHash(url) {
  // return uuidv5(url, uuidv5.URL);
  // return uuidv4();
  return btoa(crypto.SHA512(url).toString()).substr(0, 9);
}

/**
 * Generate a random token that will allow URLs to be (logical) removed
 * @returns {string} token
 */
function generateRemoveToken() {
  // return uuidv4();
  return Math.random().toString(36).substring(2, 10);
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

  // Get URL components for metrics sake
  const urlComponents = parseUrl(url);
  const protocol = urlComponents.protocol || '';
  const domain = `${urlComponents.host || ''}${urlComponents.auth || ''}`;
  const path = `${urlComponents.path || ''}${urlComponents.hash || ''}`;

  // Generate a token that will allow an URL to be removed (logical)
  const removeToken = generateRemoveToken();

  // Create a new model instance
  const shortUrl = new UrlModel({
    url,
    protocol,
    domain,
    path,
    hash,
    isCustom: false,
    removeToken,
    active: true
  });

  // TODO: Handle save errors
  try {
    const saved = await shortUrl.save();
    if (!saved) throw new Error('Could not save the document');
  } catch (e) {
    console.error('An error occurred while saving url');
    e.status = 400;
    console.error(e);
  }

  return {
    url,
    shorten: `${SERVER}/${hash}`,
    hash,
    removeUrl: `${SERVER}/${hash}/remove/${removeToken}`
  };
}

/**
 * Validate URI
 * @param {any} url
 * @returns {boolean}
 */
function isValid(url) {
  return validUrl.isUri(url);
}

/**
 * Look for existant, active shortened URls by
 * hash and removeToken. Will set to false 
 * active field.
 * @param {string} hash
 * @param {string} removeToken
 * @returns {object}
 */
async function removeUrl({ hash, removeToken }) {
  let source = await UrlModel.findOneAndUpdate(
    { active: true, hash, removeToken },
    { $set: { active: false }
  });
  return source;
}

module.exports = {
  shorten,
  getUrl,
  generateHash,
  generateRemoveToken,
  isValid,
  removeUrl
}
