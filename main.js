// 1)შექმენი 2 ფოლდერი 3 ფაილი, წაშალე მარტო ფოლდერები. შეამომწე lstat-ის მეშვეობით

const fs = require("fs/promises");
const path = require("path");

async function file1() {
  const folders = ["folder1", "folder2"];
  const files = ["file1.txt", "file2.txt", "file3.txt"];

  for (const folder of folders) {
    await fs.mkdir(folder, { recursive: true });
    console.log(`ფოლდერი შეიქმნა: ${folder}`);
  }

  for (const file of files) {
    await fs.writeFile(file, "გამარჯობა მსოფლიო!");
    console.log(`ფაილი შეიქმნა: ${file}`);
  }

  console.log("\n--- 2. ვამოწმებთ lstat-ით წაშლამდე ---");
  await checkStatus([...folders, "file1.txt"]);

  console.log("\n--- 3. ვშლით მხოლოდ ფოლდერებს (შიგთავსით) ---");
  for (const folder of folders) {
    await fs.rm(folder, { recursive: true, force: true });
    console.log(`წაიშალა ფოლდერი: ${folder}`);
  }

  console.log("\n--- 4. ვამოწმებთ lstat-ით წაშლის შემდეგ ---");
  // 'file1.txt' ისევ უნდა არსებობდეს, ფოლდერებზე კი ერორი დაიჭერა
  await checkStatus([...folders, "file1.txt"]);
}

async function checkStatus(paths) {
  for (const item of paths) {
    try {
      const stat = await fs.lstat(item);
      if (stat.isDirectory()) {
        console.log(`[არსებობს] ${item} არის ფოლდერი (Directory)`);
      } else if (stat.isFile()) {
        console.log(`[არსებობს] ${item} არის ფაილი (File)`);
      }
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log(
          `[არ არსებობს] ${item} ვერ მოიძებნა (წაშლილია ან არ შექმნილა)`,
        );
      } else {
        console.log(`შეცდომა ${item}-ის შემოწმებისას:`, error.message);
      }
    }
  }
}

file1();

// 2)შექმენი  მთავარი ფოლდერი, ფოლდერში აიღე ერთი main.js ამ main.js ით შექმენი (mkdir) ფოლდერი და ამ ფოლდერში ჩაწერე index.js შემდეგ ამ index.js-ით ჩაწერე მთავარფოლდერში message.txt, ამ message.txt-ში რაც გექნება შეატრიალე ეგ სტრინგი და ისევ იგივეში ჩაწერე.

async function file2() {
  try {
    const subfolderName = "subfolder";
    const subfolderPath = path.join(process.cwd(), subfolderName);
    await fs.mkdir(subfolderPath, { recursive: true });
    console.log(`✓ ფოლდერი '${subfolderName}' წარმატებით შეიქმნა.`);

    const indexJsContent = `
const fs = require("fs/promises");
const path = require("path");

async function handleMessage() {
    try {
        const mainDirPath = path.join(process.cwd(), '..'); 
        const txtFilePath = path.join(mainDirPath, 'message.txt');

        const initialText = "Hello from Node.js!";
        await fs.writeFile(txtFilePath, initialText, 'utf-8');
        console.log("✓ message.txt შეიქმნა საწყისი ტექსტით.");

        const data = await fs.readFile(txtFilePath, 'utf-8');
        
        const reversedText = data.split('').reverse().join('');

        await fs.writeFile(txtFilePath, reversedText, 'utf-8');
        console.log("✓ message.txt-ში ტექსტი წარმატებით შეტრიალდა!");

    } catch (error) {
        console.error("შეცდომა index.js-ის გაშვებისას:", error.message);
    }
}

handleMessage();
        `.trim();

    const indexJsPath = path.join(subfolderPath, "index.js");
    await fs.writeFile(indexJsPath, indexJsContent, "utf-8");
    console.log("✓ index.js შეიქმნა subfolder-ში.");

    console.log(
      "\\n👉 ახლა ტერმინალში გადადი 'subfolder' დირექტორიაში და გაუშვი: node index.js",
    );
  } catch (error) {
    console.error("დაფიქსირდა შეცდომა main.js-ში:", error.message);
  }
}

file2();

// 3) შექმენი ფოლდერი ამ ფოლდერში გქონდეს 6 ფაილი. 3 ფაილის გაფართოვება უნდა იყოს .txt. 3 ფაილის გაფართოვება უნდა იყოს .js. შენ უნდა იპოვო ,ისეთი ფაილები, რომლის გაფართოვებაცაა .txt და ისინი ჩწერო საერთო all.txt-ში

async function files3() {
  const folderName = "my_folder";

  await fs.mkdir(folderName, { recursive: true });
  console.log(`ფოლდერი '${folderName}' წარმატებით შეიქმნა.`);

  const filesToCreate = [
    { name: "file1.txt", content: "ტექსტი პირველი ფაილიდან.\n" },
    { name: "file2.txt", content: "ტექსტი მეორე ფაილიდან.\n" },
    { name: "file3.txt", content: "ტექსტი მესამე ფაილიდან.\n" },
    { name: "script1.js", content: 'console.log("Hello 1");' },
    { name: "script2.js", content: 'console.log("Hello 2");' },
    { name: "script3.js", content: 'console.log("Hello 3");' },
  ];

  for (const file of filesToCreate) {
    const filePath = path.join(folderName, file.name);
    await fs.writeFile(filePath, file.content, "utf-8");
  }
  console.log("6 ფაილი წარმატებით შეიქმნა.");

  const allFiles = await fs.readdir(folderName);

  const txtFiles = allFiles.filter((file) => path.extname(file) === ".txt");

  let combinedContent = "";

  for (const file of txtFiles) {
    const filePath = path.join(folderName, file);

    const content = await fs.readFile(filePath, "utf-8");
    combinedContent += content;
  }

  const outputPath = path.join(folderName, "all.txt");
  await fs.writeFile(outputPath, combinedContent, "utf-8");

  console.log("ტექსტური ფაილები წარმატებით გაერთიანდა 'all.txt'-ში!");
}

files3();

// 4) დაწერე http სერვერი და გამოდგი 3 ენდფოინითი (/animals,/cars,/motorcycle)

const http = require("http");
const PORT = 3000;
const data = {
  animals: ["Lion", "Elephant", "Penguin", "Cheetah"],
  cars: ["Tesla Model S", "BMW M4", "Porsche 911", "Audi RS6"],
  motorcycles: [
    "Yamaha R1",
    "Honda CBR1000RR",
    "Ducati Panigale",
    "Kawasaki Ninja",
  ],
};

const server = http.createServer((req, res) => {
  if (req.url === "/animals") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "success", data: data.animals }));
  } else if (req.url === "/cars") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "success", data: data.cars }));
  } else if (req.url === "/motorcycle") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "success", data: data.motorcycles }));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "error", message: "Endpoint not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server Run: http://localhost:${PORT}`);
});
