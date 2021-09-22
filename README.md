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

![image](https://user-images.githubusercontent.com/55688528/134384299-98495fb4-14ff-4155-adda-4d034a149ef3.png)

##### 1.1 Entity types
To create an Entity types we display our oData, right click, import and RFC / BOR Interface (In this case we are going to define our Entity types from an Export parameter of a function).

![image](https://user-images.githubusercontent.com/55688528/134384659-bfdc91ed-72f1-4e0b-a2dd-d6e71aed8de0.png)

We give a name to the Entity type, we choose Target System Local (Since in our case we have the Front and the Back in the same machine, otherwise we would have to choose Remote and indicate our RFC Trusted).

We put the name of our function in which we have the export parameter to define our Entity

![image](https://user-images.githubusercontent.com/55688528/134385759-641dd486-3366-49ad-9550-eae2e5881068.png)

It displays all the parameters of our function, in this case we choose the table "ACTIVITYGROUPS" with all its fields (This table returns the ROLES of our user)

![image](https://user-images.githubusercontent.com/55688528/134385816-91c4382f-a79d-43e3-b150-123a4741de50.png)

We display our Entity types and we can see that we care about the fields. There are types of data that it interprets as very restrictive Dates, decimals, amounts ...
We must put these fields as Nullable since if the field is empty it throws an error.

![image](https://user-images.githubusercontent.com/55688528/134385946-17d05d18-4ee8-480e-990b-3e099b46d9c8.png)

We generate our project from the button ![image](https://user-images.githubusercontent.com/55688528/134386072-8624accc-8bcf-4acf-878f-49ebfc5f7257.png)
And it automatically generates the classes (We can change the name of the classes but it is not necessary)

![image](https://user-images.githubusercontent.com/55688528/134386056-b7eadaff-0735-4842-8551-aca7e5942d7f.png)

We save the project in the package "ZFORMACION" created for that course.

![image](https://user-images.githubusercontent.com/55688528/134386199-65cb6f99-29f6-4eae-b85e-0339d7057f81.png)


```
Da un ejemplo
```

### Front-End ⌨️

_Explica que verifican estas pruebas y por qué_

```
Da un ejemplo
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
