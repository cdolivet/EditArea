	// change_to: "on" or "off"
	EditArea.prototype.change_highlight= function(change_to){
		if(this.settings["syntax"].length==0 && change_to==false){
			this.switchClassSticky(_$("highlight"), 'editAreaButtonDisabled', true);
			this.switchClassSticky(_$("reset_highlight"), 'editAreaButtonDisabled', true);
			return false;
		}
		
		if(this.do_highlight==change_to)
			return false;
	
			
		if(this.isIE)
			this.getIESelection();
		var pos_start= this.textarea.selectionStart;
		var pos_end= this.textarea.selectionEnd;
		
		if(this.do_highlight===true || change_to==false)
			this.disable_highlight();
		else
			this.enable_highlight();
		this.textarea.focus();
		this.textarea.selectionStart = pos_start;
		this.textarea.selectionEnd = pos_end;
		if(this.isIE)
			this.setIESelection();
				
	};
	
	EditArea.prototype.disable_highlight= function(displayOnly){
		var t= this, a=t.textarea, new_Obj, old_class, new_class;
			
		t.selection_field.innerHTML="";
		t.selection_field_text.innerHTML="";
		t.content_highlight.style.visibility="hidden";
		// replacing the node is far more faster than deleting it's content in firefox
		new_Obj= t.content_highlight.cloneNode(false);
		new_Obj.innerHTML= "";			
		t.content_highlight.parentNode.insertBefore(new_Obj, t.content_highlight);
		t.content_highlight.parentNode.removeChild(t.content_highlight);	
		t.content_highlight= new_Obj;
		old_class= parent.getAttribute( a,"class" );
		if(old_class){
			new_class= old_class.replace( "hidden","" );
			parent.setAttribute( a, "class", new_class );
		}
	
		a.style.backgroundColor="transparent";	// needed in order to see the bracket finders
		
		//var icon= document.getElementById("highlight");
		//setAttribute(icon, "class", getAttribute(icon, "class").replace(/ selected/g, "") );
		//t.restoreClass(icon);
		//t.switchClass(icon,'editAreaButtonNormal');
		t.switchClassSticky(_$("highlight"), 'editAreaButtonNormal', true);
		t.switchClassSticky(_$("reset_highlight"), 'editAreaButtonDisabled', true);
	
		t.do_highlight=false;
	
		t.switchClassSticky(_$("change_smooth_selection"), 'editAreaButtonSelected', true);
		if(typeof(t.smooth_selection_before_highlight)!="undefined" && t.smooth_selection_before_highlight===false){
			t.change_smooth_selection_mode(false);
		}
		
	//	this.textarea.style.backgroundColor="#FFFFFF";
	};

	EditArea.prototype.enable_highlight= function(){
		var t=this, a=t.textarea, new_class;
		t.show_waiting_screen();
			
		t.content_highlight.style.visibility="visible";
		new_class	=parent.getAttribute(a,"class")+" hidden";
		parent.setAttribute( a, "class", new_class );
		
		// IE can't manage mouse click outside text range without this
		if( t.isIE )
			a.style.backgroundColor="#FFFFFF";	

		t.switchClassSticky(_$("highlight"), 'editAreaButtonSelected', false);
		t.switchClassSticky(_$("reset_highlight"), 'editAreaButtonNormal', false);
		
		t.smooth_selection_before_highlight=t.smooth_selection;
		if(!t.smooth_selection)
			t.change_smooth_selection_mode(true);
		t.switchClassSticky(_$("change_smooth_selection"), 'editAreaButtonDisabled', true);
		
		
		t.do_highlight=true;
		t.resync_highlight();
					
		t.hide_waiting_screen();	
	};
	
	/**
	 * Ask to update highlighted text
	 * @param Array infos - Array of datas returned by EditArea.get_selection_infos()
	 */
	EditArea.prototype.maj_highlight= function(infos){
		// for speed mesure
		var debug_opti="",tps_start= new Date().getTime(), tps_middle_opti=new Date().getTime();
			
		var textToHighlight=infos["full_text"], stay_begin="", stay_end="", trace_new , trace_last;
		var hightlighted_text, updated_highlight;
		
		if(this.last_text_to_highlight==infos["full_text"] && this.resync_highlight!==true)
			return;
					
		//  OPTIMISATION: will search to update only changed lines
		if(this.reload_highlight===true){
			this.reload_highlight=false;
		}else if(textToHighlight.length==0){
			textToHighlight="\n ";
		}else{
			// get text change datas
			changes = this.checkTextEvolution(this.last_text_to_highlight,textToHighlight);
			
			// check if it can only reparse the changed text
			trace_new	= this.get_syntax_trace(changes.newTextLine);
			trace_last	= this.get_syntax_trace(changes.lastTextLine);
			if( trace_new == trace_last ){
						
				tps_middle_opti=new Date().getTime();	
			
				stay_begin= this.last_hightlighted_text.split("\n").slice(0, changes.lineStart).join("\n");
				if(changes.lineStart>0)
					stay_begin+= "\n";
				stay_end= this.last_hightlighted_text.split("\n").slice(changes.lineLastEnd+1).join("\n");
				if(stay_end.length>0)
					stay_end= "\n"+stay_end;
	
	
				if(stay_begin.length==0 && changes.posLastEnd==-1)
					changes.newTextLine+="\n";
				textToHighlight=changes.newTextLine;
				
			}
			if(this.settings["debug"]){
				var ch =changes;
				debug_opti= ( (trace_new == trace_last)?"Optimisation": "No optimisation" )
					+" start: "+ch.posStart +"("+ch.lineStart+")"
					+" end_new: "+ ch.posNewEnd+"("+ch.lineNewEnd+")"
					+" end_last: "+ ch.posLastEnd+"("+ch.lineLastEnd+")"
					+"\nchanged_text: "+ch.newText+" => trace: "+trace_new
					+"\nchanged_last_text: "+ch.lastText+" => trace: "+trace_last
					//debug_opti+= "\nchanged: "+ infos["full_text"].substring(ch.posStart, ch.posNewEnd);
					+ "\nchanged_line: "+ch.newTextLine
					+ "\nlast_changed_line: "+ch.lastTextLine
					+"\nstay_begin: "+ stay_begin.slice(-200)
					+"\nstay_end: "+ stay_end
					//debug_opti="start: "+stay_begin_len+ "("+nb_line_start_unchanged+") end: "+ (stay_end_len)+ "("+(splited.length-nb_line_end_unchanged)+") ";
					//debug_opti+="changed: "+ textToHighlight.substring(stay_begin_len, textToHighlight.length-stay_end_len)+" \n";
					
					//debug_opti+="changed: "+ stay_begin.substr(stay_begin.length-200)+ "----------"+ textToHighlight+"------------------"+ stay_end.substr(0,200) +"\n";
					+"\n";
			}
	
			
			// END OPTIMISATION
		}

		tps_end_opti=new Date().getTime();	
				
		// apply highlight
		updated_highlight= this.colorize_text(textToHighlight);
				
		// get the new highlight content
		tpsAfterReg	=new Date().getTime();
		hightlighted_text	= stay_begin + updated_highlight + stay_end;
	
		inner1=new Date().getTime();		
					
		// update the content of the highlight div by first updating a clone node (as there is no display in the same time for this node it's quite faster (5*))
		var new_Obj= this.content_highlight.cloneNode(false);
		if( ( this.isIE && this.isIE < 8 ) || ( this.isOpera && this.isOpera < 9.6 ) )
			new_Obj.innerHTML= "<pre><span class='"+ this.settings["syntax"] +"'>" + hightlighted_text + "</span></pre>";	
		else
			new_Obj.innerHTML= "<span class='"+ this.settings["syntax"] +"'>"+ hightlighted_text +"</span>";

		this.content_highlight.parentNode.replaceChild(new_Obj, this.content_highlight);
	
		this.content_highlight= new_Obj;
		
		this.last_text_to_highlight= infos["full_text"];
		this.last_hightlighted_text= hightlighted_text;
		
		tps3=new Date().getTime();
	
		/*if(this.settings["debug"]){
			//lineNumber=tab_text.length;
			//this.debug.value+=" \nNB char: "+_$("src").value.length+" Nb line: "+ lineNumber;
			this.debug.value= "Tps optimisation "+(tps_end_opti-tps_start)
				+" | tps reg exp: "+ (tpsAfterReg-tps_end_opti)
				+" | tps join: "+ (inner1-tpsAfterReg)
				+" | tps update highlight content: "+ (tps3-inner1)
				+" | tpsTotal: "+ (tps3-tps_start)
				+ "("+tps3+")\n"+ debug_opti;
		//	this.debug.value+= "highlight\n"+hightlighted_text;
		}*/
		
	};
	
	EditArea.prototype.resync_highlight= function(reload_now){
		this.reload_highlight=true;
		this.last_text_to_highlight="";
		this.focus();		
		if(reload_now)
			this.check_line_selection(false); 
	};	
