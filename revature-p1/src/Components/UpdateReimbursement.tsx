import React from 'react';
import { Form, FormGroup, Col, Label, CustomInput, Input, Button, Toast, ToastHeader, ToastBody } from 'reactstrap';
import User from '../Models/User';
import { updateReimbursementStatus } from '../API/ReimbursementClient';

interface IUpdateReimbursementComponentProps {
    user : User | null;
    updateReim : () => void;
}

interface IUpdateReimbursementComponentState {
    reimbursementId : number;
    status : string;
    dateRes : string;
    isError : boolean;
    errorMessage : string
}
export class UpdateReimbursementComponent extends React.Component<IUpdateReimbursementComponentProps,IUpdateReimbursementComponentState> {
    constructor(props:IUpdateReimbursementComponentProps) {
        super(props);
        this.state = {
            reimbursementId: 0,
            status : '',
            dateRes : '',
            isError : false,
            errorMessage : ''
        }
    }

    setStatus = (event:any) => {
        this.setState({
            status : event.target.value
        })
    }

    setDateResolved = (event:any) => {
        this.setState({
            dateRes : event.target.value
        })
    }

    setReimbursementId = (event:any) => {
        this.setState({
            reimbursementId : +event.target.value
        })
    }

    handleOnSubmit = async (event:any) => {
        event.preventDefault() 
        if(isNaN(this.state.reimbursementId)){
            this.setState({
                isError: true,
                errorMessage : 'Reimbursement Id must be a number'
            })
        }
        else if(!this.state.reimbursementId || !this.state.status || !this.state.dateRes){
            this.setState({
                isError : true,
                errorMessage : "Must have all values",
            })
        }
        else{
            try{
                if(this.props.user) {
                    await updateReimbursementStatus(this.state.reimbursementId,this.props.user,this.state.status,this.state.dateRes)
                    this.props.updateReim();
                    this.setState({
                        reimbursementId: 0,
                        status : '',
                        dateRes : '',
                    })
                }
            }catch(err) {
                this.setState({
                    reimbursementId : 0,
                    status : '',
                    dateRes : '',
                    isError : true,
                    errorMessage : err.message
                })
            }
        }
    }

    clearError = () => {
        this.setState({
            isError : false,
            errorMessage : ''
        })
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleOnSubmit}>
                    <FormGroup row>
                        <Col md={{size: 4}}>
                            <Label for="reimbursementId">Reimbursement Id</Label>
                        </Col>
                        <Col md={{size: 8}}>
                            <Input onChange={this.setReimbursementId}  type="text" id="reimbursementId" name="reimbursementId"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={{size: 4}}>
                           <Label for="status">Status</Label> 
                        </Col>
                        <Col md={{size: 8}}>
                            <CustomInput onChange={this.setStatus} value={this.state.status} type="select" id="status" name="customSelect">
                            <option value="">Select</option>
                            <option value="Approved">Approved</option>
                            <option value="Denied">Denied</option>
                        </CustomInput>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={{size: 4}}>
                           <Label for="date_res" >Date</Label> 
                        </Col>
                        <Col md={{size: 8}}>
                            <Input onChange={this.setDateResolved} value={this.state.dateRes} type="date" name="date_res" id="date_res"/>
                        </Col>
                    </FormGroup>
                    <Button color="secondary">Update Reimbursement</Button>
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