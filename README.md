# jellyfin-extrafanart
This is a mod for jellyfin-web that gives you extrafanart again.. by using forced injection because it really bothered me not having it..

this mod will add an ExtraFanart heading in the items page and show you the extra fanart items from said item there, you click on it and it enlarges it, click it again and it goes away to normal size

note: this is in alpha and will have bugs and other assorted pains in the ass more of a proof of concept of the injection method.

## Screenshots

![Screenshot 2025-03-14 172458](https://github.com/user-attachments/assets/4aada493-030d-4160-86fa-bafbec8b666a)
![Screenshot 2025-03-14 172444](https://github.com/user-attachments/assets/6112542a-86a2-4d4d-b64b-6dc6686717b7)
![Screenshot 2025-03-14 172433](https://github.com/user-attachments/assets/04fc7218-676f-420f-9fc2-e022618724db)
![Screenshot 2025-03-14 172424](https://github.com/user-attachments/assets/eae79cd7-3626-46b2-86ee-84b983b546e8)
![Screenshot 2025-03-14 172405](https://github.com/user-attachments/assets/8986feb9-0306-49f1-b347-c8da39af644f)
![Screenshot 2025-03-14 172355](https://github.com/user-attachments/assets/0a19c43e-bb4e-4250-93ea-c6143f25072d)

# requirements
you must have either the media bar installed first (this has a hook to get the required api calls) or you must scroll to the bottom and do the MANUAL INJECTION part first.

# installation
place the `extrafanart.js` into your web root folder (not any other folder) there are other mods that cover which dir is your web root per each platform or check your jellyfin log for the web dir in the start up messages.

edit your index.html and simply add `<script defer src="extrafanart.js"></script>` just before the `</head>` tag 

save and close the file and do a clear cache and reload and you will now see it working in your install (note this is by design only supposed to show you EXTRA fanart i can add the primary art etc if needed just didnt think it was quite needed at the min)

### MANUAL INJECTION method

right so same as the other mods with manual injection YOU ONLY NEED ONE OF THE INJECTION METHODS do not do multiple (it wont hurt your install but it does make it redundant and would be a waste of time) if you already have a working mod that uses the method (media bar, pausescreen, extrafanart) you will not need to add this again

simply edit the index.html and add the manual injection method code 

````
<script>
const saveJellyfinCredentials = (serverId, accessToken) => {
    const credentials = {
        Servers: [{ Id: serverId, AccessToken: accessToken }],
    };

    try {
        localStorage.setItem("jellyfin_credentials", JSON.stringify(credentials));
        console.log("Jellyfin credentials saved successfully.");
    } catch (e) {
        console.error("Error saving Jellyfin credentials", e);
    }
};
</script>
````
save and clear cache and reload and you will have now finished the manual injection so go back to the rest of the instructions.


