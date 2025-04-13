import {n as e, $ as t, K as r, l as s, X as i, Y as o, i as n} from "./util-86a8139d.js";
var a = {
    exports: {}
};
var E = {
    MAX_LENGTH: 256,
    MAX_SAFE_COMPONENT_LENGTH: 16,
    MAX_SAFE_BUILD_LENGTH: 250,
    MAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER || 9007199254740991,
    RELEASE_TYPES: ["major", "premajor", "minor", "preminor", "patch", "prepatch", "prerelease"],
    SEMVER_SPEC_VERSION: "2.0.0",
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
};
var h = "object" == typeof process && process.env && {}.NODE_DEBUG && /\bsemver\b/i.test({}.NODE_DEBUG) ? (...e) => {}
: () => {}
;
!function(e, t) {
    const {MAX_SAFE_COMPONENT_LENGTH: r, MAX_SAFE_BUILD_LENGTH: s, MAX_LENGTH: i} = E
      , o = h
      , n = (t = e.exports = {}).re = []
      , a = t.safeRe = []
      , c = t.src = []
      , l = t.safeSrc = []
      , p = t.t = {};
    let $ = 0;
    const u = [["\\s", 1], ["\\d", i], ["[a-zA-Z0-9-]", s]]
      , I = (e, t, r) => {
        const s = (e => {
            for (const [t,r] of u)
                e = e.split(t + "*").join(`${t}{0,${r}}`).split(t + "+").join(`${t}{1,${r}}`);
            return e
        }
        )(t)
          , i = $++;
        o(e, i, t),
        p[e] = i,
        c[i] = t,
        l[i] = s,
        n[i] = new RegExp(t,r ? "g" : void 0),
        a[i] = new RegExp(s,r ? "g" : void 0)
    }
    ;
    I("NUMERICIDENTIFIER", "0|[1-9]\\d*"),
    I("NUMERICIDENTIFIERLOOSE", "\\d+"),
    I("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-][a-zA-Z0-9-]*"),
    I("MAINVERSION", `(${c[p.NUMERICIDENTIFIER]})\\.(${c[p.NUMERICIDENTIFIER]})\\.(${c[p.NUMERICIDENTIFIER]})`),
    I("MAINVERSIONLOOSE", `(${c[p.NUMERICIDENTIFIERLOOSE]})\\.(${c[p.NUMERICIDENTIFIERLOOSE]})\\.(${c[p.NUMERICIDENTIFIERLOOSE]})`),
    I("PRERELEASEIDENTIFIER", `(?:${c[p.NUMERICIDENTIFIER]}|${c[p.NONNUMERICIDENTIFIER]})`),
    I("PRERELEASEIDENTIFIERLOOSE", `(?:${c[p.NUMERICIDENTIFIERLOOSE]}|${c[p.NONNUMERICIDENTIFIER]})`),
    I("PRERELEASE", `(?:-(${c[p.PRERELEASEIDENTIFIER]}(?:\\.${c[p.PRERELEASEIDENTIFIER]})*))`),
    I("PRERELEASELOOSE", `(?:-?(${c[p.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[p.PRERELEASEIDENTIFIERLOOSE]})*))`),
    I("BUILDIDENTIFIER", "[a-zA-Z0-9-]+"),
    I("BUILD", `(?:\\+(${c[p.BUILDIDENTIFIER]}(?:\\.${c[p.BUILDIDENTIFIER]})*))`),
    I("FULLPLAIN", `v?${c[p.MAINVERSION]}${c[p.PRERELEASE]}?${c[p.BUILD]}?`),
    I("FULL", `^${c[p.FULLPLAIN]}$`),
    I("LOOSEPLAIN", `[v=\\s]*${c[p.MAINVERSIONLOOSE]}${c[p.PRERELEASELOOSE]}?${c[p.BUILD]}?`),
    I("LOOSE", `^${c[p.LOOSEPLAIN]}$`),
    I("GTLT", "((?:<|>)?=?)"),
    I("XRANGEIDENTIFIERLOOSE", c[p.NUMERICIDENTIFIERLOOSE] + "|x|X|\\*"),
    I("XRANGEIDENTIFIER", c[p.NUMERICIDENTIFIER] + "|x|X|\\*"),
    I("XRANGEPLAIN", `[v=\\s]*(${c[p.XRANGEIDENTIFIER]})(?:\\.(${c[p.XRANGEIDENTIFIER]})(?:\\.(${c[p.XRANGEIDENTIFIER]})(?:${c[p.PRERELEASE]})?${c[p.BUILD]}?)?)?`),
    I("XRANGEPLAINLOOSE", `[v=\\s]*(${c[p.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[p.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[p.XRANGEIDENTIFIERLOOSE]})(?:${c[p.PRERELEASELOOSE]})?${c[p.BUILD]}?)?)?`),
    I("XRANGE", `^${c[p.GTLT]}\\s*${c[p.XRANGEPLAIN]}$`),
    I("XRANGELOOSE", `^${c[p.GTLT]}\\s*${c[p.XRANGEPLAINLOOSE]}$`),
    I("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`),
    I("COERCE", c[p.COERCEPLAIN] + "(?:$|[^\\d])"),
    I("COERCEFULL", c[p.COERCEPLAIN] + `(?:${c[p.PRERELEASE]})?(?:${c[p.BUILD]})?(?:$|[^\\d])`),
    I("COERCERTL", c[p.COERCE], !0),
    I("COERCERTLFULL", c[p.COERCEFULL], !0),
    I("LONETILDE", "(?:~>?)"),
    I("TILDETRIM", `(\\s*)${c[p.LONETILDE]}\\s+`, !0),
    t.tildeTrimReplace = "$1~",
    I("TILDE", `^${c[p.LONETILDE]}${c[p.XRANGEPLAIN]}$`),
    I("TILDELOOSE", `^${c[p.LONETILDE]}${c[p.XRANGEPLAINLOOSE]}$`),
    I("LONECARET", "(?:\\^)"),
    I("CARETTRIM", `(\\s*)${c[p.LONECARET]}\\s+`, !0),
    t.caretTrimReplace = "$1^",
    I("CARET", `^${c[p.LONECARET]}${c[p.XRANGEPLAIN]}$`),
    I("CARETLOOSE", `^${c[p.LONECARET]}${c[p.XRANGEPLAINLOOSE]}$`),
    I("COMPARATORLOOSE", `^${c[p.GTLT]}\\s*(${c[p.LOOSEPLAIN]})$|^$`),
    I("COMPARATOR", `^${c[p.GTLT]}\\s*(${c[p.FULLPLAIN]})$|^$`),
    I("COMPARATORTRIM", `(\\s*)${c[p.GTLT]}\\s*(${c[p.LOOSEPLAIN]}|${c[p.XRANGEPLAIN]})`, !0),
    t.comparatorTrimReplace = "$1$2$3",
    I("HYPHENRANGE", `^\\s*(${c[p.XRANGEPLAIN]})\\s+-\\s+(${c[p.XRANGEPLAIN]})\\s*$`),
    I("HYPHENRANGELOOSE", `^\\s*(${c[p.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[p.XRANGEPLAINLOOSE]})\\s*$`),
    I("STAR", "(<|>)?=?\\s*\\*"),
    I("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"),
    I("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$")
}(a, a.exports);
var c = a.exports;
const l = Object.freeze({
    loose: !0
})
  , p = Object.freeze({});
var $ = e => e ? "object" != typeof e ? l : e : p;
const u = /^[0-9]+$/
  , I = (e, t) => {
    const r = u.test(e)
      , s = u.test(t);
    return r && s && (e = +e,
    t = +t),
    e === t ? 0 : r && !s ? -1 : s && !r ? 1 : e < t ? -1 : 1
}
;
var f = {
    compareIdentifiers: I,
    rcompareIdentifiers: (e, t) => I(t, e)
};
const R = h
  , {MAX_LENGTH: m, MAX_SAFE_INTEGER: d} = E
  , {safeRe: L, safeSrc: N, t: O} = c
  , A = $
  , {compareIdentifiers: v} = f;
var T = class e {
    constructor(t, r) {
        if (r = A(r),
        t instanceof e) {
            if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
                return t;
            t = t.version
        } else if ("string" != typeof t)
            throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
        if (t.length > m)
            throw new TypeError(`version is longer than ${m} characters`);
        R("SemVer", t, r),
        this.options = r,
        this.loose = !!r.loose,
        this.includePrerelease = !!r.includePrerelease;
        const s = t.trim().match(r.loose ? L[O.LOOSE] : L[O.FULL]);
        if (!s)
            throw new TypeError("Invalid Version: " + t);
        if (this.raw = t,
        this.major = +s[1],
        this.minor = +s[2],
        this.patch = +s[3],
        this.major > d || this.major < 0)
            throw new TypeError("Invalid major version");
        if (this.minor > d || this.minor < 0)
            throw new TypeError("Invalid minor version");
        if (this.patch > d || this.patch < 0)
            throw new TypeError("Invalid patch version");
        s[4] ? this.prerelease = s[4].split(".").map(e => {
            if (/^[0-9]+$/.test(e)) {
                const t = +e;
                if (t >= 0 && t < d)
                    return t
            }
            return e
        }
        ) : this.prerelease = [],
        this.build = s[5] ? s[5].split(".") : [],
        this.format()
    }
    format() {
        return this.version = `${this.major}.${this.minor}.${this.patch}`,
        this.prerelease.length && (this.version += "-" + this.prerelease.join(".")),
        this.version
    }
    toString() {
        return this.version
    }
    compare(t) {
        if (R("SemVer.compare", this.version, this.options, t),
        !(t instanceof e)) {
            if ("string" == typeof t && t === this.version)
                return 0;
            t = new e(t,this.options)
        }
        return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t)
    }
    compareMain(t) {
        return t instanceof e || (t = new e(t,this.options)),
        v(this.major, t.major) || v(this.minor, t.minor) || v(this.patch, t.patch)
    }
    comparePre(t) {
        if (t instanceof e || (t = new e(t,this.options)),
        this.prerelease.length && !t.prerelease.length)
            return -1;
        if (!this.prerelease.length && t.prerelease.length)
            return 1;
        if (!this.prerelease.length && !t.prerelease.length)
            return 0;
        let r = 0;
        do {
            const e = this.prerelease[r]
              , s = t.prerelease[r];
            if (R("prerelease compare", r, e, s),
            void 0 === e && void 0 === s)
                return 0;
            if (void 0 === s)
                return 1;
            if (void 0 === e)
                return -1;
            if (e !== s)
                return v(e, s)
        } while (++r)
    }
    compareBuild(t) {
        t instanceof e || (t = new e(t,this.options));
        let r = 0;
        do {
            const e = this.build[r]
              , s = t.build[r];
            if (R("build compare", r, e, s),
            void 0 === e && void 0 === s)
                return 0;
            if (void 0 === s)
                return 1;
            if (void 0 === e)
                return -1;
            if (e !== s)
                return v(e, s)
        } while (++r)
    }
    inc(e, t, r) {
        if (e.startsWith("pre")) {
            if (!t && !1 === r)
                throw new Error("invalid increment argument: identifier is empty");
            if (t) {
                const e = new RegExp(`^${this.options.loose ? N[O.PRERELEASELOOSE] : N[O.PRERELEASE]}$`)
                  , r = ("-" + t).match(e);
                if (!r || r[1] !== t)
                    throw new Error("invalid identifier: " + t)
            }
        }
        switch (e) {
        case "premajor":
            this.prerelease.length = 0,
            this.patch = 0,
            this.minor = 0,
            this.major++,
            this.inc("pre", t, r);
            break;
        case "preminor":
            this.prerelease.length = 0,
            this.patch = 0,
            this.minor++,
            this.inc("pre", t, r);
            break;
        case "prepatch":
            this.prerelease.length = 0,
            this.inc("patch", t, r),
            this.inc("pre", t, r);
            break;
        case "prerelease":
            0 === this.prerelease.length && this.inc("patch", t, r),
            this.inc("pre", t, r);
            break;
        case "release":
            if (0 === this.prerelease.length)
                throw new Error(`version ${this.raw} is not a prerelease`);
            this.prerelease.length = 0;
            break;
        case "major":
            0 === this.minor && 0 === this.patch && 0 !== this.prerelease.length || this.major++,
            this.minor = 0,
            this.patch = 0,
            this.prerelease = [];
            break;
        case "minor":
            0 === this.patch && 0 !== this.prerelease.length || this.minor++,
            this.patch = 0,
            this.prerelease = [];
            break;
        case "patch":
            0 === this.prerelease.length && this.patch++,
            this.prerelease = [];
            break;
        case "pre":
            {
                const e = Number(r) ? 1 : 0;
                if (0 === this.prerelease.length)
                    this.prerelease = [e];
                else {
                    let s = this.prerelease.length;
                    for (; --s >= 0; )
                        "number" == typeof this.prerelease[s] && (this.prerelease[s]++,
                        s = -2);
                    if (-1 === s) {
                        if (t === this.prerelease.join(".") && !1 === r)
                            throw new Error("invalid increment argument: identifier already exists");
                        this.prerelease.push(e)
                    }
                }
                if (t) {
                    let s = [t, e];
                    !1 === r && (s = [t]),
                    0 === v(this.prerelease[0], t) ? isNaN(this.prerelease[1]) && (this.prerelease = s) : this.prerelease = s
                }
                break
            }
        default:
            throw new Error("invalid increment argument: " + e)
        }
        return this.raw = this.format(),
        this.build.length && (this.raw += "+" + this.build.join(".")),
        this
    }
}
;
const g = T;
var w = (e, t, r) => new g(e,r).compare(new g(t,r));
const S = w;
var P = (e, t, r) => S(e, t, r) > 0;
const C = w;
var b = (e, t, r) => C(e, t, r) < 0;
const G = w;
var D = (e, t, r) => 0 === G(e, t, r);
const F = w;
var M = (e, t, r) => 0 !== F(e, t, r);
const U = w;
var X = (e, t, r) => U(e, t, r) >= 0;
const y = w;
var j = (e, t, r) => y(e, t, r) <= 0;
const x = D
  , _ = M
  , k = P
  , V = X
  , B = b
  , H = j;
