package models

import (
	"time"
)

// Qoutes represents the quotes schema in the database
type Qoutes struct {
	ID            string     `gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"` // Primary key, UUID auto-generated
	Qoutes        string     `gorm:"type:text;not null"`                              // The quote text, required
	TotalLikes    int        `gorm:"default:0"`                                       // Total likes, defaults to 0
	AuthorName    *string    `gorm:"type:text"`                                       // Nullable field for the author's name
	ShowTitle     string     `gorm:"type:text;not null"`                              // The title of the show, required
	CharacterName string     `gorm:"type:text;not null"`                              // The name of the character, required
	Image         *string    `gorm:"type:text"`                                       // Nullable field for the image URL
	CreatedAt     time.Time  `gorm:"autoCreateTime"`                                  // Auto-generated creation timestamp
	UpdatedAt     time.Time  `gorm:"autoUpdateTime"`                                  // Auto-updated modification timestamp
	IsEnabled     bool       `gorm:"default:true"`                                    // Defaults to true
	EnabledBy     *string    `gorm:"type:text"`                                       // Nullable field for who enabled the quote
	EnabledAt     time.Time  `gorm:"default:current_timestamp"`                       // Defaults to now
	DisabledBy    *string    `gorm:"type:text"`                                       // Nullable field for who disabled the quote
	DisabledAt    *time.Time `gorm:"type:timestamp"`                                  // Nullable field for when the quote was disabled
	UserID        *string    `gorm:"type:uuid"`                                       // Nullable field for the associated user ID
	User          *User      `gorm:"constraint:OnDelete:SET NULL"`                    // Optional foreign key relationship to the User model
}

