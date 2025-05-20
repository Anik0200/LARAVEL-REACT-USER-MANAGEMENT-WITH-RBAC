A full-stack admin dashboard built with Laravel API and React.js (CoreUI), featuring authentication, role-based access control (RBAC), user management, and blog management with pagination.


## Features

### Backend (Laravel)
- API authentication using Laravel Sanctum
- Role and Permission management with Spatie Laravel-Permission
- User CRUD with role and permission assignment
- Blog module with server-side pagination
- Protected routes and access control via middleware
- Clean RESTful API structure

### Frontend (React.js with CoreUI)
- Login and authentication using Sanctum tokens
- Role-based route protection and access control
- Dynamic sidebar menu based on user role (via custom helper)

- User management interface:
  - List all users
  - Edit user roles and permissions
  - Delete users with confirmation

- React Hook Form for client-side form validation
- Bootstrap 5 styling for inputs, forms, and pagination
- Real-time role select dropdown with default role pre-selected

### Pagination System
- Server-side pagination from Laravel
- Fully styled pagination component using Bootstrap
- Intelligent pagination behavior after deletion (auto page fallback)

## Technologies Used
- Laravel 10+
- React.js (with CoreUI)
- React Hook Form
- Axios
- Bootstrap 5
- Spatie Laravel-Permission


---

Project Setup & Installation

1. Clone the Repository

git clone https://github.com/Anik0200/LARAVEL-REACT-USER-MANAGEMENT-WITH-RBAC.git


---

2. Backend Setup (Laravel API)

cd backend
composer install
cp .env.example .env (No Need To Change .env File)

php artisan key:generate
php artisan migrate:fresh
php artisan db:seed
php artisan storage:link
php artisan serve


---
3. Frontend Setup (React Admin Panel)

cd dashboard
npm install
npm run start
---

Credentials

Admin
Email: anik@gmail.com
Password: 12345678

