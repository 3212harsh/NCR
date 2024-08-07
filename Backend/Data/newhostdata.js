const fs = require('fs').promises;
const Hostmodel = require('../Database/Hosts');


async function getdata() {
  try {
    const data = await fs.readFile('data.json', 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading file:', err);
    return null;
  }
}

async function pushdata(d) {
  try {
    const data = new Hostmodel({ ...d }); // Spread the object to save it directly
    await data.save();
    console.log("Data saved successfully:")
  } catch (err) {
    console.error('Error saving data:', err);
  }
}

async function main() {
  const data = await getdata();
  if (data) {
    for (const item of data) {
    //   console.log("Saving item:", item);
      await pushdata(item);
    }
  } else {
    // console.error("No data to save.");
  }
}

main();
