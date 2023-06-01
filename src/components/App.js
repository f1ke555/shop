import React from "react";
import './App.css'
import {BrowserRouter} from "react-router-dom";
import Header from "./Header";
import AppRouter from "./AppRouter";
import {Container} from "react-bootstrap";

const App = () => {

    return (
        <BrowserRouter>
            <Header/>
                <Container>
                    <AppRouter/>
                </Container>
        </BrowserRouter>
    )
};

export default App;
