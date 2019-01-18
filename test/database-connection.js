const expect = require('chai').expect;
const moongose = require('mongoose');
const assert = require('assert');

const UrlModel = require('../app/url/schema');
const urlMethod = require('../app/url/url');

moongose.Promise = global.Promise;

describe('hooks', (done) => {
    var db, UrlCustomModel; // = moongose.createConnection('mongodb://localhost:27017/shortener');
    before(async () => {
        db = await moongose.createConnection('mongodb://localhost:27017/shortener');
    });
    it('Creating a Schema', (done) => {
        UrlCustomModel = db.model('Url', new moongose.Schema({
            url: {
                type: String,
                required: true
            }
        }));
        done();
    });
    it ('Schema invalid: should be invalid if required fields are empty', (done) => {
        let shortUrl = new UrlModel();
        shortUrl.validate((err) => {
            expect(err).to.exist;
            done();
        });
    });
    it('Find any url active', async () => {
        let res = await UrlCustomModel.find({ active: true });
    });
    it('Save document into database', (done) => {
        let url = "https://github.com/mochajs/mocha/issues/2958";
        let hash = urlMethod.generateHash(url);
        let removeToken = urlMethod.generateRemoveToken();
        let shortUrl = new UrlModel({
            url,
            hash,
            removeToken,
            active: true,
            isCustom: false
        });
        done();
    });
});