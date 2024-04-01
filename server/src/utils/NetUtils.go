package utils

import (
	"fmt"
	"net"
	"regexp"
)

type netUtils struct {
}

var netUtilsInstance = &netUtils{}

func GetNetUtils() *netUtils {
	return netUtilsInstance
}

type IPInfo struct {
	HardwareAddr net.HardwareAddr
	Name         string
	IPNet        *net.IPNet
}

// 檢查IP是否為IPv4格式
func (nu *netUtils) IsIpv4IP(ip string) bool {
	isIPv4Regexp, err := regexp.Compile(`\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b`)
	if err != nil {
		fmt.Println(err.Error())
	}
	return isIPv4Regexp.MatchString(ip)
}

// 獲取電腦IP訊息
func (nu *netUtils) GetIPInfo() []*IPInfo {
	var result []*IPInfo = []*IPInfo{}
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
			switch ip := addr.(type) {
			case *net.IPNet:
				result = append(result, &IPInfo{
					Name:         i.Name,
					HardwareAddr: i.HardwareAddr,
					IPNet:        ip,
				})
			case *net.IPAddr:
				break
			}

		}
	}
	return result
}

// 打印電腦IP訊息
func (nu *netUtils) PrintIP() {
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
