//cart_screen.dart
//You can remove item
//Functionalities
//1.Remove Items from cart
//2.show product total
//3.checkout and wipe out the cart data and show message and cart total again back to zero
// cart_screen.dart

import 'package:flutter/material.dart';

import 'database.dart';

class CartScreen extends StatefulWidget {
  final Map<String, dynamic> user;
  final List<Map<String, dynamic>> cart;

  const CartScreen({super.key, required this.user, required this.cart});

  @override
  _CartScreenState createState() => _CartScreenState();
}

class _CartScreenState extends State<CartScreen> {
  @override
  Widget build(BuildContext context) {
    // Group items by product name
    final Map<String, List<Map<String, dynamic>>> groupedItems = {};
    for (var item in widget.cart) {
      final name = item['productName'];
      if (groupedItems.containsKey(name)) {
        groupedItems[name]!.add(item);
      } else {
        groupedItems[name] = [item];
      }
    }

    // Calculate total price
    double totalPrice = widget.cart.fold(0, (sum, item) {
      final price = double.tryParse(item['productPrice'].toString()) ?? 0;
      final quantity = item['quantity'] ?? 0;
      return sum + (price * quantity);
    });

    Future<void> _checkout() async {
      if (widget.cart.isEmpty) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content:  Text('Your cart is empty. Add items to the cart first.'),
          ),
        );
        return;
      }

      double total = widget.cart.fold(0, (sum, item) => sum + item['productPrice']);
      final orderID = await DatabaseHelper.instance.createOrder(widget.user['userID'], total);

      for (var product in widget.cart) {
        await DatabaseHelper.instance.createOrderedProduct(orderID, product['productID'], product['quantity']);
      }

      setState(() {
        widget.cart.clear();
      });

      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text('Success'),
            content: const Text('Order placed successfully!'),
            actions: [
              TextButton(
                child: const Text('OK'),
                onPressed: () {
                  Navigator.of(context).pop();
                  Navigator.of(context).pop();
                },
              ),
            ],
          );
        },
      );

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Successfully ordered products'),
        ),
      );

    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('Cart'),
        backgroundColor: Colors.orangeAccent,
      ),
      body: groupedItems.isEmpty
          ? const Center(
        child:  Text(
          'Need to shop first!',
          style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
        ),)
          : Column(
        children: [
          Expanded(
            child: ListView(
              children: groupedItems.entries.map((entry) {
                final productName = entry.key;
                final items = entry.value;
                final quantity = items.fold(0, (sum, item) => (item['quantity'] ?? 0) + sum);
                final price = items.isNotEmpty ? double.tryParse(items[0]['productPrice'].toString()) ?? 0 : 0;
                final totalItemPrice = price * quantity;

                return Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Card(
                    elevation: 5,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            productName,
                            style: const TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 8),
                          ...items.map((item) {
                            final itemQuantity = item['quantity'] ?? 0;
                            final itemPrice = double.tryParse(item['productPrice'].toString()) ?? 0;
                            final totalItem = itemPrice * itemQuantity;

                            return Padding(
                              padding: const EdgeInsets.symmetric(vertical: 4.0),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(
                                    '${item['productName']} x$itemQuantity',
                                    style: TextStyle(fontSize: 16, color: Colors.grey[800]),
                                  ),
                                  Text(
                                    '\$${totalItem.toStringAsFixed(2)}',
                                    style: const TextStyle(fontSize: 16, color: Colors.green),
                                  ),
                                ],
                              ),
                            );
                          }).toList(),
                          const SizedBox(height: 8),
                          Text(
                            'Total for $productName: \$${totalItemPrice.toStringAsFixed(2)}',
                            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              }).toList(),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Total Price:',
                  style: const TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Text(
                  '\$${totalPrice.toStringAsFixed(2)}',
                  style: const TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors.green,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
      bottomNavigationBar: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ElevatedButton(
          onPressed: _checkout,
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.orangeAccent,
          ),
          child: const Text(
            'Checkout',
            style: TextStyle(color: Colors.black),
          ),
        ),
      ),
    );
  }
}
