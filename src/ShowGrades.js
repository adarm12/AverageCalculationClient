import React from "react";
import {sendApiPostRequest} from "./ApiRequests";
import EditGrade from "./EditGrade";
import DeleteGrade from "./DeletGrade";
import {FaEdit, FaTrash, FaSortUp, FaSortDown, FaSearch} from "react-icons/fa";

class ShowGrades extends React.Component {
    state = {
        gradesList: null,
        average: null,
        userSecret: "",
        courseName: "",
        courseNameToSearch: "",
        coursePoints: "",
        courseGrade: "",
        edit: false,
        delete: false,
        search: false,
        message: "",
    }

    componentDidMount() {
        this.gradesList();
    }

    gradesList = () => sendApiPostRequest("http://localhost:9124/grades", {
            userSecret: this.props.stateFromLogin.secret,
        },
        (response) => {
            if (response.data.success) {
                this.setState({gradesList: response.data.grades});
                this.setState({average: response.data.average});
            } else {
                this.setState({message: "No grades yet"});
            }
        })

    search = () => sendApiPostRequest("http://localhost:9124/search", {
            courseName: this.state.courseNameToSearch,
            userSecret: this.props.stateFromLogin.secret,
        },
        (response) => {
            if (response.data.success) {
                this.setState({gradesList: response.data.grades});
                this.setState({message: ""});
            } else {
                this.setState({gradesList: []});
                this.setState({message: "No search results"});
            }
        })

    onChaneValue = (key, event) => {
        this.setState({
            [key]: event.target.value
        })
    }

    goBack = () => {
        if (this.state.edit)
            this.setState({edit: false})
        if (this.state.delete)
            this.setState({delete: false})
        this.setState({gradesList: null})
        this.gradesList();
    }

    sortHighGrade = () => {
        const sort = [...this.state.gradesList].sort((a, b) =>
            b.courseGrade - a.courseGrade);
        this.setState({gradesList: sort})
    }

    sortLowGrade = () => {
        const sort = [...this.state.gradesList].sort((a, b) =>
            a.courseGrade - b.courseGrade);
        this.setState({gradesList: sort})
    }

    render() {
        return (
            <div>
                {!this.state.edit && !this.state.delete ?
                    <div style={{background: "#5f5065"}}>
                        <button style={{width: 30}} onClick={this.props.goBack}> {"<"}</button>
                        {this.state.gradesList !== null ?
                            <div>
                                <div>
                                    <button style={{width: 200, height: 22, fontSize: 15}}
                                            onClick={this.sortHighGrade}> {"Show Grades High - Low"}
                                        <FaSortUp/>
                                    </button>
                                </div>
                                <div>
                                    <button style={{width: 200, height: 22, fontSize: 15}}
                                            onClick={this.sortLowGrade}> {"Show Grades Low - High"}
                                        <FaSortDown/>
                                    </button>
                                </div>
                                <div className="App-header">
                                    <header>Your Grades</header>
                                    <div className="tableStyle">
                                        <table>
                                            <thead>
                                            <tr>
                                                {!this.state.search ?
                                                    <td>
                                                        Course Name
                                                        <button style={{width: 25, height: 22, fontSize: 15}}
                                                                onClick={() => this.setState({search: true})}>
                                                            <FaSearch/>
                                                        </button>
                                                    </td>
                                                    :
                                                    <td>
                                                        <input style={{width: 100, height: 22, fontSize: 15}}
                                                               placeholder={"Enter"}
                                                               type={"text"}
                                                               value={this.state.courseNameToSearch}
                                                               onChange={event => this.onChaneValue("courseNameToSearch", event)}
                                                        />
                                                        <button style={{width: 25, height: 22, fontSize: 15}}
                                                                onClick={this.search}>
                                                            <FaSearch/>
                                                        </button>
                                                    </td>
                                                }
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
                                                        <button style={{width: 30}} onClick={() => this.setState({
                                                            edit: true,
                                                            userSecret: this.props.stateFromLogin.secret,
                                                            courseName: grades.courseName,
                                                            coursePoints: grades.coursePoints,
                                                            courseGrade: grades.courseGrade,
                                                        })}>
                                                            <FaEdit/>
                                                        </button>
                                                        <button style={{width: 30}} onClick={() => this.setState({
                                                            delete: true,
                                                            userSecret: this.props.stateFromLogin.secret,
                                                            courseName: grades.courseName,
                                                        })}>
                                                            <FaTrash/>
                                                        </button>
                                                    </td>
                                                    </tbody>
                                                )
                                            )}
                                        </table>
                                    </div>
                                    <div>
                                        Your current average: {this.state.average.toFixed(3)}
                                    </div>
                                    <div>
                                        {this.state.message}
                                    </div>
                                </div>
                            </div>
                            :
                            <header className="App-header">
                                {this.state.message}
                            </header>
                        }
                    </div>
                    :
                    <div>
                        {this.state.edit ?
                            <EditGrade stateFromShow={this.state}
                                       goBack={this.goBack}>
                            </EditGrade>
                            :
                            <div>
                            </div>
                        }
                        {this.state.delete ?
                            <DeleteGrade secretFromShow={this.state.userSecret}
                                         courseName={this.state.courseName}
                                         goBack={this.goBack}>
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