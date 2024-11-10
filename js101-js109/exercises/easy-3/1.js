// Write a function that takes a string argument and 
// returns a new string that contains the value of 
// the original string with all consecutive duplicate
// characters collapsed into a single character.

function crunch(str) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        if (str[i] !== str[i + 1]) {
        result += str[i];
        }
    }
    return result;
}


// test cases:
console.log(crunch('ddaaiillyy ddoouubbllee'));    // "daily double"
console.log(crunch('4444abcabccba'));              // "4abcabcba"
console.log(crunch('ggggggggggggggg'));            // "g"
console.log(crunch('a'));                          // "a"
console.log(crunch(''));                           // ""