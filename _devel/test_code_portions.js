// a good regexp for HTML tags: 
// <([a-z][a-z0-9]*)((?:\s*)([^>="']+)(((=)[^>="'\s]+)|((=)((")(?:[^"\\]*(?:\\\\)*(?:\\"?)?)*(?:"|$)))|((=)('(?:[^'\\]*(?:\\\\)*(?:\\'?)?)*(?:'|$))))?)*(\s*)/?>

// extract tag content (<(?:[a-z][a-z0-9]*))((?:(?:\s*)(?:[^>="']+)(?:(?:=[^>="'\s]+)|(?:=(?:(?:")(?:[^"\\]*(?:\\\\)*(?:\\"?)?)*(?:"|$)))|(?:=(?:'(?:[^'\\]*(?:\\\\)*(?:\\'?)?)*(?:'|$))))?)*(?:\s*))(/?>)


/*** THIS IS JUST TESTS IN HIGHLIGHT.JS ***/
	var a_spans				= this.content_highlight.getElementsByTagName('span');
	if( a_spans.length > 1 )
	{
		var rootSpan	= a_spans[0];
		a_spans			= rootSpan.getElementsByTagName('span');
		tmp	= stay_begin.match(/<span/g);
		var nbBeforeSpan		= tmp === null ? 0 : tmp.length;
		tmp	= stay_end.match(/<span/g);
		var nbAfterSpan			= tmp === null ? 0 : tmp.length;
		
		lastStartNode	= nbBeforeSpan > 0 ? a_spans[nbBeforeSpan-1] : rootSpan.firstChild;
		firstEndNode	= nbAfterSpan > 0 ? a_spans[a_spans.length-nbAfterSpan] : null;
		while( lastStartNode.parentNode != rootSpan ){
		 	lastStartNode	= lastStartNode.parentNode;
		}
		while( firstEndNode.parentNode != rootSpan ){
		 	firstEndNode	= firstEndNode.parentNode;
		}
		var beginMiddleText	= lastStartNode.innerHTML;
		// remove middle blocks
		nextNode		= lastStartNode;
		while( nextNode && nextNode != firstEndNode )
		{
			tmp			= nextNode;
			nextNode	= nextNode.nextSibling;
			tmp.parentNode.removeChild( tmp );
		}
		
		
		var lastIndex	= stay_begin.lastIndexOf('</span>');
		if( lastIndex != -1 ) {
			beginMiddleText = stay_begin.substr( lastIndex + 7 );
		} else {
			if( rootSpan.firstChild ){ rootSpan.removeChild( rootSpan.firstChild ); }
			beginMiddleText = stay_begin;
		}
		var endMiddleText	= '';
		var firstIndex	= stay_end.indexOf('<span');
		if( firstIndex != -1 ) {
			endMiddleText = stay_end.substr( 0, firstIndex );
		} else {
			if( rootSpan.lastChild ){ rootSpan.removeChild( rootSpan.lastChild ); }
			endMiddleText = stay_end;
		}
		 
		var tmpNode 	= document.createElement( 'div' );
		tmpNode.innerHTML	= beginMiddleText + updated_highlight + endMiddleText;
		// .replace(/^(\s)/, '&nbsp;$1' ).replace(/(\s)$/, '$1&nbsp;' )
		console.log( lastStartNode );
		while( tmpNode.childNodes.length > 0 ){
			( lastStartNode.parentNode | rootSpan ).insertBefore( tmpNode.firstChild, lastStartNode.nextSibling );
			lastStartNode	= lastStartNode.nextSibling;
		}
	}