var W = (e, t, r, s) => {
    switch (t) {
    case "===":
        return "object" == typeof e && (e = e.version),
        "object" == typeof r && (r = r.version),
        e === r;
    case "!==":
        return "object" == typeof e && (e = e.version),
        "object" == typeof r && (r = r.version),
        e !== r;
    case "":
    case "=":
    case "==":
        return x(e, r, s);
    case "!=":
        return _(e, r, s);
    case ">":
        return k(e, r, s);
    case ">=":
        return V(e, r, s);
    case "<":
        return B(e, r, s);
    case "<=":
        return H(e, r, s);
    default:
        throw new TypeError("Invalid operator: " + t)
    }
}
;
const {safeRe: Y, t: z} = c;
var Z, Q, J, q, K = class {
    constructor() {
        this.max = 1e3,
        this.map = new Map
    }
    get(e) {
        const t = this.map.get(e);
        return void 0 === t ? void 0 : (this.map.delete(e),
        this.map.set(e, t),
        t)
    }
    delete(e) {
        return this.map.delete(e)
    }
    set(e, t) {
        if (!this.delete(e) && void 0 !== t) {
            if (this.map.size >= this.max) {
                const e = this.map.keys().next().value;
                this.delete(e)
            }
            this.map.set(e, t)
        }
        return this
    }
}
;
function ee() {
    if (Q)
        return Z;
    Q = 1;
    const e = /\s+/g;
    class t {
        constructor(r, o) {
            if (o = s(o),
            r instanceof t)
                return r.loose === !!o.loose && r.includePrerelease === !!o.includePrerelease ? r : new t(r.raw,o);
            if (r instanceof i)
                return this.raw = r.value,
                this.set = [[r]],
                this.formatted = void 0,
                this;
            if (this.options = o,
            this.loose = !!o.loose,
            this.includePrerelease = !!o.includePrerelease,
            this.raw = r.trim().replace(e, " "),
            this.set = this.raw.split("||").map(e => this.parseRange(e.trim())).filter(e => e.length),
            !this.set.length)
                throw new TypeError("Invalid SemVer Range: " + this.raw);
            if (this.set.length > 1) {
                const e = this.set[0];
                if (this.set = this.set.filter(e => !m(e[0])),
                0 === this.set.length)
                    this.set = [e];
                else if (this.set.length > 1)
                    for (const t of this.set)
                        if (1 === t.length && d(t[0])) {
                            this.set = [t];
                            break
                        }
            }
            this.formatted = void 0
        }
        get range() {
            if (void 0 === this.formatted) {
                this.formatted = "";
                for (let e = 0; e < this.set.length; e++) {
                    e > 0 && (this.formatted += "||");
                    const t = this.set[e];
                    for (let e = 0; e < t.length; e++)
                        e > 0 && (this.formatted += " "),
                        this.formatted += t[e].toString().trim()
                }
            }
            return this.formatted
        }
        format() {
            return this.range
        }
        toString() {
            return this.range
        }
        parseRange(e) {
            const t = ((this.options.includePrerelease && f) | (this.options.loose && R)) + ":" + e
              , s = r.get(t);
            if (s)
                return s;
            const n = this.options.loose
              , E = n ? a[l.HYPHENRANGELOOSE] : a[l.HYPHENRANGE];
            e = e.replace(E, G(this.options.includePrerelease)),
            o("hyphen replace", e),
            e = e.replace(a[l.COMPARATORTRIM], p),
            o("comparator trim", e),
            e = e.replace(a[l.TILDETRIM], u),
            o("tilde trim", e),
            e = e.replace(a[l.CARETTRIM], I),
            o("caret trim", e);
            let h = e.split(" ").map(e => N(e, this.options)).join(" ").split(/\s+/).map(e => b(e, this.options));
            n && (h = h.filter(e => (o("loose invalid filter", e, this.options),
            !!e.match(a[l.COMPARATORLOOSE])))),
            o("range list", h);
            const c = new Map
              , $ = h.map(e => new i(e,this.options));
            for (const r of $) {
                if (m(r))
                    return [r];
                c.set(r.value, r)
            }
            c.size > 1 && c.has("") && c.delete("");
            const d = [...c.values()];
            return r.set(t, d),
            d
        }
        intersects(e, r) {
            if (!(e instanceof t))
                throw new TypeError("a Range is required");
            return this.set.some(t => L(t, r) && e.set.some(e => L(e, r) && t.every(t => e.every(e => t.intersects(e, r)))))
        }
        test(e) {
            if (!e)
                return !1;
            if ("string" == typeof e)
                try {
                    e = new n(e,this.options)
                } catch (t) {
                    return !1
                }
            for (let r = 0; r < this.set.length; r++)
                if (D(this.set[r], e, this.options))
                    return !0;
            return !1
        }
    }
    Z = t;
    const r = new K
      , s = $
      , i = te()
      , o = h
      , n = T
      , {safeRe: a, t: l, comparatorTrimReplace: p, tildeTrimReplace: u, caretTrimReplace: I} = c
      , {FLAG_INCLUDE_PRERELEASE: f, FLAG_LOOSE: R} = E
      , m = e => "<0.0.0-0" === e.value
      , d = e => "" === e.value
      , L = (e, t) => {
        let r = !0;
        const s = e.slice();
        let i = s.pop();
        for (; r && s.length; )
            r = s.every(e => i.intersects(e, t)),
            i = s.pop();
        return r
    }
      , N = (e, t) => (o("comp", e, t),
    e = g(e, t),
    o("caret", e),
    e = A(e, t),
    o("tildes", e),
    e = S(e, t),
    o("xrange", e),
    e = C(e, t),
    o("stars", e),
    e)
      , O = e => !e || "x" === e.toLowerCase() || "*" === e
      , A = (e, t) => e.trim().split(/\s+/).map(e => v(e, t)).join(" ")
      , v = (e, t) => {
        const r = t.loose ? a[l.TILDELOOSE] : a[l.TILDE];
        return e.replace(r, (t, r, s, i, n) => {
            let a;
            return o("tilde", e, t, r, s, i, n),
            O(r) ? a = "" : O(s) ? a = `>=${r}.0.0 <${+r + 1}.0.0-0` : O(i) ? a = `>=${r}.${s}.0 <${r}.${+s + 1}.0-0` : n ? (o("replaceTilde pr", n),
            a = `>=${r}.${s}.${i}-${n} <${r}.${+s + 1}.0-0`) : a = `>=${r}.${s}.${i} <${r}.${+s + 1}.0-0`,
            o("tilde return", a),
            a
        }
        )
    }
      , g = (e, t) => e.trim().split(/\s+/).map(e => w(e, t)).join(" ")
      , w = (e, t) => {
        o("caret", e, t);
        const r = t.loose ? a[l.CARETLOOSE] : a[l.CARET]
          , s = t.includePrerelease ? "-0" : "";
        return e.replace(r, (t, r, i, n, a) => {
            let E;
            return o("caret", e, t, r, i, n, a),
            O(r) ? E = "" : O(i) ? E = `>=${r}.0.0${s} <${+r + 1}.0.0-0` : O(n) ? E = "0" === r ? `>=${r}.${i}.0${s} <${r}.${+i + 1}.0-0` : `>=${r}.${i}.0${s} <${+r + 1}.0.0-0` : a ? (o("replaceCaret pr", a),
            E = "0" === r ? "0" === i ? `>=${r}.${i}.${n}-${a} <${r}.${i}.${+n + 1}-0` : `>=${r}.${i}.${n}-${a} <${r}.${+i + 1}.0-0` : `>=${r}.${i}.${n}-${a} <${+r + 1}.0.0-0`) : (o("no pr"),
            E = "0" === r ? "0" === i ? `>=${r}.${i}.${n}${s} <${r}.${i}.${+n + 1}-0` : `>=${r}.${i}.${n}${s} <${r}.${+i + 1}.0-0` : `>=${r}.${i}.${n} <${+r + 1}.0.0-0`),
            o("caret return", E),
            E
        }
        )
    }
      , S = (e, t) => (o("replaceXRanges", e, t),
    e.split(/\s+/).map(e => P(e, t)).join(" "))
      , P = (e, t) => {
        e = e.trim();
        const r = t.loose ? a[l.XRANGELOOSE] : a[l.XRANGE];
        return e.replace(r, (r, s, i, n, a, E) => {
            o("xRange", e, r, s, i, n, a, E);
            const h = O(i)
              , c = h || O(n)
              , l = c || O(a)
              , p = l;
            return "=" === s && p && (s = ""),
            E = t.includePrerelease ? "-0" : "",
            h ? r = ">" === s || "<" === s ? "<0.0.0-0" : "*" : s && p ? (c && (n = 0),
            a = 0,
            ">" === s ? (s = ">=",
            c ? (i = +i + 1,
            n = 0,
            a = 0) : (n = +n + 1,
            a = 0)) : "<=" === s && (s = "<",
            c ? i = +i + 1 : n = +n + 1),
            "<" === s && (E = "-0"),
            r = `${s + i}.${n}.${a}${E}`) : c ? r = `>=${i}.0.0${E} <${+i + 1}.0.0-0` : l && (r = `>=${i}.${n}.0${E} <${i}.${+n + 1}.0-0`),
            o("xRange return", r),
            r
        }
        )
    }
      , C = (e, t) => (o("replaceStars", e, t),
    e.trim().replace(a[l.STAR], ""))
      , b = (e, t) => (o("replaceGTE0", e, t),
    e.trim().replace(a[t.includePrerelease ? l.GTE0PRE : l.GTE0], ""))
      , G = e => (t, r, s, i, o, n, a, E, h, c, l, p) => `${r = O(s) ? "" : O(i) ? `>=${s}.0.0${e ? "-0" : ""}` : O(o) ? `>=${s}.${i}.0${e ? "-0" : ""}` : n ? ">=" + r : `>=${r}${e ? "-0" : ""}`} ${E = O(h) ? "" : O(c) ? `<${+h + 1}.0.0-0` : O(l) ? `<${h}.${+c + 1}.0-0` : p ? `<=${h}.${c}.${l}-${p}` : e ? `<${h}.${c}.${+l + 1}-0` : "<=" + E}`.trim()
      , D = (e, t, r) => {
        for (let s = 0; s < e.length; s++)
            if (!e[s].test(t))
                return !1;
        if (t.prerelease.length && !r.includePrerelease) {
            for (let r = 0; r < e.length; r++)
                if (o(e[r].semver),
                e[r].semver !== i.ANY && e[r].semver.prerelease.length > 0) {
                    const s = e[r].semver;
                    if (s.major === t.major && s.minor === t.minor && s.patch === t.patch)
                        return !0
                }
            return !1
        }
        return !0
    }
    ;
    return Z
}
function te() {
    if (q)
        return J;
    q = 1;
    const e = Symbol("SemVer ANY");
    class t {
        static get ANY() {
            return e
        }
        constructor(s, i) {
            if (i = r(i),
            s instanceof t) {
                if (s.loose === !!i.loose)
                    return s;
                s = s.value
            }
            s = s.trim().split(/\s+/).join(" "),
            n("comparator", s, i),
            this.options = i,
            this.loose = !!i.loose,
            this.parse(s),
            this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version,
            n("comp", this)
        }
        parse(t) {
            const r = this.options.loose ? s[i.COMPARATORLOOSE] : s[i.COMPARATOR]
              , o = t.match(r);
            if (!o)
                throw new TypeError("Invalid comparator: " + t);
            this.operator = void 0 !== o[1] ? o[1] : "",
            "=" === this.operator && (this.operator = ""),
            o[2] ? this.semver = new a(o[2],this.options.loose) : this.semver = e
        }
        toString() {
            return this.value
        }
        test(t) {
            if (n("Comparator.test", t, this.options.loose),
            this.semver === e || t === e)
                return !0;
            if ("string" == typeof t)
                try {
                    t = new a(t,this.options)
                } catch (r) {
                    return !1
                }
            return o(t, this.operator, this.semver, this.options)
        }
        intersects(e, s) {
            if (!(e instanceof t))
                throw new TypeError("a Comparator is required");
            return "" === this.operator ? "" === this.value || new E(e.value,s).test(this.value) : "" === e.operator ? "" === e.value || new E(this.value,s).test(e.semver) : (!(s = r(s)).includePrerelease || "<0.0.0-0" !== this.value && "<0.0.0-0" !== e.value) && (!(!s.includePrerelease && (this.value.startsWith("<0.0.0") || e.value.startsWith("<0.0.0"))) && (!(!this.operator.startsWith(">") || !e.operator.startsWith(">")) || (!(!this.operator.startsWith("<") || !e.operator.startsWith("<")) || (!(this.semver.version !== e.semver.version || !this.operator.includes("=") || !e.operator.includes("=")) || (!!(o(this.semver, "<", e.semver, s) && this.operator.startsWith(">") && e.operator.startsWith("<")) || !!(o(this.semver, ">", e.semver, s) && this.operator.startsWith("<") && e.operator.startsWith(">")))))))
        }
    }
    J = t;
    const r = $
      , {safeRe: s, t: i} = c
      , o = W
      , n = h
      , a = T
      , E = ee();
    return J
}
ee();
ee();
ee();
ee();
ee();
ee();
const re = te()
  , {ANY: se} = re;
