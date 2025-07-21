
---

```md
# 📦 Subscription Tracker API

A RESTful API built with Node.js, Express, and MongoDB for managing user subscriptions and sending automated renewal reminders via email.

## 🚀 Features

- 🔐 JWT-based user authentication
- 👤 Role-based access control (`user`, `admin`)
- 📅 Subscription tracking with renewal dates
- 📬 Email reminders (1, 2, 5, 7 days before renewal)
- 🛠️ Admin-only user management
- ⚡ Workflow automation via Upstash
- 🧠 Arcjet integration for security

---

## 🧱 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT + Token Blacklisting
- **Emails**: Nodemailer
- **Workflows**: Upstash Workflows
- **Security**: Arcjet Middleware

---

## 📂 Project Structure

```

📦 subscription-tracker-api
├── app.js
├── config/
│   ├── arcjet.js
│   ├── env.js
│   ├── nodemailer.js
│   └── upstash.js
├── controllers/
│   ├── auth.controller.js
│   ├── subscription.controller.js
│   ├── user.controller.js
│   └── workflow\.controller.js
├── database/
│   └── mongodb.js
├── middlewares/
│   ├── admin.middleware.js
│   ├── arcjet.middleware.js
│   ├── auth.middleware.js
│   └── error.middleware.js
├── models/
│   ├── subscription.model.js
│   ├── tokenBlacklist.model.js
│   └── user.model.js
├── routes/
│   ├── auth.routes.js
│   ├── subscription.routes.js
│   ├── user.routes.js
│   └── workflow\.routes.js
├── utils/
│   ├── email-template.js
│   └── send-email.js
└── .env

````

---

## 📌 API Endpoints

### 🧑 Auth
- `POST /api/v1/auth/sign-up` – Register user
- `POST /api/v1/auth/sign-in` – Login and get token
- `POST /api/v1/auth/sign-out` – Invalidate token

### 👤 Users
- `GET /api/v1/users/` – (admin) List users
- `GET /api/v1/users/:id` – Get user by ID
- `POST /api/v1/users/` – (admin) Create user
- `PUT /api/v1/users/:id` – Update user
- `DELETE /api/v1/users/:id` – Delete user

### 💳 Subscriptions
- `GET /api/v1/subscriptions/` – All subscriptions
- `GET /api/v1/subscriptions/user/:id` – By user
- `GET /api/v1/subscriptions/upcoming-renewal` – Nearing renewal
- `POST /api/v1/subscriptions/` – Create subscription
- `PUT /api/v1/subscriptions/:id` – Update subscription
- `POST /api/v1/subscriptions/:id/cancel` – Cancel subscription
- `DELETE /api/v1/subscriptions/:id` – Delete subscription

### 🔁 Workflow
- `POST /api/v1/workflows/subscription/reminder` – Start reminder schedule

---

## 🛠️ Setup Instructions

1. **Clone & Install**
   ```bash
   git clone https://github.com/your-username/subscription-tracker-api.git
   cd subscription-tracker-api
   npm install
````

2. **Configure `.env`**

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   SMTP_HOST=smtp.example.com
   SMTP_PORT=587
   SMTP_USER=your_email_user
   SMTP_PASS=your_email_password
   ```

3. **Start the server**

   ```bash
   npm run dev
   ```

---

## 📚 Documentation

Explore the full API reference and examples:
👉 [https://documenter.getpostman.com/view/46910907/2sB34kEyvy#0a79acd6-6af1-4c46-9c35-53b43edeed97]

---

## 🧠 Notes

* `renewalDate` is auto-generated based on `frequency` if not provided.
* Workflows check and send reminders 7, 5, 2, and 1 day(s) before expiration.
* Arcjet middleware provides real-time request security.

---

## 🧑‍💻 Author

Developed by **Rupak Das**

---

## 📄 License

This project is licensed under the MIT License.

```
