import sys
import os
import re

PROJ_DIR = "./"             # рабочая папка проекта
BD_COUNT = int(sys.argv[1]) # количество бандлов

ORIGINAL_PACKAGE = "<?>"    # кеширование оригинального пакета
KEYWORDS = [                # ключевые слова для пакета
    "flow", "remark", "blow", "unsi",
    "girl", "dating", "mark", "fly",
    "power", "private", "wool", "pretty",
    "json", "app", "volt"]

if(len(KEYWORDS) < BD_COUNT): # если не хватает ключевых слов
    print("Слишком много бандлов, максимум {}".format(len(KEYWORDS)))
    exit(0)

# выводим лог в консоль
def log(str):
    print(" {}".format(str))

# показываем входное сообщение
log("Volt!")
log("Выбранный проект: {}".format(PROJ_DIR))
log("Количество копий: {}\n".format(BD_COUNT))

# ищем build.gradle
isFinish = False # если файл был найден
def iter(path):
    global isFinish

    for file in os.listdir(path):
        if(isFinish):
            return
        npath = "{}/{}".format(path, file)
        if(os.path.isdir(npath)):
            iter(npath)
        else:
            if(file == "build.gradle"):
                log("Применение патча для {}".format(npath))
                h = open(npath, "r")
                content = h.read()
                if("applicationId" in content):
                    pathPrepareGradle(h, content)
                    buildBundles(npath)
                    resetPrepareGrale(npath)
                    isFinish = True

i = 0
# берем след. строку
def nextString():
    global i

    k = KEYWORDS[i]
    i += 1

    return k

# собрать бандлы
def buildBundles(path):
    global ORIGINAL_PACKAGE

    for i in range(BD_COUNT):
        end = nextString()
        log("Сборка {}.apk, пакет: {}".format(end, ORIGINAL_PACKAGE + "." + end))
        changePackage(path, end)
        buildBundle(path, end)
        resetPackage(path, end)
    return

# собрать опредленный бандл
def buildBundle(path, out):
    # сборка апк
    os.system("{}\\gradlew assembleRelease".format(PROJ_DIR))
    # копируем апк
    os.system("copy {}\\app\\build\\outputs\\apk\\release\\app-release.apk {}.apk".format(PROJ_DIR, out))
    return

# сменить последний keyword в пакете
def changePackage(path, str):
    content = ""
    with open(path, "r") as f:
        content = f.read()

    content = content.replace("/* xx8x */", str)
    with open(path, "w") as f:
        f.write(content)

# сбросить пакет обратно
def resetPackage(path, str):
    content = ""
    with open(path, "r") as f:
        content = f.read()

    content = content.replace(str, "/* xx8x */")
    with open(path, "w") as f:
        f.write(content)

# сбросить градл файл
def resetPrepareGrale(path):
    content = ""
    with open(path, "r") as f:
        content = f.read()

    content = content.replace("./* xx8x */", "")
    with open(path, "w") as f:
        f.write(content)

# пропатчить градл файл
def pathPrepareGradle(file, content):
    global ORIGINAL_PACKAGE
    # в рот ебал разрабов питона
    # пришлось написать это
    # вместо крутой регулярки
    # которая тут не работает

    a = content.split("applicationId \"")
    b = a[1].split("\"")
    package = b[0]
    ORIGINAL_PACKAGE = package
    newpackage = "{}./* xx8x */".format(package)

    newcontent = content.replace(package, newpackage)
    path = file.name

    file.close()
    with open(path, "w") as file:
        file.write(newcontent)

    log("OK!")

# main
iter(PROJ_DIR)
