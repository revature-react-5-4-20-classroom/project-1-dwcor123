import React from 'react';
import User from '../Models/User';
import { Form, FormGroup, Label, Col, Input, CustomInput, Button, Toast, ToastHeader, ToastBody } from 'reactstrap';
import { addNewReimbursement } from '../API/ReimbursementClient';

interface INewReimbursementProps {
    user : User | null;
    updateReim : () => void;
}

interface INewReimbursementState {
    amount : number;
    date : string;
    type : string;
    description : string;
    isError : boolean;
    errorMessage : string;
}

export class NewReimbursement extends React.Component<INewReimbursementProps,INewReimbursementState>{
    constructor(props:INewReimbursementProps){
        super(props)
        this.state = {
            amount : 0,
            date : '',
            type : '',
            description : '',
            isError : false,
            errorMessage : '',
        }
    }

    handleClick = async (event:any) => {
        event.preventDefault();
        if(!this.state.amount || !this.state.date || !this.state.type || !this.state.description){
            this.setState({
                isError : true,
                errorMessage : "Must have all values",
            })
        }
        else{
            try{
                if(this.props.user){
                    await addNewReimbursement(this.props.user,this.state.amount,this.state.date,this.state.type,this.state.description);
                    this.props.updateReim();
                    this.setState({
                        amount : 0,
                        date : '',
                        type : '',
                        description : '',
                    })
                }
            }catch(err){
                this.setState({
                    amount : 0,
                    date : '',
                    type : '',
                    description : '',
                    isError : true,
                    errorMessage : err.message
                })
            }
        }
            
    }

    setAmount = (amount:any) => {
        this.setState({
            amount : amount.target.value
        })
    }

    setDate = (date:any) => {
        this.setState({
            date : date.target.value
        })
    }

    setType = (type:any) => {
        this.setState({
            type : type.target.value
        })
    }

    setDescription = (description:any) => {
        this.setState({
            description : description.target.value
        })
    }

    clearError = () => {
        this.setState({
            isError :false,
            errorMessage: ''
        })
    }
    render() {
        return (
            <div>
                <Form onSubmit={this.handleClick}>
                    <FormGroup row>
                        <Col md={{size: 3}}>
                        <Label for="amount">Amount</Label>
                        </Col>
                        <Col md={{size: 9}}>
                            <Input onChange={this.setAmount} value={this.state.amount} type="number" name="amount" id="amount"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={{size: 3}}>
                           <Label for="date_sub" >Date</Label> 
                        </Col>
                        <Col md={{size: 9}}>
                            <Input onChange={this.setDate} value={this.state.date} type="date" name="date_sub" id="date_sub"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={{size: 3}}>
                           <Label for="reim_type">Type</Label> 
                        </Col>
                        <Col md={{size: 9}}>
                            <CustomInput onChange={this.setType} value={this.state.type} type="select" id="reim_type" name="customSelect">
                            <option value="">Select</option>
                            <option value="Food">Food</option>
                            <option value="Travel">Travel</option>
                            <option value="Lodging">Lodging</option>
                            <option value="Other">Other</option>
                        </CustomInput>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={{size: 3}}>
                            <Label for="description">Description</Label>
                        </Col>
                        <Col md={{size: 9}}>
                            <Input onChange={this.setDescription} value={this.state.description} type="textarea" name="description" id="description"/>
                        </Col>
                    </FormGroup>
                    <Button color="secondary">New Reimbursement</Button>
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