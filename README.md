# DoerFlow Official Website

DoerFlow 品牌官网，部署域名 **[doerflow.dev](https://doerflow.dev)**。

## 技术栈

- **Next.js 16**（`output: "export"` 静态导出，SSG）
- React 19 + Tailwind CSS 4
- 9 语言静态页面（`/` 英文，`/zh-CN/` 等）

## 本地开发

```bash
pnpm install
pnpm dev    # http://localhost:13010
pnpm build  # 输出到 out/
```

## 仓库关系

| 仓库 | 域名 | 职责 |
|------|------|------|
| **site**（本仓） | doerflow.dev | 品牌官网、产品介绍 |
| docs | docs.doerflow.dev | 技术文档（Rspress · GitHub Pages） |
| admin | admin.doerflow.dev | 运营管理后台（私有） |
| web | app.doerflow.dev | Creator DApp（私有） |

## 部署（Cloudflare Pages）

`main` 分支 push 后由 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) 自动：`pnpm build` → `out/` → **production** 发布到 [doerflow-site](https://dash.cloudflare.com/af0e854078b49637d63673c75566906b/pages/view/doerflow-site)（`https://doerflow-site.pages.dev`，无分支前缀）。

### Secrets

在 [组织 Actions secrets](https://github.com/organizations/doerflow/settings/secrets/actions) 配置即可，**不必**在 `site` 仓再配一份。需包含：

| Secret | 说明 |
|--------|------|
| `CLOUDFLARE_API_TOKEN` | Account · Cloudflare Pages · Edit |
| `CLOUDFLARE_ACCOUNT_ID` | `af0e854078b49637d63673c75566906b` |

组织 secret 的 Repository access 须包含 `doerflow/site`（All repositories，或 Selected 勾选 site）。

### 其它

- 自定义域：`doerflow.dev` / `www` 绑到该 Pages 项目（或 MetaRepo `.\scripts\setup-doerflow-dns.ps1`）
- 手动触发：Actions → **Deploy site to Cloudflare Pages** → Run workflow
- 本地：`pnpm build && npx wrangler pages deploy out --project-name=doerflow-site`（不要加 `--branch`，否则会变成预览部署）

### SEO

- 纯静态 SSG：`next.config.mjs` → `output: "export"`，产物在 `out/`
- 各语言独立 URL + `generateMetadata`（title/description/canonical/hreflang）
- Open Graph + Twitter `summary_large_image`（`/brand/app-icon-1024.png`）
- JSON-LD（Organization / WebSite / SoftwareApplication / WebPage）
- `app/sitemap.ts` 覆盖首页与下载页全部语言；`app/robots.ts` 指向 sitemap
- 下载页独立多语言 title/description；语言切换保留当前路径（首页 ↔ 下载）

## License

[Polyform Noncommercial License 1.0.0](LICENSE) (Polyform-NC). Non-commercial use permitted. Commercial use requires a separate license from DoerFlow.
