import {aa as st, R as ct} from "./scheduler.l1LjP6Xc.js";
import {w as _e} from "./index.gWkvzL-Q.js";
import {H as te, S as we, R as Ve} from "./control.pJ1mnnAb.js";
new URL("sveltekit-internal://");
function lt(e, n) {
    return e === "/" || n === "ignore" ? e : n === "never" ? e.endsWith("/") ? e.slice(0, -1) : e : n === "always" && !e.endsWith("/") ? e + "/" : e
}
function ft(e) {
    return e.split("%25").map(decodeURI).join("%25")
}
function ut(e) {
    for (const n in e)
        e[n] = decodeURIComponent(e[n]);
    return e
}
function fe({href: e}) {
    return e.split("#")[0]
}
const dt = ["href", "pathname", "search", "toString", "toJSON"];
function ht(e, n, t) {
    const r = new URL(e);
    Object.defineProperty(r, "searchParams", {
        value: new Proxy(r.searchParams,{
            get(a, o) {
                if (o === "get" || o === "getAll" || o === "has")
                    return i=>(t(i),
                    a[o](i));
                n();
                const s = Reflect.get(a, o);
                return typeof s == "function" ? s.bind(a) : s
            }
        }),
        enumerable: !0,
        configurable: !0
    });
    for (const a of dt)
        Object.defineProperty(r, a, {
            get() {
                return n(),
                e[a]
            },
            enumerable: !0,
            configurable: !0
        });
    return r
}
const pt = "/__data.json"
  , gt = ".html__data.json";
