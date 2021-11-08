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
def ProductsService():
    return 'Welcome to Products Service!'


@app.route('/api/v1/products/', methods=['GET'])
def getAllProducts():
    """ Get all products from the database. Parameters are from HTTP POST requests.

    :return: <tuple> json response data, response code

    :raises Exception: on database queries failure.

    """
    dataDict = request.args.getlist('options[]')

    if not dataDict:
        try:
            db_connection = get_db()

            search_query = f"SELECT ProductID, ProductName, ProductDescription, Price, ProductImage FROM Products"

            cur = db_connection.cursor()
            cur.execute(search_query)
            db_connection.commit()

            rows = cur.fetchall()
        except Exception as e:
            # return status code 500 when database operation fails
            return internal_server_error(500, str(e))

        products = []
        for row in rows:
            # image is bytes, need to encode as json does not support bytes
            products.append({'productID': row[0], 'productName': row[1],
                             'productDescription': row[2], 'productPrice': row[3], 'productImage': row[4]})

        try:
            db_connection = get_db()

            search_query = f"SELECT DISTINCT ProductCategory FROM Products"

            cur = db_connection.cursor()
            cur.execute(search_query)
            db_connection.commit()

            rows = cur.fetchall()
        except Exception as e:
            # return status code 500 when database operation fails
            return internal_server_error(500, str(e))

        options = []
        for row in rows:
            # image is bytes, need to encode as json does not support bytes
            options.append({'name': row[0]})

        return jsonify({'success': True, 'products': products, 'options': options})

    else:
        dataDict = request.args.getlist('options[]')

        sqlString = ''

        for option in dataDict:
            if sqlString == '':
                sqlString += " ProductCategory='" + str(option) + "'"
            else:
                sqlString += " OR ProductCategory='" + str(option) + "'"

        try:
            db_connection = get_db()

            search_query = f"SELECT ProductID, ProductName, ProductDescription, Price, ProductImage FROM Products WHERE" + sqlString

            cur = db_connection.cursor()
            cur.execute(search_query)
            db_connection.commit()

            rows = cur.fetchall()
        except Exception as e:
            # return status code 500 when database operation fails
            return internal_server_error(500, str(e))

        products = []
        for row in rows:
            # image is bytes, need to encode as json does not support bytes
            products.append({'productID': row[0], 'productName': row[1],
                             'productDescription': row[2], 'productPrice': row[3], 'productImage': row[4]})

        return jsonify({'success': True, 'products': products})


@app.route('/api/v1/products/<pid>', methods=['GET'])
def getProduct(pid):
    """ Get a product with product id of <pid> from the database. Parameters are from HTTP POST requests.

    :return: <tuple> json response data, response code

    :raises Exception: on database queries failure.

    """
    try:
        db_connection = get_db()
        search_query = f"SELECT Products.*, Shops.Shopname FROM Products, Shops WHERE Products.ProductID = '{pid}' AND Shops.ShopID In (SELECT ShopID FROM Products WHERE ProductID = '{pid}')"
        cur = db_connection.cursor()
        cur.execute(search_query)
        db_connection.commit()
    except Exception as e:
        # return status code 500 when database operation fails
        return internal_server_error(500, str(e))

    rows = cur.fetchall()
    product = []
    print(rows)
    for row in rows:
        # image is bytes, need to encode as json does not support bytes
        product.append({'productID': row[0], 'shopID': row[1], 'productName': row[2], 'productDescription': row[3],
                        'productCategory': row[4], 'productPrice': row[5], 'productImage': row[7], 'product3DImage': row[8], 'shopName': row[10]})

    return jsonify({'success': True, 'product': product})


@app.route('/api/v1/products/search/<keyword>', methods=['GET'])
def search(keyword):
    '''dataDict = json.loads(request.data)

    keyword_key = 'keyword'
    if keyword_key not in dataDict:
        return bad_request(400, f"missing {keyword_key} field in request")

    keyword = dataDict['keyword']
    if keyword == None:
        return bad_request(400, f"{keyword_key} field is empty")'''

    try:
        db_connection = get_db()
        search_query = f"SELECT * FROM Products WHERE ProductName LIKE '%{keyword}%' OR ProductDescription LIKE '%{keyword}%';"
        cur = db_connection.cursor()
        cur.execute(search_query)
        db_connection.commit()
    except Exception as e:
        # return status code 500 when database operation fails
        return internal_server_error(500, str(e))

    rows = cur.fetchall()
    product = []
    for row in rows:
        # image is bytes, need to encode as json does not support bytes
        product.append({'productID': row[0], 'shopID': row[1], 'productName': row[2], 'productDescription': row[3],
                        'productPrice': row[4], 'productImage': row[7], 'product3DImage': row[8]})

    return jsonify({'success': True, 'product': product})


@app.route('/api/v1/products/random/', methods=['GET'])
def getRandomProducts():
    try:
        db_connection = get_db()
        search_query = f"SELECT ProductID, ProductName, Price, ProductImage FROM Products ORDER BY random() LIMIT 8;"
        cur = db_connection.cursor()
        cur.execute(search_query)
        db_connection.commit()
    except Exception as e:
        # return status code 500 when database operation fails
        return internal_server_error(500, str(e))

    rows = cur.fetchall()
    products = []
    for row in rows:
        # image is bytes, need to encode as json does not support bytes
        products.append({'productID': row[0], 'productName': row[1],
                         'productPrice': row[2], 'productImage': row[3]})

    return jsonify({'success': True, 'products': products})


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
