import axios from 'axios';
import User from '../Models/User';
import { FailedLoginError } from '../Errors/FailedLoginError';

const userClient = axios.create({
    baseURL: 'http://18.218.36.173:2000',
    withCredentials: true
})

export async function login(un:string,pw:string): Promise<User>{
    try {
        const response = await userClient.post('/login',{
            username: un,
            password: pw
        });
        const {userId,username,password,firstName,lastName,email,role} = response.data;
        return new User(userId,username,password,firstName,lastName,email,role)
    }catch(err){
        if(err.response.status === 401){
            throw new FailedLoginError('Failed to authenticate',un);
        }else{
            throw err;
        }
    }
   
}

export async function updateUserInfo(id:number,un?:string,pw?:string,fn?:string,ln?:string,em?:string) : Promise<User>{
    try{
        const response = await userClient.patch(`/users/${id}`,{
            username: un,
            password: pw,
            first_name: fn,
            last_name: ln,
            email: em,
        })
        const {userId,username,password,firstName,lastName,email,role} = response.data;
        return new User(userId,username,password,firstName,lastName,email,role);
    }catch(err){
        throw err;
    }
}

export async function getAllUsers() : Promise<User[]> {
    try {
        const response = await userClient.get('/users');
        return response.data.map( (user:any) => {
            return new User(user.userId,user.username,user.password,user.firstName,user.lastName,user.email,user.role)
        })
    }catch(err){
        throw err;
    }
}

