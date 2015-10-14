// with this, you can init a textarea with...
// - a string -> this means, you're passing an ID
// - an element -> this means, your textarea doesn't seem to have an ID yet

editAreaLoader.fooInit = function(configObj) {

	// no config object given
	if (typeof(configObj) == "undefined") {
		console.log("No config object given. Initinalization impossible.");
		return false;
	}

	if (typeof(configObj.id) == "undefined") {
		console.log("No element(s) to initialize given. Initinalisation impossible.");
		return false;
	}
	
	// string means: ID
	if (typeof(configObj.id) == "string") {
		editAreaLoader.init(configObj);
	}

	// object can be single element or array
	if (typeof(configObj.id) == "object") {
		for (var i = 0; i < configObj.id.length; i++) {
			// string means ID
			if (typeof(configObj.id[i]) == "string") {
				var cfgObj = jQuery.extend({}, configObj);
				cfgObj.id = configObj.id[i];
				editAreaLoader.init(cfgObj);
			}
			
			// object means element
			if (typeof(configObj.id[i]) == "object") {
				if (typeof(jQuery(configObj.id[i]).attr("id")) == "undefined") {
					// okay, element without ID? generate a random one
					jQuery(configObj.id[i]).attr("id", "editAreaTextArea" + Math.random().toString().replace(".","") + Math.random().toString().replace(".",""));
				}
				var cfgObj = jQuery.extend({}, configObj);
				cfgObj.id = jQuery(configObj.id[i]).attr("id");
				editAreaLoader.init(cfgObj);
			}
		}
	}
}
