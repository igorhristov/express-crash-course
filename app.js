const express = require("express");
const app = express();
const path = require("path");
const exphbs = require('express-handlebars')
const logger = require("./middleware/logger");
const members = require('./Members')

// init middleware
app.use(logger);

// handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars')

// Body Parser Middleware
app.use(express.json())
// handle url encoded data
app.use(express.urlencoded({extended: false}))

// Homepage route
app.get('/', (req,res)=> {
  res.render('index', {
    title: ' Member APP',
    members
  })
})

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use("/", express.static(path.join(__dirname, "public")));

// Memeber api routs
app.use('/api/members', require('./routes/api/members'))

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
