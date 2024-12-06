# Arweave Indexer

A lightweight utility for querying and indexing data on the AO network.

## Installation

```bash
npm install arweave-indexer
```

## Usage

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

### Advanced Usage

```typescript
// Custom process and tags
const results = await query('web3', {
  process: 'custom-process-id',
  tags: [{ name: 'Category', value: 'Blockchain' }]
});
```

## API

### `query(searchTerm: string, options?: IndexerOptions)`
- Performs a dry run query on the AO network
- Returns an array of projects or null

### `index(data: string, wallet: any, options?: IndexerOptions)`
- Sends an indexing message to the AO network
- Returns the message result or null

## Types

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

## License

MIT