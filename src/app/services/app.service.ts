import { Injectable } from "@nestjs/common";
import { ApiError } from "../utils/api.error";

@Injectable()
export class AppService{
    public doSomething(){
        throw ApiError.InternalServerError();
    }
}