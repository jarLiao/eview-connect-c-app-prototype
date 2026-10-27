# Eview Connect C 端 App 原型

Eview Connect C 端设备管理 App 的静态交互原型，保留地图、设备、消息、我的四个底部入口。

认证演示包含登录、注册、邮箱验证码倒计时和找回密码。

## 家人和宠物档案

- “我的 → 家人和宠物”支持新增、编辑、按类型筛选和归档；仍有关联设备的档案会阻止归档。
- 设备列表、地图卡片和详情展示使用者；设备列表及详情的使用者标签可以进入档案。
- 档案详情展示基本资料和关联设备，点击设备返回原有设备详情。未关联设备的档案提供添加入口。
- 添加设备保留扫码、IMEI 和 BLE 方式，识别后选择“给谁使用”；可就地新增档案，保存或取消后保留设备信息。
- 档案与设备分别保存，通过稳定 ID 关联。种子演示中妈妈关联手表和挂坠，爸爸暂未关联设备，Milo 和栗子分别关联宠物设备。
- 在线、电量和位置属于设备；新增演示设备等待首次上报，不生成虚假的位置或健康数据。物品保留原设备分类，分享设备不会自动开放使用者档案。

这些操作只改变当前页面中的演示数据，不调用服务器。刷新页面或点击“重置演示”恢复初始数据；不能作为 Android 实现或真实业务验收证据。

## 账号资料

- 从“我的”头像卡或“账号资料”进入独立页面；头像、昵称和姓名分别编辑，邮箱与手机号只展示。
- 点击昵称或姓名打开单字段弹层，支持取消、清空、保存中及成功反馈；取消不影响已保存资料。
- 点击头像可从本机相册选择 PNG/JPG，确认预览后才修改演示头像，也可移除。图片只在当前页面内存中使用，不上传服务器。
- 可直接打开 `index.html#account-profile`，或 `index.html#mine` 查看入口。加 `?appearance=dark` / `?appearance=light` 可查看深浅色，默认跟随系统，例如 `index.html?appearance=dark#account-profile`。
- 人物、邮箱与本地保存反馈均为合成演示；关闭或刷新页面会恢复初始数据，不代表正式接口验收。

## 地理围栏交互（2026-10-27）

- 直接预览 `index.html#geofences`；也可从设备详情“地图 → 安全围栏 / 管理围栏”进入同一列表。固定显示围栏 1～4，不提供新建；未设置点“去设置”，已设置点查看 / 编辑，共用同一个全屏地图编辑器。
- 紧凑列表保留四个位置及原编号，展示未设置 / 启用 / 停用、形状、范围和进入 / 离开提醒，不显示未经接口支持的名称、时间规则或双向提醒输入。四个位置属于本原型产品规则，不据此认定固件数量上限或修改 Android 协议范围。
- 全屏地图可拖动和缩放；圆形可拖中心、滑动 / 精确输入 100–65535 米半径，缩放不改变半径。多边形支持 3–10 顶点、添加、拖动、键盘方向键移动、删除选中点及撤销，保存前检查范围和边界交叉。
- 网络 / 蓝牙共用一套列表、地图及合成设备存储；首次切蓝牙可模拟连接。未保存修改在取消或切换渠道前二次确认；确认切换后重新读取，不沿用旧草稿。
- 保存演示“下发 → 设备确认 → 独立核对”，完成后更新当前内存。启停修改随保存提交；清除经确认后清空该位置的范围与提醒、关闭启用，并恢复“未设置”，四个位置与其他配置始终保留。全部清除仍显示四行；离线或未连接不显示为未设置。
- 所有地图、数据、读取和保存都为本机合成演示，刷新或重置恢复四围栏；不调用地图、服务器、设备或真实定位。App 1.0.227 的指定设备只读验证与本原型可编辑演示分开，网络真实保存和实际告警仍待验收。
- 技术边界并入既有“网络与蓝牙统一设备配置”说明，保留原核对日期并单列 10-27 围栏增量。`geofence.js` 和 `geofence.css` 负责本页交互及主题，不复制第二套网络或蓝牙表单。

## 历史轨迹交互（2026-10-26）

