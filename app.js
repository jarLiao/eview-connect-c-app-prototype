const mock = {
  tenant: {
    id: "tenant-healthcare-demo",
    name: "安心康护服务中心",
    region: "全球服务",
  },
  user: {
    id: "u-lily",
    name: "Lily Chen",
    email: "lily.chen@email.com",
    role: "设备拥有者",
  },
  devices: [
    {
      id: "dev-ev05-mom",
      name: "妈妈手表",
      model: "EV05",
      scenario: "老人看护 / 健康监测",
      status: "online",
      battery: 82,
      signal: "强",
      locateType: "GPS",
      location: "深圳湾 · 14:32",
      lastEvent: "疑似跌倒已触发 AI 预警",
      color: "blue",
      category: "family",
      categoryLabel: "家人",
      mapClass: "pin-a",
      icon: "watch",
      permission: "owner",
      metrics: { heart: 78, steps: 3824, active: 42 },
      hardware: {
        imei: "863450071234001",
        mac: "AC:23:3F:9A:31:05",
        firmware: "EV05_V1.4.7",
        hardware: "EV05-HW-R3",
        iccid: "8986043210042810932",
        sim: "中国移动 · 物联卡",
        bleVersion: "5.2",
        producedAt: "2025-03-18",
        activatedAt: "2025-08-12",
      },
    },
    {
      id: "dev-ev07b-pendant",
      name: "安全挂坠",
      model: "EV07B",
      scenario: "个人安全 / 紧急呼叫",
      status: "online",
      battery: 46,
      signal: "中",
      locateType: "WiFi",
      location: "家庭区域 · 14:28",
      lastEvent: "低电量提醒",
      color: "amber",
      category: "family",
      categoryLabel: "家人",
      mapClass: "pin-b",
      icon: "badge-alert",
      permission: "owner",
      metrics: { heart: 72, steps: 1900, active: 21 },
      hardware: {
        imei: "863450071234188",
        mac: "AC:23:3F:9B:22:F0",
        firmware: "EV07B_V2.1.0",
        hardware: "EV07B-HW-R5",
        iccid: "8986043210042810988",
        sim: "中国电信 · 物联卡",
        bleVersion: "5.0",
        producedAt: "2025-05-04",
        activatedAt: "2025-09-22",
      },
    },
    {
      id: "dev-ev04-worker",
      name: "作业定位器",
      model: "EV04",
      scenario: "孤独作业 / 位置安全",
      status: "offline",
      battery: 28,
      signal: "无",
      locateType: "LBS",
      location: "最后在线 · 32 分钟前",
      lastEvent: "设备离线",
      color: "coral",
      category: "family",
      categoryLabel: "家人",
      mapClass: "pin-c",
      icon: "hard-hat",
      permission: "viewer",
      metrics: { heart: 0, steps: 0, active: 0 },
      hardware: {
        imei: "863450071234236",
        mac: "AC:23:3F:9C:A8:10",
        firmware: "EV04_V1.2.3",
        hardware: "EV04-HW-R2",
        iccid: "8986043210042811046",
        sim: "中国联通 · 物联卡",
        bleVersion: "4.2",
        producedAt: "2024-11-09",
        activatedAt: "2025-02-15",
      },
    },
    {
      id: "dev-ev201-dog",
      name: "Milo 项圈",
      model: "EV201",
      scenario: "宠物安全 / 活动监测",
      status: "online",
      battery: 74,
      signal: "强",
      locateType: "GPS",
      location: "公园东门 · 14:31",
      lastEvent: "离开宠物围栏",
      color: "green",
      category: "pet",
      categoryLabel: "宠物",
      mapClass: "pin-d",
      icon: "paw-print",
      permission: "owner",
      metrics: { heart: 96, steps: 6400, active: 68 },
      hardware: {
        imei: "863450071234502",
        mac: "AC:23:3F:9D:50:A1",
        firmware: "EV201_V1.0.8",
        hardware: "EV201-HW-R1",
        iccid: "8986043210042811112",
        sim: "中国移动 · 物联卡",
        bleVersion: "5.0",
        producedAt: "2025-06-21",
        activatedAt: "2025-10-04",
      },
      pet: {
        species: "狗",
        breed: "金毛寻回犬",
        gender: "公",
        neutered: "已绝育",
        birthday: "2022-05-18",
        ageLabel: "3 岁 11 个月",
        weight: "28.4 kg",
        weightTrend: "近 30 天 +0.6 kg",
        vaccine: "狂犬疫苗 2026-02-10 已接种",
        nextVaccine: "2027-02 续打",
      },
    },
    {
      id: "dev-ev206-cat",
      name: "栗子定位器",
      model: "EV206",
      scenario: "宠物定位 / 健康活动",
      status: "online",
      battery: 68,
      signal: "中",
      locateType: "WiFi",
      location: "家附近 · 14:24",
      lastEvent: "活动量正常",
      color: "purple",
      category: "pet",
      categoryLabel: "宠物",
      mapClass: "pin-e",
      icon: "paw-print",
      permission: "owner",
      metrics: { heart: 104, steps: 2800, active: 35 },
      hardware: {
        imei: "863450071234627",
        mac: "AC:23:3F:9E:6C:23",
        firmware: "EV206_V1.0.5",
        hardware: "EV206-HW-R1",
        iccid: "8986043210042811235",
        sim: "中国移动 · 物联卡",
        bleVersion: "5.2",
        producedAt: "2025-07-30",
        activatedAt: "2025-11-12",
      },
      pet: {
        species: "猫",
        breed: "英国短毛猫",
        gender: "母",
        neutered: "已绝育",
        birthday: "2023-09-02",
        ageLabel: "2 岁 7 个月",
        weight: "4.6 kg",
        weightTrend: "近 30 天 +0.1 kg",
        vaccine: "猫三联 2025-12-08 已接种",
        nextVaccine: "2026-12 续打",
      },
    },
    {
      id: "dev-tag-luggage",
      name: "行李定位器",
      model: "EV-Tag",
      scenario: "物品防丢 / 位置提醒",
      status: "online",
      battery: 18,
      signal: "中",
      locateType: "Bluetooth",
      location: "机场到达层 · 14:20",
      lastEvent: "物品低电量",
      color: "blue",
      category: "item",
      categoryLabel: "物品",
      mapClass: "pin-f",
      icon: "package",
      permission: "owner",
      metrics: { heart: 0, steps: 0, active: 0 },
      hardware: {
        imei: "—",
        mac: "AC:23:3F:9F:88:14",
        firmware: "EV-Tag_V0.9.2",
        hardware: "EV-Tag-HW-R1",
        iccid: "—",
        sim: "无 SIM · 仅蓝牙",
        bleVersion: "5.2",
        producedAt: "2025-09-08",
        activatedAt: "2025-12-01",
      },
    },
  ],
  alarms: [
    {
      id: "a1",
      deviceId: "dev-ev05-mom",
      type: "疑似跌倒",
      severity: "high",
      time: "14:26",
      status: "待确认",
      description: "设备检测到跌倒姿态，5 分钟内位置未明显移动。",
      ai: "风险等级：中高。建议立即联系佩戴者确认状态，如无法联系，请通知紧急联系人。",
    },
    {
      id: "a2",
      deviceId: "dev-ev07b-pendant",
      type: "低电量",
      severity: "medium",
      time: "13:58",
      status: "未读",
      description: "当前电量 46%，预计 18 小时后进入低电模式。",
      ai: "建议今晚充电，并检查是否开启了高频定位模式。",
    },
    {
      id: "a3",
      deviceId: "dev-ev04-worker",
      type: "设备离线",
      severity: "medium",
      time: "13:42",
      status: "未处理",
      description: "设备已 32 分钟未上报数据。",
      ai: "可能原因包括网络弱、设备关机或电量不足。建议先尝试单次定位或联系使用者。",
    },
    {
      id: "a4",
      deviceId: "dev-ev201-dog",
      type: "离开围栏",
      severity: "high",
      time: "14:30",
      status: "待确认",
      description: "宠物已离开公园活动围栏，最近位置在公园东门。",
      ai: "建议立即查看实时位置，并开启高频定位；如 5 分钟内仍在围栏外，提醒附近家人协助寻找。",
    },
    {
      id: "a5",
      deviceId: "dev-tag-luggage",
      type: "低电量",
      severity: "medium",
      time: "14:12",
      status: "未读",
      description: "物品定位器电量低于 20%，建议尽快充电或更换电池。",
      ai: "低电量可能影响蓝牙扫描和离线找回能力，建议在下次出行前处理。",
    },
  ],
  track: [
    { time: "08:20", title: "离开 Home Zone", desc: "GPS · 精度 12m" },
    { time: "10:35", title: "到达社区中心", desc: "WiFi · 精度 34m" },
    { time: "14:26", title: "疑似跌倒事件", desc: "GPS · 精度 10m" },
  ],
  geofences: [
    { name: "Home Zone", shape: "圆形", trigger: "进出都提醒", status: "启用", radius: "300m", schedule: "全天" },
    { name: "社区中心", shape: "多边形", trigger: "离开提醒", status: "启用", radius: "6 个顶点", schedule: "工作日 09:00–17:00" },
    { name: "学校接送", shape: "圆形", trigger: "进入提醒", status: "启用", radius: "120m", schedule: "周一至周五 07:30 / 16:30" },
    { name: "禁入区域 · 河边", shape: "多边形", trigger: "进入立即报警", status: "暂停", radius: "8 个顶点", schedule: "全天" },
  ],
  healthRanges: {
    day: {
      label: "今日",
      bars: [12, 18, 24, 30, 22, 28, 16],
      labels: ["6", "9", "12", "15", "18", "21", "24"],
      summaryTitle: "今日活跃度",
      summary: "上午 9–12 点活动量集中，下午外出后活动减弱，建议下午 4 点后增加一次轻量散步。",
    },
    week: {
      label: "近 7 天",
      bars: [42, 56, 49, 62, 58, 47, 35],
      labels: ["一", "二", "三", "四", "五", "六", "日"],
      summaryTitle: "7 日活跃趋势",
      summary: "活动量较 7 日均值下降 23%，夜间心率波动偏高。结合定位看，上午外出时间减少，建议关注睡眠和日常活动状态。",
    },
    month: {
      label: "近 30 天",
      bars: [38, 45, 52, 47, 41, 39, 44, 56, 60, 58, 51, 48, 42, 36],
      labels: ["1", "3", "5", "8", "11", "14", "17", "20", "23", "26", "29", "30", "", ""],
      summaryTitle: "30 日健康趋势",
      summary: "本月平均活跃 47 分钟/天，比上月持平。第 12–18 天有连续 7 日下降，与雨天减少外出相关，本周已恢复。",
    },
  },
  shares: [
    { name: "Jason Chen", account: "jason.chen@email.com", permission: "查看 + 接收告警", status: "已接受" },
    { name: "Nina Chen", account: "nina.chen@email.com", permission: "仅查看", status: "待接受" },
  ],
  services: {
    autoRenew: true,
    paymentMethod: "Visa **** 4821",
    subscriptions: [
      { device: "妈妈手表 · EV05", plan: "标准 SIM 套餐 · 1GB/月", expireAt: "2026-08-12 到期", remaining: "剩余 642 MB · 18 天", status: "正常" },
      { device: "安全挂坠 · EV07B", plan: "基础 SIM 套餐 · 500MB/月", expireAt: "2026-05-22 到期", remaining: "剩余 38 MB · 4 天", status: "即将到期" },
      { device: "作业定位器 · EV04", plan: "高频上报套餐 · 2GB/月", expireAt: "2026-06-30 到期", remaining: "剩余 1.4 GB · 26 天", status: "正常" },
      { device: "Milo 项圈 · EV201", plan: "宠物追踪套餐 · 1GB/月", expireAt: "2026-09-04 到期", remaining: "剩余 812 MB · 41 天", status: "正常" },
    ],
    orders: [
      { id: "EV-O-2026-00284", desc: "安全挂坠 · 基础 SIM 套餐 · 12 个月", amount: "￥168", status: "待支付", time: "2026-04-25" },
      { id: "EV-O-2026-00231", desc: "妈妈手表 · 标准 SIM 套餐 · 12 个月", amount: "￥298", status: "已支付", time: "2026-03-12" },
      { id: "EV-O-2025-00917", desc: "Milo 项圈 · 宠物追踪套餐 · 12 个月", amount: "￥358", status: "已支付", time: "2025-09-04" },
    ],
  },
  incomingShares: [
    { device: "爸爸定位器", owner: "Michael Chen", permission: "查看 + 接收告警", status: "待确认" },
  ],
  systemMessages: [
    { title: "分享邀请", desc: "Michael Chen 邀请你查看爸爸定位器", status: "待确认", type: "share" },
    { title: "系统通知", desc: "国内地图与定位权限将在首次使用地图时申请", status: "未读", type: "system" },
  ],
  discoveredDevices: [
    { name: "EV05-9A31", model: "EV05", signal: "强", id: "imei 863450071234001" },
    { name: "EV07B-22F0", model: "EV07B", signal: "中", id: "imei 863450071234188" },
    { name: "EV04-A810", model: "EV04", signal: "弱", id: "imei 863450071234236" },
    { name: "EV201-PET", model: "EV201", signal: "强", id: "imei 863450071234502" },
    { name: "EV99 SmartBand", model: "EV99", signal: "强", id: "imei 863450071299990" },
  ],
  devicePlugins: {
    EV05: { tsl: "ev05.tsl v1.2.0", panel: "ev05.panel v3.4.1", provider: "Eview Official", enabled: ["定位", "健康", "围栏", "SIM"], extensible: "血氧（固件 V2.0+ 才支持）" },
    EV07B: { tsl: "ev07b.tsl v2.1.0", panel: "ev07b.panel v2.8.3", provider: "Eview Official", enabled: ["定位", "SOS", "围栏", "SIM"], extensible: "语音消息（固件 V2.2+ 才支持）" },
    EV04: { tsl: "ev04.tsl v1.2.3", panel: "ev04.panel v2.0.4", provider: "Eview Official", enabled: ["定位", "离线", "围栏", "SIM"], extensible: "工时统计（固件 V1.5+ 才支持）" },
    EV201: { tsl: "ev201.tsl v1.0.8", panel: "ev201.panel v1.6.0", provider: "Eview Official", enabled: ["定位", "围栏", "活动", "SIM"], extensible: "宠物体征（固件 V1.4+ 才支持）" },
    EV206: { tsl: "ev206.tsl v1.0.5", panel: "ev206.panel v1.5.2", provider: "Eview Official", enabled: ["定位", "围栏", "活动", "SIM"], extensible: "温度感知（固件 V1.3+ 才支持）" },
    "EV-Tag": { tsl: "evtag.tsl v0.9.2", panel: "evtag.panel v1.0.1", provider: "Eview Official", enabled: ["蓝牙", "防丢", "查找", "低电"], extensible: "离线协寻（App V2.0+ 才支持）" },
  },
  capabilityLibrary: [
    { model: "Eview EV05 智能手表", category: "人用", version: "v1.2.0" },
    { model: "Eview EV07B 安全挂坠", category: "人用", version: "v2.1.0" },
    { model: "Eview EV04 工业定位", category: "人用", version: "v1.2.3" },
    { model: "Eview EV201 宠物项圈", category: "宠物", version: "v1.0.8" },
    { model: "Eview EV206 宠物追踪", category: "宠物", version: "v1.0.5" },
    { model: "Eview EV-Tag 蓝牙物品", category: "物品", version: "v0.9.2" },
  ],
  brandThemes: [
    { id: "care", name: "安心康护服务中心", color: "绿色（默认）", hidden: "无", h5: "健康咨询（1 个）" },
    { id: "blue", name: "Global Care Partner", color: "蓝色", hidden: "服务套餐", h5: "帮助中心（2 个）" },
    { id: "pet", name: "PawTrack Club", color: "宠物绿", hidden: "工业设备", h5: "宠物护理（1 个）" },
  ],
  configs: {
    homeWifi: [
      { ssid: "Home_5G", strength: "强", source: "妈妈手表" },
      { ssid: "LivingRoom_IoT", strength: "中", source: "妈妈手表" },
    ],
    homeBeacon: [
      { name: "卧室信标", uuid: "FDA5-1201", source: "妈妈手表" },
      { name: "厨房信标", uuid: "FDA5-1202", source: "妈妈手表" },
    ],
  },
  emergencyContacts: [
    { name: "Lily Chen（本人）", relation: "本人", phone: "+86 138 0000 1234", priority: 1, triggers: "SOS · 跌倒 · 离线" },
    { name: "Jason Chen", relation: "配偶", phone: "+86 139 0000 5678", priority: 2, triggers: "SOS · 跌倒" },
    { name: "Michael Chen", relation: "兄弟", phone: "+86 137 0000 4321", priority: 3, triggers: "SOS" },
    { name: "社区医院 24h", relation: "医疗机构", phone: "+86 0755 1234 5678", priority: 4, triggers: "SOS · 跌倒未响应" },
  ],
  aiQuestions: [
    {
      q: "为什么设备离线？",
      a: "常见原因包括设备关机、电量不足、SIM 网络弱或处于室内弱信号区域。建议先查看最后位置，再尝试单次定位；如果仍无响应，请联系佩戴者或检查设备电量。",
    },
    {
      q: "怎么把设备分享给家人？",
      a: "进入设备详情，点击分享，输入家人的邮箱或账号，选择权限后发送邀请。对方接受后即可查看设备位置或接收告警。",
    },
    {
      q: "怎么配置 Home WiFi？",
      a: "进入设备配置，选择 Home WiFi。可以手动添加，也可以从已配置设备复制。复制前需要确认目标设备支持 Home WiFi 能力。",
    },
  ],
  configCategories: [
    { id: "info", icon: "circle-gauge", title: "设备信息", desc: "IMEI、MAC、固件、ICCID、激活时间" },
    { id: "home", icon: "house-wifi", title: "Home WiFi / Home Beacon", desc: "家庭 WiFi、信标、配置复制" },
    { id: "location", icon: "map-pinned", title: "定位与上报", desc: "定位方式、上报间隔、AGPS" },
    { id: "alerts", icon: "shield-alert", title: "告警阈值", desc: "跌倒、离线、低电量、超速" },
    { id: "call", icon: "phone-call", title: "SOS 与联系人", desc: "紧急联系人、白名单、按键" },
    { id: "sensor", icon: "heart-pulse", title: "健康传感器", desc: "心率、步数、运动检测" },
    { id: "ble", icon: "bluetooth-connected", title: "蓝牙连接 / 固件升级", desc: "近场连接、参数同步、设备升级" },
    { id: "network", icon: "router", title: "网络与 SIM", desc: "网络连接和 SIM 状态" },
  ],
};

