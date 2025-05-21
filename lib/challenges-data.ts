export interface Challenge {
  id: string
  title: string
  description: string
  difficulty: "easy" | "medium" | "hard"
  tags: string[]
  problem: string
  hint: string
  solution: string
  starterCode?: string
  testFunction?: string
  testInput?: string
}

export const challenges: Challenge[] = [
  {
    id: "challenge-1",
    title: "Palindrome Checker",
    description: "Create a function to check if a string is a palindrome",
    difficulty: "easy",
    tags: ["Strings", "Algorithms"],
    problem:
      'Write a function that checks if a given string is a palindrome. A palindrome is a word, phrase, number, or other sequence of characters that reads the same forward and backward (ignoring spaces, punctuation, and capitalization).\n\nExamples:\n- isPalindrome("racecar") should return true\n- isPalindrome("hello") should return false\n- isPalindrome("A man, a plan, a canal: Panama") should return true',
    hint: "Consider using string manipulation methods to remove spaces and special characters, then compare the string with its reverse.",
    solution: `function isPalindrome(str) {
  // Remove non-alphanumeric characters and convert to lowercase
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Compare with reversed string
  return cleanStr === cleanStr.split('').reverse().join('');
}`,
    starterCode: `function isPalindrome(str) {
  // Write your code here
  
}

// Example usage
console.log(isPalindrome("racecar")); // should return true
console.log(isPalindrome("hello")); // should return false
console.log(isPalindrome("A man, a plan, a canal: Panama")); // should return true`,
    testFunction: "isPalindrome",
    testInput: '"A man, a plan, a canal: Panama"',
  },
  {
    id: "challenge-2",
    title: "FizzBuzz Implementation",
    description: "Implement the classic FizzBuzz problem",
    difficulty: "easy",
    tags: ["Loops", "Conditionals"],
    problem:
      'Write a function that prints numbers from 1 to n. For multiples of 3, print \'Fizz\' instead of the number. For multiples of 5, print \'Buzz\'. For numbers that are multiples of both 3 and 5, print \'FizzBuzz\'.\n\nExamples:\n- fizzBuzz(15) should return ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"]',
    hint: "Use modulo operator (%) to check if a number is divisible by another number.",
    solution: `function fizzBuzz(n) {
  const result = [];
  
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      result.push("FizzBuzz");
    } else if (i % 3 === 0) {
      result.push("Fizz");
    } else if (i % 5 === 0) {
      result.push("Buzz");
    } else {
      result.push(i.toString());
    }
  }
  
  return result;
}`,
    starterCode: `function fizzBuzz(n) {
  // Write your code here
  
}

// Example usage
console.log(fizzBuzz(15));
// Should output: ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"]`,
    testFunction: "fizzBuzz",
    testInput: "15",
  },
  {
    id: "challenge-3",
    title: "Anagram Detector",
    description: "Create a function to check if two strings are anagrams",
    difficulty: "medium",
    tags: ["Strings", "Algorithms"],
    problem:
      'Write a function that determines if two strings are anagrams of each other. An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, using all the original letters exactly once.\n\nExamples:\n- areAnagrams("listen", "silent") should return true\n- areAnagrams("hello", "world") should return false',
    hint: "Consider sorting the characters of both strings or using a character frequency counter.",
    solution: `function areAnagrams(str1, str2) {
  // Remove spaces and convert to lowercase
  const normalize = (str) => str.toLowerCase().replace(/\\s/g, '');
  
  const normalizedStr1 = normalize(str1);
  const normalizedStr2 = normalize(str2);
  
  // Check if lengths are different
  if (normalizedStr1.length !== normalizedStr2.length) {
    return false;
  }
  
  // Sort and compare
  return normalizedStr1.split('').sort().join('') === normalizedStr2.split('').sort().join('');
}`,
    starterCode: `function areAnagrams(str1, str2) {
  // Write your code here
  
}

// Example usage
console.log(areAnagrams("listen", "silent")); // should return true
console.log(areAnagrams("hello", "world")); // should return false`,
    testFunction: "areAnagrams",
    testInput: '"listen", "silent"',
  },
]
