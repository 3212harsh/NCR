const fs = require('fs').promises;

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
    let ssl_certs = [];
    let unique_ssl = new Set();  // Using Set to ensure uniqueness

    data.forEach((e) => {
        if (e && e.data) {
            e.data.forEach((i) => {
                if (i.ssl) {
                    ssl_certs.push(i.ssl);
                }
            });
        }
    });

    ssl_certs.forEach((e) => {
        // Convert the SSL object to a string to compare for uniqueness
        unique_ssl.add(JSON.stringify(e));
    });

    const uniqueSslArray = Array.from(unique_ssl).map((e) => JSON.parse(e)); // Convert back to objects if needed

    console.log(`Total unique SSL objects: ${uniqueSslArray.length}`);
    console.log(uniqueSslArray[0]);  // Optionally print all unique SSL objects
}

async function main() {
    let data = await getdata();
    if (data) {
        await ssl(data);
    }
}

main();
