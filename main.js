// 1) function block(){
//     for(let i = 1 ;i <10000000000;i++){}
// }

// console.log("one")
// block()
// console.log("two")
// იპოვე გამოსავალი როგორ შეიძლება გაეშვას ჯერ  console.log("one") console.log("two") შემდეგ ფუნქცია
// აუცილებელია გამოიყენო ფრომისი
console.log("-------------------დავალება1-------------------");
function block() {
  for (let i = 1; i < 10000000000; i++) {}
}

let myPromise = new Promise((res, rej) => {
  res("res");
});

console.log("one");
myPromise.then((res) => block());
console.log("two");

// 2)ორი პრომისი შექმენი (ერთმა დაარესოლვოს, ერთმა დაარეჯექთოს) და ორივე შემთხვევა დაამუშავე then/catch-ით  ცალცალკეც და “ჯგუფურადაც”  - ჯგუფურად Allsetteld გამოიყენე.
console.log("-------------------დავალება2-------------------");
let promise1 = new Promise((res, rej) => {
  res("resolve");
});

let promise2 = new Promise((res, rej) => {
  rej("reject");
});

promise1
  .then((result) => {
    console.log("result: ", result);
  })
  .catch((error) => {
    console.error("error: ", error.message);
  });

promise2
  .then((result) => {
    console.log("result: ", result);
  })
  .catch((error) => {
    console.error("error: promise rejected");
  });

Promise.allSettled([promise1, promise2]).then((results) => {

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`Promise #${index + 1} success. Status:`, result.value);
    } else if (result.status === "rejected") {
      console.log(`Promise #${index + 1} fail. Status:`, result.status);
    }
  });
});
// 3)შექენი 4 პრომისი (ზოგი resolve, ზოგი reject). დააბრუნე მარტო პირველი დარესოლვებული
console.log("-------------------დავალება3-------------------");

const promise1 = new Promise((res, rej) => {
  rej("res1");
});

const promise2 = new Promise((res, rej) => {
  rej("res2");
});

const promise3 = new Promise((res, rej) => {
  res("res3");
});

const promise4 = new Promise((res, rej) => {
  res("res4");
});

Promise.any([promise1, promise2, promise3, promise4])
  .then((result) => {
    console.log("result:", result);
  })
  .catch((error) => {
    console.log("error:", error);
  });

// 4)შექმენი 4 ფრომისი  და რედიუსით დაითვალე რამდენია წარმატებული და რამდენი წარუმატებელი
// 1. შევქმნათ 4 ფრომისი (2 წარმატებული, 2 წარუმატებელი)
console.log("-------------------დავალება4-------------------");

const p1 = Promise.resolve("res1");
const p2 = Promise.reject("rej2");
const p3 = Promise.resolve("res3");
const p4 = Promise.reject("rej4");

Promise.allSettled([p1, p2, p3, p4]).then((results) => {
  const summary = results.reduce(
    (tot, cur) => {
      if (cur.status === "fulfilled") {
        tot.successful += 1;
      } else if (cur.status === "rejected") {
        tot.failed += 1;
      }
      return tot;
    },
    { successful: 0, failed: 0 },
  );

  console.log("result: ", summary);
});
// 5) შექმენი 5 ფრომისი და გაფილტრე ეს ფრომისები დააბრუნე ამრტო წარუმატებლები
console.log("-------------------დავალება5-------------------");
const pr1 = Promise.resolve("res1");
const pr2 = Promise.reject("rej2");
const pr3 = Promise.resolve("res3");
const pr4 = Promise.reject("rej4");
const pr5 = Promise.reject("rej5");

Promise.allSettled([pr1, pr2, pr3, pr4, pr5]).then((results) => {
  const summary = results.filter((item) => item.status === "rejected");
  console.log("result: ", summary);
});
// 6)api1 = https://jsonplaceholder.typicode.com/users
// api2 = https://jsonplaceholder.typicode.com/posts
// გაუშვი ეს ორი API ერთდროულად
console.log("-------------------დავალება6-------------------");
async function fetchUsers() {
  let res = await fetch("https://jsonplaceholder.typicode.com/users");
  let data = await res.json();
  return data;
}
async function fetchPosts() {
  let res = await fetch("https://jsonplaceholder.typicode.com/posts");
  let data = await res.json();
  return data;
}

Promise.all([fetchUsers(), fetchPosts()]).then((res) => console.log(res));

