import crypto from 'crypto'


function logError(consoleMessage) {
    console.error('\x1b[41m%s\x1b[0m', consoleMessage);
}

function logDebug(consoleMessage) {
    console.log('\x1b[33m%s\x1b[0m', consoleMessage);
}


function buildAPIUrl({ methodName, args}) {

	let url = `${methodName}?`;

	for (const key in args) {
		if (args.hasOwnProperty(key)) {

			const val = args[key];
			url += `${key}=${val}&`
		}
	}

	url = url.substring(0, url.length -1);

	return url;
}


function buildAuthHeader({config, methodName, args}) {

	let websiteName = config.websiteName;
	let securityKey = config.securityKey;

	//build the sorted params list for the hash
	let params = []

	for (const key in args) {
		if (args.hasOwnProperty(key)) {
			const val = args[key];
			params.push(val)
		}
	}

	params = params.sort((a, b) => {
		return a > b;
	});

	const str = `${websiteName}.${securityKey}.${methodName}.${params.join(".")}.${websiteName}`;
	const hash = crypto.createHash("sha1").update(str).digest('hex');

    let headers = {
		'agility-website': config.websiteName,
		'agility-hash': hash
    };

    return headers;
}

function isHttps(url) {
	//HACK
	return true;
    if(!url.toLowerCase().startsWith('https://')) {
        return false;
    }
    return true;
}


export {
    buildAPIUrl,
    buildAuthHeader,
    isHttps,
    logError,
    logDebug
}