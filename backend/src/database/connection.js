import 'dotenv/config';
import mongoose from 'mongoose';

const url = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/?retryWrites=true&w=majority&appName=Cluster0`;
const options = {
    dbName: process.env.DATABASE_NAME,
}

mongoose.connect(url, options).then(() => {
    console.log('Mongoose connect success.');

    mongoose.connection.once('connected', () => {
        console.log('Database Connected');
    })

    process.on('SIGINT', async () => {
        await mongoose.connection.close(true);
        console.log("Mongoose default connection is disconnected due to application termination");
        process.exit(0);    
    });
}).catch((err) => {
    console.error('Mongoose connect failed.');
});
