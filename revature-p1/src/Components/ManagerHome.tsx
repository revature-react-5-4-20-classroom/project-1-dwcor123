import React from 'react';
import User from '../Models/User';
import Reimbursement from '../Models/Reimbursement';
import { Container, Row, Col, Button, CustomInput, Input } from 'reactstrap';
import { getAllUsers } from '../API/UserClient';
import { getAllReimbursementsById } from '../API/ReimbursementClient';
import { TableComponent } from './TableComponent';
import { NewReimbursement } from './NewReimbursement';
import { UpdateReimbursementComponent } from './UpdateReimbursement';


interface IManagerHomeProps {
    user : User | null,
}

interface IManagerHomeState {
    reimbursements: Reimbursement[];
    users : User[];
    displayNewReim: boolean;
    colSize: number;
    statusValue: string;
    searchId: number;
}

export class ManagerHome extends React.Component<IManagerHomeProps,IManagerHomeState> {

    constructor(props:IManagerHomeProps) {
        super(props)
        this.state = {
            reimbursements : [],
            users : [],
            displayNewReim : false,
            colSize : 12,
            statusValue : '',
            searchId : 0,
        }
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

    setUsers = async () => {
        this.setState({
            users : await getAllUsers()
        })
    }

    setReimbursements = async () => {
        let reimbursementArray : Reimbursement[] = []
        for(let user of this.state.users){
            let response : Reimbursement[] = await getAllReimbursementsById(user.getUserId())
            for(let reim of response){
                reimbursementArray.push(reim)
            }
        }
        this.setState({
            reimbursements : reimbursementArray
        })
    }

    async componentDidMount() {
        await this.setUsers();
        await this.setReimbursements();
    }

    displayUsers = () => {
        return this.state.users.map( (user) => {
            let fullName = `${user.getLastName()}, ${user.getFirstName()}`
            return (
                <tr key={user.getUserId()}>
                    <th scope="row">{user.getUserId()}</th>
                    <td>{user.getUsername()}</td>
                    <td>{fullName}</td>
                    <td>{user.getEmail()}</td>
                    <td>{user.getRole()}</td>
                </tr>
            )
        })
    }

    displayReimbursements = () => {
        return (
            <>
                {this.state.reimbursements.map((reim) => {
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
                    if(author.getUserId() === this.state.searchId || this.state.searchId === 0) {
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
                    }else{
                        return;
                    }
                     
                })}
            </>
        )
    }

    setSearchId = (id:any) => {
        this.setState({
            searchId : +id.target.value,
        })
    }

    updateReimbursements = async () => {
        if(this.props.user){
            this.setReimbursements()
        }
    }

    render() {
        return (
            <>
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
                        <Col md={{size:2}}>
                            <Input onChange={this.setSearchId} placeholder={"Search User Id"}  />
                        </Col>
                    </Row>
                    <Row>
                        <TableComponent colSize={this.state.colSize} isUsers={false} displayTable={this.displayReimbursements} />
                        <Col md={{size:4}}>
                            {this.state.displayNewReim ? <NewReimbursement updateReim={this.updateReimbursements} user={this.props.user}/> : <></>}
                            <p></p>
                            {this.state.displayNewReim ? <UpdateReimbursementComponent user={this.props.user} updateReim={this.updateReimbursements}/> : <></>}
                        </Col>  
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col md={{size: 2}}>
                            <h5>All Users</h5>
                        </Col>
                    </Row>
                    <Row>
                        <TableComponent colSize={this.state.colSize} isUsers={true} displayTable={this.displayUsers} />
                    </Row>
                </Container>
            </>
        )
    }
}