package controllers

import (
	"computer-controller-backend/src/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-vgo/robotgo"
)

type KeyboardController struct {
}

func NewKeyboardController() *KeyboardController {
	return &KeyboardController{}
}

func (kc *KeyboardController) Binding(ginEngine *gin.Engine) {
	routerGroup := ginEngine.Group("keyboard")
	routerGroup.GET("/input", kc.input)
	routerGroup.GET("/click-enter", kc.clickEnter)
	routerGroup.GET("/click-backspace", kc.clickBackspace)
}

func (kc *KeyboardController) input(ctx *gin.Context) {
	var message models.Message
	if err := ctx.ShouldBind(&message); err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}
	robotgo.TypeStr(message.Message)
	ctx.IndentedJSON(http.StatusOK, &gin.H{})
}

func (kc *KeyboardController) clickEnter(ctx *gin.Context) {
	robotgo.KeyTap(robotgo.Enter)
	ctx.IndentedJSON(http.StatusOK, &gin.H{})
}

func (kc *KeyboardController) clickBackspace(ctx *gin.Context) {
	robotgo.KeyTap(robotgo.Backspace)
	ctx.IndentedJSON(http.StatusOK, &gin.H{})
}
