# AUTH API

## INSTALL
```bash
npm install
```

## DATABASE
use scripts to initialize db ./scr/common/persistence/initialize

## ENVIRONMENT
create environment files in folder ./config
* Create folder ./config
* Create environment (developmnet.env/staging.env/production.env)
* set values
    jwt_secret_key=
    
    db_mysql_host=
    db_mysql_user=
    db_mysql_password=
    db_mysql_database=

    db_mssql_server=
    db_mssql_user=
    db_mssql_password=
    db_mssql_database=

* execute app

### Development
```bash
npm run start:dev
```
### Production
```bash
npm start
```