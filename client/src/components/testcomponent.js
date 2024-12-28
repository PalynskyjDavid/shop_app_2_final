import React from 'react';
import { useContext } from "react";
import useUser from "../hooks/useUser.js";

export default function TestComponent() {

    // const x = useContext(useUserContext);
    const { userList } = useUser()
    //console.log('Test list in text component', userList);

    //setTimeout(console.log("asdf", users), 5000)
    return (
        <div>
            {/* <div>TEST!!!</div>
            <div>{window.location.port}</div>
            <div>a</div>
            {users.length > 0 ? (
                users.map(user => <div key={user.id}>{user.name}</div>)
            ) : (
                <div>Loading...</div> // Conditional rendering
            )} */}
        </div>
    );
}
