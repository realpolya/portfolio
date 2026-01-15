/* 

Order of cubes:

1 - dark/light mode
3 - resume
5 - mapstep
9 - homi
15 - savour the seasons
18 - gourds and grocers
22 - battleship
30 - github
32 - linkedin
35 - funfact
40 - photograph
45 - youtube
49 - portfolio
58 - coloring game

*/

const CUBES = 60

const startCubes = [1, 3, 9, 15, 18, 22, 30, 32, 35, 40, 45, 49, 58]

const linkOrders = ["mode", "resu", "homi", "savo", "gour", "batt", "gith", "liin", "funf", "phot", "yout", "port", "game"]
const textOrders = ["dark/light", "resume", "homi", "savor the seasons", 
    "gourds and grocers", "battleship", "github", "Linked In", 
    "fun fact!", "", "RP channel", "Real Polya website", "coloring game"]
const iconSrcs = ["./assets/cube.ico", "./assets/resume.png", "./assets/homi2.png", "./assets/savor.png",
    "./assets/gourds.png", "./assets/battleship.png", "./assets/git.png",
    "./assets/linked.png", "./assets/funfact.png", "./assets/photo1.png",
    "./assets/yt.png", "./assets/rp.png", "./assets/artist.png"
]
const linksToSites = ["mode", "./assets/resume.pdf", "https://homi-realpolya.netlify.app/", "https://savor-the-seasons.netlify.app/",
    "https://gourds-and-grocers-fc1e690d830c.herokuapp.com/", "https://realpolya.github.io/battleship-game/index.html",
    "https://github.com/realpolya", "https://www.linkedin.com/in/realpolya/", "", "", 
    "https://www.youtube.com/realpolya", "https://realpolya.com/", ""
]

export {
    startCubes,
    linkOrders,
    textOrders,
    iconSrcs,
    linksToSites
}