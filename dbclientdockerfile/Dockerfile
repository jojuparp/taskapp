FROM ubuntu:latest

# Oracle needs libaio1
# wget for build and healtcheck
# unzip for fetching Oracle Instant Client
RUN apt-get update -qq \
&& apt-get install -y -qq libaio1 wget unzip procps

ARG INSTANTCLIENT_VERSION_FULL
ARG INSTANTCLIENT_VERSION_URL
ARG INSTANTCLIENT_CKSUM

WORKDIR /opt/oracle

RUN wget -q \
-O instantclient-basiclite-linux.zip \
https://download.oracle.com/otn_software/linux/instantclient/${INSTANTCLIENT_VERSION_URL}/instantclient-basiclite-linux.x64-${INSTANTCLIENT_VERSION_FULL}.zip \
&& cksum instantclient-basiclite-linux.zip | grep -q ${INSTANTCLIENT_CKSUM} \
# ZIP contains instantclient_19_5-folder
&& unzip -q instantclient-basiclite-linux.zip \
&& rm instantclient-basiclite-linux.zip \
# rename instantclient_19_5 to instantclient; easier to set LD_LIBRARY_PATH
&& mv instantclient_* instantclient

# Unzip used only for unpacking Instant Client
RUN apt-get remove -y -qq unzip
