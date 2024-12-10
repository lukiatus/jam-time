# Az alkalmazás indítása

### Frontend parancsok
```
npm ci
ng serve --ssl
```

### Docker parancsok:
```
docker pull mcr.microsoft.com/mssql/server:2022-latest
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Admin12345678" -p 11433:1433 --name jam-time-db -d mcr.microsoft.com/mssql/server:2022-latest
```