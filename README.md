# Dern-Support (Under Development)

A Laravel-based web application for managing a product database with full CRUD functionality. This project is still in development and will be updated continuously.

## 🚧 Project Status

**This project is currently under active development.**  
Core CRUD features are being implemented using Laravel and MySQL. Future updates may include user authentication, advanced validation, search functionality, and API integration.

## 📌 Features (Planned & In Progress)

- [x] Add new product
- [x] Edit product details
- [x] Delete product
- [x] View list of products
- [ ] Search and filter
- [ ] Authentication system
- [ ] Responsive UI improvements

## 🛠️ Built With

- Laravel (PHP Framework)
- MySQL
- Blade Templating
- Bootstrap (or any frontend framework you choose)

## 🧰 Getting Started

> **Note:** This guide assumes basic knowledge of Laravel and PHP development.

### Prerequisites

- PHP 8.1+
- Composer
- MySQL
- Node.js & npm (for compiling frontend assets)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Yousef5025/Dern-Support.git
   cd Dern-Support
Install dependencies:

bash
Copy
Edit
composer install
npm install && npm run dev
Set up the environment:

bash
Copy
Edit
cp .env.example .env
php artisan key:generate
Configure the database:

Create a MySQL database (e.g., we-db) and update your .env:

ini
Copy
Edit
DB_DATABASE=we-db
DB_USERNAME=your_username
DB_PASSWORD=your_password
Run migrations:

bash
Copy
Edit
php artisan migrate
Serve the application:

bash
Copy
Edit
php artisan serve
Then visit: http://127.0.0.1:8000

🔧 Project Structure
Typical Laravel MVC structure, with routes defined in routes/web.php and views under resources/views/products.

📄 License
This project is licensed under the MIT License.

🙋‍♂️ Contributions
Pull requests and suggestions are welcome. This is a learning-focused project and feedback is appreciated!
