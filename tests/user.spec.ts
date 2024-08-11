import {expect, test} from '@playwright/test'
import {fa, faker}  from '@faker-js/faker' 
import User from '../models/User';
import RegisterPage from '../pages/RegisterPage';
import ToDoPage from '../pages/ToDoPage';
import NewToDoPage from '../pages/NewToDoPage';
import LoginAPI from '../apis/LoginAPI';
import LoginPage from '../pages/LoginPage';


test("register With API",async({page,request,context})=>{

    const user = new User(
        faker.person.firstName(),
        faker.person.lastName(),
        faker.internet.email(),
        '12345678'

    );
    const registerPage = new RegisterPage(page,request,context);
    await registerPage.registerAPI(user);
       
    const newToDoPage = new NewToDoPage(page);
    await newToDoPage.load();
    await newToDoPage.addNewTask('7mada');

    const toDoPage = new ToDoPage(page);
    const todoText = await toDoPage.getetToDoTextByIndex(0);
    expect(todoText).toEqual('7mada');

})

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
    await toDoPage.load()

})
test("registerWithFaker",async({page})=>{
    const user = new User(
     faker.person.firstName()
    ,faker.person.lastName()
    ,faker.internet.email()
    ,'12345678')     
    const registerPage = new RegisterPage(page);
   await registerPage.load()
        await registerPage.register(user);
        const toDoPage = new ToDoPage(page);
       const welcomeMessage =  toDoPage.getWelcomeMessage(); 
        await expect(welcomeMessage).toBeVisible();

})
test("register",async({page})=>{
        await page.goto("signup")
        await page.getByTestId('first-name').fill('Abd ElRhman');
    
    await page.getByTestId('last-name').type('Magdy');
    //await page.getByTestId('email').click();
    await page.getByTestId('email').type('abdelrhman88magdy@gmail.com');
    //wait page.getByTestId('password').click();
    await page.getByTestId('password').fill('12345678');
    //await page.getByTestId('password').press('Tab');
     await page.getByTestId('confirm-password').fill('12345678');
     await page.getByTestId('submit').click();

})

test('Login', async ({ page }) => {
    await page.goto('/login');
    await page.getByTestId('email').fill('abdelrhman88magdyzzz@gmail.com');
    await page.getByTestId('password').fill('12345678');
    await page.getByTestId('submit').click();
    await expect(page.getByTestId('welcome')).toContainText('Good afternoon');
    const welcomeMessage = page.locator('[data-testid="welcome"]')
    await expect(welcomeMessage).toBeVisible();
});