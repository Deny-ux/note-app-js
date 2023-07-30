// imports
import { getCountByCategory, getElementBySelector } from "./utils/util.js";
import { renderPage, showModal, hideModals } from "./render.js";
import {
  createAndAddNote,
  clearFormFields,
  openEditModal,
} from "./manageContent.js";
import data from "./data.js";

// DOM Elements
let createNoteBtn;
let showSwitchBtn;
let tasksContainer;
let summaryContainer;
let modalBlock;
let modalCreate;
let modalEdit;
let modalCreateForm;
let modalEditForm;
let closeModalBtns;
try {
  createNoteBtn = getElementBySelector("#createBtn");
  showSwitchBtn = getElementBySelector(".show-switch");
  tasksContainer = getElementBySelector(".tasks-container");
  summaryContainer = getElementBySelector(".summary-container");
  modalBlock = getElementBySelector(".modal-block");
  modalCreate = getElementBySelector(".create-modal");
  modalEdit = getElementBySelector(".edit-modal");
  modalCreateForm = getElementBySelector(".create-modal form");
  modalEditForm = getElementBySelector(".edit-modal-form");
  closeModalBtns = modalBlock.querySelectorAll(".close-btn");
} catch (error) {
  alert(`Oooops, there was an error! ${error}`);
}

// Global data
let notes = data.data;
let icons = data.icons;
let archived = false;
let changeNoteId = null;
loadPage();

function loadPage() {
  renderPage(
    notes,
    tasksContainer,
    getCountByCategory(notes),
    summaryContainer,
    icons,
    archived
  );

  const taskRowArray = tasksContainer.querySelectorAll(".single-task");
  console.log(taskRowArray);
  taskRowArray.forEach((taskRow) => {
    const archiveBtn = taskRow.querySelector(".archive-single-task-btn");
    const deleteBtn = taskRow.querySelector(".delete-single-task-btn");
    const editBtn = taskRow.querySelector(".edit-single-task-btn");
    console.log(editBtn);
    const currId = Number(taskRow.dataset.id);
    archiveBtn.addEventListener("click", (e) => {
      const findNote = notes.find((note) => note.id === currId);
      findNote.isArchived = !findNote.isArchived;
      notes = notes.filter((note) => note.id !== currId);
      notes.push(findNote);
      loadPage();
    });
    deleteBtn.addEventListener("click", (e) => {
      const singleTaskDOM = e.target.parentElement.parentElement;
      notes = notes.filter((note) => note.id !== currId);
      console.log(notes);
      loadPage();
    });
    editBtn.addEventListener("click", (e) => {
      showModal(modalEdit);
      changeNoteId = currId;
      openEditModal(notes, currId, modalEditForm);
    });
  });
}

// Event Listeners

modalEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = modalEditForm.querySelector('input[name="name"]');
  const contentInput = modalEditForm.querySelector('textarea[name="content"]');
  const categorySelect = modalEditForm.querySelector('select[name="category"]');
  const statusRadio = document.getElementsByName("status");
  const archiveRadio = statusRadio.item(0);
  const activeRadio = statusRadio.item(1);

  notes = notes.map((note) => {
    if (note.id === changeNoteId) {
      return {
        ...note,
        name: nameInput.value,
        category: categorySelect.value,
        content: contentInput.value,
        isArchived: archiveRadio.checked,
      };
    }
    return note;
  });
  console.log(notes);
  hideModals();
  loadPage();
});

showSwitchBtn.addEventListener("click", () => {
  archived = !archived;
  archived
    ? (showSwitchBtn.textContent = "Show active notes")
    : (showSwitchBtn.textContent = "Show archived notes");
  loadPage();
});

createNoteBtn.addEventListener("click", () => {
  showModal(modalCreate);
});

closeModalBtns.forEach((closeModalBtn) => {
  closeModalBtn.addEventListener("click", () => {
    hideModals();
    clearFormFields(closeModalBtn.nextSibling.nextSibling);
  });
});

modalCreateForm.addEventListener("submit", (e) => {
  formCreateSubmitHandle(e);
  console.log("submit form create");
});

function formCreateSubmitHandle(e) {
  e.preventDefault();

  console.log(notes);
  const formData = new FormData(e.currentTarget);
  clearFormFields(e.currentTarget);
  console.log(formData);
  const name = formData.get("name");
  const content = formData.get("content");
  const category = formData.get("category");

  createAndAddNote(name, category, content, notes);

  hideModals();
  console.log(notes);
  loadPage();
}
