/*
 * This program shows how DNA sequences encode proteins
 */
 
// Stores the mappings of given nucleotides to the corresponding amino acids
var NUCLEOTIDE_TO_AMINO = {
    "GCT GCC GCA GCG": "A",
    "CGT CGC CGA CGG AGA AGG": "R",
    "AAT AAC": "N",
    "GAT GAC": "D",
    "TGT TGC": "C",
    "CAA CAG": "Q",
    "GAA GAG": "E",
    "GGT GGC GGA GGG": "G",
    "CAT CAC": "H",
    "ATT ATC ATA": "I",
    "ATG": "M/start",
    "TTA TTG CTT CTC CTA CTG": "L",
    "AAA AAG": "K",
    "TTC TTT": "F",
    "CCT CCC CCA CCG": "P",
    "TCT TCC TCA TCG AGT AGC": "S",
    "ACT ACC ACA ACG": "T",
    "TGG": "W",
    "TAT TAC": "Y",
    "GTT GTC GTA GTG": "V",
    "TAA TGA TAG": "stop"
};

// Stores the mappings of amino chains to the corresponding proteins
// Currently only one stored. There exist hundreds of thousands of proteins in the human body alone.
var AMINO_TO_PROTEIN = {
    "NLYIQWLKDGGPSSGRPPPS": "TRP-Cage"
}; 
 
function start()
{
    // This represents a sequence of nucleotides, the building blocks of DNA
    var dna = "AACCTTTACATTCAGTGGCTGAAGGACGGGGGTCCGAGTTCTGGGCGTCCTCCTCCGTCT";
    
    // This is the amino acid chain that results from this DNA
    var aminoChain = DNAtoAminoChain(dna);
    
    // This is the protein that is encoded by the given amino chain
    var protein = aminoChainToProtein(aminoChain);
    
    println("The DNA sequence:");
    println(dna);
    println("Encodes the following amino acids:");
    println(aminoChain);
    println("Which encodes the folowing protein:");
    println(protein);
}

// Translates a group of 3 nucleotides into the corresponding amino acid
function nucleotidesToAminoAcid(nucleotides)
{
    for (var key in NUCLEOTIDE_TO_AMINO)
    {
        if(key.indexOf(nucleotides) != -1)
        {
            return NUCLEOTIDE_TO_AMINO[key];
        }
    }
    
    return "";
}

// Translates a given amino acid chain to the corresponding protein
function aminoChainToProtein(aminoChain)
{
    return AMINO_TO_PROTEIN[aminoChain];
}

// Translates a DNA chain into the corresponding amino acid chain
function DNAtoAminoChain(dna)
{
    var resultChain = "";
    
    // Every three nucleotides in the DNA chain encodes a single amino acid
    for(var i = 0; i < dna.length; i+=3)
    {
        var nucleotides = dna.substring(i, i+3);
        var aminoAcid = nucleotidesToAminoAcid(nucleotides);
        
        resultChain += aminoAcid;
    }
    
    return resultChain;
}