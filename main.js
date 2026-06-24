// 1)შექმენი utils/helepr.js. შექმენი ფუნქცია რომელსაც მიიღებს სტრინგს და გადააქცევს capital letter-ად. აუცილებელია გამოიყენო module(package-დან შეცვალე)

// package.json
// "type": "module",

// utils/helper.js
export function capitalize(str) {
  if (!str || typeof str !== "string") return "";

  return str.charAt(0).toUpperCase() + str.slice(1);
}

// main.js
import { capitalize } from "./utils/helper.js";

const lowerCaseText = "hello world";
const capitalizedText = capitalize(lowerCaseText);

console.log("ორიგინალი:", lowerCaseText);
console.log("შედეგი:", capitalizedText);

// 2)დაწერე ფუქნცია რომელიც შეამოწმებს გადმოცემული სტრინგი პალინდრომია თუ არა (ანუ ორივე მხრიდან თუ ერთნაირად იკითხება).აუცილებელია module(package-დან შეცვალე) გამოიყენო

// package.json
// "type": "module",

// utils/helper.js
export function isPalindrome(str) {
  const cleanedStr = str.toLowerCase().replace(/[^a-z0-9ა-ჰ]/g, "");
  const reversedStr = cleanedStr.split("").reverse().join("");
  return cleanedStr === reversedStr;
}

// main.js
import { isPalindrome } from "./utils/helper.js";

const text1 = "ana";
const text2 = "gio";
const text3 = "max";

console.log(`"${text1}" არის პალინდრომი?:`, isPalindrome(text1));
console.log(`"${text2}" არის პალინდრომი?:`, isPalindrome(text2));
console.log(`"${text3}" არის პალინდრომი?:`, isPalindrome(text3));

// 3)დაწერე ფუქნცია რომელიც იპოვის ყველაზე გრძელ სიტყვას როცა გადავცემ (I love JavaScript very much) - უნდა დააბრუნოს JavaScript. აუცილებელია გამოიყენო module.

// utils/helper.js
export function findLongestWord(text) {
  if (!text || typeof text !== "string") return "";
  const words = text.split(" ");

  return words.reduce((tot, cur) => {
    return cur.length > tot.length ? cur : tot;
  }, "");
}

// main.js
import { findLongestWord } from "./utils/helper.js";

const txt = "I love JavaScript very much";
const longestWord = findLongestWord(txt);

console.log(longestWord);

// 4)შექმენი სერვერი სადაც გექნება როუტები,"/","/users","/posts".
// აუცილებელია გაუკეთო ორივეს pagination,id-ის მეშვეობით ძებნა და /users ასევე დაამატე name-ით ძებნა

const http = require("http");
const url = require("url");
const queryString = require("querystring");
const fs = require("fs/promises");
const PORT = 3000;

const server = http.createServer(async (req, res) => {
  res.writeHead(200, { "content-type": "application.json" });

  const parsedURL = url.parse(req.url);
  const query = queryString.parse(parsedURL.query);
  console.log(query);

  const readUserData = await fs.readFile("users.json", "utf-8");
  const parseUserData = JSON.parse(readUserData);

  const readPostsData = await fs.readFile("posts.json", "utf-8");
  const parsePostsData = JSON.parse(readPostsData);

  if (parsedURL.pathname === "/") {
    return res.end("home");
  } else if (parsedURL.pathname === "/users") {
    // console.log("query.name: " + query.name);

    if (query.id) {
      const findUserById = parseUserData.find(
        (el) => el.id === Number(query.id),
      );
      if (!findUserById) {
        return res.end("user not found");
      }
      return res.end(JSON.stringify(findUserById));
    }

    if (query.name) {
      const findUserByName = parseUserData.find((el) => el.name === query.name);
      if (!findUserByName) {
        return res.end("user not found");
      }
      return res.end(JSON.stringify(findUserByName));
    }

    return res.end(JSON.stringify(parseUserData));
  } else if (parsedURL.pathname === "/posts") {
    let { page = 1, take = 30 } = query;
    if (take > 30) {
      take = 30;
    }
    const result = parsePostsData.slice((page - 1) * take, page * take);
    return res.end(JSON.stringify(result));
  }
});
server.listen(PORT, () => {
  console.log(`server run http://localhost:${PORT}`);
});

