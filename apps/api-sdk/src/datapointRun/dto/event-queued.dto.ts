import { ApiProperty } from "@nestjs/swagger";

export class EventQueuedDto {
  @ApiProperty()
  success: boolean;
}
