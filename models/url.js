const mongoose=require('mongoose')

const urlSchema=mongoose.Schema({

    shortUrl:{
        type:String,
        required:true,
        unique:true,
    },
    recordedUrl:{
        type:String,
        required:true,
    }

},

{timestamps:true}

)

module.exports=mongoose.model('Url',urlSchema)