const app = require("./src/app.js")
require("dotenv").config()

const connectToDB = require("./src/config/database.js")
connectToDB()

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    
})