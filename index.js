// // начальные данные
document.addEventListener("DOMContentLoaded", () => {
  let groups = getGroupsFromLocalStorage();
  let contacts = getContactsFromLocalStorage();

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

  // notifications
  const notificationsBox = document.querySelector("#notifications");

  // functions
  // localStorage
  function getContactsFromLocalStorage() {
    const storageContacts = localStorage.getItem("contacts");

    if (storageContacts) {
      return JSON.parse(storageContacts);
    } else {
      return [];
    }
  }

  function addContactsToLocalStorage(contacts) {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }

  function getGroupsFromLocalStorage() {
    const storageGroups = localStorage.getItem("groups");

    if (storageGroups) {
      const gr = JSON.parse(storageGroups);
      // если в localstorage пустой масив групп, добавляет эти два по дефолту
      if (gr.length === 0) {
        return ["Друзья", "Коллеги"];
      } else {
        return gr;
      }
    } else {
      return ["Друзья", "Коллеги"];
    }
  }

  function addGroupsToLocalStorage(groups) {
    localStorage.setItem("groups", JSON.stringify(groups));
  }

  // form
  function openForm(formElem) {
    overlay.classList.remove("overlay_hidden");
    formElem.classList.remove("form_hidden");
  }

  function closeForm(formElem) {
    formElem.classList.add("form_hidden");
    overlay.classList.add("overlay_hidden");
  }

  function clearContactForm() {
    contactNameInput.value = "";
    contactPhoneInput.value = "";
    contactGroupInput.selectedIndex = 0;
    contactIdInput.value = "";
  }

  function saveContact(contact) {
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
    createNotification("Контакт сохранён");

    clearContactForm();

    addContactsToLocalStorage(contacts);
    // ререндер контактов
    renderContacts(groups, contacts);
  }

  // передаёт данные контакта в форму ждля редактирования
  function editContactHandler(contactId) {
    const contactToEdit = contacts.find((c) => c.id === +contactId);

    openForm(contactForm);

    contactNameInput.value = contactToEdit.name;
    contactPhoneInput.value = contactToEdit.phone;
    contactIdInput.value = contactToEdit.id;
    contactGroupInput.value = contactToEdit.group;
  }

  function deleteContact(contactId) {
    const newContacts = contacts.filter((contact) => contact.id !== +contactId);

    contacts = [...newContacts];
    addContactsToLocalStorage(contacts);
    renderContacts(groups, contacts);
  }

  // создаёт элемент группы для основного блока
  function createGroupElement(group) {
    const groupElem = document.createElement("div");
    const groupElemTitle = document.createElement("div");
    const groupElemContent = document.createElement("div");

    groupElem.classList.add("group");

    groupElemTitle.classList.add("group__title", "group__title_active");
    groupElemTitle.innerText = group;
    groupElem.append(groupElemTitle);

    groupElemContent.classList.add("group__items");
    groupElem.append(groupElemContent);

    return groupElem;
  }

  // создаёт элемент с контактом для группы
  function createContactElement(contactData) {
    const contactElem = document.createElement("div");

    const contactInfoElem = document.createElement("div");
    const contactNameElem = document.createElement("div");
    const contactPhoneElem = document.createElement("div");

    const contactActionsElem = document.createElement("div");
    const contactEditBtnElem = document.createElement("button");
    const contactDeleteBtnElem = document.createElement("button");

    contactElem.classList.add("group__item", "item");

    contactInfoElem.classList.add("item__info");
    contactNameElem.classList.add("item__name");
    contactPhoneElem.classList.add("item__phone");

    contactActionsElem.classList.add("item__actions");
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

    contactEditBtnElem.setAttribute("data-contact-id", contactData.id);
    contactDeleteBtnElem.setAttribute("data-contact-id", contactData.id);

    contactNameElem.innerText = contactData.name;
    contactPhoneElem.innerText = contactData.phone;

    contactInfoElem.append(contactNameElem, contactPhoneElem);
    contactActionsElem.append(contactEditBtnElem, contactDeleteBtnElem);

    contactElem.append(contactInfoElem, contactActionsElem);

    return contactElem;
  }

  // рендерит контакты в основном блоке
  function renderContacts(groupsArray, contactsArray) {
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
  }

  // добавляет группы в селект групп в форме создания пользователя
  function setGroupInput(groups) {
    contactGroupInput.innerHTML = `
    <option value="" disabled selected hidden>Выберите группу</option>
  `;

    groups.forEach((group) => {
      const option = document.createElement("option");
      option.value = group;
      option.innerText = group;

      contactGroupInput.append(option);
    });
  }

  // создаёт элемент инпута для группы
  function createGroupInput(group) {
    const formItem = document.createElement("div");
    const formInput = document.createElement("input");
    const formDelete = document.createElement("button");

    formItem.classList.add("form__item");

    formInput.classList.add("form__input");
    formInput.type = "text";
    formInput.value = group;
    formInput.placeholder = "Введите название";

    formDelete.classList.add(
      "form__button",
      "square-button",
      "square-button_delete"
    );

    formDelete.type = "button";

    formItem.append(formInput, formDelete);

    return formItem;
  }

  // рендерит группы в форме групп
  function renderGroupsInForm(groups) {
    const formBody = groupsForm.querySelector(".form__body");

    formBody.innerHTML = "";

    groups.forEach((group) => {
      const input = createGroupInput(group);
      input.querySelector("input").disabled = true;
      const delBtn = input.querySelector("button");
      delBtn.addEventListener("click", (e) => {
        deleteGroup(e.target.previousSibling.value);
      });
      formBody.append(input);
    });
  }

  // добавляет новый инпут в форму групп
  function addGroupInput() {
    const formBody = groupsForm.querySelector(".form__body");
    const input = createGroupInput("");
    const delBtn = input.querySelector("button");

    delBtn.addEventListener("click", () => {
      input.remove();
    });

    formBody.append(input);
  }

  // сохраняет группы в масив групп
  function saveGroups() {
    const groupInputs = groupsForm.querySelectorAll("input");
    const newGroups = [];

    groupInputs.forEach((input) => {
      if (input.value !== "") {
        newGroups.push(input.value);
      }
    });

    groups = [...newGroups];
    setGroupInput(groups);
    addGroupsToLocalStorage(groups);
  }

  // удаляет группу и все связанные с ней контакты
  function deleteGroup(group) {
    if (groups.length === 1) {
      createNotification("Вы не можете удалить последнюю группу");
      return;
    }

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

      renderGroupsInForm(groups);
      addGroupsToLocalStorage(groups);
      addContactsToLocalStorage(contacts);
      renderContacts(groups, contacts);

      createNotification(
        `Группа ${group} и все связанные с ней контакты удалены`
      );
    }
  }

  // Маска для инпута телефона
  // принимает в инпут только цифры
  function getNumsFromInput(input) {
    return input.value.replace(/\D/g, "");
  }

  // форматирование вставки текста в инпут номера телефона
  function handlePasteInPhoneInput(e) {
    let pasted = e.clipboardData || window.clipboardData;
    let input = e.target;
    let inputValue = getNumsFromInput(input);

    if (pasted) {
      let pastedText = pasted.getData("Text");
      if (/\D/g.test(pastedText)) {
        input.value = inputValue;
      }
    }
  }

  // форматирование ввода номера телефона
  function formatTelInput(e) {
    let input = e.target;
    let inputValue = getNumsFromInput(input);
    let formattedValue = "";
    let selectionStart = input.selectionStart;

    if (!inputValue) {
      return (input.value = "");
    }

    if (input.value.length !== selectionStart) {
      if (e.data && /\D/g.test(e.data)) {
        input.value = inputValue;
      }
      return;
    }

    if (
      inputValue[0] === "7" ||
      inputValue[0] === "8" ||
      inputValue[0] === "9"
    ) {
      formattedValue = "+7";

      if (inputValue > 1) {
        formattedValue += ` (${inputValue.substring(1, 4)}`;
      }
      if (inputValue >= 5) {
        formattedValue += `) ${inputValue.substring(4, 7)}`;
      }
      if (inputValue >= 8) {
        formattedValue += `-${inputValue.substring(7, 9)}`;
      }
      if (inputValue >= 10) {
        formattedValue += `-${inputValue.substring(9, 11)}`;
      }
    } else {
      formattedValue = `+${inputValue}`;
    }

    input.value = formattedValue;
  }

  // notifications
  function createNotification(messageText) {
    const notification = document.createElement("div");
    const header = document.createElement("div");
    const close = document.createElement("button");
    const body = document.createElement("div");
    const text = document.createElement("span");

    notification.classList.add("notification", "notification_hidden");
    header.classList.add("notification__header");
    close.classList.add("form__close", "notification__close");
    body.classList.add("notification__body");
    text.classList.add("notification__text");

    close.addEventListener("click", () => {
      closeNotification(notification);
    });

    text.innerText = messageText;

    notification.append(header, body);
    header.append(close);
    body.append(text);

    notificationsBox.append(notification);

    setTimeout(() => {
      notification.classList.remove("notification_hidden");
    }, 300);

    setTimeout(() => {
      closeNotification(notification);
    }, 4000);
  }

  function closeNotification(note) {
    note.classList.add("notification_hidden");
    setTimeout(() => {
      note.remove();
    }, 300);
  }

  // function calls
  renderContacts(groups, contacts);
  setGroupInput(groups);

  // event listeners

  // contact form
  // открытие/закрытие формы для контакта
  openContactFormBtn.addEventListener("click", () => {
    openForm(contactForm);
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
      e.target.nextSibling.classList.toggle("group__items_hidden");
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
      editContactHandler(e.target.getAttribute("data-contact-id"));
    }
  });

  // удаление контакта
  mainContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("square-button_delete")) {
      if (confirm("Вы действительно хотите удалить контакт?")) {
        deleteContact(e.target.getAttribute("data-contact-id"));
        createNotification("Контакт удалён");
      }
    }
  });

  // добавить инпут в окно групп
  addGroupInputBtn.addEventListener("click", addGroupInput);

  groupsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    saveGroups(groups);
    renderGroupsInForm(groups);
    // closeForm(groupsForm);
    createNotification("Группы сохранены");
  });

  // форматирует инпут телефона по маске
  contactPhoneInput.addEventListener("input", formatTelInput);

  // форматирует вставку в инпут телефона
  contactPhoneInput.addEventListener("paste", handlePasteInPhoneInput);
});
