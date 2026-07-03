const mongoose= require("mongoose")

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to database");
    } catch (err) {
        console.log("FAILED TO CONNECT TO DB", err);
    }
}

module.exports = connectToDB;

