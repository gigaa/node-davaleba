//  1) გაქვს ლეპტოპების მასივი, იპოვე ყველაზე ძვირი და გამოიტანე კონსოლში
console.log("-------------------დავალება1-------------------");
const laptops = [
  { model: "Dell XPS 13", price: 1800 },
  { model: "MacBook Pro 14", price: 2499 },
  { model: "Lenovo ThinkPad X1", price: 2100 },
  { model: "Asus Zephyrus G14", price: 1999 },
];
const mostExpensive = laptops.reduce((tot, cur) => {
  return cur.price > tot.price ? cur : tot;
});

console.log("ყველაზე ძვირიანი ლეპტოპი არის:", mostExpensive);
// 2)შექმენი ობიექტი, რომელსაც ექნება width, height და getArea() მეთოდი, რომელიც დააბრუნებს ფართობს.
console.log("-------------------დავალება2-------------------");

let obj2 = {
  width: 0,
  height: 0,
  setWidth: function (value) {
    this.width = value;
    return this;
  },
  setHeight: function (value) {
    this.height = value;
    return this;
  },
  getArea: function () {
    return this.width * this.height;
  },
};

res2 = obj2.setWidth(7).setHeight(3).getArea();
console.log("ფართობი: " + res2);

// 3)დაბეჭდე მხოლოდ იმ სტუდენტების სახელები, რომელთაც passed === true.
console.log("-------------------დავალება3-------------------");
const students = [
  { name: "Giorgi", score: 85, passed: true },
  { name: "Nika", score: 50, passed: false },
  { name: "Mariam", score: 92, passed: true },
  { name: "Luka", score: 60, passed: false },
];
studentsFiltered = students.filter((item) => item.passed === true);
console.log(studentsFiltered);

// 4)გაფილტრე ისეთი პროდუქტები, რომლებიც 10$-ზე იაფია და დააბრუნე მხოლოდ მათი სათაურების მასივი.
console.log("-------------------დავალება4-------------------");
const products = [
  { title: "Pencil", price: 2 },
  { title: "Notebook", price: 5 },
  { title: "Backpack", price: 35 },
  { title: "Ruler", price: 3 },
  { title: "Calculator", price: 40 },
];

productsFiltered = products
  .filter((item) => item.price < 10)
  .map((item) => item.title);
console.log(productsFiltered);
// 5)დაალაგე ზრდადობით rating-ის მიხედვით
console.log("-------------------დავალება5-------------------");
const movies = [
  { title: "Inception", rating: 9 },
  { title: "Avatar", rating: 7.5 },
  { title: "Joker", rating: 8.2 },
  { title: "Tenet", rating: 6.9 },
];

movies.sort((a, b) => a.rating - b.rating);

console.log(movies);
// 6)იპოვე ყველაზე იაფი ტელეფონი და გამოიტანე მხოლოდ მისი model
console.log("-------------------დავალება6-------------------");
const phones = [
  { model: "iPhone 15", price: 1200 },
  { model: "Samsung Galaxy S24", price: 950 },
  { model: "Xiaomi Redmi 13", price: 250 },
  { model: "Pixel 8", price: 800 },
];
const mostCheap = phones.reduce((tot, cur) => {
  return cur.price < tot.price ? cur : tot;
});

console.log("ყველაზე იაფი ტელეფონი არის:", mostCheap.model);
// 7)დაბეჭდე 300- გვერდიანზე მეტი
console.log("-------------------დავალება7-------------------");
const books = [
  { title: "Harry Potter", pages: 500 },
  { title: "The Little Prince", pages: 120 },
  { title: "Lord of the Rings", pages: 700 },
  { title: "Animal Farm", pages: 250 },
];
const longBooks = books.filter((book) => book.pages > 300);
console.log(longBooks);

// 8)დაალაგე ზრდადობით და შეკრიბე ფასი
console.log("-------------------დავალება8-------------------");
const phones2 = [
  { model: "iPhone 15", price: 1200 },
  { model: "Samsung Galaxy S24", price: 950 },
  { model: "Xiaomi Redmi 13", price: 250 },
  { model: "Pixel 8", price: 800 },
];

phones2.sort((a, b) => a.price - b.price);

const totalPrice = phones2.reduce((sum, phone) => sum + phone.price, 0);

console.log("დალაგებული სია:", phones2);
console.log("ჯამური ფასი:", totalPrice);

