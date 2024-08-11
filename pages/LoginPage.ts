import { APIRequestContext, BrowserContext, Page } from "@playwright/test";
import LoginAPI from "../apis/LoginAPI";
import User from "../models/User";

export default class RegisterPage{
    private page:Page;
    private request?:APIRequestContext;
    private context?:BrowserContext;
    constructor(page:Page,requst?:APIRequestContext,context?:BrowserContext){
        this.page=page;
        this.request=requst;
        this.context=context
    }
   
     private get emailInput(){
        return this.page.getByTestId('email')
    } private get passwordInput(){
        return this.page.getByTestId('password')
    }

    async loginWithApi(user:User){
        const response = await new LoginAPI(this.request!).LoginWithAPI(user);
        const responsebody = await response.json();
        const accessToken = responsebody.access_token;
        const userID = responsebody.userID;
        const fName = responsebody.firstName;
        console.log(accessToken,userID,fName,responsebody)
    
        user.setAccessToken(accessToken);
    
        await this.context!.addCookies([
            {
                name:'access_token',
                value:accessToken,
                url:'https://todo.qacart.com',
            },
            {
                name:'firstName',
                value:fName,
                url:'https://todo.qacart.com',
            },
            {
                name:'userID',
                value:userID,
                url:'https://todo.qacart.com',
            }
        ]);
       }
}