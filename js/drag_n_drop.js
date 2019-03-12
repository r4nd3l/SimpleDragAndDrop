var dragNdrop = function(e) {
  function t(e) {
    if (e) {
      var t = o(e);
      return s(t), t
    }
    return !1
  }

  function o(e) {
    var t = [];
    if (e instanceof Array)
      for (var o = 0, r = e.length; o < r; o++) t = t.concat(n(e[o]));
    else t = t.concat(n(e));
    return t
  }

  function n(e) {
    if ("string" == typeof e.innerHTML) return [e];
    if ("string" == typeof e) {
      for (var t = document.querySelectorAll(e), o = [], n = 0, r = t.length; n < r; n++) o.push(t[n]);
      return o
    }
  }

  function r() {
    a(B), d(B), s()
  }

  function s(e) {
    if (_(B, "dragNdrop"), e)
      for (var t = 0, o = e.length; t < o; t++) _(e[t], "dragNdrop__dropzone")
  }

  function d(e) {
    D ? u(e) : (e.style.position = V ? "auto" : "relative", e.style.zIndex = "999", A && "x" === A || "y" === A ? e.style.cursor = "x" === A ? "col-resize" : "row-resize" : e.style.cursor = "move")
  }

  function u(e) {
    var t = q(e, "position");
    t && "static" !== t ? e.style.position = t : e.style.position = V ? "auto" : "relative";
    var o = q(e, "zIndex");
    o && "auto" !== o ? e.style.zIndex = o : e.style.zIndex = "999";
    var n = q(e, "cursor");
    n && "auto" !== o ? e.style.cursor = n : A && "x" === A || "y" === A ? e.style.cursor = "x" === A ? "col-resize" : "row-resize" : e.style.cursor = "move"
  }

  function a(e) {
    document.addEventListener ? (e.addEventListener("mousedown", c, !1), e.addEventListener("touchstart", c, !1)) : (e.attachEvent("onmousedown", c), e.attachEvent("touchstart", c))
  }

  function c(e) {
    z("start"), I(B, "dragNdrop--stop"), _(B, "dragNdrop--start");
    var t = "touches" in e ? e.touches[0] : e;
    t.preventDefault ? t.preventDefault() : t.returnValue = !1, l(B, t), B.style.zIndex = parseInt(B.style.zIndex) + 1;
    var o = document.body.style;
    o.cursor = o.cursor && "inherit" !== o.cursor ? o.cursor : B.style.cursor, i()
  }

  function l(e, t) {
    if (Y = {
        x: t.pageX || t.clientX,
        y: t.pageY || t.clientY
      }, V) {
      var o = e.style.transform.split("translate3d(")[1],
        n = !!o && o.split(",");
      X.x = parseInt(n[0]) || 0, X.y = parseInt(n[1]) || 0
    } else X.x = parseInt(q(e, "left")) || 0, X.y = parseInt(q(e, "top")) || 0
  }

  function i() {
    document.addEventListener ? (document.addEventListener("mousemove", p, !1), document.addEventListener("touchmove", p, !1), document.addEventListener("mouseup", x, !1), document.addEventListener("touchend", x, !1)) : (document.attachEvent("onmousemove", p), document.attachEvent("touchmove", p), document.attachEvent("onmouseup", x), document.attachEvent("touchend", x))
  }

  function p(e) {
    var t;
    z("drag"), I(B, "dragNdrop--start"), _(B, "dragNdrop--drag"), M && w(B, M), "touches" in e ? (e.preventDefault(), t = e.touches[0]) : t = e, m(B, t, A)
  }

  function m(e, t, o) {
    var n = {
        x: t.pageX || t.clientX,
        y: t.pageY || t.clientY
      },
      r = {
        x: n.x - Y.x,
        y: n.y - Y.y
      };
    Y = {
      x: n.x,
      y: n.y
    }, f(e, r, o)
  }

  function f(e, t, o) {
    o && o !== !1 ? y(e, t, o) : v(e, {
      x: X.x + t.x,
      y: X.y + t.y
    })
  }

  function y(e, t, o) {
    "x" === o ? v(e, {
      x: X.x + t.x,
      y: X.y
    }) : "y" === o ? v(e, {
      x: X.x,
      y: X.y + t.y
    }) : H && (v(e, {
      x: X.x + t.x,
      y: X.y + t.y
    }), g(e, o, !1))
  }

  function v(e, t) {
    X = {
      x: t.x,
      y: t.y
    }, V ? (e.style.transform = "translate3d(" + t.x + "px ," + t.y + "px , 1px)", e.style.webkitTransform = "translate3d(" + t.x + "px ," + t.y + "px , 1px)") : (e.style.left = t.x + "px", e.style.top = t.y + "px")
  }

  function g(e, t, o) {
    if (e === t) return !1;
    for (var n = {
        x: window.scrollY || document.documentElement.scrollTop,
        y: window.scrollX || document.documentElement.scrollLeft
      }, r = {
        top: t.getBoundingClientRect().top + n.y,
        left: t.getBoundingClientRect().left + n.x
      }, s = {
        top: t.offsetHeight,
        left: t.offsetWidth
      }, d = {
        top: e.getBoundingClientRect().top + n.y,
        left: e.getBoundingClientRect().left + n.x
      }, u = {
        top: e.offsetHeight,
        left: e.offsetWidth
      }, a = ["top", "left", "top", "left"], c = [], l = 0, i = a.length; l < i; l++) l < i / 2 ? d[a[l]] >= r[a[l]] ? c.push(!0) : (c.push(!1), o || h(e, a[l], r[a[l]] - d[a[l]])) : d[a[l]] + u[a[l]] <= r[a[l]] + s[a[l]] ? c.push(!0) : (c.push(!1), o || h(e, a[l], r[a[l]] + s[a[l]] - (d[a[l]] + u[a[l]])));
    return c[0] && c[1] && c[2] && c[3]
  }

  function h(e, t, o) {
    "top" === t ? v(e, {
      y: X.y + o,
      x: X.x
    }) : v(e, {
      y: X.y,
      x: X.x + o
    })
  }

  function x() {
    z("stop"), I(B, "dragNdrop--drag"), _(B, "dragNdrop--stop");
    var e = !1;
    M && (e = L(B, M)), k && k({
      element: B,
      dropped: e,
      dropZones: M,
      constraints: A,
      customStyles: D,
      useTransform: V
    }), N(), B.style.zIndex = parseInt(B.style.zIndex) - 1, document.body.style.cursor = Z
  }

  function E() {
    x()
  }

  function N() {
    document.addEventListener ? (document.removeEventListener("mousemove", p, !1), document.removeEventListener("touchmove", p, !1), document.removeEventListener("mouseup", x, !1), document.removeEventListener("touchend", x, !1)) : (document.detachEvent("onmousemove", p), document.detachEvent("touchmove", p), document.detachEvent("onmouseup", x), document.detachEvent("touchend", x))
  }

  function w(e, t) {
    I(e, "dragNdrop--dropped"), _(e, "dragNdrop--dropable");
    for (var o = 0; o < t.length; o++) {
      var n = t[o];
      I(n, "dragNdrop__dropzone--dropped"), _(n, "dragNdrop__dropzone--ready")
    }
  }

  function L(e, t) {
    I(e, "dragNdrop--dropable"), I(e, "dragNdrop--dropped");
    for (var o = [], n = 0; n < t.length; n++) {
      var r = t[n];
      I(r, "dragNdrop__dropzone--ready"), I(r, "dragNdrop__dropzone--dropped"), g(e, r, !0) && (z("dropped"), _(e, "dragNdrop--dropped"), _(r, "dragNdrop__dropzone--dropped"), o.push(r))
    }
    return o.length > 0 && o
  }

  function b() {
    S(B), N(), "col-resize" !== B.style.cursor && "row-resize" !== B.style.cursor && "move" !== B.style.cursor || (B.style.cursor = "auto"), document.addEventListener ? (B.removeEventListener("mousedown", c, !1), B.removeEventListener("touchstart", c, !1)) : (B.detachEvent("onmousedown", c), B.detachEvent("touchstart", c))
  }

  function S(e) {
    I(e, "dragNdrop"), I(e, "dragNdrop--drag"), I(e, "dragNdrop--stop"), I(e, "dragNdrop--dropped"), I(e, "dragNdrop--dropable")
  }

  function z(e) {
    var t;
    "function" == typeof Event ? (t = new Event("dragNdrop:" + e), B.dispatchEvent(t)) : document.createEvent && (t = document.createEvent("CustomEvent"), t.initEvent("dragNdrop:" + e, !0, !0), B.dispatchEvent(t))
  }

  function C(e, t) {
    return e.classList ? e.classList.contains(t) : !!e.className.match(new RegExp("(\\s|^)" + t + "(\\s|$)"))
  }

  function _(e, t) {
    C(e, t) || (e.classList ? e.classList.add(t) : e.className += " " + t)
  }

  function I(e, t) {
    if (C(e, t))
      if (e.classList) e.classList.remove(t);
      else {
        var o = new RegExp("(\\s|^)" + t + "(\\s|$)");
        e.className = e.className.replace(o, " ")
      }
  }

  function q(e, t) {
    return window.getComputedStyle ? window.getComputedStyle(e, null)[t] : document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(e, null)[t] : e.currentStyle ? e.currentStyle[t] : e.style[t]
  }

  function R() {
    if (!window.getComputedStyle) return !1;
    var e, t = document.createElement("p"),
      o = {
        webkitTransform: "-webkit-transform",
        transform: "transform"
      };
    document.body.insertBefore(t, null);
    for (var n in o) void 0 !== t.style[n] && (t.style[n] = "translate3d(1px, 1px, 1px)", e = window.getComputedStyle(t).getPropertyValue(o[n]));
    return document.body.removeChild(t), void 0 !== e && e.length > 0 && "none" !== e
  }

  function T() {
    document.querySelectorAll || (document.querySelectorAll = function(e) {
      var t, o = document.createElement("style"),
        n = [];
      for (document.documentElement.firstChild.appendChild(o), document._qsa = [], o.styleSheet.cssText = e + "{x-qsa:expression(document._qsa && document._qsa.push(this))}", window.scrollBy(0, 0), o.parentNode.removeChild(o); document._qsa.length;) t = document._qsa.shift(), t.style.removeAttribute("x-qsa"), n.push(t);
      return document._qsa = null, n
    }), document.querySelector || (document.querySelector = function(e) {
      var t = document.querySelectorAll(e);
      return t.length ? t[0] : null
    })
  }
  e ? e && !e.element && console.log("ERROR: dragNdrop: please provide an element (options.element) that will be made draggable to the function. See reference at: https://github.com/ThibaultJanBeyer/dragNdrop for more info") : console.log("ERROR: dragNdrop: please provide an options object to the function. See reference at: https://github.com/ThibaultJanBeyer/dragNdrop for more info");
  var B = e.element,
    D = e.customStyles,
    A = e.constraints,
    M = t(e.dropZones),
    k = e.callback,
    V = !("useTransform" in e) || e.useTransform,
    X = {},
    Y = {
      x: 0,
      y: 0
    },
    H = A && "string" == typeof A.innerHTML;
  R() || (console.log("WARNING: dragNdrop: your browser does not support hardware accelerated css. The plugin will still work but do yourself a favor and update your browser."), V = !1), r();
  var Z = document.body.style.cursor || "inherit";
  T();
  var P = {
    setupDropZones: t,
    getDropZones: o,
    getElement: n,
    start: r,
    setupClasses: s,
    setStyles: d,
    setCustomStyles: u,
    setupEventListeners: a,
    eleMouseDown: c,
    getStartingPositions: l,
    addEventListeners: i,
    eleMouseMove: p,
    getPositions: m,
    handleMoveElement: f,
    handleConstraints: y,
    moveElement: v,
    isElementInside: g,
    putElementBack: h,
    eleMouseUp: x,
    pause: E,
    removeEventListeners: N,
    prepareDrop: w,
    handleDrop: L,
    stop: b,
    removeClasses: S
  };
  return P
};
"undefined" != typeof module && null !== module ? module.exports = dragNdrop : window.dragNdrop = dragNdrop;
