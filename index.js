const overlay = document.querySelector(".overlay");

// contact form variables
const openContactFormBtn = document.querySelector("#contact-form-open");
const closeContactFormBtn = document.querySelector("#contact-form-close");
const formContact = document.querySelector(".contact-form");

// groups form variables
const openGroupsFormBtn = document.querySelector("#groups-form-open");
const closeGroupsFormBtn = document.querySelector("#groups-form-close");
const formGroups = document.querySelector(".groups-form");

// contact form functions
const openContactForm = () => {
  overlay.classList.add("overlay__visible");
  formContact.classList.remove("form_hidden");
};

const closeContactForm = () => {
  formContact.classList.add("form_hidden");
  overlay.classList.remove("overlay__visible");
};

// groups form functions
const openGroupsForm = () => {
  overlay.classList.add("overlay__visible");
  formGroups.classList.remove("form_hidden");
};

const closeGroupsForm = () => {
  formGroups.classList.add("form_hidden");
  overlay.classList.remove("overlay__visible");
};

// event listeners
// contact form
openContactFormBtn.addEventListener("click", openContactForm);
closeContactFormBtn.addEventListener("click", closeContactForm);

// groups form
openGroupsFormBtn.addEventListener("click", openGroupsForm);
closeGroupsFormBtn.addEventListener("click", closeGroupsForm);
