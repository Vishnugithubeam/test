namespace my.bookshop;

entity Books {
  key ID : Integer;
  title  : String;
  stock  : Integer;
  EmployeeID : Integer;
  name : String @cds.persistence.skip;
}



// entity userId{
//   key ID : Integer;
//   name :String;
// }
//view test projection on srv.getTodos;