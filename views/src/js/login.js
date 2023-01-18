let loginMsg = document.getElementById("login-msg-container");

const login = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const user = { email, password };

  fetch("/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        window.location.href = "/admin";
      } else {
        loginMsg.innerHTML = `
          <label id="login-msg" class="error-msg">${data.message}</label>
        `;
      }
    });
};

document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  login();
});
