import { expect, Page } from "@playwright/test";

export default class ToDoPage{
    private page:Page;
    constructor(page:Page){
        this.page=page;
    }
private get welcomeMessage(){
    return this.page.getByTestId('welcome');
}

async load(){
    await this.page.goto('/todo')
}

private get toDoItemText(){
    return this.page.locator('[data-testid="todo-item"]');
}
private get deleteIcon(){
    return this.page.getByTestId('delete');
    ;
}private get DeleteBTN(){
    return this.page.getByTestId('delete');
    ;
}private get NoToDos(){
    return this.page.getByTestId('no-todos');
    ;
}

    getWelcomeMessage(){
        return this.welcomeMessage
    }

    async getetToDoTextByIndex(index:number){
        return await this.toDoItemText
        .nth(index)
        .innerText();
    }
    async deleteToDoByIndex(index:number){
        await this.DeleteBTN.nth(0).click()
      }
      async checkNoToDos(){
           const noToDoMessage = await this.NoToDos
        await expect (noToDoMessage).toBeVisible();
      
      }
}