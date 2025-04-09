package utils

import (
	"fmt"
	"log"
	"os"

	"github.com/ecabigting/kdramaqoutes/api/models"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// DB is a global variable to hold the GORM database instance
var DB *gorm.DB

// ConnectDatabase initializes the database connection
func ConnectDatabase() {
	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	// Construct the PostgreSQL connection string
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=%s",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_SSLMODE"),
	)

	// Connect to the database using GORM
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Log successful connection
	log.Println("Connected to the database successfully!")

	// Assign the database instance to the global variable
	DB = db

	// Run migrations for all models
	err = DB.AutoMigrate(
		&models.Qoutes{},
		&models.User{},
		&models.Account{},
		&models.Session{},
		&models.VerificationToken{},
		&models.Authenticator{},
	)
	if err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}

	log.Println("Database migrated successfully!")
}
