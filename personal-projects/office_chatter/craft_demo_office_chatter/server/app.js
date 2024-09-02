const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "../public")));

// Sample data
let profileInfo = {
  name: "John Smith",
  handle: "johnsmith",
  imageUrl: "/images/john_smith.jpeg",
  followers: 225,
  following: 125,
  tweets: 424,
};

let tweets = [
  {
    id: 1,
    imageUrl: "/images/green_nature.jpeg",
    name: "Ankita Shendge",
    handle: "johnsmith",
    tweet: "A quick brown fox",
    date: "2/27/2018 4:44PM",
    comments: 225,
    likes: 125,
    poll: 424,
  },
  {
    id: 2,
    imageUrl: "/images/mountain.webp",
    name: "Brandi Garcia",
    handle: "brandiGarcia",
    tweet: "A slow red fox",
    date: "2/21/2018 1:23AM",
    comments: 22,
    likes: 15,
    poll: 44,
  },
  {
    id: 3,
    imageUrl: "/images/road.jpg",
    name: "Divika Stalling",
    handle: "divikastalling",
    tweet: "A quick red bear",
    date: "2/20/2018 4:44PM",
    comments: 25,
    likes: 25,
    poll: 24,
  },
  {
    id: 4,
    imageUrl: "/images/lake.png",
    name: "Pragathi Shah",
    handle: "pragathishah",
    tweet: "A fast brown fox",
    date: "2/18/2018 4:44PM",
    comments: 25,
    likes: 15,
    poll: 24,
  },
];

// Route to get profile info
app.get("/profile", (req, res) => {
  res.json(profileInfo);
});

app.get("/feed", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;

  // Calculate the starting index of tweets based on the page number and limit
  const startIndex = (page - 1) * limit;
  // Calculate the ending index of tweets
  const endIndex = Math.min(startIndex + limit, tweets.length);

  // Slice the array of tweets to get the tweets for the requested page
  const pageTweets = tweets.slice(startIndex, endIndex);

  // Construct pagination metadata
  const pagination = {
    totalPages: Math.ceil(tweets.length / limit),
    currentPage: page,
    totalTweets: tweets.length,
  };

  // Response with paginated tweets and pagination metadata
  res.json({ tweets: pageTweets, pagination });
});

// Route to post a new tweet
app.post("/feed", (req, res) => {
  const newTweet = req.body;
  newTweet.name = "John Smith";
  newTweet.date = "2/18/2018 4:44PM";
  newTweet.counter = "140";
  newTweet.imageUrl = "/images/john_smith.jpeg";
  newTweet.handle = "John_Smith";
  // tweets.pre;
  tweets.unshift(newTweet);
  res.status(201).json(newTweet);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
