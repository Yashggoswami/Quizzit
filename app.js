const express = require('express'),
    app = express(),
    hbs = require('hbs'),
    session = require('express-session'),
    bodyparser = require('body-parser'),
    flash = require('express-flash'),
    error_handler = require('./src/services/error_handler')



// -------------------Let this code be on the Top----------------------
app.use(
    session({
      resave: true,
      saveUninitialized: true,
      secret:"yash is a super star",
      cookie: { secure: false, maxAge: 14400000 },
    })
  );

  app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
  });
  // -------------------Let this code be on the Top----------------------
  
  
  app.use(bodyparser.urlencoded({extended:true}))
  app.use(express.static("./src/public"))
  app.set('views','src/views')
  app.set('view engine','hbs')
  hbs.registerPartials('src/views/partials')
  
  app.use(flash());
  
  app.use('/',require('./src/routes'))


  app.use(error_handler)

app.listen(8080,(req,res) => {
    console.log("server listening to http://localhost:8080")
})