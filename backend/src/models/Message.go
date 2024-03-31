package models

type Message struct {
	Message string `form:"message" json:"message" binding:"required"`
}
