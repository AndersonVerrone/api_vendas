import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

enum ProductCategory {
  ELECTRONICS = "Electronics",
  CLOTHING = "Clothing",
  BEAUTY = "Beauty",
  HOME_AND_KITCHEN = "Home & Kitchen",
  SPORTS_AND_OUTDOORS = "Sports & Outdoors",
  HEALTH_AND_WELLNESS = "Health & Wellness",
  TOYS_AND_GAMES = "Toys & Games",
  BOOKS_AND_MAGAZINES = "Books & Magazines",
  AUTOMOTIVE = "Automotive",
  PET_SUPPLIES = "Pet Supplies",
  FOOD_AND_DRINKS = "Food & Drinks",
  OFFICE_SUPPLIES = "Office Supplies",
  JEWELRY_AND_ACCESSORIES = "Jewelry & Accessories",
  FURNITURE = "Furniture",
  MUSIC_AND_INSTRUMENTS = "Music & Instruments",
  GARDEN_AND_OUTDOOR_DECOR = "Garden & Outdoor Decor",
  ART_AND_CRAFT_SUPPLIES = "Art & Craft Supplies",
  BABY_AND_TODDLER = "Baby & Toddler",
  PARTY_SUPPLIES = "Party Supplies",
  ELECTRICAL_APPLIANCES = "Electrical Appliances",
  FITNESS_EQUIPMENT = "Fitness Equipment",
  HOLIDAY_DECOR = "Holiday Decor",
  ELECTRONIC_ACCESSORIES = "Electronic Accessories",
  COOKWARE_AND_BAKING_SUPPLIES = "Cookware & Baking Supplies",
  TRAVEL_ACCESSORIES = "Travel Accessories",
  SPORTS_NUTRITION = "Sports Nutrition",
  HOME_IMPROVEMENT = "Home Improvement",
  PHOTO_AND_VIDEO_EQUIPMENT = "Photo & Video Equipment",
  BEAUTY_TOOLS_AND_ACCESSORIES = "Beauty Tools & Accessories",
  STATIONERY = "Stationery",
  CLEANING_SUPPLIES = "Cleaning Supplies",
  EDUCATIONAL_SUPPLIES = "Educational Supplies",
  PARTY_FAVORS_AND_GIFTS = "Party Favors & Gifts",
  ELECTRONIC_GADGETS = "Electronic Gadgets",
  OUTDOOR_RECREATION = "Outdoor Recreation",
  DIY_KITS_AND_PROJECTS = "DIY Kits & Projects",
  WEDDING_SUPPLIES = "Wedding Supplies",
  BATH_AND_BODY_PRODUCTS = "Bath & Body Products",
  COMPUTER_ACCESSORIES = "Computer Accessories",
  FITNESS_ACCESSORIES = "Fitness Accessories",
  CRAFT_KITS_AND_SUPPLIES = "Craft Kits & Supplies",
  HEALTH_CARE_PRODUCTS = "Health Care Products",
  MUSICAL_INSTRUMENT_ACCESSORIES = "Musical Instrument Accessories",
  LAWN_AND_GARDEN_CARE = "Lawn & Garden Care",
  PARTY_AND_EVENT_PLANNING = "Party & Event Planning",
  SMART_HOME_DEVICES = "Smart Home Devices",
}

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 50 })
  name: ProductCategory;
}