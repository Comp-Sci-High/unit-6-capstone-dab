const mongoose = require("mongoose");
const express = require("express");

const app = express();

app.use(express.static(__dirname + "/public"));

app.use(express.json());

app.set("view engine", "ejs");

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.path}`);
  next();
});

const FoodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    ingredients : { type: String },
    image: { type: String },
    price: { type: String },
    hot: { type: Boolean },
    calories: {type: Number}
    
  }
);


const Food = mongoose.model("Food", FoodSchema, "Foods");


app.get("/", async (req, res) => {
  const teachers = await Teacher.find({}).sort({ createdAt: -1 });
  res.render("teachers.ejs", { teachers });
});

app.get("/ratings", async (req, res) => {
  const ratings = await Rating.find({}).sort({ createdAt: -1 });
  res.render("ratings.ejs", { ratings });
});

app.post("/add/food", async (req, res) => {
  const newRating = await new Rating({
    food: req.body.username,
    indegreients : req.body.teacher,
    comment: req.body.comment,
    rating: req.body.rating,
  }).save();
  res.json(newRating);
});

app.post("/add/teacher", async (req, res) => {
  const newTeacher = await new Teacher({
    name: req.body.name,
    department: req.body.department,
    image: req.body.image,
  }).save();

  res.json(newTeacher);
});

// Add your SRV string, make sure that the database is called CSHteachers
async function startServer() {
  await mongoose.connect("mongodb+srv://SE12:CSH2025@adamo8.b6ydo.mongodb.net/CSHteachers?retryWrites=true&w=majority&appName=AdamO8");

  app.listen(3000, () => {
    console.log(`Server running.`);
  });
}

startServer();
