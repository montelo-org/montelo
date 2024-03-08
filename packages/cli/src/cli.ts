#!/usr/bin/env node
import { Command } from "commander";
import { generateCommand, initCommand } from "./commands";

const program = new Command();

program.command("init").description("Initialize montelo.").action(initCommand);

program.command("generate").description("Generate montelo files.").action(generateCommand);

program.parse(process.argv);
