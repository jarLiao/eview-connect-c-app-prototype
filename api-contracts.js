// 人工核对层：公开文档不等于 App 已接入；更新时同时核对调用入口和运行门禁。
const apiBaseline = {
  reviewed_at: "2026-10-12",
  android_commit: "d40f46f7c2e5fff264ed90ed6e115c97a0a2d215",
  design: "Android-App业务对象与设备分享实体设计V0.1；用户确认没有后续补充约定",
  evidence: "Evmars-Mock/document/validation/2026-10-10-原型设计与App接口边界梳理.md；旧请求停用见 2026-10-12-旧请求关闭与数量文案修正验证.md",
  verification: "除 4 个已停用的旧请求在 2026-10-12 有真机修改前后抓包外，本次只检查了 App 代码和接口文档，没有重新测试实际操作。",
  backend_scope: "后端同事说 App Device / App Subject 是给 App 使用的接口；账号、头像和 AI 的接口能否继续使用，以及服务器代码和版本，还需要后端确认。",
  base_url: "路径相对所选环境的 /admin/；AI 可被运行时环境覆盖",
};

const apiSupplementalBaseline = {
  reviewed_at: "2026-10-12", android_commit: "86fa2f9",
  scope: "新增 /app/evaigc 4 个只读接口，依据当前客户端声明；不属于 2026-10-10 的 37 项 OpenAPI 快照",
  evidence: "DeviceInsightApiService.kt、RemoteDeviceInsightRepository.kt、CloudDeviceInsightViewModel.kt；2026-10-12-设备健康告警AI分析App接入验证.md",
  verification: "既有记录：范工环境限定真机验证通过，29999 未部署时返回 404；本轮只核对代码和文档，未重新请求服务器。",
};

const apiCategories = {
  current: { label: "App 已在使用", hint: "App 代码已接上这些接口；不代表所有场景都测试通过。" },
  published: { label: "文档里有，App 还没用", hint: "后端接口文档里已经列出，App 还没有使用。" },
  pending: { label: "App 还在用的旧接口", hint: "需要和后端确认：继续保留、换成新接口，还是停用。" },
  retired: { label: "App 已停用的旧接口", hint: "App 已不再调用。停用前在当前环境实测返回 404；是否提供正式接口，等后端确认。" },
  requirement: { label: "功能需要，接口还没定", hint: "原型里有这个功能，但具体用什么接口还没有约定。" },
};
const apiRegistry = {};

function registerApi(id, method, path, title, category, pages, note, source = "", client = null) {
  const doc = apiEvidence.operations[`${method} ${path}`];
  apiRegistry[id] = {
    id, method, path, title, category, pages, note, source, client_contract: client,
    backend_scope: path?.startsWith("/app/") ? "后端说这是给 App 使用的接口；具体功能和权限仍需测试确认"
      : category === "requirement" ? "还没有约定接口" : category === "retired" ? "待后端确认：提供正式接口，还是确认不提供"
      : "待后端确认：App 能否继续使用此接口",
    app_usage: category === "current" ? "App 已在使用" : category === "pending" ? "App 还在使用这个旧接口"
      : category === "retired" ? "App 已停止调用（2026-10-12）" : category === "requirement" ? "接口还没定" : "App 还没用",
    contract_status: category === "requirement" ? "还没有约定接口" : doc ? "接口文档里已有" : "本次查看的 12 组接口文档里没找到；不代表服务器上没有",
    document_key: doc ? `${method} ${path}` : null,
  };
}

const subjectSource = "core/remote/subject/SubjectApiService.kt、SubjectCreateApiService.kt、SubjectProfileApiService.kt、RemoteSubjectRepository.kt";
const deviceSource = "core/remote/device/AppDeviceApiService.kt、RemoteAppDeviceReadRepository.kt；core/remote/devicebind/AppDeviceLifecycleApiService.kt";
const publicSource = "core/network/account/PublicAccountApi.kt";
const profileSource = "core/remote/auth/AccountProfileApiService.kt、RemoteAccountProfileGateway.kt";
const subjectPages = ["subjects", "subject", "add-device", "devices", "map", "overview", "mine"];
registerApi("subjects", "GET", "/app/subjects", "家人与宠物列表", "current", subjectPages,
  "Prod 以自有 ACTIVE PERSON/PET 聚合设备。共享对象发现范围未完成，不等于全量共享设备列表。", subjectSource);
