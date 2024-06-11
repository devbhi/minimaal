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

// app.get("/", (req, res) => {
//   res.send("Hello World!)))))))");
// });

app.get("/", User.where("name").equals("John Doe").where("age").gt(15));

app.post("/user", (req, res) => {
  console.log(req);
  let body = req.body;
  res.send(body);
});

// app.post(
//   "/user",
//   User.create({
//     name: "John Doe",
//     age: 30,
//     email: "john.doe@example.com",
//   })
// );

app.put("/user/:id", (req, res) => {
  res.json({ message: `User ${req.params.id} Updated`, data: req.body });
});

app.delete("/user/:id", (req, res) => {
  res.status(204).send();
});

app.patch("/user/:id", (req, res) => {
  res.json({ message: `User ${req.params.id} Patched`, data: req.body });
});

app.listen(4000, () => {
  console.log("Server is running on port $4000");
});
