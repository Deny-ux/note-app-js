import { singleTask } from "./components/singleTask.js";
import { summaryRow } from "./components/summaryRow.js";

export function renderNotes(notes, tasksContainer, icons, archived = false) {
  notes = notes.filter((note) => note);
  const filteredNotes = notes.filter((note) => note.isArchived === archived);
  const notesDOMArray = filteredNotes
    .map((note) => {
      return singleTask(note, icons).innerHTML;
    })
    .join("");
  tasksContainer.innerHTML = notesDOMArray;

  // tasksContainer.children
  // const notesDOM = tasksContainer.querySelectorAll(".single-task");
  // notesDOM.forEach((noteDOM) => {
  //   if (!noteDOM.hasAttribute("data-event-listener")) {
  //     // noteDOM.addEventListener('click', (e)=>{

  //     // })
  //     console.log(1);
  //     noteDOM.setAttribute("data-event-listener", true);
  //   } else {
  //     console.log(2);
  //   }
  // });
}

export function renderSummary(sortedByCategoryNotes, summaryContainer, icons) {
  console.log();
  summaryContainer.innerHTML = sortedByCategoryNotes
    .map(({ category, archived, active }) => {
      return summaryRow({ category, archived, active }, icons);
    })
    .join("");
}

export function renderPage(
  notes,
  tasksContainer,
  sortedByCategoryNotes,
  summaryContainer,
  icons,
  showArchived = false
) {
  renderNotes(notes, tasksContainer, icons, showArchived);
  renderSummary(sortedByCategoryNotes, summaryContainer, icons);
}

export function showModal(
  modalElement,
  modalBlock = document.querySelector(".modal-block")
) {
  modalBlock.classList.add("show-modal-block");
  modalElement.classList.add("show-modal");
}

export function hideModals(
  modalBlock = document.querySelector(".modal-block"),
  modalCreate = document.querySelector(".create-modal"),
  modalEdit = document.querySelector(".edit-modal")
) {
  modalBlock.classList.remove("show-modal-block");
  modalCreate.classList.remove("show-modal");
  modalEdit.classList.remove("show-modal");
}
