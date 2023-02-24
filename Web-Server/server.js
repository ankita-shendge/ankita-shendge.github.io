const http = require("http");
const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");

const uri =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000";

async function connectToMongo() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db("tools");
  console.log("Connected to MongoDB!");
  // Perform database operations here...
  const collection = db.collection("featured_card");
  const result = await collection.find().toArray();
  console.log(result);
  client.close();
}

const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log(__dirname);

  connectToMongo();
  // Read the requested file from disk and stream it to the response
  if (req.url == "/") {
    res.writeHead(302, { location: "/index.html" });
    res.end();
  } else {
    const filePath = path.join(__dirname, "..", "/public", req.url);
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);

    // If the file cannot be read, send a 404 error
    stream.on("error", () => {
      res.statusCode = 404;
      res.end("Not Found");
    });
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
