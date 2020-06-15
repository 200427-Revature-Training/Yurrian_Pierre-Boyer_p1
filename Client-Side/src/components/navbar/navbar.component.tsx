import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import './navbar.component.css';

interface NavbarProps {
    history: History;
}

const NavbarComponent: React.FC<RouteComponentProps> = (props) => {

    const renderOnCurrentPath = (path: string) => {
        console.log(props.location.pathname);

        // setTimeout(() => {
        /* Programmatic Routing */
        //     props.history.push('/loans');
        // }, 5000);

        return path === props.location.pathname ? 
        <span className="sr-only">(current)</span> : <span></span>
    }

    return (
        <nav className="navbar navbar-dark bg-primary">
            <a className="navbar-brand" href="#">ERS</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link to="/home">Login {renderOnCurrentPath('/home') }</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/reimbursements">Reimbursements {renderOnCurrentPath('/reimbursements') }</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

/* Higher Order Component */
/* If you need access to the history object and you're not getting it directly from the Router
    then wrapping the component in a withRouter call and exporting that (rather than the component itself)
    can give you convenient access to it. The history object originates with the Router and provides an interface
    for us to programmatically interact with the history and navigation. */
export default withRouter(NavbarComponent);