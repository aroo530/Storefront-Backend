-- ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) NOT NULL,
    status VARCHAR(255) CHECK (
        status IN ('active', 'completed')
    ) DEFAULT 'active'
);