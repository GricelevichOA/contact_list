// data
const groups = ["Друзья", "Коллеги", "Соседи"];
// const groups = [];

let contacts = [
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
const contactPhoneInput = document.querySelector("#form-contact-number");
const contactGroupInput = document.querySelector("#form-contact-group");

// groups form variables
const openGroupsFormBtn = document.querySelector("#groups-form-open");
const closeGroupsFormBtn = document.querySelector("#groups-form-close");
const formGroups = document.querySelector(".groups-form");

// functions
// contact form functions
const openContactForm = () => {
  overlay.classList.remove("overlay_hidden");

  formContactElem.classList.remove("form_hidden");
};

const closeContactForm = () => {
  formContactElem.classList.add("form_hidden");
  overlay.classList.add("overlay_hidden");
};

const saveContact = () => {
  const newContact = {
    id: Date.now(),
    name: contactNameInput.value,
    phone: contactPhoneInput.value,
    group: contactGroupInput.value,
  };

  contacts.push(newContact);

  contactNameInput.value = "";
  contactPhoneInput.value = "";
  contactGroupInput.selectedIndex = 0;

  renderContacts();
};

const deleteContact = (contactId) => {
  const contactToDelete = contacts.find((contact) => contact.id === contactId);

  const newContacts = contacts.filter((contact) => contact.id !== contactId);

  contacts = [...newContacts];
  renderContacts();
};

// groups form functions
const openGroupsForm = () => {
  overlay.classList.remove("overlay_hidden");
  formGroups.classList.remove("form_hidden");
};

const closeGroupsForm = () => {
  formGroups.classList.add("form_hidden");
  overlay.classList.add("overlay_hidden");
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
        groupItemElem.setAttribute("data-contact-id", gc.id);
        groupItemElem.innerHTML = `
          <div class="item__name">${gc.name}</div>
          <div class="item__phone">${gc.phone}</div>
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

mainContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("group__title")) {
    e.target.classList.toggle("group__title_active");
    e.target.nextSibling.classList.toggle("group__items_active");
  }
});

// delete contact
mainContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("square-button_delete")) {
    if (confirm("Вы действительно хотите удалить контакт?")) {
      deleteContact(+e.target.parentElement.getAttribute("data-contact-id"));
    }
  }
});

// add contact form
addContactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  saveContact();
  closeContactForm();
});
