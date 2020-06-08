import React from 'react';
import User from '../Models/User';
import { FormGroup, Form, Label, Col, Input, Button } from 'reactstrap';
import { updateUserInfo } from '../API/UserClient';

interface IUserComponentProps {
    user : User | null;
    updateUser: (user:User) => void;
}

interface IUsercomponentState {
    username : string;
    password : string;
    firstName : string;
    lastName : string;
    email : string;

}
export class UserComponent extends React.Component<IUserComponentProps,IUsercomponentState>{
    constructor(props:IUserComponentProps) {
        super(props);
        this.state = {
            username : '',
            password : '',
            firstName : '',
            lastName : '',
            email : '',
        }
    }

    setUsername = (un : any) => {
        this.setState({
            username : un.currentTarget.value,
        })
    }

    setPassword = (pw :any) => {
        this.setState({
            password : pw.currentTarget.value,
        })
    }

    setFirstName = (fn : any) => {
        this.setState({
            firstName : fn.currentTarget.value,
        })
    }

    setLastName = (ln :any) => {
        this.setState({
            lastName : ln.currentTarget.value,
        })
    }

    setEmail = (em : any) => {
        this.setState({
            email : em.currentTarget.value,
        })
    }

    updateUserInformation = async (event:any) => {
        event.preventDefault();
        if(this.props.user) {
            const newUser : User = await updateUserInfo(this.props.user.getUserId(),
                                                this.state.username,
                                                this.state.password,
                                                this.state.firstName,
                                                this.state.lastName,
                                                this.state.email);
            this.props.updateUser(newUser);
            this.setState({
                username: '',
                password: '',
                firstName: '',
                lastName: '',
                email: ''
            })
        }
    }

    render() {
        return (
           <Form onSubmit={this.updateUserInformation}>
               <FormGroup>
                    <Label md={{size: 2, offset: 2}} for="username" >Username</Label>
                   <Col md={{size: 2, offset: 2}} >
                       <Input onChange={this.setUsername} value={this.state.username} type="text" className="username" id="username" placeholder={this.props.user ? this.props.user.getUsername() : "username"}/>
                   </Col>
               </FormGroup>
               <FormGroup>
                    <Label md={{size: 2, offset: 2}} for="password" >Password</Label>
                   <Col md={{size: 2, offset: 2}} >
                       <Input onChange={this.setPassword} value={this.state.password} type="password" className="password" id="password" placeholder={this.props.user ? this.props.user.getPassword() : "password"}/>
                   </Col>
               </FormGroup>
               <FormGroup>
                    <Label md={{size: 2, offset: 2}} for="firstName" >First Name</Label>
                   <Col md={{size: 2, offset: 2}} >
                       <Input onChange={this.setFirstName} value={this.state.firstName} type="text" className="firstName" id="firstName" placeholder={this.props.user ? this.props.user.getFirstName() : "first name"}/>
                   </Col>
               </FormGroup>
               <FormGroup>
                    <Label md={{size: 2, offset: 2}} for="lastName" >Last Name</Label>
                   <Col md={{size: 2, offset: 2}} >
                       <Input onChange={this.setLastName} value={this.state.lastName} type="text" className="lastName" id="lastName" placeholder={this.props.user ? this.props.user.getLastName() : "last name"}/>
                   </Col>
               </FormGroup>
               <FormGroup>
                    <Label md={{size: 2, offset: 2}} for="email" >Email</Label>
                   <Col md={{size: 2, offset: 2}} >
                       <Input onChange={this.setEmail} value={this.state.email} type="text" className="email" id="email" placeholder={this.props.user ? this.props.user.getEmail() : "email"}/>
                   </Col>
               </FormGroup>
               <Col md={{size: 2, offset: 2}}>
                <Button>Update Information</Button>
               </Col>
           </Form>
        )
    }
}