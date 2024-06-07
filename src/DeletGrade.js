import React from "react";
import {sendApiPostRequest} from "./ApiRequests";

class DeleteGrade extends React.Component {
    state = {
        deleteSuccess: false,
        message: "",
    }

    componentDidMount() {
        this.deleteGrade();
    }


    deleteGrade = () => sendApiPostRequest("http://localhost:9124/delete-grade", {
            courseName: this.props.courseName,
            userSecret: this.props.secretFromShow,
        },
        (response) => {
            if (response.data === true) {
                this.setState({deleteSuccess: true});
                this.setState({message: "The grade successfully deleted"});

            }
        })

    render() {
        return (
            <div style={{background: "#5f5065"}}>
                <button style={{width: 30}} onClick={this.props.goBack}>{"<"}</button>
                <div className="App-header">
                    {this.state.message}
                </div>
            </div>
        );
    }
}

export default DeleteGrade;