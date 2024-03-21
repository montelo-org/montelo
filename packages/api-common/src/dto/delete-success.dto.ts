import { ApiProperty } from "@nestjs/swagger";

export class DeleteSuccessDto {
  @ApiProperty()
  success: boolean;
}
