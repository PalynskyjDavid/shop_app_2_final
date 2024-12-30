import React, { useState, useEffect } from "react";
import axiosApi from "../hooks/useAxiosApi.js";
import UserContext from '../context/UserContext.js';


export function UserProvider({ children }) {

    const [loggedInUser, setLoggedInUser] = useState(null);
    const [userList, setUserList] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);

    // UseEffect probehna az po vyrenderovani komponenty, je
    // dulezite vyresit chovani aplikace pred poskytnutim dat
    // treba z API.

    // UseMemo se prerenderuje pouze pokud jedna ze
    // zavislosti se zmeni, vyuziva se pro zapamatovani
    // narocnych operaci.

    // UseCallback si zapamatuje (cache) funkce podobne jako useMemo,
    // je vhodny pro funkce ktere se predavaji potomkum.
    // Zde by se mel vyuzit pro changeUser nebo setLoggedInUser.
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosApi.get("/user/list");
                //const response = await axios.get("http://localhost:3000/user/list");

                //console.log(`Axios data response in UserProvider`, response.data.data)
                //console.log(`Axios response`, response)

                setUserList(response.data.data);
            } catch (err) {
                if (err.response) {
                    console.error("Failed to fetch users", err);
                    console.log(err.response.data)
                    console.log(err.response.status)
                    console.log(err.response.headers)
                    console.log(err.response.message)
                } else {
                    console.log(`Error ${err.message}`)
                }
            } finally {
                setLoadingUsers(true);
            };
        };
        fetchUsers();
    }, []);


    const changeUser = async (id) => {
        if (!id) {
            console.error("User ID is required");
            return;
        }

        try {
            const response = await axiosApi.get("/user/login", {
                params: { id }
            });

            const { _id, userName } = response.data.data;

            console.log("Changing user to ", userName);
            setLoggedInUser({ _id, userName });

        } catch (err) {
            if (err.response) {
                console.error("Failed to fetch user:", err.response.data.message);
            } else {
                console.error("Error:", err.message);
            }
        }
    };

    useEffect(() => {
        const setDefaultValues = () => {
            if (userList.length > 0) {
                setLoggedInUser({ _id: userList[0]._id, userName: userList[0].userName })
            } else {
                setLoggedInUser({ _id: null, userName: null })
            }
        };
        setDefaultValues();
    }, [userList])


    const dataProvided = {
        userList,
        loggedInUser, changeUser,
        loadingUsers,
        
    };

    //console.log('Values passed in UserProvider', dataProvided)
    return <UserContext.Provider value={dataProvided}> {children} </UserContext.Provider>
};