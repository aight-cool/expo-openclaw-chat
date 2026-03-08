# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.3] - 2026-03-08

### Fixed

- Wait for reconnect before processing pending requests (#11)
- Reverted temporary debug logging in GatewayClient

## [0.2.2] - 2026-02-21

### Fixed

- Use 3-segment default sessionKey (`agent:main:chat-*`) for OpenClaw 2026.2.15 compatibility
- Corrected repository URL format in package.json

## [0.2.1] - 2025-06-24

### Fixed

- Sync lockfile and add missing type dev dependencies

## [0.2.0] - 2025-06-24

### Added

- SecureStore-based device identity with Ed25519 key generation
- Test coverage for core modules (client, device-identity, storage, engine)
- Maestro E2E test flows

### Fixed

- 1008 pairing close code handling
- Strip metadata from chat bubbles
- modelsList RPC param and gateway response transform
- Remove phantom RN peer dependencies

### Changed

- Security hardening across core modules

## [0.1.1] - 2025-02-05

### Fixed

- Corrected repository and homepage URLs in package.json

## [0.1.0] - 2025-02-05

### Added

- Initial release
- Core WebSocket client for OpenClaw gateway connections
- Device identity management with Ed25519 key generation
- Binary protocol encoding/decoding
- Chat engine with conversation and message management
- React components: `ChatBubble`, `ChatInput`, `ChatList`, `ChatModal`
- `createChat()` factory for easy integration
- Native keyboard animations via react-native-keyboard-controller
- Automatic `wss://` protocol handling for gateway URLs
- TypeScript support with full type definitions
