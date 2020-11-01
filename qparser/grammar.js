const grammar = {
  "lex": {
    "rules": [
      ["\\s+",      "/* skip whitespace */"],
      ["(\\w|\\d|[\u{0080}-\u{20000}])+", "return 'STRING';"],
      ["\"[^\"]+\"", "return 'Q_STRING';"],
      ["\\(",       "return '(';"],
      ["\\)",       "return ')';"],
      ["$",         "return 'EOF';"],
      ["==",        "return 'IS';"],
      ["!=",        "return 'IS_NOT';"],
      ["\\^=",      "return 'PREFIX';"],
      ["\\*=",      "return 'CONTAIN';"],
      ["=",         "return 'IS';"],
      ["\\|\\|",    "return 'OR';"],
      ["&&",        "return 'AND';"],
    ]
  },
  
  "operators": [
    ["left", "IS", "IS_NOT"],
    ["right", "AND", "OR"],
  ],
  
  "bnf": {
    "expressions" :[[ "e EOF",   "return $1;"  ]],
    "e": [
      [ "STRING IS STRING",        "$$ = Object.fromEntries([[$1, $3]]);" ], 
      [ "STRING IS Q_STRING",      "$$ = Object.fromEntries([[$1, $3.slice(1, $3.length-1)]]);" ], 
      [ "STRING IS_NOT STRING",    "$$ = {NOT: Object.fromEntries([[$1, $3]])};" ], 
      [ "STRING IS_NOT Q_STRING",  "$$ = {NOT: Object.fromEntries([[$1, $3.slice(1, $3.length-1)]])};" ], 
      [ "STRING CONTAIN STRING",   "$$ = {CONTAIN: Object.fromEntries([[$1, $3]])};" ], 
      [ "STRING CONTAIN Q_STRING", "$$ = {CONTAIN: Object.fromEntries([[$1, $3.slice(1, $3.length-1)]])};" ], 
      [ "STRING PREFIX STRING",    "$$ = {PREFIX: Object.fromEntries([[$1, $3]])};" ], 
      [ "STRING PREFIX Q_STRING",  "$$ = {PREFIX: Object.fromEntries([[$1, $3.slice(1, $3.length-1)]])};" ], 
      [ "STRING",                  "$$ = {tag: yytext};" ],
      [ "Q_STRING",                "$$ = {tag: yytext.slice(1, yytext.length-1)};" ],
      [ "( e )",                   "$$ = $2;" ],
      [ "e AND e",                 "$$ = { AND: [$1, $3] };" ],
      [ "e OR e",                  "$$ = { OR: [$1, $3] };" ],
    ],
  }
};

module.exports = grammar;
