// import { Montelo } from "montelo";
// import { someCrew } from "some/path";
//
//
// // globally
// const montelo = new Montelo();
//
// // some local data points
// const datasetInputs = [{ topic: "AI in healthcare" }, { topic: "AI in space" }];
//
// const dataset = await montelo.datasets.create({
//   name: "Topic Datasets",
//   descriptions: "Some description",
// });
//
// await montelo.datapoints.create({
//   datasetId: dataset.id,
//   inputs: datasetInputs,
//   source: "",
//   metadata: {
//     hardness: "easy"
//   }
// });
//
// const runDatapoint = async ({ topic }): Promise<Record<string, any>> => {
//   return await someCrew.run({
//     inputs: {
//       topic,
//     },
//   });
// };
//
// await montelo.datasets.run({
//   datasetId,
//   runner: runDatapoint,
// });
