! function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(t) {
    "use strict";
    var e = "animsition",
        i = {
            init: function(n) {
                n = t.extend({
                    inClass: "fade-in",
                    outClass: "fade-out",
                    inDuration: 1500,
                    outDuration: 800,
                    linkElement: ".animsition-link",
                    loading: !0,
                    loadingParentElement: "body",
                    loadingClass: "animsition-loading",
                    loadingInner: "",
                    timeout: !1,
                    timeoutCountdown: 5e3,
                    onLoadEvent: !0,
                    browser: ["animation-duration", "-webkit-animation-duration"],
                    overlay: !1,
                    overlayClass: "animsition-overlay-slide",
                    overlayParentElement: "body",
                    transition: function(t) {
                        window.location.href = t
                    }
                }, n), i.settings = {
                    timer: !1,
                    data: {
                        inClass: "animsition-in-class",
                        inDuration: "animsition-in-duration",
                        outClass: "animsition-out-class",
                        outDuration: "animsition-out-duration",
                        overlay: "animsition-overlay"
                    },
                    events: {
                        inStart: "animsition.inStart",
                        inEnd: "animsition.inEnd",
                        outStart: "animsition.outStart",
                        outEnd: "animsition.outEnd"
                    }
                };
                var o = i.supportCheck.call(this, n);
                if (!o && n.browser.length > 0 && (!o || !this.length)) return "console" in window || (window.console = {}, window.console.log = function(t) {
                    return t
                }), this.length || console.log("Animsition: Element does not exist on page."), o || console.log("Animsition: Does not support this browser."), i.destroy.call(this);
                var s = i.optionCheck.call(this, n);
                return s && i.addOverlay.call(this, n), n.loading && i.addLoading.call(this, n), this.each(function() {
                    var o = this,
                        s = t(this),
                        r = t(window),
                        a = t(document),
                        l = s.data(e);
                    l || (n = t.extend({}, n), s.data(e, {
                        options: n
                    }), n.timeout && i.addTimer.call(o), n.onLoadEvent && r.on("load." + e, function() {
                        i.settings.timer && clearTimeout(i.settings.timer), i["in"].call(o)
                    }), r.on("pageshow." + e, function(t) {
                        t.originalEvent.persisted && i["in"].call(o)
                    }), r.on("unload." + e, function() {}), a.on("click." + e, n.linkElement, function(e) {
                        e.preventDefault();
                        var n = t(this),
                            s = n.attr("href");
                        2 === e.which || e.metaKey || e.shiftKey || -1 !== navigator.platform.toUpperCase().indexOf("WIN") && e.ctrlKey ? window.open(s, "_blank") : i.out.call(o, n, s)
                    }))
                })
            },
            addOverlay: function(e) {
                t(e.overlayParentElement).prepend('<div class="' + e.overlayClass + '"></div>')
            },
            addLoading: function(e) {
                t(e.loadingParentElement).append('<div class="' + e.loadingClass + '">' + e.loadingInner + "</div>")
            },
            removeLoading: function() {
                var i = t(this),
                    n = i.data(e).options,
                    o = t(n.loadingParentElement).children("." + n.loadingClass);
                o.fadeOut().remove()
            },
            addTimer: function() {
                var n = this,
                    o = t(this),
                    s = o.data(e).options;
                i.settings.timer = setTimeout(function() {
                    i["in"].call(n), t(window).off("load." + e)
                }, s.timeoutCountdown)
            },
            supportCheck: function(e) {
                var i = t(this),
                    n = e.browser,
                    o = n.length,
                    s = !1;
                0 === o && (s = !0);
                for (var r = 0; o > r; r++)
                    if ("string" == typeof i.css(n[r])) {
                        s = !0;
                        break
                    }
                return s
            },
            optionCheck: function(e) {
                var n, o = t(this);
                return n = !(!e.overlay && !o.data(i.settings.data.overlay))
            },
            animationCheck: function(i, n, o) {
                var s = t(this),
                    r = s.data(e).options,
                    a = typeof i,
                    l = !n && "number" === a,
                    c = n && "string" === a && i.length > 0;
                return l || c ? i = i : n && o ? i = r.inClass : !n && o ? i = r.inDuration : n && !o ? i = r.outClass : n || o || (i = r.outDuration), i
            },
            "in": function() {
                var n = this,
                    o = t(this),
                    s = o.data(e).options,
                    r = o.data(i.settings.data.inDuration),
                    a = o.data(i.settings.data.inClass),
                    l = i.animationCheck.call(n, r, !1, !0),
                    c = i.animationCheck.call(n, a, !0, !0),
                    u = i.optionCheck.call(n, s),
                    h = o.data(e).outClass;
                s.loading && i.removeLoading.call(n), h && o.removeClass(h), u ? i.inOverlay.call(n, c, l) : i.inDefault.call(n, c, l)
            },
            inDefault: function(e, n) {
                var o = t(this);
                o.css({
                    "animation-duration": n + "ms"
                }).addClass(e).trigger(i.settings.events.inStart).animateCallback(function() {
                    o.removeClass(e).css({
                        opacity: 1
                    }).trigger(i.settings.events.inEnd)
                })
            },
            inOverlay: function(n, o) {
                var s = t(this),
                    r = s.data(e).options;
                s.css({
                    opacity: 1
                }).trigger(i.settings.events.inStart), t(r.overlayParentElement).children("." + r.overlayClass).css({
                    "animation-duration": o + "ms"
                }).addClass(n).animateCallback(function() {
                    s.trigger(i.settings.events.inEnd)
                })
            },
            out: function(n, o) {
                var s = this,
                    r = t(this),
                    a = r.data(e).options,
                    l = n.data(i.settings.data.outClass),
                    c = r.data(i.settings.data.outClass),
                    u = n.data(i.settings.data.outDuration),
                    h = r.data(i.settings.data.outDuration),
                    p = l ? l : c,
                    d = u ? u : h,
                    f = i.animationCheck.call(s, p, !0, !1),
                    m = i.animationCheck.call(s, d, !1, !1),
                    g = i.optionCheck.call(s, a);
                r.data(e).outClass = f, g ? i.outOverlay.call(s, f, m, o) : i.outDefault.call(s, f, m, o)
            },
            outDefault: function(n, o, s) {
                var r = t(this),
                    a = r.data(e).options;
                r.css({
                    "animation-duration": o + 1 + "ms"
                }).addClass(n).trigger(i.settings.events.outStart).animateCallback(function() {
                    r.trigger(i.settings.events.outEnd), a.transition(s)
                })
            },
            outOverlay: function(n, o, s) {
                var r = this,
                    a = t(this),
                    l = a.data(e).options,
                    c = a.data(i.settings.data.inClass),
                    u = i.animationCheck.call(r, c, !0, !0);
                t(l.overlayParentElement).children("." + l.overlayClass).css({
                    "animation-duration": o + 1 + "ms"
                }).removeClass(u).addClass(n).trigger(i.settings.events.outStart).animateCallback(function() {
                    a.trigger(i.settings.events.outEnd), l.transition(s)
                })
            },
            destroy: function() {
                return this.each(function() {
                    var i = t(this);
                    t(window).off("." + e), i.css({
                        opacity: 1
                    }).removeData(e)
                })
            }
        };
    t.fn.animateCallback = function(e) {
        var i = "animationend webkitAnimationEnd";
        return this.each(function() {
            var n = t(this);
            n.on(i, function() {
                return n.off(i), e.call(this)
            })
        })
    }, t.fn.animsition = function(n) {
        return i[n] ? i[n].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof n && n ? void t.error("Method " + n + " does not exist on jQuery." + e) : i.init.apply(this, arguments)
    }
}), ! function(t) {
    t.fn.appear = function(e, i) {
        var n = t.extend({
            data: void 0,
            one: !0,
            accX: 0,
            accY: 0
        }, i);
        return this.each(function() {
            var i = t(this);
            if (i.appeared = !1, !e) return void i.trigger("appear", n.data);
            var o = t(window),
                s = function() {
                    if (!i.is(":visible")) return void(i.appeared = !1);
                    var t = o.scrollLeft(),
                        e = o.scrollTop(),
                        s = i.offset(),
                        r = s.left,
                        a = s.top,
                        l = n.accX,
                        c = n.accY,
                        u = i.height(),
                        h = o.height(),
                        p = i.width(),
                        d = o.width();
                    a + u + c >= e && e + h + c >= a && r + p + l >= t && t + d + l >= r ? i.appeared || i.trigger("appear", n.data) : i.appeared = !1
                },
                r = function() {
                    if (i.appeared = !0, n.one) {
                        o.unbind("scroll", s);
                        var r = t.inArray(s, t.fn.appear.checks);
                        r >= 0 && t.fn.appear.checks.splice(r, 1)
                    }
                    e.apply(this, arguments)
                };
            n.one ? i.one("appear", n.data, r) : i.bind("appear", n.data, r), o.scroll(s), t.fn.appear.checks.push(s), s()
        })
    }, t.extend(t.fn.appear, {
        checks: [],
        timeout: null,
        checkAll: function() {
            var e = t.fn.appear.checks.length;
            if (e > 0)
                for (; e--;) t.fn.appear.checks[e]()
        },
        run: function() {
            t.fn.appear.timeout && clearTimeout(t.fn.appear.timeout), t.fn.appear.timeout = setTimeout(t.fn.appear.checkAll, 20)
        }
    }), t.each(["append", "prepend", "after", "before", "attr", "removeAttr", "addClass", "removeClass", "toggleClass", "remove", "css", "show", "hide"], function(e, i) {
        var n = t.fn[i];
        n && (t.fn[i] = function() {
            var e = n.apply(this, arguments);
            return t.fn.appear.run(), e
        })
    })
}(jQuery), ! function(t) {
    t.fn.countTo = function(e) {
        e = t.extend({}, t.fn.countTo.defaults, e || {});
        var i = Math.ceil(e.speed / e.refreshInterval),
            n = (e.to - e.from) / i;
        return t(this).each(function() {
            function o() {
                a += n, r++, t(s).html(a.toFixed(e.decimals)), "function" == typeof e.onUpdate && e.onUpdate.call(s, a), r >= i && (clearInterval(l), a = e.to, "function" == typeof e.onComplete && e.onComplete.call(s, a))
            }
            var s = this,
                r = 0,
                a = e.from,
                l = setInterval(o, e.refreshInterval)
        })
    }, t.fn.countTo.defaults = {
        from: 0,
        to: 100,
        speed: 1e3,
        refreshInterval: 100,
        decimals: 0,
        onUpdate: null,
        onComplete: null
    }
}(jQuery), ! function(t) {
    "use strict";

    function e() {
        o = t.innerWidth || document.documentElement.clientWidth, s = t.innerHeight || document.documentElement.clientHeight
    }

    function i(t, e, i) {
        t.addEventListener ? t.addEventListener(e, i) : t.attachEvent("on" + e, function() {
            i.call(t)
        })
    }

    function n(i) {
        t.requestAnimationFrame(function() {
            "scroll" !== i.type && e();
            for (var t = 0, n = f.length; n > t; t++) "scroll" !== i.type && (f[t].coverImage(), f[t].clipContainer()), f[t].onScroll()
        })
    }
    Date.now || (Date.now = function() {
        return (new Date).getTime()
    }), t.requestAnimationFrame || ! function() {
        for (var e = ["webkit", "moz"], i = 0; i < e.length && !t.requestAnimationFrame; ++i) {
            var n = e[i];
            t.requestAnimationFrame = t[n + "RequestAnimationFrame"], t.cancelAnimationFrame = t[n + "CancelAnimationFrame"] || t[n + "CancelRequestAnimationFrame"]
        }
        if (/iP(ad|hone|od).*OS 6/.test(t.navigator.userAgent) || !t.requestAnimationFrame || !t.cancelAnimationFrame) {
            var o = 0;
            t.requestAnimationFrame = function(t) {
                var e = Date.now(),
                    i = Math.max(o + 16, e);
                return setTimeout(function() {
                    t(o = i)
                }, i - e)
            }, t.cancelAnimationFrame = clearTimeout
        }
    }();
    var o, s, r = function() {
            if (!t.getComputedStyle) return !1;
            var e, i = document.createElement("p"),
                n = {
                    webkitTransform: "-webkit-transform",
                    OTransform: "-o-transform",
                    msTransform: "-ms-transform",
                    MozTransform: "-moz-transform",
                    transform: "transform"
                };
            (document.body || document.documentElement).insertBefore(i, null);
            for (var o in n) "undefined" != typeof i.style[o] && (i.style[o] = "translate3d(1px,1px,1px)", e = t.getComputedStyle(i).getPropertyValue(n[o]));
            return (document.body || document.documentElement).removeChild(i), "undefined" != typeof e && e.length > 0 && "none" !== e
        }(),
        a = navigator.userAgent.toLowerCase().indexOf("android") > -1,
        l = /iPad|iPhone|iPod/.test(navigator.userAgent) && !t.MSStream,
        c = !!t.opera,
        u = /Edge\/\d+/.test(navigator.userAgent),
        h = /Trident.*rv[ :]*11\./.test(navigator.userAgent),
        p = !!Function("/*@cc_on return document.documentMode===10@*/")(),
        d = document.all && !t.atob;
    e();
    var f = [],
        m = function() {
            function t(t, i) {
                var n, o = this;
                o.$item = t, o.defaults = {
                    type: "scroll",
                    speed: .5,
                    imgSrc: null,
                    imgWidth: null,
                    imgHeight: null,
                    enableTransform: !0,
                    zIndex: -100,
                    noAdnroid: !1,
                    noIos: !0,
                    onScroll: null,
                    onInit: null,
                    onDestroy: null,
                    onCoverImage: null
                }, n = JSON.parse(o.$item.getAttribute("data-jarallax") || "{}"), o.options = o.extend({}, o.defaults, n, i), a && o.options.noAdnroid || l && o.options.noIos || (o.options.speed = Math.min(2, Math.max(-1, parseFloat(o.options.speed))), o.instanceID = e++, o.image = {
                    src: o.options.imgSrc || null,
                    $container: null,
                    $item: null,
                    width: o.options.imgWidth || null,
                    height: o.options.imgHeight || null,
                    useImgTag: l || a || c || h || p || u
                }, o.initImg() && o.init())
            }
            var e = 0;
            return t
        }();
    m.prototype.css = function(t, e) {
        if ("string" == typeof e) return t.style[e];
        e.transform && (e.WebkitTransform = e.MozTransform = e.transform);
        for (var i in e) t.style[i] = e[i];
        return t
    }, m.prototype.extend = function(t) {
        t = t || {};
        for (var e = 1; e < arguments.length; e++)
            if (arguments[e])
                for (var i in arguments[e]) arguments[e].hasOwnProperty(i) && (t[i] = arguments[e][i]);
        return t
    }, m.prototype.initImg = function() {
        var t = this;
        return null === t.image.src && (t.image.src = t.css(t.$item, "background-image").replace(/^url\(['"]?/g, "").replace(/['"]?\)$/g, "")), !(!t.image.src || "none" === t.image.src)
    }, m.prototype.init = function() {
        function t() {
            e.coverImage(), e.clipContainer(), e.onScroll(!0), e.$item.setAttribute("data-jarallax-original-styles", e.$item.getAttribute("style")), e.options.onInit && e.options.onInit.call(e), setTimeout(function() {
                e.$item && e.css(e.$item, {
                    "background-image": "none",
                    "background-attachment": "scroll",
                    "background-size": "auto",
                    "z-index": "0"
                })
            }, 0)
        }
        var e = this,
            i = {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                overflow: "hidden",
                pointerEvents: "none"
            },
            n = {
                position: "fixed"
            };
        e.image.$container = document.createElement("div"), e.css(e.image.$container, i), e.css(e.image.$container, {
            visibility: "hidden",
            "z-index": e.options.zIndex
        }), e.image.$container.setAttribute("id", "jarallax-container-" + e.instanceID), e.$item.appendChild(e.image.$container), e.image.useImgTag && r && e.options.enableTransform ? (e.image.$item = document.createElement("img"), e.image.$item.setAttribute("src", e.image.src), n = e.extend({
            "max-width": "none"
        }, i, n)) : (e.image.$item = document.createElement("div"), n = e.extend({
            "background-position": "50% 50%",
            "background-size": "100% auto",
            "background-repeat": "no-repeat no-repeat",
            "background-image": 'url("' + e.image.src + '")'
        }, i, n)), d && (n.backgroundAttachment = "fixed"), e.parentWithTransform = 0;
        for (var o = e.$item; null !== o && o !== document && 0 === e.parentWithTransform;)(e.css(o, "-webkit-transform") || e.css(o, "-moz-transform") || e.css(o, "transform")) && (e.parentWithTransform = 1, e.css(e.image.$container, {
            transform: "translateX(0) translateY(0)"
        })), o = o.parentNode;
        e.css(e.image.$item, n), e.image.$container.appendChild(e.image.$item), e.image.width && e.image.height ? t() : e.getImageSize(e.image.src, function(i, n) {
            e.image.width = i, e.image.height = n, t()
        }), f.push(e)
    }, m.prototype.destroy = function() {
        for (var t = this, e = 0, i = f.length; i > e; e++)
            if (f[e].instanceID === t.instanceID) {
                f.splice(e, 1);
                break
            }
        t.$item.setAttribute("style", t.$item.getAttribute("data-jarallax-original-styles")), t.$item.removeAttribute("data-jarallax-original-styles"), t.$clipStyles && t.$clipStyles.parentNode.removeChild(t.$clipStyles), t.image.$container.parentNode.removeChild(t.image.$container), t.options.onDestroy && t.options.onDestroy.call(t), delete t.$item.jarallax;
        for (var n in t) delete t[n]
    }, m.prototype.getImageSize = function(t, e) {
        if (t && e) {
            var i = new Image;
            i.onload = function() {
                e(i.width, i.height)
            }, i.src = t
        }
    }, m.prototype.clipContainer = function() {
        if (!d) {
            var t = this,
                e = t.image.$container.getBoundingClientRect(),
                i = e.width,
                n = e.height;
            if (!t.$clipStyles) {
                t.$clipStyles = document.createElement("style"), t.$clipStyles.setAttribute("type", "text/css"), t.$clipStyles.setAttribute("id", "#jarallax-clip-" + t.instanceID);
                var o = document.head || document.getElementsByTagName("head")[0];
                o.appendChild(t.$clipStyles)
            }
            var s = ["#jarallax-container-" + t.instanceID + " {", "   clip: rect(0 " + i + "px " + n + "px 0);", "   clip: rect(0, " + i + "px, " + n + "px, 0);", "}"].join("\n");
            t.$clipStyles.styleSheet ? t.$clipStyles.styleSheet.cssText = s : t.$clipStyles.innerHTML = s
        }
    }, m.prototype.coverImage = function() {
        var t = this;
        if (t.image.width && t.image.height) {
            var e = t.image.$container.getBoundingClientRect(),
                i = e.width,
                n = e.height,
                o = e.left,
                a = t.image.width,
                l = t.image.height,
                c = t.options.speed,
                u = "scroll" === t.options.type || "scroll-opacity" === t.options.type,
                h = 0,
                p = 0,
                d = n,
                f = 0,
                m = 0;
            u && (h = c * (n + s) / 2, (0 > c || c > 1) && (h = c * Math.max(n, s) / 2), 0 > c || c > 1 ? d = Math.max(n, s) + 2 * Math.abs(h) : d += Math.abs(s - n) * (1 - c)), p = d * a / l, i > p && (p = i, d = p * l / a), t.bgPosVerticalCenter = 0, !(u && s > d) || r && t.options.enableTransform || (t.bgPosVerticalCenter = (s - d) / 2, d = s), u ? (f = o + (i - p) / 2, m = (s - d) / 2) : (f = (i - p) / 2, m = (n - d) / 2), t.parentWithTransform && (f -= o), t.parallaxScrollDistance = h, t.css(t.image.$item, {
                width: p + "px",
                height: d + "px",
                marginLeft: f + "px",
                marginTop: m + "px"
            }), t.options.onCoverImage && t.options.onCoverImage.call(t)
        }
    }, m.prototype.isVisible = function() {
        return this.isElementInViewport || !1
    }, m.prototype.onScroll = function(t) {
        var e = this;
        if (e.image.width && e.image.height) {
            var i = e.$item.getBoundingClientRect(),
                n = i.top,
                a = i.height,
                l = {
                    position: "absolute",
                    visibility: "visible",
                    backgroundPosition: "50% 50%"
                };
            e.isElementInViewport = i.bottom >= 0 && i.right >= 0 && s >= n && i.left <= o;
            var c = t ? !1 : !e.isElementInViewport;
            if (!c) {
                var u = Math.max(0, n),
                    h = Math.max(0, a + n),
                    p = Math.max(0, -n),
                    f = Math.max(0, n + a - s),
                    m = Math.max(0, a - (n + a - s)),
                    g = Math.max(0, -n + s - a),
                    y = 1 - 2 * (s - n) / (s + a),
                    v = 1;
                if (s > a ? v = 1 - (p || f) / a : s >= h ? v = h / s : s >= m && (v = m / s), ("opacity" === e.options.type || "scale-opacity" === e.options.type || "scroll-opacity" === e.options.type) && (l.transform = "translate3d(0, 0, 0)", l.opacity = v), "scale" === e.options.type || "scale-opacity" === e.options.type) {
                    var w = 1;
                    e.options.speed < 0 ? w -= e.options.speed * v : w += e.options.speed * (1 - v), l.transform = "scale(" + w + ") translate3d(0, 0, 0)"
                }
                if ("scroll" === e.options.type || "scroll-opacity" === e.options.type) {
                    var b = e.parallaxScrollDistance * y;
                    r && e.options.enableTransform ? (e.parentWithTransform && (b -= n), l.transform = "translate3d(0, " + b + "px, 0)") : (e.bgPosVerticalCenter && (b += e.bgPosVerticalCenter), l.backgroundPosition = "50% " + b + "px"), l.position = d ? "absolute" : "fixed"
                }
                e.css(e.image.$item, l), e.options.onScroll && e.options.onScroll.call(e, {
                    section: i,
                    beforeTop: u,
                    beforeTopEnd: h,
                    afterTop: p,
                    beforeBottom: f,
                    beforeBottomEnd: m,
                    afterBottom: g,
                    visiblePercent: v,
                    fromViewportCenter: y
                })
            }
        }
    }, i(t, "scroll", n), i(t, "resize", n), i(t, "orientationchange", n), i(t, "load", n);
    var g = function(t) {
        ("object" == typeof HTMLElement ? t instanceof HTMLElement : t && "object" == typeof t && null !== t && 1 === t.nodeType && "string" == typeof t.nodeName) && (t = [t]);
        var e, i = arguments[1],
            n = Array.prototype.slice.call(arguments, 2),
            o = t.length,
            s = 0;
        for (s; o > s; s++)
            if ("object" == typeof i || "undefined" == typeof i ? t[s].jarallax || (t[s].jarallax = new m(t[s], i)) : t[s].jarallax && (e = t[s].jarallax[i].apply(t[s].jarallax, n)), "undefined" != typeof e) return e;
        return t
    };
    g.constructor = m;
    var y = t.jarallax;
    if (t.jarallax = g, t.jarallax.noConflict = function() {
            return t.jarallax = y, this
        }, "undefined" != typeof jQuery) {
        var v = function() {
            var e = arguments || [];
            Array.prototype.unshift.call(e, this);
            var i = g.apply(t, e);
            return "object" != typeof i ? i : this
        };
        v.constructor = m;
        var w = jQuery.fn.jarallax;
        jQuery.fn.jarallax = v, jQuery.fn.jarallax.noConflict = function() {
            return jQuery.fn.jarallax = w, this
        }
    }
    i(t, "DOMContentLoaded", function() {
        g(document.querySelectorAll("[data-jarallax]"))
    })
}(window), ! function(t) {
    "use strict";

    function e(t) {
        t = t || {};
        for (var e = 1; e < arguments.length; e++)
            if (arguments[e])
                for (var i in arguments[e]) arguments[e].hasOwnProperty(i) && (t[i] = arguments[e][i]);
        return t
    }

    function i() {
        this._done = [], this._fail = []
    }
    i.prototype = {
        execute: function(t, e) {
            var i = t.length;
            for (e = Array.prototype.slice.call(e); i--;) t[i].apply(null, e)
        },
        resolve: function() {
            this.execute(this._done, arguments)
        },
        reject: function() {
            this.execute(this._fail, arguments)
        },
        done: function(t) {
            this._done.push(t)
        },
        fail: function(t) {
            this._fail.push(t)
        }
    };
    var n = function() {
        function t(t, n) {
            var o = this;
            o.url = t, o.options_default = {
                autoplay: 1,
                loop: 1,
                mute: 1,
                controls: 0
            }, o.options = e({}, o.options_default, n), o.videoID = o.parseURL(t), o.videoID && (o.ID = i++, o.loadAPI(), o.init())
        }
        var i = 0;
        return t
    }();
    n.prototype.parseURL = function(t) {
        function e(t) {
            var e = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/,
                i = t.match(e);
            return i && 11 === i[1].length ? i[1] : !1
        }

        function i(t) {
            var e = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/,
                i = t.match(e);
            return i && i[3] ? i[3] : !1
        }
        var n = e(t),
            o = i(t);
        return n ? (this.type = "youtube", n) : o ? (this.type = "vimeo", o) : !1
    }, n.prototype.isValid = function() {
        return !!this.videoID
    }, n.prototype.on = function(t, e) {
        this.userEventsList = this.userEventsList || [], (this.userEventsList[t] || (this.userEventsList[t] = [])).push(e)
    }, n.prototype.off = function(t, e) {
        if (this.userEventsList && this.userEventsList[t])
            if (e)
                for (var i = 0; i < this.userEventsList[t].length; i++) this.userEventsList[t][i] === e && (this.userEventsList[t][i] = !1);
            else delete this.userEventsList[t]
    }, n.prototype.fire = function(t) {
        var e = [].slice.call(arguments, 1);
        if (this.userEventsList && "undefined" != typeof this.userEventsList[t])
            for (var i in this.userEventsList[t]) this.userEventsList[t][i] && this.userEventsList[t][i].apply(this, e)
    }, n.prototype.play = function() {
        this.player && ("youtube" === this.type && this.player.playVideo && this.player.playVideo(), "vimeo" === this.type && this.player.api("play"))
    }, n.prototype.pause = function() {
        this.player && ("youtube" === this.type && this.player.pauseVideo && this.player.pauseVideo(), "vimeo" === this.type && this.player.api("pause"))
    }, n.prototype.getImageURL = function(t) {
        var e = this;
        if (e.videoImage) return void t(e.videoImage);
        if ("youtube" === e.type && (e.videoImage = "https://img.youtube.com/vi/" + e.videoID + "/maxresdefault.jpg", t(e.videoImage)), "vimeo" === e.type) {
            var i = new XMLHttpRequest;
            i.open("GET", "https://vimeo.com/api/v2/video/" + e.videoID + ".json", !0), i.onreadystatechange = function() {
                if (4 === this.readyState && this.status >= 200 && this.status < 400) {
                    var i = JSON.parse(this.responseText);
                    e.videoImage = i[0].thumbnail_large, t(e.videoImage)
                }
            }, i.send(), i = null
        }
    }, n.prototype.getIframe = function(e) {
        var i = this;
        return i.$iframe ? void e(i.$iframe) : void i.onAPIready(function() {
            var n;
            if (i.$iframe || (n = document.createElement("div"), n.style.display = "none"), "youtube" === i.type) {
                i.playerOptions = {}, i.playerOptions.videoId = i.videoID, i.playerOptions.width = t.innerWidth || document.documentElement.clientWidth, i.playerOptions.playerVars = {
                    autohide: 1,
                    rel: 0,
                    autoplay: 0
                }, i.options.controls || (i.playerOptions.playerVars.iv_load_policy = 3, i.playerOptions.playerVars.modestbranding = 1, i.playerOptions.playerVars.controls = 0, i.playerOptions.playerVars.showinfo = 0, i.playerOptions.playerVars.disablekb = 1);
                var o;
                i.playerOptions.events = {
                    onReady: function(t) {
                        i.options.mute && t.target.mute(), i.options.autoplay && i.play(), i.fire("ready", t)
                    },
                    onStateChange: function(t) {
                        i.options.loop && t.data === YT.PlayerState.ENDED && t.target.playVideo(), o || t.data !== YT.PlayerState.PLAYING || (o = 1, i.fire("started", t)), t.data === YT.PlayerState.PLAYING && i.fire("play", t), t.data === YT.PlayerState.PAUSED && i.fire("pause", t), t.data === YT.PlayerState.ENDED && i.fire("end", t)
                    }
                };
                var s = !i.$iframe;
                if (s) {
                    var r = document.createElement("div");
                    r.setAttribute("id", i.playerID), n.appendChild(r), document.body.appendChild(n)
                }
                i.player = i.player || new t.YT.Player(i.playerID, i.playerOptions), s && (i.$iframe = document.getElementById(i.playerID))
            }
            "vimeo" === i.type && (i.playerOptions = "", i.playerOptions += "player_id=" + i.playerID, i.playerOptions += "&autopause=0", i.options.controls || (i.playerOptions += "&badge=0&byline=0&portrait=0&title=0"), i.playerOptions += "&autoplay=0", i.playerOptions += "&loop=" + (i.options.loop ? 1 : 0), i.$iframe || (i.$iframe = document.createElement("iframe"), i.$iframe.setAttribute("id", i.playerID), i.$iframe.setAttribute("src", "https://player.vimeo.com/video/" + i.videoID + "?" + i.playerOptions), i.$iframe.setAttribute("frameborder", "0"), n.appendChild(i.$iframe), document.body.appendChild(n)), i.player = i.player || $f(i.$iframe), i.player.addEvent("ready", function(t) {
                i.player.api("setVolume", i.options.mute ? 0 : 100), i.options.autoplay && i.play();
                var e;
                i.player.addEvent("playProgress", function(t) {
                    e || i.fire("started", t), e = 1
                }), i.player.addEvent("play", function(t) {
                    i.fire("play", t)
                }), i.player.addEvent("pause", function(t) {
                    i.fire("pause", t)
                }), i.player.addEvent("finish", function(t) {
                    i.fire("end", t)
                }), i.fire("ready", t)
            })), e(i.$iframe)
        })
    }, n.prototype.init = function() {
        var t = this;
        t.playerID = "VideoWorker-" + t.ID
    };
    var o = 0,
        s = 0;
    n.prototype.loadAPI = function() {
        var e = this;
        if (!o || !s) {
            var i = "";
            "youtube" !== e.type || o || (o = 1, i = "//www.youtube.com/iframe_api"), "vimeo" !== e.type || s || (s = 1, i = "//f.vimeocdn.com/js/froogaloop2.min.js"), "file://" === t.location.origin && (i = "http:" + i);
            var n = document.createElement("script"),
                r = document.getElementsByTagName("head")[0];
            n.src = i, r.appendChild(n), r = null, n = null
        }
    };
    var r = 0,
        a = 0,
        l = new i,
        c = new i;
    n.prototype.onAPIready = function(e) {
        var i = this;
        if ("youtube" === i.type && ("undefined" != typeof YT && 0 !== YT.loaded || r ? "object" == typeof YT && 1 === YT.loaded ? e() : l.done(function() {
                e()
            }) : (r = 1, t.onYouTubeIframeAPIReady = function() {
                t.onYouTubeIframeAPIReady = null, l.resolve("done"), e()
            })), "vimeo" === i.type)
            if ("undefined" != typeof $f || a) "undefined" != typeof $f ? e() : c.done(function() {
                e()
            });
            else {
                a = 1;
                var n = setInterval(function() {
                    "undefined" != typeof $f && (clearInterval(n), c.resolve("done"), e())
                }, 20)
            }
    }, t.VideoWorker = n
}(window),
function() {
    "use strict";
    if ("undefined" != typeof jarallax) {
        var t = jarallax.constructor,
            e = t.prototype.init;
        t.prototype.init = function() {
            var t = this;
            e.apply(t), t.video && t.video.getIframe(function(e) {
                t.css(e, {
                    position: "fixed",
                    top: "0px",
                    left: "0px",
                    right: "0px",
                    bottom: "0px",
                    width: "100%",
                    height: "100%",
                    visibility: "visible",
                    zIndex: -1
                }), t.$video = e, t.image.$container.appendChild(e)
            })
        };
        var i = t.prototype.coverImage;
        t.prototype.coverImage = function() {
            var t = this;
            i.apply(t), t.video && "IFRAME" === t.image.$item.nodeName && t.css(t.image.$item, {
                height: t.image.$item.getBoundingClientRect().height + 400 + "px",
                top: "-200px"
            })
        };
        var n = t.prototype.initImg;
        t.prototype.initImg = function() {
            var t = this;
            if (t.options.videoSrc || (t.options.videoSrc = t.$item.getAttribute("data-jarallax-video") || !1), t.options.videoSrc) {
                var e = new VideoWorker(t.options.videoSrc);
                return e.isValid() && (t.image.useImgTag = !0, e.on("ready", function() {
                    var i = t.onScroll;
                    t.onScroll = function() {
                        i.apply(t), t.isVisible() ? e.play() : e.pause()
                    }
                }), e.on("started", function() {
                    t.image.$default_item = t.image.$item, t.image.$item = t.$video, t.image.width = t.imgWidth = 1280, t.image.height = t.imgHeight = 720, t.coverImage(), t.clipContainer(), t.onScroll(), t.image.$default_item && (t.image.$default_item.style.display = "none")
                }), t.video = e, e.getImageURL(function(e) {
                    t.image.src = e, t.init()
                })), !1
            }
            return n.apply(t)
        };
        var o = t.prototype.destroy;
        t.prototype.destroy = function() {
            var t = this;
            o.apply(t)
        }
    }
}(), ! function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}(this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {},
                n = i[t] = i[t] || [];
            return -1 == n.indexOf(e) && n.push(e), this
        }
    }, e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {},
                n = i[t] = i[t] || [];
            return n[e] = !0, this
        }
    }, e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return -1 != n && i.splice(n, 1), this
        }
    }, e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = 0,
                o = i[n];
            e = e || [];
            for (var s = this._onceEvents && this._onceEvents[t]; o;) {
                var r = s && s[o];
                r && (this.off(t, o), delete s[o]), o.apply(this, e), n += r ? 0 : 1, o = i[n]
            }
            return this
        }
    }, t
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
}(window, function(t, e) {
    function i(t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }

    function n(t) {
        var e = [];
        if (Array.isArray(t)) e = t;
        else if ("number" == typeof t.length)
            for (var i = 0; i < t.length; i++) e.push(t[i]);
        else e.push(t);
        return e
    }

    function o(t, e, s) {
        return this instanceof o ? ("string" == typeof t && (t = document.querySelectorAll(t)), this.elements = n(t), this.options = i({}, this.options), "function" == typeof e ? s = e : i(this.options, e), s && this.on("always", s), this.getImages(), a && (this.jqDeferred = new a.Deferred), void setTimeout(function() {
            this.check()
        }.bind(this))) : new o(t, e, s)
    }

    function s(t) {
        this.img = t
    }

    function r(t, e) {
        this.url = t, this.element = e, this.img = new Image
    }
    var a = t.jQuery,
        l = t.console;
    o.prototype = Object.create(e.prototype), o.prototype.options = {}, o.prototype.getImages = function() {
        this.images = [], this.elements.forEach(this.addElementImages, this)
    }, o.prototype.addElementImages = function(t) {
        "IMG" == t.nodeName && this.addImage(t), this.options.background === !0 && this.addElementBackgroundImages(t);
        var e = t.nodeType;
        if (e && c[e]) {
            for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
                var o = i[n];
                this.addImage(o)
            }
            if ("string" == typeof this.options.background) {
                var s = t.querySelectorAll(this.options.background);
                for (n = 0; n < s.length; n++) {
                    var r = s[n];
                    this.addElementBackgroundImages(r)
                }
            }
        }
    };
    var c = {
        1: !0,
        9: !0,
        11: !0
    };
    return o.prototype.addElementBackgroundImages = function(t) {
        var e = getComputedStyle(t);
        if (e)
            for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
                var o = n && n[2];
                o && this.addBackground(o, t), n = i.exec(e.backgroundImage)
            }
    }, o.prototype.addImage = function(t) {
        var e = new s(t);
        this.images.push(e)
    }, o.prototype.addBackground = function(t, e) {
        var i = new r(t, e);
        this.images.push(i)
    }, o.prototype.check = function() {
        function t(t, i, n) {
            setTimeout(function() {
                e.progress(t, i, n)
            })
        }
        var e = this;
        return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function(e) {
            e.once("progress", t), e.check()
        }) : void this.complete()
    }, o.prototype.progress = function(t, e, i) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && l && l.log("progress: " + i, t, e)
    }, o.prototype.complete = function() {
        var t = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
            var e = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[e](this)
        }
    }, s.prototype = Object.create(e.prototype), s.prototype.check = function() {
        var t = this.getIsImageComplete();
        return t ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
    }, s.prototype.getIsImageComplete = function() {
        return this.img.complete && void 0 !== this.img.naturalWidth
    }, s.prototype.confirm = function(t, e) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.img, e])
    }, s.prototype.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, s.prototype.onload = function() {
        this.confirm(!0, "onload"), this.unbindEvents()
    }, s.prototype.onerror = function() {
        this.confirm(!1, "onerror"), this.unbindEvents()
    }, s.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, r.prototype = Object.create(s.prototype), r.prototype.check = function() {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
        var t = this.getIsImageComplete();
        t && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
    }, r.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, r.prototype.confirm = function(t, e) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.element, e])
    }, o.makeJQueryPlugin = function(e) {
        e = e || t.jQuery, e && (a = e, a.fn.imagesLoaded = function(t, e) {
            var i = new o(this, t, e);
            return i.jqDeferred.promise(a(this))
        })
    }, o.makeJQueryPlugin(), o
}), ! function(t) {
    function e() {}

    function i(t) {
        function i(e) {
            e.prototype.option || (e.prototype.option = function(e) {
                t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e))
            })
        }

        function o(e, i) {
            t.fn[e] = function(o) {
                if ("string" == typeof o) {
                    for (var r = n.call(arguments, 1), a = 0, l = this.length; l > a; a++) {
                        var c = this[a],
                            u = t.data(c, e);
                        if (u)
                            if (t.isFunction(u[o]) && "_" !== o.charAt(0)) {
                                var h = u[o].apply(u, r);
                                if (void 0 !== h) return h
                            } else s("no such method '" + o + "' for " + e + " instance");
                        else s("cannot call methods on " + e + " prior to initialization; attempted to call '" + o + "'")
                    }
                    return this
                }
                return this.each(function() {
                    var n = t.data(this, e);
                    n ? (n.option(o), n._init()) : (n = new i(this, o), t.data(this, e, n))
                })
            }
        }
        if (t) {
            var s = "undefined" == typeof console ? e : function(t) {
                console.error(t)
            };
            return t.bridget = function(t, e) {
                i(e), o(t, e)
            }, t.bridget
        }
    }
    var n = Array.prototype.slice;
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], i) : i("object" == typeof exports ? require("jquery") : t.jQuery)
}(window),
function(t) {
    function e(e) {
        var i = t.event;
        return i.target = i.target || i.srcElement || e, i
    }
    var i = document.documentElement,
        n = function() {};
    i.addEventListener ? n = function(t, e, i) {
        t.addEventListener(e, i, !1)
    } : i.attachEvent && (n = function(t, i, n) {
        t[i + n] = n.handleEvent ? function() {
            var i = e(t);
            n.handleEvent.call(n, i)
        } : function() {
            var i = e(t);
            n.call(t, i)
        }, t.attachEvent("on" + i, t[i + n])
    });
    var o = function() {};
    i.removeEventListener ? o = function(t, e, i) {
        t.removeEventListener(e, i, !1)
    } : i.detachEvent && (o = function(t, e, i) {
        t.detachEvent("on" + e, t[e + i]);
        try {
            delete t[e + i]
        } catch (n) {
            t[e + i] = void 0
        }
    });
    var s = {
        bind: n,
        unbind: o
    };
    "function" == typeof define && define.amd ? define("eventie/eventie", s) : "object" == typeof exports ? module.exports = s : t.eventie = s
}(window),
function() {
    "use strict";

    function t() {}

    function e(t, e) {
        for (var i = t.length; i--;)
            if (t[i].listener === e) return i;
        return -1
    }

    function i(t) {
        return function() {
            return this[t].apply(this, arguments)
        }
    }
    var n = t.prototype,
        o = this,
        s = o.EventEmitter;
    n.getListeners = function(t) {
        var e, i, n = this._getEvents();
        if (t instanceof RegExp) {
            e = {};
            for (i in n) n.hasOwnProperty(i) && t.test(i) && (e[i] = n[i])
        } else e = n[t] || (n[t] = []);
        return e
    }, n.flattenListeners = function(t) {
        var e, i = [];
        for (e = 0; e < t.length; e += 1) i.push(t[e].listener);
        return i
    }, n.getListenersAsObject = function(t) {
        var e, i = this.getListeners(t);
        return i instanceof Array && (e = {}, e[t] = i), e || i
    }, n.addListener = function(t, i) {
        var n, o = this.getListenersAsObject(t),
            s = "object" == typeof i;
        for (n in o) o.hasOwnProperty(n) && -1 === e(o[n], i) && o[n].push(s ? i : {
            listener: i,
            once: !1
        });
        return this
    }, n.on = i("addListener"), n.addOnceListener = function(t, e) {
        return this.addListener(t, {
            listener: e,
            once: !0
        })
    }, n.once = i("addOnceListener"), n.defineEvent = function(t) {
        return this.getListeners(t), this
    }, n.defineEvents = function(t) {
        for (var e = 0; e < t.length; e += 1) this.defineEvent(t[e]);
        return this
    }, n.removeListener = function(t, i) {
        var n, o, s = this.getListenersAsObject(t);
        for (o in s) s.hasOwnProperty(o) && (n = e(s[o], i), -1 !== n && s[o].splice(n, 1));
        return this
    }, n.off = i("removeListener"), n.addListeners = function(t, e) {
        return this.manipulateListeners(!1, t, e)
    }, n.removeListeners = function(t, e) {
        return this.manipulateListeners(!0, t, e)
    }, n.manipulateListeners = function(t, e, i) {
        var n, o, s = t ? this.removeListener : this.addListener,
            r = t ? this.removeListeners : this.addListeners;
        if ("object" != typeof e || e instanceof RegExp)
            for (n = i.length; n--;) s.call(this, e, i[n]);
        else
            for (n in e) e.hasOwnProperty(n) && (o = e[n]) && ("function" == typeof o ? s.call(this, n, o) : r.call(this, n, o));
        return this
    }, n.removeEvent = function(t) {
        var e, i = typeof t,
            n = this._getEvents();
        if ("string" === i) delete n[t];
        else if (t instanceof RegExp)
            for (e in n) n.hasOwnProperty(e) && t.test(e) && delete n[e];
        else delete this._events;
        return this
    }, n.removeAllListeners = i("removeEvent"), n.emitEvent = function(t, e) {
        var i, n, o, s, r = this.getListenersAsObject(t);
        for (o in r)
            if (r.hasOwnProperty(o))
                for (n = r[o].length; n--;) i = r[o][n], i.once === !0 && this.removeListener(t, i.listener), s = i.listener.apply(this, e || []), s === this._getOnceReturnValue() && this.removeListener(t, i.listener);
        return this
    }, n.trigger = i("emitEvent"), n.emit = function(t) {
        var e = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(t, e)
    }, n.setOnceReturnValue = function(t) {
        return this._onceReturnValue = t, this
    }, n._getOnceReturnValue = function() {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, n._getEvents = function() {
        return this._events || (this._events = {})
    }, t.noConflict = function() {
        return o.EventEmitter = s, t
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
        return t
    }) : "object" == typeof module && module.exports ? module.exports = t : o.EventEmitter = t
}.call(this),
    function(t) {
        function e(t) {
            if (t) {
                if ("string" == typeof n[t]) return t;
                t = t.charAt(0).toUpperCase() + t.slice(1);
                for (var e, o = 0, s = i.length; s > o; o++)
                    if (e = i[o] + t, "string" == typeof n[e]) return e
            }
        }
        var i = "Webkit Moz ms Ms O".split(" "),
            n = document.documentElement.style;
        "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function() {
            return e
        }) : "object" == typeof exports ? module.exports = e : t.getStyleProperty = e
    }(window),
    function(t, e) {
        function i(t) {
            var e = parseFloat(t),
                i = -1 === t.indexOf("%") && !isNaN(e);
            return i && e
        }

        function n() {}

        function o() {
            for (var t = {
                    width: 0,
                    height: 0,
                    innerWidth: 0,
                    innerHeight: 0,
                    outerWidth: 0,
                    outerHeight: 0
                }, e = 0, i = a.length; i > e; e++) {
                var n = a[e];
                t[n] = 0
            }
            return t
        }

        function s(e) {
            function n() {
                if (!p) {
                    p = !0;
                    var n = t.getComputedStyle;
                    if (c = function() {
                            var t = n ? function(t) {
                                return n(t, null)
                            } : function(t) {
                                return t.currentStyle
                            };
                            return function(e) {
                                var i = t(e);
                                return i || r("Style returned " + i + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), i
                            }
                        }(), u = e("boxSizing")) {
                        var o = document.createElement("div");
                        o.style.width = "200px", o.style.padding = "1px 2px 3px 4px", o.style.borderStyle = "solid", o.style.borderWidth = "1px 2px 3px 4px", o.style[u] = "border-box";
                        var s = document.body || document.documentElement;
                        s.appendChild(o);
                        var a = c(o);
                        h = 200 === i(a.width), s.removeChild(o)
                    }
                }
            }

            function s(t) {
                if (n(), "string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) {
                    var e = c(t);
                    if ("none" === e.display) return o();
                    var s = {};
                    s.width = t.offsetWidth, s.height = t.offsetHeight;
                    for (var r = s.isBorderBox = !(!u || !e[u] || "border-box" !== e[u]), p = 0, d = a.length; d > p; p++) {
                        var f = a[p],
                            m = e[f];
                        m = l(t, m);
                        var g = parseFloat(m);
                        s[f] = isNaN(g) ? 0 : g
                    }
                    var y = s.paddingLeft + s.paddingRight,
                        v = s.paddingTop + s.paddingBottom,
                        w = s.marginLeft + s.marginRight,
                        b = s.marginTop + s.marginBottom,
                        _ = s.borderLeftWidth + s.borderRightWidth,
                        x = s.borderTopWidth + s.borderBottomWidth,
                        C = r && h,
                        E = i(e.width);
                    E !== !1 && (s.width = E + (C ? 0 : y + _));
                    var I = i(e.height);
                    return I !== !1 && (s.height = I + (C ? 0 : v + x)), s.innerWidth = s.width - (y + _), s.innerHeight = s.height - (v + x), s.outerWidth = s.width + w, s.outerHeight = s.height + b, s
                }
            }

            function l(e, i) {
                if (t.getComputedStyle || -1 === i.indexOf("%")) return i;
                var n = e.style,
                    o = n.left,
                    s = e.runtimeStyle,
                    r = s && s.left;
                return r && (s.left = e.currentStyle.left), n.left = i, i = n.pixelLeft, n.left = o, r && (s.left = r), i
            }
            var c, u, h, p = !1;
            return s
        }
        var r = "undefined" == typeof console ? n : function(t) {
                console.error(t)
            },
            a = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
        "function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], s) : "object" == typeof exports ? module.exports = s(require("desandro-get-style-property")) : t.getSize = s(t.getStyleProperty)
    }(window),
    function(t) {
        function e(t) {
            "function" == typeof t && (e.isReady ? t() : r.push(t))
        }

        function i(t) {
            var i = "readystatechange" === t.type && "complete" !== s.readyState;
            e.isReady || i || n()
        }

        function n() {
            e.isReady = !0;
            for (var t = 0, i = r.length; i > t; t++) {
                var n = r[t];
                n()
            }
        }

        function o(o) {
            return "complete" === s.readyState ? n() : (o.bind(s, "DOMContentLoaded", i), o.bind(s, "readystatechange", i), o.bind(t, "load", i)), e
        }
        var s = t.document,
            r = [];
        e.isReady = !1, "function" == typeof define && define.amd ? define("doc-ready/doc-ready", ["eventie/eventie"], o) : "object" == typeof exports ? module.exports = o(require("eventie")) : t.docReady = o(t.eventie)
    }(window),
    function(t) {
        "use strict";

        function e(t, e) {
            return t[r](e)
        }

        function i(t) {
            if (!t.parentNode) {
                var e = document.createDocumentFragment();
                e.appendChild(t)
            }
        }

        function n(t, e) {
            i(t);
            for (var n = t.parentNode.querySelectorAll(e), o = 0, s = n.length; s > o; o++)
                if (n[o] === t) return !0;
            return !1
        }

        function o(t, n) {
            return i(t), e(t, n)
        }
        var s, r = function() {
            if (t.matches) return "matches";
            if (t.matchesSelector) return "matchesSelector";
            for (var e = ["webkit", "moz", "ms", "o"], i = 0, n = e.length; n > i; i++) {
                var o = e[i],
                    s = o + "MatchesSelector";
                if (t[s]) return s
            }
        }();
        if (r) {
            var a = document.createElement("div"),
                l = e(a, "div");
            s = l ? e : o
        } else s = n;
        "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function() {
            return s
        }) : "object" == typeof exports ? module.exports = s : window.matchesSelector = s
    }(Element.prototype),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["doc-ready/doc-ready", "matches-selector/matches-selector"], function(i, n) {
            return e(t, i, n)
        }) : "object" == typeof exports ? module.exports = e(t, require("doc-ready"), require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.docReady, t.matchesSelector)
    }(window, function(t, e, i) {
        var n = {};
        n.extend = function(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }, n.modulo = function(t, e) {
            return (t % e + e) % e
        };
        var o = Object.prototype.toString;
        n.isArray = function(t) {
            return "[object Array]" == o.call(t)
        }, n.makeArray = function(t) {
            var e = [];
            if (n.isArray(t)) e = t;
            else if (t && "number" == typeof t.length)
                for (var i = 0, o = t.length; o > i; i++) e.push(t[i]);
            else e.push(t);
            return e
        }, n.indexOf = Array.prototype.indexOf ? function(t, e) {
            return t.indexOf(e)
        } : function(t, e) {
            for (var i = 0, n = t.length; n > i; i++)
                if (t[i] === e) return i;
            return -1
        }, n.removeFrom = function(t, e) {
            var i = n.indexOf(t, e); - 1 != i && t.splice(i, 1)
        }, n.isElement = "function" == typeof HTMLElement || "object" == typeof HTMLElement ? function(t) {
            return t instanceof HTMLElement
        } : function(t) {
            return t && "object" == typeof t && 1 == t.nodeType && "string" == typeof t.nodeName
        }, n.setText = function() {
            function t(t, i) {
                e = e || (void 0 !== document.documentElement.textContent ? "textContent" : "innerText"), t[e] = i
            }
            var e;
            return t
        }(), n.getParent = function(t, e) {
            for (; t != document.body;)
                if (t = t.parentNode, i(t, e)) return t
        }, n.getQueryElement = function(t) {
            return "string" == typeof t ? document.querySelector(t) : t
        }, n.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, n.filterFindElements = function(t, e) {
            t = n.makeArray(t);
            for (var o = [], s = 0, r = t.length; r > s; s++) {
                var a = t[s];
                if (n.isElement(a))
                    if (e) {
                        i(a, e) && o.push(a);
                        for (var l = a.querySelectorAll(e), c = 0, u = l.length; u > c; c++) o.push(l[c])
                    } else o.push(a)
            }
            return o
        }, n.debounceMethod = function(t, e, i) {
            var n = t.prototype[e],
                o = e + "Timeout";
            t.prototype[e] = function() {
                var t = this[o];
                t && clearTimeout(t);
                var e = arguments,
                    s = this;
                this[o] = setTimeout(function() {
                    n.apply(s, e), delete s[o]
                }, i || 100)
            }
        }, n.toDashed = function(t) {
            return t.replace(/(.)([A-Z])/g, function(t, e, i) {
                return e + "-" + i
            }).toLowerCase()
        };
        var s = t.console;
        return n.htmlInit = function(i, o) {
            e(function() {
                for (var e = n.toDashed(o), r = document.querySelectorAll(".js-" + e), a = "data-" + e + "-options", l = 0, c = r.length; c > l; l++) {
                    var u, h = r[l],
                        p = h.getAttribute(a);
                    try {
                        u = p && JSON.parse(p)
                    } catch (d) {
                        s && s.error("Error parsing " + a + " on " + h.nodeName.toLowerCase() + (h.id ? "#" + h.id : "") + ": " + d);
                        continue
                    }
                    var f = new i(h, u),
                        m = t.jQuery;
                    m && m.data(h, o, f)
                }
            })
        }, n
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property", "fizzy-ui-utils/utils"], function(i, n, o, s) {
            return e(t, i, n, o, s)
        }) : "object" == typeof exports ? module.exports = e(t, require("wolfy87-eventemitter"), require("get-size"), require("desandro-get-style-property"), require("fizzy-ui-utils")) : (t.Outlayer = {}, t.Outlayer.Item = e(t, t.EventEmitter, t.getSize, t.getStyleProperty, t.fizzyUIUtils))
    }(window, function(t, e, i, n, o) {
        "use strict";

        function s(t) {
            for (var e in t) return !1;
            return e = null, !0
        }

        function r(t, e) {
            t && (this.element = t, this.layout = e, this.position = {
                x: 0,
                y: 0
            }, this._create())
        }

        function a(t) {
            return t.replace(/([A-Z])/g, function(t) {
                return "-" + t.toLowerCase()
            })
        }
        var l = t.getComputedStyle,
            c = l ? function(t) {
                return l(t, null)
            } : function(t) {
                return t.currentStyle
            },
            u = n("transition"),
            h = n("transform"),
            p = u && h,
            d = !!n("perspective"),
            f = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "otransitionend",
                transition: "transitionend"
            }[u],
            m = ["transform", "transition", "transitionDuration", "transitionProperty"],
            g = function() {
                for (var t = {}, e = 0, i = m.length; i > e; e++) {
                    var o = m[e],
                        s = n(o);
                    s && s !== o && (t[o] = s)
                }
                return t
            }();
        o.extend(r.prototype, e.prototype), r.prototype._create = function() {
            this._transn = {
                ingProperties: {},
                clean: {},
                onEnd: {}
            }, this.css({
                position: "absolute"
            })
        }, r.prototype.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, r.prototype.getSize = function() {
            this.size = i(this.element)
        }, r.prototype.css = function(t) {
            var e = this.element.style;
            for (var i in t) {
                var n = g[i] || i;
                e[n] = t[i]
            }
        }, r.prototype.getPosition = function() {
            var t = c(this.element),
                e = this.layout.options,
                i = e.isOriginLeft,
                n = e.isOriginTop,
                o = t[i ? "left" : "right"],
                s = t[n ? "top" : "bottom"],
                r = this.layout.size,
                a = -1 != o.indexOf("%") ? parseFloat(o) / 100 * r.width : parseInt(o, 10),
                l = -1 != s.indexOf("%") ? parseFloat(s) / 100 * r.height : parseInt(s, 10);
            a = isNaN(a) ? 0 : a, l = isNaN(l) ? 0 : l, a -= i ? r.paddingLeft : r.paddingRight, l -= n ? r.paddingTop : r.paddingBottom, this.position.x = a, this.position.y = l
        }, r.prototype.layoutPosition = function() {
            var t = this.layout.size,
                e = this.layout.options,
                i = {},
                n = e.isOriginLeft ? "paddingLeft" : "paddingRight",
                o = e.isOriginLeft ? "left" : "right",
                s = e.isOriginLeft ? "right" : "left",
                r = this.position.x + t[n];
            i[o] = this.getXValue(r), i[s] = "";
            var a = e.isOriginTop ? "paddingTop" : "paddingBottom",
                l = e.isOriginTop ? "top" : "bottom",
                c = e.isOriginTop ? "bottom" : "top",
                u = this.position.y + t[a];
            i[l] = this.getYValue(u), i[c] = "", this.css(i), this.emitEvent("layout", [this])
        }, r.prototype.getXValue = function(t) {
            var e = this.layout.options;
            return e.percentPosition && !e.isHorizontal ? t / this.layout.size.width * 100 + "%" : t + "px"
        }, r.prototype.getYValue = function(t) {
            var e = this.layout.options;
            return e.percentPosition && e.isHorizontal ? t / this.layout.size.height * 100 + "%" : t + "px"
        }, r.prototype._transitionTo = function(t, e) {
            this.getPosition();
            var i = this.position.x,
                n = this.position.y,
                o = parseInt(t, 10),
                s = parseInt(e, 10),
                r = o === this.position.x && s === this.position.y;
            if (this.setPosition(t, e), r && !this.isTransitioning) return void this.layoutPosition();
            var a = t - i,
                l = e - n,
                c = {};
            c.transform = this.getTranslate(a, l), this.transition({
                to: c,
                onTransitionEnd: {
                    transform: this.layoutPosition
                },
                isCleaning: !0
            })
        }, r.prototype.getTranslate = function(t, e) {
            var i = this.layout.options;
            return t = i.isOriginLeft ? t : -t, e = i.isOriginTop ? e : -e, d ? "translate3d(" + t + "px, " + e + "px, 0)" : "translate(" + t + "px, " + e + "px)"
        }, r.prototype.goTo = function(t, e) {
            this.setPosition(t, e), this.layoutPosition()
        }, r.prototype.moveTo = p ? r.prototype._transitionTo : r.prototype.goTo, r.prototype.setPosition = function(t, e) {
            this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
        }, r.prototype._nonTransition = function(t) {
            this.css(t.to), t.isCleaning && this._removeStyles(t.to);
            for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
        }, r.prototype._transition = function(t) {
            if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
            var e = this._transn;
            for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
            for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
            if (t.from) {
                this.css(t.from);
                var n = this.element.offsetHeight;
                n = null
            }
            this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
        };
        var y = "opacity," + a(g.transform || "transform");
        r.prototype.enableTransition = function() {
            this.isTransitioning || (this.css({
                transitionProperty: y,
                transitionDuration: this.layout.options.transitionDuration
            }), this.element.addEventListener(f, this, !1))
        }, r.prototype.transition = r.prototype[u ? "_transition" : "_nonTransition"], r.prototype.onwebkitTransitionEnd = function(t) {
            this.ontransitionend(t)
        }, r.prototype.onotransitionend = function(t) {
            this.ontransitionend(t)
        };
        var v = {
            "-webkit-transform": "transform",
            "-moz-transform": "transform",
            "-o-transform": "transform"
        };
        r.prototype.ontransitionend = function(t) {
            if (t.target === this.element) {
                var e = this._transn,
                    i = v[t.propertyName] || t.propertyName;
                if (delete e.ingProperties[i], s(e.ingProperties) && this.disableTransition(), i in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[i]), i in e.onEnd) {
                    var n = e.onEnd[i];
                    n.call(this), delete e.onEnd[i]
                }
                this.emitEvent("transitionEnd", [this])
            }
        }, r.prototype.disableTransition = function() {
            this.removeTransitionStyles(), this.element.removeEventListener(f, this, !1), this.isTransitioning = !1
        }, r.prototype._removeStyles = function(t) {
            var e = {};
            for (var i in t) e[i] = "";
            this.css(e)
        };
        var w = {
            transitionProperty: "",
            transitionDuration: ""
        };
        return r.prototype.removeTransitionStyles = function() {
            this.css(w)
        }, r.prototype.removeElem = function() {
            this.element.parentNode.removeChild(this.element), this.css({
                display: ""
            }), this.emitEvent("remove", [this])
        }, r.prototype.remove = function() {
            if (!u || !parseFloat(this.layout.options.transitionDuration)) return void this.removeElem();
            var t = this;
            this.once("transitionEnd", function() {
                t.removeElem()
            }), this.hide()
        }, r.prototype.reveal = function() {
            delete this.isHidden, this.css({
                display: ""
            });
            var t = this.layout.options,
                e = {},
                i = this.getHideRevealTransitionEndProperty("visibleStyle");
            e[i] = this.onRevealTransitionEnd, this.transition({
                from: t.hiddenStyle,
                to: t.visibleStyle,
                isCleaning: !0,
                onTransitionEnd: e
            })
        }, r.prototype.onRevealTransitionEnd = function() {
            this.isHidden || this.emitEvent("reveal")
        }, r.prototype.getHideRevealTransitionEndProperty = function(t) {
            var e = this.layout.options[t];
            if (e.opacity) return "opacity";
            for (var i in e) return i
        }, r.prototype.hide = function() {
            this.isHidden = !0, this.css({
                display: ""
            });
            var t = this.layout.options,
                e = {},
                i = this.getHideRevealTransitionEndProperty("hiddenStyle");
            e[i] = this.onHideTransitionEnd, this.transition({
                from: t.visibleStyle,
                to: t.hiddenStyle,
                isCleaning: !0,
                onTransitionEnd: e
            })
        }, r.prototype.onHideTransitionEnd = function() {
            this.isHidden && (this.css({
                display: "none"
            }), this.emitEvent("hide"))
        }, r.prototype.destroy = function() {
            this.css({
                position: "",
                left: "",
                right: "",
                top: "",
                bottom: "",
                transition: "",
                transform: ""
            })
        }, r
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "eventEmitter/EventEmitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(i, n, o, s, r) {
            return e(t, i, n, o, s, r)
        }) : "object" == typeof exports ? module.exports = e(t, require("eventie"), require("wolfy87-eventemitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.eventie, t.EventEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
    }(window, function(t, e, i, n, o, s) {
        "use strict";

        function r(t, e) {
            var i = o.getQueryElement(t);
            if (!i) return void(a && a.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
            this.element = i, l && (this.$element = l(this.element)), this.options = o.extend({}, this.constructor.defaults), this.option(e);
            var n = ++u;
            this.element.outlayerGUID = n, h[n] = this, this._create(), this.options.isInitLayout && this.layout()
        }
        var a = t.console,
            l = t.jQuery,
            c = function() {},
            u = 0,
            h = {};
        return r.namespace = "outlayer", r.Item = s, r.defaults = {
            containerStyle: {
                position: "relative"
            },
            isInitLayout: !0,
            isOriginLeft: !0,
            isOriginTop: !0,
            isResizeBound: !0,
            isResizingContainer: !0,
            transitionDuration: "0.4s",
            hiddenStyle: {
                opacity: 0,
                transform: "scale(0.001)"
            },
            visibleStyle: {
                opacity: 1,
                transform: "scale(1)"
            }
        }, o.extend(r.prototype, i.prototype), r.prototype.option = function(t) {
            o.extend(this.options, t)
        }, r.prototype._create = function() {
            this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), o.extend(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
        }, r.prototype.reloadItems = function() {
            this.items = this._itemize(this.element.children)
        }, r.prototype._itemize = function(t) {
            for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0, s = e.length; s > o; o++) {
                var r = e[o],
                    a = new i(r, this);
                n.push(a)
            }
            return n
        }, r.prototype._filterFindItemElements = function(t) {
            return o.filterFindElements(t, this.options.itemSelector)
        }, r.prototype.getItemElements = function() {
            for (var t = [], e = 0, i = this.items.length; i > e; e++) t.push(this.items[e].element);
            return t
        }, r.prototype.layout = function() {
            this._resetLayout(), this._manageStamps();
            var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
            this.layoutItems(this.items, t), this._isLayoutInited = !0
        }, r.prototype._init = r.prototype.layout, r.prototype._resetLayout = function() {
            this.getSize()
        }, r.prototype.getSize = function() {
            this.size = n(this.element)
        }, r.prototype._getMeasurement = function(t, e) {
            var i, s = this.options[t];
            s ? ("string" == typeof s ? i = this.element.querySelector(s) : o.isElement(s) && (i = s), this[t] = i ? n(i)[e] : s) : this[t] = 0
        }, r.prototype.layoutItems = function(t, e) {
            t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
        }, r.prototype._getItemsForLayout = function(t) {
            for (var e = [], i = 0, n = t.length; n > i; i++) {
                var o = t[i];
                o.isIgnored || e.push(o)
            }
            return e
        }, r.prototype._layoutItems = function(t, e) {
            if (this._emitCompleteOnItems("layout", t), t && t.length) {
                for (var i = [], n = 0, o = t.length; o > n; n++) {
                    var s = t[n],
                        r = this._getItemLayoutPosition(s);
                    r.item = s, r.isInstant = e || s.isLayoutInstant, i.push(r)
                }
                this._processLayoutQueue(i)
            }
        }, r.prototype._getItemLayoutPosition = function() {
            return {
                x: 0,
                y: 0
            }
        }, r.prototype._processLayoutQueue = function(t) {
            for (var e = 0, i = t.length; i > e; e++) {
                var n = t[e];
                this._positionItem(n.item, n.x, n.y, n.isInstant)
            }
        }, r.prototype._positionItem = function(t, e, i, n) {
            n ? t.goTo(e, i) : t.moveTo(e, i)
        }, r.prototype._postLayout = function() {
            this.resizeContainer()
        }, r.prototype.resizeContainer = function() {
            if (this.options.isResizingContainer) {
                var t = this._getContainerSize();
                t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
            }
        }, r.prototype._getContainerSize = c, r.prototype._setContainerMeasure = function(t, e) {
            if (void 0 !== t) {
                var i = this.size;
                i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
            }
        }, r.prototype._emitCompleteOnItems = function(t, e) {
            function i() {
                o.dispatchEvent(t + "Complete", null, [e])
            }

            function n() {
                r++, r === s && i()
            }
            var o = this,
                s = e.length;
            if (!e || !s) return void i();
            for (var r = 0, a = 0, l = e.length; l > a; a++) {
                var c = e[a];
                c.once(t, n)
            }
        }, r.prototype.dispatchEvent = function(t, e, i) {
            var n = e ? [e].concat(i) : i;
            if (this.emitEvent(t, n), l)
                if (this.$element = this.$element || l(this.element), e) {
                    var o = l.Event(e);
                    o.type = t, this.$element.trigger(o, i)
                } else this.$element.trigger(t, i)
        }, r.prototype.ignore = function(t) {
            var e = this.getItem(t);
            e && (e.isIgnored = !0)
        }, r.prototype.unignore = function(t) {
            var e = this.getItem(t);
            e && delete e.isIgnored
        }, r.prototype.stamp = function(t) {
            if (t = this._find(t)) {
                this.stamps = this.stamps.concat(t);
                for (var e = 0, i = t.length; i > e; e++) {
                    var n = t[e];
                    this.ignore(n)
                }
            }
        }, r.prototype.unstamp = function(t) {
            if (t = this._find(t))
                for (var e = 0, i = t.length; i > e; e++) {
                    var n = t[e];
                    o.removeFrom(this.stamps, n), this.unignore(n)
                }
        }, r.prototype._find = function(t) {
            return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = o.makeArray(t)) : void 0
        }, r.prototype._manageStamps = function() {
            if (this.stamps && this.stamps.length) {
                this._getBoundingRect();
                for (var t = 0, e = this.stamps.length; e > t; t++) {
                    var i = this.stamps[t];
                    this._manageStamp(i)
                }
            }
        }, r.prototype._getBoundingRect = function() {
            var t = this.element.getBoundingClientRect(),
                e = this.size;
            this._boundingRect = {
                left: t.left + e.paddingLeft + e.borderLeftWidth,
                top: t.top + e.paddingTop + e.borderTopWidth,
                right: t.right - (e.paddingRight + e.borderRightWidth),
                bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
            }
        }, r.prototype._manageStamp = c, r.prototype._getElementOffset = function(t) {
            var e = t.getBoundingClientRect(),
                i = this._boundingRect,
                o = n(t),
                s = {
                    left: e.left - i.left - o.marginLeft,
                    top: e.top - i.top - o.marginTop,
                    right: i.right - e.right - o.marginRight,
                    bottom: i.bottom - e.bottom - o.marginBottom
                };
            return s
        }, r.prototype.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, r.prototype.bindResize = function() {
            this.isResizeBound || (e.bind(t, "resize", this), this.isResizeBound = !0)
        }, r.prototype.unbindResize = function() {
            this.isResizeBound && e.unbind(t, "resize", this), this.isResizeBound = !1
        }, r.prototype.onresize = function() {
            function t() {
                e.resize(), delete e.resizeTimeout
            }
            this.resizeTimeout && clearTimeout(this.resizeTimeout);
            var e = this;
            this.resizeTimeout = setTimeout(t, 100)
        }, r.prototype.resize = function() {
            this.isResizeBound && this.needsResizeLayout() && this.layout()
        }, r.prototype.needsResizeLayout = function() {
            var t = n(this.element),
                e = this.size && t;
            return e && t.innerWidth !== this.size.innerWidth
        }, r.prototype.addItems = function(t) {
            var e = this._itemize(t);
            return e.length && (this.items = this.items.concat(e)), e
        }, r.prototype.appended = function(t) {
            var e = this.addItems(t);
            e.length && (this.layoutItems(e, !0), this.reveal(e))
        }, r.prototype.prepended = function(t) {
            var e = this._itemize(t);
            if (e.length) {
                var i = this.items.slice(0);
                this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
            }
        }, r.prototype.reveal = function(t) {
            this._emitCompleteOnItems("reveal", t);
            for (var e = t && t.length, i = 0; e && e > i; i++) {
                var n = t[i];
                n.reveal()
            }
        }, r.prototype.hide = function(t) {
            this._emitCompleteOnItems("hide", t);
            for (var e = t && t.length, i = 0; e && e > i; i++) {
                var n = t[i];
                n.hide()
            }
        }, r.prototype.revealItemElements = function(t) {
            var e = this.getItems(t);
            this.reveal(e)
        }, r.prototype.hideItemElements = function(t) {
            var e = this.getItems(t);
            this.hide(e)
        }, r.prototype.getItem = function(t) {
            for (var e = 0, i = this.items.length; i > e; e++) {
                var n = this.items[e];
                if (n.element === t) return n
            }
        }, r.prototype.getItems = function(t) {
            t = o.makeArray(t);
            for (var e = [], i = 0, n = t.length; n > i; i++) {
                var s = t[i],
                    r = this.getItem(s);
                r && e.push(r)
            }
            return e
        }, r.prototype.remove = function(t) {
            var e = this.getItems(t);
            if (this._emitCompleteOnItems("remove", e), e && e.length)
                for (var i = 0, n = e.length; n > i; i++) {
                    var s = e[i];
                    s.remove(), o.removeFrom(this.items, s)
                }
        }, r.prototype.destroy = function() {
            var t = this.element.style;
            t.height = "", t.position = "", t.width = "";
            for (var e = 0, i = this.items.length; i > e; e++) {
                var n = this.items[e];
                n.destroy()
            }
            this.unbindResize();
            var o = this.element.outlayerGUID;
            delete h[o], delete this.element.outlayerGUID, l && l.removeData(this.element, this.constructor.namespace)
        }, r.data = function(t) {
            t = o.getQueryElement(t);
            var e = t && t.outlayerGUID;
            return e && h[e]
        }, r.create = function(t, e) {
            function i() {
                r.apply(this, arguments)
            }
            return Object.create ? i.prototype = Object.create(r.prototype) : o.extend(i.prototype, r.prototype), i.prototype.constructor = i, i.defaults = o.extend({}, r.defaults), o.extend(i.defaults, e), i.prototype.settings = {}, i.namespace = t, i.data = r.data, i.Item = function() {
                s.apply(this, arguments)
            }, i.Item.prototype = new s, o.htmlInit(i, t), l && l.bridget && l.bridget(t, i), i
        }, r.Item = s, r
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], e) : "object" == typeof exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
    }(window, function(t) {
        "use strict";

        function e() {
            t.Item.apply(this, arguments)
        }
        e.prototype = new t.Item, e.prototype._create = function() {
            this.id = this.layout.itemGUID++, t.Item.prototype._create.call(this), this.sortData = {}
        }, e.prototype.updateSortData = function() {
            if (!this.isIgnored) {
                this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
                var t = this.layout.options.getSortData,
                    e = this.layout._sorters;
                for (var i in t) {
                    var n = e[i];
                    this.sortData[i] = n(this.element, this)
                }
            }
        };
        var i = e.prototype.destroy;
        return e.prototype.destroy = function() {
            i.apply(this, arguments), this.css({
                display: ""
            })
        }, e
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
    }(window, function(t, e) {
        "use strict";

        function i(t) {
            this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size)
        }
        return function() {
            function t(t) {
                return function() {
                    return e.prototype[t].apply(this.isotope, arguments)
                }
            }
            for (var n = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout"], o = 0, s = n.length; s > o; o++) {
                var r = n[o];
                i.prototype[r] = t(r)
            }
        }(), i.prototype.needsVerticalResizeLayout = function() {
            var e = t(this.isotope.element),
                i = this.isotope.size && e;
            return i && e.innerHeight != this.isotope.size.innerHeight
        }, i.prototype._getMeasurement = function() {
            this.isotope._getMeasurement.apply(this, arguments)
        }, i.prototype.getColumnWidth = function() {
            this.getSegmentSize("column", "Width")
        }, i.prototype.getRowHeight = function() {
            this.getSegmentSize("row", "Height")
        }, i.prototype.getSegmentSize = function(t, e) {
            var i = t + e,
                n = "outer" + e;
            if (this._getMeasurement(i, n), !this[i]) {
                var o = this.getFirstItemSize();
                this[i] = o && o[n] || this.isotope.size["inner" + e]
            }
        }, i.prototype.getFirstItemSize = function() {
            var e = this.isotope.filteredItems[0];
            return e && e.element && t(e.element)
        }, i.prototype.layout = function() {
            this.isotope.layout.apply(this.isotope, arguments)
        }, i.prototype.getSize = function() {
            this.isotope.getSize(), this.size = this.isotope.size
        }, i.modes = {}, i.create = function(t, e) {
            function n() {
                i.apply(this, arguments)
            }
            return n.prototype = new i, e && (n.options = e), n.prototype.namespace = t, i.modes[t] = n, n
        }, i
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size", "fizzy-ui-utils/utils"], e) : "object" == typeof exports ? module.exports = e(require("outlayer"), require("get-size"), require("fizzy-ui-utils")) : t.Masonry = e(t.Outlayer, t.getSize, t.fizzyUIUtils)
    }(window, function(t, e, i) {
        var n = t.create("masonry");
        return n.prototype._resetLayout = function() {
            this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
            var t = this.cols;
            for (this.colYs = []; t--;) this.colYs.push(0);
            this.maxY = 0
        }, n.prototype.measureColumns = function() {
            if (this.getContainerWidth(), !this.columnWidth) {
                var t = this.items[0],
                    i = t && t.element;
                this.columnWidth = i && e(i).outerWidth || this.containerWidth
            }
            var n = this.columnWidth += this.gutter,
                o = this.containerWidth + this.gutter,
                s = o / n,
                r = n - o % n,
                a = r && 1 > r ? "round" : "floor";
            s = Math[a](s), this.cols = Math.max(s, 1)
        }, n.prototype.getContainerWidth = function() {
            var t = this.options.isFitWidth ? this.element.parentNode : this.element,
                i = e(t);
            this.containerWidth = i && i.innerWidth
        }, n.prototype._getItemLayoutPosition = function(t) {
            t.getSize();
            var e = t.size.outerWidth % this.columnWidth,
                n = e && 1 > e ? "round" : "ceil",
                o = Math[n](t.size.outerWidth / this.columnWidth);
            o = Math.min(o, this.cols);
            for (var s = this._getColGroup(o), r = Math.min.apply(Math, s), a = i.indexOf(s, r), l = {
                    x: this.columnWidth * a,
                    y: r
                }, c = r + t.size.outerHeight, u = this.cols + 1 - s.length, h = 0; u > h; h++) this.colYs[a + h] = c;
            return l
        }, n.prototype._getColGroup = function(t) {
            if (2 > t) return this.colYs;
            for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) {
                var o = this.colYs.slice(n, n + t);
                e[n] = Math.max.apply(Math, o)
            }
            return e
        }, n.prototype._manageStamp = function(t) {
            var i = e(t),
                n = this._getElementOffset(t),
                o = this.options.isOriginLeft ? n.left : n.right,
                s = o + i.outerWidth,
                r = Math.floor(o / this.columnWidth);
            r = Math.max(0, r);
            var a = Math.floor(s / this.columnWidth);
            a -= s % this.columnWidth ? 0 : 1, a = Math.min(this.cols - 1, a);
            for (var l = (this.options.isOriginTop ? n.top : n.bottom) + i.outerHeight, c = r; a >= c; c++) this.colYs[c] = Math.max(l, this.colYs[c])
        }, n.prototype._getContainerSize = function() {
            this.maxY = Math.max.apply(Math, this.colYs);
            var t = {
                height: this.maxY
            };
            return this.options.isFitWidth && (t.width = this._getContainerFitWidth()), t
        }, n.prototype._getContainerFitWidth = function() {
            for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
            return (this.cols - t) * this.columnWidth - this.gutter
        }, n.prototype.needsResizeLayout = function() {
            var t = this.containerWidth;
            return this.getContainerWidth(), t !== this.containerWidth
        }, n
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry)
    }(window, function(t, e) {
        "use strict";

        function i(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }
        var n = t.create("masonry"),
            o = n.prototype._getElementOffset,
            s = n.prototype.layout,
            r = n.prototype._getMeasurement;
        i(n.prototype, e.prototype), n.prototype._getElementOffset = o, n.prototype.layout = s, n.prototype._getMeasurement = r;
        var a = n.prototype.measureColumns;
        n.prototype.measureColumns = function() {
            this.items = this.isotope.filteredItems, a.call(this)
        };
        var l = n.prototype._manageStamp;
        return n.prototype._manageStamp = function() {
            this.options.isOriginLeft = this.isotope.options.isOriginLeft, this.options.isOriginTop = this.isotope.options.isOriginTop, l.apply(this, arguments)
        }, n
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
    }(window, function(t) {
        "use strict";
        var e = t.create("fitRows");
        return e.prototype._resetLayout = function() {
            this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
        }, e.prototype._getItemLayoutPosition = function(t) {
            t.getSize();
            var e = t.size.outerWidth + this.gutter,
                i = this.isotope.size.innerWidth + this.gutter;
            0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
            var n = {
                x: this.x,
                y: this.y
            };
            return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, n
        }, e.prototype._getContainerSize = function() {
            return {
                height: this.maxY
            }
        }, e
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
    }(window, function(t) {
        "use strict";
        var e = t.create("vertical", {
            horizontalAlignment: 0
        });
        return e.prototype._resetLayout = function() {
            this.y = 0
        }, e.prototype._getItemLayoutPosition = function(t) {
            t.getSize();
            var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
                i = this.y;
            return this.y += t.size.outerHeight, {
                x: e,
                y: i
            }
        }, e.prototype._getContainerSize = function() {
            return {
                height: this.y
            }
        }, e
    }),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], function(i, n, o, s, r, a) {
            return e(t, i, n, o, s, r, a)
        }) : "object" == typeof exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("./item"), require("./layout-mode"), require("./layout-modes/masonry"), require("./layout-modes/fit-rows"), require("./layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode)
    }(window, function(t, e, i, n, o, s, r) {
        function a(t, e) {
            return function(i, n) {
                for (var o = 0, s = t.length; s > o; o++) {
                    var r = t[o],
                        a = i.sortData[r],
                        l = n.sortData[r];
                    if (a > l || l > a) {
                        var c = void 0 !== e[r] ? e[r] : e,
                            u = c ? 1 : -1;
                        return (a > l ? 1 : -1) * u
                    }
                }
                return 0
            }
        }
        var l = t.jQuery,
            c = String.prototype.trim ? function(t) {
                return t.trim()
            } : function(t) {
                return t.replace(/^\s+|\s+$/g, "")
            },
            u = document.documentElement,
            h = u.textContent ? function(t) {
                return t.textContent
            } : function(t) {
                return t.innerText
            },
            p = e.create("isotope", {
                layoutMode: "masonry",
                isJQueryFiltering: !0,
                sortAscending: !0
            });
        p.Item = s, p.LayoutMode = r, p.prototype._create = function() {
            this.itemGUID = 0, this._sorters = {}, this._getSorters(), e.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
            for (var t in r.modes) this._initLayoutMode(t)
        }, p.prototype.reloadItems = function() {
            this.itemGUID = 0, e.prototype.reloadItems.call(this)
        }, p.prototype._itemize = function() {
            for (var t = e.prototype._itemize.apply(this, arguments), i = 0, n = t.length; n > i; i++) {
                var o = t[i];
                o.id = this.itemGUID++
            }
            return this._updateItemsSortData(t), t
        }, p.prototype._initLayoutMode = function(t) {
            var e = r.modes[t],
                i = this.options[t] || {};
            this.options[t] = e.options ? o.extend(e.options, i) : i, this.modes[t] = new e(this)
        }, p.prototype.layout = function() {
            return !this._isLayoutInited && this.options.isInitLayout ? void this.arrange() : void this._layout()
        }, p.prototype._layout = function() {
            var t = this._getIsInstant();
            this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
        }, p.prototype.arrange = function(t) {
            function e() {
                n.reveal(i.needReveal), n.hide(i.needHide)
            }
            this.option(t), this._getIsInstant();
            var i = this._filter(this.items);
            this.filteredItems = i.matches;
            var n = this;
            this._bindArrangeComplete(), this._isInstant ? this._noTransition(e) : e(), this._sort(), this._layout()
        }, p.prototype._init = p.prototype.arrange, p.prototype._getIsInstant = function() {
            var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
            return this._isInstant = t, t
        }, p.prototype._bindArrangeComplete = function() {
            function t() {
                e && i && n && o.dispatchEvent("arrangeComplete", null, [o.filteredItems])
            }
            var e, i, n, o = this;
            this.once("layoutComplete", function() {
                e = !0, t()
            }), this.once("hideComplete", function() {
                i = !0, t()
            }), this.once("revealComplete", function() {
                n = !0, t()
            })
        }, p.prototype._filter = function(t) {
            var e = this.options.filter;
            e = e || "*";
            for (var i = [], n = [], o = [], s = this._getFilterTest(e), r = 0, a = t.length; a > r; r++) {
                var l = t[r];
                if (!l.isIgnored) {
                    var c = s(l);
                    c && i.push(l), c && l.isHidden ? n.push(l) : c || l.isHidden || o.push(l)
                }
            }
            return {
                matches: i,
                needReveal: n,
                needHide: o
            }
        }, p.prototype._getFilterTest = function(t) {
            return l && this.options.isJQueryFiltering ? function(e) {
                return l(e.element).is(t)
            } : "function" == typeof t ? function(e) {
                return t(e.element)
            } : function(e) {
                return n(e.element, t)
            }
        }, p.prototype.updateSortData = function(t) {
            var e;
            t ? (t = o.makeArray(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e)
        }, p.prototype._getSorters = function() {
            var t = this.options.getSortData;
            for (var e in t) {
                var i = t[e];
                this._sorters[e] = d(i)
            }
        }, p.prototype._updateItemsSortData = function(t) {
            for (var e = t && t.length, i = 0; e && e > i; i++) {
                var n = t[i];
                n.updateSortData()
            }
        };
        var d = function() {
            function t(t) {
                if ("string" != typeof t) return t;
                var i = c(t).split(" "),
                    n = i[0],
                    o = n.match(/^\[(.+)\]$/),
                    s = o && o[1],
                    r = e(s, n),
                    a = p.sortDataParsers[i[1]];
                return t = a ? function(t) {
                    return t && a(r(t))
                } : function(t) {
                    return t && r(t)
                }
            }

            function e(t, e) {
                var i;
                return i = t ? function(e) {
                    return e.getAttribute(t)
                } : function(t) {
                    var i = t.querySelector(e);
                    return i && h(i)
                }
            }
            return t
        }();
        p.sortDataParsers = {
            parseInt: function(t) {
                return parseInt(t, 10)
            },
            parseFloat: function(t) {
                return parseFloat(t)
            }
        }, p.prototype._sort = function() {
            var t = this.options.sortBy;
            if (t) {
                var e = [].concat.apply(t, this.sortHistory),
                    i = a(e, this.options.sortAscending);
                this.filteredItems.sort(i), t != this.sortHistory[0] && this.sortHistory.unshift(t)
            }
        }, p.prototype._mode = function() {
            var t = this.options.layoutMode,
                e = this.modes[t];
            if (!e) throw new Error("No layout mode: " + t);
            return e.options = this.options[t], e
        }, p.prototype._resetLayout = function() {
            e.prototype._resetLayout.call(this), this._mode()._resetLayout()
        }, p.prototype._getItemLayoutPosition = function(t) {
            return this._mode()._getItemLayoutPosition(t)
        }, p.prototype._manageStamp = function(t) {
            this._mode()._manageStamp(t)
        }, p.prototype._getContainerSize = function() {
            return this._mode()._getContainerSize()
        }, p.prototype.needsResizeLayout = function() {
            return this._mode().needsResizeLayout()
        }, p.prototype.appended = function(t) {
            var e = this.addItems(t);
            if (e.length) {
                var i = this._filterRevealAdded(e);
                this.filteredItems = this.filteredItems.concat(i)
            }
        }, p.prototype.prepended = function(t) {
            var e = this._itemize(t);
            if (e.length) {
                this._resetLayout(), this._manageStamps();
                var i = this._filterRevealAdded(e);
                this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = e.concat(this.items)
            }
        }, p.prototype._filterRevealAdded = function(t) {
            var e = this._filter(t);
            return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches
        }, p.prototype.insert = function(t) {
            var e = this.addItems(t);
            if (e.length) {
                var i, n, o = e.length;
                for (i = 0; o > i; i++) n = e[i], this.element.appendChild(n.element);
                var s = this._filter(e).matches;
                for (i = 0; o > i; i++) e[i].isLayoutInstant = !0;
                for (this.arrange(), i = 0; o > i; i++) delete e[i].isLayoutInstant;
                this.reveal(s)
            }
        };
        var f = p.prototype.remove;
        return p.prototype.remove = function(t) {
            t = o.makeArray(t);
            var e = this.getItems(t);
            f.call(this, t);
            var i = e && e.length;
            if (i)
                for (var n = 0; i > n; n++) {
                    var s = e[n];
                    o.removeFrom(this.filteredItems, s)
                }
        }, p.prototype.shuffle = function() {
            for (var t = 0, e = this.items.length; e > t; t++) {
                var i = this.items[t];
                i.sortData.random = Math.random()
            }
            this.options.sortBy = "random", this._sort(), this._layout()
        }, p.prototype._noTransition = function(t) {
            var e = this.options.transitionDuration;
            this.options.transitionDuration = 0;
            var i = t.call(this);
            return this.options.transitionDuration = e, i
        }, p.prototype.getFilteredItemElements = function() {
            for (var t = [], e = 0, i = this.filteredItems.length; i > e; e++) t.push(this.filteredItems[e].element);
            return t
        }, p
    }), ! function(t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
    }(function(t) {
        var e, i, n, o, s, r, a = "Close",
            l = "BeforeClose",
            c = "AfterClose",
            u = "BeforeAppend",
            h = "MarkupParse",
            p = "Open",
            d = "Change",
            f = "mfp",
            m = "." + f,
            g = "mfp-ready",
            y = "mfp-removing",
            v = "mfp-prevent-close",
            w = function() {},
            b = !!window.jQuery,
            _ = t(window),
            x = function(t, i) {
                e.ev.on(f + t + m, i)
            },
            C = function(e, i, n, o) {
                var s = document.createElement("div");
                return s.className = "mfp-" + e, n && (s.innerHTML = n), o ? i && i.appendChild(s) : (s = t(s), i && s.appendTo(i)), s
            },
            E = function(i, n) {
                e.ev.triggerHandler(f + i, n), e.st.callbacks && (i = i.charAt(0).toLowerCase() + i.slice(1), e.st.callbacks[i] && e.st.callbacks[i].apply(e, t.isArray(n) ? n : [n]))
            },
            I = function(i) {
                return i === r && e.currTemplate.closeBtn || (e.currTemplate.closeBtn = t(e.st.closeMarkup.replace("%title%", e.st.tClose)), r = i), e.currTemplate.closeBtn
            },
            S = function() {
                t.magnificPopup.instance || (e = new w, e.init(), t.magnificPopup.instance = e)
            },
            k = function() {
                var t = document.createElement("p").style,
                    e = ["ms", "O", "Moz", "Webkit"];
                if (void 0 !== t.transition) return !0;
                for (; e.length;)
                    if (e.pop() + "Transition" in t) return !0;
                return !1
            };
        w.prototype = {
            constructor: w,
            init: function() {
                var i = navigator.appVersion;
                e.isLowIE = e.isIE8 = document.all && !document.addEventListener, e.isAndroid = /android/gi.test(i), e.isIOS = /iphone|ipad|ipod/gi.test(i), e.supportsTransition = k(), e.probablyMobile = e.isAndroid || e.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), n = t(document), e.popupsCache = {}
            },
            open: function(i) {
                var o;
                if (i.isObj === !1) {
                    e.items = i.items.toArray(), e.index = 0;
                    var r, a = i.items;
                    for (o = 0; o < a.length; o++)
                        if (r = a[o], r.parsed && (r = r.el[0]), r === i.el[0]) {
                            e.index = o;
                            break
                        }
                } else e.items = t.isArray(i.items) ? i.items : [i.items], e.index = i.index || 0;
                if (e.isOpen) return void e.updateItemHTML();
                e.types = [], s = "", i.mainEl && i.mainEl.length ? e.ev = i.mainEl.eq(0) : e.ev = n, i.key ? (e.popupsCache[i.key] || (e.popupsCache[i.key] = {}), e.currTemplate = e.popupsCache[i.key]) : e.currTemplate = {}, e.st = t.extend(!0, {}, t.magnificPopup.defaults, i), e.fixedContentPos = "auto" === e.st.fixedContentPos ? !e.probablyMobile : e.st.fixedContentPos, e.st.modal && (e.st.closeOnContentClick = !1, e.st.closeOnBgClick = !1, e.st.showCloseBtn = !1, e.st.enableEscapeKey = !1), e.bgOverlay || (e.bgOverlay = C("bg").on("click" + m, function() {
                    e.close()
                }), e.wrap = C("wrap").attr("tabindex", -1).on("click" + m, function(t) {
                    e._checkIfClose(t.target) && e.close()
                }), e.container = C("container", e.wrap)), e.contentContainer = C("content"), e.st.preloader && (e.preloader = C("preloader", e.container, e.st.tLoading));
                var l = t.magnificPopup.modules;
                for (o = 0; o < l.length; o++) {
                    var c = l[o];
                    c = c.charAt(0).toUpperCase() + c.slice(1), e["init" + c].call(e)
                }
                E("BeforeOpen"), e.st.showCloseBtn && (e.st.closeBtnInside ? (x(h, function(t, e, i, n) {
                    i.close_replaceWith = I(n.type)
                }), s += " mfp-close-btn-in") : e.wrap.append(I())), e.st.alignTop && (s += " mfp-align-top"), e.fixedContentPos ? e.wrap.css({
                    overflow: e.st.overflowY,
                    overflowX: "hidden",
                    overflowY: e.st.overflowY
                }) : e.wrap.css({
                    top: _.scrollTop(),
                    position: "absolute"
                }), (e.st.fixedBgPos === !1 || "auto" === e.st.fixedBgPos && !e.fixedContentPos) && e.bgOverlay.css({
                    height: n.height(),
                    position: "absolute"
                }), e.st.enableEscapeKey && n.on("keyup" + m, function(t) {
                    27 === t.keyCode && e.close()
                }), _.on("resize" + m, function() {
                    e.updateSize()
                }), e.st.closeOnContentClick || (s += " mfp-auto-cursor"), s && e.wrap.addClass(s);
                var u = e.wH = _.height(),
                    d = {};
                if (e.fixedContentPos && e._hasScrollBar(u)) {
                    var f = e._getScrollbarSize();
                    f && (d.marginRight = f)
                }
                e.fixedContentPos && (e.isIE7 ? t("body, html").css("overflow", "hidden") : d.overflow = "hidden");
                var y = e.st.mainClass;
                return e.isIE7 && (y += " mfp-ie7"), y && e._addClassToMFP(y), e.updateItemHTML(), E("BuildControls"), t("html").css(d), e.bgOverlay.add(e.wrap).prependTo(e.st.prependTo || t(document.body)), e._lastFocusedEl = document.activeElement, setTimeout(function() {
                    e.content ? (e._addClassToMFP(g), e._setFocus()) : e.bgOverlay.addClass(g), n.on("focusin" + m, e._onFocusIn)
                }, 16), e.isOpen = !0, e.updateSize(u), E(p), i
            },
            close: function() {
                e.isOpen && (E(l), e.isOpen = !1, e.st.removalDelay && !e.isLowIE && e.supportsTransition ? (e._addClassToMFP(y), setTimeout(function() {
                    e._close()
                }, e.st.removalDelay)) : e._close())
            },
            _close: function() {
                E(a);
                var i = y + " " + g + " ";
                if (e.bgOverlay.detach(), e.wrap.detach(), e.container.empty(), e.st.mainClass && (i += e.st.mainClass + " "), e._removeClassFromMFP(i), e.fixedContentPos) {
                    var o = {
                        marginRight: ""
                    };
                    e.isIE7 ? t("body, html").css("overflow", "") : o.overflow = "", t("html").css(o)
                }
                n.off("keyup" + m + " focusin" + m), e.ev.off(m), e.wrap.attr("class", "mfp-wrap").removeAttr("style"), e.bgOverlay.attr("class", "mfp-bg"), e.container.attr("class", "mfp-container"), !e.st.showCloseBtn || e.st.closeBtnInside && e.currTemplate[e.currItem.type] !== !0 || e.currTemplate.closeBtn && e.currTemplate.closeBtn.detach(), e.st.autoFocusLast && e._lastFocusedEl && t(e._lastFocusedEl).focus(), e.currItem = null, e.content = null, e.currTemplate = null, e.prevHeight = 0, E(c)
            },
            updateSize: function(t) {
                if (e.isIOS) {
                    var i = document.documentElement.clientWidth / window.innerWidth,
                        n = window.innerHeight * i;
                    e.wrap.css("height", n), e.wH = n
                } else e.wH = t || _.height();
                e.fixedContentPos || e.wrap.css("height", e.wH), E("Resize")
            },
            updateItemHTML: function() {
                var i = e.items[e.index];
                e.contentContainer.detach(), e.content && e.content.detach(), i.parsed || (i = e.parseEl(e.index));
                var n = i.type;
                if (E("BeforeChange", [e.currItem ? e.currItem.type : "", n]), e.currItem = i, !e.currTemplate[n]) {
                    var s = e.st[n] ? e.st[n].markup : !1;
                    E("FirstMarkupParse", s), s ? e.currTemplate[n] = t(s) : e.currTemplate[n] = !0
                }
                o && o !== i.type && e.container.removeClass("mfp-" + o + "-holder");
                var r = e["get" + n.charAt(0).toUpperCase() + n.slice(1)](i, e.currTemplate[n]);
                e.appendContent(r, n), i.preloaded = !0, E(d, i), o = i.type, e.container.prepend(e.contentContainer), E("AfterChange")
            },
            appendContent: function(t, i) {
                e.content = t, t ? e.st.showCloseBtn && e.st.closeBtnInside && e.currTemplate[i] === !0 ? e.content.find(".mfp-close").length || e.content.append(I()) : e.content = t : e.content = "", E(u), e.container.addClass("mfp-" + i + "-holder"), e.contentContainer.append(e.content)
            },
            parseEl: function(i) {
                var n, o = e.items[i];
                if (o.tagName ? o = {
                        el: t(o)
                    } : (n = o.type, o = {
                        data: o,
                        src: o.src
                    }), o.el) {
                    for (var s = e.types, r = 0; r < s.length; r++)
                        if (o.el.hasClass("mfp-" + s[r])) {
                            n = s[r];
                            break
                        }
                    o.src = o.el.attr("data-mfp-src"), o.src || (o.src = o.el.attr("href"))
                }
                return o.type = n || e.st.type || "inline", o.index = i, o.parsed = !0, e.items[i] = o, E("ElementParse", o), e.items[i]
            },
            addGroup: function(t, i) {
                var n = function(n) {
                    n.mfpEl = this, e._openClick(n, t, i)
                };
                i || (i = {});
                var o = "click.magnificPopup";
                i.mainEl = t, i.items ? (i.isObj = !0, t.off(o).on(o, n)) : (i.isObj = !1, i.delegate ? t.off(o).on(o, i.delegate, n) : (i.items = t, t.off(o).on(o, n)))
            },
            _openClick: function(i, n, o) {
                var s = void 0 !== o.midClick ? o.midClick : t.magnificPopup.defaults.midClick;
                if (s || !(2 === i.which || i.ctrlKey || i.metaKey || i.altKey || i.shiftKey)) {
                    var r = void 0 !== o.disableOn ? o.disableOn : t.magnificPopup.defaults.disableOn;
                    if (r)
                        if (t.isFunction(r)) {
                            if (!r.call(e)) return !0
                        } else if (_.width() < r) return !0;
                    i.type && (i.preventDefault(), e.isOpen && i.stopPropagation()), o.el = t(i.mfpEl), o.delegate && (o.items = n.find(o.delegate)), e.open(o)
                }
            },
            updateStatus: function(t, n) {
                if (e.preloader) {
                    i !== t && e.container.removeClass("mfp-s-" + i), n || "loading" !== t || (n = e.st.tLoading);
                    var o = {
                        status: t,
                        text: n
                    };
                    E("UpdateStatus", o), t = o.status, n = o.text, e.preloader.html(n), e.preloader.find("a").on("click", function(t) {
                        t.stopImmediatePropagation()
                    }), e.container.addClass("mfp-s-" + t), i = t
                }
            },
            _checkIfClose: function(i) {
                if (!t(i).hasClass(v)) {
                    var n = e.st.closeOnContentClick,
                        o = e.st.closeOnBgClick;
                    if (n && o) return !0;
                    if (!e.content || t(i).hasClass("mfp-close") || e.preloader && i === e.preloader[0]) return !0;
                    if (i === e.content[0] || t.contains(e.content[0], i)) {
                        if (n) return !0
                    } else if (o && t.contains(document, i)) return !0;
                    return !1
                }
            },
            _addClassToMFP: function(t) {
                e.bgOverlay.addClass(t), e.wrap.addClass(t)
            },
            _removeClassFromMFP: function(t) {
                this.bgOverlay.removeClass(t), e.wrap.removeClass(t)
            },
            _hasScrollBar: function(t) {
                return (e.isIE7 ? n.height() : document.body.scrollHeight) > (t || _.height())
            },
            _setFocus: function() {
                (e.st.focus ? e.content.find(e.st.focus).eq(0) : e.wrap).focus()
            },
            _onFocusIn: function(i) {
                return i.target === e.wrap[0] || t.contains(e.wrap[0], i.target) ? void 0 : (e._setFocus(), !1)
            },
            _parseMarkup: function(e, i, n) {
                var o;
                n.data && (i = t.extend(n.data, i)), E(h, [e, i, n]), t.each(i, function(i, n) {
                    if (void 0 === n || n === !1) return !0;
                    if (o = i.split("_"), o.length > 1) {
                        var s = e.find(m + "-" + o[0]);
                        if (s.length > 0) {
                            var r = o[1];
                            "replaceWith" === r ? s[0] !== n[0] && s.replaceWith(n) : "img" === r ? s.is("img") ? s.attr("src", n) : s.replaceWith(t("<img>").attr("src", n).attr("class", s.attr("class"))) : s.attr(o[1], n)
                        }
                    } else e.find(m + "-" + i).html(n)
                })
            },
            _getScrollbarSize: function() {
                if (void 0 === e.scrollbarSize) {
                    var t = document.createElement("div");
                    t.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(t), e.scrollbarSize = t.offsetWidth - t.clientWidth, document.body.removeChild(t)
                }
                return e.scrollbarSize
            }
        }, t.magnificPopup = {
            instance: null,
            proto: w.prototype,
            modules: [],
            open: function(e, i) {
                return S(), e = e ? t.extend(!0, {}, e) : {}, e.isObj = !0, e.index = i || 0, this.instance.open(e)
            },
            close: function() {
                return t.magnificPopup.instance && t.magnificPopup.instance.close()
            },
            registerModule: function(e, i) {
                i.options && (t.magnificPopup.defaults[e] = i.options), t.extend(this.proto, i.proto), this.modules.push(e)
            },
            defaults: {
                disableOn: 0,
                key: null,
                midClick: !1,
                mainClass: "",
                preloader: !0,
                focus: "",
                closeOnContentClick: !1,
                closeOnBgClick: !0,
                closeBtnInside: !0,
                showCloseBtn: !0,
                enableEscapeKey: !0,
                modal: !1,
                alignTop: !1,
                removalDelay: 0,
                prependTo: null,
                fixedContentPos: "auto",
                fixedBgPos: "auto",
                overflowY: "auto",
                closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
                tClose: "Close (Esc)",
                tLoading: "Loading...",
                autoFocusLast: !0
            }
        }, t.fn.magnificPopup = function(i) {
            S();
            var n = t(this);
            if ("string" == typeof i)
                if ("open" === i) {
                    var o, s = b ? n.data("magnificPopup") : n[0].magnificPopup,
                        r = parseInt(arguments[1], 10) || 0;
                    s.items ? o = s.items[r] : (o = n, s.delegate && (o = o.find(s.delegate)), o = o.eq(r)), e._openClick({
                        mfpEl: o
                    }, n, s)
                } else e.isOpen && e[i].apply(e, Array.prototype.slice.call(arguments, 1));
            else i = t.extend(!0, {}, i), b ? n.data("magnificPopup", i) : n[0].magnificPopup = i, e.addGroup(n, i);
            return n
        };
        var T, z, $, L = "inline",
            O = function() {
                $ && (z.after($.addClass(T)).detach(), $ = null)
            };
        t.magnificPopup.registerModule(L, {
            options: {
                hiddenClass: "hide",
                markup: "",
                tNotFound: "Content not found"
            },
            proto: {
                initInline: function() {
                    e.types.push(L), x(a + "." + L, function() {
                        O()
                    })
                },
                getInline: function(i, n) {
                    if (O(), i.src) {
                        var o = e.st.inline,
                            s = t(i.src);
                        if (s.length) {
                            var r = s[0].parentNode;
                            r && r.tagName && (z || (T = o.hiddenClass, z = C(T), T = "mfp-" + T), $ = s.after(z).detach().removeClass(T)), e.updateStatus("ready")
                        } else e.updateStatus("error", o.tNotFound), s = t("<div>");
                        return i.inlineElement = s, s
                    }
                    return e.updateStatus("ready"), e._parseMarkup(n, {}, i), n
                }
            }
        });
        var A, D = "ajax",
            P = function() {
                A && t(document.body).removeClass(A)
            },
            M = function() {
                P(), e.req && e.req.abort()
            };
        t.magnificPopup.registerModule(D, {
            options: {
                settings: null,
                cursor: "mfp-ajax-cur",
                tError: '<a href="%url%">The content</a> could not be loaded.'
            },
            proto: {
                initAjax: function() {
                    e.types.push(D), A = e.st.ajax.cursor, x(a + "." + D, M), x("BeforeChange." + D, M)
                },
                getAjax: function(i) {
                    A && t(document.body).addClass(A), e.updateStatus("loading");
                    var n = t.extend({
                        url: i.src,
                        success: function(n, o, s) {
                            var r = {
                                data: n,
                                xhr: s
                            };
                            E("ParseAjax", r), e.appendContent(t(r.data), D), i.finished = !0, P(), e._setFocus(), setTimeout(function() {
                                e.wrap.addClass(g)
                            }, 16), e.updateStatus("ready"), E("AjaxContentAdded")
                        },
                        error: function() {
                            P(), i.finished = i.loadError = !0, e.updateStatus("error", e.st.ajax.tError.replace("%url%", i.src))
                        }
                    }, e.st.ajax.settings);
                    return e.req = t.ajax(n), ""
                }
            }
        });
        var j, R = function(i) {
            if (i.data && void 0 !== i.data.title) return i.data.title;
            var n = e.st.image.titleSrc;
            if (n) {
                if (t.isFunction(n)) return n.call(e, i);
                if (i.el) return i.el.attr(n) || ""
            }
            return ""
        };
        t.magnificPopup.registerModule("image", {
            options: {
                markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
                cursor: "mfp-zoom-out-cur",
                titleSrc: "title",
                verticalFit: !0,
                tError: '<a href="%url%">The image</a> could not be loaded.'
            },
            proto: {
                initImage: function() {
                    var i = e.st.image,
                        n = ".image";
                    e.types.push("image"), x(p + n, function() {
                        "image" === e.currItem.type && i.cursor && t(document.body).addClass(i.cursor)
                    }), x(a + n, function() {
                        i.cursor && t(document.body).removeClass(i.cursor), _.off("resize" + m)
                    }), x("Resize" + n, e.resizeImage), e.isLowIE && x("AfterChange", e.resizeImage)
                },
                resizeImage: function() {
                    var t = e.currItem;
                    if (t && t.img && e.st.image.verticalFit) {
                        var i = 0;
                        e.isLowIE && (i = parseInt(t.img.css("padding-top"), 10) + parseInt(t.img.css("padding-bottom"), 10)), t.img.css("max-height", e.wH - i)
                    }
                },
                _onImageHasSize: function(t) {
                    t.img && (t.hasSize = !0, j && clearInterval(j), t.isCheckingImgSize = !1, E("ImageHasSize", t), t.imgHidden && (e.content && e.content.removeClass("mfp-loading"), t.imgHidden = !1))
                },
                findImageSize: function(t) {
                    var i = 0,
                        n = t.img[0],
                        o = function(s) {
                            j && clearInterval(j), j = setInterval(function() {
                                return n.naturalWidth > 0 ? void e._onImageHasSize(t) : (i > 200 && clearInterval(j), i++, void(3 === i ? o(10) : 40 === i ? o(50) : 100 === i && o(500)))
                            }, s)
                        };
                    o(1)
                },
                getImage: function(i, n) {
                    var o = 0,
                        s = function() {
                            i && (i.img[0].complete ? (i.img.off(".mfploader"), i === e.currItem && (e._onImageHasSize(i), e.updateStatus("ready")), i.hasSize = !0, i.loaded = !0, E("ImageLoadComplete")) : (o++, 200 > o ? setTimeout(s, 100) : r()))
                        },
                        r = function() {
                            i && (i.img.off(".mfploader"), i === e.currItem && (e._onImageHasSize(i), e.updateStatus("error", a.tError.replace("%url%", i.src))), i.hasSize = !0, i.loaded = !0, i.loadError = !0)
                        },
                        a = e.st.image,
                        l = n.find(".mfp-img");
                    if (l.length) {
                        var c = document.createElement("img");
                        c.className = "mfp-img", i.el && i.el.find("img").length && (c.alt = i.el.find("img").attr("alt")), i.img = t(c).on("load.mfploader", s).on("error.mfploader", r), c.src = i.src, l.is("img") && (i.img = i.img.clone()), c = i.img[0], c.naturalWidth > 0 ? i.hasSize = !0 : c.width || (i.hasSize = !1)
                    }
                    return e._parseMarkup(n, {
                        title: R(i),
                        img_replaceWith: i.img
                    }, i), e.resizeImage(), i.hasSize ? (j && clearInterval(j), i.loadError ? (n.addClass("mfp-loading"), e.updateStatus("error", a.tError.replace("%url%", i.src))) : (n.removeClass("mfp-loading"), e.updateStatus("ready")), n) : (e.updateStatus("loading"), i.loading = !0, i.hasSize || (i.imgHidden = !0, n.addClass("mfp-loading"), e.findImageSize(i)), n)
                }
            }
        });
        var N, W = function() {
            return void 0 === N && (N = void 0 !== document.createElement("p").style.MozTransform), N
        };
        t.magnificPopup.registerModule("zoom", {
            options: {
                enabled: !1,
                easing: "ease-in-out",
                duration: 300,
                opener: function(t) {
                    return t.is("img") ? t : t.find("img")
                }
            },
            proto: {
                initZoom: function() {
                    var t, i = e.st.zoom,
                        n = ".zoom";
                    if (i.enabled && e.supportsTransition) {
                        var o, s, r = i.duration,
                            c = function(t) {
                                var e = t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                    n = "all " + i.duration / 1e3 + "s " + i.easing,
                                    o = {
                                        position: "fixed",
                                        zIndex: 9999,
                                        left: 0,
                                        top: 0,
                                        "-webkit-backface-visibility": "hidden"
                                    },
                                    s = "transition";
                                return o["-webkit-" + s] = o["-moz-" + s] = o["-o-" + s] = o[s] = n, e.css(o), e
                            },
                            u = function() {
                                e.content.css("visibility", "visible")
                            };
                        x("BuildControls" + n, function() {
                            if (e._allowZoom()) {
                                if (clearTimeout(o), e.content.css("visibility", "hidden"), t = e._getItemToZoom(), !t) return void u();
                                s = c(t), s.css(e._getOffset()), e.wrap.append(s), o = setTimeout(function() {
                                    s.css(e._getOffset(!0)), o = setTimeout(function() {
                                        u(), setTimeout(function() {
                                            s.remove(), t = s = null, E("ZoomAnimationEnded")
                                        }, 16)
                                    }, r)
                                }, 16)
                            }
                        }), x(l + n, function() {
                            if (e._allowZoom()) {
                                if (clearTimeout(o), e.st.removalDelay = r, !t) {
                                    if (t = e._getItemToZoom(), !t) return;
                                    s = c(t)
                                }
                                s.css(e._getOffset(!0)), e.wrap.append(s), e.content.css("visibility", "hidden"), setTimeout(function() {
                                    s.css(e._getOffset())
                                }, 16)
                            }
                        }), x(a + n, function() {
                            e._allowZoom() && (u(), s && s.remove(), t = null)
                        })
                    }
                },
                _allowZoom: function() {
                    return "image" === e.currItem.type
                },
                _getItemToZoom: function() {
                    return e.currItem.hasSize ? e.currItem.img : !1
                },
                _getOffset: function(i) {
                    var n;
                    n = i ? e.currItem.img : e.st.zoom.opener(e.currItem.el || e.currItem);
                    var o = n.offset(),
                        s = parseInt(n.css("padding-top"), 10),
                        r = parseInt(n.css("padding-bottom"), 10);
                    o.top -= t(window).scrollTop() - s;
                    var a = {
                        width: n.width(),
                        height: (b ? n.innerHeight() : n[0].offsetHeight) - r - s
                    };
                    return W() ? a["-moz-transform"] = a.transform = "translate(" + o.left + "px," + o.top + "px)" : (a.left = o.left, a.top = o.top), a
                }
            }
        });
        var q = "iframe",
            B = "//about:blank",
            H = function(t) {
                if (e.currTemplate[q]) {
                    var i = e.currTemplate[q].find("iframe");
                    i.length && (t || (i[0].src = B), e.isIE8 && i.css("display", t ? "block" : "none"))
                }
            };
        t.magnificPopup.registerModule(q, {
            options: {
                markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
                srcAction: "iframe_src",
                patterns: {
                    youtube: {
                        index: "youtube.com",
                        id: "v=",
                        src: "//www.youtube.com/embed/%id%?autoplay=1"
                    },
                    vimeo: {
                        index: "vimeo.com/",
                        id: "/",
                        src: "//player.vimeo.com/video/%id%?autoplay=1"
                    },
                    gmaps: {
                        index: "//maps.google.",
                        src: "%id%&output=embed"
                    }
                }
            },
            proto: {
                initIframe: function() {
                    e.types.push(q), x("BeforeChange", function(t, e, i) {
                        e !== i && (e === q ? H() : i === q && H(!0))
                    }), x(a + "." + q, function() {
                        H()
                    })
                },
                getIframe: function(i, n) {
                    var o = i.src,
                        s = e.st.iframe;
                    t.each(s.patterns, function() {
                        return o.indexOf(this.index) > -1 ? (this.id && (o = "string" == typeof this.id ? o.substr(o.lastIndexOf(this.id) + this.id.length, o.length) : this.id.call(this, o)), o = this.src.replace("%id%", o), !1) : void 0
                    });
                    var r = {};
                    return s.srcAction && (r[s.srcAction] = o), e._parseMarkup(n, r, i), e.updateStatus("ready"), n
                }
            }
        });
        var F = function(t) {
                var i = e.items.length;
                return t > i - 1 ? t - i : 0 > t ? i + t : t
            },
            Y = function(t, e, i) {
                return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, i)
            };
        t.magnificPopup.registerModule("gallery", {
            options: {
                enabled: !1,
                arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
                preload: [0, 2],
                navigateByImgClick: !0,
                arrows: !0,
                tPrev: "Previous (Left arrow key)",
                tNext: "Next (Right arrow key)",
                tCounter: "%curr% of %total%"
            },
            proto: {
                initGallery: function() {
                    var i = e.st.gallery,
                        o = ".mfp-gallery";
                    return e.direction = !0, i && i.enabled ? (s += " mfp-gallery", x(p + o, function() {
                        i.navigateByImgClick && e.wrap.on("click" + o, ".mfp-img", function() {
                            return e.items.length > 1 ? (e.next(), !1) : void 0
                        }), n.on("keydown" + o, function(t) {
                            37 === t.keyCode ? e.prev() : 39 === t.keyCode && e.next()
                        })
                    }), x("UpdateStatus" + o, function(t, i) {
                        i.text && (i.text = Y(i.text, e.currItem.index, e.items.length))
                    }), x(h + o, function(t, n, o, s) {
                        var r = e.items.length;
                        o.counter = r > 1 ? Y(i.tCounter, s.index, r) : ""
                    }), x("BuildControls" + o, function() {
                        if (e.items.length > 1 && i.arrows && !e.arrowLeft) {
                            var n = i.arrowMarkup,
                                o = e.arrowLeft = t(n.replace(/%title%/gi, i.tPrev).replace(/%dir%/gi, "left")).addClass(v),
                                s = e.arrowRight = t(n.replace(/%title%/gi, i.tNext).replace(/%dir%/gi, "right")).addClass(v);
                            o.click(function() {
                                e.prev()
                            }), s.click(function() {
                                e.next()
                            }), e.container.append(o.add(s))
                        }
                    }), x(d + o, function() {
                        e._preloadTimeout && clearTimeout(e._preloadTimeout), e._preloadTimeout = setTimeout(function() {
                            e.preloadNearbyImages(), e._preloadTimeout = null
                        }, 16)
                    }), void x(a + o, function() {
                        n.off(o), e.wrap.off("click" + o), e.arrowRight = e.arrowLeft = null
                    })) : !1
                },
                next: function() {
                    e.direction = !0, e.index = F(e.index + 1), e.updateItemHTML()
                },
                prev: function() {
                    e.direction = !1, e.index = F(e.index - 1), e.updateItemHTML()
                },
                goTo: function(t) {
                    e.direction = t >= e.index, e.index = t, e.updateItemHTML()
                },
                preloadNearbyImages: function() {
                    var t, i = e.st.gallery.preload,
                        n = Math.min(i[0], e.items.length),
                        o = Math.min(i[1], e.items.length);
                    for (t = 1; t <= (e.direction ? o : n); t++) e._preloadItem(e.index + t);
                    for (t = 1; t <= (e.direction ? n : o); t++) e._preloadItem(e.index - t)
                },
                _preloadItem: function(i) {
                    if (i = F(i), !e.items[i].preloaded) {
                        var n = e.items[i];
                        n.parsed || (n = e.parseEl(i)), E("LazyLoad", n), "image" === n.type && (n.img = t('<img class="mfp-img" />').on("load.mfploader", function() {
                            n.hasSize = !0
                        }).on("error.mfploader", function() {
                            n.hasSize = !0, n.loadError = !0, E("LazyLoadError", n)
                        }).attr("src", n.src)), n.preloaded = !0
                    }
                }
            }
        });
        var V = "retina";
        t.magnificPopup.registerModule(V, {
            options: {
                replaceSrc: function(t) {
                    return t.src.replace(/\.\w+$/, function(t) {
                        return "@2x" + t
                    })
                },
                ratio: 1
            },
            proto: {
                initRetina: function() {
                    if (window.devicePixelRatio > 1) {
                        var t = e.st.retina,
                            i = t.ratio;
                        i = isNaN(i) ? i() : i, i > 1 && (x("ImageHasSize." + V, function(t, e) {
                            e.img.css({
                                "max-width": e.img[0].naturalWidth / i,
                                width: "100%"
                            })
                        }), x("ElementParse." + V, function(e, n) {
                            n.src = t.replaceSrc(n, i)
                        }))
                    }
                }
            }
        }), S()
    }),
    function() {
        function t() {
            $.keyboardSupport && d("keydown", s)
        }

        function e() {
            if (!D && document.body) {
                D = !0;
                var e = document.body,
                    i = document.documentElement,
                    n = window.innerHeight,
                    o = e.scrollHeight;
                if (P = document.compatMode.indexOf("CSS") >= 0 ? i : e, E = e, t(), top != self) O = !0;
                else if (o > n && (e.offsetHeight <= n || i.offsetHeight <= n)) {
                    var s = document.createElement("div");
                    s.style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + P.scrollHeight + "px", document.body.appendChild(s);
                    var r;
                    S = function() {
                        r || (r = setTimeout(function() {
                            L || (s.style.height = "0", s.style.height = P.scrollHeight + "px", r = null)
                        }, 500))
                    }, setTimeout(S, 10), d("resize", S);
                    var a = {
                        attributes: !0,
                        childList: !0,
                        characterData: !1
                    };
                    if (I = new V(S), I.observe(e, a), P.offsetHeight <= n) {
                        var l = document.createElement("div");
                        l.style.clear = "both", e.appendChild(l)
                    }
                }
                $.fixedBackground || L || (e.style.backgroundAttachment = "scroll", i.style.backgroundAttachment = "scroll")
            }
        }

        function i() {
            I && I.disconnect(), f(F, o), f("mousedown", r), f("keydown", s), f("resize", S), f("load", e)
        }

        function n(t, e, i) {
            if (g(e, i), 1 != $.accelerationMax) {
                var n = Date.now(),
                    o = n - q;
                if (o < $.accelerationDelta) {
                    var s = (1 + 50 / o) / 2;
                    s > 1 && (s = Math.min(s, $.accelerationMax), e *= s, i *= s)
                }
                q = Date.now()
            }
            if (N.push({
                    x: e,
                    y: i,
                    lastX: 0 > e ? .99 : -.99,
                    lastY: 0 > i ? .99 : -.99,
                    start: Date.now()
                }), !W) {
                var r = t === document.body,
                    a = function(n) {
                        for (var o = Date.now(), s = 0, l = 0, c = 0; c < N.length; c++) {
                            var u = N[c],
                                h = o - u.start,
                                p = h >= $.animationTime,
                                d = p ? 1 : h / $.animationTime;
                            $.pulseAlgorithm && (d = x(d));
                            var f = u.x * d - u.lastX >> 0,
                                m = u.y * d - u.lastY >> 0;
                            s += f, l += m, u.lastX += f, u.lastY += m, p && (N.splice(c, 1), c--)
                        }
                        r ? window.scrollBy(s, l) : (s && (t.scrollLeft += s), l && (t.scrollTop += l)), e || i || (N = []), N.length ? Y(a, t, 1e3 / $.frameRate + 1) : W = !1
                    };
                Y(a, t, 0), W = !0
            }
        }

        function o(t) {
            D || e();
            var i = t.target,
                o = c(i);
            if (!o || t.defaultPrevented || t.ctrlKey) return !0;
            if (m(E, "embed") || m(i, "embed") && /\.pdf/i.test(i.src) || m(E, "object")) return !0;
            var s = -t.wheelDeltaX || t.deltaX || 0,
                r = -t.wheelDeltaY || t.deltaY || 0;
            return j && (t.wheelDeltaX && v(t.wheelDeltaX, 120) && (s = -120 * (t.wheelDeltaX / Math.abs(t.wheelDeltaX))), t.wheelDeltaY && v(t.wheelDeltaY, 120) && (r = -120 * (t.wheelDeltaY / Math.abs(t.wheelDeltaY)))), s || r || (r = -t.wheelDelta || 0), 1 === t.deltaMode && (s *= 40, r *= 40), !$.touchpadSupport && y(r) ? !0 : (Math.abs(s) > 1.2 && (s *= $.stepSize / 120), Math.abs(r) > 1.2 && (r *= $.stepSize / 120), n(o, s, r), t.preventDefault(), void a())
        }

        function s(t) {
            var e = t.target,
                i = t.ctrlKey || t.altKey || t.metaKey || t.shiftKey && t.keyCode !== R.spacebar;
            document.contains(E) || (E = document.activeElement);
            var o = /^(textarea|select|embed|object)$/i,
                s = /^(button|submit|radio|checkbox|file|color|image)$/i;
            if (o.test(e.nodeName) || m(e, "input") && !s.test(e.type) || m(E, "video") || b(t) || e.isContentEditable || t.defaultPrevented || i) return !0;
            if ((m(e, "button") || m(e, "input") && s.test(e.type)) && t.keyCode === R.spacebar) return !0;
            var r, l = 0,
                u = 0,
                h = c(E),
                p = h.clientHeight;
            switch (h == document.body && (p = window.innerHeight), t.keyCode) {
                case R.up:
                    u = -$.arrowScroll;
                    break;
                case R.down:
                    u = $.arrowScroll;
                    break;
                case R.spacebar:
                    r = t.shiftKey ? 1 : -1, u = -r * p * .9;
                    break;
                case R.pageup:
                    u = .9 * -p;
                    break;
                case R.pagedown:
                    u = .9 * p;
                    break;
                case R.home:
                    u = -h.scrollTop;
                    break;
                case R.end:
                    var d = h.scrollHeight - h.scrollTop - p;
                    u = d > 0 ? d + 10 : 0;
                    break;
                case R.left:
                    l = -$.arrowScroll;
                    break;
                case R.right:
                    l = $.arrowScroll;
                    break;
                default:
                    return !0
            }
            n(h, l, u), t.preventDefault(), a()
        }

        function r(t) {
            E = t.target
        }

        function a() {
            clearTimeout(k), k = setInterval(function() {
                H = {}
            }, 1e3)
        }

        function l(t, e) {
            for (var i = t.length; i--;) H[B(t[i])] = e;
            return e
        }

        function c(t) {
            var e = [],
                i = document.body,
                n = P.scrollHeight;
            do {
                var o = H[B(t)];
                if (o) return l(e, o);
                if (e.push(t), n === t.scrollHeight) {
                    var s = h(P) && h(i),
                        r = s || p(P);
                    if (O && u(P) || !O && r) return l(e, X())
                } else if (u(t) && p(t)) return l(e, t)
            } while (t = t.parentElement)
        }

        function u(t) {
            return t.clientHeight + 10 < t.scrollHeight
        }

        function h(t) {
            var e = getComputedStyle(t, "").getPropertyValue("overflow-y");
            return "hidden" !== e
        }

        function p(t) {
            var e = getComputedStyle(t, "").getPropertyValue("overflow-y");
            return "scroll" === e || "auto" === e
        }

        function d(t, e) {
            window.addEventListener(t, e, !1)
        }

        function f(t, e) {
            window.removeEventListener(t, e, !1)
        }

        function m(t, e) {
            return (t.nodeName || "").toLowerCase() === e.toLowerCase()
        }

        function g(t, e) {
            t = t > 0 ? 1 : -1, e = e > 0 ? 1 : -1, A.x === t && A.y === e || (A.x = t, A.y = e, N = [], q = 0)
        }

        function y(t) {
            return t ? (M.length || (M = [t, t, t]), t = Math.abs(t), M.push(t), M.shift(), clearTimeout(T), T = setTimeout(function() {
                window.localStorage && (localStorage.SS_deltaBuffer = M.join(","))
            }, 1e3), !w(120) && !w(100)) : void 0
        }

        function v(t, e) {
            return Math.floor(t / e) == t / e
        }

        function w(t) {
            return v(M[0], t) && v(M[1], t) && v(M[2], t)
        }

        function b(t) {
            var e = t.target,
                i = !1;
            if (-1 != document.URL.indexOf("www.youtube.com/watch"))
                do
                    if (i = e.classList && e.classList.contains("html5-video-controls")) break;
            while (e = e.parentNode);
            return i
        }

        function _(t) {
            var e, i, n;
            return t *= $.pulseScale, 1 > t ? e = t - (1 - Math.exp(-t)) : (i = Math.exp(-1), t -= 1, n = 1 - Math.exp(-t), e = i + n * (1 - i)), e * $.pulseNormalize
        }

        function x(t) {
            return t >= 1 ? 1 : 0 >= t ? 0 : (1 == $.pulseNormalize && ($.pulseNormalize /= _(1)), _(t))
        }

        function C(t) {
            for (var e in t) z.hasOwnProperty(e) && ($[e] = t[e])
        }
        var E, I, S, k, T, z = {
                frameRate: 150,
                animationTime: 400,
                stepSize: 100,
                pulseAlgorithm: !0,
                pulseScale: 4,
                pulseNormalize: 1,
                accelerationDelta: 50,
                accelerationMax: 3,
                keyboardSupport: !0,
                arrowScroll: 50,
                touchpadSupport: !1,
                fixedBackground: !0,
                excluded: ""
            },
            $ = z,
            L = !1,
            O = !1,
            A = {
                x: 0,
                y: 0
            },
            D = !1,
            P = document.documentElement,
            M = [],
            j = /^Mac/.test(navigator.platform),
            R = {
                left: 37,
                up: 38,
                right: 39,
                down: 40,
                spacebar: 32,
                pageup: 33,
                pagedown: 34,
                end: 35,
                home: 36
            },
            N = [],
            W = !1,
            q = Date.now(),
            B = function() {
                var t = 0;
                return function(e) {
                    return e.uniqueID || (e.uniqueID = t++)
                }
            }(),
            H = {};
        window.localStorage && localStorage.SS_deltaBuffer && (M = localStorage.SS_deltaBuffer.split(","));
        var F, Y = function() {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(t, e, i) {
                    window.setTimeout(t, i || 1e3 / 60)
                }
            }(),
            V = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
            X = function() {
                var t;
                return function() {
                    if (!t) {
                        var e = document.createElement("div");
                        e.style.cssText = "height:10000px;width:1px;", document.body.appendChild(e);
                        var i = document.body.scrollTop;
                        document.documentElement.scrollTop;
                        window.scrollBy(0, 3), t = document.body.scrollTop != i ? document.body : document.documentElement, window.scrollBy(0, -3), document.body.removeChild(e)
                    }
                    return t
                }
            }(),
            Q = window.navigator.userAgent,
            U = /Edge/.test(Q),
            G = /chrome/i.test(Q) && !U,
            Z = /safari/i.test(Q) && !U,
            K = /mobile/i.test(Q),
            J = (G || Z) && !K;
        "onwheel" in document.createElement("div") ? F = "wheel" : "onmousewheel" in document.createElement("div") && (F = "mousewheel"),
            F && J && (d(F, o), d("mousedown", r), d("load", e)), C.destroy = i, window.SmoothScrollOptions && C(window.SmoothScrollOptions), "function" == typeof define && define.amd ? define(function() {
                return C
            }) : "object" == typeof exports ? module.exports = C : window.SmoothScroll = C
    }(), window.scrollReveal = function(t) {
        "use strict";

        function e(i) {
            return this instanceof e ? (s = this, s.elems = {}, s.serial = 1, s.blocked = !1, s.config = n(s.defaults, i), s.isMobile() && !s.config.mobile || !s.isSupported() ? void s.destroy() : (s.config.viewport === t.document.documentElement ? (t.addEventListener("scroll", o, !1), t.addEventListener("resize", o, !1)) : s.config.viewport.addEventListener("scroll", o, !1), void s.init(!0))) : new e(i)
        }
        var i, n, o, s;
        return e.prototype = {
            defaults: {
                enter: "bottom",
                move: "8px",
                over: "0.6s",
                wait: "0s",
                easing: "ease",
                scale: {
                    direction: "up",
                    power: "5%"
                },
                rotate: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                opacity: 0,
                mobile: !1,
                reset: !1,
                viewport: t.document.documentElement,
                delay: "once",
                vFactor: .6,
                complete: function(t) {}
            },
            init: function(t) {
                var e, i, n;
                n = Array.prototype.slice.call(s.config.viewport.querySelectorAll("[data-sr]")), n.forEach(function(t) {
                    e = s.serial++, i = s.elems[e] = {
                        domEl: t
                    }, i.config = s.configFactory(i), i.styles = s.styleFactory(i), i.seen = !1, t.removeAttribute("data-sr"), t.setAttribute("style", i.styles.inline + i.styles.initial)
                }), s.scrolled = s.scrollY(), s.animate(t)
            },
            animate: function(t) {
                function e(t) {
                    var e = s.elems[t];
                    setTimeout(function() {
                        e.domEl.setAttribute("style", e.styles.inline), e.config.complete(e.domEl), delete s.elems[t]
                    }, e.styles.duration)
                }
                var i, n, o;
                for (i in s.elems) s.elems.hasOwnProperty(i) && (n = s.elems[i], o = s.isElemInViewport(n), o ? ("always" === s.config.delay || "onload" === s.config.delay && t || "once" === s.config.delay && !n.seen ? n.domEl.setAttribute("style", n.styles.inline + n.styles.target + n.styles.transition) : n.domEl.setAttribute("style", n.styles.inline + n.styles.target + n.styles.reset), n.seen = !0, n.config.reset || n.animating || (n.animating = !0, e(i))) : !o && n.config.reset && n.domEl.setAttribute("style", n.styles.inline + n.styles.initial + n.styles.reset));
                s.blocked = !1
            },
            configFactory: function(t) {
                var e = {},
                    i = {},
                    o = t.domEl.getAttribute("data-sr").split(/[, ]+/);
                return o.forEach(function(t, i) {
                    switch (t) {
                        case "enter":
                            e.enter = o[i + 1];
                            break;
                        case "wait":
                            e.wait = o[i + 1];
                            break;
                        case "move":
                            e.move = o[i + 1];
                            break;
                        case "ease":
                            e.move = o[i + 1], e.ease = "ease";
                            break;
                        case "ease-in":
                            if ("up" == o[i + 1] || "down" == o[i + 1]) {
                                e.scale.direction = o[i + 1], e.scale.power = o[i + 2], e.easing = "ease-in";
                                break
                            }
                            e.move = o[i + 1], e.easing = "ease-in";
                            break;
                        case "ease-in-out":
                            if ("up" == o[i + 1] || "down" == o[i + 1]) {
                                e.scale.direction = o[i + 1], e.scale.power = o[i + 2], e.easing = "ease-in-out";
                                break
                            }
                            e.move = o[i + 1], e.easing = "ease-in-out";
                            break;
                        case "ease-out":
                            if ("up" == o[i + 1] || "down" == o[i + 1]) {
                                e.scale.direction = o[i + 1], e.scale.power = o[i + 2], e.easing = "ease-out";
                                break
                            }
                            e.move = o[i + 1], e.easing = "ease-out";
                            break;
                        case "hustle":
                            if ("up" == o[i + 1] || "down" == o[i + 1]) {
                                e.scale.direction = o[i + 1], e.scale.power = o[i + 2], e.easing = "cubic-bezier( 0.6, 0.2, 0.1, 1 )";
                                break
                            }
                            e.move = o[i + 1], e.easing = "cubic-bezier( 0.6, 0.2, 0.1, 1 )";
                            break;
                        case "over":
                            e.over = o[i + 1];
                            break;
                        case "flip":
                        case "pitch":
                            e.rotate = e.rotate || {}, e.rotate.x = o[i + 1];
                            break;
                        case "spin":
                        case "yaw":
                            e.rotate = e.rotate || {}, e.rotate.y = o[i + 1];
                            break;
                        case "roll":
                            e.rotate = e.rotate || {}, e.rotate.z = o[i + 1];
                            break;
                        case "reset":
                            "no" == o[i - 1] ? e.reset = !1 : e.reset = !0;
                            break;
                        case "scale":
                            if (e.scale = {}, "up" == o[i + 1] || "down" == o[i + 1]) {
                                e.scale.direction = o[i + 1], e.scale.power = o[i + 2];
                                break
                            }
                            e.scale.power = o[i + 1];
                            break;
                        case "vFactor":
                        case "vF":
                            e.vFactor = o[i + 1];
                            break;
                        case "opacity":
                            e.opacity = o[i + 1];
                            break;
                        default:
                            return
                    }
                }), i = n(i, s.config), i = n(i, e), "top" === i.enter || "bottom" === i.enter ? i.axis = "Y" : "left" !== i.enter && "right" !== i.enter || (i.axis = "X"), "top" !== i.enter && "left" !== i.enter || (i.move = "-" + i.move), i
            },
            styleFactory: function(t) {
                function e() {
                    0 !== parseInt(a.move) && (n += " translate" + a.axis + "(" + a.move + ")", s += " translate" + a.axis + "(0)"), 0 !== parseInt(a.scale.power) && ("up" === a.scale.direction ? a.scale.value = 1 - .01 * parseFloat(a.scale.power) : "down" === a.scale.direction && (a.scale.value = 1 + .01 * parseFloat(a.scale.power)), n += " scale(" + a.scale.value + ")", s += " scale(1)"), a.rotate.x && (n += " rotateX(" + a.rotate.x + ")", s += " rotateX(0)"), a.rotate.y && (n += " rotateY(" + a.rotate.y + ")", s += " rotateY(0)"), a.rotate.z && (n += " rotateZ(" + a.rotate.z + ")", s += " rotateZ(0)"), n += "; opacity: " + a.opacity + "; ", s += "; opacity: 1; "
                }
                var i, n, o, s, r, a = t.config,
                    l = 1e3 * (parseFloat(a.over) + parseFloat(a.wait));
                return i = t.domEl.getAttribute("style") ? t.domEl.getAttribute("style") + "; visibility: visible; " : "visibility: visible; ", r = "-webkit-transition: -webkit-transform " + a.over + " " + a.easing + " " + a.wait + ", opacity " + a.over + " " + a.easing + " " + a.wait + "; transition: transform " + a.over + " " + a.easing + " " + a.wait + ", opacity " + a.over + " " + a.easing + " " + a.wait + "; -webkit-perspective: 1000;-webkit-backface-visibility: hidden;", o = "-webkit-transition: -webkit-transform " + a.over + " " + a.easing + " 0s, opacity " + a.over + " " + a.easing + " 0s; transition: transform " + a.over + " " + a.easing + " 0s, opacity " + a.over + " " + a.easing + " 0s; -webkit-perspective: 1000; -webkit-backface-visibility: hidden; ", n = "transform:", s = "transform:", e(), n += "-webkit-transform:", s += "-webkit-transform:", e(), {
                    transition: r,
                    initial: n,
                    target: s,
                    reset: o,
                    inline: i,
                    duration: l
                }
            },
            getViewportH: function() {
                var e = s.config.viewport.clientHeight,
                    i = t.innerHeight;
                return s.config.viewport === t.document.documentElement && i > e ? i : e
            },
            scrollY: function() {
                return s.config.viewport === t.document.documentElement ? t.pageYOffset : s.config.viewport.scrollTop + s.config.viewport.offsetTop
            },
            getOffset: function(t) {
                var e = 0,
                    i = 0;
                do isNaN(t.offsetTop) || (e += t.offsetTop), isNaN(t.offsetLeft) || (i += t.offsetLeft); while (t = t.offsetParent);
                return {
                    top: e,
                    left: i
                }
            },
            isElemInViewport: function(e) {
                function i() {
                    var t = r + o * l,
                        e = a - o * l,
                        i = s.scrolled + s.getViewportH(),
                        n = s.scrolled;
                    return i > t && e > n
                }

                function n() {
                    var i = e.domEl,
                        n = i.currentStyle || t.getComputedStyle(i, null);
                    return "fixed" === n.position
                }
                var o = e.domEl.offsetHeight,
                    r = s.getOffset(e.domEl).top,
                    a = r + o,
                    l = e.config.vFactor || 0;
                return i() || n()
            },
            isMobile: function() {
                var e = navigator.userAgent || navigator.vendor || t.opera;
                return !(!/(ipad|playbook|silk|android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(e) && !/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4)))
            },
            isSupported: function() {
                for (var t = document.createElement("sensor"), e = "Webkit,Moz,O,".split(","), i = ("transition " + e.join("transition,")).split(","), n = 0; n < i.length; n++)
                    if ("" === !t.style[i[n]]) return !1;
                return !0
            },
            destroy: function() {
                var t = s.config.viewport,
                    e = Array.prototype.slice.call(t.querySelectorAll("[data-sr]"));
                e.forEach(function(t) {
                    t.removeAttribute("data-sr")
                })
            }
        }, o = function(t) {
            s.blocked || (s.blocked = !0, s.scrolled = s.scrollY(), i(function() {
                s.animate()
            }))
        }, n = function(t, e) {
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            return t
        }, i = function() {
            return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || function(e) {
                t.setTimeout(e, 1e3 / 60)
            }
        }(), e
    }(window), ! function(t, e, i, n) {
        function o(e, i) {
            this.settings = null, this.options = t.extend({}, o.Defaults, i), this.$element = t(e), this.drag = t.extend({}, p), this.state = t.extend({}, d), this.e = t.extend({}, f), this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._invalidated = {}, this._pipe = [], t.each(o.Plugins, t.proxy(function(t, e) {
                this._plugins[t[0].toLowerCase() + t.slice(1)] = new e(this)
            }, this)), t.each(o.Pipe, t.proxy(function(e, i) {
                this._pipe.push({
                    filter: i.filter,
                    run: t.proxy(i.run, this)
                })
            }, this)), this.setup(), this.initialize()
        }

        function s(t) {
            if (t.touches !== n) return {
                x: t.touches[0].pageX,
                y: t.touches[0].pageY
            };
            if (t.touches === n) {
                if (t.pageX !== n) return {
                    x: t.pageX,
                    y: t.pageY
                };
                if (t.pageX === n) return {
                    x: t.clientX,
                    y: t.clientY
                }
            }
        }

        function r(t) {
            var e, n, o = i.createElement("div"),
                s = t;
            for (e in s)
                if (n = s[e], "undefined" != typeof o.style[n]) return o = null, [n, e];
            return [!1]
        }

        function a() {
            return r(["transition", "WebkitTransition", "MozTransition", "OTransition"])[1]
        }

        function l() {
            return r(["transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])[0]
        }

        function c() {
            return r(["perspective", "webkitPerspective", "MozPerspective", "OPerspective", "MsPerspective"])[0]
        }

        function u() {
            return "ontouchstart" in e || !!navigator.msMaxTouchPoints
        }

        function h() {
            return e.navigator.msPointerEnabled
        }
        var p, d, f;
        p = {
            start: 0,
            startX: 0,
            startY: 0,
            current: 0,
            currentX: 0,
            currentY: 0,
            offsetX: 0,
            offsetY: 0,
            distance: null,
            startTime: 0,
            endTime: 0,
            updatedX: 0,
            targetEl: null
        }, d = {
            isTouch: !1,
            isScrolling: !1,
            isSwiping: !1,
            direction: !1,
            inMotion: !1
        }, f = {
            _onDragStart: null,
            _onDragMove: null,
            _onDragEnd: null,
            _transitionEnd: null,
            _resizer: null,
            _responsiveCall: null,
            _goToLoop: null,
            _checkVisibile: null
        }, o.Defaults = {
            items: 3,
            loop: !1,
            center: !1,
            mouseDrag: !0,
            touchDrag: !0,
            pullDrag: !0,
            freeDrag: !1,
            margin: 0,
            stagePadding: 0,
            merge: !1,
            mergeFit: !0,
            autoWidth: !1,
            startPosition: 0,
            rtl: !1,
            smartSpeed: 250,
            fluidSpeed: !1,
            dragEndSpeed: !1,
            responsive: {},
            responsiveRefreshRate: 200,
            responsiveBaseElement: e,
            responsiveClass: !1,
            fallbackEasing: "swing",
            info: !1,
            nestedItemSelector: !1,
            itemElement: "div",
            stageElement: "div",
            themeClass: "owl-theme",
            baseClass: "owl-carousel",
            itemClass: "owl-item",
            centerClass: "center",
            activeClass: "active"
        }, o.Width = {
            Default: "default",
            Inner: "inner",
            Outer: "outer"
        }, o.Plugins = {}, o.Pipe = [{
            filter: ["width", "items", "settings"],
            run: function(t) {
                t.current = this._items && this._items[this.relative(this._current)]
            }
        }, {
            filter: ["items", "settings"],
            run: function() {
                var t = this._clones,
                    e = this.$stage.children(".cloned");
                (e.length !== t.length || !this.settings.loop && t.length > 0) && (this.$stage.children(".cloned").remove(), this._clones = [])
            }
        }, {
            filter: ["items", "settings"],
            run: function() {
                var t, e, i = this._clones,
                    n = this._items,
                    o = this.settings.loop ? i.length - Math.max(2 * this.settings.items, 4) : 0;
                for (t = 0, e = Math.abs(o / 2); e > t; t++) o > 0 ? (this.$stage.children().eq(n.length + i.length - 1).remove(), i.pop(), this.$stage.children().eq(0).remove(), i.pop()) : (i.push(i.length / 2), this.$stage.append(n[i[i.length - 1]].clone().addClass("cloned")), i.push(n.length - 1 - (i.length - 1) / 2), this.$stage.prepend(n[i[i.length - 1]].clone().addClass("cloned")))
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function() {
                var t, e, i, n = this.settings.rtl ? 1 : -1,
                    o = (this.width() / this.settings.items).toFixed(3),
                    s = 0;
                for (this._coordinates = [], e = 0, i = this._clones.length + this._items.length; i > e; e++) t = this._mergers[this.relative(e)], t = this.settings.mergeFit && Math.min(t, this.settings.items) || t, s += (this.settings.autoWidth ? this._items[this.relative(e)].width() + this.settings.margin : o * t) * n, this._coordinates.push(s)
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function() {
                var e, i, n = (this.width() / this.settings.items).toFixed(3),
                    o = {
                        width: Math.abs(this._coordinates[this._coordinates.length - 1]) + 2 * this.settings.stagePadding,
                        "padding-left": this.settings.stagePadding || "",
                        "padding-right": this.settings.stagePadding || ""
                    };
                if (this.$stage.css(o), o = {
                        width: this.settings.autoWidth ? "auto" : n - this.settings.margin
                    }, o[this.settings.rtl ? "margin-left" : "margin-right"] = this.settings.margin, !this.settings.autoWidth && t.grep(this._mergers, function(t) {
                        return t > 1
                    }).length > 0)
                    for (e = 0, i = this._coordinates.length; i > e; e++) o.width = Math.abs(this._coordinates[e]) - Math.abs(this._coordinates[e - 1] || 0) - this.settings.margin, this.$stage.children().eq(e).css(o);
                else this.$stage.children().css(o)
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function(t) {
                t.current && this.reset(this.$stage.children().index(t.current))
            }
        }, {
            filter: ["position"],
            run: function() {
                this.animate(this.coordinates(this._current))
            }
        }, {
            filter: ["width", "position", "items", "settings"],
            run: function() {
                var t, e, i, n, o = this.settings.rtl ? 1 : -1,
                    s = 2 * this.settings.stagePadding,
                    r = this.coordinates(this.current()) + s,
                    a = r + this.width() * o,
                    l = [];
                for (i = 0, n = this._coordinates.length; n > i; i++) t = this._coordinates[i - 1] || 0, e = Math.abs(this._coordinates[i]) + s * o, (this.op(t, "<=", r) && this.op(t, ">", a) || this.op(e, "<", r) && this.op(e, ">", a)) && l.push(i);
                this.$stage.children("." + this.settings.activeClass).removeClass(this.settings.activeClass), this.$stage.children(":eq(" + l.join("), :eq(") + ")").addClass(this.settings.activeClass), this.settings.center && (this.$stage.children("." + this.settings.centerClass).removeClass(this.settings.centerClass), this.$stage.children().eq(this.current()).addClass(this.settings.centerClass))
            }
        }], o.prototype.initialize = function() {
            if (this.trigger("initialize"), this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl", this.settings.rtl), this.browserSupport(), this.settings.autoWidth && this.state.imagesLoaded !== !0) {
                var e, i, o;
                if (e = this.$element.find("img"), i = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : n, o = this.$element.children(i).width(), e.length && 0 >= o) return this.preloadAutoWidthImages(e), !1
            }
            this.$element.addClass("owl-loading"), this.$stage = t("<" + this.settings.stageElement + ' class="owl-stage"/>').wrap('<div class="owl-stage-outer">'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this._width = this.$element.width(), this.refresh(), this.$element.removeClass("owl-loading").addClass("owl-loaded"), this.eventsCall(), this.internalEvents(), this.addTriggerableEvents(), this.trigger("initialized")
        }, o.prototype.setup = function() {
            var e = this.viewport(),
                i = this.options.responsive,
                n = -1,
                o = null;
            i ? (t.each(i, function(t) {
                e >= t && t > n && (n = Number(t))
            }), o = t.extend({}, this.options, i[n]), delete o.responsive, o.responsiveClass && this.$element.attr("class", function(t, e) {
                return e.replace(/\b owl-responsive-\S+/g, "")
            }).addClass("owl-responsive-" + n)) : o = t.extend({}, this.options), (null === this.settings || this._breakpoint !== n) && (this.trigger("change", {
                property: {
                    name: "settings",
                    value: o
                }
            }), this._breakpoint = n, this.settings = o, this.invalidate("settings"), this.trigger("changed", {
                property: {
                    name: "settings",
                    value: this.settings
                }
            }))
        }, o.prototype.optionsLogic = function() {
            this.$element.toggleClass("owl-center", this.settings.center), this.settings.loop && this._items.length < this.settings.items && (this.settings.loop = !1), this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
        }, o.prototype.prepare = function(e) {
            var i = this.trigger("prepare", {
                content: e
            });
            return i.data || (i.data = t("<" + this.settings.itemElement + "/>").addClass(this.settings.itemClass).append(e)), this.trigger("prepared", {
                content: i.data
            }), i.data
        }, o.prototype.update = function() {
            for (var e = 0, i = this._pipe.length, n = t.proxy(function(t) {
                    return this[t]
                }, this._invalidated), o = {}; i > e;)(this._invalidated.all || t.grep(this._pipe[e].filter, n).length > 0) && this._pipe[e].run(o), e++;
            this._invalidated = {}
        }, o.prototype.width = function(t) {
            switch (t = t || o.Width.Default) {
                case o.Width.Inner:
                case o.Width.Outer:
                    return this._width;
                default:
                    return this._width - 2 * this.settings.stagePadding + this.settings.margin
            }
        }, o.prototype.refresh = function() {
            return 0 === this._items.length ? !1 : ((new Date).getTime(), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$stage.addClass("owl-refresh"), this.update(), this.$stage.removeClass("owl-refresh"), this.state.orientation = e.orientation, this.watchVisibility(), this.trigger("refreshed"), void 0)
        }, o.prototype.eventsCall = function() {
            this.e._onDragStart = t.proxy(function(t) {
                this.onDragStart(t)
            }, this), this.e._onDragMove = t.proxy(function(t) {
                this.onDragMove(t)
            }, this), this.e._onDragEnd = t.proxy(function(t) {
                this.onDragEnd(t)
            }, this), this.e._onResize = t.proxy(function(t) {
                this.onResize(t)
            }, this), this.e._transitionEnd = t.proxy(function(t) {
                this.transitionEnd(t)
            }, this), this.e._preventClick = t.proxy(function(t) {
                this.preventClick(t)
            }, this)
        }, o.prototype.onThrottledResize = function() {
            e.clearTimeout(this.resizeTimer), this.resizeTimer = e.setTimeout(this.e._onResize, this.settings.responsiveRefreshRate)
        }, o.prototype.onResize = function() {
            return this._items.length ? this._width === this.$element.width() ? !1 : this.trigger("resize").isDefaultPrevented() ? !1 : (this._width = this.$element.width(), this.invalidate("width"), this.refresh(), void this.trigger("resized")) : !1
        }, o.prototype.eventsRouter = function(t) {
            var e = t.type;
            "mousedown" === e || "touchstart" === e ? this.onDragStart(t) : "mousemove" === e || "touchmove" === e ? this.onDragMove(t) : "mouseup" === e || "touchend" === e ? this.onDragEnd(t) : "touchcancel" === e && this.onDragEnd(t)
        }, o.prototype.internalEvents = function() {
            var i = (u(), h());
            this.settings.mouseDrag ? (this.$stage.on("mousedown", t.proxy(function(t) {
                this.eventsRouter(t)
            }, this)), this.$stage.on("dragstart", function() {
                return !1
            }), this.$stage.get(0).onselectstart = function() {
                return !1
            }) : this.$element.addClass("owl-text-select-on"), this.settings.touchDrag && !i && this.$stage.on("touchstart touchcancel", t.proxy(function(t) {
                this.eventsRouter(t)
            }, this)), this.transitionEndVendor && this.on(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd, !1), this.settings.responsive !== !1 && this.on(e, "resize", t.proxy(this.onThrottledResize, this))
        }, o.prototype.onDragStart = function(n) {
            var o, r, a, l;
            if (o = n.originalEvent || n || e.event, 3 === o.which || this.state.isTouch) return !1;
            if ("mousedown" === o.type && this.$stage.addClass("owl-grab"), this.trigger("drag"), this.drag.startTime = (new Date).getTime(), this.speed(0), this.state.isTouch = !0, this.state.isScrolling = !1, this.state.isSwiping = !1, this.drag.distance = 0, r = s(o).x, a = s(o).y, this.drag.offsetX = this.$stage.position().left, this.drag.offsetY = this.$stage.position().top, this.settings.rtl && (this.drag.offsetX = this.$stage.position().left + this.$stage.width() - this.width() + this.settings.margin), this.state.inMotion && this.support3d) l = this.getTransformProperty(), this.drag.offsetX = l, this.animate(l), this.state.inMotion = !0;
            else if (this.state.inMotion && !this.support3d) return this.state.inMotion = !1, !1;
            this.drag.startX = r - this.drag.offsetX, this.drag.startY = a - this.drag.offsetY, this.drag.start = r - this.drag.startX, this.drag.targetEl = o.target || o.srcElement, this.drag.updatedX = this.drag.start, ("IMG" === this.drag.targetEl.tagName || "A" === this.drag.targetEl.tagName) && (this.drag.targetEl.draggable = !1), t(i).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents", t.proxy(function(t) {
                this.eventsRouter(t)
            }, this))
        }, o.prototype.onDragMove = function(t) {
            var i, o, r, a, l, c;
            this.state.isTouch && (this.state.isScrolling || (i = t.originalEvent || t || e.event, o = s(i).x, r = s(i).y, this.drag.currentX = o - this.drag.startX, this.drag.currentY = r - this.drag.startY, this.drag.distance = this.drag.currentX - this.drag.offsetX, this.drag.distance < 0 ? this.state.direction = this.settings.rtl ? "right" : "left" : this.drag.distance > 0 && (this.state.direction = this.settings.rtl ? "left" : "right"), this.settings.loop ? this.op(this.drag.currentX, ">", this.coordinates(this.minimum())) && "right" === this.state.direction ? this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length) : this.op(this.drag.currentX, "<", this.coordinates(this.maximum())) && "left" === this.state.direction && (this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length)) : (a = this.coordinates(this.settings.rtl ? this.maximum() : this.minimum()), l = this.coordinates(this.settings.rtl ? this.minimum() : this.maximum()), c = this.settings.pullDrag ? this.drag.distance / 5 : 0, this.drag.currentX = Math.max(Math.min(this.drag.currentX, a + c), l + c)), (this.drag.distance > 8 || this.drag.distance < -8) && (i.preventDefault !== n ? i.preventDefault() : i.returnValue = !1, this.state.isSwiping = !0), this.drag.updatedX = this.drag.currentX, (this.drag.currentY > 16 || this.drag.currentY < -16) && this.state.isSwiping === !1 && (this.state.isScrolling = !0, this.drag.updatedX = this.drag.start), this.animate(this.drag.updatedX)))
        }, o.prototype.onDragEnd = function(e) {
            var n, o, s;
            if (this.state.isTouch) {
                if ("mouseup" === e.type && this.$stage.removeClass("owl-grab"), this.trigger("dragged"), this.drag.targetEl.removeAttribute("draggable"), this.state.isTouch = !1, this.state.isScrolling = !1, this.state.isSwiping = !1, 0 === this.drag.distance && this.state.inMotion !== !0) return this.state.inMotion = !1, !1;
                this.drag.endTime = (new Date).getTime(), n = this.drag.endTime - this.drag.startTime, o = Math.abs(this.drag.distance), (o > 3 || n > 300) && this.removeClick(this.drag.targetEl), s = this.closest(this.drag.updatedX), this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(s), this.invalidate("position"), this.update(), this.settings.pullDrag || this.drag.updatedX !== this.coordinates(s) || this.transitionEnd(), this.drag.distance = 0, t(i).off(".owl.dragEvents")
            }
        }, o.prototype.removeClick = function(i) {
            this.drag.targetEl = i, t(i).on("click.preventClick", this.e._preventClick), e.setTimeout(function() {
                t(i).off("click.preventClick")
            }, 300)
        }, o.prototype.preventClick = function(e) {
            e.preventDefault ? e.preventDefault() : e.returnValue = !1, e.stopPropagation && e.stopPropagation(), t(e.target).off("click.preventClick")
        }, o.prototype.getTransformProperty = function() {
            var t, i;
            return t = e.getComputedStyle(this.$stage.get(0), null).getPropertyValue(this.vendorName + "transform"), t = t.replace(/matrix(3d)?\(|\)/g, "").split(","), i = 16 === t.length, i !== !0 ? t[4] : t[12]
        }, o.prototype.closest = function(e) {
            var i = -1,
                n = 30,
                o = this.width(),
                s = this.coordinates();
            return this.settings.freeDrag || t.each(s, t.proxy(function(t, r) {
                return e > r - n && r + n > e ? i = t : this.op(e, "<", r) && this.op(e, ">", s[t + 1] || r - o) && (i = "left" === this.state.direction ? t + 1 : t), -1 === i
            }, this)), this.settings.loop || (this.op(e, ">", s[this.minimum()]) ? i = e = this.minimum() : this.op(e, "<", s[this.maximum()]) && (i = e = this.maximum())), i
        }, o.prototype.animate = function(e) {
            this.trigger("translate"), this.state.inMotion = this.speed() > 0, this.support3d ? this.$stage.css({
                transform: "translate3d(" + e + "px,0px, 0px)",
                transition: this.speed() / 1e3 + "s"
            }) : this.state.isTouch ? this.$stage.css({
                left: e + "px"
            }) : this.$stage.animate({
                left: e
            }, this.speed() / 1e3, this.settings.fallbackEasing, t.proxy(function() {
                this.state.inMotion && this.transitionEnd()
            }, this))
        }, o.prototype.current = function(t) {
            if (t === n) return this._current;
            if (0 === this._items.length) return n;
            if (t = this.normalize(t), this._current !== t) {
                var e = this.trigger("change", {
                    property: {
                        name: "position",
                        value: t
                    }
                });
                e.data !== n && (t = this.normalize(e.data)), this._current = t, this.invalidate("position"), this.trigger("changed", {
                    property: {
                        name: "position",
                        value: this._current
                    }
                })
            }
            return this._current
        }, o.prototype.invalidate = function(t) {
            this._invalidated[t] = !0
        }, o.prototype.reset = function(t) {
            t = this.normalize(t), t !== n && (this._speed = 0, this._current = t, this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]))
        }, o.prototype.normalize = function(e, i) {
            var o = i ? this._items.length : this._items.length + this._clones.length;
            return !t.isNumeric(e) || 1 > o ? n : e = this._clones.length ? (e % o + o) % o : Math.max(this.minimum(i), Math.min(this.maximum(i), e))
        }, o.prototype.relative = function(t) {
            return t = this.normalize(t), t -= this._clones.length / 2, this.normalize(t, !0)
        }, o.prototype.maximum = function(t) {
            var e, i, n, o = 0,
                s = this.settings;
            if (t) return this._items.length - 1;
            if (!s.loop && s.center) e = this._items.length - 1;
            else if (s.loop || s.center)
                if (s.loop || s.center) e = this._items.length + s.items;
                else {
                    if (!s.autoWidth && !s.merge) throw "Can not detect maximum absolute position.";
                    for (revert = s.rtl ? 1 : -1, i = this.$stage.width() - this.$element.width();
                        (n = this.coordinates(o)) && !(n * revert >= i);) e = ++o
                }
            else e = this._items.length - s.items;
            return e
        }, o.prototype.minimum = function(t) {
            return t ? 0 : this._clones.length / 2
        }, o.prototype.items = function(t) {
            return t === n ? this._items.slice() : (t = this.normalize(t, !0), this._items[t])
        }, o.prototype.mergers = function(t) {
            return t === n ? this._mergers.slice() : (t = this.normalize(t, !0), this._mergers[t])
        }, o.prototype.clones = function(e) {
            var i = this._clones.length / 2,
                o = i + this._items.length,
                s = function(t) {
                    return t % 2 === 0 ? o + t / 2 : i - (t + 1) / 2
                };
            return e === n ? t.map(this._clones, function(t, e) {
                return s(e)
            }) : t.map(this._clones, function(t, i) {
                return t === e ? s(i) : null
            })
        }, o.prototype.speed = function(t) {
            return t !== n && (this._speed = t), this._speed
        }, o.prototype.coordinates = function(e) {
            var i = null;
            return e === n ? t.map(this._coordinates, t.proxy(function(t, e) {
                return this.coordinates(e)
            }, this)) : (this.settings.center ? (i = this._coordinates[e], i += (this.width() - i + (this._coordinates[e - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)) : i = this._coordinates[e - 1] || 0, i)
        }, o.prototype.duration = function(t, e, i) {
            return Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed)
        }, o.prototype.to = function(i, n) {
            if (this.settings.loop) {
                var o = i - this.relative(this.current()),
                    s = this.current(),
                    r = this.current(),
                    a = this.current() + o,
                    l = 0 > r - a,
                    c = this._clones.length + this._items.length;
                a < this.settings.items && l === !1 ? (s = r + this._items.length, this.reset(s)) : a >= c - this.settings.items && l === !0 && (s = r - this._items.length, this.reset(s)), e.clearTimeout(this.e._goToLoop), this.e._goToLoop = e.setTimeout(t.proxy(function() {
                    this.speed(this.duration(this.current(), s + o, n)), this.current(s + o), this.update()
                }, this), 30)
            } else this.speed(this.duration(this.current(), i, n)), this.current(i), this.update()
        }, o.prototype.next = function(t) {
            t = t || !1, this.to(this.relative(this.current()) + 1, t)
        }, o.prototype.prev = function(t) {
            t = t || !1, this.to(this.relative(this.current()) - 1, t)
        }, o.prototype.transitionEnd = function(t) {
            return t !== n && (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) !== this.$stage.get(0)) ? !1 : (this.state.inMotion = !1, void this.trigger("translated"))
        }, o.prototype.viewport = function() {
            var n;
            if (this.options.responsiveBaseElement !== e) n = t(this.options.responsiveBaseElement).width();
            else if (e.innerWidth) n = e.innerWidth;
            else {
                if (!i.documentElement || !i.documentElement.clientWidth) throw "Can not detect viewport width.";
                n = i.documentElement.clientWidth
            }
            return n
        }, o.prototype.replace = function(e) {
            this.$stage.empty(), this._items = [], e && (e = e instanceof jQuery ? e : t(e)), this.settings.nestedItemSelector && (e = e.find("." + this.settings.nestedItemSelector)), e.filter(function() {
                return 1 === this.nodeType
            }).each(t.proxy(function(t, e) {
                e = this.prepare(e), this.$stage.append(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)
            }, this)), this.reset(t.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
        }, o.prototype.add = function(t, e) {
            e = e === n ? this._items.length : this.normalize(e, !0), this.trigger("add", {
                content: t,
                position: e
            }), 0 === this._items.length || e === this._items.length ? (this.$stage.append(t), this._items.push(t), this._mergers.push(1 * t.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)) : (this._items[e].before(t), this._items.splice(e, 0, t), this._mergers.splice(e, 0, 1 * t.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)), this.invalidate("items"), this.trigger("added", {
                content: t,
                position: e
            })
        }, o.prototype.remove = function(t) {
            t = this.normalize(t, !0), t !== n && (this.trigger("remove", {
                content: this._items[t],
                position: t
            }), this._items[t].remove(), this._items.splice(t, 1), this._mergers.splice(t, 1), this.invalidate("items"), this.trigger("removed", {
                content: null,
                position: t
            }))
        }, o.prototype.addTriggerableEvents = function() {
            var e = t.proxy(function(e, i) {
                return t.proxy(function(t) {
                    t.relatedTarget !== this && (this.suppress([i]), e.apply(this, [].slice.call(arguments, 1)), this.release([i]))
                }, this)
            }, this);
            t.each({
                next: this.next,
                prev: this.prev,
                to: this.to,
                destroy: this.destroy,
                refresh: this.refresh,
                replace: this.replace,
                add: this.add,
                remove: this.remove
            }, t.proxy(function(t, i) {
                this.$element.on(t + ".owl.carousel", e(i, t + ".owl.carousel"))
            }, this))
        }, o.prototype.watchVisibility = function() {
            function i(t) {
                return t.offsetWidth > 0 && t.offsetHeight > 0
            }

            function n() {
                i(this.$element.get(0)) && (this.$element.removeClass("owl-hidden"), this.refresh(), e.clearInterval(this.e._checkVisibile))
            }
            i(this.$element.get(0)) || (this.$element.addClass("owl-hidden"), e.clearInterval(this.e._checkVisibile), this.e._checkVisibile = e.setInterval(t.proxy(n, this), 500))
        }, o.prototype.preloadAutoWidthImages = function(e) {
            var i, n, o, s;
            i = 0, n = this, e.each(function(r, a) {
                o = t(a), s = new Image, s.onload = function() {
                    i++, o.attr("src", s.src), o.css("opacity", 1), i >= e.length && (n.state.imagesLoaded = !0, n.initialize())
                }, s.src = o.attr("src") || o.attr("data-src") || o.attr("data-src-retina")
            })
        }, o.prototype.destroy = function() {
            this.$element.hasClass(this.settings.themeClass) && this.$element.removeClass(this.settings.themeClass), this.settings.responsive !== !1 && t(e).off("resize.owl.carousel"), this.transitionEndVendor && this.off(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd);
            for (var n in this._plugins) this._plugins[n].destroy();
            (this.settings.mouseDrag || this.settings.touchDrag) && (this.$stage.off("mousedown touchstart touchcancel"), t(i).off(".owl.dragEvents"), this.$stage.get(0).onselectstart = function() {}, this.$stage.off("dragstart", function() {
                return !1
            })), this.$element.off(".owl"), this.$stage.children(".cloned").remove(), this.e = null, this.$element.removeData("owlCarousel"), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.unwrap()
        }, o.prototype.op = function(t, e, i) {
            var n = this.settings.rtl;
            switch (e) {
                case "<":
                    return n ? t > i : i > t;
                case ">":
                    return n ? i > t : t > i;
                case ">=":
                    return n ? i >= t : t >= i;
                case "<=":
                    return n ? t >= i : i >= t
            }
        }, o.prototype.on = function(t, e, i, n) {
            t.addEventListener ? t.addEventListener(e, i, n) : t.attachEvent && t.attachEvent("on" + e, i)
        }, o.prototype.off = function(t, e, i, n) {
            t.removeEventListener ? t.removeEventListener(e, i, n) : t.detachEvent && t.detachEvent("on" + e, i)
        }, o.prototype.trigger = function(e, i, n) {
            var o = {
                    item: {
                        count: this._items.length,
                        index: this.current()
                    }
                },
                s = t.camelCase(t.grep(["on", e, n], function(t) {
                    return t
                }).join("-").toLowerCase()),
                r = t.Event([e, "owl", n || "carousel"].join(".").toLowerCase(), t.extend({
                    relatedTarget: this
                }, o, i));
            return this._supress[e] || (t.each(this._plugins, function(t, e) {
                e.onTrigger && e.onTrigger(r)
            }), this.$element.trigger(r), this.settings && "function" == typeof this.settings[s] && this.settings[s].apply(this, r)), r
        }, o.prototype.suppress = function(e) {
            t.each(e, t.proxy(function(t, e) {
                this._supress[e] = !0
            }, this))
        }, o.prototype.release = function(e) {
            t.each(e, t.proxy(function(t, e) {
                delete this._supress[e]
            }, this))
        }, o.prototype.browserSupport = function() {
            if (this.support3d = c(), this.support3d) {
                this.transformVendor = l();
                var t = ["transitionend", "webkitTransitionEnd", "transitionend", "oTransitionEnd"];
                this.transitionEndVendor = t[a()], this.vendorName = this.transformVendor.replace(/Transform/i, ""), this.vendorName = "" !== this.vendorName ? "-" + this.vendorName.toLowerCase() + "-" : ""
            }
            this.state.orientation = e.orientation
        }, t.fn.owlCarousel = function(e) {
            return this.each(function() {
                t(this).data("owlCarousel") || t(this).data("owlCarousel", new o(this, e))
            })
        }, t.fn.owlCarousel.Constructor = o
    }(window.Zepto || window.jQuery, window, document),
    function(t, e) {
        var i = function(e) {
            this._core = e, this._loaded = [], this._handlers = {
                "initialized.owl.carousel change.owl.carousel": t.proxy(function(e) {
                    if (e.namespace && this._core.settings && this._core.settings.lazyLoad && (e.property && "position" == e.property.name || "initialized" == e.type))
                        for (var i = this._core.settings, n = i.center && Math.ceil(i.items / 2) || i.items, o = i.center && -1 * n || 0, s = (e.property && e.property.value || this._core.current()) + o, r = this._core.clones().length, a = t.proxy(function(t, e) {
                                this.load(e)
                            }, this); o++ < n;) this.load(r / 2 + this._core.relative(s)), r && t.each(this._core.clones(this._core.relative(s++)), a)
                }, this)
            }, this._core.options = t.extend({}, i.Defaults, this._core.options), this._core.$element.on(this._handlers)
        };
        i.Defaults = {
            lazyLoad: !1
        }, i.prototype.load = function(i) {
            var n = this._core.$stage.children().eq(i),
                o = n && n.find(".owl-lazy");
            !o || t.inArray(n.get(0), this._loaded) > -1 || (o.each(t.proxy(function(i, n) {
                var o, s = t(n),
                    r = e.devicePixelRatio > 1 && s.attr("data-src-retina") || s.attr("data-src");
                this._core.trigger("load", {
                    element: s,
                    url: r
                }, "lazy"), s.is("img") ? s.one("load.owl.lazy", t.proxy(function() {
                    s.css("opacity", 1), this._core.trigger("loaded", {
                        element: s,
                        url: r
                    }, "lazy")
                }, this)).attr("src", r) : (o = new Image, o.onload = t.proxy(function() {
                    s.css({
                        "background-image": "url(" + r + ")",
                        opacity: "1"
                    }), this._core.trigger("loaded", {
                        element: s,
                        url: r
                    }, "lazy")
                }, this), o.src = r)
            }, this)), this._loaded.push(n.get(0)))
        }, i.prototype.destroy = function() {
            var t, e;
            for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.Lazy = i
    }(window.Zepto || window.jQuery, window, document),
    function(t) {
        var e = function(i) {
            this._core = i, this._handlers = {
                "initialized.owl.carousel": t.proxy(function() {
                    this._core.settings.autoHeight && this.update()
                }, this),
                "changed.owl.carousel": t.proxy(function(t) {
                    this._core.settings.autoHeight && "position" == t.property.name && this.update()
                }, this),
                "loaded.owl.lazy": t.proxy(function(t) {
                    this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass) === this._core.$stage.children().eq(this._core.current()) && this.update()
                }, this)
            }, this._core.options = t.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
        };
        e.Defaults = {
            autoHeight: !1,
            autoHeightClass: "owl-height"
        }, e.prototype.update = function() {
            this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass)
        }, e.prototype.destroy = function() {
            var t, e;
            for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.AutoHeight = e
    }(window.Zepto || window.jQuery, window, document),
    function(t, e, i) {
        var n = function(e) {
            this._core = e, this._videos = {}, this._playing = null, this._fullscreen = !1, this._handlers = {
                "resize.owl.carousel": t.proxy(function(t) {
                    this._core.settings.video && !this.isInFullScreen() && t.preventDefault()
                }, this),
                "refresh.owl.carousel changed.owl.carousel": t.proxy(function() {
                    this._playing && this.stop()
                }, this),
                "prepared.owl.carousel": t.proxy(function(e) {
                    var i = t(e.content).find(".owl-video");
                    i.length && (i.css("display", "none"), this.fetch(i, t(e.content)))
                }, this)
            }, this._core.options = t.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", t.proxy(function(t) {
                this.play(t)
            }, this))
        };
        n.Defaults = {
            video: !1,
            videoHeight: !1,
            videoWidth: !1
        }, n.prototype.fetch = function(t, e) {
            var i = t.attr("data-vimeo-id") ? "vimeo" : "youtube",
                n = t.attr("data-vimeo-id") || t.attr("data-youtube-id"),
                o = t.attr("data-width") || this._core.settings.videoWidth,
                s = t.attr("data-height") || this._core.settings.videoHeight,
                r = t.attr("href");
            if (!r) throw new Error("Missing video URL.");
            if (n = r.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), n[3].indexOf("youtu") > -1) i = "youtube";
            else {
                if (!(n[3].indexOf("vimeo") > -1)) throw new Error("Video URL not supported.");
                i = "vimeo"
            }
            n = n[6], this._videos[r] = {
                type: i,
                id: n,
                width: o,
                height: s
            }, e.attr("data-video", r), this.thumbnail(t, this._videos[r])
        }, n.prototype.thumbnail = function(e, i) {
            var n, o, s, r = i.width && i.height ? 'style="width:' + i.width + "px;height:" + i.height + 'px;"' : "",
                a = e.find("img"),
                l = "src",
                c = "",
                u = this._core.settings,
                h = function(t) {
                    o = '<div class="owl-video-play-icon"></div>', n = u.lazyLoad ? '<div class="owl-video-tn ' + c + '" ' + l + '="' + t + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + t + ')"></div>', e.after(n), e.after(o)
                };
            return e.wrap('<div class="owl-video-wrapper"' + r + "></div>"), this._core.settings.lazyLoad && (l = "data-src", c = "owl-lazy"), a.length ? (h(a.attr(l)), a.remove(), !1) : void("youtube" === i.type ? (s = "http://img.youtube.com/vi/" + i.id + "/hqdefault.jpg", h(s)) : "vimeo" === i.type && t.ajax({
                type: "GET",
                url: "http://vimeo.com/api/v2/video/" + i.id + ".json",
                jsonp: "callback",
                dataType: "jsonp",
                success: function(t) {
                    s = t[0].thumbnail_large, h(s)
                }
            }))
        }, n.prototype.stop = function() {
            this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null
        }, n.prototype.play = function(e) {
            this._core.trigger("play", null, "video"), this._playing && this.stop();
            var i, n, o = t(e.target || e.srcElement),
                s = o.closest("." + this._core.settings.itemClass),
                r = this._videos[s.attr("data-video")],
                a = r.width || "100%",
                l = r.height || this._core.$stage.height();
            "youtube" === r.type ? i = '<iframe width="' + a + '" height="' + l + '" src="http://www.youtube.com/embed/' + r.id + "?autoplay=1&v=" + r.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === r.type && (i = '<iframe src="http://player.vimeo.com/video/' + r.id + '?autoplay=1" width="' + a + '" height="' + l + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'), s.addClass("owl-video-playing"), this._playing = s, n = t('<div style="height:' + l + "px; width:" + a + 'px" class="owl-video-frame">' + i + "</div>"), o.after(n)
        }, n.prototype.isInFullScreen = function() {
            var n = i.fullscreenElement || i.mozFullScreenElement || i.webkitFullscreenElement;
            return n && t(n).parent().hasClass("owl-video-frame") && (this._core.speed(0), this._fullscreen = !0), n && this._fullscreen && this._playing ? !1 : this._fullscreen ? (this._fullscreen = !1, !1) : this._playing && this._core.state.orientation !== e.orientation ? (this._core.state.orientation = e.orientation, !1) : !0
        }, n.prototype.destroy = function() {
            var t, e;
            this._core.$element.off("click.owl.video");
            for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.Video = n
    }(window.Zepto || window.jQuery, window, document),
    function(t, e, i, n) {
        var o = function(e) {
            this.core = e, this.core.options = t.extend({}, o.Defaults, this.core.options), this.swapping = !0, this.previous = n, this.next = n, this.handlers = {
                "change.owl.carousel": t.proxy(function(t) {
                    "position" == t.property.name && (this.previous = this.core.current(), this.next = t.property.value)
                }, this),
                "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": t.proxy(function(t) {
                    this.swapping = "translated" == t.type
                }, this),
                "translate.owl.carousel": t.proxy(function() {
                    this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
                }, this)
            }, this.core.$element.on(this.handlers)
        };
        o.Defaults = {
            animateOut: !1,
            animateIn: !1
        }, o.prototype.swap = function() {
            if (1 === this.core.settings.items && this.core.support3d) {
                this.core.speed(0);
                var e, i = t.proxy(this.clear, this),
                    n = this.core.$stage.children().eq(this.previous),
                    o = this.core.$stage.children().eq(this.next),
                    s = this.core.settings.animateIn,
                    r = this.core.settings.animateOut;
                this.core.current() !== this.previous && (r && (e = this.core.coordinates(this.previous) - this.core.coordinates(this.next), n.css({
                    left: e + "px"
                }).addClass("animated owl-animated-out").addClass(r).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", i)), s && o.addClass("animated owl-animated-in").addClass(s).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", i))
            }
        }, o.prototype.clear = function(e) {
            t(e.target).css({
                left: ""
            }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.transitionEnd()
        }, o.prototype.destroy = function() {
            var t, e;
            for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.Animate = o
    }(window.Zepto || window.jQuery, window, document),
    function(t, e, i) {
        var n = function(e) {
            this.core = e, this.core.options = t.extend({}, n.Defaults, this.core.options), this.handlers = {
                "translated.owl.carousel refreshed.owl.carousel": t.proxy(function() {
                    this.autoplay()
                }, this),
                "play.owl.autoplay": t.proxy(function(t, e, i) {
                    this.play(e, i)
                }, this),
                "stop.owl.autoplay": t.proxy(function() {
                    this.stop()
                }, this),
                "mouseover.owl.autoplay": t.proxy(function() {
                    this.core.settings.autoplayHoverPause && this.pause()
                }, this),
                "mouseleave.owl.autoplay": t.proxy(function() {
                    this.core.settings.autoplayHoverPause && this.autoplay()
                }, this)
            }, this.core.$element.on(this.handlers)
        };
        n.Defaults = {
            autoplay: !1,
            autoplayTimeout: 5e3,
            autoplayHoverPause: !1,
            autoplaySpeed: !1
        }, n.prototype.autoplay = function() {
            this.core.settings.autoplay && !this.core.state.videoPlay ? (e.clearInterval(this.interval), this.interval = e.setInterval(t.proxy(function() {
                this.play()
            }, this), this.core.settings.autoplayTimeout)) : e.clearInterval(this.interval)
        }, n.prototype.play = function() {
            return i.hidden === !0 || this.core.state.isTouch || this.core.state.isScrolling || this.core.state.isSwiping || this.core.state.inMotion ? void 0 : this.core.settings.autoplay === !1 ? void e.clearInterval(this.interval) : void this.core.next(this.core.settings.autoplaySpeed)
        }, n.prototype.stop = function() {
            e.clearInterval(this.interval)
        }, n.prototype.pause = function() {
            e.clearInterval(this.interval)
        }, n.prototype.destroy = function() {
            var t, i;
            e.clearInterval(this.interval);
            for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
            for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.autoplay = n
    }(window.Zepto || window.jQuery, window, document),
    function(t) {
        "use strict";
        var e = function(i) {
            this._core = i, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
                next: this._core.next,
                prev: this._core.prev,
                to: this._core.to
            }, this._handlers = {
                "prepared.owl.carousel": t.proxy(function(e) {
                    this._core.settings.dotsData && this._templates.push(t(e.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
                }, this),
                "add.owl.carousel": t.proxy(function(e) {
                    this._core.settings.dotsData && this._templates.splice(e.position, 0, t(e.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
                }, this),
                "remove.owl.carousel prepared.owl.carousel": t.proxy(function(t) {
                    this._core.settings.dotsData && this._templates.splice(t.position, 1)
                }, this),
                "change.owl.carousel": t.proxy(function(t) {
                    if ("position" == t.property.name && !this._core.state.revert && !this._core.settings.loop && this._core.settings.navRewind) {
                        var e = this._core.current(),
                            i = this._core.maximum(),
                            n = this._core.minimum();
                        t.data = t.property.value > i ? e >= i ? n : i : t.property.value < n ? i : t.property.value
                    }
                }, this),
                "changed.owl.carousel": t.proxy(function(t) {
                    "position" == t.property.name && this.draw()
                }, this),
                "refreshed.owl.carousel": t.proxy(function() {
                    this._initialized || (this.initialize(), this._initialized = !0), this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation")
                }, this)
            }, this._core.options = t.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers)
        };
        e.Defaults = {
            nav: !1,
            navRewind: !0,
            navText: ["prev", "next"],
            navSpeed: !1,
            navElement: "div",
            navContainer: !1,
            navContainerClass: "owl-nav",
            navClass: ["owl-prev", "owl-next"],
            slideBy: 1,
            dotClass: "owl-dot",
            dotsClass: "owl-dots",
            dots: !0,
            dotsEach: !1,
            dotData: !1,
            dotsSpeed: !1,
            dotsContainer: !1,
            controlsClass: "owl-controls"
        }, e.prototype.initialize = function() {
            var e, i, n = this._core.settings;
            n.dotsData || (this._templates = [t("<div>").addClass(n.dotClass).append(t("<span>")).prop("outerHTML")]), n.navContainer && n.dotsContainer || (this._controls.$container = t("<div>").addClass(n.controlsClass).appendTo(this.$element)), this._controls.$indicators = n.dotsContainer ? t(n.dotsContainer) : t("<div>").hide().addClass(n.dotsClass).appendTo(this._controls.$container), this._controls.$indicators.on("click", "div", t.proxy(function(e) {
                var i = t(e.target).parent().is(this._controls.$indicators) ? t(e.target).index() : t(e.target).parent().index();
                e.preventDefault(), this.to(i, n.dotsSpeed)
            }, this)), e = n.navContainer ? t(n.navContainer) : t("<div>").addClass(n.navContainerClass).prependTo(this._controls.$container), this._controls.$next = t("<" + n.navElement + ">"), this._controls.$previous = this._controls.$next.clone(), this._controls.$previous.addClass(n.navClass[0]).html(n.navText[0]).hide().prependTo(e).on("click", t.proxy(function() {
                this.prev(n.navSpeed)
            }, this)), this._controls.$next.addClass(n.navClass[1]).html(n.navText[1]).hide().appendTo(e).on("click", t.proxy(function() {
                this.next(n.navSpeed)
            }, this));
            for (i in this._overrides) this._core[i] = t.proxy(this[i], this)
        }, e.prototype.destroy = function() {
            var t, e, i, n;
            for (t in this._handlers) this.$element.off(t, this._handlers[t]);
            for (e in this._controls) this._controls[e].remove();
            for (n in this.overides) this._core[n] = this._overrides[n];
            for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
        }, e.prototype.update = function() {
            var t, e, i, n = this._core.settings,
                o = this._core.clones().length / 2,
                s = o + this._core.items().length,
                r = n.center || n.autoWidth || n.dotData ? 1 : n.dotsEach || n.items;
            if ("page" !== n.slideBy && (n.slideBy = Math.min(n.slideBy, n.items)), n.dots || "page" == n.slideBy)
                for (this._pages = [], t = o, e = 0, i = 0; s > t; t++)(e >= r || 0 === e) && (this._pages.push({
                    start: t - o,
                    end: t - o + r - 1
                }), e = 0, ++i), e += this._core.mergers(this._core.relative(t))
        }, e.prototype.draw = function() {
            var e, i, n = "",
                o = this._core.settings,
                s = (this._core.$stage.children(), this._core.relative(this._core.current()));
            if (!o.nav || o.loop || o.navRewind || (this._controls.$previous.toggleClass("disabled", 0 >= s), this._controls.$next.toggleClass("disabled", s >= this._core.maximum())), this._controls.$previous.toggle(o.nav), this._controls.$next.toggle(o.nav), o.dots) {
                if (e = this._pages.length - this._controls.$indicators.children().length, o.dotData && 0 !== e) {
                    for (i = 0; i < this._controls.$indicators.children().length; i++) n += this._templates[this._core.relative(i)];
                    this._controls.$indicators.html(n)
                } else e > 0 ? (n = new Array(e + 1).join(this._templates[0]), this._controls.$indicators.append(n)) : 0 > e && this._controls.$indicators.children().slice(e).remove();
                this._controls.$indicators.find(".active").removeClass("active"), this._controls.$indicators.children().eq(t.inArray(this.current(), this._pages)).addClass("active")
            }
            this._controls.$indicators.toggle(o.dots)
        }, e.prototype.onTrigger = function(e) {
            var i = this._core.settings;
            e.page = {
                index: t.inArray(this.current(), this._pages),
                count: this._pages.length,
                size: i && (i.center || i.autoWidth || i.dotData ? 1 : i.dotsEach || i.items)
            }
        }, e.prototype.current = function() {
            var e = this._core.relative(this._core.current());
            return t.grep(this._pages, function(t) {
                return t.start <= e && t.end >= e
            }).pop()
        }, e.prototype.getPosition = function(e) {
            var i, n, o = this._core.settings;
            return "page" == o.slideBy ? (i = t.inArray(this.current(), this._pages), n = this._pages.length, e ? ++i : --i, i = this._pages[(i % n + n) % n].start) : (i = this._core.relative(this._core.current()), n = this._core.items().length, e ? i += o.slideBy : i -= o.slideBy), i
        }, e.prototype.next = function(e) {
            t.proxy(this._overrides.to, this._core)(this.getPosition(!0), e)
        }, e.prototype.prev = function(e) {
            t.proxy(this._overrides.to, this._core)(this.getPosition(!1), e)
        }, e.prototype.to = function(e, i, n) {
            var o;
            n ? t.proxy(this._overrides.to, this._core)(e, i) : (o = this._pages.length, t.proxy(this._overrides.to, this._core)(this._pages[(e % o + o) % o].start, i))
        }, t.fn.owlCarousel.Constructor.Plugins.Navigation = e
    }(window.Zepto || window.jQuery, window, document),
    function(t, e) {
        "use strict";
        var i = function(n) {
            this._core = n, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
                "initialized.owl.carousel": t.proxy(function() {
                    "URLHash" == this._core.settings.startPosition && t(e).trigger("hashchange.owl.navigation")
                }, this),
                "prepared.owl.carousel": t.proxy(function(e) {
                    var i = t(e.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
                    this._hashes[i] = e.content
                }, this)
            }, this._core.options = t.extend({}, i.Defaults, this._core.options), this.$element.on(this._handlers), t(e).on("hashchange.owl.navigation", t.proxy(function() {
                var t = e.location.hash.substring(1),
                    i = this._core.$stage.children(),
                    n = this._hashes[t] && i.index(this._hashes[t]) || 0;
                return t ? void this._core.to(n, !1, !0) : !1
            }, this))
        };
        i.Defaults = {
            URLhashListener: !1
        }, i.prototype.destroy = function() {
            var i, n;
            t(e).off("hashchange.owl.navigation");
            for (i in this._handlers) this._core.$element.off(i, this._handlers[i]);
            for (n in Object.getOwnPropertyNames(this)) "function" != typeof this[n] && (this[n] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.Hash = i
    }(window.Zepto || window.jQuery, window, document), ! function() {
        function t() {}

        function e(t) {
            return s.retinaImageSuffix + t
        }

        function i(t, i) {
            if (this.path = t || "", "undefined" != typeof i && null !== i) this.at_2x_path = i, this.perform_check = !1;
            else {
                if (void 0 !== document.createElement) {
                    var n = document.createElement("a");
                    n.href = this.path, n.pathname = n.pathname.replace(r, e), this.at_2x_path = n.href
                } else {
                    var o = this.path.split("?");
                    o[0] = o[0].replace(r, e), this.at_2x_path = o.join("?")
                }
                this.perform_check = !0
            }
        }

        function n(t) {
            this.el = t, this.path = new i(this.el.getAttribute("src"), this.el.getAttribute("data-at2x"));
            var e = this;
            this.path.check_2x_variant(function(t) {
                t && e.swap()
            })
        }
        var o = "undefined" == typeof exports ? window : exports,
            s = {
                retinaImageSuffix: "",
                check_mime_type: !0,
                force_original_dimensions: !0
            };
        o.Retina = t, t.configure = function(t) {
            null === t && (t = {});
            for (var e in t) t.hasOwnProperty(e) && (s[e] = t[e])
        }, t.init = function(t) {
            null === t && (t = o);
            var e = t.onload || function() {};
            t.onload = function() {
                var t, i, o = document.getElementsByTagName("img"),
                    s = [];
                for (t = 0; t < o.length; t += 1) i = o[t], i.getAttributeNode("data-no-retina") || s.push(new n(i));
                e()
            }
        }, t.isRetina = function() {
            var t = "(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)";
            return o.devicePixelRatio > 1 ? !0 : !(!o.matchMedia || !o.matchMedia(t).matches)
        };
        var r = /\.\w+$/;
        o.RetinaImagePath = i, i.confirmed_paths = [], i.prototype.is_external = function() {
            return !(!this.path.match(/^https?\:/i) || this.path.match("//" + document.domain))
        }, i.prototype.check_2x_variant = function(t) {
            var e, n = this;
            return this.is_external() ? t(!1) : this.perform_check || "undefined" == typeof this.at_2x_path || null === this.at_2x_path ? this.at_2x_path in i.confirmed_paths ? t(!0) : (e = new XMLHttpRequest, e.open("HEAD", this.at_2x_path), e.onreadystatechange = function() {
                if (4 !== e.readyState) return t(!1);
                if (e.status >= 200 && e.status <= 399) {
                    if (s.check_mime_type) {
                        var o = e.getResponseHeader("Content-Type");
                        if (null === o || !o.match(/^image/i)) return t(!1)
                    }
                    return i.confirmed_paths.push(n.at_2x_path), t(!0)
                }
                return t(!1)
            }, void e.send()) : t(!0)
        }, o.RetinaImage = n, n.prototype.swap = function(t) {
            function e() {
                i.el.complete ? (s.force_original_dimensions && (i.el.setAttribute("width", i.el.offsetWidth), i.el.setAttribute("height", i.el.offsetHeight)), i.el.setAttribute("src", t)) : setTimeout(e, 5)
            }
            "undefined" == typeof t && (t = this.path.at_2x_path);
            var i = this;
            e()
        }, t.isRetina() && t.init(o)
    }(), ! function(t, e) {
        "function" == typeof define && define.amd ? define(["jquery"], function(i) {
            return e(t, i)
        }) : "object" == typeof exports ? e(t, require("jquery")) : e(t, t.jQuery || t.Zepto)
    }(this, function(t, e) {
        "use strict";

        function i(t) {
            if (x && "none" === t.css("animation-name") && "none" === t.css("-webkit-animation-name") && "none" === t.css("-moz-animation-name") && "none" === t.css("-o-animation-name") && "none" === t.css("-ms-animation-name")) return 0;
            var e, i, n, o, s = t.css("animation-duration") || t.css("-webkit-animation-duration") || t.css("-moz-animation-duration") || t.css("-o-animation-duration") || t.css("-ms-animation-duration") || "0s",
                r = t.css("animation-delay") || t.css("-webkit-animation-delay") || t.css("-moz-animation-delay") || t.css("-o-animation-delay") || t.css("-ms-animation-delay") || "0s",
                a = t.css("animation-iteration-count") || t.css("-webkit-animation-iteration-count") || t.css("-moz-animation-iteration-count") || t.css("-o-animation-iteration-count") || t.css("-ms-animation-iteration-count") || "1";
            for (s = s.split(", "), r = r.split(", "), a = a.split(", "), o = 0, i = s.length, e = Number.NEGATIVE_INFINITY; i > o; o++) n = parseFloat(s[o]) * parseInt(a[o], 10) + parseFloat(r[o]), n > e && (e = n);
            return n
        }

        function n() {
            if (e(document.body).height() <= e(window).height()) return 0;
            var t, i, n = document.createElement("div"),
                o = document.createElement("div");
            return n.style.visibility = "hidden", n.style.width = "100px", document.body.appendChild(n), t = n.offsetWidth, n.style.overflow = "scroll", o.style.width = "100%", n.appendChild(o), i = o.offsetWidth, n.parentNode.removeChild(n), t - i
        }

        function o() {
            var t, i, o = e("html"),
                s = u("is-locked");
            o.hasClass(s) || (i = e(document.body), t = parseInt(i.css("padding-right"), 10) + n(), i.css("padding-right", t + "px"), o.addClass(s))
        }

        function s() {
            var t, i, o = e("html"),
                s = u("is-locked");
            o.hasClass(s) && (i = e(document.body), t = parseInt(i.css("padding-right"), 10) - n(), i.css("padding-right", t + "px"), o.removeClass(s))
        }

        function r(t, e, i, n) {
            var o = u("is", e),
                s = [u("is", b.CLOSING), u("is", b.OPENING), u("is", b.CLOSED), u("is", b.OPENED)].join(" ");
            t.$bg.removeClass(s).addClass(o), t.$overlay.removeClass(s).addClass(o), t.$wrapper.removeClass(s).addClass(o), t.$modal.removeClass(s).addClass(o), t.state = e, !i && t.$modal.trigger({
                type: e,
                reason: n
            }, [{
                reason: n
            }])
        }

        function a(t, n, o) {
            var s = 0,
                r = function(t) {
                    t.target === this && s++
                },
                a = function(t) {
                    t.target === this && 0 === --s && (e.each(["$bg", "$overlay", "$wrapper", "$modal"], function(t, e) {
                        o[e].off(y + " " + v)
                    }), n())
                };
            e.each(["$bg", "$overlay", "$wrapper", "$modal"], function(t, e) {
                o[e].on(y, r).on(v, a)
            }), t(), 0 === i(o.$bg) && 0 === i(o.$overlay) && 0 === i(o.$wrapper) && 0 === i(o.$modal) && (e.each(["$bg", "$overlay", "$wrapper", "$modal"], function(t, e) {
                o[e].off(y + " " + v)
            }), n())
        }

        function l(t) {
            t.state !== b.CLOSED && (e.each(["$bg", "$overlay", "$wrapper", "$modal"], function(e, i) {
                t[i].off(y + " " + v)
            }), t.$bg.removeClass(t.settings.modifier), t.$overlay.removeClass(t.settings.modifier).hide(), t.$wrapper.hide(), s(), r(t, b.CLOSED, !0))
        }

        function c(t) {
            var e, i, n, o, s = {};
            for (t = t.replace(/\s*:\s*/g, ":").replace(/\s*,\s*/g, ","), e = t.split(","), o = 0, i = e.length; i > o; o++) e[o] = e[o].split(":"), n = e[o][1], ("string" == typeof n || n instanceof String) && (n = "true" === n || ("false" === n ? !1 : n)), ("string" == typeof n || n instanceof String) && (n = isNaN(n) ? n : +n), s[e[o][0]] = n;
            return s
        }

        function u() {
            for (var t = g, e = 0; e < arguments.length; ++e) t += "-" + arguments[e];
            return t
        }

        function h() {
            var t, i, n = location.hash.replace("#", "");
            if (n) {
                try {
                    i = e("[data-" + m + "-id=" + n.replace(new RegExp("/", "g"), "\\/") + "]")
                } catch (o) {}
                i && i.length && (t = e[m].lookup[i.data(m)], t && t.settings.hashTracking && t.open())
            } else d && d.state === b.OPENED && d.settings.hashTracking && d.close()
        }

        function p(t, i) {
            var n = e(document.body),
                o = this;
            o.settings = e.extend({}, w, i), o.index = e[m].lookup.push(o) - 1, o.state = b.CLOSED, o.$overlay = e("." + u("overlay")), o.$overlay.length || (o.$overlay = e("<div>").addClass(u("overlay") + " " + u("is", b.CLOSED)).hide(), n.append(o.$overlay)), o.$bg = e("." + u("bg")).addClass(u("is", b.CLOSED)), o.$modal = t, o.$modal.addClass(g + " " + u("is-initialized") + " " + o.settings.modifier + " " + u("is", b.CLOSED)), o.$wrapper = e("<div>").addClass(u("wrapper") + " " + o.settings.modifier + " " + u("is", b.CLOSED)).hide().append(o.$modal), n.append(o.$wrapper), o.$wrapper.on("click." + g, "[data-" + m + '-action="close"]', function(t) {
                t.preventDefault(), o.close()
            }), o.$wrapper.on("click." + g, "[data-" + m + '-action="cancel"]', function(t) {
                t.preventDefault(), o.$modal.trigger(_.CANCELLATION), o.settings.closeOnCancel && o.close(_.CANCELLATION)
            }), o.$wrapper.on("click." + g, "[data-" + m + '-action="confirm"]', function(t) {
                t.preventDefault(), o.$modal.trigger(_.CONFIRMATION), o.settings.closeOnConfirm && o.close(_.CONFIRMATION)
            }), o.$wrapper.on("click." + g, function(t) {
                var i = e(t.target);
                i.hasClass(u("wrapper")) && o.settings.closeOnOutsideClick && o.close()
            })
        }
        var d, f, m = "remodal",
            g = t.REMODAL_GLOBALS && t.REMODAL_GLOBALS.NAMESPACE || m,
            y = e.map(["animationstart", "webkitAnimationStart", "MSAnimationStart", "oAnimationStart"], function(t) {
                return t + "." + g
            }).join(" "),
            v = e.map(["animationend", "webkitAnimationEnd", "MSAnimationEnd", "oAnimationEnd"], function(t) {
                return t + "." + g
            }).join(" "),
            w = e.extend({
                hashTracking: !0,
                closeOnConfirm: !0,
                closeOnCancel: !0,
                closeOnEscape: !0,
                closeOnOutsideClick: !0,
                modifier: ""
            }, t.REMODAL_GLOBALS && t.REMODAL_GLOBALS.DEFAULTS),
            b = {
                CLOSING: "closing",
                CLOSED: "closed",
                OPENING: "opening",
                OPENED: "opened"
            },
            _ = {
                CONFIRMATION: "confirmation",
                CANCELLATION: "cancellation"
            },
            x = function() {
                var t = document.createElement("div").style;
                return void 0 !== t.animationName || void 0 !== t.WebkitAnimationName || void 0 !== t.MozAnimationName || void 0 !== t.msAnimationName || void 0 !== t.OAnimationName
            }();
        p.prototype.open = function() {
            var t, i = this;
            i.state !== b.OPENING && i.state !== b.CLOSING && (t = i.$modal.attr("data-" + m + "-id"), t && i.settings.hashTracking && (f = e(window).scrollTop(), location.hash = t), d && d !== i && l(d), d = i, o(), i.$bg.addClass(i.settings.modifier), i.$overlay.addClass(i.settings.modifier).show(), i.$wrapper.show().scrollTop(0), a(function() {
                r(i, b.OPENING)
            }, function() {
                r(i, b.OPENED)
            }, i))
        }, p.prototype.close = function(t) {
            var i = this;
            i.state !== b.OPENING && i.state !== b.CLOSING && (i.settings.hashTracking && i.$modal.attr("data-" + m + "-id") === location.hash.substr(1) && (location.hash = "", e(window).scrollTop(f)), a(function() {
                r(i, b.CLOSING, !1, t)
            }, function() {
                i.$bg.removeClass(i.settings.modifier), i.$overlay.removeClass(i.settings.modifier).hide(), i.$wrapper.hide(), s(), r(i, b.CLOSED, !1, t)
            }, i))
        }, p.prototype.getState = function() {
            return this.state
        }, p.prototype.destroy = function() {
            var t, i = e[m].lookup;
            l(this), this.$wrapper.remove(), delete i[this.index], t = e.grep(i, function(t) {
                return !!t
            }).length, 0 === t && (this.$overlay.remove(), this.$bg.removeClass(u("is", b.CLOSING) + " " + u("is", b.OPENING) + " " + u("is", b.CLOSED) + " " + u("is", b.OPENED)))
        }, e[m] = {
            lookup: []
        }, e.fn[m] = function(t) {
            var i, n;
            return this.each(function(o, s) {
                n = e(s), null == n.data(m) ? (i = new p(n, t), n.data(m, i.index), i.settings.hashTracking && n.attr("data-" + m + "-id") === location.hash.substr(1) && i.open()) : i = e[m].lookup[n.data(m)]
            }), i
        }, e(document).ready(function() {
            e(document).on("click", "[data-" + m + "-target]", function(t) {
                t.preventDefault();
                var i = t.currentTarget,
                    n = i.getAttribute("data-" + m + "-target"),
                    o = e("[data-" + m + "-id=" + n + "]");
                e[m].lookup[o.data(m)].open()
            }), e(document).find("." + g).each(function(t, i) {
                var n = e(i),
                    o = n.data(m + "-options");
                o ? ("string" == typeof o || o instanceof String) && (o = c(o)) : o = {}, n[m](o)
            }), e(document).on("keydown." + g, function(t) {
                d && d.settings.closeOnEscape && d.state === b.OPENED && 27 === t.keyCode && d.close()
            }), e(window).on("hashchange." + g, h)
        })
    }),
    function(t) {
        "use strict";

        function e(e) {
            return /In/.test(e) || t.inArray(e, t.fn.textillate.defaults.inEffects) >= 0
        }

        function i(e) {
            return /Out/.test(e) || t.inArray(e, t.fn.textillate.defaults.outEffects) >= 0
        }

        function n(t) {
            return "true" !== t && "false" !== t ? t : "true" === t
        }

        function o(e) {
            var i = e.attributes || [],
                o = {};
            return i.length ? (t.each(i, function(t, e) {
                var i = e.nodeName.replace(/delayscale/, "delayScale");
                /^data-in-*/.test(i) ? (o["in"] = o["in"] || {}, o["in"][i.replace(/data-in-/, "")] = n(e.nodeValue)) : /^data-out-*/.test(i) ? (o.out = o.out || {}, o.out[i.replace(/data-out-/, "")] = n(e.nodeValue)) : /^data-*/.test(i) && (o[i.replace(/data-/, "")] = n(e.nodeValue))
            }), o) : o
        }

        function s(t) {
            for (var e, i, n = t.length; n; e = parseInt(Math.random() * n), i = t[--n], t[n] = t[e], t[e] = i);
            return t
        }

        function r(t, e, i) {
            t.addClass("animated " + e).css("visibility", "visible").show(), t.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                t.removeClass("animated " + e), i && i()
            })
        }

        function a(n, o, a) {
            var l = n.length;
            return l ? (o.shuffle && (n = s(n)), o.reverse && (n = n.toArray().reverse()), void t.each(n, function(n, s) {
                function c() {
                    e(o.effect) ? u.css("visibility", "visible") : i(o.effect) && u.css("visibility", "hidden"), l -= 1, !l && a && a()
                }
                var u = t(s),
                    h = o.sync ? o.delay : o.delay * n * o.delayScale;
                u.text() ? setTimeout(function() {
                    r(u, o.effect, c)
                }, h) : c()
            })) : void(a && a())
        }
        var l = function(n, s) {
            var r = this,
                l = t(n);
            r.init = function() {
                r.$texts = l.find(s.selector), r.$texts.length || (r.$texts = t('<ul class="texts"><li>' + l.html() + "</li></ul>"), l.html(r.$texts)), r.$texts.hide(), r.$current = t("<span>").html(r.$texts.find(":first-child").html()).prependTo(l), e(s["in"].effect) ? r.$current.css("visibility", "hidden") : i(s.out.effect) && r.$current.css("visibility", "visible"), r.setOptions(s), r.timeoutRun = null, setTimeout(function() {
                    r.options.autoStart && r.start()
                }, r.options.initialDelay)
            }, r.setOptions = function(t) {
                r.options = t
            }, r.triggerEvent = function(e) {
                var i = t.Event(e + ".tlt");
                return l.trigger(i, r), i
            }, r["in"] = function(n, s) {
                n = n || 0;
                var l, c = r.$texts.find(":nth-child(" + ((n || 0) + 1) + ")"),
                    u = t.extend(!0, {}, r.options, c.length ? o(c[0]) : {});
                c.addClass("current"), r.triggerEvent("inAnimationBegin"), r.$current.html(c.html()).lettering("words"), "char" == r.options.type && r.$current.find('[class^="word"]').css({
                    display: "inline-block",
                    "-webkit-transform": "translate3d(0,0,0)",
                    "-moz-transform": "translate3d(0,0,0)",
                    "-o-transform": "translate3d(0,0,0)",
                    transform: "translate3d(0,0,0)"
                }).each(function() {
                    t(this).lettering()
                }), l = r.$current.find('[class^="' + r.options.type + '"]').css("display", "inline-block"), e(u["in"].effect) ? l.css("visibility", "hidden") : i(u["in"].effect) && l.css("visibility", "visible"), r.currentIndex = n, a(l, u["in"], function() {
                    r.triggerEvent("inAnimationEnd"), u["in"].callback && u["in"].callback(), s && s(r)
                })
            }, r.out = function(e) {
                var i = r.$texts.find(":nth-child(" + ((r.currentIndex || 0) + 1) + ")"),
                    n = r.$current.find('[class^="' + r.options.type + '"]'),
                    s = t.extend(!0, {}, r.options, i.length ? o(i[0]) : {});
                r.triggerEvent("outAnimationBegin"), a(n, s.out, function() {
                    i.removeClass("current"), r.triggerEvent("outAnimationEnd"), s.out.callback && s.out.callback(), e && e(r)
                })
            }, r.start = function(t) {
                setTimeout(function() {
                    r.triggerEvent("start"),
                        function e(t) {
                            r["in"](t, function() {
                                var i = r.$texts.children().length;
                                t += 1, !r.options.loop && t >= i ? (r.options.callback && r.options.callback(), r.triggerEvent("end")) : (t %= i, r.timeoutRun = setTimeout(function() {
                                    r.out(function() {
                                        e(t)
                                    })
                                }, r.options.minDisplayTime))
                            })
                        }(t || 0)
                }, r.options.initialDelay)
            }, r.stop = function() {
                r.timeoutRun && (clearInterval(r.timeoutRun), r.timeoutRun = null)
            }, r.init()
        };
        t.fn.textillate = function(e, i) {
            return this.each(function() {
                var n = t(this),
                    s = n.data("textillate"),
                    r = t.extend(!0, {}, t.fn.textillate.defaults, o(this), "object" == typeof e && e);
                s ? "string" == typeof e ? s[e].apply(s, [].concat(i)) : s.setOptions.call(s, r) : n.data("textillate", s = new l(this, r))
            })
        }, t.fn.textillate.defaults = {
            selector: ".texts",
            loop: !1,
            minDisplayTime: 2e3,
            initialDelay: 0,
            "in": {
                effect: "fadeInLeftBig",
                delayScale: 1.5,
                delay: 50,
                sync: !1,
                reverse: !1,
                shuffle: !1,
                callback: function() {}
            },
            out: {
                effect: "hinge",
                delayScale: 1.5,
                delay: 50,
                sync: !1,
                reverse: !1,
                shuffle: !1,
                callback: function() {}
            },
            autoStart: !0,
            inEffects: [],
            outEffects: ["hinge"],
            callback: function() {},
            type: "char"
        }
    }(jQuery),
    function(t) {
        function e(e, i, n, o) {
            var s = e.text().split(i),
                r = "";
            s.length && (t(s).each(function(t, e) {
                r += '<span class="' + n + (t + 1) + '">' + e + "</span>" + o
            }), e.empty().append(r))
        }
        var i = {
            init: function() {
                return this.each(function() {
                    e(t(this), "", "char", "")
                })
            },
            words: function() {
                return this.each(function() {
                    e(t(this), " ", "word", " ")
                })
            },
            lines: function() {
                return this.each(function() {
                    var i = "eefec303079ad17405c889e092e105b0";
                    e(t(this).children("br").replaceWith(i).end(), i, "line", "")
                })
            }
        };
        t.fn.lettering = function(e) {
            return e && i[e] ? i[e].apply(this, [].slice.call(arguments, 1)) : "letters" !== e && e ? (t.error("Method " + e + " does not exist on jQuery.lettering"), this) : i.init.apply(this, [].slice.call(arguments, 0))
        }
    }(jQuery), ! function(t) {
        "use strict";
        var e = function(e, i) {
            this.el = t(e), this.options = t.extend({}, t.fn.typed.defaults, i), this.isInput = this.el.is("input"), this.attr = this.options.attr, this.showCursor = this.isInput ? !1 : this.options.showCursor, this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text(), this.contentType = this.options.contentType, this.typeSpeed = this.options.typeSpeed, this.startDelay = this.options.startDelay, this.backSpeed = this.options.backSpeed,
                this.backDelay = this.options.backDelay, this.stringsElement = this.options.stringsElement, this.strings = this.options.strings, this.strPos = 0, this.arrayPos = 0, this.stopNum = 0, this.loop = this.options.loop, this.loopCount = this.options.loopCount, this.curLoop = 0, this.stop = !1, this.cursorChar = this.options.cursorChar, this.shuffle = this.options.shuffle, this.sequence = [], this.build()
        };
        e.prototype = {
            constructor: e,
            init: function() {
                var t = this;
                t.timeout = setTimeout(function() {
                    for (var e = 0; e < t.strings.length; ++e) t.sequence[e] = e;
                    t.shuffle && (t.sequence = t.shuffleArray(t.sequence)), t.typewrite(t.strings[t.sequence[t.arrayPos]], t.strPos)
                }, t.startDelay)
            },
            build: function() {
                var e = this;
                if (this.showCursor === !0 && (this.cursor = t('<span class="typed-cursor">' + this.cursorChar + "</span>"), this.el.after(this.cursor)), this.stringsElement) {
                    e.strings = [], this.stringsElement.hide();
                    var i = this.stringsElement.find("p");
                    t.each(i, function(i, n) {
                        e.strings.push(t(n).html())
                    })
                }
                this.init()
            },
            typewrite: function(t, e) {
                if (this.stop !== !0) {
                    var i = Math.round(70 * Math.random()) + this.typeSpeed,
                        n = this;
                    n.timeout = setTimeout(function() {
                        var i = 0,
                            o = t.substr(e);
                        if ("^" === o.charAt(0)) {
                            var s = 1;
                            /^\^\d+/.test(o) && (o = /\d+/.exec(o)[0], s += o.length, i = parseInt(o)), t = t.substring(0, e) + t.substring(e + s)
                        }
                        if ("html" === n.contentType) {
                            var r = t.substr(e).charAt(0);
                            if ("<" === r || "&" === r) {
                                var a = "",
                                    l = "";
                                for (l = "<" === r ? ">" : ";"; t.substr(e).charAt(0) !== l;) a += t.substr(e).charAt(0), e++;
                                e++, a += l
                            }
                        }
                        n.timeout = setTimeout(function() {
                            if (e === t.length) {
                                if (n.options.onStringTyped(n.arrayPos), n.arrayPos === n.strings.length - 1 && (n.options.callback(), n.curLoop++, n.loop === !1 || n.curLoop === n.loopCount)) return;
                                n.timeout = setTimeout(function() {
                                    n.backspace(t, e)
                                }, n.backDelay)
                            } else {
                                0 === e && n.options.preStringTyped(n.arrayPos);
                                var i = t.substr(0, e + 1);
                                n.attr ? n.el.attr(n.attr, i) : n.isInput ? n.el.val(i) : "html" === n.contentType ? n.el.html(i) : n.el.text(i), e++, n.typewrite(t, e)
                            }
                        }, i)
                    }, i)
                }
            },
            backspace: function(t, e) {
                if (this.stop !== !0) {
                    var i = Math.round(70 * Math.random()) + this.backSpeed,
                        n = this;
                    n.timeout = setTimeout(function() {
                        if ("html" === n.contentType && ">" === t.substr(e).charAt(0)) {
                            for (var i = "";
                                "<" !== t.substr(e).charAt(0);) i -= t.substr(e).charAt(0), e--;
                            e--, i += "<"
                        }
                        var o = t.substr(0, e);
                        n.attr ? n.el.attr(n.attr, o) : n.isInput ? n.el.val(o) : "html" === n.contentType ? n.el.html(o) : n.el.text(o), e > n.stopNum ? (e--, n.backspace(t, e)) : e <= n.stopNum && (n.arrayPos++, n.arrayPos === n.strings.length ? (n.arrayPos = 0, n.shuffle && (n.sequence = n.shuffleArray(n.sequence)), n.init()) : n.typewrite(n.strings[n.sequence[n.arrayPos]], e))
                    }, i)
                }
            },
            shuffleArray: function(t) {
                var e, i, n = t.length;
                if (n)
                    for (; --n;) i = Math.floor(Math.random() * (n + 1)), e = t[i], t[i] = t[n], t[n] = e;
                return t
            },
            reset: function() {
                var t = this;
                clearInterval(t.timeout);
                var e = this.el.attr("id");
                this.el.after('<span id="' + e + '"/>'), this.el.remove(), "undefined" != typeof this.cursor && this.cursor.remove(), t.options.resetCallback()
            }
        }, t.fn.typed = function(i) {
            return this.each(function() {
                var n = t(this),
                    o = n.data("typed"),
                    s = "object" == typeof i && i;
                o || n.data("typed", o = new e(this, s)), "string" == typeof i && o[i]()
            })
        }, t.fn.typed.defaults = {
            strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
            stringsElement: null,
            typeSpeed: 0,
            startDelay: 0,
            backSpeed: 0,
            shuffle: !1,
            backDelay: 500,
            loop: !1,
            loopCount: !1,
            showCursor: !0,
            cursorChar: "|",
            attr: null,
            contentType: "html",
            callback: function() {},
            preStringTyped: function() {},
            onStringTyped: function() {},
            resetCallback: function() {}
        }
    }(window.jQuery);