const express = require('express');
const axios = require('axios');
const multer = require('multer');
const cors = require('cors');
const FormData = require('form-data');

const HostModel = require('./Database/Hosts');
const ServiceModel = require('./Database/Services')
const SslModel = require('./Database/SSL');
const Hostmodel = require('./Database/Hosts');

const VIRUSTOTAL_API_KEY = '8d9987d822ecf7d47b70fd2debd7822e6ea78b48a0eee8ab19f833b521d48ea9';


const app = express();
const upload = multer(); 

app.use(cors({origin: '*'}));
app.use(express.json()); 

function parseSearchText(searchText) {
    const filters = {};
    const pairs = searchText.split(',').map(pair => pair.trim());
    
    pairs.forEach(pair => {
        const [key, value] = pair.split(':').map(item => item.trim());
        if (key && value) {
            filters[key] = value;
        }
    });

    return filters;
}

app.get('/', async ( req , res ) => {
    res.send("Server started");
} )

app.get('/total' , async (req,res)=>{
    let data = await Hostmodel.find();
    res.json({"total":data.length});
})

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

    // Parse the searchText into a MongoDB query filter
    const filters = searchText ? parseSearchText(searchText) : {};

    // Add port and service filters if selected
    if (port) {
        filters['ports'] = parseInt(port);  // assuming ports is an array of numbers
    }

    if (service) {
        filters['data.product'] = service;  // assuming 'data.product' is where the service is stored
    }

    try {
        // Execute the query with the constructed filters
        const results = await HostModel.find(filters).lean();
        res.json(results);
    } catch (err) {
        console.error("Error executing search query", err);
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
});


// app.post('/scan/file', upload.single('file'), async (req, res) => {
//     const file = req.file;
//     const apiKey = '8d9987d822ecf7d47b70fd2debd7822e6ea78b48a0eee8ab19f833b521d48ea9';

//     if (!file) {
//         return res.status(400).json({ error: 'No file uploaded.' });
//     }

//     try {
//         // Prepare the form data with the file buffer
//         const form = new FormData();
//         form.append('file', file.buffer, file.originalname);

//         // Construct the headers
//         const headers = {
//             'x-apikey': apiKey,
//             ...form.getHeaders()
//         };

//         // Log the headers to verify

//         // Send the file to VirusTotal for scanning using axios
//         const response = await axios.post('https://www.virustotal.com/api/v3/files', form, {
//             headers: headers
//         });

//         res.json(response.data);

//     } catch (error) {
//         console.error('Error scanning file:', error.response ? error.response.data : error.message);
//         res.status(500).json({ error: 'Error scanning file' });
//     }
// });


// SSL Details Route
app.get('/detailedssl/:serial', async (req, res) => {
    try {
        const { serial } = req.params;

        // Assuming 'ssl' contains the 'cert' object where the serial is located.
        // If the serial is not nested in 'cert', adjust the query below.
        const sslData = await SslModel.findOne({ 'ssl.cert.serial': parseFloat(serial) });

        if (!sslData) {
            return res.status(404).json({ message: 'SSL data not found' });
        }

        // Send the found SSL data back to the client
        res.json(sslData.ssl);
    } catch (error) {
        console.error('Error fetching SSL data:', error);
        res.status(500).json({ message: 'Internal server error' });
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

app.post('/scan/ip', async (req, res) => {
    const { ipAddress } = req.body;
  
    if (!ipAddress) {
      return res.status(400).json({ error: 'IP address is required' });
    }
  
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-apikey': VIRUSTOTAL_API_KEY
      }
    };
  
    try {
      const response = await fetch(`https://www.virustotal.com/api/v3/ip_addresses/${ipAddress}`, options);
      const data = await response.json();
      
      if (response.ok) {
        res.json(data);
      } else {
        res.status(response.status).json(data);
      }
    } catch (error) {
      console.error('Error scanning IP:', error);
      res.status(500).json({ error: 'Failed to scan IP address' });
    }
  });
  
  

app.listen(4000,()=>{
    console.log("server started successfully");
    
});