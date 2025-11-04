// src/irsdk_bindings.cc
//
// Minimal N-API addon stub for iRacing SDK.
// This builds successfully on its own and can later be extended
// to call into the real iRSDK functions once linked with the headers.

#include <napi.h>
#include <iostream>

// Dummy state
static bool g_connected = false;

// Example function: toggles and returns connection status
Napi::Value IsConnected(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    g_connected = !g_connected;
    std::string state = g_connected ? "Connected" : "Disconnected";
    std::cout << "[iRSDK Stub] " << state << std::endl;
    return Napi::Boolean::New(env, g_connected);
}

// Initialization hook
Napi::Object InitAll(Napi::Env env, Napi::Object exports) {
    exports.Set("isConnected", Napi::Function::New(env, IsConnected));
    return exports;
}

// Register module
NODE_API_MODULE(irsdk, InitAll)
