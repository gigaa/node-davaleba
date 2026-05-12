// 1) შექმენი ცარიელი მასივი და შეავსე მასში რიცხვები 5-დან 15-მდე
console.log("-------------------დავალება1-------------------");
let arr1Main = [];
let k = 0;
for (let i = 5; i < 15; i++) {
  arr1Main[k] = i;
  k++;
}
console.log(arr1Main);

// 2) დაბეჭდე მასივის ელემენტები უკუღმა let arr = [1,2,3,4,5]
console.log("-------------------დავალება2-------------------");
let arr2Main = [1, 2, 3, 4, 5];
console.log(arr2Main.reverse());

// 3) იპოვე მასივში მინიმალური რიცხვი let arr = [100,2,3,9]
console.log("-------------------დავალება3-------------------");
let arr3 = [100, 2, 3, 9];
const res = Math.min(...arr3);
console.log(res);

// 4) ამოიღე შუა 3 ელემენტი slice-ით.let arr = [1,2,3,4,5,6,7]
console.log("-------------------დავალება4-------------------");
let arr4 = [1, 2, 3, 4, 5, 6, 7];
let arr4Res = arr4.slice(2, -2);
console.log(arr4Res);

// 5) გააერთიანე ორი მასივი let arr1 = [1,2] let arr2=[3,4]
console.log("-------------------დავალება5-------------------");
let arr1 = [1, 2];
let arr2 = [3, 4];
arrConcat = arr1.concat(arr2);
console.log(arrConcat);

// 6) წაშალე დუბლირებული ელემენტები let arr = [1,2,3,4,5,6,6,7,7]
console.log("-------------------დავალება6-------------------");

let arr6 = [1, 2, 3, 4, 5, 6, 6, 7, 7];
let uniqueArr = [...new Set(arr6)];

console.log(uniqueArr);
// 7) გაყავი მასივი ორ ცალკე მასივად (ლუწი და კენტი). მინიშნება: გამოიყენე % 2 === 0  let arr = [1,2,3,4,5,6,7]
console.log("-------------------დავალება7-------------------");
let arr7 = [1, 2, 3, 4, 5, 6, 7];
let evenNumbers = []; // ლუწი რიცხვებისთვის
let oddNumbers = []; // კენტი რიცხვებისთვის

arr7.forEach((num) => {
  if (num % 2 === 0) {
    evenNumbers.push(num);
  } else {
    oddNumbers.push(num);
  }
});

console.log("ლუწი მასივი:", evenNumbers);
console.log("კენტი მასივი:", oddNumbers);

// 8) დაითვალე დადებითი რიცხვების რაოდენობა და უარყოფითი რიცხვების ჯამი.
// let arr = [1,2,3,4,5,6,7,-1,-2,-3,-4]
console.log("-------------------დავალება8-------------------");
let arr8 = [1, 2, 3, 4, 5, 6, 7, -1, -2, -3, -4];
let sumNegativeNum = 0;
let countNegative = 0;
for (let i = 0; i < arr8.length; i++) {
  if (arr8[i] < 0) {
    sumNegativeNum += arr8[i];
    countNegative++;
  }
}
console.log(sumNegativeNum, countNegative);

// 9) დააბრუნე მასივის თითოეული ელემენტის ინვერსი (ანუ [1,-2] მაგივრად [-1,2]). მინიშნება: გამოიყენე push(-arr[i])
console.log("-------------------დავალება9-------------------");
function invertArray(arr) {
  let invertedArr = [];

  for (let i = 0; i < arr.length; i++) {
    invertedArr.push(-arr[i]);
  }
  return invertedArr;
}

const arr9 = [1, -2, 3, -4, 5];
const arr9Res = invertArray(arr9);

console.log(arr9Res);
// 10) let arr = [1,[2,[3]],[4] შენი მიზანია მიიღო [1,2,3,4]
console.log("-------------------დავალება10-------------------");
let arr10 = [1, [2, [3]], [4]];
let arr10Res = arr10.flat(Infinity);
console.log(arr10Res);

// 11)let fruits = ["apple", "banana", "orange", "kiwi"] წაშალე "banana" მასივიდან splice()-ით
// "orange"-ის წინ დაამატე "mango"
// ბოლოს დაბეჭდე ახალი მასივი.
// splice-მ არ დაგაბნიოთ splice(საიდან დაიწოს,რამდენი წაშალოს,რითიჩაანაცვლოს)
console.log("-------------------დავალება11-------------------");
let fruits = ["apple", "banana", "orange", "kiwi"];
fruits.splice(1, 1);
fruits.splice(1, 0, "mango");

console.log(fruits);

