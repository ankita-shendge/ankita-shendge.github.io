//database.dart
//All database data

import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

class DatabaseHelper {
  static final DatabaseHelper instance = DatabaseHelper._init();
  static Database? _database;

  DatabaseHelper._init();

  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDB('ict4580.db');
    return _database!;
  }

  Future<void> updateUserProfile(int userID, String newUsername, String newPassword) async {
    final db = await instance.database;
    await db.update(
      'users',
      {'userName': newUsername, 'password': newPassword},
      where: 'userID = ?',
      whereArgs: [userID],
    );
  }

  Future<Database> _initDB(String filePath) async {
    final dbPath = await getDatabasesPath();
    final path = join(dbPath, filePath);

    return await openDatabase(
      path,
      version: 6,
      onCreate: _createDB,
      onUpgrade: _upgradeDB,
    );
  }

  Future<void> deleteDatabase() async {
    final dbPath = await getDatabasesPath();
    final path = join(dbPath, 'ict4580.db');
    await databaseFactory.deleteDatabase(path);
    _database = null;
  }

  Future _createDB(Database db, int version) async {
    await db.execute('''
    CREATE TABLE IF NOT EXISTS users (
      userID INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      userName TEXT NOT NULL,
      password TEXT NOT NULL
    )
  ''');

    await db.execute('''
    CREATE TABLE IF NOT EXISTS products (
      productID INTEGER PRIMARY KEY AUTOINCREMENT,
      productName TEXT NOT NULL,
      productImage TEXT,
      productDesc TEXT NOT NULL,
      productPrice REAL NOT NULL
    )
  ''');

    await db.execute('''
    CREATE TABLE IF NOT EXISTS orders (
      orderID INTEGER PRIMARY KEY AUTOINCREMENT,
      userID INTEGER NOT NULL,
      orderDate TEXT NOT NULL,
      orderTotal REAL NOT NULL,
      FOREIGN KEY (userID) REFERENCES users (userID)
    )
  ''');

    await db.execute('''
    CREATE TABLE IF NOT EXISTS orderedProducts (
      orderedID INTEGER PRIMARY KEY AUTOINCREMENT,
      orderID INTEGER NOT NULL,
      productID INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      FOREIGN KEY (orderID) REFERENCES orders (orderID),
      FOREIGN KEY (productID) REFERENCES products (productID)
    )
  ''');
  }

  Future _upgradeDB(Database db, int oldVersion, int newVersion) async {
    if (oldVersion < 6) {
      await db.execute('''
      DROP TABLE IF EXISTS orderedProducts
      ''');

      await db.execute('''
      CREATE TABLE IF NOT EXISTS orderedProducts (
        orderedID INTEGER PRIMARY KEY AUTOINCREMENT,
        orderID INTEGER NOT NULL,
        productID INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (orderID) REFERENCES orders (orderID),
        FOREIGN KEY (productID) REFERENCES products (productID)
      )
    ''');
    }
  }

  Future<void> createUser(Map<String, dynamic> user) async {
    final db = await instance.database;
    await db.insert('users', user);
  }

  Future<Map<String, dynamic>?> getUser(String username, String password) async {
    final db = await instance.database;
    final result = await db.query(
      'users',
      columns: ['userID', 'firstName', 'lastName', 'userName', 'password'],
      where: 'userName = ? AND password = ?',
      whereArgs: [username, password],
    );

    if (result.isNotEmpty) {
      return result.first;
    } else {
      return null;
    }
  }

  Future<void> createProduct(Map<String, dynamic> product) async {
    final db = await instance.database;
    await db.insert('products', product);
  }

  Future<List<Map<String, dynamic>>> getProducts() async {
    final db = await instance.database;
    return await db.query('products');
  }

  Future<void> insertSampleProducts() async {
    final db = await instance.database;

    // Clear the products table before inserting sample data
    await db.delete('products');

    final products = [
      {
        'productName': 'T-Shirt',
        'productImage': 'lib/images/t-shirt.webp',
        'productDesc': 'A cool t-shirt',
        'productPrice': 19.99,
      },
      {
        'productName': 'Jeans',
        'productImage': 'lib/images/photo.jpeg',
        'productDesc': 'Stylish jeans',
        'productPrice': 49.99,
      },
      {
        'productName': 'Hoodie',
        'productImage': 'lib/images/hoodie.webp',
        'productDesc': 'Gap Hoodie',
        'productPrice': 9.99,
      }
    ];

    for (var product in products) {
      await db.insert('products', product);
    }
  }

  Future<int> createOrder(int userID, double orderTotal) async {
    final db = await instance.database;
    final order = {
      'userID': userID,
      'orderDate': DateTime.now().toIso8601String(),
      'orderTotal': orderTotal,
    };
    return await db.insert('orders', order);
  }

  Future<void> createOrderedProduct(int orderID, int productID, int quantity) async {
    final db = await instance.database;
    final orderedProduct = {
      'orderID': orderID,
      'productID': productID,
      'quantity': quantity,
    };
    await db.insert('orderedProducts', orderedProduct);
  }

  Future<List<Map<String, dynamic>>> getUserOrders(int userID) async {
    final db = await instance.database;
    return await db.rawQuery('''
      SELECT orders.orderID, orders.orderDate, orders.orderTotal, products.productName, products.productDesc, products.productPrice, orderedProducts.quantity
      FROM orders
      JOIN orderedProducts ON orders.orderID = orderedProducts.orderID
      JOIN products ON orderedProducts.productID = products.productID
      WHERE orders.userID = ?
    ''', [userID]);
  }
}
