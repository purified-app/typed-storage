# @purified-app/typed-storage

A type-safe wrapper for localStorage and sessionStorage operations.

## Installation

```bash
npm install @purified-app/typed-storage
```

## Quick Start

### Define Your Types

```typescript
type MyStorage = {
  user: { id: number; name: string };
  settings: { theme: "light" | "dark" };
};
```

### TypeScript Usage

```typescript
import { LocalStorageService } from "@purified-app/typed-storage";

const storage = new LocalStorageService<MyStorage>();

// Store data
storage.set("user", { id: 1, name: "John" });

// Retrieve with type safety
const user = storage.get("user"); // { id: number; name: string } | null

// Retrieve with default
const theme = storage.get("settings", { theme: "light" }); // { theme: "light" | "dark" }

// Check existence
if (storage.has("user")) {
  /* ... */
}

// Use sessionStorage
const session = new LocalStorageService<MyStorage>(sessionStorage);
```

### Angular Usage

```typescript
import { Injectable } from "@angular/core";
import { LocalStorageService } from "@purified-app/typed-storage";

@Injectable({ providedIn: "root" })
export class AppStorageService extends LocalStorageService<MyStorage> {
  constructor() {
    super(localStorage);
  }
}

// In components
ngOnInit() {
  const storage = inject(AppStorageService);
  const user = storage.get("user");
  const settings = storage.get("settings", { theme: "light" });
}
```

## API

### Constructor

```typescript
new LocalStorageService<T>(storage?: Storage)
```

### Methods

- `get<K>(key: K): T[K] | null` - Get value
- `get<K>(key: K, defaultValue: T[K]): T[K]` - Get with default
- `set<K>(key: K, value: T[K]): void` - Store value
- `has<K>(key: K): boolean` - Check existence
- `remove<K>(key: K): void` - Remove key
- `clear(): void` - Clear all data

## Features

- ✅ Full TypeScript type safety
- ✅ localStorage & sessionStorage support
- ✅ Default values in get operations
- ✅ Framework agnostic (works with React, Vue, Angular, etc.)
- ✅ Automatic JSON serialization
- ✅ Error handling for invalid data

## License

MIT
