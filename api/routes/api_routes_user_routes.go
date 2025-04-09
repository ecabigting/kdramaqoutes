package routes

import (
	"github.com/gin-gonic/gin"                             // Gin framework for routing
	"github.com/ecabigting/kdramaqoutes/api/controllers"   // Importing controllers
)

// RegisterUserRoutes defines user-related routes
func RegisterUserRoutes(router *gin.Engine) {
	// Group routes under the "/user" prefix
	userRoutes := router.Group("/user")
	{
		// Sync route: POST /user/sync
		// Calls the SyncUser controller function
		userRoutes.POST("/sync", controllers.SyncUser)
	}
}