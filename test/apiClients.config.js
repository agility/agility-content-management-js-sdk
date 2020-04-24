import agility from '../src/content-management'

// Agility Instance = 'Headless Integration Testing' [Dev]
const websiteName = "Headless Integration Testing";
const securityKey = 'SABlAGEAZABsAGUAcwBzACAASQBuAHQAZQBnAHIAYQB0AGkAbwBuACAAVABlAHMAdABpAG4AZwAtAEEANwA5ADUANAAxAEMANQAtAEUAQgAzADIALQA0ADYAMwBCAC0AQgBBADYANgAtADkARQBDAEMANwBCADYAOAA3ADYANQBFAA==';

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
		baseURL: "https://dev-contentserver.publishwithagility.com",
		//baseURL: "http://contentserver.dev.edentity.ca",
		debug: true
    });
    return api;
}

export {
    createApiClientUSA,
    createApiClientCanada,
    createApiClientDev
}