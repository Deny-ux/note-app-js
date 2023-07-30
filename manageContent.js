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
  } else {
    activeRadio.checked = true;
  }
}
