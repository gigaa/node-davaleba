const fs = require("fs/promises");
// 1)წაიკითხე ყველა რიცხვი ფაილიდან, გამოთვალე მათი ჯამი და ჩაწერე სხვა ფაილში

async function main1() {
  let numsArr = [1, 2, 3, 4, 5];
  await fs.writeFile("data.json", JSON.stringify(numsArr));
  let readNumsFile = await fs.readFile("data.json", "utf-8");
  let numsToArr = JSON.parse(readNumsFile);
  let sum = numsToArr.reduce((tot, curr) => tot + curr, 0);
  await fs.writeFile("data1.json", JSON.stringify(sum));
  console.log(sum);
}
main1();

// 2)ერთი ფაილიდან წაიკითხე ტექსტი, გადაატრიალე (reverse) და ჩაწერე სხვა ფაილში
async function reverseText() {
  await fs.writeFile("word.txt", "hellow world");
  let readText = await fs.readFile("word.txt", "utf-8");
  let splitedText = readText.split("");
  let reversedStr = splitedText.reverse().join("");
  await fs.writeFile("word2.txt", reversedStr);
}

reverseText();

// 3)შექმენი მომხმარებლების მასივი შემდეგი თვისებებით: name, age, email — შემდეგ ეს მონაცემები ჩაწერე data.json ფაილში
const users = [
  { name: "gio", age: 28, email: "gio@example.com" },
  { name: "tim", age: 25, email: "tim@example.com" },
  { name: "luka", age: 32, email: "luka@example.com" },
];
async function main3() {
  const jsonData = JSON.stringify(users, null, 2);
  await fs.writeFile("data3.json", jsonData, "utf8");
}

main3();
// 4)წაიკითხე მონაცემები ორ სხვადასხვა ფაილიდან და ჩაწერე ერთ ფაილში

async function main4() {
  await fs.writeFile("w1.txt", "js");
  await fs.writeFile("w2.txt", "node");
  let w1 = await fs.readFile("w1.txt", "utf-8");
  let w2 = await fs.readFile("w2.txt", "utf-8");
  console.log(w1);
  console.log(w2);
  let joinTxt = `${w1} ${w2}`;
  await fs.writeFile("w3.txt", joinTxt);

  let w3 = await fs.readFile("w3.txt", "utf-8");
  console.log(w3);
}

main4();

// 5)ჩაწერე ფაილში ტექსტი, შემდეგ წაიკითხე ეს მონაცემები და დათვალე რამდენი სიტყვაა
async function main5() {
  await fs.writeFile("txt5.txt", "JavaScript Java TypeScript Go Python");
  let txt1 = await fs.readFile("txt5.txt", "utf-8");
  let arrLength = txt1.split(" ").length;
  console.log(arrLength);
}

main5();

// 6)წაიკითხე მომხმარებლების JSON მონაცემები, გაფილტრე ისინი (ის ვინც 18 წელზე უფროსია) და თავიდან ჩაწერე
const users6 = [
  { id: 1, name: "გიორგი", age: 25 },
  { id: 2, name: "ანი", age: 16 },
  { id: 3, name: "ლუკა", age: 19 },
  { id: 4, name: "ნინო", age: 14 },
];
async function filterAndSaveUsers() {
  let filteredUsers = users6.filter((user) => user.age > 18);
  let updatedData = JSON.stringify(filteredUsers, null, 2);

  await fs.writeFile("user.json", updatedData, "utf8");
}

filterAndSaveUsers();

// 7)შექმენი სტუდენტების მასივი (name, score, passed), ჩაწერე students.json-ში.
// შემდეგ წაიკითხე და გაფილტრე ისინი, ვისი score 50-ზე მეტია, და ჩაწერე ახალ "passed.json" - ში

const students = [
  { id: 1, name: "გიორგი", score: 25, passed: false },
  { id: 2, name: "ანი", score: 51, passed: true },
  { id: 3, name: "ლუკა", score: 35, passed: false },
  { id: 4, name: "ნინო", score: 77, passed: true },
];

async function filterAndSaveStudents() {
  await fs.writeFile("students.json", JSON.stringify(students, null, 2));
  let studentsData = await fs.readFile("students.json", "utf-8");
  studentsData = JSON.parse(studentsData);

  let filteredStudents = studentsData.filter((student) => student.score > 50);

  await fs.writeFile("passed.json", JSON.stringify(filteredStudents, null, 2));
}

filterAndSaveStudents();

// 8)წაიკითხე "users.json", და ყველას, ვისაც არ აქვს "@" ელფოსტაში, წაშალე
const users8 = [
  { name: "Gio", email: "gio@gmail.com" },
  { name: "Nika", email: "nikaexample.com" },
  { name: "Mariam", email: "mariam@reeducate.ge" },
  { name: "Lasha", email: "lashareeducate.ge" },
  { name: "Ana", email: "ana@mail.com" },
];

async function filterUsers() {
  await fs.writeFile("users8.json", JSON.stringify(users8, null, 2));
  let usersData = await fs.readFile("users8.json", "utf-8");
  usersData = JSON.parse(usersData);

  let filteredUsers = usersData.filter((user) => user.email.includes("@"));
  await fs.writeFile("users8.json", JSON.stringify(filteredUsers, null, 2));
}

filterUsers();
