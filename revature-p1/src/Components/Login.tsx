import React from 'react';
import {Form,FormGroup,Label,Col,Input,Button,Toast,ToastBody,ToastHeader} from 'reactstrap';
import { login } from '../API/UserClient';
import User from '../Models/User';

interface ILoginProps {
    user : User | null,
    updateUser: (user:User) => void;
}

  
interface ILonginState {
    username : string;
    password : string;
    isError : boolean;
    errorMessage : string;
    loginUser: User | null;
}

export class Login extends React.Component<any,ILonginState> {

    constructor(props:any){
        super(props)
        this.state = {
            username : '',
            password : '',
            isError : false,
            errorMessage : '',
            loginUser: null
        }
    }

    setUsername = (un:any) => {
        this.setState({
            username: un.currentTarget.value
        })
    }

    setPassword = (password:any) => {
        this.setState({
            password: password.currentTarget.value
        })
    }

    clearError = () => {
        this.setState({
          errorMessage: '',
          isError: false,
        })
      }

    attemptLogin = async (event:any) => {
        event.preventDefault();
        try{
            const loggedInUser : User = await login(this.state.username,this.state.password);
            this.props.updateUser(loggedInUser);
            this.setState({
                username: '',
                password: '',
                loginUser: loggedInUser
              });
            this.props.history.push("/home")
        }catch(err){
            this.setState({
                username: '',
                password: '',
                isError: true,
                errorMessage: err.message,
              })
        }
    }
    render() {
        return (
            <div>
                <Form onSubmit={this.attemptLogin}>
                    <FormGroup >
                        <Label for="username" md={2}>Username</Label>
                        <Col md={2}>
                            <Input onChange={this.setUsername} value={this.state.username} type="text" name="username" id="username" placeholder="Input your username"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password" md={2}>Password</Label>
                        <Col md={2}>
                            <Input onChange={this.setPassword} value={this.state.password} type="password" name="password" id="password"/>
                        </Col>
                    </FormGroup>
                    <Col md={2}><Button color="secondary">Login</Button>
                    </Col>
                    
                </Form>
                <Toast isOpen={this.state.isError}>
                    <ToastHeader icon="danger" toggle={this.clearError}>
                    Error!
                    </ToastHeader>
                    <ToastBody>
                    {this.state.errorMessage}
                    </ToastBody>
                </Toast>
            </div>
        )
    }
}