- 设备详情“地图 → 历史轨迹”打开独立页面，也可直接打开 `index.html#history`。
- 地图点、播放进度和记录列表共用选中位置；支持播放 / 暂停、播完重播、1× / 2× / 4×、地图缩放及全览、列表展开与手柄拖动。
- 今天有 16 条、两段合成位置记录；昨天有 8 条；三天前为单点，其他日期为空态。按当前日期生成演示日期，刷新后恢复初始状态。
- 日期、时段及 GPS / WiFi / BLE 类型筛选可用；中断与过滤造成的缺口不强行连线。空态可调整日期或重置筛选，单点禁用播放。
- 地图是离线区域示意，明确标识演示数据，不加载地图服务、不访问后端、不发送设备命令。正式 App 1.0.219 已接入查询、坐标兼容显示、平滑回放与日期标记；正式坐标和有效性契约、定位类型及真实移动仍按各自范围待确认 / 验收。
- `history-track.js` 管理演示状态和联动，`history-track.css` 沿用原型主题与浅深色；[历史轨迹技术说明](guides/history-track.html) 按 Android `5ab3127` 区分原型演示与 App 验证范围。

可复用页面回归脚本为 `scripts/check-history-track-browser.cjs`，使用已安装的 Playwright 和 Edge；不自动安装依赖。默认截图及摘要保存在忽略目录 `.qa/history-track/`。

```powershell
# 能直接 require('playwright') 时不需要设置模块路径。
$env:EVMARS_PLAYWRIGHT_MODULE = '<已安装的 playwright 模块路径>'
node scripts/check-history-track-browser.cjs
```

另可通过 `EVMARS_TRACK_QA_OUTPUT` 指定截图和结果目录。检查包括联动、播放结束、筛选校验、单点与空态、返回重进、键盘、320/390px 及深色模式；日期与合成数据不等于服务器真实历史记录。

## 文件清单

- `index.html`
- `styles.css`
- `history-track.js`、`history-track.css`：独立历史轨迹页的合成地图、播放与列表联动。
- `app.js`
- `api-contracts.js`：逐项维护的 App 调用、公开未接入、待确认和原型需求映射。
- `api-evidence.js`：2026-10-10 公开 OpenAPI 的选定操作/字段快照，不包含示例值或默认值。
- `api-panel.js`：API 侧栏与 JSON 导出，共用同一目录。
- `business-guides.js`：业务技术说明内容；方法和路径引用现有 API 目录。
- `business-guide.js`、`business-guide.css`：技术说明侧栏与完整文档的公共渲染和样式。
- `guide-viewer.js`：流程图 / 时序图放大阅读，原型与导出共用。
- `guides/`：业务说明目录、本地图表、Mermaid 源图和生成的独立离线 HTML。
- `assets/lucide.min.js`：本地 Lucide 图标，许可证见 `assets/lucide-LICENSE`，打开原型无需访问图标 CDN。

浏览器直接打开 `index.html` 即可。原型属于独立子模块，提交和发布遵守主仓库 `web/README.md` 中的边界约定。

## 业务技术说明

右侧可切换“页面说明 / 技术说明”，随手机当前页面和弹层更新；切换说明不重置手机演示。账号和照护对象资料编辑、头像弹层保持对应业务说明。未覆盖的业务显示“技术说明待补充”，不套用其他业务内容。

现有 [业务说明目录](guides/index.html) 共 **13 篇（12 个业务专题 + 公共接口约定）**。历史轨迹于 2026-10-26 按 Android <code>5ab3127</code> 补齐；其他专题保留各自 10-23 核对日期和基线。原型仍只操作合成演示数据，本轮没有新增服务器或设备业务验收。

