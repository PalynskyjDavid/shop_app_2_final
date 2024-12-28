import { useEffect } from "react";
import useUserContext from "../hooks/useUser.js";
import '../Styles/Header.css';
import UserDropDown from "./UserDropDown.js";
import { Outlet } from "react-router-dom";
import useThemeContext from "../hooks/useTheme.js";
import ReactSwitch from "react-switch";



export default function Header() {
    const { userList, loggedInUser, loadingUsers, changeUser } = useUserContext();

    const { theme, toggleTheme } = useThemeContext();
    //console.log("Header liu", loggedInUser)
    //console.log("Header ul", userList)

    const greeting = loadingUsers ?
        (loggedInUser ? <>Hello {loggedInUser.userName}</> : <>No user logged in</>)
        :
        <>Loading...</>;
    return (
        <>
            <header className="header">
                <div className="header-title">Shopping app</div>
                <button onClick={() => toggleTheme()}></button>
                <ReactSwitch onChange={toggleTheme} checked={theme === "light"}/>
                <div>
                    <div className="header-user">{greeting}</div>
                    <UserDropDown
                        userList={userList}
                        loadingUsers={loadingUsers}
                        changeUser={changeUser}
                    />
                </div>
            </header>
            <Outlet />
        </>
    )
}

//https://refine.dev/blog/how-react-fragments-is-works/#what-is-react-fragment