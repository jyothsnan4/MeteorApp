var clearValues = function(){
	$('#make').val("").focus();
	$('#model').val("");
	$('#model').val("");
}
var okCancelEvents = function(selector, callbacks){
	var ok = callbacks.ok || function(){};
	var cancel = callbacks.cancel || function(){};
	var events={};
	events['keyup '+selector+', keydown'+selector+', focusout'+selector]=
	function (evt){
		if(evt.type==="keydown"&& evt.which===27){
			cancel.call(this,evt);
		}
		else if(evt.type === "keyup" && evt.which===13){
			var value = String(evt.target.value ||"");
			if(value)
			ok.call(this,value,evt);
			else
			cancel.call(this,evt);
		}
	};
	return events;
};
CarBrands = new Meteor.Collection('carbrands');
if (Meteor.isClient) {
	Template.main.helpers({
	    carbrands:function(){
		return CarBrands.find();
	}
});
Template.main.events(okCancelEvents(
	'#brand',
	{
		ok: function(text, evt){
			var make = $('#make').val();
			var model = $('#model').val();
			CarBrands.insert({make:make, model:model,brand:text});
			clearValues();
		}
	}
	));
}

if (Meteor.isServer) {
  
}
