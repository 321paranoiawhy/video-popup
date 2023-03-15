export interface PopupType {
    // showPopup: boolean; // 必传
    zIndex: number;
    totalTips: number; // 总信息数量
    currentTip: number; // 当前信息: 1 ~ totalTips
    content: any; // 内容
    contentType?: string; // 内容类型, 如 img / richtext / video
}
