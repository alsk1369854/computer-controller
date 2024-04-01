package utils

import (
	"fmt"
	"net"
)

type netUtils struct {
}

var netUtilsInstance = &netUtils{}

func GetNetUtils() *netUtils {
	return netUtilsInstance
}

func (nu *netUtils) PrintIPInfo() {
	ifaces, err := net.Interfaces()
	if err != nil {
		fmt.Println(err.Error())
	}
	for _, i := range ifaces {
		addrs, err := i.Addrs()
		if err != nil {
			fmt.Println(err.Error())
		}
		for _, addr := range addrs {
			var ip net.IP
			switch v := addr.(type) {
			case *net.IPNet:
				ip = v.IP
			case *net.IPAddr:
				ip = v.IP
			}
			fmt.Println(i.Name, ip)
		}
	}
}
