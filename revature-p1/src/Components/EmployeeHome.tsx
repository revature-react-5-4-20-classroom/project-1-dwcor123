import React from 'react';
import User from '../Models/User';
import {Table, Button, Container, Row, Col, CustomInput} from 'reactstrap';
import { getAllReimbursementsById } from '../API/ReimbursementClient';
import Reimbursement from '../Models/Reimbursement';
import { NewReimbursement } from './NewReimbursement';

interface IEmployeeHomeProps {
    user: User | null,
}

interface IEmployeeHomeState{
    reimbursements: Reimbursement[];
    displayNewReim: boolean;
    colSize: number;
    statusValue: string;
}

export class EmployeeHome extends React.Component<IEmployeeHomeProps,IEmployeeHomeState> {
    constructor(props:IEmployeeHomeProps) {
        super(props);
        this.state = {
            reimbursements: [],
            displayNewReim: false,
            colSize: 12,
            statusValue: ''
        }
    }

    async componentDidMount() {
        if(this.props.user){
            this.setState({
            reimbursements : await getAllReimbursementsById(this.props.user.getUserId())
            })
        }
    }

    showReimbursements() {
        return this.state.reimbursements.map((reim) => {
            let author = reim.getAuthor();
            let resolver = reim.getResolver();
            let authorFull = `${author.getLastName()}, ${author.getFirstName()}`;
            let resolverFull;
            if(resolver?.getUserId()) {
                resolverFull = `${resolver.getLastName()}, ${resolver.getFirstName()}`
            }else{
                resolverFull = "None"
            }
            let dateRes = reim.getDateResolved() || "None";
            switch(this.state.statusValue) {
                case "":
                    return (<tr key={reim.getReimbursementId()}>
                        <th scope="row">{reim.getReimbursementId()}</th>
                        <td>{authorFull}</td>
                        <td>{reim.getAmount()}</td>
                        <td>{reim.getDateSubmitted()}</td>
                        <td>{dateRes}</td>
                        <td>{resolverFull}</td>
                        <td>{reim.getStatus()}</td>
                        <td>{reim.getType()}</td>
                        <td>{reim.getDescription()}</td>
                    </tr>
                )
                case "1":
                    if(reim.getStatus() !== "Pending"){
                        break;
                    }else{
                        return (<tr key={reim.getReimbursementId()}>
                                    <th scope="row">{reim.getReimbursementId()}</th>
                                    <td>{authorFull}</td>
                                    <td>{reim.getAmount()}</td>
                                    <td>{reim.getDateSubmitted()}</td>
                                    <td>{dateRes}</td>
                                    <td>{resolverFull}</td>
                                    <td>{reim.getStatus()}</td>
                                    <td>{reim.getType()}</td>
                                    <td>{reim.getDescription()}</td>
                                </tr>
                            )
                    }
                case "2":
                    if(reim.getStatus() !== "Denied"){
                        break;
                    }else{
                        return (<tr key={reim.getReimbursementId()}>
                                    <th scope="row">{reim.getReimbursementId()}</th>
                                    <td>{authorFull}</td>
                                    <td>{reim.getAmount()}</td>
                                    <td>{reim.getDateSubmitted()}</td>
                                    <td>{dateRes}</td>
                                    <td>{resolverFull}</td>
                                    <td>{reim.getStatus()}</td>
                                    <td>{reim.getType()}</td>
                                    <td>{reim.getDescription()}</td>
                                </tr>
                            )
                    }
                case "3":
                    if(reim.getStatus() !== "Approved"){
                        break;
                    }else{
                        return (<tr key={reim.getReimbursementId()}>
                                    <th scope="row">{reim.getReimbursementId()}</th>
                                    <td>{authorFull}</td>
                                    <td>{reim.getAmount()}</td>
                                    <td>{reim.getDateSubmitted()}</td>
                                    <td>{dateRes}</td>
                                    <td>{resolverFull}</td>
                                    <td>{reim.getStatus()}</td>
                                    <td>{reim.getType()}</td>
                                    <td>{reim.getDescription()}</td>
                                </tr>
                            )
                    }
            } 
        })
    }
    setStatusValue = (value:any) => {
        this.setState({
            statusValue : value.target.value
        })
    }
    handleOnClick = () => {
        this.setState({
            displayNewReim: !this.state.displayNewReim,
            colSize: this.state.colSize === 8 ? 12 : 8
        })
    }

    updateReimbursements = async () => {
        if(this.props.user){
            this.setState({
            reimbursements : await getAllReimbursementsById(this.props.user.getUserId())
        })
        }
    }

    render() {
        let home = null;
        if(this.props.user){
          home =  <div>
                <Container>
                    <Row>
                        <h3>Welcome to your Home, {this.props.user ? this.props.user.getFirstName() : 'guest'}</h3>
                    </Row>
                    <Row>
                        <Col md={{size: 2}}>
                            <h5>Reimbursements</h5>
                        </Col>
                        <Col md={{size:1}}>
                            <Button size="sm" onClick={this.handleOnClick}>+</Button>
                        </Col>
                        <Col md={{size:2}}>
                            <CustomInput onChange={this.setStatusValue} value={this.state.statusValue} type="select">
                                <option value="">All</option>
                                <option value="1">Pending</option>
                                <option value="2">Denied</option>
                                <option value="3">Approved</option>
                            </CustomInput>  
                        </Col>                         
                    </Row>
                    <Row>
                        <Col md={{size: this.state.colSize}}>  
                            <Table className="table-light" color="primary" striped responsive>
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Author</th>
                                        <th>Amount</th>
                                        <th>Date Submitted</th>
                                        <th>Date Resolved</th>
                                        <th>Resolver</th>
                                        <th>Status</th>
                                        <th>Type</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.showReimbursements()}
                                </tbody>
                            </Table> 
                        </Col>
                        <Col md={{size:4}}>
                            {this.state.displayNewReim ? <NewReimbursement updateReim={this.updateReimbursements} user={this.props.user}/> : <></>}
                        </Col>
                    </Row>
                </Container>
            </div>
        }else{
            home = <h3>Must login to view page</h3>
        }

        return (
            home
        )
    }
}