import { APIRequestContext, Page } from "@playwright/test";
import { request } from "http";
import addToDO from "../apis/AddToDo";
import User from "../models/User";

export default class NewToDoPage{
    private page:Page;
    private request?:APIRequestContext;
    constructor(page:Page,request?:APIRequestContext){
        this.page=page;
        this.request=request;
    }
private get NewToDoBTN(){
    return this.page.getByRole('heading', { name: 'Add a new Todo' });
}
private get AddNewTodo(){
    return this.page.getByLabel('delete');
}private get NewToDoInPut(){
    return this.page.getByTestId('new-todo');
}private get SubmitBTN(){
    return this.page.getByTestId('submit-newTask');
}


async load(){
    await this.page.goto('/todo/new')
}
  async addNewTask(todo:string){
    await this.NewToDoInPut.fill(todo)
    await this.SubmitBTN.click();
  }
  async addNewTaskAPI(user:User){
    await new addToDO(this.request!).addToDOAPI(user);
  }



}