# @gymai/config

Env parsing and feature flags, validated once at startup via Zod rather than read ad hoc from `process.env`/Expo `Constants` throughout the codebase. Extend `envSchema` as new environment variables are needed (e.g. analytics keys, feature flag service URL).
