import React from "react";
import './App.css';
import SignUp from "./SignUp";
import Login from "./LogIn";

class App extends React.Component {
    state = {
        showButtons: true,
        signUp: false,
        logIn: false,
    }

    goBack = () => {
        this.setState({showButtons: !this.state.showButtons})
        if (this.state.signUp)
            this.setState({signUp: !this.state.signUp})
        else if (this.state.logIn)
            this.setState({logIn: !this.state.logIn})
    }


    render() {
        return (
            <div>
                {this.state.showButtons ?
                    <div className="App-header">
                        <div>
                            <header>Welcome To Average Calculation</header>
                        </div>
                        <div>
                            <button onClick={() =>
                                this.setState({signUp: true, showButtons: false})}>Sign Up
                            </button>
                        </div>
                        <div>
                            <button onClick={() =>
                                this.setState({logIn: true, showButtons: false})}>Log In
                            </button>
                        </div>
                    </div>
                    :
                    <div>
                        {this.state.signUp ?
                            <SignUp goBack={this.goBack}></SignUp>
                            :
                            <div></div>
                        }
                        {this.state.logIn ?
                            <Login goBack={this.goBack}></Login>
                            :
                            <div></div>
                        }
                    </div>
                }
            </div>
        );
    }
}

export default App;
