# generate-report-document

This package for generate report big file use CSV

How to use

Hit Api with Method POST
```bash
https://generate-report-document.herokuapp.com/
```

Key params
```bash
?api_key=1234
```

Send Body 
```json
{
 "fileName": "aaa-111-&",
 "project": "projectName",
 "data": [{
  "id": 1,
  "name": "ayocoding",
  "class": "algorithm"
 }]
}
```
