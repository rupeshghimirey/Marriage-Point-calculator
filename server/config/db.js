const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI,{
            useCreateIndex:true,
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log(`MongoDB Connected:${connection.connection.host}`);

    } catch (error) {   
        process.exit(1);
    }
}

module.exports = connectDB;