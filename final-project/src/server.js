const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 設定 MySQL 連接
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // 你的 MySQL 用戶名
  password: '',  // 你的 MySQL 密碼
  database: 'invoice_db',  // 你的數據庫名稱
});

// 確認 MySQL 連接
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + db.threadId);
});

// 儲存項目到數據庫的 API
app.post('/api/save-item', (req, res) => {
  const { name, amount, quantity, total } = req.body;

  const query = 'INSERT INTO items (name, amount, quantity, total) VALUES (?, ?, ?, ?)';
  db.query(query, [name, amount, quantity, total], (err, result) => {
    if (err) {
      console.error('Error saving item:', err);
      return res.status(500).send('Error saving item');
    }
    res.status(200).send({ message: 'Item saved successfully!' });
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
