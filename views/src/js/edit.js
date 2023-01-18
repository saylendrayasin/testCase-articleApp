const url = window.location.href;
const urlArr = url.split("/");
const id = urlArr[urlArr.length - 1];

const getOne = (id) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const responseJSON = JSON.parse(this.responseText);
      renderOneComments(responseJSON);
    }
  };
  xhr.open("GET", `/getOne/${id}`);
  xhr.send();
};

getOne(id);

renderOneComments = (comment) => {
  const commentName = document.getElementById("edit-form-input");
  const commentComment = document.getElementById("edit-form-textarea");

  commentName.value = comment.name;
  commentComment.value = comment.comment;
};

const updateComment = (id) => {
  const commentName = document.getElementById("edit-form-input");
  const commentComment = document.getElementById("edit-form-textarea");

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      window.location.href = "/admin";
    }
  };
  xhr.open("PUT", `/comments/${id}`);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      name: commentName.value,
      comment: commentComment.value,
    })
  );
};

const updateButton = document.getElementById("edit-form-button");
updateButton.addEventListener("click", (e) => {
  e.preventDefault();
  updateComment(id);
});

const buttonLogout = document.getElementById("btn-logout");
buttonLogout.addEventListener("click", () => {
  window.location.href = "/user/logout";
});