ee();
ee();
ee();
const ie = te()
  , {ANY: oe} = ie;
new ie(">=0.0.0-0"),
new ie(">=0.0.0");
const ne = c;
te(),
ee();
function ae(e) {
    for (const r in t) {
        const s = new RegExp(t[r],"i").exec(e);
        if (null != s)
            return s
    }
    return null
}
function Ee(e) {
    const t = e.toLowerCase();
    let r = !0;
    return -1 != t.indexOf("?") && -1 == t.indexOf("magnet:?") || (r = !1),
    r
}
function he(e) {
    const t = e.replace(/(\\+)/g, "#").split("#")
      , r = t[t.length - 1].split(".");
    return r[r.length - 1]
}
function ce(e, t) {
    let r = !1;
    do {
        if (!t)
            break;
        const s = t.getBoundingClientRect();
        if (e.clientX < s.left || e.clientY < s.top || e.clientX > s.right || e.clientY > s.bottom)
            break;
        r = !0
    } while (0);
    return r
}
function le() {
    const t = new Set
      , r = document.getElementsByTagName("body");
    if (0 !== r.length) {
        for (const s of r) {
            const r = s.innerHTML.match(e);
            r && r.forEach(e => {
                t.add(e)
            }
            )
        }
        return t
    }
}
function pe(e, t) {
    if (0 == e.length)
        return !1;
    if (0 == t.length)
        return !1;
    const r = []
      , s = t.split("||");
    for (const n in s) {
        const e = s[n].slice(2).toLowerCase().trimRight("|");
        r.push(e)
    }
    let i = !1;
    const o = e.toLowerCase();
    for (const n in r)
        if (r[n] > 0 && -1 != o.indexOf(r[n])) {
            i = !0;
            break
        }
    return i
}
function $e() {
    let e = !1;
    do {
        if (!document.activeElement)
            break;
        const t = document.activeElement
          , r = t.tagName.toUpperCase();
        if ("INPUT" === r || "TEXTAREA" === r) {
            e = !0;
            break
        }
        if (!t.contentEditable)
            break;
        if ("true" === t.contentEditable.toLowerCase()) {
            e = !0;
            break
        }
    } while (0);
    return e
}
function ue(e, t) {
    let r = void 0;
    do {
        if (!e)
            break;
        if ("VIDEO" !== e.tagName.toUpperCase())
            break;
        if (e.src) {
            if (0 === e.src.toLowerCase().indexOf("blob:") && !t)
                break;
            r = e.src;
            break
        }
        if (!e.children || 0 === e.children.length)
            break;
        for (let t = 0; t < e.children.length; t++) {
            const s = e.children[t];
            if ("source" === s.tagName.toLowerCase() && s.src) {
                0 !== s.src.toLowerCase().indexOf("blob:") && (r = s.src);
                break
            }
        }
    } while (0);
    return r
}
function Ie() {
    const e = navigator.userAgent.toLowerCase();
    let t = "unknown";
    return /macintosh/i.test(e) && !navigator.maxTouchPoints ? t = "Mac" : /iphone/i.test(e) ? t = "iPhone" : /ipad/i.test(e) || /macintosh/i.test(e) && navigator.maxTouchPoints ? t = "iPad" : /ipod/i.test(e) ? t = "iPod" : /android/i.test(e) ? t = "Android" : /windows/i.test(e) && (t = "Windows"),
    t
}
function fe() {
    var e;
    switch (null == (e = Ie()) ? void 0 : e.toLowerCase()) {
    case "mac":
        window.location.href = "thunder://QUFEdW1teUxpbmsvQ29weS1Gcm9tLUNsaXBib2FyZFpa";
        break;
    case "windows":
        window.location.href = "thunderx://QUEtUnVuVGh1bmRlckFuZFF1aXQgLVN0YXJ0U291cmNlOlRodW5kZXJVbmlvbl9Qcm90b2NhbFpaCg=="
    }
}
ne.re,
ne.src,
ne.t;
let Re = void 0;
const me = function(e) {
    const {aid: t, id: i, ext: o, thunderVersion: a, peerId: E, osVersion: h, parentProcess: c, currentTab: l={}} = e;
    let p = "http://stat.download.xunlei.com:8099/?xlbtid=1&aid=" + t + "&id=" + i + "&peerid=" + E + `&userid=&referfrom=100001&OS=${n ? "Mac OS" : "win"}&OSversion=` + h + "&productname=ThunderX&productversion=" + a + "&value3=" + Re + "&value4=" + c + "&valueT=" + (new Date).getTime();
    o && o.length > 0 && (p += "&" + o),
    s.info("report stat", `aid: ${t} id: ${i} thunderVersion: ${a} peerId: ${E} osVersion: ${h} parentProcess: ${c} `, "业务参数:", o),
    r({
        url: p,
        type: "GET",
        success: function() {},
        error: function(e) {
            s.error("report stat failed !!!", e)
        }
    })
}
  , de = function(e, t, r) {
    i.postMessage("GetThunderInfo", [], void 0, (async function(s, i) {
        if (s) {
            const s = i[0].peerId
              , o = i[0].osVersion
              , n = i[0].thunderVersion
              , a = i[0].parentProcess;
            me({
                aid: e,
                id: t,
                ext: r,
                thunderVersion: n,
                peerId: s,
                osVersion: o,
                parentProcess: a
            })
        } else {
            const s = await o("Q");
            me({
                aid: e,
                id: t,
                ext: r,
                thunderVersion: "",
                peerId: s,
                osVersion: "",
                parentProcess: ""
            })
        }
    }
    ))
};
function Le(e, t, i) {
    Re ? de(e, t, i) : r({
        url: chrome.runtime.getURL("manifest.json"),
        type: "GET",
        success: function(r) {
            Re = r.version,
            de(e, t, i)
        },
        error: function(e) {
            s.error("stat failed! error 2:", e)
        }
    })
}
function Ne(e, t, r={}) {
    s.info("report stat v2", `aid: ${e} id: ${t} `, r && JSON.stringify(r)),
    Le(e, t, function(e, t="&") {
        return 0 === Object.keys(e).length ? "" : Object.keys(e).map(t => `${encodeURIComponent(t)}=${encodeURIComponent(e[t])}`).join(t)
    }(r))
}
export {he as G, Ee as I, ue as a, ce as b, le as c, ae as d, pe as e, Ne as f, Ie as g, $e as i, fe as o, Le as s};
