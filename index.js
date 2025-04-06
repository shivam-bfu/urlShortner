const express=require('express')
const { generateShortUrl } = require('./controllers/url')
const app=express()
const connectDB = require('./connect')
const URL=require('./models/url')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
require('dotenv').config()


app.get('/',(req,res)=>{ 

    try{ 
        res.send('hello')
    }
    catch(err){
        res.send('error',err)
 
    }
})

app.post('/url',generateShortUrl)

app.get('/:shortId', async (req, res) => {
  try {
    const shortId = req.params.shortId;
    if (!shortId) {
      return res.status(400).send('Short URL ID is required');
    }

    const url = await URL.findOne({ shortUrl: shortId });

    if (!url) {
      return res.status(404).send('Short URL not found');
    }

    return res.redirect(url.recordedUrl);

  } catch (err) {
    console.error('Redirect error:', err);
    res.status(500).send('Something went wrong');
  }
});

const PORT = process.env.PORT || 3000;


connectDB(process.env.MONGO_URL)
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});