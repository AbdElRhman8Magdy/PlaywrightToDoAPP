import { APIRequestContext } from "@playwright/test"
import User from "../models/User";

export default class LoginAPI{
    private request:APIRequestContext;
    constructor(request:APIRequestContext){
        this.request=request
    }
    async LoginWithAPI(user:User){
        return await  this.request.post('api/v1/users/login',
            {
                data:{
                    email: user.getEmail(),
                    password:user.getPassword(),
                }
                
    })
    
}}