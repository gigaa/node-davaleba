// ArrayTasks

// 1)let arr = [1, [2, 3, [4, 5]], 5, [2, [3, 6]]] დაალაგე ზრდადობით და ამოიღე უნიკალურები გამოიყენე ForLoop
console.log("-------------------დავალება1-------------------");
let arr = [1, [2, 3, [4, 5]], 5, [2, [3, 6]]];
let flattedArr = arr.flat(Infinity).sort((a, b) => a - b);
let uniqeArr = new Set(flattedArr);
console.log(uniqeArr);

// 2) იპოვე ყველაზე მაღალი rating-ის მქონე პროდუქტი, მაგრამ ისეთი, რომლის ფასიც < 1000.
console.log("-------------------დავალება2-------------------");
let products = [
  { name: "Phone", price: 1200, rating: 4.5 },
  { name: "Laptop", price: 2500, rating: 4.8 },
  { name: "Book", price: 30, rating: 4.9 },
  { name: "TV", price: 800, rating: 4.0 },
];
let findProduct = products.filter((el) => el.price < 1000);
// console.log(findProduct);
let bestProduct = findProduct.reduce((tot, curr) =>
  curr.rating > tot.rating ? curr : tot,
);
console.log(bestProduct);

// 3)რედიუსის დახმარებით დათვალე რომელი რამდენჯერ მეორდება და for ლუპის დახმარებით იპოვე მეტჯერგამეორებული
console.log("-------------------დავალება3-------------------");
let sentence = "dog cat dog bird cat dog fish bird";
let sentenceArr = sentence.split(" ");
console.log(sentenceArr);
let sentenceResult = sentenceArr.reduce((tot, curr) => {
  if (tot[curr]) {
    tot[curr] += 1;
  } else {
    tot[curr] = 1;
  }
  return tot;
}, []);
console.log({ sentenceResult });

let mostFrequentWord = "";
let maxCount = 0;

for (let word in sentenceResult) {
  if (sentenceResult[word] > maxCount) {
    maxCount = sentenceResult[word];
    mostFrequentWord = word;
  }
}

console.log(
  `ყველაზე ხშირად განმეორდა: "${mostFrequentWord}" (${maxCount}-ჯერ)`,
);

// ForLoop tasks

// 1)დაწერე ფუნქცია for loop-ის გამოყენებით, რომელიც დაითვლის რამდენჯერ გვხვდება კონკრეტული ასო მოცემულ სტრინგში.
console.log("-------------------დავალება4-------------------");
function countLetter(text, letter) {
  let count = 0;
  for (let char of text) {
    if (char === letter) {
      count++;
    }
  }
  return count;
}

let text1 = "hello world";
let searchLetter = "l";

let result = countLetter(text1, searchLetter);
console.log(`ასო '${searchLetter}' გვხვდება ${result}-ჯერ.`);

// 2) დაწერე ფუნქცია, რომელიც შეამოწმებს არის თუ არა სტრინგი პალინდრომი (ეს სიტყვა თუ იკითხება ერთნაირად ესე იგი პალინდრომია.მაგალითად ana, abba,gig)
console.log("-------------------დავალება5-------------------");

function isPalindrome(str) {
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, "");

  const reversedStr = cleanStr.split("").reverse().join("");

  return cleanStr === reversedStr;
}

console.log(isPalindrome("ana"));
console.log(isPalindrome("jim"));
console.log(isPalindrome("abba"));
console.log(isPalindrome("hello"));

// 3)შექმენი ფუნქცია, რომელიც მიიღებს ორ რიცხვების მასივს, გააერთიანებს მათ, წაშლის დუბლიკატებს და დაითვლის ჯამს. გამოიყენე მასივის მეთოდები და ლოგიკური ოპერატორები საჭიროებისამებრ.
console.log("-------------------დავალება6-------------------");
function arrJoin(arr1, arr2) {
  let arrJoin = arr1.concat(arr2);
  let arrJoinUniqe = new Set(arrJoin);
  console.log(arrJoinUniqe);
}
let arr1 = [1, 2, 3, 5, 4];
let arr2 = [4, 5, 6, 3, 1];
arrJoin(arr1, arr2);

//  4)შექმენი ფუნქცია ფაქტორიალის დასათვლელად.
console.log("-------------------დავალება7-------------------");

function factorialIterative(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }

  return result;
}

console.log(factorialIterative(6));

// 5)Two Sum - მოძებნე მასივში ის წყვილები, რომელთა ჯამიც უდრის მოცემულ რიცხვს ანუ [1,2,3,4,5,6,-7,-8] ამ მასივს და -15 თუ გადავცემთ მან უნდა დააბრუნოს [6,7]
console.log("-------------------დავალება8-------------------");

function twoSumBruteForce(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        return [arr[i], arr[j]];
      }
    }
  }
  return null;
}

const nums = [1, 2, 3, 4, 5, 6, -7, -8];
console.log(twoSumBruteForce(nums, -15));