const state = {
  loggedIn: false,
  route: "login",
  tab: "map",
  detailTab: "overview",
  selectedDeviceId: "dev-ev05-mom",
  modal: null,
  mapFilter: "all",
  healthRange: "week",
  brandTheme: "care",
  addMode: "scan",
  configCategory: "home",
  settingsPanel: "profile",
  toast: "",
  chat: [
    { role: "assistant", text: "你好，我可以帮你解释告警、排查设备离线，也可以说明如何分享和配置设备。" },
  ],
};

const app = document.getElementById("app");
const demoPanel = document.getElementById("demo-panel");

function $(selector, root = document) {
  return root.querySelector(selector);
}

function getDevice(id = state.selectedDeviceId) {
  return mock.devices.find((device) => device.id === id) || mock.devices[0];
}

function deviceAlarms(deviceId) {
  return mock.alarms.filter((alarm) => alarm.deviceId === deviceId);
}

function deviceIcon(device) {
  return device.icon || (device.model === "EV05" ? "watch" : device.model === "EV07B" ? "badge-alert" : "radio-receiver");
}

function devicePlace(device) {
  return device.location.split(" · ")[0] || device.location;
}

function isUrgentDevice(device) {
  return deviceAlarms(device.id).some((alarm) => alarm.severity === "high");
}

function isLowBatteryDevice(device) {
  return device.battery <= 30 || deviceAlarms(device.id).some((alarm) => alarm.type.includes("低电"));
}

function mapFilters() {
  return [
    { id: "all", label: "全部设备" },
    { id: "family", label: "家人" },
    { id: "pet", label: "宠物" },
    { id: "item", label: "物品" },
  ];
}

function filteredMapDevices() {
  if (state.mapFilter === "all") return mock.devices;
  return mock.devices.filter((device) => device.category === state.mapFilter);
}

function mapFilterLabel() {
  return mapFilters().find((filter) => filter.id === state.mapFilter)?.label || "全部设备";
}

function shouldExpandMapPin(device) {
  return state.mapFilter !== "all" || isUrgentDevice(device) || isLowBatteryDevice(device) || device.status === "offline";
}

function icon(name) {
  return `<i data-lucide="${name}"></i>`;
}

function statusLabel(status) {
  return status === "online" ? "在线" : "离线";
}

function statusClass(status) {
  return status === "online" ? "online" : "offline";
}

function devicePluginInfo(device) {
  return mock.devicePlugins[device.model] || mock.devicePlugins.EV05;
}

function currentBrandTheme() {
  return mock.brandThemes.find((theme) => theme.id === state.brandTheme) || mock.brandThemes[0];
}

function nextBrandTheme() {
  const currentIndex = mock.brandThemes.findIndex((theme) => theme.id === state.brandTheme);
  return mock.brandThemes[(currentIndex + 1) % mock.brandThemes.length];
}

function oauthProviders() {
  return [
    { id: "wechat", name: "微信", icon: "message-circle-more", hint: "微信授权", bound: true, account: "weixin · liaojar" },
    { id: "apple", name: "Apple", icon: "apple", hint: "Apple ID", bound: false, account: "未绑定" },
    { id: "google", name: "Google", icon: "chrome", hint: "Google 账号", bound: false, account: "未绑定" },
  ];
}

function renderOauthBrandIcon(provider) {
  if (provider.id === "google") {
    return `<span class="oauth-brand-icon ${provider.id}"><b>G</b></span>`;
  }
  return `<span class="oauth-brand-icon ${provider.id}">${icon(provider.icon)}</span>`;
}

function render() {
  app.dataset.theme = state.brandTheme;
  if (!state.loggedIn || state.route === "login") {
    app.innerHTML = renderLogin();
  } else if (state.route === "detail") {
    app.innerHTML = renderDetail();
  } else {
    app.innerHTML = renderShell();
  }
  if (state.modal) {
    app.insertAdjacentHTML("beforeend", renderModal());
  }
  if (state.toast) {
    app.insertAdjacentHTML("beforeend", `<div class="toast">${icon("check-circle-2")}<span>${state.toast}</span></div>`);
  }
  renderDemoPanel();
  bindEvents();
  refreshIcons();
}

function renderDemoPanel() {
  if (!demoPanel) return;
  const info = getDemoPanelInfo();
  demoPanel.innerHTML = `
    <div class="demo-card demo-card-primary">
      <div class="demo-kicker">页面说明</div>
      <h1>${info.title}</h1>
      <p>${info.summary}</p>
      <div class="tag-grid">
        ${info.tags.map((tag) => `<span>${tag}</span>`).join("")}
      </div>
    </div>

    <div class="demo-card">
      <h2>页面相关信息</h2>
      ${renderExplanationList(toPageInfoItems(info))}
    </div>

    <div class="demo-card">
      <h2>页面需求说明</h2>
      ${renderExplanationList(toRequirementItems(info))}
    </div>
  `;
}

function renderExplanationList(items) {
  return `<ol class="demo-steps">${items.map((item) => `<li>${item}</li>`).join("")}</ol>`;
}

function toPageInfoItems(info) {
  return (info.goals || []).map((item) =>
    item
      .replace(/^确认/, "")
      .replace(/是否清楚/g, "需要清楚")
      .replace(/是否足够/g, "需要足够")
      .replace(/。$/, "。"),
  );
}

function toRequirementItems(info) {
  const source = info.requirements || info.review || [];
  return source.map((item) =>
    item
      .replace(/^是否需要/, "需要评估是否")
      .replace(/^是否/, "需要明确是否")
      .replace(/^哪些/, "需要明确哪些")
      .replace(/^不同/, "需要支持不同"),
  );
}

function getDemoPanelInfo() {
  if (!state.loggedIn || state.route === "login") return loginPanelInfo();
  if (state.modal) return modalPanelInfo();
  if (state.route === "detail") return detailPanelInfo();
  return tabPanelInfo();
}

function loginPanelInfo() {
  return {
    title: "登录页",
    summary: "用于验证用户第一次进入 App 时，是否能理解这是复用 Evmars 账号登录的 C 端设备管理入口。",
    tags: ["账号登录", "协议入口", "首次进入"],
    goals: [
      "确认登录信息层级是否清楚，用户知道需要使用账号 / 邮箱和密码登录。",
      "确认微信、Apple、Google 第三方登录与账号安全里的绑定样式保持一致。",
      "确认协议与隐私入口没有干扰主要登录动作。",
      "确认品牌和产品定位表达为家庭设备管理，而不是 B 端管理后台。",
    ],
    actions: [
      "点击登录进入设备首页。",
      "点击微信、Apple、Google 第三方登录入口查看授权提示。",
      "点击服务协议与隐私政策查看帮助中心弹窗。",
    ],
    review: [
      "是否需要在第一版登录页展示注册入口，取决于账号是否完全复用 Evmars。",
      "是否需要支持手机号登录、邮箱登录和地区选择，要和国内运营方案一起定。",
      "协议入口后续应拆出用户协议、隐私政策和权限说明。",
    ],
    backend: [
      "登录、刷新 Token、退出登录、找回密码、协议版本确认。",
      "账号体系需要确认 C 端用户和 Evmars 客户账号之间的关系。",
    ],
  };
}

function tabPanelInfo() {
  const panelMap = {
    map: {
      title: "地图页",
      summary: "地图页用于集中查看所有设备的当前位置、在线状态、告警状态和安全围栏，是定位类设备最高频的总览入口。",
      tags: ["全局地图", "全部设备", "围栏总览"],
      goals: [
        "确认用户能一眼看懂所有设备当前分布、在线状态和异常设备。",
        "确认地图上的设备标记能区分正常、低电、离线和紧急状态。",
        "确认家人、宠物、物品筛选能点击，并且筛选结果、地图标记和设备定位卡同步变化。",
      ],
      actions: [
        "点击地图上的设备标记进入该设备地图详情。",
        "点击筛选结果中的设备定位卡进入单台设备详情。",
        "点击右上角添加按钮打开添加设备流程。",
      ],
      review: [
        "地图页应该作为全局位置总览，不替代单台设备的轨迹、围栏和配置详情。",
        "地图上的设备标签需要显示具体位置，并避免在全部设备模式下重叠遮挡。",
        "家人、宠物、物品是完整 App 的设备分类，宠物设备需要覆盖 EV201 / EV206 的定位、围栏和活动场景。",
        "国内地图、海外 Google Maps 和无 GMS 手机需要在正式开发前确定方案。",
      ],
      backend: [
        "全部设备最新位置、设备状态、围栏范围、告警状态、设备分类。",
        "地图 SDK、坐标系转换、定位权限、推送刷新和地图费用需要统一评估。",
      ],
    },
    devices: {
      title: "设备首页",
      summary: "这是用户每天打开 App 后最先看到的页面，用来快速确认设备在线状态、告警数量和添加设备入口。",
      tags: ["设备列表", "添加设备", "状态总览"],
      goals: [
        "确认用户能一眼看懂有几台设备、几台在线、有没有待处理提醒。",
        "确认设备卡片信息足够判断电量、定位方式、信号和最近事件。",
        "确认添加设备入口足够明显，能承接扫码、IMEI 和 BLE 绑定。",
      ],
      actions: [
        "点击顶部扫码按钮或添加设备卡片，打开添加设备流程。",
        "点击妈妈手表进入设备详情。",
        "点击待处理提醒进入消息页。",
      ],
      review: [
        "首页只放高频信息，避免塞太多设置入口。",
        "共享设备和自有设备后续可考虑分组或用权限标签区分。",
        "离线设备要突出但不能造成误报恐慌。",
      ],
      backend: [
        "设备列表、设备状态、最后位置、最后告警、分享权限、未读提醒数量。",
        "实时刷新方案需要确认使用推送触发、轮询还是 WebSocket。",
      ],
    },
    messages: {
      title: "消息页",
      summary: "消息页聚合设备告警、分享邀请和系统通知，负责把待处理事项从首页引导到具体处理动作。",
      tags: ["告警消息", "分享邀请", "系统通知"],
      goals: [
        "确认待处理消息和普通告警分层清晰。",
        "确认分享邀请能完成接受、拒绝的闭环。",
        "确认设备告警可以进入 AI 解释，帮助用户理解风险。",
      ],
      actions: [
        "点击接受或拒绝分享邀请。",
        "点击设备告警查看 AI 预警解释。",
        "标记系统通知已读。",
      ],
      review: [
        "是否需要按设备、消息类型、已读状态筛选。",
        "高风险告警是否需要置顶、二次确认或紧急联系人入口。",
        "分享邀请的权限说明需要和服务端权限字段一致。",
      ],
      backend: [
        "消息分页、已读状态、分享邀请处理、推送 Token 注册。",
        "国内需要调研 FCM、HMS 和厂商推送组合。",
      ],
    },
    ai: {
      title: "AI 助手页",
      summary: "AI 页用于承接健康分析、预警解释和客服问答，展示后续 AI 功能落地的入口形态。",
      tags: ["健康分析", "预警解释", "AI 客服"],
      goals: [
        "确认 AI 能力不是孤立功能，而是服务设备、健康和告警处理。",
        "确认用户能从 AI 页进入具体设备的健康或告警详情。",
        "确认 AI 客服适合处理离线、定位不准、分享和配置问题。",
      ],
      actions: [
        "点击 AI 健康分析进入设备健康页。",
        "点击 AI 预警解释进入告警页。",
        "点击 AI 客服打开问答弹窗。",
      ],
      review: [
        "AI 结果需要区分规则判断和模型解释，避免过度承诺。",
        "高风险告警建议保留人工确认和紧急联系人路径。",
        "AI 客服后续要考虑转人工和工单记录。",
      ],
      backend: [
        "健康数据聚合、告警上下文、AI 问答上下文、客服工单接口。",
        "需要明确哪些数据可以给 AI 使用，以及隐私授权边界。",
      ],
    },
    mine: {
      title: "我的页",
      summary: "我的页是账号、通知、地区地图、帮助反馈和协议版本的设置中心，负责补齐正式 App 的个人中心能力。",
      tags: ["账号设置", "通知偏好", "合规入口"],
      goals: [
        "确认账号资料、账号安全、通知设置和帮助关于分组是否清楚。",
        "确认地图与定位放在这里表达的是地区、地图服务和权限设置，不是查看设备位置。",
        "确认退出登录放在底部且有二次确认，减少误触。",
      ],
      actions: [
        "点击账号资料编辑昵称、邮箱、手机号和地区。",
        "点击通知设置查看告警推送和免打扰。",
        "点击关于与协议查看协议、隐私、权限和版本入口。",
      ],
      review: [
        "账号注销、隐私政策和权限说明是正式上线前必须补齐的合规项。",
        "通知设置需要和消息中心、推送能力联动。",
        "地区与地图服务要和国内无 GMS 方案保持一致。",
      ],
      backend: [
        "用户资料、修改密码、账号注销、通知偏好、地区设置、版本检查。",
        "地图服务选择可能影响定位 SDK、坐标转换和隐私授权。",
      ],
    },
  };
  return panelMap[state.tab] || panelMap.devices;
}