for (const [type, label] of [["person", "人员"], ["pet", "宠物"]]) {
  const base = `/app/subjects/${type}`;
  const detail = `${base}/{${type}Id}`;
  const pages = ["subjects", "subject", type];
  registerApi(`${type}Create`, "POST", base, `创建${label}档案`, "current", [...pages, "add-device"],
    `创建使用 type、displayName 和 profile；${type === "pet" ? "客户端另要求 species，不能仅按 OpenAPI required 判断。" : "人员和宠物响应结构分别解析。"}稳定 ID 与创建后回读独立处理。`, subjectSource,
    { request: "type、displayName、profile；按创建白名单组装，不复用 PATCH DTO", response: "ApiResponse：人员 PersonPayloadDto，宠物 SubjectDto" });
  registerApi(`${type}Read`, "GET", detail, `${label}档案详情`, "current", [...pages, "add-device", "edit-device"],
    "用于详情、编辑、头像和归档的前后回读。路由参数为数值 ID；客户端 PERSON:1 / PET:2 是带类型的稳定 ID。", subjectSource);
  registerApi(`${type}Update`, "PATCH", detail, `更新或归档${label}资料`, "current", pages,
    "名称、普通字段、头像、ARCHIVED 分别限字段提交；普通资料 PATCH 为顶层字段，不能套用创建时的 profile 包装。归档前检查设备关联和分享。", subjectSource,
    { request: "按操作提交白名单差量；对象头像 avatarUrl、归档 status 与普通编辑分别处理", response: "ApiResponse<Boolean>；保存后独立回读" });
  registerApi(`${type}Bindings`, "GET", `${detail}/device-bindings`, `${label}关联设备`, "current", [...pages, "devices", "map", "overview", "add-device", "edit-device"],
    "设备发现、关联展示、绑定/解绑确认及归档前检查；不是设备所有权或分享权限的替代。", subjectSource);
  registerApi(`${type}Bind`, "POST", `${detail}/device-bindings`, `从${label}入口关联设备`, "published", [...pages, "add-device"],
    "当前 App 写入走 POST /app/device/bind。两入口是否业务等价、权限与重复绑定规则待后端确认。");
  registerApi(`${type}Unbind`, "DELETE", `${detail}/device-bindings/{bindingId}`, `从${label}入口解除关联`, "published", [...pages, "edit-device"],
    "当前 App 使用 DELETE /app/device/bind/{id}；不要混淆 bindingId、deviceId 与对象 ID。");
  registerApi(`${type}Shares`, "GET", `${detail}/shares`, `${label}分享关联检查`, "current", [...pages, "share"],
    "当前只用于归档前检查分享；不是邀请收件箱、共享对象详情或接受邀请入口。", subjectSource);
  registerApi(`${type}ShareCreate`, "POST", `${detail}/shares`, `创建${label}分享`, "published", [...pages, "share"],
    "App 尚未接入；Android 已写好请求代码（2026-10-10），页面尚未调用。此前独立 API 测试与管理 CRUD 测试，均不能当作 App 完整邀请流程验收。");
}

