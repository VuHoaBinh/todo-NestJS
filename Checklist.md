✅ Checklist – Mục tiêu hoàn thành
🧩 PHẦN 1: BÀI TẬP CƠ BẢN (BẮT BUỘC)
📦 Chức năng & Kiến trúc
[ ] Tạo API NestJS cơ bản sử dụng module, controller, service
[ ] Áp dụng mô hình DDD với 4 tầng:
[ ] domain/: Entity User
[ ] application/: Service xử lý logic nghiệp vụ
[ ] infrastructure/: Repository tương tác Cassandra
[ ] interfaces/: Controller và DTO
📡 API Endpoint
[ ] POST /users – Tạo user mới
[ ] GET /users/:id – Lấy thông tin user
[ ] PUT /users/:id – Cập nhật user
🧱 Middleware & Logging
[ ] Viết middleware log request method + URL
🛡 Validation
[ ] Dùng class-validator trong DTO (CreateUserDto, UpdateUserDto)
📄 README & Cấu hình chạy
[ ] Có file README.md hướng dẫn cài đặt và chạy
[ ] Chạy được bằng npm run start:dev
🌟 PHẦN 2: BÀI TẬP NÂNG CAO (TÙY CHỌN – CỘNG ĐIỂM)
Chọn ít nhất 1 phần dưới đây để thể hiện khả năng mở rộng hệ thống

🚀 Caching
[ ] Cache kết quả GET /users/:id
[ ] Invalidate cache sau PUT /users/:id
🧾 Logging nâng cao
[ ] Log dạng JSON: timestamp, IP, user-agent, endpoint
[ ] Ghi log vào file hoặc console có định dạng rõ ràng
🧯 Exception Handling
[ ] Viết global exception filter
[ ] Xử lý lỗi ID không tồn tại hoặc lỗi kết nối Cassandra
🧪 Testing
[ ] Viết unit test cho controller hoặc service
