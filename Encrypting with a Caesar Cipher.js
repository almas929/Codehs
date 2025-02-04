/*
 * This program encrypts alphabetical messages using a
 * Caesar cipher.
 *
 * Given a secret key k, this algorithm simply shifts each alphabetical
 * character in the message up by k characters. If the shift pushes
 * a character past 'z', it wraps back around to the beginning and
 * becomes 'a'.
 *
 * For example, "abcz" encrypted with a key of 1 would become "bcda"
 */
 
var SECRET_KEY = 8;
var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function start()
{
    var originalMessage = readLine("Enter your message that you want to encrypt: ");
    originalMessage = originalMessage.toUpperCase();
    
    println("Encrypting with a Caesar Cipher...");
    var encrypted = caesarEncrypt(originalMessage, SECRET_KEY);
    println("Done:");
    
    println(encrypted);
}

function caesarEncrypt(message, key)
{
    var encryptedResult = "";
    
    for(var i = 0; i < message.length; i++)
    {
        // Get the character in the original message
        var originalCharacter = message.charAt(i);
        
        // If it's an alphabetical character, we'll compute the new
        // shifted character and add it to the encrypted result
        var alphabeticIndex = ALPHABET.indexOf(originalCharacter);
        if(alphabeticIndex >= 0)
        {
            // Compute new index
            var newIndex = alphabeticIndex + key;
            newIndex = newIndex % ALPHABET.length;
            
            // Get the new character
            var newCharacter = ALPHABET.charAt(newIndex);
            
            // Add the new shifted character to the encrypted result
            encryptedResult += newCharacter
        }
        
        // Otherwise we'll keep the original character
        else
        {
            encryptedResult += originalCharacter;
        }
    }
    
    return encryptedResult;
}
