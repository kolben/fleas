var fleas = (function ($) {
    var _debug = false,
        _limitPosts = 50,
        _maxPosts = 500,
        _groups = $.cookie('groups') ? $.cookie('groups').split(",") : [],
        _posts = {},
        _categories = [
            {
                id: 8,
                name: "Barnvagnar/ -stolar/ -saker",
                categories: [],
                tags: ["spjälskydd", "gravidbälte", "babygunga", "sulky", "barnvagn", "sittdel", "liggdel", "babyskydd", "bilstol", "åkpåse", "bärsele", "amningspump", "bröstpump", "haklapp", "babybjörn", "babywatch", "babysense"]
            },
            {
                id: 10,
                name: "Böcker",
                categories: [],
                tags: ["böcker", "bok"]
            },
            {
                id: 7,
                name: "Fordon",
                categories: [],
                tags: ["moped", "minicross", "husvagn", "däck", "volvo", "saab", "cykel", "fälj", "fälg"]
            },
            {
                id: 15,
                name: "Elektronik",
                categories: [],
                tags: ["grästrimmer", "kaffebryggare", "dvd", "cd-spelare", "talpenna", "microvågsugn", "dammsugar", "laddare", "laptop", "data", "klocka", "fläkt", "platttv", "hdmi", "locktång", "hörlurar", "iphone", "lcd", "dator", "android", "nintendo", "xbox", "ps3", "kamera", "kylskåp", "frys", "tvättmaskin", "mikrovågsugn", "elgitarr", "fotbad"]
            },
            {
                id: 12,
                name: "Heminredning",
                categories: [],
                tags: ["spotlights", "trådback", "korg", "spegel", "trådbackar", "klädställning", "klädsel", "dyna", "gardin", "staty", "löpare", "skylt", "tvättkorg", "påslakan", "kudde", "kuddar", "hängare", "ljusfat", "belysning", "kristallkrona", "gardinstång", "gardinstänger", "discokula", "matta", "mattor", "lykta", "lyktor", "hyllor", "lampa", "lampor", "ramar", "tavla", "tavlor", "gardiner", "toalettsits", "toasits", "ljusstake", "ljushållare", "ljusstakar"]
            },
            {
                id: 1,
                name: "Kläder",
                categories: [
                    {
                        id: 2,
                        name: "Damkläder"
                    },
                    {
                        id: 3,
                        name: "Herrkläder"
                    },
                    {
                        id: 4,
                        name: "Barnkläder",
                        categories: [],
                        tags: []
                    }
                ],
                tags: ["trenchcoat", "regnställ", "hoody", "blazer", "onepiece", "leggings", "tshirt", "cape", "jeggings", "baddräkt", "klädpaket", "tubtop", "bikini", "plagg", "t-shirt", "t-tröja", "pyjamas", "linne", "väst", "kavaj", "tights", "kjol", "shorts", "body", "chinos", "kläder", "kofta", "rock", "topp", "mössa", "mössor", "vantar", "dress", "blus", "skjorta", "skjortor", "tröja", "tröjor", "jeans", "byxa", "byxor", "klänning", "tunika", "tunikor", "klänningar", "kappa", "kappor", "jacka", "jackor", "fleece", "overall"]
            },
            {
                id: 13,
                name: "Leksaker",
                categories: [],
                tags: ["trehjuling", "dockhus", "barbie", "barbapappa", "barbapapa", "racket", "hurts", "nalle", "skallror", "skallra", "lekborg", "hopphäst", "gunghäst", "bollar", "kulor", "drake", "sandlåda", "lekplats", "klossar", "docka", "dockor", "dinosaurier", "dinosaurie", "leksaksridhäst", "lego", "duplo", "dockvagn", "ritsaker", "kritor", "babysitter", "babygym", "pussel", "puzzel", "bondgård", "slott", "leksak", "nallar"]
            },
            {
                id: 6,
                name: "Möbler",
                categories: [],
                tags: ["pall", "klädstång", "pigtittare", "köpmansdisk", "fåtölj", "skåp", "bänk", "skänk", "byrå", "hylla", "säng", "garderob", "tidningsställ", "stol", "stolar", "soffa", "soffpall", "bord", "saccosäck"]
            },
            {
                id: 9,
                name: "Porslin/ Krukor/ Glas",
                categories: [],
                tags: ["kakfat", "tefat", "glas", "tallrik", "tallrikar", "kopp", "koppar", "mugg", "muggar", "servis", "skål", "kruka", "krukor", "vas", "bestick"]
            },
            {
                id: 5,
                name: "Skor",
                categories: [],
                tags: ["sandal", "ballerina", "sko", "stövel", "converse", "stövlar", "stövlette", "platådojor", "kängor", "pumps", "känga", "sneaker"]
            },
            {
                id: 14,
                name: "Smycken, Smink & Väskor",
                categories: [],
                tags: ["öronhänge", "örhänge", "tungpiercing", "navelpiercing", "diadem", "portmonä", "portmonnä", "börs", "plånbok", "nagelklippare", "tippar", "armband", "halsband", "smycke", "örhänge", "smink", "parfym", "fotcream", "fotgele", "väska", "nessesär", "nessecär", "neccesär", "ryggsäck"]
            },
            {
                id: 888,
                name: "Sökes",
                tags: ["söker", "sökes", "köper", "köpes", "letar"]
            }
        ],
        _locations = [
            {
                id: 1,
                name: "Höör",
                tags: ["höör"],
                locations: [{
                        id: 2,
                        name: "Ludvigsborg",
                        tags: ["ludvigsborg"]
                    },
                    {
                        id: 26,
                        name: "Bokeslund",
                        tags: ["bokeslund"]
                    },
                    {
                        id: 3,
                        name: "Sätofta",
                        tags: ["sätofta"]
                    },
                    {
                        id: 11,
                        name: "Snogeröd",
                        tags: ["snogeröd"]
                    },
                    {
                        id: 12,
                        name: "Fogdarp",
                        tags: ["fogdarp"]
                    },
                    {
                        id: 13,
                        name: "Röinge",
                        tags: ["röinge"]
                    },
                    {
                        id: 17,
                        name: "Tjörnarp",
                        tags: ["tjörnarp"]
                    },
                    {
                        id: 18,
                        name: "Osbyholm",
                        tags: ["osbyholm"]
                    },
                    {
                        id: 19,
                        name: "Södra Rörum",
                        tags: ["södrarörum", "srörum", "s.rörum", "fundersed"]
                    },
                    {
                        id: 23,
                        name: "Norra Rörum",
                        tags: ["norrarörum", "nrörum", "n.rörum"]
                    }]
            },
            {
                id: 4,
                name: "Hörby",
                tags: ["hörby"],
                locations: [{
                        id: 5,
                        name: "Löberöd",
                        tags: ["löberöd"]
                    },
                    {
                        id: 6,
                        name: "Satserup",
                        tags: ["satserup"]
                    }]
            },
            {
                id: 7,
                name: "Eslöv",
                tags: ["eslöv"],
                locations: [
                    {
                        id: 8,
                        name: "Sallerup",
                        tags: ["sallerup"]
                    },
                    {
                        id: 14,
                        name: "Stehag",
                        tags: ["stehag"]
                    },
                    {
                        id: 15,
                        name: "Marieholm",
                        tags: ["marieholm"]
                    },
                    {
                        id: 16,
                        name: "Rönneberga",
                        tags: ["rönneberga"]
                    },
                    {
                        id: 20,
                        name: "Svalöv",
                        tags: ["svalöv"]
                    },
                    {
                        id: 21,
                        name: "Hurva",
                        tags: ["hurva"]
                    },
                    {
                        id: 22,
                        name: "Stockamöllan",
                        tags: ["stockamöllan"]
                    },
                    {
                        id: 24,
                        name: "Röstånga",
                        tags: ["röstånga"]
                    },
                    {
                        id: 25,
                        name: "Askeröd",
                        tags: ["askeröd"]
                    }
                ]
            },
            {
                id: 9,
                name: "Lund",
                tags: ["lund"]
            },
            {
                id: 10,
                name: "Malmö",
                tags: ["malmö"]
            }
        ],
        _users = {},
        _dates = {},
        getItemById = function (id, items) {
            for (var i = 0; i < items.length; i++) {
                if (items[i].id === id) {
                    return items[i];
                }
            }
            return null;
        },
        getGroups = function () {
            return _groups;
        },
        indexPost = function (post) {
            var createdDate;
            
            if (post.message) {
                indexPostByItems(post, _categories, "categories");
                indexPostByItems(post, _locations, "locations");
                if (_users[post.from.id]) {
                    _users[post.from.id].posts.push(post.id);
                }
                else {
                    _users[post.from.id] = {
                        posts: [post.id],
                        name: post.from.name
                    };
                }
                if(post.created_time){
                    createdDate = post.created_time.split("T")[0];
                    post.created_date = createdDate;
                    if (_dates[createdDate]) {
                        _dates[createdDate].posts.push(post.id);
                    }
                    else {
                        _dates[createdDate] = {
                            posts: [post.id]
                        };
                    }
                }
            }
            else {
                console.log("fleas.indexPost: Post has no message", post);
            }
        },
        indexPostByItems = function (post, items, childProperty) {
            var i = 0,
                item,
                subItem,
                j,
                k,
                l,
                text = post.message.toLowerCase().replace(/ /g, "");

            for (; i < items.length; i++) {
                item = items[i];
                if (item[childProperty] && item[childProperty].length) {
                    for (k = 0; k < item[childProperty].length; k++) {
                        subItem = item[childProperty][k];
                        if (subItem.tags && subItem.tags.length) {
                            for (l = 0; l < subItem.tags.length; l++) {
                                if (text.indexOf(subItem.tags[l]) > -1) {
                                    item.posts ? item.posts.push(post.id) : item.posts = [post.id];
                                    subItem.posts ? subItem.posts.push(post.id) : subItem.posts = [post.id];
                                    post[childProperty] ? post[childProperty].push(subItem.id) : post[childProperty] = [subItem.id];
                                    break;
                                }
                            }
                        }
                    }
                }
                if (item.tags && item.tags.length) {
                    for (j = 0; j < item.tags.length; j++) {
                        if (text.indexOf(item.tags[j]) > -1) {
                            item.posts ? item.posts.push(post.id) : item.posts = [post.id];
                            post[childProperty] ? post[childProperty].push(item.id) : post[childProperty] = [item.id];
                            break;
                        }
                    }
                }
            }
            console.log(post);
            if (!post[childProperty]) {
                post[childProperty] = [item.id];
                item.posts ? item.posts.push([post.id]) : item.posts = [post.id];
            }

        },
        handleLoginStatus = function (response) {
            console.log("fleas.handleLoginStatus", response);
            showArticle("article");
            if (response && response.status === 'connected') {

                

                
                $("#fb-login-info").hide();
                $("#fb-login-btn").hide();

                if (_groups.length === 0) {
                    $("#fb-login").text("Inloggad");
                    selectGroups();
                }
                else {
                    $("#fb-login").text("Laddar inlägg");
                    loadPosts();
                }
            }
            else {
                $("#fb-login").text("Logga in");
                $("#fb-login-info").text("Du måste logga in på Facebook för att kunna se dina grupper.");
                $("#fb-login-btn").show();

            }
        },
        handleFeedResponse = function (response) {
            console.log("fleas.handleFeedResponse", response);
            var j = 0,
                post,
                today = (new Date()).toISOString().split("T")[0],
                yesterday = (new Date((new Date().getTime()) - 86400000)).toISOString().split("T")[0],
                ul;
            if (response && response.data) {
                for (; j < response.data.length; j++) {
                    post = response.data[j];
                    if (!_posts[post.id]) {
                        indexPost(post);
                        _posts[post.id] = post;
                    }
                    else {
                        console.log("fleas.handleFeedResponse: Duplicate post", post);
                    }
                }
                renderItemsList(_categories, "categories", "categories");
                renderItemsList(_locations, "locations", "locations");

                if (Object.keys(_posts).length < _maxPosts && response.paging && response.paging.next) {
                    $.getJSON(response.paging.next, handleFeedResponse);
                }
                else {
                    $("#fb-login").text(Object.keys(_posts).length + " inlägg i " + _groups.length + " grupper");
                    ul = $("<ul />");
                    if(_dates[today].posts.length){             
                        ul.append(
                            $("<li>")
                                .append(
                                    $("<a>", { 
                                        href: "#today", 
                                        text: "Publicerade idag (" + _dates[today].posts.length + ")"
                                    })
                                    .on("click", function (evt) {
                                        evt.preventDefault();
                                        renderItem({
                                            posts: _dates[today].posts,
                                            name: $(this).text()
                                        });
                                    })
                                )
                        )
                    }
                    if(_dates[yesterday].posts.length)
                    {
                        ul.append(
                            $("<li>")
                                .append(
                                    $("<a>", { 
                                        href: "#today", 
                                        text: "Publicerade igår (" + _dates[yesterday].posts.length + ")"
                                    })
                                    .on("click", function (evt) {
                                        evt.preventDefault();
                                        renderItem({
                                            posts: _dates[yesterday].posts,
                                            name: $(this).text()
                                        });
                                    })
                                )
                        );
                        
                    }
                    $("#dates").empty().append(ul);
                }
            }
        },
        loadPosts = function () {
            var i = 0,
                groupId;
            showArticle("article");
            $("#fb-login-info").html("Laddar inlägg från " + _groups.length + " grupper.");
            for (; i < _groups.length; i++) {
                groupId = _groups[i];
                FB.api('/' + groupId + '/feed', handleFeedResponse, {'limit': _limitPosts});
            }
            

        },
        selectGroups = function () {
            showArticle("article-edit-groups");
            FB.api('/me/groups', function (response) {
                if (response && !response.error) {
                    var ul = $("#edit-groups-list").empty();
                    for (var i = 0; i < response.data.length; i++) {
                        var group = response.data[i];
                        var inp = $('<input id="fb-group-' + group.id + '" type="checkbox" name="fb_groups" value="' + group.id + '" />');
                        if ($.inArray("" + group.id, getGroups()) > -1) {
                            inp.attr("checked", "checked");
                        }
                        ul.append(
                            $("<li />")
                            .append(inp)
                            .append(
                                $("<label />")
                                .attr("for", "fb-group-" + group.id)
                                .text(group.name)
                                )
                            );
                    }
                }
            });
        },
        setGroups = function (groups) {
            resetAll();
            _groups = groups;
            $.cookie('groups', groups.join(","),{ expires: 365 });
        },
        showArticle = function (id) {
            $("article").addClass("hidden");
            $("#" + id).removeClass("hidden");
        },
        renderItem = function (item) {
            showArticle("article");
            var article = $("#article");
            $("#article-header").text(item.name + " (" + (item.posts ? item.posts.length : 0) + ")");
            article.find("section").remove();
            article.append(
                $("<section>")
                .append(renderPosts(item.posts))
                );
            $('#posts')
                .equalizer({
                    columns: '> li'
                });
        },
        renderItemList = function (item, childProperty, prefix) {

            console.log("fleas.renderItemList", item, childProperty, prefix);

            var i = 0,
                li,
                subItem,
                ul;

            if (item.posts && item.posts.length > 0) {
                li = $("<li>")
                    .append(
                        $("<a>", {href: "#" + prefix + "-" + item.id})
                        .append(item.name + " (")
                        .append(
                            $("<span>", {text: item.posts.length})
                            )
                        .append(")")
                        .on("click", function (evt) {
                            evt.preventDefault();
                            renderItem(item);
                        })
                        );
                if (item[childProperty] && item[childProperty].length) {
                    ul = $("<ul>");
                    for (; i < item[childProperty].length; i++) {
                        subItem = item[childProperty][i];
                        ul.append(renderItemList(subItem, childProperty, prefix));
                    }
                    if (ul.is(":parent")) {
                        li.append(ul);
                    }
                }
            }

            return li || $();

        },
        renderItemsList = function (items, wrapperId, childProperty) {
            console.log("fleas.renderItemsList", items.length, wrapperId, childProperty);
            var i = 0,
                item,
                ul = $("<ul />");
            for (; i < items.length; i++) {
                item = items[i];
                ul.append(renderItemList(item, childProperty, wrapperId));
            }
            $("#" + wrapperId).empty().append(ul);
        },
        renderPosts = function (postIds) {
            var i = 0,
                post,
                ul = $("<ul>", {id: "posts"})
                .addClass("clearfix");
            
            postIds.sort(function(a, b){
                return -1 * ((_posts[a].created_time > _posts[b].created_time) -  (_posts[b].created_time > _posts[a].created_time));
            });
            for (; i < postIds.length; i++) {
                post = _posts[postIds[i]];
                if (post) {
                    var li = $("<li>")
                        .append(
                            $("<p />", {
                                html: "<strong>" + post.created_date + "</strong>"
                                    + "<a class='fb-post-comments' id='fb-post-comments-" + post.id + "' data-fb-post-comments='" + post.id + "' href='#comments'>"
                                    + "(" + (post.comments && post.comments.data ? post.comments.data.length : "0") + ")"
                                    + "</a><br />"
                            })
                            .append(
                                $("<a />", {
                                    id: "fb-user-" + post.from.id,
                                    href: "#fb-user-" + post.from.id,
                                    text: post.from.name
                                })
                                .data("fb-user-id", post.from.id)
                                .addClass("fb-user-link")
                                )
                            );
                    if (post.picture) {
                        li.append(
                            $("<div>")
                            .addClass("img-wrapper")
                            .append(
                                $('<img />', {src: post.picture, alt: post.message})
                                )
                            );
                    }
                    ul.append(
                        li
                        .append(
                            $("<p />", {text: post.message})
                            )
                        .append(
                            $("<p />", {text: post.to.data[0].name})
                            )

                        );
                }
            }
            return ul;

        },
        renderUser = function (id) {
            var user = _users[id],
                article = $("#article");
            $("#article-header").text(user.name + " (" + (user.posts ? user.posts.length : 0) + ")");
            article.find("section").remove();

            article.append(
                $("<section>")
                .append(renderPosts(user.posts))
                );

            $('#posts')
                .equalizer({
                    columns: '> li'
                });
    },
        reset = function (objects, childProperty) {
            objects.sort(function (a, b) {
                    return 1 * ((a.name > b.name) - (b.name > a.name));
                });
            objects.push({
                id: 1000,
                name: "Okänt"
            });
            for (var i = 0; i < objects.length; i++) {
                var o = objects[i];
                o.posts = [];
                if (childProperty && o[childProperty]) {
                    reset(o[childProperty], childProperty);
                }

            }
        },
        resetAll = function () {
            reset(_categories, "categories");
            reset(_locations, "locations");
            _dates = {};
            _users = {};
            _posts = {};
            
        },
        viewCategories = function () {
            viewItems(_categories, "article-view-categories", "categories");
        },
        viewLocations = function () {
            viewItems(_locations, "article-view-locations", "locations");
        },
        viewItems = function (items, articleId, childProperty) {
            showArticle(articleId);
            $("#" + articleId + " section").remove();
            var article = $("#" + articleId),
                item,
                i = 0,
                j = 0,
                section,
                subItem;
            for (; i < items.length; i++) {
                item = items[i];
                section = $("<section>")
                    .append(
                        $("<h2>").text(item.name)
                        );
                if (item.tags && item.tags.length) {
                    section
                        .append(
                            $("<p>").html("<strong>Nyckelord</strong>: " + item.tags.sort().join(", "))
                            );
                }
                if (item[childProperty] && item[childProperty].length) {
                    for (j = 0; j < item[childProperty].length; j++) {
                        subItem = item[childProperty][j];
                        if (subItem.tags && subItem.tags.length) {
                            section
                                .append(
                                    $("<h3>").text(subItem.name)
                                    )
                                .append(
                                    $("<p>").html("<strong>Nyckelord</strong>: " + subItem.tags.sort().join(", "))
                                    );
                        }
                    }
                }
                article.append(section);
            }


        };

    return {
        getGroups: getGroups,
        handleLoginStatus: handleLoginStatus,
        loadPosts: loadPosts,
        renderUser: renderUser,
        resetAll: resetAll,
        selectGroups: selectGroups,
        setGroups: setGroups,
        showArticle: showArticle,
        viewCategories: viewCategories,
        viewLocations: viewLocations
    };

}(jQuery));

