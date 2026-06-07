// 1)დაწერე ფუქნცია რომელიც გაფილტრავს ლუწებზე და იპოვი მათ საშუალოს [1,2,3,4,5,6]
console.log("-------------------დავალება1-------------------");
let arr1 = [1, 2, 3, 4, 5, 6];
let filterArr1 = arr1.filter((el) => el % 2 === 0);
let totalSum = filterArr1.reduce((tot, cur) => tot + cur, 0);
let average = totalSum / filterArr1.length;
console.log("average: " + average);

// 2)დაწერე ფუნქცია, რომელიც დათვლის სიტყვების რაოდენობას წინადადებაში.
console.log("-------------------დავალება2-------------------");
let srt1 = "I love JavaScript";
let arr2 = srt1.split(" ");
console.log("სიტყვების რაოდენობაა: " + arr2.length);

// 3) დაწერე ფუნქიცა რომელიც დააბრუნებს true თუ რიცხვი მარტივია თუ არადა false.
console.log("-------------------დავალება3-------------------");

function isPrime(num) {
  if (num <= 1) return false;

  if (num === 2) return true;

  if (num % 2 === 0) return false;

  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
}
console.log(isPrime(11));
console.log(isPrime(4));
console.log(isPrime(1));
console.log(isPrime(3));

// 4) let words = ["dog", "elephant", "cat", "hippopotamus"] იპოვე ყველაზე გრძელი ისტყვა
console.log("-------------------დავალება4-------------------");
let words = ["dog", "elephant", "cat", "hippopotamus"];
let longestWord = words.reduce((tot, cur) => {
  return cur.length > tot.length ? cur : tot;
}, "");
console.log(longestWord);

// 5)let arr = [3, 5, 3, 2, 5, 5, 3, 5] დააბრუნე ისეთი რიცხვი რომელიც მეორდება უფრო მეტჯერ
console.log("-------------------დავალება5-------------------");
let arr5 = [3, 5, 3, 2, 5, 5, 3, 5];
const result = arr5.reduce(
  (tot, cur) => {
    tot.counts[cur] = (tot.counts[cur] || 0) + 1;

    if (tot.counts[cur] > tot.maxCount) {
      tot.maxCount = tot.counts[cur];
      tot.mostFrequent = cur;
    }

    return tot;
  },
  { counts: {}, maxCount: 0, mostFrequent: null },
);

console.log("რიცხვი რომელიც ყველაზე მეტჯერ მოერდება: " + result.mostFrequent);
// 6)let nums = [1, 2, 3, 4, 5, 6, 7, 8] დაწერე ფუქნცია რომელიც დაითვლის რამდენი ლუწი და რამდენი კენტი რიცხვია
console.log("-------------------დავალება6-------------------");
let nums = [1, 2, 3, 4, 5, 6, 7, 8];

function countEvenOdd(array) {
  let evenCount = 0;
  let oddCount = 0;

  for (let num of array) {
    if (num % 2 === 0) {
      evenCount++;
    } else {
      oddCount++;
    }
  }

  return {
    even: evenCount,
    odd: oddCount,
  };
}

let result6 = countEvenOdd(nums);
console.log(`ლუწი: ${result6.even}, კენტი: ${result6.odd}`);

// 7)let nums = [10, 2, 33, 5, 7] დაწერე ფუქნცია როემლიც დააბრუენბს ყველაზე პატარა რიცხვს
console.log("-------------------დავალება7-------------------");

let nums2 = [10, 2, 33, 5, 7];

function smallNum(arr) {
  arr.sort((a, b) => a - b);
  return arr[0];
}

let result7 = smallNum(nums2);
console.log("ყველაზე პატარა რიცხია: " + result7);
