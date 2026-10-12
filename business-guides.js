// 业务说明的唯一内容源。接口方法与路径引用 apiRegistry，不从演示数据推断能力。
const businessGuides = {
  devices: {
    title: "设备列表技术说明",
    file: "device-list.html",
    reviewedAt: "2026-10-12",
    baseline: "28dda97",
    source: "RemoteAppDeviceReadRepository.kt / PrototypeDeviceCards.kt / CloudDeviceReadPolicy.kt",
    lead: "先查照护对象绑定的设备，再补状态和实时数据，由 App 组合成列表。",
    scope: "当前只查本人名下 ACTIVE 的人员和宠物；共享设备、未绑定设备不在这条链路中。",
    sections: [
      {
        id: "apis", title: "用哪些接口", summary: "5 个 GET 接口，复用公共请求头",
        apis: [
          ["subjects", "获取照护对象", "完整刷新时 1 次"],
          ["personBindings", "获取人员绑定的设备", "每个人员 1 次"],
          ["petBindings", "获取宠物绑定的设备", "每个宠物 1 次"],
          ["state", "获取在线状态", "每台设备 1 次"],
          ["realtime", "获取电量、信号、位置和上报时间", "每台设备 1 次"],
        ],
        notes: [
          "路径拼接在当前环境根地址后；联调环境根路径包含 `/admin`。",
          "公共请求头：`Authorization: Bearer <token>`、`X-TimeZone: Asia/Shanghai`（时区示例）。",
          "时区由公共网络层读取系统 IANA 地区时区；当前 Android 对 UTC、GMT、Etc/* 等值回退 Asia/Shanghai。不发送 UTC+8 或旧的 App-TimeZone。",
        ],
      },
      {
        id: "assembly", title: "列表怎么组合", summary: "筛对象 → 查绑定 → 合设备 → 补数据",
        steps: [
          ["筛对象", "`userId == 当前用户`、`status == ACTIVE`、类型为 PERSON / PET。"],
          ["查绑定", "用对象数字 ID 查询；返回的 `bindType`、`bindToId` 必须与请求对象一致。"],
          ["合设备", "按 `deviceId` 去重、合并使用者，按设备 ID 字典序排列。"],
          ["补数据", "读取 state，再读取 realtime，组合后展示卡片。"],
        ],
        example: "A 绑定 D1、D2，B 绑定 D1 → 显示 2 台设备；D1 的使用者是 A、B。",
        diagrams: [
          { title: "数据组合流程图", file: "device-list-flow.svg" },
          { title: "首次加载时序图", file: "device-list-sequence.svg" },
        ],
        notes: [
          "绑定记录的 `id` 不是 `deviceId`；`primaryDeviceId` 不能代替完整绑定列表。ID 使用无损字符串或 Int64，不经 Double 转换。",
          "设备详情传 deviceId；使用者详情传对象类型和数字 ID。同名对象也要按对象 ID 区分。",
        ],
      },
      {
        id: "fields", title: "卡片字段从哪里来", summary: "状态看 state，电量和位置看 realtime",
        fields: [
          ["设备标题、编号", "绑定的 deviceId", "当前未聚合昵称和产品名称，标题使用设备 ID。"],
          ["在线状态", "state.value", "online 在线；offline 离线；notactive 未激活；其他未知。"],
          ["电量", "generalData.battery", "0–100 显示百分比；0% 有效。"],
          ["定位方式", "generalData.isGPS", "true 显示 GPS；其他情况不自行推断 WiFi / LBS。"],
          ["信号", "generalData.signalSize", "显示原始值，不自行换算强 / 中 / 弱。"],
          ["位置", "latestLocation.lat / lng / locStatus", "有效坐标显示“位置已上报”；当前不显示地址。"],
          ["上报时间", "latestLocation.dateTime", "接受 12–13 位毫秒数或数字字符串，按手机时区显示；缺失显示“无上报时间”。"],
          ["使用者", "关联对象的 displayName", "保留每个关联对象及其详情入口。家人 / 宠物分类按对象类型判断。"],
          ["在线设备数", "当前分类内的设备状态", "显示在线数 / 总数；有未知状态或关系未确认时显示 —。"],
          ["待处理提醒", "当前列表未接入计数", "显示 —。"],
        ],
        notes: ["`generalData`、`latestLocation` 均来自 realtime。电量、信号等没有读取结果时显示“未读取”；读取成功但字段缺失时显示“未上报”。"],
      },
      {
        id: "refresh", title: "刷新和失败怎么处理", summary: "前台按轮刷新，失败不能当作离线",
        rules: [
          ["完整刷新", "重新查对象、绑定、state 和 realtime；绑定 / 解绑后也要更新关系。"],
          ["自动刷新", "前台更新已有设备的 state / realtime，每轮结束等待 15 秒；离页或进后台停止。各阶段最多并发 4 个任务，不重叠刷新。"],
          ["关系失败", "任一对象绑定读取失败、身份不符或同设备 productKey 冲突，整轮发现失败，不能展示为完整列表。"],
          ["状态失败", "保留设备，标记未知 / 未确认，不能直接当作离线。"],
          ["实时数据失败", "网络或 HTTP 408/429/5xx 可保留同账号旧读数并标记失败；鉴权、权限等不可保留错误不沿用旧遥测。"],
          ["暂无上报", "realtime 返回 `code=0、ok≠false、data=null` 时清除旧读数。"],
          ["连续失败与切账号", "连续 3 轮每台设备都至少有一项读取失败，暂停自动刷新，允许手动重试。账号、环境或请求版本变化后丢弃旧请求结果。"],
        ],
      },
      {
        id: "gaps", title: "哪些内容还要补", summary: "共享设备、展示资料、提醒数据",
        rules: [
          ["共享设备列表", "需确认共享发现范围、权限和撤销后的更新规则。"],
          ["设备展示资料", "昵称、产品型号、用途和位置地址尚未由当前聚合链路提供。"],
          ["提醒数据", "待处理数量、最近告警和处理状态尚未接入当前列表，需确认来源。"],
        ],
        notes: ["原型中的昵称、地址、提醒数字是演示数据。本说明记录 Android 实现，不代表本轮完成后端业务验收。"],
      },
    ],
  },
};

