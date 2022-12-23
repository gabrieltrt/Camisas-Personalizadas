export default interface CartItem {
    annex: string | Blob;
    id: number,
    template_name: string,
    quantity: number,
    tissue: string
}