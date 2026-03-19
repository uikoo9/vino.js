# Getting Started

## Installation

```bash
npm install vino.js
```

## Quick Start

```js
import { createApp } from 'vino.js';

const app = createApp();

app.get('/', (req, res) => {
  res.json({ message: 'Hello vino.js!' });
});

app.listen(3000);
```

## Features

- **Modular architecture** with plugin system
- **TypeScript-first** with full type support
- **High performance** built on h3 and srvx
- **Simple API** — Express-style routing
