import React from "react";
import AddGrade from "./AddGrade";
import ShowGrades from "./ShowGrades";
import {sendApiPostRequest} from "./ApiRequests";

class Login extends React.Component {

    state = {
        username: "",
        password: "",
        showButtons: false,
        addGrade: false,
        showGrades: false,
        logInSuccess: false,
        data: "",
        message: "",
    }

    logIn = () => sendApiPostRequest("http://localhost:9124/login", {
        username: this.state.username,
        password: this.state.password,
    }, (response) => {
        if (response.data.success) {
            this.setState({showButtons: true});
            this.setState({data: response.data.user});
            this.setState({message: "Successfully log In"});
        } else {
            if (response.data.errorCode === 1)
                this.setState({message: "No username"});
            if (response.data.errorCode === 2)
                this.setState({message: "No password"});
            if (response.data.errorCode === 7)
                this.setState({message: "No such user"});
        }

    })

    onChaneValue = (key, event) => {
        this.setState({
            [key]: event.target.value
        })
    }

    goBack = () => {
        this.setState({showButtons: true})
        if (this.state.addGrade)
            this.setState({addGrade: false})
        else if (this.state.showGrades)
            this.setState({showGrades: false})
    }


    render() {
        return (
            <div>
                {!this.state.showButtons ?
                    <div style={{background: "#5f5065"}}>
                        <button style={{width:30}} onClick={this.props.goBack}>{"<"}</button>
                        <div className="App-header">
                            <div>
                                <header>Log In</header>
                            </div>
                            <div>
                                <input placeholder={"Enter username"}
                                       type={"text"}
                                       value={this.state.username}
                                       onChange={event => this.onChaneValue("username", event)}
                                />
                            </div>
                            <div>
                                <input placeholder={"Enter password"}
                                       type={"password"}
                                       value={this.state.password}
                                       onChange={event => this.onChaneValue("password", event)}
                                />
                            </div>
                            <div>
                                <button onClick={this.logIn}>Submit</button>
                            </div>
                            <div>
                                {this.state.message}
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        {!this.state.showGrades && !this.state.addGrade ?
                            <div style={{background: "#5f5065"}}>
                                <button style={{width:30}} onClick={() =>
                                    this.setState({showButtons: !this.state.showButtons})}> {"<"}
                                </button>
                                <div className="App-header">
                                    <header>Welcome {this.state.data.username}</header>
                                    <div>
                                        <button style={{width: 180}}
                                                onClick={() =>
                                                    this.setState({addGrade: true})}>Add grade
                                        </button>
                                    </div>
                                    <div>
                                        <button style={{width: 180}}
                                                onClick={() =>
                                                    this.setState({showGrades: true})}>Show my grades
                                        </button>
                                    </div>
                                </div>
                            </div>
                            :
                            <div>
                                {this.state.showGrades ?
                                    <ShowGrades stateFromLogin={this.state.data}
                                                goBack={this.goBack}
                                    ></ShowGrades>
                                    :
                                    <div></div>
                                }
                                {this.state.addGrade ?
                                    <AddGrade stateFromLogin={this.state.data}
                                              goBack={this.goBack}
                                    ></AddGrade>
                                    :
                                    <div></div>
                                }
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }
}


export default Login;