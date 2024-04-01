package main

import (
	"computer-controller-backend/src/server"
	"computer-controller-backend/src/utils"

	"github.com/go-vgo/robotgo"
)

func init() {
	robotgo.MouseSleep = 100
	robotgo.KeySleep = 100
}

func main() {
	utils.GetNetUtils().PrintIPInfo()
	clientPath := `./client/build`
	server.NewServer(clientPath).Run(8080)
}
