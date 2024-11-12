const cds = require('@sap/cds')

class CatalogService extends cds.ApplicationService {
  /** Registering custom event handlers */


  init() {
    const { Employee } = this.entities;

    this.on("getTodos", async (req) => {
      const todoAPI = await cds.connect.to("jsonplaceholder")
      const extData = await todoAPI.tx(req).get("/todos");
      return await todoAPI.tx(req).get("/todos")

    })
    this.on("READ", "Employee", async (req) => {
      const todoAPI = await cds.connect.to("NWD")
      const extData = await todoAPI.tx(req).get("/Employees?$format=json")
      //return extData;
      // const extData = await todoAPI.tx(req).get("/todos");
      const newData = extData.value.map(emp => ({ EmployeeID: emp.EmployeeID, LastName: emp.LastName }));
      return newData;

    })

    this.after("READ", 'Books', async (data,req) => {
      // Convert to array, if it's only a single risk, so that the code won't break here
      const Books = Array.isArray(data) ? data : [data];
      //const todoAPI = await cds.connect.to("NWD");
      //const extData = await todoAPI.tx( ).get("Employees(1)");
      //const ename = extData.LastName;
      const empIDs = data.map(emp => emp.EmployeeID);
      const empnames = await SELECT.from(Employee).columns('EmployeeID', 'LastName').where({ EmployeeID: { in: empIDs } });
      console.log(empnames);
      //const empp = SELECT from Employee { EmployeeID };


      // Looping through the array of risks to set the virtual field 'criticality' that you defined in the schema
      Books.forEach(async (Book) => {

        
       // const { status_code } = await SELECT.one(Employee.LastName).where({ EmployeeID: Book.EmployeeID })
        const name = await SELECT.from(Employee).columns('LastName').where({ EmployeeID: Book.EmployeeID });
        Book.name = name;
      })
    })

    this.on("getTodose", async (req) => {
      const todoAPI = await cds.connect.to("jsonplaceholder")
      const extData = await todoAPI.tx(req).get("/todos");
      const newData = extData.map(({ userId, title }) => ({ userId, title }));
      return newData;


    })

    this.on("getEMP", async (req) => {
      const todoAPI = await cds.connect.to("NWD")
      const extData = await todoAPI.tx(req).get("/Employees?$format=json")
      //return extData;
      // const extData = await todoAPI.tx(req).get("/todos");
      const newData = extData.value.map(emp => ({ EmployeeID: emp.EmployeeID, LastName: emp.LastName }));
      return newData;

    })



    return super.init();
  }


}
module.exports = { CatalogService }