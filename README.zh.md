# dsh-ielts-pets

一只常驻在 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 网页版对话页右下角的 IELTS 单词宠物：猫、狗或水豚，一次递上一个单词，并按你自己「认识 / 不认识」的回答安排它下次出现的时间。

这是客户端插件。宿主半边（`index.js`）是空的，学习状态全部存在浏览器的 `localStorage` 里，代码中没有任何网络请求。

## 安装

```sh
dsh plugin --profile web add github:zhai90/ielts-pets
```

桌面端用应用自己的插件管理器安装同一个 `github:zhai90/ielts-pets`（profile 通常叫 `desktop`）。

这个包没有发布到 npm，仓库就是安装源；没有构建步骤，`client.js` 本身就是产物。装完刷新页面（或重启 `dsh web`）。

## 功能

- **三种宠物形象**：猫、狗、水豚。头部会朝鼠标指针转动；收起后角落留一个小按钮，点一下就能把宠物叫回来。
- **内置 120 个 IELTS 单词**，每个都有词性、中文释义、英文例句与例句翻译，例句里的目标词会高亮。
- **自评排程**：点「认识」会把这张卡的熟悉度（0–5）提高一级，下次出现在 1、3、7、14、30、60 天后；点「不认识」会降一级，并分别在 45 秒、2 分钟或 10 分钟后重新出现，具体看它已经遗忘过几次。
- **每日新词上限** 1 到 100（默认 20），次日自动开始新一轮。没有到期的词时，宠物会直说，而不是硬塞。
- **自动探出头**：空闲 1、3、5、10 或 15 分钟（默认 3 分钟）后，宠物会自己递上一个词；可以关掉。
- **朗读**：喇叭按钮用浏览器语音合成读出当前单词。
- **自定义词库**：导入 CSV 或 JSON，导入的词会加入每日队列，并告诉你导入了多少个、跳过了多少个。
- **进度**：今日新词、今日复习、已熟悉、待复习，以及今日目标的进度条；上一步可以撤销。
- **中英双语界面**，跟随宿主语言切换。

## 键盘

| 按键 | 位置 | 动作 |
| --- | --- | --- |
| `←` | 出题时 | 不认识 |
| `→` | 出题时 | 认识 |
| `→` / `Enter` | 已显示答案 | 下一个 |
| `←` | 已显示答案 | 改上一个答案 |
| `↓` | 任意卡片 | 撤销上一个答案；没有可撤销的时候就收起宠物 |
| `↓` | 设置页 | 关闭设置 |
| `Enter` | 一轮结束 | 继续复习 |

焦点在输入框、文本域、下拉框或可编辑元素里时，快捷键不生效。

## 自定义词表

### CSV

表头可选。可识别的列名（忽略大小写、空格、`_` 和 `-`）：

| 字段 | 可用列名 |
| --- | --- |
| 单词（必填） | `word`、`term`、`单词`、`英文`、`词汇` |
| 词性 | `pos`、`part of speech`、`词性` |
| 释义（必填） | `meaning`、`definition`、`释义`、`中文`、`中文释义`、`意思`、`解释` |
| 例句 | `example`、`sentence`、`例句` |
| 例句翻译 | `translation`、`例句翻译`、`例句中文`、`翻译` |

没有表头时，列顺序是 `word, pos, meaning, example, translation`。

```csv
word,pos,meaning,example,translation
abandon,v.,放弃；抛弃,Many students abandon their study plans when motivation drops.,当动力下降时，许多学生会放弃自己的学习计划。
```

### JSON

对象数组，或者带 `words` / `data` 数组的对象。字段名与 CSV 表头使用同一套别名。

```json
[
  {
    "word": "abandon",
    "pos": "v.",
    "meaning": "放弃；抛弃",
    "example": "Many students abandon their study plans when motivation drops.",
    "translation": "当动力下降时，许多学生会放弃自己的学习计划。"
  }
]
```

没有单词或没有释义的行会被跳过。单词截到 80 字符，词性 24 字符，例句与例句翻译各 600 字符。

## 设置

- **每日新词上限**：1 到 100。
- **宠物形象**：猫 / 狗 / 水豚。
- **弹出间隔**：1 / 3 / 5 / 10 / 15 分钟。
- **自动探出头**：开或关。
- **自定义词库**：导入、查看数量、清空（清空同时会删掉这些词的学习记录）。

## 数据存在哪里

设置、每张词卡（`seen`、`known`、`unknown`、`level`、`nextDueAt`）和导入的词，全部存放在 `localStorage` 的 `dsh.ielts-pet.v1` 键下。不上传任何东西，`client.js` 里没有 `fetch`、`XMLHttpRequest` 或 `WebSocket` 调用。清掉站点数据就会重置宠物。

## 运行环境

需要 DSH 网页客户端。客户端半边通过 `window.__ModuleLoader__.load` 注册，渲染进对话页（`@deepseek-ai/dsh-client-ui-conversation`），因此需要一个提供该插槽的宿主；它按 DSH 0.2.x 编写。

## 开发

没有构建步骤，也没有依赖：`index.js` 是空的宿主插件，`client.js` 是整个客户端包（纯 JS，React 从宿主取），`locale/*.json` 存放清单里的标题与描述。改完刷新页面即可。

## 许可

MIT
