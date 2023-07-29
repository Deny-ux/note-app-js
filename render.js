import { getIconByCategory } from "./utils/util.js";
export function renderNotes(notes, tasksContainer, icons, archived = false) {
  const filteredNotes = notes.filter((note) => note.isArchived === archived);
  const notesDOMArray = filteredNotes
    .map((note) => {
      /*TODO
     1. createdAt change to formatted date
     2. format long names
   */

      return `<article class="single-task tasks-row">
        <div class="task-name">
          ${getIconByCategory(icons, note.category)}
          <p>${note.name}</p>
        </div>
        <p>${note.createdAt}</p>
        <p>${note.category}</p>
        <p>${note.content}</p>
        <p>${``}</p>
        <div class="single-task-btns">
          <i class="fa-solid fa-pen"></i>
          <i class="fa-solid fa-square-caret-down"></i>
          <i class="fa-solid fa-trash"></i>
        </div>
      </article>
      `;
    })
    .join("");
  tasksContainer.innerHTML = notesDOMArray;
}

export function renderSummary(sortedByCategoryNotes, summaryContainer, icons) {
  console.log();
  summaryContainer.innerHTML = sortedByCategoryNotes
    .map(({ category, archived, active }) => {
      return `
          <article class="single-summary-row">
          <div class="task-name">
          ${getIconByCategory(icons, category)}
            <p>${category}</p>
          </div>
          <p>${active}</p>
          <p>${archived}</p>
        </article>`;
    })
    .join("");
}
