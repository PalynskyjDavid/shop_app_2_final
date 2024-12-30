import { useEffect } from "react";
import useUserContext from "../hooks/useUser.js";
import '../Styles/Header.css';
import UserDropDown from "./UserDropDown.js";
import { Outlet } from "react-router-dom";
import useThemeContext from "../hooks/useTheme.js";
import ReactSwitch from "react-switch";

import { useTranslation } from "react-i18next";


export default function Header() {
    const { userList, loggedInUser, loadingUsers, changeUser } = useUserContext();

    const { theme, toggleTheme } = useThemeContext();

    const { t, i18n } = useTranslation();

    const greeting = loadingUsers ?
        (loggedInUser ? <>{t("greeting")} {loggedInUser.userName}</> : <>{t("logIn")}</>)
        :
        <>{t("loading")}</>;

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <>
            <header className="header">
                <div className="header-title">Shopping app</div>

                <div className="language-switcher">
                    {Object.keys(i18n.options.resources).map((lng) => (
                        <button key={lng} onClick={() => changeLanguage(lng)}>
                            {lng}
                        </button>
                    ))}
                </div>

                <ReactSwitch onChange={toggleTheme} checked={theme === "light"} />

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