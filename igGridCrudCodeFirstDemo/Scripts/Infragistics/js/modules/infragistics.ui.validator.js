﻿/*!@license
* Infragistics.Web.ClientUI Validator localization resources 16.1.20161.2052
*
* Copyright (c) 2011-2016 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/
(function($){$.ig=$.ig||{};if(!$.ig.Validator){$.ig.Validator={locale:{defaultMessage:"This field needs attention",selectMessage:"A value should be selected",rangeSelectMessage:"At least {0} but no more than {1} items should be selected",minSelectMessage:"At least {0} item(s) should be selected",maxSelectMessage:"No more than {0} item(s) should be selected",rangeLengthMessage:"Entry should be between {0} and {1} characters long",minLengthMessage:"Entry should be at least {0} character(s) long",maxLengthMessage:"Entry should be no more than {0} character(s) long",requiredMessage:"This field is required",patternMessage:"Entry does not match the required pattern",maskMessage:"All required positions should be filled",dateFieldsMessage:"Date field values should be entered",invalidDayMessage:"A valid day of the month should be entered",dateMessage:"A valid date should be entered",numberMessage:"A valid number should be entered",rangeValueMessage:"A value between {0} and {1} should be entered",minValueMessage:"A value of at least {0} should be entered",maxValueMessage:"A value no more than {0} should be entered",emailMessage:"A valid email address should be entered",equalToMessage:"The two values do not match",optionalString:"(optional)"}}}})(jQuery);/*!@license
* Infragistics.Web.ClientUI Editors 16.1.20161.2052
*
* Copyright (c) 2011-2016 Infragistics Inc.
*
* http://www.infragistics.com/
* Depends on:
* jquery-1.4.4.js
* jquery.ui.core.js
* jquery.ui.widget.js
* infragistics.util.js
* infragistics.ui.popover.js
* infragistics.ui.notifier.js

* Example to use:
*	<script type="text/javascript">
*	$(function () {
*		$('#text1').igValidator({ minLength: 3 });
*	});
*	</script>
*	<input id="text1" type="text" />
*/
(function($){$.widget("ui.igValidator",{options:{onchange:false,onblur:true,onsubmit:true,required:false,number:false,date:false,email:false,lengthRange:null,valueRange:null,pattern:null,messageTarget:null,errorMessage:null,successMessage:null,threshold:-1,equalTo:null,custom:null,fields:[{selector:null}],notificationOptions:null,requiredIndication:false,optionalIndication:false},css:{target:"ui-igvalidator-target",requiredIndication:"ui-igvalidator-required-indication",optionalIndication:"ui-igvalidator-optional-indication"},events:{validating:"validating",validated:"validated",success:"success",error:"error",errorShowing:"errorShowing",errorHiding:"errorHiding",errorShown:"errorShown",errorHidden:"errorHidden",successShowing:"successShowing",successHiding:"successHiding",successShown:"successShown",successHidden:"successHidden",formValidating:"formValidating",formValidated:"formValidated",formError:"formError",formSuccess:"formSuccess"},locale:{defaultMessage:"Please fix this field",selectMessage:"Please select a value",rangeSelectMessage:"Please select no more than {1} and not less than {0} items",minSelectMessage:"Please select at least {0} items",maxSelectMessage:"Please select no more than {0} items",rangeLengthMessage:"Please enter a value between {0} and {1} characters long",minLengthMessage:"Please enter at least {0} characters",maxLengthMessage:"Please enter no more than {0} characters",requiredMessage:"This field is required",patternMessage:"Please fix pattern of this field",maskMessage:"Please fill all required positions",dateFieldsMessage:"Please enter values in date fields",invalidDayMessage:"Invalid day of month. Please enter correct day",dateMessage:"Please enter a valid date",numberMessage:"Please enter a valid number",rangeValueMessage:"Please enter a value between {0} and {1}",minValueMessage:"Please enter a value greater than or equal to {0}",maxValueMessage:"Please enter a value less than or equal to {0}",emailMessage:"Please enter a valid email address",equalToMessage:"Values don't match",optionalString:"(optional)"},emailRegEx:/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,numberRegEx:"^-?[\\d]+({0}[\\d]+)?$",notifierDefaults:{state:"error"},_createWidget:function(){delete this.options.fields;$.Widget.prototype._createWidget.apply(this,arguments)},_create:function(){this._decimalSeparator=".";this._thousandsSeparator=",";this._formHandleCounter=0;this._fieldOptions=this.options.fields?$.extend([],this.options.fields):null;var shouldHandleForm=false;if(this.options.fields){for(var i=0;i<this.options.fields.length;i++){var options=this.options.fields[i];this._initializeField($(options.selector),options);if(options.onsubmit!==undefined?options.onsubmit:this.options.onsubmit){shouldHandleForm=true;this._formHandleCounter++}}}else{this._initializeField(this.element,this.options)}this._attachToForm(shouldHandleForm||this.options.onsubmit)},_setOption:function(option,value){switch(option){case"notificationOptions":this.options.notificationOptions=value;this._updateNotifiers();break;case"onchange":case"onblur":if(!this.options.fields&&!this.options._control){this.element.unbind(".validator");this._attachFieldEvents(this.element)}break;case"onsubmit":if(this.options.onsubmit===value){break}if(this.options.fields){for(var i=0;i<this.options.fields.length;i++){if(this.options.fields[i].onsubmit===undefined){if(value){if(!this._formHandleCounter){this._attachToForm(true)}this._formHandleCounter++}else if(!--this._formHandleCounter){this._detachFromForm()}}}}break;case"messageTarget":var oldVisible=this._fieldMessageVisible(this.options);this._clearMessageTarget(this.options);this._hideSuccess(this.options);this._hideError(this.options);this.options.messageTarget=value;this._evalMessageTarget(this.options);if(oldVisible){if(this.options.isValid){this._showSuccess(this.options,{message:this.options._currentMessage})}else{this._showError(this.options,{message:this.options._currentMessage})}}break;case"errorMessage":case"successMessage":this._hideError(this.options);this._hideSuccess(this.options);break;case"requiredIndication":case"optionalIndication":this._removeFieldIndications(this.options);this.options[option]=value;this._addFieldIndications(this.options,this.element);break;case"fields":return;default:break}$.Widget.prototype._setOption.apply(this,arguments)},_initializeField:function(element,options){var target=element;if(!target.length){options._ignored=true;return}options._control=this._getEditor(target);if(options._control){this._form=this._form||target.closest("form").get(0);if(options._control.widgetName==="igCombo"){options._type="selectrange"}else if(options._control.widgetName==="igRating"){options._type="select"}if(options._control._options){options._control._options.validator=this}else{options._control._validator=this}}else{var elemType=target[0].tagName;switch(elemType){case"INPUT":if(target[0].type==="checkbox"){options._group=this._findGroupTargets(target);options._type=options._group.length>1?"checkboxrange":"checkbox";target=options._group}else if(target[0].type==="radio"){options._group=this._findGroupTargets(target);options._type="radio";target=options._group}else{options._type="input"}break;case"TEXTAREA":options._type="textarea";break;case"SELECT":if(target[0].multiple){options._type="selectrange"}else{options._type="select"}break;case"FORM":this._form=this._form||target[0];options._ignored=true;return;default:this._form=this._form||target.closest("form").get(0);options._ignored=true;return}this._attachFieldEvents(target)}options._ignored=false;target.addClass(this.css.target);target.data("igValidatorField",options);options.notifyTarget=this._targetFromOptions(options,true);this._evalMessageTarget(options);this._ensureNotifier(options,true);this._addFieldIndications(target,options)},_findGroupTargets:function(target){if(target[0].name){return $("[name="+target[0].name+"]",target[0].form||document)}return target},_attachFieldEvents:function(element){var self=this,evts={"keyup.validator":function(e){if(e.keyCode!==9&&e.keyCode<15||e.keyCode>20){self._validateInternal(element,e)}},"change.validator":function(e){self._validateInternal(element,e)},"cut.validator":function(e){setTimeout(function(){self._validateInternal(element,e)},10)},"paste.validator":function(e){setTimeout(function(){self._validateInternal(element,e)},10)},"drop.validator":function(e){setTimeout(function(){self._validateInternal(element,e)},10)},"dragend.validator":function(e){setTimeout(function(){self._validateInternal(element,e)},10)},"blur.validator":function(e){self._validateInternal(element,e,true)}};element.bind(evts)},_ensureNotifier:function(options,reinit){if(reinit&&options.notifyTarget.data("igNotifier")){options.notifyTarget.igNotifier("destroy").unbind(".validator")}if(!options.notifyTarget.data("igNotifier")){var args={owner:this,target:options.notifyTarget,fieldOptions:options===this.options?null:options};options.notifyTarget.igNotifier($.extend({},this.notifierDefaults,this.options.notificationOptions,options.notificationOptions)).bind({"ignotifiershowing.validator":function(evt,ui){return args.owner._handleNotifierEvent(evt,ui,"Showing",args)},"ignotifiershown.validator":function(evt,ui){return args.owner._handleNotifierEvent(evt,ui,"Shown",args)},"ignotifierhiding.validator":function(evt,ui){return args.owner._handleNotifierEvent(evt,ui,"Hiding",args)},"ignotifierhidden.validator":function(evt,ui){return args.owner._handleNotifierEvent(evt,ui,"Hidden",args)}})}},_updateNotifiers:function(){if(this.options.fields){for(var i=0;i<this.options.fields.length;i++){this._ensureNotifier(this.options.fields[i],true)}}else{this._ensureNotifier(this.options,true)}},_clearMessageTarget:function(options){if(options._$messageTarget){options._$messageTarget.removeClass("field-validation-valid field-validation-error").empty().css("display","")}},_evalMessageTarget:function(options){options._$messageTarget=options.messageTarget;if(typeof options._$messageTarget==="string"){var target=$("[data-valmsg-for='"+options._$messageTarget+"']");options._$messageTarget=target.length?target:$(options._$messageTarget)}if(options._$messageTarget instanceof $){if(options._$messageTarget.length){options._$messageTarget.hide()}else{options._$messageTarget=null}}},_addFieldIndications:function(element,options){if(options._group&&options._group.length>1||options._control&&options._control.widgetName==="igRating"){return}if(options.required&&options.requiredIndication){options._$indicator=element.after("<span title='"+this._getLocalizedMessage("required")+"' class='"+this.css.requiredIndication+"'>*</span>").next()}if(!options.required&&options.optionalIndication){options._$indicator=element.after("<span class='"+this.css.optionalIndication+"'>"+this._getLocalizedMessage("optional","String")+"</span>").next()}},_removeFieldIndications:function(options){if(options._$indicator){options._$indicator.hide();options._$indicator.remove();delete options._$indicator}},_attachToForm:function(shouldHandleForm){this._form=this._form||this.element[0].form||this.element.closest("form").get(0);if(!this._form||!shouldHandleForm){return}if(!this._form._igValidators||!this._form._igValidators.length){this._form._igValidators=[];$(this._form).bind("submit.validator",function(e){this._igErrorShown=false;var summaryResult=true,current;for(var i=0;i<this._igValidators.length;i++){current=this._igValidators[i]._validateForm(e);summaryResult=summaryResult?current:summaryResult}if(!summaryResult){e.preventDefault();e.stopPropagation()}})}this._form._igValidators.push(this)},_detachFromForm:function(){var index;if(this._form&&(index=$.inArray(this,this._form._igValidators))>-1){this._form._igValidators.splice(index,1);if(!this._form._igValidators.length){$(this._form).unbind("submit.validator")}}},_validate:function(field,evt,isSubmitting){var current,i,valid=true;if(this.options.fields){if(field!==undefined&&(i=this._fieldIndexOf(field))>-1){field=this.options.fields[i];valid=field.isValid=this._validateField(field,evt,isSubmitting)}else{for(i=0;i<this.options.fields.length;i++){field=this.options.fields[i];current=field.isValid=this._validateField(field,evt,isSubmitting);valid=valid?current:valid}}}else{valid=this._validateField(this.options,evt,isSubmitting);this.options.isValid=valid}return valid},_validateForm:function(evt){var valid=true,args={owner:this,target:$(evt.target)};if(this._trigger(this.events.formValidating,evt,args)){if(!$.ui.igValidator.defaults.showAllErrorsOnSubmit&&this._form&&this._form._igErrorShown){this._skipMessages=true}args.valid=valid=this._validate(null,evt,true);this._trigger(this.events.formValidated,evt,args);this._trigger(valid?this.events.formSuccess:this.events.formError,evt,args)}return valid},_validateInternal:function(element,evt,blur,value){element=element||evt&&(element=$(evt.target).closest("."+this.css.target)).length||this.element;var field=element.data("igValidatorField");if(field){field.isValid=this._validateField(field,evt||{},false,value,blur);return field.isValid}if(value!==undefined){this.options.isValid=this._validateField(this.options,evt||{},false,value,blur);return this.options.isValid}else{return this._validate(null,evt||{})}},_validateField:function(opts,evt,isSubmitting,value,blur){if(opts._ignored){return true}var options=this._addGlobalSettings(opts);value=value!==undefined?value:this._getTargetValue(options);var min,max,isNumber=this._isNumber(options,value),isDateParsable=!isNaN(new Date(value).getSeconds()),isDate=value instanceof Date,hasLength=value!==undefined&&value!==null&&value.length!==undefined,internalValue=isNumber?value.toString():value;if(isSubmitting&&!options.onsubmit){return true}if(!this._forceValidation&&!isSubmitting){if(blur&&!options.onblur||!blur&&!options.onchange){return true}if(options.hasOwnProperty("threshold")&&hasLength&&value.length<=options.threshold){return true}}var args={value:value,owner:this,fieldOptions:options===this.options?null:opts};if(evt&&!this._trigger(this.events.validating,evt,args)){return true}opts._currentMessage=null;if(options.required&&(!internalValue||value.length===0)){switch(options._type){case"checkboxrange":case"radio":case"select":case"selectrange":opts._currentMessage=this._getRuleMessage(options,"required","select");break;default:opts._currentMessage=this._getRuleMessage(options,"required","required")}args.message=opts._currentMessage;args.rule="required";this._showError(options,args,evt);return false}else if(!options.required&&!internalValue){args.message=opts._currentMessage=options.successMessage;this._success(options,args,evt,isSubmitting);return true}if(options._control&&typeof options._control.isValid==="function"){var result=options._control.isValid();if(!result){opts._currentMessage=options.errorMessage||options._control._currentMessage||this._getLocalizedMessage("default");args.message=opts._currentMessage;args.rule="control";this._showError(options,args,evt);return false}}if(options.number&&!isNumber&&internalValue){opts._currentMessage=this._getRuleMessage(options,"number","number");args.message=opts._currentMessage;args.rule="number";this._showError(options,args,evt);return false}if(options.date&&!isDateParsable&&internalValue){opts._currentMessage=this._getRuleMessage(options,"date","date");args.message=opts._currentMessage;args.rule="date";this._showError(options,args,evt);return false}if(hasLength&&value.length&&options.lengthRange){var messageType=value.push?"Select":"Length",minLength=options.lengthRange.push?options.lengthRange[0]:options.lengthRange.min,maxLength=options.lengthRange.push?options.lengthRange[1]:options.lengthRange.max;min=minLength&&value.length<minLength;max=maxLength&&value.length>maxLength;if(minLength&&maxLength&&(min||max)){opts._currentMessage=this._getRuleMessage(options,"lengthRange","range"+messageType);opts._currentMessage=opts._currentMessage.replace("{0}",minLength).replace("{1}",maxLength);args.message=opts._currentMessage}else if(min){opts._currentMessage=this._getRuleMessage(options,"lengthRange","min"+messageType);opts._currentMessage=opts._currentMessage.replace("{0}",minLength);args.message=opts._currentMessage}else if(max){opts._currentMessage=this._getRuleMessage(options,"lengthRange","max"+messageType);opts._currentMessage=opts._currentMessage.replace("{0}",maxLength);args.message=opts._currentMessage}if(args.message){args.rule="lengthRange";this._showError(options,args,evt);return false}}if(options.valueRange&&(isDateParsable||isNumber)){var minValue=options.valueRange.push?options.valueRange[0]:options.valueRange.min,maxValue=options.valueRange.push?options.valueRange[1]:options.valueRange.max,hasMin=typeof minValue==="number"||minValue,hasMax=typeof maxValue==="number"||maxValue;if(hasMin||hasMax){if(isNumber&&!options.date){value=parseFloat(value);min=hasMin&&minValue;min=value<min?min.toString():null;max=hasMax&&maxValue;max=value>max?max.toString():null}if(isDateParsable&&(options.date||isDate)){value=new Date(value);if(hasMin){min=minValue=new Date(minValue);minValue=minValue.toLocaleString()}min=value<min?min.toLocaleString():null;if(hasMax){max=maxValue=new Date(maxValue);maxValue=maxValue.toLocaleString()}max=value>max?max.toLocaleString():null}if(hasMin&&hasMax&&(min||max)){opts._currentMessage=this._getRuleMessage(options,"valueRange","rangeValue");opts._currentMessage=opts._currentMessage.replace("{0}",min||minValue).replace("{1}",max||maxValue);args.message=opts._currentMessage}else if(min){opts._currentMessage=this._getRuleMessage(options,"valueRange","minValue");opts._currentMessage=opts._currentMessage.replace("{0}",min);args.message=opts._currentMessage}else if(max){opts._currentMessage=this._getRuleMessage(options,"valueRange","maxValue");opts._currentMessage=opts._currentMessage.replace("{0}",max);args.message=opts._currentMessage}if(args.message){args.rule="valueRange";this._showError(options,args,evt);return false}}}if(options.equalTo){var selector=options.equalTo.selector||options.equalTo,targetValue=this._getTargetValue({_control:this._getEditor($(selector)),selector:selector});if($.ig.util.compare(value,targetValue)){opts._currentMessage=this._getRuleMessage(options,"equalTo","equalTo");args.message=opts._currentMessage;args.rule="equalTo";this._showError(options,args,evt);return false}}if(options.email){if(!this.emailRegEx.test(value)){opts._currentMessage=this._getRuleMessage(options,"email","email");args.message=opts._currentMessage;args.rule="email";this._showError(options,args,evt);return false}}if(options.pattern){var regEx=options.pattern.expresion||options.pattern.expression||options.pattern;regEx=regEx.test?regEx:new RegExp(regEx.toString());if(!regEx.test(value)){opts._currentMessage=this._getRuleMessage(options,"pattern","pattern");args.message=opts._currentMessage;args.rule="pattern";this._showError(options,args,evt);return false}}if(options.custom){var func=options.custom.method||options.custom;if(typeof func==="string"){func=window[func]}if(typeof func==="function"&&!func.apply(this,[value,args.fieldOptions])){opts._currentMessage=this._getRuleMessage(options,"custom","default");args.message=opts._currentMessage;args.rule="custom";this._showError(options,args,evt);return false}}args.message=opts._currentMessage=options.successMessage;this._success(options,args,evt,isSubmitting);return true},_success:function(options,args,evt,isSubmitting){args.valid=true;if(evt){this._trigger(this.events.validated,evt,args);this._trigger(this.events.success,evt,args)}if(!isSubmitting){this._showSuccess(options,args,evt)}},_isNumber:function(options,value){if(typeof value==="number"){return true}else if(typeof value==="string"){var decimalSeparator=options.number&&options.number.decimalSeparator,thousandsSeparator=options.number&&options.number.thousandsSeparator,thousandsRegEx,regEx;decimalSeparator=decimalSeparator||this._decimalSeparator;thousandsSeparator=thousandsSeparator||this._thousandsSeparator;thousandsRegEx=new RegExp("\\"+thousandsSeparator,"g");regEx=new RegExp(this.numberRegEx.replace("{0}","\\"+decimalSeparator));value=value.replace(thousandsRegEx,"");if(regEx.test(value)&&this._parseNumber(value,decimalSeparator)!==null){return true}}return false},_parseNumber:function(value,decimalSeparator){var result=value.replace(decimalSeparator,this._decimalSeparator);result=parseFloat(result);if(isNaN(result)){return null}return result},_showError:function(options,args,evt){args.valid=false;if(evt){this._trigger(this.events.validated,evt,args);this._trigger(this.events.error,evt,args)}if(this._skipMessages){return}this._hideSuccess(options,evt);args={owner:this,message:args.message,target:options._$messageTarget?options._$messageTarget:options.notifyTarget,fieldOptions:args.fieldOptions};if(evt&&!this._trigger(this.events.errorShowing,evt,args)){return}this._ensureNotifier(options);if(options._$messageTarget){options._$messageTarget.removeClass("field-validation-valid").addClass("field-validation-error").html(args.message).show();options.notifyTarget.data("igNotifier")._setOption("state","error");options.notifyTarget.data("igNotifier")._setTargetState()}else{options.notifyTarget.igNotifier("notify","error",args.message);if(this._form){this._form._igErrorShown=true}}if(evt){this._trigger(this.events.errorShown,evt,args)}},_hideError:function(options,evt){var notifier=options._$messageTarget||options.notifyTarget.data("igNotifier"),args={owner:this,target:options._$messageTarget||options.notifyTarget,message:notifier._currentText||options._$messageTarget&&options._$messageTarget.text(),fieldOptions:options===this.options?null:options};if(this._hasVisibleError(options)){if(evt&&!this._trigger(this.events.errorHiding,evt,args)){return}notifier.hide();options.notifyTarget.data("igNotifier")._setTargetState(true);if(evt){this._trigger(this.events.errorHidden,evt,args)}}},_showSuccess:function(options,args,evt){if(this._skipMessages){return}this._hideError(options,evt);if(args.message){args={owner:this,message:args.message,target:options._$messageTarget?options._$messageTarget:options.notifyTarget,fieldOptions:args.fieldOptions};if(evt&&!this._trigger(this.events.successShowing,evt,args)){return}this._ensureNotifier(options);if(options._$messageTarget){options._$messageTarget.removeClass("field-validation-error").addClass("field-validation-valid").html(args.message).show();options.notifyTarget.data("igNotifier")._setOption("state","success");options.notifyTarget.data("igNotifier")._setTargetState()}else{options.notifyTarget.igNotifier("notify","success",args.message)}if(evt){this._trigger(this.events.successShown,evt,args)}}},_hideSuccess:function(options,evt){var notifier=options._$messageTarget||options.notifyTarget.data("igNotifier"),args={owner:this,target:options._$messageTarget||options.notifyTarget,message:notifier._currentText||options._$messageTarget&&options._$messageTarget.text(),fieldOptions:options===this.options?null:options};if(this._hasVisibleSuccess(options)){if(evt&&!this._trigger(this.events.successHiding,evt,args)){return}notifier.hide();if(evt){this._trigger(this.events.successHidden,evt,args)}}},_handleNotifierEvent:function(evt,ui,type,args){var state=ui.owner.options.state;args.message=ui.owner._currentText;if(state==="error"){return args.owner._trigger(this.events["error"+type],evt,args)}else if(state==="success"){return args.owner._trigger(this.events["success"+type],evt,args)}return true},_getTargetValue:function(options){if(options._control){if(options._control.options.checked!==undefined){return options._control.options.checked}else if(options._control.refreshValue&&options._control.options.allowCustomValue){options._control.refreshValue()}return options._control.value()}var $target=this._targetFromOptions(options);if(!$target.length){return null}switch(options._type){case"textarea":return $target.val().replace(/\r?\n/g,"\r\n");case"checkbox":return $target[0].checked;case"radio":case"checkboxrange":return options._group.filter(":checked").map(function(){return this.value}).get();case"input":case"select":case"selectrange":return $target.val()}return $target.val&&$target.val()},_getRuleMessage:function(options,rule,messageName){if(options[rule].errorMessage){return options[rule].errorMessage}else if(options.errorMessage){return options.errorMessage}return this._getLocalizedMessage(messageName)},_getLocalizedMessage:function(key,postfix){key+=postfix||"Message";var message=this.options.locale?this.options.locale[key]:null;if(!message&&$.ig&&$.ig.Validator&&$.ig.Validator.locale){message=$.ig.Validator.locale[key]}return message||this.locale[key]},_targetFromOptions:function(options,outer){if(outer&&options._control){if(options._control.editorContainer){return options._control.editorContainer()}else if(options._control.comboWrapper){return options._control.comboWrapper().children().first()}}if(options.selector){return options.selector instanceof $?options.selector:$(options.selector)}else{return this.element}},_getEditor:function(elem){var widgets=elem.data(),controls=["Editor","Combo","Rating","DatePicker"],regEx=new RegExp("ig.*?("+controls.join("|")+")");for(var i in widgets){if(widgets[i].widgetName&&regEx.test(widgets[i].widgetName)){return widgets[i]}}return null},_cleanupField:function(options){var element=this._targetFromOptions(options||this.options);element.unbind(".validator");if(options.notifyTarget&&options.notifyTarget.data("igNotifier")){options.notifyTarget.igNotifier("destroy").unbind(".validator")}this._clearMessageTarget(options);if(element.data("igValidatorField")){element.removeData("igValidatorField")}this._removeFieldIndications(options);if(options._control){if(options._control._options){options._control._options.validator=null}else{options._control._validator=null}}element.removeClass(this.css.target)},_addGlobalSettings:function(options){if(options===this.options){return options}var properties=["required","threshold","lengthRange","number","date","valueRange","email","triggers","onblur","onchange","onsubmit","successMessage","errorMessage"],extendedOptions=$.extend({},options);for(var i=0;i<properties.length;i++){if(!options.hasOwnProperty(properties[i])&&this.options[properties[i]]!==null){extendedOptions[properties[i]]=this.options[properties[i]]}}return extendedOptions},_indexOfByProerty:function(array,property,value){for(var i=0;i<array.length;i++){if(array[i][property]&&array[i][property]===value){return i}}return-1},_hasVisibleSuccess:function(options){if(this._fieldMessageVisible(options)){if(options._$messageTarget&&options._$messageTarget.hasClass("field-validation-valid")){return true}else{return options.notifyTarget.data("igNotifier").options.state==="success"}}return false},_hasVisibleError:function(options){if(this._fieldMessageVisible(options)){if(options._$messageTarget&&options._$messageTarget.hasClass("field-validation-error")){return true}else{return options.notifyTarget.data("igNotifier").options.state==="error"}}return false},_fieldMessageVisible:function(options){if(options._$messageTarget){return options._$messageTarget.is(":visible")}if(options.notifyTarget.data("igNotifier")){return options.notifyTarget.data("igNotifier").isVisible()}return false},_fieldIndexOf:function(fieldParam){var index=-1;if(typeof fieldParam==="number"&&this.options.fields[fieldParam]){return fieldParam}if(typeof fieldParam==="string"){index=this._indexOfByProerty(this.options.fields,"selector",fieldParam)}if(typeof fieldParam==="object"){index=$.inArray(fieldParam,this.options.fields)}if(index>=this.options.fields.length){return-1}return index},validate:function(field){var valid;this._forceValidation=true;valid=this._validate(field);this._forceValidation=false;return valid},isValid:function(field){this._skipMessages=true;var valid=this.validate(field);this._skipMessages=false;return valid},hide:function(field){var i;if(this.options.fields){if(field!==undefined){if((i=this._fieldIndexOf(field))>-1){this._hideError(this.options.fields[i]);this._hideSuccess(this.options.fields[i])}return}for(i=0;i<this.options.fields.length;i++){if(this.options.fields[i].isValid!==undefined){this._hideError(this.options.fields[i]);this._hideSuccess(this.options.fields[i])}}}else{this._hideError(this.options);this._hideSuccess(this.options)}},getErrorMessages:function(field){var result=[],i;if(this.options.fields){if(field!==undefined){if((i=this._fieldIndexOf(field))>-1&&this.options.fields[i].isValid!==undefined&&!this.options.fields[i].isValid){result.push(this.options.fields[i]._currentMessage)}return result}for(i=0;i<this.options.fields.length;i++){if(this.options.fields[i].isValid!==undefined&&!this.options.fields[i].isValid){result.push(this.options.fields[i]._currentMessage)}}}else if(this.options.isValid!==undefined&&!this.options.isValid){result.push(this.options._currentMessage)}return result},isMessageDisplayed:function(field){var result=false,i;if(this.options.fields){if(field!==undefined){if((i=this._fieldIndexOf(field))>-1){result=!result?this._fieldMessageVisible(this.options.fields[i]):result}return result}for(i=0;i<this.options.fields.length;i++){result=!result?this._fieldMessageVisible(this.options.fields[i]):result}}else{result=this._fieldMessageVisible(this.options)}return result},notifier:function(field){var i,notifier;if(field!==undefined&&this.options.fields&&(i=this._fieldIndexOf(field))>-1){notifier=this.options.fields[i].notifyTarget&&this.options.fields[i].notifyTarget.data("igNotifier")}else{notifier=this.options.notifyTarget&&this.options.notifyTarget.data("igNotifier")}return notifier||null},addField:function(field){if(!this.options.fields){return}this.options.fields.push(field);this._initializeField($(field.selector),field);var options=this._addGlobalSettings(field);if(options.onsubmit){if(!this._formHandleCounter){this._attachToForm(true)}this._formHandleCounter++}},removeField:function(field){if(!this.options.fields){return}var index=this._fieldIndexOf(field);if(index>-1){var removed=this.options.fields.splice(index,1)[0],options=this._addGlobalSettings(removed);this._cleanupField(removed);if(options.onsubmit&&!--this._formHandleCounter){this._detachFromForm()}}},updateField:function(field,fieldOptions){if(!this.options.fields){return}var index=this._fieldIndexOf(field);if(index>-1){if(!fieldOptions){this._cleanupField(this.options.fields[index]);this._initializeField($(this.options.fields[index].selector),this.options.fields[index]);return}fieldOptions=$.extend({},this.options.fields[index],fieldOptions);var current=this._addGlobalSettings(this.options.fields[index]),options=this._addGlobalSettings(fieldOptions);this._cleanupField(current);this._initializeField($(fieldOptions.selector),fieldOptions);if(current.onsubmit&&!--this._formHandleCounter){this._detachFromForm()}if(options.onsubmit){if(!this._formHandleCounter){this._attachToForm(true)}this._formHandleCounter++}this.options.fields.splice(index,1,fieldOptions)}},destroy:function(){if(!this.options.fields){this._cleanupField(this.options)}else{for(var i=0;i<this.options.fields.length;i++){this._cleanupField(this.options.fields[i])}}this._detachFromForm();$.Widget.prototype.destroy.apply(this,arguments)}});$.extend($.ui.igValidator,{version:"16.1.20161.2052"});$.ui.igValidator.defaults={showAllErrorsOnSubmit:true}})(jQuery);(function($){$(document).ready(function(){var wm=$("#__ig_wm__").length>0?$("#__ig_wm__"):$("<div id='__ig_wm__'></div>").appendTo(document.body);wm.css({position:"fixed",bottom:0,right:0,zIndex:1e3}).addClass("ui-igtrialwatermark")})})(jQuery);