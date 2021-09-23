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
##### 1.2 Properties
To parameterize the filters and the ordering of the SmartTable records, the fields must be marked as Sortable and Filterable.
_Note: The FromDat and ToDat fields must have the Nullable property marked because otherwise when the call is made from the SmartTable it would give an error._
![image](https://user-images.githubusercontent.com/55688528/134537862-bce5ad98-6c8a-442d-bc5b-16bb871261f7.png)

We generate our project from the button ![image](https://user-images.githubusercontent.com/55688528/134386072-8624accc-8bcf-4acf-878f-49ebfc5f7257.png)
And it automatically generates the classes (We can change the name of the classes but it is not necessary)

![image](https://user-images.githubusercontent.com/55688528/134511071-0bae86d0-211d-4401-ab21-fe3ccea8ee44.png)

We save the project in the package "Local Object" for this course.

![image](https://user-images.githubusercontent.com/55688528/134511345-36c48b17-6b13-4041-903b-f677ae7a06c9.png)

##### 1.3 Métodos

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
Finally we will register our service in SAP Gateway with the /n/IWFND/MAINT_SERVICE transaction.
In my case the service is already registered, if your service is not registered we click on "Add Service".
![image](https://user-images.githubusercontent.com/55688528/134529021-3b7e1bf2-4768-4bf8-91e3-d972700aafd8.png)

We look for our service and click on it, then we add the service.
![image](https://user-images.githubusercontent.com/55688528/134529419-58a3276a-762a-4d3c-bf4d-5b290ec2c7fb.png)
![image](https://user-images.githubusercontent.com/55688528/134529935-eeb57fc5-c885-4fd2-88e3-919d126ef2d3.png)



### Front-End ⌨️
#### 2. Connections
First we have to install Cloud connector and SAP JVM in our store, we can download them from.
[https://tools.hana.ondemand.com/#cloud](https://tools.hana.ondemand.com/#cloud)
![image](https://user-images.githubusercontent.com/55688528/134530388-ae92738a-2b80-42ec-b54d-2172ebaeaeed.png)
![image](https://user-images.githubusercontent.com/55688528/134530408-630c9808-71a6-44b4-85ff-884b8e5d2c0d.png)

Once the two components are installed and registered in Hanatrial ondemand, we must access **https://localhost:8443/** from the browser.

* **User:** Administrator
* **Password:** manage

Once inside we configure our user.

![image](https://user-images.githubusercontent.com/55688528/134530786-ea9b8ecb-da7a-4afe-9964-1a746b53ceea.png)
![image](https://user-images.githubusercontent.com/55688528/134530997-deb2d61c-be80-42cb-8d27-47801bddeda0.png)

When our user is configured we go to the Cloud To On-Premise tab to configure the connection to our machine.

![image](https://user-images.githubusercontent.com/55688528/134531207-3cf2a209-b238-44e5-88e6-18e9196ea04b.png)

Finally we enter our SAP Cloud Platform to configure the connection to our SAP machine.
https://account.hanatrial.ondemand.com/#/home/welcome

We go to the tab Connectivity -> Destinations, and add a new connection.

![image](https://user-images.githubusercontent.com/55688528/134531764-114d0d49-9240-46f1-b1b3-f009e323a6d5.png)


#### 3. UI5
Before starting, we must have a user at [https://account.hanatrial.ondemand.com/#/home/welcome](https://account.hanatrial.ondemand.com/#/home/welcome) to be able to enter SAP
Web IDE.

We open our UI5 development environment in this case Webid, we right click on our Workspace, New and Project From Template.

![image](https://user-images.githubusercontent.com/55688528/134516268-f3ee696c-905f-4520-8ef6-8dc96e9f44fd.png)

We choose the SAPUI5 Application type, this will create a blank project but with the necessary structure for our App.

![image](https://user-images.githubusercontent.com/55688528/134516445-a10e8053-4e2b-4d36-9a46-22ba9ce58881.png)

We give a name to our project "Z + our name" and we will put the same Namespace.

![image](https://user-images.githubusercontent.com/55688528/134517008-29305d15-5e82-4d09-8798-06ce7c5a9e1e.png)

We choose the type of view that we are going to use, in this case XML, and we give our view / Controler a name.

![image](https://user-images.githubusercontent.com/55688528/134517168-555fc396-1085-4369-bb3b-2d758a5c9b35.png)

#### 3.1 Manifest
Before starting to design the view of our application we have to configure the Manifest.json file where we define our oData service and our data model.
To modify this file we can use 2 ways, Descriptor Editor (Graphical Interface) or Code Editor (Using Code), in this case I will use the graphical interface and I will put the
code below.

![image](https://user-images.githubusercontent.com/55688528/134521200-fb9d7533-2fa8-4a6a-a09f-995055e1f08e.png)

In Service Catalog we look for our previously configured system, and then we look for our OData service.

![image](https://user-images.githubusercontent.com/55688528/134532290-144c67ce-6a0a-4472-b82b-f0024b3be282.png)

In this example we select the default model and finish.

![image](https://user-images.githubusercontent.com/55688528/134532709-41f535b4-2a94-4789-8c79-0c45b1c2c195.png)
![image](https://user-images.githubusercontent.com/55688528/134532832-d75bdcb5-ee75-46f6-bb6c-99bccf5dfa10.png)

With Code Editor: 

```json
{
	"_version": "1.12.0",
	"sap.app": {
		"id": "Z + our name.Z + our name",
		"type": "application",
		"i18n": "i18n/i18n.properties",
		"applicationVersion": {
			"version": "1.0.0"
		},
		"title": "{{appTitle}}",
		"description": "{{appDescription}}",
		"sourceTemplate": {
			"id": "servicecatalog.connectivityComponentForManifest",
			"version": "0.0.0"
		},
		"dataSources": {
			"Z + our name_SRV": {
				"uri": "/sap/opu/odata/sap/Z + our name_SRV/",
				"type": "OData",
				"settings": {
					"localUri": "localService/metadata.xml"
				}
			}
		}
	},
	"sap.ui": {
		"technology": "UI5",
		"icons": {
			"icon": "",
			"favIcon": "",
			"phone": "",
			"phone@2": "",
			"tablet": "",
			"tablet@2": ""
		},
		"deviceTypes": {
			"desktop": true,
			"tablet": true,
			"phone": true
		}
	},
	"sap.ui5": {
		"flexEnabled": false,
		"rootView": {
			"viewName": "Z + our name.Z + our name.view.View1",
			"type": "XML",
			"async": true,
			"id": "View1"
		},
		"dependencies": {
			"minUI5Version": "1.65.6",
			"libs": {
				"sap.ui.layout": {},
				"sap.ui.core": {},
				"sap.m": {}
			}
		},
		"contentDensities": {
			"compact": true,
			"cozy": true
		},
		"models": {
			"i18n": {
				"type": "sap.ui.model.resource.ResourceModel",
				"settings": {
					"bundleName": "Z + our name.Z + our name.i18n.i18n"
				}
			},
			"": {
				"type": "sap.ui.model.odata.v2.ODataModel",
				"settings": {
					"defaultOperationMode": "Server",
					"defaultBindingMode": "OneWay",
					"defaultCountMode": "Request"
				},
				"dataSource": "Z + our name_SRV",
				"preload": true
			}
		},
		"resources": {
			"css": [
				{
					"uri": "css/style.css"
				}
			]
		},
		"routing": {
			"config": {
				"routerClass": "sap.m.routing.Router",
				"viewType": "XML",
				"async": true,
				"viewPath": "Z + our name.Z + our name.view",
				"controlAggregation": "pages",
				"controlId": "app",
				"clearControlAggregation": false
			},
			"routes": [
				{
					"name": "RouteView1",
					"pattern": "RouteView1",
					"target": [
						"TargetView1"
					]
				}
			],
			"targets": {
				"TargetView1": {
					"viewType": "XML",
					"transition": "slide",
					"clearControlAggregation": false,
					"viewId": "View1",
					"viewName": "View1"
				}
			}
		}
	}
}
      
```

#### 3.2 View
The first thing we do is import the libraries that we are going to use:
* sap.ui.core.mvc
* sap.m
* sap.ui.comp.smartfilterbar
* sap.ui.comp.smarttable


We define the smartTable tag with the following attributes:

* **entitySet:** We refer to the entity created in our oData.
* **smartFilterId:** It refers to the Id of our smartFilterBar
* **tableType:** Type of table that we want to show Help types
* **showFullScreenButton:** It shows us a button to see the table in full screen
* **useExportExcel:** It shows us a button to export the table in Excel
* **demandPopin:** Responsive mode on mobile devices.
* **useVariantManagement:** Generates variants for the layout of the fields.
* **useTablePersonalization:** Enable column customization.
* **header:** Name that appears in the Record Counter.
* **showRowCount:** Activate register counter.
* **persistencyKey:** Key name of our SmartTable.
* **enableAutoBinding:** Activate the call to our entity automatically.

It is not necessary to define the columns that are shown in the table since we will control it with the Annotations.

File View1.view.xml:

```xml
<mvc:View controllerName="ZGONZALOMB.ZGONZALOMB.controller.View1" xmlns:mvc="sap.ui.core.mvc" displayBlock="true" xmlns="sap.m"
	xmlns:core="sap.ui.core" xmlns:smartFilterBar="sap.ui.comp.smartfilterbar" xmlns:smartTable="sap.ui.comp.smarttable"
	xmlns:smartForm="sap.ui.comp.smartform" xmlns:smartField="sap.ui.comp.smartfield" xmlns:smartVariantManagement="sap.ui.comp.smartvariants"
	xmlns:html="http://www.w3.org/1999/xhtml" xmlns:app="http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1">
	<Shell id="shell">
		<App id="app">
			<pages>
				<Page id="page" title="{i18n>title}">
					<content>
						<smartFilterBar:SmartFilterBar 
							id="smartFilterBar"
							entitySet="ActivitygroupsSet"
							persistencyKey="SmartFilter_Explored"
							considerAnalyticalParameters="true">
							<smartFilterBar:layoutData>
								<FlexItemData shrinkFactor="0"/>
							</smartFilterBar:layoutData>
						</smartFilterBar:SmartFilterBar>
						<smartTable:SmartTable 
							id="LineItemsSmartTable" 
							entitySet="ActivitygroupsSet"
							smartFilterId="smartFilterBar"
							ableType="ResponsiveTable"
							showFullScreenButton="true" 
							useExportToExcel="true" 
							beforeExport="onBeforeExport"
							demandPopin="true"
							useVariantManagement="true"
							useTablePersonalisation="true" 
							header="Registros"
							showRowCount="true" 
							persistencyKey="disposicion"
							enableAutoBinding="true"
							class="sapUiResponsiveContentPadding">
							<smartTable:layoutData>
								<FlexItemData growFactor="1" baseSize="0%"/>
							</smartTable:layoutData>
						</smartTable:SmartTable>
					</content>
				</Page>
			</pages>
		</App>
	</Shell>
</mvc:View>
```
#### 3.3 Annotations
We create a folder with the name 'annotations' and within this we create the Annotations file, we leave the default name and select our oData service.

![image](https://user-images.githubusercontent.com/55688528/134545104-c5721231-d124-439e-81bd-ef49f2c698bb.png)
![image](https://user-images.githubusercontent.com/55688528/134545212-028e0fe4-a94f-480e-a9e8-fe1088e4e01c.png)

In our Annotations file we add a LineItem that governs the columns of our SmartTable and in our LineItem we add a DataField for each field that we want to show in a standard way in our table, referring in the value to the field of our entityset.

![image](https://user-images.githubusercontent.com/55688528/134545299-4e5a2880-5f81-4356-a5ac-bcb4a55ab770.png)

To add search aids to each field we select Select Targets.

![image](https://user-images.githubusercontent.com/55688528/134545645-af8615bd-297e-4114-9606-69ac2b945000.png)

We display our entity and select each of the fields that have search assistance.

![image](https://user-images.githubusercontent.com/55688528/134545761-df9dcf70-c772-48c4-ad78-4decd3920e7e.png)

Once the fields have been selected we have to add a list of values with the ValueList node, within this node we add our entityset in the CollectionPatch attribute that
the search help will call and we also add the SearchSupported = true attribute.

In our ValueList we also add the Parameters node (It governs the columns that our search help shows), and we add the ValueListParameterInOut attribute by selecting our
field, which will be the key field of our search aid and to finish if we want another column with a description field we add the ValueListParameterDisplay attribute with the description field of our entity.

![image](https://user-images.githubusercontent.com/55688528/134554019-e40c22a3-8990-4316-a92d-92f21b1b2c1a.png)

To add a default filter to the SmartFilterBar, in our Entity Type inside Local Annotations we add a UI.SelectionFields and inside an Item where we will select the field that we want to show as a filter.

![image](https://user-images.githubusercontent.com/55688528/134550492-41e6e823-4be2-4548-8749-aef0c9e0cd25.png)

Code Editor anotation0.xml

```xml
<edmx:Edmx xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx" Version="4.0">
	<edmx:Reference Uri="/sap/opu/odata/sap/ZGONZALOMB_SRV_01/$metadata">
		<edmx:Include Alias="Metadata" Namespace="ZGONZALOMB_SRV_01"/>
	</edmx:Reference>
	<edmx:Reference Uri="https://wiki.scn.sap.com/wiki/download/attachments/448470968/UI.xml?api=v2">
		<edmx:Include Alias="UI" Namespace="com.sap.vocabularies.UI.v1"/>
	</edmx:Reference>
	<edmx:Reference Uri="https://wiki.scn.sap.com/wiki/download/attachments/448470974/Common.xml?api=v2">
		<edmx:Include Alias="Common" Namespace="com.sap.vocabularies.Common.v1"/>
	</edmx:Reference>
	<edmx:DataServices>
		<Schema xmlns="http://docs.oasis-open.org/odata/ns/edm" Namespace="ZGONZALOMB.annotations.annotation0.ZGONZALOMB_SRV_01">
			<Annotations Target="Metadata.Activitygroups">
				<Annotation Term="UI.SelectionFields">
					<Collection>
						<PropertyPath>AgrName</PropertyPath>
					</Collection>
				</Annotation>
				<Annotation Term="UI.LineItem">
					<Collection>
						<Record Type="UI.DataField">
							<PropertyValue Property="Value" Path="AgrName"/>
						</Record>
						<Record Type="UI.DataField">
							<PropertyValue Property="Value" Path="FromDat"/>
						</Record>
						<Record Type="UI.DataField">
							<PropertyValue Property="Value" Path="ToDat"/>
						</Record>
						<Record Type="UI.DataField">
							<PropertyValue Property="Value" Path="AgrText"/>
						</Record>
						<Record Type="UI.DataField">
							<PropertyValue Property="Value" Path="OrgFlag"/>
						</Record>
					</Collection>
				</Annotation>
			</Annotations>
			<Annotations Target="Metadata.Activitygroups/AgrName">
				<Annotation Term="Common.ValueList">
					<Record Type="Common.ValueListType">
						<PropertyValue Property="CollectionPath" String="ActivitygroupsSet"/>
						<PropertyValue Property="SearchSupported" Bool="false"/>
						<PropertyValue Property="Parameters">
							<Collection>
								<Record Type="Common.ValueListParameterInOut">
									<PropertyValue Property="LocalDataProperty" PropertyPath="AgrName"/>
									<PropertyValue Property="ValueListProperty" String="AgrName"/>
								</Record>
								<Record Type="Common.ValueListParameterDisplayOnly">
									<PropertyValue Property="ValueListProperty" String="AgrText"/>
								</Record>
							</Collection>
						</PropertyValue>
					</Record>
				</Annotation>
			</Annotations>
		</Schema>
	</edmx:DataServices>
</edmx:Edmx>
```
This would be the result of our SmartTable UI5 App.

https://user-images.githubusercontent.com/55688528/134554564-73176350-1435-4120-9039-0311f9bacd0c.mp4

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
