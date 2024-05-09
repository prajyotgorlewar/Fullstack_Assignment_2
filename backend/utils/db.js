
import 'dotenv/config';
import mongoose from 'mongoose';

const url = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/?retryWrites=true&w=majority`;
const options = {
    dbName: process.env.DATABASE_NAME,
}



const connectDB= async()=>{
    try{
        await mongoose.connect(url,options);
        console.log("mongo Connection successful!");
    }
    catch(error){
        console.error("db connection failed");
        process.exit(0);
    }
}

export default connectDB;