import { Montelo } from "montelo";
import { someCrew } from "some/path";


// globally
const montelo = new Montelo();

// issue here is the untyped safety of the inputs and outputs
// how can we fix this?
// when defining the dataset, and you add inputs and outputs, we'll automatically infer
// the types of the inputs and outputs, and provide you a code snippet to copy and paste
// we'll type the input, output, and when we get to evaluations, since we know the output type,
// that'll be typed as well.
const runDatapoint = async ({ topic }: { topic: string }): Promise<Record<string, any>> => {
  return await someCrew.run({
    inputs: {
      topic,
    },
  });
};

await montelo.experiments.run({
  dataset: "123",
  runner: runDatapoint,
  // later
  // evaluator: (result: Record<string, any>[]) => {},
});
