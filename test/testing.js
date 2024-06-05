const minimal = require("../lib/minimal");
const app = minimal();

// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// });

//////

app.get("/", (req, res) => {
  res.end("Hello World!");
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
