package routes

import (
	"fmt"
	"os"

	"github.com/ecabigting/kdramaqoutes/api/controllers" // Importing controllers
	"github.com/ecabigting/kdramaqoutes/api/middleware"
	"github.com/gin-gonic/gin" // Gin framework for routing
)

// RegisterUserRoutes defines user-related routes
func RegisterUserRoutes(router *gin.Engine) {
	// Group routes under the "/user" prefix
	userRoutes := router.Group("/user")

	// Apply the AuthMiddleware to all routes in this group
	googleClientID := os.Getenv("GOOGLE_CLIENT_ID")
	fmt.Printf("CURRENT googleClientID: %s\n", googleClientID)
	userRoutes.Use(middleware.AuthMiddleware(googleClientID))
	{
		// Sync route: POST /user/sync
		userRoutes.POST("/sync", controllers.SyncUser)
	}
}
