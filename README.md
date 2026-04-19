# JM的工具箱 - 微信小程序

> 永久免费 · 无限使用 · 各类工具合集

## 功能

| 功能 | 说明 | 状态 |
|------|------|------|
| 🎨 拼豆图片生成器 | 上传图片生成拼豆图纸，支持多种色卡 | ✅ |
| 🧹 图片去水印 | 智能去除图片水印和Logo | ✅ |
| 🔍 敏感词检测 | 检测文本中的敏感词和违规词 | ✅ |
| 😄 随机表情包 | 海量表情包随机获取 | ✅ |
| 🐱 兽语翻译 | 喵星人汪星人语言互译 | ✅ |

## 快速开始

### 开发

1. 下载 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. 导入本项目目录
3. 填写 `project.config.json` 中的 `appid`
4. 开始开发

### 自动化部署

本项目配置了 GitHub Actions，支持 push 代码后自动上传到微信小程序后台。

**配置步骤：**

1. 在微信公众平台生成上传密钥：
   - 登录 [微信公众平台](https://mp.weixin.qq.com/)
   - 进入 **开发 → 开发管理 → 开发设置**
   - 找到 **代码上传密钥**，生成并下载私钥
   - 开启「上传代码」权限

2. 在 GitHub 仓库添加 Secret：
   - 仓库 → Settings → Secrets and variables → Actions
   - 新建 `MINIPROGRAM_UPLOAD_PRIVATE_KEY`
   - Value 粘贴私钥文件全部内容

3. 以后每次 push 到 main 分支，会自动部署

## 项目结构

```
jm-toolbox/
├── app.js              # 小程序入口
├── app.json            # 全局配置
├── app.wxss            # 全局样式
├── project.config.json # 项目配置
├── sitemap.json        # SEO配置
├── pages/
│   ├── index/          # 首页
│   ├── beadart/        # 拼豆生成器
│   ├── watermark/      # 去水印
│   ├── sensitive/      # 敏感词检测
│   ├── meme/           # 随机表情包
│   ├── translate/      # 兽语翻译
│   ├── history/         # 使用记录
│   └── about/          # 关于
├── .github/
│   └── workflows/      # GitHub Actions
└── assets/             # 静态资源
```

## 技术栈

- 微信小程序原生框架
- WXS + WXML + WXSS
- 本地缓存（历史记录、收藏）

## License

MIT
