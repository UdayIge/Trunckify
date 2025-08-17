import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
    originalUrl:{
        type: String,
        require: true,
    },
    shortId:{
        type: String,
        require:true,
        unique: true
    },
    visitedHistory:[
        {
            visitedTime:{
                type: Date,
            }
        }
    ],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
    }
},{ timestamps: true})

const Url = mongoose.model("url",UrlSchema);

export default Url;