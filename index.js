// data
const groups = ["Друзья", "Коллеги", "Соседи"];
// const groups = [];

const contacts = [
  {
    id: 1,
    name: "Иванов Иван Иванович",
    phone: " +1 234 567 89 10",
    group: "Друзья",
  },

  {
    id: 2,
    name: "Петров Пётр Петрович",
    phone: "+1 234 567 89 10",
    group: "Друзья",
  },

  {
    id: 3,
    name: "Алексеенко Алексей Алексеевич",
    phone: "+1 234 567 89 10",
    group: "Коллеги",
  },
];

// overlay
const overlay = document.querySelector(".overlay");

// main variables
const mainContainer = document.querySelector("#main-container");

// contact form variables
const openContactFormBtn = document.querySelector("#contact-form-open");
const closeContactFormBtn = document.querySelector("#contact-form-close");
const formContactElem = document.querySelector(".contact-form");
const addContactForm = document.querySelector("#add-contact-form");

const contactNameInput = document.querySelector("#form-contact-name");
const contactNumberInput = document.querySelector("#form-contact-number");
const contactGroupInput = document.querySelector("#form-contact-group");

// groups form variables
const openGroupsFormBtn = document.querySelector("#groups-form-open");
const closeGroupsFormBtn = document.querySelector("#groups-form-close");
const formGroups = document.querySelector(".groups-form");

// functions
// contact form functions
const openContactForm = () => {
  overlay.classList.add("overlay__visible");
  formContactElem.classList.remove("form_hidden");
};

const closeContactForm = () => {
  formContactElem.classList.add("form_hidden");
  overlay.classList.remove("overlay__visible");
};

const saveContact = () => {
  const newContact = {
    id: Date.now(),
    name: contactNameInput.value,
    number: contactNumberInput.value,
    group: contactGroupInput.value,
  };

  contacts.push(newContact);

  contactNameInput.value = "";
  contactNumberInput.value = "";
  contactGroupInput.selectedIndex = 0;

  renderContacts();
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

// render contacts
const renderContacts = () => {
  mainContainer.innerHTML = "";

  if (groups.length > 0) {
    groups.forEach((group) => {
      const groupContacts = contacts.filter(
        (contact) => contact.group === group
      );

      if (groupContacts.length === 0) {
        return;
      }

      const groupElem = document.createElement("div");
      const groupElemTitle = document.createElement("div");
      const groupElemContent = document.createElement("div");

      groupElemTitle.classList.add("group__title");
      groupElemTitle.innerText = group;

      groupElemContent.classList.add("group__items");

      groupElem.append(groupElemTitle);
      groupElem.append(groupElemContent);

      groupElem.classList.add("group");
      mainContainer.append(groupElem);

      groupContacts.forEach((gc) => {
        const groupItemElem = document.createElement("div");
        groupItemElem.classList.add("group__item", "item");
        groupItemElem.innerHTML = `
          <div class="item__name">${gc.name}</div>
          <div class="item__number">${gc.phone}</div>
          <button
            class="item__button square-button square-button_edit"></button>
          <button
            class="item__button square-button square-button_delete"></button>
        `;

        groupElemContent.append(groupItemElem);
      });
    });
  } else {
    const placeholder = document.createElement("div");
    placeholder.innerText = "Список контактов пуст";
    mainContainer.append(placeholder);
  }
};

// event listeners
// contact form
openContactFormBtn.addEventListener("click", openContactForm);
closeContactFormBtn.addEventListener("click", closeContactForm);

// groups form
openGroupsFormBtn.addEventListener("click", openGroupsForm);
closeGroupsFormBtn.addEventListener("click", closeGroupsForm);

// group variables

renderContacts();
const groupTitleElems = document.querySelectorAll(".group__title");
const groupItemsElems = document.querySelectorAll(".group__items");

mainContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("group__title")) {
    e.target.classList.toggle("group__title_active");
    e.target.nextSibling.classList.toggle("group__items_active");
  }
});

// add contact form
addContactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  saveContact();
  closeContactForm();
});
