import { faker } from "@faker-js/faker";
import { eachLimit } from "async";
import cuid from "cuid";

import { LogSources, Prisma, prisma } from "./client";

const seedSingleBatch = async () => {
  const envId = "clt0r2wp70004yjxos2kpuzvo";
  const now = new Date();
  // const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  const oneHourAgo: Date = new Date(now.getTime() - 60 * 60 * 1000);

  const getFakeLog = ({
    startTime,
    endTime,
  }: {
    startTime: Date;
    endTime: Date;
  }): Prisma.LogCreateManyTraceInput => {
    const name = faker.word.words(2);
    const productName = faker.commerce.productName();
    const productDescription = faker.commerce.productDescription();
    const productDepartment = faker.commerce.department();

    const durationMs = new Date(endTime).getTime() - new Date(startTime).getTime();
    const duration = parseFloat((durationMs / 1000).toFixed(2));

    const inputTokens = faker.number.int({ min: 200, max: 5000 });
    const outputTokens = faker.number.int({ min: 200, max: 5000 });
    const totalTokens = inputTokens + outputTokens;

    const inputCost = inputTokens * 0.00001;
    const outputCost = outputTokens * 0.00003;
    const totalCost = parseFloat((inputCost + outputCost).toFixed(2));

    const getRandomLogType = (): LogSources =>
      Object.values(LogSources)[Math.floor(Math.random() * Object.values(LogSources).length)];

    return {
      id: cuid(),
      envId,
      name,
      input: {
        productName,
        productDescription,
      },
      output: {
        productDepartment,
      },
      source: getRandomLogType(),
      model: faker.datatype.boolean() ? "gpt-4-0125-preview" : "gpt-3.5-turbo-1106",
      startTime,
      endTime,
      duration,
      inputTokens,
      outputTokens,
      totalTokens,
      inputCost,
      outputCost,
      totalCost,
    };
  };

  const getFakeTrace = (): Prisma.TraceCreateInput => {
    const numLogs = faker.number.int({ min: 2, max: 10 });
    const fakeLogs: Array<Prisma.LogCreateManyTraceInput> = [];

    let startTime = faker.date.between({
      from: oneHourAgo,
      to: new Date(oneHourAgo.getTime() + 2 * 60 * 1000), // Adds 10 minutes to oneHourAgo
    });
    let endTime = faker.date.between({
      from: startTime,
      to: new Date(startTime.getTime() + 2 * 1000),
    });

    for (let step = 0; step < numLogs; step++) {
      const fakeLog = getFakeLog({
        endTime,
        startTime,
      });

      // update dates
      startTime = faker.date.between({
        from: endTime,
        to: new Date(endTime.getTime() + 2 * 1000),
      });
      endTime = faker.date.between({
        from: startTime,
        to: new Date(startTime.getTime() + 2 * 1000),
      });

      fakeLogs.push(fakeLog);
    }

    const name = faker.word.words(2);
    const traceStartTime = fakeLogs[0].startTime!;
    const traceEndTime = fakeLogs[fakeLogs.length - 1].endTime!;
    const durationMs = new Date(traceEndTime).getTime() - new Date(traceStartTime).getTime();
    const duration = parseFloat((durationMs / 1000).toFixed(2));

    const inputTokens = fakeLogs.reduce((accum, curr) => accum + curr.inputTokens!, 0);
    const outputTokens = fakeLogs.reduce((accum, curr) => accum + curr.outputTokens!, 0);
    const totalTokens = inputTokens + outputTokens;

    const inputCost = fakeLogs.reduce((accum, curr) => accum + curr.inputCost!, 0);
    const outputCost = fakeLogs.reduce((accum, curr) => accum + curr.outputCost!, 0);
    const totalCost = parseFloat((inputCost + outputCost).toFixed(2));

    return {
      envId,
      name,
      startTime: traceStartTime,
      endTime: traceEndTime,
      duration,
      inputTokens,
      outputTokens,
      totalTokens,
      inputCost,
      outputCost,
      totalCost,
      logs: {
        createMany: {
          data: fakeLogs,
        },
      },
    };
  };

  const arraySize = 100;
  const fakeTraces = Array.from({ length: arraySize }, getFakeTrace);
  const promises = fakeTraces.map((trace) => prisma.trace.create({ data: trace }));
  await Promise.all(promises);
};

const seed = async () => {
  try {
    const arraySize = 10;
    const array = Array(arraySize);
    const batches = 10;
    await eachLimit(array, batches, seedSingleBatch);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

void seed();
