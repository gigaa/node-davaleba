// 1) გაამრავლე თითოეული ელემენტი 3-ზე.
// Input: [1,2,3] - Output: [3,6,9]
console.log("-------------------დავალება1-------------------");
let arr1 = [1, 2, 3];

let arr1Res = arr1.map((el) => el * 3);

console.log(arr1Res);
// 2)გაფილტრე ისეთი რიცხვები რომლებიც იყოფა უნაშთოდ 3-ზე
console.log("-------------------დავალება2-------------------");

let arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

let filterArr = arr2.filter((item) => item % 3 === 0);

console.log(filterArr);

// 3)დააბრუნე ყველა დადებითი რიცხვის ჯამი
console.log("-------------------დავალება3-------------------");
let arr3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, -5, -8, -18, -30];

let arr3Sum = arr3.reduce((tot, curr) => {
  //   console.log(curr, tot);
  if (curr > 0) {
    return tot + curr;
  }
  return tot;
}, 0);

console.log(arr3Sum);
// 4)მოცემული სტრინგების მასივიდან წაშალე თითოეული სტრინგის ბოლო სიმბოლო
// let namesArr = ["giorgi","nika","mariami"]
console.log("-------------------დავალება4-------------------");
let namesArr = ["giorgi", "nika", "mariami"];
let updatedNames = namesArr.map((name) => name.slice(0, -1));

console.log(updatedNames);
// 5)გაამრავლე ყველა ელემენტი მასივში 2-ზე და შემდეგ ამოიღე რიცხვები, რომლებიც იყოფა 3-ზე
console.log("-------------------დავალება5-------------------");
let arr5 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let arr5Res = arr5.map((num) => num * 2).filter((num) => num % 3 === 0);

console.log(arr5Res);
// 6) დაალაგე რიცხვები ზრდადობით let numsArr = [1,-1,-2,-10,111,3,2,5]
console.log("-------------------დავალება6-------------------");
let numsArr = [1, -1, -2, -10, 111, 3, 2, 5];
let sortedArr = numsArr.sort((a, b) => a - b);
console.log(sortedArr);
// 7)გაამრავლე ყველა ელემენტი 2-ზე და დატოვე მხოლოდ ისინი, რომლებიც 5-ზე მეტია.
console.log("-------------------დავალება7-------------------");
let arr7 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let arr75Res = arr7.map((num) => num * 2).filter((num) => num > 5);
console.log(arr75Res);

// 8)let arr = [1,1,1,1,2,2,3,3,3] დააბრუნე let unque = [1,2,3]
console.log("-------------------დავალება8-------------------");
let arr8 = [1, 1, 1, 1, 2, 2, 3, 3, 3];
let uniqueArr = [...new Set(arr8)];
console.log(uniqueArr);

// 9), დააბრუნეთ ორი ყველაზე მცირე რიცხვის ჯამს let arr = [-1,20,90,4,5,111]
console.log("-------------------დავალება9-------------------");
let arr9 = [-1, 20, 90, 4, 5, 111];

arr9.sort((a, b) => a - b);
// console.log(arr9);
let arr9Sum = arr9[0] + arr9[1];

console.log(arr9Sum);

