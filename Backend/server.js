const app = require("./src/app.js")
require("dotenv").config()

const connectToDB = require("./src/config/database.js")
connectToDB()

app.listen(3000,()=>{
    console.log("server is running on port 3000");
    
})