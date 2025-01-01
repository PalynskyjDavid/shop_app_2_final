import useDetailContext from "../hooks/useDetail.js";
import useUserContext from "../hooks/useUser.js";
import { useNavigate, createSearchParams } from "react-router-dom";
import SolvedSwitch from "./SolvedSwitch.js";
import AddCartForm from "./AddCartForm.js";
import { useState } from "react";
import "../../src/App.css"
import useThemeContext from "../hooks/useTheme.js";
import { useTranslation } from "react-i18next";
import PieGraph from './PieGraph.js';

export default function CartWrapper() {
    const { t } = useTranslation();
    const { handlerMap, carts, helpers } = useDetailContext();
    const { userList, loggedInUser, loadingUsers } = useUserContext();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const { theme } = useThemeContext();

    return (
        <div id={theme}>
            <SolvedSwitch handlerMap={handlerMap} />
            <>
                <button onClick={handleOpenModal} className="button">{t('addCart')}</button>
                <AddCartForm showModal={showModal} handleCloseModal={handleCloseModal} />
            </>
            {carts.map((cart) => (
                <div
                    key={cart._id}
                    //onClick={() => navigate({ pathname: "detail" })}
                    onClick={() => navigate({ pathname: "detail", search: createSearchParams({ cartId: cart._id }).toString() })}
                >
                    <div>{t('cartFor')}: {cart.name}</div>
                    <div>{t('owner')}: {loggedInUser.userName}</div>
                    <div>{t('cartId')}: {cart._id}</div>
                    <div>{t('resolved')}?: {cart.resolved ? t('resolved') : t('notResolved')}</div>
                </div>
            ))}

            <PieGraph></PieGraph>
        </div>
    );
}