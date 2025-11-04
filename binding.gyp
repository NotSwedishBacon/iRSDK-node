{
  "targets": [
    {
      "target_name": "irsdk",
      "sources": [ "src/irsdk_bindings.cc" ],
      "include_dirs": [
        "<!(node -p \"require('node-addon-api').include\")"
      ],
      "dependencies": [
        "<!(node -p \"require('node-addon-api').gyp\")"
      ],
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "defines": [ "NAPI_CPP_EXCEPTIONS" ],
      "libraries": [],
      "conditions": [
        [ 'OS=="mac"', { "xcode_settings": { "GCC_ENABLE_CPP_EXCEPTIONS": "YES" } } ],
        [ 'OS=="linux"', { "cflags_cc": [ "-fexceptions" ] } ],
        [ 'OS=="win"', { "msvs_settings": { "VCCLCompilerTool": { "ExceptionHandling": 1 } } } ]
      ]
    }
  ]
}
