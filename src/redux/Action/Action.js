const getUsers = (users) => ({
    type: "GET_USERS",
    payload: users,
});

const userDeleted = () => ({
    type: "DELETE_USER"
});

// const multipleDelete = () => ({
//     type: "MULTIPLE_DELETE"
// })

const userEdited = () => ({
    type: "EDIT_USER"
});

export const loadUsers = () => {
    console.log("loadusers")
    return function (dispatch) {
        console.log("dispatch", dispatch)
        var list = JSON.parse(localStorage.getItem('LocalData'));
        console.log("list", list)
        dispatch(getUsers(list));
    };


};

export const deleteUser = (i) => {
    console.log("index====>>>", i);
    console.log("deleteUser", deleteUser);

    return function (dispatch) {
        console.log("dispatch", dispatch);

        var list = JSON.parse(localStorage.getItem('LocalData'));
        console.log("list", list)
        list.splice(i, 1)
        localStorage.setItem("LocalData", JSON.stringify(list));
        dispatch(userDeleted(list));
        dispatch(getUsers(list));
    };
}

export const editUser = () => {

    return function (dispatch) {
        var list = JSON.parse(localStorage.getItem('LocalData'));
        console.log("list=====>", list);
        dispatch(userEdited());
    };
};


// export const DeleteMultiple = () => {
//     return console.log("data action")
//
//         // var list = JSON.parse(localStorage.getItem('LocalData'));
//         // console.log("list", list)
//         // list.forEach(()=>deleteUser)
//         // dispatch(multipleDelete(list))
//         // dispatch(getUsers(list));
// }