const deviceRows = [
  ["products", "GET", "/app/device/products", "可选产品", "current", ["add-device"], "绑定流程产品读取；按 productKey 识别产品。"],
  ["product", "GET", "/app/device/{deviceId}/product", "设备产品", "current", ["overview", "config", "edit-device", "add-device"], "云详情与绑定校验使用；不等同于旧 Manifest 接口。"],
  ["bindings", "GET", "/app/device/bindings", "对象关联关系核对", "current", ["add-device", "edit-device", "subject"], "带 bindType、bindToId 查询绑定关系，用于双视图确认；不是全局设备列表。"],
  ["bind", "POST", "/app/device/bind", "绑定设备到对象", "current", ["add-device"], "当前正式绑定入口；保存后分别读取对象和设备绑定视图确认。"],
  ["unbind", "DELETE", "/app/device/bind/{id}", "解除设备绑定", "current", ["edit-device", "subject"], "id 是绑定记录 ID。解除关联、设备归属、共享失效的业务边界须分别确认。"],
  ["state", "GET", "/app/device/{deviceId}/state", "设备状态", "current", ["devices", "map", "overview"], "读取在线状态；读取失败标记未知，不能当作离线。电量、信号和位置来自 realtime。"],
  ["realtime", "GET", "/app/device/{deviceId}/realtime", "最新定位与遥测", "current", ["devices", "map", "overview", "location"], "设备列表、地图和云详情读取电量、信号、位置及上报时间；不等于历史轨迹或定位下发已接入。"],
  ["deviceShares", "GET", "/app/device/{deviceId}/shares", "设备分享记录", "current", ["share", "overview", "edit-device"], "当前仅直接读取分享记录；不自动授予使用者档案访问权。"],
  ["resolveProduct", "GET", "/app/device/{manufacturer}/{brand}/product", "按厂商与品牌识别产品", "published", ["add-device"], "文档已声明，当前 App 未使用此路径。"],
  ["targets", "GET", "/app/device/targets", "候选绑定目标", "published", ["add-device"], "App 目前从 /app/subjects 选择自有 ACTIVE 对象；此接口返回范围待核对。"],
  ["bindSelf", "POST", "/app/device/bind-self", "绑定到本人", "published", ["add-device"], "当前 App 走显式对象绑定，不能将此路径当作同义替换。"],
  ["unbindSelf", "POST", "/app/device/unbind-devices", "批量解绑本人设备", "published", ["edit-device"], "当前 App 使用绑定 ID 单条解绑，此批量入口尚未接入。"],
  ["switchProduct", "POST", "/app/device/bind/{id}/switch-product", "切换绑定产品", "published", ["edit-device", "config"], "公开文档声明，App 未接入。"],
  ["deviceShareCreate", "POST", "/app/device/{deviceId}/shares", "创建设备分享", "published", ["share"], "App 未开放创建/接受/拒绝/撤销闭环；角色、范围、邀请状态及权限收口待确认。Android 已写好请求代码（2026-10-10），页面尚未调用，仍按“还没用”统计。"],
  ["propertyRead", "GET", "/app/device/{deviceId}/property", "读取设备属性", "published", ["config"], "HTTP 云配置 runtime 默认未启用；文档可见不代表已读写设备。Android 已写好请求代码（2026-10-10），页面尚未调用，仍按“还没用”统计。"],
  ["propertyWrite", "POST", "/app/device/{deviceId}/property", "写设备属性", "published", ["config"], "App 未接入此路径；需明确 ACK、读回、权限、幂等与失败语义。Android 已写好请求代码（2026-10-10），页面尚未调用，仍按“还没用”统计。"],
  ["function", "POST", "/app/device/{deviceId}/function", "调用设备功能", "current", ["config", "location"], "目前只用于云设备地图页的“立即定位”（functionId=singleLocating），成功只提示请求已受理，位置仍来自 realtime。其他功能未接入；设备实际执行结果、超时与重复请求规则待确认。"],
  ["events", "GET", "/app/device/{deviceId}/events", "设备事件", "published", ["messages", "alerts", "overview"], "未接入；不能直接当作 App 告警列表、推送或未读计数契约。"],
  ["appLocation", "POST", "/app/device/{deviceId}/app-location", "上报 App 位置", "published", ["location", "map"], "文档已声明，当前未接入此路径。"],
  ["alarmState", "POST", "/app/device/{deviceId}/alarm-state", "上报告警状态", "published", ["alerts", "messages"], "文档已声明，当前未接入；与消息已读、告警处置不预设等价。Android 已写好请求代码（2026-10-10），页面尚未调用，仍按“还没用”统计。"],
];
for (const [id, method, path, title, category, pages, note] of deviceRows) {
  registerApi(id, method, path, title, category, pages, note, category === "current" ? deviceSource : "");
}
apiRegistry.bind.client_contract = { request: { bindType: "String", bindToId: "Long", deviceId: "String", productKey: "String" }, response: "ApiResponse<JsonElement>；独立回读确认" };
apiRegistry.bindings.client_contract = { query: { bindType: "String", bindToId: "Long" }, response: "ApiResponse<List<AppDeviceBindingDto>>" };
apiRegistry.deviceShares.source = "core/remote/share/AppDeviceShareReadApiService.kt、RemoteAppDeviceShareReadRepository.kt";

