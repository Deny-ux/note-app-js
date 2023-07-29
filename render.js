import { singleTask } from "./components/singleTask.js";
import { summaryRow } from "./components/summaryRow.js";
export function renderNotes(notes, tasksContainer, icons, archived = false) {
  const filteredNotes = notes.filter((note) => note.isArchived === archived);
  const notesDOMArray = filteredNotes
    .map((note) => {
      return singleTask(note, icons);
    })
    .join("");
  tasksContainer.innerHTML = notesDOMArray;
}

export function renderSummary(sortedByCategoryNotes, summaryContainer, icons) {
  console.log();
  summaryContainer.innerHTML = sortedByCategoryNotes
    .map(({ category, archived, active }) => {
      return summaryRow({ category, archived, active }, icons);
    })
    .join("");
}
