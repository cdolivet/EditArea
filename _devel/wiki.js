editAreaLoader.load_syntax["wiki"] = {
	'COMMENT_SINGLE' : {1 : ';'}
	,'COMMENT_MULTI' : {'<!--' : '-->'}
	,'QUOTEMARKS' : {1: "'", 2: '"',
			 3: '====', 4: '===', 5: '==', 6: '__', 7: '//'}
	,'KEYWORD_CASE_SENSITIVE' : false
	,'KEYWORDS' : {
	}
	,'OPERATORS' :[
	]
	,'DELIMITERS' :[
	]
	,'REGEXPS' : {
		'links' : {
				'search' : '([^\\[])(\\[\\[[^\\]\\[]+\\]\\])()' // [[links]]
				,'class' : 'links'
				,'modifiers' : 'g'
				,'execute' : 'after' // before or after
		}
		,'boldface' : {
				'search' : '()(\\*\\*[^\\*]+\\*\\*)()' // **bold**
				,'class' : 'boldface'
				,'modifiers' : 'g'
				,'execute' : 'after' // before or after
		}
		,'images' : {
				'search' : '([^\\{])(\\{\\{[^\\}\\{]+\\}\\})()' // {{images}}
				,'class' : 'images'
				,'modifiers' : 'g'
				,'execute' : 'after' // before or after
		}
		,'codesection' : {
				'search' : '([^\\(])(\\(\\([^\\)\\(]*\\)\\))()' // ((code sections))
				,'class' : 'codesection'
				,'modifiers' : 'g'
				,'execute' : 'after' // before or after
		}
		,'fieldsection' : {
				'search' : '()(\\[\\[\\[[^\\]]*\\]\\]\\])()' // [[[fieldset]]]
				,'class' : 'fieldsection'
				,'modifiers' : 'g'
				,'execute' : 'after' // before or after
		}
		,'nowikisection' : {
				'search' : '()(\\{\\{\\{[^\\}]*\\}\\}\\})()' // {{{nowiki}}}
				,'class' : 'nowikisection'
				,'modifiers' : 'g'
				,'execute' : 'after' // before or after
		}
	}
	,'STYLES' : {
		'COMMENTS': 'color: green;'
		,'QUOTESMARKS': 'color: blue;'
		,'KEYWORDS' : {
					}
		,'OPERATORS' : 'color: #FF00FF;'
		,'DELIMITERS' : 'color: #2B60FF;'
		,'REGEXPS' : {
			'boldface' : 'color: red;'
			,'links'   : 'color: red;'
			,'images'  : 'color: red;'
			,'codesection'   : 'background-color: #dddddd;'
			,'nowikisection' : 'color: red;'
			,'fieldsection'  : 'color: cyan;'
		}
	}
};
