import { getIconByCategory } from "../utils/util.js";

export function summaryRow({ category, active, archived }, icons) {
  return `<article class="single-summary-row">
          <div class="task-name">
          ${getIconByCategory(icons, category)}
            <p>${category}</p>
          </div>
          <p>${active}</p>
          <p>${archived}</p>
        </article>`;
}