// 5) შექმენი products-cli,რომელსაც ექნება დამატება,წაკითხვა,id-ის მიხედვით წაკითხვა, წაშლა და აფდეითი.
// fields(name,description,date,category) + მე თუ გავატან option ის მიხედვით --isexpire. უნდა შეამოწმოს თარიღი და დაამატოს ვადა აქვს გასული თუ არა

import { Command } from "commander";
import fs from "fs/promises";

const program = new Command();
const FILE_PATH = "./products.json";

async function readProducts() {
  try {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeProducts(products) {
  await fs.writeFile(FILE_PATH, JSON.stringify(products, null, 2), "utf-8");
}

function checkExpiry(dateStr) {
  const productDate = new Date(dateStr);
  const today = new Date();
  return productDate < today;
}

program
  .name("products-cli")
  .description("CLI პროდუქტების სამართავად")
  .version("1.0.0");

program
  .command("add")
  .description("ახალი პროდუქტის დამატება")
  .requiredOption("-n, --name <name>", "პროდუქტის სახელი")
  .requiredOption("-d, --description <desc>", "აღწერა")
  .requiredOption("-t, --date <date>", "თარიღი (YYYY-MM-DD)")
  .requiredOption("-c, --category <category>", "კატეგორია")
  .option("--isexpire", "შეამოწმოს ვადაგასულობა თარიღის მიხედვით")
  .action(async (options) => {
    const products = await readProducts();

    let isExpired = false;
    if (options.isexpire) {
      isExpired = checkExpiry(options.date);
    }

    let lastId = products[products.length - 1]?.id || 0;

    const newProduct = {
      id: lastId + 1,
      name: options.name,
      description: options.description,
      date: options.date,
      category: options.category,
      ...(options.isexpire && { isExpired }),
    };

    products.push(newProduct);
    await writeProducts(products);
    console.log(`პროდუქტი წარმატებით დაემატა! ID: ${newProduct.id}`);
  });

program
  .command("list")
  .description("ყველა პროდუქტის ნახვა")
  .action(async () => {
    const products = await readProducts();
    if (products.length === 0) {
      console.log("პროდუქტები ვერ მოიძებნა.");
      return;
    }
    console.table(products);
  });

program
  .command("get <id>")
  .description("პროდუქტის მოძებნა ID-ით")
  .action(async (id) => {
    const products = await readProducts();
    const product = products.find((p) => p.id === id);

    if (!product) {
      console.log(`პროდუქტი ID-ით "${id}" ვერ მოიძებნა.`);
      return;
    }
    console.log("ნაპოვნი პროდუქტი:", product);
  });

program
  .command("delete <id>")
  .description("პროდუქტის წაშლა ID-ით")
  .action(async (id) => {
    let products = await readProducts();
    const initialLength = products.length;

    products = products.filter((p) => p.id !== id);

    if (products.length === initialLength) {
      console.log(`პროდუქტი ID-ით "${id}" ვერ მოიძებნა.`);
      return;
    }

    await writeProducts(products);
    console.log("პროდუქტი წარმატებით წაიშალა.");
  });

program
  .command("update <id>")
  .description("პროდუქტის განახლება")
  .option("-n, --name <name>", "ახალი სახელი")
  .option("-d, --description <desc>", "ახალი აღწერა")
  .option("-t, --date <date>", "ახალი თარიღი (YYYY-MM-DD)")
  .option("-c, --category <category>", "ახალი კატეგორია")
  .option("--isexpire", "ხელახლა შეამოწმოს ვადაგასულობა")
  .action(async (id, options) => {
    const products = await readProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      console.log(`პროდუქტი ID-ით "${id}" ვერ მოიძებნა.`);
      return;
    }

    if (options.name) products[index].name = options.name;
    if (options.description) products[index].description = options.description;
    if (options.date) products[index].date = options.date;
    if (options.category) products[index].category = options.category;

    if (options.isexpire) {
      products[index].isExpired = checkExpiry(products[index].date);
    }

    await writeProducts(products);
    console.log("პროდუქტი წარმატებით განახლდა!");
  });

program.parse(process.argv);
