import React from 'react';
import '../../css/orderService/OrderReview.scss';

const OrderListItem = (props) => {

  const orderID = props.orderItem['orderID']
  const createTime = props.orderItem['createTime']
  const orderTotal = props.orderItem['totalPrice']

  const handleReviewDetail = () => {
    props.showOrderDetail(orderID);
  }

    return (
      <div className="columns is-vcentered">
        <div className="column is-narrow">
          Order {orderID}
        </div>
        <div className="column cart-name is-narrow">{createTime}</div>
        <div className="column cart-name is-narrow">{orderTotal}</div>
        <button className="order-review-btn" onClick={handleReviewDetail}>Review Detail</button>
        
      </div>
    );
  };
  
  export default OrderListItem;