function mt(e) {
    return e.endsWith(".html") ? e.replace(/\.html$/, gt) : e.replace(/\/$/, "") + pt
}
function _t(...e) {
    let n = 5381;
    for (const t of e)
        if (typeof t == "string") {
            let r = t.length;
            for (; r; )
                n = n * 33 ^ t.charCodeAt(--r)
        } else if (ArrayBuffer.isView(t)) {
            const r = new Uint8Array(t.buffer,t.byteOffset,t.byteLength);
            let a = r.length;
            for (; a; )
                n = n * 33 ^ r[--a]
        } else
            throw new TypeError("value must be a string or TypedArray");
    return (n >>> 0).toString(36)
}
function wt(e) {
    const n = atob(e)
      , t = new Uint8Array(n.length);
    for (let r = 0; r < n.length; r++)
        t[r] = n.charCodeAt(r);
    return t.buffer
}
const Fe = window.fetch;
window.fetch = (e,n)=>((e instanceof Request ? e.method : (n == null ? void 0 : n.method) || "GET") !== "GET" && F.delete(ye(e)),
Fe(e, n));
const F = new Map;
function yt(e, n) {
    const t = ye(e, n)
      , r = document.querySelector(t);
    if (r != null && r.textContent) {
        let {body: a, ...o} = JSON.parse(r.textContent);
        const s = r.getAttribute("data-ttl");
        return s && F.set(t, {
            body: a,
            init: o,
            ttl: 1e3 * Number(s)
        }),
        r.getAttribute("data-b64") !== null && (a = wt(a)),
        Promise.resolve(new Response(a,o))
    }
    return window.fetch(e, n)
}
function vt(e, n, t) {
    if (F.size > 0) {
        const r = ye(e, t)
          , a = F.get(r);
        if (a) {
            if (performance.now() < a.ttl && ["default", "force-cache", "only-if-cached", void 0].includes(t == null ? void 0 : t.cache))
                return new Response(a.body,a.init);
            F.delete(r)
        }
    }
    return window.fetch(n, t)
}
function ye(e, n) {
    let r = `script[data-sveltekit-fetched][data-url=${JSON.stringify(einstanceof Request ? e.url : e)}]`;
    if (n != null && n.headers || n != null && n.body) {
        const a = [];
        n.headers && a.push([...new Headers(n.headers)].join(",")),
        n.body && (typeof n.body == "string" || ArrayBuffer.isView(n.body)) && a.push(n.body),
        r += `[data-hash="${_t(...a)}"]`
    }
    return r
}
const bt = /^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;
function Et(e) {
    const n = [];
    return {
        pattern: e === "/" ? /^\/$/ : new RegExp(`^${At(e).map(r=>{
            const a = /^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(r);
            if (a)
                return n.push({
                    name: a[1],
                    matcher: a[2],
                    optional: !1,
                    rest: !0,
                    chained: !0
                }),
                "(?:/(.*))?";
            const o = /^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(r);
            if (o)
                return n.push({
                    name: o[1],
                    matcher: o[2],
                    optional: !0,
                    rest: !1,
                    chained: !0
                }),
                "(?:/([^/]+))?";
            if (!r)
                return;
            const s = r.split(/\[(.+?)\](?!\])/);
            return "/" + s.map((c,f)=>{
                if (f % 2) {
                    if (c.startsWith("x+"))
                        return ue(String.fromCharCode(parseInt(c.slice(2), 16)));
                    if (c.startsWith("u+"))
                        return ue(String.fromCharCode(...c.slice(2).split("-").map(l=>parseInt(l, 16))));
                    const u = bt.exec(c)
                      , [,h,g,d,m] = u;
                    return n.push({
                        name: d,
                        matcher: m,
                        optional: !!h,
                        rest: !!g,
                        chained: g ? f === 1 && s[0] === "" : !1
                    }),
                    g ? "(.*?)" : h ? "([^/]*)?" : "([^/]+?)"
                }
                return ue(c)
            }
            ).join("")
        }
        ).join("")}/?$`),
        params: n
    }
}
function kt(e) {
    return !/^\([^)]+\)$/.test(e)
}
function At(e) {
    return e.slice(1).split("/").filter(kt)
}
function St(e, n, t) {
    const r = {}
      , a = e.slice(1)
      , o = a.filter(i=>i !== void 0);
    let s = 0;
    for (let i = 0; i < n.length; i += 1) {
        const c = n[i];
        let f = a[i - s];
        if (c.chained && c.rest && s && (f = a.slice(i - s, i + 1).filter(u=>u).join("/"),
        s = 0),
        f === void 0) {
            c.rest && (r[c.name] = "");
            continue
        }
        if (!c.matcher || t[c.matcher](f)) {
            r[c.name] = f;
            const u = n[i + 1]
              , h = a[i + 1];
            u && !u.rest && u.optional && h && c.chained && (s = 0),
            !u && !h && Object.keys(r).length === o.length && (s = 0);
            continue
        }
        if (c.optional && c.chained) {
            s++;
            continue
        }
        return
    }
    if (!s)
        return r
}
function ue(e) {
    return e.normalize().replace(/[[\]]/g, "\\$&").replace(/%/g, "%25").replace(/\//g, "%2[Ff]").replace(/\?/g, "%3[Ff]").replace(/#/g, "%23").replace(/[.*+?^${}()|\\]/g, "\\$&")
}
function Rt({nodes: e, server_loads: n, dictionary: t, matchers: r}) {
    const a = new Set(n);
    return Object.entries(t).map(([i,[c,f,u]])=>{
        const {pattern: h, params: g} = Et(i)
          , d = {
            id: i,
            exec: m=>{
                const l = h.exec(m);
                if (l)
                    return St(l, g, r)
            }
            ,
            errors: [1, ...u || []].map(m=>e[m]),
            layouts: [0, ...f || []].map(s),
            leaf: o(c)
        };
        return d.errors.length = d.layouts.length = Math.max(d.errors.length, d.layouts.length),
        d
    }
    );
    function o(i) {
        const c = i < 0;
        return c && (i = ~i),
        [c, e[i]]
    }
    function s(i) {
        return i === void 0 ? i : [a.has(i), e[i]]
    }
}
function Me(e, n=JSON.parse) {
    try {
        return n(sessionStorage[e])
    } catch {}
}
function Ue(e, n, t=JSON.stringify) {
    const r = t(n);
    try {
        sessionStorage[e] = r
    } catch {}
}
var $e;
const I = (($e = globalThis.__sveltekit_szhh80) == null ? void 0 : $e.base) ?? "";
var Ce;
const It = ((Ce = globalThis.__sveltekit_szhh80) == null ? void 0 : Ce.assets) ?? I
  , Lt = "1709096713880"
  , Ge = "sveltekit:snapshot"
  , He = "sveltekit:scroll"
  , qe = "sveltekit:states"
  , Pt = "sveltekit:pageurl"
  , j = "sveltekit:history"
  , M = "sveltekit:navigation"
  , Y = {
    tap: 1,
    hover: 2,
    viewport: 3,
    eager: 4,
    off: -1,
    false: -1
}
  , K = location.origin;
function Be(e) {
    if (e instanceof URL)
        return e;
    let n = document.baseURI;
    if (!n) {
        const t = document.getElementsByTagName("base");
        n = t.length ? t[0].href : document.URL
    }
    return new URL(e,n)
}
function ve() {
    return {
        x: pageXOffset,
        y: pageYOffset
    }
}
function O(e, n) {
    return e.getAttribute(`data-sveltekit-${n}`)
}
const Te = {
    ...Y,
    "": Y.hover
};
function Ke(e) {
    let n = e.assignedSlot ?? e.parentNode;
    return (n == null ? void 0 : n.nodeType) === 11 && (n = n.host),
    n
}
function ze(e, n) {
    for (; e && e !== n; ) {
        if (e.nodeName.toUpperCase() === "A" && e.hasAttribute("href"))
            return e;
        e = Ke(e)
    }
}
function pe(e, n) {
    let t;
    try {
        t = new URL(e instanceof SVGAElement ? e.href.baseVal : e.href,document.baseURI)
    } catch {}
    const r = e instanceof SVGAElement ? e.target.baseVal : e.target
      , a = !t || !!r || ne(t, n) || (e.getAttribute("rel") || "").split(/\s+/).includes("external")
      , o = (t == null ? void 0 : t.origin) === K && e.hasAttribute("download");
    return {
        url: t,
        external: a,
        target: r,
        download: o
    }
}
function W(e) {
    let n = null
      , t = null
      , r = null
      , a = null
      , o = null
      , s = null
      , i = e;
    for (; i && i !== document.documentElement; )
        r === null && (r = O(i, "preload-code")),
        a === null && (a = O(i, "preload-data")),
        n === null && (n = O(i, "keepfocus")),
        t === null && (t = O(i, "noscroll")),
        o === null && (o = O(i, "reload")),
        s === null && (s = O(i, "replacestate")),
        i = Ke(i);
    function c(f) {
        switch (f) {
        case "":
        case "true":
            return !0;
        case "off":
        case "false":
            return !1;
        default:
            return
        }
    }
    return {
        preload_code: Te[r ?? "off"],
        preload_data: Te[a ?? "off"],
        keepfocus: c(n),
        noscroll: c(t),
        reload: c(o),
        replace_state: c(s)
    }
}
function xe(e) {
    const n = _e(e);
    let t = !0;
    function r() {
        t = !0,
        n.update(s=>s)
    }
    function a(s) {
        t = !1,
        n.set(s)
    }
    function o(s) {
        let i;
        return n.subscribe(c=>{
            (i === void 0 || t && c !== i) && s(i = c)
        }
        )
    }
    return {
        notify: r,
        set: a,
        subscribe: o
    }
}
function Ut() {
    const {set: e, subscribe: n} = _e(!1);
    let t;
    async function r() {
        clearTimeout(t);
        try {
            const a = await fetch(`${It}/_app/version.json`, {
                headers: {
                    pragma: "no-cache",
                    "cache-control": "no-cache"
                }
            });
            if (!a.ok)
                return !1;
            const s = (await a.json()).version !== Lt;
            return s && (e(!0),
            clearTimeout(t)),
            s
        } catch {
            return !1
        }
    }
    return {
        subscribe: n,
        check: r
    }
}
function ne(e, n) {
    return e.origin !== K || !e.pathname.startsWith(n)
}
const Tt = -1
  , xt = -2
  , Nt = -3
  , Ot = -4
  , jt = -5
  , Dt = -6;
function $t(e, n) {
    if (typeof e == "number")
        return a(e, !0);
    if (!Array.isArray(e) || e.length === 0)
        throw new Error("Invalid input");
    const t = e
      , r = Array(t.length);
    function a(o, s=!1) {
        if (o === Tt)
            return;
        if (o === Nt)
            return NaN;
        if (o === Ot)
            return 1 / 0;
        if (o === jt)
            return -1 / 0;
        if (o === Dt)
            return -0;
        if (s)
            throw new Error("Invalid input");
        if (o in r)
            return r[o];
        const i = t[o];
        if (!i || typeof i != "object")
            r[o] = i;
        else if (Array.isArray(i))
            if (typeof i[0] == "string") {
                const c = i[0]
                  , f = n == null ? void 0 : n[c];
                if (f)
                    return r[o] = f(a(i[1]));
                switch (c) {
                case "Date":
                    r[o] = new Date(i[1]);
                    break;
                case "Set":
                    const u = new Set;
                    r[o] = u;
                    for (let d = 1; d < i.length; d += 1)
                        u.add(a(i[d]));
                    break;
                case "Map":
                    const h = new Map;
                    r[o] = h;
                    for (let d = 1; d < i.length; d += 2)
                        h.set(a(i[d]), a(i[d + 1]));
                    break;
                case "RegExp":
                    r[o] = new RegExp(i[1],i[2]);
                    break;
                case "Object":
                    r[o] = Object(i[1]);
                    break;
                case "BigInt":
                    r[o] = BigInt(i[1]);
                    break;
                case "null":
                    const g = Object.create(null);
                    r[o] = g;
                    for (let d = 1; d < i.length; d += 2)
                        g[i[d]] = a(i[d + 1]);
                    break;
                default:
                    throw new Error(`Unknown type ${c}`)
                }
            } else {
                const c = new Array(i.length);
                r[o] = c;
                for (let f = 0; f < i.length; f += 1) {
                    const u = i[f];
                    u !== xt && (c[f] = a(u))
                }
            }
        else {
            const c = {};
            r[o] = c;
            for (const f in i) {
                const u = i[f];
                c[f] = a(u)
            }
        }
        return r[o]
    }
    return a(0)
}
const Ye = new Set(["load", "prerender", "csr", "ssr", "trailingSlash", "config"]);
[...Ye];
const Ct = new Set([...Ye]);
[...Ct];
function Vt(e) {
    return e.filter(n=>n != null)
}
const Ft = "x-sveltekit-invalidated"
  , Mt = "x-sveltekit-trailing-slash";
function J(e) {
    return e instanceof te || e instanceof we ? e.status : 500
}
function Gt(e) {
    return e instanceof we ? e.text : "Internal Error"
}
const N = Me(He) ?? {}
  , G = Me(Ge) ?? {}
  , U = {
    url: xe({}),
    page: xe({}),
    navigating: _e(null),
    updated: Ut()
};
function be(e) {
    N[e] = ve()
}
function Ht(e, n) {
    let t = e + 1;
    for (; N[t]; )
        delete N[t],
        t += 1;
    for (t = n + 1; G[t]; )
        delete G[t],
        t += 1
}
function D(e) {
    return location.href = e.href,
    new Promise(()=>{}
    )
}
function Ne() {}
let ae, ge, X, L, me, C;
const H = []
  , Z = [];
let P = null;
const Ee = []
  , qt = [];
let x = [], w = {
    branch: [],
    error: null,
    url: null
}, ke = !1, Q = !1, Oe = !0, q = !1, V = !1, We = !1, re = !1, oe, k, R, S, $, de;
async function nn(e, n, t) {
    var a, o;
    document.URL !== location.href && (location.href = location.href),
    C = e,
    ae = Rt(e),
    L = document.documentElement,
    me = n,
    ge = e.nodes[0],
    X = e.nodes[1],
    ge(),
    X(),
    k = (a = history.state) == null ? void 0 : a[j],
    R = (o = history.state) == null ? void 0 : o[M],
    k || (k = R = Date.now(),
    history.replaceState({
        ...history.state,
        [j]: k,
        [M]: R
    }, ""));
    const r = N[k];
    r && (history.scrollRestoration = "manual",
    scrollTo(r.x, r.y)),
    t ? await Xt(me, t) : Wt(location.href, {
        replaceState: !0
    }),
    Jt()
}
async function Je() {
    if (await (de || (de = Promise.resolve())),
    !de)
        return;
    de = null;
    const e = se(w.url, !0);
    P = null;
    const n = $ = {}
      , t = e && await Ie(e);
    n === $ && (t && (t.type === "redirect" ? await Ae(new URL(t.location,w.url).href, {}, 1, n) : (t.props.page !== void 0 && (S = t.props.page),
    oe.$set(t.props))),
    H.length = 0)
}
function Xe(e) {
    Z.some(n=>n == null ? void 0 : n.snapshot) && (G[e] = Z.map(n=>{
        var t;
        return (t = n == null ? void 0 : n.snapshot) == null ? void 0 : t.capture()
    }
    ))
}
function Ze(e) {
    var n;
    (n = G[e]) == null || n.forEach((t,r)=>{
        var a, o;
        (o = (a = Z[r]) == null ? void 0 : a.snapshot) == null || o.restore(t)
    }
    )
}
function je() {
    be(k),
    Ue(He, N),
    Xe(R),
    Ue(Ge, G)
}
async function Ae(e, n, t, r) {
    return z({
        type: "goto",
        url: Be(e),
        keepfocus: n.keepFocus,
        noscroll: n.noScroll,
        replace_state: n.replaceState,
        state: n.state,
        redirect_count: t,
        nav_token: r,
        accept: ()=>{
            n.invalidateAll && (re = !0)
        }
    })
}
async function Bt(e) {
    return P = {
        id: e.id,
        promise: Ie(e).then(n=>(n.type === "loaded" && n.state.error && (P = null),
        n))
    },
    P.promise
}
async function he(e) {
    const n = ae.find(t=>t.exec(et(e)));
    n && await Promise.all([...n.layouts, n.leaf].map(t=>t == null ? void 0 : t[1]()))
}
function Qe(e, n) {
    var a;
    w = e.state;
    const t = document.querySelector("style[data-sveltekit]");
    t && t.remove(),
    S = e.props.page,
    oe = new C.root({
        target: n,
        props: {
            ...e.props,
            stores: U,
            components: Z
        },
        hydrate: !0
    }),
    Ze(R);
    const r = {
        from: null,
        to: {
            params: w.params,
            route: {
                id: ((a = w.route) == null ? void 0 : a.id) ?? null
            },
            url: new URL(location.href)
        },
        willUnload: !1,
        type: "enter",
        complete: Promise.resolve()
    };
    x.forEach(o=>o(r)),
    Q = !0
}
async function ee({url: e, params: n, branch: t, status: r, error: a, route: o, form: s}) {
    let i = "never";
    if (I && (e.pathname === I || e.pathname === I + "/"))
        i = "always";
    else
        for (const d of t)
            (d == null ? void 0 : d.slash) !== void 0 && (i = d.slash);
    e.pathname = lt(e.pathname, i),
    e.search = e.search;
    const c = {
        type: "loaded",
        state: {
            url: e,
            params: n,
            branch: t,
            error: a,
            route: o
        },
        props: {
            constructors: Vt(t).map(d=>d.node.component),
            page: S
        }
    };
    s !== void 0 && (c.props.form = s);
    let f = {}
      , u = !S
      , h = 0;
    for (let d = 0; d < Math.max(t.length, w.branch.length); d += 1) {
        const m = t[d]
          , l = w.branch[d];
        (m == null ? void 0 : m.data) !== (l == null ? void 0 : l.data) && (u = !0),
        m && (f = {
            ...f,
            ...m.data
        },
        u && (c.props[`data_${h}`] = f),
        h += 1)
    }
    return (!w.url || e.href !== w.url.href || w.error !== a || s !== void 0 && s !== S.form || u) && (c.props.page = {
        error: a,
        params: n,
        route: {
            id: (o == null ? void 0 : o.id) ?? null
        },
        state: {},
        status: r,
        url: new URL(e),
        form: s ?? null,
        data: u ? f : S.data
    }),
    c
}
async function Se({loader: e, parent: n, url: t, params: r, route: a, server_data_node: o}) {
    var u, h, g;
    let s = null
      , i = !0;
    const c = {
        dependencies: new Set,
        params: new Set,
        parent: !1,
        route: !1,
        url: !1,
        search_params: new Set
    }
      , f = await e();
    if ((u = f.universal) != null && u.load) {
        let d = function(...l) {
            for (const _ of l) {
                const {href: v} = new URL(_,t);
                c.dependencies.add(v)
            }
        };
        const m = {
            route: new Proxy(a,{
                get: (l,_)=>(i && (c.route = !0),
                l[_])
            }),
            params: new Proxy(r,{
                get: (l,_)=>(i && c.params.add(_),
                l[_])
            }),
            data: (o == null ? void 0 : o.data) ?? null,
            url: ht(t, ()=>{
                i && (c.url = !0)
            }
            , l=>{
                i && c.search_params.add(l)
            }
            ),
            async fetch(l, _) {
                let v;
                l instanceof Request ? (v = l.url,
                _ = {
                    body: l.method === "GET" || l.method === "HEAD" ? void 0 : await l.blob(),
                    cache: l.cache,
                    credentials: l.credentials,
                    headers: l.headers,
                    integrity: l.integrity,
                    keepalive: l.keepalive,
                    method: l.method,
                    mode: l.mode,
                    redirect: l.redirect,
                    referrer: l.referrer,
                    referrerPolicy: l.referrerPolicy,
                    signal: l.signal,
                    ..._
                }) : v = l;
                const A = new URL(v,t);
                return i && d(A.href),
                A.origin === t.origin && (v = A.href.slice(t.origin.length)),
                Q ? vt(v, A.href, _) : yt(v, _)
            },
            setHeaders: ()=>{}
            ,
            depends: d,
            parent() {
                return i && (c.parent = !0),
                n()
            },
            untrack(l) {
                i = !1;
                try {
                    return l()
                } finally {
                    i = !0
                }
            }
        };
        s = await f.universal.load.call(null, m) ?? null
    }
    return {
        node: f,
        loader: e,
        server: o,
        universal: (h = f.universal) != null && h.load ? {
            type: "data",
            data: s,
            uses: c
        } : null,
        data: s ?? (o == null ? void 0 : o.data) ?? null,
        slash: ((g = f.universal) == null ? void 0 : g.trailingSlash) ?? (o == null ? void 0 : o.slash)
    }
}
function De(e, n, t, r, a, o) {
    if (re)
        return !0;
    if (!a)
        return !1;
    if (a.parent && e || a.route && n || a.url && t)
        return !0;
    for (const s of a.search_params)
        if (r.has(s))
            return !0;
    for (const s of a.params)
        if (o[s] !== w.params[s])
            return !0;
    for (const s of a.dependencies)
        if (H.some(i=>i(new URL(s))))
            return !0;
    return !1
}
function Re(e, n) {
    return (e == null ? void 0 : e.type) === "data" ? e : (e == null ? void 0 : e.type) === "skip" ? n ?? null : null
}
function Kt(e, n) {
    if (!e)
        return new Set(n.searchParams.keys());
    const t = new Set([...e.searchParams.keys(), ...n.searchParams.keys()]);
    for (const r of t) {
        const a = e.searchParams.getAll(r)
          , o = n.searchParams.getAll(r);
        a.every(s=>o.includes(s)) && o.every(s=>a.includes(s)) && t.delete(r)
    }
    return t
}
async function Ie({id: e, invalidating: n, url: t, params: r, route: a}) {
    if ((P == null ? void 0 : P.id) === e)
        return P.promise;
    const {errors: o, layouts: s, leaf: i} = a
      , c = [...s, i];
    o.forEach(p=>p == null ? void 0 : p().catch(()=>{}
    )),
    c.forEach(p=>p == null ? void 0 : p[1]().catch(()=>{}
    ));
    let f = null;
    const u = w.url ? e !== w.url.pathname + w.url.search : !1
      , h = w.route ? a.id !== w.route.id : !1
      , g = Kt(w.url, t);
    let d = !1;
    const m = c.map((p,y)=>{
        var T;
        const b = w.branch[y]
          , E = !!(p != null && p[0]) && ((b == null ? void 0 : b.loader) !== p[1] || De(d, h, u, g, (T = b.server) == null ? void 0 : T.uses, r));
        return E && (d = !0),
        E
    }
    );
    if (m.some(Boolean)) {
        try {
            f = await rt(t, m)
        } catch (p) {
            return ie({
                status: J(p),
                error: await B(p, {
                    url: t,
                    params: r,
                    route: {
                        id: a.id
                    }
                }),
                url: t,
                route: a
            })
        }
        if (f.type === "redirect")
            return f
    }
    const l = f == null ? void 0 : f.nodes;
    let _ = !1;
    const v = c.map(async(p,y)=>{
        var ce;
        if (!p)
            return;
        const b = w.branch[y]
          , E = l == null ? void 0 : l[y];
        if ((!E || E.type === "skip") && p[1] === (b == null ? void 0 : b.loader) && !De(_, h, u, g, (ce = b.universal) == null ? void 0 : ce.uses, r))
            return b;
        if (_ = !0,
        (E == null ? void 0 : E.type) === "error")
            throw E;
        return Se({
            loader: p[1],
            url: t,
            params: r,
            route: a,
            parent: async()=>{
                var Pe;
                const Le = {};
                for (let le = 0; le < y; le += 1)
                    Object.assign(Le, (Pe = await v[le]) == null ? void 0 : Pe.data);
                return Le
            }
            ,
            server_data_node: Re(E === void 0 && p[0] ? {
                type: "skip"
            } : E ?? null, p[0] ? b == null ? void 0 : b.server : void 0)
        })
    }
    );
    for (const p of v)
        p.catch(()=>{}
        );
    const A = [];
    for (let p = 0; p < c.length; p += 1)
        if (c[p])
            try {
                A.push(await v[p])
            } catch (y) {
                if (y instanceof Ve)
                    return {
                        type: "redirect",
                        location: y.location
                    };
                let b = J(y), E;
                if (l != null && l.includes(y))
                    b = y.status ?? b,
                    E = y.error;
                else if (y instanceof te)
                    E = y.body;
                else {
                    if (await U.updated.check())
                        return await D(t);
                    E = await B(y, {
                        params: r,
                        url: t,
                        route: {
                            id: a.id
                        }
                    })
                }
                const T = await zt(p, A, o);
                return T ? await ee({
                    url: t,
                    params: r,
                    branch: A.slice(0, T.idx).concat(T.node),
                    status: b,
                    error: E,
                    route: a
                }) : await nt(t, {
                    id: a.id
                }, E, b)
            }
        else
            A.push(void 0);
    return await ee({
        url: t,
        params: r,
        branch: A,
        status: 200,
        error: null,
        route: a,
        form: n ? void 0 : null
    })
}
async function zt(e, n, t) {
    for (; e--; )
        if (t[e]) {
            let r = e;
            for (; !n[r]; )
                r -= 1;
            try {
                return {
                    idx: r + 1,
                    node: {
                        node: await t[e](),
                        loader: t[e],
                        data: {},
                        server: null,
                        universal: null
                    }
                }
            } catch {
                continue
            }
        }
}
async function ie({status: e, error: n, url: t, route: r}) {
    const a = {};
    let o = null;
    if (C.server_loads[0] === 0)
        try {
            const f = await rt(t, [!0]);
            if (f.type !== "data" || f.nodes[0] && f.nodes[0].type !== "data")
                throw 0;
            o = f.nodes[0] ?? null
        } catch {
            (t.origin !== K || t.pathname !== location.pathname || ke) && await D(t)
        }
    const i = await Se({
        loader: ge,
        url: t,
        params: a,
        route: r,
        parent: ()=>Promise.resolve({}),
        server_data_node: Re(o)
    })
      , c = {
        node: await X(),
        loader: X,
        universal: null,
        server: null,
        data: null
    };
    return await ee({
        url: t,
        params: a,
        branch: [i, c],
        status: e,
        error: n,
        route: null
    })
}
function se(e, n) {
    if (!e || ne(e, I))
        return;
    let t;
    try {
        t = C.hooks.reroute({
            url: new URL(e)
        }) ?? e.pathname
    } catch {
        return
    }
    const r = et(t);
    for (const a of ae) {
        const o = a.exec(r);
        if (o)
            return {
                id: e.pathname + e.search,
                invalidating: n,
                route: a,
                params: ut(o),
                url: e
            }
    }
}
function et(e) {
    return ft(e.slice(I.length) || "/")
}
function tt({url: e, type: n, intent: t, delta: r}) {
    let a = !1;
    const o = it(w, t, e, n);
    r !== void 0 && (o.navigation.delta = r);
    const s = {
        ...o.navigation,
        cancel: ()=>{
            a = !0,
            o.reject(new Error("navigation cancelled"))
        }
    };
    return q || Ee.forEach(i=>i(s)),
    a ? null : o
}
async function z({type: e, url: n, popped: t, keepfocus: r, noscroll: a, replace_state: o, state: s={}, redirect_count: i=0, nav_token: c={}, accept: f=Ne, block: u=Ne}) {
    const h = se(n, !1)
      , g = tt({
        url: n,
        type: e,
        delta: t == null ? void 0 : t.delta,
        intent: h
    });
    if (!g) {
        u();
        return
    }
    const d = k
      , m = R;
    f(),
    q = !0,
    Q && U.navigating.set(g.navigation),
    $ = c;
    let l = h && await Ie(h);
    if (!l) {
        if (ne(n, I))
            return await D(n);
        l = await nt(n, {
            id: null
        }, await B(new we(404,"Not Found",`Not found: ${n.pathname}`), {
            url: n,
            params: {},
            route: {
                id: null
            }
        }), 404)
    }
    if (n = (h == null ? void 0 : h.url) || n,
    $ !== c)
        return g.reject(new Error("navigation aborted")),
        !1;
    if (l.type === "redirect")
        if (i >= 20)
            l = await ie({
                status: 500,
                error: await B(new Error("Redirect loop"), {
                    url: n,
                    params: {},
                    route: {
                        id: null
                    }
                }),
                url: n,
                route: {
                    id: null
                }
            });
        else
            return Ae(new URL(l.location,n).href, {}, i + 1, c),
            !1;
    else
        l.props.page.status >= 400 && await U.updated.check() && await D(n);
    if (H.length = 0,
    re = !1,
    be(d),
    Xe(m),
    l.props.page.url.pathname !== n.pathname && (n.pathname = l.props.page.url.pathname),
    s = t ? t.state : s,
    !t) {
        const p = o ? 0 : 1
          , y = {
            [j]: k += p,
            [M]: R += p,
            [qe]: s
        };
        (o ? history.replaceState : history.pushState).call(history, y, "", n),
        o || Ht(k, R)
    }
    if (P = null,
    l.props.page.state = s,
    Q) {
        w = l.state,
        l.props.page && (l.props.page.url = n);
        const p = (await Promise.all(qt.map(y=>y(g.navigation)))).filter(y=>typeof y == "function");
        if (p.length > 0) {
            let y = function() {
                x = x.filter(b=>!p.includes(b))
            };
            p.push(y),
            x.push(...p)
        }
        oe.$set(l.props),
        We = !0
    } else
        Qe(l, me);
    const {activeElement: _} = document;
    await st();
    const v = t ? t.scroll : a ? ve() : null;
    if (Oe) {
        const p = n.hash && document.getElementById(decodeURIComponent(n.hash.slice(1)));
        v ? scrollTo(v.x, v.y) : p ? p.scrollIntoView() : scrollTo(0, 0)
    }
    const A = document.activeElement !== _ && document.activeElement !== document.body;
    !r && !A && Zt(),
    Oe = !0,
    l.props.page && (S = l.props.page),
    q = !1,
    e === "popstate" && Ze(R),
    g.fulfil(void 0),
    x.forEach(p=>p(g.navigation)),
    U.navigating.set(null)
}
async function nt(e, n, t, r) {
    return e.origin === K && e.pathname === location.pathname && !ke ? await ie({
        status: r,
        error: t,
        url: e,
        route: n
    }) : await D(e)
}
function Yt() {
    let e;
    L.addEventListener("mousemove", o=>{
        const s = o.target;
        clearTimeout(e),
        e = setTimeout(()=>{
            r(s, 2)
        }
        , 20)
    }
    );
    function n(o) {
        r(o.composedPath()[0], 1)
    }
    L.addEventListener("mousedown", n),
    L.addEventListener("touchstart", n, {
        passive: !0
    });
    const t = new IntersectionObserver(o=>{
        for (const s of o)
            s.isIntersecting && (he(s.target.href),
            t.unobserve(s.target))
    }
    ,{
        threshold: 0
    });
    function r(o, s) {
        const i = ze(o, L);
        if (!i)
            return;
        const {url: c, external: f, download: u} = pe(i, I);
        if (f || u)
            return;
        const h = W(i);
        if (!h.reload)
            if (s <= h.preload_data) {
                const g = se(c, !1);
                g && Bt(g)
            } else
                s <= h.preload_code && he(c.pathname)
    }
    function a() {
        t.disconnect();
        for (const o of L.querySelectorAll("a")) {
            const {url: s, external: i, download: c} = pe(o, I);
            if (i || c)
                continue;
            const f = W(o);
            f.reload || (f.preload_code === Y.viewport && t.observe(o),
            f.preload_code === Y.eager && he(s.pathname))
        }
    }
    x.push(a),
    a()
}
function B(e, n) {
    if (e instanceof te)
        return e.body;
    const t = J(e)
      , r = Gt(e);
    return C.hooks.handleError({
        error: e,
        event: n,
        status: t,
        message: r
    }) ?? {
        message: r
    }
}
function at(e, n) {
    ct(()=>(e.push(n),
    ()=>{
        const t = e.indexOf(n);
        e.splice(t, 1)
    }
    ))
}
function an(e) {
    at(x, e)
}
function rn(e) {
    at(Ee, e)
}
function Wt(e, n={}) {
    return e = Be(e),
    e.origin !== K ? Promise.reject(new Error("goto: invalid URL")) : Ae(e, n, 0)
}
function on(e) {
    if (typeof e == "function")
        H.push(e);
    else {
        const {href: n} = new URL(e,location.href);
        H.push(t=>t.href === n)
    }
    return Je()
}
function sn() {
    return re = !0,
    Je()
}
function Jt() {
    var n;
    history.scrollRestoration = "manual",
    addEventListener("beforeunload", t=>{
        let r = !1;
        if (je(),
        !q) {
            const a = it(w, void 0, null, "leave")
              , o = {
                ...a.navigation,
                cancel: ()=>{
                    r = !0,
                    a.reject(new Error("navigation cancelled"))
                }
            };
            Ee.forEach(s=>s(o))
        }
        r ? (t.preventDefault(),
        t.returnValue = "") : history.scrollRestoration = "auto"
    }
    ),
    addEventListener("visibilitychange", ()=>{
        document.visibilityState === "hidden" && je()
    }
    ),
    (n = navigator.connection) != null && n.saveData || Yt(),
    L.addEventListener("click", t=>{
        var g;
        if (t.button || t.which !== 1 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey || t.defaultPrevented)
            return;
        const r = ze(t.composedPath()[0], L);
        if (!r)
            return;
        const {url: a, external: o, target: s, download: i} = pe(r, I);
        if (!a)
            return;
        if (s === "_parent" || s === "_top") {
            if (window.parent !== window)
                return
        } else if (s && s !== "_self")
            return;
        const c = W(r);
        if (!(r instanceof SVGAElement) && a.protocol !== location.protocol && !(a.protocol === "https:" || a.protocol === "http:") || i)
            return;
        if (o || c.reload) {
            tt({
                url: a,
                type: "link"
            }) ? q = !0 : t.preventDefault();
            return
        }
        const [u,h] = a.href.split("#");
        if (h !== void 0 && u === fe(location)) {
            const [,d] = w.url.href.split("#");
            if (d === h) {
                t.preventDefault(),
                h === "" || h === "top" && r.ownerDocument.getElementById("top") === null ? window.scrollTo({
                    top: 0
                }) : (g = r.ownerDocument.getElementById(h)) == null || g.scrollIntoView();
                return
            }
            if (V = !0,
            be(k),
            e(a),
            !c.replace_state)
                return;
            V = !1
        }
        t.preventDefault(),
        z({
            type: "link",
            url: a,
            keepfocus: c.keepfocus,
            noscroll: c.noscroll,
            replace_state: c.replace_state ?? a.href === location.href
        })
    }
    ),
    L.addEventListener("submit", t=>{
        if (t.defaultPrevented)
            return;
        const r = HTMLFormElement.prototype.cloneNode.call(t.target)
          , a = t.submitter;
        if (((a == null ? void 0 : a.formMethod) || r.method) !== "get")
            return;
        const s = new URL((a == null ? void 0 : a.hasAttribute("formaction")) && (a == null ? void 0 : a.formAction) || r.action);
        if (ne(s, I))
            return;
        const i = t.target
          , c = W(i);
        if (c.reload)
            return;
        t.preventDefault(),
        t.stopPropagation();
        const f = new FormData(i)
          , u = a == null ? void 0 : a.getAttribute("name");
        u && f.append(u, (a == null ? void 0 : a.getAttribute("value")) ?? ""),
        s.search = new URLSearchParams(f).toString(),
        z({
            type: "form",
            url: s,
            keepfocus: c.keepfocus,
            noscroll: c.noscroll,
            replace_state: c.replace_state ?? s.href === location.href
        })
    }
    ),
    addEventListener("popstate", async t=>{
        var r;
        if ((r = t.state) != null && r[j]) {
            const a = t.state[j];
            if ($ = {},
            a === k)
                return;
            const o = N[a]
              , s = t.state[qe] ?? {}
              , i = new URL(t.state[Pt] ?? location.href)
              , c = t.state[M]
              , f = fe(location) === fe(w.url);
            if (c === R && (We || f)) {
                e(i),
                N[k] = ve(),
                o && scrollTo(o.x, o.y),
                s !== S.state && (S = {
                    ...S,
                    state: s
                },
                oe.$set({
                    page: S
                })),
                k = a;
                return
            }
            const h = a - k;
            await z({
                type: "popstate",
                url: i,
                popped: {
                    state: s,
                    scroll: o,
                    delta: h
                },
                accept: ()=>{
                    k = a,
                    R = c
                }
                ,
                block: ()=>{
                    history.go(-h)
                }
                ,
                nav_token: $
            })
        } else if (!V) {
            const a = new URL(location.href);
            e(a)
        }
    }
    ),
    addEventListener("hashchange", ()=>{
        V && (V = !1,
        history.replaceState({
            ...history.state,
            [j]: ++k,
            [M]: R
        }, "", location.href))
    }
    );
    for (const t of document.querySelectorAll("link"))
        t.rel === "icon" && (t.href = t.href);
    addEventListener("pageshow", t=>{
        t.persisted && U.navigating.set(null)
    }
    );
    function e(t) {
        w.url = t,
        U.page.set({
            ...S,
            url: t
        }),
        U.page.notify()
    }
}
async function Xt(e, {status: n=200, error: t, node_ids: r, params: a, route: o, data: s, form: i}) {
    ke = !0;
    const c = new URL(location.href);
    ({params: a={}, route: o={
        id: null
    }} = se(c, !1) || {});
    let f;
    try {
        const u = r.map(async(d,m)=>{
            const l = s[m];
            return l != null && l.uses && (l.uses = ot(l.uses)),
            Se({
                loader: C.nodes[d],
                url: c,
                params: a,
                route: o,
                parent: async()=>{
                    const _ = {};
                    for (let v = 0; v < m; v += 1)
                        Object.assign(_, (await u[v]).data);
                    return _
                }
                ,
                server_data_node: Re(l)
            })
        }
        )
          , h = await Promise.all(u)
          , g = ae.find(({id: d})=>d === o.id);
        if (g) {
            const d = g.layouts;
            for (let m = 0; m < d.length; m++)
                d[m] || h.splice(m, 0, void 0)
        }
        f = await ee({
            url: c,
            params: a,
            branch: h,
            status: n,
            error: t,
            form: i,
            route: g ?? null
        })
    } catch (u) {
        if (u instanceof Ve) {
            await D(new URL(u.location,location.href));
            return
        }
        f = await ie({
            status: J(u),
            error: await B(u, {
                url: c,
                params: a,
                route: o
            }),
            url: c,
            route: o
        })
    }
    f.props.page && (f.props.page.state = {}),
    Qe(f, e)
}
async function rt(e, n) {
    var a;
    const t = new URL(e);
    t.pathname = mt(e.pathname),
    e.pathname.endsWith("/") && t.searchParams.append(Mt, "1"),
    t.searchParams.append(Ft, n.map(o=>o ? "1" : "0").join(""));
    const r = await Fe(t.href);
    if (!r.ok) {
        let o;
        throw (a = r.headers.get("content-type")) != null && a.includes("application/json") ? o = await r.json() : r.status === 404 ? o = "Not Found" : r.status === 500 && (o = "Internal Error"),
        new te(r.status,o)
    }
    return new Promise(async o=>{
        var h;
        const s = new Map
          , i = r.body.getReader()
          , c = new TextDecoder;
        function f(g) {
            return $t(g, {
                Promise: d=>new Promise((m,l)=>{
                    s.set(d, {
                        fulfil: m,
                        reject: l
                    })
                }
                )
            })
        }
        let u = "";
        for (; ; ) {
            const {done: g, value: d} = await i.read();
            if (g && !u)
                break;
            for (u += !d && u ? `
` : c.decode(d, {
                stream: !0
            }); ; ) {
                const m = u.indexOf(`
`);
                if (m === -1)
                    break;
                const l = JSON.parse(u.slice(0, m));
                if (u = u.slice(m + 1),
                l.type === "redirect")
                    return o(l);
                if (l.type === "data")
                    (h = l.nodes) == null || h.forEach(_=>{
                        (_ == null ? void 0 : _.type) === "data" && (_.uses = ot(_.uses),
                        _.data = f(_.data))
                    }
                    ),
                    o(l);
                else if (l.type === "chunk") {
                    const {id: _, data: v, error: A} = l
                      , p = s.get(_);
                    s.delete(_),
                    A ? p.reject(f(A)) : p.fulfil(f(v))
                }
            }
        }
    }
    )
}
function ot(e) {
    return {
        dependencies: new Set((e == null ? void 0 : e.dependencies) ?? []),
        params: new Set((e == null ? void 0 : e.params) ?? []),
        parent: !!(e != null && e.parent),
        route: !!(e != null && e.route),
        url: !!(e != null && e.url),
        search_params: new Set((e == null ? void 0 : e.search_params) ?? [])
    }
}
function Zt() {
    const e = document.querySelector("[autofocus]");
    if (e)
        e.focus();
    else {
        const n = document.body
          , t = n.getAttribute("tabindex");
        n.tabIndex = -1,
        n.focus({
            preventScroll: !0,
            focusVisible: !1
        }),
        t !== null ? n.setAttribute("tabindex", t) : n.removeAttribute("tabindex");
        const r = getSelection();
        if (r && r.type !== "None") {
            const a = [];
            for (let o = 0; o < r.rangeCount; o += 1)
                a.push(r.getRangeAt(o));
            setTimeout(()=>{
                if (r.rangeCount === a.length) {
                    for (let o = 0; o < r.rangeCount; o += 1) {
                        const s = a[o]
                          , i = r.getRangeAt(o);
                        if (s.commonAncestorContainer !== i.commonAncestorContainer || s.startContainer !== i.startContainer || s.endContainer !== i.endContainer || s.startOffset !== i.startOffset || s.endOffset !== i.endOffset)
                            return
                    }
                    r.removeAllRanges()
                }
            }
            )
        }
    }
}
function it(e, n, t, r) {
    var c, f;
    let a, o;
    const s = new Promise((u,h)=>{
        a = u,
        o = h
    }
    );
    return s.catch(()=>{}
    ),
    {
        navigation: {
            from: {
                params: e.params,
                route: {
                    id: ((c = e.route) == null ? void 0 : c.id) ?? null
                },
                url: e.url
            },
            to: t && {
                params: (n == null ? void 0 : n.params) ?? null,
                route: {
                    id: ((f = n == null ? void 0 : n.route) == null ? void 0 : f.id) ?? null
                },
                url: t
            },
            willUnload: !n,
            type: r,
            complete: s
        },
        fulfil: a,
        reject: o
    }
}
export {an as a, rn as b, sn as c, nn as d, Wt as g, on as i, U as s, Lt as v};