for (const [id, suffix, title, pages, query, note] of [
  ["insightOverview", "overview", "设备概览指标与 AI 摘要", ["overview"], { date: "UTC 日期 YYYY-MM-DD", includeSummary: "先 false，规则返回后 true" }, "概览先显示规则结果，再补 AI 摘要；不随 15 秒基础轮询重复请求。"],
  ["insightHealth", "health", "设备健康趋势与 AI 分析", ["health"], { date: "UTC 日期 YYYY-MM-DD", period: "day / week / month", includeSummary: "先 false，再 true" }, "首次进入健康标签及切换周期读取；小时桶按手机时区显示，服务端时段与风险窗口问题仍待处理。"],
  ["insightAlerts", "alerts", "设备近期告警列表", ["overview", "alerts"], {}, "当前只读告警列表，不代表消息未读数、推送和告警处置已接入。"],
  ["insightAnalysis", "alerts/{alertId}/analysis", "设备告警 AI 解释", ["overview", "alerts"], { includeAi: "先 false，规则返回后 true" }, "打开单条告警时请求；AI 失败保留规则解释，不自动重试。"],
]) {
  registerApi(id, "GET", `/app/evaigc/devices/{deviceId}/${suffix}`, title, "current", pages,
    `${note} 既有记录仅范工环境提供，29999 未部署时按 404 降级。`,
    "core/remote/deviceinsight/DeviceInsightApiService.kt、RemoteDeviceInsightRepository.kt；feature/dashboard/ui/CloudDeviceInsightViewModel.kt",
    { query, response: "ApiResponse；校验业务响应和账号 / 环境上下文；告警解释另核对 alertId" });
  Object.assign(apiRegistry[id], {
    evidence_kind: "client_supplement", baseline: apiSupplementalBaseline,
    contract_status: "当前客户端已声明；不在原 37 项公开快照中",
    backend_scope: "按环境确认 /app/evaigc 部署；只读接入不等于统计口径或全部业务验收完成",
  });
}

function publicApi(id, method, path, title, pages, note, source, client) {
  registerApi(id, method, path, title, "current", pages, note, source, client);
}
publicApi("login", "POST", "/oauth2/token", "登录 / 刷新 Token", ["login", "security", "logout"],
  "password 与 refresh_token 两种 grant 已在认证链使用。字段来自客户端声明，当前公开文档未提供此路径。", "core/network/oauth/OAuthTokenApi.kt",
  { encoding: "application/x-www-form-urlencoded", headers: ["Authorization（值不导出）", "Enc-Flag", "skipTenant", "skipToken"], query: ["username（登录）", "grant_type", "scope"], form: ["password（登录，加密后）或 refresh_token（刷新）"], response: "OAuthTokenResponseDto：access_token / refresh_token / token_type / expires_in 等" });
publicApi("checkToken", "GET", "/token/check_token", "校验会话", ["login", "security"], "公开文档未见；认证链已使用。", "core/network/oauth/OAuthTokenApi.kt", { query: ["token（值不导出）"], response: "ApiResponse<JsonElement>" });
publicApi("logout", "DELETE", "/token/logout", "退出登录", ["logout", "security"], "当前 OAuth 退出入口；不能据此推定推送 token 注销也已完成。", "core/network/oauth/OAuthTokenApi.kt", { headers: ["Authorization（值不导出）"], response: "ResponseBody" });
publicApi("emailCode", "GET", "/sysMessage/send/app/emailCode", "发送邮箱验证码", ["register", "reset-password", "verification"],
  "GET 会发送邮件；registered 区分邮箱注册状态。原型不执行请求，验证码在最终提交时校验。", publicSource,
  { headers: ["App-Client-Id"], query: { email: "String", registered: "Boolean" }, response: "ApiResponse<JsonElement>" });
