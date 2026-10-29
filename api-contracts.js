// 人工核对层：公开文档不等于 App 已接入；更新时同时核对调用入口和运行门禁。
const apiBaseline = {
  reviewed_at: "2026-10-29",
  android_commit: "7e56f58",
  design: "2026-10-21 产品确认仅 DEVICE 设备分享；人员 / 宠物自有档案管理保留。V0.1 与 10-10 快照仅保留历史来源。",
  evidence: "已提交Android 7e56f58；AppCloudConfigContract、CloudParameterRules/CloudCollectionRules/CloudNetworkRules、AppFeatureAvailability、MineRoute、AppWebContentConfig及各专题调用链；10-28/29三批配置与工程动作记录",
  verification: "本轮逐篇静态核对14篇既有说明，补消息与设置专题；未提交的App界面调整未纳入稳定基线。未新增业务API、AI或设备操作；原37项OpenAPI快照与各历史声明来源基线保持，当前接入分类不等于业务已验收。",
  backend_scope: "后端同事说 App Device / App Subject 是给 App 使用的接口；账号、头像和 AI 的接口能否继续使用，以及服务器代码和版本，还需要后端确认。",
  base_url: "路径相对所选环境 API 根地址（可含 /api/admin 或 /admin）；AI 可被运行时环境覆盖",
};

const apiSupplementalBaseline = {
  reviewed_at: "2026-10-12", android_commit: "86fa2f9",
  scope: "新增 /app/evaigc 4 个只读接口，依据当前客户端声明；不属于 2026-10-10 的 37 项 OpenAPI 快照",
  evidence: "DeviceInsightApiService.kt、RemoteDeviceInsightRepository.kt、CloudDeviceInsightViewModel.kt；2026-10-12-设备健康告警AI分析App接入验证.md",
  verification: "既有记录：范工环境限定真机验证通过，29999 未部署时返回 404；本轮只核对代码和文档，未重新请求服务器。",
};

const apiAuthChatBaseline = {
  reviewed_at: "2026-10-23", android_commit: "a8ae598",
  scope: "复核现有登录 / 公共账号 8 项和 AI 客服 3 项；不新增服务器接口",
  evidence: "OAuthTokenApi.kt、OAuthSessionManager.kt、PublicAccountApi.kt、AuthFlowViewModel.kt；AiAssistantClient.kt、AiAssistantSseParser.kt、ChatViewModel.kt",
  verification: "本轮只核对代码与原型文档，未发邮件、注册、修改密码或请求 AI；不新增服务器或真机业务验收结论。",
};

const apiWorkflowBaseline = {
  reviewed_at: "2026-10-28", android_commit: "cfb1662",
  scope: "设备邀请 8 项声明、共享统一五标签与独立 scopes；property/function 同步最新读写和授权范围",
  evidence: "AppShareCreationApiService.kt、ShareInvitationApiService.kt、RemoteAppDeviceCloudConfigRepository.kt、RemoteAppDeviceFindCommandRepository.kt",
  verification: "仅文档与代码核对；既有 10-26 电话四开关八次、10-27 围栏四次 App 保存及 ACK/独立回读/恢复按原日期保留；10-28 共享入口、TRACK 与失权已验，真实共享写入、可信型号、蜂窝直连仍待验。用户反馈范工共享请求可通，81 未同步，本轮未重新请求服务器。",
};

const apiHistoryBaseline = {
  reviewed_at: "2026-10-28", android_commit: "cfb1662",
  scope: "历史事件 POST：日/月复用、坐标兼容与平滑回放、自有关系或共享 TRACK 授权及停留失权清空；独立于旧 37 项快照",
  evidence: "AppDeviceHistoryApi.kt、RemoteAppDeviceHistoryRepository.kt、HistoryTrackPolicy.kt、DeviceHistoryViewModel.kt、HistoryPlayback.kt；10-26 历史轨迹播放日历与模拟上报验证",
  verification: "既有记录：799 项测试、1.0.219 双包保数据安装、B 包高德中文页面与 71 点 SDK ACK/API/App 模拟验证通过；本轮仅整理发布说明，不新增业务验收。10-28 1.0.232 TRACK-only 共享读取既有71条并在停留页降权后清空通过；真实硬件移动、定位类型及共享真实写入另验。",
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
  "Prod 从自有 ACTIVE PERSON/PET 的绑定聚合设备；共享设备另由直接 DEVICE 授权发现。人员 / 宠物档案分享已排除产品范围。", subjectSource);
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
    "产品不需要人员 / 宠物档案分享，App 本地拒绝创建。保留公开契约用于识别历史范围，不再列为待补接功能；不自动删除服务器旧授权。");
}

