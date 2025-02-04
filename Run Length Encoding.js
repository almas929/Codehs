/*
 * This program is an example of a simple lossless compression
 * algorithm called run length encoding.
 *
 * Runs of characters (sequences of the same character repeating)
 * in the original text are replaced with the single character and a
 * count of how many times it occurs.
 *
 * For example, 
 * "wwwwhaaaaaat?" 
 * would be converted into
 * "w4h1a6t1?1"
 * Using 10 characters instead of 13, or a 1 - (10 / 13) = 23% compression rate
 *
 * This works well with data that contains several long runs of the same character.
 */
 
function start()
{
    // Read in the original text
    var originalText = readLine("Enter the text you would like to compress: ");
    
    println("Original Text: " + originalText);
    println("");
    
    // Compress the text
    println("COMPRESSING...");
    
    var compressedText = compress(originalText);
    println("Compressed: " + compressedText);
    println("");
    
    // Decompress the text
    println("DECOMPRESSING...");
    
    var decompressedText = decompress(compressedText);
    println("Decompressed: " + decompressedText);
    println("");
    
    // Make sure the compression was lossless
    if(originalText == decompressedText)
    {
        println("Success! The decompressed text is the same as the original!");
    }
}

// Compresses the original String by building up a new String
// with each character and how many times it repeats in a given run.
// Returns the compressed text.
function compress(original)
{
    var result = "";
    var currentRunCharacter = "";
    var runLength = 0;
    for(var i = 0; i < original.length; i++)
    {
        // If it's the start of the string, the current run starts with
        // the first character
        if(i == 0)
        {
            currentRunCharacter = original.charAt(i);
            runLength = 1;
        }
        else
        {
            var currentChar = original.charAt(i);
            
            if(currentChar == currentRunCharacter)
            {
                runLength++;
            }
            else
            {
                // The run is over, add this run to the result
                result += currentRunCharacter + runLength;
                
                // Reset the run variables
                currentRunCharacter = currentChar;
                runLength = 1;
            }
        }
    }
    
    // Fencepost problem, the loop ended with the current run still going
    // Add the last run to the result
    result += currentRunCharacter + runLength;
    
    // Return the compressed result text
    return result;
}

// Decompresses the compressed Run Length Encoded text back
// into the original form.
function decompress(compressedText)
{
    var result = "";
    
    for(var i = 0; i < compressedText.length; i += 2)
    {
        // Get the current run character
        var character = compressedText.charAt(i);
        
        // Get the run length
        var runLength = parseInt(compressedText.charAt(i+1));
        
        // Add that many repetitions of the original character to the result
        for(var runIndex = 0; runIndex < runLength; runIndex++)
        {
            result += character;
        }
    }
    
    return result;
}
