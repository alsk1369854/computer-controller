package controllers

import (
	"computer-controller-server/src/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-vgo/robotgo"
)

type MouseController struct {
}

func NewMouseController() *MouseController {
	return &MouseController{}
}

func (mc *MouseController) Binding(ginEngine *gin.Engine) {
	routerGroup := ginEngine.Group("mouse")
	routerGroup.POST("/scroll-relative", mc.scrollRelative)
	routerGroup.GET("/click-left", mc.clickLeft)
	routerGroup.GET("/double-click-left", mc.doubleClickLeft)
	routerGroup.GET("/click-right", mc.clickRight)
	routerGroup.POST("/move-relative", mc.moveRelative)
}

func (mc *MouseController) scrollRelative(ctx *gin.Context) {
	var position models.Position
	if err := ctx.ShouldBindJSON(&position); err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}
	robotgo.Scroll(position.X, position.Y)
	ctx.IndentedJSON(http.StatusOK, &gin.H{})
}

func (mc *MouseController) clickLeft(ctx *gin.Context) {
	robotgo.Click(robotgo.Left)
	ctx.IndentedJSON(http.StatusOK, &gin.H{})
}

func (mc *MouseController) doubleClickLeft(ctx *gin.Context) {
	robotgo.Click(robotgo.Left, true)
	ctx.IndentedJSON(http.StatusOK, &gin.H{})
}

func (mc *MouseController) clickRight(ctx *gin.Context) {
	robotgo.Click(robotgo.Right)
	ctx.IndentedJSON(http.StatusOK, &gin.H{})
}

func (mc *MouseController) moveRelative(ctx *gin.Context) {
	var position models.Position
	if err := ctx.ShouldBindJSON(&position); err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}
	robotgo.MoveRelative(position.X, position.Y)
	ctx.IndentedJSON(http.StatusOK, &gin.H{})
}
