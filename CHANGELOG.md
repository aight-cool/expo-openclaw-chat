# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.7] - 2026-05-15

### Fixed

- Advertise `minProtocol: 3, maxProtocol: 4` in the connect handshake so the SDK negotiates with both v3 (OpenClaw ≤ 2026.5.4) and v4 (OpenClaw ≥ 2026.5.12) gateways. Previously both bounds were collapsed to `GATEWAY_PROTOCOL_VERSION` (3), causing v4 gateways to reject the handshake with `protocol mismatch (expectedProtocol: 4)`. v4 keeps `message` as the cumulative assistant snapshot, so existing snapshot-based consumers continue to work without changes (#22)

## [0.2.6] - 2026-05-08

### Fixed

- Cast `ed.hashes.sha512` assignment through `any` to bypass `@noble/ed25519` v3's `Bytes<ArrayBufferLike>` vs `Uint8Array` narrowing under stricter consumer TS lib settings; runtime unchanged (#20)

## [0.2.5] - 2026-05-08

### Fixed

- Drain overlapping `connect()` callers atomically via a pending-resolver array; second call now attaches to the in-flight handshake instead of throwing `Already connecting` (AIG-162, #18)
- `handleClose()` 1008 "pairing required" branch falls through to auto-reconnect (was: early-return → state stuck at `connecting` forever); pending promises are rejected on close so callers don't hang
- `openWebSocket()` early-returns if a live socket already exists, preventing duplicate connect frames during reconnect/lifecycle races
- `handleHelloOk()` clears the pending reconnect timer so a stale retry can't stomp on a freshly-handshook connection
- `request()` retry path captures and clears the 5s wait timer when settled by the state listener (closure leak)
- `handlePairResolved()` skips `sendConnectFrame()` when the WS isn't open — gateway closes 1008 before approval lands, so the next auto-reconnect attempt handles the now-approved device identity
- `connect()` wraps `ensureIdentity()` in try/catch so a crypto/storage failure during identity load can't strand callers that queued during the await
- `disconnect()` drains `connectPromisePending` so callers attached during a `reconnecting` phase don't hang on an intentional disconnect

## [0.2.4] - 2026-04-26

### Added

- `headers` option in `GatewayClientOptions` for custom WebSocket upgrade headers (React Native)
- Connection protection: `disconnect()` is a no-op during mid-handshake to prevent React effect cleanup races

### Fixed

- Skip duplicate placeholder when WS delta/complete events arrive before `chatSend` resolves (#16)
- Generate random nonce fallback for OpenClaw 2026.3.x device connect compatibility
- Promote runtime peer dependencies (`@expo/vector-icons`, `react-native-keyboard-controller`, `react-native-safe-area-context`) (#15)
- Exclude `node_modules/` and `demo/` from `file:` dep copies via `.npmignore` (#15)
- Align disconnect tests with `_connectInFlight` guard behavior

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
