/*** lexical grammar ***/

%lex
%%

"//".*                  /* ignore comment */
"->"                    return 'CONNECT';
":"                     return 'INSTANCE';
"."                     return '.';
"="                     return '=';
"["                     return '[';
"]"                     return ']';
"("                     return '(';
")"                     return ')';
"^"                     return '^';
"*"                     return '*';
"Infinity"	        return 'INFINITY';
[0-9]+("."[0-9]+)?      return 'NUMBER';
[a-zA-Z]+               return 'VAR';
\n+                     return 'NEWLINE';
\s+                     /* ignore whitespaces */
<<EOF>>                 return 'EOF';

/lex

/*** operador associations and precedences ***/

%left '^'
%left 'CONNECT'

%start program

/*** language grammar ***/
%%

program
	: program_section EOF 
          {{ var foo = ['Program'].concat($1);
             console.log(foo);
             return foo; }}
        | program_section program
        ; 

program_section
        : expr_ctrl
        | expr_dsp
	;

expr
	: expr_ctrl
          {{ $$ = ['Ctrl', $1]; $$ = $1; console.log($$); }}
	| expr_dsp
          {{ $$ = ['Dsp', $1]; $$ = $1; console.log($$); }}
	;

expr_dsp
	: expr_dsp CONNECT instancia
          {{ $$ = ['Connection', {from: $1, to: $3}]; }}
        | instancia
	;

instancia
	: VAR INSTANCE VAR 
          {{ $$ = ['Instance', {obj: $1, class: $3}]; }}
	;

expr_ctrl
	: VAR '.' msg 
          {{ $$ = ['Message', {target: $1, message: $3}]; }}
	;

msg
        : VAR '=' '[' matriz ']' '^' time
          {{ $$ = ['Attrib', {attribute: $1, pattern: $matriz, at: $time}]; }}
        ;

matriz
	: NUMBER matriz
	| NUMBER 
          {{ $$ = Number(yytext); }}
	;

time
	: INFINITY 
          {{ $$ = yytext; }}
	| NUMBER 
          {{ $$ = Number(yytext); }}
	;

