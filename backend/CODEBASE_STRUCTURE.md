# E-commerce Digital Goods Platform - Codebase Structure

## Tổng quan cấu trúc thư mục

```
backend/
├── src/
│   ├── config/                    # Cấu hình ứng dụng
│   │   ├── database.js           # Cấu hình MongoDB/Mongoose
│   │   ├── jwt.js                # Cấu hình JWT
│   │   ├── mailer.js             # Cấu hình email service
│   │   ├── storage.js            # Cấu hình file storage (AWS S3, etc)
│   │   └── index.js              # Export tất cả config
│   │
│   ├── constants/                 # Hằng số và enums
│   │   ├── roles.js              # User roles
│   │   ├── orderStatus.js        # Order statuses
│   │   ├── ticketStatus.js       # Ticket statuses
│   │   ├── transactionTypes.js   # Wallet transaction types
│   │   └── index.js
│   │
│   ├── models/                    # Mongoose schemas/models
│   │   ├── User.js
│   │   ├── Wallet.js
│   │   ├── WalletTransaction.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── OrderItem.js
│   │   ├── Ticket.js
│   │   ├── TicketMessage.js
│   │   ├── Coupon.js
│   │   ├── OrderCoupon.js
│   │   ├── Notification.js
│   │   ├── ProductReview.js
│   │   ├── ShoppingCart.js
│   │   ├── CartItem.js
│   │   ├── LoyaltyPoint.js
│   │   ├── Language.js
│   │   ├── ProductTranslation.js
│   │   ├── Recommendation.js
│   │   ├── MonitoringLog.js
│   │   └── index.js
│   │
│   ├── controllers/               # Request handlers
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── wallet.controller.js
│   │   ├── product.controller.js
│   │   ├── order.controller.js
│   │   ├── ticket.controller.js
│   │   ├── coupon.controller.js
│   │   ├── notification.controller.js
│   │   ├── review.controller.js
│   │   ├── cart.controller.js
│   │   ├── loyalty.controller.js
│   │   ├── language.controller.js
│   │   ├── recommendation.controller.js
│   │   └── index.js
│   │
│   ├── services/                  # Business logic layer
│   │   ├── auth.service.js
│   │   ├── user.service.js
│   │   ├── wallet.service.js
│   │   ├── product.service.js
│   │   ├── order.service.js
│   │   ├── ticket.service.js
│   │   ├── coupon.service.js
│   │   ├── notification.service.js
│   │   ├── review.service.js
│   │   ├── cart.service.js
│   │   ├── loyalty.service.js
│   │   ├── language.service.js
│   │   ├── recommendation.service.js
│   │   ├── email.service.js
│   │   ├── storage.service.js
│   │   ├── payment.service.js
│   │   └── index.js
│   │
│   ├── routes/                    # API routes
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── wallet.routes.js
│   │   ├── product.routes.js
│   │   ├── order.routes.js
│   │   ├── ticket.routes.js
│   │   ├── coupon.routes.js
│   │   ├── notification.routes.js
│   │   ├── review.routes.js
│   │   ├── cart.routes.js
│   │   ├── loyalty.routes.js
│   │   ├── language.routes.js
│   │   ├── recommendation.routes.js
│   │   └── index.js
│   │
│   ├── middlewares/               # Express middlewares
│   │   ├── auth.middleware.js    # JWT authentication
│   │   ├── role.middleware.js    # Role-based authorization
│   │   ├── validation.middleware.js
│   │   ├── errorHandler.middleware.js
│   │   ├── rateLimiter.middleware.js
│   │   ├── logger.middleware.js
│   │   ├── localization.middleware.js
│   │   └── index.js
│   │
│   ├── validators/                # Request validation schemas
│   │   ├── auth.validator.js
│   │   ├── user.validator.js
│   │   ├── product.validator.js
│   │   ├── order.validator.js
│   │   ├── ticket.validator.js
│   │   ├── coupon.validator.js
│   │   ├── review.validator.js
│   │   ├── cart.validator.js
│   │   └── index.js
│   │
│   ├── utils/                     # Utility functions
│   │   ├── response.js           # Standardized API responses
│   │   ├── jwt.js                # JWT helper functions
│   │   ├── hash.js               # Password hashing utilities
│   │   ├── pagination.js         # Pagination helpers
│   │   ├── fileUpload.js         # File upload utilities
│   │   ├── dateHelper.js         # Date formatting utilities
│   │   ├── logger.js             # Winston/Morgan logger setup
│   │   └── index.js
│   │
│   ├── libs/                      # External integrations & custom libraries
│   │   ├── payment/              # Payment gateway integrations
│   │   │   ├── stripe.js
│   │   │   ├── paypal.js
│   │   │   └── vnpay.js
│   │   ├── email/                # Email service integrations
│   │   │   ├── sendgrid.js
│   │   │   └── nodemailer.js
│   │   ├── storage/              # Storage service integrations
│   │   │   ├── s3.js
│   │   │   ├── cloudinary.js
│   │   │   └── local.js
│   │   └── index.js
│   │
│   ├── jobs/                      # Background jobs & cron tasks
│   │   ├── emailQueue.js         # Email queue processing
│   │   ├── orderCleanup.js       # Clean up expired orders
│   │   ├── couponExpiry.js       # Check coupon expiration
│   │   ├── recommendationUpdate.js
│   │   └── index.js
│   │
│   ├── database/                  # Database related files
│   │   ├── seeds/                # Database seeders
│   │   │   ├── users.seed.js
│   │   │   ├── products.seed.js
│   │   │   ├── languages.seed.js
│   │   │   └── index.js
│   │   └── migrations/           # Migration scripts (if needed)
│   │
│   ├── locales/                   # I18n translation files
│   │   ├── en.json
│   │   ├── vi.json
│   │   └── index.js
│   │
│   ├── docs/                      # API documentation
│   │   ├── swagger.json          # Swagger/OpenAPI spec
│   │   └── postman/              # Postman collections
│   │
│   ├── tests/                     # Test files
│   │   ├── unit/
│   │   │   ├── services/
│   │   │   └── utils/
│   │   ├── integration/
│   │   │   ├── auth.test.js
│   │   │   ├── product.test.js
│   │   │   └── order.test.js
│   │   └── setup.js
│   │
│   ├── app.js                     # Express app setup
│   └── server.js                  # Server entry point
│
├── uploads/                       # Local uploaded files (if not using cloud)
│   └── .gitkeep
│
├── logs/                          # Application logs
│   └── .gitkeep
│
├── .env                           # Environment variables
├── .env.example                   # Environment variables template
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Chi tiết các modules chính

### 1. Authentication & Authorization

- **auth.controller.js**: Login, register, refresh token, logout
- **auth.service.js**: JWT generation, password verification
- **auth.middleware.js**: Verify JWT, extract user from token

### 2. User Management

- **user.controller.js**: CRUD users, profile management
- **user.service.js**: User business logic
- **User.js**: User model with roles (customer, staff, admin)

### 3. Wallet System

- **wallet.controller.js**: View balance, transaction history
- **wallet.service.js**: Deposit, withdraw, refund logic
- **WalletTransaction.js**: Transaction records

### 4. Product Management

- **product.controller.js**: CRUD products, search, filter
- **product.service.js**: Product business logic, file management
- **ProductTranslation.js**: Multi-language support

### 5. Order Management

- **order.controller.js**: Create order, payment, delivery
- **order.service.js**: Order processing, status management
- **OrderItem.js**: Order line items

### 6. Ticket/Support System

- **ticket.controller.js**: Create ticket, reply, assign staff
- **ticket.service.js**: Ticket management logic
- **TicketMessage.js**: Conversation history

### 7. Coupon System

- **coupon.controller.js**: Create, validate, apply coupons
- **coupon.service.js**: Discount calculation logic

### 8. Review System

- **review.controller.js**: Add review, moderate reviews
- **review.service.js**: Review validation, rating calculation

### 9. Shopping Cart

- **cart.controller.js**: Add/remove items, update quantity
- **cart.service.js**: Cart management logic

### 10. Loyalty Points

- **loyalty.controller.js**: View points, redeem
- **loyalty.service.js**: Points calculation, earn/redeem logic

### 11. Notification System

- **notification.controller.js**: Get notifications, mark as read
- **notification.service.js**: Create and send notifications

### 12. Recommendation System

- **recommendation.controller.js**: Get recommended products
- **recommendation.service.js**: Recommendation algorithm

## API Routes Structure

```
/api/v1
├── /auth
│   ├── POST /register
│   ├── POST /login
│   ├── POST /refresh
│   └── POST /logout
│
├── /users
│   ├── GET /profile
│   ├── PUT /profile
│   └── GET /:id (admin only)
│
├── /wallet
│   ├── GET /balance
│   ├── POST /deposit
│   └── GET /transactions
│
├── /products
│   ├── GET /
│   ├── GET /:id
│   ├── POST / (admin)
│   ├── PUT /:id (admin)
│   └── DELETE /:id (admin)
│
├── /orders
│   ├── GET /
│   ├── GET /:id
│   ├── POST /
│   └── POST /:id/refund
│
├── /tickets
│   ├── GET /
│   ├── GET /:id
│   ├── POST /
│   └── POST /:id/messages
│
├── /coupons
│   ├── GET /
│   ├── POST /validate
│   └── POST / (admin)
│
├── /reviews
│   ├── GET /products/:productId
│   └── POST /
│
├── /cart
│   ├── GET /
│   ├── POST /items
│   ├── PUT /items/:id
│   └── DELETE /items/:id
│
├── /loyalty
│   ├── GET /points
│   └── POST /redeem
│
├── /notifications
│   ├── GET /
│   └── PUT /:id/read
│
└── /recommendations
    └── GET /
