HomeBridge
===

This combines the settings found in this Gist under [johannrichard/homebridge](https://gist.github.com/johannrichard/0ad0de1feb6adb9eb61a/) and this [Guide](https://timleland.com/setup-homebridge-to-start-on-bootup/) into a single set of instructions.

On newer Raspberry Pi and Debian systems (Jessie +), managing of services with `init.d` is (transparently) replaced with `systemd`. If you wish to use `systemd` for running Homebridge on boot, you can follow these instructions. As you can see, the service definition is much shorter than a comparable init.d script.

- [Getting Started](#getting-started)
- [Configuring Systemd](#configuring-systemd)
    - [Run as a service](#run-as-a-service)
    - [Notes](#notes)

## Getting Started

To get started connect to the Rasberrypi with the following command:
```
ssh pi@rasberrypi.local
```

You will need to use the password that was setup during the installation process.

## Configuring Systemd

Download the [two files](../../config/raspberry/homebridge) and place [homebridge](../../config/raspberry/homebridge/homebridge) under `/etc/default` and [homebridge.service](../../config/raspberry/homebridge/homebridge.service) under `/etc/systemd/system` on your Raspberry Pi.

```
cd /etc/default && wget --no-check-certificate https://raw.githubusercontent.com/nnance/iot-homekit-gcp/master/config/raspberry/homebridge/homebridge
```

```
cd /etc/systemd/system && wget --no-check-certificate https://raw.githubusercontent.com/nnance/iot-homekit-gcp/master/config/raspberry/homebridge/homebridge.service
```

**ATTENTION**: Depending on how you installed nodejs (as package or tarball) and homebridge, you might have to change the line `ExecStart` in the file homebridge.service from `/usr/bin/homebridge` to `/usr/local/bin/homebridge`. The easiest way to find out which one to use is to issue the command which homebridge after you have installed homebridge on your system.
```
pi@pi:~ $ which homebridge
/usr/local/bin/homebridge
```

I installed node using the following commands:
```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```
As a result my `ExecStart` was setup for `/usr/bin/homebridge` and I have updated the homebridge.service file above accordingly.

### Run as a service
In order to use the systemd service as is, the following folders and user have to exists:
* A system user named `homebridge`. You can easily create this user with `useradd --system homebridge` or choose a different name
* A directory called `/var/lib/homebridge`, writable by the user created above, and a corresponding `config.json` file in that directory. Homebridge by default looks for its configuration in `/home/<username>/.homebridge`. This is unsuitable for services and the `-U /var/lib/homebridge` flag ensures the config is read from a different place.

Create user and the directory with the proper permissions:
```
sudo mkdir /var/lib/homebridge
sudo chown homebridge /var/lib/homebridge
```

This copies your current user’s config. This assumes you have already added accessories etc.
```
sudo cp ~/.homebridge/config.json /var/lib/homebridge
sudo cp -r ~/.homebridge/persist /var/lib/homebridge
```

Then Enable and run the service (first time) with the following commands:
```
sudo systemctl daemon-reload
sudo systemctl enable homebridge
sudo systemctl start homebridge
```
You can check the status of the service by calling 
```
sudo systemctl status homebridge
```
On subsequent reboots, it should start automatically, if not, use the `journalctl -u homebridge` to check the error cause. 

### Notes 
* The service will restart after 10 seconds if it fails for any reason (or if you kill it for example with `kill -s SIGSEGV <pid>`)
* You might also try the tips in this [Tutorial](https://timleland.com/setup-homebridge-to-start-on-bootup/).
* To see the homebridge output, call `sudo journalctl -au homebridge`.  Make sure to specify `-n`, or the QR code won't be displayed.
