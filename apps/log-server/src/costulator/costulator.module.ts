import { Module } from "@nestjs/common";
import { CostulatorService } from "./costulator.service";
import { LLMProvider } from "./llm-provider.interface";
import { MistralCostulatorService } from "./providers/mistral.costulator.service";
import { OpenAICostulatorService } from "./providers/openai.costulator.service";


@Module({
  providers: [
    OpenAICostulatorService,
    MistralCostulatorService,
    {
      provide: "LLM_PROVIDERS",
      useFactory: (openaiService: OpenAICostulatorService, mistralService: MistralCostulatorService): LLMProvider[] => {
        return [openaiService, mistralService];
      },
      inject: [OpenAICostulatorService, MistralCostulatorService],
    },
    CostulatorService,
  ],
  exports: [CostulatorService],
})
export class CostulatorModule {}