function detailPanelInfo() {
  const device = getDevice();
  const panelMap = {
    overview: {
      title: `${device.name} · 概览`,
      summary: "概览页把设备状态、健康摘要、AI 风险和最近事件放在一起，用来判断用户是否能快速理解当前设备是否安全。",
      tags: [device.model, "设备概览", "AI 摘要"],
      goals: [
        "确认状态、电量、定位方式和健康指标是否足够支撑快速判断。",
        "确认 AI 今日摘要不会抢占告警处理，但能给用户下一步建议。",
        "确认最近事件能引导用户进入告警页。",
      ],
      actions: [
        "点击定位发送单次定位指令。",
        "点击分享打开设备分享弹窗。",
        "点击查看全部进入告警列表。",
      ],
      review: [
        "不同设备型号的指标差异需要动态配置，不能所有设备都显示心率。",
        "分享给我的设备要限制管理类操作。",
        "AI 风险文案需要避免医疗诊断式表达。",
      ],
      backend: [
        "设备详情、实时状态、健康指标、最近事件、AI 摘要。",
        "设备能力矩阵决定哪些模块显示。",
      ],
    },
    map: {
      title: `${device.name} · 地图`,
      summary: "地图页展示实时位置、轨迹回放和安全围栏，是定位类设备最核心的业务页面。",
      tags: ["实时定位", "轨迹回放", "安全围栏"],
      goals: [
        "确认用户能区分实时位置、历史轨迹和围栏管理。",
        "确认轨迹时间筛选和关键点展示足够清楚。",
        "确认新建围栏流程能表达圆形、多边形和提醒条件。",
      ],
      actions: [
        "点击实时定位触发单次定位。",
        "点击轨迹回放查看时间筛选。",
        "点击新增围栏打开围栏编辑弹窗。",
      ],
      review: [
        "国内地图方案和海外地图方案需要保持体验一致。",
        "轨迹回放要处理无数据、弱网和坐标偏移。",
        "围栏触发规则要避免误报和重复推送。",
      ],
      backend: [
        "实时位置、历史轨迹、围栏列表、新增 / 编辑 / 删除围栏。",
        "国内坐标系、海外 Google Maps、无 GMS 设备定位能力要提前评估。",
      ],
    },
    health: {
      title: `${device.name} · 健康`,
      summary: "健康页展示心率、步数、活跃趋势和 AI 健康分析，适合 EV05 等人用健康监测设备。",
      tags: ["健康数据", "趋势图", "AI 分析"],
      goals: [
        "确认健康指标和趋势图是否对普通用户可理解。",
        "确认 AI 分析能解释异常趋势，但不替代医疗判断。",
        "确认无健康能力的设备后续能隐藏该页或降级显示。",
      ],
      actions: [
        "查看 7 日活跃趋势。",
        "阅读 AI 健康分析说明。",
        "从 AI 页跳转到健康页演示跨页面联动。",
      ],
      review: [
        "不同设备支持的健康传感器不同，要基于设备能力展示。",
        "健康报告后续可扩展日报、周报和家人提醒。",
        "健康数据属于敏感数据，隐私授权要明确。",
      ],
      backend: [
        "健康数据日报 / 周报、趋势聚合、异常判断规则。",
        "AI 健康分析需要设备数据、历史基线和用户授权。",
      ],
    },
    alarms: {
      title: `${device.name} · 告警`,
      summary: "告警页用于查看跌倒、离线、低电量等事件，并通过 AI 给出风险解释和处理建议。",
      tags: ["设备告警", "风险解释", "待处理"],
      goals: [
        "确认告警严重程度、状态和说明足够清楚。",
        "确认 AI 解释能帮助用户处理，而不是只展示结果。",
        "确认告警和消息中心之间的关系清楚。",
      ],
      actions: [
        "点击告警卡片打开 AI 分析结果。",
        "查看待确认、未读、未处理等状态。",
        "从消息页进入同一告警解释路径。",
      ],
      review: [
        "高风险告警是否需要确认处理、联系紧急联系人、记录处理结果。",
        "告警状态要和推送、消息已读状态区分。",
        "AI 解释需要可追溯的规则依据。",
      ],
      backend: [
        "告警列表、告警详情、已读 / 已处理、AI 解释上下文。",
        "推送到达、重复告警合并和告警状态同步。",
      ],
    },
    config: {
      title: `${device.name} · 配置`,
      summary: "配置页把 C 端常用设置和技术验证能力分组，包括 Home WiFi / Home Beacon、定位、告警、联系人、蓝牙和网络状态。",
      tags: ["设备配置", "Home WiFi", "Home Beacon"],
      goals: [
        "确认配置分类是否能覆盖历史 APP 的主要设置能力。",
        "确认普通用户能理解常用配置，技术验证入口不会干扰主流程。",
        "确认配置复制可以表达设备间能力复用。",
      ],
      actions: [
        "点击 Home WiFi / Home Beacon 分类查看配置。",
        "点击蓝牙连接 / 固件升级查看近场配置弹窗。",
        "点击复制 Home WiFi / Home Beacon 模拟复制到其他设备。",
      ],
      review: [
        "哪些配置开放给 C 端用户，哪些只给技术人员，需要产品权限定义。",
        "配置下发要显示设备确认结果，避免用户以为保存即生效。",
        "分享用户是否允许改配置，需要权限控制。",
      ],
      backend: [
        "设备配置读取、配置保存、配置下发状态、设备能力矩阵。",
        "BLE 近场读写、远程指令、OTA 升级需要分技术链路验证。",
      ],
    },
  };
  return panelMap[state.detailTab] || panelMap.overview;
}

function modalPanelInfo() {
  const modalMap = {
    "add-device": addDevicePanelInfo(),
    share: sharePanelInfo(),
    "edit-device": editDevicePanelInfo(),
    geofence: geofencePanelInfo(),
    "config-category": configCategoryPanelInfo(),
    settings: settingsPanelInfo(),
    "logout-confirm": logoutPanelInfo(),
    h5: h5PanelInfo(),
    chat: chatPanelInfo(),
    ai: aiResultPanelInfo(),
  };
  return modalMap[state.modal] || tabPanelInfo();
}

function addDevicePanelInfo() {
  return {
    title: "添加设备流程",
    summary: "弹窗用于验证扫码、手动 IMEI 和 BLE 扫描三种绑定路径，覆盖历史 APP 的添加设备能力。",
    tags: ["扫码绑定", "IMEI", "BLE 扫描"],
    goals: [
      "确认用户能理解三种添加方式的差异。",
      "确认 BLE 扫描可以承接近场绑定和参数读取。",
      "确认绑定前校验提示不会显得太技术化。",
    ],
    actions: [
      "切换扫码、IMEI、BLE 三个分段按钮。",
      "点击模拟扫码成功或连接 BLE 设备。",
      "关闭弹窗返回设备首页。",
    ],
    review: [
      "扫码和手动 IMEI 是普通用户主路径，BLE 更偏现场辅助。",
      "绑定失败原因要给用户可执行的解释。",
      "设备是否属于当前可绑定范围需要后端校验。",
    ],
    backend: [
      "IMEI 校验、设备是否已绑定、设备型号能力、绑定设备、BLE 设备发现。",
      "绑定成功后需要刷新设备列表和权限数据。",
    ],
  };
}

function sharePanelInfo() {
  return {
    title: "设备分享",
    summary: "分享弹窗用于验证设备拥有者把查看或告警权限分享给家人的完整流程。",
    tags: ["分享邀请", "权限控制", "家庭协作"],
    goals: [
      "确认分享账号、权限选择、已有分享列表三块信息清楚。",
      "确认已分享用户可以修改权限或取消分享。",
      "确认用户能理解拥有者和被分享用户权限不同。",
    ],
    actions: [
      "选择权限后点击发送邀请。",
      "查看已有分享列表。",
      "尝试修改权限或取消分享。",
    ],
    review: [
      "权限项要和服务端真实权限字段一致。",
      "被分享用户是否能接收告警、查看轨迹、修改配置，需要明确边界。",
      "分享邀请还需要在消息页完成接受或拒绝。",
    ],
    backend: [
      "分享列表、发起邀请、接受 / 拒绝邀请、修改权限、取消分享。",
      "设备详情接口需要返回当前用户对设备的权限。",
    ],
  };
}

function editDevicePanelInfo() {
  const device = getDevice();
  return {
    title: `${device.name} · 设备管理`,
    summary: "设备管理弹窗用于编辑设备名称、使用者、紧急联系人和备注，同时承接解绑设备。",
    tags: ["设备资料", "联系人", "解绑"],
    goals: [
      "确认设备管理和设备配置不是同一个概念。",
      "确认紧急联系人适合放在设备资料或 SOS 设置中。",
      "确认分享设备不能随意编辑或解绑。",
    ],
    actions: [
      "修改设备名称或紧急联系人。",
      "点击保存查看反馈。",
      "拥有者可点击解绑设备。",
    ],
    review: [
      "解绑是高风险操作，正式版需要二次确认。",
      "设备名称、使用者和联系人是否需要按型号区分字段。",
      "编辑权限必须受当前用户权限控制。",
    ],
    backend: [
      "设备资料编辑、紧急联系人、解绑设备、权限校验。",
      "解绑前要确认分享关系和历史数据保留策略。",
    ],
  };
}

function geofencePanelInfo() {
  return {
    title: "安全围栏编辑",
    summary: "围栏弹窗用于验证用户创建或编辑安全区域时，能否理解区域形状、范围和提醒条件。",
    tags: ["圆形围栏", "多边形围栏", "进出提醒"],
    goals: [
      "确认地图编辑区域和表单字段的关系清楚。",
      "确认用户知道围栏用于进出区域提醒。",
      "确认保存后需要等待服务同步。",
    ],
    actions: [
      "填写围栏名称。",
      "选择圆形或多边形。",
      "选择提醒条件并保存围栏。",
    ],
    review: [
      "多边形围栏在移动端编辑复杂，可能第一版先做圆形。",
      "围栏半径最小值、最大值和重复围栏规则需要定义。",
      "围栏误报会直接影响用户信任。",
    ],
    backend: [
      "围栏新增、编辑、删除、启停、触发记录。",
      "坐标系转换和服务端围栏判断需要和地图方案联动。",
    ],
  };
}

function configCategoryPanelInfo() {
  const category = mock.configCategories.find((item) => item.id === state.configCategory) || mock.configCategories[0];
  return {
    title: category.title,
    summary: `当前打开的是“${category.title}”配置分类，用来验证配置项是否按用户认知分组，而不是照搬历史工具 APP 的技术菜单。`,
    tags: ["配置分类", "设备能力", category.title],
    goals: [
      "确认这个分类名称和字段用户能理解。",
      "确认保存配置后的反馈符合设备下发流程。",
      "确认不同型号设备可以按能力显示或隐藏配置项。",
    ],
    actions: [
      "查看当前分类里的字段。",
      "点击保存配置。",
      "返回配置页打开其他分类对比。",
    ],
    review: [
      "配置项需要分 C 端常用设置和技术验证设置。",
      "保存配置不等于设备已生效，需要展示下发状态。",
      "Home WiFi / Home Beacon 等专业术语按业务保留英文。",
    ],
    backend: [
      "配置读取、保存、下发、设备确认结果、设备能力矩阵。",
      "BLE、远程指令和服务端配置需要统一状态模型。",
    ],
  };
}

function settingsPanelInfo() {
  const panelMap = {
    profile: "账号资料",
    security: "账号与安全",
    notifications: "通知设置",
    map: "地区与地图服务",
    service: "我的服务",
    feedback: "意见反馈",
    about: "关于与协议",
  };
  const title = panelMap[state.settingsPanel] || "账号资料";
  return {
    title,
    summary: `当前打开的是“${title}”设置弹窗，用来验证我的页是否具备正式 App 必需的账号、通知、合规和支持能力。`,
    tags: ["我的页", "设置弹窗", title],
    goals: [
      "确认该设置是否从我的页入口自然进入。",
      "确认字段数量适合弹窗承载，不需要单独页面。",
      "确认保存、提交或查看协议的操作反馈明确。",
    ],
    actions: [
      "查看当前设置项。",
      "点击保存、提交或检查更新。",
      "关闭弹窗回到我的页继续查看其他设置。",
    ],
    review: [
      "账号安全、账号注销、隐私政策是上线前重点。",
      "通知设置要和消息页、推送能力保持一致。",
      "地区与地图服务要明确是 App 设置，不是设备地图详情。",
    ],
    backend: [
      "用户资料、通知偏好、地区地图配置、反馈提交、协议版本、账号注销。",
      "设置项需要和权限申请、隐私授权、版本发布流程联动。",
    ],
  };
}

function h5PanelInfo() {
  return {
    title: "帮助中心",
    summary: "帮助中心弹窗模拟可由 H5 承接的内容，适合承载 FAQ、协议、设备说明和客服入口。",
    tags: ["H5 内容", "帮助中心", "协议入口"],
    goals: [
      "确认哪些内容适合用 H5 跨端复用。",
      "确认 H5 能从设备上下文进入对应说明。",
      "确认在线客服能和 AI 客服衔接。",
    ],
    actions: [
      "点击设备使用说明。",
      "点击服务协议与隐私政策。",
      "点击联系在线客服进入 AI 客服。",
    ],
    review: [
      "H5 适合低频内容和运营内容，不适合高频原生设备操作。",
      "小程序后续也可复用帮助、协议、客服、简单设备列表。",
      "H5 与原生之间需要定义登录态、设备上下文和跳转边界。",
    ],
    backend: [
      "帮助内容、协议版本、客服入口、H5 登录态和设备上下文传递。",
    ],
  };
}

