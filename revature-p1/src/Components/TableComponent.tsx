import React, { ReactNode } from 'react';
import { Col, Table } from 'reactstrap';



interface ITableComponentProps {
    colSize : number;
    isUsers : boolean;
    displayTable : () => ReactNode;
}

export class TableComponent extends React.Component<ITableComponentProps,any> {
    constructor(props: ITableComponentProps) {
        super(props)
        this.state = {
            
        }
    }

    displayReim  = () => {
        return (
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
        )
    }

    displayUser = () => {
        return (
            <thead>
                <tr>
                    <th>id</th>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
            </thead>
        )
    }
    render() {
        return (
            <Col md={{size: this.props.colSize}}>  
                <Table className="table-light" color="primary" striped responsive>
                    {this.props.isUsers ? this.displayUser() : this.displayReim()}
                    <tbody>
                        {this.props.displayTable()}
                    </tbody>
                </Table> 
            </Col>
        )
    }
}