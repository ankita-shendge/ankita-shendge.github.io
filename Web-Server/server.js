const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log(__dirname);
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