```

## Naming Conventions

### Files

- **Models**: PascalCase (User.js, ProductReview.js)
- **Controllers**: camelCase with .controller.js (auth.controller.js)
- **Services**: camelCase with .service.js (email.service.js)
- **Routes**: camelCase with .routes.js (product.routes.js)
- **Middlewares**: camelCase with .middleware.js (auth.middleware.js)

### Code

- **Variables & Functions**: camelCase (getUserById, totalAmount)
- **Classes**: PascalCase (UserService, OrderController)
- **Constants**: UPPER_SNAKE_CASE (MAX_LOGIN_ATTEMPTS, JWT_SECRET)
- **Database fields**: snake_case (created_at, user_id)

## Best Practices

1. **Separation of Concerns**: Controllers handle requests, Services contain business logic, Models define data structure
2. **DRY Principle**: Reusable utilities in utils/ and libs/
3. **Error Handling**: Centralized error handling middleware
4. **Validation**: Input validation using validators before processing
5. **Security**: JWT authentication, role-based authorization, rate limiting
6. **Logging**: Comprehensive logging for debugging and monitoring
7. **Testing**: Unit tests for services, integration tests for APIs
8. **Documentation**: Swagger/OpenAPI documentation for all endpoints

## Environment Variables

```env
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/ecommerce

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_EXPIRES_IN=30d

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password

# Storage
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET_NAME=
AWS_REGION=

# Payment
STRIPE_SECRET_KEY=
PAYPAL_CLIENT_ID=
VNPAY_TMN_CODE=
VNPAY_HASH_SECRET=

# Other
FRONTEND_URL=http://localhost:3000
MAX_FILE_SIZE=10485760
```
