//Main file
//functionalities
//1.Set home page to login
//2. Initialize the database and insert sample products
//3.Delete the existing database
//4.Route for login page and account creation

import 'package:flutter/material.dart';
import 'login_page.dart';
import 'create_account_page.dart';
import 'database.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Delete the existing database
  try {
    await DatabaseHelper.instance.deleteDatabase();
    print('Existing database deleted successfully.');
  } catch (e) {
    print('Error deleting database: $e');
  }

  // Initialize the database and insert sample products
  try {
    await DatabaseHelper.instance.insertSampleProducts();
    print('Sample products inserted successfully.');
  } catch (e) {
    print('Error inserting sample products: $e');
  }

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'E-commerce App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: LoginPage(), // Set the login page as the home screen
      routes: {
        '/login': (context) => LoginPage(), // Route for login page
        '/createAccount': (context) => CreateAccountPage(), // Route for account creation page
      },
    );
  }
}
