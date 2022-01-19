document.addEventListener("DOMContentLoaded", function () {
    var resetButton = document.getElementById("resetBackgroundBtn");

    function n(t) {
        url_str = "url(media/bg/bg" + t + ".jpg)";
        console.log(url_str);
        void 0 === t | !t ?
            (document.getElementById("canvasContainer").style.display = "block", document.getElementById("body").style.display.backgroundImage = "none", document.getElementById("resetBackgroundBtn").style.display = "none") :
            (document.getElementById("canvasContainer").style.display = "none", document.getElementById("body").style.backgroundImage = url_str)
    }

    function useCustomFile() {
        var imageData = localStorage.getItem("background_image_file");
        document.getElementById("canvasContainer").style.display = "none", document.getElementById("body").style.backgroundImage = "url(" + imageData + ")";
        if (document.getElementById("resetBackgroundBtn").style.display === "none") {
            document.getElementById("resetBackgroundBtn").style.display = "inline-block"
        }
    }

    var e = localStorage.getItem("background_id");
    if (localStorage.getItem("use_own_background_image") == "yes") {
        resetButton.style.display = "inline-block"
        useCustomFile();
    } else {
        n(e);
    }

    console.log("Filling options");
    for (var i = 0, imax = linkMenuOrder.length; i < imax; i++) {
        var option = document.createElement("option");
        option.innerHTML = linkMenuOrder[i];
        document.getElementById("menu-select").appendChild(option);
    };

    document.getElementById("add").addEventListener("click", function () {
        if (document.getElementById("url").value === "https://" || document.getElementById("url").value === "" || document.getElementById("title").value === "") {
            alert("You haven't entered new link URL or title!");
            return;
        }
        addLinkToMenu(document.getElementById("url").value, document.getElementById("title").value, document.getElementById("menu-select").value);
        document.getElementById("url").value = "https://";
        document.getElementById("title").value = "";
    })

    var linkForm = document.getElementById("add-link-form");
    document.getElementById("add-link-btn").addEventListener('click', function (event) {
        linkForm.classList.toggle("active");
    });

    bg_container = document.getElementById("customBackgrounds");
    bg_list = document.getElementById("customBackgroundsList");
    bg_thumb = document.getElementById("thumbTemplate");
    bg_count = 6;

    for (var c = 0; c <= 5; c++) {
        var l = "media/bg-thumbs/bg" + c + ".jpg";
        // console.log(l);
        var i = bg_thumb.cloneNode(true);
        i.classList.remove("template");
        i.style.backgroundImage = "url(" + l + ")";
        i.setAttribute("data-id", c);
        bg_list.appendChild(i)
    }

    var resetBackground = function () {
        e = "", localStorage.setItem("background_id", e), document.getElementById("thumbTemplate").classList.remove("active"), n(e);
        if (localStorage.getItem("use_own_background_image") === "yes") {
            localStorage.setItem("use_own_background_image", "no"), localStorage.setItem("background_image_file", "");
        }
    }
    document.getElementById("customBgBtnToggle").addEventListener("click", function () {
        document.getElementById("customBackgrounds").classList.toggle("active");
    })

    var thumbsList = document.querySelectorAll(".thumb");
    Array.from(thumbsList).forEach(function (thumb) {
        thumb.addEventListener("mouseover", function () {
            bg_container.classList.contains("active") && n(this.getAttribute(("data-id")))
        });
        thumb.addEventListener("mouseleave", function () {
            bg_container.classList.contains("active") && (localStorage.getItem("use_own_background_image") === "yes" ? useCustomFile() : n(e))
        });
        thumb.addEventListener("click", function () {
            if (bg_container.classList.contains("active")) {
                e = this.getAttribute("data-id");
                localStorage.setItem("background_id", e);
                for (let sibling of this.parentNode.children) {
                    sibling.classList.remove("active");
                }
                this.classList.add("active");
                resetButton.style.display = "inline-block";
            }
            localStorage.setItem("use_own_background_image", "no"), localStorage.setItem("background_image_file", "")
        });
    })

    resetButton.addEventListener("click", function () { resetBackground() });
    globalResetBackground = resetBackground; // for access from script.js

    document.getElementById("customBackgroundFile").addEventListener("change", function () {
        var file = this.files[0];
        if (file.type.indexOf('image') < 0) {
            alert("Sorry, that is an invalid file type");
            return;
        }
        var fReader = new FileReader();
        fReader.onload = function () {
            var imageData = fReader.result;
            try {
                localStorage.setItem("background_image_file", imageData);
                localStorage.setItem("use_own_background_image", "yes");
                document.getElementById("canvasContainer").style.display = "none";
                document.getElementById("body").style.backgroundImage = "url(" + imageData + ")";
                resetButton.style.display = "inline-block";
                document.getElementById("customBackgrounds").classList.toggle("active");
                lockSidebar = false;
                closeNav();
            } catch (domException) {
                if (domException.name === 'QuotaExceededError' || domException.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                    alert("Sorry, that image is too large for this browser.");
                }
            }
        };
        fReader.readAsDataURL(file);
    });
});