publicApi("register", "POST", "/register/user", "邮箱注册", ["register", "register-credentials"], "公共账号模块已接入；是否属于两个 App 分组之外的支持例外待后端确认。", publicSource,
  { headers: ["X-Client-Id"], body: ["username", "password", "email", "tenantId", "code", "registerType", "loginType"], response: "ApiResponse<JsonElement>" });
publicApi("reset", "POST", "/register/forget/{code}", "找回密码", ["reset-password", "reset-credentials"], "路径和请求体均含 code；新密码字段为 newpassword1。", publicSource,
  { headers: ["X-Client-Id"], path: ["code"], body: ["email", "newpassword1", "tenantId", "code", "registerType", "loginType"], response: "ApiResponse<JsonElement>" });
publicApi("password", "POST", "/register/password", "修改密码", ["security"], "已有公共账号调用；不沿用原型旧 /c/v1 建议路径。", publicSource,
  { headers: ["X-Client-Id"], body: { username: "String", password: "当前密码", newpassword1: "新密码" }, response: "ApiResponse<JsonElement>" });
publicApi("profile", "GET", "/user/info", "本人账号资料", ["account", "mine"], "账号资料与 PERSON/PET 档案是不同资源；公开响应包装与客户端解析需分别看待。", profileSource,
  { response: "客户端 AccountProfileResponse<AccountProfileDto>；只映射 userId/username/nickname/name/avatar/phone/email/tenantId/tenantName" });
publicApi("profileUpdate", "PUT", "/user/personal/edit", "保存本人资料", ["account"],
  "仅提交本人原 username 与有变化的 nickname/name/avatar；空串可用于清空。邮箱、手机号只展示。不能把 OpenAPI 的完整 UserDTO 当 App 可写字段清单。", profileSource,
  { body: "username（原值）+ 已变更的 nickname/name/avatar；不提交完整 UserDTO", response: "AccountProfileResponse<Boolean>；成功后独立 GET 回读" });
publicApi("upload", "POST", "/sys-file/upload", "上传头像", ["account", "subject", "person", "pet"],
  "客户端已用 multipart file；公开文档标为 application/json，存在差异，待后端修订。选择图片只预览，确认后才上传。", profileSource,
  { encoding: "multipart/form-data", part: "file（PNG/JPEG）", response: "AccountProfileResponse<Map<String,String>>；解析文件 URL" });
publicApi("avatar", "GET", null, "读取返回的头像地址", ["account", "subject", "person", "pet"],
  "地址来自接口返回；同源 /sys-file/oss/file、/sys-file/local/file/{fileName} 或受限的外部 HTTPS。公开性、有效期和孤儿文件清理待确认。", "core/ui/components/AvatarImageClient.kt",
  { url: "服务端返回的头像 URL，不是新增固定接口", authorization: "专用匿名客户端，不携带 Token；不跟随重定向" });
apiRegistry.avatar.contract_status = "动态返回 URL；并非新增固定业务接口";
publicApi("chatCreate", "POST", "/chat/create", "创建 AI 消息", ["chat"], "当前 AI 会话入口；根地址受配置/运行时环境影响。不能用 default 分组的 /ai/chat 直接替代。", "core/network/ai/AiAssistantApi.kt、AiAssistantClient.kt",
  { headers: ["Authorization（值不导出）", "TENANT-ID", "lang"], body: ["conversationId", "role", "content", "time", "modelName", "datasetId", "tenantId", "extDetails", "websearch", "inner"], response: "ApiResponse<String>，返回流读取 key" });
publicApi("chatStream", "GET", "/chat/msg/list", "读取 AI 消息流", ["chat"], "已接入真实流读取；与首页洞察、健康分析分别核对。", "core/network/ai/AiAssistantClient.kt", { query: ["key"], response: "流式响应，由客户端解析" });
publicApi("aiModels", "GET", "/aiModel/list", "深度模式模型列表", ["chat"], "深度模式选择模型时读取；本次公开文档未见准确路径。", "core/network/ai/AiAssistantApi.kt", { headers: ["Authorization（值不导出）", "TENANT-ID", "lang"], response: "ApiResponse<List<AiAssistantModelDto>>" });