Object.assign(businessGuides, {
  subjects: {
    title: "照护对象技术说明", file: "subjects.html", pages: ["subjects", "subject", "person", "pet"],
    reviewedAt: "2026-10-12", baseline: "86fa2f9",
    source: "RemoteSubjectRepository.kt / SubjectProfileValues.kt / RemoteSubjectAvatarEditor.kt",
    lead: "人员和宠物共用管理流程，按类型调用接口；保存后回读详情和列表再更新界面。",
    scope: "资料写入仅开放给本人名下 ACTIVE 的 PERSON / PET。本人账号资料是另一类资源。",
    sections: [
      { id: "apis", title: "用哪些接口", summary: "列表 + 两类对象读写 + 关联检查", apis: [
        ["subjects", "读取照护对象列表", "进入管理页及保存后刷新"],
        [["personCreate", "petCreate"], "创建人员 / 宠物", "只发送一次 POST"],
        [["personRead", "petRead"], "读取对象详情", "进入详情、写入前后核对"],
        [["personUpdate", "petUpdate"], "修改资料、头像或归档", "按操作发送差量 PATCH"],
        [["personBindings", "petBindings"], "读取关联设备", "详情展示及归档前检查"],
        [["personShares", "petShares"], "检查分享关系", "当前用于归档前检查"],
        ["upload", "上传对象头像", "用户确认预览后上传"],
      ], notes: ["路径中的 personId / petId 是对象数字 ID。页面中的 PERSON:101 / PET:101 是带类型的标识，不能整个放进数值路径。"] },
      { id: "flow", title: "业务流程怎么走", summary: "列表 → 详情 → 编辑 → 回读", steps: [
        ["读取", "按人员 / 宠物筛选列表；点击对象后读取详情和关联设备，不用名称识别对象。"],
        ["新增", "校验表单，POST 一次；使用返回的对象 ID 查询详情，再查列表确认出现。"],
        ["编辑", "保存前重读详情，检查待改字段没有被其他入口修改；PATCH 差量后回读详情和列表。"],
        ["归档", "重新确认归属及状态，设备关联和分享记录均为空才允许提交 ARCHIVED；确认详情状态及列表移除。"],
      ], diagrams: [{ title: "照护对象操作流程", file: "subjects-flow.svg" }, { title: "编辑资料回读时序", file: "subjects-sequence.svg" }], notes: ["归档只提交 status=ARCHIVED，不自动解绑或撤销分享；任何分享记录非空都会阻止当前归档流程。"] },
      { id: "fields", title: "字段怎么提交", summary: "创建有 profile，编辑为顶层差量", fields: [
        ["创建公共部分", "type、displayName、profile", "未填写项省略；名称必填，PERSON / PET 必须与入口一致。"],
        ["身高与体重", "创建：profile.heightCm / weightKg；编辑：height / weight", "创建和 PATCH 不能直接复用同一个请求对象；宠物没有身高项。"],
        ["人员资料", "gender、birthDate、relationToOwner、healthMonitoringEnabled", "创建放 profile；编辑放根层。生日为 YYYY-MM-DD，false 不能当作未填写。"],
        ["宠物资料", "species、breed、gender、birthDate、neutered、activityTargetMinutes", "新增 species 必须选 DOG / CAT / OTHER；neutered 发送 1 / 0，数值 0 要保留。"],
        ["对象头像", "PATCH 顶层 avatarUrl", "先上传再保存返回地址，移除发送空串；与本人账号的 avatar 字段不同。"],
      ], notes: ["普通资料目前不支持清空已有值，不能把 null、空串和省略当成同一种操作。头像移除是单独实现的例外。"] },
      { id: "failure", title: "失败时怎么处理", summary: "不盲目重建、不覆盖其他人的修改", rules: [
        ["写入结果未确认", "请求超时或回查不一致时先刷新核对，不自动重发 POST / PATCH，也不能按名称猜测创建成功。"],
        ["编辑冲突", "待改字段与编辑基线不一致时停止保存，刷新后重新编辑。"],
        ["关联未确认", "设备或分享关系读取失败时阻止归档，不能把读取失败当作空列表。"],
        ["头像失败", "上传和保存地址分别确认；上传成功但资料保存失败，不等于头像已更新，也不自动删除服务器文件。"],
      ] },
      { id: "gaps", title: "哪些内容还要补", summary: "清空、恢复、共享与文件回收", rules: [
        ["尚未开放", "普通资料清空、备注、创建时选图上传、归档对象列表及恢复。"],
        ["后端待确认", "PET species 文档差异、共享对象可见范围、分享关系下的归档规则、上传文件回收。"],
      ], notes: ["对象头像沿用账号头像的图片校验与上传接口；新增 / 编辑 / 归档的既有验收范围见主仓库对应验证记录，本轮只整理说明。"] },
    ],
  },
  bindings: {
    title: "设备绑定与解绑技术说明", file: "device-binding.html", pages: ["add-device", "edit-device"],
    reviewedAt: "2026-10-12", baseline: "86fa2f9",
    source: "RemoteAppDeviceLifecycleRepository.kt / AppDeviceLifecycleApiService.kt / AppDeviceLifecycleModels.kt",
    lead: "选择产品和使用者后绑定设备；写入后从对象与通用绑定两个入口回查，结果一致才确认成功。",
    scope: "绑定目标是本人名下 ACTIVE 的人员或宠物。解绑解除一条关联，不等于删除设备或转移所有权。",
    sections: [
      { id: "apis", title: "用哪些接口", summary: "选对象、选产品、写入与双视图回查", apis: [
        ["subjects", "选择使用者", "筛出本人 ACTIVE 人员 / 宠物"],
        [["personRead", "petRead"], "核对使用者详情", "写入及回查前确认身份、归属、状态"],
        ["products", "读取可选产品", "按 productKey 选择，不能硬编码型号"],
        ["product", "读取已有设备的产品", "管理页先确认自有关系；不用于探测未绑定设备"],
        [["personBindings", "petBindings"], "读取对象侧设备关联", "与通用查询对照"],
        ["bindings", "读取通用绑定视图", "query：bindType、bindToId"],
        ["bind", "绑定设备", "一次 POST，随后回查"],
        ["unbind", "解除关联", "DELETE 路径传绑定记录 ID"],
      ], notes: ["当前写入使用 /app/device/bind 这组接口；人员 / 宠物路径下的绑定写入入口尚未接入，不混用。"] },
      { id: "flow", title: "业务流程怎么走", summary: "预检 → 写一次 → 两处查一致", steps: [
        ["准备", "取得 deviceId，读取产品及使用者。校验输入和目标，保留所选 productKey。"],
        ["绑定前检查", "已绑定其他对象时拒绝自动改绑；同一对象已存在且产品相同，只回查确认，不重复创建。"],
        ["绑定后确认", "POST 后分别查对象 device-bindings 和带条件的 /app/device/bindings，绑定记录及产品一致才刷新列表。"],
        ["解绑", "先核对原绑定记录，再 DELETE /bind/{id}；两处均确认该 bindingId 不存在后刷新关系。"],
      ], diagrams: [{ title: "绑定与解绑流程", file: "binding-flow.svg" }, { title: "绑定后双视图回查时序", file: "binding-sequence.svg" }] },
      { id: "fields", title: "参数怎么区分", summary: "deviceId、bindingId、对象 ID 各有用途", fields: [
        ["deviceId", "设备标识 String", "当前校验为 1–128 位字母、数字、下划线或连字符；不要自行当作数值解析。"],
        ["bindType", "PERSON / PET", "与选择的使用者类型保持一致。"],
        ["bindToId", "对象数字 ID（Long）", "来自人员 / 宠物资料，不传 PERSON:101 这样的组合值。"],
        ["productKey", "可选产品返回值", "与选中的产品一致，不把产品名称或型号当作 key。"],
        ["bindingId", "绑定记录的 id", "由查询结果取得，专用于核对和解绑，不等于 deviceId。"],
      ] },
      { id: "failure", title: "失败时怎么处理", summary: "明确拒绝与结果未确认分开展示", rules: [
        ["服务端拒绝", "保留可理解的拒绝提示，不继续进入成功页面。"],
        ["写入后超时 / 断网", "不能认定服务器没执行；进入结果未确认状态，先重新查询绑定关系，不自动重放写入。"],
        ["两个视图不一致", "记录重复、数量或内容不一致都不能确认成功，不从部分结果推断关系。"],
        ["账号或环境变化", "终止当前确认流程，丢弃旧上下文结果；不要把前一账号的关联写入当前列表。"],
      ] },
      { id: "gaps", title: "哪些内容还要补", summary: "扫码实机、异常链与所有权规则", rules: [
        ["仍需真机验证", "扫码入口、新版拒绝提示、断网后写入回查及真实硬件持续上报。"],
        ["后端待确认", "改绑 / 转移所有权、共享关系失效等规则。不能从解绑成功自动推定这些操作已完成。"],
      ] },
    ],
  },
  overview: {
    title: "设备详情技术说明", file: "device-detail.html", pages: ["overview", "health", "alerts"],
    reviewedAt: "2026-10-12", baseline: "86fa2f9",
    source: "RemoteAppDeviceReadRepository.kt / RemoteDeviceInsightRepository.kt / CloudDeviceInsightViewModel.kt",
    lead: "设备基础状态与健康告警分开读取；基础信息先显示，规则结果返回后再补 AI 内容。",
    scope: "先确认设备仍属于当前账号可访问的自有对象。健康 / 告警已接入，是否有数据取决于所选环境。",
    sections: [
      { id: "apis", title: "用哪些接口", summary: "基础数据 + 产品 + 分享只读 + 分析", apis: [
        [["state", "realtime"], "在线状态、定位和遥测", "复用设备列表发现及读取链路"],
        ["product", "设备产品资料", "确认关系后读取，可单独降级"],
        ["deviceShares", "设备直接分享记录", "只读，不代表邀请操作开放"],
        ["insightOverview", "概览指标与摘要", "先 includeSummary=false，再 true"],
        ["insightHealth", "日 / 周 / 月健康数据", "首次进入或切换周期时读取"],
        ["insightAlerts", "近期告警列表", "进入设备后读取"],
        ["insightAnalysis", "单条告警解释", "打开告警后先 includeAi=false，再 true"],
      ], notes: ["新增分析接口来自当前客户端声明，不在原 37 项 App Device / App Subject 快照中。原有 /events 与这组告警读取接口不是同一入口。"] },
      { id: "flow", title: "页面怎么加载", summary: "确认关系 → 基础信息 → 规则 → AI", steps: [
        ["确认设备", "以 deviceId 查当前对象关联；不能因为 state / realtime 能访问就认定拥有该设备。"],
        ["填充基础区域", "展示状态、遥测、使用者和产品；各区域独立保留加载、空数据和失败状态。"],
        ["读取分析", "读取概览和告警列表。概览先展示规则结果，再请求 AI；健康首次进入标签才读取。"],
        ["按交互补充", "切换健康周期重新读取；点告警后请求该 alertId 的规则解释及 AI，关闭时取消解释请求。"],
      ], diagrams: [{ title: "设备详情分区加载流程", file: "detail-flow.svg" }, { title: "规则先显示再补 AI 时序", file: "detail-sequence.svg" }] },
      { id: "fields", title: "每个区域展示什么", summary: "缺失值留空，不用演示数填充", fields: [
        ["在线 / 电量 / 位置", "state、realtime", "沿用设备列表规则；状态未知不能显示离线，电量 0% 不能丢弃。"],
        ["产品与使用者", "product + 对象绑定", "产品信息和关联对象分别读取；设备昵称不因 productName 存在而自动获得。"],
        ["概览与健康指标", "metrics 的 value / unit / available", "使用服务端单位与可用标记；没有值显示 —，不补零。"],
        ["健康趋势", "trend.points、period、date", "日 / 周 / 月分别读取；date 当前按 UTC 日期，小时桶转换为手机时区展示。"],
        ["告警", "alerts 的 alertId、timeMillis、risk", "按实际返回展示；告警解释使用同一设备与 alertId，不等于推送或已读状态。"],
        ["AI 摘要 / 解释", "summary / analysis、risk", "AI 返回后替换同一请求区域；失败保留已有规则结果，不编造分析。"],
      ] },
      { id: "refresh", title: "刷新和失败怎么处理", summary: "基础轮询与 AI 请求分开", rules: [
        ["基础数据", "前台每轮结束约 15 秒后刷新 state / realtime；离页或后台停止。更新不重建地图或强制复位视野。"],
        ["分析数据", "不跟随 15 秒轮询反复请求 AI。手动刷新重读概览、告警及已打开过的健康区域。"],
        ["环境未部署", "404 显示环境未提供；拒绝或返回无效时清除受限结果，不把缺数据解释成健康正常。"],
        ["读取慢或失败", "规则先显示，AI 独立等待；AI 失败不自动重试。普通网络失败可保留同设备上次结果并标记失败。"],
        ["切换设备 / 账号", "取消旧请求，并核对设备、账号和环境后才接收响应，避免旧结果覆盖新页面。"],
      ] },
      { id: "gaps", title: "哪些内容还要补", summary: "部署差异、统计口径和业务写入", rules: [
        ["环境差异", "既有记录中范工环境可读取分析接口，29999 未部署时返回 404；本轮未重新测试服务器。"],
        ["服务端问题", "健康分析时段、风险窗口口径及定位距离异常待处理；不能把当前 AI 输出视为已校准结论。"],
        ["尚未形成完整流程", "真实设备持续移动、分享操作、告警处置与推送、轨迹围栏和云配置。定位读取与指令见地图说明。"],
      ] },
    ],
  },
  location: {
    title: "地图与立即定位技术说明", file: "device-location.html", pages: ["map", "location"],
    reviewedAt: "2026-10-12", baseline: "86fa2f9",
    source: "CloudDeviceMapPresentation.kt / MapEngine.kt / RemoteAppDeviceLocationCommandRepository.kt",
    lead: "地图显示设备最后一次有效上报；立即定位只发指令，新的位置仍从 realtime 获取。",
    scope: "首页聚合自有设备点，详情显示单台设备。当前不把最后位置当作持续实时追踪。",
    sections: [
      { id: "apis", title: "用哪些接口", summary: "读取位置和下发指令分开", apis: [
        ["subjects", "发现当前使用者", "设备发现流程复用设备列表"],
        [["personBindings", "petBindings"], "获取关联设备", "按 deviceId 合并后读取"],
        ["realtime", "读取最后位置及时间", "首页和设备地图更新位置的来源"],
        ["state", "显示在线状态", "在线状态与位置时间分别判断"],
        ["function", "发送立即定位", "query：functionId=singleLocating；JSON body：{}"],
      ], notes: ["立即定位入口在云设备详情地图中；首页不自动向全部设备发送指令。"] },
      { id: "flow", title: "位置和指令怎么组合", summary: "读取绘点；点击定位后等待设备上报", steps: [
        ["发现设备", "复用对象 → 绑定 → deviceId 的链路，确认单台详情的设备关系。"],
        ["判断位置", "校验 latestLocation 坐标、定位状态及同次上报时间；未取得有效位置时显示空态。"],
        ["绘制地图", "原始坐标按当前地图服务转换一次，标记、相机和覆盖物采用一致坐标系。"],
        ["立即定位", "确认自有关系，POST 一次；受理后提示已发起请求，继续通过实时数据读取设备实际回传。"],
      ], diagrams: [{ title: "位置读取与绘制流程", file: "location-flow.svg" }, { title: "立即定位与后续读取时序", file: "location-sequence.svg" }] },
      { id: "fields", title: "位置字段怎么用", summary: "坐标、状态和时间要一起判断", fields: [
        ["坐标", "latestLocation.lat / lng", "必须是有限 JSON 数值，纬度 −90～90、经度 −180～180；数值字符串不接受，不使用演示点补位。"],
        ["定位状态", "latestLocation.locStatus、generalData.isGPS", "locStatus 不能为 x（不区分大小写），且 isGPS 必须为 true；不能把非 GPS 自动标成 WiFi 或 LBS。"],
        ["上报时间", "latestLocation.dateTime 与 generalData.dateTime", "两者必须是有效且相同的毫秒时间；当前接受 12–13 位数值或数字字符串，范围为 2000～2100 年。"],
        ["坐标系统", "latestLocation.coordinateSystem", "缺字段才默认 WGS84；明确 null 或未知值不绘点。接受 WGS84 / GCJ02（含连字符形式），按地图服务转换一次；默认仍待后端确认。"],
        ["指令响应", "code=0、ok≠false、data 为非空字符串", "仅确认服务端受理；不代表设备已执行、定位成功或位置已更新。"],
      ] },
      { id: "refresh", title: "刷新和失败怎么处理", summary: "保持视野，不重发结果不明的指令", rules: [
        ["刷新位置", "前台轮询已有设备，离页 / 后台停止；正常数据更新保持用户拖动或缩放后的视野。"],
        ["主动回位", "只有明确的回到设备操作才主动调整视野；切换地图服务时重新按服务坐标规则绘制。"],
        ["指令拒绝", "服务端明确离线或拒绝时给出对应反馈，不能用成功 Toast 掩盖失败。"],
        ["指令结果不明", "超时、断网、响应不完整时不自动重发；按钮并发调用不排队，避免后续补发重复指令。"],
        ["旧位置", "允许展示有明确时间的最后上报，不推算移动；鉴权拒绝和关系失效后不继续沿用受限数据。"],
      ] },
      { id: "gaps", title: "哪些内容还要补", summary: "坐标契约、执行结果、轨迹与围栏", rules: [
        ["后端待确认", "正式坐标系、时间类型及单位、立即定位的设备执行结果与超时规则。"],
        ["尚未验证完整", "真实硬件持续移动、轨迹、围栏和 Google 卫星图；原型轨迹与围栏不能作为已接入依据。"],
      ] },
    ],
  },
  account: {
    title: "账号资料与头像技术说明", file: "account-profile.html", pages: ["account"],
    reviewedAt: "2026-10-12", baseline: "86fa2f9",
    source: "RemoteAccountRepository.kt / RemoteAccountProfileGateway.kt / AccountAvatarSource.kt",
    lead: "本人资料只修改昵称、姓名和头像；保存时发送变化字段，完成独立回读后才更新页面。",
    scope: "这里是登录账号本人，不是家人 / 宠物档案。邮箱和手机号仅展示，不能直接套用完整 UserDTO 写入。",
    sections: [
      { id: "apis", title: "用哪些接口", summary: "读资料、写资料、上传及读取头像", apis: [
        ["profile", "获取本人资料", "进入页面、保存前及保存后读取"],
        ["profileUpdate", "保存变化字段", "原 username + nickname / name / avatar 差量"],
        ["upload", "上传图片", "multipart/form-data，part 名称 file"],
        ["avatar", "展示返回头像", "动态返回 URL，使用不带 Token 的图片客户端"],
      ], notes: ["上传的实际调用为 multipart；公开文档中的 application/json 声明仍有差异。头像地址按环境和允许的来源校验，不向任意图片地址附带登录 Token。"] },
      { id: "flow", title: "保存和上传怎么走", summary: "读基线 → 编辑 / 上传 → 保存 → 回读", steps: [
        ["加载资料", "GET /user/info，保存当前账号、环境、username 及字段基线。"],
        ["编辑与预览", "昵称 / 姓名单项编辑；图片先本地预览，确认后才读取文件并上传。取消不发送保存请求。"],
        ["提交变化", "保存前重读资料以发现冲突；头像先上传取得地址，再 PUT 原 username 和变化字段。"],
        ["确认成功", "再次 GET /user/info，逐项核对本次变化；一致后更新资料页及“我的”展示。"],
      ], diagrams: [{ title: "账号资料保存流程", file: "account-flow.svg" }, { title: "头像上传与资料回读时序", file: "account-sequence.svg" }] },
      { id: "fields", title: "哪些字段可以改", summary: "三字段限写，保留原 username", fields: [
        ["昵称", "nickname", "当前客户端最多 80 个字符；空串可清空，不能用页面显示的兜底姓名覆盖原值。"],
        ["姓名", "name", "当前客户端最多 80 个字符；只提交本次变化，空串与 null 分别处理。"],
        ["头像", "avatar", "保存服务器返回的合法地址；移除发送空串。照护对象接口对应字段则是 avatarUrl。"],
        ["用户名", "username", "带上保存前回读的本人原值；这是写入所需字段，不提供改用户名入口。"],
        ["只读信息", "email、phone 等", "显示已有信息，不提交手机号、邮箱、地区、联系人或完整 UserDTO。"],
        ["图片限制", "PNG / JPEG，最多 5 MiB", "校验文件签名、MIME 和解码尺寸；单边最多 8192、总像素最多 3200 万，当前不自动压缩。"],
      ] },
      { id: "failure", title: "失败时怎么处理", summary: "上传成功不等于资料保存成功", rules: [
        ["冲突", "待改字段或 username 与编辑基线不同，停止提交并要求刷新，避免覆盖其他入口的修改。"],
        ["保存未确认", "写入后超时、取消或回读不一致时先刷新资料，再允许继续保存，不自动重放写入。"],
        ["头像部分成功", "已经确认上传的地址可在同一上下文复用；上传本身未确认时不盲目重传同一图片。"],
        ["切账号或环境", "请求前后核对身份，清理或隔离缓存；旧账号头像不能写入新账号。"],
      ] },
      { id: "gaps", title: "哪些内容还要补", summary: "可写白名单、异常链与文件回收", rules: [
        ["接口问题", "后端仍需明确公共资料接口的 App 使用范围；缺 username、非空 phone 的错误及清空语义需修正 / 确认。"],
        ["文件策略", "头像公开读取、地址有效期、替换后的旧图及上传后未引用文件的回收规则待确认。"],
        ["验收边界", "本人头像的 JPEG、真实弱网和过期会话异常尚未完成真机验收；不能将客户端格式支持等同于端到端通过。"],
      ] },
    ],
  },
  login: {
    title: "登录与账号安全技术说明", file: "login-security.html",
    pages: ["login", "register", "reset-password", "verification", "register-credentials", "reset-credentials", "security", "logout"],
    reviewedAt: "2026-10-12", baseline: "f5ffd2a",
    source: "OAuthTokenApi.kt / OAuthSessionManager.kt / TokenRefreshInterceptor.kt / PublicAccountClient.kt / AuthFlowViewModel.kt",
    lead: "登录先建立 OAuth 会话；注册和找回密码在最终提交时校验验证码，完成后返回登录页。",
    scope: "覆盖密码登录、会话恢复、注册、找回 / 修改密码及退出。本人资料编辑另见账号资料说明。",
    sections: [
      { id: "apis", title: "用哪些接口", summary: "OAuth 会话 + 公共账号接口", apis: [
        ["login", "登录或刷新 Token", "同一路径，切换 grant_type；响应直接是 Token 对象"],
        ["checkToken", "显式校验当前会话", "按需调用；启动恢复不逐次请求此接口"],
        ["profile", "登录后补齐本人资料", "资料暂时不可读不否定已建立的会话"],
        ["emailCode", "发送注册 / 找回验证码", "registered=false 注册，true 找回；GET 会发送邮件"],
        [["register", "reset", "password"], "注册、找回和修改密码", "分别使用对应请求体，不共用登录表单"],
        ["logout", "退出当前登录", "请求远程退出，同时清理本地会话与当前对象选择"],
      ], notes: [
        "OAuth 登录 / 刷新使用配置生成的 Basic Authorization，以及 Enc-Flag=false、skipTenant=true、skipToken=true。业务 Bearer 头不能直接套用到取 Token 请求。",
        "登录密码按当前 PasswordEncryptor 的 AES/CFB/NoPadding → Base64 处理；密钥 / IV 不写入文档。注册、找回、改密当前直接按各自 JSON DTO 传参，不能自行套用登录加密。",
        "发码使用 App-Client-Id，注册 / 密码接口使用 X-Client-Id；所有客户端统一带 IANA 格式的 X-TimeZone。",
      ] },
      { id: "flow", title: "业务流程怎么走", summary: "建会话 / 恢复会话，与验证码流程分开", steps: [
        ["密码登录", "校验输入，POST grant_type=password；校验 Token 响应，保存会话后读取 /user/info，再进入首页。"],
        ["启动恢复", "等待本地会话读取完成。有 Token 且到期时间超过当前 60 秒时直接恢复；否则使用 refresh_token 续期。"],
        ["注册 / 找回", "邮箱发码 → 输入 4 位码 → 填账号 / 新密码 → 最终 POST。验证码页只校验格式，没有独立验证码校验请求。"],
        ["修改密码", "使用当前会话的 username、原密码和新密码；成功后走退出流程，清理登录导航并要求重新登录。"],
        ["退出", "二次确认后请求 /token/logout；普通远程失败仍清理当前本地会话，旧退出回包不能清掉后来建立的新会话。"],
      ], diagrams: [{ title: "启动与会话恢复流程", file: "auth-session-flow.svg" }, { title: "注册与找回密码时序", file: "auth-code-sequence.svg" }], notes: [
        "注册 / 找回完成后返回登录页并预填账号，不自动当作已经登录。刷新 Token 缺新 refresh_token 时保留原值。",
      ] },
      { id: "fields", title: "参数怎么提交", summary: "query、表单和 JSON 各用各的", fields: [
        ["OAuth 登录", "query：username、grant_type=password、scope；表单：password", "application/x-www-form-urlencoded；username 是登录账号，不用昵称替代。"],
        ["OAuth 刷新", "query：grant_type=refresh_token、scope；表单：refresh_token", "刷新串放表单；access_token / expires_in 必须有效，expires_in 单位为秒，再换算 expiresAtMs。"],
        ["注册", "username、password、email、tenantId、code、registerType、loginType", "当前 registerType=EMAIL、loginType=PWD；租户来自调用配置，不由输入表单任意指定。"],
        ["找回 / 改密", "找回：email、code、newpassword1 等；改密：username、password、newpassword1", "找回路径 code 与 JSON code 一致；改密 username 取会话原值，不把邮箱当成已确认 username。"],
        ["表单校验", "username、password、confirmPassword、acceptedAgreement", "注册用户名 4–20 位字母数字下划线；新密码至少 8 位且含大小写与数字；确认密码、协议勾选只用于本地校验。"],
        ["发码节流", "4 位验证码，60 秒重发倒计时", "倒计时从发码成功开始；真实有效期、错误次数和频率限制仍由服务端确定。"],
      ], notes: [
        "公共命令接口按业务包装判定成功，data=null 不单独视为失败；OAuth Token 响应不能套用 ApiResponse 的解析器。",
      ] },
      { id: "failure", title: "失败时怎么处理", summary: "明确失效才清会话，写入不自动重放", rules: [
        ["恢复失败", "刷新明确拒绝或没有 refresh_token 时清当前会话并回登录；临时网络 / 服务端失败保留会话，界面仍可进入，业务区域提示失败与重试。"],
        ["读取遇到过期", "普通网络层只对 GET / HEAD 的 HTTP 401 或约定的 token expired 424 刷新；同一会话的并发刷新合并，成功后重发该读取一次。"],
        ["写入遇到过期 / 超时", "POST / PUT / PATCH / DELETE 不套用自动刷新重放；结果不明时先核对，避免重复注册、修改或发送业务指令。"],
        ["验证码错误", "最终提交提示验证码错误 / 过期时返回验证码步骤，保留账号表单；其他错误留在当前步骤，发送和提交期间禁用重复点击。"],
        ["切账号 / 环境", "刷新保存与退出清理核对会话版本，过时回包不覆盖新登录。Token、密码、验证码及客户端密钥不进入导出或日志。"],
      ] },
      { id: "gaps", title: "哪些内容还要补", summary: "公共接口契约、第三方功能与异常验收", rules: [
        ["后端待确认", "公共账号接口的 App 使用范围、OAuth / 加密参数、验证码有效期及限流错误码、多终端会话撤销规则。"],
        ["尚未接入", "第三方登录 / 绑定、账号注销、登录设备管理；原型对应按钮不能作为正式能力依据。"],
        ["验证边界", "注册 / 找回已有用户实测记录；本轮只对照代码整理，未发邮件或修改密码。过期、弱网、切账号等分支仍需按当前制品真机验收。"],
      ] },
    ],
  },
  chat: {
    title: "AI 客服技术说明", file: "ai-chat.html", pages: ["chat"],
    reviewedAt: "2026-10-12", baseline: "f5ffd2a",
    source: "AiAssistantClient.kt / AiAssistantSseParser.kt / ChatRepository.kt / ChatViewModel.kt / ChatConversationSessionStore.kt",
    lead: "先创建问题取得 messageId，再用 SSE 逐段接收回答；停止、失败和完成分别处理。",
    scope: "说明通用客服会话。设备概览、健康和告警的 AI 分析已在设备详情说明中，使用另一组接口。",
    sections: [
      { id: "apis", title: "用哪些接口", summary: "选模型 → 创建消息 → 读取 SSE", apis: [
        ["aiModels", "读取当前默认模型", "进入聊天预取；发送时按缓存情况再读取"],
        ["chatCreate", "创建用户问题", "POST 返回 messageId 字符串，不是完整回答"],
        ["chatStream", "读取该问题的回答流", "query：key=messageId；Accept: text/event-stream"],
      ], notes: [
        "请求使用当前环境地址、Bearer Token、TENANT-ID、lang 和 X-TimeZone；租户来自 AI 配置，lang 每次读取 App 当前语言。",
        "模型列表按环境 / 租户 / 用户缓存 10 分钟。根据模式选择 Chat 或 Reason 类型，优先服务端 defaultModel，再选该类型首个模型。读取失败可用旧缓存 / 内置兜底；成功列表缺所需类型则明确提示不可用。",
      ] },
      { id: "flow", title: "一条消息怎么完成", summary: "占位 → POST → SSE → 更新当前气泡", steps: [
        ["准备会话", "每种模式维护独立 conversationId、输入和消息；同一模式已有请求时禁止再次发送，创建用户消息和等待中的回答占位。"],
        ["创建问题", "选择模型并提交 /chat/create；先判 HTTP 和业务响应，再把 data 解析为 Long messageId，用其字符串值作为流读取 key。"],
        ["读取回答", "打开 SSE，将回答、推理、工具和来源映射为不同事件；只更新该模式、该回答占位，不重复创建气泡。"],
        ["收尾", "完成转为已结束；网络失败保留已收内容并标失败。用户停止或离开页面取消流，保留内容并标 STOPPED。"],
      ], diagrams: [{ title: "AI 消息处理流程", file: "chat-flow.svg" }, { title: "创建消息与流式回答时序", file: "chat-sequence.svg" }], notes: [
        "切换模式只切换展示，旧模式请求可以继续；退出聊天或更换设备 / 告警入口时停止全部模式请求。",
      ] },
      { id: "fields", title: "字段和事件怎么用", summary: "会话 ID、消息 ID 和模式分开", fields: [
        ["会话与消息", "conversationId；POST 返回 data → messageId → GET key", "conversationId 当前按模式生成 UUID 会话串；messageId 不是本地气泡 ID。数值 ID 保持无损，不经浮点数转换。"],
        ["问题内容", "role=user、content、time、modelName", "content 去首尾空白；time 按手机时区生成 yyyy-MM-dd HH:mm:ss；modelName 来自模型选择结果。"],
        ["模式与上下文", "datasetId、tenantId、extDetails、websearch、inner", "四模式 datasetId 为 0 / -3 / -7 / -8；extDetails 带用户 / 租户，MCP 另需 mcpId；当前 websearch=false、inner=false。"],
        ["SSE 正文", "纯文本 / delta；content、answerText 等累计文本", "纯文本和 delta 追加；累计快照提取新增部分，重复内容不重复展示；推理 reasoningContent 单独显示。"],
        ["工具与来源", "toolInfo / toolInfoList；extLinks", "工具按内容去重，来源按 URL 或标题去重；正文、推理、工具、来源不混为一种文本。"],
        ["完成信号", "done / complete、[DONE]、finish / finished", "去掉结尾完成标记；当前正常关闭且已收到有效片段也作完成，空流失败。HTTP 200 建立连接不代表已收到回答。"],
      ], notes: [
        "当前请求体不发送 temperature、top_p、max_tokens 或 systemPrompt；不能把其他 AI SDK 的默认参数当成本接口字段。",
      ] },
      { id: "failure", title: "取消和重试怎么处理", summary: "保留部分内容，手动重试创建新请求", rules: [
        ["发送 / 流失败", "空 messageId、非法 ID、业务失败及 SSE 错误均标失败；已有正文保留，并解除当前模式发送限制。"],
        ["手动重试", "失败气泡可重试：在同一会话重新 POST 原问题，取得新 messageId；保留原用户气泡，替换失败的回答占位，不是从旧流断点继续。"],
        ["主动停止", "先发布 STOPPED 状态，再取消 SSE；无内容显示已停止，有内容保留已收部分。停止本地连接不证明服务器已停止生成。"],
        ["返回恢复", "同一账号 / 环境 / 入口可恢复进程内快照和输入；旧 STREAMING 改为 STOPPED，不自动恢复流。进程被杀后没有服务端历史恢复能力。"],
      ] },
      { id: "gaps", title: "哪些内容还要补", summary: "设备上下文、历史恢复和流协议验收", rules: [
        ["设备上下文", "当前设备 / 告警入口用于本地会话隔离，未发送类型化设备、对象或告警字段；不能据此声称 AI 已读取该设备实时数据。"],
        ["服务端契约", "消息历史、断点续传、停止生成、错误事件和正常关闭的统一规则，以及人工客服 / 工单入口仍需确认。"],
        ["验证边界", "本轮只对照代码，不新增 AI 请求。四模式模型 / MCP 可用性、发送期间切账号或环境、真实弱网与长流需独立验收。"],
      ] },
    ],
  },
  common: {
    title: "公共接口约定", file: "common.html", pages: [],
    reviewedAt: "2026-10-12", baseline: "86fa2f9",
    source: "TimeZoneHeaderInterceptor.kt / SystemTimeZoneProvider.kt / OAuthSessionManager / 各业务 Repository",
    lead: "统一请求头、身份、ID 和错误处理；每个业务仍按自己的响应与写入契约校验。",
    scope: "统一调用约定及当前 Android 兼容行为；不能代替后端正式契约或各环境的部署验收。",
    sections: [
      { id: "headers", title: "地址与请求头", summary: "按环境拼接，时区走公共网络层", rules: [
        ["根地址", "路径相对所选环境，当前联调根路径包含 /admin；拼接一次，不能把 /app 或 /admin 重复加上。"],
        ["业务认证", "业务请求使用当前会话的 Bearer Token；OAuth、注册等专用客户端按各自约定处理，不一刀切替换认证头。"],
        ["时区", "统一发送 X-TimeZone，例如 Asia/Shanghai、America/New_York。每次请求读取系统 IANA 地区时区，不发送 UTC+8 或旧的 App-TimeZone。"],
        ["当前回退", "Android 对 UTC、GMT、Etc/* 等非地区格式回退 Asia/Shanghai；这是当前服务端适配规则。"],
        ["特殊客户端", "发码用 App-Client-Id，注册 / 密码接口用 X-Client-Id，不能全局改成同一个头。头像读取走匿名客户端，不向外部图片地址带 Token。"],
      ] },
      { id: "ids", title: "ID 怎么传", summary: "先区分资源，再保持数值无损", fields: [
        ["设备", "deviceId", "当作设备标识字符串保留，不按数值变换。"],
        ["对象", "type + 数字 ID", "PERSON:101 是客户端组合标识；接口路径中的 personId / petId 只取对应数字 ID。"],
        ["关联", "bindingId", "绑定记录 ID 用于解绑，不能拿 deviceId 或对象 ID 替代。"],
        ["数值精度", "服务端 Long / 数字字符串", "按接口 DTO 区分，用 Int64 或无损字符串处理；不要先转 Double，也不要把所有服务器字段一律改成字符串。"],
      ] },
      { id: "time", title: "时间怎么处理", summary: "毫秒、日期、统计窗口分别处理", rules: [
        ["设备实时位置", "latestLocation.dateTime 当前接受 12–13 位毫秒数或数字字符串，展示按手机时区；不能默认为秒或任意 ISO 文本。"],
        ["资料生日", "birthDate 是 YYYY-MM-DD 的日历日期，不是时间戳，不做时区偏移。"],
        ["健康 / 告警", "分析请求 date 当前按 UTC 日期，小时桶和 timeMillis 按手机时区显示；业务时段划分仍存在服务端问题。"],
        ["未知字段", "新增时间字段先确认类型、单位、时区和清空语义，不从 X-TimeZone 推定所有返回值都已转换为本地时间。"],
      ] },
      { id: "results", title: "结果怎么确认", summary: "HTTP 成功、业务成功、回读一致分开", rules: [
        ["读取", "先判 HTTP，再检查业务 code / ok，最后按接口校验 data。空列表、null 与缺字段不能统一解释为失败或成功。"],
        ["写入", "先确认业务响应，再按业务回读；超时 / 取消不等于服务器没执行，不自动重放创建、绑定或下发指令。"],
        ["重试", "只读请求可按业务规则重试；明确无权限不保留受限旧数据。一个模块的 404 降级规则不能套用所有接口。"],
        ["身份隔离", "业务应绑定请求的环境、账号及资源，收到响应时核对上下文；切账号、环境或设备后，丢弃不匹配的旧结果。"],
      ] },
      { id: "boundaries", title: "实现与验收怎么区分", summary: "有接口 ≠ 已接入 ≠ 业务已验证", rules: [
        ["代码依据", "说明里的流程来自当前客户端实现；原型操作仍只改本地演示数据。"],
        ["接口范围", "原 37 项快照来自 App Device / App Subject；新增 /app/evaigc 4 项按客户端声明单列，不伪装成旧快照已有。"],
        ["验证范围", "已有报告的环境、账号、设备和异常分支分别标注。本轮整理文档不新增服务器验收结论。"],
      ] },
    ],
  },
});

for (const [key, guide] of Object.entries(businessGuides)) {
  guide.pages ??= [key];
}
