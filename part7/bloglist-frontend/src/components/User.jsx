import { useEffect } from "react";
import loginService from "../services/login";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../reducers/userReducer";
import { Routes, Route, Link } from "react-router-dom";

const User = ({users}) => {
    console.log(users)
    if(users===null){
        return(
            <>
            </>
        )
    }
    else{
        return (
            <>
            <h1>Users</h1>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>blogs created</th>
                </tr>
            {users.map((user)=>(
                <tr key={user.id}>
                    <td>
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                    </td>
                    <td>{user.blogs.length}</td>
                </tr>
            ))}
                </tbody>
            </table>

            </>
        )
    }
}

export default User