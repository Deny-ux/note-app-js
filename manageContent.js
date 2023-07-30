import { renderNotes } from "./render.js";

export function createAndAddNote(name, category, content, notes) {
  /* 
    for bigger applications it is preferred to use another
    approach to create id, because this one although is simple, but does not guarantee to be always unique
  */
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();
  const createdAt = `${day}/${month + 1}/${year}`;
  const id = new Date().getTime();

  // add new note
  notes.push({
    createdAt,
    name,
    category,
    content,
    isArchived: false,
    id,
  });
}

export function clearFormFields(
  form,
  nameInput = form.querySelector('[name="name"]'),
  contentInput = form.querySelector('[name="content"]'),
  categorySelect = form.querySelector('[name="category"]')
) {
  nameInput.value = contentInput.value = "";
  categorySelect.value = "Task";
}

export function addEventListenerToSingleNote(
  taskNode,
  notes,
  tasksContainer,
  icons,
  archived
) {
  //   const archiveBtn = taskNode.querySelector(".archive-single-task-btn");
  //   const deleteBtn = taskNode.querySelector(".delete-single-task-btn");
  //   const currId = Number(taskNode.dataset.id);
  //   archiveBtn.addEventListener("click", (e) => {
  //     const findNote = notes.find((note) => note.id === currId);
  //     findNote.isArchived = !findNote.isArchived;
  //     notes = notes.filter((note) => note.id !== currId);
  //     notes.push(findNote);
  //     renderNotes(notes, tasksContainer, icons, archived);
  //   });
  //   renderNotes(notes, tasksContainer, icons, archived);
  // taskNode.addEventListener("click", (e) => {
  //   console.log(archiveBtn);
  //   archiveBtn.addEventListener
  //   const findNote = notes.find((note) => note.id === currId);
  //   findNote.isArchived = !findNote.isArchived;
  //   notes = notes.filter((note) => note.id !== currId);
  //   notes.push(findNote);
  //   renderNotes(notes, tasksContainer, icons, archived);
  // });
}

// export function addListenersToTasks(notes, r) {
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
//       const deleteBtn = singleTaskDOM.querySelector(".delete-single-task-btn");

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

export function openEditModal(notes, noteId, editForm) {
  const nameInput = editForm.querySelector('input[name="name"]');
  const contentInput = editForm.querySelector('textarea[name="content"]');
  const categorySelect = editForm.querySelector('select[name="category"]');
  const statusRadio = document.getElementsByName("status");
  const archiveRadio = statusRadio.item(0);
  const activeRadio = statusRadio.item(1);
  console.log(archiveRadio);
  console.log(activeRadio);
  const foundNote = notes.find((note) => note.id === noteId);
  console.log(foundNote);
  nameInput.value = foundNote.name;
  contentInput.value = foundNote.content;
  categorySelect.value = foundNote.category;
  if (foundNote.isArchived) {
    archiveRadio.checked = true;
    // archiveRadio.checked = true
  } else {
    activeRadio.checked = true;
  }
}
