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
