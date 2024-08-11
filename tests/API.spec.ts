import { faker } from "@faker-js/faker";
import test from "@playwright/test";
import User from "../models/User";
import userApi from "../apis/UserApi";
import addToDO from "../apis/AddToDo.ts";


test("register With API",async({page,request,context})=>{


    const user = new User(
        faker.person.firstName()
       ,faker.person.lastName()
       ,faker.internet.email()
       ,'12345678')
    const response = await new userApi(request).register(user)

        const responsebody = await response.json();
        const accessToken = responsebody.access_token;
        const userID = responsebody.userID;
        const fName = responsebody.firstName;
        console.log(accessToken,userID,fName,responsebody)

        user.setAccessToken(accessToken);

        await context.addCookies([
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

    //await page.goto("/todo")

    const responseAddTask = await new addToDO(request).addToDOAPI(user);
        
        const responsebodyTask = await response.json();
        const createdAt = responsebody.createdAt;
        const isCompleted = responsebody.isCompleted;
        const item = responsebody.item;
        const userIDTask = responsebody.userID;
        const _idtask = responsebody._id;


        console.log(responsebodyTask,createdAt,isCompleted,item,userIDTask,_idtask)

       

    await page.goto("/todo")

})