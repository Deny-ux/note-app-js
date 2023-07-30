// imports
import { getCountByCategory, getElementBySelector } from "./utils/util.js";
import { renderNotes, renderPage, showModal, hideModals } from "./render.js";
import { extractDates } from "./utils/Dates.js";
import {
  createAndAddNote,
  clearFormFields,
  openEditModal,
} from "./manageContent.js";
import data from "./data.js";
import { singleTask } from "./components/singleTask.js";

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
function switchArchiveItem(id) {
  notes = notes.map((note) => {
    if (note.id === id) {
      return { ...note, isArchived: !note.isArchived };
    }
    return note;
  });
}

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

// function addListenersToTasks(notes) {
//   notes = notes.map((note) => {
//     const singleTaskDOM = document.querySelector(`[data-id='${note.id}']`);

//     // if note is not shown in page
//     if (!singleTaskDOM) {
//       return;
//     }
//     if (singleTaskDOM.hasAttribute("data-listener-on")) {
//       console.log(`added listener already to ${note.id}`);
//     } else {
//       const editBtn = singleTaskDOM.querySelector(".edit-single-task-btn");
//       const archiveBtn = singleTaskDOM.querySelector(
//         ".archive-single-task-btn"
//       );
//       const deleteBtn = singleTaskDOM.querySelector(".edit-single-task-btn");

//       editBtn.addEventListener("click", () => {
//         console.log("clicked to edit" + note.id);
//       });
//       archiveBtn.addEventListener("click", () => {
//         console.log(note.isArchived);
//         note.isArchived = !note.isArchived;
//         console.log("clicked to archive" + note.id);
//         r();
//       });
//       deleteBtn.addEventListener("click", () => {
//         console.log("clicked to delete" + note.id);
//       });
//       singleTaskDOM.setAttribute("data-listener-on", "true");
//     }
//     // console.log(singleTaskDOM);
//     return note;
//   });
// }

// Event Listeners

showSwitchBtn.addEventListener("click", () => {
  archived = !archived;
  archived
    ? (showSwitchBtn.textContent = "Show active notes")
    : (showSwitchBtn.textContent = "Show archived notes");
  // renderNotes(notes, tasksContainer, icons, archived);
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
  // const nameInput = e.currentTarget.querySelector('[name="name"]');
  // const contentInput = e.currentTarget.querySelector('[name="content"]');
  // const categorySelect = e.currentTarget.querySelector('[name="category"]');
  // nameInput.value = contentInput.value = "";
  // categorySelect.value = "Task";
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

// modalBlock.addEventListener("click", (e) => {
//   const closeModalBtn = modalBlock.querySelector(".close-btn");

//   // clicking on close button
//   if (e.target === closeModalBtn) {
//     modalBlock.classList.remove("show-modal-block");
//     formEventListenerAttached = false;
//     modalForm.removeEventListener("submit", formSubmitHandle, true);
//     return;
//   }
//   // adding only one eventlistener to form
//   if (!formEventListenerAttached) {
//     modalForm.addEventListener("submit", formSubmitHandle, true);
//     formEventListenerAttached = true;
//   }
// });
