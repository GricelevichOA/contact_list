const overlay = document.querySelector(".overlay");

// contact form variables
const openContactFormBtn = document.querySelector("#contact-form-open");
const closeContactFormBtn = document.querySelector("#contact-form-close");
const formContact = document.querySelector(".contact-form");

// groups form variables
const openGroupsFormBtn = document.querySelector("#groups-form-open");
const closeGroupsFormBtn = document.querySelector("#groups-form-close");
const formGroups = document.querySelector(".groups-form");

// group variables
const groupTitleElems = document.querySelectorAll(".group__title");
const groupItemsElems = document.querySelectorAll(".group__items");

// functions
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

// main page groups functions
const toggleGroup = (i) => {
  groupItemsElems[i].classList.toggle("group__items_active");
  groupTitleElems[i].classList.toggle("group__title_active");
};

// event listeners
// contact form
openContactFormBtn.addEventListener("click", openContactForm);
closeContactFormBtn.addEventListener("click", closeContactForm);

// groups form
openGroupsFormBtn.addEventListener("click", openGroupsForm);
closeGroupsFormBtn.addEventListener("click", closeGroupsForm);

for (let i = 0; i < groupTitleElems.length; i++) {
  groupTitleElems[i].addEventListener("click", () => {
    toggleGroup(i);
  });
}
