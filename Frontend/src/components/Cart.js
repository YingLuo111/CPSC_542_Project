
/*****************************************************************************************
                           This is the Cart Page
 ****************************************************************************************/


import React, {useState, useEffect, useMemo} from 'react';
import { withRouter } from 'react-router-dom';
import{Row, Col, Nav} from 'react-bootstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import CartItem from '../components/CartItem';
import PageTemplate from './PageTemplate'
import axios from './commons/axios';
import {formatPrice} from './commons/utils'

import '../css/cart/Cart.scss';

const Cart = () => {

  const [cartItems, setCartItems] = useState([]);

  useEffect(async () => {
    const userID = global.appState.getUserID();
    axios.get(`/api/v1/cart/items?userID=${userID}`).then(res => setCartItems(res.data['items']));
  }, []);

  const totalPrice = useMemo(() => {
    const totalPrice = cartItems
      .map(item => item.productQuantity * parseInt(item.productPrice))
      .reduce((sum, val) => sum + val, 0);
    return formatPrice(totalPrice);
  }, [cartItems]);

  const updateCartItem = async (itemToUpdate) => {
    const existingCartItems = [...cartItems];
    const idxToUpdate = existingCartItems.findIndex(item => item.cartItemID === itemToUpdate.cartItemID);
    existingCartItems.splice(idxToUpdate, 1, itemToUpdate);
    setCartItems(existingCartItems);
    await global.appState.updateLocalCartNum();
    // this.forceUpdate();
  };

  const deleteCartItem = async (itemToDelete) => {
    const cartItemsAfterRemove = cartItems.filter(item => item.cartItemID !== itemToDelete.cartItemID);
    setCartItems(cartItemsAfterRemove);
    await global.appState.updateLocalCartNum();
    // this.forceUpdate();
  };

  return (
    <PageTemplate>
        <div className="cart-page">
          <div className="cart-title">Shopping Cart</div>
          {cartItems.length === 0 ? <p className="empty-cart">Empty Cart</p> : ''}
          <div className="cart-list" >
            <TransitionGroup component={null}>
              {cartItems.map(item => (
                <CSSTransition classNames="cart-item" timeout={100} key={item.cartItemID}>
                  <CartItem
                    key={item.cartItemID}
                    cartItem={item}
                    updateCartItem={updateCartItem}
                    deleteCartItem={deleteCartItem}
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
          <div className="cart-total">
            Total:
              <span className="total-price is-vcentered" >{totalPrice}</span>
          </div>
          <Row className="cart-btn-container">
            <Col>
              <Nav.Link href="allproducts" className="cart-button">
                <button className="common-button">Continue Shopping</button>
              </Nav.Link>
            </Col>
            {cartItems.length !== 0 ? 
            <Col>
              <Nav.Link href="checkout"  className="cart-button">
                <button className="common-button">Place Order</button>
              </Nav.Link>
            </Col>
             : ''}
          </Row>
         </div>
      </PageTemplate>
  );
};

export default withRouter(Cart);
