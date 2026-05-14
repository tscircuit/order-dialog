import { useState } from "react";
import type { AutofixIssue } from "../types";

export function AutofixDetails({ issues }: { issues: AutofixIssue[] }) {
	const [open, setOpen] = useState(false);

	return (
		<div className={`od-autofix-details ${open ? "open" : ""}`}>
			<button
				className="od-autofix-summary"
				onClick={() => setOpen((current) => !current)}
				aria-expanded={open}
				type="button"
			>
				<span className="od-caret" aria-hidden="true">
					<svg width="10" height="10" viewBox="0 0 10 10" fill="none">
						<path
							d="M3 2L7 5L3 8"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</span>
				<span>Auto-Fixable Issues</span>
				<span className="od-autofix-count">{issues.length}</span>
			</button>
			{open ? (
				<div className="od-autofix-body">
					<p className="od-autofix-explainer">
						If you order from a fabricator that can't manufacture this board
						as-is, tscircuit will automatically revise it for that fab. You'll
						receive the revised board for review and have{" "}
						<strong>24 hours</strong> to accept - otherwise changes auto-accept
						and the board ships.
					</p>
					<ul className="od-autofix-issue-list">
						{issues.map((issue) => (
							<li key={issue.label}>
								<span className="od-autofix-issue-dot" aria-hidden="true" />
								<div>
									<div className="od-autofix-issue-title">{issue.label}</div>
									<div className="od-autofix-issue-detail">{issue.detail}</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			) : null}
		</div>
	);
}
