
export default function SolvedSwitch({ handlerMap }) {

    return (
        //<button onClick={() => handlerMap.toggleResolved()}>
        <button onClick={() => alert("This function is not implemented yet.")}>
            {handlerMap.resolved ? "Zobrazit nevyřešené" : "Zobrazit vyřešené"}
        </button >
    )
}

//https://tigerabrodi.blog/is-it-ok-to-pass-setstate-as-a-prop-in-react