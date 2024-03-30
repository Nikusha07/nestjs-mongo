
import {IsMongoId} from 'class-validator'
export class UserIdParamsDto{
    @IsMongoId()
    id: string;
}