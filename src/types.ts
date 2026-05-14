import type { ReactNode } from "react";
import type {
	CheckoutSession,
	CreateCheckoutSessionRequest,
} from "@tscircuit/fake-stripe/types";

export type OrderQuantity = 1 | 3 | 10 | "custom";

export interface ProjectDetails {
	name: string;
	version: string;
	dimensions?: string;
}

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

export interface BoardSpecification {
	label: string;
	value: ReactNode;
}

export type BoardImage =
	| string
	| {
			src: string;
			alt?: string;
	  };

export interface CheckoutSessionContext {
	orderId: string;
	quantity: number;
	fabricator: Fabricator;
	total: number;
	autofixRequired: boolean;
	project: ProjectDetails;
}

export interface OrderDialogCheckout {
	endpoint?: string;
	successUrl?: string;
	cancelUrl?: string;
	currency?: string;
	createSession?: (
		request: CreateCheckoutSessionRequest,
		context: CheckoutSessionContext,
	) => Promise<CheckoutSession>;
}

export interface OrderDialogProps {
	project?: ProjectDetails;
	boardImage?: BoardImage;
	specifications?: BoardSpecification[];
	address?: SavedAddress;
	fabricators?: Fabricator[];
	defaultQuantity?: OrderQuantity;
	defaultCustomQuantity?: string;
	autofixIssues?: AutofixIssue[];
	checkout?: OrderDialogCheckout;
	onClose?: () => void;
	onSubmit?: (order: {
		quantity: number;
		fabricatorId: string;
		total: number;
		autofixRequired: boolean;
	}) => void;
}
