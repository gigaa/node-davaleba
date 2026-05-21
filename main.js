// 1. დაწერე ფუნქცია , რომელიც არგუმენტად იღებს sec-ს და ითვლის უკუსვლით იქმადე სანამ 0-მდე არ მივა
console.log("-------------------დავალება1-------------------");
function countdown(sec) {
  const timer = setInterval(() => {
    console.log(sec);
    if (sec === 0) {
      clearInterval(timer);
      console.log("end");
    }
    sec--;
  }, 1000);
}

countdown(5);

// 2. დაწერე ფუქნცია ფუქნციას გადააწოდე რიცხვი  და ასევე ლოგე რენდომული რიცხვი იქამდე სანამ ეს გადაცემული და რენდომ რიცხვი არ. დაემთხვევა ერთმამენთს
console.log("-------------------დავალება2-------------------");

function randomFN(targetNum) {
  randomNum = Math.floor(Math.random() * 10) + 1;
  console.log({ targetNum, randomNum });

  if (targetNum === randomNum) {
    clearInterval(checkInterva);
  }
}

checkInterva = setInterval(() => {
  targetNum = Math.floor(Math.random() * 10) + 1;
  randomFN(targetNum);
}, 1000);

// 3.და წერე ფუქნცია რომელიც მიიღებს n და callback-ს როცა n > 27-ზე გაუშვი ეს callback-ი რომელიც დააკონსოლებს რომ ეს ნამდვილად მეტია 27-ზე სხვა შემთხვევაში დააკონსოლე რომ n ნაკლებია
console.log("-------------------დავალება3-------------------");

function checkNumber(n, callback) {
  if (n > 27) {
    callback();
  } else {
    console.log(n + " ეს რიციხვი ნაკლებია 27-ზე");
  }
}

function myCallback() {
  console.log("ეს რიციხვი მეტია 27-ზე!");
}

checkNumber(30, myCallback);
checkNumber(15, myCallback);

// 4.დაწერე ფუქნცია რომელიც პარამეტრად მიიღებს API და დააბრუნებს ამ API-ში მყოფ  4 - users. https://jsonplaceholder.typicode.com/users დაწერე ორივენაირად than/catch & async/await
console.log("-------------------დავალება4-------------------");

async function fetchAPI(API) {
  let res = await fetch(API);
  let data = await res.json();
  console.log(data[3]);
}

fetchAPI("https://jsonplaceholder.typicode.com/users");

function fetchThenAPI(API) {
  fetch(API)
    .then((res) => res.json())
    .then((data) => console.log(data[3]))
    .catch((error) => {
      console.log(error, "error");
    });
}

fetchThenAPI("https://jsonplaceholder.typicode.com/users");

// 5) დააწყვილე reduce-თი ცალკე ვისი ასაკიც მეტია 10 ზე და ვისი ასაკიც ნაკლებია 20
console.log("-------------------დავალება5-------------------");

let people = [
  { name: "Giorgi", age: 25 },
  { name: "Nika", age: 15 },
  { name: "Mariam", age: 30 },
  { name: "Luka", age: 18 },
  { name: "LI", age: 9 },
];
const groupedByAge = people.reduce(
  (accumulator, person) => {
    if (person.age > 10) {
      accumulator.olderThan10.push(person);
    }

    if (person.age < 20) {
      accumulator.youngerThan20.push(person);
    }

    return accumulator;
  },
  { olderThan10: [], youngerThan20: [] },
);

console.log(groupedByAge);

// 6. დაწერე ფუნქცია რომელიც მიიღებს ორ რიცხვს და callback-ს. თუ პირველი მეტია მეორეზე გაუშვი callback და დაუბეჭდე "მეტია", სხვა შემთხვევაში "ნაკლები ან ტოლია".
console.log("-------------------დავალება6-------------------");

function compareNumbers(num1, num2, callback) {
  if (num1 > num2) {
    callback("მეტია");
  } else {
    callback("ნაკლები ან ტოლია");
  }
}

compareNumbers(10, 5, function (result) {
  console.log(result);
});

compareNumbers(3, 7, function (result) {
  console.log(result);
});

// 7.დაწერე reduce, რომელიც დააჯგუფებს - ცალკე 20-ზე მეტ ფასიან რიცხვებს და
// ცალკე 20-ზე ნაკლები ან ტოლი ფასიანი ნივთები
console.log("-------------------დავალება7-------------------");
let products = [
  { name: "Mouse", price: 15 },
  { name: "Keyboard", price: 45 },
  { name: "USB Cable", price: 7 },
  { name: "Headphones", price: 29.9 },
  { name: "Webcam", price: 52 },
];

const groupedProducts = products.reduce(
  (acc, cur) => {
    if (cur.price > 20) {
      acc.over20.push(cur);
    } else {
      acc.underOrEqual20.push(cur);
    }
    return acc;
  },
  { over20: [], underOrEqual20: [] },
);

console.log(groupedProducts);