| 说明 | 对应原型页面 | 当前重点 |
|---|---|---|
| [设备列表](guides/device-list.html) | 设备列表 | 自有绑定聚合、直接共享分组、上报阶段和名称回退 |
| [照护对象](guides/subjects.html) | 管理、详情、人员 / 宠物资料与头像 | 自有档案管理；Android“删除”实际为归档，不提供档案分享 |
| [蓝牙接入与绑定解绑](guides/device-binding.html) | 添加设备、设备管理 | 扫描后读完整身份、云端绑定、双视图回查、本地 BLE 关联 |
| [设备详情](guides/device-detail.html) | 概览、健康、告警 | 共用云详情、分区读取、规则与 AI、语言重读和权限 |
| [地图与立即定位](guides/device-location.html) | 地图首页、设备地图 | 按人筛选、坐标与时间、ACK 与新位置分开 |
| [历史轨迹](guides/history-track.html) | 历史轨迹、日历与记录列表 | 同一 POST 的日 / 月查询、坐标兼容、播放联动与日期标记 |
| [账号资料与头像](guides/account-profile.html) | 本人资料、字段编辑、头像预览 | 三字段限写、上传、冲突及独立回读 |
| [登录与账号安全](guides/login-security.html) | 登录、注册、找回、验证码、账号安全、退出 | OAuth、会话恢复、密码及验证码流程 |
| [AI 客服](guides/ai-chat.html) | AI 客服弹层 | 模型、消息、SSE、取消重试、语言快照和上下文边界 |
| [网络与蓝牙统一配置](guides/device-configuration.html) | 设备配置及分类弹层 | 同一菜单 / 表单选渠道、两字段网络写入、基线与迟到结果隔离 |
| [设备分享](guides/device-sharing.html) | 分享、消息与邀请 | 仅 DEVICE 的创建、接受 / 拒绝、权限、重发、撤销及失权清理 |
| [云端查找](guides/device-find.html) | 独立专题；设备详情说明提供相关链接 | findMe 受理、硬件 ACK、现场声音各自核对 |
| [公共接口约定](guides/common.html) | 说明栏公共入口 | 认证、lang、时区、ID、时间、独立回查和验证边界 |

- 直接预览：<code>index.html?guide=technical#devices</code>。说明随页面 / 弹层更新，每个页面只归属一篇；查找按钮仍为演示提示，未为了文档新增业务弹层。
- 历史轨迹：<code>index.html?guide=technical#history</code>，含查询流程图、日历 / 日查询时序图。原型 16 点演示与既有 App 71 点 SDK 模拟验证分别说明。
- 每篇保留五个重点，流程图和时序图可放大。“单独打开”和“下载 HTML”共用生成内容，含本地样式、图表和阅读器，可独立离线转发。
- 原型技术说明中的“相关业务”链接覆盖配置、分享和查找；独立下载文件不依赖这些跨文档链接或运行时网络资源。
- 历史验收日期保持原样：分享 LOCATION-only、BLE 参数、云端两字段保存、查找声音、新位置和蜂窝直连分别说明。10-23 BLE 读取失败及上传间隔参数拒绝仍开放。
- 只读核对未发送邮件、AI 问题、邀请、绑定或配置；Prod 昵称来源未提供，不把 Mock 演示名称当作正式数据。

后续新增业务时，在 `business-guides.js` 添加说明并用 `pages` 指定覆盖页面；一个页面只能对应一篇说明。接口条目引用 `api-contracts.js` 的 ID，同用途的 PERSON / PET 可分组展示。没有核对的业务保留待补充，不将原型交互推定为 App 实现。修改源内容、API 路径、样式、阅读器或图表后运行：

```powershell
node scripts/build-business-guides.cjs
node scripts/build-business-guides.cjs --check
node scripts/check-api-contracts.cjs
node --check business-guide.js
node --check guide-viewer.js
node --check app.js
```

`guides/*.html` 和 `guides/guide-downloads.js` 是生成物，不直接修改；下载数据通过本地脚本载入并生成 Blob，兼容直接打开 file:// 原型。侧栏和离线文档共用 `business-guides.js`。图表使用仓库内 SVG，无运行时 CDN 依赖。修改 Mermaid 源图后，先用已安装的 Mermaid CLI 重新渲染，再生成 HTML：

```powershell
node scripts/render-business-diagrams.cjs --cli <已安装的mermaid-cli/src/cli.js> --puppeteer-config <本机浏览器配置.json>
node scripts/build-business-guides.cjs
node scripts/build-business-guides.cjs --check
```

`--puppeteer-config` 可省略，由 Mermaid CLI 使用其浏览器配置；此脚本不会安装依赖。SVG 记录源图 SHA-256，生成检查同时核对源图、页面归属、接口引用、独立文档和下载内容。Android 主仓库中的带日期说明是原始核对记录，不由此生成器改写。

