import 'package:moor/moor.dart';

class VariationTable extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get name => text()();
  IntColumn get branchId =>
      integer().customConstraint('NULL REFERENCES branch_table(id)')();
}