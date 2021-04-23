package users

import (
	"github.com/gin-gonic/gin"
	"github.com/hackclub/hack-as-a-service/db"
)

func handlePOSTUser(c *gin.Context) {
	var json struct {
		SlackUserID string
	}

	err := c.BindJSON(&json)
	if err != nil {
		c.JSON(400, gin.H{"status": "error", "message": "Invalid JSON"})
		return
	}

	// create in db
	user := db.User{SlackUserID: json.SlackUserID}
	result := db.DB.Create(&user)
	if result.Error != nil {
		c.JSON(500, gin.H{"status": "error", "message": result.Error})
	} else {
		c.JSON(200, gin.H{"status": "ok", "user": user})
	}
}