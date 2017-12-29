/**
 * Created by Jai Chaturvedi on 29/05/2017.
 */
({
    loadValues : function (component) {
        var record = component.get("v.record");
        var subheading = '';
        for(var i=0; i<component.get("v.subHeadingFieldsAPI").length ;i++ ){
            var fieldApi=component.get("v.subHeadingFieldsAPI")[i];
            //Processing the relationship field
            if(fieldApi.indexOf('.')>0){
                var relatedRecord=record[fieldApi.split('.')[0]];
                subheading = subheading + relatedRecord[fieldApi.split('.')[1]] + ' • ';
            }
            //sObject properties
            else{
            if(record[component.get("v.subHeadingFieldsAPI")[i]]){
                subheading = subheading + record[component.get("v.subHeadingFieldsAPI")[i]] + ' • ';
            }
            }
        }
        subheading = subheading.substring(0,subheading.lastIndexOf('•'));
        component.set("v.subHeadingFieldValues", subheading);
    },

    choose : function (component,event) {
        var chooseEvent = component.getEvent("lookupChoose");
        chooseEvent.setParams({
            "recordId" : component.get("v.record").Id,
            "recordLabel":component.get("v.record").Name
        });
        chooseEvent.fire();
        console.log('event fired');
    }
})
