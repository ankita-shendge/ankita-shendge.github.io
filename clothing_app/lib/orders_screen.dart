//orders_screen.dart
//Functionalities
//1.Can see past ordered products


import 'package:flutter/material.dart';
import 'database.dart';

class OrdersScreen extends StatefulWidget {
  final int userID;

  const OrdersScreen({super.key, required this.userID});

  @override
  _OrdersScreenState createState() => _OrdersScreenState();
}

class _OrdersScreenState extends State<OrdersScreen> {
  late Future<List<Map<String, dynamic>>> _orders;

  @override
  void initState() {
    super.initState();
    _orders = DatabaseHelper.instance.getUserOrders(widget.userID);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Your Orders'),
        backgroundColor: Colors.orangeAccent,
      ),
      body: FutureBuilder<List<Map<String, dynamic>>>(
        future: _orders,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(child: Text('No orders found.'));
          } else {
            final orders = _groupByOrderID(snapshot.data!);
            return ListView.builder(
              itemCount: orders.length,
              itemBuilder: (context, index) {
                final orderID = orders.keys.elementAt(index);
                final orderDetails = orders[orderID]!;
                return Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Card(
                    elevation: 5,
                    margin: const EdgeInsets.symmetric(vertical: 10, horizontal: 15),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(15),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(15.0),
                      child: ListTile(
                        title: Text(
                          'Order ID: $orderID',
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: Colors.black87,
                          ),
                        ),
                        subtitle: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const SizedBox(height: 8),
                            Text(
                              'Order Date: ${orderDetails.first['orderDate']}',
                              style: TextStyle(
                                fontSize: 16,
                                color: Colors.grey[700],
                              ),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              'Order Total: \$${orderDetails.first['orderTotal']}',
                              style: TextStyle(
                                fontSize: 16,
                                color: Colors.green[700],
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(height: 12),
                            const Text(
                              'Products:',
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(height: 8),
                            ..._buildProductList(orderDetails),
                          ],
                        ),
                      ),
                    ),
                  ),
                );
              },
            );
          }
        },
      ),
    );
  }

  List<Widget> _buildProductList(List<Map<String, dynamic>> products) {
    return products.map((product) {
      return Padding(
        padding: const EdgeInsets.only(bottom: 8.0),
        child: Text(
          '${product['productName']} - \$${product['productPrice']} (Quantity: ${product['quantity']})',
        ),
      );
    }).toList();
  }

  Map<int, List<Map<String, dynamic>>> _groupByOrderID(List<Map<String, dynamic>> orders) {
    final Map<int, List<Map<String, dynamic>>> groupedOrders = {};
    for (var order in orders) {
      final orderID = order['orderID'];
      if (groupedOrders.containsKey(orderID)) {
        groupedOrders[orderID]!.add(order);
      } else {
        groupedOrders[orderID] = [order];
      }
    }
    return groupedOrders;
  }
}
