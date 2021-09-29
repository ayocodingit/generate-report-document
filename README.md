# Generate Report Document

This package for generate report big file use CSV

How to use

Hit Api with Method POST
```bash
https://generate-report-document.herokuapp.com
```

Key params
```bash
?api_key=1234
```

Write CSV
```bash
# path
/write/csv
# body
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

Destroy CSV
```bash
# path
/destroy/csv
# body
{
 "fileName": "aaa-111-&",
 "project": "projectName"
}
```

Download CSV
```bash
# path
/download/csv
# body
{
 "fileName": "aaa-111-&",
 "project": "projectName"
}
```

