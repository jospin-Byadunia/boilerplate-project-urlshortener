const app = require("./index");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const dns = require("dns");
const checkUrlValidity = require('./checkUrlValidity');

dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 3000;

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log("DB connection successful"));

const Urlschema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: Number,
  },
});
let lengthofDB = 0;
const UrlToShorten = mongoose.model("UrlToShorten", Urlschema);
app.post("/api/shorturl", (req, res) => {
  const urlToShorten = req.body.url;
    checkUrlValidity(urlToShorten, (isValiUrl)=>{
      
      if(isValiUrl){
        UrlToShorten.countDocuments()
          .then((count) => {
            console.log(`There are ${count} urls in the collection`);
          count++;
            const testUrl = new UrlToShorten({
              url: urlToShorten,
              shortUrl: count++,
            });
        
            testUrl.save().then(doc=>{
                res.json({original_url:doc.url,
                    short_url: doc.shortUrl
                })
            });
          })
          .catch((err) => {
            console.log("ERROR 🔥:", err);
          });
        
      }
      else{
        res.json({ error: `invalid url` });
      }
    })
        
});
//redirect uusing short url
app.get('/api/shorturl/:id', (req, res)=>{
  const short_url = req.params.id*1
  UrlToShorten.findOne({ shortUrl: short_url }).then((doc)=>{
    res.redirect(doc.url);
  })
})
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
