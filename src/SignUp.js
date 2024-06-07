import React from "react";
import Login from "./LogIn";
import {sendApiPostRequest} from "./ApiRequests";

class SignUp extends React.Component {
    state = {
        username: "",
        password: "",
        repeatPassword: "",
        degreeStudiesName: "",
        signUpSuccess: false,
        message: "",
    }

    signUp = () => sendApiPostRequest("http://localhost:9124/sign-up", {
        username: this.state.username,
        password: this.state.password,
        repeatPassword: this.state.repeatPassword,
        degreeName: this.state.degreeStudiesName,
    }, (response) => {
        if (response.data.success) {
            this.setState({signUpSuccess: true});
            this.setState({message: "Successfully sign Up"});
        } else {
            if (response.data.errorCode === 1)
                this.setState({message: "No username"});
            if (response.data.errorCode === 2)
                this.setState({message: "No password"});
            if (response.data.errorCode === 4)
                this.setState({message: "No repeat password"});
            if (response.data.errorCode === 7)
                this.setState({message: "Username taken"});
            if (response.data.errorCode === 6)
                this.setState({message: "No degree name"});
            if (response.data.errorCode === 5)
                this.setState({message: "The passwords not equals"});
        }

    })

    onChaneValue = (key, event) => {
        this.setState({
            [key]: event.target.value
        })
    }


    render() {
        return (
            <div>
                {!this.state.signUpSuccess ?
                    <div style={{background: "#5f5065"}}>
                        <button style={{width: 30}} onClick={this.props.goBack}>{"<"}</button>
                        <div className="App-header">
                            <div>
                                <header>Sign Up</header>
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
                                <input placeholder={"Repeat password"}
                                       type={"password"}
                                       value={this.state.repeatPassword}
                                       onChange={event => this.onChaneValue("repeatPassword", event)}

                                />
                            </div>
                            <div>
                                <input placeholder={"Enter degree name"}
                                       type={"text"}
                                       value={this.state.degreeStudiesName}
                                       onChange={event => this.onChaneValue("degreeStudiesName", event)}

                                />
                            </div>
                            <div>
                                <button onClick={this.signUp}>Submit</button>
                            </div>
                            <div>
                                {this.state.message}
                            </div>
                        </div>
                    </div>
                    :
                    <Login goBack={() => this.setState({signUpSuccess: !this.state.signUpSuccess})}> < /Login>
                }
            </div>
        );
    }
}

export default SignUp;