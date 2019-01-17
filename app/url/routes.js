const router = require('express').Router();
const url = require('./url');

router.get('/api/get', (req, res) => {
  console.log(req.body);
  res.send({ express: 'Hello From Express' });
  // console.log('getting route')
  // res.json([{
  //   id: 1,
  //   username: 'mariana'
  // }, {
  //   id: 2,
  //   username: "german"
  // }]);
});

router.post('/api/post', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: 
    ${req.body.post}`
  );
});

router.get('/:hash', async (req, res, next) => {

  const source = await url.getUrl(req.params.hash);

  // TODO: Respond accordingly when the hash wasn't found (404 maybe?)

  // TODO: Hide fields that shouldn't be public

  // TODO: Register visit


  // Behave based on the requested format using the 'Accept' header.
  // If header is not provided or is */* redirect instead.
  const accepts = req.get('Accept');

  switch (accepts) {
    case 'text/plain':
      res.end(source.url);
      break;
    case 'application/json':
      res.json(source);
      break;
    default:
      res.redirect(source.url);
      break;
  }
});


router.post('/', async (req, res, next) => {
  console.log('post method has been called');
  console.log(req.body);
  // TODO: Validate 'req.body.ur l' presence
  if (!req.body.url) {
    // TODO: Handle if url does not exists
    console.log('catch here')
  } else {
    try {
      console.log('provided URL: ' + req.body.url)
      let shortUrl = await url.shorten(req.body.url);
      console.log('after shorten');
      console.log(shortUrl);
      // let shortUrl = await url.shorten(req.body.url, url.generateHash(req.body.url));
      res.json(shortUrl);
    } catch (e) {
      // TODO: Personalized Error Messages
      next(e);
    }
  }
});


router.delete('/:hash/:removeToken', async (req, res, next) => {
  // TODO: Remove shortened URL if the remove token and the hash match
  let notImplemented = new Error('Not Implemented');
  notImplemented.status = 501;
  next(notImplemented);
});

module.exports = router;
