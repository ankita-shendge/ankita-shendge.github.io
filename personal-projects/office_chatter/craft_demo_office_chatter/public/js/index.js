let pageLimit = 2;
let page = 0;

// call GET API getProfile
function getProfile() {
  fetch("/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response not ok");
      }
      return response.json();
    })
    .then((profileData) => {
      console.log(profileData);
      let profileTemplate =
        document.getElementById("profile_template").innerHTML;
      let compiledTemplate = Handlebars.compile(profileTemplate);
      let renderHtml = compiledTemplate(profileData);
      let profileInfoContainer = document.getElementById("render_profile_info");
      profileInfoContainer.innerHTML = renderHtml;
    });
}
// call GET API to GetTweets
function getTweets() {
  fetch(`/feed?page=${page}&limit=${pageLimit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response not ok");
      }
      return response.json();
    })
    .then((response) => {
      console.log(response);
      handleTweetsResponse(response);
    })
    .catch((error) => {
      console.error("Error fetching tweets:", error);
    });
}

// Handle stack of Tweets response
function handleTweetsResponse(response) {
  page = response.pagination.currentPage + 1;
  const all_tweets = getTweetsHtml(response.tweets);
  console.log(all_tweets);
  let tweetsContainer = document.getElementById("render_tweet_posts");
  tweetsContainer.insertAdjacentHTML("beforeend", all_tweets);

  const heart_btns = document.querySelectorAll(".heart");

  for (let i = 0; i < heart_btns.length; i++) {
    heart_btns[i].addEventListener("toggle", function () {
      console.log("heart is clciked");

      heart_btns[i].style.backgroundColor = "red";
    });
  }
}

// get the Tweets response
function getTweetsHtml(tweetsData) {
  let tweetsTemplate = document.getElementById("tweets_template").innerHTML;
  let compiledTweets = Handlebars.compile(tweetsTemplate);
  let all_tweets = compiledTweets({ tweets: tweetsData });
  return all_tweets;
}

// Load two old posts at a time; whenever clicked, it will load all posts until the end.

function registerPageLoadOnClick() {
  document
    .getElementById("load_old_posts")
    .addEventListener("click", function () {
      getTweets();
    });
}

// Input validation 1. post button 2.tweetCounter

function registerTextInputValidation() {
  let btnPost = document.getElementById("post_btn");
  btnPost.classList.add("disabled");

  let tweetContentValue = document.getElementById("tweet_content_value");
  let tweetCounter = document.querySelector(".counter");
  tweetContentValue.addEventListener("input", function () {
    let currentTweetLength = this.value.length;
    let maxLength = 100;

    if (currentTweetLength <= 0) {
      btnPost.classList.add("disabled");
    } else {
      tweetCounter.style.display = "inline";
      btnPost.classList.remove("disabled");
    }
    tweetCounter.innerHTML = maxLength - currentTweetLength;
  });
}

// Add new Tweet
function registerPostNewTweet() {
  document
    .getElementById("add_new_tweet")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      let btnPost = document.getElementById("post_btn");
      let tweetCounter = document.querySelector(".counter");
      let tweetContent = document
        .getElementById("tweet_content_value")
        .value.trim();
      if (tweetContent === "") {
        alert("Need to add tweet into textarea");
        return;
      }
      // Call POST API to add New Tweet
      fetch("/feed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tweet: tweetContent }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((response) => {
          console.log(response);
          const newTweetPost = getTweetsHtml([response]);
          let newTweetContainer = document.getElementById("render_tweet_posts");
          newTweetContainer.insertAdjacentHTML("afterbegin", newTweetPost);
          btnPost.classList.add("disabled");
          document.getElementById("tweet_content_value").value = "";
          tweetCounter.innerHTML = "100";
        })
        .catch((error) => {
          console.error("Error posting new tweet:", error);
        });
    });
}

window.addEventListener("load", function () {
  getProfile();
  getTweets();
  registerPageLoadOnClick();
  registerTextInputValidation();
  registerPostNewTweet();
});
