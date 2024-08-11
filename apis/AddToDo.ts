import { APIRequestContext } from "@playwright/test"
import User from "../models/User";

export default class addToDO{
    private request:APIRequestContext;
    constructor(request:APIRequestContext){
        this.request=request
    }
    async addToDOAPI(user:User){
        return await  this.request.post('api/v1/tasks',
            {
                data:{
                    isCompleted: false,
                    item:'APII',
                },
                headers:{
                    Authorization: 'Bearer ' + user.getAccessToken(),
                }
    })
    
}}