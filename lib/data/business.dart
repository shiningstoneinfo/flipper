import 'package:moor/moor.dart';

class BusinessTable extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get name => text().withLength(max: 16)();
}