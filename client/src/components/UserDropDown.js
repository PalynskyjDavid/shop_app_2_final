import '../Styles/Dropdown.css';

export default function UserDropDown({ userList, loadingUsers, changeUser }) {



    return (
        <div className="dropdown">
            <button className="dropbtn">Vyber uzivatele</button>
            <div className="dropdown-content">
                {loadingUsers ?
                    (
                        userList.map((user) => (
                            <div
                                key={user._id}
                                className="dropdown-item"
                                onClick={() => (changeUser(user._id))}>
                                {user._id} : {user.userName}
                            </div>
                        ))
                    )
                    :
                    <>Loading...</>}
            </div>
        </div>
    );
}