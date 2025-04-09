package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables from .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	// Get the port from environment variables
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Default to port 8080 if not set
	}

	// Initialize Gin router
	router := gin.Default()

	// Define a simple route
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	// Run the server
	log.Printf("Server running on port %s", port)
	router.Run(":" + port)
}
