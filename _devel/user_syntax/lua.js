/**
 * v1.0 - 2010-01-14 - Ron Bessems - pas stable sur les commentaires
 */
editAreaLoader.load_syntax["lua"] = {
	'DISPLAY_NAME' : 'Lua',
	'QUOTEMARKS' : {
		1 : "'",
		2 : '"'
	},
	'KEYWORD_CASE_SENSITIVE' : true,'KEYWORDS' : {
		'constants' : [ 'nil', 'false', 'true', ],
		'types' : [ 'math', 'string', 'sys', 'io', 'table', 'os', 'debug',
				'assert', 'collectgarbage', 'dofile', 'error', '_G',
				'getmetatable', 'ipairs', 'pairs', 'load', 'loadfile',
				'loadstring', 'next', 'pcall', 'print', 'rawget', 'rawset',
				'rawequal', 'rawset', 'select', 'setenv', 'setmetatable',
				'tonumber', 'tostring', 'type', 'unpack', 'xpcall', 'coroutine' ],
		'statements' : [ 'do', 'else', 'if', 'for', 'if', 'type', 'function',
				'end', 'while', 'elseif', 'for', 'repeat', 'do', 'then',
				'until', 'break', 'return', 'local' ],
		'keywords' : [ 'and', 'or', 'not', 'in' ]
	},
	'OPERATORS' : [ '+', '-', '/', '*', '=', '<', '>', '~=', '%', '^' ],
	'DELIMITERS' : [ '(', ')', '[', ']', '{', '}' ],
	'REGEXPS' : {

		'COMMENTS1' : {
			'search' : '()(--.*)()',
			'class' : 'comments',
			'modifiers' : 'g',
			'execute' : 'before'

		},
		'COMMENTS2' : {
			'search' : '()(--\\[\\[(?:.|[\\r\\n])*?--\\]\\])()',
			'class' : 'comments',
			'modifiers' : 'g',
			'execute' : 'before'

		}
	},
	'STYLES' : {
		'COMMENTS' : 'color: #009900;',
		'QUOTESMARKS' : 'color: #923698;',
		'KEYWORDS' : {
			'constants' : 'color: #69bf7b;',
			'types' : 'color: #0000EE; background-color: #ccccff;',
			'statements' : 'color: #263cc3;',
			'keywords' : 'color: #1c934c;'
		},
		'OPERATORS' : 'color: #263cc3;',
		'DELIMITERS' : 'color: #0038E1;',
		'REGEXPS' : {}
	}
};