export type OrderQuantity = 1 | 3 | 10 | "custom";
export interface SavedAddress {
    name: string;
    line1: string;
    line2?: string;
    cityState: string;
    country: string;
}
export interface AutofixIssue {
    label: string;
    detail: string;
}
export interface Fabricator {
    id: string;
    name: string;
    countryCode?: "US";
    eta: string;
    pricePerBoard: number;
    freeShippingLabel: string;
    disabledReason?: string;
}
export interface OrderDialogProps {
    project?: {
        name: string;
        version: string;
        dimensions?: string;
    };
    address?: SavedAddress;
    fabricators?: Fabricator[];
    defaultQuantity?: OrderQuantity;
    defaultCustomQuantity?: string;
    autofixIssues?: AutofixIssue[];
    onClose?: () => void;
    onSubmit?: (order: {
        quantity: number;
        fabricatorId: string;
        total: number;
        autofixRequired: boolean;
    }) => void;
}
export declare function OrderDialog({ project, address, fabricators, defaultQuantity, defaultCustomQuantity, autofixIssues, onClose, onSubmit, }: OrderDialogProps): import("react/jsx-runtime").JSX.Element;
