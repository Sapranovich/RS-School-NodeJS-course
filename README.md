# RS-School-NodeJS-course Task1

# Запуск приложения

Для запуска приложения нужно зайти в папку src и ввести **node my_caesar_cli.js** и добавить следующие параметры:

```
1. -s, --shift : сдвиг
2. -i, --input : входной файл
3. -o, --output : выходной файл
4. -a, --action : кодирование / декодирование действия
```

Параметры **a/action** и **s/shift** обязательны.
Параметры **i/input** и **o/output** опциональны.

## Примеры 

```
node my_caesar_cli.js -s 3 -a encode
node my_caesar_cli.js -s 3 -a encode -i ./input.txt
node my_caesar_cli.js -s 3 -a encode -i ./input.txt -o ./output.txt
node my_caesar_cli.js -s 3 -a decode
```

При отрицательном сдвиге запись параметра **s/shift** должна выглядеть следующим образом:
```
node my_caesar_cli.js -s=-3 -a encode
node my_caesar_cli.js --shift=-3 --action encode
```

Выход из **process.stdin** осуществляется **Ctrl+c**
