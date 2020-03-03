import 'package:flipper/data/main_database.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/presentation/common/common_app_bar.dart';
import 'package:flipper/presentation/home/common_view_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';

class TransactionScreen extends StatefulWidget {
  TransactionScreen({Key key}) : super(key: key);

  @override
  _TransactionScreenState createState() => _TransactionScreenState();
}

class _TransactionScreenState extends State<TransactionScreen> {
  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, CommonViewModel>(
      distinct: true,
      converter: CommonViewModel.fromStore,
      builder: (context, vm) {
        return Scaffold(
          appBar: CommonAppBar(
            title: "Transactions",
            showActionButton: false,
            onPressedCallback: () async {},
            icon: Icons.close,
            multi: 3,
            bottomSpacer: 52,
          ),
          body: StreamBuilder(
              stream: vm.database.orderDao.getOrdersStream(),
              builder: (context, AsyncSnapshot<List<OrderTableData>> snapshot) {
                if (snapshot.data == null) {
                  return Text("");
                }

                return StreamBuilder(
                    stream: null,
                    builder: (context, snapshot) {
                      return ListView(
                        children: ListTile.divideTiles(
                          context: context,
                          tiles: renderTransactions(snapshot.data, context, vm),
                        ).toList(),
                      );
                    });
              }),
        );
      },
    );
  }

  List<Widget> renderTransactions(
      List<OrderTableData> data, BuildContext context, CommonViewModel vm) {
    List<Widget> list = new List<Widget>();
    for (var i = 0; i < data.length; i++) {
      list.add(transactionRow(data[i]));
    }
    return list;
  }

  ListTile transactionRow(OrderTableData data) {
    return ListTile(
      leading: Container(
        width: 50,
        child: Text(data.cashReceived.toString()),
      ),
      title: Text("B"),
      trailing: Text("C"),
      dense: true,
    );
  }
}