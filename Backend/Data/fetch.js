async function shodan() {
    try {
        const response = await fetch("https://api.shodan.io/shodan/host/184.64.100.125?key=Y4m0bwUYgY4D6J1dr3AWqwovBAuAuOKa");

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

async function censys() {
    const apiId = '96d012b5-f023-4ce3-b943-05c1723af3be';
    const secret = 'gIzj1V5ugGgdBwNzDfuDHiWWNiFMDte6';

    // Create a Base64 encoded string of "apiId:secret"
    const base64Credentials = btoa(`${apiId}:${secret}`);

    const headers = {
        'Authorization': `Basic ${base64Credentials}`,
        'Content-Type': 'application/json'
    };

    try {
        const response = await fetch("https://search.censys.io/api/v2/hosts/184.64.100.125", {
            headers: headers
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

(async function() {
    const shodanData = await shodan();
    const censysData = await censys();

    // console.log('Shodan Data:', shodanData);
    // console.log('Censys Data:', censysData);
    console.dir(shodanData, { depth: null, colors: true });
    // console.dir(censysData, { depth: null, colors: true });
})();
