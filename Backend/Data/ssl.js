const fs = require('fs').promises;
const Hostmodel = require('../Database/Hosts');
const SslModel = require('../Database/SSL'); // Ensure the path is correct

async function getdata(){
    try {
        const data = await fs.readFile('data.json', 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading file:', err);
        return null;
    }
}

async function ssl(data) {
    let sslMap = new Map();

    data.forEach((e) => {
        if (e && e.data) {
            e.data.forEach((i) => {
                if (i.ssl) {
                    const sslString = JSON.stringify(i.ssl); // Convert SSL object to string for comparison

                    if (sslMap.has(sslString)) {
                        sslMap.get(sslString).ips.push(i.ip_str); // Add ip_str to the existing array
                    } else {
                        sslMap.set(sslString, { ssl: i.ssl, ips: [i.ip_str] }); // Create new entry with ip_str
                    }
                }
            });
        }
    });

    // Convert the map back to an array of objects
    const uniqueSslArray = Array.from(sslMap.values());

    console.log(`Total unique SSL objects: ${uniqueSslArray.length}`);
    
    // Save each unique SSL certificate and its associated IPs to the database
    for (const sslData of uniqueSslArray) {
        const sslEntry = new SslModel(sslData); // Create a new document
        await sslEntry.save();                  // Save to the database
    }

    return uniqueSslArray;
}

async function main() {
    let data = await getdata();
    let ssl_data = await ssl(data);
    console.log(ssl_data[0]);  // Print the first SSL object and associated IPs (ip_str) for demonstration
}

main();
