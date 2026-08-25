# Pastebin

## 使用第三方 notepad 替代 windows notepad

- https://github.com/zufuliu/notepad4

win 自带 notepad 虽然方便但不够用。选用 notepad4 是因为有中文，有黑暗模式，而且可以从 scoop 安装。

打开 `regedit` ，前往 `计算机\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options`，创建项 `notepad.exe`。

添加 字符串 类型，内容为 notepad4 的目录，并带上 `/z` 参数。比如：

```
C:\Users\[用户名]\scoop\shims\notepad4.exe /z
```


## 通过 whisper.cpp 使用 OpenAI Whisper 语音识别模型

- whisper.cpp: https://github.com/ggml-org/whisper.cpp
- ggml whisper 模型：https://huggingface.co/ggerganov/whisper.cpp
- ggml vad 模型：https://huggingface.co/ggml-org/whisper-vad
- CUDA Toolkit: https://developer.nvidia.com/cuda-downloads

为了启用 NVIDIA GPU support，需要手动编译 whisper.cpp 。在 Windows 上确保安装了 MSVC C++ 与 CUDA Toolkit。

```bash
git clone https://github.com/ggml-org/whisper.cpp.git --depth 1
cd whisper.cpp
cmake -B build -DGGML_CUDA=1
cmake --build build -j --config Release
```

下载 whisper 和 vad 模型，并确保音频格式支持。

```cmd
wget2 https://huggingface.co/ggml-org/whisper-vad/resolve/main/ggml-silero-v6.2.0.bin -O D:\ggml-silero-v6.2.0.bin
wget2 https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-large-v3-turbo-q8_0.bin -O D:\ggml-large-v3-turbo-q8_0.bin
ffmpeg -i D:\target.mp4 D:\target.mp3
```

使用 vad 搭配 wisper 模型，指定语言并输出 srt 格式字幕文件。

```cmd
build\bin\Release\whisper-cli.exe -osrt --vad -vm D:\ggml-silero-v6.2.0.bin -m D:\ggml-small.bin -l zh -d D:\target.mp3
```

## Trae Code 无法使用 Codex 插件

改 `~/.trae-cn/extensions/openai.chatgpt-xxx/package.json`。编辑完后重启软件或者 F1 -> `Reload Window`。

```json:line-numbers=192 {1}
"views": {
	"codexViewContainer": [
		{
			"id": "chatgpt.sidebarView",
			"type": "webview",
			"name": "Codex",
			"when": "chatgpt.doesNotSupportSecondarySidebar"
		}// [!code --]
	],// [!code --]
	"codexSecondaryViewContainer": [// [!code --]
        }, // [!code ++]
		{
			"id": "chatgpt.sidebarSecondaryView",
			"type": "webview",
			"name": "Codex",
			"when": "!chatgpt.doesNotSupportSecondarySidebar"
		}
	]
},
```

## 让 Windows 10 认为主板时间是 UTC

```cmd
reg add HKLM\SYSTEM\CurrentControlSet\Control\TimeZoneInformation /v RealTimeIsUniversal /t REG_DWORD /d 1
```

## 在 Git 中自动忽略 CMake 构建目录

`#C` `#CMake` `#Git`

第一种方法是让 cmake 自动在构建目录生成 `.gitignore` 忽略那个目录下的所有文件。

```cmake
file(WRITE "${CMAKE_BINARY_DIR}/.gitignore" "*\n")
```

第二种方法是在 `./.gitignore` 中直接匹配

``` 
# 忽略所有以 build 开头的目录及其内部所有内容
build*/
```

## C 工程交叉编译（CMake + Zig + Ninja)

`#C` `#CMake`

Zig 语言的编译器也是一个支持开箱即用的交叉编译的 C/C++ 编译器。Ninja 非必需。

安装 Zig 后，编写额外的 cmake 工具链配置 `zig-windows-toolchain.cmake`：

```cmake
set(CMAKE_C_COMPILER "zig" "cc")

set(CMAKE_BUILD_TYPE Release)
set(CMAKE_C_COMPILER_TARGET x86_64-windows-gnu)
```

使用 cmake 创建构建目录时指定工具链。
```bash
$ cmake -B build-win -G Ninja --toolchain zig-windows-toolchain.cmake
$ cmake --build build-win
```

## VSCode 中 CMake Tools 插件默认自动使用 VS 工具链，与现有环境不同导致报错

`#C` `#VSCode` `#CMake`

在 `.vscode/settings.json` 手动指定生成器。

```json
{
  "cmake.generator": "MinGW Makefiles"
}
```

使用 `cmake --help` 查看所有生成器名称，mingw 发行版中的 make 对应的是 `MinGW Makefiles`, ninja 是 `Ninja`。

## clangd 在使用 mingw 的时候找不到（或没有正确的）stdio.h

`#C` `#clangd`

Windows 下 clangd 默认目标是 `windows-msvc`。添加 `.clangd` 手动指定为 mingw。

```yaml
CompileFlags:
  Add:
    - --target=x86_64-w64-mingw32
```

## Hello World

`#C` `#test`

Hello World
```c
#include <stdio.h>

int main(void){
  printf("hello, World!\n");
  return 0;
}
```