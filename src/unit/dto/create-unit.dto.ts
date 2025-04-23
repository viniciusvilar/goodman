import { IsString, Length } from "class-validator"

export class CreateUnitDto {
    @IsString()
    name: string
    @IsString()
    @Length(2, 2)
    code: string
}
