<p align="center"><img src="https://raw.githubusercontent.com/kotleni/kotleni.github.io/master/assets/etiket_f.png" width=400></img></p>

### Что в нутри?
Метка стандарта ISO-DEP (ISO 14443-4) (UID размером в 7 байт)

### Как работает?
Если попытатся прочитать память карты, то каждая ячейка будет иметь значение ```0BDF0020```
Что бы карта вернула нужные данные, терминал отправляет на нее пакет - и ждет ответа.
