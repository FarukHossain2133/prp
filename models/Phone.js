const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Faruk:Faruk01936@cluster0-fqsei.mongodb.net/phone?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.connect('mongodb://localhost:27017/phone', {useNewUrlParser: true, useUnifiedTopology: true});

const phoneSchema = new mongoose.Schema({
    device: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    network: {
        type: String,
    },
    problem: {
        type: String,
        required: true
    },
    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    postal: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const PhoneModel = mongoose.model('phone', phoneSchema);

module.exports =  PhoneModel;