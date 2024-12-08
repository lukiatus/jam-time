### Frontend létrehozás parancsok
```
npm install -g @angular/cli
ng new jam-time-frontend
ng add @angular/material
npm install angular-calendar dayjs jwt-decode
ng add @angular-eslint/schematics
ng serve --ssl
```

### Docker parancsok:
```
docker pull mcr.microsoft.com/mssql/server:2022-latest
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Admin12345678" -p 11433:1433 --name jam-time-db -d mcr.microsoft.com/mssql/server:2022-latest
```