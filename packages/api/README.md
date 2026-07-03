# @gymai/api

API client, DTOs, Zod schemas, and DTO→domain mappers. The only package allowed to call `fetch()` against the production API — see `AGENTS.md` in this directory.

```ts
import { createHttpClient, createGeneratePlanEndpoint } from "@gymai/api";

const client = createHttpClient({ baseUrl: apiUrl, getAuthToken });
const generatePlan = createGeneratePlanEndpoint(client);

const plan = await generatePlan({ equipmentMode: "text", equipmentText: "dumbbells, bench", time: 30, focus: null, goal: null, level: null }, userId);
```

Currently implements the `generatePlan` endpoint only, matching what `apps/web-demo/server.js` already exposes. Extend as the production API grows (see `docs/01-product/prd/gymai-coach-prd.md` §6 for the full planned surface).
