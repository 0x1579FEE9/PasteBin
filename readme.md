# 0x1579FEE9

个人 PasteBin。

以解决问题为主，不深度涉及具体技术细节原理的讨论。

提供的代码片段和解决步骤不一定是最佳的方法，请酌情考虑。

## 让 Windows 10 认为主板时间是 UTC

```cmd
reg add HKLM\SYSTEM\CurrentControlSet\Control\TimeZoneInformation /v RealTimeIsUniversal /t REG_DWORD /d 1
```

## 在 Git 中自动忽略 CMake 构建目录

#C #CMake #Git

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

#C #CMake

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

#C #VSCode #CMake

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