$(document).ready(function () {

    fleas.resetAll();

    window.fbAsyncInit = function () {
        FB.init({
            appId: window.location.host == "localhost"? '272728566269664' : '272724449603409',
            xfbml: false,
            status: true,
            cookie: true,
            version: 'v2.1'
        });
        FB.getLoginStatus(fleas.handleLoginStatus);
        $("#fb-login-btn").on('click', function (evt) {
            evt.preventDefault();
            FB.login(fleas.handleLoginStatus, {scope: 'user_groups'});
        });
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/sv_SE/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    $("#edit-groups").on("click", function (evt) {
        evt.preventDefault();
        fleas.selectGroups();
    });
    $("#view-categories").on("click", function (evt) {
        evt.preventDefault();
        fleas.viewCategories();
    });

    $("#view-locations").on("click", function (evt) {
        evt.preventDefault();
        fleas.viewLocations();
    });

    $("#edit-groups-save").on("click", function (evt) {
        var groups = $("#edit-groups-list :checked")
            .map(function () {
                return parseInt(this.value, 10);
            })
            .get();
        fleas.setGroups(groups);
        fleas.loadPosts();
    });
    $("#edit-groups-cancel").on("click", function (evt) {
        fleas.showArticle("article");
    });

    $("#main").on("click", ".fb-user-link", function (evt) {
        evt.preventDefault();
        fleas.renderUser($(this).data("fb-user-id"));
    });

    $("h1.title").on("click", function (evt) {
        fleas.showArticle("article");
    });
});

