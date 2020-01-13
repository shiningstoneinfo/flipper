import 'package:flipper/flipper_localization.dart';
import 'package:flipper/presentation/common/common_app_bar.dart';
import 'package:flipper/presentation/settings/privacy_settings_button.dart';
import "package:flutter/material.dart";

class SettingsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CommonAppBar(
        title: CirclesLocalizations.of(context).settingsTitle,
      ),
      body: ListView(
        children: <Widget>[
          PrivacySettingsButton(),
        ],
      ),
    );
  }
}