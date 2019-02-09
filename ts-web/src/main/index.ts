import express from "express";

const port = 8000;

express()
  .get("/", (req, res) => {
    res.send("hello world");
  })
  .listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server is listening at http://localhost:${port}`);
  });
