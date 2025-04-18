package models

import (
	"time"
)

// User represents the user schema in the database
type User struct {
	ID                 string          `gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"` // Primary key, UUID generated by the database
	Name               *string         `gorm:"type:text"`                                       // Nullable name field
	Email              string          `gorm:"unique;not null"`                                 // Unique and required email field
	EmailVerified      *time.Time      `gorm:"type:timestamp"`                                  // Nullable email verification time
	Image              *string         `gorm:"type:text"`                                       // Nullable profile image URL
	Password           *string         `gorm:"type:text"`                                       // Nullable password field
	CreatedAt          time.Time       `gorm:"autoCreateTime"`                                  // Auto-generated creation timestamp
	UpdatedAt          time.Time       `gorm:"autoUpdateTime"`                                  // Auto-updated modification timestamp
	IsEnabled          bool            `gorm:"default:true"`                                    // Defaults to true
	EnabledBy          *string         `gorm:"type:text"`                                       // Nullable field for the enabler's identifier
	EnabledAt          time.Time       `gorm:"default:current_timestamp"`                       // Defaults to now
	DisabledBy         *string         `gorm:"type:text"`                                       // Nullable field for the disabler's identifier
	DisabledAt         *time.Time      `gorm:"type:timestamp"`                                  // Nullable field for when the user was disabled
	DisplayName        string          `gorm:"not null"`                                        // Display name field
	DisplayNameChanged bool            `gorm:"default:false"`                                   // Defaults to false
	Accounts           []Account       `gorm:"constraint:OnDelete:CASCADE"`                     // One-to-many relationship with Account
	Authenticators     []Authenticator `gorm:"constraint:OnDelete:CASCADE"`                     // One-to-many relationship with Authenticator
	Sessions           []Session       `gorm:"constraint:OnDelete:CASCADE"`                     // One-to-many relationship with Session
	Quotes             []Qoutes        `gorm:"constraint:OnDelete:CASCADE"`                     // One-to-many relationship with Quote
}
