Raspberry PI Installation
===

The [Respberry PI](https://www.amazon.com/gp/product/B07BLRSKBV/ref=oh_aui_detailpage_o05_s00?ie=UTF8&psc=1) is a kit that comes an SD CARD with NOOBS preinstalled.  It's important to follow the instructions for assembling the container and installing the SD CARD.

- [First Boot](#first-boot)
- [Remote Access](#remote-access)
    - [Configure WIFI with VNC](#configure-wifi-with-vnc)
    - [Configure WIFI with command line](#configure-wifi-with-command-line)

## First Boot

1. Plug in your keyboard and monitor cables.  If you have a mouse it is slightly easier to complete the installation but it isn't required.
2. Now plug the USB power cable into your Pi.
3. Your Raspberry Pi will boot, and a window will appear with a list of different operating systems that you can install. We recommend that you use Raspbian – tick the box next to Raspbian and click on Install.
4. Raspbian will then run through its installation process. Note that this can take a while.
5. When the install process has completed, the Raspberry Pi configuration menu (raspi-config) will load. Here you are able to set the time and date for your region, enable a Raspberry Pi camera board, or even create users. You can exit this menu by using **Tab** on your keyboard to move to `Finish`.

The latest documentation can be found [here](https://www.raspberrypi.org/help/noobs-setup/2/).

## Remote Access

Configuring remote access for headless operation

* [Enable SSH](https://www.raspberrypi.org/documentation/remote-access/ssh/README.md) for remote access via terminal
* **Optional** [Enable VNC](https://www.raspberrypi.org/documentation/remote-access/vnc/README.md) for desktop remote access

### Configure WIFI with VNC

Once VNC is enabled you can use a VNC client to connect to the desktop to configure the wifi network, etc.

```
brew cask install vnc-viewer
```

### Configure WIFI with command line

The quickest way to enable wireless networking is to use the command line raspi-config tool.

```
sudo raspi-config
```

Select the `Network Options` item from the menu, then the `Wi-fi` option. On a fresh install, for regulatory purposes, you will need to specify the country in which the device is being used. Then set the SSID of the network, and the passphrase for the network. If you do not know the SSID of the network you want to connect to, see the next section on how to list available networks prior to running raspi-config.

More details can be found [here](https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md)
