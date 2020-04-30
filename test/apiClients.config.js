import agility from '../src/content-management'
require('dotenv').config();

const websiteName = process.env.WEBSITE_NAME;
const securityKey = process.env.SECURITY_KEY;

function createApiClientUSA() {
    var api = agility.getApi({
		location: "USA",
		websiteName: websiteName,
		securityKey: securityKey
    });
    return api;
}

function createApiClientCanada() {
    var api = agility.getApi({
		location: "Canada",
		websiteName: websiteName,
		securityKey: securityKey,
    });
    return api;
}


function createApiClientDev() {
    var api = agility.getApi({
      websiteName: websiteName,
      securityKey: securityKey,
      baseURL: process.env.BASE_URL,
      debug: true
    });
    return api;
}

export {
    createApiClientUSA,
    createApiClientCanada,
    createApiClientDev
}