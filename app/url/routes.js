const router = require('express').Router();
const url = require('./url');
const safeCharacters = 'bjectSymhasOwnProp-0123456789ABCDEFGHIJKLMNQRTUVWXYZ_dfgiklquvxz';

router.get('/api/content', async (req, res, next) => {
  let content = await url.getAllContent();
  res.json(content);
});

router.get('/:hash', async (req, res, next) => {

  try {
    const source = await url.getUrl(req.params.hash);
    if (!source) {
      // TODO: Respond accordingly when the hash wasn't found (404 maybe?)
      let urlNotFounded = new Error('URL was not founded');
      urlNotFounded.status = 404;
      next(urlNotFounded);
    } else {
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
    }
  } catch (e) {
    next(e);
  }

});

router.post('/', async (req, res, next) => {
  // TODO: Validate 'req.body.url' presence
  if (!req.body.url) {
    // TODO: Handle if url does not exists
    let urlNotProvided = new Error('Url was not provided');
    urlNotProvided.status = 404;
    next(urlNotProvided);
  } else {
    try {
      // let shortUrl = await url.shorten(req.body.url, url.generateHash(req.body.url));
      let shortUrl = await url.shorten(req.body.url, url.generateHashVanilla(safeCharacters));
      res.json(shortUrl);
    } catch (e) {
      // TODO: Personalized Error Messages
      console.log(e);
      e.status = 400;
      next(e);
    }
  }
});


router.delete('/:hash/remove/:removeToken', async (req, res, next) => {
  // TODO: Remove shortened URL if the remove token and the hash match
  try {
    let removedUrl = await url.removeUrl(req.params);
    if (!removedUrl) {
      let failWhileDeleting = new Error('Entrie could not been deleted');
      failWhileDeleting.status = 409;
      next(failWhileDeleting);
    } else {
      res.json({ 'status': 200 });
    }
  } catch (e) {
    console.log('Error while deleting entrie');
    next(e);
  }

});

module.exports = router;
