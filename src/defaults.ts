import type {
	AutofixIssue,
	BoardSpecification,
	Fabricator,
	ProjectDetails,
	SavedAddress,
} from "./types";

export const DEFAULT_PRICE_PER_BOARD = 5;

export const AUTOFIX_TIP =
	"Your board exceeds tscircuit SF's specs. We'll auto-fix it and send a revised version for review - you'll have 24h to accept, otherwise changes auto-accept and ship.";

export const DEFAULT_AUTOFIX_ISSUES: AutofixIssue[] = [
	{
		label: "Via diameter too large",
		detail: "Reduce 0.6mm vias to 0.4mm (fab max)",
	},
	{
		label: "Board too large",
		detail: "46x30mm exceeds 100x100mm panel limit - wait, this fits",
	},
	{
		label: "Trace width below minimum",
		detail: "Widen 4mil traces to 6mil minimum",
	},
	{
		label: "Drill hit too close to edge",
		detail: "Move 2 holes >=0.3mm from board edge",
	},
	{
		label: "Silkscreen overlapping pad",
		detail: "Reposition reference designators clear of pads",
	},
];

export const defaultProject: ProjectDetails = {
	name: "my-blinker-v3.tsx",
	version: "commit 8a4f29c · main",
	dimensions: "42 x 28 mm",
};

export const defaultSpecifications: BoardSpecification[] = [
	{ label: "Layers", value: "2" },
	{ label: "Thickness", value: "1.6 mm" },
	{ label: "Material", value: "FR-4" },
	{ label: "Finish", value: "HASL" },
	{ label: "Soldermask", value: "Green" },
	{ label: "Min trace", value: "6 mil" },
	{ label: "Min hole", value: "0.3 mm" },
];

export const defaultAddress: SavedAddress = {
	name: "Alex Chen",
	line1: "482 Valencia Street",
	line2: "Apt 3B",
	cityState: "San Francisco, CA 94103",
	country: "United States",
};

export const defaultFabricators: Fabricator[] = [
	{
		id: "tsf",
		name: "tscircuit San Francisco",
		countryCode: "US",
		eta: "3-5 days",
		pricePerBoard: DEFAULT_PRICE_PER_BOARD,
		freeShippingLabel: "Free shipping",
	},
];