function chatPanelInfo() {
  return {
    title: "AI 客服",
    summary: "AI 客服用于回答设备离线、定位不准、分享和配置问题，是用户遇到问题时的低门槛入口。",
    tags: ["AI 问答", "故障排查", "客服"],
    goals: [
      "确认预置问题能覆盖高频设备问题。",
      "确认 AI 回复给出可执行步骤。",
      "确认后续可以扩展转人工客服。",
    ],
    actions: [
      "点击预置问题。",
      "输入问题并发送。",
      "从帮助中心或 AI 页进入客服。",
    ],
    review: [
      "AI 客服需要知道当前设备上下文，否则回答会泛泛。",
      "涉及高风险告警时要引导用户联系紧急联系人。",
      "客服记录是否进入消息中心或工单系统需要定义。",
    ],
    backend: [
      "AI 问答上下文、设备状态、FAQ 知识库、工单创建、转人工。",
    ],
  };
}

function aiResultPanelInfo() {
  return {
    title: "AI 分析结果",
    summary: "AI 分析弹窗展示告警或健康事件的解释方式，重点验证用户是否能理解风险和下一步处理建议。",
    tags: ["AI 解释", "风险建议", "告警处理"],
    goals: [
      "确认 AI 说明不是只给结论，而是解释原因和建议。",
      "确认用户能从弹窗回到告警或设备详情。",
      "确认 AI 表述不过度承诺。",
    ],
    actions: [
      "阅读分析结果。",
      "关闭弹窗返回当前页面。",
      "结合告警卡片说明处理路径。",
    ],
    review: [
      "高风险事件要保留人工确认和紧急联系人动作。",
      "AI 解释要能追溯到设备状态和规则。",
      "健康分析不能写成医疗诊断。",
    ],
    backend: [
      "告警上下文、健康数据、规则引擎结果、AI 总结接口。",
    ],
  };
}

function logoutPanelInfo() {
  return {
    title: "退出登录确认",
    summary: "退出登录弹窗用于避免用户在我的页误触退出，属于账号安全和基础体验的一部分。",
    tags: ["二次确认", "账号安全", "退出登录"],
    goals: [
      "确认退出登录不会被误触。",
      "确认用户知道退出后需要重新登录。",
      "确认取消动作清晰可见。",
    ],
    actions: [
      "点击退出登录返回登录页。",
      "点击取消或关闭保留当前登录状态。",
    ],
    review: [
      "退出登录和账号注销必须区分。",
      "退出时是否注销推送 Token 要由服务端和 App 共同处理。",
    ],
    backend: [
      "退出登录、Token 清理、推送 Token 注销、会话失效。",
    ],
  };
}

function renderLogin() {
  return `
    <div class="login-screen">
      <div class="login-visual">
        <div class="login-map" aria-hidden="true"></div>
        <div class="brand-lockup">
          <div class="brand-mark">${icon("radio-tower")}</div>
          <div>
            <strong>Eview Connect</strong>
            <span>家庭设备管理</span>
          </div>
        </div>
        <div class="login-hero-copy">
          <h1>统一管理定位、健康与设备服务</h1>
          <p>查看家人的位置、健康状态和安全提醒，随时管理自己的设备。</p>
        </div>
      </div>
      <form class="login-form" data-form="login">
        <div class="field">
          <label for="email">账号 / 邮箱</label>
          <input id="email" name="email" type="email" value="${mock.user.email}" autocomplete="username" />
        </div>
        <div class="field">
          <label for="password">密码</label>
          <input id="password" name="password" type="password" value="demo123456" autocomplete="current-password" />
        </div>
        <button class="primary-button" type="submit">${icon("log-in")} 登录</button>
        <div class="login-aux">
          <button class="text-button" type="button" data-action="toast-forgot-password">${icon("key-round")} 忘记密码</button>
          <button class="text-button" type="button" data-action="open-h5">${icon("file-question")} 协议与隐私</button>
        </div>
        <div class="oauth-divider"><span>第三方登录</span></div>
        <div class="oauth-grid login-oauth-grid" aria-label="第三方登录方式">
          ${oauthProviders().map((provider) => `
            <button class="oauth-provider-card login ${provider.id}" type="button" data-action="toast-oauth" data-provider="${provider.id}" aria-label="${provider.name} 登录">
              ${renderOauthBrandIcon(provider)}
              <span class="oauth-provider-text">
                <strong>${provider.name}</strong>
                <small>${provider.hint}</small>
              </span>
            </button>
          `).join("")}
        </div>
      </form>
    </div>
  `;
}

function renderShell() {
  const titleMap = {
    map: ["地图", "查看设备位置、告警与围栏状态"],
    devices: ["设备", "我的设备、添加设备和状态总览"],
    messages: ["消息", "告警、系统通知和服务提醒"],
    mine: ["我的", "账号、安全、通知和服务"],
  };
  const [title, subtitle] = titleMap[state.tab];
  return `
    ${renderHeader(title, subtitle)}
    <div class="screen-body">
      ${state.tab === "map" ? renderGlobalMap() : ""}
      ${state.tab === "devices" ? renderDevices() : ""}
      ${state.tab === "messages" ? renderMessages() : ""}
      ${state.tab === "mine" ? renderMine() : ""}
    </div>
    ${renderBottomNav()}
  `;
}

function renderHeader(title, subtitle, back = false) {
  const showAddDevice = !back && ["map", "devices"].includes(state.tab);
  const showRefresh = back || state.tab !== "mine";
  return `
    <header class="app-header">
      <div class="status-bar"><span>09:41</span><span>${icon("wifi")} ${icon("battery-medium")}</span></div>
      <div class="header-row">
        ${back ? `<button class="back-button" type="button" data-action="back" aria-label="返回">${icon("chevron-left")}</button>` : ""}
        <div class="header-title">
          <h1>${title}</h1>
          <p>${subtitle}</p>
        </div>
        <div class="header-actions">
          ${showAddDevice ? `<button class="icon-button" type="button" data-action="open-add-device" aria-label="添加设备" title="添加设备">${icon("plus")}</button>` : ""}
          ${showRefresh ? `<button class="icon-button" type="button" data-action="toast-sync" aria-label="同步数据" title="同步">${icon("refresh-cw")}</button>` : ""}
        </div>
      </div>
    </header>
  `;
}

function renderBottomNav() {
  const nav = [
    ["map", "map", "地图"],
    ["devices", "radio-receiver", "设备"],
    ["messages", "bell", "消息"],
    ["mine", "user-round", "我的"],
  ];
  return `
    <nav class="bottom-nav" aria-label="底部导航">
      ${nav
        .map(
          ([tab, iconName, label]) => `
            <button class="nav-button ${state.tab === tab ? "active" : ""}" type="button" data-tab="${tab}">
              ${icon(iconName)}
              <span>${label}</span>
            </button>
          `,
        )
        .join("")}
    </nav>
  `;
}

function renderGlobalMap() {
  const devices = filteredMapDevices();
  return `
    <section class="section map-home-section">
      <div class="category-filter" aria-label="设备筛选">
        ${mapFilters().map((filter) => `
          <button class="${state.mapFilter === filter.id ? "active" : ""}" type="button" data-map-filter="${filter.id}">
            ${filter.label}
          </button>
        `).join("")}
      </div>
      <div class="map-result-panel">
        <div class="map-result-header">
          <div>
            <strong>${mapFilterLabel()} · ${devices.length} 台</strong>
            <span>点击设备卡或地图标记进入详情</span>
          </div>
        </div>
        <div class="map-device-strip compact" aria-label="筛选后的设备">
          ${devices.length ? devices.map(renderMapDeviceCard).join("") : `<div class="map-empty-card">当前筛选无设备</div>`}
        </div>
      </div>
      <div class="global-map-card" role="img" aria-label="全局地图，展示全部设备位置、围栏和告警状态">
        <div class="global-zone zone-home"></div>
        <div class="global-zone zone-school"></div>
        <div class="global-road road-one"></div>
        <div class="global-road road-two"></div>
        ${devices.map(renderGlobalMapPin).join("")}
        <button class="map-fab layer" type="button" data-action="toast-map-layer" aria-label="地图图层">${icon("layers")}</button>
        <div class="map-provider-note">${icon("map")} 国内暂定高德 / 海外 Google · 实时 10 分钟前</div>
      </div>
    </section>
  `;
}

function renderGlobalMapPin(device) {
  const alarms = deviceAlarms(device.id);
  const severityClass = device.status === "offline" ? "offline" : alarms.some((alarm) => alarm.severity === "high") ? "urgent" : alarms.length ? "warning" : "";
  const statusText = alarms[0]?.type || statusLabel(device.status);
  const expandedClass = shouldExpandMapPin(device) ? "expanded" : "compact-pin";
  return `
    <button class="global-map-pin ${device.mapClass} ${severityClass} category-${device.category} ${expandedClass}" type="button" data-open-device="${device.id}" data-detail-tab="map" aria-label="${device.name} ${devicePlace(device)} ${statusText}">
      <span>${icon(deviceIcon(device))}</span>
      <strong>${device.name}</strong>
      <small>${devicePlace(device)} · ${statusText}</small>
    </button>
  `;
}

function renderMapDeviceCard(device) {
  const alarms = deviceAlarms(device.id);
  return `
    <button class="map-device-card ${device.status} ${alarms.length ? "has-alert" : ""}" type="button" data-open-device="${device.id}" data-detail-tab="map">
      <div class="map-device-avatar ${device.color}">${icon(deviceIcon(device))}</div>
      <div>
        <strong>${device.name}</strong>
        <span>${device.categoryLabel} · ${statusLabel(device.status)} · ${devicePlace(device)}</span>
        <small>${device.battery}% · ${device.model}${alarms[0] ? ` · ${alarms[0].type}` : ""}</small>
      </div>
    </button>
  `;
}

function renderDevices() {
  const onlineCount = mock.devices.filter((device) => device.status === "online").length;
  const alertCount = mock.alarms.filter((alarm) => alarm.status !== "已处理").length;
  return `
    <section class="section">
      <div class="home-summary">
        <button class="summary-tile" type="button" data-action="toast-sync">
          ${icon("activity")}
          <span>在线设备</span>
          <strong>${onlineCount}/${mock.devices.length}</strong>
        </button>
        <button class="summary-tile" type="button" data-tab="messages">
          ${icon("bell")}
          <span>待处理提醒</span>
          <strong>${alertCount}</strong>
        </button>
      </div>
      <div class="device-list">
        ${mock.devices.length
          ? mock.devices.map(renderDeviceCard).join("")
          : `<button class="add-device-card" type="button" data-action="open-add-device">
              <span>${icon("scan-line")}</span>
              <div>
                <strong>添加你的第一台设备</strong>
                <small>扫码、输入 IMEI 或 BLE 扫描绑定人、宠物和物品设备</small>
              </div>
              ${icon("chevron-right")}
            </button>`}
      </div>
    </section>
  `;
}

function renderDeviceCard(device) {
  return `
    <button class="device-card ${device.status}" type="button" data-open-device="${device.id}">
      <div class="device-top">
        <div class="device-name">
          <strong>${device.name}</strong>
          <span>${device.model} · ${device.scenario}</span>
        </div>
        <span class="status-pill ${statusClass(device.status)}">${statusLabel(device.status)}</span>
      </div>
      <div class="device-meta-grid">
        <span>${icon("battery-medium")}<strong>${device.battery}%</strong><small>电量</small></span>
        <span>${icon("navigation")}<strong>${device.locateType}</strong><small>定位</small></span>
        <span>${icon("signal")}<strong>${device.signal}</strong><small>信号</small></span>
      </div>
      <div class="device-bottom">
        <span>${device.location}</span>
        <span>${device.lastEvent}</span>
      </div>
    </button>
  `;
}

function renderDetail() {
  const device = getDevice();
  return `
    ${renderHeader(device.name, `${device.model} · ${device.scenario}`, true)}
    <div class="screen-body with-detail-tabs">
      ${renderDeviceHero(device)}
      <div class="tab-strip" aria-label="设备详情标签">
        ${[
          ["overview", "概览"],
          ["map", "地图"],
          ["health", "健康"],
          ["alarms", "告警"],
          ["config", "配置"],
        ]
          .map(([tab, label]) => `<button class="tab-button ${state.detailTab === tab ? "active" : ""}" type="button" data-detail-tab="${tab}">${label}</button>`)
          .join("")}
      </div>
      ${state.detailTab === "overview" ? renderOverview(device) : ""}
      ${state.detailTab === "map" ? renderMap(device) : ""}
      ${state.detailTab === "health" ? renderHealth(device) : ""}
      ${state.detailTab === "alarms" ? renderAlarmSection(device) : ""}
      ${state.detailTab === "config" ? renderConfig(device) : ""}
    </div>
    ${renderBottomNav()}
  `;
}

function renderDeviceHero(device) {
  return `
    <section class="detail-hero">
      <div class="detail-hero-top">
        <div>
          <h2>${device.name}</h2>
          <p>${device.permission === "owner" ? "我的设备" : "分享给我的设备"} · ${device.location}</p>
        </div>
        <div class="device-avatar ${device.color}">${icon(deviceIcon(device))}</div>
      </div>
      <div class="device-stats">
        <div class="stat-tile"><span>状态</span><strong>${statusLabel(device.status)}</strong></div>
        <div class="stat-tile"><span>电量</span><strong>${device.battery}%</strong></div>
        <div class="stat-tile"><span>定位</span><strong>${device.locateType}</strong></div>
      </div>
      <div class="quick-grid">
        <button class="quick-action" type="button" data-action="toast-locate">${icon("crosshair")}定位</button>
        <button class="quick-action" type="button" data-action="toast-find">${icon("volume-2")}查找</button>
        <button class="quick-action" type="button" data-action="open-share">${icon("share-2")}分享</button>
        <button class="quick-action" type="button" data-action="open-edit-device">${icon("settings-2")}管理</button>
      </div>
    </section>
  `;
}

function renderOverview(device) {
  const alarms = deviceAlarms(device.id);
  return `
    <section class="section">
      <div class="metric-grid">
        <div class="metric-card"><span>心率</span><strong>${device.metrics.heart || "--"}</strong><small>bpm · 今日平均</small></div>
        <div class="metric-card"><span>步数</span><strong>${device.metrics.steps || "--"}</strong><small>较 7 日均值 -23%</small></div>
        <div class="metric-card"><span>活跃</span><strong>${device.metrics.active || "--"}</strong><small>分钟 · 今日</small></div>
        <div class="metric-card"><span>AI 风险</span><strong>${alarms.length ? "中高" : "正常"}</strong><small>${alarms[0]?.type || "暂无异常"}</small></div>
      </div>
    </section>
    <section class="section">
      <div class="insight-card warning">
        <h3>${icon("sparkles")}AI 今日摘要</h3>
        <p>今日活动量较过去 7 天平均值下降，夜间心率波动略高。建议关注休息状态，必要时提醒用户进行轻量活动。</p>
      </div>
    </section>
    <section class="section">
      <div class="section-header">
        <h2>最近事件</h2>
        <button class="text-button" type="button" data-detail-tab="alarms">查看全部</button>
      </div>
      <div class="card-list">
        ${(alarms.length ? alarms : mock.alarms.slice(0, 1)).map(renderAlarmCard).join("")}
      </div>
    </section>
  `;
}

