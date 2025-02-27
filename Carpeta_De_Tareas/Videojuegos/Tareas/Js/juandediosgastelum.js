// Juan de Dios Gastélum Flores

// Ejercicio 1
export function firstNonRepeating(string){
    for (let i=0; i<string.length; i++){
        let repeated = false;
        for (let j=0; j<string.length; j++){
            if (string[i] == string[j] && i!=j){
                repeated = true;
                break;
            }
        }
        if (!repeated){
            return string[i];
        }
    }
    return console.log("Empty string");
}

let testString = 'abacddbec';
console.log(firstNonRepeating(testString));
console.log(firstNonRepeating(''));

// Ejercicio 2
export function bubbleSort(arr) {
    let n = arr.length;
    let swapped = true;
    while (swapped == true) {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
        n = n - 1;
    }
    return arr;
}

let numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(bubbleSort(numbers));

// Ejercicio 3
export function invertArray(arr) {
    let newArr = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        newArr[newArr.length] = arr[i];
    }
    return newArr;
}

export function invertArrayInplace(arr) {
    let left = 0;
    let right = arr.length - 1;
    while (left < right) {
        let temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
    }
    return arr;
}

let arrayToInvert = [1, 2, 3, 4, 5];
console.log(invertArray(arrayToInvert));
console.log(invertArrayInplace(arrayToInvert));
console.log(invertArrayInplace([]));
console.log(invertArrayInplace([1]));
console.log(invertArrayInplace([1, 2]));

// Ejercicio 4
export function capitalize(str) {
    if (str === "") return "";
    let words = str.split(' ');
    let result = [];
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        if (word.length > 0) {
            let capitalizedWord = word[0].toUpperCase() + word.substring(1);
            result[result.length] = capitalizedWord;
        } else {
            result[result.length] = word;
        }
    }
    return result.join(' ');
}

let testString2 = 'mi nombre es juan de dios';
console.log(capitalize(testString2));

// Ejercicio 5
export function mcd(a, b) {
    while (b != 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

let num1 = 56;
let num2 = 98;
console.log(mcd(num1, num2));

// Ejercicio 6
export function hackerSpeak(str) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        let char = str[i].toLowerCase();
        if (char == 'a') result += '4';
        else if (char == 'e') result += '3';
        else if (char == 'i') result += '1';
        else if (char == 'o') result += '0';
        else if (char == 's') result += '5';
        else result += str[i];
    }
    return result;
}

let testString3 = 'Javascript es divertido';
console.log(hackerSpeak(testString3));

// Ejercicio 7
export function factorize(num) {
    let factors = [];
    for (let i = 1; i <= num; i++) {
        if (num % i == 0) {
            factors[factors.length] = i;
        }
    }
    return factors;
}

let numberToFactorize = 12;
console.log(factorize(numberToFactorize));

// Ejercicio 8
export function deduplicate(arr) {
    let unique = [];
    for (let i = 0; i < arr.length; i++) {
        if (unique.indexOf(arr[i]) === -1) {
            unique[unique.length] = arr[i];
        }
    }
    return unique;
}

let arrayWithDuplicates = [1, 0, 1, 1, 0, 0];
console.log(deduplicate(arrayWithDuplicates));

// Ejercicio 9
export function findShortestString(arr) {
    if (arr.length === 0) return 0;
    let shortest = arr[0].length;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].length < shortest) {
            shortest = arr[i].length;
        }
    }
    return shortest;
}

let stringArray = ['apple', 'banana', 'kiwi', 'strawberry'];
console.log(findShortestString(stringArray));

// Ejercicio 10
export function isPalindrome(str) {
    let cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    let reversedStr = cleanedStr.split('').reverse().join('');
    return cleanedStr == reversedStr;
}

let testPalindrome = 'A man, a plan, a canal, Panama';
console.log(isPalindrome(testPalindrome));

// Ejercicio 11
export function sortStrings(arr) {
    return arr.sort();
}

let stringList = ['banana', 'apple', 'kiwi', 'strawberry'];
console.log(sortStrings(stringList));

// Ejercicio 12
export function stats(numbers) {
    if (numbers.length === 0) return [null, null];
    let sortedNumbers = [...numbers];
    sortedNumbers.sort((a, b) => a - b);

    let median;
    let mid = Math.floor(sortedNumbers.length / 2);
    if (sortedNumbers.length % 2 === 0) {
        median = (sortedNumbers[mid - 1] + sortedNumbers[mid]) / 2;
    } else {
        median = sortedNumbers[mid];
    }

    let frequency = new Map();
    let maxFreq = 0;
    let mode = null;
    for (let num of numbers) {
        let count = (frequency.get(num) || 0) + 1;
        frequency.set(num, count);
        if (count > maxFreq) {
            maxFreq = count;
            mode = num;
        }
    }

    return [median, mode];
}

console.log(stats([]));
console.log(
    stats(
        Array.from({ length: 100000 }, () => Math.floor(Math.random() * 1000))
    )
);

let testNumbers = [8, 4, 2, 6, 8, 13, 17, 2, 4, 8];
console.log(stats(testNumbers));

// Ejercicio 13
export function popularString(arr) {
    let frequency = {};
    let maxFreq = 0;
    let mostPopular = '';
    for (let i = 0; i < arr.length; i++) {
        let str = arr[i];
        if (frequency[str] == null) frequency[str] = 0;
        frequency[str]++;
        if (frequency[str] > maxFreq) {
            maxFreq = frequency[str];
            mostPopular = str;
        }
    }
    return mostPopular;
}

let stringArray2 = ['apple', 'banana', 'apple', 'kiwi', 'banana', 'banana'];
console.log(popularString(stringArray2));

// Ejercicio 14
export function isPowerOf2(num) {
    if (num <= 0) return false;
    while (num > 1) {
        if (num % 2 !== 0) return false;
        num = num / 2;
    }
    return true;
}

let testNumber = 16;
console.log(isPowerOf2(testNumber));

// Ejercicio 15
export function sortDescending(arr) {
    return arr.sort(function(a, b) { return b - a; });
}

let numbersToSort = [5, 3, 8, 1, 2];
console.log(sortDescending(numbersToSort));