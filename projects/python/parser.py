def lex(code):
 result = []
 fcode = code.split('\n')
 for line in fcode:
  fline = []
  lexem = ''
  for index, char in enumerate(line.strip()):
    if (char == ' ' or char == ','):
      if lexem != '':
        fline.append(lexem)
        lexem = ''
    elif index == len(line)-1:
      lexem += char
      fline.append(lexem)
      lexem = ''
    else: lexem += char
  if len(fline) != 0:
    result.append(fline)
 return result
print(lex("str hi, \"hello\"\nprint hi\nend"))
