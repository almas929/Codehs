/*
 * This program encodes user input into binary data!
 * Your job is to write the textToBinary function
 */
 
function start()
{
    var text = readLine("Input the string you would like to encode: ");
    
    var binary = textToBinary(text);
    
    println(binary);
}

function textToBinary(text)
{
    var binaryString = "";
    
    for (var i = 0; i < text.length; i++) {
        var asciiValue = text.charCodeAt(i);  // Convert character to ASCII
        var binaryValue = decimalToBinary(asciiValue);  // Convert ASCII to binary
        binaryString += binaryValue;  // Append to final binary string
    }
    
    return binaryString;
    // Write this method!
    
    // For every character in the text,
        // convert the character into its ASCII decimal encoding
        // then convert that decimal value into its equivalent binary encoding
        // and combine each binary encoding to get the resulting binary string
    
}

// Converts a given decimal value into an 8 bit binary value
function decimalToBinary(decimalValue)
{
    var binaryBase = 2;
    var numBitsDesired = 8;
    var binaryValue = decimalValue.toString(binaryBase);
    
    while(binaryValue.length < numBitsDesired)
    {
        binaryValue = "0" + binaryValue;
    }
    
    return binaryValue;
}