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

// MigrationDone is a flag to check if migrations have been run
var MigrationDone = false

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

	// --- Run Migrations ONLY IF NEEDED ---
	// Check if a key table (e.g., 'profile') already exists.
	// db.Migrator() returns an interface for migration operations.
	// HasTable() checks if a table for the given model exists.
	// We use models.User{} to represent the users table.
	// Note: GORM automatically converts struct names (like User) to table names (like users).
	// If you overrode TableName() in your model, GORM uses that name.
	hasLastModelTable := DB.Migrator().HasTable(&models.Profile{})

	// `!` means "not", so !hasLastModelTable is true if the table *does not* exist.
	if !hasLastModelTable {
		log.Println("Database tables not found. Running initial migration...")

		// DB.AutoMigrate will create tables, add missing columns/indexes.
		// It will NOT delete unused columns to protect your data.
		err = DB.AutoMigrate(
			&models.Qoutes{},
			&models.User{},
			&models.Account{},
			&models.Session{},
			&models.VerificationToken{},
			&models.Authenticator{}, // Assuming you have this model defined somewhere
			&models.Profile{},
			// &models.GoogleUserInfo{}, // **Important:** Add your new GoogleUserInfo model here too!
		)
		if err != nil {
			// If migration fails, the app state might be inconsistent, so Fatalf is appropriate.
			log.Fatalf("Failed to migrate database: %v", err)
		}

		log.Println("Database migrated successfully!")
	} else {
		// This message confirms migration was skipped because tables were found.
		log.Println("Database tables already exist. Skipping migration.")
	}
}
