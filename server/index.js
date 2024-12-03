const express = require("express");
const app = express();
const db = require("./models");
require("dotenv").config();

app.use(express.json()); // parse the data sent by client in json format
const cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 3001;
db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});

const postCommentsRouter = require("./routes/post_comments");
app.use("/post_comments", postCommentsRouter);

const taskCommentsRouter = require("./routes/task_comments");
app.use("/task_comments", taskCommentsRouter);

const reportsRouter = require("./routes/reports");
app.use("/reports", reportsRouter);

const postsRouter = require("./routes/posts");
app.use("/posts", postsRouter);

const userRouter = require("./routes/users");
app.use("/users", userRouter);

const projectRouter = require("./routes/projects");
app.use("/projects", projectRouter);

const joinProjectRouter = require("./routes/project_joineds");
app.use("/project-joineds", joinProjectRouter);

const taskRouter = require("./routes/tasks");
app.use("/tasks", taskRouter);

const requestRouter = require("./routes/join_requests")
app.use("/requests", requestRouter)

const AI_suggestRouter = require("./routes/AI_suggest")
app.use("/AI_suggest", AI_suggestRouter)