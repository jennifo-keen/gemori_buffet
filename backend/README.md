# Gemori Buffet — Backend

> REST API cho hệ thống nhà hàng buffet gồm 5 web: Khách QR, Customer Portal, Staff, Admin, Bếp.
---

## Tech Stack

 **Node.js**            - Runtime 
 **Express v4**         - HTTP Server / REST API 
 **PostgreSQL** (Neon)  - Database trên cloud 
 **pg** (node-postgres) - Kết nối & query SQL trực tiếp 
 **Socket.IO**          - Realtime (bếp ↔ khách ↔ staff) 
 **JWT**                - Xác thực không trạng thái 
 **bcryptjs**           - Hash mật khẩu 
 **dotenv**             - Quản lý biến môi trường 
 **nodemon**            - Tự reload khi dev 

---

##  Yêu cầu
 Node.js > 18+ 
 npm > 9+ 

---

##  Các bước chạy dự án

### 1.Cài dependencies

```bash
npm install
```

### 2.Tạo file `.env`

Tạo file `.env` ở thư mục gốc:

### 3.Chạy server

```bash
npm run dev

# Production
npm start
```

---

##  Cấu trúc thư mục
```
backend/
├── src/
│   ├── server.js                        # Entry point — khởi tạo Express + Socket.IO
│   ├── lib/
│   │   ├── db.js                     # Kết nối PostgreSQL (Pool)
│   │   └── socket.js                 # Socket.IO instance
│   ├── middlewares/
│   │   ├── auth.middleware.js        # Xác thực JWT
│   │   └── error.middleware.js       # Bắt lỗi tập trung
│   ├── modules/
│   │   ├── auth/                     # Đăng nhập
│   │   ├── tables/                   # Quản lý bàn
│   │   ├── orders/                   # Hóa đơn & món gọi
│   │   ├── customers/                # Tài khoản khách hàng
│   │   ├── vouchers/                 # Mã giảm giá
│   │   ├── payment/                  # Thanh toán
│   │   ├── menu/                     # Món ăn & vé buffet
│   │   └── kitchen/                  # Hệ thống bếp (realtime)
│   └── routes/
│       └── index.js                  # Gom tất cả routes
├── .env                              # Tự tạo 
├── .gitignore
└── package.json
```

> Mỗi module gồm 3 file: `*.service.js` (logic) → `*.controller.js` (nhận request) → `*.route.js` (định nghĩa endpoint)

---

## Socket.IO Events

**Frontend kết nối:**
```javascript
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');
```

**Role:**
| Role | Quyền |
|---|---|
| `admin` | Toàn quyền |
| `staff` | Bàn, order, thanh toán, thành viên |
| `kitchen` | Chỉ xem và cập nhật món bếp |
| `customer` | Thông tin cá nhân và lịch sử của mình |

---
