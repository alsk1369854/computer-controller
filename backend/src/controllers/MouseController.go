package controllers

import (
	"computer-controller-backend/src/models"
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
	routerGroup.GET("/click-left", mc.clickLeft)
	routerGroup.GET("/click-right", mc.clickRight)
	routerGroup.POST("/move-relative", mc.moveRelative)
}

func (mc *MouseController) clickLeft(ctx *gin.Context) {
	robotgo.Click(robotgo.Left)
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
