## Docs

| method        | desc              | arguments                                      | result   |
| ------------- | ------------------|------------------------------------------------|----------|
| add.php       | make new file     | ?username=[username]&file=[file]               | OK       |
| del.php       | remove file       | ?username=[username]&file=[file]               | OK       |
| edit.php      | write to file     | ?username=[username]&file=[file]&data=[base64] | OK       |
| append.php      | append to file     | ?username=[username]&file=[file]&data=[base64] | OK       |
| get.php       | read file         | ?username=[username]&file=[file]               | [base64] |
| list.php      | list files in dir | ?username=[username]&dir=[dir]                 | [list]   |
| mkdir.php     | make new dir      | ?username=[username]&dir=[dir]                 | OK       |


