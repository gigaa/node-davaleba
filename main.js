// 1)გაიარეთ რეგისტრაცია mongoDB-ზე დააგენერირეთ connect link და დაქონექთდით ბაზასთან.(npm i mongoose,npm i express) დასერჩეთ არარის ძაან რთული.
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

app.use(express.json());

const MONGO_URI =
  "mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("წარმატებით დაუკავშირდა MongoDB-ს!"))
  .catch((err) => console.error("კავშირის შეცდომა:", err));

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

// 2)შექმენი პროგრამა, რომელიც ამატებს მომხმარებლის სახელს და ასაკს და აბრუნებს ტექსტს User Nika is 22 years old.

interface IUser {
  name: string;
  age: number;
}

function createUserMessage(user: IUser): string {
  return `User ${user.name} is ${user.age} years old.`;
}

const newUser: IUser = { name: "Nika", age: 22 };
console.log(createUserMessage(newUser));

// გამოიტანს: User Nika is 22 years old.
// 3)აღწერე პროდუქტები ინტერფეისით და გამოითვალე საერთო ფასი.
// თუ ფასი მეტია 100-ზე, დაბეჭდე "Discount available!"
interface IProduct {
  title: string;
  price: number;
}

const cart: IProduct[] = [
  { title: "Laptop", price: 800 },
  { title: "Mouse", price: 25 },
  { title: "Keyboard", price: 45 },
];

function calculateTotal(products: IProduct[]): number {
  let total = 0;
  for (const product of products) {
    total += product.price;
  }

  console.log(`Total Price: $${total}`);

  if (total > 100) {
    console.log("Discount available!");
  }

  return total;
}

calculateTotal(cart);
// 4)შექმენი ორი ინტერფეისი  IHero და ISuperHero.

// IHero უნდა აღწერდეს ჩვეულებრივი გმირის მონაცემებს:
// name: string - გმირის სახელი
// age: number - გმირის ასაკი.

// ISuperHero უნდა დაექსთენდდეს IHero-ით და დაამატოს:
// power: string - გმირის ძალა
// level?: string - optional ველი, რომელიც განისაზღვრება მოგვიანებით

// შექმენი ფუნქცია levelUp(hero: ISuperHero): void, რომელიც:
// ამოწმებს გმირის ასაკს
// თუ ასაკი მეტია 30-ზე - level = "Pro"
// თუ ნაკლებია ან ტოლია 30-ის - level = "Newbie"
// დაბეჭდავს შედეგს კონსოლში:
// "Batman is now level: Pro"

// მინიშნება
// const hero1: ISuperHero = {
//   name: "Batman",
//   age: 35,
//   power: "Stealth",
// };

interface IHero {
  name: string;
  age: number;
}

interface ISuperHero extends IHero {
  power: string;
  level?: string;
}

function levelUp(hero: ISuperHero): void {
  if (hero.age > 30) {
    hero.level = "Pro";
  } else {
    hero.level = "Newbie";
  }

  console.log(`${hero.name} is now level: ${hero.level}`);
}

const hero1: ISuperHero = {
  name: "Batman",
  age: 35,
  power: "Stealth",
};

levelUp(hero1);

// 5)დაწერე generic ფუნქცია, რომელიც აბრუნებს მასივის პირველ ელემენტს.
function getFirstElement<T>(array: T[]): T | undefined {
  return array[0];
}

const numbers = [10, 20, 30];
const firstNumber = getFirstElement(numbers);

const strings = ["Apple", "Banana", "Cherry"];
const firstString = getFirstElement(strings);

console.log(firstNumber);
console.log(firstString);

