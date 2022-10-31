const overlay = document.querySelector(".overlay");

const formCloseBtn = document.querySelector(".form__close");
const formOpenBtn = document.querySelector("#add_contact");
const formContact = document.querySelector(".form__contact");

const openForm = () => {
  overlay.classList.add("overlay__visible");
  formContact.classList.add("form__contact_visible");
};

const closeForm = () => {
  formContact.classList.remove("form__contact_visible");
  overlay.classList.remove("overlay__visible");
};

formOpenBtn.addEventListener("click", openForm);
formCloseBtn.addEventListener("click", closeForm);
