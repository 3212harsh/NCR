const fs = require('fs').promises;
const fetch = require('node-fetch'); // Make sure to install node-fetch using npm if not already installed

const key_A = "Y4m0bwUYgY4D6J1dr3AWqwovBAuAuOKa";
const key_B = "phj926Lm82vCNpxlGyB0wrFfkHliM72Y";
let rotate = true;

async function get_ip() {
    try {
        const data = await fs.readFile('remaining.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("An error occurred while reading or parsing the file:", err);
        throw err;
    }
}

async function host_data(ip) {
    const url = `https://api.shodan.io/shodan/host/${ip}?key=${rotate ? key_A : key_B}`;
    rotate = !rotate;
    try {
        const response = await fetch(url);  
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
    
        const data = await response.json();
        return data;
    } catch (error) {
        await sleep(5000);
    } 

}

async function appendDataToFile(data) {
    const filePath = 'data.json';
    
    try {
        const existingData = await fs.readFile(filePath, 'utf8');
        const fileData = JSON.parse(existingData);
        fileData.push(data);
        await fs.writeFile(filePath, JSON.stringify(fileData, null, 2));
    } catch (err) {
        if (err.code === 'ENOENT') {
            // File does not exist, create it
            await fs.writeFile(filePath, JSON.stringify([data], null, 2));
        } else {
            console.error("An error occurred while reading or writing the file:", err);
            throw err;
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    let ips = await get_ip();
    for (let e of ips.ips) {
        let data = await host_data(e);
        console.log(data);
        await appendDataToFile(data);
        await sleep(2000);
    }
}

main().catch(console.error);