function renderMap(device) {
  return `
    <section class="section">
      <div class="map-card" role="img" aria-label="模拟地图，展示设备位置、轨迹和围栏">
        <div class="geofence"></div>
        <div class="track-line"></div>
        <div class="map-pin main">${icon("map-pin")}</div>
        <div class="map-pin alert">${icon("triangle-alert")}</div>
        <div class="map-caption">
          <span>${device.name} · ${device.locateType}</span>
          <span>国内暂定高德 / 海外 Google</span>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="map-action-grid">
        <button class="quick-action compact" type="button" data-action="toast-locate">${icon("crosshair")}实时定位</button>
        <button class="quick-action compact" type="button" data-action="toast-track">${icon("route")}轨迹回放</button>
        <button class="quick-action compact" type="button" data-action="open-geofence">${icon("shield-plus")}新增围栏</button>
      </div>
    </section>
    <section class="section">
      <div class="section-header">
        <div>
          <h2>轨迹回放</h2>
          <p>支持按今天、昨天、自定义时间查询</p>
        </div>
        <span class="pill">3 个关键点</span>
      </div>
      <div class="segmented-control" aria-label="轨迹时间筛选">
        <button class="active" type="button">今天</button>
        <button type="button">昨天</button>
        <button type="button">自定义</button>
      </div>
      <div class="timeline">
        ${mock.track.map((item) => `
          <div class="timeline-item">
            <div class="timeline-time">${item.time}</div>
            <div><strong>${item.title}</strong><span>${item.desc}</span></div>
          </div>
        `).join("")}
      </div>
    </section>
    <section class="section">
      <div class="section-header">
        <div>
          <h2>安全围栏</h2>
          <p>圆形 / 多边形，支持进出提醒</p>
        </div>
        <button class="text-button" type="button" data-action="open-geofence">新建</button>
      </div>
      <div class="card-list">
        ${mock.geofences.map((fence) => `
          <button class="list-card" type="button" data-action="open-geofence">
            <div class="list-row">
              <div>
                <strong>${fence.name}</strong>
                <span>${fence.shape} · ${fence.radius} · ${fence.trigger}</span>
                <small>${fence.schedule}</small>
              </div>
              <span class="status-pill ${fence.status === "启用" ? "online" : "warning"}">${fence.status}</span>
            </div>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function renderHealth(device) {
  if (device.category === "pet") return renderPetHealth(device);
  if (device.category === "item") return renderItemHealth(device);
  const range = mock.healthRanges[state.healthRange] || mock.healthRanges.week;
  return `
    <section class="section">
      <div class="metric-grid">
        <div class="metric-card"><span>平均心率</span><strong>${device.metrics.heart || "--"}</strong><small>bpm</small></div>
        <div class="metric-card"><span>步数</span><strong>${device.metrics.steps || "--"}</strong><small>今日</small></div>
      </div>
    </section>
    <section class="section">
      ${renderHealthRangeTabs()}
      <div class="chart-card">
        <div class="section-header">
          <div>
            <h2>${range.summaryTitle}</h2>
            <p>${range.label}活动分钟数</p>
          </div>
        </div>
        <div class="bar-chart" aria-label="${range.summaryTitle}">
          ${range.bars.map((height) => `<div class="bar" style="height:${height + 30}px"></div>`).join("")}
        </div>
        <div class="chart-labels">${range.labels.map((label) => `<span>${label}</span>`).join("")}</div>
      </div>
    </section>
    <section class="section">
      <div class="insight-card">
        <h3>${icon("brain")}AI 健康分析</h3>
        <p>${range.summary}</p>
      </div>
    </section>
  `;
}

function renderHealthRangeTabs() {
  const ranges = [
    ["day", "日"],
    ["week", "周"],
    ["month", "月"],
  ];
  return `
    <div class="segmented-control" aria-label="健康数据周期">
      ${ranges.map(([id, label]) => `<button class="${state.healthRange === id ? "active" : ""}" type="button" data-health-range="${id}">${label}</button>`).join("")}
    </div>
  `;
}

function renderPetHealth(device) {
  const range = mock.healthRanges[state.healthRange] || mock.healthRanges.week;
  const pet = device.pet;
  return `
    ${pet ? `
    <section class="section">
      <div class="pet-profile-card">
        <div class="pet-profile-head">
          <div class="device-avatar ${device.color}">${icon("paw-print")}</div>
          <div>
            <strong>${device.name}</strong>
            <span>${pet.species} · ${pet.breed} · ${pet.gender}${pet.neutered ? ` · ${pet.neutered}` : ""}</span>
          </div>
          <button class="small-icon-button" type="button" data-action="toast-pet-edit" aria-label="编辑档案">${icon("pencil")}</button>
        </div>
        <div class="pet-profile-grid">
          <div><span>年龄</span><strong>${pet.ageLabel}</strong><small>${pet.birthday}</small></div>
          <div><span>体重</span><strong>${pet.weight}</strong><small>${pet.weightTrend}</small></div>
          <div><span>最近疫苗</span><strong>${pet.vaccine}</strong><small>${pet.nextVaccine}</small></div>
        </div>
      </div>
    </section>
    ` : ""}
    <section class="section">
      <div class="metric-grid">
        <div class="metric-card"><span>今日活动</span><strong>${device.metrics.active || "--"}</strong><small>分钟</small></div>
        <div class="metric-card"><span>活动步数</span><strong>${device.metrics.steps || "--"}</strong><small>宠物运动量</small></div>
        <div class="metric-card"><span>围栏状态</span><strong>${deviceAlarms(device.id).length ? "异常" : "正常"}</strong><small>${deviceAlarms(device.id)[0]?.type || "未离开安全区域"}</small></div>
        <div class="metric-card"><span>定位频率</span><strong>高</strong><small>围栏外自动提高</small></div>
      </div>
    </section>
    <section class="section">
      ${renderHealthRangeTabs()}
      <div class="chart-card">
        <div class="section-header">
          <div>
            <h2>${range.label}活动趋势</h2>
            <p>用于判断宠物运动量和异常活动</p>
          </div>
        </div>
        <div class="bar-chart" aria-label="宠物${range.label}活动趋势">
          ${range.bars.map((height) => `<div class="bar" style="height:${height + 24}px"></div>`).join("")}
        </div>
        <div class="chart-labels">${range.labels.map((label) => `<span>${label}</span>`).join("")}</div>
      </div>
    </section>
    <section class="section">
      <div class="insight-card">
        <h3>${icon("sparkles")}AI 宠物分析</h3>
        <p>${deviceAlarms(device.id)[0]?.ai || "宠物活动量处于正常范围，定位点集中在常用活动区域。后续可扩展体重、疫苗、喂养和活动日报。"}</p>
      </div>
    </section>
  `;
}

function renderItemHealth(device) {
  return `
    <section class="section">
      <div class="metric-grid">
        <div class="metric-card"><span>电量</span><strong>${device.battery}%</strong><small>${device.battery <= 30 ? "建议处理" : "状态正常"}</small></div>
        <div class="metric-card"><span>连接方式</span><strong>${device.locateType}</strong><small>最近位置来源</small></div>
        <div class="metric-card"><span>离身提醒</span><strong>${deviceAlarms(device.id).length ? "有提醒" : "正常"}</strong><small>${device.lastEvent}</small></div>
        <div class="metric-card"><span>最后位置</span><strong>${device.status === "online" ? "可用" : "离线"}</strong><small>${device.location}</small></div>
      </div>
    </section>
    <section class="section">
      <div class="insight-card warning">
        <h3>${icon("package")}物品状态</h3>
        <p>物品类设备重点展示位置、连接状态、低电量和离身提醒，不展示人用健康指标。</p>
      </div>
    </section>
  `;
}

function renderAlarmSection(device) {
  const alarms = deviceAlarms(device.id);
  return `
    <section class="section">
      <div class="card-list">
        ${(alarms.length ? alarms : mock.alarms).map(renderAlarmCard).join("")}
      </div>
    </section>
    <section class="section">
      <div class="insight-card danger">
        <h3>${icon("sparkles")}AI 预警解释</h3>
        <p>${alarms[0]?.ai || "当前设备暂无高风险事件。AI 会结合位置、状态、历史行为和健康数据解释告警原因。"}</p>
      </div>
    </section>
  `;
}

function renderAlarmCard(alarm) {
  return `
    <button class="list-card alarm-card ${alarm.severity}" type="button" data-action="alarm-ai" data-alarm-id="${alarm.id}">
      <div class="list-row">
        <div>
          <strong>${alarm.type}</strong>
          <span>${alarm.time} · ${alarm.description}</span>
        </div>
        <span class="status-pill ${alarm.severity === "high" ? "offline" : "warning"}">${alarm.status}</span>
      </div>
    </button>
  `;
}

function renderConfig(device) {
  const plugin = devicePluginInfo(device);
  return `
    <section class="section">
      <div class="section-header">
        <div>
          <h2>设备配置</h2>
          <p>管理设备连接、定位、告警、联系人和家庭配置</p>
        </div>
      </div>
      <div class="plugin-summary-card">
        <div class="plugin-summary-head">
          <span class="settings-icon">${icon("puzzle")}</span>
          <div>
            <strong>设备插件</strong>
            <small>${plugin.tsl} · ${plugin.panel}</small>
          </div>
        </div>
        <div class="plugin-chip-row">
          ${plugin.enabled.map((item) => `<span class="mini-chip">${item}</span>`).join("")}
        </div>
        <button class="ghost-button full-width" type="button" data-action="toast-panel-update">${icon("refresh-cw")}检查面板更新</button>
      </div>
      <div class="config-category-grid">
        ${mock.configCategories.map((item) => `
          <button class="config-category-card" type="button" data-config-category="${item.id}">
            ${icon(item.icon)}
            <div><strong>${item.title}</strong><span>${item.desc}</span></div>
          </button>
        `).join("")}
      </div>
    </section>
    <section class="section">
      <div class="config-list">
        <div class="config-card">
          <h3>${icon("wifi")}Home WiFi</h3>
          ${mock.configs.homeWifi.map((wifi) => `
            <div class="config-row"><div><strong>${wifi.ssid}</strong><span>来源：${wifi.source} · 信号${wifi.strength}</span></div><span class="mini-chip">可复制</span></div>
          `).join("")}
        </div>
        <div class="config-card">
          <h3>${icon("bluetooth")}Home Beacon</h3>
          ${mock.configs.homeBeacon.map((beacon) => `
            <div class="config-row"><div><strong>${beacon.name}</strong><span>${beacon.uuid} · 来源：${beacon.source}</span></div><span class="mini-chip">可复制</span></div>
          `).join("")}
        </div>
        <div class="config-card">
          <h3>${icon("copy")}复制配置到其他设备</h3>
          <p>将当前设备保存的 Home WiFi 和 Home Beacon 配置复制到其他兼容设备。</p>
          <div class="copy-box">
            <div class="field">
              <label for="target-device">目标设备</label>
              <select id="target-device">
                ${mock.devices.filter((item) => item.id !== device.id).map((item) => `<option>${item.name} · ${item.model}</option>`).join("")}
              </select>
            </div>
            <button class="primary-button" type="button" data-action="copy-config">${icon("copy-check")}复制 Home WiFi / Home Beacon</button>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="danger-zone">
        <div>
          <strong>设备管理</strong>
          <span>编辑名称、使用者信息，或解绑当前设备</span>
        </div>
        <button class="ghost-button" type="button" data-action="open-edit-device">${icon("settings-2")}管理</button>
      </div>
    </section>
  `;
}

function renderMessages() {
  return `
    <section class="section">
      <div class="section-header">
        <div>
          <h2>待处理</h2>
          <p>分享邀请、系统通知和设备提醒</p>
        </div>
      </div>
      <div class="card-list">
        ${mock.systemMessages.map((message) => `
          <div class="list-card message-card">
            <div class="list-row">
              <div><strong>${message.title}</strong><span>${message.desc}</span></div>
              <span class="status-pill ${message.type === "share" ? "warning" : "info"}">${message.status}</span>
            </div>
            <div class="inline-actions">
              ${message.type === "share"
                ? `<button class="ghost-button" type="button" data-action="accept-share">${icon("check")}接受</button><button class="text-button" type="button" data-action="reject-share">拒绝</button>`
                : `<button class="text-button" type="button" data-action="mark-read">标为已读</button>`}
            </div>
          </div>
        `).join("")}
      </div>
    </section>
    <section class="section">
      <div class="section-header">
        <div>
          <h2>设备告警</h2>
          <p>跌倒、离线、低电量等消息</p>
        </div>
      </div>
      <div class="card-list">
        ${mock.alarms.map(renderAlarmCard).join("")}
      </div>
    </section>
  `;
}

function renderAiHome() {
  return `
    <section class="section">
      <div class="ai-grid">
        <button class="list-card" type="button" data-action="ai-health">
          <div class="list-row"><div><strong>AI 健康分析</strong><span>生成日报、周报和趋势解释</span></div>${icon("chevron-right")}</div>
        </button>
        <button class="list-card" type="button" data-action="ai-alert">
          <div class="list-row"><div><strong>AI 预警解释</strong><span>解释跌倒、离线、低电量等事件</span></div>${icon("chevron-right")}</div>
        </button>
        <button class="list-card" type="button" data-action="open-chat">
          <div class="list-row"><div><strong>AI 客服</strong><span>排查定位不准、设备离线、分享和配置问题</span></div>${icon("chevron-right")}</div>
        </button>
      </div>
    </section>
    <section class="section">
      <div class="insight-card">
        <h3>${icon("sparkles")}AI 服务摘要</h3>
        <p>健康分析、告警解释和客服建议会优先结合设备状态、历史行为与健康趋势生成。</p>
      </div>
    </section>
  `;
}

function renderMine() {
  const mineGroups = [
    {
      title: "账号",
      items: [
        ["profile", "user-round-pen", "账号资料", "头像、昵称、邮箱和手机号"],
        ["security", "shield-check", "账号与安全", "修改密码、登录设备和账号注销"],
      ],
    },
    {
      title: "通知与地区",
      items: [
        ["notifications", "bell-ring", "通知设置", "告警推送、系统通知和免打扰"],
        ["map", "map-pinned", "地区与地图服务", "国家/地区、地图显示和定位权限"],
      ],
    },
    {
      title: "服务与套餐",
      items: [
        ["service", "credit-card", "我的服务", "SIM 套餐、订单、支付方式和发票"],
      ],
    },
    {
      title: "帮助与关于",
      items: [
        ["help", "circle-help", "帮助中心", "设备说明、常见问题和在线客服"],
        ["feedback", "message-square-text", "意见反馈", "提交问题、建议或联系人工客服"],
        ["about", "file-check-2", "关于与协议", "用户协议、隐私政策和版本信息"],
      ],
    },
  ];
  return `
    <section class="section">
      <div class="profile-card">
        <div class="profile-avatar">${icon("user-round")}</div>
        <div>
          <strong>${mock.user.name}</strong>
          <span>${mock.user.email}</span>
        </div>
        <button class="small-icon-button" type="button" data-action="open-settings" data-settings="profile" aria-label="编辑资料">${icon("pencil")}</button>
      </div>
    </section>
    ${mineGroups.map((group) => `
      <section class="section">
        <div class="settings-group-title">${group.title}</div>
        <div class="settings-list">
          ${group.items.map(([panel, iconName, title, desc]) => renderSettingsItem(panel, iconName, title, desc)).join("")}
        </div>
      </section>
    `).join("")}
    ${renderCapabilityLibrary()}
    ${renderBrandThemeDemo()}
    <section class="section">
      <button class="logout-card" type="button" data-action="logout-confirm">
        <div>
          <strong>退出登录</strong>
          <span>退出后需要重新登录账号</span>
        </div>
        ${icon("log-out")}
      </button>
    </section>
  `;
}

function renderCapabilityLibrary() {
  return `
    <section class="section">
      <div class="manifest-card">
        <div class="section-header compact">
          <div>
            <h2>设备能力库</h2>
            <p>${mock.capabilityLibrary.length} 个产品已接入</p>
          </div>
          <span class="mini-chip">manifest</span>
        </div>
        <div class="capability-list">
          ${mock.capabilityLibrary.map((item) => `
            <div class="capability-row">
              <strong>${item.model}</strong>
              <span>${item.category} · ${item.version}</span>
            </div>
          `).join("")}
        </div>
        <div class="inline-actions">
          <button class="ghost-button" type="button" data-action="toast-supported-models">${icon("list-checks")}支持的设备型号清单</button>
          <button class="ghost-button" type="button" data-action="toast-third-party-device">${icon("plug-zap")}接入第三方设备</button>
        </div>
      </div>
    </section>
  `;
}

function renderBrandThemeDemo() {
  const theme = currentBrandTheme();
  return `
    <section class="section">
      <div class="brand-theme-card">
        <div class="section-header compact">
          <div>
            <h2>品牌主题</h2>
            <p>模拟客户定制 App 外观和 H5 入口</p>
          </div>
          <span class="theme-dot"></span>
        </div>
        <div class="info-list theme-info-list">
          ${[
            ["当前品牌", theme.name],
            ["主题色", theme.color],
            ["隐藏功能", theme.hidden],
            ["自定义 H5 入口", theme.h5],
          ].map(([label, value]) => `
            <div class="info-row">
              <span>${label}</span>
              <strong>${value}</strong>
            </div>
          `).join("")}
        </div>
        <button class="ghost-button full-width" type="button" data-action="switch-brand-theme">${icon("paintbrush")}切换品牌主题</button>
      </div>
    </section>
  `;
}

function renderSettingsItem(panel, iconName, title, desc) {
  const action = panel === "help" ? "open-h5" : "open-settings";
  const settingsAttr = panel === "help" ? "" : ` data-settings="${panel}"`;
  return `
    <button class="settings-item" type="button" data-action="${action}"${settingsAttr}>
      <span class="settings-icon">${icon(iconName)}</span>
      <div>
        <strong>${title}</strong>
        <small>${desc}</small>
      </div>
      ${icon("chevron-right")}
    </button>
  `;
}

function renderModal() {
  if (state.modal === "share") return renderShareModal();
  if (state.modal === "add-device") return renderAddDeviceModal();
  if (state.modal === "edit-device") return renderEditDeviceModal();
  if (state.modal === "geofence") return renderGeofenceModal();
  if (state.modal === "config-category") return renderConfigCategoryModal();
  if (state.modal === "settings") return renderSettingsModal();
  if (state.modal === "logout-confirm") return renderLogoutConfirmModal();
  if (state.modal === "h5") return renderH5Modal();
  if (state.modal === "chat") return renderChatModal();
  if (state.modal === "ai") return renderAiModal();
  return "";
}

function renderShareModal() {
  const device = getDevice();
  return `
    <div class="modal-backdrop" data-action="close-modal">
      <section class="bottom-sheet" role="dialog" aria-modal="true" aria-label="设备分享" data-sheet>
        <div class="sheet-header">
          <h2>分享 ${device.name}</h2>
          <button class="small-icon-button" type="button" data-action="close-modal" aria-label="关闭">${icon("x")}</button>
        </div>
        <div class="field">
          <label for="share-account">家人账号</label>
          <input id="share-account" type="email" value="jason.chen@email.com" />
        </div>
        <div class="field">
          <label for="share-permission">权限</label>
          <select id="share-permission">
            <option>查看 + 接收告警</option>
            <option>仅查看</option>
            <option>协助管理</option>
          </select>
        </div>
        <section class="section">
          <div class="section-header"><h2>已有分享</h2></div>
          <div class="card-list">
            ${mock.shares.map((share) => `
              <div class="list-card">
                <div class="share-row"><div><strong>${share.name}</strong><span>${share.account} · ${share.permission}</span></div><span class="status-pill info">${share.status}</span></div>
                <div class="inline-actions">
                  <button class="text-button" type="button" data-action="resend-share">${share.status === "待接受" ? "重新发送" : "修改权限"}</button>
                  <button class="text-button danger-text" type="button" data-action="revoke-share">取消分享</button>
                </div>
              </div>
            `).join("")}
          </div>
        </section>
        <section class="section">
          <div class="panel-card">
            <h3>${icon("shield-check")}权限说明</h3>
            <p>设备拥有者可管理配置、分享和解绑；被分享用户默认只能查看位置和接收告警，是否允许协助管理需要服务端权限字段支持。</p>
          </div>
        </section>
        <button class="primary-button" type="button" data-action="send-share">${icon("send")}发送邀请</button>
      </section>
    </div>
  `;
}

function renderAddDeviceModal() {
  return `
    <div class="modal-backdrop" data-action="close-modal">
      <section class="bottom-sheet" role="dialog" aria-modal="true" aria-label="添加设备" data-sheet>
        <div class="sheet-header">
          <h2>添加设备</h2>
          <button class="small-icon-button" type="button" data-action="close-modal" aria-label="关闭">${icon("x")}</button>
        </div>
        <div class="segmented-control" aria-label="添加设备方式">
          <button class="${state.addMode === "scan" ? "active" : ""}" type="button" data-add-mode="scan">${icon("scan-line")}扫码</button>
          <button class="${state.addMode === "imei" ? "active" : ""}" type="button" data-add-mode="imei">${icon("keyboard")}IMEI</button>
          <button class="${state.addMode === "ble" ? "active" : ""}" type="button" data-add-mode="ble">${icon("bluetooth")}BLE</button>
        </div>
        ${renderAutoPanelDownload()}
        ${renderAddDeviceContent()}
        <div class="panel-card">
          <h3>${icon("badge-check")}绑定前确认</h3>
          <p>系统会自动确认设备是否可用、是否已被其他账号绑定，以及当前账号是否可以添加这台设备。</p>
        </div>
      </section>
    </div>
  `;
}

function renderAddDeviceContent() {
  if (state.addMode === "imei") {
    return `
      <div class="sheet-section">
        <div class="field">
          <label for="manual-imei">设备 IMEI</label>
          <input id="manual-imei" inputmode="numeric" value="863450071234001" />
        </div>
        <div class="field">
          <label for="device-name">设备名称</label>
          <input id="device-name" value="妈妈手表" />
        </div>
        <button class="primary-button full-width" type="button" data-action="bind-device">${icon("badge-check")}校验并绑定</button>
      </div>
    `;
  }
  if (state.addMode === "ble") {
    return `
      <div class="sheet-section">
        <div class="scan-status">
          ${icon("bluetooth-searching")}
          <div><strong>已发现附近设备</strong><span>用于近场绑定、参数读取和出厂配置验证</span></div>
        </div>
        <div class="card-list">
          ${mock.discoveredDevices.map((device) => `
            <div class="list-card">
              <div class="list-row">
                <div><strong>${device.name}</strong><span>${device.model} · ${device.id} · 信号${device.signal}</span></div>
                <button class="ghost-button" type="button" data-action="connect-ble">${icon("link")}连接</button>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }
  return `
    <div class="sheet-section">
      <div class="qr-placeholder">
        ${icon("scan-qr-code")}
        <strong>扫描设备二维码</strong>
        <span>识别 IMEI 后进入设备资料填写和绑定校验</span>
      </div>
      <button class="primary-button full-width" type="button" data-action="bind-device">${icon("scan-line")}模拟扫码成功</button>
    </div>
  `;
}

function renderAutoPanelDownload() {
  const steps = [
    "识别到设备型号 EV99 SmartBand",
    "物模型 ev99.tsl 已下载",
    "设备面板已就绪",
  ];
  return `
    <div class="plugin-download-card">
      <div class="plugin-detail-title">
        ${icon("package-check")}
        <div><strong>新型号面板准备</strong><span>添加新设备无需更新 App</span></div>
      </div>
      <div class="download-step-list">
        ${steps.map((step) => `
          <div class="download-step">${icon("check")}<span>${step}</span></div>
        `).join("")}
      </div>
      <button class="primary-button full-width" type="button" data-action="bind-device">${icon("arrow-right")}进入设备绑定</button>
    </div>
  `;
}

function renderEditDeviceModal() {
  const device = getDevice();
  const isOwner = device.permission === "owner";
  return `
    <div class="modal-backdrop" data-action="close-modal">
      <section class="bottom-sheet" role="dialog" aria-modal="true" aria-label="设备管理" data-sheet>
        <div class="sheet-header">
          <h2>设备管理</h2>
          <button class="small-icon-button" type="button" data-action="close-modal" aria-label="关闭">${icon("x")}</button>
        </div>
        <div class="form-grid">
          <div class="field">
            <label for="edit-device-name">设备名称</label>
            <input id="edit-device-name" value="${device.name}" />
          </div>
          <div class="field">
            <label for="edit-device-user">使用者</label>
            <input id="edit-device-user" value="${device.model === "EV04" ? "作业人员" : "家庭成员"}" />
          </div>
          <div class="field">
            <label for="edit-phone">紧急联系人手机号</label>
            <input id="edit-phone" value="+86 138 0000 1234" />
          </div>
          <div class="field">
            <label for="edit-note">备注</label>
            <textarea id="edit-note" rows="3">${device.scenario}</textarea>
          </div>
        </div>
        <div class="panel-card ${isOwner ? "" : "muted-panel"}">
          <h3>${icon(isOwner ? "shield-check" : "lock")}当前权限</h3>
          <p>${isOwner ? "你是设备拥有者，可以编辑资料、分享设备、修改配置和解绑设备。" : "这是分享给你的设备，只能查看位置、健康和告警，不能修改配置或解绑。"}</p>
        </div>
        <div class="sheet-actions">
          <button class="primary-button" type="button" data-action="save-device">${icon("save")}保存</button>
          ${isOwner ? `<button class="danger-button" type="button" data-action="unbind-device">${icon("unlink")}解绑设备</button>` : ""}
        </div>
      </section>
    </div>
  `;
}

function renderGeofenceModal() {
  return `
    <div class="modal-backdrop" data-action="close-modal">
      <section class="bottom-sheet" role="dialog" aria-modal="true" aria-label="安全围栏" data-sheet>
        <div class="sheet-header">
          <h2>安全围栏</h2>
          <button class="small-icon-button" type="button" data-action="close-modal" aria-label="关闭">${icon("x")}</button>
        </div>
        <div class="mini-map-editor">
          <div class="geofence draft"></div>
          <div class="map-pin main">${icon("map-pin")}</div>
          <span>拖动地图选择区域</span>
        </div>
        <div class="form-grid">
          <div class="field">
            <label for="fence-name">围栏名称</label>
            <input id="fence-name" value="Home Zone" />
          </div>
          <div class="field">
            <label for="fence-shape">围栏形状</label>
            <select id="fence-shape"><option>圆形</option><option>多边形</option></select>
          </div>
          <div class="field">
            <label for="fence-radius">半径 / 范围</label>
            <input id="fence-radius" value="300m" />
          </div>
          <div class="field">
            <label for="fence-trigger">提醒条件</label>
            <select id="fence-trigger"><option>进出都提醒</option><option>离开提醒</option><option>进入提醒</option></select>
          </div>
        </div>
        <button class="primary-button full-width" type="button" data-action="save-geofence">${icon("shield-check")}保存围栏</button>
      </section>
    </div>
  `;
}

function renderConfigCategoryModal() {
  const category = mock.configCategories.find((item) => item.id === state.configCategory) || mock.configCategories[0];
  const isReadOnly = category.id === "info";
  return `
    <div class="modal-backdrop" data-action="close-modal">
      <section class="bottom-sheet" role="dialog" aria-modal="true" aria-label="${category.title}" data-sheet>
        <div class="sheet-header">
          <h2>${category.title}</h2>
          <button class="small-icon-button" type="button" data-action="close-modal" aria-label="关闭">${icon("x")}</button>
        </div>
        ${renderConfigCategoryContent(category.id)}
        ${isReadOnly ? "" : `<button class="primary-button full-width" type="button" data-action="save-config">${icon("save")}保存配置</button>`}
      </section>
    </div>
  `;
}

function renderCallContent() {
  return `
    <div class="config-list">
      <div class="config-card">
        <div class="section-header">
          <div>
            <h3>${icon("contact")}紧急联系人</h3>
            <p>按优先级依次拨打，触发场景独立配置</p>
          </div>
          <button class="text-button" type="button" data-action="toast-add-contact">${icon("plus")}添加</button>
        </div>
        <div class="contact-list">
          ${mock.emergencyContacts.map((contact) => `
            <button class="contact-row" type="button" data-action="toast-edit-contact">
              <div class="contact-priority">${contact.priority}</div>
              <div class="contact-info">
                <strong>${contact.name}</strong>
                <span>${contact.relation} · ${contact.phone}</span>
                <small>触发：${contact.triggers}</small>
              </div>
              ${icon("chevron-right")}
            </button>
          `).join("")}
        </div>
      </div>

      <div class="config-card">
        <h3>${icon("phone-call")}通话与按键</h3>
        <div class="form-grid">
          <div class="field"><label for="call-mode">来电策略</label><select id="call-mode"><option>仅白名单可呼入</option><option>所有号码可呼入</option></select></div>
          <div class="field"><label for="button-action">按键行为</label><select id="button-action"><option>长按 SOS</option><option>短按报位置</option><option>双击拨打优先联系人</option></select></div>
          <div class="field"><label for="sos-mode">SOS 触发后</label><select id="sos-mode"><option>依次拨打全部联系人</option><option>仅拨打第一位</option><option>同时短信全部</option></select></div>
        </div>
      </div>
    </div>
  `;
}

function renderNetworkContent(device) {
  const hw = device.hardware || {};
  const sub = mock.services.subscriptions.find((item) => item.device.startsWith(device.name));
  return `
    <div class="config-list">
      ${sub ? `
      <div class="config-card">
        <h3>${icon("sim-card")}本设备 SIM 套餐</h3>
        <div class="info-list">
          <div class="info-row"><span>当前套餐</span><strong>${sub.plan}</strong></div>
          <div class="info-row"><span>剩余流量</span><strong>${sub.remaining}</strong></div>
          <div class="info-row"><span>到期时间</span><strong>${sub.expireAt}</strong></div>
          <div class="info-row"><span>套餐状态</span><strong>${sub.status}</strong></div>
        </div>
        <div class="sheet-actions">
          <button class="primary-button" type="button" data-action="toast-renew">${icon("refresh-cw")}立即续费</button>
          <button class="ghost-button" type="button" data-action="open-settings" data-settings="service">${icon("credit-card")}查看全部订单</button>
        </div>
      </div>
      ` : `
      <div class="panel-card muted-panel">
        <h3>${icon("sim-card")}无 SIM 套餐</h3>
        <p>当前设备未绑定 SIM 套餐或不需要 SIM（仅蓝牙设备）。</p>
      </div>
      `}

      <div class="config-card">
        <h3>${icon("router")}网络与 APN 参数</h3>
        <div class="form-grid">
          <div class="field"><label for="apn">APN</label><input id="apn" value="iot.provider" /></div>
          <div class="field"><label for="server">服务器地址</label><input id="server" value="evmars.example.com" /></div>
          <div class="field"><label for="iccid">ICCID</label><input id="iccid" value="${hw.iccid || "—"}" readonly /></div>
        </div>
      </div>

      <button class="list-card" type="button" data-action="toast-channel">
        <div class="list-row">
          <div>
            <strong>指令下发通道</strong>
            <span>API（默认） · BLE 近场 · SMS 短信备用</span>
            <small>设备离线或弱网时自动切换到 BLE 或 SMS</small>
          </div>
          ${icon("chevron-right")}
        </div>
      </button>
    </div>
  `;
}

function renderPluginDetailCard(device) {
  const plugin = devicePluginInfo(device);
  const rows = [
    ["物模型版本", plugin.tsl],
    ["面板版本", plugin.panel],
    ["提供方", plugin.provider],
    ["生效能力", `${plugin.enabled.join(" / ")}（${plugin.enabled.length} 类）`],
    ["可扩展能力", plugin.extensible],
  ];
  return `
    <div class="plugin-detail-card">
      <div class="plugin-detail-title">
        ${icon("puzzle")}
        <div><strong>设备插件</strong><span>按物模型和面板版本动态展示能力</span></div>
      </div>
      <div class="info-list plugin-info-list">
        ${rows.map(([label, value]) => `
          <div class="info-row">
            <span>${label}</span>
            <strong>${value}</strong>
          </div>
        `).join("")}
      </div>
      <button class="ghost-button full-width" type="button" data-action="toast-panel-update">${icon("refresh-cw")}检查面板更新</button>
    </div>
  `;
}

function renderConfigCategoryContent(id) {
  const device = getDevice();
  const hw = device.hardware || {};
  const content = {
    info: `
      <div class="info-list">
        ${[
          ["IMEI", hw.imei || "—"],
          ["MAC 地址", hw.mac || "—"],
          ["固件版本", hw.firmware || "—"],
          ["硬件版本", hw.hardware || "—"],
          ["ICCID", hw.iccid || "—"],
          ["SIM 运营商", hw.sim || "—"],
          ["蓝牙版本", hw.bleVersion || "—"],
          ["生产日期", hw.producedAt || "—"],
          ["激活日期", hw.activatedAt || "—"],
        ].map(([label, value]) => `
          <div class="info-row">
            <span>${label}</span>
            <strong>${value}</strong>
          </div>
        `).join("")}
      </div>
      ${renderPluginDetailCard(device)}
      <div class="panel-card">
        <h3>${icon("info")}说明</h3>
        <p>设备信息为只读字段，用于售后排查、配件匹配和 OTA 兼容性确认。BLE 近场连接时可读取最新硬件状态。</p>
      </div>
    `,
    home: `
      <div class="config-list">
        <div class="config-card">
          <h3>${icon("wifi")}Home WiFi</h3>
          <div class="field"><label for="wifi-ssid">SSID</label><input id="wifi-ssid" value="Home_5G" /></div>
          <div class="field"><label for="wifi-password">密码</label><input id="wifi-password" type="password" value="12345678" /></div>
        </div>
        <div class="config-card">
          <h3>${icon("bluetooth")}Home Beacon</h3>
          <div class="field"><label for="beacon-id">Beacon UUID</label><input id="beacon-id" value="FDA5-1201" /></div>
          <button class="ghost-button full-width" type="button" data-action="copy-config">${icon("copy-check")}从其他设备复制</button>
        </div>
      </div>
    `,
    location: `
      <div class="form-grid">
        <div class="field"><label for="loc-mode">定位方式</label><select id="loc-mode"><option>GPS + WiFi + LBS 自动</option><option>GPS 优先</option><option>省电定位</option></select></div>
        <div class="field"><label for="upload-interval">上报间隔</label><select id="upload-interval"><option>5 分钟</option><option>1 分钟</option><option>15 分钟</option></select></div>
        <div class="field"><label for="agps">AGPS</label><select id="agps"><option>开启</option><option>关闭</option></select></div>
        <div class="field"><label for="map-engine">地图方案</label><select id="map-engine"><option>国内高德 / 海外 Google</option><option>国内百度 / 海外 Google</option><option>OSM 备选</option></select></div>
      </div>
    `,
    alerts: `
      <div class="toggle-list">
        ${[
          ["跌倒告警", "灵敏度：中"],
          ["低电量告警", "阈值：20%"],
          ["离线告警", "超过 30 分钟未上报"],
          ["超速告警", "超过 80km/h"],
        ].map(([title, desc]) => `<label class="toggle-row"><span><strong>${title}</strong><small>${desc}</small></span><input type="checkbox" checked /></label>`).join("")}
      </div>
    `,
    call: renderCallContent(),
    sensor: `
      <div class="toggle-list">
        ${[
          ["心率采集", "每 30 分钟采集一次"],
          ["步数统计", "每日 00:00 重置"],
          ["运动检测", "用于跌倒和久坐判断"],
          ["灵敏度", "中等灵敏度"],
        ].map(([title, desc]) => `<label class="toggle-row"><span><strong>${title}</strong><small>${desc}</small></span><input type="checkbox" checked /></label>`).join("")}
      </div>
    `,
    ble: `
      <div class="config-list">
        <div class="scan-status">${icon("bluetooth-connected")}<div><strong>蓝牙已就绪</strong><span>用于近场读取、写入配置和设备升级</span></div></div>
        <button class="ghost-button full-width" type="button" data-action="connect-ble">${icon("download")}读取当前参数</button>
        <button class="ghost-button full-width" type="button" data-action="ota-check">${icon("upload-cloud")}检查 OTA 固件</button>
      </div>
    `,
    network: renderNetworkContent(device),
  };
  return content[id] || content.home;
}

function renderSettingsModal() {
  const panelMap = {
    profile: ["账号资料", renderProfileSettings()],
    security: ["账号与安全", renderSecuritySettings()],
    notifications: ["通知设置", renderNotificationSettings()],
    map: ["地区与地图服务", renderMapSettings()],
    service: ["我的服务", renderServiceSettings()],
    feedback: ["意见反馈", renderFeedbackSettings()],
    about: ["关于与协议", renderAboutSettings()],
  };
  const [title, content] = panelMap[state.settingsPanel] || panelMap.profile;
  return `
    <div class="modal-backdrop" data-action="close-modal">
      <section class="bottom-sheet" role="dialog" aria-modal="true" aria-label="${title}" data-sheet>
        <div class="sheet-header">
          <h2>${title}</h2>
          <button class="small-icon-button" type="button" data-action="close-modal" aria-label="关闭">${icon("x")}</button>
        </div>
        ${content}
      </section>
    </div>
  `;
}

function renderProfileSettings() {
  return `
    <div class="form-grid">
      <div class="field"><label for="profile-name">昵称</label><input id="profile-name" value="${mock.user.name}" /></div>
      <div class="field"><label for="profile-email">邮箱</label><input id="profile-email" type="email" value="${mock.user.email}" /></div>
      <div class="field"><label for="profile-phone">手机号</label><input id="profile-phone" value="+86 138 0000 1234" /></div>
      <div class="field"><label for="profile-region">国家 / 地区</label><select id="profile-region"><option>中国大陆</option><option>中国香港</option><option>美国</option><option>欧洲</option></select></div>
    </div>
    <button class="primary-button full-width" type="button" data-action="save-settings">${icon("save")}保存资料</button>
  `;
}

function renderSecuritySettings() {
  const oauthBindings = oauthProviders();
  return `
    <div class="card-list">
      <button class="list-card" type="button" data-action="toast-change-password"><div class="list-row"><div><strong>修改密码</strong><span>通过旧密码或邮箱验证码修改</span></div>${icon("chevron-right")}</div></button>
      <button class="list-card" type="button" data-action="toast-bind-email"><div class="list-row"><div><strong>邮箱与手机号</strong><span>用于登录、找回密码和接收安全通知</span></div>${icon("chevron-right")}</div></button>
      <button class="list-card" type="button" data-action="toast-login-devices"><div class="list-row"><div><strong>登录设备</strong><span>查看最近登录记录，发现异常可退出</span></div>${icon("chevron-right")}</div></button>
    </div>

    <div class="oauth-section">
      <div class="settings-group-title">第三方账号绑定</div>
      <div class="oauth-account-list">
      ${oauthBindings.map((item) => `
        <button class="oauth-provider-card account ${item.id}" type="button" data-action="toast-oauth-bind" data-provider="${item.id}">
          <div class="oauth-provider-main">
            ${renderOauthBrandIcon(item)}
            <span class="oauth-provider-text">
              <strong>${item.name}</strong>
              <small>${item.bound ? item.account : "绑定后可用于快捷登录"}</small>
            </span>
          </div>
          <span class="oauth-status ${item.bound ? "bound" : "unbound"}">${item.bound ? "已绑定" : "未绑定"}</span>
        </button>
      `).join("")}
      </div>
    </div>

    <div class="danger-zone account-danger">
      <div><strong>注销账号</strong><span>注销前需要确认设备、分享和数据处理方式</span></div>
      <button class="danger-button" type="button" data-action="toast-delete-account">${icon("trash-2")}申请注销</button>
    </div>
  `;
}

function renderNotificationSettings() {
  const rows = [
    ["SOS 紧急呼叫", "始终推送，建议保持开启"],
    ["跌倒告警", "设备检测到疑似跌倒时提醒"],
    ["设备离线", "超过 30 分钟未上报时提醒"],
    ["低电量", "电量低于 20% 时提醒"],
    ["系统通知", "服务更新、协议变更和账号安全提醒"],
  ];
  return `
    <div class="toggle-list">
      ${rows.map(([title, desc]) => `<label class="toggle-row"><span><strong>${title}</strong><small>${desc}</small></span><input type="checkbox" checked /></label>`).join("")}
    </div>
    <div class="form-grid">
      <div class="field"><label for="quiet-hours">免打扰时段</label><select id="quiet-hours"><option>22:00 - 08:00</option><option>关闭</option><option>自定义</option></select></div>
    </div>
    <button class="primary-button full-width" type="button" data-action="save-settings">${icon("save")}保存通知设置</button>
  `;
}

function renderMapSettings() {
  return `
    <div class="form-grid">
      <div class="field"><label for="map-region">当前使用地区</label><select id="map-region"><option>中国大陆</option><option>海外</option></select></div>
      <div class="field"><label for="map-provider">地图服务</label><select id="map-provider"><option>国内高德 / 海外 Google</option><option>国内百度 / 海外 Google</option><option>OpenStreetMap 备选</option></select></div>
      <div class="field"><label for="location-permission">定位权限</label><select id="location-permission"><option>使用 App 期间允许</option><option>始终允许</option><option>暂不允许</option></select></div>
    </div>
    <div class="panel-card">
      <h3>${icon("map")}说明</h3>
      <p>这里用于管理 App 自身的地图显示、地区和权限。查看设备位置仍然在设备详情的地图页完成。</p>
    </div>
    <button class="primary-button full-width" type="button" data-action="save-settings">${icon("save")}保存地图设置</button>
  `;
}

function renderServiceSettings() {
  const svc = mock.services;
  return `
    <div class="section-header">
      <div>
        <h2>套餐订阅</h2>
        <p>每台设备的 SIM 套餐与流量状态</p>
      </div>
    </div>
    <div class="card-list">
      ${svc.subscriptions.map((sub) => `
        <div class="list-card">
          <div class="list-row">
            <div>
              <strong>${sub.device}</strong>
              <span>${sub.plan}</span>
              <small>${sub.expireAt} · ${sub.remaining}</small>
            </div>
            <span class="status-pill ${sub.status === "正常" ? "online" : "warning"}">${sub.status}</span>
          </div>
          <div class="inline-actions">
            <button class="ghost-button" type="button" data-action="toast-renew">${icon("refresh-cw")}续费</button>
            <button class="text-button" type="button" data-action="toast-change-plan">更换套餐</button>
          </div>
        </div>
      `).join("")}
    </div>

    <div class="section-header" style="margin-top:14px;">
      <div>
        <h2>订单与发票</h2>
        <p>支付记录、待支付订单和发票申请</p>
      </div>
    </div>
    <div class="card-list">
      ${svc.orders.map((order) => `
        <div class="list-card">
          <div class="list-row">
            <div>
              <strong>${order.desc}</strong>
              <span>${order.id} · ${order.time}</span>
            </div>
            <div class="order-meta">
              <strong>${order.amount}</strong>
              <span class="status-pill ${order.status === "已支付" ? "online" : "warning"}">${order.status}</span>
            </div>
          </div>
        </div>
      `).join("")}
    </div>

    <div class="section-header" style="margin-top:14px;">
      <div>
        <h2>支付与续费</h2>
        <p>支付方式与自动续费</p>
      </div>
    </div>
    <div class="card-list">
      <button class="list-card" type="button" data-action="toast-payment-method">
        <div class="list-row">
          <div><strong>支付方式</strong><span>当前：${svc.paymentMethod}</span></div>
          ${icon("chevron-right")}
        </div>
      </button>
      <label class="toggle-row">
        <span><strong>自动续费</strong><small>到期前 7 天自动扣款，可随时关闭</small></span>
        <input type="checkbox" ${svc.autoRenew ? "checked" : ""} />
      </label>
      <button class="list-card" type="button" data-action="toast-invoice">
        <div class="list-row">
          <div><strong>发票管理</strong><span>申请电子发票或下载历史发票</span></div>
          ${icon("chevron-right")}
        </div>
      </button>
    </div>

    <div class="panel-card">
      <h3>${icon("info")}说明</h3>
      <p>SIM 套餐属于设备级服务，每台设备独立计费。这里聚合所有设备的订阅、订单和支付方式。设备配置 → 网络与 SIM 中也可查看本设备的当前状态并直接续费。</p>
    </div>
  `;
}

function renderFeedbackSettings() {
  return `
    <div class="form-grid">
      <div class="field"><label for="feedback-type">问题类型</label><select id="feedback-type"><option>设备离线或定位不准</option><option>账号与登录</option><option>分享与权限</option><option>其他建议</option></select></div>
      <div class="field"><label for="feedback-content">问题描述</label><textarea id="feedback-content" rows="4">设备偶尔定位不准，希望帮忙排查。</textarea></div>
    </div>
    <div class="sheet-actions">
      <button class="primary-button" type="button" data-action="send-feedback">${icon("send")}提交反馈</button>
      <button class="ghost-button" type="button" data-action="open-chat">${icon("bot")}AI 客服</button>
    </div>
  `;
}

function renderAboutSettings() {
  return `
    <div class="about-version">
      <div class="brand-mark">${icon("radio-tower")}</div>
      <div><strong>Eview Connect</strong><span>版本 0.1.0 Prototype</span></div>
    </div>
    <div class="card-list">
      <button class="list-card" type="button" data-action="toast-policy"><div class="list-row"><div><strong>用户协议</strong><span>查看账号、设备和服务使用条款</span></div>${icon("chevron-right")}</div></button>
      <button class="list-card" type="button" data-action="toast-policy"><div class="list-row"><div><strong>隐私政策</strong><span>查看个人信息和设备数据使用说明</span></div>${icon("chevron-right")}</div></button>
      <button class="list-card" type="button" data-action="toast-permissions"><div class="list-row"><div><strong>权限说明</strong><span>位置、蓝牙、相机、通知权限用途</span></div>${icon("chevron-right")}</div></button>
      <button class="list-card" type="button" data-action="toast-version"><div class="list-row"><div><strong>检查更新</strong><span>当前已是最新版本</span></div>${icon("refresh-cw")}</div></button>
    </div>
  `;
}

function renderLogoutConfirmModal() {
  return `
    <div class="modal-backdrop" data-action="close-modal">
      <section class="bottom-sheet compact-sheet" role="dialog" aria-modal="true" aria-label="退出登录确认" data-sheet>
        <div class="sheet-header">
          <h2>退出登录？</h2>
          <button class="small-icon-button" type="button" data-action="close-modal" aria-label="关闭">${icon("x")}</button>
        </div>
        <p class="confirm-text">退出后将返回登录页，设备告警需要重新登录后查看。</p>
        <div class="sheet-actions">
          <button class="danger-button" type="button" data-action="logout">${icon("log-out")}退出登录</button>
          <button class="ghost-button" type="button" data-action="close-modal">取消</button>
        </div>
      </section>
    </div>
  `;
}

function renderH5Modal() {
  const device = getDevice();
  return `
    <div class="modal-backdrop" data-action="close-modal">
      <section class="bottom-sheet" role="dialog" aria-modal="true" aria-label="帮助中心" data-sheet>
        <div class="sheet-header">
          <h2>帮助中心</h2>
          <button class="small-icon-button" type="button" data-action="close-modal" aria-label="关闭">${icon("x")}</button>
        </div>
        <div class="h5-shell">
          <div class="h5-topbar"><span>Eview Help</span><span>在线</span></div>
          <div class="h5-content">
            <div class="panel-card">
              <h3>${icon("file-question")}设备帮助中心</h3>
              <p>查看设备离线、定位不准、配置、分享和服务协议相关帮助。</p>
            </div>
            <button class="list-card" type="button" data-action="h5-open-device">
              <div class="list-row">
                <div><strong>${device.name} 使用说明</strong><span>绑定、定位、充电和告警说明</span></div>
                ${icon("chevron-right")}
              </div>
            </button>
            <button class="list-card" type="button" data-action="toast-policy">
              <div class="list-row">
                <div><strong>服务协议与隐私政策</strong><span>查看账号、设备和数据使用说明</span></div>
                ${icon("chevron-right")}
              </div>
            </button>
            <button class="list-card" type="button" data-action="open-chat">
              <div class="list-row">
                <div><strong>联系在线客服</strong><span>获取设备问题排查建议</span></div>
                ${icon("chevron-right")}
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderChatModal() {
  return `
    <div class="modal-backdrop" data-action="close-modal">
      <section class="bottom-sheet" role="dialog" aria-modal="true" aria-label="AI 客服" data-sheet>
        <div class="sheet-header">
          <h2>AI 客服</h2>
          <button class="small-icon-button" type="button" data-action="close-modal" aria-label="关闭">${icon("x")}</button>
        </div>
        <div class="chat-shell">
          ${state.chat.map((message) => `<div class="chat-message ${message.role === "user" ? "user" : ""}">${message.text}</div>`).join("")}
        </div>
        <div class="section">
          <div class="tag-grid">
            ${mock.aiQuestions.map((item, index) => `<button class="ghost-button" type="button" data-question="${index}">${item.q}</button>`).join("")}
          </div>
          <div class="chat-input-row">
            <input id="chat-input" type="text" value="为什么设备离线？" aria-label="输入问题" />
            <button class="icon-button" type="button" data-action="send-chat" aria-label="发送">${icon("send")}</button>
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderAiModal() {
  return `
    <div class="modal-backdrop" data-action="close-modal">
      <section class="bottom-sheet" role="dialog" aria-modal="true" aria-label="AI 分析" data-sheet>
        <div class="sheet-header">
          <h2>AI 分析结果</h2>
          <button class="small-icon-button" type="button" data-action="close-modal" aria-label="关闭">${icon("x")}</button>
        </div>
        <div class="insight-card warning">
          <h3>${icon("sparkles")}规则引擎 + AI 解释</h3>
          <p>系统已结合位置、健康、告警和历史行为生成解释，并给出下一步处理建议。</p>
        </div>
      </section>
    </div>
  `;
}

function bindEvents() {
  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.tab = button.dataset.tab;
      state.route = "home";
      state.modal = null;
      render();
    });
  });

  document.querySelectorAll("[data-open-device]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedDeviceId = button.dataset.openDevice;
      state.detailTab = button.dataset.detailTab || "overview";
      state.route = "detail";
      state.loggedIn = true;
      render();
    });
  });

  document.querySelectorAll("[data-detail-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.detailTab = button.dataset.detailTab;
      render();
    });
  });

  document.querySelectorAll("[data-map-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.mapFilter = button.dataset.mapFilter;
      render();
    });
  });

  document.querySelectorAll("[data-health-range]").forEach((button) => {
    button.addEventListener("click", () => {
      state.healthRange = button.dataset.healthRange;
      render();
    });
  });

  document.querySelectorAll("[data-add-mode]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      state.addMode = button.dataset.addMode;
      render();
    });
  });

  document.querySelectorAll("[data-config-category]").forEach((button) => {
    button.addEventListener("click", () => {
      state.configCategory = button.dataset.configCategory;
      state.modal = "config-category";
      render();
    });
  });

  const loginForm = document.querySelector("[data-form='login']");
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      state.loggedIn = true;
      state.route = "home";
      state.tab = "map";
      render();
    });
  }

  document.querySelectorAll("[data-action]").forEach((element) => {
    element.addEventListener("click", (event) => {
      const action = element.dataset.action;
      if (element.closest("[data-sheet]") && action !== "close-modal") {
        event.stopPropagation();
      }
      handleAction(action, element, event);
    });
  });

  document.querySelectorAll("[data-question]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = mock.aiQuestions[Number(button.dataset.question)];
      state.chat.push({ role: "user", text: item.q }, { role: "assistant", text: item.a });
      render();
    });
  });
}

