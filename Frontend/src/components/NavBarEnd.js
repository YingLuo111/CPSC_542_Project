import { Nav } from 'react-bootstrap';
import React from 'react';
import Panel from './commons/Panel'
import UserProfile from './account/UserProfile'
import { useMemo} from 'react';
import { withRouter } from 'react-router-dom';

//this is the container for login and cart button
const NavBarEnd = props => {

    const userInfo = useMemo(() => {
        return global.auth.getUser() || {};
    }, []);

    const toProfile = () => {
        Panel.open({
          component: UserProfile,
          props: {
            user: userInfo
          },
          callback: data => {
            props.history.go(0);
          }
        });
    };


    return (
        <div className="end">
            <Nav className="mr-auto2">
                {userInfo.username ? (
                    <Nav.Link className="username" onClick={toProfile}>
                        <i className="fas fa-user"></i>
                        {" Hi, " + userInfo.username}
                    </Nav.Link>
                ) : (
                    <Nav.Link href="login">Login</Nav.Link>
                )}
                <Nav.Link href="cart" >
                    <i className="fas fa-shopping-cart"></i>
                    <span className="cart-num"> ({global.appState.getLocalCartNum()})</span>
                </Nav.Link>
            </Nav>
        </div>
    );
}

export default withRouter(NavBarEnd);