import test from "@playwright/test";
import User from "../models/User";
import RegisterPage from "../pages/RegisterPage";
import NewToDoPage from "../pages/NewToDoPage";
import ToDoPage from "../pages/ToDoPage";
import LoginPage from "../pages/LoginPage";

test("register With Pages",async({page,request,context})=>{

    const user = new User();
    const registerPage = new RegisterPage(page,request,context);
    await registerPage.registerAPI(user);


    const loginPage = new LoginPage(page,request,context) 
    loginPage.loginWithApi(user)

    
    const newToDoPage = new NewToDoPage(page,request)
    await newToDoPage.addNewTaskAPI(user)
    const toDoPage = new ToDoPage(page)
    await toDoPage.load()
   
    await toDoPage.deleteToDoByIndex(0)
    await toDoPage.checkNoToDos()
    

})