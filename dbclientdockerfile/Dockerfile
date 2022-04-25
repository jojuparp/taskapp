FROM        node:16.14.2-buster-slim
# Oracle needs libaio1
# wget for build and healtcheck
# unzip for fetching Oracle Instant Client
# procps for NestJS CLI, `nest start` needs `ps`
RUN         apt-get update -qq \
                && apt-get install -y -qq libaio1 wget unzip procps
ENV         LD_LIBRARY_PATH="/opt/oracle/instantclient"
WORKDIR     /opt/oracle
RUN         wget -q \
                -O instantclient-basiclite-linux.zip \
                https://download.oracle.com/otn_software/linux/instantclient/215000/instantclient-basiclite-linux.x64-21.5.0.0.0dbru.zip \
                && cksum instantclient-basiclite-linux.zip | grep -q 832698161 \
                && unzip -q instantclient-basiclite-linux.zip \
                && rm instantclient-basiclite-linux.zip \
                && mv instantclient_* instantclient 
RUN         apt-get remove -y -qq unzip