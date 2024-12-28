import { useContext } from "react";
import DetailContext from "../context/DetailContext.js";

function useDetailContext() {
    const context = useContext(DetailContext);
    if (!context) {
        throw new Error("useDetailContext must be used within a DetailProvider");
    }
    return context;
};

export default useDetailContext;
