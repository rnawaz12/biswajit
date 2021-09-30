import { React, useContext } from 'react';
import './routes.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../components/pages/basic/Login';
import Home from '../components/pages/basic/Home';
import { UserContext } from '../components/states/contexts/UserContext';
import Lists from '../components/pages/lists/Lists';
import AddEditLists from '../components/pages/lists/AddEditLists';


export default function Routes() {
    const { user } = useContext(UserContext)

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {user ? <Home /> : <Login />}
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/lists">
                    <Lists />
                </Route>
                <Route exact path="/lists/add">
                    <AddEditLists />
                </Route>
                <Route exact path="/lists/edit/:id">
                    <AddEditLists />
                </Route>
                <Route exact path="/lists/view/:id">
                    <AddEditLists />
                </Route>
            </Switch>

        </Router>
    )
}
