/* Training and prediction using a multiclassification KNN machine learning model from
https://github.com/mljs/knn */

import { store } from "../index.js";
import {
  setModelSize,
  setTrainedModel,
  setPrediction,
  setAccuracyCheckPredictedLabels
} from "../redux";

const KNN = require("ml-knn");

export default class KNNTrainer {
  startTraining() {
    const state = store.getState();
    this.knn = new KNN(state.trainingExamples, state.trainingLabels, {
      k: state.kValue
    });
    var model = this.knn.toJSON();
    store.dispatch(setTrainedModel(model));
    const size = Buffer.byteLength(JSON.stringify(model));
    const kiloBytes = size / 1024;
    store.dispatch(setModelSize(kiloBytes));
    if (state.accuracyCheckExamples.length > 0) {
      this.batchPredict(state.accuracyCheckExamples);
    } else {
      store.dispatch(setAccuracyCheckPredictedLabels([]));
    }
  }

  batchPredict(accuracyCheckExamples) {
    const predictedLabels = this.knn.predict(accuracyCheckExamples);
    store.dispatch(setAccuracyCheckPredictedLabels(predictedLabels));
  }

  predict(testValues) {
    let prediction = {};
    prediction.predictedLabel = this.knn.predict([testValues])[0];
    store.dispatch(setPrediction(prediction));
  }
}
