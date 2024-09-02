// let pageLimit = 2;
// let page = 0;

// const { response } = require("express");
// const { unescape } = require("querystring");

// const { response } = require("express");

// function getProfile() {
//   $.ajax({
//     url: "/profile",
//     type: "GET",
//     dataType: "json",
//     success: function (profileData) {
//       console.log(profileData);
//       let profileTemplate = $("#tweet_profile_name").html();
//       const compiledTemplate = Handlebars.compile(profileTemplate);
//       const renderedHtml = compiledTemplate(profileData);
//       let profileInfoContainer = $("#profile_name_info");
//       profileInfoContainer.html(renderedHtml);
//     },
//     error: function (status, error) {
//       console.error(status, error);
//     },
//   });
// }

// function getTweets() {
//   $.ajax({
//     url: "/feed",
//     type: "GET",
//     dataType: "json",
//     data: {
//       page: page,
//       limit: pageLimit,
//     },
//     success: function (response) {
//       handleTweetsResponse(response);
//     },
//     error: function (status, error) {
//       console.error(status, error);
//     },
//   });
// }

// function handleTweetsResponse(response) {
//   console.log(response);
//   // assigning next page to fetch
//   page = response.pagination.currentPage + 1;
//   const html_posts = getTweetsHtml(response.tweets);
//   let tweets = $("#tweet_posts");
//   tweets.append(html_posts);
// }

// function getTweetsHtml(tweetsData) {
//   let postTemplate = $("#tweet_post_html").html();
//   const toPostFunction = Handlebars.compile(postTemplate);
//   const html_posts = toPostFunction({ tweets: tweetsData });

//   return html_posts;
// }

// function registerPageLoadOnClick() {
//   $("#load_old_posts").on("click", function () {
//     console.log("button clicked");
//     getTweets();
//   });
// }

// function registerTextInputValidation() {
//   let btn_post = $("#post_btn");
//   btn_post.addClass("disabled");

//   $("#tweet_content_value").on("input", function () {
//     let tweetCounter = $(".counter");
//     let currentTweetLength = $(this).val().trim().length;
//     let maxLength = 100;

//     if (currentTweetLength <= 0) {
//       btn_post.addClass("disabled");
//       tweetCounter.hide();
//     } else {
//       tweetCounter.show();
//       btn_post.removeClass("disabled");
//     }

//     tweetCounter.html(maxLength - currentTweetLength);
//   });
// }

// function registerPostNewTweet() {
//   $("#add_new_tweet").submit(function (event) {
//     event.preventDefault();
//     let btn_post = $("#post_btn");
//     var tweetContent = $("#tweet_content_value").val().trim();
//     if (tweetContent == "") {
//       alert("Need to add tweet into textarea");
//       return;
//     }

//     $.ajax({
//       url: "/feed",
//       type: "POST",
//       dataType: "json",
//       contentType: "application/json",
//       data: JSON.stringify({ tweet: tweetContent }),
//       success: function (response) {
//         console.log(response);
//         const html_posts = getTweetsHtml([response]);
//         let tweets = $("#tweet_posts");
//         tweets.prepend(html_posts);

//         btn_post.addClass("disabled");
//         $("#tweet_content_value").val("");
//       },
//       error: function (xhr, status, error) {
//         console.error(status, error);
//       },
//     });
//   });
// }

// window.addEventListener("load", function () {
//   getProfile();
//   getTweets();
//   registerPageLoadOnClick();
//   registerTextInputValidation();
//   registerPostNewTweet();
// });
