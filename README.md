# Agility Content Management JS SDK
This is the official JavaScript library for inserting, updating, managing and importing content, pages and media in your [Agility CMS](https://agilitycms.com) instance.

Don't have an Agility CMS instance? Sign up for [Free (forever)](https://account.agilitycms.com/sign-up?product=agility-free) today!

## Features
Programmatically manage content via JavaScript API client

| Agility Instance Management  | Content Management | Media Management |
| ------------- | ------------- | ------------- |
| Get API  | Approve Content | Get Media |
|| Approve Content ||
|| Decline Content ||
|| Delete Content ||
|| Publish Content ||
|| Request Approval ||
|| Save Content Item ||
|| Unpublish Content ||

## Getting Started
### Installation
Install it using **npm** (recommended):
```
npm install @agility/content-management
```

## Making a Request
### Create an instance of API client for Agility Content Management REST API
#### Get API
```javascript
import agilityMgmt from '@agility/content-management'

const mgmtApi = agilityMgmt.getApi({
  location: 'USA',
  websiteName: 'MyWebsiteName',
  securityKey: 'xyz123'
});

```
### Content Management
#### Approve Content
```javascript
//Set the contentID and language code of content you want to approve
let contentID = contentIDToWorkOn;
let languageCode = "en-us";

api.approveContent({
 contentID,
 languageCode
})
.then(function(contentID) {
 //check contentID is greater > 0 for success
})
.catch(function(error) {
 //handle error
});
```
#### Decline Content
```javascript
//Set the contentID and language code of content you want to decline
let contentID = contentIDToWorkOn;
let languageCode = "en-us";

api.declineContent({
 contentID,
 languageCode
})
.then(function(contentID) {
 //check contentID is greater > 0 for success
})
.catch(function(error) {
 //handle error
});
```
#### Delete Content
```javascript
//Set the contentID and language code of content you want to delete
let contentID = contentIDToWorkOn;
let languageCode = "en-us";

api.deleteContent({
 contentID,
 languageCode
})
.then(function(contentID) {
 //check contentID is greater > 0 for success
})
.catch(function(error) {
 //handle error
});
```

#### Publish Content
```javascript
//Set the contentID and language code of content you want to publish
let contentID = contentIDToWorkOn;
let languageCode = "en-us";

api.publishContent({
 contentID,
 languageCode
})
.then(function(contentID) {
 //check contentID is greater > 0 for success
})
.catch(function(error) {
 //handle error
});
```

#### Request Approval
```javascript
//Set the contentID and language code of content you want to request for approval
let contentID = contentIDToWorkOn;
let languageCode = "en-us";

api.requestApproval({
 contentID,
 languageCode
})
.then(function(contentID) {
 //check contentID is greater > 0 for success
})
.catch(function(error) {
 //handle error
});
```

#### Save Content Item
```javascript
//Set the contentItem structure
//Important: The fields are not camel case - make sure the field names match EXACTLY with your content definition in Agility instance
//The example below shows how to structure your fields with simple types and nested objects
let contentItem = {
 contentID: -1,
 fields: {
  "Title": "Test Title",
  "Image": {
   "mediaID": 123,
   "label": "Test Image"
  }
 }
}

//Set language code and reference name of content you want to save
let languageCode = "en-us";
let referenceName = "MyReferenceName";

api.saveContentItem({
 contentItem,
 languageCode,
 referenceName
})
.then(function(contentID) {
 //check contentID is greater > 0 for success
 //update contentID of saved item
 contentIDToWorkOn = contentID;
})
.catch(function(error) {
 //handle error
});
```
#### Unpublish Content
```javascript
//Set the contentID and language code of content you want to unpublish
let contentID = contentIDToWorkOn;
let languageCode = "en-us";

api.unpublishContent({
 contentID,
 languageCode
})
.then(function(contentID) {
 //check contentID is greater > 0 for success
})
.catch(function(error) {
 //handle error
});
```
### Media Management
#### Get Media
```javascript
//Set the path to the media
//Important: The path is the file name in Agility Media you need to access
let path = "test.png"

api.getMediaID({
 path
})
.then(function(mediaObj) {
 //check if media is not null/empty and has valid url for success
})
.catch(function(error) {
 //handle error
});
```

#### Upload Media
```javascript
//Create media stream, save blob variable and set filename
let blob = fs.createReadStream('./test/sample/logo.png')
let filename = `test-${new Date().toISOString().replace(/\./g, "").replace(/:/g, "")}.png`;

api.uploadMedia({
 fileName: filename,
 fileContent: blob
})
.then(function(mediaObj) {
 //check if media is not null/empty and has valid url for success
})
.catch(function(error) {
 //handle error
});
```

## Documentation
Full documentation for this SDK can be found in our [Agility Management JS SDK Reference Doc](https://agilitydocs.netlify.app/agility-content-management-js-sdk).

For docs & help around Agility CMS, please see [Agility CMS Documentation](https://help.agilitycms.com/hc/en-us)

## Contributing
If you would like to contribute to this SDK, you can fork the repository and submit a pull request. We'd love to include your updates.

### Running the Tests
An essential part of contributing to this SDK is adding and running unit tests to ensure the stability of the project.
```
> npm run test
```


