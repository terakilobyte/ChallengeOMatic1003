var express = require('express');
var router = express.Router();
var fs = require('fs');

fs.mkdir("./../public/cache", function(){

});

router.post('/', function(req, res, next){
  fs.writeFile("./../public/cache/"+req.body.file, req.body.data
    .replace(/\[\{\"/gi, "[\n\t{\n\t\t\"")
    .replace(/\]\}\]/gi, "]\n\t}\n]")
    .replace(/\]\}\,\{\"/gi, "]\n\t},\n\t{\n\t\t\"")
    .replace(/\:\[/gi, ":[\n\t\t")
    .replace(/\"\,\"/gi, "\",\n\t\t\"")
    .replace(/(\]\,)+(\"\w*\"\:\")/gi, "$1\n\t\t$2")
  );
  res.send("/cache/"+(req.body.file.split('.')[0]));
});

/* GET home page. */

router.get('/cache/:file', function(req, res, next) {
  res.download("./../public/cache/"+req.params.file + ".json", function(err){
    if (err) {
      console.log("Who Knows");
    } else {
      //Nothing...
    }
  });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Challenge-O-Matic1000' });
});

module.exports = router;
