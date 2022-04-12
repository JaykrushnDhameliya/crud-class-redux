import React, {Component} from 'react'
import 'antd/dist/antd.css';
import {Select} from 'antd';
import {toast} from "react-toastify";
import {useNavigate} from 'react-router-dom';

const myNavigate = (Component) => {
    return props => <Component {...props} navigate={useNavigate()}/>
};

const {Option} = Select

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onSubmit: false,
            // name: '',
            myData: {
                firstName: '',
                middleName: '',
                lastName: '',
                gender: '',
                Language: ''

            },
            storeData: JSON.parse(localStorage.getItem("LocalData")) || [],
            storeHobby: [],
            show: false,
            isEdit: null,
        };
    }

    btnSubmit = () => {


        this.setState({
            onSubmit: true
        })
        if (this.state.myData.firstName !== '' && this.state.myData.middleName !== '' && this.state.myData.lastName !== '' && this.state.myData.gender !== '' && this.state.myData.Language !== '' && this.state.storeHobby.length != 0) {

            this.state.myData['hobby'] = this.state.storeHobby;
            this.state.storeData.push(this.state.myData);

            // console.log("else")
            this.setState({
                storeData: [...this.state.storeData]
            });
            this.setState({
                myData: {firstName: "", middleName: "", lastName: "", gender: "", Language: ""},
                storeHobby: []
            });
            localStorage.setItem('LocalData', JSON.stringify(this.state.storeData));
            console.log(this.state);

            toast('🦄 Submit Form Successfully');

            this.props.navigate("/Two/0");

            document.title = 'Information Student'

        }

    };

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
    };
    handelChangeSelect = (e) => {
        console.log("e", e);
        this.setState({
            myData: {...this.state.myData, Language: e}
        })
    };

    render() {
        return (
            <>
                <div className="container" style={{width: "700px", backgroundColor: "cornsilk", border: "solid"}}>
                    <form>
                        <div>
                            <div>
                                <legend htmlFor="exampleFormControlInput1" className="form-label">First Name</legend>
                                <input type="text" value={this.state.myData.firstName} className="form-control"
                                       name="firstName" placeholder="enter first name"
                                       onChange={(e) => this.handelChange(e)}/>
                                {

                                    (this.state.onSubmit && this.state.myData.firstName === '') ? (
                                        <span style={{color: "red"}}>Please Enter FirstName</span>) : ""
                                }
                            </div>
                            <div>
                                <legend htmlFor="exampleFormControlInput1" className="form-label">Middle Name</legend>
                                <input type="text" value={this.state.myData.middleName} className="form-control"
                                       name="middleName"
                                       placeholder="enter middle name"
                                       onChange={(e) => this.handelChange(e)}/>
                                {
                                    (this.state.onSubmit && this.state.myData.middleName === '') ? (
                                        <span style={{color: "red"}}>Please Enter MiddleName</span>) : ""
                                }
                            </div>
                            <div>
                                <legend htmlFor="exampleFormControlInput1" className="form-label">Last Name</legend>
                                <input type="text" value={this.state.myData.lastName} className="form-control"
                                       name="lastName" placeholder="enter last name"
                                       onChange={(e) => this.handelChange(e)}/>
                            </div>
                            {
                                (this.state.onSubmit && this.state.myData.lastName === '') ? (
                                    <span style={{color: "red"}}>Please Enter LastName</span>) : ""
                            }
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
                            {
                                (this.state.onSubmit && this.state.myData.gender === '') ? (
                                    <span style={{color: "red"}}>Please Select Your Gender</span>) : ""
                            }
                        </div>
                        <legend>Hobby</legend>
                        <div>
                            {
                                (this.state.onSubmit && this.state.storeHobby.length == 0) ? (
                                    <span style={{color: "red"}}>Please Select Your Hobby</span>) : ""
                            }
                        </div>
                        <div className="form-check mx-3">
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
                                style={{width: 200}}
                                value={this.state.myData.Language ? this.state.myData.Language : ""}
                                placeholder="Select Your Language"
                                onChange={this.handelChangeSelect}
                            >
                                <Option value={""} disabled>---select one---</Option>
                                <Option value="Gujarati">Gujarati</Option>
                                <Option value="English">English</Option>
                                <Option value="Hindi">Hindi</Option>
                            </Select>
                            {
                                (this.state.onSubmit && this.state.myData.Language === '') ? (
                                    <span style={{color: "red"}}>Please Select Your Language</span>) : ""
                            }
                        </div>

                    </form>
                    <div className="d-grid gap-2 col-2 mx-auto">
                        <button className="btn btn-primary" onClick={() => this.btnSubmit()}>submit</button>
                        <br/>
                    </div>

                    <div>
                    </div>
                </div>
            </>
        )

    }

}

export default myNavigate(Form);