# Auth & User API Endpoints Documentation

## Base URL

```
http://localhost:5000/api/v1
```

---

## Authentication Endpoints

### 1. Register User

**POST** `/auth/register`

Register a new user account and create associated wallet.

**Access**: Public

**Request Body**:

```json
{
  "email": "user@example.com",
  "password": "password123",
  "display_name": "John Doe"
}
```

**Validation**:

- `email`: Required, valid email format
- `password`: Required, minimum 6 characters
- `display_name`: Required, 2-100 characters

**Success Response** (201):

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "6543210abcdef...",
      "email": "user@example.com",
      "display_name": "John Doe",
      "role": "customer",
      "wallet_id": "wallet_id...",
      "created_at": "2024-02-09T...",
      "updated_at": "2024-02-09T..."
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response** (400):

```json
{
  "success": false,
  "message": "Email already exists",
  "errors": null
}
```

---

### 2. Login User

**POST** `/auth/login`

Login with email and password.

**Access**: Public

**Request Body**:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response** (200):

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "6543210abcdef...",
      "email": "user@example.com",
      "display_name": "John Doe",
      "role": "customer",
      "wallet_id": "wallet_id...",
      "created_at": "2024-02-09T...",
      "updated_at": "2024-02-09T..."
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response** (401):

```json
{
  "success": false,
  "message": "Invalid email or password",
  "errors": null
}
```

---

### 3. Refresh Access Token

**POST** `/auth/refresh`

Get new access token using refresh token.

**Access**: Public

**Request Body**:

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response** (200):

```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 4. Logout

**POST** `/auth/logout`

Logout user (client should remove tokens).

**Access**: Private

**Headers**:

```
Authorization: Bearer <accessToken>
```

**Success Response** (200):

```json
{
  "success": true,
  "message": "Logout successful",
  "data": null
}
```

---

### 5. Get Current User

**GET** `/auth/me`

Get currently authenticated user information.

**Access**: Private

**Headers**:

```
Authorization: Bearer <accessToken>
```

**Success Response** (200):

```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "user": {
      "_id": "6543210abcdef...",
      "email": "user@example.com",
      "display_name": "John Doe",
      "role": "customer",
      "wallet_id": "wallet_id...",
      "created_at": "2024-02-09T...",
      "updated_at": "2024-02-09T..."
    }
  }
}
```

---

## User Endpoints

### 1. Get User Profile

**GET** `/users/profile`

Get current user profile with wallet information.

**Access**: Private

**Headers**:

```
Authorization: Bearer <accessToken>
```

**Success Response** (200):

```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "user": {
      "_id": "6543210abcdef...",
      "email": "user@example.com",
      "display_name": "John Doe",
      "role": "customer",
      "wallet_id": {
        "_id": "wallet_id...",
        "balance": "100.50"
      },
      "created_at": "2024-02-09T...",
      "updated_at": "2024-02-09T..."
    }
  }
}
```

---

### 2. Update User Profile

**PUT** `/users/profile`

Update current user profile.

**Access**: Private

**Headers**:

```
Authorization: Bearer <accessToken>
```

**Request Body**:

```json
{
  "display_name": "Jane Doe",
  "email": "newemail@example.com"
}
```

**Note**: At least one field must be provided.

**Success Response** (200):

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "_id": "6543210abcdef...",
      "email": "newemail@example.com",
      "display_name": "Jane Doe",
      "role": "customer",
      "wallet_id": {
        "_id": "wallet_id...",
        "balance": "100.50"
      },
      "created_at": "2024-02-09T...",
      "updated_at": "2024-02-09T..."
    }
  }
}
```

---

### 3. Change Password

**PUT** `/users/change-password`

Change user password.

**Access**: Private

**Headers**:

```
Authorization: Bearer <accessToken>
```

**Request Body**:

```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword456",
  "confirmPassword": "newpassword456"
}
```

**Validation**:

- `newPassword` must be different from `currentPassword`
- `confirmPassword` must match `newPassword`
- `newPassword` minimum 6 characters

**Success Response** (200):

```json
{
  "success": true,
  "message": "Password changed successfully",
  "data": null
}
```

---

## Admin Endpoints

### 1. Get All Users

**GET** `/users?page=1&limit=10&role=customer&search=john`

Get all users with pagination and filters.

**Access**: Private/Admin

**Headers**:

```
Authorization: Bearer <accessToken>
```

**Query Parameters**:

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)
- `role` (optional): Filter by role (customer, staff, admin)
- `search` (optional): Search by email or display name

**Success Response** (200):

```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "_id": "user1_id...",
      "email": "user1@example.com",
      "display_name": "User One",
      "role": "customer",
      "wallet_id": {
        "_id": "wallet1_id...",
        "balance": "50.00"
      },
      "created_at": "2024-02-09T...",
      "updated_at": "2024-02-09T..."
    },
    {
      "_id": "user2_id...",
      "email": "user2@example.com",
      "display_name": "User Two",
      "role": "staff",
      "wallet_id": {
        "_id": "wallet2_id...",
        "balance": "0.00"
      },
      "created_at": "2024-02-08T...",
      "updated_at": "2024-02-08T..."
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

### 2. Get User By ID

**GET** `/users/:id`

Get specific user by ID.

**Access**: Private/Admin

**Headers**:

```
Authorization: Bearer <accessToken>
```

**Success Response** (200):

```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "user": {
      "_id": "6543210abcdef...",
      "email": "user@example.com",
      "display_name": "John Doe",
      "role": "customer",
      "wallet_id": {
        "_id": "wallet_id...",
        "balance": "100.50"
      },
      "created_at": "2024-02-09T...",
      "updated_at": "2024-02-09T..."
    }
  }
}
```

---

### 3. Update User Role

**PUT** `/users/:id/role`

Update user role.

**Access**: Private/Admin

**Headers**:

```
Authorization: Bearer <accessToken>
```

**Request Body**:

```json
{
  "role": "staff"
}
```

**Allowed roles**: `customer`, `staff`, `admin`

**Success Response** (200):

```json
{
  "success": true,
  "message": "User role updated successfully",
  "data": {
    "user": {
      "_id": "6543210abcdef...",
      "email": "user@example.com",
      "display_name": "John Doe",
      "role": "staff",
      "wallet_id": {
        "_id": "wallet_id...",
        "balance": "100.50"
      },
      "created_at": "2024-02-09T...",
      "updated_at": "2024-02-09T..."
    }
  }
}
```

---

### 4. Delete User

**DELETE** `/users/:id`

Delete a user and their associated wallet.

**Access**: Private/Admin

**Headers**:

```
Authorization: Bearer <accessToken>
```

**Note**: Admin cannot delete their own account.

**Success Response** (200):

```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": null
}
```

---

## Error Responses

### Validation Error (400)

```json
{
  "success": false,
  "message": "Validation error",
  "errors": ["Email is required", "Password must be at least 6 characters long"]
}
```

### Unauthorized (401)

```json
{
  "success": false,
  "message": "No token provided",
  "errors": null
}
```

### Forbidden (403)

```json
{
  "success": false,
  "message": "Insufficient permissions",
  "errors": null
}
```

### Not Found (404)

```json
{
  "success": false,
  "message": "User not found",
  "errors": null
}
```

---

## Testing with cURL

### Register

```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "display_name": "Test User"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Profile (with token)

```bash
curl -X GET http://localhost:5000/api/v1/users/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Update Profile

```bash
curl -X PUT http://localhost:5000/api/v1/users/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "display_name": "Updated Name"
  }'
```
