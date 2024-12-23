# @arindexer: Arweave Indexer

## 🚀 Overview

Arweave Indexer (arindexer) is a lightweight, powerful utility for querying and indexing data on the Arweave network. Designed for Web3 developers, it simplifies data management and discovery in decentralized applications.

## 🌐 Key Features

- 🔍 **Effortless Querying**: Search and retrieve projects instantly
- 📤 **Simple Indexing**: Easily index your project data
- 🔗 **Integration**: Built for the Arweave Open ecosystem
- 🛡️ **TypeScript Support**: Full type declarations for enhanced developer experience
- 🚀 **ARLINK Deployment**: Automatic indexing for projects deployed on ARLINK

## 💾 Installation

```bash
npm install arweave-indexer
```

## 🛠️ Usage

### Querying Data

```typescript
import { query } from 'arweave-indexer';

async function searchProjects() {
  const results = await query('web3');
  console.log(results);
}
```

### Indexing Data

```typescript
import { index } from 'arweave-indexer';

async function indexProject() {
  const result = await index(
    JSON.stringify({
      title: 'My Web3 Project',
      description: 'An awesome decentralized project'
    }),
    window.arweaveWallet
  );
  console.log(result);
}
```

### Advanced Querying

```typescript
const results = await query('web3', {
  process: 'custom-process-id',
  tags: [{ name: 'Category', value: 'Blockchain' }]
});
```

## 📝 API Reference

### `query(searchTerm: string, options?: IndexerOptions)`
- Performs a dry run query on the AO network
- Returns an array of projects or `null`

### `index(data: string, wallet: any, options?: IndexerOptions)`
- Sends an indexing message to the AO network
- Returns the message result or `null`

## 🧩 Types

```typescript
interface Project {
  title: string;
  link: string;
  description: string;
  twitter?: string;
}

interface IndexerOptions {
  process?: string;
  tags?: { name: string; value: string }[];
}
```

## 🌍 Ecosystem

- **Hagrid**: Search and browse AR ecosystem projects
  - URL: hagrid_arlink.arweave.net
- **ARLINK**: Deployment service with automatic indexing
- **AR Indexer Website**: ar-indexer_arlink.arweave.net

## 🔗 Links

- **NPM Package**: https://www.npmjs.com/package/arweave-indexer
- **Protocol Land Repository**: https://protocol.land/#/repository/5a58a42b-55c9-4ce4-a5f9-cc3546d2f887

## 📦 Package Stats

- **Version**: 1.1.0
- **Weekly Downloads**: 100+
- **License**: MIT

## 🤝 Contributing

Contributions are welcome! Please check the GitHub repository for guidelines.

## 📄 License

MIT License
