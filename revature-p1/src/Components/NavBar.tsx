import React from 'react';
import { Navbar, Nav, NavItem, Dropdown, DropdownMenu, DropdownItem, DropdownToggle} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import User from '../Models/User';


interface NavBarcomponentProps {
    user : User | null;
    logout : () => void;
}
interface NavBarComponentState {
    isDropdown : boolean;
}

export class NavBarComponent extends React.Component<NavBarcomponentProps,NavBarComponentState> {
    constructor(props:any){
        super(props);
        this.state = {
            isDropdown : false
        }
    }

    setDropdown = () => {
        this.setState({
            isDropdown: !this.state.isDropdown
        })
    }
    render() {
        return (
            <div>
                <Navbar className="navbar nav-pills" color="light" expand="md">
                    <Nav className="navbar-nav" navbar>
                        <NavItem>
                            <NavLink hidden={!this.props.user} className="nav-link" to="/home">Home</NavLink>
                        </NavItem>
                        <Dropdown hidden={!this.props.user} nav isOpen={this.state.isDropdown} toggle={this.setDropdown}> 
                            <DropdownToggle nav caret>
                                User
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem tag={NavLink} to="/user">Account</DropdownItem>
                                <DropdownItem onClick={this.props.logout} >Logout</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <NavItem>
                            <NavLink hidden={!!this.props.user} className="nav-link" to="/login">Login</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}