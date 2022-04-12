import React, {Component} from 'react';
import {useNavigate} from 'react-router-dom';
import {Select} from "antd";
import {toast} from "react-toastify";

const {Option} = Select

const myNavigate = (Component) => {
    return props => <Component {...props} navigate={useNavigate()}/>
}

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.title,
            myData: {},
            storeData: JSON.parse(localStorage.getItem("LocalData")) || [],
            storeHobby: [],
            show: false,
            isEdit: null,
            id: ''
        };
        console.log("storedata", this.state.storeData)

    }
    componentDidMount() {
        const splitPath = window.location.pathname.split('/');
        const id = splitPath[splitPath.length - 1]
        console.log("id", id)
        this.setState({
            myData: this.state.storeData[id],
            storeHobby: this.state.storeData[id].hobby,
            id: id
        })
    }

    btnSubmit = () => {

        if (this.state.id != null) {
            this.state.storeData[this.state.id] = this.state.myData;
            this.setState({
                storeData: [...this.state.storeData],
            })
        } else {

            this.state.myData['hobby'] = this.state.storeHobby
            this.state.storeData.push(this.state.myData);
            this.setState({
                storeData: [...this.state.storeData]
            })
        }
        this.setState({
            myData: {firstName: "", middleName: "", lastName: "", gender: "", Language: ""},
            storeHobby: []
        })
        localStorage.setItem('LocalData', JSON.stringify(this.state.storeData));
        console.log(this.state);
        toast(`🦄 ${this.state.id} Line Edit Form Successfully`)

        this.props.navigate("/Two/0")

        document.title = "Edit successfully"
    }

    handelChange = (event) => {
        console.log("event-------->", event)
        console.log("event.target.name-------->", event.target.name)
        console.log("event.target.value-------->", event.target.value)
        console.log("event.target.checked----->", event.target.checked)

        if (event.target.name === 'hobby') {
            if (event.target.checked) {
                const store = this.state.storeHobby
                store.push(event.target.value)
                console.log("store---------->", store)
                this.setState({
                    storeHobby: store
                })

            } else {
                const uncheckedIndex = this.state.storeHobby.indexOf(event.target.value);
                this.state.storeHobby.splice(uncheckedIndex, 1)
                this.setState({
                    storeHobby: this.state.storeHobby
                })
                console.log("uncheckedIndex------>", uncheckedIndex)
            }
        } else {

            this.setState({
                myData: {...this.state.myData, [event.target.name]: event.target.value}
            });


        }
    }
    handelChangeSelect = (e) => {
        console.log("e", e)
        this.setState({
            myData: {...this.state.myData, Language: e}
        })
    }

    columns = [
        {
            title: 'FirstName',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'MiddleName',
            dataIndex: 'middleName',
            key: 'middleName',
        },
        {
            title: 'LastName',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Hobby',
            dataIndex: 'hobby',
            key: 'hobby',
        },
        {
            title: 'Language',
            dataIndex: 'Language',
            key: 'language',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => {
                return (
                    <>

                        <button onClick={() => this.onEdit(index)}>
                            <a className="edit" data-toggle="modal"><i
                                className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a></button>
                        <button onClick={() => this.onDelete(index)}><a className="delete"
                                                                        data-toggle="modal"><i
                            className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a></button>

                    </>

                )

            }

        },
    ];

    render() {
        return (
            <>
                <h1 className="text-center">Edit Form</h1>
                <div className="container" style={{width: "min-content", backgroundColor: "cornsilk", border: "solid"}}>
                    <form>
                        <div>

                            <legend htmlFor="exampleFormControlInput1" className="form-label">First Name</legend>
                            <input type="text" value={this.state.myData.firstName} className="form-control"
                                   name="firstName" placeholder="enter first name"
                                   onChange={(e) => this.handelChange(e)}/>

                            <legend htmlFor="exampleFormControlInput1" className="form-label">Middle Name</legend>
                            <input type="text" value={this.state.myData.middleName} className="form-control"
                                   name="middleName"
                                   placeholder="enter middle name"
                                   onChange={(e) => this.handelChange(e)}/>
                            <legend htmlFor="exampleFormControlInput1" className="form-label">Last Name</legend>
                            <input type="text" value={this.state.myData.lastName} className="form-control"
                                   name="lastName" placeholder="enter last name"
                                   onChange={(e) => this.handelChange(e)}/>

                        </div>
                        <legend>Gender</legend>
                        <div className="d-flex ">
                            <div className="form-check mx-3">
                                <input className="form-check-input" type="radio" name="gender" id="exampleRadios1"
                                       checked={this.state.myData.gender === "male"} value="male"
                                       onChange={(e) => this.handelChange(e)}/>
                                <label className="form-check-label" htmlFor="male">
                                    Male
                                </label>
                            </div>
                            <div className="form-check mx-3">
                                <input className="form-check-input" type="radio" name="gender" id="exampleRadios2"
                                       checked={this.state.myData.gender === "female"} value="female"
                                       onChange={(e) => this.handelChange(e)}/>
                                <label className="form-check-label" htmlFor="female">
                                    Female
                                </label>
                            </div>
                            <div className="form-check mx-3">
                                <input className="form-check-input" type="radio" name="gender" id="exampleRadios3"
                                       checked={this.state.myData.gender === "other"} value="other"
                                       onChange={(e) => this.handelChange(e)}/>
                                <label className="form-check-label" htmlFor="other">
                                    Other
                                </label>
                            </div>
                        </div>
                        <legend>Hobby</legend>
                        <div className="form-check mx-3">
                            {console.log(this.state.myData)}
                            <input className="form-check-input" type="checkbox" name="hobby" value="Playing"
                                   id="flexCheckDefault" checked={this.state.storeHobby.includes('Playing')}
                                   onChange={(e) => this.handelChange(e)}/>
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Playing
                            </label>
                        </div>
                        <div className="form-check mx-3">
                            <input className="form-check-input" type="checkbox" name="hobby" value="Singing"
                                   id="flexCheckDefault" checked={this.state.storeHobby.includes('Singing')}
                                   onChange={(e) => this.handelChange(e)}/>
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Singing
                            </label>
                        </div>
                        <div className="form-check mx-3">
                            <input className="form-check-input" type="checkbox" name="hobby" value="Reading"
                                   id="flexCheckDefault" checked={this.state.storeHobby.includes('Reading')}
                                   onChange={(e) => this.handelChange(e)}/>
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Reading
                            </label>
                        </div>
                        <div className="form-check mx-3">
                            <input className="form-check-input" type="checkbox" name="hobby" value="Writing"
                                   id="flexCheckDefault" checked={this.state.storeHobby.includes('Writing')}
                                   onChange={(e) => this.handelChange(e)}/>
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Writing
                            </label>
                        </div>
                        <div className="form-check">
                            <Select
                                name="Language"
                                value={this.state.myData.Language ? this.state.myData.Language : ""}
                                style={{width: 200}}
                                placeholder="Select Your Language"
                                onChange={this.handelChangeSelect}
                            >
                                <Option value={""} disabled>---select one---</Option>
                                <Option value="Gujarati">Gujarati</Option>
                                <Option value="English">English</Option>
                                <Option value="Hindi">Hindi</Option>
                            </Select>

                        </div>


                    </form>
                    <div className="d-grid gap-2 col-2 mx-auto">
                        <button className="btn btn-primary" onClick={() => this.btnSubmit()}> submit</button>
                        <br/>
                    </div>
                </div>
            </>
        )
    }
}

export default myNavigate(Edit);