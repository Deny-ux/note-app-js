import { getIconByCategory, sliceString } from "../utils/util.js";
import { changeDateFormat, extractDates } from "../utils/Dates.js";
export function singleTask({ name, category, createdAt, content, id }, icons) {
  const singleTaskRow = document.createElement("article");
  singleTaskRow.classList.add(["single-task", "tasks-row"]);
  singleTaskRow.dataset.id = id;
  singleTaskRow.innerHTML = `<article class="single-task tasks-row" data-id=${id}>
  <div class="task-name">
          ${getIconByCategory(icons, category)}
          <p>${sliceString(name)}</p>
        </div>
        <p>${changeDateFormat(createdAt)}</p>
        <p>${category}</p>
        <p>${sliceString(content)}</p>
        <p>${sliceString(extractDates(content))}</p>
        <div class="single-task-btns">
          <i class="fa-solid fa-pen edit-single-task-btn"></i>
          <i class="fa-solid fa-square-caret-down archive-single-task-btn"></i>
          <i class="fa-solid fa-trash delete-single-task-btn"></i>
        </div>
          </article>`;
  return singleTaskRow;
}
