import json, os, sys

LANG = sys.argv[1] #'english'
OUPUT_PATH = 'static/' + LANG + '/'
JMDICT_PATH = 'jmdict_' + LANG + '/'

if not os.path.isdir(OUPUT_PATH):
    print('Output folder is has ben created.')
    os.makedirs(OUPUT_PATH)

files = os.listdir(JMDICT_PATH)

print('Config -> LANG: {}, INPUT: {}, OUTPUT: {}.'.format(LANG, JMDICT_PATH, OUPUT_PATH))

# convert stupid array of arrays to array of dicts
def convert(arr):
    dicts = []
    for item in arr:
        d = {
            'hieroglyph' : item[0],
            'a1' : item[1],
            'a2' : item[2],
            'a3' : item[3],
            'a4' : item[4],
            'meanings' : item[5],
            'a5' : item[6],
            'a6' : item[7],
        }
        dicts.append(d)
    return dicts

# process all files in input folder
for file in files:
    if file[0] == '.':
        continue # skip other stuff

    print('Selected file: {}.'.format(file))

    f = open("{}/{}".format(JMDICT_PATH, file), 'r')
    content = f.read()
    f.close()

    arr = json.loads(content)
    dicts = convert(arr)

    txt = json.dumps(dicts)

    f2 = open('{}/{}'.format(OUPUT_PATH, file), 'w')
    f2.write(txt)
    f2.close()

print('(!) DONE')
    
# (!) original json structure
# 0 japanese character: string
# 1 ?: string
# 2 ?: string
# 3 ?: string
# 4 ?: int
# 5 arr of meanings: arr<string>
# 6 ?: int
# 7: ?: string