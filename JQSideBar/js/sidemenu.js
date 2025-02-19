!function (t, e) {
    if ("function" == typeof define && define.amd) define(["jquery"], function (s) {
        var i = e(s);
        return s.extend(t, i), i
    });
    else if ("object" == typeof module && module.exports) {
        var s = require("jquery"),
            i = e(s);
        s.extend(t, i), module.exports = i
    } else t.jQuery.extend(t, e(t.jQuery))
} (this, function (t) {
    "use strict";

    function e() {
        this.$el = t("<div/>").addClass("sm-overlay"), this.el = this.$el.get(0)
    }

    function s(e, s) {
        this.options = {}, t.extend(this.options, s), this.$el = t("<div/>").addClass("sm sm-added"), this.$body = t("<div/>").addClass("sm-body").appendTo(this.$el), this.$scroller = t("<div/>").addClass("sm-scroller").appendTo(this.$body), this.$content = t("<div/>").addClass("sm-content").appendTo(this.$scroller), this.el = this.$el.get(0), this.$scroller.on("scroll", function (t) {
            this.scrollHeight - this.scrollTop === this.clientHeight ? (t.preventDefault(), this.scrollTop = this.scrollTop - 1) : 0 === this.scrollTop && (this.scrollTop = 1)
        }), this.options.title && this.$content.append(t("<div/>").addClass("sm-title").text(this.title = this.options.title)), this.$list = t("<ul/>").appendTo(this.$content).get(0), this.items = [], this.addItems(e), this.isOpen = !1, this.parentItem = null
    }

    function i(t, i) {
        i = i || {}, i.back = "", s.call(this, t, i), this.history = {
            stacks: [],
            clear: function () {
                this.stacks = []
            },
            add: function (t) {
                t && this.stacks.push(t)
            },
            pop: function () {
                return this.stacks.pop()
            },
            beforeLastStak: function () {
                return this.stacks[this.stacks.length - 2]
            },
            isEmpty: function () {
                return 0 === this.stacks.length
            }
        }, this.options.overlay && (this.overlay = new e, this.overlay.$el.on(c ? "touchstart" : y, this.close.bind(this))), this._target = null, this.sideMenu = this, this.currentMenu = null
    }

    function n() {
        this.$el = t("<li/>").addClass("sm-item"), this.el = this.$el.get(0), this.parent = null
    }

    function o(e, s) {
        if (void 0 === e) throw "Error in SMLabelItem: title param is undefined";
        n.call(this), this.title = e, this.dom = this.dom || {}, this.dom.title = t("<span/>").addClass("sm-label-text").text(this.title), this.$el.append(this._label = t("<div/>").addClass("sm-item-label").addClass(s).append(t("<span/>").addClass("sm-label-icon")).append(this.dom.title))
    }

    function r(t, e, s) {
        var i = this;
        o.call(this, t, s), this.$el.addClass("sm-item-more"), this._label.on(y, function (t) {
            t.stopPropagation(), i.subMenu.open()
        }), this.subMenu = new b(e, {
            title: t
        }), this.subMenu._setParent(this), this.$el.append(this.subMenu.el)
    }

    function h(e, s, i, n) {
        if (!e || !s) throw "Error in SMLinkItem: invalid title or url param";
        o.call(this, e), this._label.replaceWith(t("<a/>", {
            href: s,
            target: i
        }).addClass("sm-item-label").addClass(n).append(this._label.contents())), this.$el.addClass("sm-item-link")
    }

    function a(t, e, s, i) {
        var n = this;
        o.call(this, t, s), this.id = i || null, this.$el.addClass("sm-item-button"), this.$el.on(y, function (t) {
            "function" == typeof e && e.call(n, this)
        })
    }

    function l(e, s) {
        n.call(this), this.$el.addClass("sm-item-useraccount"), this.$el.append(this.photo = t("<img id='SSImg' />").addClass("sm-useraccount-photo").attr({
            src: s
        })), this.$el.append(this.name = t("<div/>").addClass("sm-useraccount-name").text(e))
    }

    function u(e, s) {
        n.call(this), this.$el.addClass("sm-item-separator"), this.$el.append(this.name = t("<div/>").addClass("sm-item-separator-name").text(e || ""))
    }
    var c = !!("ontouchstart" in window || navigator.maxTouchPoints),
        d = document.createElement("div").style,
        p = function () {
            for (var t, e = "t,webkitT,MozT,msT,OT".split(","), s = 0, i = e.length; s < i; s++)
                if (t = e[s] + "ransform", t in d) return e[s].substr(0, e[s].length - 1);
            return !1
        } (),
        m = function () {
            if (p === !1) return !1;
            var t = {
                "": "transitionend",
                webkit: "webkitTransitionEnd",
                Moz: "transitionend",
                O: "otransitionend",
                ms: "MSTransitionEnd"
            };
            return t[p]
        } (),
        f = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        y = t.tap ? "tap" : "click",
        v = "";
    v += c ? " sm-touch" : " sm-desktop", f && (v += " sm-mobile"), document.documentElement.className += v, t.extend(e.prototype, {
        show: function () {
            this.$el.appendTo(document.body)
        },
        hide: function () {
            this.$el.detach()
        },
        destroy: function () {
            this.$el.remove()
        }
    }), t.extend(s.prototype, {
        _add: function (t, e) {
            t._setParent(this), this.items.splice(e, 0, t), this.$list.hasChildNodes() && this.$list.childNodes[e] ? this.$list.insertBefore(t.el, this.$list.childNodes.item(e)) : this.$list.appendChild(t.el)
        },
        _refresh: function () {
            this.sideMenu && this.sideMenu._refresh()
        },
        _setParent: function (t) {
            this.parentItem = t
        },
        _setCurrentMenu: function (t) {
            this.sideMenu.currentMenu = t
        },
        _getCurrentMenu: function () {
            return this.sideMenu.currentMenu
        },
        _show: function (t) {
            return this.isOpen = !0, this.$el.css("z-index", 2), "function" == typeof t && this._onTransitionEnd(t), this.$el.addClass("sm-show"), this
        },
        _hide: function (t) {
            return this.isOpen && this.$el.css("z-index", 1), this.isOpen = !1, this._onTransitionEnd(function () {
                this.$el.css("z-index", ""), "function" == typeof t && t.apply(this, arguments)
            }), this.$el.removeClass("sm-show"), this
        },
        _onTransitionEnd: function (t) {
            var e = this;
            this.$el.one(m, function (s) {
                "function" == typeof t && t.call(e, this, s)
            })
        },
        _hideSubMenus: function () {
            if (this.items && this.items.length)
                for (var t in this.items) this.items[t] instanceof r && this.items[t].subMenu._closeWithChilds()
        },
        _closeWithChilds: function () {
            this._hide(), this._hideSubMenus()
        },
        _closeWithParents: function (t) {
            t !== this && this._hide(), this.parentItem && this.parentItem.parent && this.parentItem.parent._closeWithParents(t)
        },
        _openParents: function () {
            function t(s) {
                s && s.parent && (e.push(s.parent), t(s.parent.parentItem))
            }
            this.sideMenu.history.clear();
            var e = [];
            t(this.parentItem), e.reverse();
            for (var s in e) this.sideMenu.history.add(e[s])
        },
        addItem: function (t, e) {
            return this._add(t, void 0 === e ? this.items.length : e), this._refresh(), this
        },
        addItems: function (t, e) {
            if (t) {
                e = void 0 === e ? this.items.length : e;
                for (var s = 0; s < t.length; s += 1) this._add(t[s], e + s);
                return this._refresh(), this
            }
        },
        open: function () {
            if (this.isOpen) return this;
            var t, e = this._getCurrentMenu();
            return e && e._hide(), this._show(function () {
                e && e._closeWithParents(this)
            }), this._openParents(), this._setCurrentMenu(this), this.sideMenu.history.add(this), this.options.onOpen && this.options.onOpen.call(this), t = this.overlay || this.sideMenu && this.sideMenu.overlay, t && t.show(), this
        },
        close: function () {
            return this.isOpen ? (this._getCurrentMenu() === this ? this.sideMenu.goBack() : this._hide(), this.sideMenu.history.isEmpty() && this._setCurrentMenu(null), this.options.onClose && this.options.onClose.call(this), this) : this
        },
        clear: function () {
            return this.$list.innerHTML = "", this.items = [], this
        },
        getItemByIndex: function (t) {
            return this.items[t]
        },
        getItemByName: function (t) {
            var e, s = new RegExp(t, "gi");
            for (e in this.items)
                if (this.items[e].title && s.test(this.items[e].title)) return this.items[e];
            return null
        },
        getSubMenuByName: function (t) {
            var e = this.getItemByName(t);
            return e ? e.subMenu : e
        },
        destroy: function () {
            this.clear(), this.$el.remove(), this.overlay && this.overlay.destroy(), this.parentItem && this.parentItem.items.splice(this.parentItem.items.indexOf(this), 1)
        }
    }), i.prototype = Object.create(s.prototype), t.extend(i.prototype, {
        constructor: i,
        _add: function (t, e) {
            function i(t, e) {
                if (e) {
                    e.sideMenu = t;
                    for (var s in e.items) e.items[s] instanceof r && i(t, e.items[s].subMenu)
                }
            }
            s.prototype._add.call(this, t, e), i(this, t.subMenu)
        },
        _refresh: function () {
            this._target && this._target.append(this._target.find(".sm-added").removeClass("sm-added"))
        },
        goBack: function () {
            var t = this.history.beforeLastStak(),
                e = this.history.pop();
            this._setCurrentMenu(t || this), e && e._hide(), t && t._show()
        },
        close: function () {
            this.history.clear(), this._closeWithChilds(), this._setCurrentMenu(null), this.options.onClose && this.options.onClose.call(this), this.overlay && this.overlay.hide()
        },
        toggle: function () {
            this.history.isEmpty() ? this.open() : this.close()
        },
        appendTo: function (e) {
            return this._target = t(e).append(this.$el), this._refresh(), this
        }
    });
    var b = function (e, i) {
        var n = this;
        s.call(this, e, t.extend({}, b.options, i)), this.options.back && (this._back = t("<li/>").addClass("sm-back").on(y, function (t) {
            t.preventDefault(), n.sideMenu.goBack()
        }).text(this.options.back)), this._back && this.$content.prepend(this._back), this.$el.addClass("sm-submenu"), this.sideMenu = null
    };
    b.options = {
        back: "back"
    }, b.prototype = Object.create(s.prototype), b.prototype.constructor = b, t.extend(n.prototype, {
        _setParent: function (t) {
            this.parent = t
        },
        moveToMenu: function (t, e) {
            var i, n, o = this.parent.items;
            t instanceof s && (i = o.indexOf(this), i !== -1 && (n = o[i], o.splice(i, 1), t.addItem(n, e)))
        },
        moveToPosition: function (t) {
            this.parent && this.moveToMenu(this.parent, t)
        },
        remove: function () {
            if (this.parent) {
                var t, e = this.parent.items;
                this.$el.remove(), (t = e.indexOf(this)) !== -1 && e.splice(t, 1)
            }
        }
    }), o.prototype = Object.create(n.prototype), o.prototype.constructor = o, o.prototype.setTitle = function (t) {
        this.dom.title.text(t)
    }, r.prototype = Object.create(o.prototype), r.prototype.constructor = r, h.prototype = Object.create(o.prototype), h.prototype.constructor = h, a.prototype = Object.create(o.prototype), a.prototype.constructor = a, l.prototype = Object.create(n.prototype), l.prototype.constructor = l, u.prototype = Object.create(n.prototype), u.prototype.constructor = u;
    var M = {
        SideMenu: i,
        SideSubMenu: b,
        SMItem: n,
        SMLabelItem: o,
        SMSubMenuItem: r,
        SMButtonItem: a,
        SMLinkItem: h,
        SMUserAccountItem: l,
        SMSeparatorItem: u,
        pressEvent: y
    };
    return M
});


