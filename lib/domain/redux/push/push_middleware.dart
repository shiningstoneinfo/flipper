import "dart:io";

import "package:firebase_messaging/firebase_messaging.dart";
import 'package:flipper/data/respositories/user_repository.dart';
import 'package:flipper/domain/redux/app_state.dart';
import 'package:flipper/domain/redux/authentication/auth_actions.dart';
import 'package:flipper/domain/redux/push/push_actions.dart';
import 'package:flipper/util/logger.dart';
import "package:redux/redux.dart";

List<Middleware<AppState>> createPushMiddleware(
  UserRepository userRespository,
  FirebaseMessaging firebaseMessaging,
) {
  return [
    TypedMiddleware<AppState, UpdateUserTokenAction>(
        _updateUserAction(userRespository)),
    TypedMiddleware<AppState, OnAuthenticated>(
        _setTokenAfterLogin(userRespository)),
    TypedMiddleware<AppState, OnPushNotificationReceivedAction>(
        _onPushNotificationReceived()),
  ];
}

void Function(
  Store<AppState> store,
  UpdateUserTokenAction action,
  NextDispatcher next,
) _updateUserAction(UserRepository userRepository) {
  return (store, action, next) async {
    next(action);
    try {
      await userRepository.updateUserToken(action.token);
    } catch (e) {
      Logger.e("Failed to update token", e: e, s: StackTrace.current);
    }
  };
}

void Function(
  Store<AppState> store,
  OnAuthenticated action,
  NextDispatcher next,
) _setTokenAfterLogin(UserRepository userRepository) {
  return (store, action, next) async {
    next(action);
    try {
      /// Set the token after the user is authenticated if the token exists
      // if (store.state.fcmToken != null) {
      //   await userRepository.updateUserToken(store.state.fcmToken);
      // }
    } catch (e) {
      Logger.e("Failed to update token", e: e, s: StackTrace.current);
    }
  };
}

void Function(
  Store<AppState> store,
  OnPushNotificationReceivedAction action,
  NextDispatcher next,
) _onPushNotificationReceived() {
  return (store, action, next) async {
    next(action);

    try {
      final message = _verifyedMessage(action.message, store);
      if (message == null) {
        return;
      }

      // store.dispatch(ShowPushNotificationAction(inAppNotification));
    } catch (e) {
      Logger.e("Failed to display push notification",
          e: e, s: StackTrace.current);
    }
  };
}

Map<String, dynamic> _verifyedMessage(
    Map<String, dynamic> message, Store<AppState> store) {
  var notification = message["notification"];
  var data = message["data"];

  // Necessary because the payload format is different per platform
  // See: https://github.com/flutter/flutter/issues/29027
  if (Platform.isIOS) {
    data = message;
    final aps = (data != null) ? data["aps"] : null;
    notification = (aps != null) ? aps["alert"] : null;
  }

  final results = {"data": data, "notification": notification};

  if (notification == null || data == null) {
    Logger.d("Empty message payload");
    return null;
  }

  final groupId = data["groupId"];
  final channelId = data["channelId"];

  if (groupId == null || channelId == null) {
    Logger.d("Missing properties channelId and groupId");
    return null;
  }

  final messageType = data["type"];

  if (messageType != "message") {
    Logger.d("No action required for type: $messageType");
    return null;
  }

  return results;
}