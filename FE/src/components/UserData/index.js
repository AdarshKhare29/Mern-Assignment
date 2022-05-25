import { useEffect, useReducer, useState } from 'react';
import * as userApi from '../../api/User'
const UserData = ({setShowAlbum,showAlbum}) => {
    const [userData, setUserData] = useState([])
    const [user, setUser] = useState()
    const [toggle, setToggle] = useState(false)
    const [extraInfo, setExtraInfo] = useState()
    const [refetch, setRefetch] = useState(false)


    useEffect(() => {
        getUser()
    }, [refetch])
    const getUser = () => {
        userApi.loadUser()
            .then(response => response.data)
            .then(data => {
                setUserData(data)
            })
    }
    console.log(userData)
    const handleDeleteBtn = async (id) => {
        let res = await userApi.deleteUser(id)
        console.log(res)
        if (res.status == 200) {
            setRefetch(!refetch)
        }
    }
    const handleEditButton = (fieldName, id, index) => {
        setToggle(!toggle)
        console.log(index, userData[index])
        setUser(userData[index])
        setExtraInfo({ ...extraInfo, [fieldName]: id })
    }
    const handleChangeEvent = (e, field) => {
        let fieldValue = e.target.value
        setUser({ ...user, [field]: fieldValue })
    }
    const handleSubmit = (e) => {
        console.log(extraInfo)
        if (extraInfo.buttonType == "add") {
            userApi.addUser(user)
        } else {
            userApi.editUser(extraInfo.id, user)
        }
    }
    const _renderEditPOp = () => {
        return (
            <form className='user-form' onSubmit={(e) => handleSubmit(e)}>
                <label>firstName : </label>
                <input type="text" name="firstName" className="login-box" value={user?.firstName} onChange={e => handleChangeEvent(e, 'firstName')} /><br />
                <label>lastName : </label>
                <input type="text" name="lastName" className="login-box" value={user?.lastName} onChange={e => handleChangeEvent(e, 'lastName')} />
                <br />
                <label>Mobile No : </label>
                <input type="text" name="mobile" className="login-box" value={user?.mobile} onChange={e => handleChangeEvent(e, 'mobile')} />
                <br />
                <input type="submit" value="Submit" className="login-btn" /><br />
            </form>
        )
    }
    const addNewUserButton = (e, fieldName) => {
        let fieldValue = e.target.value
        setExtraInfo({ ...extraInfo, [fieldName]: fieldValue })
        setToggle(!toggle)
    }
    return (
        <>
            <div className='container'>
                <button onClick={(e) => addNewUserButton(e, "buttonType")} value="add">Add New User</button>
            </div>
            <div className='user-details'>
                <h3>Users Data:</h3>
                <ul>
                    <li>S. No.</li>
                    <li>First Name</li>
                    <li>Last Name</li>
                    <li>Mobile</li>
                    <li>Action</li>
                </ul>
                {
                    userData.map((item, index) => {
                        return (
                            <ul key={index}>
                                <li>{index + 1}</li>
                                <li>{item.firstName}</li>
                                <li>{item.lastName}</li>
                                <li>{item.mobile}</li>
                                <li>
                                    <button onClick={() => handleEditButton("id", item._id, index)}>Edit</button> 
                                    <button onClick={() => handleDeleteBtn("id", item._id, index,)}>Delete</button> 
                                    <button onClick={(e)=>setShowAlbum(!showAlbum)}>Show Album</button>
                                </li>
                            </ul>
            )
                    })
                }
        </div>

            { toggle && _renderEditPOp() }
        </>
    )
}
export default UserData