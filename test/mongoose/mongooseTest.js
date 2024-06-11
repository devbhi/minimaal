const mongoose = require("mongoose");
const User = require("./User"); // Adjust the path accordingly

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/mydatabase");
    console.log("Connected");

    // const newUser = new User({
    //   name: "John Doe",
    //   age: 30,
    //   email: "john.doe@example.com",
    // });

    // Save the user to the database
    // const savedUser = await User.create({
    //   name: "John Doe",
    //   age: 30,
    //   email: "john.doe@example.com",
    // });

    const req = {
      params: {
        name: "John Doe",
        age: 30,
        email: "john.doe@example.com",
      },
    };

    let abc = (req, res) => {
      console.log("res");
    };

    const savedUser = await User.where("name")
      .equals(req.params.name)
      .where("age")
      .gt(15);
    console.log(
      typeof User.where("name").equals(req.params.name).where("age").gt(15)
    );
    console.log(typeof abc);
    console.log(savedUser);
  } catch (error) {
    console.error("Error connecting to MongoDB or saving user:", error);
  } finally {
    // Close the connection
    // await mongoose.disconnect();
    // console.log("Disconnected from MongoDB");
  }
}

main();
