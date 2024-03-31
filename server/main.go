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
	server.NewServer().Run("8080")
}
