package server

import (
	"computer-controller-server/src/controllers"
	"fmt"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

type Server struct {
	ginEngine *gin.Engine
}

func NewServer(clientPath string) *Server {
	server := &Server{}
	server.init(clientPath)
	return server
}

func (s *Server) init(clientPath string) {
	gin.SetMode(gin.ReleaseMode)
	s.ginEngine = gin.New()
	s.ginEngine.Use(static.Serve("/", static.LocalFile(clientPath, true)))

	mouse := controllers.NewMouseController()
	mouse.Binding(s.ginEngine)

	keyboard := controllers.NewKeyboardController()
	keyboard.Binding(s.ginEngine)
}

func (s *Server) Run(port int) {
	addr := fmt.Sprintf(":%d", port)
	s.ginEngine.Run(addr)
}
