# Profilo — 1-Page PRD

> 状态：P0 静态审计站已建成 + 部署 GitHub Pages（https://Viyozc.github.io/profilo-ai/）。本 PRD 锁定产品方向，供后续 MVP 决策。
> 立项来源：research/2026-07-21-freelance-profile-ai-tools-market-research.md（结论 GO）

---

## 1. 楔子（Wedge）

**免费「自由职业者档案就绪度审计」0–100 + 付费 AI 改写**。
不碰提案生成红海（8+ 玩家），切入蓝海缺口：**针对 Upwork / Fiverr / Freelancer.com 档案的「就绪度审计 + 具体改写建议」**——免费、免登录、针对自由职业市场（LinkedIn 分析器与通用作品集审计都覆盖不到）。

复用已验证的「免费审计钩子 + 邮件捕获 + freemium」飞轮（与 Listora / Newsletterly / Launchly 同构）。

## 2. 目标用户

- **主力**：Upwork / Fiverr 认真自由职业者，人均 ~$39/hr，资深 AI 自由职业者 $100–300/hr。
- **痛点**：平均拿一单发 15–20 份提案，每份 ~6 connects ≈ **$15–20 / 单「yes」**；档案弱 → 搜不到 → 收不到邀请。
- **付费意愿已验证**：提案类工具 $5–25/月存续，免费档获客成行业标配。

## 3. 六维评分引擎（已上线静态版）

| 维度 | 权重 | 含义 |
| --- | --- | --- |
| Title & keywords | 18 | 含买家高频词 / 能力导向而非工具罗列 |
| Positioning / overview | 18 | 专家型定位，开头命中客户问题 |
| Portfolio / proof | 17 | 可验证案例 / 录屏 / 成果数据 |
| Skills framing | 15 | 能力→证据结构 |
| Niche focus | 17 | 占据一个具体 outcome |
| Completeness / responsiveness | 15 | 字段填满 / 响应率 / JSS 风险 |

权重和 = 100。实测 WEAK=30(D) / MID=65(C) / STRONG=100(A) 可分化。

## 4. MVP 范围（Next.js + Supabase + LLM，复用 etsy-listing-ai/mvp 骨架）

- **审计页**：六维评分（客户端 + 服务端同构），输出 0–100 + 维度分 + Top-3 修复。
- **AI 改写**：输入档案文本 → 输出改写后的标题 / Overview / 技能标签（单条成本 <$0.02）。
- **邮件捕获**：Formspree（已接通 meeyzkdp）→ 匿名审计埋点（audit_logs）。
- **升级**：freemium，$9–19/月锚定（参考 AiProposer $12、ProposalPilot $19）。
- **不做**：自动提案生成（红海）、平台账号直连（合规/授权风险）。

## 5. 商业模式

- 免费审计（获客）→ 邮件订阅（培养）→ 付费 AI 改写 / 月度优化建议（$9–19/月）。
- 单位经济：获客≈0（SEO + 社区），单改写 <$0.02，毛利极高。

## 6. 验证门槛（沿用矩阵标准）

各站 **≥200 审计 + ≥50 订阅** → 进 MVP（不再建静态站，直接 Next.js）。
未达门槛前，MVP 不启动（避免过早工程投入）。

## 7. 风险

- **平台政策**：Upwork 禁止自动化/数据抓取 → 坚持「用户输入 + 客户端评分」模式，不碰账号。
- **获客集中度**：依赖 r/Upwork、r/freelance、X(#Upwork)；zc 小红书可反向做「海外自由职业怎么拿单」中文种草（跨境杠杆）。
- **差异化易被抄**：先发 + 邮件列表 + 品牌矩阵互链是护城河。

## 8. 下一步

- P2：获客内容计划（content-plan.md，待 zc 发布）。
- 六站 footer 互链，分散组合风险、内部交叉引流。
- 跑 2 周流量验证 → 达门槛进 MVP。
