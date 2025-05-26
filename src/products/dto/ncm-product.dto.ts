import { IsNumberString, Length } from "class-validator";

export class NcmProduct {
    @IsNumberString()
    @Length(8, 8)
    ncm: string;
}