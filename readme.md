# 0x1579FEE9

个人 PasteBin。

以解决问题为主，不涉及具体技术细节原理的讨论，提供的代码片段和问题解决步骤不一定是最佳的解决方法。

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