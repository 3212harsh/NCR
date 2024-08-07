const mongoose = require('mongoose');

let ServiceSchema = mongoose.Schema({
    service_name: String,
    service_hosts: Array
});

let ServiceModel = mongoose.model("Services", ServiceSchema);

module.exports = ServiceModel;
