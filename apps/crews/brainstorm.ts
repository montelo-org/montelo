// import { Agent, Crew, Task } from "montelo";
//
// const researcher = new Agent({
//   role: "Researcher",
//   goal: "Uncover groundbreaking technologies in {topic}",
//   backstory:
//     "Driven by curiosity, you're at the forefront of innovation, eager to explore and share knowledge that could change the world.",
//   tools: [searchTool],
//   llm: {
//     provider: "openai",
//     model: "gpt-4"
//   },
// });
//
// const writer = new Agent({
//   role: "Writer",
//   goal: "Narrate compelling tech stories about {topic}",
//   backstory:
//     "With a flair for simplifying complex topics, you craft engaging narratives that captivate and educate, bringing new discoveries to light in an accessible manner.",
//   tools: [searchTool],
//   llm: {
//     provider: "anthropic",
//     model: "claude-3"
//   },
// });
//
// const researchTask = new Task({
//   description:
//     "Identify the next big trend in {topic}. Focus on identifying pros and cons and the overall narrative. Your final report should clearly articulate the key points, its market opportunities, and potential risks.",
//   agent: researcher,
// });
//
// const writeTask = new Task({
//   description:
//     "Compose an insightful article on {topic}. Focus on the latest trends and how it's impacting the industry. This article should be easy to understand, engaging, and positive.",
//   agent: writer,
// });
//
// const crew = new Crew({
//   agents: [researcher, writer],
//   tasks: [researchTask, writeTask],
// });
//
// const { output } = crew.run({
//   inputs: {
//     topic: "AI in healthcare",
//   },
// });
