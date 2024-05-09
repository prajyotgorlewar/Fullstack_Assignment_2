import { model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    image: {type: String},
    biodata: {type: String},
    role: {type: String, required: true, default: 'user'}
}, { 
    timestamps: true 
});

userSchema.plugin(uniqueValidator);

export default model('User', userSchema);