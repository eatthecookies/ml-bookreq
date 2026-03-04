document.addEventListener("formValid", function (event) {
  const data = event.detail;

  console.clear();

  console.log("ФИО:", data.fullname);
  console.log("Телефон:", data.phone);
  console.log("Email:", data.email);
  console.log("Сообщение:", data.message || "(не заполнено)");

  console.log("Время:", new Date().toLocaleString());
});
