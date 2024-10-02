// config.js
const fs = require("fs");
require("dotenv").config();

const config = {
  SESSION_ID: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkhSZWxZYXBnc0h4NEs4NjB3bWhmYktsZ0RuQUJheHJlVUdIa09JR25GND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaDM1YTRHa1lnSk5VUUdkWjcwUG5PR01QR3hWL1Btd08ydEowb0lhNUJVVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXTlVSajBXVWt0TFVRdUVEV3JGSlAyVGJ6Wm1PZ3hrbDhsNFdKVXFHQWtJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpemhPVjJKY1Y2Z3hWT29qZFpoaERvbHU2NVRCemJFVmlBRzJ2d2t6bGxFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlFa01zMjUxdkRkdHB3YmVYN29PVzU2VnArNE52ei9PckN4ZnQva0RXVVE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJpTEk1SnMxbkh3ZDhrS29Ka1BWSXAyVzdjMkR5WExLZkVxNXJxSU1XZ0k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUNrSVdrTHcyZ0wvcEs3OHZoN3JUb0tyQjVOczNBSnY5bnFtY1RGelZtZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWkRJWlJ4ZktGMzRvd093VTd1blRacFZqay9WdE1LeXdwVGJ6WGxvcDFGUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxOU0wxVFlOMWxXeG1UOWtjQWpWZ25RZVAvQVZxS2I2UjVnL2ErRmZrSTJ5Yi8vNERWcmVIVTE5SVYwYnFpSVRPVHM5SG1rMFpLU0dRNjJ5ZmgxUUNRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYxLCJhZHZTZWNyZXRLZXkiOiJUUjFBOEdaTWo4a2VteFRKbWpiZ1Q5N1FxeWtOVjQrQnlCTWlHWFJrdVN3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJLTlpndjFWQ1RjNmlZR3NiMHpudHNnIiwicGhvbmVJZCI6IjRmNzQ3MTdjLTg1ZDgtNGU2YS1iMTg0LWJmODgwYWYzMjY3MSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrZ0MzMmRXaDJUek55VC9vTnhQNmt1TjhtaFk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT1YyWjV5YVdEcVVXaWx4TVlVeUd0R2pxbERvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjdZTkdDQ01SIiwibWUiOnsiaWQiOiIyNTQxMDI0NDM5OTE6NEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSkxIMW9BRUVLNkY5YmNHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiMkVUQktVdVJYMFpDSWRtbnlaR2E5blppUmZ4NjFzNHBuVWUzZ01OYkdUYz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiQ2dsNDB0a0c2WHBTY2REb1FlTXA1K2F1NllISnZxQUlGYitQQVhQdUNEMkpPYVlzbEFTR3NYbjVPanpFbmJnNVcwd3ZCaGlua2g1MzM0TzFrZlpEQ2c9PSIsImRldmljZVNpZ25hdHVyZSI6IjhQV3FzT21zNU9scmswcTRHTVFNSVhDVGJHVGFyMzJ2NUQ0RXFWemZzQWFHTmkzTHltTUlpV29HM1JQQzJjN3paOFZuSjJhZ1dTL3pmTzJsQlJGS0NnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0MTAyNDQzOTkxOjRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZGhFd1NsTGtWOUdRaUhacDhtUm12WjJZa1g4ZXRiT0taMUh0NEREV3hrMyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNzg3MzcyNH0= ",
  PREFIX: process.env.PREFIX || '.',
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN !== undefined ? process.env.AUTO_STATUS_SEEN === 'true' : true, 
  AUTO_DL: process.env.AUTO_DL !== undefined ? process.env.AUTO_DL === 'true' : false,
  AUTO_READ: process.env.AUTO_READ !== undefined ? process.env.AUTO_READ === 'true' : false,
  AUTO_TYPING: process.env.AUTO_TYPING !== undefined ? process.env.AUTO_TYPING === 'true' : false,
  AUTO_RECORDING: process.env.AUTO_RECORDING !== undefined ? process.env.AUTO_RECORDING === 'true' : false,
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE !== undefined ? process.env.ALWAYS_ONLINE === 'true' : false,
  AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'true' : false,
   /*auto block only for 212 */
  AUTO_BLOCK: process.env.AUTO_BLOCK !== undefined ? process.env.AUTO_BLOCK === 'true' : true,
  
  
  REJECT_CALL: process.env.REJECT_CALL !== undefined ? process.env.REJECT_CALL === 'true' : false, 
  NOT_ALLOW: process.env.NOT_ALLOW !== undefined ? process.env.NOT_ALLOW === 'true' : true,
  MODE: process.env.MODE || "public",
  OWNER_NAME: process.env.OWNER_NAME || "©Baraka Bega",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "255762190568",
  GEMINI_KEY: process.env.GEMINI_KEY || "AIzaSyCUPaxfIdZawsKZKqCqJcC-GWiQPCXKTDc",
  WELCOME: process.env.WELCOME !== undefined ? process.env.WELCOME === 'true' : false, 
};


module.exports = config;
