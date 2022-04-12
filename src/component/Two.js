import React, {Component} from 'react';
import {Table} from "antd";
import {useNavigate} from 'react-router-dom';
import {toast} from "react-toastify";
import {connect} from "react-redux";
import {loadUsers, deleteUser, editUser, DeleteMultiple} from "../redux/Action/Action";

const myNavigate1 = (Component) => {
    return props => <Component {...props} navigate={useNavigate()}/>
};

class Two extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.title,
            myData: {},
            storeData: [],
            storeHobby: [],
            select: [],
            checked: false,
            show: false,
            isEdit: null,
            id: ''

        };
        console.log("props", this.props)


    }


    componentDidMount() {
        this.props.getUsers();
    }

    onEdit = (i) => {
        this.props.navigate(`/edit/${i}`);
        toast(`🦄 ${this.state.id} Edit Form Open`)
        this.props.userEdited();

        document.title = 'Edit Student Details'
    }

    onDelete = (i) => {

        this.props.userDeleted(i);
        this.state.select = [];
        this.state.checked = false;
        console.log("61656565", this.state.select)
        toast(`🦄${i} Line Delete Successfully!`)
    }
    handelChange = (event) => {
        console.log(event)
        if (event.target.checked) {
            var Data = this.state.select;
            Data.push(event.target.name);
            this.setState({
                select: Data,
            })
            console.log("Data", Data)
        } else {
            let index = this.state.select.indexOf(event.target.name)
            // console.log("else====>",this.state.select)
            this.state.select.splice(index, 1)
            console.log("splice====>", this.state.select)

        }
    };

    // MultipleDeletes=()=>{
    //     // this.props.MultipleDelete(i);
    //   this.state.select.forEach((i)=>this.onDelete(i))
    //     this.state.select=[]
    //     // this.setState({
    //     //     select:[],
    //     // })
    //     console.log(this.state.select,"1231231123")
    //     // document.getElementById("inputbtn").checked=false
    // }

    columns = [
        {
            title: 'Select',
            key: 'select',
            render: (text, record, index) => {
                console.log("index====>.", index)
                return (
                    <>
                        <input id="inputbtn" type="checkbox" value={false} name={index}
                               onChange={(e) => this.handelChange(e)}/>
                    </>

                )
            }
        },
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
                        <button onClick={() => this.onDelete(index)}><a className="delete" data-toggle="modal"><i
                            className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a></button>
                    </>

                )

            }

        },
    ];

    render(i) {
        const user = this.props.users;
        console.log("user--", user)
        return (
            <div>
                {/*<button onClick={() => this.MultipleDeletes()} value="Delete">MultipleDelete</button>*/}
                <h1 className="text-center">Table List</h1>
                <Table columns={this.columns} dataSource={user}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log("mapstate", state)
    return {
        users: state.data.users
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUsers: () => dispatch(loadUsers()),
        userDeleted: (i) => dispatch(deleteUser(i)),
        userEdited: () => dispatch(editUser()),
        // MultipleDelete:(i)=>dispatch(DeleteMultiple(i))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(myNavigate1(Two));