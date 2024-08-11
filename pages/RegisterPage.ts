import { APIRequestContext, BrowserContext, expect, Page } from "@playwright/test";
import User from "../models/User";
import UserApi from "../apis/UserApi";
import Config   from '../playwright.config'
import { config } from "process";

export default class RegisterPage{
    private page:Page;
    private request?:APIRequestContext;
    private context?:BrowserContext;
    constructor(page:Page,requst?:APIRequestContext,context?:BrowserContext){
        this.page=page;
        this.request=requst;
        this.context=context
    }
    
    private get firstnameInput(){
        return this.page.getByTestId('first-name')
    }
    private get lasttnameInput(){
        return this.page.getByTestId('last-name')
    } private get emailInput(){
        return this.page.getByTestId('email')
    } private get passwordInput(){
        return this.page.getByTestId('password')
    }
    private get confirmPasswordInput(){
        return this.page.getByTestId('confirm-password')
    } private get submitBTNInput(){
        return this.page.getByTestId('submit')
    } 

    async load(){
        await this.page.goto("/signup")
    }
    async register(user:User){
        await this.firstnameInput.fill(user.getEmail());
await this.lasttnameInput.type(user.getLastname());
await this.emailInput.type(user.getEmail());
await this.passwordInput.fill(user.getPassword());
 await this.confirmPasswordInput.fill(user.getPassword());
 await this.submitBTNInput.click();

   }

   async registerAPI(user:User){
    const response = await new UserApi(this.request!).register(user);
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
            url:Config.use?.baseURL,
        },
        {
            name:'firstName',
            value:fName,
            url:Config.use?.baseURL,
        },
        {
            name:'userID',
            value:userID,
            url:Config.use?.baseURL,
        }
    ]);
   }
}