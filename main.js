// -პრაქტიკა-
// 1) let fullName = "Lika Mamaladze" - საბოლოო პასუხი "L.M."
console.log("-------------------დავალება1-------------------");
fullName = "Lika Mamaladze";
const words = fullName.split(" ");
console.log(`${words[0].charAt(0)}.${words[1].charAt(0)}`);
// 2) let email = " EXAMPLE@MAIL.COM " - გაწმინდე (trim) და გადაიყვანე lowercase-ში. გადაამოწმე, შეიცავს თუ არა "@"
console.log("-------------------დავალება2-------------------");
let email = " EXAMPLE@MAIL.COM ";
email = email.trim().toLowerCase();
console.log(email);
if (email.includes("@")) {
  console.log("ემაილი შეიცავს @");
}

// 3) let str = "luka" ამოიღეთ ბოლო ასო და გადააქციეთ upperCase-ად
console.log("-------------------დავალება3-------------------");
let str = "luka";
result = str.charAt(str.length - 1).toUpperCase();
console.log(result);

// 4)გამოიყენე for ლუპი 1-დან 100-მდე რიცხვებზე.
// თუ რიცხვი იყოფა 3-ზე დააბრუნე - "Foo"
// თუ იყოფა 5-ზე დააბრუნე - "Bar"
// თუ იყოფა ორივეზე დააბრუნე - "FooBar"
// თუ არა დააბრუნე - უბრალოდ რიცხვი
console.log("-------------------დავალება4-------------------");
for (let i = 1; i < 100; i++) {
  if (i % 3 == 0) {
    console.log("Foo");
  }
  if (i % 5 == 0) {
    console.log("Bar");
  }
  if (i % 3 == 0 && i % 5 == 0) {
    console.log("FooBar");
  } else {
    console.log(i);
  }
}
// 5)let text = "JS is stupid but sometimes cool" - სიტყვა "stupid" შეცვალე "s****d"-ით.
console.log("-------------------დავალება5-------------------");
let text = "JS is stupid but sometimes cool";
let replacedText = text.replace("stupid", "s****d");
console.log(replacedText);

// -თეორია-
// 1)რამდენი ცვლადი გვაქვს ჯავასკრიპტში.(პასუხი თეორიულად გაეცი)
// სამი ტიპის ცვლადი გვაქვს და ესენია: var, let და const
// 2)რამდენიტიპი გვაქვს ჯავასკრიპტში.(ჩამოთვალე)(პასუხი თეორიულად გაეცი)
// რვა ტიპი გვაქს: Number, BigInt, String, Boolean, undefined, null, Symbol, Object/Array
// 3) რომელი მეთოდი აქცევს სტრინგს მასივად.(პასუხი თეორიულად გაეცი)
// split
// 4) სტრინგი პრიმიტიული ტიპია თუ არა ? .(პასუხი თეორიულად გაეცი)
// კი სტრინგი პრიმიტიული ტიპია
// 5)ჩამოთვალე რა მეთოდები ვისწავლეთ მაგ -> length(პასუხი თეორიულად გაეცი)
// slice,charAt,split,toLowerCase,toUpperCase,trim,length,replace,includes,concat