const deviceRows = [
  ["products", "GET", "/app/device/products", "可选产品", "current", ["add-device"], "绑定流程产品读取；按 productKey 识别产品。"],
  ["product", "GET", "/app/device/{deviceId}/product", "设备产品", "current", ["overview", "config", "edit-device", "add-device"], "云详情与绑定校验使用；不等同于旧 Manifest 接口。"],
  ["bindings", "GET", "/app/device/bindings", "对象关联关系核对", "current", ["add-device", "edit-device", "subject"], "带 bindType、bindToId 查询绑定关系，用于双视图确认；不是全局设备列表。"],
  ["bind", "POST", "/app/device/bind", "绑定设备到对象", "current", ["add-device"], "当前正式绑定入口；保存后分别读取对象和设备绑定视图确认。"],
  ["unbind", "DELETE", "/app/device/bind/{id}", "解除设备绑定", "current", ["edit-device", "subject"], "id 是绑定记录 ID。解除关联、设备归属、共享失效的业务边界须分别确认。"],
  ["state", "GET", "/app/device/{deviceId}/state", "设备状态", "current", ["devices", "map", "overview"], "读取在线状态；读取失败标记未知，不能当作离线。电量、信号和位置来自 realtime。"],
  ["realtime", "GET", "/app/device/{deviceId}/realtime", "最新定位与遥测", "current", ["devices", "map", "overview", "location"], "设备列表、地图和云详情读取电量、信号、位置及上报时间；不等于历史轨迹或定位下发已接入。"],
  ["deviceShares", "GET", "/app/device/{deviceId}/shares", "设备分享记录", "current", ["share", "overview", "edit-device"], "仅直接 DEVICE，不开放使用者档案；10-28 接收者在 SHARE/MANAGER 下设备路径列表仍被拒，所有者正常。再分享可管理记录范围待确认。"],
  ["resolveProduct", "GET", "/app/device/{manufacturer}/{brand}/product", "按厂商与品牌识别产品", "published", ["add-device"], "文档已声明，当前 App 未使用此路径。"],
  ["targets", "GET", "/app/device/targets", "候选绑定目标", "published", ["add-device"], "App 目前从 /app/subjects 选择自有 ACTIVE 对象；此接口返回范围待核对。"],
  ["bindSelf", "POST", "/app/device/bind-self", "绑定到本人", "published", ["add-device"], "当前 App 走显式对象绑定，不能将此路径当作同义替换。"],
  ["unbindSelf", "POST", "/app/device/unbind-devices", "批量解绑本人设备", "published", ["edit-device"], "当前 App 使用绑定 ID 单条解绑，此批量入口尚未接入。"],
  ["switchProduct", "POST", "/app/device/bind/{id}/switch-product", "切换绑定产品", "published", ["edit-device", "config"], "公开文档声明，App 未接入。"],
  ["deviceShareCreate", "POST", "/app/device/{deviceId}/shares", "创建设备分享", "current", ["share"], "已接入设备分享管理：解析接收人后创建，随后回查发出记录；仅 DEVICE。10-28 独立 scopes/MANAGER 入口、TRACK-only 读取及失权有手机记录；真实共享写入、到期和未注册后注册仍待验。"],
  ["propertyRead", "GET", "/app/device/{deviceId}/property", "读取设备属性", "current", ["config", "geofence"], "Prod 正式 App property runtime 已启用，query property 选择完整组；同一物模型页面按网络 / 蓝牙选择读取渠道。历史 /c/v1 占位网关仍不启用。"],
  ["propertyWrite", "POST", "/app/device/{deviceId}/property", "写设备属性", "current", ["config", "geofence"], "已接入低电量、电源策略、短信前缀/开关、联系人、SOS/电话、14菜单普通参数、WiFi/Beacon/BLE/AGPS/闹钟、APN/服务器/时区及geoAlert。按白名单与槽位增量，串行预读冲突检查、保护未知成员、单次POST后独立GET；多组失败保留部分成功/待确认，不重放已完成组。上传组禁写、工作模式/心跳只读；参数保存不等于真实告警/呼叫或共享写入验收。"],
  ["function", "POST", "/app/device/{deviceId}/function", "调用设备功能", "current", ["config", "location", "overview"], "已接入 singleLocating、findMe、reboot、shutdown，body为{}；按自有关系或COMMAND授权、当前型号/渠道能力及动作专用确认判断。关机另需现场恢复确认，取消不下发。只显示后台受理，ACK、重连、声音和新GPS分开验收；恢复出厂禁用，OTA本期排除，不自动重发。"],
  ["events", "GET", "/app/device/{deviceId}/events", "设备事件（旧 GET 快照）", "published", ["messages", "alerts", "overview"], "保留 10-10 文档 GET 快照；10-23 实测该 GET 返回 405，当前历史查询改用单列的 POST。告警列表、推送与未读契约仍不能据此推定。"],
  ["appLocation", "POST", "/app/device/{deviceId}/app-location", "上报 App 位置", "published", ["location", "map"], "文档已声明，当前未接入此路径。"],
  ["alarmState", "POST", "/app/device/{deviceId}/alarm-state", "上报告警状态", "published", ["alerts", "messages"], "文档已声明，当前未接入；与消息已读、告警处置不预设等价。Android 已写好请求代码（2026-10-10），页面尚未调用，仍按“还没用”统计。"],
];
for (const [id, method, path, title, category, pages, note] of deviceRows) {
  registerApi(id, method, path, title, category, pages, note, category === "current" ? deviceSource : "");
}
apiRegistry.bind.client_contract = { request: { bindType: "String", bindToId: "Long", deviceId: "String", productKey: "String" }, response: "ApiResponse<JsonElement>；独立回读确认" };
apiRegistry.bindings.client_contract = { query: { bindType: "String", bindToId: "Long" }, response: "ApiResponse<List<AppDeviceBindingDto>>" };
apiRegistry.deviceShares.source = "core/remote/share/AppDeviceShareReadApiService.kt、RemoteAppDeviceShareReadRepository.kt";
apiRegistry.deviceShareCreate.source = "core/remote/share/AppShareCreationApiService.kt、RemoteAppShareCreationRepository.kt；feature/alert/ui/ShareManagementViewModel.kt";
apiRegistry.deviceShareCreate.client_contract = { body: "granteeUserId 或 inviteAccount；role、scopes、可选 expiresAt", response: "业务响应后独立回查发出记录；PERSON/PET 本地拒绝" };
apiRegistry.propertyRead.source = apiRegistry.propertyWrite.source = "core/remote/deviceconfig/RemoteAppDeviceCloudConfigRepository.kt；core/data/deviceconfig/AppCloudConfigContract.kt；feature/webview/DeviceConfigBridgeActions.kt";
apiRegistry.propertyRead.client_contract = { query: { property: "powerLowAlert / timeInterval / workMode / heartBeat / number / smsOption / sosOption / phoneOption / geoAlert" }, response: "data 内按组名取得完整对象或数组；字段无效不补默认" };
apiRegistry.propertyRead.note += " 10-27 指定设备四围栏网络保存/清除及恢复有四次成功ACK和独立API/HID记录；10-28共享CONFIG/GEOFENCE入口分开，属性GET因离线未闭环。原型读写仍仅内存演示。";
apiRegistry.propertyWrite.client_contract = { body: "完整原始参数组，只改当前已开放字段；geoAlert按变更槽位保存/清除并保留四位置，CONFIG/GEOFENCE分别校验", response: "POST 受理后独立 GET，核对目标值及同组未改字段" };
apiRegistry.function.source = "core/remote/location/RemoteAppDeviceLocationCommandRepository.kt；core/remote/devicecommand/RemoteAppDeviceFindCommandRepository.kt；feature/device/cloud/CloudDeviceDetailViewModel.kt";
apiRegistry.function.client_contract = { query: { functionId: "singleLocating / findMe" }, body: {}, response: "code=0、ok≠false、data 非空字符串；只算请求受理" };
for (const id of ['state', 'realtime']) apiRegistry[id].pages.push('share');
registerApi("historyEvents", "POST", "/app/device/{deviceId}/events", "历史位置事件（日查询 / 月日期标记）", "current", ["history", "location"],
  "query eventId=GeneralLocation；按日取轨迹、按月取有记录日期，复用同一正式接口。terms 的 timestamp 条件使用 JSON 数值毫秒；顶层 startTime/endTime 会被忽略。自有设备或有效TRACK共享完整分页后再展示；查询前后及后续页核对授权，停留页每15秒复核失权清空。",
  "core/remote/location/AppDeviceHistoryApi.kt、RemoteAppDeviceHistoryRepository.kt；feature/device/track/DeviceHistoryViewModel.kt",
  { query: { eventId: "GeneralLocation" }, body: { pageIndex: "从 0 开始", pageSize: "100", terms: "timestamp gte startMs / lt endExclusiveMs；值为 JSON 数值毫秒", sorts: "name=timestamp、order=asc" }, response: "ApiResponse：code=0、ok≠false；data 包含 records、total、pages、current、size，完整分页且身份/归属复核通过才返回" });
