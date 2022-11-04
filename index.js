// data
const groups = ["Друзья", "Коллеги", "Соседи", "Враги"];
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
const contactForm = document.querySelector("#contact-form");

const contactNameInput = document.querySelector("#form-contact-name");
const contactPhoneInput = document.querySelector("#form-contact-number");
const contactGroupInput = document.querySelector("#form-contact-group");

// groups form variables
const openGroupsFormBtn = document.querySelector("#groups-form-open");
const closeGroupsFormBtn = document.querySelector("#groups-form-close");
const groupsForm = document.querySelector(".groups-form");

// functions
const openForm = (formElem) => {
  overlay.classList.remove("overlay_hidden");
  formElem.classList.remove("form_hidden");
};

const closeForm = (formElem) => {
  formElem.classList.add("form_hidden");
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

const editContact = (contactId) => {
  const cont = contacts.find((c) => c.id === contactId);
  console.log("Contact to edit: ");
  console.log(cont);
};

const deleteContact = (contactId) => {
  const newContacts = contacts.filter((contact) => contact.id !== contactId);

  contacts = [...newContacts];
  renderContacts();
};

// render contacts
const createContactElement = (contactData) => {
  const groupItemElem = document.createElement("div");
  groupItemElem.classList.add("group__item", "item");
  groupItemElem.setAttribute("data-contact-id", contactData.id);
  groupItemElem.innerHTML = `
    <div class="item__name">${contactData.name}</div>
    <div class="item__phone">${contactData.phone}</div>
    <button
      class="item__button square-button square-button_edit"></button>
    <button
      class="item__button square-button square-button_delete"></button>
  `;

  return groupItemElem;
};

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

      groupElemTitle.classList.add("group__title", "group__title_active");
      groupElemTitle.innerText = group;

      groupElemContent.classList.add("group__items", "group__items_active");

      groupElem.append(groupElemTitle);
      groupElem.append(groupElemContent);

      groupElem.classList.add("group");
      mainContainer.append(groupElem);

      groupContacts.forEach((gc) => {
        groupElemContent.append(createContactElement(gc));
      });
    });
  } else {
    const placeholder = document.createElement("div");
    placeholder.innerText = "Список контактов пуст";
    mainContainer.append(placeholder);
  }
};

const setGroupInput = (groups) => {
  contactGroupInput.innerHTML = `
    <option value="" disabled selected hidden>Выберите группу</option>
  `;

  groups.forEach((group) => {
    const option = document.createElement("option");
    option.value = group;
    option.innerText = group;

    contactGroupInput.append(option);
  });
};

// event listeners
// contact form
openContactFormBtn.addEventListener("click", () => openForm(contactForm));
closeContactFormBtn.addEventListener("click", () => closeForm(contactForm));

// groups form
openGroupsFormBtn.addEventListener("click", () => openForm(groupsForm));
closeGroupsFormBtn.addEventListener("click", () => closeForm(groupsForm));

// group variables

renderContacts();
setGroupInput(groups);

mainContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("group__title")) {
    e.target.classList.toggle("group__title_active");
    e.target.nextSibling.classList.toggle("group__items_active");
  }
});

// edit contact
mainContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("square-button_edit")) {
    editContact(+e.target.parentElement.getAttribute("data-contact-id"));
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
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  saveContact();
  closeContactForm();
});
