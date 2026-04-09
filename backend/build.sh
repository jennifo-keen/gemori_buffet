#!/usr/bin/env bash
# Thoát ngay nếu có lỗi
set -o errexit

# 1. Cài đặt các thư viện Node.js
npm install

# 2. Cài đặt các thư viện Python
# Render đã có sẵn pip cho môi trường Linux
pip install -r requirements.txt