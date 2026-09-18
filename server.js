import express from "express";

const app = express();
const PORT = 3000;
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello, web!");
});

const projects = [
  { name: "Weather app", tag: "javascript" },
  { name: "Portfolio site", tag: "express" },
  { name: "Budget tracker", tag: "python" },
];

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/projects", (req, res) => {
  const tag = req.query.tag || "Empty";
  // filter `projects` here, based on your decision above
  if (tag === "Empty") {
    return res.send(tag);
  } else {
    return res.json(projects.filter((project) => project.tag === tag));
  }
});

app.get("/events", (req, res) => {
  const events = [];
  res.render("events", { title: "Events", events });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
