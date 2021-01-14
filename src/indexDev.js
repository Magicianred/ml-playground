import { initAll } from "./index";
import "./assetPath";
import queryString from "query-string";

// A list of sample modes.  Should match the dropdown in index.html.
const sampleModes = {
  load_foods: { datasets: ["foods"] },

  level_3_1: {
    datasets: ["candy", "titanic", "foods"],
    hideSelectLabel: true,
    hideSpecifyColumns: true,
    hideChooseReserve: true,
    hideModelCard: true,
    hideSave: true
  },

  level_3_3: {
    datasets: ["candy", "titanic", "foods"],
    hideSelectLabel: true,
    hideSpecifyColumns: true,
    hideChooseReserve: true,
    hideModelCard: true
  },

  level_4_1: {
    datasets: ["candy"],
    hideChooseReserve: true,
    hideModelCard: true
  },

  level_4_3: {
    datasets: ["candy", "titanic", "foods"],
    hideChooseReserve: true,
    hideModelCard: true
  },

  level_5_3: {
    datasets: ["candy", "titanic", "foods"]
  },

  level_7_6: {}
};

// Look for a ?mode= parameter on the URL
let parameters = queryString.parse(location.search);
const mode = parameters["mode"] ? sampleModes[parameters["mode"]] : null;

// Initialize the app.
initAll({ mode: mode });
