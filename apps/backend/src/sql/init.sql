CREATE TABLE IF NOT EXISTS cards (
    id UUID PRIMARY KEY,
    pokemon_tcg_id VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    set_name VARCHAR(255) NOT NULL,
    set_id VARCHAR(100) NOT NULL,
    number VARCHAR(20) NOT NULL,
    rarity VARCHAR(100) NOT NULL,
    image_url TEXT NOT NULL,
    market_price_usd DECIMAL(10, 2) NOT NULL DEFAULT 0,
    market_price_sgd DECIMAL(10, 2) NOT NULL DEFAULT 0,
    is_art_collection BOOLEAN NOT NULL DEFAULT FALSE,
    art_value DECIMAL(10, 2),
    date_added DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS expenses (
    id UUID PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    category expense_category NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    notes TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
