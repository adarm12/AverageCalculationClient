import React from "react";
import {sendApiPostRequest} from "./ApiRequests";
import EditGrade from "./EditGrade";
import DeleteGrade from "./DeletGrade";

class ShowGrades extends React.Component {
    state = {
        gradesList: null,
        average: null,
        message: "",
        userSecret: "",
        courseName: "",
        coursePoints: "",
        courseGrade: "",
        edit: false,
        delete: false,
    }

    componentDidMount() {
        this.gradesList();
        this.refreshInterval = setInterval(() => {
            this.gradesList();
        }, 5000);

    }

    componentWillUnmount() {
        clearInterval(this.refreshInterval);
    }

    gradesList = () => sendApiPostRequest("http://localhost:9124/grades", {
            userSecret: this.props.stateFromLogin.secret,
        },
        (response) => {
            if (response.data.success) {
                this.setState({gradesList: response.data.grades});
                this.setState({average: response.data.average});
            } else {
                if (response.data.errorCode === 13)
                    this.setState({message: "No grades yet"});
            }
        })

    render() {
        return (
            <div>
                {!this.state.edit && !this.state.delete ?
                    <div style={{background: "#5f5065"}}>
                        <button style={{width: 30}} onClick={this.props.goBack}> {"<"}</button>
                        {this.state.gradesList !== null ?
                            <div className="App-header">
                                <header>Your Grades</header>
                                <table>
                                    <thead>
                                    <tr>
                                        <td>Course Name</td>
                                        <td>Course Points</td>
                                        <td>Course Grade</td>
                                    </tr>
                                    </thead>
                                    {this.state.gradesList.map((grades, index) => (
                                            <tbody>
                                            <tr key={index}></tr>
                                            <td>{grades.courseName}</td>
                                            <td>{grades.coursePoints}</td>
                                            <td>{grades.courseGrade}</td>
                                            <td>
                                                <button style={{width: 50}} onClick={() => this.setState({
                                                    edit: true,
                                                    userSecret: this.props.stateFromLogin.secret,
                                                    courseName: grades.courseName,
                                                    coursePoints: grades.coursePoints,
                                                    courseGrade: grades.courseGrade,
                                                })}>
                                                    Edit
                                                </button>
                                                <button style={{width: 70}} onClick={() => this.setState({
                                                    delete: true,
                                                    userSecret: this.props.stateFromLogin.secret,
                                                    courseName: grades.courseName,
                                                })}>
                                                    Delete
                                                </button>
                                            </td>
                                            </tbody>
                                        )
                                    )}
                                </table>
                                Your current average: {this.state.average.toFixed(3)}
                            </div>
                            :
                            <div className="App-header">
                                <header>
                                    {this.state.message}
                                </header>
                            </div>
                        }
                    </div>
                    :
                    <div>
                        {this.state.edit ?
                            <EditGrade stateFromShow={this.state}
                                       goBack={() => this.setState({edit: false})}>
                            </EditGrade>
                            :
                            <div>
                            </div>
                        }
                        {this.state.delete ?
                            <DeleteGrade secretFromShow={this.state.userSecret}
                                         courseName={this.state.courseName}
                                         goBack={() => this.setState({delete: false})}>
                            </DeleteGrade>
                            :
                            <div>
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }
}

export default ShowGrades;