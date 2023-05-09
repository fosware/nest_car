import { IsString, MinLength, isString } from "class-validator";

export class CreateCarDto {
    @IsString()
    readonly brand: string;
    @IsString()
    readonly model: string;
}