const dns = require("dns")
const mongoose = require("mongoose")

const connectToDatabase = async () => {
  try {
    dns.setServers(["8.8.8.8", "1.1.1.1"])

    const uri =
      process.env.MONGODB_URI ||
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@fsctaskmanagercluster.wfztf1d.mongodb.net/task-manager?appName=FscTaskManagerCluster`

    await mongoose.connect(uri)
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message)
    process.exit(1)
  }
}

module.exports = connectToDatabase
