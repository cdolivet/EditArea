// in all regexp "\" must be replaced by "\\"
var datas= {
	"default": {	// the name of this definition group. It's posisble to have different rules inside the same definition file
		"REGEXP": { "before_word": "[^a-zA-Z0-9_]|^"	// \\s|\\.|
					,"possible_words_letters": "[a-zA-Z0-9_]+"
					,"letter_after_word_must_match": "[^a-zA-Z0-9_]|$"
					,"prefix_separator": "\\.|->"
				}
		,"CASE_SENSITIVE": true
		,"MAX_TEXT_LENGTH": 100		// the length of the text being analyzed before the cursor position
		,"KEYWORDS": [
				// [ 
				// 0 : the keyword the user is typing
				// 1 : the string inserted in code ("{_@_}" being the new position of the cursor)
				// 2 : the needed prefix
				// 3 : the text the appear in the suggestion box (if empty, the string to insert will be displayed
	    		['Array', 'Array()', '', 'alert( String message )']
	    		,['alert', 'alert({_@_})', '', 'alert(message)']
	    		,['ascrollTo', 'scrollTo({_@_})', '', 'scrollTo(x,y)']
	    		,['alert', 'alert({_@_},bouh);', '', 'alert(message, message2)']
	    		,['aclose', 'close({_@_})', '', 'alert(message)']
	    		,['aconfirm', 'confirm({_@_})', '', 'alert(message)']
	    		,['aonfocus', 'onfocus', '', '']
	    		,['aonerror', 'onerror', '', 'blabla']
	    		,['aonerror', 'onerror', '', '']
	    		,['window', '', '', '']
	    		,['location', 'location', 'window', '']
	    		,['document', 'document', 'window', '']
	    		,['href', 'href', 'location', '']
			]
		}
};

// the second identifier must be the same as the one of the syntax coloring definition file
EditArea_autocompletion._load_auto_complete_file( datas, "php" );