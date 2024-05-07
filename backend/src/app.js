// Import necessary modules
import { connectToMongo } from './database/connection.js';


connectToMongo().then(() => {
    console.log("MongoDB connected successfully!");

}).catch(error => {
    console.error("Error connecting to MongoDB:", error);

});
