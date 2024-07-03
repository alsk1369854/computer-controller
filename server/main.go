package main

import (
	"computer-controller-server/src/server"
	"computer-controller-server/src/utils"
	"fmt"
	"os"

	"github.com/go-vgo/robotgo"
	"github.com/mdp/qrterminal/v3"
)

func init() {
	robotgo.MouseSleep = 100
	robotgo.KeySleep = 100
}

func main() {
	// 伺服器端口
	serverPort := 8080

	printHostUrl(serverPort)

	// 前端檔案路徑
	// path for go run
	// clientPath := `./client/build`
	// path for build .exe
	clientPath := utils.GetPathUtils().GetAppPath() + "/client/build"

	server.NewServer(clientPath).Run(serverPort)
}

func printHostUrl(serverPort int) {
	// 打印主機IP
	netUtils := utils.GetNetUtils()
	fmt.Println("Host URL:")
	for _, info := range netUtils.GetIPInfo() {
		ip := info.IPNet.IP.String()
		if netUtils.IsIpv4IP(ip) {
			hostUrl := fmt.Sprintf("\thttp://%s:%d", ip, serverPort)
			fmt.Println(hostUrl)
			qrterminal.Generate(hostUrl, qrterminal.L, os.Stdout)
		}
	}
	fmt.Println()
}
