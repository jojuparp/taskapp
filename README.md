# Taskapp

Taskapp provides a simple REST API for creating, reading, updating and deleting Tasks and their Categories. A local containerized instance of OracleDB is used as a database.

A Task has a specified due date, a category and a description attached to it. A Category has a name.

## 0 Database setup

Containerized OracleDB instantces only support x86 architectures as a base platform (even when using Docker with `--platform` option). On M1 Macs for instance, it is required to setup [Lima](https://github.com/lima-vm/lima) with the Docker configuration for the OracleDB image/container to build and run properly.

On Windows, WSL2 should be used as a base instead and treated as a typical x86 Linux environment (continue from [step 1](#0-2-oracle-database-image-and-container-setup))

### 0-1 Setting up Lima (macOS)
Using Homebrew. A sample `lima.yaml` config file is provided in the [repo](./lima.yaml). See the Lima repo for [additional reference](https://github.com/lima-vm/lima/blob/a4920c1907fa3028689962a8abe29d2ea0f24e9a/pkg/limayaml/default.yaml)

```
# NOTE: make sure that no instance of Docker Desktop is running.
$ brew install qemu lima docker
$ limactl start lima.yaml
```

You should now be able to access the VM with `limactl start <VM_NAME>` or `limactl shell <VM_NAME>`. Use `limact list` to view all the created VM's.

Run eg. `sudo docker run -p 8080:8080 nginx` to test Docker general functionality and port forwarding. Add Docker to user group if you wish.

### 0-2 Oracle Database image and container setup
**NOTE: The subsequent commands have to be given in an x86 *nix environment. So if Lima is being used, make sure that the commands are passed in the VM's shell.**

Set up the OracleDB image and container using [these instructions](https://github.com/oracle/docker-images/tree/main/OracleDatabase/SingleInstance). OracleDB version 18 is not recommended, as it has performance issues/bugs with low CPU/memory resources.\
Eg. using OracleDB version `21.3.0-xe`:
```
$ ./buildContainerImage.sh -v 21.3.0 -x
```
When the image building process is completed, you may spin up a container with the `compose` file provided in the repo. You'll need to provide an `.env.database` file with the appropriate values. An example is provided in the [repo](./.database.env.example). The variable `ORACLE_PWD` will set the administrator password for the containerized database.
```
# Using compose V2
$ docker compose -f docker-compose-db.yml up
```

**NOTE: if you are using Lima, building the OracleDB image and starting up the container is a lenghty process. Expect the whole process to take about 4-6 hours depending on your Lima VM resources. On bare metal x86 architecture the process should take much less time.**

### 0-3 OracleDB account setup

Once the OracleDB is up and running, the next step is to create a priviledged user to our database. In the example the username will be `taskapp` with the password `taskapp`
```
# Connect to the oracledb container as administrator and start sqlplus. When prompted, input your administator password
$ docker exec -it myxedb sqlplus sys@XEPDB1 as sysdba
Enter your password:
SQL> CREATE USER taskapp IDENTIFIED BY taskapp;
SQL> GRANT ALL PRIVILEGES TO taskapp;
SQL> exit;
```

## 1 Running the project

### 1-1 Development

The development build is run in debug mode in a container with Node installed. The source code is made visible to the container by a volume. The Node process inside the container is responsible for watching for changes. You'll need to provide
* An environment variable for `compose` detailing the internal IP address of `docker.host.internal`. On non-Lima Docker installations the IP will most likely be `172.17.0.1`. On lima you'll need to check the value from `/etc/hosts` from inside the VM.
* `.env.development` file with appropriate variables. An example file can be found in the [repo](/app.env.example)
  * The `ORACLEDB_CONNECTION_STRING` variable in `.env.development` will use the IP address of `docker.host.internal`, so the same address we used during the `compose` process. The database name will always be `XEPDB1` with these configurations.

```
$ export HOST_DOCKER_IP=<YOUR_IP>
$ docker compose -f docker-compose-dev.yml up development-env
# Make changes to source code ...
```

### 1-2 Production

Provide
* An environment variable for `compose` detailing the internal IP address of `docker.host.internal`. On non-Lima Docker installations the IP will most likely be `172.17.0.1`. On lima you'll need to check the value from `/etc/hosts` from inside the VM.
* `.env.production` file with appropriate variables. An example file can be found in the [repo](/app.env.example)
  * The `ORACLEDB_CONNECTION_STRING` variable in `.env.development` will use the IP address of `docker.host.internal`, so the same address we used during the `compose` process. The database name will always be `XEPDB1` with these configurations.
  
```
$ export HOST_DOCKER_IP=<YOUR_IP>
$ docker compose -f docker-compose-build.yml up
```

## 2 Usage

Once you've set up the project, you can use the following endpoints with the appropriate HTTP requests, headers and bodies. Sample requests are provided in the [repo](request-examples/).

#### @GET
* [/categories](/categories) -- Get all Categories
* [/tasks](/tasks) -- Get all Tasks
* [/tasks/duedate](/tasks/duedate) -- Get all tasks with a specified due date. A valid Javascript date has to be provided in the request body.
* [/tasks/task/:id](/tasks/task/:id) -- Get all Tasks with a specified id
* [/categories/category/:id](/categories/category/:id) -- Get all Categories with a specified id

#### @POST
* [/init](/init) -- Initialize database tables
* [/categories/create](/categories/create) -- Create a new Category
* [/tasks/create](/tasks/create) -- Create a new Task

#### @PATCH
* [/categories/update](/categories/update) -- Update a Category
* [/tasks/update](/tasks/update) -- Update a Task

#### @DELETE
* [/categories/delete](/categories/delete) -- Delete a Category (and all the Tasks associated with it)
* [/tasks/delete](/tasks/delete) -- Delete a Task
