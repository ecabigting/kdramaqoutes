package controllers

import (
	"net/http" // For HTTP request and response handling

	"github.com/ecabigting/kdramaqoutes/api/models" // Importing models for User and Account
	"github.com/ecabigting/kdramaqoutes/api/utils"  // Importing utils for database access
	"github.com/gin-gonic/gin"                      // Gin framework for routing and handling requests
)

// SyncUserRequest defines the structure of the request body for syncing a user
type SyncUserRequest struct {
	User    models.User    `json:"user"`    // User data passed from the Next.js app
	Account models.Account `json:"account"` // Account data passed from the Next.js app
}

// SyncUser is the controller function for the `user/sync` endpoint
func SyncUser(c *gin.Context) {
	// Step 1: Bind the incoming JSON payload to the `SyncUserRequest` struct
	var requestBody SyncUserRequest
	if err := c.ShouldBindJSON(&requestBody); err != nil {
		// Return a 400 Bad Request response if JSON binding fails
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload", "details": err.Error()})
		return
	}

	// Step 2: Extract User and Account data from the request body
	user := requestBody.User
	account := requestBody.Account

	// Step 3: Start a database transaction
	tx := utils.DB.Begin()

	// Step 4: Check if the user already exists in the database
	var existingUser models.User
	if err := tx.Where("email = ?", user.Email).First(&existingUser).Error; err == nil {
		// If the user exists, update their information
		existingUser.Name = user.Name
		existingUser.Image = user.Image
		if err := tx.Save(&existingUser).Error; err != nil {
			tx.Rollback() // Rollback the transaction in case of an error
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
			return
		}
		// Update the user reference with the existing user
		user = existingUser
	} else {
		// If the user doesn't exist, create a new user
		if err := tx.Create(&user).Error; err != nil {
			tx.Rollback() // Rollback the transaction in case of an error
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
			return
		}
	}

	// Step 5: Check if the account already exists in the database
	var existingAccount models.Account
	if err := tx.Where("provider = ? AND provider_account_id = ?", account.Provider, account.ProviderAccountID).First(&existingAccount).Error; err == nil {
		// If the account exists, update its information
		existingAccount.RefreshToken = account.RefreshToken
		existingAccount.AccessToken = account.AccessToken
		existingAccount.ExpiresAt = account.ExpiresAt
		if err := tx.Save(&existingAccount).Error; err != nil {
			tx.Rollback() // Rollback the transaction in case of an error
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update account"})
			return
		}
	} else {
		// If the account doesn't exist, create a new account
		account.UserID = user.ID // Associate the account with the user
		if err := tx.Create(&account).Error; err != nil {
			tx.Rollback() // Rollback the transaction in case of an error
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create account"})
			return
		}
	}

	// Step 6: Commit the database transaction if all operations succeed
	tx.Commit()

	// Step 7: Return a success response
	c.JSON(http.StatusOK, gin.H{"message": "User and account synchronized successfully", "user": user, "account": account})
}
