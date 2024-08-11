import { fa, faker, th } from "@faker-js/faker";

export default class User{
    private firstname:string;
    private lastname:string;
    private email:string;
    private password:string;
    private access_token:string;
    private userID:string;


    constructor(){
        this.firstname = faker.person.firstName();
        this.lastname=faker.person.lastName();
        this.email=faker.internet.email();
        this.password="12345678";
        this.access_token=this.access_token;
        this.userID=this.userID;
    }
    
    getFirstname(){
        return this.firstname
    }
    getLastname(){
        return this.lastname
    }
    getEmail(){
        return this.email
    }
    getPassword(){
        return this.password
    }
    getAccessToken(){
        return this.access_token
    }
    getUserID(){
        return this.userID
    }

    setAccessToken(access_token:string){
        this.access_token=access_token;
    }
}