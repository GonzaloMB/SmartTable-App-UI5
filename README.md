<h1 align="center"> Smart Table App | SAP FIORI | UI5 🖥️ </h1>

<div align="center">
  Create a Smart Table Web Application from scratch using SAP technologies.
</div>
<div align="center">
  <h3>
    <a href="https://www.linkedin.com/in/gonzalo-meana-balseiro-90a523188/">
      Contact Me 📲
    </a>
  </h3>
</div>

## Starting 🚀
In this practical case we will create an oData (Open Data Protocol) service from scratch and an Smart Table App in UI5 using a table from the sap.m. library.

The smart table creates a responsive table, grid table, tree table, or analytical table based on an **OData (Open Data Protocol)** service and its annotations. The table toolbar comes with additional built-in features, such as personalization, export to spreadsheet, and variant management.

### Pre-requirements 📋

_Tools you need to be able to develop this application_

* **SAP Logon** 
* **SAP Cloud Connector (SCC)** 
* **SAP Cloud Platform (SCP)** or **SAP Business Technology Platform (BTP)**
* **SAP Web IDE** or **SAP BAS** 


## Practical case ⚙️

_In this application we are going to develop both the back-end and the front-end part_

### Back-end 🔩
#### 1. oData
In the SEGW transaction we create a new project, give it the name "Z + our name" and choose the type "Service with SAP Annotations". (In this example we do not use Annotations, but the future may yes, if you do not create it of this type you will have to delete the oData and create it again since once created it does not let you change the type).

