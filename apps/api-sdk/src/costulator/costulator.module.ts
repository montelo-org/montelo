import { Module } from "@nestjs/common";
import { CostulatorService } from "./costulator.service";
import { LLMProvider } from "./llm-provider.interface";
import { AnthropicCostulatorService } from "./providers/anthropic.costulator.service";
import { MistralCostulatorService } from "./providers/mistral.costulator.service";
import { OpenAICostulatorService } from "./providers/openai.costulator.service";


@Module({
  providers: [
    OpenAICostulatorService,
    MistralCostulatorService,
    AnthropicCostulatorService,
    {
      provide: "LLM_PROVIDERS",
      useFactory: (
        openaiService: OpenAICostulatorService,
        mistralService: MistralCostulatorService,
        anthropicService: AnthropicCostulatorService,
      ): LLMProvider[] => {
        return [openaiService, mistralService, anthropicService];
      },
      inject: [OpenAICostulatorService, MistralCostulatorService, AnthropicCostulatorService],
    },
    CostulatorService,
  ],
  exports: [CostulatorService],
})
export class CostulatorModule {}