只更新历史两图时增加 `--only history-track-flow.mmd,history-track-sequence.mmd`，避免重渲染其他图表。当前共 24 个图表。

## API 接入对照（历史轨迹增量：2026-10-26）

侧栏的接入分类按当前 Android 代码更新；原始 <code>api-evidence.js</code> 仍是 2026-10-10 快照，没有重新采集或伪造服务器定义。

| 分类 | 数量 | 含义 |
|---|---:|---|
| App 已在使用 | 50 | 原 37 项中 23 项 + 4 个分析声明 + 8 个分享声明 + 1 个历史声明 + 13 个公共操作 + 1 条动态头像规则；不等于所有业务验收通过 |
| 文档里有，App 还没用 | 14 | 包括已退出产品范围的人员 / 宠物分享创建，保留其历史公开契约 |
| App 已停用的旧接口 | 4 | 10-12 起不再调用的旧 <code>/c/v1</code> GET |
| 功能需要，接口还没定 | 12 | 分享剩余权限、其他配置 / OTA、推送及轨迹剩余字段待补约定；历史查询、日期标记和回放已接入 |

原 37 项的当前分类为 **23/14**：设备分享创建及正式属性 GET / POST 已接入。功能取舍按 23 项保留、1 项后续补接、9 项按功能选用、4 项当前不用标注。旧事件 GET 在 10-23 实测 405，当前使用新增 POST 声明；人员 / 宠物分享创建也不作为后续任务，不表示删除服务器接口。

新增 8 项分享声明为解析接收人、收 / 发列表、接受、拒绝、撤销、设备专用重发和修改。它们与 4 个分析操作及 1 个历史 POST 均标记 <code>client_supplement</code>，保留各自基线、来源和验证范围，不混入旧 37 项快照。历史日查询和月标记复用同一 POST，未新增日期统计端点；剩余字段和共享权限单独列出。原属性和功能条目说明网络两字段可写、<code>findMe</code> / <code>singleLocating</code> 分工及独立回查。

复制与导出保留 <code>schema_version: 2</code>、<code>groups</code>、旧 <code>supplemental_baseline</code>，并保留可选 <code>workflow_baseline</code>、增加可选 <code>history_baseline</code>；逐项仍导出来源与类型。公共账号、头像和 AI 的 App 使用事实与后端授权范围分别说明。上传 multipart 与原公开 JSON 声明的差异继续保留。

### 后续维护

两个 App 分组的 37 个操作另有“App 是否需要”，与当前是否使用分开展示：需要保留 23 个、后续补接 1 个、按功能选用 9 个、当前不用 4 个。这是按当前 App/原型功能提出的取舍建议，不是后端确认或业务验收，也不要求删除“当前不用”的服务器接口。每项有具体原因，JSON 的可选 `app_need` 字段同步导出；公共接口、补充客户端声明与尚未约定的需求不在旧 37 项评估中。

1. 保存本次公开文档，不带账号密码、Token 或业务样例。分别取得 `/v3/api-docs/upms` 与 `/v3/api-docs/default`，记录真实采集日期；生成器本身不联网。
2. 运行下方命令提取所需定义。`sha256` 对应传入文件的实际字节；旧核对报告的响应哈希含义保持不变。
3. 对照 Android 调用入口、Prod 门禁和 DTO，人工更新 `api-contracts.js`。不能只靠 Retrofit 方法存在判断已接入；“来源基线”须同步更新。
4. 核对页面、复制和导出，再按子模块边界提交。若公开 App 数量改变，生成器/检查器会失败，应重新核对完整清单后更新预期，不能只改数字。

```powershell
python scripts/build-api-snapshot.py --upms <upms.json> --public <default.json> --captured-at <实际采集日期>
node scripts/check-api-contracts.cjs
node --check api-panel.js
node --check app.js
git diff --check
```

生成器只提取 App Device / App Subject 和 7 个公共操作，保留引用实体与字段约束，剔除示例/default。其余公共依赖以客户端声明为来源，不虚构 OpenAPI。公开上传媒体类型等差异保留原样，在人工层注释，避免把修正意见伪装成服务器定义。
