package main

import (
	"computer-controller-backend/src/server"

	"github.com/go-vgo/robotgo"
)

func init() {
	robotgo.MouseSleep = 100
	robotgo.KeySleep = 100
}

func main() {
	// robotgo.MilliSleep(1000)
	// robotgo.TypeStr("Hello World")
	// // robotgo.KeyTap("enter")
	// robotgo.KeyTap(robotgo.Enter)

	server.NewServer().Run("8080")
}
