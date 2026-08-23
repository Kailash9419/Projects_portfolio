// Spoof Node.js version so Next.js passes its >=18.17.0 semver check
Object.defineProperty(process.versions, 'node', {
  value: '18.17.0',
  writable: true,
  configurable: true,
});

// Node 16 fetch & web streams polyfill for Next.js build
const undici = require("undici");
const streamWeb = require("stream/web");
const { crypto } = require("crypto");

// Web Streams
if (!globalThis.ReadableStream) {
  globalThis.ReadableStream = streamWeb.ReadableStream;
  globalThis.WritableStream = streamWeb.WritableStream;
  globalThis.TransformStream = streamWeb.TransformStream;
  globalThis.ByteLengthQueuingStrategy = streamWeb.ByteLengthQueuingStrategy;
  globalThis.CountQueuingStrategy = streamWeb.CountQueuingStrategy;
}

// Fetch & HTTP
if (!globalThis.fetch) {
  globalThis.fetch = undici.fetch;
  globalThis.Headers = undici.Headers;
  globalThis.Request = undici.Request;
  globalThis.Response = undici.Response;
  globalThis.FormData = undici.FormData;
  globalThis.File = undici.File;
}

// Crypto
if (!globalThis.crypto) {
  globalThis.crypto = crypto;
}
