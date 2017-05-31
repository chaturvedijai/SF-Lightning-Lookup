# SF-Lightning-Lookup

:point_right: **_Note: This component was built with version 40.0 (Summer 17). Different behaviour noticed with previous releases because of lightning:input use._**

This lightning component is created to act like a Lookup field. Because in the Lightning world look-up behaves like auto-complete input field, this component replicates the more or less same behaviour.

This can be configured with other lightning components easily by giving the Lookup field API name to the "**chosenRecordId**" attribute of Lookup component. Use of Bound expression **chosenRecordId="{!v.record.LookUpFieldAPI}"** automatically places the selected record with record's Lookup field.

## Component Details

### :zap: Component Bundle: Lookup
###### Attributes
- **objectAPIName** : Object API Name for which query will be made. Required
- **chosenRecordId** : Holds the selected record Id for look-up field. Required
- **chosenRecordLabel** : Holds the Name field value of selected record
- **subHeadingFieldsAPI** : Holds the extra fields which can be used to show below the Name field in record list.
![](/src/ExtraFields.PNG "Adding extra field details")
- **matchingRecords** : Holds the list of matched records.
- **fieldLabel** : Label of input field. Required
- **filter** : Filter to be applied while searching records. Consider this as Look-up filter. Values must be given separated by comma(,)

### :zap: Component Bundle: LookupItem
Component used for creating list elements for records drop-down. Used in Lookup component
###### Attributes
- **record** : Holds the single record instance. Required
- **iconCategoryName** : Lightning icon category-icon name to show with each record element.

### :zap: Event: LookupChooseEvent
Component level event used to store and fill the input field with selected record Id and Name. Fired from *LookupItem* component, handled at *Lookup* component.
- **recordId** : Used to send selected record Id. Required
- **recordLabel** : Used to send selected record Name. Required

### :green_book: Implementation Notes:
- On focusing the input field it shows the recent items viewed for given Object. This replcates the standard beahviour noticed in standard lightning lookup fields. If **_filter_** attribute is given then recent items will respect the filter condition.
- SOSL and SOQL both are utilizied to search for records. SOQL is used to fetch the recently viewed records because SOSL cannoot accept blank text. SOSL is used if input field has text. Also, because searching can be done on non-index fields SOSL gives better performance in terms of speed and record list. With SOSL text fields are considered as indexed.
- Input text must be greater than 3 in size. Noticed that SOSL throws an error with less than 3 search string length.
- To show and hide the record drop-down list SLDS "slds-combobox-lookup", "slds-is-open" classes and "v.aria-expanded" attribute is used.
- $A.getCallback() is used to hide the record list on "**_onblur_**" of input field. Because we have an event firing on click of list item, **_onblur_** conflict is noticed and dosen't allows to fire the "**LookupChooseEvent**" event.
- Maintains the record sharing security.

### :green_book: Usage:
_Note: By default SLDS is not included in these components to avoid extra loading of css files_

##### Standalone in Lightning App
```html
<aura:application description="LookupApp" extends="force:slds">

    <!-- with Filter -->
    <c:Lookup fieldLabel="Contact" objectAPIName="Contact"
              subHeadingFieldsAPI="Email,Phone"
              placeholder="Search Contact"
              filter="AccountId='001200000047KEdAAM'"/>

    <!-- without Filter -->
    <c:Lookup fieldLabel="Contact" objectAPIName="Contact"
              subHeadingFieldsAPI="Email,Phone"
              placeholder="Search Contact"/>

</aura:application>
```

##### With other lightning component. 
```html
//Notice the unbound expression ({#v.contact.Account.Name}) for chosenRecordLabel. 
//Because we don't want to update Related record Name the unbound expression will avoid the setup of extra standard event handling mechanism.

<aura:attribute name="contact"
                    type="Contact"
                    description="Contact record"/>
                    
<c:Lookup fieldLabel="Account" objectAPIName="Account"
          subHeadingFieldsAPI="AccountNumber,Phone"
          placeholder="Search Account"
          chosenRecordLabel="{#v.contact.Account.Name}"
          chosenRecordId="{!v.contact.AccountId}"
          aura:id="lookupid"/>
          
```