function handleAction(action, element, event) {
  const actions = {
    reset() {
      state.loggedIn = false;
      state.route = "login";
      state.tab = "map";
      state.detailTab = "overview";
      state.modal = null;
      state.mapFilter = "all";
      state.healthRange = "week";
      state.brandTheme = "care";
      state.addMode = "scan";
      state.configCategory = "home";
      state.settingsPanel = "profile";
      state.chat = [{ role: "assistant", text: "你好，我可以帮你解释告警、排查设备离线，也可以说明如何分享和配置设备。" }];
      render();
    },
    "quick-demo"() {
      state.loggedIn = true;
      state.route = "home";
      state.tab = "map";
      state.modal = null;
      showToast("已进入地图首页");
    },
    back() {
      state.route = "home";
      render();
    },
    "open-share"() {
      state.modal = "share";
      render();
    },
    "open-add-device"() {
      state.modal = "add-device";
      state.addMode = "scan";
      render();
    },
    "open-edit-device"() {
      state.modal = "edit-device";
      render();
    },
    "open-geofence"() {
      state.modal = "geofence";
      render();
    },
    "open-settings"() {
      state.settingsPanel = element.dataset.settings || "profile";
      state.modal = "settings";
      render();
    },
    "open-h5"() {
      state.modal = "h5";
      render();
    },
    "open-chat"() {
      state.modal = "chat";
      render();
    },
    "close-modal"() {
      const isBackdrop = element.classList.contains("modal-backdrop");
      if (!isBackdrop || event?.target === element) {
        state.modal = null;
        render();
      }
    },
    "toast-sync"() {
      showToast("设备状态、告警和健康摘要已同步");
    },
    "toast-scan"() {
      showToast("扫码添加入口：后续对接 IMEI 校验和设备绑定接口");
    },
    "toast-track"() {
      showToast("已切换到轨迹回放，正式版按时间查询历史轨迹");
    },
    "toast-map-layer"() {
      showToast("地图图层：正式版支持地图、卫星和围栏显示切换");
    },
    "toast-locate"() {
      showToast("已发送单次定位指令，等待设备上报");
    },
    "toast-find"() {
      showToast("已发送查找设备指令");
    },
    "send-share"() {
      state.modal = null;
      showToast("分享邀请已发送，等待对方接受");
    },
    "resend-share"() {
      showToast("分享权限已更新，待服务端同步");
    },
    "revoke-share"() {
      showToast("已取消该用户的设备分享权限");
    },
    "accept-share"() {
      showToast("已接受分享邀请，设备会出现在首页列表");
    },
    "reject-share"() {
      showToast("已拒绝分享邀请");
    },
    "mark-read"() {
      showToast("消息已标为已读");
    },
    "bind-device"() {
      state.modal = null;
      showToast("设备校验通过，已进入绑定成功流程");
    },
    "connect-ble"() {
      showToast("BLE 已连接，正在读取设备参数");
    },
    "save-device"() {
      state.modal = null;
      showToast("设备资料已保存");
    },
    "unbind-device"() {
      state.modal = null;
      showToast("已提交解绑确认，正式版需要二次确认");
    },
    "save-geofence"() {
      state.modal = null;
      showToast("安全围栏已保存，等待服务端同步");
    },
    "save-config"() {
      state.modal = null;
      showToast("配置已保存，等待设备确认下发结果");
    },
    "save-settings"() {
      state.modal = null;
      showToast("设置已保存");
    },
    "send-feedback"() {
      state.modal = null;
      showToast("反馈已提交，客服会在消息中心回复");
    },
    "logout-confirm"() {
      state.modal = "logout-confirm";
      render();
    },
    "toast-change-password"() {
      showToast("修改密码流程：邮箱验证码 + 新密码");
    },
    "toast-bind-email"() {
      showToast("邮箱和手机号绑定需要验证码确认");
    },
    "toast-login-devices"() {
      showToast("登录设备列表将在正式版本展示");
    },
    "toast-delete-account"() {
      showToast("账号注销需要确认设备、分享和数据处理方式");
    },
    "toast-permissions"() {
      showToast("权限说明包含位置、蓝牙、相机和通知用途");
    },
    "toast-version"() {
      showToast("当前已是最新版本");
    },
    "ota-check"() {
      showToast("已检查固件版本，当前设备为最新版本");
    },
    "copy-config"() {
      showToast("Home WiFi / Home Beacon 配置已复制到目标设备");
    },
    "alarm-ai"() {
      state.modal = "ai";
      render();
    },
    "ai-health"() {
      state.selectedDeviceId = "dev-ev05-mom";
      state.route = "detail";
      state.detailTab = "health";
      render();
    },
    "ai-alert"() {
      state.selectedDeviceId = "dev-ev05-mom";
      state.route = "detail";
      state.detailTab = "alarms";
      render();
    },
    "send-chat"() {
      const input = document.getElementById("chat-input");
      const text = input?.value?.trim() || "为什么设备离线？";
      const answer = mock.aiQuestions.find((item) => item.q === text)?.a || mock.aiQuestions[0].a;
      state.chat.push({ role: "user", text }, { role: "assistant", text: answer });
      render();
    },
    "h5-open-device"() {
      state.modal = null;
      state.route = "detail";
      state.detailTab = "overview";
      showToast("已打开设备使用说明");
    },
    "toast-research"() {
      showToast("地图与定位设置将在正式版本中提供");
    },
    "toast-policy"() {
      showToast("服务协议与隐私政策将在正式版本中打开详情页");
    },
    "toast-pet-edit"() {
      showToast("宠物档案编辑：品种、生日、体重、疫苗记录可在正式版本完善");
    },
    "toast-panel-update"() {
      showToast("面板检查：物模型与面板版本已是当前型号最新版本");
    },
    "toast-supported-models"() {
      showToast("支持型号清单：按 manifest 下发，可扩展更多设备型号");
    },
    "toast-third-party-device"() {
      showToast("第三方设备接入：预留 AB 协议以外的产品物模型入口");
    },
    "switch-brand-theme"() {
      const next = nextBrandTheme();
      state.brandTheme = next.id;
      showToast(`已切换品牌主题：${next.name}`);
    },
    "toast-forgot-password"() {
      showToast("找回密码：通过邮箱或手机号验证码重置，将在正式版本完成");
    },
    "toast-renew"() {
      showToast("跳转支付：续费订单已生成，正式版接入微信支付/支付宝/Stripe");
    },
    "toast-change-plan"() {
      showToast("更换套餐：可在套餐目录中选择更高或更低档套餐");
    },
    "toast-payment-method"() {
      showToast("支付方式：支持微信、支付宝、Stripe 卡片、PayPal");
    },
    "toast-invoice"() {
      showToast("发票管理：电子发票申请和历史发票下载入口");
    },
    "toast-add-contact"() {
      showToast("添加紧急联系人：姓名、关系、手机号、优先级和触发场景");
    },
    "toast-edit-contact"() {
      showToast("编辑紧急联系人：可调整优先级、触发场景或删除");
    },
    "toast-channel"() {
      showToast("指令通道：API（默认）/ BLE 近场 / SMS 短信备用，根据设备状态自动选择");
    },
    "toast-oauth"() {
      const labelMap = { wechat: "微信", apple: "Apple", google: "Google" };
      const label = labelMap[element.dataset.provider] || "第三方";
      showToast(`${label} 登录：调起 SDK 授权 → 绑定到 Evmars 账号`);
    },
    "toast-oauth-bind"() {
      const labelMap = { wechat: "微信", apple: "Apple", google: "Google" };
      const label = labelMap[element.dataset.provider] || "第三方";
      showToast(`${label} 账号：绑定后可一键登录，解绑前确认账号回退方式`);
    },
    logout() {
      state.loggedIn = false;
      state.route = "login";
      state.modal = null;
      render();
    },
  };
  actions[action]?.();
}

function showToast(message) {
  state.toast = message;
  render();
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    state.toast = "";
    render();
  }, 2600);
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

render();
