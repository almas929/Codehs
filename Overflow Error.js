function start(x)
{
    var decimalValue = readInt("Decimal value = ");
    
    var binaryValue = decimalToBinary(decimalValue);
    
    println(decimalValue + " (dec) = " + binaryValue + " (bin)");
}

/*
 * Takes a decimal value as a parameter and returns a String
 * representing the equivalent binary value.
 * 
 * Example: 13 (decimal) will be converted into 1101 (binary)
 *
 * The largest power of 2 that fits into 13 is 8, or 2^3.
 * 13 - 8 = 5. So 13 = 8 + 5, or 2^3 with 5 left over.
 *
 * The largest power of 2 that fits into 5 is 4, or 2^2.
 * 5 - 4 = 1. So 13 = 8 + 4 + 1, or 2^3 + 2^2 with 1 left over.
 *
 * 1 already is a power of 2, 2^0.
 *
 * 13 =   8 +   4 +   1
 * 13 = 2^3 + 2^2 + 2^0
 *
 * So in binary, we have 1 group of 8, 1 group of 4, 0 groups of 2,
 * and 1 group of 1, or 1101
 *
 * 13 (decimal) = 1101 (binary)
 */
function decimalToBinary(decimalValue)
{
    // Represents the resulting binary string
    var binaryResult = "";
    
    // Compute the starting exponent
    var largestPowerOf2 = Math.floor(Math.log2(decimalValue));
    
    // Remainder starts off as the original value
    var currentRemainder = decimalValue;
    
    // Starting from the largest exponent, count down the exponent to 0.
    // If the current power of 2 fits into the remainder, add a 1 to the binary result
    // and subtract the current power of 2 from the remainder
    // Otherwise, add a 0 to the binary result and the remainder remains the same.
    for(var currentExponent = largestPowerOf2; currentExponent >= 0; currentExponent--)
    {
        var placeValue = Math.pow(2, currentExponent);
        
        if(placeValue <= currentRemainder)
        {
            binaryResult += "1";
            
            currentRemainder -= placeValue;
        }
        else
        {
            binaryResult += "0";
        }
        if (binaryResult.length > 8){
        binaryResult = "00000000";
        }
    }
    
    return binaryResult;
}