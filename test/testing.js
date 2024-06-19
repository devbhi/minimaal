const mongoose = require("mongoose");
const User = require("./mongoose/User");

mongoose
  .connect("mongodb://127.0.0.1:27017/mydatabase")
  .then(() => {
    console.log("Connected");
  })
  .catch((e) => {
    console.log("Error : ", e);
  });

const minimal = require("../lib/minimal");
const app = minimal();

app.use(minimal.json());
app.use(minimal.urlencoded({ extended: true }));

// app.use(() => {
//   // console.log("Hello World1");
// });
// app.use(() => {
//   console.log("Hello World2");
// });
// app.get("/", (req, res) => {
//   res.send("Hello World!)))))))");
// });

app.get("/", (req, res) => {
  res.send([1, 2, 3, 4]);
});

// app.post("/user", (req, res) => {
//   // console.log(req);
//   let body = req.body;
//   res.send(body);
// });

// const req = {
//   body: {
//     name: "abhiLLLL",
//     age: 22,
//     email: "abhi@test.com",
//   },
// };

// let a = () => {};
// console.log(typeof a);

// const a = User.create({
//   name: "name",
//   age: 1,
//   email: "email",
// });

// console.log(typeof a);

const dummyData = {
  name: "John Doe2",
  age: 32,
  email: "john.doe@example.com",
};

const operations = [
  { insertOne: { document: dummyData } },
  {
    updateOne: { filter: { name: "John Doe" }, update: { $set: { age: 31 } } },
  },
  { deleteOne: { filter: { name: "John Doe" } } },
];

app.post(
  "/user",
  query((req) =>
    User.create({
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
    })
  )
);

// app.post(
//   "/user",
//   query((req) => User.where("name").equals(req.body.name))
// );

// app.post(
//   "/getUser",
//   // handleMongooseQuery((req) => User.where("name").equals(req.body.name))
//   query((req) => User.where("name").equals(req.body.name))
// );

app.put(
  "/user",
  query((req) => User.where("name").gt(req.body.name))
);
//   (req, res) => {
//   res.json({ message: `User ${req.params.id} Updated`, data: req.body });
// }

app.delete("/user/:id", (req, res) => {
  console.log(req.params);
});
// query((req) => User.where("name").gt(req.body.name))

//   (req, res) => {
//   res.status(201).send(req.params.id);
// }

app.patch(
  "/user",
  //   async (req, res) => {
  //   try {
  //     const result = await User.bulkWrite(operations);
  //     console.log("Bulk write operation successful:", result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  query(() => User.bulkWrite(operations))
);

app.listen(4000, () => {
  console.log("Server is running on port $4000");
});
