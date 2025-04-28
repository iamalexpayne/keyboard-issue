// This script updates the VITE_API_BASE_URL in the .env file with your current local IP address
const fs = require('fs');
const os = require('os');
const path = require('path');

function getLocalIp() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return null;
}

const envPath = path.join(__dirname, '../.env');
const ip = getLocalIp();
if (!ip) {
  console.error('Could not determine local IP address.');
  process.exit(1);
}

let envContent = fs.readFileSync(envPath, 'utf8');
const newLine = `VITE_API_BASE_URL=http://${ip}:8000`;
if (envContent.match(/^VITE_API_BASE_URL=.*$/m)) {
  envContent = envContent.replace(/^VITE_API_BASE_URL=.*$/m, newLine);
} else {
  envContent += `\n${newLine}`;
}
fs.writeFileSync(envPath, envContent, 'utf8');
console.log(`Updated VITE_API_BASE_URL to http://${ip}:8000 in .env`);
