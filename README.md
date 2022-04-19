## Taskapp

### Database setup

#### 0 Database environment setup
Containerized OracleDB instantces only support Linux as a base platform (even when using Docker with `--platform` option). On m1 Macs for instance, it is required to setup [Lima](https://github.com/lima-vm/lima) with the Docker configuration for the OracleDB image/container to build and run properly.

On Windows, WSL2 should be used as a base instead (continue from step 1-0)

##### 0-1 Setting up Lima (macOS)
Using Homebrew. A sample `lima-docker.yaml` config file is provided in the repo. See the Lima repo for [additional reference](https://github.com/lima-vm/lima/blob/a4920c1907fa3028689962a8abe29d2ea0f24e9a/pkg/limayaml/default.yaml)

```
# NOTE: make sure that no instance of Docker Desktop is running.
brew install qemu lima docker
limactl start lima-docker.yaml
todo ...
```

You should now be able to access the VM with `limactl start lima-docker` or `limactl shell lima-docker`.

#### 1-0 OracleDB image and container
**NOTE: The subsequent commands have to be given in a Linux environment. So if Lima is being used, make sure that the commands are passed in the VM's shell.**

Set up the OracleDB image and container using [these instructions](https://github.com/oracle/docker-images/tree/main/OracleDatabase/SingleInstance). Eg. using OracleDB version 18.4.0-xe:
```
export ...
./build .... -v 18.4.0 -x
```