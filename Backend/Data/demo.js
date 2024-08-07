const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

// async function getData() {
//     const apiKey = "OKqU53oJI0CLeBFYXqRTNXLCtArJlXgi";
//     const searchQuery = "org:'NCR Corporation'";
//     const baseUrl = `https://api.shodan.io/shodan/host/search?key=${apiKey}&query=${searchQuery}`;
//     const targets = [];

//     let results = [];
//     let page = 1;
//     let total = 0;
//     const resultsPerPage = 100; // Shodan returns 100 results per page

//     while (true) {
//         const response = await fetch(`${baseUrl}&page=${page}`);
//         if (!response.ok) {
//             throw new Error('Network response was not ok ' + response.statusText);
//         }

//         const data = await response.json();

//         // Update the total number of results on the first page
//         if (page === 1) {
//             total = data.total;
//             console.log(`Total results available: ${total}`);
//         }

//         // Add the current page's matches to the results array
//         const previousResultsLength = results.length;
//         results = results.concat(data.matches);

//         console.log(`Retrieved ${results.length} of ${total} results`);

//         // If no new results were added, break the loop
//         if (results.length === previousResultsLength) {
//             break;
//         }

//         // If the number of results retrieved in this iteration is less than the page size, it's the last page
//         if (data.matches.length < resultsPerPage) {
//             break;
//         }

//         page += 1;
//     }

//     console.log("Process started ......");

//     results.forEach((e) => {
//         targets.push(e.ip_str);
//     });

//     return targets;
// }

// async function main(){
//     let data =await getData();
//     let fdata = {'ips':data}
//     const jsondata= JSON.stringify(fdata);
//     fs.writeFile('targets.json',jsondata, (err) => {
//         if (err) {
//           console.error('Error writing to file:', err);
//         } else {
//           console.log('Data written to data.json');
//         }
//     });
// }

// main();


// function get_ip() {
// return new Promise((resolve, reject) => {
//     fs.readFile('targets.json', 'utf8', (err, data) => {
//     if (err) {
//         console.error("An error occurred while reading the file:", err);
//         return reject(err);
//     }

//     try {
//         const jsonData = JSON.parse(data);
//         resolve(jsonData);
//     } catch (parseErr) {
//         console.error("An error occurred while parsing the JSON data:", parseErr);
//         reject(parseErr);
//     }
//     });
// });
// }

// async function getdata(ip){

//     const apiId = '96d012b5-f023-4ce3-b943-05c1723af3be';
//     const secret = 'gIzj1V5ugGgdBwNzDfuDHiWWNiFMDte6';

//     // Create a Base64 encoded string of "apiId:secret"
//     const base64Credentials = btoa(`${apiId}:${secret}`);

//     const headers = {
//         'Authorization': `Basic ${base64Credentials}`,
//         'Content-Type': 'application/json'
//     };

//     const response = await fetch("https://search.censys.io/api/v2/hosts/184.64.100.125", {
//         headers: headers
//     });

//     const data = await response.json();
//     return data;


// }

// async function main() {
//     let IP_LIST = await get_ip();
//     let data =await getdata(IP_LIST.ips[0]);
//     console.log(data);

// }

// main();

async function getdata() {
    try {
        const data = await readFile('data.json', 'utf8');
        return data;
    } catch (err) {
        console.error("An error occurred while reading the file:", err);
        throw err;
    }
}

async function getips(){
    try {
        const data = await readFile('targets.json', 'utf8');
        return data;
    } catch (err) {
        console.error("An error occurred while reading the file:", err);
        throw err;
    }
}


async function main() {
    try {
        let doneips = [];
        let err = 0;
        let data = await getdata();
        data = JSON.parse(data)
        // console.log(data[0]);
        // let ips = await getips();
        // data = JSON.parse(data);
        // ips =  JSON.parse(ips);
        // ips = ips.ips;
        data.forEach((e)=>{
            try{
                doneips.push(e.ip_str);
            }
            catch{
                err++;
            }
        })
        console.log(doneips.length);

        // let remaining = ips.filter(ip => !doneips.includes(ip));
        // console.log("Total = ",ips.length);
        // console.log("Done = ",doneips.length);
        // console.log("Remaining = ",remaining.length);

        // let fdata = {'ips':remaining}
        // const jsondata= JSON.stringify(fdata);


        // fs.writeFile('remaining.json',jsondata, (err) => {
        //             if (err) {
        //               console.error('Error writing to file:', err);
        //             } else {
        //               console.log('Data written to data.json');
        //             }
        //         });
        
        


    } catch (err) {
        console.error("Failed to get data:", err);
    }
}

main();