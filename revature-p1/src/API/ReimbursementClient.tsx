import axios from 'axios';
import Reimbursement from '../Models/Reimbursement'
import User from '../Models/User';
import { FailedAddReimbursement } from '../Errors/FailedAddReimbursement';

const reimbursementClient = axios.create({
    baseURL: 'http://18.218.36.173:2000',
    withCredentials: true
})

export async function getAllReimbursementsById (authorId: number) : Promise<Reimbursement[]>{
    try{
        const response = await reimbursementClient.get(`/reimbursements/author/userId/${authorId}`);
        return response.data.map((reim:any) => {
            const author = new User(reim.author.userId,reim.author.username,reim.author.password,reim.author.firstName,reim.author.lastName,reim.author.email,reim.author.role);
            const resolver = new User(reim.resolver.userId,reim.resolver.username,reim.resolver.password,reim.resolver.firstName,reim.resolver.lastName,reim.resolver.email,reim.resolver.role);
            return new Reimbursement(reim.reimbursementId,author,reim.amount,reim.dateSubmitted,reim.dateResolved,reim.description,resolver,reim.status,reim.type)
        })
    }catch(err) {
        throw err
    }
}

export async function addNewReimbursement (author:User,amount:number,date:string,type:string,description:string) : Promise<void> {
    try{
        await reimbursementClient.post('/reimbursements',{
            author: author.getUserId(),
            amount: amount,
            date_submitted: date,
            description : description,
            status : 'Pending',
            type : type,
        })
    }catch(err){
        if(err.response.status === 400){
            throw new FailedAddReimbursement("Something went wrong adding a reimbursement");
        }else{
            throw err;
        }
    }
}

export async function updateReimbursementStatus (reimbursementId:number,resovler:User,status:string,date:string) : Promise<void> {
    try{
        await reimbursementClient.patch('/reimbursements',{
            id : reimbursementId,
            status : status,
            date_resolved : date,
            resolver : resovler.getUserId()
        })
    }catch(err){
        throw err;
    }
}