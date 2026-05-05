import { jsxs as i, jsx as e, Fragment as D } from "react/jsx-runtime";
import { useState as m, useMemo as R } from "react";
const B = 5, $ = "Your board exceeds tscircuit SF's specs. We'll auto-fix it and send a revised version for review - you'll have 24h to accept, otherwise changes auto-accept and ship.", U = [
  {
    label: "Via diameter too large",
    detail: "Reduce 0.6mm vias to 0.4mm (fab max)"
  },
  {
    label: "Board too large",
    detail: "46x30mm exceeds 100x100mm panel limit - wait, this fits"
  },
  {
    label: "Trace width below minimum",
    detail: "Widen 4mil traces to 6mil minimum"
  },
  {
    label: "Drill hit too close to edge",
    detail: "Move 2 holes >=0.3mm from board edge"
  },
  {
    label: "Silkscreen overlapping pad",
    detail: "Reposition reference designators clear of pads"
  }
], W = {
  name: "my-blinker-v3.tsx",
  version: "commit 8a4f29c · main",
  dimensions: "42 x 28 mm"
}, V = {
  name: "Alex Chen",
  line1: "482 Valencia Street",
  line2: "Apt 3B",
  cityState: "San Francisco, CA 94103",
  country: "United States"
}, T = [
  {
    id: "tsf",
    name: "tscircuit San Francisco",
    countryCode: "US",
    eta: "3-5 days",
    pricePerBoard: B,
    freeShippingLabel: "Free shipping"
  }
];
function j() {
  return /* @__PURE__ */ i(
    "svg",
    {
      className: "od-fab-flag",
      viewBox: "0 0 22 16",
      xmlns: "http://www.w3.org/2000/svg",
      preserveAspectRatio: "none",
      "aria-label": "United States",
      children: [
        /* @__PURE__ */ e("rect", { width: "22", height: "16", fill: "#fff" }),
        [0, 1, 2, 3, 4, 5, 6].map((l) => /* @__PURE__ */ e(
          "rect",
          {
            x: "0",
            y: l * 16 / 7 + 16 / 14,
            width: "22",
            height: 16 / 14,
            fill: "#b22234"
          },
          l
        )),
        /* @__PURE__ */ e("rect", { width: "9.6", height: "8.6", fill: "#3c3b6e" })
      ]
    }
  );
}
function q() {
  const l = [
    [22, 22],
    [178, 22],
    [22, 118],
    [178, 118]
  ], o = [
    [40, 40],
    [80, 60],
    [130, 60],
    [160, 80],
    [50, 100],
    [120, 75],
    [40, 70],
    [70, 70]
  ];
  return /* @__PURE__ */ i(
    "svg",
    {
      className: "od-pcb-2d-svg",
      viewBox: "0 0 200 140",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-label": "PCB preview",
      children: [
        /* @__PURE__ */ e("defs", { children: /* @__PURE__ */ i("linearGradient", { id: "od-board-grad", x1: "0", y1: "0", x2: "1", y2: "1", children: [
          /* @__PURE__ */ e("stop", { offset: "0%", stopColor: "#15803d" }),
          /* @__PURE__ */ e("stop", { offset: "100%", stopColor: "#166534" })
        ] }) }),
        /* @__PURE__ */ e(
          "rect",
          {
            x: "10",
            y: "10",
            width: "180",
            height: "120",
            rx: "4",
            fill: "url(#od-board-grad)",
            stroke: "#052e16",
            strokeWidth: "0.6"
          }
        ),
        l.map(([r, t]) => /* @__PURE__ */ i("g", { children: [
          /* @__PURE__ */ e("circle", { cx: r, cy: t, r: "4", fill: "#0a3d1a" }),
          /* @__PURE__ */ e("circle", { cx: r, cy: t, r: "2", fill: "#fafafa" })
        ] }, `${r}-${t}`)),
        /* @__PURE__ */ e(
          "path",
          {
            d: "M 40 40 L 80 40 L 80 60 L 130 60 L 130 80 L 160 80",
            stroke: "#fbbf24",
            strokeWidth: "1.5",
            fill: "none",
            opacity: "0.75"
          }
        ),
        /* @__PURE__ */ e(
          "path",
          {
            d: "M 50 100 L 90 100 L 90 75 L 120 75",
            stroke: "#fbbf24",
            strokeWidth: "1.5",
            fill: "none",
            opacity: "0.75"
          }
        ),
        /* @__PURE__ */ e(
          "path",
          {
            d: "M 40 70 L 70 70",
            stroke: "#fbbf24",
            strokeWidth: "1.5",
            fill: "none",
            opacity: "0.75"
          }
        ),
        o.map(([r, t]) => /* @__PURE__ */ e(
          "circle",
          {
            cx: r,
            cy: t,
            r: "2.2",
            fill: "#fbbf24",
            stroke: "#92400e",
            strokeWidth: "0.4"
          },
          `${r}-${t}`
        )),
        /* @__PURE__ */ e(
          "rect",
          {
            x: "95",
            y: "35",
            width: "22",
            height: "14",
            rx: "1",
            fill: "#1c1917",
            stroke: "#000",
            strokeWidth: "0.4"
          }
        ),
        /* @__PURE__ */ e("circle", { cx: "98", cy: "38", r: "0.8", fill: "#71717a" }),
        /* @__PURE__ */ e(
          "text",
          {
            x: "20",
            y: "135",
            fontSize: "4",
            fill: "#ffffff",
            opacity: "0.6",
            fontFamily: "monospace",
            children: "tscircuit · my-blinker-v3"
          }
        )
      ]
    }
  );
}
function H() {
  return /* @__PURE__ */ e("div", { className: "od-pcb-3d-wrap", "aria-label": "PCB 3D preview", children: /* @__PURE__ */ e("div", { className: "od-pcb-3d", children: /* @__PURE__ */ e("div", { className: "od-pcb-3d-board" }) }) });
}
function E() {
  return /* @__PURE__ */ e("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ e(
    "path",
    {
      d: "M3 3L13 13M13 3L3 13",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round"
    }
  ) });
}
function O() {
  return /* @__PURE__ */ i("svg", { className: "od-card-icon", width: "18", height: "14", viewBox: "0 0 24 18", fill: "none", children: [
    /* @__PURE__ */ e(
      "rect",
      {
        x: "0.75",
        y: "0.75",
        width: "22.5",
        height: "16.5",
        rx: "2.25",
        stroke: "currentColor",
        strokeWidth: "1.5"
      }
    ),
    /* @__PURE__ */ e("path", { d: "M0 5H24", stroke: "currentColor", strokeWidth: "1.5" })
  ] });
}
function Q() {
  return /* @__PURE__ */ i("svg", { width: "13", height: "13", viewBox: "0 0 16 16", fill: "none", className: "od-meta-icon", children: [
    /* @__PURE__ */ e("path", { d: "M1 4H10V11H1V4Z", stroke: "currentColor", strokeWidth: "1.3" }),
    /* @__PURE__ */ e(
      "path",
      {
        d: "M10 6H13L15 8.5V11H10V6Z",
        stroke: "currentColor",
        strokeWidth: "1.3",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ e("circle", { cx: "4", cy: "12", r: "1.4", fill: "currentColor", stroke: "white", strokeWidth: "0.6" }),
    /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "1.4", fill: "currentColor", stroke: "white", strokeWidth: "0.6" })
  ] });
}
function _() {
  return /* @__PURE__ */ i("svg", { width: "13", height: "13", viewBox: "0 0 16 16", fill: "none", className: "od-meta-icon", children: [
    /* @__PURE__ */ e("circle", { cx: "8", cy: "8", r: "6.5", stroke: "currentColor", strokeWidth: "1.3" }),
    /* @__PURE__ */ e("path", { d: "M8 4V8L10.5 9.5", stroke: "currentColor", strokeWidth: "1.3", strokeLinecap: "round" })
  ] });
}
function Y() {
  return /* @__PURE__ */ e("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ e(
    "path",
    {
      d: "M3 8H13M13 8L9 4M13 8L9 12",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) });
}
function Z() {
  return /* @__PURE__ */ e("span", { className: "od-autofix-badge", "data-tip": $, tabIndex: 0, "aria-label": "Autofix required", children: /* @__PURE__ */ i("svg", { width: "9", height: "9", viewBox: "0 0 16 16", fill: "none", children: [
    /* @__PURE__ */ e("path", { d: "M8 1L15 14H1L8 1Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinejoin: "round" }),
    /* @__PURE__ */ e("path", { d: "M8 6V9.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
    /* @__PURE__ */ e("circle", { cx: "8", cy: "11.5", r: "0.8", fill: "currentColor" })
  ] }) });
}
function G({ issues: l }) {
  const [o, r] = m(!1);
  return /* @__PURE__ */ i("div", { className: `od-autofix-details ${o ? "open" : ""}`, children: [
    /* @__PURE__ */ i(
      "button",
      {
        className: "od-autofix-summary",
        onClick: () => r((t) => !t),
        "aria-expanded": o,
        type: "button",
        children: [
          /* @__PURE__ */ e("span", { className: "od-caret", "aria-hidden": "true", children: /* @__PURE__ */ e("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", children: /* @__PURE__ */ e(
            "path",
            {
              d: "M3 2L7 5L3 8",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ) }) }),
          /* @__PURE__ */ e("span", { children: "Auto-Fixable Issues" }),
          /* @__PURE__ */ e("span", { className: "od-autofix-count", children: l.length })
        ]
      }
    ),
    o ? /* @__PURE__ */ i("div", { className: "od-autofix-body", children: [
      /* @__PURE__ */ i("p", { className: "od-autofix-explainer", children: [
        "If you order from a fabricator that can't manufacture this board as-is, tscircuit will automatically revise it for that fab. You'll receive the revised board for review and have ",
        /* @__PURE__ */ e("strong", { children: "24 hours" }),
        " to accept - otherwise changes auto-accept and the board ships."
      ] }),
      /* @__PURE__ */ e("ul", { className: "od-autofix-issue-list", children: l.map((t) => /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ e("span", { className: "od-autofix-issue-dot", "aria-hidden": "true" }),
        /* @__PURE__ */ i("div", { children: [
          /* @__PURE__ */ e("div", { className: "od-autofix-issue-title", children: t.label }),
          /* @__PURE__ */ e("div", { className: "od-autofix-issue-detail", children: t.detail })
        ] })
      ] }, t.label)) })
    ] }) : null
  ] });
}
function K({
  project: l = W,
  address: o = V,
  fabricators: r = T,
  defaultQuantity: t = 1,
  defaultCustomQuantity: A = "",
  autofixIssues: F = U,
  onClose: P,
  onSubmit: p
}) {
  var L;
  const [n, b] = m(t), [N, g] = m(A), [f, k] = m("2d"), [x, y] = m(((L = r[0]) == null ? void 0 : L.id) ?? ""), h = Number.parseInt(N, 10), s = n === "custom" ? Number.isFinite(h) && h > 0 ? h : 0 : n, d = r.find((a) => a.id === x) ?? r[0], u = (d == null ? void 0 : d.id) === "tsf" && (n === "custom" && h >= 10 || n === 10), w = (d == null ? void 0 : d.disabledReason) ?? (u ? "tscircuit SF has a per-order cap of 3 boards. Reduce quantity or check back as more fabricators come online." : void 0), v = n === "custom" && h >= 25, C = R(
    () => s * ((d == null ? void 0 : d.pricePerBoard) ?? B),
    [s, d]
  ), I = () => {
    !d || u || s === 0 || p == null || p({
      quantity: s,
      fabricatorId: d.id,
      total: C,
      autofixRequired: v
    });
  };
  return /* @__PURE__ */ i("div", { className: "od-page-backdrop", children: [
    /* @__PURE__ */ e("div", { className: "od-scrim" }),
    /* @__PURE__ */ i("div", { className: "od-dialog", role: "dialog", "aria-labelledby": "od-dialog-title", children: [
      /* @__PURE__ */ i("div", { className: "od-pane-left", children: [
        /* @__PURE__ */ e("div", { className: "od-project-header", children: /* @__PURE__ */ i("div", { children: [
          /* @__PURE__ */ e("div", { className: "od-project-title", children: l.name }),
          /* @__PURE__ */ e("div", { className: "od-project-version", children: l.version })
        ] }) }),
        /* @__PURE__ */ i("div", { className: "od-preview-frame", children: [
          /* @__PURE__ */ i("div", { className: "od-preview-toolbar", children: [
            /* @__PURE__ */ e(
              "button",
              {
                className: f === "2d" ? "active" : "",
                onClick: () => k("2d"),
                type: "button",
                children: "2D"
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                className: f === "3d" ? "active" : "",
                onClick: () => k("3d"),
                type: "button",
                children: "3D"
              }
            )
          ] }),
          /* @__PURE__ */ e("div", { className: "od-preview-content", children: f === "2d" ? /* @__PURE__ */ e(q, {}) : /* @__PURE__ */ e(H, {}) }),
          /* @__PURE__ */ e("div", { className: "od-preview-dim-label", children: l.dimensions ?? W.dimensions })
        ] }),
        /* @__PURE__ */ i("div", { children: [
          /* @__PURE__ */ e("div", { className: "od-pane-section-label", children: "Specifications" }),
          /* @__PURE__ */ i("dl", { className: "od-spec-list", children: [
            /* @__PURE__ */ e("dt", { children: "Layers" }),
            /* @__PURE__ */ e("dd", { children: "2" }),
            /* @__PURE__ */ e("dt", { children: "Thickness" }),
            /* @__PURE__ */ e("dd", { children: "1.6 mm" }),
            /* @__PURE__ */ e("dt", { children: "Material" }),
            /* @__PURE__ */ e("dd", { children: "FR-4" }),
            /* @__PURE__ */ e("dt", { children: "Finish" }),
            /* @__PURE__ */ e("dd", { children: "HASL" }),
            /* @__PURE__ */ e("dt", { children: "Soldermask" }),
            /* @__PURE__ */ e("dd", { children: "Green" }),
            /* @__PURE__ */ e("dt", { children: "Min trace" }),
            /* @__PURE__ */ e("dd", { children: "6 mil" }),
            /* @__PURE__ */ e("dt", { children: "Min hole" }),
            /* @__PURE__ */ e("dd", { children: "0.3 mm" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ i("div", { className: "od-pane-right", children: [
        /* @__PURE__ */ i("div", { className: "od-dialog-header", children: [
          /* @__PURE__ */ i("div", { children: [
            /* @__PURE__ */ e("h2", { id: "od-dialog-title", className: "od-dialog-title", children: "Order PCB" }),
            /* @__PURE__ */ e("p", { className: "od-dialog-subtitle", children: "Bare board manufacturing · ships in 3-5 days" })
          ] }),
          /* @__PURE__ */ e("button", { className: "od-close-btn", "aria-label": "Close", onClick: P, type: "button", children: /* @__PURE__ */ e(E, {}) })
        ] }),
        /* @__PURE__ */ i("div", { className: "od-field-group", children: [
          /* @__PURE__ */ e("div", { className: "od-field-label", children: /* @__PURE__ */ e("span", { children: "Quantity" }) }),
          /* @__PURE__ */ i("div", { className: "od-qty-row", children: [
            [1, 3, 10].map((a) => /* @__PURE__ */ e(
              "button",
              {
                className: `od-qty-btn ${n === a ? "active" : ""}`,
                onClick: () => {
                  b(a), g("");
                },
                type: "button",
                children: a
              },
              a
            )),
            /* @__PURE__ */ e(
              "button",
              {
                className: `od-qty-btn ${n === "custom" ? "active" : ""}`,
                onClick: () => b("custom"),
                type: "button",
                children: "10+"
              }
            ),
            n === "custom" ? /* @__PURE__ */ e(
              "input",
              {
                type: "number",
                min: "11",
                className: "od-qty-input",
                placeholder: "Qty",
                value: N,
                onChange: (a) => g(a.target.value),
                autoFocus: !0
              }
            ) : null
          ] })
        ] }),
        /* @__PURE__ */ i("div", { className: "od-field-group", children: [
          /* @__PURE__ */ i("div", { className: "od-field-label", children: [
            /* @__PURE__ */ e("span", { children: "Fabricator" }),
            /* @__PURE__ */ e("span", { className: "od-free-ship-pill", children: "Free shipping · US & CA" })
          ] }),
          r.map((a) => {
            const c = a.id === (d == null ? void 0 : d.id) && u, S = a.id === x && !c;
            return /* @__PURE__ */ i(
              "div",
              {
                className: `od-fab-row ${S ? "selected" : ""} ${c ? "disabled" : ""}`,
                onClick: () => {
                  c || y(a.id);
                },
                onKeyDown: (M) => {
                  !c && (M.key === "Enter" || M.key === " ") && y(a.id);
                },
                role: "radio",
                "aria-checked": S,
                "aria-disabled": c,
                tabIndex: c ? -1 : 0,
                children: [
                  /* @__PURE__ */ e("span", { className: "od-radio-dot" }),
                  a.countryCode === "US" ? /* @__PURE__ */ e(j, {}) : null,
                  /* @__PURE__ */ i("div", { className: "od-fab-content", children: [
                    /* @__PURE__ */ i("div", { className: "od-fab-name-row", children: [
                      /* @__PURE__ */ e("span", { children: a.name }),
                      v && !c ? /* @__PURE__ */ e(Z, {}) : null
                    ] }),
                    /* @__PURE__ */ i("div", { className: "od-fab-meta", children: [
                      /* @__PURE__ */ i("span", { className: "od-inline-meta", children: [
                        /* @__PURE__ */ e(_, {}),
                        " ",
                        a.eta
                      ] }),
                      /* @__PURE__ */ e("span", { className: "od-dot" }),
                      /* @__PURE__ */ i("span", { className: "od-inline-meta", children: [
                        /* @__PURE__ */ e(Q, {}),
                        " ",
                        a.freeShippingLabel
                      ] }),
                      c ? /* @__PURE__ */ i(D, { children: [
                        /* @__PURE__ */ e("span", { className: "od-dot" }),
                        /* @__PURE__ */ e("span", { className: "od-warn-text", children: "Unavailable for 10+ qty" })
                      ] }) : null
                    ] })
                  ] }),
                  /* @__PURE__ */ i("div", { children: [
                    /* @__PURE__ */ i("div", { className: "od-fab-price", children: [
                      "$",
                      c ? "-" : (s * a.pricePerBoard).toFixed(2)
                    ] }),
                    /* @__PURE__ */ i("div", { className: "od-fab-price-sub", children: [
                      "$",
                      a.pricePerBoard.toFixed(2),
                      " x ",
                      s || 0
                    ] })
                  ] })
                ]
              },
              a.id
            );
          }),
          w ? /* @__PURE__ */ i("div", { className: "od-qty-warning", children: [
            /* @__PURE__ */ i("svg", { width: "13", height: "13", viewBox: "0 0 16 16", fill: "none", children: [
              /* @__PURE__ */ e("circle", { cx: "8", cy: "8", r: "6.5", stroke: "currentColor", strokeWidth: "1.3" }),
              /* @__PURE__ */ e("path", { d: "M8 5V8.5", stroke: "currentColor", strokeWidth: "1.3", strokeLinecap: "round" }),
              /* @__PURE__ */ e("circle", { cx: "8", cy: "11", r: "0.7", fill: "currentColor" })
            ] }),
            w
          ] }) : /* @__PURE__ */ e(G, { issues: F })
        ] }),
        /* @__PURE__ */ i("div", { className: "od-field-group", children: [
          /* @__PURE__ */ i("div", { className: "od-field-label", children: [
            /* @__PURE__ */ e("span", { children: "Ship to" }),
            /* @__PURE__ */ e("button", { className: "od-change-link", type: "button", children: "Change" })
          ] }),
          /* @__PURE__ */ e("div", { className: "od-saved-address", children: /* @__PURE__ */ i("div", { children: [
            /* @__PURE__ */ e("div", { className: "od-address-name", children: o.name }),
            /* @__PURE__ */ i("div", { className: "od-address-line", children: [
              o.line1,
              o.line2 ? `, ${o.line2}` : ""
            ] }),
            /* @__PURE__ */ i("div", { className: "od-address-line", children: [
              o.cityState,
              " · ",
              o.country
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ i("div", { className: "od-field-group", children: [
          /* @__PURE__ */ e("div", { className: "od-field-label", children: /* @__PURE__ */ e("span", { children: "Payment" }) }),
          /* @__PURE__ */ i("div", { className: "od-card-field", children: [
            /* @__PURE__ */ e(O, {}),
            /* @__PURE__ */ e("input", { className: "od-card-num", placeholder: "1234 1234 1234 1234", "aria-label": "Card number" }),
            /* @__PURE__ */ e("span", { className: "od-divider" }),
            /* @__PURE__ */ e("input", { className: "od-card-exp", placeholder: "MM / YY", "aria-label": "Expiration date" }),
            /* @__PURE__ */ e("span", { className: "od-divider" }),
            /* @__PURE__ */ e("input", { className: "od-card-cvc", placeholder: "CVC", "aria-label": "CVC" })
          ] }),
          v ? /* @__PURE__ */ i("div", { className: "od-fine-print", children: [
            /* @__PURE__ */ e("strong", { children: "Autofix notice:" }),
            " your board exceeds tscircuit SF's manufacturing specs and will be automatically revised. You'll receive the updated board within ~10 minutes and have ",
            /* @__PURE__ */ e("strong", { children: "24 hours" }),
            " ",
            "to accept. After 24h, changes auto-accept and the board ships."
          ] }) : null
        ] }),
        /* @__PURE__ */ i("div", { className: "od-dialog-footer", children: [
          /* @__PURE__ */ i("div", { className: "od-total-block", children: [
            /* @__PURE__ */ e("span", { className: "od-total-label", children: "Total" }),
            /* @__PURE__ */ i("span", { className: "od-total-amount", children: [
              "$",
              C.toFixed(2)
            ] }),
            /* @__PURE__ */ e("span", { className: "od-total-sub", children: "incl. shipping & tax" })
          ] }),
          /* @__PURE__ */ i(
            "button",
            {
              className: "od-btn-primary",
              disabled: u || s === 0,
              onClick: I,
              type: "button",
              children: [
                "Place order",
                /* @__PURE__ */ e(Y, {})
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}
export {
  K as OrderDialog
};
