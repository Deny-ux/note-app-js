const createNoteBtn = document.querySelector("#createBtn");
const tasksContainer = document.querySelector(".tasks-container");
const summaryContainer = document.querySelector(".summary-container");
import { getCountByCategory } from "./utils/util.js";
import { renderNotes, renderSummary } from "./render.js";
import { extractDates } from "./utils/Dates.js";
let data = [];
let archived = false;

fetch("./data.json")
  .then((response) => response.json())
  .then((jsonData) => {
    let { data: dataArray, icons } = jsonData;
    data = renderNotes(dataArray, tasksContainer, icons, archived);
    const summaryData = getCountByCategory(dataArray);

    renderSummary(summaryData, summaryContainer, icons);
  })
  .catch((error) => console.error("Error loading JSON data:", error));
