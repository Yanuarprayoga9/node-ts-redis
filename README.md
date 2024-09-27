![alt text](img/image.png)
RUN REDIS CONTAINER
``` sh 
    docker-compose up -d
```
INSTALLING PACKAGE 
``` sh 
    npm i 
```
RUNNING APP 
``` sh 
    npm run dev
```

# Belajar Redis

## Instalasi

### Metode
- **Docker**: Menggunakan Docker untuk menjalankan Redis dengan mudah.
- **Unduh Langsung**: Mengunduh Redis dari situs resmi dan menginstalnya di komputer.

##  Menggunakan Redis CLI

### Perintah Dasar
- **SET**
  SET key "Hello, Redis!"
- **GET**
  GET key
- **DEL**
  DEL key
- **KEYS**
  KEYS *
# Struktur Data Redis

### 1. Strings
- Deskripsi: Struktur data paling sederhana, dapat menyimpan teks, angka, atau binary.
- Contoh:
  - **Create**: 
    ```bash
    SET name "Redis"
    ```
  - **Read**: 
    ```bash
    GET name
    ```
  - **Update**: 
    ```bash
    SET name "Updated Redis"
    ```
  - **Delete**: 
    ```bash
    DEL name
    ```

### 2. Hashes
- Deskripsi: Koleksi pasangan kunci-nilai, ideal untuk menyimpan objek.
- Contoh:
  - **Create**: 
    ```bash
    HSET user:1000 name "Alice" age 30
    ```
  - **Read**: 
    ```bash
    HGET user:1000 name
    ```
  - **Update**: 
    ```bash
    HSET user:1000 age 31
    ```
  - **Delete**: 
    ```bash
    HDEL user:1000 age
    ```

### 3. Lists
- Deskripsi: Daftar terurut dari string, cocok untuk antrian.
- Contoh:
  - **Create**: 
    ```bash
    LPUSH tasks "Task 1"
    RPUSH tasks "Task 2"
    ```
  - **Read**: 
    ```bash
    LRANGE tasks 0 -1
    ```
  - **Update**: 
    ```bash
    LSET tasks 0 "Updated Task 1"
    ```
  - **Delete**: 
    ```bash
    LREM tasks 1 "Task 1"
    ```

### 4. Sets
- Deskripsi: Kumpulan string unik, cocok untuk menghindari duplikasi.
- Contoh:
  - **Create**: 
    ```bash
    SADD unique_numbers 1 2 3
    ```
  - **Read**: 
    ```bash
    SMEMBERS unique_numbers
    ```
  - **Update**: 
    // Sets tidak memiliki update langsung, tetapi bisa dihapus dan ditambahkan kembali
    ```bash
    SREM unique_numbers 1
    SADD unique_numbers 1
    ```
  - **Delete**: 
    ```bash
    SREM unique_numbers 2
    ```

### 5. Sorted Sets
- Deskripsi: Mirip dengan sets, tetapi setiap anggota memiliki skor yang menentukan urutan.
- Contoh:
  - **Create**: 
    ```bash
    ZADD leaderboard 100 "Alice"
    ```
  - **Read**: 
    ```bash
    ZRANGE leaderboard 0 -1 WITHSCORES
    ```
  - **Update**: 
    ```bash
    ZADD leaderboard 150 "Alice" // Update skor Alice
    ```
  - **Delete**: 
    ```bash
    ZREM leaderboard "Alice"
    ```

### 6. Bitmaps
- Deskripsi: Struktur untuk menyimpan data bit, digunakan untuk menghitung dan melacak.
- Contoh:
  - **Create**: 
    ```bash
    SETBIT user:1000:login 0 1
    ```
  - **Read**: 
    ```bash
    GETBIT user:1000:login 0
    ```
  - **Update**: 
    ```bash
    SETBIT user:1000:login 0 0
    ```
  - **Delete**: 
    ```bash
    SETBIT user:1000:login 0 0
    ```

### 7. HyperLogLogs
- Deskripsi: Struktur data probabilistik untuk menghitung estimasi jumlah unik.
- Contoh:
  - **Create**: 
    ```bash
    PFADD page_views "user1" "user2"
    ```
  - **Read**: 
    ```bash
    PFCOUNT page_views
    ```
  - **Update**: 
    // HyperLogLogs tidak memiliki update langsung, tetapi dapat menambah pengguna baru
    ```b
### Hashes
- Deskripsi: Tipe data yang memungkinkan Anda menyimpan koleksi pasangan kunci-nilai, ideal untuk menyimpan objek dengan beberapa atribut.
- Contoh:
  - **Create**: 
    ```bash
    HSET product:1001 name "Laptop" brand "BrandX" price 1500 stock 50
    ```
  - **Read**: 
    - Mendapatkan nilai untuk kunci tertentu:
      ```bash
      HGET product:1001 name
      ```
    - Mendapatkan semua pasangan kunci-nilai:
      ```bash
      HGETALL product:1001
      ```
  - **Update**: 
    ```bash
    HSET product:1001 price 1400
    ```
  - **Delete**: 
    ```bash
    HDEL product:1001 stock
    ```

