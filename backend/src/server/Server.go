package server

import (
	"computer-controller-backend/src/controllers"

	"github.com/gin-gonic/gin"
)

type Server struct {
	ginEngine *gin.Engine
}

func NewServer() *Server {
	server := &Server{}
	server.init()
	return server
}

func (s *Server) init() {
	s.ginEngine = gin.Default()

	mouse := controllers.NewMouseController()
	mouse.Binding(s.ginEngine)

	keyboard := controllers.NewKeyboardController()
	keyboard.Binding(s.ginEngine)
}

func (s *Server) Run(port string) {
	s.ginEngine.Run(":" + port)
}
