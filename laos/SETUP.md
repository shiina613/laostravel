# Hướng dẫn cài đặt và chạy ứng dụng (Windows)

## Yêu cầu hệ thống
- Java 17+
- Node.js 16+
- MySQL 8.0+
- Maven 3.6+

## Bước 1: Cài đặt MySQL

1. Tải MySQL từ https://dev.mysql.com/downloads/mysql/
2. Cài đặt với default settings
3. Mở MySQL Command Line Client hoặc MySQL Workbench
4. Tạo database:
```sql
CREATE DATABASE laostravel;
```

## Bước 2: Chạy Backend

1. Mở Command Prompt
2. Điều hướng tới thư mục project:
```cmd
cd C:\path\to\laos
```

3. Chạy lệnh:
```cmd
mvn spring-boot:run
```

Backend sẽ chạy tại `http://localhost:8080`

## Bước 3: Chạy Frontend

1. Mở Command Prompt mới
2. Điều hướng tới thư mục frontend:
```cmd
cd C:\path\to\laos\frontend
```

3. Cài đặt dependencies (lần đầu):
```cmd
npm install
```

4. Chạy ứng dụng:
```cmd
npm start
```

Frontend sẽ mở tại `http://localhost:3000`

## Bước 4: Test ứng dụng

### Đăng ký tài khoản
- Truy cập `http://localhost:3000/register`
- Nhập thông tin và click Register

### Đăng nhập
- Truy cập `http://localhost:3000/login`
- Nhập username/password và click Login
- USER sẽ vào homepage
- ADMIN sẽ vào admin dashboard

### Tạo tài khoản Admin
Chạy lệnh SQL trong MySQL:
```sql
INSERT INTO users (username, email, password, full_name, role_id, created_at, status)
VALUES ('admin', 'admin@example.com', '$2a$10$slYQmyNdGzin7olVN3p5be4DkH0/rJ3Q8Hs5w.UfREP4nzpF2PJOK', 'Administrator', 2, NOW(), 'ACTIVE');
```

Đăng nhập với:
- Username: admin
- Password: admin123
