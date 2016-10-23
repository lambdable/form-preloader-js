/*
* Input_Preloader.js by Zaim Ramlan
*
* let,
* FIELD_ID - id of the targeted input field
* FIELD_TYPE - type of the targeted input field
* var field_1 = "FIELD_ID:FIELD_TYPE"
*
* acceptable arguments:
* var preloader_instance = new FormPreloader(field_1, field_2, ..., field_n)
*
* note: 
* 1) requires jQuery to work
* 2) arguments must only be a string
* 3) arguments that can be passed are unlimited
*/

var FormPreloader = function() {
	// initialize the input_fields to the paramters passed into the class
	this.form_fields = translate_input(arguments);

	// convert string parameter to hash array
	function translate_input(parameters) {
		// initialize an empty array
		all_form_fields = [];

		for(var i = 0; i < parameters.length; i++) {
			parameter = parameters[i].split(":");
			current_input = {id: parameter[0], type: parameter[1]};
			all_form_fields.push(current_input);
		}

		return all_form_fields;
	}	

	// to be called to activate the FormPreloader
	this.activate = function() {
		// preload inputs on page reload if input fields exist
		if(this.fields_exist_in_storage()) this.preload_form();
		// saves input values into sessionStorage before page reload
		this.save_before_reload();
	}

	// to be called to deactivate the FormPreloader
	this.deactivate = function() {
		// removes the input fields stored in sessionStorage
	    for(var i = 0; i < this.form_fields.length; i++) {
		    sessionStorage.removeItem(this.form_fields[i].id);
	    }
	}	

	// checks if the input field values exist in sessionStorage
	this.fields_exist_in_storage = function() {
		// assume all input values exist
	    var all_fields_exist = true;

	    for(var i = 0; i < this.form_fields.length; i++) {
	    	var current_field_exists = sessionStorage.getItem(this.form_fields[i].id) !== null;
	    	// change the truth value if any 1 input does not exists
	    	all_fields_exist = all_fields_exist && current_field_exists;
	    }

	    return all_fields_exist;
	}

	// load inputs on page load
	this.preload_form = function() {
	    for(var i = 0; i < this.form_fields.length; i++) {
	    	var field_value = sessionStorage.getItem(this.form_fields[i].id);
	    	/*
	    	* sets the input values got from sessionStorage
	    	* based on field_value.type
	    	*/
	    	field_type = this.form_fields[i].type;
	    	if(field_type === "radio") {
	    		$('#' + this.form_fields[i].id + "_" + field_value).prop('checked', true);
	    	} else {
		    	switch(field_type) {
		    		case "float": 
		    			field_value = parseFloat(field_value);
		    			break;
		    		case "integer":
		    			field_value = parseInt(field_value);
		    			break;
		    		case "string":
		    			// do nothing with field_value as it's already string
		    			break;
		    	}
	    		$('#' + this.form_fields[i].id).val(field_value);
	    	}
	    }
	}

	// temporarily store input values in sessionStorage
	this.save_before_reload = function() {
		/*
		* since window.onbeforeunload is another function deep, 
		* the 'this' context can't be preserved to the class's 'this' context.
		* so, we need to put it in a placeholder for it to be used in
		* window.onbeforeunload function.
		*/
		var self = this;
	    window.onbeforeunload = function() {
		    for(var i = 0; i < self.form_fields.length; i++) {
		    	current_field = self.form_fields[i];
		    	if(current_field.type === "radio") {
		    		/*
		    		* navigate through the fields with the same id,
		    		* set value equals to the input that is checked
		    		*/
		    		value = $('[name = ' + current_field.id + ']').filter(':checked').prop('value')
		    	} else {
		    		value = $('#' + current_field.id).val();
		    	}
		        sessionStorage.setItem(current_field.id, value);
		    }
	    }  
	}
}
