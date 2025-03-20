﻿# springboot_monorepo

## relevant docker commands(maildev && postgres)
```bath
docker run -p 1080:1080 -p 1025:1025 maildev/maildev

docker run --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres

```
## screenshots
- dependencies
![dependencies](booknetworkapi-dependencies.png)
- swagger openapi
![swagger](11-swagger-openapi.png)

