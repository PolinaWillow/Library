import React from "react"
import {Switch, Route, Redirect} from "react-router-dom";
import {DetailPage} from "./pages/DetailPage";
import {BooksPage} from "./pages/BooksPage";
import {AddPage} from "./pages/AddPage";

export const Main = () => {
    return (
        <Switch>
            <Route path='/detail/:id' component={DetailPage}/>
            <Route exact path='/' component={BooksPage}/>
            <Route exact path='/addbook' component={AddPage}/>
            <Redirect to='/' />
        </Switch>
    )
}