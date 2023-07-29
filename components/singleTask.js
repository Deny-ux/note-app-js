import { getIconByCategory, sliceString } from "../utils/util.js";
import { changeDateFormat, extractDates } from "../utils/Dates.js";
export function singleTask({ name, category, createdAt, content }, icons) {
  return `<article class="single-task tasks-row">
        <div class="task-name">
          ${getIconByCategory(icons, category)}
          <p>${sliceString(name)}</p>
        </div>
        <p>${changeDateFormat(createdAt)}</p>
        <p>${category}</p>
        <p>${sliceString(content)}</p>
        <p>${sliceString(extractDates(content))}</p>
        <div class="single-task-btns">
          <i class="fa-solid fa-pen"></i>
          <i class="fa-solid fa-square-caret-down"></i>
          <i class="fa-solid fa-trash"></i>
        </div>
      </article>
      `;
}
