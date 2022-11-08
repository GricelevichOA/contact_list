// начальные данные
let groups = ["Друзья", "Коллеги", "Соседи", "Враги"];
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

// инпуты для формы контакта
const contactNameInput = document.querySelector("#form-contact-name");
const contactPhoneInput = document.querySelector("#form-contact-number");
const contactGroupInput = document.querySelector("#form-contact-group");
const contactIdInput = document.querySelector("#form-contact-id");

// groups form variables
const openGroupsFormBtn = document.querySelector("#groups-form-open");
const closeGroupsFormBtn = document.querySelector("#groups-form-close");
const groupsForm = document.querySelector("#groups-form");

const addGroupInputBtn = document.querySelector("#add-group-input");

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
  contactGroupInput.selectedIndex = 0;
  contactIdInput.value = "";
};

const saveContact = (contact) => {
  // создаётся новый объект контакт
  const newContact = {
    id: +contactIdInput.value,
    name: contactNameInput.value,
    phone: contactPhoneInput.value,
    group: contactGroupInput.value,
  };

  // если id пустой, то он генерируется и контакт добавляется в масив
  // если нет - ищется контакт с таким id и изменяется
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

  // ререндер контактов
  renderContacts(groups, contacts);
};

// передаёт данные контакта в форму ждля редактирования
const editContactHandler = (contactId) => {
  const contactToEdit = contacts.find((c) => c.id === +contactId);

  openForm(contactForm);

  contactNameInput.value = contactToEdit.name;
  contactPhoneInput.value = contactToEdit.phone;
  contactIdInput.value = contactToEdit.id;
  contactGroupInput.value = contactToEdit.group;
};

const deleteContact = (contactId) => {
  const newContacts = contacts.filter((contact) => contact.id !== +contactId);

  contacts = [...newContacts];
  renderContacts(groups, contacts);
};

const createContactElement = (contactData) => {
  const contactElem = document.createElement("div");
  const contactNameElem = document.createElement("div");
  const contactPhoneElem = document.createElement("div");
  const contactEditBtnElem = document.createElement("button");
  const contactDeleteBtnElem = document.createElement("button");

  contactElem.classList.add("group__item", "item");
  contactNameElem.classList.add("item__name");
  contactPhoneElem.classList.add("item__phone");
  contactEditBtnElem.classList.add(
    "item__button",
    "square-button",
    "square-button_edit"
  );
  contactDeleteBtnElem.classList.add(
    "item__button",
    "square-button",
    "square-button_delete"
  );

  contactNameElem.innerText = contactData.name;
  contactPhoneElem.innerText = contactData.phone;

  contactElem.setAttribute("data-contact-id", contactData.id);
  contactElem.append(
    contactNameElem,
    contactPhoneElem,
    contactEditBtnElem,
    contactDeleteBtnElem
  );

  return contactElem;
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

const createGroupInput = (group) => {
  const formItem = document.createElement("div");
  const formInput = document.createElement("input");
  const formDelete = document.createElement("button");

  formItem.classList.add("form__item");

  formInput.classList.add("form__input");
  formInput.type = "text";
  formInput.value = group;
  // formInput.disabled = true;
  formInput.placeholder = "Введите название";

  formDelete.classList.add(
    "form__button",
    "square-button",
    "square-button_delete"
  );
  formDelete.type = "button";

  formItem.append(formInput, formDelete);

  return formItem;
};

const renderGroupsInForm = (groups) => {
  const formBody = groupsForm.querySelector(".form__body");
  formBody.innerHTML = "";
  groups.forEach((group) => {
    const input = createGroupInput(group);
    input.firstChild.disabled = true;
    formBody.append(input);
  });
};

const addGroupInput = () => {
  const formBody = groupsForm.querySelector(".form__body");
  formBody.append(createGroupInput(""));
};

const saveGroups = () => {
  const groupInputs = groupsForm.querySelectorAll("input");
  const newGroups = [];

  groupInputs.forEach((input) => {
    if (input.value !== "") {
      newGroups.push(input.value);
    }
  });

  groups = [...newGroups];
  setGroupInput(groups);
};

// удаляет группу и все связанные с ней контакты
const deleteGroup = (group) => {
  if (
    !confirm(
      `Вы действительно хотите удалить группу "${group}" и связанные с ней контакты?`
    )
  ) {
    return;
  } else {
    const newGroups = groups.filter((gr) => gr !== group);
    const newContacts = contacts.filter((c) => c.group !== group);

    groups = [...newGroups];
    contacts = [...newContacts];

    console.log(`Группа ${group} и все связанные с ней контакт удалены`);
    renderGroupsInForm(groups);
    renderContacts(groups, contacts);
  }
};

// function calls
renderContacts(groups, contacts);

// event listeners

// contact form
// открытие/закрытие формы для контакта
openContactFormBtn.addEventListener("click", () => {
  openForm(contactForm);
  setGroupInput(groups);
});
closeContactFormBtn.addEventListener("click", () => {
  clearContactForm();
  closeForm(contactForm);
});

// открытие/закрытие формы для групп
openGroupsFormBtn.addEventListener("click", () => {
  openForm(groupsForm);
  renderGroupsInForm(groups);
});
closeGroupsFormBtn.addEventListener("click", () => closeForm(groupsForm));

// открывает/закрывает группы контактов
mainContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("group__title")) {
    e.target.classList.toggle("group__title_active");
    e.target.nextSibling.classList.toggle("group__items_active");
  }
});

// добавление контакта
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  saveContact();
  closeForm(contactForm);
});

// редактирование контакта
mainContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("square-button_edit")) {
    editContactHandler(e.target.parentElement.getAttribute("data-contact-id"));
  }
});

// удаление контакта
mainContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("square-button_delete")) {
    if (confirm("Вы действительно хотите удалить контакт?")) {
      deleteContact(e.target.parentElement.getAttribute("data-contact-id"));
    }
  }
});

// добавить инпут в окно групп
addGroupInputBtn.addEventListener("click", addGroupInput);

groupsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  saveGroups(groups);
  renderGroupsInForm(groups);
});

groupsForm.addEventListener("click", (e) => {
  if (e.target.classList.contains("square-button_delete")) {
    deleteGroup(e.target.previousSibling.value);
  }
});
