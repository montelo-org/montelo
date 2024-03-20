import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { UseAuthGuards } from "../../common/guards/guard";
import { DateSelection } from "./analytics.enum";
import { AnalyticsService } from "./analytics.service";
import { CostHistoryDto } from "./dto/cost-history.dto";
import { DashboardAnalyticsDto } from "./dto/dashboard-analytics.dto";


@ApiTags("Analytics")
@ApiBearerAuth()
@UseAuthGuards()
@Controller("env/:envId/analytics")
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @ApiQuery({ name: "dateSelection", enum: DateSelection })
  @Get("dashboard")
  async getAnalyticsForEnv(
    @Param("envId") envId: string,
    @Query("dateSelection") dateSelection: DateSelection,
  ): Promise<DashboardAnalyticsDto> {
    return await this.analyticsService.getDashboardAnalytics({
      envId,
      dateSelection,
    });
  }

  @ApiQuery({ name: "dateSelection", enum: DateSelection })
  @Get("cost-history")
  async getCostHistoryForEnv(
    @Param("envId") envId: string,
    @Query("dateSelection") dateSelection: DateSelection,
  ): Promise<CostHistoryDto> {
    const costHistory = await this.analyticsService.getCostHistory({
      envId,
      dateSelection,
    });
    return { costHistory };
  }
}
