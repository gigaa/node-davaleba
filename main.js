// 1) შექმენი utils/helper.js სადაც გექნება ფუქნციები read(უნდა პარსავდეს true-ს გადაწოდების შემდეგ) და write(ანალოგიურად stringify-უნდა გაუკეთოს).
// შექმენი ამ ფუქნციებით 2 ფაილი და ჩაწერე შიგნით ნებისმიერი რამ. ასევე ჰელფერებში დაამატე ჯამის დათვლა და სტრინგის შეტრიალების ფუქნცია.

// ------------- utils/helper.js ----------

const fs = require("fs");

function read(filePath, parse = false) {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return parse ? JSON.parse(data) : data;
  } catch (error) {
    console.error(`error: ${error.message}`);
    return null;
  }
}

function write(filePath, data, stringify = false) {
  try {
    const dataToWrite = stringify ? JSON.stringify(data, null, 2) : data;
    fs.writeFileSync(filePath, dataToWrite, "utf8");
    console.log(`success: ${filePath}`);
  } catch (error) {
    console.error(`error: ${error.message}`);
  }
}

function sum(...numbers) {
  const nums = Array.isArray(numbers[0]) ? numbers[0] : numbers;
  return nums.reduce((acc, curr) => acc + (Number(curr) || 0), 0);
}

function reverseString(str) {
  if (typeof str !== "string") return "";
  return str.split("").reverse().join("");
}

module.exports = {
  read,
  write,
  sum,
  reverseString,
};

// ------------- main.js ----------

const { read, write, sum, reverseString } = require("./utils/helper");

const txtFilePath = "./note.txt";
const jsonFilePath = "./data.json";

const simpleText = "გამარჯობა, ეს არის ჩვეულებრივი ტექსტური ფაილი.";
write(txtFilePath, simpleText);

const userObject = {
  id: 1,
  name: "გიორგი",
  role: "Developer",
  skills: ["JavaScript", "Node.js"],
};
write(jsonFilePath, userObject, true);

console.log("\n-----------------------------\n");

const readText = read(txtFilePath);
console.log("წაკითხული ტექსტი:", readText);

const readJson = read(jsonFilePath, true);
console.log("წაკითხული და დაპარსული ობიექტი:", readJson);
console.log(`მომხმარებლის სახელი: ${readJson.name}`);

console.log("\n-----------------------------\n");

console.log("ჯამი (არგუმენტებით):", sum(10, 20, 30, 40));
console.log("ჯამი (მასივით):", sum([5, 15, 25]));

const originalStr = "Node.js";
console.log("ორიგინალი სტრინგი:", originalStr);
console.log("შეტრიალებული სტრინგი:", reverseString(originalStr));

// 2)წამოიღე ინფორმაცია ამ ორი api-დან
// let api = https://jsonplaceholder.typicode.com/users
// let api2 = https://jsonplaceholder.typicode.com/posts
// 1)გამოიყენე axios და ერთდროულად გაუშვი 2 API.
const axios = require("axios"); // თუ ბრაუზერში ხარ, ეს ხაზი არ გჭირდება

const api = "https://jsonplaceholder.typicode.com/users";
const api2 = "https://jsonplaceholder.typicode.com/posts";

async function fetchAllData() {
  const [usersResponse, postsResponse] = await Promise.all([
    axios.get(api),
    axios.get(api2),
  ]);

  console.log("--- ორივე რექვესტი წარმატებით დასრულდა ---");
  console.log("Users:", usersResponse.data.slice(0, 2)); // მხოლოდ პირველი 2 ელემენტი საჩვენებლად
  console.log("Posts:", postsResponse.data.slice(0, 2));
}

fetchAllData();

// 2)გაუშვი ორივე ერთად და რომელიც პირველი მოვა ის დააკონსოლე.
async function fetchFastest() {
  const fastestResponse = await Promise.race([axios.get(api), axios.get(api2)]);

  console.log("--- პირველი მოსული API ---");
  console.log("პირველი მოვიდა:", fastestResponse.config.url);
  console.log("მონაცემები:", fastestResponse.data.slice(0, 2));
}

