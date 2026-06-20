const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const formMessage = document.getElementById("formMessage");

function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

function showMessage(message, isSuccess = false) {
  formMessage.textContent = message;
  formMessage.classList.toggle("success", isSuccess);
}

if (registerForm) {
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim().toLowerCase();
    const password = document.getElementById("registerPassword").value;
    const confirmation = document.getElementById("confirmPassword").value;
    const users = getUsers();

    if (password !== confirmation) {
      showMessage("Passwords do not match.");
      return;
    }

    if (users.some((user) => user.email === email)) {
      showMessage("An account with this email already exists.");
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify({ name, email }));
    showMessage("Account created! Taking you to the store...", true);

    setTimeout(() => {
      window.location.href = "index.html";
    }, 700);
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;
    const user = getUsers().find(
      (savedUser) => savedUser.email === email && savedUser.password === password
    );

    if (!user) {
      showMessage("Incorrect email or password.");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify({
      name: user.name,
      email: user.email,
    }));
    showMessage("Login successful! Taking you to the store...", true);

    setTimeout(() => {
      window.location.href = "index.html";
    }, 700);
  });
}
