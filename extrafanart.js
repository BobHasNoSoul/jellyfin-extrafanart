(function() {
    let currentItemId = null;
    let userId = null;
    let token = null;

    const getJellyfinCredentials = () => {
        const jellyfinCreds = localStorage.getItem("jellyfin_credentials");
        try {
            const serverCredentials = JSON.parse(jellyfinCreds);
            const firstServer = serverCredentials.Servers[0];
            if (!firstServer) {
                console.error("Could not find credentials for the client");
                return;
            }
            return { token: firstServer.AccessToken, userId: firstServer.UserId };
        } catch (e) {
            console.error("Could not parse jellyfin credentials", e);
        }
    };

    const credentials = getJellyfinCredentials();
    if (!credentials) return;
    userId = credentials.userId;
    token = credentials.token;

    function createFanartSection() {
        let existingSection = document.getElementById("extraFanartContainer");
        if (existingSection) {
            existingSection.remove();
        }

        let fanartContainer = document.createElement("div");
        fanartContainer.id = "extraFanartContainer";
        fanartContainer.style = "margin-top: 20px;";

        let header = document.createElement("h2");
        header.innerText = "ExtraFanart";
        fanartContainer.appendChild(header);

        let imagesContainer = document.createElement("div");
        imagesContainer.id = "extraFanartImages";
        imagesContainer.style = "display: flex; flex-wrap: wrap; gap: 10px;";
        fanartContainer.appendChild(imagesContainer);

        let targetElement = document.querySelector("#similarCollapsible > div:nth-child(3)");
        if (targetElement) {
            targetElement.after(fanartContainer);
        }
    }

    function fetchItemFanart(itemId) {
        currentItemId = itemId;
        createFanartSection();
        let imagesContainer = document.getElementById("extraFanartImages");
        imagesContainer.innerHTML = "";

        const imageTypes = ["Box", "Disc", "Banner", "Art"];
        imageTypes.forEach(type => {
            let imgUrl = `${window.location.origin}/Items/${itemId}/Images/${type}`;
            fetch(imgUrl, { method: 'HEAD' }).then(response => {
                if (response.ok) {
                    let img = document.createElement("img");
                    img.src = imgUrl;
                    img.style = "max-width: 150px; height: auto; cursor: pointer; border-radius: 5px; transition: 0.3s ease-in-out; object-fit: contain;";
                    img.onclick = () => toggleImageSize(img);
                    imagesContainer.appendChild(img);
                }
            });
        });
    }

    function toggleImageSize(img) {
        if (img.classList.contains("fullsize")) {
            img.classList.remove("fullsize");
            img.style.position = "relative";
            img.style.width = "150px";
            img.style.height = "auto";
            img.style.transform = "none";
            img.style.zIndex = "auto";
            img.style.background = "none";
        } else {
            img.classList.add("fullsize");
            img.style.position = "fixed";
            img.style.top = "50%";
            img.style.left = "50%";
            img.style.transform = "translate(-50%, -50%)";
            img.style.width = "auto";
            img.style.height = "auto";
            img.style.maxWidth = "90vw";
            img.style.maxHeight = "90vh";
            img.style.objectFit = "contain";
            img.style.background = "rgba(0, 0, 0, 0.9)";
            img.style.zIndex = "1000";
        }
    }

    function monitorURLChange() {
        let lastURL = window.location.href;
        setInterval(() => {
            if (window.location.href !== lastURL) {
                lastURL = window.location.href;
                let match = window.location.href.match(/details\?id=([a-f0-9]+)/);
                if (match) {
                    let itemId = match[1];
                    if (itemId !== currentItemId) {
                        fetchItemFanart(itemId);
                    }
                } else {
                    let extraFanartContainer = document.getElementById("extraFanartContainer");
                    if (extraFanartContainer) {
                        extraFanartContainer.remove();
                    }
                    currentItemId = null;
                }
            }
        }, 500);
    }

    monitorURLChange();
})();
