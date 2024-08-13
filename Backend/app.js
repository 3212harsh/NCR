const express = require('express');
const axios = require('axios');
const multer = require('multer');
const cors = require('cors');

const HostModel = require('./Database/Hosts');
const ServiceModel = require('./Database/Services')
const SslModel = require('./Database/SSL')

const app = express();
const upload = multer(); 

app.use(cors({origin: '*'}));
app.use(express.json()); 


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

app.get('/ssldetails' , async (req,res) => {
    let ssldata = await SslModel.find();
    res.json(ssldata);
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

app.post('/scan/file', upload.single('file'), async (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    try {
        // Send the file to VirusTotal for scanning
        console.log(file.buffer);
        
        const response = await axios.post(
            'https://www.virustotal.com/api/v3/files',
            file.buffer,
            {
                headers: {
                    'x-apikey': '8d9987d822ecf7d47b70fd2debd7822e6ea78b48a0eee8ab19f833b521d48ea9', 
                    'Content-Type': 'application/octet-stream',
                },
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error('Error scanning file : ', error.message);
        res.status(500).json({ error: 'Error scanning file' });
    }
});

// VirusTotal API route for scanning URLs
app.post('/scan/url', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'No URL provided.' });
    }

    try {
        // Send the URL to VirusTotal for scanning
        const response = await axios.post(
            'https://www.virustotal.com/api/v3/urls',
            { url },
            {
                headers: {
                    'x-apikey': '8d9987d822ecf7d47b70fd2debd7822e6ea78b48a0eee8ab19f833b521d48ea9', // Use your actual VirusTotal API key here
                    'Content-Type': 'application/json',
                },
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error('Error scanning URL:', error.message);
        res.status(500).json({ error: 'Error scanning URL' });
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