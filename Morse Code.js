var MORSE_ENCODING = {
    'A': "01",
    'B': "1000",
    'C': "1010",
    'D': "100",
    'E': "0",
    'F': "0010",
    'G': "110",
    'H': "0000",
    'I': "00",
    'J': "0111",
    'K': "101",
    'L': "0100",
    'M': "11",
    'N': "10",
    'O': "111",
    'P': "0110",
    'Q': "1101",
    'R': "010",
    'S': "000",
    'T': "1",
    'U': "001",
    'V': "0001",
    'W': "011",
    'X': "1001",
    'Y': "1011",
    'Z': "1100",
};

function start() 
{
    var textInput = readLine("Enter your message: ");
    textInput = textInput.toUpperCase();
    var morseEncoding = morseEncode(textInput);
    
    println("Original message: " + textInput);
    println("Morse Encoding: " + morseEncoding);
}

function morseEncode(input)
{
    var result = "";
    for(var i = 0; i < input.length; i++)
    {
        var letter = input.charAt(i);
        
        // If this is not the first letter in the message,
        // we need to add a space between the previous encoded letter
        // and the current encoded letter.
        if(i > 0)
        {
            result += " ";
        }
        
        if(letter in MORSE_ENCODING)
        {
            result += MORSE_ENCODING[letter];
        }
        else
        {
            result += letter;
        }
    }
    return result;
}