const mongoose = require("mongoose")

const blacklistTokenSchema = mongoose.Schema({
    token : {
        type: String,
        required:true
    }
},{timestamps:true})

const tokenBlackListModel = mongoose.model("BlacklistTokens",blacklistTokenSchema)

module.exports = tokenBlackListModel