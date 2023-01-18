const buttonLogout = document.getElementById("btn-logout");
buttonLogout.addEventListener("click", () => {
  window.location.href = "/user/logout";
});

const getListComments = () => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const responseJSON = JSON.parse(this.responseText);
      renderListComments(responseJSON);
    }
  };
  xhr.open("GET", "/comments");
  xhr.send();
};

const deleteComment = (id) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      getListComments();
    }
  };
  xhr.open("DELETE", `/comments/${id}`);
  xhr.send();
};

getListComments();

getEditUrl = (id) => {
  window.location.href = `/admin/edit/${id}`;
};

const renderListComments = (comments) => {
  const commmentListContainers = document.getElementById(
    "comments-list-container"
  );
  commmentListContainers.innerHTML = "";

  if (comments.length === 0) {
    commmentListContainers.innerHTML = `
        <div class="comments-content" style="background-color : red; opacity : 70%">
            <p class="comment-alert" style="color: white ; opacity : 100%">No comments yet!</p>
        </div>
    `;
  }

  const toString = (date) => {
    const dateObj = new Date(date);
    const dateStr = dateObj.toString();
    const dateArr = dateStr.split(" ");
    const dateStr2 = `${dateArr[0]} ${dateArr[2]} ${dateArr[1]} ${dateArr[3]}`;
    return dateStr2;
  };

  comments.forEach((comment) => {
    commmentListContainers.innerHTML += `
        <div class="comments-content">
            <div class="comment-header">
              <h2 class="comment-name">${comment.name}</h2>
              <h4 class="comment-time">${toString(comment.createdAt)}</h4>
            </div>
            <p class="comment-txt">${comment.comment}</p>
            <div class="container-comment-btn">
              <button class="comment-btn-edit" id="${comment._id}">Edit</button>
              <button class="comment-btn-delete" 
              id="${comment._id}">Delete</button>
            </div>
    `;
  });

  const buttonEdit = document.querySelectorAll(".comment-btn-edit");
  buttonEdit.forEach((button) => {
    button.addEventListener("click", () => {
      getEditUrl(button.id);
    });
  });

  const buttonDelete = document.querySelectorAll(".comment-btn-delete");
  buttonDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const confirmDelete = confirm("Are you sure to delete this comment?");
      if (confirmDelete) {
        deleteComment(button.id);
      } else {
        return;
      }
    });
  });
};