![image](https://user-images.githubusercontent.com/55688528/134508689-2c90c75d-484f-4c9b-9505-2547082d0aea.png)

##### 1.1 Entity types
To create an Entity types we display our oData, right click, import and RFC / BOR Interface (In this case we are going to define our Entity types from an Export parameter of a function).

![image](https://user-images.githubusercontent.com/55688528/134508898-2b181f29-e3cb-46c5-9e9b-01a15d97bcc6.png)

We give a name to the Entity type, we choose Target System Local (Since in our case we have the Front and the Back in the same machine, otherwise we would have to choose Remote and indicate our RFC Trusted).

We put the name of our function in which we have the export parameter to define our Entity

![image](https://user-images.githubusercontent.com/55688528/134509322-41b1db38-a6cb-4beb-916f-fc79cb09cd78.png)


It displays all the parameters of our function, in this case we choose the table "ACTIVITYGROUPS" with all its fields (This table returns the ROLES of our user)

![image](https://user-images.githubusercontent.com/55688528/134509688-82b30870-f682-4463-bb48-a9f28eb504fc.png)
![image](https://user-images.githubusercontent.com/55688528/134510829-ee523695-6747-444e-b5dc-58439337e189.png)


We display our Entity types and we can see that we care about the fields. There are types of data that it interprets as very restrictive Dates, decimals, amounts ...
We must put these fields as Nullable since if the field is empty it throws an error.

![image](https://user-images.githubusercontent.com/55688528/134510132-bafcec8a-fb71-41bd-9925-b6a413623544.png)

We generate our project from the button ![image](https://user-images.githubusercontent.com/55688528/134386072-8624accc-8bcf-4acf-878f-49ebfc5f7257.png)
And it automatically generates the classes (We can change the name of the classes but it is not necessary)

![image](https://user-images.githubusercontent.com/55688528/134511071-0bae86d0-211d-4401-ab21-fe3ccea8ee44.png)

We save the project in the package "Local Object" for this course.

![image](https://user-images.githubusercontent.com/55688528/134511345-36c48b17-6b13-4041-903b-f677ae7a06c9.png)

##### 1.2 Métodos

We display the Runtime Artifacts folder that contains the classes of our oData, for this practical case we will only use the ZCL_XX_DPC_EXT class since it is the extension where we can redefine the methods of our Entity.

![image](https://user-images.githubusercontent.com/55688528/134511883-03332494-da34-437e-90c9-bc5c876996e8.png)

Inside our class we display the inherited methods and methods folder, here we will find the methods of our Entity with the following nomenclature:

* XX_GET_ENTITY -Returns us a single record.
* XX_GET_ENTITYSET -Returns us an internal table.
* XX_CREATE_ENTITY -Method to create a record.
* XX_UPDATE_ENTITY -Method to update a record.
* XX_DELETE_ENTITY -Method to Delete a record.

![image](https://user-images.githubusercontent.com/55688528/134512160-334da28c-0012-4e0b-af75-7c190a471aad.png)

We look for the method we want to redefine, in our case XX_GET_ENITYSET since we are going to paint a table with several records.

![image](https://user-images.githubusercontent.com/55688528/134512410-0407ebaa-c03a-45be-8f79-7eeca1ef805b.png)

Once the method is redefined, it will go to the Redefinitions folder, but it will leave the method empty with the input and output stops commented.

In our case, the parameter that we must fill will be ET_ENTITYSET which will return the call with information.

![image](https://user-images.githubusercontent.com/55688528/134513258-ac8ef55e-b763-401c-9bf0-de9bdaeb65f0.png)

Inside the method we call the BAPI_USER_GET_DATAIL function which returns a table with the Roles of the executing user, to this function we pass the internal table Importing of our method so that the function returns it to us and we can process the data from UI5.

For error control we will use the Exception.
/IWBEP/CX_MGW_BUSI_EXCEPTION

![image](https://user-images.githubusercontent.com/55688528/134515262-23230cbc-5dfc-4837-acf6-406f4197e3d0.png)

```abap

    DATA: lt_return TYPE TABLE OF bapiret2.
    CALL FUNCTION 'BAPI_USER_GET_DETAIL'
      EXPORTING
        username       = sy-uname
      TABLES
        activitygroups = et_entityset
        return         = lt_return.
```

### Front-End ⌨️

#### 1. oData
Before starting, we must have a user at [https://account.hanatrial.ondemand.com/#/home/welcome](https://account.hanatrial.ondemand.com/#/home/welcome) to be able to enter SAP
Web IDE.

We open our UI5 development environment in this case Webid, we right click on our Workspace, New and Project From Template

![image](https://user-images.githubusercontent.com/55688528/134516268-f3ee696c-905f-4520-8ef6-8dc96e9f44fd.png)

We choose the SAPUI5 Application type, this will create a blank project but with the necessary structure for our App.

![image](https://user-images.githubusercontent.com/55688528/134516445-a10e8053-4e2b-4d36-9a46-22ba9ce58881.png)

We give a name to our project "Z + our name" and we will put the same Namespace.

![image](https://user-images.githubusercontent.com/55688528/134517008-29305d15-5e82-4d09-8798-06ce7c5a9e1e.png)

We choose the type of view that we are going to use, in this case XML, and we give our view / Controler a name.

![image](https://user-images.githubusercontent.com/55688528/134517168-555fc396-1085-4369-bb3b-2d758a5c9b35.png)

Before starting to design the view of our application we have to configure the Manifest.json file where we define our oData service and our data model.
To modify this file we can use 2 ways, Descriptor Editor (Graphical Interface) or Code Editor (Using Code), in this case I will use the graphical interface and I will put the code below.

![image](https://user-images.githubusercontent.com/55688528/134521200-fb9d7533-2fa8-4a6a-a09f-995055e1f08e.png)



```js

      
```


## Built with 🛠️
_Back-end:_
* **ABAP**

_Gateway:_
* **oData**

_Front-End:_
* **UI5**
* **HTML**
* **CSS**

![](https://gocoding.org/wp-content/uploads/2019/07/SAP-OData-High-Level-Architecture.png?ezimgfmt=ng:webp/ngcb3)

## Author ✒️

* **Gonzalo Meana** - *SAP Developer* - [GonzaloMB](https://github.com/GonzaloMB)

## Expressions of Gratitude 🎁

* Tell others about this project 📢
* Invite someone on the team to have a beer 🍺 or a coffee ☕. 
* Thanks for reading the project 🤓.

---
⌨️ whit ❤️ by [GonzaloMB](https://github.com/GonzaloMB) 😊
