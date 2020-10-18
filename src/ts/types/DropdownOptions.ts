export type DropdownOptions = {
    togglers: HTMLElement | NodeListOf<HTMLElement>,
    bodyClose: boolean,
    opened: boolean,
    class: any,
    onOpen?: Function,
    onClose?: Function
}