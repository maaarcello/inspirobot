import express from "express";

// Initialize the express engine
const app = express();
const port = 8080;

app.use("/api/status", (req, res) => {
  res.status(200).send({ status: "OK" });
});

app.listen(port, () => {
  console.log(`TypeScript with Express http://localhost:${port}/`);
});
