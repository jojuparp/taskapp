docker run --name myxedb \
--platform=linux/amd64 \
-p 1521:1521 -p 5500:5500 \
-e ORACLE_PWD=mysecurepassword \
-e ORACLE_CHARACTERSET=AL32UTF8 \
-v ~/docker-volumes/myxedb/oradata:/opt/oracle/oradata \
oracle/database:21.3.0-xe
