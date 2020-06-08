import React from 'react';
import {BrowserRouter as Router,Switch,Route, Redirect} from 'react-router-dom'
import User from './Models/User';
import { Login } from './Components/Login';
import { EmployeeHome } from './Components/EmployeeHome';
import { NavBarComponent } from './Components/NavBar';
import { UserComponent } from './Components/UserComponent';
import { ManagerHome } from './Components/ManagerHome';
import { Jumbotron } from 'reactstrap';



interface IAppState {
  user : User | null;
}

export class App extends React.Component<any,IAppState>{

  constructor(props:any){
    super(props)
    this.state = {
      user : null,
    }
  }
  logoutUser = () => {
    this.setState({
      user: null,
    })
  }
  updateUser = (user:User) => {
    this.setState({
      user: user,
    })
  }

  render () {
    return (
      <div>
        <Jumbotron>
          <h1>Expense Reimbursement System</h1>
          <h3>Hello {this.state.user ? this.state.user.getUsername() : 'guest'}</h3>
        </Jumbotron>
        <Router>
          <NavBarComponent user={this.state.user} logout={this.logoutUser} />
          <Switch>
            <Route exact path="/">
            {this.state.user ? (<Redirect to="/home"/>) : (<Redirect to="/login"/>) }
            </Route>
            <Route path="/login" 
            render={(props:any) => {
              return <Login {...props} user={this.state.user} updateUser={this.updateUser}/>
            }}/>
            <Route path="/home">
              {
                this.state.user && this.state.user.getRole() === "Finance Manager" ? <ManagerHome user={this.state.user}/> 
                : this.state.user  ? <EmployeeHome user={this.state.user} /> 
                : <Redirect to="/" />
              }
            </Route>
            <Route path="/user">
              {this.state.user ? <UserComponent user={this.state.user} updateUser={this.updateUser} /> : <Redirect to="/" />}
            </Route>
            <Route
              path="*"
              render={(props: any) => {
                return <Redirect to="/" />;
              }}
            ></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}