Object.assign(apiRegistry.historyEvents, { evidence_kind: "client_supplement", baseline: apiHistoryBaseline,
  contract_status: "当前 POST 声明与认证联调记录；不改写 10-10 的 GET 快照",
  backend_scope: "自有与TRACK-only共享查询已有记录；正式坐标/有效性/定位类型、真实移动与其他环境完整链仍待验" });
Object.assign(apiRegistry.events, { baseline: apiHistoryBaseline, contract_status: "旧 GET 快照；当前历史位置使用 POST，GET 实测 405" });
for (const id of ["subjects", "personBindings", "petBindings"]) apiRegistry[id].pages.push("history");
const shareWorkflowSource = "core/remote/share/AppShareCreationApiService.kt、ShareInvitationApiService.kt、RemoteShareInvitationRepository.kt；feature/alert/ui/ShareManagementViewModel.kt、ShareInvitationInboxViewModel.kt";
for (const [id, method, route, title, pages, note] of [
  ["shareGrantee", "GET", "/app/subjects/shares/grantee", "解析分享接收人", ["share"], "query account；registered 决定 granteeUserId / inviteAccount 分支，不虚构用户 ID。"],
  ["shareReceived", "GET", "/app/subjects/shares/received", "收到的设备邀请", ["share", "messages", "devices"], "App 过滤为 DEVICE，按当前接收人/ACCEPTED/未到期合并scopes；未注册邀请保留inviteAccount。统一详情逐项授权，失权清空，不从档案授权发现设备。"],
  ["shareGranted", "GET", "/app/subjects/shares/granted", "发出的设备邀请", ["share", "messages"], "当前账号全部发出记录；按 deviceId 和发起人过滤，写入后用它独立回查。"],
  ["shareAccept", "POST", "/app/subjects/shares/{shareId}/accept", "接受设备邀请", ["share", "messages"], "目标接收人处理有效待处理邀请；命令后重读列表确认，不提前报告已接受。"],
  ["shareReject", "POST", "/app/subjects/shares/{shareId}/reject", "拒绝设备邀请", ["share", "messages"], "使用 shareId，超时不自动重发；本地禁止处理旧 PERSON/PET 目标。"],
  ["shareRevoke", "DELETE", "/app/subjects/shares/{shareId}", "撤销设备授权", ["share"], "资源仍为 DEVICE；通用路径名称不表示提供人员分享。回查失权后清除受限数据。"],
  ["shareResend", "POST", "/app/device/{deviceId}/shares/{shareId}/resend", "重新邀请设备接收人", ["share"], "DEVICE 重发走设备路径；按当前状态校验并回查，不启用旧档案重发。"],
  ["shareUpdate", "PATCH", "/app/device/{deviceId}/shares/{shareId}", "修改设备分享权限与有效期", ["share"], "body role、scopes、expiresAt / clearExpiresAt；清除有效期显式传 clearExpiresAt，再回查确认。"],
]) {
  registerApi(id, method, route, title, "current", pages, note, shareWorkflowSource);
  Object.assign(apiRegistry[id], { evidence_kind: "client_supplement", baseline: apiWorkflowBaseline,
    contract_status: "当前客户端声明与既有联调记录；不在 10-10 原始快照中",
    backend_scope: "仅DEVICE；独立scopes/MANAGER入口和撤销清空有10-28记录，在线写入、可信型号、再分享、租户、到期与未注册后注册仍待确认" });
}

