import 'package:flipper/home/widget/flipper_input.dart';
import 'package:flipper/presentation/common/common_app_bar.dart';
import 'package:flutter/material.dart';

class AddNoteScreen extends StatefulWidget {
  AddNoteScreen({Key key}) : super(key: key);

  @override
  _AddNoteScreenState createState() => _AddNoteScreenState();
}

class _AddNoteScreenState extends State<AddNoteScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CommonAppBar(
        disableButton: false,
        title: "Add Note",
      ),
      body: Column(
        children: <Widget>[
          Center(
            child: FlipperInput(
              hint: "Add Note",
            ),
          )
        ],
      ),
    );
  }
}