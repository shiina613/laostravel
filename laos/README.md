# Laos Travel Application

Hệ thống web du lịch Laos với kiến trúc frontend và backend tách riêm.

## Công nghệ sử dụng

### Backend
- Spring Boot 3.5.11
- Spring Security
- JWT Authentication
- BCrypt Password Encoding
- MySQL Database
- JPA/Hibernate

### Frontend
- React 18
- React Router v6
- Tailwind CSS
- Axios

## Cấu trúc dự án

```
laos/
├── src/main/java/com/traveller/laos/
│   ├── entity/              # JPA Entities
│   ├── repository/          # Spring Data Repositories
│   ├── service/             # Business Logic
│   ├── controller/          # REST Controllers
│   ├── dto/                 # Data Transfer Objects
│   ├── config/              # Configuration Classes
│   └── security/            # Security Components
├── src/main/resources/
│   └── application.properties
└── frontend/
    ├── src/
    │   ├── pages/           # React Pages
    │   ├── components/      # React Components
    │   ├── context/         # React Context
    │   ├── services/        # API Services
    │   └── App.js
    └── package.json
```

## Cài đặt

### Backend

1. Cài đặt MySQL và tạo database:
```sql
CREATE DATABASE laostravel;
```

2. Cập nhật `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/laostravel
spring.datasource.username=root
spring.datasource.password=123456
```

3. Chạy ứng dụng Spring Boot:
```bash
mvn spring-boot:run
```

Backend sẽ chạy trên `http://localhost:8080`

### Frontend

1. Cài đặt dependencies:
```bash
cd frontend
npm install
```

2. Chạy ứng dụng React:
```bash
npm start
```

Frontend sẽ chạy trên `http://localhost:3000`

## Tính năng

### Authentication
- Đăng ký người dùng mới
- Đăng nhập với username/email
- JWT Token (3 giờ hết hạn)
- BCrypt password hashing

### Phân quyền
- **USER**: Truy cập homepage
- **ADMIN**: Truy cập admin dashboard

### API Endpoints

#### Public
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập

#### User (Cần authentication)
- `GET /api/user/profile` - Lấy thông tin profile

#### Admin (Cần ADMIN role)
- `GET /api/admin/dashboard` - Admin dashboard

## Luồng hoạt động

### Đăng ký
1. Người dùng nhập username, email, password, full name
2. Frontend gửi POST request tới `/api/auth/register`
3. Backend kiểm tra username/email tồn tại
4. Hash password bằng BCrypt
5. Lưu user vào database với role mặc định là USER
6. Trả về thông báo thành công

### Đăng nhập
1. Người dùng nhập username/email và password
2. Frontend gửi POST request tới `/api/auth/login`
3. Backend tìm user và so sánh password
4. Tạo JWT token (chứa username, role, expiration)
5. Trả về token, username, role
6. Frontend lưu token vào localStorage
7. Điều hướng theo role:
   - USER → Homepage
   - ADMIN → Admin Dashboard

### Xác thực Request
1. Frontend gửi token trong header: `Authorization: Bearer <token>`
2. JwtFilter đọc token từ header
3. Kiểm tra chữ ký và thời gian hết hạn
4. Lấy username và role từ token
5. Đặt thông tin vào SecurityContext
6. Cho phép request tiếp tục

## Bảo mật

- Mật khẩu được hash bằng BCrypt
- JWT token có thời gian hết hạn 3 giờ
- Backend kiểm tra JWT trong mỗi request
- Chỉ ADMIN mới được truy cập `/api/admin/**`
- CORS được cấu hình cho frontend

## Tài khoản test

Sau khi chạy ứng dụng, bạn có thể:
1. Đăng ký tài khoản mới
2. Hoặc tạo tài khoản admin trực tiếp trong database

```sql
-- Tạo admin user (password: admin123 - đã hash)
INSERT INTO users (username, email, password, full_name, role_id, created_at, status)
VALUES ('admin', 'admin@example.com', '$2a$10$...', 'Administrator', 2, NOW(), 'ACTIVE');
```

## Phát triển tiếp theo

- [ ] CRUD Destinations
- [ ] CRUD Articles
- [ ] CRUD Festivals
- [ ] CRUD Categories
- [ ] Upload hình ảnh
- [ ] Search và filter
- [ ] Pagination
- [ ] User profile management
- [ ] Email verification
- [ ] Password reset
