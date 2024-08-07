const express = require('express');
const HostModel = require('./Database/Hosts');
const ServiceModel = require('./Database/Services')
const app = express();
const cors = require('cors');

app.use(cors({
    origin: '*'
}));

app.get('/', ( req , res ) => {
    res.send("Server started");
} )

app.get('/getdata', async (req,res) => {
    let data = await ServiceModel.find();
    res.json(data);
})

app.get('/showall/:service' , async (req,res) => {
    let data =await ServiceModel.findOne({ service_name:req.params.service})
    return res.send(data);
})


app.get('/search', async (req, res) => {
    const { searchText, port, service } = req.query;

    try {
        const query = {};
        let a = searchText.split(' ');
        console.log(a);
        
        
        const data = await HostModel.find(query);
        
        res.json(data);
    } catch (err) {
        console.error('Error performing search:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/show/:host', async (req, res) => {
    const hostIp = req.params.host;

    try {
        const data = await HostModel.findOne({ ip_str: hostIp });
        if (!data) {
        return res.status(404).json({ error: 'Host not found' });
        }
        res.json(data);
    } catch (err) {
        console.error('Error fetching host data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
  

app.listen(4000,()=>{
    console.log("server started successfully");
    
});