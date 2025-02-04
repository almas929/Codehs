/*
 * This program converts a binary transmission into readable
 * ASCII characters based on the ASCII encoding standard.
 */
 
function start()
{
    var binaryMessage = getBinaryTransmission();
    
    var textMessage = asciiDecode(binaryMessage);
    
    println("Message Recieved!");
    println(textMessage);
}

// Decodes a given binary message into its equivalent ASCII characters
function asciiDecode(binaryMessage)
{
    // Initialize the resulting message
    var resultMessage = "";

    // Loop over the binary message in chunks of 8 bits
    for(var i = 0; i < binaryMessage.length; i += 8)
    {
        // Get the current byte of data from the message
        var currentByte = binaryMessage.substring(i, i+8);

        // Get the decimal value of that byte
        var decimalValue = binaryToDecimal(currentByte);

        // Get the ascii character that corresponds to the decimal value
        var asciiCharacter = String.fromCharCode(decimalValue);

        // Add that character to the resulting message
        resultMessage += asciiCharacter;
    }

    // Return the resulting message
    return resultMessage;
}

// Uses a javascript builtin function to convert the binary string
// to a numeric decimal value.
function binaryToDecimal(binaryString)
{
    return parseInt(binaryString, 2);
}

// Continually prompts the user for a binary transmission until
// a valid message is recieved. A valid message must contain full
// bytes of information, so if the message is not a multiple of 8 bits,
// pads 0s on the end of the message to make it a multiple of 8 bits.
// Also checks that the message contains only 0s and 1s.
function getBinaryTransmission()
{
    while(true)
    {
        var binaryMessage = readLine("Enter binary transmission: ");
        
        // Pad 0s on the end until the message is a multiple of 8 bits
        // allowing it to be decoded byte by byte
        while(binaryMessage.length % 8 != 0)
        {
            binaryMessage += "0";
        }
        if(binaryMessage.search("[^01]") != -1) 
        {
            println("Error: Your message should contain only 1s and 0s.");
        }
        else 
        {
            return binaryMessage;
        }
        
        
    }
}