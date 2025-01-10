const express = require("express");
const app = express();
const PORT = 5090;

data = {
  name: "madison",
  age: 23,
  greet: "Hi my name is madison",
  favColor: "blue",
  favoriteNumber: 12345,
  hobbies: ["reading", "painting", "cooking"],
};
app.use(express.json());
app.get("/", (req, res) => {
  res.send(` <body>
    <div >
    <h1> The Name is :
    <br>${data.name}</br>
    </h1>

    <h2> the Age is :
    ${data.age}
    </h2>
    
    <h3> Greetings :
    ${data.greet}
    </h3>
    
    <h4> Favorite Color :
    ${data.favColor}
    </h4>
    </div>
    
    </body>`);
});
app.get("/api/madison", (req, res) => {
  res.send(data);
});

app.post("/api/madison", (req, res) => {
  const newdata = req.body;
  data = newdata;
  res.sendStatus(201);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
