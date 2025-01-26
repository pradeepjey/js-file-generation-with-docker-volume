const fs = require('fs');

// Helper function to generate random integer within range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate random alphabetical string
function generateAlphabeticalString() {
    const length = getRandomInt(5, 15);
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Generate random real number
function generateRealNumber() {
    const precision = getRandomInt(1, 10);
    return (Math.random() * 1000).toFixed(precision);
}

// Generate random integer
function generateInteger() {
    return getRandomInt(-1000000, 1000000);
}

// Generate random alphanumeric with spaces
function generateAlphanumeric() {
    const length = getRandomInt(5, 15);
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    
    // Add random spaces before
    const spacesBefore = getRandomInt(1, 5);
    result += ' '.repeat(spacesBefore);
    
    // Add alphanumeric string
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    // Add random spaces after
    const spacesAfter = getRandomInt(1, 5);
    result += ' '.repeat(spacesAfter);
    
    return result;
}

// Generate one set of random objects
function generateRandomSet() {
    const objects = [
        generateAlphabeticalString(),
        generateRealNumber(),
        generateInteger(),
        generateAlphanumeric()
    ];
    return objects.join(',');
}

// To generate file with 10MB
async function generateFileWithObjects(filename, targetSizeInMB) {
    const targetSize = targetSizeInMB * 1024 * 1024; // Convert MB to bytes
    let currentSize = 0;
    const writeStream = fs.createWriteStream(filename);
    
    console.log(`Generating ${targetSizeInMB}MB file...`);
    
    try {
        while (currentSize < targetSize) {
            const data =  generateRandomSet();
            currentSize += Buffer.byteLength(data);
            const updatedData = (currentSize >= targetSize)? data +  '' :  data + ',';
            console.log("current size->", currentSize);
            
            if (!writeStream.write(updatedData)) {
                // Handle backpressure
                await new Promise(resolve => writeStream.once('drain', resolve));
            }
        }
        
        writeStream.end();
        console.log('File generation complete!');
        
    } catch (error) {
        console.error('Error generating file:', error);
        writeStream.end();
    }
}

// Generate 10MB file
generateFileWithObjects('/data/random_objects.txt', 10);