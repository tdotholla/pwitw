PWITW by Kiel H. Byrne

# P+WITW (Where In The World?)

## INTRO:
This is intended as an asset management dashboard, with a location-centric focus. 

When a computer signs onto any network and obtains an IP address, the public IP address is obtained, a geolocation calculated, and stored along with other machine information in a database.

### How The Script Works:
- The script is written in Powershell, this does the heavy lifting.
- A Scheduled task will run the script when a network change is detected on the host.
- An accompanying bash script ("installTask.bat) copies the necessary files to local folder ["C:\Temp\PWITW"](C:\Temp\PWITW) and installs a scheduled task (an accompanying 'SubmitPCInfo.xml' file).
-When a network change is detected, the local copy of the PS script is ran. A copy of the information (formatted in JSON) is saved in the same folder before sending to the database. [PCInfo.json](C:\temp\pwitw\pcinfo.json). 

### How The Application Works:
- The application repository is stored on [github.com](https://github.com/tdotholla/pwitw).
```clone https://github.com/tdotholla/pwitw```
- A node.js server can build and serve website using Yarn/NPM to install necessary packages.
```yarn | yarn start ```
- A DC Server is currently hosting the application here: ["WDCWK1700:3000"](http://WDCWK1700:3000)

### Features:

#### CAVEATS:
- At this time, to preserve database size, we only want the last known location instead of a set of locations over time (can form a story of when/where a machine has been). 
- We do not store usernames as per GDPR Compliance.
- Written in Powershell; for the windows environment. 