for (const [id, path, title, pages, source, display] of [
  ["oldInsights", "/c/v1/ai/insights", "首页洞察旧请求", ["devices", "map"], "RemoteAiRepository.homeInsights：直接返回空列表", "首页本来没有洞察展示位，界面无变化"],
  ["oldUnread", "/c/v1/alerts/unread-count", "首页未读计数旧请求", ["devices", "map", "messages"], "RemoteAlertRepository.unreadAlertCount：抛出“不可用”，按可选区降级", "数量未知，设备页显示“—”和“告警暂不可用”，不显示 0"],
  ["oldTheme", "/c/v1/tenant/theme", "首页品牌主题旧请求", ["devices", "map", "mine"], "RemoteManifestRepository.currentBrandTheme：抛出“不可用”，按可选区降级", "“我的”品牌卡显示“默认品牌”"],
  ["oldQuick", "/c/v1/knowledge/quick-questions", "聊天快捷问题旧请求", ["chat"], "RemoteKnowledgeRepository.quickQuestions：直接返回空列表", "聊天页不显示推荐问题，AI 会话不受影响"],
]) registerApi(id, "GET", path, title, "retired", pages,
  `2026-10-12 起 Prod 不再发出此请求，对应 Retrofit 声明已删除。停用前固定机冷启动/进入聊天实测返回 404，停用后完整路径 0 次。页面：${display}。正式接口或确认不提供，待后端答复；见 TRIAL-17。`, source);

for (const [id, title, pages, note] of [
  ["shareFlow", "分享邀请完整流程", ["share", "messages"], "邀请收件箱、接受/拒绝、撤销、重发、权限变更缺少确认的 App 动作契约；不使用 ShareGrant 表 CRUD 拼接业务流程。"],
  ["shareRules", "分享角色与数据范围", ["share", "subject"], "现行资源类型 DEVICE/PERSON/PET；V0.1 的 SUBJECT 不能直接沿用。Entity 角色 OWNER/MANAGER/VIEWER 与 CreateShareRequest 的 ALERT_RECEIVER 描述冲突；scopes、过期及撤销规则待定。"],
  ["tracks", "历史轨迹", ["location"], "旧 Location Service 声明不代表普通 Prod 云详情开放；需要正式轨迹查询、时间范围和分页契约。"],
  ["geofences", "围栏与地点搜索", ["geofence", "location"], "原型可演示；当前 Prod 入口与真实业务未完整开放，不再将旧 /c/v1 路径作为现行契约。"],
  ["alerts", "告警、已读与处置", ["alerts", "messages", "ai"], "事件查询不自动涵盖消息列表、未读、已读或告警反馈，Prod 消息入口仍有门禁。"],
  ["deviceProfile", "设备资料和紧急联系人", ["edit-device"], "对象资料使用 PERSON/PET 路径；设备昵称、设备归属与紧急联系人需各自确认契约。"],
  ["configFlow", "配置执行、OTA 与结果确认", ["config"], "公开 property/function 与 App 配置执行是不同层；HTTP runtime 默认关闭，ACK、状态查询、读回与恢复需联调。"],
  ["oauth", "第三方登录与绑定", ["login", "security"], "原型交互需求；当前未确认第三方登录、账号绑定/解绑、登录设备和注销契约。"],
  ["notifications", "通知偏好与推送", ["notifications", "messages"], "旧推送 Service / UseCase 存在，但未确认主入口调用；通知偏好、token 生命周期和邀请推送需补齐。"],
  ["mapPreferences", "地区与地图服务偏好", ["map-settings"], "当前是本地偏好与 SDK 适配边界；是否需要服务器同步待产品/后端确认，不编造 HTTP 地址。"],
  ["service", "套餐、支付和发票", ["service"], "原型需求；没有本轮确认的 App 订阅、支付和发票接口。"],
  ["help", "帮助、协议与版本", ["h5", "about", "login"], "现有配置 URL / 本地资产与知识库旧实现分别存在；协议版本、H5 会话和 App 版本检查契约待确认。"],
  ["feedback", "意见反馈与人工服务", ["feedback", "chat"], "AI 聊天不能代替反馈工单；需求先保留，不预设路径和 DTO。"],
]) registerApi(id, null, null, title, "requirement", pages, note);

