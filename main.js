// 1) შექმენი Triangle (სამკუთხედი) კლასი, რომელიც იღებს სამ გვერდს (a, b, c) და დაამატე მეთოდები: getPerimeter(), getArea() , isRightTriangle().
console.log("-------------------დავალება1-------------------");
class Triangle {
  constructor(a, b, c) {
    if (a + b <= c || a + c <= b || b + c <= a) {
      throw new Error("ამ გვერდებით სამკუთხედის აგება შეუძლებელია!");
    }

    this.a = a;
    this.b = b;
    this.c = c;
  }

  getPerimeter() {
    return this.a + this.b + this.c;
  }

  getArea() {
    const p = this.getPerimeter() / 2;
    const area = Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
    return Number(area.toFixed(2));
  }

  isRightTriangle() {
    const sides = [this.a, this.b, this.c].sort((x, y) => x - y);
    const [cathetus1, cathetus2, hypotenuse] = sides;

    return (
      Math.abs(cathetus1 ** 2 + cathetus2 ** 2 - hypotenuse ** 2) <
      Number.EPSILON
    );
  }
}

try {
  // 1. მართკუთხა სამკუთხედი
  const t1 = new Triangle(3, 4, 5);
  console.log("სამკუთხედი 1 (3, 4, 5):");
  console.log("პერიმეტრი:", t1.getPerimeter());
  console.log("ფართობი:", t1.getArea());
  console.log("არის მართკუთხა?:", t1.isRightTriangle());

  console.log("\n-------------------------\n");

  // 2. ჩვეულებრივი სამკუთხედი
  const t2 = new Triangle(5, 6, 7);
  console.log("სამკუთხედი 2 (5, 6, 7):");
  console.log("პერიმეტრი:", t2.getPerimeter());
  console.log("ფართობი:", t2.getArea());
  console.log("არის მართკუთხა?:", t2.isRightTriangle());

  console.log("\n-------------------------\n");

  // 3. არასწორი სამკუთხედის შექმნის მცდელობა
  const t3 = new Triangle(1, 2, 10);
} catch (error) {
  console.error("შეცდომა:", error.message);
}

// 2) შექმენი Smartphone (სმარტფონი) კლასი property-ებით: brand, model, releaseYear. გააკეთე ექსტენშენი  ,
//  რომელსაც დაემატება gpuScore და batteryCapacity, და დაამატე მეთოდი performanceIndex().
console.log("-------------------დავალება2-------------------");
class Smartphone {
  constructor(brand, model, releaseYear) {
    this.brand = brand;
    this.model = model;
    this.releaseYear = releaseYear;
  }
  getInfo() {
    return `${this.brand} ${this.model} (${this.releaseYear})`;
  }
}

class androidPhone extends Smartphone {
  constructor(brand, model, releaseYear, gpuScore, batteryCapacity) {
    super(brand, model, releaseYear);
    this.gpuScore = gpuScore;
    this.batteryCapacity = batteryCapacity;
  }
  performanceIndex() {
    return this.gpuScore * 0.7 + this.batteryCapacity * 0.3;
  }
}

const myIphone = new Smartphone("Apple", "iPhone 17", 2025);
console.log(myIphone.getInfo());

const myPixel = new androidPhone("Google", "Pixel 10", 2026, 9500, 5100);
console.log(myPixel.getInfo());

const performance = myPixel.performanceIndex();
console.log(`Performance Index: ${performance}`);

// 3)შექმენი CryptoWallet (კრიპტო საფულე) კლასი, მეთოდებით: deposit(), withdraw(), transfer(), getHistory(),
console.log("-------------------დავალება3-------------------");
class CryptoWallet {
  constructor(ownerName, initialBalance = 0) {
    this.ownerName = ownerName;
    this.balance = initialBalance;
    this.history = [];
  }

  // დამხმარე მეთოდი უნიკალური ID-ის და თარიღის მისაღებად
  _generateTransaction(type, amount, details = {}) {
    return {
      id: "_" + Math.random().toString(36).substr(2, 9),
      type: type,
      amount: amount,
      date: new Date().toLocaleString(),
      ...details,
    };
  }

  deposit(amount) {
    if (amount <= 0) {
      console.error("შეცდომა: თანხა უნდა იყოს 0-ზე მეტი!");
      return false;
    }

    this.balance += amount;
    const transaction = this._generateTransaction("deposit", amount);
    this.history.push(transaction);

    console.log(
      `წარმატებით შემოვიდა: ${amount}. მიმდინარე ბალანსი: ${this.balance}`,
    );
    return true;
  }

  withdraw(amount) {
    if (amount <= 0) {
      console.error("შეცდომა: თანხა უნდა იყოს 0-ზე მეტი!");
      return false;
    }
    if (amount > this.balance) {
      console.error("შეცდომა: ბალანსზე არ არის საკმარისი თანხა!");
      return false;
    }

    this.balance -= amount;
    const transaction = this._generateTransaction("withdraw", amount);
    this.history.push(transaction);

    console.log(
      `წარმატებით გატანილია: ${amount}. მიმდინარე ბალანსი: ${this.balance}`,
    );
    return true;
  }

