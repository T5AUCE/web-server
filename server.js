import express from "express";

const app = express();
const PORT = 3000;
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));
app.use(express.json());

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

const events = [
  { title: "First", body: "Blah blah blah 1." },
  { title: "Second", body: "Blah blah blah 2." },
];

app.get("/events", (req, res) => {
  res.render("events", { title: "Events", events });
});

app.delete("/events/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (Number.isNaN(id) || id < 0 || id >= events.length) {
    res.status(404).json({ error: "Entry not found" });
    return;
  }
  events.splice(id, 1);
  res.status(204).send();
});

const wishlist = [
  { title: "First", body: "Blah blah blah 1." },
  { title: "Second", body: "Blah blah blah 2." },
];

app.get("/wishlist", (req, res) => {
  return res.json(wishlist);
});

app.post("/wishlist", (req, res) => {
  const { item, note } = req.body;
  // your decision goes here
  if (!item || !note) {
    return res.status(400).json({ error: "Item and note are required." });
  }
  const newItem = { item, note };
  wishlist.push(newItem);
  res.status(201).json(newItem);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
