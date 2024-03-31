package server

import (
	"computer-controller-backend/src/controllers"
	"computer-controller-backend/src/utils"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

var pathUtils = utils.GetPathUtils()

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
	s.ginEngine.Use(static.Serve("/", static.LocalFile(pathUtils.GetAppPath()+"/client/build", true)))

	mouse := controllers.NewMouseController()
	mouse.Binding(s.ginEngine)

	keyboard := controllers.NewKeyboardController()
	keyboard.Binding(s.ginEngine)
}

func (s *Server) Run(port string) {
	s.ginEngine.Run(":" + port)
}
