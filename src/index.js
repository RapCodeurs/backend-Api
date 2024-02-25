import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

const app = express();
const port = 4000;

app.use(express.json());
dotenv.config();
const uri = process.env.STRING_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/", (_, res) => {
  // Connect the client to the server	(optional starting in v4.7)
  client.connect((err, db) => {
    console.log("Connecté avec succes !");
    if (err || !db) {
      return false;
    }
    db.db("blog")
      .collection("posts")
      .find()
      .toArray(function (err, results) {
        if (!err) {
          res.status(200).send(results);
        }
      });
  });
});

app.post("/insert", (req, res) => {
  client.connect((err, db) => {
    console.log("Connecté avec succes !");
    if (err || !db) {
      return false;
    }
    db.db("blog")
      .collection("posts")
      .insertOne(req.body, function (err, results) {
        if (!err) {
          res.status(200).send(results);
        }
      });
  });
});

app.listen(port, () => {
  console.log("le serveur est lancé avec succes sur le port 4000");
});
