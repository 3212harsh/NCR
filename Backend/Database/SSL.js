// Database/SSL.js

const mongoose = require('mongoose');

// Define the schema for the SSL data
const sslSchema = new mongoose.Schema({
    ssl: { type: Object, required: true },   // Storing the SSL certificate object
    ips: { type: [String], required: true }, // Storing an array of IP addresses (ip_str)
});

// Create the model for the SSL data
const SslModel = mongoose.model('SslData', sslSchema);

// Export the model to use in other files
module.exports = SslModel;
