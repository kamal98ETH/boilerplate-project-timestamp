// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

//myApp
app.get("/api/:date?", (req, res) => {
  let millisecs;
  let UTCdate;
  if (/-| /.test(req.params.date)) {
    UTCdate = new Date(req.params.date);
    if (UTCdate == "Invalid Date") {
      res.json({
        error: "Invalid Date"
      });
      return;
    }
    millisecs = UTCdate.getTime();
    UTCdate = UTCdate.toUTCString()
  } else if (parseInt(req.params.date)) {
    millisecs = parseInt(req.params.date)
    UTCdate = new Date(millisecs).toUTCString();
  } else if (!req.params.date) {
    UTCdate = new Date();
    millisecs = UTCdate.getTime();
    UTCdate = UTCdate.toUTCString()
  }
  res.json({
    unix: millisecs,
    utc: UTCdate
  })
})