for (const [id, suffix, title, pages, query, note] of [
  ["insightOverview", "overview", "设备概览指标与 AI 摘要", ["overview"], { date: "UTC 日期 YYYY-MM-DD", includeSummary: "先 false，规则返回后 true" }, "概览先显示规则结果，再补 AI 摘要；不随 15 秒基础轮询重复请求。"],
  ["insightHealth", "health", "设备健康趋势与 AI 分析", ["health"], { date: "UTC 日期 YYYY-MM-DD", period: "day / week / month", includeSummary: "先 false，再 true" }, "首次进入健康标签及切换周期读取；小时桶按手机时区显示，服务端时段与风险窗口问题仍待处理。"],
  ["insightAlerts", "alerts", "设备近期告警列表", ["overview", "alerts", "ai"], {}, "当前只读告警列表，不代表消息未读数、推送和告警处置已接入。"],
  ["insightAnalysis", "alerts/{alertId}/analysis", "设备告警 AI 解释", ["overview", "alerts", "ai"], { includeAi: "先 false，规则返回后 true" }, "打开单条告警时请求；AI 失败保留规则解释，不自动重试。"],
]) {
  registerApi(id, "GET", `/app/evaigc/devices/{deviceId}/${suffix}`, title, "current", pages,
    `${note} 10-21 在 81 有中英文读取记录；原 29999 未部署时的 404 记录保留，不外推环境均可用。`,
    "core/remote/deviceinsight/DeviceInsightApiService.kt、RemoteDeviceInsightRepository.kt；feature/device/cloud/CloudDeviceInsightViewModel.kt",
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
  "password 与 refresh_token 两种 grant 已使用；取 Token 用 OAuth Basic 认证，不能套用业务 Bearer。字段来自客户端声明，公开文档未提供此路径。", "core/network/oauth/OAuthTokenApi.kt、OAuthSessionManager.kt",
  { encoding: "application/x-www-form-urlencoded", headers: ["Authorization: Basic（值不导出）", "Enc-Flag: false", "skipTenant: true", "skipToken: true", "X-TimeZone"], query: ["username（仅登录）", "grant_type=password / refresh_token", "scope"], form: ["password（登录，AES/CFB/NoPadding + Base64）或 refresh_token（刷新）"], response: "直接解析 OAuthTokenResponseDto；expires_in 为正数秒，登录必须含 refresh_token，刷新缺新串时保留原值" });
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
publicApi("profile", "GET", "/user/info", "本人账号资料", ["account", "mine", "login"], "登录 / 恢复后补齐本人资料；账号与 PERSON/PET 档案不同。资料暂时不可读不否定已建立的 OAuth 会话。", profileSource,
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
  { headers: ["Authorization: Bearer（值不导出）", "TENANT-ID", "lang", "X-TimeZone"], body: ["conversationId", "role", "content", "time", "modelName", "datasetId", "tenantId", "extDetails", "websearch", "inner"], response: "ApiResponse<String>；data 解析为 Long messageId，再作 SSE 查询 key，不是完整回答" });
publicApi("chatStream", "GET", "/chat/msg/list", "读取 AI 消息流", ["chat"], "已接入 SSE；完成、失败与用户停止分别处理，保留部分回答。与首页洞察、健康分析分别核对。", "core/network/ai/AiAssistantClient.kt、AiAssistantSseParser.kt、feature/chat/ui/ChatViewModel.kt", { headers: ["Authorization: Bearer（值不导出）", "TENANT-ID", "lang", "Accept: text/event-stream", "Cache-Control: no-cache", "X-TimeZone"], query: { key: "创建消息返回的 messageId" }, response: "SSE 纯文本 / JSON 兼容解析；回答与推理差量、工具、来源及完成信号" });
publicApi("aiModels", "GET", "/aiModel/list", "AI 默认模型列表", ["chat"], "所有模式按 Chat / Reason 类型选择服务端默认模型；进入聊天预取，环境 / 租户 / 用户缓存 10 分钟，失败可沿用旧缓存或兜底。公开快照未提供准确路径。", "core/network/ai/AiAssistantApi.kt、AiAssistantClient.kt、AiAssistantModels.kt", { headers: ["Authorization: Bearer（值不导出）", "TENANT-ID", "lang", "X-TimeZone"], response: "ApiResponse<List<AiAssistantModelDto>>；name、modelType、defaultModel；成功列表缺所需类型时明确报错" });

for (const id of ["login", "checkToken", "logout", "emailCode", "register", "reset", "password", "profile", "chatCreate", "chatStream", "aiModels"]) {
  apiRegistry[id].baseline = apiAuthChatBaseline;
}

for (const [id, path, title, pages, source, display] of [
  ["oldInsights", "/c/v1/ai/insights", "首页洞察旧请求", ["devices", "map"], "RemoteAiRepository.homeInsights：直接返回空列表", "首页本来没有洞察展示位，界面无变化"],
  ["oldUnread", "/c/v1/alerts/unread-count", "首页未读计数旧请求", ["devices", "map", "messages"], "RemoteAlertRepository.unreadAlertCount：抛出“不可用”，按可选区降级", "数量未知，设备页显示“—”和“告警暂不可用”，不显示 0"],
  ["oldTheme", "/c/v1/tenant/theme", "首页品牌主题旧请求", ["devices", "map", "mine"], "RemoteManifestRepository.currentBrandTheme：抛出“不可用”，按可选区降级", "“我的”品牌卡显示“默认品牌”"],
  ["oldQuick", "/c/v1/knowledge/quick-questions", "聊天快捷问题旧请求", ["chat"], "RemoteKnowledgeRepository.quickQuestions：直接返回空列表", "聊天页不显示推荐问题，AI 会话不受影响"],
]) registerApi(id, "GET", path, title, "retired", pages,
  `2026-10-12 起 Prod 不再发出此请求，对应 Retrofit 声明已删除。停用前固定机冷启动/进入聊天实测返回 404，停用后完整路径 0 次。页面：${display}。正式接口或确认不提供，待后端答复；见 TRIAL-17。`, source);

for (const [id, title, pages, note] of [
  ["shareRules", "设备分享剩余权限规则", ["share", "messages"], "仅 DEVICE，10-28 统一详情与独立 scopes/MANAGER 入口、TRACK及失权有记录。用户反馈范工共享请求可通，81待同步后复验；可信型号、共享写入、再分享、未注册后注册、到期和租户权限仍待验。不安排档案分享。"],
  ["tracks", "历史轨迹剩余字段与权限", ["history", "location"], "按日/月查询、日历与地图回放已接入 historyEvents，不缺整套轨迹接口。TRACK-only共享读取与失权已验；仍需正式坐标/有效性、定位类型及真实硬件移动验收。"],
  ["geofences", "围栏告警与剩余能力", ["geofence", "location"], "10-27 App 已接入 geoAlert GET/POST、四位置共用地图、网络保存/清除及独立回读；指定设备四次成功ACK与完整恢复通过。真实进出告警、BLE写入、手绘全流程及共享在线读写另验；名称/时间规则未开放，原型仍只操作合成数据。"],
  ["alerts", "告警、已读与处置", ["alerts", "messages", "ai"], "事件查询不自动涵盖消息列表、未读、已读或告警反馈，Prod 消息入口仍有门禁。"],
  ["deviceProfile", "设备资料和联系人剩余边界", ["edit-device"], "设备昵称正式来源仍待接入，按编号尾号回退；联系人号码保存/清空已接入并有10-28空槽往返记录。启用/SMS/来电翻转和实际号码过滤待真机验证；对象资料仍用PERSON/PET路径。"],
  ["configFlow", "配置执行与剩余结果确认", ["config"], "原22菜单按14/5/3批接入，113字段读取、工程寻机/重启/关机按10-29各自证据说明；上传组仍参数拒绝，工作模式/心跳只读，恢复出厂禁用，OTA本期排除。其余字段组合、共享在线保存、其他型号和蜂窝直连另验。"],
  ["oauth", "第三方登录与绑定", ["login", "security"], "原型交互需求；当前未确认第三方登录、账号绑定/解绑、登录设备和注销契约。"],
  ["notifications", "通知偏好与推送", ["notifications", "messages"], "原生POST_NOTIFICATIONS申请、系统通知设置跳转和返回状态重读已实现；FCM/HMS注册、Token生命周期、后台到达及告警已读/处置仍未闭环。Service/UseCase声明不代表生产入口已调用。"],
  ["mapPreferences", "地区与地图服务偏好", ["map-settings"], "当前是本地偏好与 SDK 适配边界；是否需要服务器同步待产品/后端确认，不编造 HTTP 地址。"],
  ["service", "套餐、支付和发票", ["service"], "原型需求；没有本轮确认的 App 订阅、支付和发票接口。"],
  ["help", "帮助、协议与版本", ["h5", "about", "login"], "Prod外部H5须显式配置合法HTTPS根地址并通过来源白名单；未配置则收起可选入口，协议保留不可用说明。内置设备配置不依赖帮助站点；协议版本、真实H5会话及版本检查仍待契约与验收。"],
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
setApiNeed(["deviceShareCreate"], "keep", "产品仅保留设备分享，创建、收发和处理已接入；其他权限和异常场景仍待验。");
setApiNeed(["personShareCreate", "petShareCreate"], "not_now", "产品明确不需要人员 / 宠物档案分享；App 本地拒绝，不作为后续补接项。");
setApiNeed(["propertyRead", "propertyWrite"], "keep", "统一配置已覆盖原22菜单的14/5/3批参数接入与113字段读取；完整组/槽位、串行和独立读回保护保留，上传组禁写、工作模式/心跳只读，不能据菜单覆盖推定全部字段业务验收。");
setApiNeed(["function"], "keep", "查找/定位与工程重启/关机已接入，按能力、COMMAND及动作确认判断；后台受理、设备ACK、重连与现场效果分层核对，恢复出厂继续禁用。");
setApiNeed(["events"], "not_now", "旧 GET 保留历史文档，当前测试返回 405；历史位置已走 POST，不再安排补接 GET。告警事件另确认类型和契约。");
setApiNeed(["historyEvents"], "keep", "历史轨迹按日查询与日历按月标记均复用这个 POST；地图、播放和筛选使用其完整记录。");
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
  devices: "设备列表", map: "地图首页", overview: "设备详情", location: "地图与立即定位", history: "历史轨迹", health: "健康数据",
  alerts: "设备告警", config: "设备配置", messages: "消息与邀请", mine: "我的",
  "add-device": "添加设备", "edit-device": "设备管理", share: "设备分享", geofence: "安全围栏",
  chat: "AI 客服", ai: "AI 分析", logout: "退出登录", security: "账号安全", notifications: "通知设置",
  "map-settings": "地区与地图", service: "我的服务", feedback: "意见反馈", about: "关于与协议", h5: "帮助中心",
};