  transfer(amount, targetWallet) {
    if (!(targetWallet instanceof CryptoWallet)) {
      console.error("შეცდომა: მიმღები საფულე არასწორია!");
      return false;
    }
    if (amount <= 0) {
      console.error("შეცდომა: გადასარიცხი თანხა უნდა იყოს 0-ზე მეტი!");
      return false;
    }
    if (amount > this.balance) {
      console.error(
        "შეცდომა: გადარიცხვისთვის ბალანსზე არ არის საკმარისი თანხა!",
      );
      return false;
    }

    this.balance -= amount;
    const sendTx = this._generateTransaction("transfer_out", amount, {
      to: targetWallet.ownerName,
    });
    this.history.push(sendTx);

    targetWallet.balance += amount;
    const receiveTx = targetWallet._generateTransaction("transfer_in", amount, {
      from: this.ownerName,
    });
    targetWallet.history.push(receiveTx);

    console.log(
      `წარმატებით გადაირიცხა ${amount} მომხმარებელთან: ${targetWallet.ownerName}.`,
    );
    return true;
  }

  getHistory() {
    return this.history;
  }
}

const gigaWallet = new CryptoWallet("გიგა", 100);
const anaWallet = new CryptoWallet("ანა", 20);

console.log("--- ოპერაციების დაწყება ---");

gigaWallet.deposit(50);

anaWallet.withdraw(10);

gigaWallet.transfer(40, anaWallet);

console.log("\n--- ბალანსების შემოწმება ---");
console.log(`გიგას ბალანსი: ${gigaWallet.balance}`); // 110
console.log(`ანას ბალანსი: ${anaWallet.balance}`); // 50

console.log("\n--- გიგას ტრანზაქციების ისტორია ---");
console.log(gigaWallet.getHistory());

console.log("\n--- ანას ტრანზაქციების ისტორია ---");
console.log(anaWallet.getHistory());

// 4)შექმენი Wishlist (სურვილების სია) კლასი, რომელიც ინახავს ნივთებს. მეთოდები: addItem(), deleteItem(id), updateItem()
console.log("-------------------დავალება4-------------------");
class Wishlist {
  constructor() {
    this.items = [];
  }

  addItem(name, price) {
    const newItem = {
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      name: name,
      price: price,
    };
    this.items.push(newItem);
    return newItem;
  }

  deleteItem(id) {
    const initialLength = this.items.length;
    this.items = this.items.filter((item) => item.id !== id);

    if (this.items.length < initialLength) {
      console.log(`ნივთი ID-ით [${id}] წარმატებით წაიშალა.`);
      return true;
    } else {
      console.log(`ნივთი ID-ით [${id}] ვერ მოიძებნა.`);
      return false;
    }
  }

  updateItem(id, updatedProperties) {
    const item = this.items.find((item) => item.id === id);

    if (item) {
      Object.assign(item, updatedProperties);
      console.log(`ნივთი ID-ით [${id}] წარმატებით განახლდა.`);
      return item;
    } else {
      console.log(`განახლება ვერ მოხერხდა: ნივთი ID-ით [${id}] ვერ მოიძებნა.`);
      return null;
    }
  }

  showWishlist() {
    console.log("--- Wishlist ---", this.items);
  }
}

const myWishlist = new Wishlist();

const item1 = myWishlist.addItem("სმარტფონი", 1500);
const item2 = myWishlist.addItem("ლეპტოპი", 3000);
const item3 = myWishlist.addItem("ყურსასმენები", 250);

myWishlist.showWishlist();

myWishlist.updateItem(item2.id, { name: "გეიმერული ლეპტოპი", price: 3500 });

myWishlist.showWishlist();

myWishlist.deleteItem(item3.id);

myWishlist.showWishlist();

// 5)შექმენი Freelancer (ფრილანსერი) კლასი მეთოდით calculateEarnings(), რომელიც დათვლის შემოსავალს შესრულებული საათებისა და საათობრივი ტარიფის მიხედვით, დამატებით optional bonus-ს გადამეტებულ საათებზე (მაგ >160 სთ).
console.log("-------------------დავალება5-------------------");

class Freelancer {
  constructor(name, hourlyRate, hoursWorked) {
    this.name = name;
    this.hourlyRate = hourlyRate;
    this.hoursWorked = hoursWorked;
  }

  calculateEarnings() {
    const standardHours = 160;
    let totalEarnings = 0;

    if (this.hoursWorked > standardHours) {
      const regularEarnings = standardHours * this.hourlyRate;
      const overtimeHours = this.hoursWorked - standardHours;

      const bonusRate = this.hourlyRate * 1.5;
      const overtimeEarnings = overtimeHours * bonusRate;

      totalEarnings = regularEarnings + overtimeEarnings;
    } else {
      totalEarnings = this.hoursWorked * this.hourlyRate;
    }

    return totalEarnings;
  }

  getInvoice() {
    return `ფრილანსერი: ${this.name}, გამომუშავებული თანხა: ${this.calculateEarnings()} ლარი (ნამუშევარი საათები: ${this.hoursWorked}სთ).`;
  }
}

const freelancer1 = new Freelancer("გიორგი", 20, 120);
console.log(freelancer1.getInvoice());

const freelancer2 = new Freelancer("ანი", 30, 180);
console.log(freelancer2.getInvoice());

