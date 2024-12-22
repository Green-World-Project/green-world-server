import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import vercelRoutes from "./routes/vercelRoutes";

const app = express();
const port = 3000;

app.use(express.json());

// mongoose.connect(`mongodb://localhost:27017/greenWorld`);

// mongoose.connect(`mongodb+srv://poulakarem:I9Mo2yABmg3zpgqO@green-world-db.4znn6.mongodb.net/database`);

// mongoose.connect(`mongodb+srv://poulakarem:I9Mo2yABmg3zpgqO@green-world-db.4znn6.mongodb.net`);

// const db = mongoose.connection;

// db.on("error", () => console.log("Connection Error!"));
// db.once("open", () => console.log("Connected to mongoDB..."));




const uri = "mongodb+srv://poulakarem:I9Mo2yABmg3zpgqO@green-world-db.4znn6.mongodb.net/?retryWrites=true&w=majority&appName=green-world-db";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);



app.use(vercelRoutes)
app.use(userRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}...`));