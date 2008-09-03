/**
 * Autocompletion plugin
 * 
 * An auto completion box appear while you're writing. It's possible to force it to appear with Ctrl+Space short cut
 * 
 * EditAreaLoader.init() parameters:
 * - Plugin name "autocompletion"
 * - Button name: "autocompletion"
 * - Required param: "autocompletion_syntax_allow" : a commat separated list of syntax languages for which an autocomplet is available
 */  

var EditArea_autocompletion= {
	
	/**
	 * Get called once this file is loaded (editArea still not initialized)
	 *
	 * @return nothing	 
	 */	 	 	
	init: function(){	
		//	alert("test init: "+ this._someInternalFunction(2, 3));
		
		if(editArea.settings["autocompletion_start"])
			this.enabled= true;
		else
			this.enabled= false;
			
		this.current_word= false;
		this.shown	= false;
		this.selectIndex	= -1;
		this.forceDisplay	= false;
		this.isInMiddleWord= false;
		this.autoSelectIfOneResult	= false;
		this.delayBeforeDisplay	= 100;
		this.checkDelayTimer	= false;
		
		this.current_syntax		= '';
		this.syntax_list		= {};
		this.file_syntax_datas	= {};
		
		// retrieve the init parameter for syntax
		if(editArea.settings["autocompletion_syntax_allow"] && editArea.settings["autocompletion_syntax_allow"].length>0)
			this.syntax_list= editArea.settings["autocompletion_syntax_allow"].replace(/ /g,"").split(",");
		
		editArea.load_css(this.baseURL + "css/autocompletion.css");
		this._synchronizeDatasWithSyntax();
	}
	/**
	 * Returns the HTML code for a specific control string or false if this plugin doesn't have that control.
	 * A control can be a button, select list or any other HTML item to present in the EditArea user interface.
	 * Language variables such as {$lang_somekey} will also be replaced with contents from
	 * the language packs.
	 * 
	 * @param {string} ctrl_name: the name of the control to add	  
	 * @return HTML code for a specific control or false.
	 * @type string	or boolean
	 */	
	,get_control_html: function(ctrl_name){
		switch( ctrl_name ){
			case 'autocompletion':
				// Control id, button img, command
				return parent.editAreaLoader.get_button_html('autocompletion_but', 'autocompletion.gif', 'toggle_autocompletion', false, this.baseURL);
				break;
		}
		return false;
	}
	/**
	 * Get called once EditArea is fully loaded and initialised
	 *	 
	 * @return nothing
	 */	 	 	
	,onload: function(){ 
		if(this.enabled)
		{
			var icon= document.getElementById("autocompletion_but");
			if(icon)
				editArea.switchClassSticky(icon, 'editAreaButtonSelected', true);
		}
		
		this.container	= document.createElement('div');
		this.container.id	= "auto_completion_area";
		editArea.container.insertBefore( this.container, editArea.container.firstChild );
		
		// add event detection for hiding suggestion box
		editArea.add_event( document, "click", function(){ editArea.plugins['autocompletion']._hide();} );
		editArea.add_event( editArea.textarea, "blur", function(){ editArea.plugins['autocompletion']._hide();} );
		
	}
	
	/**
	 * Is called each time the user touch a keyboard key.
	 *	 
	 * @param (event) e: the keydown event
	 * @return true - pass to next handler in chain, false - stop chain execution
	 * @type boolean	 
	 */
	,onkeydown: function(e){
		if(!this.enabled)
			return true;
			
		if (EA_keys[e.keyCode])
			letter=EA_keys[e.keyCode];
		else
			letter=String.fromCharCode(e.keyCode);	
		// shown
		if( this._isShown() )
		{	
			// if escape, hide the box
			if(letter=="Esc")
			{
				this._hide();
				return false;
			}
			// Enter
			else if( letter=="Entrer")
			{
				var as	= this.container.getElementsByTagName('A');
				// select a suggested entry
				if( this.selectIndex >= 0 && this.selectIndex < as.length )
				{
					as[ this.selectIndex ].onmousedown();
					return false
				}
				// simply add an enter in the code
				else
				{
					this._hide();
					return true;
				}
			}
			else if( letter=="Tab" || letter=="Down")
			{
				this._selectNext();
				return false;
			}
			else if( letter=="Up")
			{
				this._selectBefore();
				return false;
			}
		}
		// hidden
		else
		{
			
		}
		
		// show current suggestion list and do autoSelect if possible (no matter it's shown or hidden)
		if( letter=="Space" && CtrlPressed(e) )
		{
			parent.console.log('SHOW SUGGEST');
			this.forceDisplay 			= true;
			this.autoSelectIfOneResult	= true;
			this._checkLetter();
			return false;
		}
		
		// wait a short period for check that the cursor isn't moving
		setTimeout("editArea.plugins['autocompletion']._checkDelayAndCursorBeforeDisplay();", editArea.check_line_selection_timer +5 );
		this.checkDelayTimer = false;
		return true;
	}	
	/**
	 * Executes a specific command, this function handles plugin commands.
	 *
	 * @param {string} cmd: the name of the command being executed
	 * @param {unknown} param: the parameter of the command	 
	 * @return true - pass to next handler in chain, false - stop chain execution
	 * @type boolean	
	 */
	,execCommand: function(cmd, param){
		switch( cmd ){
			case 'toggle_autocompletion':
				var icon= document.getElementById("autocompletion_but");
				if(!this.enabled)
				{
					if(icon != null){
						editArea.restoreClass(icon);
						editArea.switchClassSticky(icon, 'editAreaButtonSelected', true);
					}
					this.enabled= true;
				}
				else
				{
					this.enabled= false;
					if(icon != null)
						editArea.switchClassSticky(icon, 'editAreaButtonNormal', false);
				}
				return true;
		}
		return true;
	}
	/**
	 * synchronize the datas used for auto-completion with the ones used for syntax coloration
	 */
	,_synchronizeDatasWithSyntax: function()
	{
		if( this.current_syntax == editArea.settings["syntax"] )
			return true;
		else if ( editArea.settings["syntax"].length > 0 )
			editArea.load_script(this.baseURL + "autocompletion_files/" + editArea.settings["syntax"] + ".js");
			
		this.current_syntax	= editArea.settings["syntax"];
	}
	,_checkDelayAndCursorBeforeDisplay: function()
	{
		this.checkDelayTimer = setTimeout("if(editArea.textarea.selectionStart == "+ editArea.textarea.selectionStart +") EditArea_autocompletion._checkLetter();",  this.delayBeforeDisplay - editArea.check_line_selection_timer - 5 );
	}
	// hide the suggested box
	,_hide: function(){
		this.container.style.display="none";
		this.selectIndex	= -1;
		this.shown	= false;
		this.forceDisplay	= false;
		this.autoSelectIfOneResult = false;
	}
	// display the suggested box
	,_show: function(){
		if( !this._isShown() )
		{
			this.container.style.display="block";
			this.selectIndex	= -1;
			this.shown	= true;
		}
	}
	// is the suggested box displayed?
	,_isShown: function(){
		return this.shown;
	}
	// setter and getter
	,_isInMiddleWord: function( new_value ){
		if( typeof( new_value ) == "undefined" )
			return this.isInMiddleWord;
		else
			this.isInMiddleWord	= new_value;
	}
	// select the next element in the suggested box
	,_selectNext: function()
	{
		var as	= this.container.getElementsByTagName('A');
		
		// clean existing elements
		for( var i=0; i<as.length; i++ )
		{
			if( as[i].className )
				as[i].className	= as[i].className.replace(/ focus/g, '');
		}
		
		this.selectIndex++;	
		this.selectIndex	= ( this.selectIndex >= as.length || this.selectIndex < 0 ) ? 0 : this.selectIndex;
		as[ this.selectIndex ].className	+= " focus";
	}
	// select the previous element in the suggested box
	,_selectBefore: function()
	{
		var as	= this.container.getElementsByTagName('A');
		
		// clean existing elements
		for( var i=0; i<as.length; i++ )
		{
			if( as[i].className )
				as[i].className	= as[ i ].className.replace(/ focus/g, '');
		}
		
		this.selectIndex--;
		
		this.selectIndex	= ( this.selectIndex >= as.length || this.selectIndex < 0 ) ? as.length-1 : this.selectIndex;
		as[ this.selectIndex ].className	+= " focus";
	}
	,_select: function( content )
	{
		cursor_forced_position	= content.indexOf( '{_@_}' );
		content	= content.replace(/{_@_}/g, '' );
		if(editArea.nav['isIE'])
			editArea.getIESelection();
		
		// retrive the number of matching characters
		var start_index	= Math.max( 0, editArea.textarea.selectionEnd - content.length );
		
		line_string	= 	editArea.textarea.value.substring( start_index, editArea.textarea.selectionEnd + 1);
		limit	= line_string.length -1;
		nbMatch	= 0;
		for( i =0; i<limit ; i++ )
		{
			if( line_string.substring( limit - i - 1, limit ) == content.substring( 0, i + 1 ) )
				nbMatch = i + 1;
		}
		// if characters match, we should include them in the selection that will be replaced
		if( nbMatch > 0 )
			parent.editAreaLoader.setSelectionRange(editArea.id, editArea.textarea.selectionStart - nbMatch , editArea.textarea.selectionEnd);
		
		parent.editAreaLoader.setSelectedText(editArea.id, content );
		range= parent.editAreaLoader.getSelectionRange(editArea.id);
		
		if( cursor_forced_position != -1 )
			new_pos	= range["end"] - ( content.length-cursor_forced_position );
		else
			new_pos	= range["end"];	
		parent.editAreaLoader.setSelectionRange(editArea.id, new_pos, new_pos);
		this._hide();
	}
	
	
	/**
	 * This is just an internal plugin method, prefix all internal methods with a _ character.
	 * The prefix is needed so they doesn't collide with future EditArea callback functions.
	 *
	 * @param {string} a Some arg1.
	 * @param {string} b Some arg2.
	 * @return Some return.
	 * @type unknown
	 */
	,_load_auto_complete_datas: function(datas){
		
		for(var i in datas)
		{
			this.datas[i]= new Object();
			if(datas[i]["CASE_SENSITIVE"]!="undefined" && datas[i]["CASE_SENSITIVE"]==false)
				this.datas[i]["modifiers"]="i";
			else
				this.datas[i]["modifiers"]="";
			this.datas[i]["prefix_separator"]= datas[i]["REGEXP"]["prefix_separator"];
			this.datas[i]["match_prefix_separator"]= new RegExp( datas[i]["REGEXP"]["prefix_separator"] +"$", this.datas[i]["modifiers"]);
			this.datas[i]["match_word"]= new RegExp("(?:"+ datas[i]["REGEXP"]["before_word"] +")("+ datas[i]["REGEXP"]["possible_words_letters"] +")$", this.datas[i]["modifiers"]);
			this.datas[i]["match_next_letter"]= new RegExp("^("+ datas[i]["REGEXP"]["letter_after_word_must_match"] +")$", this.datas[i]["modifiers"]);
			this.datas[i]["keywords"]= {};
			for( var j in datas[i]["KEYWORDS"] )
			{
				this.datas[i]["keywords"][j] = {
					is_typing: datas[i]["KEYWORDS"][j][0],
					// if replace with is empty, replace with the is_typing value
					replace_with: datas[i]["KEYWORDS"][j][1].length > 0 ? datas[i]["KEYWORDS"][j][1] : datas[i]["KEYWORDS"][j][0],
					prefix: datas[i]["KEYWORDS"][j][2],
					prefix_name: datas[i]["KEYWORDS"][j][2],
					prefix_reg: new RegExp("(?:"+ datas[i]["KEYWORDS"][j][2] +")(?:"+ this.datas[i]["prefix_separator"] +")$", this.datas[i]["modifiers"] ),
				};
				// if the comment is empty, display the replace_with value
				this.datas[i]["keywords"][j]['comment'] = datas[i]["KEYWORDS"][j][3].length > 0 ? datas[i]["KEYWORDS"][j][3] : this.datas[i]["keywords"][j]['replace_with'].replace(/{_[^_]_}/g, '' );
				
			}
			parent.console.log( this.datas[i]["keywords"] );
			this.datas[i]["max_text_length"]= datas[i]["MAX_TEXT_LENGTH"];
		}
	}
	
	,_checkLetter: function(){
		if( editArea.is_editable )
		{
			time=new Date;
			t1= time.getTime();
			if(editArea.nav['isIE'])
				editArea.getIESelection();
			this.selectIndex	= -1;
			start=editArea.textarea.selectionStart;
			var str	= editArea.textarea.value;
			var results= new Array();
			
			
			for(var i in this.datas)
			{
				var last_chars	= str.substring(Math.max(0, start-this.datas[i]["max_text_length"]), start);
				var matchNextletter	= str.substring(start, start+1).match( this.datas[i]["match_next_letter"]);
				// if not writting in the middle of a word or if forcing display
				if( matchNextletter || this.forceDisplay )
				{
					// check if the last chars match a separator
					var match_prefix_separator = last_chars.match(this.datas[i]["match_prefix_separator"]);
				console.log( !match_prefix_separator );
					// check if it match a possible word
					var match_word= last_chars.match(this.datas[i]["match_word"]);
					
					parent.console.log( 'matchNext');
					if( match_word )
					{
						parent.console.log( 'matchword');
						var begin_word= match_word[1];
						var match_curr_word= new RegExp("^"+ begin_word, this.datas[i]["modifiers"]);
						for(var j in this.datas[i]["keywords"])
						{
							// the key word match or force display 
							if( this.datas[i]["keywords"][j]['is_typing'].match(match_curr_word) )
							{
								hasMatch = false;
								// no prefix to match => it's valid
								if( !match_prefix_separator && this.datas[i]["keywords"][j]['prefix'].length == 0 )
								{
									hasMatch = true;
								}
								// we still need to check the prefix if there is one
								else if( match_prefix_separator && this.datas[i]["keywords"][j]['prefix'].length > 0 )
								{
									var before = last_chars.substr( 0, last_chars.length - begin_word.length );
									if( before.match( this.datas[i]["keywords"][j]['prefix_reg'] ) )
										hasMatch = true;
								}
								
								if( hasMatch )
									results[results.length]= this.datas[i]["keywords"][j];
								// the prefix must match
								//else if( )
									
							}	
						}
					}
					// it doesn't match any possible word but we want to display something
					// we'll display to list of all available words
					else if( this.forceDisplay || match_prefix_separator )
					{
						for(var j in this.datas[i]["keywords"])
						{
							hasMatch = false;
							// no prefix to match => it's valid
							if( !match_prefix_separator && this.datas[i]["keywords"][j]['prefix'].length == 0 )
							{
								console.log('A');
								hasMatch	= true;
							}
							// we still need to check the prefix if there is one
							else if( match_prefix_separator && this.datas[i]["keywords"][j]['prefix'].length > 0 )
							{
								var before = last_chars; //.substr( 0, last_chars.length );
								if( before.match( this.datas[i]["keywords"][j]['prefix_reg'] ) )
									hasMatch = true;
							}	
								
							if( hasMatch )
								results[results.length]= this.datas[i]["keywords"][j];	
						}
					}
				}
			}
			results= results.sort();
			
			// there is only one result, and we can select it automatically
			if( results.length == 1 && this.autoSelectIfOneResult )
			{
				this._select( results[0]['replace_with'] );
			}
			else if( results.length == 0 )
			{
				this._hide();
			}
			else
			{
				// build the suggestion box content
				var lines=[];
				for(var i=0; i<results.length; i++)
				{
				//	var match= results[i].split(/{__(.*?)__}/g);
					var line= '<li><a href="#" class="entry" onmousedown="EditArea_autocompletion._select(\''+ results[i]['replace_with'] +'\');return false;">'+ results[i]['comment'];
					if(results[i]['prefix_name'].length>0)
						line+='<span class="prefix">'+ results[i]['prefix_name'] +'</span>';
					line+='</a></li>';
					lines[lines.length]=line;
					//html+= results[i].replace(/{__(.*?)__}{__(.*?)__}{__(.*?)__}/g, '<a class="entry" onclick="EditArea_autocompletion.select(\'$2\')>$1: $3</a>');
				}
				
				this.container.innerHTML		= '<ul>'+ lines.join('') +'</ul>';
				
				var cursor	= $("cursor_pos");
				this.container.style.top		= ( cursor.cursor_top + editArea.lineHeight ) +"px";
				this.container.style.left		= ( cursor.cursor_left + 8 ) +"px";
				this._show();
			}
				
			this.autoSelectIfOneResult = false;
			time=new Date;
			t2= time.getTime();
		
			//parent.console.log( begin_word +"\n"+ (t2-t1) +"\n"+ html );
		}
	}
};


// Adds the plugin class to the list of available EditArea plugins
editArea.add_plugin("autocompletion", EditArea_autocompletion);
