class ToggleLike {
  constructor(toggleElement) {
    this.toggler = toggleElement;
    this.toggleLike();
  }

  toggleLike() {
    $(this.toggler).click(function (e) {
      e.preventDefault();
      // console.log("clicked");
      let self = this;

      // this is a new way of writing ajax which you might've studied, it looks like the same as promises
      $.ajax({
        type: "post",
        url: $(self).attr("href"),
      })
        .done(function (data) {
          let likesCount = parseInt($(self).attr("data-likes"));
          console.log(likesCount);
          if (data.data.deleted == true) {
            likesCount -= 1;
          } else {
            likesCount += 1;
          }

          $(self).attr("data-likes", likesCount);
          $(self).html(
            ` <img src="https://img-premium.flaticon.com/png/512/1076/1076984.png?token=exp=1621076559~hmac=2a4679c04664fe800ffed9a8bac9ee5c" alt="Like"> ${likesCount}`
          );
        })
        .fail(function (errData) {
          //console.log($(self).attr("href"));
          console.log("error in completing the request", errData);
        });
    });
  }
}
