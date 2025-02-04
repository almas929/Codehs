/*
 * This program shows a simple way to crack a Caesar Cipher.
 *
 * The Caesar Cipher is not a secure encryption, because there's
 * 26 possible keys to try before cracking the cipher.
 *
 */

var ALPHABET = "abcdefghijklmnopqrstuvwxyz";

function start()
{
    var originalMessage = readLine("Enter the message you would like to encrypt: ");
    originalMessage = originalMessage.toLowerCase();
    
    var secretKey = readInt("Enter the number you'd like to shift each character by: ");
    
    var encryptedMessage = caesarEncrypt(originalMessage, secretKey);
    println("");
    println("Encrypted message: " + encryptedMessage);
    
    println("");
    println("Attempting to crack the encryption...");
    println("");
    
    var crackedKey = crackCaesar(encryptedMessage, originalMessage);
    
    println("Correctly guessed the key: " + crackedKey);
}

// Attempts every possible key until the message is successfully
// decrypted
// Returns the caesar key that the original message was encrypted with
function crackCaesar(encryptedMessage, originalMessage)
{
    for(var i = 0; i < 26; i++)
    {
        var decryptedMessageAttempt = caesarDecrypt(encryptedMessage, i);
        if(decryptedMessageAttempt == originalMessage)
        {
            println("Cipher was cracked in only " + i + " tries!");
            println("Correctly decrypted message: " + decryptedMessageAttempt);
            return i;
        }
    }
    
    return -1;
}

function caesarDecrypt(encryptedMessage, key)
{
    // Decrypting is the same process as encrypting,
    // the key just needs to shift the letters back instead of forward
    return caesarEncrypt(encryptedMessage, -key);
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
            var newIndex = alphabeticIndex + key + ALPHABET.length;
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
