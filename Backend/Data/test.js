const fs = require('fs').promises;
const Hostmodel = require('../Database/Hosts');
const ServiceModel = require('../Database/Services');

async function getdata() {
    try {
        const data = await fs.readFile('data.json', 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading file:', err);
        return null;
    }
}

//For saving hosts data 

// async function main() {
//     let data = await getdata();
//     if (data) {
//         try {
//             await Hostmodel.updateOne({}, { hosts: data }, { upsert: true });
//             console.log('Data successfully inserted into MongoDB');
//         } catch (err) {
//             console.error('Error inserting data into MongoDB:', err);
//         }
//     }
// }



// For saving services

async function getdata() {
    try {
        const data = await fs.readFile('data.json', 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading file:', err);
        return null;
    }
}

async function main() {
    let data = await getdata();
    if (!data) return;

    let hosts = [];
    data.forEach((e) => {
        if (e && e.ports) {
            let hasPort80 = e.ports.includes(179);
            if (hasPort80) {
                hosts.push({
                    ip:e.ip_str,
                    ports:e.ports,
                    asn:e.asn,
                    os:e.os,
                    location:e.country_name
                });
            }
        }
    });

    let newService = new ServiceModel({
        service_name: 'BGP',
        service_hosts: hosts
    });
    try {
        await newService.save();
        console.log('Service data successfully saved to MongoDB');
    } catch (err) {
        console.error('Error saving service data to MongoDB:', err);
    }
}

main();








