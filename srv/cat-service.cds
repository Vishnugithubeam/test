using my.bookshop as my from '../db/schema';

service CatalogService {
    entity Books as projection on my.Books;

    function getTodos()  returns array of {
        userId : Integer;
        id : Integer;
        title : String;
        completed : Boolean
    };

    function getTodose() returns array of {
        userId : Integer;
        id : Integer;
        title : String;
        completed : Boolean

    };

    entity Employee {
        key EmployeeID : Integer;
            LastName   : String;

    }

    function getEMP()    returns array of {

    }
}

annotate CatalogService.Books with @odata.draft.enabled;
