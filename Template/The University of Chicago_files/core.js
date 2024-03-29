! function($) {
    $.extend({
        ga: {
            trackEvent: function(e) {
                var t = {
                    category: "Unspecified",
                    action: "Click",
                    nonInteractive: !1
                };
                e = $.extend(t, e), _gaq.push(["_trackEvent", e.category, e.action, e.label, e.value, e.nonInteractive])
            }
        }
    });
    var e = {
        categoryAttribute: "data-ga-category",
        actionAttribute: "data-ga-action",
        labelAttribute: "data-ga-label",
        valueAttribute: "data-ga-value",
        noninteractiveAttribute: "data-ga-noninteractive",
        useLabel: !1,
        useValue: !1,
        useEvent: !1,
        event: "click",
        valid: function(e, t) {
            return !0
        },
        complete: function(e, t) {},
        category: "Unspecified",
        action: "Click",
        label: "Unspecified",
        value: "",
        nonInteractive: !1
    };
    $.fn.gaTrackEvent = function(t) {
        return t = $.extend(e, t), this.each(function() {
            var e = $(this);
            e.attr(t.categoryAttribute, t.category), e.attr(t.actionAttribute, t.action), t.useLabel === !0 && "" !== t.label && e.attr(t.labelAttribute, t.label), t.useValue === !0 && "" !== t.value && e.attr(t.valueAttribute, t.value), t.nonInteractive === !0 && e.attr(t.noninteractiveAttribute, "true"), e.gaTrackEventUnobtrusive(t)
        })
    }, $.fn.gaTrackEventUnobtrusive = function(t) {
        return t = $.extend(e, t), this.each(function() {
            var e = $(this),
                n = function() {
                    var n = e.attr(t.categoryAttribute),
                        i = e.attr(t.actionAttribute),
                        a = e.attr(t.labelAttribute),
                        o = e.attr(t.valueAttribute),
                        s = "true" === e.attr(t.noninteractiveAttribute),
                        r = {
                            category: n,
                            action: i,
                            nonInteractive: s
                        };
                    t.useLabel && t.useValue ? (r.label = a, r.value = o) : t.useLabel && (r.label = a), $.ga.trackEvent(r)
                };
            if (1 == t.useEvent) {
                var i = function(i) {
                    t.valid(e, i) === !0 && (n(), t.complete(e, i))
                };
                e.bind(t.event, i)
            } else n()
        })
    }
}(jQuery),
function($) {
    $.fn.GSASearch = function(e) {
        function t(t, a, s, r, l, c) {
            var d = {
                    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                    encode: function(e) {
                        var t = "",
                            n, i, a, o, s, r, l, c = 0;
                        for (e = d._utf8_encode(e); c < e.length;) n = e.charCodeAt(c++), i = e.charCodeAt(c++), a = e.charCodeAt(c++), o = n >> 2, s = (3 & n) << 4 | i >> 4, r = (15 & i) << 2 | a >> 6, l = 63 & a, isNaN(i) ? r = l = 64 : isNaN(a) && (l = 64), t = t + this._keyStr.charAt(o) + this._keyStr.charAt(s) + this._keyStr.charAt(r) + this._keyStr.charAt(l);
                        return t
                    },
                    decode: function(e) {
                        var t = "",
                            n, i, a, o, s, r, l, c = 0;
                        for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); c < e.length;) o = this._keyStr.indexOf(e.charAt(c++)), s = this._keyStr.indexOf(e.charAt(c++)), r = this._keyStr.indexOf(e.charAt(c++)), l = this._keyStr.indexOf(e.charAt(c++)), n = o << 2 | s >> 4, i = (15 & s) << 4 | r >> 2, a = (3 & r) << 6 | l, t += String.fromCharCode(n), 64 != r && (t += String.fromCharCode(i)), 64 != l && (t += String.fromCharCode(a));
                        return t = d._utf8_decode(t)
                    },
                    _utf8_encode: function(e) {
                        e = e.replace(/\r\n/g, "\n");
                        for (var t = "", n = 0; n < e.length; n++) {
                            var i = e.charCodeAt(n);
                            128 > i ? t += String.fromCharCode(i) : i > 127 && 2048 > i ? (t += String.fromCharCode(i >> 6 | 192), t += String.fromCharCode(63 & i | 128)) : (t += String.fromCharCode(i >> 12 | 224), t += String.fromCharCode(i >> 6 & 63 | 128), t += String.fromCharCode(63 & i | 128))
                        }
                        return t
                    },
                    _utf8_decode: function(e) {
                        for (var t = "", n = 0, i = c1 = c2 = 0; n < e.length;) i = e.charCodeAt(n), 128 > i ? (t += String.fromCharCode(i), n++) : i > 191 && 224 > i ? (c2 = e.charCodeAt(n + 1), t += String.fromCharCode((31 & i) << 6 | 63 & c2), n += 2) : (c2 = e.charCodeAt(n + 1), c3 = e.charCodeAt(n + 2), t += String.fromCharCode((15 & i) << 12 | (63 & c2) << 6 | 63 & c3), n += 3);
                        return t
                    }
                },
                u = "&q=" + escape(t) + "&start=" + escape(a) + "&sitesearch=";
            u += escape(r) + "&site=" + escape(l) + "&client=" + escape(c), u += "&filter=0";
            var h = "proxystylesheet=jsonp_frontend" + u + "&num=" + encodeURIComponent(s),
                f = e.protocol + "//search.uchicago.edu/search?proxystylesheet=default_frontend" + u,
                p = e.protocol + "//webresources.uchicago.edu/php/proxy/gsaproxy.php?encodedParams=" + d.encode(h) + "&callback=?";
            o.data("searchSiteURL", f);
            var m = 0,
                g = $.getJSON(p, function(e) {
                    i(e), m = 1
                });
            void 0 != g ? g.error(function() {
                n()
            }) : setTimeout(function() {
                m || n()
            }, 7e3)
        }

        function n() {
            var e = 'There is a problem fetching search results. Please refresh the page or contact <a href="mailto:weberror@uchicago.edu">weberror@uchicago.edu</a>.';
            o.html(e), o.data("totalCount", 0), o.trigger("GSASearchComplete")
        }

        function i(t) {
            var n, i = 0,
                a, s;
            if (a = $("<div></div>"), s = $("<h2></h2>"), s.text("You searched for: “" + t.GSP.Q + "”"), a.append(s), void 0 == t.GSP.RES) s = $("<p>No pages were found.</p>"), a.append(s);
            else {
                if (s = $("<p><strong></strong></p>"), s.find("strong").text("Results " + t.GSP.RES.SN + "–" + t.GSP.RES.EN + " of about " + t.GSP.RES.M), a.append(s), void 0 != t.GSP.GM && 1 == e.includeKeymatches) {
                    if (void 0 == t.GSP.GM.length) var r = new Array(t.GSP.GM);
                    else var r = t.GSP.GM;
                    for (d = 0; d < r.length; d++) s = $('<div class="keymatch"><h3><a></a></h3><p><em></em></p></div>'), s.find("h3 a").attr("href", r[d].GL), s.find("h3 a").text(r[d].GD), s.find("p em").text(r[d].GL), a.append(s)
                }
                var l = t.GSP.RES.EN - t.GSP.RES.SN + 1;
                if (a.append('<div class="results"></div>'), 1 == l) var c = new Array(t.GSP.RES.R);
                else var c = t.GSP.RES.R;
                for (var d = 0; d < c.length; d++) {
                    var u = c[d];
                    null == u.S && (u.S = ""), s = $('<div class="result"><h3><a></a></h3><p><br class="url"><em><a></a></em></p></div>'), s.find("a").attr("href", u.U), s.find("a").html(u.T), s.find("em a").text(u.U), s.find("p").prepend(u.S), a.find(".results").append(s)
                }
                var h = e.num;
                n = t.GSP.RES.SN, i = h > l ? t.GSP.RES.EN : t.GSP.RES.M
            }
            o.empty().append(a.contents()), o.data("startNumber", n), o.data("totalCount", i), o.trigger("GSASearchComplete"), $(".maincontent br").not(".url").replaceWith(" ")
        }
        var a = {
                q: "",
                start: "",
                num: "15",
                sitesearch: "",
                site: "default_collection",
                waitGifPath: "/i/template/loading.gif",
                protocol: location.protocol,
                client: "default_frontend",
                includeKeymatches: !1
            },
            e = $.extend(a, e),
            o = $(this);
        return o.data("searchSiteURL", e.protocol + "//search.uchicago.edu"), o.data("startNumber", "1"), o.data("totalCount", "10"), this.each(function() {
            o.empty(), o.html('<img src="' + e.waitGifPath + '">'), e.q = e.q.replace(/(<([^>]+)>)/gi, ""), e.start = e.start.toString().replace(/(<([^>]+)>)/gi, ""), e.num = e.num.toString().replace(/(<([^>]+)>)/gi, ""), e.sitesearch = e.sitesearch.replace(/(<([^>]+)>)/gi, ""), e.site = e.site.replace(/(<([^>]+)>)/gi, ""), e.client = e.client.replace(/(<([^>]+)>)/gi, ""), t(e.q, e.start, e.num, e.sitesearch, e.site, e.client)
        })
    }
}(jQuery),
function($) {
    function e(e, n, i) {
        var a = $("<ul></ul>");
        a.append(t("first", e, n, i));
        var o = 1,
            s = 9;
        e > 4 && (o = e - 4, s = e + 4), s > n && (o = n - 8, s = n), 1 > o && (o = 1);
        for (var r = o; s >= r; r++) {
            var l = $("<li>" + r + "</li>");
            r == e ? l.addClass("active") : l.on("click focusin", function() {
                i(this.firstChild.data)
            }), l.appendTo(a)
        }
        return a
    }

    function t(e, t, n, i) {
        var a = $("<li>" + e + "</li>"),
            o = 1;
        switch (e) {
            case "first":
                o = 1
        }
        return "first" == e ? 1 >= t ? a : a.on("click focusin", function() {
            i(o)
        }) : t >= n ? a : a.on("click focusin", function() {
            i(o)
        }), a
    }
    $.fn.pager = function(t) {
        var n = $.extend({}, $.fn.pager.defaults, t);
        return this.each(function() {
            $(this).empty().append(e(parseInt(t.pagenumber), parseInt(t.pagecount), t.buttonClickCallback))
        })
    }, $.fn.pager.defaults = {
        pagenumber: 1,
        pagecount: 1
    }
}(jQuery),
function(e) {
    function t(t, n, i, a) {
        function o() {
            l.afterLoaded(), l.settings.hideFramesUntilPreloaded && l.settings.preloader && l.sequence.children("li").show(), l.settings.preloader ? l.settings.hidePreloaderUsingCSS && l.transitionsSupported ? (l.prependPreloadingCompleteTo = 1 == l.settings.prependPreloadingComplete ? l.settings.preloader : e(l.settings.prependPreloadingComplete), l.prependPreloadingCompleteTo.addClass("preloading-complete"), setTimeout(s, l.settings.hidePreloaderDelay)) : l.settings.preloader.fadeOut(l.settings.hidePreloaderDelay, function() {
                clearInterval(l.defaultPreloader), s()
            }) : s()
        }

        function s() {
            function t(e) {
                l.containerLeft = l.container.position().left, l.containerRight = l.containerLeft + l.container.width(), l.containerTop = l.container.position().top, l.containerBottom = l.containerTop + l.container.height();
                var t = e.pageX,
                    n = e.pageY;
                t >= l.containerLeft && t <= l.containerRight && n >= l.containerTop && n <= l.containerBottom && (l.settings.autoPlay = !1, clearTimeout(l.sequenceTimer), void 0 !== l.settings.pauseIcon && l.settings.pauseIcon.show(), void 0 !== l.settings.pauseButton && l.settings.pauseButton.addClass("paused"), l.paused(), l.sequence.off("mousemove"))
            }
            if (e(l.settings.preloader).remove(), l.settings.nextButton = l.init.uiElements(l.settings.nextButton, ".next"), l.settings.prevButton = l.init.uiElements(l.settings.prevButton, ".prev"), l.settings.pauseButton = l.init.uiElements(l.settings.pauseButton, ".pause"), void 0 !== l.settings.nextButton && l.settings.nextButton !== !1 && l.settings.showNextButtonOnInit && l.settings.nextButton.show(), void 0 !== l.settings.prevButton && l.settings.prevButton !== !1 && l.settings.showPrevButtonOnInit && l.settings.prevButton.show(), void 0 !== l.settings.pauseButton && l.settings.pauseButton !== !1 && l.settings.pauseButton.show(), l.settings.pauseIcon !== !1 ? (l.settings.pauseIcon = l.init.uiElements(l.settings.pauseIcon, ".pause-icon"), void 0 !== l.settings.pauseIcon && l.settings.pauseIcon.hide()) : l.settings.pauseIcon = void 0, l.hasTouch && (l.settings.calculatedSwipeThreshold = l.container.width() * (l.settings.swipeThreshold / 100)), l.nextFrameID = l.settings.startingFrameID, l.nextFrame = l.sequence.children("li:nth-child(" + l.nextFrameID + ")"), l.settings.hashTags && (l.sequence.children("li").each(function() {
                    l.frameHashID.push(e(this).attr(l.getHashTagFrom))
                }), l.currentHashTag = location.hash.replace("#", ""), void 0 === l.currentHashTag || "" === l.currentHashTag ? l.nextFrameID = l.settings.startingFrameID : (l.frameHashIndex = e.inArray(l.currentHashTag, l.frameHashID), -1 !== l.frameHashIndex ? l.nextFrameID = l.frameHashIndex + 1 : l.nextFrameID = l.settings.startingFrameID)), l.nextFrame = l.sequence.children("li:nth-child(" + l.nextFrameID + ")"), l.nextFrameChildren = l.nextFrame.children(), l.direction, l.sequence.css({
                    width: "100%",
                    height: "100%",
                    position: "relative"
                }), l.sequence.children("li").css({
                    width: "100%",
                    height: "100%",
                    position: "absolute"
                }), l.transitionsSupported) {
                if (l.settings.animateStartingFrameIn) l.settings.reverseAnimationsWhenNavigatingBackwards && l.settings.autoPlayDirection - 1 && l.settings.animateStartingFrameIn ? (l.modifyElements(l.nextFrameChildren, "0s"), l.nextFrameChildren.addClass("animate-out"), l.goTo(l.nextFrameID, -1)) : l.goTo(l.nextFrameID, 1);
                else if (l.currentFrame = l.nextFrame.addClass("current-frame"), l.settings.moveActiveFrameToTop && l.currentFrame.css("z-index", l.numberOfFrames), l.currentFrameChildren = l.currentFrame.children(), l.currentFrameID = l.nextFrameID, l.modifyElements(l.currentFrameChildren, "0s"), l.currentFrameChildren.addClass("animate-in"), l.settings.hashChangesOnFirstFrame && (l.currentHashTag = l.currentFrame.attr(l.getHashTagFrom), document.location.hash = "#" + l.currentHashTag), setTimeout(function() {
                        l.modifyElements(l.currentFrameChildren, "")
                    }, 100), l.settings.autoPlay) {
                    var n = function() {
                        l.autoPlaySequence()
                    };
                    clearTimeout(l.sequenceTimer), l.sequenceTimer = setTimeout(n, l.settings.autoPlayDelay, l)
                }
            } else if (l.container.addClass("sequence-fallback"), l.currentFrame = l.nextFrame, l.currentFrame.addClass("current-frame"), l.beforeNextFrameAnimatesIn(), l.afterNextFrameAnimatesIn(), l.settings.hashChangesOnFirstFrame && (l.currentHashTag = l.currentFrame.attr(l.getHashTagFrom), document.location.hash = "#" + l.currentHashTag), l.currentFrameChildren = l.currentFrame.children(), l.currentFrameID = l.nextFrameID, l.sequence.children("li").children().addClass("animate-in"), l.sequence.children(":not(li:nth-child(" + l.nextFrameID + "))").css({
                    display: "none",
                    opacity: 0
                }), l.settings.autoPlay) {
                var n = function() {
                    l.autoPlaySequence()
                };
                clearTimeout(l.sequenceTimer), l.sequenceTimer = setTimeout(n, l.settings.autoPlayDelay, l)
            }
            if (void 0 !== l.settings.nextButton && l.settings.nextButton.click(function() {
                    l.next()
                }), void 0 !== l.settings.prevButton && l.settings.prevButton.click(function() {
                    l.prev()
                }), void 0 !== l.settings.pauseButton && l.settings.pauseButton.click(function() {
                    l.pause()
                }), l.settings.keyNavigation) {
                var i = {
                    left: 37,
                    right: 39
                };
                e(document).keydown(function(e) {
                    function t(e, t) {
                        var n;
                        for (keyCodes in t) n = "left" === keyCodes || "right" === keyCodes ? i[keyCodes] : keyCodes, e === n && l.initCustomKeyEvent(t[keyCodes])
                    }
                    var n = parseFloat(String.fromCharCode(e.keyCode));
                    n > 0 && n <= l.numberOfFrames && l.settings.numericKeysGoToFrames && (l.nextFrameID = n, l.goTo(n)), t(e.keyCode, l.settings.keyEvents), t(e.keyCode, l.settings.customKeyEvents)
                })
            }
            if (l.settings.pauseOnHover && !l.settings.pauseOnElementsOutsideContainer && l.settings.autoPlay ? (l.hoverEvent = l.sequence.mousemove(function(e) {
                    t(e)
                }), l.sequence.mouseleave(function(e) {
                    l.settings.autoPlay = !0;
                    var n = function() {
                        l.autoPlaySequence()
                    };
                    clearTimeout(l.sequenceTimer), l.sequenceTimer = setTimeout(n, l.settings.autoPlayDelay, l), void 0 !== l.settings.pauseIcon && l.settings.pauseIcon.hide(), void 0 !== l.settings.pauseButton && l.settings.pauseButton.removeClass("paused"), l.unpaused(), l.sequence.data("events") && void 0 === l.sequence.data("events").mousemove && l.sequence.mousemove(function(e) {
                        t(e)
                    })
                })) : l.settings.pauseOnHover && l.settings.autoPlay && (l.hoverEvent = l.sequence.hover(function(e) {
                    l.settings.autoPlay = !1, clearTimeout(l.sequenceTimer), void 0 !== l.settings.pauseIcon && l.settings.pauseIcon.show(), void 0 !== l.settings.pauseButton && l.settings.pauseButton.addClass("paused"), l.paused()
                }, function() {
                    l.settings.autoPlay = !0;
                    var e = function() {
                        l.autoPlaySequence()
                    };
                    clearTimeout(l.sequenceTimer), l.sequenceTimer = setTimeout(e, l.settings.autoPlayDelay, l), void 0 !== l.settings.pauseIcon && l.settings.pauseIcon.hide(), void 0 !== l.settings.pauseButton && l.settings.pauseButton.removeClass("paused"), l.unpaused()
                })), l.settings.hashTags && e(window).hashchange(function() {
                    newTag = location.hash.replace("#", ""), l.currentHashTag !== newTag && (l.currentHashTag = newTag, l.frameHashIndex = e.inArray(l.currentHashTag, l.frameHashID), -1 !== l.frameHashIndex && (l.nextFrameID = l.frameHashIndex + 1, l.goTo(l.nextFrameID)))
                }), l.settings.swipeNavigation && l.hasTouch) {
                var a = {
                    touchstartX: -1,
                    touchstartY: -1,
                    touchmoveX: -1,
                    touchmoveY: -1
                };
                l.sequence.on("touchstart touchmove touchend", function(e) {
                    switch (l.settings.swipePreventsDefault && e.preventDefault(), e.originalEvent.type) {
                        case "touchmove":
                        case "touchstart":
                            a[e.originalEvent.type + "X"] = e.originalEvent.touches[0].pageX, a[e.originalEvent.type + "Y"] = e.originalEvent.touches[0].pageY;
                            break;
                        case "touchend":
                            if (-1 !== a.touchmoveX) {
                                var t = a.touchmoveX - a.touchstartX,
                                    n = a.touchmoveY - a.touchstartY;
                                Math.abs(t) > Math.abs(n) && t > l.settings.calculatedSwipeThreshold ? l.initCustomKeyEvent(l.settings.swipeEvents.right) : Math.abs(t) > Math.abs(n) && Math.abs(t) > l.settings.calculatedSwipeThreshold ? l.initCustomKeyEvent(l.settings.swipeEvents.left) : Math.abs(n) > Math.abs(t) && n > l.settings.calculatedSwipeThreshold ? l.initCustomKeyEvent(l.settings.swipeEvents.down) : Math.abs(n) > Math.abs(t) && Math.abs(n) > l.settings.calculatedSwipeThreshold && l.initCustomKeyEvent(l.settings.swipeEvents.up), a = {
                                    touchstartX: -1,
                                    touchstartY: -1,
                                    touchmoveX: -1,
                                    touchmoveY: -1
                                }
                            }
                    }
                })
            }
            e(window).resize(function() {
                l.settings.calculatedSwipeThreshold = l.container.width() * (l.settings.swipeThreshold / 100)
            })
        }

        function r(t, n) {
            var i = [];
            if (n)
                for (var a = t; a > 0; a--) i.push(e("body").find('img[src="' + l.settings.preloadTheseImages[a - 1] + '"]')[0]);
            else
                for (var a = t; a > 0; a--) l.sequence.children("li:nth-child(" + l.settings.preloadTheseFrames[a - 1] + ")").find("img").each(function() {
                    i.push(e(this)[0])
                });
            return i
        }
        var l = this;
        l.container = e(t), l.sequence = l.container.children("ul");
        try {
            if (Modernizr.prefixed, void 0 === Modernizr.prefixed) throw "undefined"
        } catch (c) {
            a.modernizr()
        }
        var d = {
                WebkitTransition: "-webkit-",
                MozTransition: "-moz-",
                OTransition: "-o-",
                msTransition: "-ms-",
                transition: ""
            },
            u = {
                WebkitTransition: "webkitTransitionEnd webkitAnimationEnd",
                MozTransition: "transitionend animationend",
                OTransition: "oTransitionEnd oAnimationEnd otransitionend oanimationend",
                msTransition: "MSTransitionEnd MSAnimationEnd",
                transition: "transitionend animationend"
            };
        l.prefix = d[Modernizr.prefixed("transition")], l.transitionEnd = u[Modernizr.prefixed("transition")], l.transitionProperties = {}, l.numberOfFrames = l.sequence.children("li").length, l.transitionsSupported = void 0 !== l.prefix ? !0 : !1, l.hasTouch = "ontouchstart" in window ? !0 : !1, l.sequenceTimer, l.isPaused = !1, l.hoverEvent, l.defaultPreloader, l.init = {
            preloader: function(t) {
                switch (l.prependTo = 1 == l.settings.prependPreloader ? l.container : l.settings.prependPreloader, t) {
                    case !0:
                    case void 0:
                        return a.defaultPreloader(l.prependTo, l.transitionsSupported, l.prefix), l.transitionsSupported || l.preloaderFallback(), e(".sequence-preloader");
                    case !1:
                        break;
                    default:
                        return this.CSSSelectorToHTML(t), e(t)
                }
            },
            uiElements: function(t, n) {
                switch (t) {
                    case !1:
                        return void 0;
                    case !0:
                        return ".sequence-preloader" === n && a.defaultPreloader(l.container, l.transitionsSupported, l.prefix), e(n);
                    default:
                        return e(t)
                }
            }
        }, l.paused = function() {}, l.unpaused = function() {}, l.beforeNextFrameAnimatesIn = function() {}, l.afterNextFrameAnimatesIn = function() {}, l.beforeCurrentFrameAnimatesOut = function() {}, l.afterCurrentFrameAnimatesOut = function() {}, l.beforeFirstFrameAnimatesIn = function() {}, l.afterFirstFrameAnimatesIn = function() {}, l.beforeLastFrameAnimatesIn = function() {}, l.afterLastFrameAnimatesIn = function() {}, l.afterLoaded = function() {}, l.settings = e.extend({}, i, n), l.settings.preloader = l.init.uiElements(l.settings.preloader, ".sequence-preloader"), l.firstFrame = l.settings.animateStartingFrameIn ? !0 : !1, l.currentHashTag, l.getHashTagFrom = l.settings.hashDataAttribute ? "data-sequence-hashtag" : "id", l.frameHashID = [], l.settings.hideFramesUntilPreloaded && l.settings.preloader && l.sequence.children("li").hide(), "-o-" === l.prefix && (l.transitionsSupported = a.operaTest()), l.modifyElements(l.sequence.children("li").children(), "0s"), l.sequence.children("li").children().removeClass("animate-in");
        var h = l.settings.preloadTheseFrames.length,
            f = l.settings.preloadTheseImages.length;
        if (!l.settings.preloader || 0 === h && 0 === f) e(window).on("load", function() {
            o(), e(this).off("load")
        });
        else {
            var p = r(h),
                m = r(f, !0),
                g = e(p.concat(m)),
                v = g.length;
            g.length ? g.on("load", function() {
                --v <= 0 && o()
            }).each(function() {
                if (this.complete || void 0 === this.complete) {
                    var e = this.src;
                    this.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==", this.src = e
                }
            }) : o()
        }
    }
    t.prototype = {
        preloaderFallback: function() {
            function t() {
                i = 1 === i ? 0 : 1, e(".sequence-preloader img:nth-child(1)").animate({
                    opacity: i
                }, 100), e(".sequence-preloader img:nth-child(2)").animate({
                    opacity: i
                }, 350), e(".sequence-preloader img:nth-child(3)").animate({
                    opacity: i
                }, 600)
            }
            var n = this,
                i = 0;
            t(), n.defaultPreloader = setInterval(function() {
                t()
            }, 600)
        },
        initCustomKeyEvent: function(e) {
            var t = this;
            switch (e) {
                case "next":
                    t.next();
                    break;
                case "prev":
                    t.prev();
                    break;
                case "pause":
                    t.pause()
            }
        },
        autoPlaySequence: function(e) {
            var t = this;
            1 === t.settings.autoPlayDirection ? t.next() : t.prev()
        },
        modifyElements: function(e, t) {
            var n = this;
            e.css(n.prefixCSS(n.prefix, {
                "transition-duration": t,
                "transition-delay": t
            }))
        },
        prefixCSS: function(e, t) {
            var n = {};
            for (property in t) n[e + property] = t[property];
            return n
        },
        setTransitionProperties: function(t) {
            var n = this;
            n.modifyElements(n.frameChildren, ""), n.frameChildren.each(function() {
                n.transitionProperties["transition-duration"] = e(this).css(n.prefix + "transition-duration"), n.transitionProperties["transition-delay"] = e(this).css(n.prefix + "transition-delay"), e(this).css(n.prefixCSS(n.prefix, n.transitionProperties))
            })
        },
        pause: function() {
            var e = this;
            e.settings.autoPlay ? (void 0 !== e.settings.pauseButton && (e.settings.pauseButton.addClass("paused"), void 0 !== e.settings.pauseIcon && e.settings.pauseIcon.show()), e.paused(), e.stopAutoPlay()) : (void 0 !== e.settings.pauseButton && (e.settings.pauseButton.removeClass("paused"), void 0 !== e.settings.pauseIcon && e.settings.pauseIcon.hide()), e.unpaused(), e.startAutoPlay(e.settings.unpauseDelay))
        },
        startAutoPlay: function(e, t) {
            var n = this;
            e = void 0 === e ? 0 : e, n.settings.autoPlayDelay = void 0 === t ? n.settings.autoPlayDelay : t, n.settings.autoPlay = !0;
            var i = function() {
                n.autoPlaySequence()
            };
            clearTimeout(n.sequenceTimer), n.sequenceTimer = setTimeout(i, e, n), n.settings.pauseOnHover && (n.hoverEvent = n.sequence.hover(function() {
                n.settings.autoPlay = !1, clearTimeout(n.sequenceTimer), void 0 !== n.settings.pauseIcon && n.settings.pauseIcon.show(), void 0 !== n.settings.pauseButton && n.settings.pauseButton.addClass("paused"), n.paused()
            }, function() {
                n.settings.autoPlay = !0;
                var e = function() {
                    n.autoPlaySequence()
                };
                clearTimeout(n.sequenceTimer), n.sequenceTimer = setTimeout(e, n.settings.autoPlayDelay, n), void 0 !== n.settings.pauseIcon && n.settings.pauseIcon.hide(), void 0 !== n.settings.pauseButton && n.settings.pauseButton.removeClass("paused"), n.unpaused()
            }))
        },
        stopAutoPlay: function() {
            var e = this;
            e.settings.autoPlay = !1, clearTimeout(e.sequenceTimer), void 0 !== e.hoverEvent && e.hoverEvent.off()
        },
        next: function() {
            var e = this;
            e.active || (e.settings.cycle || !e.settings.cycle && e.currentFrameID !== e.numberOfFrames ? (e.isPaused && (e.isPaused = !1, e.startAutoPlay()), e.nextFrameID = e.currentFrameID !== e.numberOfFrames ? e.currentFrameID + 1 : 1, e.goTo(e.nextFrameID, 1)) : 1 === e.settings.autoPlayDirection && (e.isPaused = !0, e.stopAutoPlay()))
        },
        prev: function() {
            var e = this;
            e.active || (e.settings.cycle || !e.settings.cycle && 1 !== e.currentFrameID ? (e.isPaused && (e.isPaused = !1, e.startAutoPlay()), e.nextFrameID = 1 === e.currentFrameID ? e.numberOfFrames : e.currentFrameID - 1, e.goTo(e.nextFrameID, -1)) : -1 === e.settings.autoPlayDirection && (e.isPaused = !0, e.stopAutoPlay()))
        },
        goTo: function(t, n) {
            var i = this;
            if (t === i.numberOfFrames ? i.beforeLastFrameAnimatesIn() : 1 === t && i.beforeFirstFrameAnimatesIn(), void 0 !== i.currentFrame && t === i.currentFrame.index() + 1) return !1;
            if (!i.active)
                if (i.active = !0, i.currentFrame = i.sequence.children(".current-frame"), i.nextFrame = i.sequence.children("li:nth-child(" + t + ")"), void 0 === n ? i.direction = t > i.currentFrameID ? 1 : -1 : i.direction = n, i.frameChildren = i.currentFrame.children(), i.nextFrameChildren = i.nextFrame.children(), i.transitionsSupported) {
                    0 !== i.currentFrame.length && (i.beforeCurrentFrameAnimatesOut(), i.animateOut(i.direction));
                    var a = function() {
                        i.animateIn(i.direction), i.currentFrameID = t
                    };
                    if (i.firstFrame) a();
                    else switch (i.settings.transitionThreshold) {
                        case !0:
                            i.waitForAnimationsToComplete(i.currentFrame, i.frameChildren, "out");
                            break;
                        case !1:
                            a();
                            break;
                        default:
                            setTimeout(a, i.settings.transitionThreshold)
                    }
                } else switch (i.settings.fallback.theme) {
                    case "slide":
                        var o = {},
                            a = {},
                            s = {};
                        1 === i.direction ? (o.left = "-100%", a.left = "100%") : (o.left = "100%", a.left = "-100%"), s.left = "0%", s.opacity = 1, i.beforeCurrentFrameAnimatesOut(), i.currentFrame.removeClass("current-frame").animate(o, i.settings.fallback.speed, function() {}), i.beforeNextFrameAnimatesIn(), i.nextFrame.addClass("current-frame").show().css(a).animate(s, i.settings.fallback.speed, function() {
                            if (i.currentFrame = i.nextFrame, i.settings.hashTags && (i.currentHashTag = i.currentFrame.attr(i.getHashTagFrom), i.frameHashIndex = e.inArray(i.currentHashTag, i.frameHashID), -1 !== i.frameHashIndex ? (i.nextFrameID = i.frameHashIndex + 1, document.location.hash = "#" + i.currentHashTag) : i.nextFrameID = i.settings.startingFrameID), i.currentFrameID = i.currentFrame.index() + 1, i.active = !1, i.afterNextFrameAnimatesIn(), i.settings.autoPlay) {
                                var t = function() {
                                    i.autoPlaySequence()
                                };
                                clearTimeout(i.sequenceTimer), i.sequenceTimer = setTimeout(t, i.settings.autoPlayDelay, i)
                            }
                        });
                        break;
                    case "fade":
                    default:
                        i.sequence.children("li").css({
                            position: "relative"
                        }), i.beforeCurrentFrameAnimatesOut(), i.currentFrame.animate({
                            opacity: 0
                        }, i.settings.fallback.speed, function() {
                            if (i.currentFrame.css({
                                    display: "none",
                                    "z-index": "1"
                                }), i.currentFrame.removeClass("current-frame"), i.beforeNextFrameAnimatesIn(), i.nextFrame.addClass("current-frame").css({
                                    display: "block",
                                    "z-index": i.numberOfFrames
                                }).animate({
                                    opacity: 1
                                }, 500, function() {
                                    i.afterNextFrameAnimatesIn()
                                }), i.currentFrame = i.nextFrame, i.currentFrameID = i.currentFrame.index() + 1, i.active = !1, i.settings.autoPlay) {
                                var e = function() {
                                    i.autoPlaySequence()
                                };
                                clearTimeout(i.sequenceTimer), i.sequenceTimer = setTimeout(e, i.settings.autoPlayDelay, i)
                            }
                        }), i.sequence.children("li").css({
                            position: "relative"
                        })
                }
        },
        animateOut: function(e) {
            var t = this;
            t.settings.moveActiveFrameToTop && t.currentFrame.css("z-index", 1), t.currentFrame.removeClass("current-frame"), t.nextFrame.addClass("next-frame"), t.settings.reverseAnimationsWhenNavigatingBackwards && 1 !== e || (t.modifyElements(t.nextFrameChildren, "0s"), t.nextFrameChildren.removeClass("animate-out"), t.modifyElements(t.frameChildren, ""), t.frameChildren.addClass("animate-out").removeClass("animate-in")), t.settings.reverseAnimationsWhenNavigatingBackwards && -1 === e && (t.modifyElements(t.nextFrameChildren, "0s"), t.nextFrameChildren.addClass("animate-out"), t.setTransitionProperties(t.frameChildren), t.frameChildren.removeClass("animate-in")), t.settings.transitionThreshold && t.waitForAnimationsToComplete(t.currentFrame, t.currentFrame.children(), "out", !0)
        },
        animateIn: function(e) {
            var t = this;
            t.active = !0, t.currentFrame.off(t.transitionEnd), t.currentFrame = t.nextFrame, 1 === e ? t.currentFrameID = t.currentFrameID !== t.numberOfFrames ? t.currentFrameID + 1 : 1 : t.currentFrameID = 1 !== t.currentFrameID ? t.currentFrameID - 1 : t.numberOfFrames, t.nextFrameChildren = t.nextFrame.children(), t.frameChildren = t.currentFrame.children(), t.beforeNextFrameAnimatesIn(), t.settings.moveActiveFrameToTop && t.nextFrame.css({
                "z-index": t.numberOfFrames
            }), t.settings.reverseAnimationsWhenNavigatingBackwards && 1 !== e ? t.settings.reverseAnimationsWhenNavigatingBackwards && -1 === e && setTimeout(function() {
                t.setTransitionProperties(t.frameChildren), t.frameChildren.addClass("animate-in").removeClass("animate-out"), t.waitForAnimationsToComplete(t.nextFrame, t.nextFrameChildren, "in"), t.settings.transitionThreshold !== !0 && "function () {}" != t.afterCurrentFrameAnimatesOut && t.waitForAnimationsToComplete(t.currentFrame, t.currentFrame.children(), "out")
            }, 50) : setTimeout(function() {
                t.modifyElements(t.frameChildren, ""), t.frameChildren.addClass("animate-in"), t.waitForAnimationsToComplete(t.nextFrame, t.nextFrameChildren, "in"), t.settings.transitionThreshold !== !0 && "function () {}" != t.afterCurrentFrameAnimatesOut && t.waitForAnimationsToComplete(t.currentFrame, t.currentFrame.children(), "out")
            }, 50)
        },
        waitForAnimationsToComplete: function(t, n, i, a) {
            var o = this;
            if ("out" === i) var s = function() {
                o.active = !1, t.off(o.transitionEnd), o.afterCurrentFrameAnimatesOut(), a && o.animateIn(o.direction)
            };
            else if ("in" === i) var s = function() {
                if (t.off(o.transitionEnd), o.afterNextFrameAnimatesIn(), o.settings.hashTags && (o.currentHashTag = o.currentFrame.attr(o.getHashTagFrom), o.frameHashIndex = e.inArray(o.currentHashTag, o.frameHashID), -1 === o.frameHashIndex || !o.settings.hashChangesOnFirstFrame && o.firstFrame ? (o.nextFrameID = o.settings.startingFrameID, o.firstFrame = !1) : (o.nextFrameID = o.frameHashIndex + 1, document.location.hash = "#" + o.currentHashTag)), o.currentFrameID === o.numberOfFrames ? o.afterLastFrameAnimatesIn() : 1 === o.currentFrameID && o.afterFirstFrameAnimatesIn(), o.nextFrame.removeClass("next-frame").addClass("current-frame"), o.active = !1, o.settings.autoPlay) {
                    var n = function() {
                        o.autoPlaySequence()
                    };
                    clearTimeout(o.sequenceTimer), o.sequenceTimer = setTimeout(n, o.settings.autoPlayDelay, o)
                }
            };
            n.each(function() {
                e(this).data("animationEnded", !1)
            }), o.currentFrame.on(o.transitionEnd, function(t) {
                e(t.target).data("animationEnded", !0);
                var i = !0;
                n.each(function() {
                    e(this).data("animationEnded") === !1 && (i = !1)
                }), i && s()
            })
        }
    }, e.fn.sequence = function(a) {
        var o = this;
        return o.each(function() {
            var o = new t(e(this), a, i, n);
            e(this).data("sequence", o)
        })
    };
    var n = {
            modernizr: function() {
                window.Modernizr = function(e, t, n) {
                    function i(e) {
                        m.cssText = e
                    }

                    function a(e, t) {
                        return i(prefixes.join(e + ";") + (t || ""))
                    }

                    function o(e, t) {
                        return typeof e === t
                    }

                    function s(e, t) {
                        return !!~("" + e).indexOf(t)
                    }

                    function r(e, t) {
                        for (var i in e) {
                            var a = e[i];
                            if (!s(a, "-") && m[a] !== n) return "pfx" == t ? a : !0
                        }
                        return !1
                    }

                    function l(e, t, i) {
                        for (var a in e) {
                            var s = t[e[a]];
                            if (s !== n) return i === !1 ? e[a] : o(s, "function") ? s.on(i || t) : s
                        }
                        return !1
                    }

                    function c(e, t, n) {
                        var i = e.charAt(0).toUpperCase() + e.slice(1),
                            a = (e + " " + w.join(i + " ") + i).split(" ");
                        return o(t, "string") || o(t, "undefined") ? r(a, t) : (a = (e + " " + b.join(i + " ") + i).split(" "), l(a, t, n))
                    }
                    var d = "2.6.1",
                        u = {},
                        h = t.documentElement,
                        f = "modernizr",
                        p = t.createElement(f),
                        m = p.style,
                        g, v = {}.toString,
                        y = "Webkit Moz O ms",
                        w = y.split(" "),
                        b = y.toLowerCase().split(" "),
                        T = {
                            svg: "http://www.w3.org/2000/svg"
                        },
                        C = {},
                        x = {},
                        S = {},
                        k = [],
                        F = k.slice,
                        A, I = {}.hasOwnProperty,
                        _;
                    _ = o(I, "undefined") || o(I.call, "undefined") ? function(e, t) {
                        return t in e && o(e.constructor.prototype[t], "undefined")
                    } : function(e, t) {
                        return I.call(e, t)
                    }, Function.prototype.on || (Function.prototype.on = function(e) {
                        var t = self;
                        if ("function" != typeof t) throw new TypeError;
                        var n = F.call(arguments, 1),
                            i = function() {
                                if (self instanceof i) {
                                    var a = function() {};
                                    a.prototype = t.prototype;
                                    var o = new a,
                                        s = t.apply(o, n.concat(F.call(arguments)));
                                    return Object(s) === s ? s : o
                                }
                                return t.apply(e, n.concat(F.call(arguments)))
                            };
                        return i
                    }), C.svg = function() {
                        return !!t.createElementNS && !!t.createElementNS(T.svg, "svg").createSVGRect
                    };
                    for (var P in C) _(C, P) && (A = P.toLowerCase(), u[A] = C[P](), k.push((u[A] ? "" : "no-") + A));
                    return u.addTest = function(e, t) {
                        if ("object" == typeof e)
                            for (var i in e) _(e, i) && u.addTest(i, e[i]);
                        else {
                            if (e = e.toLowerCase(), u[e] !== n) return u;
                            t = "function" == typeof t ? t() : t, enableClasses && (h.className += " " + (t ? "" : "no-") + e), u[e] = t
                        }
                        return u
                    }, i(""), p = g = null, u._version = d, u._domPrefixes = b, u._cssomPrefixes = w, u.testProp = function(e) {
                        return r([e])
                    }, u.testAllProps = c, u.prefixed = function(e, t, n) {
                        return t ? c(e, t, n) : c(e, "pfx")
                    }, u
                }(self, self.document)
            },
            defaultPreloader: function(t, n, i) {
                var a = '<div class="sequence-preloader"><svg class="preloading" xmlns="http://www.w3.org/2000/svg"><circle class="circle" cx="6" cy="6" r="6" /><circle class="circle" cx="22" cy="6" r="6" /><circle class="circle" cx="38" cy="6" r="6" /></svg></div>';
                e("head").append("<style>.sequence-preloader{height: 100%;position: absolute;width: 100%;z-index: 999999;}@" + i + "keyframes preload{0%{opacity: 1;}50%{opacity: 0;}100%{opacity: 1;}}.sequence-preloader .preloading .circle{fill: #ff9442;display: inline-block;height: 12px;position: relative;top: -50%;width: 12px;" + i + "animation: preload 1s infinite; animation: preload 1s infinite;}.preloading{display:block;height: 12px;margin: 0 auto;top: 50%;margin-top:-6px;position: relative;width: 48px;}.sequence-preloader .preloading .circle:nth-child(2){" + i + "animation-delay: .15s; animation-delay: .15s;}.sequence-preloader .preloading .circle:nth-child(3){" + i + "animation-delay: .3s; animation-delay: .3s;}.preloading-complete{opacity: 0;visibility: hidden;" + i + "transition-duration: 1s; transition-duration: 1s;}div.inline{background-color: #ff9442; margin-right: 4px; float: left;}</style>"), t.prepend(a), Modernizr.svg || n ? n || setInterval(function() {
                    e(".sequence-preloader").fadeToggle(500)
                }, 500) : (e(".sequence-preloader").prepend('<div class="preloading"><div class="circle inline"></div><div class="circle inline"></div><div class="circle inline"></div></div>'), setInterval(function() {
                    e(".sequence-preloader .circle").fadeToggle(500)
                }, 500))
            },
            operaTest: function() {
                e("body").append('<span id="sequence-opera-test"></span>');
                var t = e("#sequence-opera-test");
                return t.css("-o-transition", "1s"), "1s" != t.css("-o-transition") ? !1 : !0
            }
        },
        i = {
            startingFrameID: 1,
            cycle: !0,
            animateStartingFrameIn: !1,
            transitionThreshold: 1e3,
            reverseAnimationsWhenNavigatingBackwards: !0,
            moveActiveFrameToTop: !0,
            autoPlay: !0,
            autoPlayDirection: 1,
            autoPlayDelay: 5e3,
            nextButton: !1,
            showNextButtonOnInit: !0,
            prevButton: !1,
            showPrevButtonOnInit: !0,
            pauseButton: !1,
            unpauseDelay: 0,
            pauseOnHover: !0,
            pauseIcon: !1,
            pauseOnElementsOutsideContainer: !1,
            preloader: !0,
            preloadTheseFrames: [1],
            preloadTheseImages: [],
            hideFramesUntilPreloaded: !0,
            prependPreloadingComplete: !0,
            hidePreloaderUsingCSS: !0,
            hidePreloaderDelay: 0,
            keyNavigation: !0,
            numericKeysGoToFrames: !0,
            keyEvents: {
                left: "prev",
                right: "next"
            },
            customKeyEvents: {},
            swipeNavigation: !0,
            swipeThreshold: 15,
            swipePreventsDefault: !1,
            swipeEvents: {
                left: "prev",
                right: "next",
                up: !1,
                down: !1
            },
            hashTags: !1,
            hashDataAttribute: !1,
            hashChangesOnFirstFrame: !1,
            fallback: {
                theme: "slide",
                speed: 500
            }
        }
}(jQuery),
function() {
    function e() {
        var e = $("body").attr("id");
        0 != e && "undefined" != typeof a[e] && n(a[e]), "undefined" != typeof a["*"] && n(a["*"])
    }

    function t(e, t) {
        "undefined" == typeof a[e] && (a[e] = []), a[e].push(t)
    }

    function n(e) {
        if (e instanceof Array)
            for (var t = e.length - 1; t >= 0; t--) e[t]()
    }
    var i = {
            version: "0.2"
        },
        a = {};
    $(document).ready(e), i.register = function(e, n) {
        if ("string" != typeof e && !(e instanceof Array) || "function" != typeof n) return !1;
        if ("string" == typeof e && -1 != e.indexOf(", ") && (e = e.split(", ")), e instanceof Array)
            for (var i = e.length - 1; i >= 0; i--) t(e[i], n);
        else t(e, n);
        return !0
    }, window.FunctionHandler = i
}(),
function($) {
    $.fn.hoverIntent = function(e, t) {
        var n = {
            sensitivity: 7,
            interval: 100,
            timeout: 0
        };
        n = $.extend(n, t ? {
            over: e,
            out: t
        } : e);
        var i, a, o, s, r = function(e) {
                i = e.pageX, a = e.pageY
            },
            l = function(e, t) {
                return t.hoverIntent_t = clearTimeout(t.hoverIntent_t), Math.abs(o - i) + Math.abs(s - a) < n.sensitivity ? ($(t).off("mousemove", r), t.hoverIntent_s = 1, n.over.apply(t, [e])) : (o = i, s = a, t.hoverIntent_t = setTimeout(function() {
                        l(e, t)
                    }, n.interval),
                    void 0)
            },
            c = function(e, t) {
                return t.hoverIntent_t = clearTimeout(t.hoverIntent_t), t.hoverIntent_s = 0, n.out.apply(t, [e])
            },
            d = function(e) {
                var t = jQuery.extend({}, e),
                    i = this;
                i.hoverIntent_t && (i.hoverIntent_t = clearTimeout(i.hoverIntent_t)), "mouseenter" == e.type ? (o = t.pageX, s = t.pageY, $(i).on("mousemove", r), 1 != i.hoverIntent_s && (i.hoverIntent_t = setTimeout(function() {
                    l(t, i)
                }, n.interval))) : ($(i).off("mousemove", r), 1 == i.hoverIntent_s && (i.hoverIntent_t = setTimeout(function() {
                    c(t, i)
                }, n.timeout)))
            };
        return this.on("mouseenter", d).on("mouseleave", d)
    }
}(jQuery),
function($, e, t, n) {
    var i = $(e);
    $.fn.lazyload = function(a) {
        function o() {
            var e = 0;
            s.each(function() {
                var t = $(this);
                if (!l.skip_invisible || t.is(":visible"))
                    if ($.abovethetop(this, l) || $.leftofbegin(this, l));
                    else if ($.belowthefold(this, l) || $.rightoffold(this, l)) {
                    if (++e > l.failure_limit) return !1
                } else t.trigger("appear"), e = 0
            })
        }
        var s = this,
            r, l = {
                threshold: 0,
                failure_limit: 0,
                event: "scroll",
                effect: "show",
                container: e,
                data_attribute: "original",
                skip_invisible: !0,
                appear: null,
                load: null,
                placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
            };
        return a && (n !== a.failurelimit && (a.failure_limit = a.failurelimit, delete a.failurelimit), n !== a.effectspeed && (a.effect_speed = a.effectspeed, delete a.effectspeed), $.extend(l, a)), r = l.container === n || l.container === e ? i : $(l.container), 0 === l.event.indexOf("scroll") && r.bind(l.event, function() {
            return o()
        }), this.each(function() {
            var e = this,
                t = $(e);
            e.loaded = !1, (t.attr("src") === n || t.attr("src") === !1) && t.is("img") && t.attr("src", l.placeholder), t.one("appear", function() {
                if (!this.loaded) {
                    if (l.appear) {
                        var n = s.length;
                        l.appear.call(e, n, l)
                    }
                    $("<img />").bind("load", function() {
                        var n = t.attr("data-" + l.data_attribute);
                        t.hide(), t.is("img") ? t.attr("src", n) : t.css("background-image", "url('" + n + "')"), t[l.effect](l.effect_speed), e.loaded = !0;
                        var i = $.grep(s, function(e) {
                            return !e.loaded
                        });
                        if (s = $(i), l.load) {
                            var a = s.length;
                            l.load.call(e, a, l)
                        }
                    }).attr("src", t.attr("data-" + l.data_attribute))
                }
            }), 0 !== l.event.indexOf("scroll") && t.bind(l.event, function() {
                e.loaded || t.trigger("appear")
            })
        }), i.bind("resize", function() {
            o()
        }), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && i.bind("pageshow", function(e) {
            e.originalEvent && e.originalEvent.persisted && s.each(function() {
                $(this).trigger("appear")
            })
        }), $(t).ready(function() {
            o()
        }), this
    }, $.belowthefold = function(t, a) {
        var o;
        return o = a.container === n || a.container === e ? (e.innerHeight ? e.innerHeight : i.height()) + i.scrollTop() : $(a.container).offset().top + $(a.container).height(), o <= $(t).offset().top - a.threshold
    }, $.rightoffold = function(t, a) {
        var o;
        return o = a.container === n || a.container === e ? i.width() + i.scrollLeft() : $(a.container).offset().left + $(a.container).width(), o <= $(t).offset().left - a.threshold
    }, $.abovethetop = function(t, a) {
        var o;
        return o = a.container === n || a.container === e ? i.scrollTop() : $(a.container).offset().top, o >= $(t).offset().top + a.threshold + $(t).height()
    }, $.leftofbegin = function(t, a) {
        var o;
        return o = a.container === n || a.container === e ? i.scrollLeft() : $(a.container).offset().left, o >= $(t).offset().left + a.threshold + $(t).width()
    }, $.inviewport = function(e, t) {
        return !($.rightoffold(e, t) || $.leftofbegin(e, t) || $.belowthefold(e, t) || $.abovethetop(e, t))
    }, $.extend($.expr[":"], {
        "below-the-fold": function(e) {
            return $.belowthefold(e, {
                threshold: 0
            })
        },
        "above-the-top": function(e) {
            return !$.belowthefold(e, {
                threshold: 0
            })
        },
        "right-of-screen": function(e) {
            return $.rightoffold(e, {
                threshold: 0
            })
        },
        "left-of-screen": function(e) {
            return !$.rightoffold(e, {
                threshold: 0
            })
        },
        "in-viewport": function(e) {
            return $.inviewport(e, {
                threshold: 0
            })
        },
        "above-the-fold": function(e) {
            return !$.belowthefold(e, {
                threshold: 0
            })
        },
        "right-of-fold": function(e) {
            return $.rightoffold(e, {
                threshold: 0
            })
        },
        "left-of-fold": function(e) {
            return !$.rightoffold(e, {
                threshold: 0
            })
        }
    })
}(jQuery, window, document), ! function(e) {
    e(function() {
        e.support.transition = function() {
            var e = function() {
                var e = document.createElement("bootstrap"),
                    t = {
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd otransitionend",
                        transition: "transitionend"
                    },
                    n;
                for (n in t)
                    if (void 0 !== e.style[n]) return t[n]
            }();
            return e && {
                end: e
            }
        }()
    })
}(window.jQuery), ! function(e) {
    var t = function(t, n) {
        this.options = n, this.$element = e(t).delegate('[data-dismiss="modal"]', "click.dismiss.modal", e.proxy(this.hide, this)), this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
    };
    t.prototype = {
        constructor: t,
        toggle: function() {
            return this[this.isShown ? "hide" : "show"]()
        },
        show: function() {
            var t = this,
                n = e.Event("show");
            this.$element.trigger(n), this.isShown || n.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.backdrop(function() {
                var n = e.support.transition && t.$element.hasClass("fade");
                t.$element.parent().length || t.$element.appendTo(document.body), t.$element.show(), n && t.$element[0].offsetWidth, t.$element.addClass("in").attr("aria-hidden", !1), t.enforceFocus(), n ? t.$element.one(e.support.transition.end, function() {
                    t.$element.focus().trigger("shown")
                }) : t.$element.focus().trigger("shown")
            }))
        },
        hide: function(t) {
            t && t.preventDefault();
            var n = this;
            t = e.Event("hide"), this.$element.trigger(t), this.isShown && !t.isDefaultPrevented() && (this.isShown = !1, this.escape(), e(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), e.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal())
        },
        enforceFocus: function() {
            var t = this;
            e(document).on("focusin.modal", function(e) {
                t.$element[0] !== e.target && !t.$element.has(e.target).length && t.$element.focus()
            })
        },
        escape: function() {
            var e = this;
            this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal", function(t) {
                27 == t.which && e.hide()
            }) : this.isShown || this.$element.off("keyup.dismiss.modal")
        },
        hideWithTransition: function() {
            var t = this,
                n = setTimeout(function() {
                    t.$element.off(e.support.transition.end), t.hideModal()
                }, 500);
            this.$element.one(e.support.transition.end, function() {
                clearTimeout(n), t.hideModal()
            })
        },
        hideModal: function() {
            var e = this;
            this.$element.hide(), this.backdrop(function() {
                e.removeBackdrop(), e.$element.trigger("hidden")
            })
        },
        removeBackdrop: function() {
            this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
        },
        backdrop: function(t) {
            var n = this,
                i = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var a = e.support.transition && i;
                if (this.$backdrop = e('<div class="modal-backdrop ' + i + '" />').appendTo(document.body), this.$backdrop.click("static" == this.options.backdrop ? e.proxy(this.$element[0].focus, this.$element[0]) : e.proxy(this.hide, this)), a && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !t) return;
                a ? this.$backdrop.one(e.support.transition.end, t) : t()
            } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(e.support.transition.end, t) : t()) : t && t()
        }
    };
    var n = e.fn.modal;
    e.fn.modal = function(n) {
        return this.each(function() {
            var i = e(this),
                a = i.data("modal"),
                o = e.extend({}, e.fn.modal.defaults, i.data(), "object" == typeof n && n);
            a || i.data("modal", a = new t(this, o)), "string" == typeof n ? a[n]() : o.show && a.show()
        })
    }, e.fn.modal.defaults = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, e.fn.modal.Constructor = t, e.fn.modal.noConflict = function() {
        return e.fn.modal = n, this
    }, e(document).on("click.modal.data-api", '[data-toggle="modal"]', function(t) {
        var n = e(this),
            i = n.attr("href"),
            a = e(n.attr("data-target") || i && i.replace(/.*(?=#[^\s]+$)/, "")),
            o = a.data("modal") ? "toggle" : e.extend({
                remote: !/#/.test(i) && i
            }, a.data(), n.data());
        t.preventDefault(), a.modal(o).one("hide", function() {
            n.focus()
        })
    })
}(window.jQuery), ! function(e) {
    function t() {
        e(i).each(function() {
            n(e(this)).removeClass("open")
        })
    }

    function n(t) {
        var n = t.attr("data-target"),
            i;
        return n || (n = t.attr("href"), n = n && /#/.test(n) && n.replace(/.*(?=#[^\s]*$)/, "")), i = n && e(n), i && i.length || (i = t.parent()), i
    }
    var i = "[data-toggle=dropdown]",
        a = function(t) {
            var n = e(t).on("click.dropdown.data-api", this.toggle);
            e("html").on("click.dropdown.data-api", function() {
                n.parent().removeClass("open")
            })
        };
    a.prototype = {
        constructor: a,
        toggle: function(i) {
            var a = e(this),
                o, s;
            if (!a.is(".disabled, :disabled")) return o = n(a), s = o.hasClass("open"), t(), s || o.toggleClass("open"), a.focus(), !1
        },
        keydown: function(t) {
            var a, o, s, r, l, c;
            if (/(38|40|27)/.test(t.keyCode) && (a = e(this), t.preventDefault(), t.stopPropagation(), !a.is(".disabled, :disabled"))) {
                if (r = n(a), l = r.hasClass("open"), !l || l && 27 == t.keyCode) return 27 == t.which && r.find(i).focus(), a.click();
                o = e("[role=menu] li:not(.divider):visible a", r), o.length && (c = o.index(o.filter(":focus")), 38 == t.keyCode && c > 0 && c--, 40 == t.keyCode && c < o.length - 1 && c++, ~c || (c = 0), o.eq(c).focus())
            }
        }
    };
    var o = e.fn.dropdown;
    e.fn.dropdown = function(t) {
        return this.each(function() {
            var n = e(this),
                i = n.data("dropdown");
            i || n.data("dropdown", i = new a(this)), "string" == typeof t && i[t].call(n)
        })
    }, e.fn.dropdown.Constructor = a, e.fn.dropdown.noConflict = function() {
        return e.fn.dropdown = o, this
    }, e(document).on("click.dropdown.data-api", t).on("click.dropdown.data-api", ".dropdown form", function(e) {
        e.stopPropagation()
    }).on("click.dropdown-menu", function(e) {
        e.stopPropagation()
    }).on("click.dropdown.data-api", i, a.prototype.toggle).on("keydown.dropdown.data-api", i + ", [role=menu]", a.prototype.keydown)
}(window.jQuery), ! function(e) {
    var t = function(t) {
        this.element = e(t)
    };
    t.prototype = {
        constructor: t,
        show: function() {
            var t = this.element,
                n = t.closest("ul:not(.dropdown-menu)"),
                i = t.attr("data-target"),
                a, o, s;
            i || (i = t.attr("href"), i = i && i.replace(/.*(?=#[^\s]*$)/, "")), t.parent("li").hasClass("active") || (a = n.find(".active:last a")[0], s = e.Event("show", {
                relatedTarget: a
            }), t.trigger(s), s.isDefaultPrevented() || (o = e(i), this.activate(t.parent("li"), n), this.activate(o, o.parent(), function() {
                t.trigger({
                    type: "shown",
                    relatedTarget: a
                })
            })))
        },
        activate: function(t, n, i) {
            function a() {
                o.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), t.addClass("active"), s ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"), t.parent(".dropdown-menu") && t.closest("li.dropdown").addClass("active"), i && i()
            }
            var o = n.find("> .active"),
                s = i && e.support.transition && o.hasClass("fade");
            s ? o.one(e.support.transition.end, a) : a(), o.removeClass("in")
        }
    };
    var n = e.fn.tab;
    e.fn.tab = function(n) {
        return this.each(function() {
            var i = e(this),
                a = i.data("tab");
            a || i.data("tab", a = new t(this)), "string" == typeof n && a[n]()
        })
    }, e.fn.tab.Constructor = t, e.fn.tab.noConflict = function() {
        return e.fn.tab = n, this
    }, e(document).on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(t) {
        t.preventDefault(), e(this).tab("show")
    })
}(window.jQuery), ! function(e) {
    var t = function(e, t) {
        this.init("tooltip", e, t)
    };
    t.prototype = {
        constructor: t,
        init: function(t, n, i) {
            var a, o, s, r, l;
            for (this.type = t, this.$element = e(n), this.options = this.getOptions(i), this.enabled = !0, s = this.options.trigger.split(" "), l = s.length; l--;) r = s[l], "click" == r ? this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this)) : "manual" != r && (a = "hover" == r ? "mouseenter" : "focus", o = "hover" == r ? "mouseleave" : "blur", this.$element.on(a + "." + this.type, this.options.selector, e.proxy(this.enter, this)), this.$element.on(o + "." + this.type, this.options.selector, e.proxy(this.leave, this)));
            this.options.selector ? this._options = e.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        },
        getOptions: function(t) {
            return t = e.extend({}, e.fn[this.type].defaults, this.$element.data(), t), t.delay && "number" == typeof t.delay && (t.delay = {
                show: t.delay,
                hide: t.delay
            }), t
        },
        enter: function(t) {
            var n = e.fn[this.type].defaults,
                i = {},
                a;
            return this._options && e.each(this._options, function(e, t) {
                n[e] != t && (i[e] = t)
            }, this), a = e(t.currentTarget)[this.type](i).data(this.type), a.options.delay && a.options.delay.show ? (clearTimeout(this.timeout), a.hoverState = "in", this.timeout = setTimeout(function() {
                "in" == a.hoverState && a.show()
            }, a.options.delay.show), void 0) : a.show()
        },
        leave: function(t) {
            var n = e(t.currentTarget)[this.type](this._options).data(this.type);
            return this.timeout && clearTimeout(this.timeout), n.options.delay && n.options.delay.hide ? (n.hoverState = "out", void(this.timeout = setTimeout(function() {
                "out" == n.hoverState && n.hide()
            }, n.options.delay.hide))) : n.hide()
        },
        show: function() {
            var t, n, i, a, o, s, r = e.Event("show");
            if (this.hasContent() && this.enabled) {
                if (this.$element.trigger(r), r.isDefaultPrevented()) return;
                switch (t = this.tip(), this.setContent(), this.options.animation && t.addClass("fade"), o = "function" == typeof this.options.placement ? this.options.placement.call(this, t[0], this.$element[0]) : this.options.placement, t.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }), this.options.container ? t.appendTo(this.options.container) : t.insertAfter(this.$element), n = this.getPosition(), i = t[0].offsetWidth, a = t[0].offsetHeight, o) {
                    case "bottom":
                        s = {
                            top: n.top + n.height,
                            left: n.left + n.width / 2 - i / 2
                        };
                        break;
                    case "top":
                        s = {
                            top: n.top - a,
                            left: n.left + n.width / 2 - i / 2
                        };
                        break;
                    case "left":
                        s = {
                            top: n.top + n.height / 2 - a / 2,
                            left: n.left - i
                        };
                        break;
                    case "right":
                        s = {
                            top: n.top + n.height / 2 - a / 2,
                            left: n.left + n.width
                        }
                }
                this.applyPlacement(s, o), this.$element.trigger("shown")
            }
        },
        applyPlacement: function(e, t) {
            var n = this.tip(),
                i = n[0].offsetWidth,
                a = n[0].offsetHeight,
                o, s, r, l;
            n.offset(e).addClass(t).addClass("in"), o = n[0].offsetWidth, s = n[0].offsetHeight, "top" == t && s != a && (e.top = e.top + a - s, l = !0), "bottom" == t || "top" == t ? (r = 0, e.left < 0 && (r = -2 * e.left, e.left = 0, n.offset(e), o = n[0].offsetWidth, s = n[0].offsetHeight), this.replaceArrow(r - i + o, o, "left")) : this.replaceArrow(s - a, s, "top"), l && n.offset(e)
        },
        replaceArrow: function(e, t, n) {
            this.arrow().css(n, e ? 50 * (1 - e / t) + "%" : "")
        },
        setContent: function() {
            var e = this.tip(),
                t = this.getTitle();
            e.find(".tooltip-inner")[this.options.html ? "html" : "text"](t), e.removeClass("fade in top bottom left right")
        },
        hide: function() {
            function t() {
                var t = setTimeout(function() {
                    i.off(e.support.transition.end).detach()
                }, 500);
                i.one(e.support.transition.end, function() {
                    clearTimeout(t), i.detach()
                })
            }
            var n = this,
                i = this.tip(),
                a = e.Event("hide");
            return this.$element.trigger(a), a.isDefaultPrevented() ? void 0 : (i.removeClass("in"), e.support.transition && this.$tip.hasClass("fade") ? t() : i.detach(), this.$element.trigger("hidden"), this)
        },
        fixTitle: function() {
            var e = this.$element;
            (e.attr("title") || "string" != typeof e.attr("data-original-title")) && e.attr("data-original-title", e.attr("title") || "").attr("title", "")
        },
        hasContent: function() {
            return this.getTitle()
        },
        getPosition: function() {
            var t = this.$element[0];
            return e.extend({}, "function" == typeof t.getBoundingClientRect ? t.getBoundingClientRect() : {
                width: t.offsetWidth,
                height: t.offsetHeight
            }, this.$element.offset())
        },
        getTitle: function() {
            var e, t = this.$element,
                n = this.options;
            return e = t.attr("data-original-title") || ("function" == typeof n.title ? n.title.call(t[0]) : n.title)
        },
        tip: function() {
            return this.$tip = this.$tip || e(this.options.template)
        },
        arrow: function() {
            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
        },
        validate: function() {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        },
        enable: function() {
            this.enabled = !0
        },
        disable: function() {
            this.enabled = !1
        },
        toggleEnabled: function() {
            this.enabled = !this.enabled
        },
        toggle: function(t) {
            var n = t ? e(t.currentTarget)[this.type](this._options).data(this.type) : this;
            n.tip().hasClass("in") ? n.hide() : n.show()
        },
        destroy: function() {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    };
    var n = e.fn.tooltip;
    e.fn.tooltip = function(n) {
        return this.each(function() {
            var i = e(this),
                a = i.data("tooltip"),
                o = "object" == typeof n && n;
            a || i.data("tooltip", a = new t(this, o)), "string" == typeof n && a[n]()
        })
    }, e.fn.tooltip.Constructor = t, e.fn.tooltip.defaults = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1
    }, e.fn.tooltip.noConflict = function() {
        return e.fn.tooltip = n, this
    }
}(window.jQuery), ! function(e) {
    var t = function(t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.button.defaults, n)
    };
    t.prototype.setState = function(e) {
        var t = "disabled",
            n = this.$element,
            i = n.data(),
            a = n.is("input") ? "val" : "html";
        e += "Text", i.resetText || n.data("resetText", n[a]()), n[a](i[e] || this.options[e]), setTimeout(function() {
            "loadingText" == e ? n.addClass(t).attr(t, t) : n.removeClass(t).removeAttr(t)
        }, 0)
    }, t.prototype.toggle = function() {
        var e = this.$element.closest('[data-toggle="buttons-radio"]');
        e && e.find(".active").removeClass("active"), this.$element.toggleClass("active")
    };
    var n = e.fn.button;
    e.fn.button = function(n) {
        return this.each(function() {
            var i = e(this),
                a = i.data("button"),
                o = "object" == typeof n && n;
            a || i.data("button", a = new t(this, o)), "toggle" == n ? a.toggle() : n && a.setState(n)
        })
    }, e.fn.button.defaults = {
        loadingText: "loading..."
    }, e.fn.button.Constructor = t, e.fn.button.noConflict = function() {
        return e.fn.button = n, this
    }, e(document).on("click.button.data-api", "[data-toggle^=button]", function(t) {
        var n = e(t.target);
        n.hasClass("btn") || (n = n.closest(".btn")), n.button("toggle")
    })
}(window.jQuery), ! function(e) {
    var t = function(t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.collapse.defaults, n), this.options.parent && (this.$parent = e(this.options.parent)), this.options.toggle && this.toggle()
    };
    t.prototype = {
        constructor: t,
        dimension: function() {
            var e = this.$element.hasClass("width");
            return e ? "width" : "height"
        },
        show: function() {
            var t, n, i, a;
            if (!this.transitioning && !this.$element.hasClass("in")) {
                if (t = this.dimension(), n = e.camelCase(["scroll", t].join("-")), i = this.$parent && this.$parent.find("> .accordion-group > .in"), i && i.length) {
                    if (a = i.data("collapse"), a && a.transitioning) return;
                    i.collapse("hide"), a || i.data("collapse", null)
                }
                this.$element[t](0), this.transition("addClass", e.Event("show"), "shown"), e.support.transition && this.$element[t](this.$element[0][n])
            }
        },
        hide: function() {
            var t;
            !this.transitioning && this.$element.hasClass("in") && (t = this.dimension(), this.reset(this.$element[t]()), this.transition("removeClass", e.Event("hide"), "hidden"), this.$element[t](0))
        },
        reset: function(e) {
            var t = this.dimension();
            return this.$element.removeClass("collapse")[t](e || "auto")[0].offsetWidth, this.$element[null !== e ? "addClass" : "removeClass"]("collapse"), this
        },
        transition: function(t, n, i) {
            var a = this,
                o = function() {
                    "show" == n.type && a.reset(), a.transitioning = 0, a.$element.trigger(i)
                };
            this.$element.trigger(n), n.isDefaultPrevented() || (this.transitioning = 1, this.$element[t]("in"), e.support.transition && this.$element.hasClass("collapse") ? this.$element.one(e.support.transition.end, o) : o())
        },
        toggle: function() {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        }
    };
    var n = e.fn.collapse;
    e.fn.collapse = function(n) {
        return this.each(function() {
            var i = e(this),
                a = i.data("collapse"),
                o = e.extend({}, e.fn.collapse.defaults, i.data(), "object" == typeof n && n);
            a || i.data("collapse", a = new t(this, o)), "string" == typeof n && a[n]()
        })
    }, e.fn.collapse.defaults = {
        toggle: !0
    }, e.fn.collapse.Constructor = t, e.fn.collapse.noConflict = function() {
        return e.fn.collapse = n, this
    }, e(document).on("click.collapse.data-api", "[data-toggle=collapse]", function(t) {
        var n = e(this),
            i, a = n.attr("data-target") || t.preventDefault() || (i = n.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, ""),
            o = e(a).data("collapse") ? "toggle" : n.data();
        n[e(a).hasClass("in") ? "addClass" : "removeClass"]("collapsed"), e(a).collapse(o)
    })
}(window.jQuery), ! function(e) {
    var t = function(t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.typeahead.defaults, n), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.source = this.options.source, this.$menu = e(this.options.menu), this.shown = !1, this.listen()
    };
    t.prototype = {
        constructor: t,
        select: function() {
            var e = this.$menu.find(".active").attr("data-value");
            return this.$element.val(this.updater(e)).change(), this.hide()
        },
        updater: function(e) {
            return e
        },
        show: function() {
            var t = e.extend({}, this.$element.position(), {
                height: this.$element[0].offsetHeight
            });
            return this.$menu.insertAfter(this.$element).css({
                top: t.top + t.height,
                left: t.left
            }).show(), this.shown = !0, this
        },
        hide: function() {
            return this.$menu.hide(), this.shown = !1, this
        },
        lookup: function(t) {
            var n;
            return this.query = this.$element.val(), !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (n = e.isFunction(this.source) ? this.source(this.query, e.proxy(this.process, this)) : this.source, n ? this.process(n) : this)
        },
        process: function(t) {
            var n = this;
            return t = e.grep(t, function(e) {
                return n.matcher(e)
            }), t = this.sorter(t), t.length ? this.render(t.slice(0, this.options.items)).show() : this.shown ? this.hide() : this
        },
        matcher: function(e) {
            return ~e.toLowerCase().indexOf(this.query.toLowerCase())
        },
        sorter: function(e) {
            for (var t = [], n = [], i = [], a; a = e.shift();) a.toLowerCase().indexOf(this.query.toLowerCase()) ? ~a.indexOf(this.query) ? n.push(a) : i.push(a) : t.push(a);
            return t.concat(n, i)
        },
        highlighter: function(e) {
            var t = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            return e.replace(new RegExp("(" + t + ")", "ig"), function(e, t) {
                return "<strong>" + t + "</strong>"
            })
        },
        render: function(t) {
            var n = this;
            return t = e(t).map(function(t, i) {
                return t = e(n.options.item).attr("data-value", i), t.find("a").html(n.highlighter(i)), t[0]
            }), t.first().addClass("active"), this.$menu.html(t), this
        },
        next: function(t) {
            var n = this.$menu.find(".active").removeClass("active"),
                i = n.next();
            i.length || (i = e(this.$menu.find("li")[0])), i.addClass("active")
        },
        prev: function(e) {
            var t = this.$menu.find(".active").removeClass("active"),
                n = t.prev();
            n.length || (n = this.$menu.find("li").last()), n.addClass("active")
        },
        listen: function() {
            this.$element.on("focus", e.proxy(this.focus, this)).on("blur", e.proxy(this.blur, this)).on("keypress", e.proxy(this.keypress, this)).on("keyup", e.proxy(this.keyup, this)), this.eventSupported("keydown") && this.$element.on("keydown", e.proxy(this.keydown, this)), this.$menu.on("click", e.proxy(this.click, this)).on("mouseenter", "li", e.proxy(this.mouseenter, this)).on("mouseleave", "li", e.proxy(this.mouseleave, this))
        },
        eventSupported: function(e) {
            var t = e in this.$element;
            return t || (this.$element.setAttribute(e, "return;"), t = "function" == typeof this.$element[e]), t
        },
        move: function(e) {
            if (this.shown) {
                switch (e.keyCode) {
                    case 9:
                    case 13:
                    case 27:
                        e.preventDefault();
                        break;
                    case 38:
                        e.preventDefault(), this.prev();
                        break;
                    case 40:
                        e.preventDefault(), this.next()
                }
                e.stopPropagation()
            }
        },
        keydown: function(t) {
            this.suppressKeyPressRepeat = ~e.inArray(t.keyCode, [40, 38, 9, 13, 27]), this.move(t)
        },
        keypress: function(e) {
            this.suppressKeyPressRepeat || this.move(e)
        },
        keyup: function(e) {
            switch (e.keyCode) {
                case 40:
                case 38:
                case 16:
                case 17:
                case 18:
                    break;
                case 9:
                case 13:
                    if (!this.shown) return;
                    this.select();
                    break;
                case 27:
                    if (!this.shown) return;
                    this.hide();
                    break;
                default:
                    this.lookup()
            }
            e.stopPropagation(), e.preventDefault()
        },
        focus: function(e) {
            this.focused = !0
        },
        blur: function(e) {
            this.focused = !1, !this.mousedover && this.shown && this.hide()
        },
        click: function(e) {
            e.stopPropagation(), e.preventDefault(), this.select(), this.$element.focus()
        },
        mouseenter: function(t) {
            this.mousedover = !0, this.$menu.find(".active").removeClass("active"), e(t.currentTarget).addClass("active")
        },
        mouseleave: function(e) {
            this.mousedover = !1, !this.focused && this.shown && this.hide()
        }
    };
    var n = e.fn.typeahead;
    e.fn.typeahead = function(n) {
        return this.each(function() {
            var i = e(this),
                a = i.data("typeahead"),
                o = "object" == typeof n && n;
            a || i.data("typeahead", a = new t(this, o)), "string" == typeof n && a[n]()
        })
    }, e.fn.typeahead.defaults = {
        source: [],
        items: 8,
        menu: '<ul class="typeahead dropdown-menu"></ul>',
        item: '<li><a href="#"></a></li>',
        minLength: 1
    }, e.fn.typeahead.Constructor = t, e.fn.typeahead.noConflict = function() {
        return e.fn.typeahead = n, this
    }, e(document).on("focus.typeahead.data-api", '[data-provide="typeahead"]', function(t) {
        var n = e(this);
        n.data("typeahead") || n.typeahead(n.data())
    })
}(window.jQuery), ! function(e, t, n, i) {
    function a(t, n) {
        this.element = t, this.options = e.extend({}, s, n), this._defaults = s, this._name = o, this.init()
    }
    var o = "stellar",
        s = {
            scrollProperty: "scroll",
            positionProperty: "position",
            horizontalScrolling: !0,
            verticalScrolling: !0,
            horizontalOffset: 0,
            verticalOffset: 0,
            responsive: !1,
            parallaxBackgrounds: !0,
            parallaxElements: !0,
            hideDistantElements: !0,
            hideElement: function(e) {
                e.hide()
            },
            showElement: function(e) {
                e.show()
            }
        },
        r = {
            scroll: {
                getLeft: function(e) {
                    return e.scrollLeft()
                },
                setLeft: function(e, t) {
                    e.scrollLeft(t)
                },
                getTop: function(e) {
                    return e.scrollTop()
                },
                setTop: function(e, t) {
                    e.scrollTop(t)
                }
            },
            position: {
                getLeft: function(e) {
                    return -1 * parseInt(e.css("left"), 10)
                },
                getTop: function(e) {
                    return -1 * parseInt(e.css("top"), 10)
                }
            },
            margin: {
                getLeft: function(e) {
                    return -1 * parseInt(e.css("margin-left"), 10)
                },
                getTop: function(e) {
                    return -1 * parseInt(e.css("margin-top"), 10)
                }
            },
            transform: {
                getLeft: function(e) {
                    var t = getComputedStyle(e[0])[d];
                    return "none" !== t ? -1 * parseInt(t.match(/(-?[0-9]+)/g)[4], 10) : 0
                },
                getTop: function(e) {
                    var t = getComputedStyle(e[0])[d];
                    return "none" !== t ? -1 * parseInt(t.match(/(-?[0-9]+)/g)[5], 10) : 0
                }
            }
        },
        l = {
            position: {
                setLeft: function(e, t) {
                    e.css("left", t)
                },
                setTop: function(e, t) {
                    e.css("top", t)
                }
            },
            transform: {
                setPosition: function(e, t, n, i, a) {
                    e[0].style[d] = "translate3d(" + (t - n) + "px, " + (i - a) + "px, 0)"
                }
            }
        },
        c = function() {
            var t, n = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
                i = e("script")[0].style,
                a = "";
            for (t in i)
                if (n.test(t)) {
                    a = t.match(n)[0];
                    break
                }
            return "WebkitOpacity" in i && (a = "Webkit"), "KhtmlOpacity" in i && (a = "Khtml"),
                function(e) {
                    return a + (a.length > 0 ? e.charAt(0).toUpperCase() + e.slice(1) : e)
                }
        }(),
        d = c("transform"),
        u = e("<div />", {
            style: "background:#fff"
        }).css("background-position-x") !== i,
        h = u ? function(e, t, n) {
            e.css({
                "background-position-x": t,
                "background-position-y": n
            })
        } : function(e, t, n) {
            e.css("background-position", t + " " + n)
        },
        f = u ? function(e) {
            return [e.css("background-position-x"), e.css("background-position-y")]
        } : function(e) {
            return e.css("background-position").split(" ")
        },
        p = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame || function(e) {
            setTimeout(e, 1e3 / 60)
        };
    a.prototype = {
        init: function() {
            this.options.name = o + "_" + Math.floor(1e9 * Math.random()), this._defineElements(), this._defineGetters(), this._defineSetters(), this._handleWindowLoadAndResize(), this._detectViewport(), this.refresh({
                firstLoad: !0
            }), "scroll" === this.options.scrollProperty ? this._handleScrollEvent() : this._startAnimationLoop()
        },
        _defineElements: function() {
            this.element === n.body && (this.element = t), this.$scrollElement = e(this.element), this.$element = this.element === t ? e("body") : this.$scrollElement, this.$viewportElement = this.options.viewportElement !== i ? e(this.options.viewportElement) : this.$scrollElement[0] === t || "scroll" === this.options.scrollProperty ? this.$scrollElement : this.$scrollElement.parent()
        },
        _defineGetters: function() {
            var e = this,
                t = r[e.options.scrollProperty];
            this._getScrollLeft = function() {
                return t.getLeft(e.$scrollElement)
            }, this._getScrollTop = function() {
                return t.getTop(e.$scrollElement)
            }
        },
        _defineSetters: function() {
            var t = this,
                n = r[t.options.scrollProperty],
                i = l[t.options.positionProperty],
                a = n.setLeft,
                o = n.setTop;
            this._setScrollLeft = "function" == typeof a ? function(e) {
                a(t.$scrollElement, e)
            } : e.noop, this._setScrollTop = "function" == typeof o ? function(e) {
                o(t.$scrollElement, e)
            } : e.noop, this._setPosition = i.setPosition || function(e, n, a, o, s) {
                t.options.horizontalScrolling && i.setLeft(e, n, a), t.options.verticalScrolling && i.setTop(e, o, s)
            }
        },
        _handleWindowLoadAndResize: function() {
            var n = this,
                i = e(t);
            n.options.responsive && i.bind("load." + this.name, function() {
                n.refresh()
            }), i.bind("resize." + this.name, function() {
                n._detectViewport(), n.options.responsive && n.refresh()
            })
        },
        refresh: function(n) {
            var i = this,
                a = i._getScrollLeft(),
                o = i._getScrollTop();
            n && n.firstLoad || this._reset(), this._setScrollLeft(0), this._setScrollTop(0), this._setOffsets(), this._findParticles(), this._findBackgrounds(), n && n.firstLoad && /WebKit/.test(navigator.userAgent) && e(t).load(function() {
                var e = i._getScrollLeft(),
                    t = i._getScrollTop();
                i._setScrollLeft(e + 1), i._setScrollTop(t + 1), i._setScrollLeft(e), i._setScrollTop(t)
            }), this._setScrollLeft(a), this._setScrollTop(o)
        },
        _detectViewport: function() {
            var e = this.$viewportElement.offset(),
                t = null !== e && e !== i;
            this.viewportWidth = this.$viewportElement.width(), this.viewportHeight = this.$viewportElement.height(), this.viewportOffsetTop = t ? e.top : 0, this.viewportOffsetLeft = t ? e.left : 0
        },
        _findParticles: function() {
            var t = this;
            if (this._getScrollLeft(), this._getScrollTop(), this.particles !== i)
                for (var n = this.particles.length - 1; n >= 0; n--) this.particles[n].$element.data("stellar-elementIsActive", i);
            this.particles = [], this.options.parallaxElements && this.$element.find("[data-stellar-ratio]").each(function() {
                var n, a, o, s, r, l, c, d, u, h = e(this),
                    f = 0,
                    p = 0,
                    m = 0,
                    g = 0;
                if (h.data("stellar-elementIsActive")) {
                    if (h.data("stellar-elementIsActive") !== this) return
                } else h.data("stellar-elementIsActive", this);
                t.options.showElement(h), h.data("stellar-startingLeft") ? (h.css("left", h.data("stellar-startingLeft")), h.css("top", h.data("stellar-startingTop"))) : (h.data("stellar-startingLeft", h.css("left")), h.data("stellar-startingTop", h.css("top"))), o = h.position().left, s = h.position().top, r = "auto" === h.css("margin-left") ? 0 : parseInt(h.css("margin-left"), 10), l = "auto" === h.css("margin-top") ? 0 : parseInt(h.css("margin-top"), 10), d = h.offset().left - r, u = h.offset().top - l, h.parents().each(function() {
                    var t = e(this);
                    return t.data("stellar-offset-parent") === !0 ? (f = m, p = g, c = t, !1) : (m += t.position().left, void(g += t.position().top))
                }), n = h.data("stellar-horizontal-offset") !== i ? h.data("stellar-horizontal-offset") : c !== i && c.data("stellar-horizontal-offset") !== i ? c.data("stellar-horizontal-offset") : t.horizontalOffset, a = h.data("stellar-vertical-offset") !== i ? h.data("stellar-vertical-offset") : c !== i && c.data("stellar-vertical-offset") !== i ? c.data("stellar-vertical-offset") : t.verticalOffset, t.particles.push({
                    $element: h,
                    $offsetParent: c,
                    isFixed: "fixed" === h.css("position"),
                    horizontalOffset: n,
                    verticalOffset: a,
                    startingPositionLeft: o,
                    startingPositionTop: s,
                    startingOffsetLeft: d,
                    startingOffsetTop: u,
                    parentOffsetLeft: f,
                    parentOffsetTop: p,
                    stellarRatio: h.data("stellar-ratio") !== i ? h.data("stellar-ratio") : 1,
                    width: h.outerWidth(!0),
                    height: h.outerHeight(!0),
                    isHidden: !1
                })
            })
        },
        _findBackgrounds: function() {
            var t, n = this,
                a = this._getScrollLeft(),
                o = this._getScrollTop();
            this.backgrounds = [], this.options.parallaxBackgrounds && (t = this.$element.find("[data-stellar-background-ratio]"), this.$element.data("stellar-background-ratio") && (t = t.add(this.$element)), t.each(function() {
                var t, s, r, l, c, d, u, p = e(this),
                    m = f(p),
                    g = 0,
                    v = 0,
                    y = 0,
                    w = 0;
                if (p.data("stellar-backgroundIsActive")) {
                    if (p.data("stellar-backgroundIsActive") !== this) return
                } else p.data("stellar-backgroundIsActive", this);
                p.data("stellar-backgroundStartingLeft") ? h(p, p.data("stellar-backgroundStartingLeft"), p.data("stellar-backgroundStartingTop")) : (p.data("stellar-backgroundStartingLeft", m[0]), p.data("stellar-backgroundStartingTop", m[1])), r = "auto" === p.css("margin-left") ? 0 : parseInt(p.css("margin-left"), 10), l = "auto" === p.css("margin-top") ? 0 : parseInt(p.css("margin-top"), 10), c = p.offset().left - r - a, d = p.offset().top - l - o, p.parents().each(function() {
                    var t = e(this);
                    return t.data("stellar-offset-parent") === !0 ? (g = y, v = w, u = t, !1) : (y += t.position().left, void(w += t.position().top))
                }), t = p.data("stellar-horizontal-offset") !== i ? p.data("stellar-horizontal-offset") : u !== i && u.data("stellar-horizontal-offset") !== i ? u.data("stellar-horizontal-offset") : n.horizontalOffset, s = p.data("stellar-vertical-offset") !== i ? p.data("stellar-vertical-offset") : u !== i && u.data("stellar-vertical-offset") !== i ? u.data("stellar-vertical-offset") : n.verticalOffset, n.backgrounds.push({
                    $element: p,
                    $offsetParent: u,
                    isFixed: "fixed" === p.css("background-attachment"),
                    horizontalOffset: t,
                    verticalOffset: s,
                    startingValueLeft: m[0],
                    startingValueTop: m[1],
                    startingBackgroundPositionLeft: isNaN(parseInt(m[0], 10)) ? 0 : parseInt(m[0], 10),
                    startingBackgroundPositionTop: isNaN(parseInt(m[1], 10)) ? 0 : parseInt(m[1], 10),
                    startingPositionLeft: p.position().left,
                    startingPositionTop: p.position().top,
                    startingOffsetLeft: c,
                    startingOffsetTop: d,
                    parentOffsetLeft: g,
                    parentOffsetTop: v,
                    stellarRatio: p.data("stellar-background-ratio") === i ? 1 : p.data("stellar-background-ratio")
                })
            }))
        },
        _reset: function() {
            var e, t, n, i, a;
            for (a = this.particles.length - 1; a >= 0; a--) e = this.particles[a], t = e.$element.data("stellar-startingLeft"), n = e.$element.data("stellar-startingTop"), this._setPosition(e.$element, t, t, n, n), this.options.showElement(e.$element), e.$element.data("stellar-startingLeft", null).data("stellar-elementIsActive", null).data("stellar-backgroundIsActive", null);
            for (a = this.backgrounds.length - 1; a >= 0; a--) i = this.backgrounds[a], i.$element.data("stellar-backgroundStartingLeft", null).data("stellar-backgroundStartingTop", null),
                h(i.$element, i.startingValueLeft, i.startingValueTop)
        },
        destroy: function() {
            this._reset(), this.$scrollElement.unbind("resize." + this.name).unbind("scroll." + this.name), this._animationLoop = e.noop, e(t).unbind("load." + this.name).unbind("resize." + this.name)
        },
        _setOffsets: function() {
            var n = this,
                i = e(t);
            i.unbind("resize.horizontal-" + this.name).unbind("resize.vertical-" + this.name), "function" == typeof this.options.horizontalOffset ? (this.horizontalOffset = this.options.horizontalOffset(), i.bind("resize.horizontal-" + this.name, function() {
                n.horizontalOffset = n.options.horizontalOffset()
            })) : this.horizontalOffset = this.options.horizontalOffset, "function" == typeof this.options.verticalOffset ? (this.verticalOffset = this.options.verticalOffset(), i.bind("resize.vertical-" + this.name, function() {
                n.verticalOffset = n.options.verticalOffset()
            })) : this.verticalOffset = this.options.verticalOffset
        },
        _repositionElements: function() {
            var e, t, n, i, a, o, s, r, l, c, d = this._getScrollLeft(),
                u = this._getScrollTop(),
                f = !0,
                p = !0;
            if (this.currentScrollLeft !== d || this.currentScrollTop !== u || this.currentWidth !== this.viewportWidth || this.currentHeight !== this.viewportHeight) {
                for (this.currentScrollLeft = d, this.currentScrollTop = u, this.currentWidth = this.viewportWidth, this.currentHeight = this.viewportHeight, c = this.particles.length - 1; c >= 0; c--) e = this.particles[c], t = e.isFixed ? 1 : 0, this.options.horizontalScrolling ? (o = (d + e.horizontalOffset + this.viewportOffsetLeft + e.startingPositionLeft - e.startingOffsetLeft + e.parentOffsetLeft) * -(e.stellarRatio + t - 1) + e.startingPositionLeft, r = o - e.startingPositionLeft + e.startingOffsetLeft) : (o = e.startingPositionLeft, r = e.startingOffsetLeft), this.options.verticalScrolling ? (s = (u + e.verticalOffset + this.viewportOffsetTop + e.startingPositionTop - e.startingOffsetTop + e.parentOffsetTop) * -(e.stellarRatio + t - 1) + e.startingPositionTop, l = s - e.startingPositionTop + e.startingOffsetTop) : (s = e.startingPositionTop, l = e.startingOffsetTop), this.options.hideDistantElements && (p = !this.options.horizontalScrolling || r + e.width > (e.isFixed ? 0 : d) && r < (e.isFixed ? 0 : d) + this.viewportWidth + this.viewportOffsetLeft, f = !this.options.verticalScrolling || l + e.height > (e.isFixed ? 0 : u) && l < (e.isFixed ? 0 : u) + this.viewportHeight + this.viewportOffsetTop), p && f ? (e.isHidden && (this.options.showElement(e.$element), e.isHidden = !1), this._setPosition(e.$element, o, e.startingPositionLeft, s, e.startingPositionTop)) : e.isHidden || (this.options.hideElement(e.$element), e.isHidden = !0);
                for (c = this.backgrounds.length - 1; c >= 0; c--) n = this.backgrounds[c], t = n.isFixed ? 0 : 1, i = this.options.horizontalScrolling ? (d + n.horizontalOffset - this.viewportOffsetLeft - n.startingOffsetLeft + n.parentOffsetLeft - n.startingBackgroundPositionLeft) * (t - n.stellarRatio) + "px" : n.startingValueLeft, a = this.options.verticalScrolling ? (u + n.verticalOffset - this.viewportOffsetTop - n.startingOffsetTop + n.parentOffsetTop - n.startingBackgroundPositionTop) * (t - n.stellarRatio) + "px" : n.startingValueTop, h(n.$element, i, a)
            }
        },
        _handleScrollEvent: function() {
            var e = this,
                t = !1,
                n = function() {
                    e._repositionElements(), t = !1
                },
                i = function() {
                    t || (p(n), t = !0)
                };
            this.$scrollElement.bind("scroll." + this.name, i), i()
        },
        _startAnimationLoop: function() {
            var e = this;
            this._animationLoop = function() {
                p(e._animationLoop), e._repositionElements()
            }, this._animationLoop()
        }
    }, e.fn[o] = function(t) {
        var n = arguments;
        return t === i || "object" == typeof t ? this.each(function() {
            e.data(this, "plugin_" + o) || e.data(this, "plugin_" + o, new a(this, t))
        }) : "string" == typeof t && "_" !== t[0] && "init" !== t ? this.each(function() {
            var i = e.data(this, "plugin_" + o);
            i instanceof a && "function" == typeof i[t] && i[t].apply(i, Array.prototype.slice.call(n, 1)), "destroy" === t && e.data(this, "plugin_" + o, null)
        }) : void 0
    }, e[o] = function() {
        var n = e(t);
        return n.stellar.apply(n, Array.prototype.slice.call(arguments, 0))
    }, e[o].scrollProperty = r, e[o].positionProperty = l, t.Stellar = a
}(jQuery, this, document),
function($, e) {
    "use strict";
    var t = {
        item: 3,
        autoWidth: !1,
        slideMove: 1,
        slideMargin: 10,
        addClass: "",
        mode: "slide",
        useCSS: !0,
        cssEasing: "ease",
        easing: "linear",
        speed: 400,
        auto: !1,
        loop: !1,
        slideEndAnimatoin: !0,
        pause: 2e3,
        keyPress: !1,
        controls: !0,
        prevHtml: "",
        nextHtml: "",
        rtl: !1,
        adaptiveHeight: !1,
        vertical: !1,
        verticalHeight: 500,
        vThumbWidth: 100,
        thumbItem: 10,
        pager: !0,
        gallery: !1,
        galleryMargin: 5,
        thumbMargin: 5,
        currentPagerPosition: "middle",
        enableTouch: !0,
        enableDrag: !0,
        freeMove: !0,
        swipeThreshold: 40,
        responsive: [],
        onBeforeStart: function(e) {},
        onSliderLoad: function(e) {},
        onBeforeSlide: function(e, t) {},
        onAfterSlide: function(e, t) {},
        onBeforeNextSlide: function(e, t) {},
        onBeforePrevSlide: function(e, t) {}
    };
    $.fn.lightSlider = function(e) {
        if (0 === this.length) return this;
        if (this.length > 1) return this.each(function() {
            $(this).lightSlider(e)
        }), this;
        var n = {},
            i = $.extend(!0, {}, t, e),
            a = {},
            o = this;
        n.$el = this, "fade" === i.mode && (i.vertical = !1);
        var s = o.children(),
            r = $(window).width(),
            l = null,
            c = null,
            d = 0,
            u = 0,
            h = !1,
            f = 0,
            p = "",
            m = 0,
            g = i.vertical === !0 ? "height" : "width",
            v = i.vertical === !0 ? "margin-bottom" : "margin-right",
            y = 0,
            w = 0,
            b = 0,
            T = 0,
            C = null,
            x = "ontouchstart" in document.documentElement,
            S = new Object;
        return S.chbreakpoint = function() {
            if (r = $(window).width(), i.responsive.length) {
                if (i.autoWidth === !1) var e = i.item;
                if (r < i.responsive[0].breakpoint)
                    for (var t = 0; t < i.responsive.length; t++) r < i.responsive[t].breakpoint && (l = i.responsive[t].breakpoint, c = i.responsive[t]);
                if ("undefined" != typeof c && null != c)
                    for (t in c.settings)("undefined" == typeof a[t] || null == a[t]) && (a[t] = i[t]), i[t] = c.settings[t];
                if (!$.isEmptyObject(a) && r > i.responsive[0].breakpoint)
                    for (t in a) i[t] = a[t];
                i.autoWidth === !1 && y > 0 && b > 0 && e !== i.item && (m = Math.round(y / ((b + i.slideMargin) * i.slideMove)))
            }
        }, S.calSW = function() {
            i.autoWidth === !1 && (b = (f - (i.item * i.slideMargin - i.slideMargin)) / i.item)
        }, S.calWidth = function(e) {
            var t = e === !0 ? p.find(".lslide").length : s.length;
            if (i.autoWidth === !1) u = t * (b + i.slideMargin);
            else {
                u = 0;
                for (var n = 0; t > n; n++) u += parseInt(s.eq(n).width()) + i.slideMargin
            }
            return u % 1 !== 0 && (u += 1), u
        }, n = {
            doCss: function() {
                var e = function() {
                    for (var e = ["transition", "MozTransition", "WebkitTransition", "OTransition", "msTransition", "KhtmlTransition"], t = document.documentElement, n = 0; n < e.length; n++)
                        if (e[n] in t.style) return !0
                };
                return i.useCSS && e() ? !0 : !1
            },
            keyPress: function() {
                i.keyPress && $(document).on("keyup.lightslider", function(e) {
                    e.preventDefault(), 37 === e.keyCode ? (o.goToPrevSlide(), clearInterval(C)) : 39 === e.keyCode && (o.goToNextSlide(), clearInterval(C))
                })
            },
            controls: function() {
                i.controls && (o.after('<div class="lSAction"><a class="lSPrev">' + i.prevHtml + '</a><a class="lSNext">' + i.nextHtml + "</a></div>"), i.autoWidth ? S.calWidth(!1) < f && p.find(".lSAction").hide() : d <= i.item && p.find(".lSAction").hide(), p.find(".lSAction a").on("click", function(e) {
                    e.preventDefault(), "lSPrev" === $(this).attr("class") ? o.goToPrevSlide() : o.goToNextSlide(), clearInterval(C)
                }))
            },
            initialStyle: function() {
                var e = this;
                "fade" === i.mode && (i.autoWidth = !1, i.slideEndAnimatoin = !1), i.auto && (i.slideEndAnimatoin = !1), i.autoWidth && (i.slideMove = 1, i.item = 1), i.loop && (i.slideMove = 1, i.freeMove = !1), i.onBeforeStart.call(this, o), S.chbreakpoint(), o.addClass("lightSlider").wrap("<div class='lSSlideOuter " + i.addClass + "'><div class='lSSlideWrapper'></div></div>"), p = o.parent(".lSSlideWrapper"), i.rtl === !0 && p.parent().addClass("lSrtl"), i.vertical ? (p.parent().addClass("vertical"), f = i.verticalHeight, p.css("height", f + "px")) : f = o.outerWidth(), s.addClass("lslide"), i.loop === !0 && "slide" === i.mode && (S.calSW(), S.clone = function() {
                    if (S.calWidth(!0) > f) {
                        for (var t = 0, n = 0, a = 0; a < s.length && (t += parseInt(o.find(".lslide").eq(a).width()) + i.slideMargin, n++, !(t >= f + i.slideMargin)); a++);
                        var r = i.autoWidth === !0 ? n : i.item;
                        if (r < o.find(".clone.left").length)
                            for (var l = 0; l < o.find(".clone.left").length - r; l++) s.eq(l).remove();
                        if (r < o.find(".clone.right").length)
                            for (var c = s.length - 1; c > s.length - 1 - o.find(".clone.right").length; c--) m--, s.eq(c).remove();
                        for (var a = o.find(".clone.right").length; r > a; a++) o.find(".lslide").eq(a).clone().removeClass("lslide").addClass("clone right").appendTo(o), m++;
                        for (var d = o.find(".lslide").length - o.find(".clone.left").length; d > o.find(".lslide").length - r; d--) o.find(".lslide").eq(d - 1).clone().removeClass("lslide").addClass("clone left").prependTo(o);
                        s = o.children()
                    } else s.hasClass("clone") && (o.find(".clone").remove(), e.move(o, 0))
                }, S.clone()), S.sSW = function() {
                    d = s.length, i.rtl === !0 && i.vertical === !1 && (v = "margin-left"), i.autoWidth === !1 && s.css(g, b + "px"), s.css(v, i.slideMargin + "px"), u = S.calWidth(!1), o.css(g, u + "px"), i.loop === !0 && "slide" === i.mode && h === !1 && (m = o.find(".clone.left").length)
                }, S.calL = function() {
                    s = o.children(), d = s.length
                }, this.doCss() && p.addClass("usingCss"), S.calL(), "slide" === i.mode ? (S.calSW(), S.sSW(), i.loop === !0 && (y = e.slideValue(), this.move(o, y)), i.vertical === !1 && this.setHeight(o, !1, !0)) : (this.setHeight(o, !0, !0), o.addClass("lSFade"), this.doCss() || s.not(".active").css("display", "none")), i.loop === !0 && "slide" === i.mode ? s.eq(m).addClass("active") : s.first().addClass("active")
            },
            pager: function() {
                var e = this;
                if (S.createPager = function() {
                        T = (f - (i.thumbItem * i.thumbMargin - i.thumbMargin)) / i.thumbItem;
                        var t = p.find(".lslide"),
                            n = p.find(".lslide").length,
                            a = 0,
                            s = "",
                            r = 0;
                        for (a = 0; n > a; a++) {
                            "slide" === i.mode && (i.autoWidth ? r += (parseInt(t.eq(a).width()) + i.slideMargin) * i.slideMove : r = a * ((b + i.slideMargin) * i.slideMove));
                            var l = t.eq(a * i.slideMove).attr("data-thumb");
                            if (s += i.gallery === !0 ? '<li style="width:100%;' + g + ":" + T + "px;" + v + ":" + i.thumbMargin + 'px"><a href="javascript:void(0)"><img src="' + l + '" /></a></li>' : '<li><a href="javascript:void(0)">' + (a + 1) + "</a></li>", "slide" === i.mode && r >= u - f - i.slideMargin) {
                                a += 1;
                                var c = 2;
                                i.autoWidth && (s += '<li><a href="javascript:void(0)">' + (a + 1) + "</a></li>", c = 1), c > a ? (s = null, p.parent().addClass("noPager")) : p.parent().removeClass("noPager");
                                break
                            }
                        }
                        var d = p.parent();
                        if (d.find(".lSPager").html(s), !i.vertical && i.gallery) {
                            var h = p.parent().find(".lSGallery");
                            setTimeout(function() {
                                e.setHeight(h, !1, !1)
                            })
                        }
                        i.gallery === !0 && (i.vertical === !0 && d.find(".lSPager").css("width", i.vThumbWidth + "px"), w = a * (i.thumbMargin + T) + .5, d.find(".lSPager").css({
                            property: w + "px",
                            "transition-duration": i.speed + "ms"
                        }), i.vertical === !0 && p.parent().css("padding-right", i.vThumbWidth + i.galleryMargin + "px"), d.find(".lSPager").css(g, w + "px"));
                        var y = d.find(".lSPager").find("li");
                        y.first().addClass("active"), y.on("click", function() {
                            i.loop === !0 && "slide" === i.mode ? m += y.index(this) - d.find(".lSPager").find("li.active").index() : m = y.index(this), o.mode(!1), i.gallery === !0 && e.slideThumb(), clearInterval(C)
                        })
                    }, i.pager) {
                    var t = "lSpg";
                    i.gallery && (t = "lSGallery"), p.after('<ul class="lSPager ' + t + '"></ul>');
                    var n = i.vertical ? "margin-left" : "margin-top";
                    p.parent().find(".lSPager").css(n, i.galleryMargin + "px"), S.createPager()
                }
                setTimeout(function() {
                    S.init()
                }, 0)
            },
            setHeight: function(e, t, n) {
                var i = null;
                i = n ? e.children(".lslide ").first() : e.children().first();
                var a = function() {
                    var n = i.height(),
                        a = 0,
                        o = n;
                    t && (n = 0, a = 100 * o / f), e.css({
                        height: n + "px",
                        "padding-bottom": a + "%"
                    })
                };
                a(), i.find("img").load(function() {
                    setTimeout(function() {
                        a()
                    }, 100)
                })
            },
            active: function(e, t) {
                this.doCss() && "fade" === i.mode && p.addClass("on");
                var n = 0;
                if (m * i.slideMove < d) {
                    if (e.removeClass("active"), this.doCss() || "fade" !== i.mode || t !== !1 || e.fadeOut(i.speed), n = t === !0 ? m : m * i.slideMove, t === !0) {
                        var a = e.length,
                            s = a - 1;
                        n + 1 >= a && (n = s)
                    }
                    if (i.loop === !0 && "slide" === i.mode && (n = t === !0 ? m - o.find(".clone.left").length : m * i.slideMove, t === !0)) {
                        var a = e.length,
                            s = a - 1;
                        n + 1 == a ? n = s : n + 1 > a && (n = 0)
                    }
                    this.doCss() || "fade" !== i.mode || t !== !1 || e.eq(n).fadeIn(i.speed), e.eq(n).addClass("active")
                } else e.removeClass("active"), e.eq(e.length - 1).addClass("active"), this.doCss() || "fade" !== i.mode || t !== !1 || (e.fadeOut(i.speed), e.eq(n).fadeIn(i.speed))
            },
            move: function(e, t) {
                i.rtl === !0 && (t = -t), this.doCss() ? i.vertical === !0 ? e.css({
                    transform: "translate3d(0px, " + -t + "px, 0px)",
                    "-webkit-transform": "translate3d(0px, " + -t + "px, 0px)"
                }) : e.css({
                    transform: "translate3d(" + -t + "px, 0px, 0px)",
                    "-webkit-transform": "translate3d(" + -t + "px, 0px, 0px)"
                }) : i.vertical === !0 ? e.css("position", "relative").animate({
                    top: -t + "px"
                }, i.speed, i.easing) : e.css("position", "relative").animate({
                    left: -t + "px"
                }, i.speed, i.easing);
                var n = p.parent().find(".lSPager").find("li");
                this.active(n, !0)
            },
            fade: function() {
                this.active(s, !1);
                var e = p.parent().find(".lSPager").find("li");
                this.active(e, !0)
            },
            slide: function() {
                var e = this;
                S.calSlide = function() {
                    u > f && (y = e.slideValue(), e.active(s, !1), y > u - f - i.slideMargin ? y = u - f - i.slideMargin : 0 > y && (y = 0), e.move(o, y), i.loop === !0 && "slide" === i.mode && (m >= d - o.find(".clone.left").length / i.slideMove && e.resetSlide(o.find(".clone.left").length), 0 === m && e.resetSlide(p.find(".lslide").length)))
                }, S.calSlide()
            },
            resetSlide: function(e) {
                var t = this;
                p.find(".lSAction a").addClass("disabled"), setTimeout(function() {
                    m = e, p.css("transition-duration", "0ms"), y = t.slideValue(), t.active(s, !1), n.move(o, y), setTimeout(function() {
                        p.css("transition-duration", i.speed + "ms"), p.find(".lSAction a").removeClass("disabled")
                    }, 50)
                }, i.speed + 100)
            },
            slideValue: function() {
                var e = 0;
                if (i.autoWidth === !1) e = m * ((b + i.slideMargin) * i.slideMove);
                else {
                    e = 0;
                    for (var t = 0; m > t; t++) e += parseInt(s.eq(t).width()) + i.slideMargin
                }
                return e
            },
            slideThumb: function() {
                var e;
                switch (i.currentPagerPosition) {
                    case "left":
                        e = 0;
                        break;
                    case "middle":
                        e = f / 2 - T / 2;
                        break;
                    case "right":
                        e = f - T
                }
                var t = m - o.find(".clone.left").length,
                    n = p.parent().find(".lSPager");
                "slide" === i.mode && i.loop === !0 && (t >= n.children().length ? t = 0 : 0 > t && (t = n.children().length));
                var a = t * (T + i.thumbMargin) - e;
                a + f > w && (a = w - f - i.thumbMargin), 0 > a && (a = 0), this.move(n, a)
            },
            auto: function() {
                i.auto && (C = setInterval(function() {
                    o.goToNextSlide()
                }, i.pause))
            },
            touchMove: function(e, t) {
                if (p.css("transition-duration", "0ms"), "slide" === i.mode) {
                    var n = e - t,
                        a = y - n;
                    if (a >= u - f - i.slideMargin)
                        if (i.freeMove === !1) a = u - f - i.slideMargin;
                        else {
                            var s = u - f - i.slideMargin;
                            a = s + (a - s) / 5
                        } else 0 > a && (i.freeMove === !1 ? a = 0 : a /= 5);
                    this.move(o, a)
                }
            },
            touchEnd: function(e) {
                if (p.css("transition-duration", i.speed + "ms"), clearInterval(C), "slide" === i.mode) {
                    var t = !1,
                        n = !0;
                    y -= e, y > u - f - i.slideMargin ? (y = u - f - i.slideMargin, i.autoWidth === !1 && (t = !0)) : 0 > y && (y = 0);
                    var a = function(e) {
                        var n = 0;
                        if (t || e && (n = 1), i.autoWidth)
                            for (var a = 0, o = 0; o < s.length && (a += parseInt(s.eq(o).width()) + i.slideMargin, m = o + n, !(a >= y)); o++);
                        else {
                            var r = y / ((b + i.slideMargin) * i.slideMove);
                            m = parseInt(r) + n, y >= u - f - i.slideMargin && r % 1 !== 0 && m++
                        }
                    };
                    e >= i.swipeThreshold ? (a(!1), n = !1) : e <= -i.swipeThreshold && (a(!0), n = !1), o.mode(n), this.slideThumb()
                } else e >= i.swipeThreshold ? o.goToPrevSlide() : e <= -i.swipeThreshold && o.goToNextSlide()
            },
            enableDrag: function() {
                var e = this;
                if (!x) {
                    var t = 0,
                        n = 0,
                        a = !1;
                    p.on("mousedown", function(e) {
                        return f > u && 0 !== u ? !1 : void("lSPrev" !== $(e.target).attr("class") && "lSNext" !== $(e.target).attr("class") && (t = i.vertical === !0 ? e.pageY : e.pageX, a = !0, e.preventDefault()))
                    }), $(window).on("mousemove", function(o) {
                        a && (n = i.vertical === !0 ? o.pageY : o.pageX, e.touchMove(n, t))
                    }), $(window).on("mouseup", function(o) {
                        if (a) {
                            a = !1, n = i.vertical === !0 ? o.pageY : o.pageX;
                            var s = n - t;
                            Math.abs(s) >= i.swipeThreshold && $(window).on("click.ls", function(e) {
                                e.preventDefault(), e.stopImmediatePropagation(), e.stopPropagation(), $(window).off("click.ls")
                            }), e.touchEnd(s)
                        }
                    })
                }
            },
            enableTouch: function() {
                var e = this;
                if (x) {
                    var t = {},
                        n = {};
                    p.on("touchstart", function(e) {
                        n = e.originalEvent.targetTouches[0], t.pageX = e.originalEvent.targetTouches[0].pageX, t.pageY = e.originalEvent.targetTouches[0].pageY
                    }), p.on("touchmove", function(a) {
                        if (f > u && 0 !== u) return !1;
                        var o = a.originalEvent;
                        n = o.targetTouches[0];
                        var s = Math.abs(n.pageX - t.pageX),
                            r = Math.abs(n.pageY - t.pageY);
                        i.vertical === !0 ? (3 * r > s && a.preventDefault(), e.touchMove(n.pageY, t.pageY)) : (3 * s > r && a.preventDefault(), e.touchMove(n.pageX, t.pageX))
                    }), p.on("touchend", function() {
                        if (f > u && 0 !== u) return !1;
                        if (i.vertical === !0) var a = n.pageY - t.pageY;
                        else var a = n.pageX - t.pageX;
                        e.touchEnd(a)
                    })
                }
            },
            build: function() {
                var e = this;
                e.initialStyle(), e.auto(), this.doCss() && (i.enableTouch === !0 && e.enableTouch(), i.enableDrag === !0 && e.enableDrag()), e.pager(), e.controls(), e.keyPress()
            }
        }, n.build(), S.init = function() {
            S.chbreakpoint(), i.vertical === !0 ? (f = i.item > 1 ? i.verticalHeight : s.outerHeight(), p.css("height", f + "px")) : f = p.outerWidth(), i.loop === !0 && "slide" === i.mode && S.clone(), S.calL(), "slide" === i.mode && o.removeClass("lSSlide"), "slide" === i.mode && (S.calSW(), S.sSW()), setTimeout(function() {
                "slide" === i.mode && o.addClass("lSSlide")
            }, 1e3), i.pager && S.createPager(), i.adaptiveHeight === !0 && i.vertical === !1 && o.css("height", s.eq(m).height()), i.gallery === !0 && n.slideThumb(), "slide" === i.mode && n.slide(), i.autoWidth === !1 ? s.length <= i.item ? p.find(".lSAction").hide() : p.find(".lSAction").show() : S.calWidth(!1) < f && 0 !== u ? p.find(".lSAction").hide() : p.find(".lSAction").show()
        }, o.goToPrevSlide = function() {
            if (m > 0) i.onBeforePrevSlide.call(this, o, m), m--, o.mode(!1), i.gallery === !0 && n.slideThumb();
            else if (i.loop === !0) {
                if (i.onBeforePrevSlide.call(this, o, m), "fade" === i.mode) {
                    var e = d - 1;
                    m = parseInt(e / i.slideMove)
                }
                o.mode(!1), i.gallery === !0 && n.slideThumb()
            } else i.slideEndAnimatoin === !0 && (o.addClass("leftEnd"), setTimeout(function() {
                o.removeClass("leftEnd")
            }, 400))
        }, o.goToNextSlide = function() {
            var e = !0;
            if ("slide" === i.mode) var t = n.slideValue(),
                e = t < u - f - i.slideMargin;
            m * i.slideMove < d - i.slideMove && e ? (i.onBeforeNextSlide.call(this, o, m), m++, o.mode(!1), i.gallery === !0 && n.slideThumb()) : i.loop === !0 ? (i.onBeforeNextSlide.call(this, o, m), m = 0, o.mode(!1), i.gallery === !0 && n.slideThumb()) : i.slideEndAnimatoin === !0 && (o.addClass("rightEnd"), setTimeout(function() {
                o.removeClass("rightEnd")
            }, 400))
        }, o.mode = function(e) {
            i.adaptiveHeight === !0 && i.vertical === !1 && o.css("height", s.eq(m).height()), h === !1 && ("slide" === i.mode ? n.doCss() && (o.addClass("lSSlide"), "" !== i.speed && p.css("transition-duration", i.speed + "ms"), "" !== i.cssEasing && p.css("transition-timing-function", i.cssEasing)) : n.doCss() && ("" !== i.speed && o.css("transition-duration", i.speed + "ms"), "" !== i.cssEasing && o.css("transition-timing-function", i.cssEasing))), e || i.onBeforeSlide.call(this, o, m), "slide" === i.mode ? n.slide() : n.fade(), setTimeout(function() {
                e || i.onAfterSlide.call(this, o, m)
            }, i.speed), h = !0
        }, o.play = function() {
            clearInterval(C), o.goToNextSlide(), C = setInterval(function() {
                o.goToNextSlide()
            }, i.pause)
        }, o.pause = function() {
            clearInterval(C)
        }, o.refresh = function() {
            S.init()
        }, o.getCurrentSlideCount = function() {
            var e = m;
            if (i.loop) {
                var t = p.find(".lslide").length,
                    n = o.find(".clone.left").length;
                e = n - 1 >= m ? t + (m - n) : m >= t + n ? m - t - n : m - n
            }
            return e + 1
        }, o.getTotalSlideCount = function() {
            return p.find(".lslide").length
        }, o.goToSlide = function(e) {
            m = i.loop ? e + o.find(".clone.left").length - 1 : e, o.mode(!1), i.gallery === !0 && n.slideThumb()
        }, setTimeout(function() {
            i.onSliderLoad.call(this, o)
        }, 10), $(window).on("resize orientationchange", function(e) {
            setTimeout(function() {
                e.preventDefault(), S.init()
            }, 200)
        }), this
    }
}(jQuery),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
}(function(e, t) {
    function n(e) {
        function t(e) {
            i ? (n(), H(t), a = !0, i = !1) : a = !1
        }
        var n = e,
            i = !1,
            a = !1;
        this.kick = function(e) {
            i = !0, a || t()
        }, this.end = function(e) {
            var t = n;
            e && (a ? (n = i ? function() {
                t(), e()
            } : e, i = !0) : e())
        }
    }

    function i() {
        return !0
    }

    function a() {
        return !1
    }

    function o(e) {
        e.preventDefault()
    }

    function s(e) {
        N[e.target.tagName.toLowerCase()] || e.preventDefault()
    }

    function r(e) {
        return 1 === e.which && !e.ctrlKey && !e.altKey
    }

    function l(e, t) {
        var n, i;
        if (e.identifiedTouch) return e.identifiedTouch(t);
        for (n = -1, i = e.length; ++n < i;)
            if (e[n].identifier === t) return e[n]
    }

    function c(e, t) {
        var n = l(e.changedTouches, t.identifier);
        if (n && (n.pageX !== t.pageX || n.pageY !== t.pageY)) return n
    }

    function d(e) {
        var t;
        r(e) && (t = {
            target: e.target,
            startX: e.pageX,
            startY: e.pageY,
            timeStamp: e.timeStamp
        }, M(document, z.move, u, t), M(document, z.cancel, h, t))
    }

    function u(e) {
        var t = e.data;
        y(e, t, e, f)
    }

    function h(e) {
        f()
    }

    function f() {
        L(document, z.move, u), L(document, z.cancel, h)
    }

    function p(e) {
        var t, n;
        N[e.target.tagName.toLowerCase()] || (t = e.changedTouches[0], n = {
            target: t.target,
            startX: t.pageX,
            startY: t.pageY,
            timeStamp: e.timeStamp,
            identifier: t.identifier
        }, M(document, W.move + "." + t.identifier, m, n), M(document, W.cancel + "." + t.identifier, g, n))
    }

    function m(e) {
        var t = e.data,
            n = c(e, t);
        n && y(e, t, n, v)
    }

    function g(e) {
        var t = e.data,
            n = l(e.changedTouches, t.identifier);
        n && v(t.identifier)
    }

    function v(e) {
        L(document, "." + e, m), L(document, "." + e, g)
    }

    function y(e, t, n, i) {
        var a = n.pageX - t.startX,
            o = n.pageY - t.startY;
        q * q > a * a + o * o || T(e, t, n, a, o, i)
    }

    function w() {
        return this._handled = i, !1
    }

    function b(e) {
        e._handled()
    }

    function T(e, t, n, i, a, o) {
        var s = t.target,
            r, l;
        r = e.targetTouches, l = e.timeStamp - t.timeStamp, t.type = "movestart", t.distX = i, t.distY = a, t.deltaX = i, t.deltaY = a, t.pageX = n.pageX, t.pageY = n.pageY, t.velocityX = i / l, t.velocityY = a / l, t.targetTouches = r, t.finger = r ? r.length : 1, t._handled = w, t._preventTouchmoveDefault = function() {
            e.preventDefault()
        }, B(t.target, t), o(t.identifier)
    }

    function C(e) {
        var t = e.data.timer;
        e.data.touch = e, e.data.timeStamp = e.timeStamp, t.kick()
    }

    function x(e) {
        var t = e.data.event,
            n = e.data.timer;
        S(), _(t, n, function() {
            setTimeout(function() {
                L(t.target, "click", a)
            }, 0)
        })
    }

    function S(e) {
        L(document, z.move, C), L(document, z.end, x)
    }

    function k(e) {
        var t = e.data.event,
            n = e.data.timer,
            i = c(e, t);
        i && (e.preventDefault(), t.targetTouches = e.targetTouches, e.data.touch = i, e.data.timeStamp = e.timeStamp, n.kick())
    }

    function F(e) {
        var t = e.data.event,
            n = e.data.timer,
            i = l(e.changedTouches, t.identifier);
        i && (A(t), _(t, n))
    }

    function A(e) {
        L(document, "." + e.identifier, k), L(document, "." + e.identifier, F)
    }

    function I(e, t, n, i) {
        var a = n - e.timeStamp;
        e.type = "move", e.distX = t.pageX - e.startX, e.distY = t.pageY - e.startY, e.deltaX = t.pageX - e.pageX, e.deltaY = t.pageY - e.pageY, e.velocityX = .3 * e.velocityX + .7 * e.deltaX / a, e.velocityY = .3 * e.velocityY + .7 * e.deltaY / a, e.pageX = t.pageX, e.pageY = t.pageY
    }

    function _(e, t, n) {
        t.end(function() {
            return e.type = "moveend", B(e.target, e), n && n()
        })
    }

    function P(e, t, n) {
        return M(this, "movestart.move", b), !0
    }

    function E(e) {
        return L(this, "dragstart drag", o), L(this, "mousedown touchstart", s), L(this, "movestart", b), !0
    }

    function D(e) {
        "move" !== e.namespace && "moveend" !== e.namespace && (M(this, "dragstart." + e.guid + " drag." + e.guid, o, t, e.selector), M(this, "mousedown." + e.guid, s, t, e.selector))
    }

    function O(e) {
        "move" !== e.namespace && "moveend" !== e.namespace && (L(this, "dragstart." + e.guid + " drag." + e.guid), L(this, "mousedown." + e.guid))
    }
    var q = 6,
        M = e.event.add,
        L = e.event.remove,
        B = function(t, n, i) {
            e.event.trigger(n, i, t)
        },
        H = function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e, t) {
                return window.setTimeout(function() {
                    e()
                }, 25)
            }
        }(),
        N = {
            textarea: !0,
            input: !0,
            select: !0,
            button: !0
        },
        z = {
            move: "mousemove",
            cancel: "mouseup dragstart",
            end: "mouseup"
        },
        W = {
            move: "touchmove",
            cancel: "touchend",
            end: "touchend"
        };
    e.event.special.movestart = {
        setup: P,
        teardown: E,
        add: D,
        remove: O,
        _default: function(e) {
            function i(t) {
                I(o, s.touch, s.timeStamp), B(e.target, o)
            }
            var o, s;
            e._handled() && (o = {
                target: e.target,
                startX: e.startX,
                startY: e.startY,
                pageX: e.pageX,
                pageY: e.pageY,
                distX: e.distX,
                distY: e.distY,
                deltaX: e.deltaX,
                deltaY: e.deltaY,
                velocityX: e.velocityX,
                velocityY: e.velocityY,
                timeStamp: e.timeStamp,
                identifier: e.identifier,
                targetTouches: e.targetTouches,
                finger: e.finger
            }, s = {
                event: o,
                timer: new n(i),
                touch: t,
                timeStamp: t
            }, e.identifier === t ? (M(e.target, "click", a), M(document, z.move, C, s), M(document, z.end, x, s)) : (e._preventTouchmoveDefault(), M(document, W.move + "." + e.identifier, k, s), M(document, W.end + "." + e.identifier, F, s)))
        }
    }, e.event.special.move = {
        setup: function() {
            M(this, "movestart.move", e.noop)
        },
        teardown: function() {
            L(this, "movestart.move", e.noop)
        }
    }, e.event.special.moveend = {
        setup: function() {
            M(this, "movestart.moveend", e.noop)
        },
        teardown: function() {
            L(this, "movestart.moveend", e.noop)
        }
    }, M(document, "mousedown.move", d), M(document, "touchstart.move", p), "function" == typeof Array.prototype.indexOf && ! function(e, t) {
        for (var n = ["changedTouches", "targetTouches"], i = n.length; i--;) - 1 === e.event.props.indexOf(n[i]) && e.event.props.push(n[i])
    }(e)
}),
function($) {
    $.fn.twentytwenty = function(e) {
        var e = $.extend({
            default_offset_pct: .5,
            orientation: "horizontal"
        }, e);
        return this.each(function() {
            var t = e.default_offset_pct,
                n = $(this),
                i = e.orientation,
                a = "vertical" === i ? "down" : "left",
                o = "vertical" === i ? "up" : "right";
            n.wrap("<div class='twentytwenty-wrapper twentytwenty-" + i + "'></div>"), n.append("<div class='twentytwenty-overlay'></div>");
            var s = n.find("img:first"),
                r = n.find("img:last");
            n.append("<div class='twentytwenty-handle'></div>");
            var l = n.find(".twentytwenty-handle");
            l.append("<span class='twentytwenty-" + a + "-arrow'></span>"), l.append("<span class='twentytwenty-" + o + "-arrow'></span>"), n.addClass("twentytwenty-container"), s.addClass("twentytwenty-before"), r.addClass("twentytwenty-after");
            var c = n.find(".twentytwenty-overlay");
            c.append("<div class='twentytwenty-before-label'></div>"), c.append("<div class='twentytwenty-after-label'></div>");
            var d = function(e) {
                    var t = s.width(),
                        n = s.height();
                    return {
                        w: t + "px",
                        h: n + "px",
                        cw: e * t + "px",
                        ch: e * n + "px"
                    }
                },
                u = function(e) {
                    "vertical" === i ? s.css("clip", "rect(0," + e.w + "," + e.ch + ",0)") : s.css("clip", "rect(0," + e.cw + "," + e.h + ",0)"), n.css("height", e.h)
                },
                h = function(e) {
                    var t = d(e);
                    l.css("vertical" === i ? "top" : "left", "vertical" === i ? t.ch : t.cw), u(t)
                };
            $(window).on("resize.twentytwenty", function(e) {
                h(t)
            });
            var f = 0,
                p = 0;
            l.on("movestart", function(e) {
                (e.distX > e.distY && e.distX < -e.distY || e.distX < e.distY && e.distX > -e.distY) && "vertical" !== i ? e.preventDefault() : (e.distX < e.distY && e.distX < -e.distY || e.distX > e.distY && e.distX > -e.distY) && "vertical" === i && e.preventDefault(), n.addClass("active"), f = n.offset().left, offsetY = n.offset().top, p = s.width(), imgHeight = s.height()
            }), l.on("moveend", function(e) {
                n.removeClass("active")
            }), l.on("move", function(e) {
                n.hasClass("active") && (t = "vertical" === i ? (e.pageY - offsetY) / imgHeight : (e.pageX - f) / p, 0 > t && (t = 0), t > 1 && (t = 1), h(t))
            }), n.find("img").on("mousedown", function(e) {
                e.preventDefault()
            }), $(window).trigger("resize.twentytwenty")
        })
    }
}(jQuery), FunctionHandler.register(["*"], function() {
    var e = $("html");
    e.addClass(navigator.platform).removeClass("no-js");
    var t = "form#sitesearch",
        n = $("#search-trigger"),
        i = $(t + ' input[type="text"]'),
        a = $(t + ' button[type="submit"]');
    $('input[name="sitesearch"],input[name="client"],input[name="output"],input[name="proxystylesheet"],input[name="oe"],input[name="ie"]').remove(), $(t).attr("action", "/search/"), $("#searchform").attr("action", "/search/"), $("#featuresearch").attr("action", "/search/features"), $("#breakthoughssearch").attr("action", "/search/breakthroughs"), $(".search_text").attr("name", "GSAq"), n.on("click", function(e) {
            e.preventDefault(), $(this).toggleClass("active"), $(t).slideToggle("600", "easeOutBack"), i.focus().val(""), a.prop("disabled", !0)
        }), a.prop("disabled", !0), i.keyup(function() {
            "" != $(this).val() ? a.prop("disabled", !1) : a.prop("disabled", !0)
        }),
        function() {
            var e = 0;
            $(window).scroll(function() {
                if ($(window).width() > 767) {
                    var o = $(this).scrollTop();
                    o > e && ($(t).slideUp("slow"), n.removeClass("active"), i.val(""), a.prop("disabled", !0)), e = o
                }
            })
        }(), $("ul.nav.utility a, #feature_archivenav a").each(function() {
            ($(this).attr("href") == window.location.href || $(this).attr("href") == window.location.pathname) && $(this).addClass("on")
        });
    var o = $(".lazy, .lazy2");
    if (o.show().lazyload({
            effect: "fadeIn",
            threshold: 100,
            failure_limit: 13
        }), $(".module ul#rotate").lightSlider({
            item: 1,
            mode: "fade",
            speed: 500,
            auto: !0,
            loop: !0,
            slideEndAnimation: !1,
            pause: 6e3,
            controls: !1,
            adaptiveHeight: !0,
            pager: !1,
            onBeforeNextSlide: function(e) {
                var t = $(".active+.lslide > a > div > img.lazy-rotate");
                t.show().lazyload({
                    effect: "fadeIn"
                })
            }
        }), $("a.tt").tooltip(), $(".slide img, #features li img").hoverIntent(function() {
            $("p.ss-icon").addClass("ss-icon-show")
        }, function() {
            $("p.ss-icon").removeClass("ss-icon-show")
        }), screen.width > 767) {
        var s = $("#d_about"),
            r = $("#d_admissions"),
            l = $("#d_academics"),
            c = $("#d_research"),
            d = $("#d_medicine"),
            u = $("#d_civic"),
            h = $("#d_global"),
            f = $("#d_campuslife"),
            p = $("#d_about,#d_admissions,#d_academics,#d_research,#d_medicine,#d_civic,#d_campuslife,#d_global"),
            m = $("#navabout,#navadmissions,#navacademics,#navresearch,#navmedicine,#navcivic,#navcampuslife,#navglobal");
        $("#navabout").hoverIntent(function() {
            m.removeClass("active"), $(this).addClass("active"), s.load("./menus/about555.html").fadeIn(200), $("#d_admissions,#d_academics,#d_research,#d_medicine,#d_civic,#d_campuslife,#d_global").fadeOut(450)
        }, function() {
            $("#d_about a").gaTrackEvent({
                category: "About Dropdown"
            })
        }), $("#navadmissions").hoverIntent(function() {
            m.removeClass("active"), $(this).addClass("active"), r.load("./menus/admissions.html").fadeIn(200), $("#d_about,#d_academics,#d_research,#d_medicine,#d_civic,#d_campuslife,#d_global").fadeOut(450)
        }, function() {
            $("#d_admissions a").gaTrackEvent({
                category: "Admissions Dropdown"
            })
        }), $("#navacademics").hoverIntent(function() {
            m.removeClass("active"), $(this).addClass("active"), l.load("./menus/academics.html").fadeIn(200), $("#d_about,#d_admissions,#d_research,#d_medicine,#d_civic,#d_campuslife,#d_global").fadeOut(450)
        }, function() {
            $("#d_academics a").gaTrackEvent({
                category: "Academics Dropdown"
            })
        }), $("#navresearch").hoverIntent(function() {
            m.removeClass("active"), $(this).addClass("active"), c.load("./menus/research.html").fadeIn(200), $("#d_about,#d_admissions,#d_academics,#d_medicine,#d_civic,#d_campuslife,#d_global").fadeOut(450)
        }, function() {
            $("#d_research a").gaTrackEvent({
                category: "Research Dropdown"
            })
        }), $("#navmedicine").hoverIntent(function() {
            m.removeClass("active"), $(this).addClass("active"), d.load("./menus/medctr.html").fadeIn(200), $("#d_about,#d_admissions,#d_academics,#d_research,#d_civic,#d_campuslife,#d_global").fadeOut(450)
        }, function() {
            $("#d_medicine a").gaTrackEvent({
                category: "Medicine Dropdown"
            })
        }), $("#navcivic").hoverIntent(function() {
            m.removeClass("active"), $(this).addClass("active"), u.load("./menus/civic.html").fadeIn(200), $("#d_about,#d_admissions,#d_academics,#d_research,#d_medicine,#d_campuslife,#d_global").fadeOut(450)
        }, function() {
            $("#d_civic a").gaTrackEvent({
                category: "Civic Engagement Dropdown"
            })
        }), $("#navglobal").hoverIntent(function() {
            m.removeClass("active"), $(this).addClass("active"), h.load("./menus/global.html").fadeIn(200), $("#d_about,#d_admissions,#d_academics,#d_research,#d_medicine,#d_civic,#d_campuslife,#d_civic").fadeOut(450)
        }, function() {
            $("#d_global a").gaTrackEvent({
                category: "Global Engagement Dropdown"
            })
        }), $("#navcampuslife").hoverIntent(function() {
            m.removeClass("active"), $(this).addClass("active"), f.load("./menus/campuslife.html").fadeIn(200), $("#d_about,#d_admissions,#d_academics,#d_research,#d_medicine,#d_civic,#d_global").fadeOut(450)
        }, function() {
            $("#d_campuslife a").gaTrackEvent({
                category: "Campus Life Dropdown"
            })
        }), $(".hero, .grey, .container.white, .container.page").hoverIntent(function() {
            p.fadeOut(500), m.removeClass("active")
        }, function() {}), $(".wordmark").hoverIntent(function() {
            p.fadeOut(500), m.removeClass("active")
        }, function() {})
    }
    $(".navbar a,.wordmark a,.drawer a").gaTrackEvent({
        category: "Masthead"
    }), $(".subfeature a").gaTrackEvent({
        category: "Interior Page Features"
    }), $("#leftcol #subnav a").gaTrackEvent({
        category: "Interior Sub Navigation"
    }), $("#leftcol .module a").gaTrackEvent({
        category: "Related Links"
    }), $(".maincontent a").gaTrackEvent({
        category: "Main Content"
    }), $(".sidebar a").gaTrackEvent({
        category: "Right Column Modules"
    }), $("footer a").gaTrackEvent({
        category: "Footer"
    })
}), FunctionHandler.register(["home"], function() {
    var e = {
            nextButton: !1,
            prevButton: !1,
            preloader: !1,
            hideFramesUntilPreloaded: !1,
            pauseOnHover: !0,
            animateStartingFrameIn: !1,
            transitionThreshold: 250,
            reverseAnimationsWhenNavigatingBackwards: !1,
            autoPlayDelay: 6e3,
            keyNavigation: !1
        },
        t = $("#newsrotate").sequence(e).data("sequence");
    $(".module.youtube .col2").each(function() {
        $(this).find("img").attr("alt", " ")
    });
    var n = {
            nextButton: !0,
            prevButton: !0,
            preloader: !1,
            hideFramesUntilPreloaded: !1,
            pauseOnHover: !0,
            animateStartingFrameIn: !1,
            transitionThreshold: 250,
            reverseAnimationsWhenNavigatingBackwards: !1,
            autoPlayDelay: 6e3,
            keyNavigation: !1,
            swipeNavigation: !0,
            swipeEvents: {
                left: "next",
                right: "prev",
                up: !1,
                down: !1
            }
        },
        i = $("#explore").sequence(n).data("sequence");
    i.afterLoaded = function() {
        $("#explorenav").fadeIn(100), $("#explorenav li:nth-child(" + i.settings.startingFrameID + ") button").addClass("active")
    }, i.beforeNextFrameAnimatesIn = function() {
        $("#explorenav li:not(:nth-child(" + i.nextFrameID + ")) button").removeClass("active"), $("#explorenav li:nth-child(" + i.nextFrameID + ") button").addClass("active")
    }, $("#explorenav li").on("click focusin", function() {
        i.active || ($(this).children("button").removeClass("active").children("button").addClass("active"), i.nextFrameID = $(this).index() + 1, i.goTo(i.nextFrameID))
    }), $("#explore li div a").hoverIntent(function() {
        $("#explorenav").hide()
    }, function() {
        $("#explorenav").show()
    });
    var a = {
            nextButton: !1,
            prevButton: !1,
            preloader: !1,
            hideFramesUntilPreloaded: !1,
            pauseOnHover: !0,
            animateStartingFrameIn: !1,
            transitionThreshold: 250,
            reverseAnimationsWhenNavigatingBackwards: !1,
            autoPlayDelay: 6e3,
            keyNavigation: !1
        },
        o = $("#socialrotate").sequence(a).data("sequence");
    $("#mainfeatures a").gaTrackEvent({
        category: "Homepage Features"
    }), $(".module.news a").gaTrackEvent({
        category: "News Module"
    }), $(".module.affiliates a").gaTrackEvent({
        category: "Affiliates Module"
    }), $(".module.spotlight a").gaTrackEvent({
        category: "Spotlight Module"
    }), $(".uchicagoconnect a").gaTrackEvent({
        category: "UChicago Social Module"
    }), $(".module.crescat a").gaTrackEvent({
        category: "About UChicago Module"
    }), $(".module.explore a").gaTrackEvent({
        category: "Explore Module"
    })
}), FunctionHandler.register(["about_main", "faculty_main", "students_main", "alumni_main", "research_main", "community_main", "preview_main", "mbl_main"], function() {
    var e = {
            nextButton: !0,
            prevButton: !0,
            preloader: !1,
            hideFramesUntilPreloaded: !1,
            pauseOnHover: !0,
            animateStartingFrameIn: !1,
            transitionThreshold: 250,
            reverseAnimationsWhenNavigatingBackwards: !1,
            autoPlayDelay: 6e3,
            swipeNavigation: !0,
            swipeEvents: {
                left: "next",
                right: "prev",
                up: !1,
                down: !1
            }
        },
        t = $("#features").sequence(e).data("sequence");
    "undefined" != typeof t && (t.afterLoaded = function() {
        $("#featurenav").fadeIn(100), $("#featurenav li:nth-child(" + t.settings.startingFrameID + ") button").addClass("active"), t.transitionsSupported || $("#features").animate({
            opacity: "1"
        }, 1e3)
    }, t.beforeNextFrameAnimatesIn = function() {
        $("ul#features_container li:nth-child(" + t.nextFrameID + ") img").each(function() {
            var e = $(this);
            e.attr("data-original") && (this.src = e.attr("data-original"))
        }), $("#featurenav li:not(:nth-child(" + t.nextFrameID + ")) button").removeClass("active"), $("#featurenav li:nth-child(" + t.nextFrameID + ") button").addClass("active")
    }), $("#featurenav li").on("click focusin", function() {
        t.active || ($(this).children("button").removeClass("active").children("button").addClass("active"), t.nextFrameID = $(this).index() + 1, t.goTo(t.nextFrameID))
    })
}), FunctionHandler.register(["academics"], function() {
    $("#acindex a").on("click", function(e) {
        e.preventDefault(), $(this).tab("show")
    }), $(".collapse").collapse("toggle"), $(".tab-pane button").on("click", function() {
        $(this).toggleClass("active")
    })
}), FunctionHandler.register(["research"], function() {
    $("#newstabs a").on("click", function(e) {
        e.preventDefault(), $(this).tab("show")
    }), $(".tab-pane button").on("click", function() {
        $(this).toggleClass("active")
    })
}), FunctionHandler.register(["search"], function() {
    var e = $('form#searchform input[type="text"]'),
        t = $("form#searchform button");
    t.prop("disabled", !0), e.keyup(function() {
        "" != $(this).val() ? t.prop("disabled", !1) : t.prop("disabled", !0)
    })
}), FunctionHandler.register(["feature"], function() {
    $("#mainfeatures").not(".lightsup").addClass("lightsdown");
    var e = {
            nextButton: !0,
            prevButton: !0,
            preloader: !1,
            hideFramesUntilPreloaded: !1,
            pauseOnHover: !0,
            transitionThreshold: !1,
            reverseAnimationsWhenNavigatingBackwards: !1,
            autoPlayDelay: 1e4,
            keyNavigation: !0,
            swipeNavigation: !0,
            swipeEvents: {
                left: "next",
                right: "prev",
                up: !1,
                down: !1
            }
        },
        t = $("#slideshow").sequence(e).data("sequence");
    $(window).on("load", function() {
        $("#beforeafter").twentytwenty({
            default_offset_pct: .5,
            orientation: "horizontal"
        })
    })
});
