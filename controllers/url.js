const URL = require('../models/url')
const shortid = require('shortid');


const generateShortUrl= async( req,res)=>{
    if(!req.body.url){
        return res.status(400).send({message:'url is required'})
    }

    try{
        const url=req.body.url
        
        const shorturl=shortid.generate()
        
        const newURl= await URL.create({
            shortUrl:shorturl,
            recordedUrl:url,
        })
        
        return res.send({id:shorturl})
    }
    catch(err){
        return res.status(500).send("here is the prob")
    }

}
module.exports = {
    generateShortUrl
};