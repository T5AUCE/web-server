import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello, web!");
});

app.get("/about", (req, res) => {
  res.send("This is a web programming course.");
});

const projects = [
  { name: "Weather app", tag: "javascript" },
  { name: "Portfolio site", tag: "express" },
  { name: "Budget tracker", tag: "python" },
];

app.get("/projects", (req, res) => {
  const tag = req.query.tag || "Empty";
  // filter `projects` here, based on your decision above
  if (tag === "Empty") {
    return res.send(tag);
  } else {
    return res.json(projects.filter((project) => project.tag === tag));
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
