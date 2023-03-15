// let popupZIndex: number = 1;
// var popupZIndex = 1;
globalThis.__popupZIndex__ = 0;

export const getPopupZIndex = () => {
    // return popupZIndex++;
    return ++globalThis.__popupZIndex__;
};
