import { Module } from "@nestjs/common";
import { CostulatorService } from "./costulator.service";
import { LLMProvider } from "./llm-provider.interface";
import { OpenAICostulatorService } from "./openai.costulator.service";

@Module({
  providers: [
    OpenAICostulatorService,
    {
      provide: "LLM_PROVIDERS",
      useFactory: (openaiService: OpenAICostulatorService): LLMProvider[] => {
        return [openaiService];
      },
      inject: [OpenAICostulatorService],
    },
    CostulatorService,
  ],
  exports: [CostulatorService],
})
export class CostulatorModule {}
