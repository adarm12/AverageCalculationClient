import React from "react";
import {sendApiPostRequest} from "./ApiRequests";

class AddGrade extends React.Component {
    state = {
        courseName: null,
        courseGrade: null,
        coursePoints: null,
        addGradeSuccess: false,
        errorCode: "",
    }

    addGrade = () => sendApiPostRequest("http://localhost:9124/add-grade", {
            courseName: this.state.courseName,
            courseGrade: this.state.courseGrade,
            coursePoints: this.state.coursePoints,
            userSecret: this.props.stateFromLogin.secret,
        },
        (response) => {
            if (response.data.success) {
                this.setState({addGradeSuccess: true});
            }
            this.setState({errorCode: response.data.errorCode});
        })

    showErrorCode = () => {
        let errorMessage = "";
        switch (this.state.errorCode) {
            case 10:
                errorMessage = "No course name";
                break;
            case 9:
                errorMessage = "No course grade";
                break;
            case 8:
                errorMessage = "No course points";
                break;
            case 12:
                errorMessage = "Course Points must be 1-5";
                break;
            case 11:
                errorMessage = "Course grade must be 0-100";
                break;
            case 16:
                errorMessage = "Course name is taken";
                break;
            case 0:
                errorMessage = "The grade added successfully";
                break;
        }
        return errorMessage;
    }

    onChaneValue = (key, event) => {
        this.setState({
            [key]: event.target.value
        })
    }


    render() {
        return (
            <div style={{background: "#5f5065"}}>
                <button style={{width: 30}} onClick={this.props.goBack}>{"<"}</button>
                <div className="App-header">
                    <div>
                        <header>Add Grade</header>
                    </div>
                    <div>
                        <input placeholder={"Enter course name"}
                               value={this.state.courseName}
                               type={"text"}
                               onChange={event => this.onChaneValue("courseName", event)}
                        />
                    </div>
                    <div>
                        <input placeholder={"Enter course points"}
                               value={this.state.coursePoints}
                               type={"number"}
                               onChange={event => this.onChaneValue("coursePoints", event)}
                        />
                    </div>
                    <div>
                        <input placeholder={"Enter grade"}
                               value={this.state.courseGrade}
                               type={"number"}
                               onChange={event => this.onChaneValue("courseGrade", event)}
                        />
                    </div>
                    {this.showErrorCode()}
                    <div>
                        <button onClick={this.addGrade}>Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddGrade;