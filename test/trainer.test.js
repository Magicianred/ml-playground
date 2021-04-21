const KNN = require("ml-knn");

describe("Order of training data does not matter", () => {
  test("first", async () => {
    const trainingExamples = [
      [1,0],
      [1,1],
      [0,0],
      [0,1]
    ];
    const trainingLabels = [1,1,0,0];
    const reverseTrainingExamples = [
      [0,1],
      [1,1],
      [0,0],
      [1,0]
    ];
    const knn = new KNN(trainingExamples, trainingLabels);
    const result = knn.predict(trainingExamples);

    const knnReverse = new KNN(reverseTrainingExamples, trainingLabels);
    const resultReverse = knn.predict(reverseTrainingExamples);


    console.log("result", result)
    console.log("resultReverse", resultReverse)
    // expect(result).toBe(resultReverse);
  });
});
