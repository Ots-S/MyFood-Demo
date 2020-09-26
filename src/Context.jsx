import React, { useState, createContext } from "react"
import axios from "axios"

const Context = createContext();

function ContextProvider(props) {
    const [recipes, setRecipes] = useState();

    function getRecipes() {
        axios.get("/ingredients").then(responses => setRecipes(responses.data))
    }

    return <Context.Provider value={recipes}>
        {props.children}
    </Context.Provider>
}

export { Context, ContextProvider }