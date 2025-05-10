// Import necessary modules
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// JSON string containing taco recipes
const recipeJSON = '[{"id": "0001","type": "taco","name": "Chicken Taco","price": 2.99,"ingredients": {"protein": {"name": "Chicken","preparation": "Grilled"},  "salsa": {"name": "Tomato Salsa","spiciness": "Medium"},  "toppings": [{"name": "Lettuce",  "quantity": "1 cup",  "ingredients": ["Iceberg Lettuce"]  },      {"name": "Cheese",  "quantity": "1/2 cup",  "ingredients": ["Cheddar Cheese", "Monterey Jack Cheese"]  },      {"name": "Guacamole",  "quantity": "2 tablespoons",  "ingredients": ["Avocado", "Lime Juice", "Salt", "Onion", "Cilantro"]  },      {"name": "Sour Cream",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream"]  }      ]    }  },{"id": "0002","type": "taco","name": "Beef Taco","price": 3.49,"ingredients": {"protein": {"name": "Beef","preparation": "Seasoned and Grilled"},  "salsa": {"name": "Salsa Verde","spiciness": "Hot"},  "toppings": [{"name": "Onions",  "quantity": "1/4 cup",  "ingredients": ["White Onion", "Red Onion"]  },      {"name": "Cilantro",  "quantity": "2 tablespoons",  "ingredients": ["Fresh Cilantro"]  },      {"name": "Queso Fresco",  "quantity": "1/4 cup",  "ingredients": ["Queso Fresco"]  }      ]    }  },{"id": "0003","type": "taco","name": "Fish Taco","price": 4.99,"ingredients": {"protein": {"name": "Fish","preparation": "Battered and Fried"},  "salsa": {"name": "Chipotle Mayo","spiciness": "Mild"},  "toppings": [{"name": "Cabbage Slaw",  "quantity": "1 cup",  "ingredients": [    "Shredded Cabbage",    "Carrot",    "Mayonnaise",    "Lime Juice",    "Salt"          ]  },      {"name": "Pico de Gallo",  "quantity": "1/2 cup",  "ingredients": ["Tomato", "Onion", "Cilantro", "Lime Juice", "Salt"]  },      {"name": "Lime Crema",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream", "Lime Juice", "Salt"]  }      ]    }  }]';

// Serve static files from "public" directory (e.g., CSS)
app.use(express.static("public"));
// Parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Handle GET request for the homepage
app.get("/", (req, res) => {
  res.render("index.ejs", {recipe : null});
});


// Handle POST request when user selects a taco ingredient
app.post("/recipe", (req, res) => {
  
  const choice = req.body.choice.toLowerCase(); // Get and lowercase the user input
  const recipes = JSON.parse(recipeJSON); // Convert JSON string to JavaScript array
  // Find the recipe that includes the chosen ingredient in the name
  const recipe = recipes.find(element =>
    element.name.toLowerCase().includes(choice)
  );

  // Render the page with the found recipe or null if not found
  if (recipe){
    res.render("index.ejs", {recipe })
  } else {
    res.render("index.ejs", { recipe: null});
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
