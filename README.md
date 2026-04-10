# My E-Commerce Store Module

## Overview
This is my individual e-commerce store module for the Full Stack Application Team Project. It provides a RESTful API for managing products in my store, with data persisted in MongoDB Atlas.

## Disclaimer
This application is for demonstrating student web development skills only. All data shown is for educational and portfolio purposes.

## Author
Flavia Viana - vian0006.algonquinlive.com

## Course
Web Programming - Full Stack Application Project


## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas with Mongoose ODM
- **Testing:** Jest, Supertest
- **Deployment:** Render

## Product Schema
| Field | Type | Description |
|-------|------|-------------|
| storeId | String | Unique identifier for my store |
| storeName | String | Name of my store |
| productId | String | Unique identifier for the product |
| productName | String | Name of the product |
| price | Number | Product price |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /products | Get all products from my store |
| GET | /products/:productId | Get a single product by ID |
| POST | /products | Create a new product |
| PUT | /products/:productId | Update a product |
| DELETE | /products/:productId | Delete a product |

## Sample Products
My store contains 5 sample dance products:

| productId | productName | price |
|-----------|-------------|-------|
| d1 | Ballet Slippers | 49.99 |
| d2 | Tap Shoes | 79.99 |
| d3 | Jazz Dance Leotard | 39.99 |
| d4 | Hip Hop Sweatpants | 34.99 |
| d5 | Dance Warm-Up Leggings | 44.99 |

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/Flaviasv/Flavia-Viana-Full-Stack-Application-Project-Group-1.git
cd Flavia-Viana-Full-Stack-Application-Project-Group-1
