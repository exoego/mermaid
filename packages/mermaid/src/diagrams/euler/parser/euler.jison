%lex
%options case-insensitive

%x string
%x title
%s data
%%
\%\%(?!\{)[^\n]*                          /* skip comments */
[^\}]\%\%[^\n]*                           /* skip comments */
<data>(\r?\n)                             { this.popState(); return 'NEWLINE'; }
[\n\r]+                                   return 'NEWLINE';
\%\%[^\n]*                                /* do nothing */

"title"                                   { return 'title'; }

"euler-beta"                            {return 'EULER';}
"sets"                                  { return 'SETS'}
"subset"                                { this.pushState("data"); return 'SUBSET'; }
<data>(?:\d+(?:\.\d+)?|\.\d+)                  { this.popState(); return 'NUMBER_WITH_DECIMAL'; }

[A-Za-z]+                                 return 'ALPHA';
":"                                       return 'COLON';
\+                                        return 'PLUS';
","                                       return 'COMMA';
\=                                        return 'EQUALS';
"*"                                       return 'MULT';
\#                                        return 'BRKT';
[\_]                                      return 'UNDERSCORE';
"."                                       return 'DOT';
"&"                                       return 'AMP';
\-                                        return 'MINUS';
[0-9]+                                    return 'NUM';
\s+                                       /* skip */
";"                                       return 'SEMI';
<<EOF>>                                   return 'EOF';

/lex

%start start

%% /* language grammar */

start
  : eol start
  | EULER start
  | document
  ;

document
  : /* empty */
  | document statement
  ;

statement
  : statement eol
  | title text                                                  { yy.setDiagramTitle($text.text.trim()); }
  | SETS identifierList                                         { yy.addSets($identifierList); }
  | SUBSET identifierList NUMBER_WITH_DECIMAL                              { yy.addSubsetData($identifierList, Number($NUMBER_WITH_DECIMAL)); }
  ;

plotData
  :  commaSeparatedNumbers    { $$ = $commaSeparatedNumbers }
  ;

commaSeparatedNumbers
  : NUMBER_WITH_DECIMAL COMMA commaSeparatedNumbers            { $$ = [Number($NUMBER_WITH_DECIMAL), ...$commaSeparatedNumbers] }
  | NUMBER_WITH_DECIMAL                                        { $$ = [Number($NUMBER_WITH_DECIMAL)] }
  ;

commaSeparatedTexts
  : text COMMA commaSeparatedTexts                                { $$ = [$text, ...$commaSeparatedTexts] }
  | text                                                          { $$ = [$text] }
  ;

eol
  : NEWLINE
  | SEMI
  | EOF
  ;


text: alphaNum { $$={text:$alphaNum, type: 'text'};}
  | STR { $$={text: $STR, type: 'text'};}
  ;

alphaNum
  : alphaNumToken {$$=$alphaNumToken;}
  | alphaNum alphaNumToken {$$=$alphaNum+''+$alphaNumToken;}
  ;

identifierList
  : identifierList COMMA ALPHA    { $$ = [...$identifierList, $ALPHA] }
  | ALPHA                         { $$ = [$ALPHA] }
  ;

alphaNumToken  : AMP | NUM | ALPHA | PLUS | EQUALS | MULT | DOT | BRKT | MINUS | UNDERSCORE ;

%%
