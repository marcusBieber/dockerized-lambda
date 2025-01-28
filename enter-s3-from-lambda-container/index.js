const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
    // Lese den Namen des S3-Buckets aus der Umgebungsvariable
    const bucketName = process.env.S3_BUCKET_NAME; // Umgebungsvariable für den Bucketnamen
    
    // Handle die Aktion, die durch das Event definiert wird
    const action = event.action;
    
    if (action === 'upload') {
        const fileName = event.fileName;
        const fileContent = event.fileContent;
        await uploadFileToS3(fileName, fileContent, bucketName);
        return {
            statusCode: 200,
            body: `File ${fileName} uploaded successfully.`
        };
    } else if (action === 'read') {
        const fileName = event.fileName;
        const fileContent = await readFileFromS3(fileName, bucketName);
        return {
            statusCode: 200,
            body: fileContent
        };
    } else {
        return {
            statusCode: 400,
            body: 'Invalid action'
        };
    }
};

// Funktion zum Hochladen einer Datei zu S3
async function uploadFileToS3(fileName, fileContent, bucketName) {
    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: fileContent
    };
    await s3.putObject(params).promise();
}

// Funktion zum Lesen einer Datei von S3
async function readFileFromS3(fileName, bucketName) {
    const params = {
        Bucket: bucketName,
        Key: fileName
    };
    const data = await s3.getObject(params).promise();
    return data.Body.toString('utf-8');
}