function CreateMenu(FNamePath, imgpath, AllowedMenus) {
    var AllAllow = AllowedMenus.split('$');
    $.ajax({
        type: "GET",
        url: FNamePath,
        dataType: "xml",
        success: function (xml) {
            sideMenu = new SideMenu([new SMLabelItem("Last Login Time: ")], { overlay: true });
            $(xml).find("Menu").each(function () {
                if ($(this).children().length) {
                    if ($.inArray($(this).attr("MID"), AllAllow) != -1) {
                        sideMenu.addItem(new SMSubMenuItem($(this).attr("text"), []));

                        var mainname = $(this).attr("text");

                        $(this).children().each(function () {
                            if ($.inArray($(this).attr("MID"), AllAllow) != -1) {
                                sideMenu.addItem(new SMLinkItem($(this).attr("text"), $(this).attr("url")));
                            }
                        });

                        $(this).children().each(function () {
                            if ($.inArray($(this).attr("MID"), AllAllow) != -1) {
                                var one = sideMenu.getSubMenuByName(mainname).open();
                                sideMenu.getItemByName($(this).attr("text")).moveToMenu(one);
                            }
                        });
                        sideMenu.close();
                    }
                }
                else {
                    var ss = $(this).attr("MID");
                    var ssf = $.inArray($(this).attr("MID"), AllAllow);
                    if ($.inArray($(this).attr("MID"), AllAllow) != -1) {
                        sideMenu.addItem(new SMLinkItem($(this).attr("text"), $(this).attr("url")));
                    }
                }
            });
            sideMenu.addItem(
                new SMLinkItem("Logout", "[Login Page Apth]")
            );

            sideMenu.addItem(
                new SMLinkItem(" ", "#")
            );

            sideMenu.appendTo(document.getElementById('Geo-menu'));

            sideMenu.addItem(
                new SMUserAccountItem("User Name", imgpath), 1 /* index zero, first element */
            );
        }
    });
}