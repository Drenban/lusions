import {c as e, o as s, g as r, h as l, i as t, k as i, j as a, t as n, l as o} from "./runtime-dom.esm-bundler-3c6fceb0.js";
import {j as _} from "./tool-13238bfa.js";
import {f as u} from "./stat-481b0a88.js";
const m = (e, s) => {
    const r = e.__vccOpts || e;
    for (const [l,t] of s)
        r[l] = t;
    return r
}
;
function c(e) {
    return new Promise( (s, r) => {
        chrome.runtime.sendMessage(e, e => {
            chrome.runtime.lastError ? r(chrome.runtime.lastError.message) : s(e)
        }
        )
    }
    )
}
function p(e, s) {
    if ((null == s ? void 0 : s.switch) && s.white_list && s.white_list.length > 0) {
        const r = _(e)
          , l = s.white_list;
        let t = !1;
        for (let e = 0; e < l.length; e++) {
            const s = l[e];
            if (r.includes(s)) {
                t = !0;
                break
            }
        }
        return t
    }
    return !1
}
const h = "https://jsq.xunlei.com/?channel=200031"
  , d = ["onClick"]
  , g = m({
    __name: "Jsq",
    props: {
        source: {
            type: String,
            required: !0
        },
        tabUrl: {
            type: String,
            required: !1
        },
        text: {
            type: Object,
            required: !1
        }
    },
    setup(_) {
        const m = _
          , c = e( () => {
            var e;
            return (null == (e = null == m ? void 0 : m.text) ? void 0 : e.main) || "迅雷加速器,"
        }
        )
          , p = e( () => {
            var e;
            return (null == (e = null == m ? void 0 : m.text) ? void 0 : e.sub) || "限时免费~"
        }
        );
        function g() {
            w(973),
            setTimeout( () => {
                "footer" === m.source ? window.open(h) : "popup" === m.source && chrome.tabs.create({
                    url: h,
                    active: !0
                })
            }
            , 100)
        }
        function w(e) {
            "popup" === m.source ? u(1022, e, {
                value1: "top",
                value2: encodeURIComponent(h),
                tabUrl: encodeURIComponent(m.tabUrl)
            }) : chrome.runtime.sendMessage({
                jsqHomePage: h,
                eventId: e,
                name: "xl_jsq_stat",
                type: "popup" === m.source ? "top" : "bottom"
            })
        }
        return s( () => {
            w(972)
        }
        ),
        (e, s) => (r(),
        l("div", {
            class: i(e.$style["browser-plugin__recall-wrapper"])
        }, [t("div", {
            class: i(e.$style["browser-plugin__recall"]),
            onClick: o(g, ["stop"])
        }, [t("div", {
            class: i(e.$style["browser-plugin__recall-card"])
        }, null, 2), t("div", {
            class: i(e.$style["browser-plugin__recall-text"])
        }, [a(n(c.value), 1), t("span", {
            class: i(e.$style.highLight)
        }, n(p.value), 3)], 2), t("div", {
            class: i(e.$style["browser-plugin__recall-limit"])
        }, null, 2)], 10, d)], 2))
    }
}, [["__cssModules", {
    $style: {
        "animation-slide": "_animation-slide_m2suh_14",
        "modal-wrapper-show": "_modal-wrapper-show_m2suh_19",
        "animation-bounce": "_animation-bounce_m2suh_24",
        "animation-fade": "_animation-fade_m2suh_36",
        "animation-flip": "_animation-flip_m2suh_48",
        "animation-shake": "_animation-shake_m2suh_72",
        shake: "_shake_m2suh_1",
        "animation-slideUp": "_animation-slideUp_m2suh_83",
        "browser-plugin__recall-wrapper": "_browser-plugin__recall-wrapper_m2suh_103",
        "browser-plugin__recall": "_browser-plugin__recall_m2suh_103",
        shine: "_shine_m2suh_1",
        "browser-plugin__recall-card": "_browser-plugin__recall-card_m2suh_136",
        "browser-plugin__recall-text": "_browser-plugin__recall-text_m2suh_145",
        "browser-plugin__recall-limit": "_browser-plugin__recall-limit_m2suh_156",
        highLight: "_highLight_m2suh_167",
        "modal-loading": "_modal-loading_m2suh_1"
    }
}]]);
export {g as J, m as _, p as i, c as s};
