const fs = require('fs').promises; // Importing the file system module for promises

async function getData() {
    const apiKey = "OKqU53oJI0CLeBFYXqRTNXLCtArJlXgi";
    const searchQuery = "org:'NCR Corporation'";
    const baseUrl = `https://api.shodan.io/shodan/host/search?key=${apiKey}&query=${searchQuery}`;
    const targets = [];

    let results = [];
    let page = 1;
    let total = 0;
    const resultsPerPage = 100; // Shodan returns 100 results per page

    while (true) {
        const response = await fetch(`${baseUrl}&page=${page}`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();

        // Update the total number of results on the first page
        if (page === 1) {
            total = data.total;
            console.log(`Total results available: ${total}`);
        }

        // Add the current page's matches to the results array
        const previousResultsLength = results.length;
        results = results.concat(data.matches);

        console.log(`Retrieved ${results.length} of ${total} results`);

        // If no new results were added, break the loop
        if (results.length === previousResultsLength) {
            break;
        }

        // If the number of results retrieved in this iteration is less than the page size, it's the last page
        if (data.matches.length < resultsPerPage) {
            break;
        }

        page += 1;
    }

    console.log("Process started ......");

    results.forEach((e) => {
        targets.push(e.ip_str);
    });

    return targets;
}

async function fetchWithRetry(ip, retries = 5) {
    try {
        const response = await fetch(`https://api.shodan.io/shodan/host/${ip}?key=Y4m0bwUYgY4D6J1dr3AWqwovBAuAuOKa`);

        if (!response.ok) {
            if (response.status === 429 && retries > 0) {
                // Rate limit hit, wait and retry
                console.log(`Rate limit hit for IP ${ip}. Retrying...`);
                const waitTime = 2000; // Wait for 2 seconds before retrying
                await new Promise(resolve => setTimeout(resolve, waitTime));
                return fetchWithRetry(ip, retries - 1); // Retry the request
            }
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return null; // Return null if there's an error
    }
}

async function saveDataToFile(data) {
    try {
        await fs.writeFile('output.json', JSON.stringify(data, null, 2)); // Save data as a JSON file
        console.log('Data saved to output.json');
    } catch (error) {
        console.error('Error writing file:', error);
    }
}

async function main() {
    try {
        const target_IP = await getData();
        const dataPromises = target_IP.map(ip => fetchWithRetry(ip)); // Use the fetchWithRetry function
        const data = await Promise.all(dataPromises); // Wait for all promises to resolve

        // Filter out any null results due to errors
        const validData = data.filter(item => item !== null);

        console.log(validData.length);

        // Save the valid data to a JSON file
        await saveDataToFile(validData);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

main();
