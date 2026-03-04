document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("feedbackForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    clearErrors();

    let isValid = true;

    const fullname = document.getElementById("fullname");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const agreement = document.getElementById("agreement");

    const fullnameValue = fullname.value.trim();
    const phoneValue = phone.value.trim();
    const emailValue = email.value.trim();

    // ФИО
    if (fullnameValue === "" || fullnameValue.split(" ").length < 2) {
      showError(fullname, "Введите минимум фамилию и имя");
      isValid = false;
    }

    // Телефон
    const digits = phoneValue.replace(/\D/g, "");
    if (digits.length < 10) {
      showError(phone, "Введите минимум 10 цифр телефона");
      isValid = false;
    }

    // Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {
      showError(email, "Введите корректный email");
      isValid = false;
    }

    // Согласие
    if (!agreement.checked) {
      alert("Необходимо согласие на обработку данных");
      isValid = false;
    }

    if (isValid) {
      const formData = {
        fullname: fullnameValue,
        phone: phoneValue,
        email: emailValue,
        message: message.value.trim(),
      };

      const event = new CustomEvent("formValid", {
        detail: formData,
      });

      document.dispatchEvent(event);

      alert("Форма отправлена!");
    }
  });
});

function showError(input, message) {
  input.classList.add("is-danger");

  const help = document.createElement("p");
  help.classList.add("help", "is-danger");
  help.textContent = message;

  input.parentNode.parentNode.appendChild(help);
}

function clearErrors() {
  document.querySelectorAll(".is-danger").forEach((el) => {
    el.classList.remove("is-danger");
  });

  document.querySelectorAll(".help.is-danger").forEach((el) => {
    el.remove();
  });
}
