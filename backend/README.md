# E-commerce Digital Goods Platform - Backend

A robust Node.js/Express backend for an E-commerce digital goods platform with comprehensive features including user management, wallet system, orders, tickets, recommendations, and more.

## Features

- 🔐 **Authentication & Authorization**: JWT-based auth with role-based access control (Customer, Staff, Admin)
- 💰 **Wallet System**: Digital wallet with deposit, payment, and refund functionality
- 🛍️ **Product Management**: Digital product catalog with multi-language support
- 📦 **Order Management**: Complete order lifecycle from creation to delivery
- 🎫 **Ticket System**: Customer support with ticket and messaging
- 🏷️ **Coupon System**: Flexible discount coupons (percentage or fixed amount)
- ⭐ **Review System**: Product ratings and reviews
- 🛒 **Shopping Cart**: Persistent cart functionality
- 🎁 **Loyalty Points**: Reward system with points earn/redeem
- 🔔 **Notifications**: In-app notification system
- 🤖 **Recommendations**: Product recommendation engine
- 📊 **Monitoring**: Event logging and analytics
- 🌍 **Multi-language**: i18n support for products and content

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Validation**: Joi (ready to integrate)
- **File Upload**: Ready for AWS S3 or Cloudinary
- **Payments**: Integration-ready for Stripe, PayPal, VNPay

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── constants/       # Constants and enums
│   ├── models/          # Mongoose schemas (19 models)
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic layer
│   ├── routes/          # API routes
│   ├── middlewares/     # Express middlewares
│   ├── validators/      # Request validation
│   ├── utils/           # Helper functions
│   ├── libs/            # External integrations
│   ├── jobs/            # Background jobs
│   ├── database/        # Seeds and migrations
│   ├── locales/         # i18n translations
│   ├── app.js           # Express app setup
│   └── server.js        # Server entry point
├── uploads/             # Local file uploads
├── logs/                # Application logs
├── .env.example         # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js >= 16.x
- MongoDB >= 5.x
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd backend
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start MongoDB

```bash
# Using local MongoDB
mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

5. Run the application

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## Environment Variables

Key environment variables to configure (see `.env.example` for full list):

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce_digital_goods
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

## API Documentation

### Base URL

```
http://localhost:5000/api/v1
```

### Endpoints Overview

#### Authentication

- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - User logout

#### Users

- `GET /users/profile` - Get current user profile
- `PUT /users/profile` - Update profile
- `GET /users/:id` - Get user by ID (admin)

#### Products

- `GET /products` - List all products
- `GET /products/:id` - Get product details
- `POST /products` - Create product (admin)
- `PUT /products/:id` - Update product (admin)
- `DELETE /products/:id` - Delete product (admin)

#### Orders

- `GET /orders` - List user orders
- `GET /orders/:id` - Get order details
- `POST /orders` - Create new order
- `POST /orders/:id/refund` - Request refund

#### Wallet

- `GET /wallet/balance` - Get wallet balance
- `POST /wallet/deposit` - Deposit funds
- `GET /wallet/transactions` - Transaction history

#### Tickets

- `GET /tickets` - List tickets
- `GET /tickets/:id` - Get ticket details
- `POST /tickets` - Create ticket
- `POST /tickets/:id/messages` - Add message

#### Coupons

- `GET /coupons` - List coupons
- `POST /coupons/validate` - Validate coupon
- `POST /coupons` - Create coupon (admin)

...and more (see full API documentation)

## Database Models

The application includes 19 MongoDB models:

1. **User** - User accounts with roles
2. **Wallet** - User wallets
3. **WalletTransaction** - Wallet transaction history
4. **Product** - Digital products
5. **Order** - Customer orders
6. **OrderItem** - Order line items
7. **Ticket** - Support tickets
8. **TicketMessage** - Ticket conversations
9. **Coupon** - Discount coupons
10. **OrderCoupon** - Applied coupons
11. **Notification** - User notifications
12. **ProductReview** - Product reviews
13. **ShoppingCart** - Shopping carts
14. **CartItem** - Cart items
15. **LoyaltyPoint** - Loyalty points transactions
16. **Language** - Supported languages
17. **ProductTranslation** - Product translations
18. **Recommendation** - Product recommendations
19. **MonitoringLog** - System event logs

## Development

### Code Style

The project follows standard JavaScript/ES6+ conventions with:

- ES6 modules (import/export)
- Async/await for asynchronous operations
- Arrow functions
- Consistent naming conventions

### Adding New Features

1. Create model in `src/models/`
2. Create controller in `src/controllers/`
3. Create service in `src/services/`
4. Create routes in `src/routes/`
5. Add validation in `src/validators/`
6. Register routes in `src/app.js`

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Deployment

### Using PM2 (Production)

```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start src/server.js --name "ecommerce-api"

# Monitor
pm2 monit
```

### Using Docker

```bash
# Build image
docker build -t ecommerce-api .

# Run container
docker run -p 5000:5000 --env-file .env ecommerce-api
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support, email support@ecommerce.com or open an issue on GitHub.

## Authors

- Your Team Name

---

**Note**: This is a backend API project. Make sure to set up proper security measures, environment variables, and monitoring before deploying to production.
