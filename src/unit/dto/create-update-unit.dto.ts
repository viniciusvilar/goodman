import { IsString } from "class-validator"

export class CreateAndUpdateUnitDto {
    @IsString()
    name: string
}
