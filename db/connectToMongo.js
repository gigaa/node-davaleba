const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const { default: mongoose } = require("mongoose");

async function connectToMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log({ message: "დაკავშირდა წარმატებით" });
  } catch (error) {
    console.log(error, "mongo connect error");
  }
}

module.exports = connectToMongo;
