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
    foodName: { type: String, required: true },
    ingredients : { type: String, required: true },
    image: { type: String ,required: true },
    price: { type: String ,required: true },
    hot: { type: Boolean  },
    calories: {type: Number , required: true},
    rating : { type: Number ,required: true },
    
  }
);


const Food = mongoose.model("Food", FoodSchema, "Foods");

app.get("/", async (req,res)=>{
  const Foods = await Food.find({})
  res.render("menu.ejs", {Foods})
})

app.post("/add/food", async (req, res) => {
  const newFood = await new Food({
    foodName: req.body.foodName,
    ingredients : req.body.ingredients,
    image: req.body.image,
    price: req.body.price,
    hot: req.body.hot,
    calories: req.body.calories,
    rating: req.body.rating,
  }).save();

  res.json(newFood);
});

app.patch("/update/:food", async (req,res)=>{
  const response = await Food.findOneAndUpdate({foodName: req.params.food},{ingredients: req.body.ingredients})
  res.json(response)
})

app.delete("/delete/:food", async (req,res)=>{
  const response = await Food.findOneAndDelete({foodName: req.params.food})
  res.json(response)
})


// Add your SRV string, make sure that the database is called CSHteachers
async function startServer() {
  await mongoose.connect("mongodb+srv://SE12:CSH2025@adamo8.b6ydo.mongodb.net/CoffeeShop?retryWrites=true&w=majority&appName=AdamO8");

  app.listen(3000, () => {
    console.log(`Server running.`);
  });
}

startServer();
