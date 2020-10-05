export interface PopupInterface {
    el: string | object,
    openers: string | object,
    closable?: boolean,
    onLoad?: Function,
    onOpen?: Function,
    onClose?: Function
}