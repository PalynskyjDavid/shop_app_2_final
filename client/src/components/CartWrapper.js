import useDetailContext from "../hooks/useDetail.js";
import useUserContext from "../hooks/useUser.js";
import { useNavigate } from "react-router-dom";
import SolvedSwitch from "./SolvedSwitch.js";
import AddCartForm from "./AddCartForm.js";
import { useState } from "react";
import "../../src/App.css"
import useThemeContext from "../hooks/useTheme.js";


// import { useNavigate, createSearchParams } from "react-router-dom";


//import MemberList from "./MemberList.js";
//   import ItemList from "./ItemList.js";
// import Item from "./Item.js";

export default function CartWrapper() {
    const { handlerMap, carts, helpers } = useDetailContext();
    const { userList, loggedInUser, loadingUsers } = useUserContext();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const { theme } = useThemeContext();

    //console.log("cart wrapper",carts)

    // const navigate = useNavigate();

    return (
        <div id={theme}>
            <SolvedSwitch handlerMap={handlerMap} />
            <>
                <button onClick={handleOpenModal} className="button">Add cart</button>
                <AddCartForm showModal={showModal} handleCloseModal={handleCloseModal} />
            </>
            {carts.map((cart) => (
                <div
                    key={cart._id}
                    onClick={() => navigate({ pathname: "detail" })}
                    //style={{ border: "1px solid black", marginTop: "1px" }}
                    
                >

                    <div>Košík pro: {cart.name}</div>
                    <div>Majitel: {loggedInUser.userName}</div>
                    <div>ID košiku: {cart._id}</div>
                    <div>Vyresen?: {cart.resolved ? "ano" : "ne"}</div>
                </div>
            ))}
        </div>
    );
}
