import React from 'react';
import '../Styles/Dropdown.css';
import { useTranslation } from "react-i18next";

export default function UserDropDown({ userList, loadingUsers, changeUser }) {
    const { t } = useTranslation();

    return (
        <div className="dropdown">
            <button className="dropbtn">{t('selectUser')}</button>
            <div className="dropdown-content">
                {loadingUsers ? (
                    userList.map((user) => (
                        <div
                            key={user._id}
                            className="dropdown-item"
                            onClick={() => changeUser(user._id)}
                        >
                            {/* {user._id} :  */}{user.userName}
                        </div>
                    ))
                ) : (
                    <>{t('loading')}</>
                )}
            </div>
        </div>
    );
}
