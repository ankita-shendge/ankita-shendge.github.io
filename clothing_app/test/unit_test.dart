import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';
import 'package:clothing_app/login_page.dart';
import 'package:clothing_app/components/my_button.dart';


void main() {

  setUpAll(() {
    sqfliteFfiInit();
    databaseFactory = databaseFactoryFfi;
  });

  testWidgets('Password field should be obscured', (WidgetTester tester) async {
    await tester.pumpWidget(MaterialApp(home: LoginPage()));
    final passwordField = find.byType(TextField).last;
    expect((tester.widget(passwordField) as TextField).obscureText, isTrue);
  });

  testWidgets('Password field accepts input', (WidgetTester tester) async {
    await tester.pumpWidget(MaterialApp(home: LoginPage()));
    final passwordField = find.byType(TextField).last;
    await tester.enterText(passwordField, 'password123');
    expect(find.text('password123'), findsOneWidget);
  });

  testWidgets('Username field accepts input', (WidgetTester tester) async {
    await tester.pumpWidget(MaterialApp(home: LoginPage()));
    final usernameField = find.byType(TextField).first;
    await tester.enterText(usernameField, 'testUser');
    expect(find.text('testUser'), findsOneWidget);
  });

  testWidgets('Login button is tappable', (WidgetTester tester) async {
    await tester.pumpWidget(MaterialApp(home: LoginPage()));
    final loginButton = find.byType(MyButton);
    expect(loginButton, findsOneWidget);
    await tester.tap(loginButton);
    await tester.pump();
  });

 }
