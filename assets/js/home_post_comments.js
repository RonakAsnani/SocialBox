class PostComments {
  constructor(postId) {
    this.postId = postId;
    this.postContainer = $(`#post-${postId}`);
    this.newCommentForm = $(`#post-${postId}-comments-form`);
    this.createComment(postId);

    let self = this;
    $(` .delete-comment-button`, this.postContainer).each(function () {
      self.deleteComment($(this));
    });
  }
  createComment(postId) {
    let pSelf = this;
    this.newCommentForm.submit(function (e) {
      e.preventDefault();
      //let self = this;
      $.ajax({
        type: "post",
        url: "/comments/create",
        data: pSelf.newCommentForm.serialize(),
        success: function (data) {
          let newComment = pSelf.newCommentDom(data.data.comment);
          $(`#post-comments-${postId}`).prepend(newComment);
          pSelf.deleteComment($(" .delete-comment-button", newComment));

          new ToggleLike($(" .toggle-like-button", newComment));
          new Noty({
            theme: "relax",
            text: "Comment published!",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (err) {
          console.log(err);
        },
      });
    });
  }
  newCommentDom(comment) {
    return $(`<li class="comment" id="comment-${comment._id}">
          <p>
          <small id="comment-name">
          ${comment.user.name}
          </small>
          <a data-likes="0" class="toggle-like-button" href="/likes/toggle/?id=${comment._id}&type=Comment">
          <img src="https://www.flaticon.com/svg/vstatic/svg/1077/1077035.svg?token=exp=1620977848~hmac=f2b63d09a0099aa557195be40349d866" alt="Like"><span>   0</span>
        </a>
              <small>
                  <a  class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
              </small>
           
              <h3>${comment.content}</h3>
             
              
             
          </p> 
      </li>`);
  }

  deleteComment(deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#comment-${data.data.comment_id}`).remove();
          new Noty({
            theme: "relax",
            text: "Comment Deleted",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  }
}
