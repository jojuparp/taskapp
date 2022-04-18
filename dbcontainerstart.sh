docker run --name myxedb \
-p 1521:1521 -p 5500:5500 \
-e ORACLE_PWD=password \
-e ORACLE_CHARACTERSET=AL32UTF8 \
-v ~/oracle/myxedb/oradata:/opt/oracle/oradata \
oracle/database:18.4.0-xe
