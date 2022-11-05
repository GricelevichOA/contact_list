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
const contactIdInput = document.querySelector("#form-contact-id");

// groups form variables
const openGroupsFormBtn = document.querySelector("#groups-form-open");
const closeGroupsFormBtn = document.querySelector("#groups-form-close");
const groupsForm = document.querySelector("#groups-form");

// functions
const openForm = (formElem) => {
  overlay.classList.remove("overlay_hidden");
  formElem.classList.remove("form_hidden");
};

const closeForm = (formElem) => {
  formElem.classList.add("form_hidden");
  overlay.classList.add("overlay_hidden");
};

const clearContactForm = () => {
  contactNameInput.value = "";
  contactPhoneInput.value = "";
  contactIdInput.value = "";
  contactGroupInput.selectedIndex = 0;
};

const saveContact = (contact) => {
  const newContact = {
    id: +contactIdInput.value,
    name: contactNameInput.value,
    phone: contactPhoneInput.value,
    group: contactGroupInput.value,
  };

  if (!newContact.id) {
    newContact.id = Date.now();
    contacts.push(newContact);
  } else {
    const contactIndex = contacts.findIndex((c) => c.id === newContact.id);
    if (contactIndex !== -1) {
      contacts[contactIndex].name = newContact.name;
      contacts[contactIndex].phone = newContact.phone;
      contacts[contactIndex].group = newContact.group;
    }
  }

  clearContactForm();

  renderContacts(groups, contacts);
};

const editContactHandler = (contactId) => {
  const contactToEdit = contacts.find((c) => c.id === contactId);

  openForm(contactForm);

  contactNameInput.value = contactToEdit.name;
  contactPhoneInput.value = contactToEdit.phone;
  contactIdInput.value = contactToEdit.id;
  contactGroupInput.value = contactToEdit.group;
};

const deleteContact = (contactId) => {
  const newContacts = contacts.filter((contact) => contact.id !== contactId);

  contacts = [...newContacts];
  renderContacts(groups, contacts);
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

const createGroupElement = (group) => {
  const groupElem = document.createElement("div");
  const groupElemTitle = document.createElement("div");
  const groupElemContent = document.createElement("div");

  groupElem.classList.add("group");

  groupElemTitle.classList.add("group__title", "group__title_active");
  groupElemTitle.innerText = group;
  groupElem.append(groupElemTitle);

  groupElemContent.classList.add("group__items", "group__items_active");
  groupElem.append(groupElemContent);

  return groupElem;
};

const renderContacts = (groupsArray, contactsArray) => {
  mainContainer.innerHTML = "";

  if (contactsArray.length > 0) {
    groupsArray.forEach((group) => {
      const groupContacts = contactsArray.filter(
        (contact) => contact.group === group
      );

      if (groupContacts.length === 0) {
        return;
      }

      const groupElem = createGroupElement(group);
      const groupElemContent = groupElem.querySelector(".group__items");

      groupContacts.forEach((gc) => {
        groupElemContent.append(createContactElement(gc));
      });

      mainContainer.append(groupElem);
    });
  } else {
    const placeholder = document.createElement("div");
    placeholder.classList.add("placeholder");
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
closeContactFormBtn.addEventListener("click", () => {
  clearContactForm();
  closeForm(contactForm);
});

// groups form
openGroupsFormBtn.addEventListener("click", () => openForm(groupsForm));
closeGroupsFormBtn.addEventListener("click", () => closeForm(groupsForm));

renderContacts(groups, contacts);
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
    editContactHandler(+e.target.parentElement.getAttribute("data-contact-id"));
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
  closeForm(contactForm);
});