fetchFastest();

// 3)გაუშვი ორივე ერთად და დააბრუნე ინფრომაცია რომელი დარესოლვდა დარეჯექთდა და ა.შ.
async function fetchAllStatuses() {
  const results = await Promise.allSettled([
    axios.get(api),
    axios.get(api2),
    axios.get("https://jsonplaceholder.typicode.com/invalid-url"),
  ]);

  console.log("--- რექვესტების სტატუსები ---");

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(
        `რექვესტი #${index + 1} დარესოლვდა წარმატებით (URL: ${result.value.config.url})`,
      );
    } else {
      console.log(
        `რექვესტი #${index + 1} დარეჯექთდა. მიზეზი: ${result.reason.message}`,
      );
    }
  });
}

fetchAllStatuses();

// 3)commander-ით შექმენი phone-cli, რომელსაც ექნება დამატება,წაშლა,id-ის მიხედვით კონკრეტული ობიექტის ამოღება, და option-ის მიხედვით(--america)- ამ ოფშენს თუ გადავცემთ ნომერს წინ უნდა დაუამტოს 011 (ანუ phone-cli add giorgi 574221355 --america)- ასე თუ გადავცემთ უნდა დაამტოს 011574221355

// შემდეგზე მოგცემთ შუალედურს

const { Command } = require("commander");
const fs = require("fs");

const program = new Command();
const FILE_PATH = "./contacts.json";

const readContacts = () => {
  if (!fs.existsSync(FILE_PATH)) {
    return [];
  }
  const data = fs.readFileSync(FILE_PATH, "utf-8");
  return JSON.parse(data || "[]");
};

const saveContacts = (contacts) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(contacts, null, 2));
};

program
  .name("phone-cli")
  .description("კონტაქტების მართვის CLI აპლიკაცია")
  .version("1.0.0");

program
  .command("add")
  .description("ახალი კონტაქტის დამატება")
  .argument("<name>", "კონტაქტის სახელი")
  .argument("<phone>", "ტელეფონის ნომერი")
  .option("--america", "ამერიკული ფორმატის პრეფიქსის (011) დამატება")
  .action((name, phone, options) => {
    const contacts = readContacts();

    let finalPhone = phone;
    if (options.america) {
      finalPhone = "011" + phone;
    }

    const newContact = {
      id: Date.now().toString(),
      name,
      phone: finalPhone,
    };

    contacts.push(newContact);
    saveContacts(contacts);

    console.log(
      `✅ კონტაქტი წარმატებით დაემატა: ${name} (${finalPhone}) [ID: ${newContact.id}]`,
    );
  });

program
  .command("delete")
  .description("კონტაქტის წაშლა ID-ის მიხედვით")
  .argument("<id>", "კონტაქტის ID")
  .action((id) => {
    let contacts = readContacts();
    const initialLength = contacts.length;

    contacts = contacts.filter((c) => c.id !== id);

    if (contacts.length === initialLength) {
      console.log(`❌ კონტაქტი ID-ით "${id}" ვერ მოიძებნა.`);
    } else {
      saveContacts(contacts);
      console.log(`🗑️ კონტაქტი ID-ით "${id}" წარმატებით წაიშალა.`);
    }
  });

program
  .command("get")
  .description("კონტაქტის ნახვა ID-ის მიხედვით")
  .argument("<id>", "კონტაქტის ID")
  .action((id) => {
    const contacts = readContacts();
    const contact = contacts.find((c) => c.id === id);

    if (contact) {
      console.log(
        `👤 ნაპოვნია კონტაქტი:\nID: ${contact.id}\nსახელი: ${contact.name}\nნომერი: ${contact.phone}`,
      );
    } else {
      console.log(`❌ კონტაქტი ID-ით "${id}" ვერ მოიძებნა.`);
    }
  });

program
  .command("list")
  .description("ყველა კონტაქტის სიის გამოტანა")
  .action(() => {
    const contacts = readContacts();
    if (contacts.length === 0) {
      console.log("კონტაქტების სია ცარიელია.");
    } else {
      console.table(contacts);
    }
  });

program.parse(process.argv);

