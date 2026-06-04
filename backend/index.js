const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")

const TaskRouter = require("./src/routes/task.routes")
const UserRouter = require("./src/routes/user.routes")

const connectToDatabase = require("./src/database/mongoose.database")

dotenv.config()

const app = express()
app.use(cors({ origin: "http://localhost:5173" }))
app.use(express.json())

connectToDatabase()

app.use("/tasks", TaskRouter)

app.use("/user", UserRouter)

app.listen(8000, () => console.log("Listening on port 8000!"))