// 功能取舍与“App 用没用”是两个维度。这里只评估两个 App 分组的 37 个操作。
const apiNeedLabels = { keep: "需要保留", next: "后续补接", optional: "按功能选用", not_now: "当前不用" };
function setApiNeed(ids, code, reason) {
  ids.forEach(id => {
    apiRegistry[id].app_need = {
      code, label: apiNeedLabels[code], reason,
      basis: "按当前 App 与原型功能提出的建议，尚未经后端确认；当前不用不代表删除服务器接口。",
    };
  });
}
setApiNeed(["subjects", "personCreate", "personRead", "personUpdate", "petCreate", "petRead", "petUpdate"], "keep", "家人与宠物档案的列表、新增、查看和修改需要这些接口。");
setApiNeed(["personBindings", "petBindings", "products", "product", "bindings", "bind", "unbind"], "keep", "添加设备、选择使用者、展示关联设备及解绑时需要。");
setApiNeed(["state", "realtime"], "keep", "设备列表、地图和详情需要在线状态、最新位置与遥测数据。");
setApiNeed(["personShares", "petShares", "deviceShares"], "keep", "查看分享记录及归档前检查需要；对象分享读取目前只用于归档检查。");
setApiNeed(["personShareCreate", "petShareCreate", "deviceShareCreate"], "next", "分享家人、宠物或设备需要；先补齐邀请接收、接受、拒绝、撤销与权限规则。");
setApiNeed(["propertyRead", "propertyWrite"], "next", "远程查看和修改设备设置需要；先确认属性格式、执行结果和读回规则。");
setApiNeed(["function"], "next", "立即定位等设备操作需要；先确认命令参数、执行结果和超时处理。");
setApiNeed(["events"], "next", "设备事件与告警页面有用途；需要明确事件类型、时间范围、分页和返回字段，不能假定已覆盖所有历史数据。");
setApiNeed(["alarmState"], "next", "告警已读、未读和重要标记有用途；需后端确认是按当前用户还是全局保存状态。");
setApiNeed(["personBind", "petBind", "personUnbind", "petUnbind"], "optional", "与当前通用绑定/解绑入口用途重叠，暂不重复接；需先确认产品关联、权限和副作用是否一致。");
setApiNeed(["targets"], "optional", "目前从对象列表选择家人/宠物；如果此接口提供更准确的可绑定对象范围，再考虑替换。");
setApiNeed(["resolveProduct"], "optional", "需要按厂商、品牌、型号和固件自动识别产品时再接；手动选择产品暂不依赖它。");
setApiNeed(["bindSelf"], "optional", "做一键给自己使用时再接；文档说明会在缺少本人档案时自动创建，要先确定产品流程。");
setApiNeed(["unbindSelf"], "optional", "做批量解绑时再接；当前单台解绑已有入口。");
setApiNeed(["appLocation"], "optional", "需要手机代设备上报位置时再接，具体场景需后端确认；仅查看设备地图不需要此接口。");
setApiNeed(["switchProduct"], "not_now", "普通用户当前没有切换设备产品类型的功能；该接口会解绑并按新产品重新绑定，建议用于确认后的维护流程。");

const apiPageTitles = {
  login: "登录与会话", register: "邮箱注册", "reset-password": "找回密码", verification: "邮箱验证码",
  "register-credentials": "提交注册", "reset-credentials": "提交新密码", account: "本人账号资料",
  subjects: "家人与宠物档案", subject: "档案与设备关联", person: "人员资料", pet: "宠物资料",
  devices: "设备列表", map: "地图首页", overview: "设备详情", location: "定位与轨迹", health: "健康数据",
  alerts: "设备告警", config: "设备配置", messages: "消息与邀请", mine: "我的",
  "add-device": "添加设备", "edit-device": "设备管理", share: "设备分享", geofence: "安全围栏",
  chat: "AI 客服", ai: "AI 分析", logout: "退出登录", security: "账号安全", notifications: "通知设置",
  "map-settings": "地区与地图", service: "我的服务", feedback: "意见反馈", about: "关于与协议", h5: "帮助中心",
};
