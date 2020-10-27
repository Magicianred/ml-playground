/* Validation checks to determine if app set up is ready for machine learning training */

import { availableTrainers } from "./train.js";

export function minOneFeatureSelected(state) {
  return state.selectedFeatures.length !== 0;
}

export function oneLabelSelected(state) {
  return !!state.labelColumn;
}

export function uniqLabelFeaturesSelected(state) {
  return (
    minOneFeatureSelected(state) &&
    oneLabelSelected(state) &&
    !state.selectedFeatures.includes(state.labelColumn)
  );
}

export function trainerSelected(state) {
  return !!state.selectedTrainer;
}

export function compatibleLabelAndTrainer(state) {
  const labelAndTrainerSelected =
    oneLabelSelected(state) && trainerSelected(state);
  const trainerLabelType = state.selectedTrainer
    ? availableTrainers[state.selectedTrainer].labelType
    : undefined;
  console.log("state.selectedTrainer", state.selectedTrainer);
  console.log(
    "availableTrainers[state.selectedTrainer]",
    availableTrainers[state.selectedTrainer]
  );
  console.log("trainerLabelType", trainerLabelType);
  const labelDatatype = state.labelColumn
    ? state.columnsByDataType[state.labelColumn]
    : undefined;
  console.log("labelDatatype", labelDatatype);
  const compatible = labelAndTrainerSelected
    ? trainerLabelType === labelDatatype
    : false;
  return compatible;
}
