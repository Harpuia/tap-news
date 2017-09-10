var express = require('express');
var router = express.Router();

/* GET news listing. */
router.get('/', function(req, res, next) {
  news = [
      {
        'url':'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        'title':'aaa',
        'description':'aaa',
        'source':'aaa',
        'urlToImage':'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        'digest':'aaa',
        'reason':'aaa',

      },
      {
        'url':'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        'title':'bbb',
        'description':'bbb',
        'source':'bbb',
        'urlToImage':'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        'digest':'bbb',
        'reason':'aaa',

      }
    ];

  res.json(news);
});

module.exports = router;