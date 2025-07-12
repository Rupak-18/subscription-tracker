```markdown
# 📦 Subscription Tracker API

A RESTful API for tracking user subscriptions, managing renewals, and sending email reminders — built with **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 Features

- User registration & login with JWT-based authentication
- Role-based access (User / Admin)
- Admin-only user creation
- Subscription CRUD operations
- Auto-calculation of renewal date based on frequency
- Email reminders before renewal (via Upstash Workflows)
- View upcoming renewals within 30 days
- Token blacklist for logout/session invalidation

---

## 🛠️ Tech Stack

- **Node.js** + **Express**  
- **MongoDB** + **Mongoose**  
- **JWT** (Auth)  
- **Upstash Workflows** (Scheduled reminders)  
- **nodemailer** (Email notifications)  
- **dotenv**, **http-errors**, **dayjs**

---

## 🧑‍💻 API Endpoints

### Auth
```

POST   /api/v1/auth/signup       # User signup
POST   /api/v1/auth/login        # User/Admin login
POST   /api/v1/auth/logout       # Invalidate token
POST   /api/v1/auth/forgot       # Request password reset
POST   /api/v1/auth/reset/\:token # Reset password

```

### Users
```

GET    /api/v1/users/\:id         # Get user info (auth required)
PUT    /api/v1/users/\:id         # Update own username/email
DELETE /api/v1/users/\:id         # Delete own account (or admin)
POST   /api/v1/users/            # Admin creates new user

```

### Subscriptions
```

POST   /api/v1/subscriptions/                # Create subscription (auth required)
GET    /api/v1/subscriptions/user/\:id        # Get all subscriptions for a user
GET    /api/v1/subscriptions/\:id             # Get single subscription (auth required)
PUT    /api/v1/subscriptions/\:id             # Update subscription (auth required)
DELETE /api/v1/subscriptions/\:id             # Delete subscription (auth required)
POST   /api/v1/subscriptions/\:id/cancel      # Cancel subscription
GET    /api/v1/subscriptions/upcoming-renewal# Get user's upcoming renewals in 30 days

````

---

## 🔒 Authentication & Authorization

- Users receive a **JWT token** upon login.
- Protected routes require the `Authorization: Bearer <token>` header.
- Admin-only routes are guarded by `requireAdmin` middleware.

---

## 📧 Email Reminders (Upstash Workflow)

The system automatically schedules reminders before subscription renewal:
- 7, 5, 2, and 1 day(s) before renewal
- Only if subscription is still `active`

---

## 🧪 Testing

You can use tools like:

- **HTTPie**
- **Postman**
- **cURL**

Example:
```bash
http POST :5000/api/v1/auth/signup name="Rupak" email="test@example.com" password="secret"
````

---

## ⚙️ Environment Variables

Create a `.env` file with the following:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
SERVER_URL=http://localhost:5000
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

---

## 🧹 Scripts

```bash
npm install      # Install dependencies
npm run dev      # Start dev server with nodemon
npm run start    # Start in production mode
```

---

## 📁 Project Structure

```
src/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── utils/
├── config/
└── index.js
```

---

## 📝 License

MIT

---

> Developed by Rupak Das
> 📧 \[LinkedIn/GitHub or contact info here, optional]

```

---

Let me know if you'd like to add deployment instructions (e.g., for Render, Railway, or Docker) or badges (build, license, etc.) to the top.
```
