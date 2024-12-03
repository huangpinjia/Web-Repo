const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // 解析 JSON 格式的請求

// MySQL 資料庫配置
const db = mysql.createConnection({
    host: 'localhost',       // 資料庫伺服器位址
    user: 'root',            // MySQL 使用者名稱（根據你的配置替換）
    password: '294784r3e2w1q',    // MySQL 密碼（根據你的配置替換）
    database: 'invoicedb',   // 資料庫名稱
});

// 建立 MySQL 連線
db.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// 新增購買項目到 items 資料表
app.post('/api/save-item', (req, res) => {
    const { name, amount, quantity } = req.body;

    // 確認前端數據有效
    if (!name || amount === undefined || quantity === undefined) {
        return res.status(400).send({ message: 'Invalid data provided' });
    }

    const total = amount * quantity; // 計算總金額

    const query = `
        INSERT INTO items (name, amount, quantity, total)
        VALUES (?, ?, ?, ?)
    `;

    // 插入資料
    db.query(query, [name, amount, quantity, total], (err, result) => {
        if (err) {
            console.error('Error inserting item:', err);
            return res.status(500).send({ message: 'Error saving item', error: err });
        }
        console.log('Item saved successfully, ID:', result.insertId);
        res.status(200).send({ message: 'Item saved successfully', id: result.insertId });
    });
});

// 測試伺服器健康狀態的路由
app.get('/api/health', (req, res) => {
    res.send({ message: 'Server is running' });
});

// 啟動伺服器
const PORT = 3001; // 伺服器埠號
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
