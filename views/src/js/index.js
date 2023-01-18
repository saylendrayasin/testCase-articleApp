const getComments = () => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const responseJSON = JSON.parse(this.responseText);
      renderComments(responseJSON);
    }
  };
  xhr.open("GET", "/comments");
  xhr.send();
};

getComments();

const renderComments = (comments) => {
  const countComments = document.querySelector("#counts-container");
  countComments.innerHTML = `
    <h2 class="comments-title">Comments (${comments.length})</h2>
    <div id="comments-container"></div>
  `;

  const commentsContainer = document.querySelector("#comments-container");
  commentsContainer.innerHTML = "";

  const toString = (date) => {
    const dateObj = new Date(date);
    const dateStr = dateObj.toString();
    const dateArr = dateStr.split(" ");
    const dateStr2 = `${dateArr[0]}, ${dateArr[2]} ${dateArr[1]} ${dateArr[3]}`;
    return dateStr2;
  };

  if (comments.length === 0) {
    commentsContainer.innerHTML = `
      <div class="comments-content" style="background-color : red; opacity : 70%">
        <p class="comment-alert" style="color : white; opacity : 100%">No comments yet. Be the first to comment!</p>
      </div>
    `;
  }

  comments.forEach((comment) => {
    commentsContainer.innerHTML += `
        <div class="comments-content">
            <div class="comment-header">
              <h2 class="comment-name">${comment.name}</h2>
              <h4 class="comment-time">${toString(comment.createdAt)}</h4>
            </div>
            <p class="comment-txt">${comment.comment}</p>
          </div>
    `;
  });
};

const insertComments = (comment) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const responseJSON = JSON.parse(this.responseText);
      console.log(responseJSON);
    }
  };
  xhr.open("POST", "/comments");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(comment));
};

const captchaInput = document.getElementById("captcha-input");
const inputName = document.getElementById("input-name");
const inputComment = document.getElementById("input-comment");
let captchaMessage = document.getElementById("captcha-msg");

const buttonAdd = document.getElementById("btn-add");

const addData = () => {
  const comment = {
    name: inputName.value,
    comment: inputComment.value,
  };
  inputName.value = "";
  inputComment.value = "";
  captchaInput.value = "";

  insertComments(comment);
  getComments();
  captchaMessage.innerText = "";
};

const captchaNumberOne = document.getElementById("captcha1");
const captchaNumberTwo = document.getElementById("captcha2");

captchaNumberOne.innerText = Math.floor(Math.random() * 10);
captchaNumberTwo.innerText = Math.floor(Math.random() * 10);

let numberOne = captchaNumberOne.innerHTML;
let numberTwo = captchaNumberTwo.innerHTML;

const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (captchaInput.value == parseInt(numberOne) + parseInt(numberTwo)) {
    captchaNumberOne.innerText = Math.floor(Math.random() * 10);
    captchaNumberTwo.innerText = Math.floor(Math.random() * 10);

    numberOne = captchaNumberOne.innerHTML;
    numberTwo = captchaNumberTwo.innerHTML;

    addData();
  } else {
    captchaNumberOne.innerText = Math.floor(Math.random() * 10);
    captchaNumberTwo.innerText = Math.floor(Math.random() * 10);

    numberOne = captchaNumberOne.innerHTML;
    numberTwo = captchaNumberTwo.innerHTML;

    captchaMessage.innerText = "Captcha is wrong!";
  }
});
