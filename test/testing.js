const minimal = require("../lib/minimal");
const app = minimal();

app.use(minimal.json());
app.use(minimal.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/user", (req, res) => {
  res.send("Hello World!)))))))");
});

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
