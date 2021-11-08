# CPSC462 Project: EZBuy

# Professor: Lidia Morrison

# Team members:
#     Ying Luo,
#     Gabriel Magallanes,
#     Juheng Mo,
#     Mohammad Mirwais,

from flask import Flask, request, g, jsonify
import datetime
import sqlite3
import json
from utils import jwt_token_required
from flask_cors import CORS

app = Flask(__name__)
app.config.from_envvar('APP_CONFIG')
DATABASE_PATH = app.config.get("DATABASE")
CORS(app)


def get_db():
    """ Get database connection to Sqlite3.

        :returns: database connection

    """
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE_PATH)
    return db


@app.teardown_appcontext
def close_connection(exception):
    """ Close database connection on application finished.
    """
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


@app.route('/')
def cartService():
    return 'Welcome to Cart Service!'


@app.route('/api/v1/cart', methods=['POST'])
def addCartItem():

    dataDict = json.loads(request.data)

    userID = dataDict['userID']
    productID = dataDict['productID']
    quantity = dataDict['quantity']

    try:

        cartID = _getCartIDWithUserID(userID)

        db_connection = get_db()

        db_query = f"INSERT INTO Cart_Items \
                        (CartID, ProductID, Quantity) \
                        VALUES \
                        ('{cartID}','{productID}', '{quantity}')"

        # insert the new user information to database
        cur = db_connection.cursor()
        cur.execute(db_query)
        db_connection.commit()
    except Exception as e:
        # return status code 500 when database operation fails
        return internal_server_error(500, str(e))

    return jsonify({'success': True})


@app.route('/api/v1/cart/<cartItemID>', methods=['PATCH', 'DELETE'])
def updateCartItem(cartItemID):

    if request.method == 'PATCH':
        dataDict = json.loads(request.data)
        quantity = dataDict['quantity']

        try:
            db_connection = get_db()

            db_query = f"UPDATE Cart_Items \
                            SET \
                            quantity = '{quantity}' \
                            WHERE \
                            cartItemID = '{cartItemID}'"

            # insert the new user information to database
            cur = db_connection.cursor()
            cur.execute(db_query)
            db_connection.commit()
        except Exception as e:
            # return status code 500 when database operation fails
            return internal_server_error(500, str(e))
    elif request.method == 'DELETE':
        try:
            db_connection = get_db()

            db_query = f"DELETE FROM Cart_Items \
                            WHERE \
                            cartItemID = '{cartItemID}'"

            # insert the new user information to database
            cur = db_connection.cursor()
            cur.execute(db_query)
            db_connection.commit()
        except Exception as e:
            # return status code 500 when database operation fails
            return internal_server_error(500, str(e))
    return jsonify({'success': True})


@app.route('/api/v1/cart/item', methods=['GET'])
def getCartItem():
    userID = request.args.get('userID')
    productID = request.args.get('productID')

    items = []

    try:
        cartID = _getCartIDWithUserID(userID)

        db_connection = get_db()

        db_query = f"SELECT * \
            FROM Cart_Items \
            WHERE \
            CartID = '{cartID}' \
            AND ProductID = '{productID}'"

        # insert the new user information to database
        cur = db_connection.cursor()
        cur.execute(db_query)
        db_connection.commit()

        rows = cur.fetchall()

        for row in rows:
            items.append(
                {'cartItemID': row[0], 'cartID': row[1], 'productID': row[2], 'quantity': row[3]})

    except Exception as e:
        # return status code 500 when database operation fails
        return internal_server_error(500, str(e))

    return jsonify({'success': True, 'items': items})


@app.route('/api/v1/cart/items', methods=['GET'])
def getAllCartItems():

    userID = request.args.get('userID')

    items = []

    try:
        cartID = _getCartIDWithUserID(userID)

        db_connection = get_db()

        db_query = f"SELECT * \
            FROM Cart_Items \
            WHERE \
            CartID = '{cartID}'"

        # insert the new user information to database
        cur = db_connection.cursor()
        cur.execute(db_query)
        db_connection.commit()

        rows = cur.fetchall()

        for row in rows:

            cartItemID = row[0]
            cartID = row[1]
            productID = row[2]
            quantity = row[3]

            db_query = f"SELECT * \
                FROM Products \
                WHERE \
                ProductID = '{productID}'"

            cur = db_connection.cursor()
            cur.execute(db_query)
            db_connection.commit()

            rows = cur.fetchall()

            product_detail = rows[0]
            productName = product_detail[2]
            productDescription = product_detail[3]
            productPrice = product_detail[5]
            productImage = product_detail[7]
            product3DImage = product_detail[8]
            isAuctionProduct = product_detail[9]

            items.append(
                {'cartItemID': cartItemID, 'cartID': cartID, 'productID': productID, 'productQuantity': quantity,
                 'productName': productName, 'productDescription': productDescription, 'productPrice': productPrice,
                 'productImage': productImage, 'product3DImage': product3DImage, 'isAuctionProduct': isAuctionProduct
                 })

    except Exception as e:
        # return status code 500 when database operation fails
        return internal_server_error(500, str(e))

    return jsonify({'success': True, 'items': items})


def _getCartIDWithUserID(userID):
    db_connection = get_db()
    db_query = f"SELECT CartID FROM Carts \
                    WHERE \
                    UserID = '{userID}'"

    cur = db_connection.cursor()
    cur.execute(db_query)
    db_connection.commit()

    rows = cur.fetchall()

    return rows[0][0]


@app.route('/api/v1/cart/items/<userID>', methods=['DELETE'])
def deleteAllCartItems(userID):

    try:
        cartID = _getCartIDWithUserID(userID)

        db_connection = get_db()

        db_query = f"DELETE \
            FROM Cart_Items \
            WHERE \
            CartID = '{cartID}'"

        # insert the new user information to database
        cur = db_connection.cursor()
        cur.execute(db_query)
        db_connection.commit()

    except Exception as e:
        # return status code 500 when database operation fails
        return internal_server_error(500, str(e))

    return jsonify({'success': True})


@ app.errorhandler(401)
def unauthorized(e, message):
    """ Error handler on status code 401
    """
    return jsonify({'success': False, 'message': message}), 401


@ app.errorhandler(400)
def bad_request(e, message):
    """ Error handler on status code 400
    """
    return jsonify({'success': False, 'message': message}), 400


@ app.errorhandler(500)
def internal_server_error(e, message):
    """ Error handler on status code 500
    """
    return jsonify({'success': False, 'message': message}), 500


if __name__ == '__main__':
    app.run()
