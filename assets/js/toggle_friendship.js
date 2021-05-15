let createFriendship = function () {
  let friendButton = $("#friend-button");
  friendButton.click(function (e) {
    e.preventDefault();

    $.ajax({
      type: "post",
      url: $("#friend-button").attr("href"),
    })
      .done(function (data) {})
      .fail(function (errData) {
        console.log("error in completing the request", errData);
      });
  });
};

createFriendship();
