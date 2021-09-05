require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("<h1>Server running</h1>");
});

app.use("/api/user", require("./routes/api/user.routes"));
app.use("/api/category", require("./routes/api/category.routes"));
app.use("/api/quiz", require("./routes/api/quiz.routes"));
app.use("/api/question", require("./routes/api/question.routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
