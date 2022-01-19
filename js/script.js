let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let dayNames = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
let CookiePrefix = "weboasis_";
let cmdPrefix = "!";
let ssi = 0;
let color = "#aaeb8d";
let canvasBg = "matrix";
let searchSources = [
  ["g", "https://www.google.com/search?q={Q}", "   Google"],
  ["d", "https://duckduckgo.com/?q={Q}", "  DuckDuckGo"],
  ["b", "https://search.brave.com/search?q={Q}", "   Brave"],
  ["y", "https://yandex.com/search/?text={Q}", "   Yandex"],
  ["s", "https://www.startpage.com/do/search?query={Q}", "   StartPage"],
  ["p", "https://engine.presearch.org/search?q={Q}", "   Presearch"],
  ["x", "https://anon.sx/?q={Q}", "   SearX"],
  ["m", "https://www.mojeek.com/search?q={Q}", "   Mojeek"],
  ["e", "https://metager.org/meta/meta.ger3?eingabe={Q}", "   Metager"],
  ["q", "https://www.qwant.com/?q={Q}&t=web", "Qwant"],
  ["w", "https://www.wolframalpha.com/input/?i={Q}", "   Wolfram"],
  ["f", "https://boardreader.com/s/{Q}.html", "   Forums"],
  ["u", "https://piped.kavin.rocks/results?search_query={Q}", "   YouTube"],
  ["t", "https://bitsearch.to/search?q={Q}", "  Torrents"],
  ["a", "https://alternativeto.net/browse/search?q={Q}", "   Alternative"],
  ["o", "https://ahmia.fi/search/?q={Q}", "   Onion/TOR"],
];
let lockNav = false;
let globalResetBackground;
let svgReddit = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712-1.465 0-2.656 1.187-2.656 2.646 0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 4.808 7.093 10.719 7.093s10.72-3.182 10.72-7.093c0-.274-.029-.544-.075-.81.832-.447 1.405-1.312 1.405-2.318zm-17.224 1.816c0-.868.71-1.575 1.582-1.575.872 0 1.581.707 1.581 1.575s-.709 1.574-1.581 1.574-1.582-.706-1.582-1.574zm9.061 4.669c-.797.793-2.048 1.179-3.824 1.179l-.013-.003-.013.003c-1.777 0-3.028-.386-3.824-1.179-.145-.144-.145-.379 0-.523.145-.145.381-.145.526 0 .65.647 1.729.961 3.298.961l.013.003.013-.003c1.569 0 2.648-.315 3.298-.962.145-.145.381-.144.526 0 .145.145.145.379 0 .524zm-.189-3.095c-.872 0-1.581-.706-1.581-1.574 0-.868.709-1.575 1.581-1.575s1.581.707 1.581 1.575-.709 1.574-1.581 1.574z\"/></svg>";
let svgCode = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M24 10.935v2.131l-8 3.947v-2.23l5.64-2.783-5.64-2.79v-2.223l8 3.948zm-16 3.848l-5.64-2.783 5.64-2.79v-2.223l-8 3.948v2.131l8 3.947v-2.23zm7.047-10.783h-2.078l-4.011 16h2.073l4.016-16z\" /></svg>";
let svgNews = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M21 9.662c-2.287.194-5.197 1.038-7 1.794v-1.064c1.933-.721 4.598-1.54 7-1.745v1.015zm0 2.031c-2.287.194-5.197 1.038-7 1.794v-1.064c1.933-.721 4.598-1.54 7-1.745v1.015zm0 2.031c-2.287.194-5.197 1.038-7 1.794v-1.064c1.933-.721 4.598-1.54 7-1.745v1.015zm0 2.031c-2.287.194-5.197 1.038-7 1.794v-1.064c1.933-.721 4.598-1.54 7-1.745v1.015zm0-9.951c-2.402.204-5.068 1.024-7 1.745v1.933c1.804-.756 4.713-1.6 7-1.794v-1.884zm-18 2.843c2.402.205 5.067 1.024 7 1.745v1.064c-1.803-.756-4.713-1.6-7-1.794v-1.015zm0 2.031c2.402.205 5.067 1.024 7 1.745v1.064c-1.803-.756-4.713-1.6-7-1.794v-1.015zm0 2.031c2.402.205 5.067 1.024 7 1.745v1.064c-1.803-.756-4.713-1.6-7-1.794v-1.015zm0 2.032c2.402.205 5.067 1.024 7 1.745v1.064c-1.803-.756-4.713-1.6-7-1.794v-1.015zm0-7.054c2.287.194 5.196 1.038 7 1.794v-1.933c-1.932-.72-4.598-1.54-7-1.744v1.883zm9-2.724c-3.063-1.671-7.776-2.755-12-2.963v17c4.289.206 8.195 1.249 12 3 3.805-1.751 7.711-2.794 12-3v-17c-4.224.208-8.937 1.292-12 2.963zm-10-.791c4.264.496 6.86 1.467 9 2.545v12.702c-2.968-1.184-5.939-1.95-9-2.271v-12.976zm20 12.975c-3.061.321-6.032 1.088-9 2.271v-12.701c2.187-1.103 4.757-2.051 9-2.544v12.974z\" /></svg>";
let svgMore = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M16 6h-8v-6h8v6zm-10 12h-6v6h6v-6zm18 0h-6v6h6v-6zm-11-7v-3h-2v3h-9v5h2v-3h7v3h2v-3h7v3h2v-5h-9zm2 7h-6v6h6v-6z\" /></svg>";
let svgSocial = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z\" /></svg>";
let svgDownloads = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M23.984 11h-2.006c-.057-.557-.143-1.104-.287-1.631l1.82-.862c.245.799.401 1.632.473 2.493zm-3.035-3.493l1.81-.857c-.353-.7-.758-1.368-1.236-1.981l-1.512 1.318c.36.474.667.986.938 1.52zm.039 8.939c-.26.519-.562 1.01-.904 1.473l1.539 1.29c.465-.616.871-1.276 1.211-1.976l-1.846-.787zm-.836-13.238c-.589-.54-1.214-1.038-1.9-1.454l-1.216 1.599c.577.334 1.104.739 1.602 1.177l1.514-1.322zm-1.414 16.195c-1.779 1.608-4.129 2.597-6.713 2.597-5.525 0-10.021-4.486-10.021-10 0-3.692 2.021-6.915 5.011-8.647l-1.215-1.599c-3.473 2.103-5.8 5.897-5.8 10.246 0 6.627 5.385 12 12.025 12 3.204 0 6.107-1.259 8.264-3.297l-1.551-1.3zm3.258-6.403c-.054.54-.162 1.063-.299 1.574l1.864.795c.224-.762.372-1.553.439-2.369h-2.004zm-9.996 5l7-8h-4v-10h-6v10h-4l7 8z\" /></svg>";
let svgStream = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M19 12c-.341 0-.673-.033-1-.08v1.08h-2v-1.683c-.749-.356-1.427-.837-2-1.422v3.105h-8v-6h6.294c-.19-.634-.294-1.305-.294-2h-12v19h20v-12.08c-.327.047-.659.08-1 .08zm-15 10h-2v-2h2v2zm0-4h-2v-2h2v2zm0-5h-2v-2h2v2zm0-4h-2v-2h2v2zm10 13h-8v-6h8v6zm4 0h-2v-2h2v2zm0-4h-2v-2h2v2zm-3.711-14.667c.688-1.941 2.534-3.333 4.711-3.333 2.762 0 5 2.239 5 5 0 .285-.029.562-.074.833h-.635c-.474 0-.55-.211-.806-1.025-.186-.589-.493-1.479-1.171-1.479-.689 0-.957.923-1.205 1.669-.137.405-.217.65-.339.65-.116 0-.171-.245-.308-.65-.258-.759-.551-1.669-1.235-1.669-.711 0-1.016.995-1.22 1.628-.147.46-.194.691-.324.691-.111 0-.146-.187-.275-.56-.293-.85-.386-1.755-1.691-1.755h-.428zm8.941 3.334c-.957 0-1.185-.459-1.543-1.485-.221-.636-.245-.864-.373-.864-.126 0-.161.262-.408.964-.216.615-.514 1.379-1.136 1.379-.693 0-.987-.927-1.243-1.698-.142-.427-.177-.622-.3-.622-.115 0-.146.175-.291.598-.265.781-.559 1.722-1.253 1.722-.687 0-1-.926-1.171-1.479-.252-.818-.297-1.014-.755-1.014h-.684c-.044.27-.073.547-.073.832 0 2.761 2.238 5 5 5 2.177 0 4.022-1.392 4.709-3.333h-.479z\" /></svg>";
let svgCloud = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M24 21v-6h-18v6h18zm-3-4c.553 0 1 .448 1 1s-.447 1-1 1c-.552 0-1-.448-1-1s.448-1 1-1zm-7.806 0h1.275l-.864 2h-1.274l.863-2zm-2.141 0h1.275l-.863 2h-1.275l.863-2zm-2.19 0h1.275l-.863 2h-1.275l.863-2zm-4.863.941c-2.253-.29-4-2.194-4-4.524 0-2.252 1.626-4.121 3.767-4.506.177-3.294 2.895-5.911 6.233-5.911s6.056 2.617 6.233 5.911c2.005.361 3.541 2.029 3.729 4.089h-1.991c-.279-2.105-2.674-2.333-3.65-2.401.117-1.958-.555-5.599-4.321-5.599-4.438 0-4.359 4.75-4.321 5.599-.945-.037-3.679.341-3.679 2.818 0 1.223.856 2.245 2 2.511v2.013z\" /></svg>";
let linkMenuOrder = [
  "Downloads",
  "Stream",
  "Social",
  "Reddit",
  "Code",
  "News",
  "Cloud",
  "More",
];
let defaultLinkMenu = {
  "Downloads": [
    [svgDownloads,                   "blue",                                        "-HEAD-"],
    ["OasisMagnet",                   "https://weboas.is/magnet/","Magnet Search"],
    ["UnblockIt",                   "https://unblockit.tv","Bypass Blocks"],
    ["1337X",                   "https://1337x.to/home/","Torrent"],
    ["RARBG",                   "https://rarbg.to","Torrent"],
    ["ETTV",                   "https://www.ettvcentral.com/home/","Torrent"],
    ["EXT",                   "https://ext.to","Torrent"],
    ["GloDLS",         "https://glodls.to/home.php","Torrent"],
    ["Demonoid",                   "https://demonoid.is","Torrent"],
    ["TorGalaxy",         "https://torrentgalaxy.to","Torrent"],
    ["PirateBay",         "https://thepiratebay.org","Torrent"],
    ["BitSearch",                   "https://bitsearch.to","Torrent"],
    ["FileList",                   "https://filelisting.com","Torrent"],
    ["Paradise",                   "https://torrent-paradise.ml","Torrent"],
    ["MSearch",                   "https://msearch.vercel.app","Torrent"],
    ["BTMET",                   "https://btmet.com","Torrent"],
    ["BT4G",             "https://bt4g.org","Torrent"],
    ["xBiT",                   "https://xbit.pw","Torrent"],
    ["TorLook",                   "https://torlook.info","Torrent"],
    ["ATorrents",                   "https://atorrents.com","Torrent"],
    ["TVSplurge",                   "https://tvsplurge.io","Torrent"],
    ["RuTracker",                   "https://rutracker.org/forum/","Torrent"],
    ["Rutor",                   "http://rutor.info","Torrent"],
    ["TorrentDLs",         "https://www.torrentdownloads.pro","Torrent"],
    ["ConCen",             "https://www.concen.org/torrents","EDU Torrent"],
    ["Academic",                   "https://academictorrents.com","EDU Torrent"],
    ["Etree",                   "https://etree.org","Music Torrent"],
    ["SoundPark",                   "https://sound-park.world","Music Torrent"],
    ["SportVideo",                   "https://www.sport-video.org.ua","Sport Torrent"],
    ["720pier",                   "https://720pier.ru","Sport Torrent"],
    ["NYAA",                   "https://nyaa.si","Anime Torrent"],
    ["ShowRSS",               "https://showrss.info","RSS Torrent"],
    ["WebTor",                   "https://webtor.io","Browser Client"],
    ["BatchEdit",                   "https://yutzuko-torrent.appspot.com","Torrent Editor"],
    ["TorMagnet",                   "https://weboas.is/torrent/t2m/","Torrent Converter"],
    ["TorCreate",                   "https://weboas.is/torrent/make/","Torrent Creator"],
    ["FossHub",                    "https://www.fosshub.com","Freeware"],
    ["AppImage",                   "https://www.appimagehub.com","Linux Freeware"],
    ["OlderGeek",               "https://oldergeeks.com","Win Freeware"],
    ["Ninite",               "https://ninite.com","Win Freeware"],
    ["APKMirror",               "https://www.apkmirror.com","Android Freeware"],
    ["FOSSDroid",               "https://fossdroid.com","Android Freeware"],
    ["M0nkrus",                   "http://monkrus.ws","Win DDL"],
    ["GetIntoPC",                   "http://getintopc.com","Win DDL"],
    ["KaranPC",                   "https://karanpc.com","Win DDL"],
    ["Mutaz",                   "https://www.mutaz.net","Win DDL"],
    ["AppNee",                   "https://appnee.com","Win DDL"],
    ["FileCR",                   "https://filecr.com","Win DDL"],
    ["HaxNode",             	"https://haxnode.net","Win DDL"],
    ["CracksHash",                   "https://crackshash.com","Win DDL"],
    ["ShareApps",                   "https://shareappscrack.com","Win DDL"],
    ["CrackPatch",                   "https://crackingpatching.com","Win DDL"],
    ["CRACKSurl",                   "https://cracksurl.com","Win DDL"],
    ["Mazterize",                   "https://www.mazterize.com","Win DDL"],
    ["IzoFile",                   "https://izofile.com","Win DDL"],
    ["MacTorrent",                   "https://mac-torrents.io","Mac Torrent"],
    ["MacDrop",                   "https://macdrop.net","Mac DDL"],
    ["AppKed",                   "https://www.macbed.com","Mac DDL"],
    ["NMac",                   "https://nmac.to","Mac DDL"],
    ["FCPortable",                   "https://www.fcportables.com","Portable Apps"],
    ["Freeware",                   "https://www.portablefreeware.com","Portable Apps"],
    ["PortApps",                   "https://portapps.io/apps/","Portable Apps"],
    ["FitGirl",                   "http://fitgirl-repacks.site","Game DDL"],
    ["CrackHub",                   "https://crackhub.site","Game DDL"],
    ["SteamUnlock",                   "https://steamunlocked.net","Game DDL"],
    ["GamesMount",                   "https://gamesmountain.com","Game DDL"],
    ["Bonneteer",                   "https://bonneteer.herokuapp.com","Game DDL"],
    ["NitroBlog",                   "https://nblog.org","Game DDL"],
    ["GameBox",                   "http://www.newgamesbox.net","Game DDL"],
    ["SKIDROW",                   "https://skidrowrepacks.com","Game DDL"],
    ["GLOAD",                   "https://gload.to","Game DDL"],
    ["Otomi",                   "https://otomi-games.com","Game DDL"],
    ["Xatab",                   "https://otxataba.net","Game DDL"],
    ["DODI",                   "http://dodi-repacks.site","Game DDL"],
    ["Amigos",                   "https://www.elamigos-games.com","Game DDL"],
    ["GOGGames",                   "https://gog-games.com","Game DDL"],
    ["GOGUnlock",                   "https://gogunlocked.com","Game DDL"],
    ["CroHasIt",                   "https://crohasit.net","Game DDL"],
    ["OVAGames",                   "http://www.ovagames.com","Game DDL"],
    ["CPGRepack",                   "https://cpgrepacks.site","Game DDL"],
    ["Masquerade",                   "https://masquerade.site","Game DDL"],
    ["MagiPack",                   "https://www.magipack.games","Game DDL"],
    ["ARTEMiS",                   "https://artemis-repacks.site","Game DDL"],
    ["GameCopy",                    "https://www.gamecopyworld.eu","Game Cracks"],
    ["SaveWorld",                    "http://www.savegameworld.com","Saved Games"],
    ["RareLust",                   "https://rarelust.com","Movie DDL"],
    ["RareFilm",                   "http://rarefilm.net","Movie DDL"],
    ["HEVCBay",         			"https://hevcbay.com","Movie DDL"],
    ["X265Movies",                   "https://x265movies.cc","Movie DDL"],
    ["MovieFiles",                   "https://moviefiles.org","Movie DDL"],
    ["Paradise",                   "https://movieparadise.org","Movie DDL"],
    ["SeriesVault",                   "https://seriesvault.win","TV DDL"],
    ["Crazy4TV",                   "https://crazy4tv.com","TV DDL"],
    ["PSARips",                   "https://psarips.xyz","Media DDL"],
    ["HDEncode",                   "https://hdencode.com","Media DDL"],
    ["4KRemux",                   "https://4kremux.com","Media DDL"],
    ["HashHackers",                   "https://drive.hashhackers.com","Google Drives"],
    ["WorldSrc",                   "https://worldsrc.org","DDL"],
    ["ReleaseBB",                   "https://rlsbb.ru","DDL"],
    ["SoftArchive",                   "https://sanet.st/full/","DDL"],
    ["ReleaseHive",                   "https://www.releasehive.com","DDL"],
    ["SceneSource",                   "https://scnsrc.me","DDL"],
    ["DownTURK",                   "https://www.downturk.net","DDL"],
    ["0DayDown",                    "https://www.0daydown.com","DDL"],
    ["AvaxHome",                   "https://avxhm.se","DDL"],
    ["ScnLog",                   "https://scnlog.me","DDL"],
    ["Volno",                   "https://volno.org/portal.php","DDL"],
    ["2DDL",                   "https://2ddl.ms","DDL"],
    ["DDLValley",                   "https://www.ddlvalley.me","DDL"],
    ["Slider",                  "https://slider.kz","Music DL"],
    ["MP3Quack",                   "https://mp3quack.com","Music DL"],
    ["MP3Juices",                  "https://www.mp3juices.cc","Music DL"],
    ["FreeMP3",                   "https://free-mp3-download.net","Music DL"],
    ["MP3Guild",                   "http://mp3guild.com","Music DL"],
    ["Musgle",                   "http://musgle.com","Music DL"],
    ["iPlusFree",                   "http://iplusfree.org","Music DDL"],
    ["RnBXclusive",                   "https://rnbxclusive1.org","Music DDL"],
    ["LosslessMA",                   "https://losslessma.net","Music DDL"],
    ["AlbumRls",             		"http://newalbumreleases.net","Music DDL"],
    ["NoData",             		"https://nodata.tv/blog","Music DDL"],
    ["DJSam",                  		"https://djnotorioussam.com","Music DDL"],
    ["IntMusic",                  		"https://intmusic.net","Music DDL"],
    ["Premiere",                   "https://www.pluspremieres.nz","Music DDL"],
    ["FreshRemix",                   "http://freshremix.ru","Music DDL"],
    ["AK47Full",                   "https://ak47full.com","Music DDL"],
    ["GameMusic",                   "https://downloads.khinsider.com","Music DDL"],
    ["CirrusRetro",                   "https://cirrusretro.com","Music DDL"],
    ["AnimeMusic",                   "https://osanime.com","Music DDL"],
    ["Nintendo",                   "https://nintendosoundtrack.wixsite.com/nintendo-soundtrack","Music DDL"],
    ["MegaLinks",                   "https://megadb.tweakly.net/search","DDL Search"],
    ["MegaSearch",                   "http://megasearch.co","DDL Search"],
    ["MegaDDL",                   "https://megaddl.co","DDL Search"],
    ["CatFiles",             "https://www.catfiles.net","DDL Search"],
    ["DeDigger",             "https://www.dedigger.com","DDL Search"],
    ["FileSearch",             "https://www.filesearch.link","DDL Search"],
    ["ZippySearch",             "https://zippysharesearch.com","DDL Search"],
    ["Torrentable",             "https://w3abhishek.github.io/torrentables/","DDL Search"],
    ["NapalmFTP",                   "https://www.searchftps.net","FTP Search"],
    ["MamontFTP",                   "https://www.mmnt.ru/int/","FTP Search"],
    ["FilePursuit",                   "https://filepursuit.com","Dir Search"],
    ["FileChef",                   "https://www.filechef.com","Dir Search"],
    ["SearchIPFS",                   "https://ipfs-search.com","IPFS Search"],
    ["VidCast",         			"https://vidcast.dabble.me","Chromecast"],
    ["Lewla",         			"https://lew.la","Save Media"],
    ["Loader",             		"https://loader.to","Save Media"],
    ["9xBuddy",             		"https://9xbuddy.org","Save Media"],
    ["SASRip",             		"https://sasrip.cf","Save Media"],
    ["MP3Down",             		"https://mp3-youtube.download","Save Media"],
    ["MegaConvert",         			"https://megaconverter.net","Save Media"],
    ["VideoVor",         			"https://www.videovor.com","Save YouTube"],
    ["Y2Mate",         			"https://www.y2mate.com","Save YouTube"],
    ["KlickAud",         			"https://www.klickaud.co","Save SoundCloud"],
    ["MusicSchool",         			"https://downloadmusicschool.com/bandcamp/","Save Bandcamp"],
    ["RedditTube",         			"https://www.reddit.tube","Save Reddit"],
    ["RedditSave",         			"https://redditsave.com","Save Reddit"],
    ["FanArt",         			"https://fanart.tv","Media Artwork"],
    ["DocDown",         			"https://docdownloader.com","Save Docs"],
    ["TheTrove",         			"https://thetrove.is","RPG Archive"],
    ["TrackerList",                  "https://trackerslist.com","Torrent Tracker"],
    ["NewTrackon",                  "https://newtrackon.com/list","Torrent Tracker"],
    ["OffCloud",                  "https://offcloud.com","Torrent Cloud"],
    ["ZBigZ",                  "https://zbigz.com","Torrent Cloud"],
  ],
  "Stream": [
    [svgStream,                   "purple",                                        "-HEAD-"],
    ["AZM",                   "https://azm.to","Movie Stream"],
    ["OnlySeries",                "https://onlyseries.net/home","TV Stream"],
    ["Soap2Day",                  "https://soap2day.ac","Movie Stream"],
    ["NOXX",                	"https://noxx.is","TV Stream"],
    ["Netflix",                   "https://www.netflix.com","Media Stream"],
    ["YouTube",                  "https://www.youtube.com","Video Stream"],
    ["Piped",                  "https://piped.kavin.rocks","YouTube"],
    ["Invidious",                  "https://tube.incognet.io","YouTube"],
    ["CloudTube",                  "https://tube.cadence.moe","YouTube"],
    ["ChanCrawl",                  "https://www.channelcrawler.com","YouTube"],
    ["UnlistVids",                  "https://unlistedvideos.com","YouTube"],
    ["IHaveNoTV",                   "https://ihavenotv.com","Documentaries"],
    ["Twitch",                   "https://www.twitch.tv","Live Stream"],
    ["Strims",                  "https://strims.gg","Twitch"],
    ["Pogged",                   "https://pogged.tv","Twitch"],
    ["Theater",                  "https://twitchtheater.tv","Twitch"],
    ["Twitchls",                   "https://twitchls.com","Twitch"],
    ["StreamSnipe",                   "https://www.streamsniper.tv","Twitch YouTube"],
    ["BitChute",                   "https://www.bitchute.com","Video Stream"],
    ["Odysee",                   "https://odysee.com","Video Stream"],
    ["GabTV",                  "https://tv.gab.com","Video Stream"],
    ["Rumble",                   "https://rumble.com","Video Stream"],
    ["Utreon",                   "https://utreon.com","Video Stream"],
    ["DTube",                   "https://d.tube","Video Stream"],
    ["TILVids",                   "https://tilvids.com","Video Stream"],
    ["SpikeNation",                   "https://www.spikednation.com","Video Stream"],
    ["BitWave",                   "https://bitwave.tv","Live Stream"],
    ["Trovo",                   "https://trovo.live","Live Stream"],
    ["DLive",                   "https://dlive.tv","Live Stream"],
    ["Vetch",                   "https://vetch.tv","Live Stream"],
    ["ThetaTV",                   "https://www.theta.tv","Live Stream"],
    ["RobotStream",                   "https://robotstreamer.com","Live Stream"],
    ["NeverThink",                   "https://neverthink.tv","Random Videos"],
    ["Scrolller",                   "https://scrolller.com/?filter=videos","Random Videos"],
    ["ASMRTags",                   "https://asmrtags.com","ASMR Videos"],
    ["Stringers",                   "https://stringers.live","Driving Videos"],
    ["DriveListen",                   "https://driveandlisten.herokuapp.com","Driving Videos"],
    ["RiotArchive",                   "https://riotarchive.com","Riot Videos"],
    ["IP2Network",                   "https://ip2.network","Ice Poseidon"],
    ["BannedVid",                   "https://banned.video","Controversial"],
    ["CensoredTV",                   "https://censored.tv","Controversial"],
    ["PodBay",                   "https://podbay.fm","Podcast"],
    ["ListenBox",                   "https://listenbox.app","Podcast"],
    ["KeyGenMusic",                  "https://keygenmusic.tk","Music Stream"],
    ["SoundCloud",                  "https://soundcloud.com","Music Stream"],
    ["Spotify",                  "https://open.spotify.com","Music Stream"],
    ["Spotifeed",                  "https://spotifeed.timdorr.com","Spotify Podcasts"],
    ["ShoutCast",                   "https://directory.shoutcast.com","Radio"],
    ["JetSetRadio",                   "https://jetsetradiofuture.live","Radio"],
    ["PoolSide",                   "https://poolside.fm","Radio"],
    ["RetroWave",                   "https://retrowave.ru","Radio"],
    ["NightRide",                  "https://nightride.fm","Radio"],
    ["Radiooooo",                   "https://radiooooo.com","Radio"],
    ["PlazaOne",                   "https://plaza.one","Radio"],
    ["RainWave",                   "https://rainwave.cc/all/","Radio"],
    ["LofiCafe",                   "https://lofi.cafe","Radio"],
    ["UpBeat",                   "https://upbeatradio.net","Radio"],
    ["DI.FM",                  "https://www.di.fm","Radio"],
    ["CMDFM",                  "https://cmd.to/fm","Radio"],
    ["EveryNoise",                  "http://everynoise.com","Radio"],
    ["EpCalendar",                  "https://episodecalendar.com","TV Schedule"],
    ["CyTube",                   "https://cytu.be","TV Stream"],
    ["Toonami",                   "https://www.toonamiaftermath.com","TV Stream"],
    ["LMShows",                   "https://lmshows.se","TV Stream"],
    ["Stream4Free",                   "https://www.stream4free.live/tv-show-series","TV Stream"],
    ["VaughnLive",                   "https://vaughn.live/browse","TV Stream"],
    ["ScrubWatch",                   "https://arconaitv.xyz","TV Stream"],
    ["My90sTV",                   "https://www.my90stv.com","TV Stream"],
    ["PlutoTV",                   "https://pluto.tv/live-tv/lively-place","Live TV"],
    ["uStream",                   "https://ustream.to","Live TV"],
    ["USTVGo",                  "https://ustvgo.tv","Live TV"],
    ["USTV247",                  "https://ustv247.tv","Live TV"],
    ["123TV",                   "http://123tv.live/top-streams/","Live TV"],
    ["TVLinks",                   "https://reddit-livetv-link.blogspot.com","Live TV"],
    ["Cartoon",                  "https://www.thewatchcartoononline.tv","Cartoon Stream"],
    ["AnimePahe",                  "https://animepahe.com","Anime Stream"],
    ["GenoAnime",                  "https://genoanime.com","Anime Stream"],
    ["GoGoAnime",                  "https://gogoanime.cm","Anime Stream"],
    ["AnimeTwist",                  "https://twist.moe","Anime Stream"],
    ["AniMumu",                  "https://animumu.ga","Anime Stream"],
    ["9Anime",                  "https://9anime.to/home","Anime Stream"],
    ["Anime8",                   "https://anime8.ru","Anime Stream"],
    ["AniMix",                   "https://animixplay.to","Anime Stream"],
    ["AnimeFlix",                   "https://animeflix.city/home/","Anime Stream"],
    ["CrocoVid",                   "https://crocovid.com","Media Stream"],
    ["PeteyVid",                   "https://www.peteyvid.com","Media Stream"],
    ["TubiTV",                   "https://tubitv.com/home","Media Stream"],
    ["MyWatch",                 "https://mywatchseries.stream","TV Stream"],
    ["WatchSeries",                   "https://watchseri.net","TV Stream"],
    ["SuperNova",                   "https://supernova.to","TV Stream"],
    ["GDriveTV",                "https://databasegdriveplayer.co/series.php","TV Stream"],
    ["Magnetoo",                   "https://www.magnetoo.io","Torrent Stream"],
    ["GDriveMovie",                   "https://databasegdriveplayer.co/movie.php","Movie Stream"],
    ["LookMovie",                   "https://lookmovie.io","Movie Stream"],
    ["TinyZone",                   "https://tinyzonetv.to/home","Movie Stream"],
    ["BatFLIX",                   "https://batflix.org","Movie Stream"],
    ["FlixGo",                   "https://flixgo.me","Movie Stream"],
    ["TopNow",                   "https://topnow.se","Movie Stream"],
    ["BFlix",                   "https://bflix.to","Movie Stream"],
    ["EV01",                   "https://ev01.to/home","Movie Stream"],
    ["CMovies",                  "https://cmovies.ac","Movie Stream"],
    ["HiMovies",                   "https://himovies.to/home","Movie Stream"],
    ["Minion",                   "https://www.minionstream.com","Movie Stream"],
    ["UWatchFree",                   "https://www.uwatchfree.as","Movie Stream"],
    ["EffedUp",                   "https://www.effedupmovies.com","Movie Stream"],
    ["NFL5",                   "https://nfl5.ir","Sports Stream"],
    ["ICELZ",                   "https://icelz.newsrade.com","Sports Stream"],
    ["BilaSport",                   "http://bilasport.net","Sports Stream"],
    ["SportsHD",                   "http://www.worldcupfootball.me","Sports Stream"],
    ["720pStream",                   "http://720pstream.tv","Sports Stream"],
    ["SportOnline",                   "https://sportzonline.to/prog.txt","Sports Stream"],
    ["CrackStream",                "https://crackstreams.gg","Sports Stream"],
    ["SportsSurge",                   "https://sportsurge.net","Sports Stream"],
    ["SportHDLive",                   "https://sporthd.live","Sports Stream"],
    ["LiveOnScore",                   "http://liveonscore.tv","Sports Stream"],
    ["ChanStream",                   "https://channelstream.watch","Sports Stream"],
    ["DaddyLive",                   "https://daddylive.me","Sports Stream"],
    ["FootyBite",                   "https://footybite.cc","Sports Stream"],
    ["DubSports",                   "https://dubsports.to","Sports Stream"],
    ["6Stream",                   "http://6stream.xyz","Sports Stream"],
    ["OnHockey",                   "https://onhockey.tv","Hockey Stream"],
    ["Wrestling",                   "https://watchwrestling.la","Wrestling Stream"],
    ["OpenSub",                   "https://www.opensubtitles.org","Subtitle"],
    ["SubScene",                   "https://subscene.com","Subtitle"],
    ["Addic7ed",                   "http://www.addic7ed.com","Subtitle"],
    ["SubtitleHR",                   "https://www.subtitles.hr","Subtitle"],
    ["Podnapisi",                   "https://www.podnapisi.net","Subtitle"],
    ["Legendas",                   "http://legendas.tv","Subtitle"],
  ],
  "Social": [
    [svgSocial,                  "green",                                       "-HEAD-"],
    ["Twitter",                   "https://twitter.com/explore","Social Media"],
    ["Nitter",                   "https://twitit.gq","Twitter"],
    ["MegaBlock",                   "https://megablock.xyz","Nuke Tweets"],
    ["TrendsMap",               "https://www.trendsmap.com","Twitter"],
    ["SnapMaps",               "https://map.snapchat.com","SnapChat"],
    ["Dumpor",               	"https://dumpor.com","Instagram"],
    ["Bibliogram",               "https://bibliogram.art","Instagram"],
    ["UrleBird",               "https://urlebird.com","TikTok"],
    ["Cascadr",               "https://cascadr.co","Tumblr"],
    ["Quora",               "https://www.quora.com","Question Answer"],
    ["Linktree",                   "https://linktr.ee","Social Media"],
    ["SpaceHey",                   "https://spacehey.com","Social Media"],
    ["Poast",               "https://poa.st","Social Media"],
    ["Pleroma",               "https://the-federation.info/pleroma","Social Media"],
    ["Fediverse",               "https://fediverse.party","Social Media"],
    ["CounterSoc",                   "https://counter.social","Social Media"],
    ["Parler",               "https://parler.com","Social Media"],
    ["GETTR",               "https://gettr.com","Social Media"],
    ["CloutHub",               "https://app.clouthub.com","Social Media"],
    ["PocketNet",               "https://pocketnet.app","Social Media"],
    ["Discussion",               "https://discussions.app","Social Media"],
    ["Hubs",                   "https://hubs.mozilla.com","Social Media"],
    ["IMVU",                   "https://secure.imvu.com","Social Media"],
    ["iFunny",                  "https://ifunny.co","Memes"],
    ["Imgur",                  "https://imgur.com","Images"],
    ["9GAG",                   "https://9gag.com","Images"],
    ["ChatPic",                   "https://chatpic.org","Images"],
    ["FunnyJunk",                   "https://funnyjunk.com","Images"],
    ["Scrolller",                   "https://scrolller.com","Images"],
    ["MemeCenter",                   "https://www.memecenter.com","Images"],
    ["Archillect",                   "https://archillect.com/archive","Images"],
    ["AutoAdmit",                   "https://autoadmit.com","Text Board"],
    ["LainChan",                   "https://www.lainchan.org","Image Board"],
	["4Chan",                   "https://www.4chan.org","Image Board"],
    ["8Kun",                "https://8kun.top","Image Board"],
    ["Gab",                "https://gab.com","Free Speech"],
    ["KiwiFarms",                "https://kiwifarms.net","Free Speech"],
    ["Dramatica",                "https://encyclopediadramatica.online","Free Speech"],
    ["Sociopath",                "https://sociopathcommunity.com","Free Speech"],
    ["Disclose",                "https://www.disclose.tv","Politics"],
    ["Patriots",                "https://patriots.win","Politics"],
    ["Conspiracy",   			"https://conspiracies.win","Conspiracy"],
    ["VentScape",                "https://www.ventscape.life","Anonymous"],
    ["DeviantArt",               "https://www.deviantart.com","Digital Art"],
    ["Community",   			"https://communities.win","Reddit Clone"],
    ["Grepless",   			"https://grepless.com","Reddit Clone"],
    ["NotaBug",   			"https://notabug.io","Reddit Clone"],
    ["Ruqqus",   			"https://www.ruqqus.com","Reddit Clone"],
    ["SaidIt",   			"https://saidit.net","Reddit Clone"],
    ["Tildes",   			"https://tildes.net","Reddit Clone"],
    ["Gurlic",   			"https://gurlic.com","Reddit Clone"],
    ["Ramble",   			"https://ramble.pw","Reddit Clone"],
    ["Votal",   			"https://votal.net","Reddit Clone"],
    ["Poal",   			"https://poal.co","Reddit Clone"],
    ["Talk",   			"https://www.talk.lol","Reddit Clone"],
    ["Awful",                "https://forums.somethingawful.com","General Forum"],
    ["MPGH",               "https://www.mpgh.net/forum/","Game Hacks"],
    ["RomHack",               "https://www.romhacking.net","Game Hacks"],
    ["GuidedHack",               "https://guidedhacking.com","Game Hacks"],
    ["LeakForums",           "https://leakforums.co","Game Dev"],
    ["KnockOut",                "https://knockout.chat","Gaming Forum"],
    ["BTCTalk",               "https://bitcointalk.org","BTC Forum"],
    ["KeebTalk",                "https://www.keebtalk.com","Keyboards"],
    ["HardForum",                "https://hardforum.com","PC Parts"],
    ["LinusForum",                "https://linustechtips.com/main/","PC Parts"],
    ["SynoForum",               "https://www.synoforum.com","NAS Forum"],
    ["DSLReports",               "https://www.dslreports.com","ISP Forum"],
    ["XDADevs",               "https://forum.xda-developers.com/all","Android Dev"],
    ["StackEx",           "https://stackexchange.com/sites","Code Forum"],
    ["Overflow",           "https://stackoverflow.com/questions?tab=Votes","Code Forum"],
    ["HostTalk",           "https://www.webhostingtalk.com","Server Forum"],
    ["LowTalk",           "https://lowendtalk.com","Server Forum"],
    ["LowSpirit",                "https://talk.lowendspirit.com","Server Forum"],
    ["OffshoreTalk",                   "https://www.offshorecorptalk.com","Offshore Forum"],
    ["IndieHack",                   "https://www.indiehackers.com","Business Forum"],
    ["WJunction",           "http://www.wjunction.com","Web Master"],
    ["WebWide",           "https://webwide.io","Web Master"],
    ["NamePros",           "https://www.namepros.com","Domain Forum"],
    ["DNForum",           "https://www.dnforum.com","Domain Forum"],
    ["PlexGuide",                "https://plexguide.com/forums/","Plex Forum"],
    ["VCDLounge",                "https://vcdlounge.boards.net","Live TV Forum"],
    ["IPTV",                "https://iptv.community","IPTV Forum"],
    ["BHSEM",           "https://www.blackhatsem.com","SEO Forum"],
    ["BestBH",           "https://bestblackhatforum.com","SEO Forum"],
    ["BlackHat",           "https://www.blackhatworld.com","SEO Forum"],
    ["BHProTool",           "https://www.blackhatprotools.info","SEO Forum"],
    ["DigiLife",                "https://forums.mydigitallife.net","Win Forum"],
    ["FileShare",               "https://filesharingtalk.com/forum.php","P2P Forum"],
    ["TorInvite",              "https://torrentinvites.org","Invite Forum"],
    ["Innovation",              "https://www.sb-innovation.de","Tracker Forum"],
    ["0x00Sec",                "https://0x00sec.org","Security Forum"],
    ["Tuts4You",                "https://forum.tuts4you.com","Reverse Engineer"],
    ["TSRh",                "https://tsrh.ws","Reverse Engineer"],
    ["XSS",                "https://xss.is","Hacker Forum"],
    ["Void",                "https://void.to","Hacker Forum"],
    ["Cracked",                   "https://cracked.to","Hacker Forum"],
    ["ELeaks",           "https://eleaks.to","Hacker Forum"],
    ["RaidForum",                   "https://raidforums.com","Hacker Forum"],
    ["DemonForum",                   "https://demonforums.net","Hacker Forum"],
    ["HackForum",               "https://hackforums.net","Hacker Forum"],
    ["Sinisterly",               "https://sinister.ly","Hacker Forum"],
    ["Nulled",           "https://www.nulled.to","Hacker Forum"],
    ["NulledBB",           "https://nulledbb.com","Hacker Forum"],
    ["LeakedBB",           "https://leakedbb.com","Hacker Forum"],
    ["OGUsers",               "https://ogusers.com","Hacker Forum"],
    ["CrackKing",               "https://crackingking.com","Hacker Forum"],
    ["CrackingPro",               "https://www.crackingpro.com","Hacker Forum"],
    ["CrackerTeam",               "https://www.crackerteam.com/?langid=25","Hacker Forum"],
    ["NeThinGoez",               "https://nethingoez.com","Hacker Forum"],
    ["FSSquad",               "https://fssquad.com","Hacker Forum"],
    ["Dread",               "http://dreadytofatroptsdj6io7l3xptbet6onoyno2yv7jicoxknyazubrad.onion.ly","Hacker Forum"],
    ["Pirates",               "https://pirates-forum.org","Piracy Forum"],
    ["LostMedia",               "https://forums.lostmediawiki.com","Rare Forum"],
    ["APEX",                "https://teamapex.site","Game Warez"],
    ["DarcK",                "https://darckrepacks.com","Game Warez"],
    ["GBATemp",                "https://gbatemp.net/forums/","Game Warez"],
    ["KaOsKrew",                   "https://www.kaoskrew.org","Game Warez"],
    ["CS.RIN.RU",                "https://cs.rin.ru/forum/","Game Warez"],
    ["BlackMod",                   "https://blackmod.net","Game Warez"],
    ["Torrminator",                   "https://forum.torrminatorr.com","Game Warez"],
    ["FileForums",                   "https://fileforums.com","Game Warez"],
    ["DroidZone",                   "https://android-zone.ws","Android Warez"],
    ["Mobilism",                   "https://forum.mobilism.org","Mobile Warez"],
    ["iOSGods",                   "https://iosgods.com","Mobile Warez"],
    ["RU-Board",                   "https://forum.ru-board.com","Warez"],
    ["WarezForum",                   "https://warezforums.com","Warez"],
    ["WarezHeaven",                   "https://www.warezheaven.com","Warez"],
    ["NSaneForum",                "https://www.nsaneforums.com","Warez"],
    ["DirtyWarez",                "https://forum.dirtywarez.com","Warez"],
    ["NeoVistas",                "https://neovistas.net","Warez"],
    ["Novanon",                "https://novanon.net","Warez"],
    ["AIOWares",               "https://www.aiowares.com","Win Warez"],
    ["TeamOS",               "https://teamos-hkrg.com","Win Warez"],
    ["MacBB",           		"https://macbb.org","Mac Warez"],
    ["Leaked",                "https://leaked.is","Music Warez"],
    ["FunkySouls",                "https://forum.funkysouls.org/lang/english","Music Warez"],
    ["MVGroup",                "https://forums.mvgroup.org","Movie Warez"],
    ["AdiT-HD",                   "https://adit-hd.com","Movie Warez"],
    ["DDLBase",                   "https://ddlbase.net","Movie Warez"],
    ["SatSupreme",                   "https://www.satsupreme.com","Satellites"],
  ],
  "Reddit": [
    [svgReddit,                  "cyan",                                        "-HEAD-"],
    ["Reddit",        "https://www.reddit.com","Reddit Home"],
    ["Lurrker",        "https://lurrker.com","Reddit Viewer"],
    ["Teddit",        "https://teddit.net","Reddit Viewer"],
    ["Kddit",        "https://kddit.kalli.st","Reddit Viewer"],
    ["Libreddit",        "https://libredd.it","Reddit Viewer"],
    ["Outlookit",        "https://pcottle.github.io/MSOutlookit/","Reddit Viewer"],
    ["Reddup",        "https://reddup.co","Reddit Viewer"],
    ["RedditDeck",        "https://rdddeck.com","Reddit Viewer"],
    ["Revddit",   "https://reveddit.com","Removed Content"],
    ["Removeddit",   "https://removeddit.com","Removed Content"],
    ["Analyser",   "https://reddit-user-analyser.netlify.app","Search User"],
    ["Metris",   "https://redditmetis.com","Search User"],
    ["Reposts",   "https://repostsleuth.com","Search Reposts"],
    ["Redective",   "https://redective.com","Search User"],
    ["Comments",   "https://redditcommentsearch.com","Search Comment"],
    ["ScammerList",   "https://universalscammerlist.com","Bad Users"],
    ["FreeMedia",   "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/index","Media Guides"],
    ["Technology",   "https://www.reddit.com/user/goretsky/m/win_itpro/","All Tech"],
    ["Streaming",        "https://www.reddit.com/user/nbatman/m/streaming/","All Streaming"],
    ["Security",        "https://www.reddit.com/user/goretsky/m/security/","All Security"],
    ["Crypto",        "https://www.reddit.com/user/und3rw4t3rp00ps/m/crypt/","All Crypto"],
    ["Linux",        "https://www.reddit.com/r/linux/","Linux"],
    ["WebDev",   "https://www.reddit.com/r/webdev/","WebDev"],
    ["WebDevTut",        "https://www.reddit.com/r/webdevtutorials","Dev Tutorials"],
    ["Graphics",   "https://www.reddit.com/r/graphic_design/","Graphic Design"],
    ["WebDesign",   "https://www.reddit.com/r/web_design/","Web Design"],
    ["JavaScript",   "https://www.reddit.com/r/javascript/","JavaScript"],
    ["Programming",   "https://www.reddit.com/r/programming/","Coding"],
    ["StartPages",   "https://www.reddit.com/r/startpages/","Start Pages"],
    ["TechSupport",   "https://www.reddit.com/r/techsupport/","Tech Support"],
    ["WebHosting",   "https://www.reddit.com/r/webhosting/","Host Website"],
    ["Piracy",   "https://www.reddit.com/r/Piracy/","Piracy"],
    ["PirateSubs",   "https://www.reddit.com/r/Piracy/wiki/megathread/related_subreddits","Pirate Subs"],
    ["AnimePiracy",   "https://www.reddit.com/r/animepiracy/","Pirate Anime"],
    ["CrackWatch",   "https://www.reddit.com/r/CrackWatch/","Game Cracks"],
    ["CrackSupport",   "https://www.reddit.com/r/CrackSupport/","Crack Help"],
    ["PirateGame",   "https://www.reddit.com/r/PiratedGames/","Pirated Games"],
    ["DailyRls",   "https://www.reddit.com/r/dailyreleases/","Scene"],
    ["EBooks",   "https://www.reddit.com/r/EBook_Resources/","EBook Resource"],
    ["LiveTv",   "https://www.reddit.com/r/LiveTvLinks/","Live TV"],
    ["SeedBox",   "https://www.reddit.com/r/seedboxes/","Torrent Servers"],
    ["Torrent",        "https://www.reddit.com/r/torrents/","Torrent"],
    ["Tracker",   "https://www.reddit.com/r/trackers/","Torrent Tracker"],
    ["OpenSignup",   "https://www.reddit.com/r/OpenSignups/","Register Free"],
    ["Privacy",   "https://www.reddit.com/r/privacy/","Privacy"],
    ["Malware",   "https://www.reddit.com/r/Malware/","Malware"],
    ["Onions",   "https://www.reddit.com/r/onions/","TOR/Onion"],
    ["TOR",   "https://old.reddit.com/r/TOR/","TOR/Onion"],
    ["Bitcoin",   "https://www.reddit.com/r/Bitcoin/","Bitcoin (BTC)"],
    ["Monero",   "https://www.reddit.com/r/Monero/","Monero (XMR)"],
    ["Crypto",   "https://www.reddit.com/r/CryptoCurrency/","CryptoCurrency"],
    ["Cash4Cash",   "https://www.reddit.com/r/Cash4Cash/","CryptoCurrency"],
    ["WallStreet",        "https://www.reddit.com/r/wallstreetbets/","Stock Market"],
    ["SlaveLabor",        "https://www.reddit.com/r/slavelabour/","Cheap Work"],
    ["DataCurator",   "https://www.reddit.com/r/datacurator/","Store Data"],
    ["DataHoard",        "https://www.reddit.com/r/DataHoarder/","Store Data"],
    ["MusicHoard",        "https://www.reddit.com/r/musichoarder/","Store Music"],
    ["Overclock",        "https://www.reddit.com/r/overclocking","Faster PC"],
    ["Network",   "https://www.reddit.com/r/HomeNetworking/","Home Network"],
    ["Starlink",   "https://www.reddit.com/r/Starlink/","Internet"],
    ["PCGaming",   "https://www.reddit.com/r/pcgaming/","PC Games"],
    ["LinuxGaming",        "https://www.reddit.com/r/linux_gaming/","Linux Games"],
    ["NetSec",     "https://www.reddit.com/r/netsec/","Net Security"],
    ["BlackHat",   "https://www.reddit.com/r/blackhat/","Exploits"],
    ["Jailbreak",   "https://www.reddit.com/r/jailbreak/","Jail Break"],
    ["DroidApps",   "https://www.reddit.com/r/moddedandroidapps/","Android"],
    ["APKsApps",   "https://www.reddit.com/r/ApksApps/","Android"],
    ["SysAdmin",   "https://www.reddit.com/r/sysadmin/","System Admin"],
    ["HomeLab",   "https://www.reddit.com/r/homelab/","Home Server"],
    ["HomeServer",   "https://www.reddit.com/r/HomeServer/","Home Server"],
    ["SelfHosted",   "https://www.reddit.com/r/selfhosted/","Host Yourself"],
    ["AdobeZii",   "https://www.reddit.com/r/AdobeZii/","Adobe Mac"],
    ["GunnitRust",   "https://www.reddit.com/r/GunnitRust/","3D Print Guns"],
    ["Alternative",   "https://www.reddit.com/r/RedditAlternatives/","Reddit Clones"],
    ["WatchDie",   "https://www.reddit.com/r/WatchRedditDie/","Censorship"],
    ["Directory",   "https://www.reddit.com/r/opendirectories/","Public Folders"],
    ["KodiAddons",           "https://www.reddit.com/r/Addons4Kodi/","Kodi Addons"],
  ],
  "Code": [
    [svgCode,                    "red",                                         "-HEAD-"],
    ["Cloudflare",                   "https://www.cloudflare.com","DNS CDN DDOS"],
    ["WebDev",                   "https://webdevhome.github.io","Dev Homepage"],
    ["Dev.to",                   "https://dev.to","Dev Social"],
    ["DevURLs",                 "https://devurls.com","Dev News"],
    ["OpenSource",                     "https://awesomeopensource.com","FOSS Dev"],
    ["FreeDev",                     "https://free-for.dev","Free Dev"],
    ["SEOLinks",                     "http://www.searchengineforums.com","Search Optimize"],
    ["Statically",                     "https://statically.io","Free CDN"],
    ["NGINXConf",                   "https://www.digitalocean.com/community/tools/nginx","Web Server"],
    ["NGINXDocker",                   "https://nginxproxymanager.com","Web Server"],
    ["NGINXGuide",                     "https://github.com/trimstray/nginx-admins-handbook","Web Server"],
    ["Cheat.sh",                   "https://cheat.sh","Cheat Sheet"],
    ["CheatSheet",                   "https://lecoupa.github.io/awesome-cheatsheets/","Cheat Sheet"],
    ["Cheat-Sheet",                   "https://lzone.de/cheat-sheet.html","Cheat Sheet"],
    ["PublicAPI",                     "https://public-apis.io","API Info"],
    ["PublicAPI2",                     "https://github.com/public-apis/public-apis","API Info"],
    ["DevRoadmap",                     "https://roadmap.sh","Learning Guides"],
    ["FastDesign",                     "https://www.fast.design","Code Packages"],
    ["Libraries",                     "https://libraries.io","Code Packages"],
    ["Word2HTML",                     "https://word2cleanhtml.com","HTML Convert"],
    ["RequestBin",                     "https://requestbin.com","Dev Tools"],
    ["GeekTool",                     "https://gf.dev/toolbox","Dev Tools"],
    ["GitHub",                   "https://github.com/trending?since=monthly","Code Colab"],
    ["GitLab",                   "https://gitlab.com","Code Colab"],
    ["Repl.it",                   "https://repl.it","Code Colab"],
    ["SharePad",                   "https://www.sharepad.io","Code Colab"],
    ["3V4L",                 "https://3v4l.org","Test Code"],
    ["CodePen",                 "https://codepen.io","Explore Code"],
    ["CodeSandbox",                 "https://codesandbox.io/search","Explore Code"],
    ["DevDocs",                     "https://devdocs.io","WebDev Docs"],
    ["Humans",                     "https://humans.fyi","Website Gallery"],
    ["RegEx101",                     "https://regex101.com","RegEx"],
    ["FavMatic",                     "http://www.favicomatic.com","Favicon"],
    ["NerdFonts",                 "https://nerdfonts.com","Fonts"],
    ["GoogleFont",                 "https://google-webfonts-helper.herokuapp.com","Fonts"],
    ["iFonts",                     "https://ifonts.xyz","Fonts"],
    ["DFonts",                     "https://www.dfonts.org","Fonts"],
    ["DaFont",                     "https://www.dafont.com","Fonts"],
    ["GetFont",                     "https://getfont.herokuapp.com","Fonts"],
    ["FontGet",                     "https://www.fontget.com","Fonts"],
    ["DevFonts",                     "https://devfonts.gafi.dev","Fonts"],
    ["Squirrel",                     "https://www.fontsquirrel.com","Fonts"],
    ["FontSpace",                     "https://www.fontspace.com","Fonts"],
    ["DaFontFree",                     "https://www.dafontfree.io","Fonts"],
    ["ColorBreak",                     "https://notwoods.github.io/color-breakdown/","Color Scheme"],
    ["Paletton",                     "http://www.paletton.com","Color Scheme"],
    ["Coolors",                     "https://coolors.co","Color Scheme"],
    ["Gradients",                     "https://webgradients.com","Site Backgrounds"],
    ["FlatIcon",                     "https://www.flaticon.com","Icons"],
    ["NounProject",                     "https://thenounproject.com","Icons"],
    ["SVGRepo",                     "https://www.svgrepo.com","SVG Icons"],
    ["SysUIcons",                     "https://systemuicons.com","SVG Icons"],
    ["SVGViewer",                     "https://www.svgviewer.dev","SVG Tools"],
    ["SVGOMG",                 			"https://jakearchibald.github.io/svgomg/","SVG Editor"],
    ["SVGBob",                 			"https://ivanceras.github.io/svgbob-editor/","SVG Editor"],
    ["JSONFormat",                     "https://www.jsonformatting.com","Formatting"],
    ["JSObfuscate",                     "https://obfuscator.io","Obfuscator"],
    ["Beautifier",                     "https://beautifier.io","Beautify Code"],
    ["HTMLMin",                     "https://kangax.github.io/html-minifier/","Compress HTML"],
    ["JSCompress",                     "https://jscompress.com","Compress JS"],
    ["CSSOpti",                     "https://css.github.io/csso/csso.html","Compress CSS"],
    ["CSSGrid",                     "https://cssgrid-generator.netlify.com","Grid Generator"],
    ["TimeGraphics",                     "https://time.graphics/editor","Timelines"],
    ["DiffChecker",                     "https://www.diffchecker.com","Find Differences"],
    ["Bunny",                 "https://bunny.lucy.sh","Test Website"],
    ["Browserling",                 "https://www.browserling.com","Test Website"],
    ["Сomparium",                 "https://comparium.app","Test Website"],
    ["OnWorks",                 "https://www.onworks.net","Test Website"],
    ["SiteShot",                 "https://www.site-shot.com","Test Website"],
    ["Responsive",                 "https://responsively.app","Test Website"],
    ["Screenshot",                 "https://screenshot.rocks","Mockups"],
    ["Thumbnail",                 "https://thumbnail.ws","Thumbnails"],
    ["EveryPixel",                  "https://www.everypixel.com","Stock Photos"],
    ["Downloader",                  "https://downloader.la","Stock Photos"],
    ["Tomato",                  "https://tomato.to","Stock Photos"],
    ["NoHat",           			"https://nohat.cc","Stock Photos"],
    ["AllFree",                     "https://all-free-download.com","Graphics"],
    ["GFXList",                     "https://docs.google.com/document/d/179VI9QjVICyS3KVQ4i5fdEQmE1U45Xhq64TNb9QUmRk","Graphics"],
    ["GFXMount",                   "http://gfxmountain.com","Graphics"],
    ["GFXDomain",           "https://gfxdomain.co","Graphics"],
    ["GraphicEX",           "https://graphicex.com","Graphics"],
    ["GFXTRA",           "https://www.gfxtra.com","Graphics"],
    ["PSDKeys",           "http://psdkeys.com","Graphics"],
    ["AVAXGFX",           "https://www.avaxgfx.com","Graphics"],
    ["DesignRocks",           "https://www.design.rocks","Graphics"],
    ["Nulled.si",                     "https://nulled.si","WebDev Forum"],
    ["XenForo",                     "https://www.xenforo.rocks","Scripts"],
    ["CodeList",                     "http://www.codelist.cc","Scripts"],
    ["NulledTeam",                     "https://www.nulledteam.com","Scripts"],
    ["ScriptNull",           "https://scriptznull.nl","Scripts"],
    ["CrackNull",                   "https://www.cracknull24h.com","Scripts"],
    ["NullJungle",                   "https://nulljungle.com","Scripts"],
    ["SiteDev",           "https://sitedev.club/forum/","Themes"],
    ["Babiato",           "https://babiato.co","Themes"],
    ["ThemeLock",           "http://www.themelock.com","Themes"],
    ["ThemeWagon",           "https://themewagon.com/theme_tag/free/","Themes"],
    ["WPLocker",           "http://www.wplocker.com","Themes"],
    ["ThemeDe",                     "https://www.themede.com","Themes"],
    ["GPLDL",           "https://gpldl.com","Themes"],
    ["CGPersia",           "http://cgpersia.com","3D Models"],
    ["DownPirate",           "https://www.downloadpirate.com","VideoFX"],
    ["VFXDown",                 "https://vfxdownload.com","VideoFX"],
    ["GFXDown",                 "http://gfxdownload.com","VideoFX"],
    ["AEDownPro",                 "http://aedownloadpro.com","VideoFX"],
    ["ShareAE",                 "https://www.shareae.com","VideoFX"],
    ["AEDown",                 "https://aedownload.com","VideoFX"],
    ["AudioZ",           "https://audioz.download","SoundFX"],
    ["SoundSnap",           "https://www.soundsnap.com","SoundFX"],
    ["FindSounds",           "https://www.findsounds.com","SoundFX"],
    ["BBCSoundFX",           "https://sound-effects.bbcrewind.co.uk","SoundFX"],
    ["FreeSound",           "https://freesound.org/browse/","SoundFX"],
    ["SoundCrate",           "https://soundscrate.com","SoundFX"],
    ["FOSSBuild",           "https://opensource.builders","Open Source"],
    ["Vertex42",           "https://www.vertex42.com","Office Templates"],
    ["ExtLibre",           "https://extensions.libreoffice.org","Office Templates"],
    ["Selfhosted",           "https://github.com/awesome-selfhosted/awesome-selfhosted","Host Yourself"],
    ["Decompiler",           "http://www.decompiler.com","Online Decompiler"],
    ["WebAssembly",           "https://webassembly.studio","WebAssembly"],
    ["DisASM",               "https://disasm.pro","Assembly"],
  ],
  "News": [
    [svgNews,                 "orange",                                     "-HEAD-"],
    ["APNews",                    "https://apnews.com/hub/ap-top-news","News Wire"],
    ["Reuters",                    "https://www.reuters.com","News Wire"],
    ["TheHill",                    "https://thehill.com","News"],
    ["WallStreet",                    "https://www.wsj.com/print-edition/today","News"],
    ["Bloomberg",                    "https://www.bloomberg.com","News"],
    ["ZeroHedge",                    "https://www.zerohedge.com","News"],
    ["Reason",                    "https://reason.com","News"],
    ["Heavy",                    "https://heavy.com/news/","News"],
    ["JustNews",                    "https://justthenews.com","News"],
    ["Drudge",                    "https://drudgereport.com","News Portal"],
    ["RealClear",                    "https://www.realclearpolitics.com","News Portal"],
    ["GroundNews",                    "https://ground.news","News Portal"],
    ["AllSides",                    "https://www.allsides.com","News Portal"],
    ["Unfeeder",                    "https://unfeeder.com","News Portal"],
    ["SPIDR",                    "https://spidr.today","News Portal"],
    ["Barstool",                    "https://www.barstoolsports.com","Sports"],
    ["Covers",                    "https://www.covers.com/sports/matchups","Sports"],
    ["HackNews",                "https://hackne.ws","Tech News"],
    ["HackerNews",                "https://news.ycombinator.com","Tech News"],
    ["Lobsters",                "https://lobste.rs","Tech News"],
    ["Slashdot",                "https://slashdot.org","Tech News"],
    ["DiggTech",                "https://www.digg.com/technology","Tech News"],
    ["ArsTechnica",                  "https://arstechnica.com","Tech News"],
    ["ReclaimNet",                "https://reclaimthenet.org","Tech News"],
    ["TechNadu",                "https://www.technadu.com","Tech News"],
    ["GeekWire",                "https://www.geekwire.com","Tech News"],
    ["Protocol",                "https://www.protocol.com","Tech News"],
    ["DailyDot",                "https://www.dailydot.com","Tech News"],
    ["TheNextWeb",                "https://thenextweb.com","Tech News"],
    ["Techmeme",                "https://techmeme.com","Tech News"],
    ["Techworm",                "https://www.techworm.net","Tech News"],
    ["TechRadar",                "https://www.techradar.com","Tech News"],
    ["TechHive",                "https://www.techhive.com/news/","Tech News"],
    ["AfterDawn",                "https://www.afterdawn.com","Tech News"],
    ["TheRegister",                "https://www.theregister.com","Tech News"],
    ["GHacks",                "https://www.ghacks.net","Tech News"],
    ["ZDNet",                "https://www.zdnet.com","Tech News"],
    ["Neowin",                "https://www.neowin.net","Tech News"],
    ["TheVerge",                "https://www.theverge.com","Tech News"],
    ["TheRecord",                  "https://therecord.media","Tech News"],
    ["MITReview",                  "https://www.technologyreview.com","Tech News"],
    ["VentureBeat",                  "https://venturebeat.com","Tech News"],
    ["FastCompany",                  "https://www.fastcompany.com/technology","Tech News"],
    ["TechGuy",                  "https://techguylabs.com","Tech News"],
    ["WccfTech",                "https://wccftech.com","Tech Reviews"],
    ["Guru3D",                "https://www.guru3d.com","Tech Reviews"],
    ["AnandTech",                "https://www.anandtech.com","Tech Reviews"],
    ["TomHardware",                "https://www.tomshardware.com","Tech Reviews"],
    ["TweakTown",                "https://www.tweaktown.com","Tech Reviews"],
    ["VideoCardz",                "https://videocardz.com","Tech Reviews"],
    ["DarkNetLive",                "https://darknetlive.com","CyberCrime News"],
    ["ShadowBanker",                "https://www.shadowbanker.io","CyberCrime News"],
    ["NetWorld",                "https://www.networkworld.com","Network News"],
    ["LinuxJournal",                "https://www.linuxjournal.com","Linux News"],
    ["9to5Linux",                "https://9to5linux.com","Linux News"],
    ["Phoronix",                "https://phoronix.com","Linux News"],
    ["LXer",                "http://lxer.com","Linux News"],
    ["KrebsOnSec",                "https://krebsonsecurity.com","Security News"],
    ["CyberScoop",                "https://www.cyberscoop.com","Security News"],
    ["Darknet",                    "https://www.darknet.org.uk","Security News"],
    ["GainSec",                    "https://gainsec.com","Security News"],
    ["InfoSec",                "https://infosecwriteups.com","Security News"],
    ["NullByte",                    "https://null-byte.wonderhowto.com","Security News"],
    ["HackRead",                "https://www.hackread.com","Security News"],
    ["KitPloit",                "https://www.kitploit.com","Security News"],
    ["GBHackers",                "https://gbhackers.com","Security News"],
    ["DarkReading",                "https://www.darkreading.com","Security News"],
    ["PacketStorm",                "https://packetstormsecurity.com","Security News"],
    ["SecAffairs",                "https://securityaffairs.co/wordpress/","Security News"],
    ["ThreatPost",                "https://threatpost.com","Security News"],
    ["Securelist",                "https://securelist.com","Security News"],
    ["WeLiveSec",                "https://www.welivesecurity.com","Security News"],
    ["AhnLab",                "https://asec.ahnlab.com/en/","Security News"],
    ["BellingCat",                "https://www.bellingcat.com","Security News"],
    ["SecretClub",                "https://secret.club","Security News"],
    ["TechGenix",                "http://techgenix.com","Security News"],
    ["HitBSec",                "https://news.hitb.org","Security News"],
    ["SecWeek",                "https://www.securityweek.com","Security News"],
    ["Gemini",                "https://geminiadvisory.io/blog/","Security News"],
    ["HackingNews",                "https://latesthackingnews.com","Security News"],
    ["CyberPost",                "https://thecyberpost.com/category/news/","Security News"],
    ["MemeInsider",                "https://memeinsider.com/releases/","Meme News"],
    ["TopPub",                "https://toppub.xyz/publications","Medium Blogs"],
    ["TWiT",                  "https://twit.tv/episodes","Tech Podcast"],
    ["SelfHosted",                  "https://selfhosted.show","Tech Podcast"],
    ["Exponent",                  "https://exponent.fm","Tech Podcast"],
    ["Jupiter",                  "https://www.jupiterbroadcasting.com","Tech Podcast"],
    ["AxisOfEasy",                  "https://axisofeasy.com/series/aoe-weekly-digest/","Tech Podcast"],
    ["DarkDiary",                   "https://darknetdiaries.com","Security Podcast"],
    ["RiskyBiz",                   "https://risky.biz","Security Podcast"],
    ["SmashSec",                "https://www.smashingsecurity.com","Security Podcast"],
    ["CYBER",                "https://play.acast.com/s/cyber","Security Podcast"],
    ["Hackable",                "https://hackablepodcast.com/episodes","Security Podcast"],
    ["DailyStorm",                "https://isc.sans.edu/podcast.html","Security Podcast"],
    ["MalwareTech",                "https://malwaretech-podcast.simplecast.com","Security Podcast"],
    ["HackerRadio",                "https://hackerpublicradio.org","Security Podcast"],
    ["Kaspersky",                "https://usa.kaspersky.com/blog/tag/podcast/","Security Podcast"],
    ["Malicious",                "https://malicious.life","Security Podcast"],
    ["Firewalls",                "https://ping.firewalls.com","Security Podcast"],
    ["HackerMind",                "https://thehackermind.com","Security Podcast"],
    ["ExitScam",                "https://www.exitscam.show","Security Podcast"],
    ["OSINTShow",                "https://soundcloud.com/user-98066669","Security Podcast"],
    ["ChangeLog",                "https://changelog.com","Dev Podcast"],
    ["SearchTalk",                "https://www.spreaker.com/show/search-talk-live","SEO Podcast"],
    ["SEO101",                "https://wmr.fm/category/podcast/seo-101/","SEO Podcast"],
    ["TimCast",                  "https://timcast.com","News Podcast"],
    ["SchiffRadio",                  "https://schiffradio.com","Finance Podcast"],
    ["Swindled",                  "https://swindledpodcast.com","Crime Podcast"],
    ["ListenLater",                  "https://www.listenlater.fm","Custom Podcast"],
    ["TorFreak",                "https://torrentfreak.com","P2P News"],
    ["KodiShack",                "http://www.wirelesshack.org","Kodi News"],
    ["TroyPoint",                "https://troypoint.com","Kodi News"],
    ["CryptoPanic",                "https://cryptopanic.com","Crypto News"],
    ["CoinNews",                "https://cointelegraph.com","Crypto News"],
    ["CoinDesk",                "https://www.coindesk.com","Crypto News"],
    ["CryptoNews",                "https://cryptonews.com","Crypto News"],
    ["Decrypt",                "https://decrypt.co","Crypto News"],
    ["CoinBureau",                "https://www.coinbureau.com","Crypto News"],
    ["DailyHodl",                "https://dailyhodl.com","Crypto News"],
    ["Bitcoinist",                "https://bitcoinist.com","Crypto News"],
    ["Newsletters",                "https://github.com/zudochkin/awesome-newsletters","Tech Newsletters"],
    ["AudioBooks",                   "https://audiobookbay.unblockit.ws","Audio Books"],
    ["XAudioBooks",                   "https://xaudiobooks.com","Audio Books"],
    ["GoldenAudio",                    "https://goldenaudiobooks.com","Audio Books"],
    ["ABReviews",                    "https://www.audiobookreviews.com","Audio Books"],
    ["TokyBook",                    "https://tokybook.com","Audio Books"],
    ["AudioBB",                    "https://audiobb.com","Audio Books"],
    ["SciResearch",                   "https://www.scienceresearch.com/scienceresearch/desktop/en/search.html","Research Papers"],
    ["KausalFlow",               "https://tools.kausalflow.com/tools/","Research Tools"],
    ["SciHub",                   "https://sci-hub.se","Research Papers"],
    ["Scholar",                   "https://scholar.archive.org","Research Papers"],
    ["SciArticle",                   "https://booksc.org","Research Papers"],
    ["OpenStax",                   "https://openstax.org","E-Books"],
    ["GutenSearch",                   "https://gutensearch.com","E-Books"],
    ["Gutenberg",                   "https://www.gutenberg.org","E-Books"],
    ["LibGen.is",                   "https://libgen.is","E-Books"],
    ["LibGen.fun",                   "https://libgen.fun","E-Books"],
    ["Z-Library",            		 "https://1lib.us","E-Books"],
    ["Bibliotik",                   "https://the-eye.eu/public/Books/Bibliotik/","E-Books"],
    ["OceanofPDF",                   "https://oceanofpdf.com","E-Books"],
    ["MojoBB",                   "https://mojobb.com","E-Books"],
    ["Wish4Book",                "https://wish4book.net","E-Books"],
    ["eBookBB",                "https://ebookbb.com","E-Books"],
    ["iBookPile",            "https://ibookpile.net","E-Books"],
    ["PDFDrive",                "https://www.pdfdrive.com","E-Books"],
    ["PDFRead",                "https://www.pdfread.net","E-Books"],
    ["BookSpot",                   "http://www.freebookspot.es","E-Books"],
    ["EBook3000",                   "http://www.ebook3000.com","E-Books"],
    ["CoderProg",                "https://coderprog.com","E-Books"],
    ["ReadAnyBook",            "https://readanybook.com","E-Books"],
    ["ForCoder",            "https://forcoder.su","E-Books"],
    ["SurviveLib",            "http://www.survivorlibrary.com/library-download","E-Books"],
    ["GoalKicker",            "https://books.goalkicker.com","E-Books"],
    ["FreeMags",                   "https://freemagazines.top","Magazine"],
    ["MagLib",                   "https://magazinelib.com","Magazine"],
    ["WorldMags",                "https://www.worldmags.net","Magazine"],
    ["DownMagaz",                   "https://downmagaz.com","Magazine"],
    ["AllFreeDumps",                   "https://www.allfreedumps.com","Exam Prep"],
    ["FreeCourses",            "https://github.com/MasterBrian99/Free-Courses-For-Everyone","Tutorial"],
    ["OneHack",            "https://onehack.us","Tutorial"],
    ["FreesOff",            "https://freesoff.com","Tutorial"],
    ["Hackgence",            "https://hackgence.com","Tutorial"],
    ["NulledPrem",                    "https://nulledpremium.com","Tutorial"],
    ["FreeCourse",            "https://www.freecoursesonline.me","Tutorial"],
    ["FreeTutsEU",                    "https://www.freetutorialseu.com","Tutorial"],
    ["FreeTutsUS",                "https://www.freetutorialsus.com","Tutorial"],
    ["CourseClub",                    "https://courseclub.me","Tutorial"],
    ["CourseSite",                     "http://freecoursesite.com","Tutorial"],
    ["DesireCourse",                     "https://desirecourse.net","Tutorial"],
    ["GigaCourse",                     "https://gigacourse.com","Tutorial"],
    ["CryptoTips",                     "https://www.cryptotips.us","Tutorial"],
    ["TutsNode",                     "https://tutsnode.net","Tutorial"],
    ["Tut4DL",                     "https://tut4dl.com","Tutorial"],
    ["Hackr",                     "https://hackr.io","Tutorial"],
    ["HowToGeek",                    "https://www.howtogeek.com","Tutorial"],
    ["HowToForge",                    "https://www.howtoforge.com","Tutorial"],
    ["OpGuides",            "https://opguides.info","Learning"],
    ["CompSci",            "https://functionalcs.github.io/curriculum/","Learning"],
    ["Cybrary",            		"https://www.cybrary.it","Learning"],
    ["CodeCamp",            "https://www.freecodecamp.org","Learning"],
    ["CodeLearn",            "https://www.codecademy.com","Learning"],
    ["KhanLearn",            "https://www.khanacademy.org","Learning"],
    ["Coursera",            	"https://www.coursera.org","Learning"],
    ["edX",            "https://www.edx.org","Learning"],
  ],
  "Cloud": [
    [svgCloud,                    "yellow",                                      "-HEAD-"],
    ["OasisUpload",                  "https://weboas.is/upload/","Upload Files"],
    ["OasisImage",                  "https://weboas.is/ipfs/","Upload Images"],
    ["OasisEditor",                  "https://weboas.is/editors/","Image Editors"],
    ["Melobytes",                  "https://melobytes.com","Media AI"],
    ["GifRun",                  "https://gifrun.com","Video Gifs"],
    ["EZGif",                  "https://ezgif.com","Video Gifs"],
    ["GifCap",                  "https://gifcap.dev","Video Gifs"],
    ["GIFinder",                  "https://marcosmarp.github.io/GIFinder/","Find Gifs"],
    ["Picc",                  "https://picc.io","Upload IMG"],
    ["IMGE",                  "https://im.ge","Upload IMG"],
    ["Clouds",                  "https://clouds.tf","Upload IMG"],
    ["Imgbox",                  "https://imgbox.com","Upload IMG"],
    ["IMGPile",                  "https://imgpile.com","Upload IMG"],
    ["LookIMG",                  "https://lookimg.com","Upload IMG"],
    ["PicsSQL",                  "https://pics.sql.gg","Upload IMG"],
    ["IMGShare",                  "https://imgshare.io","Upload IMG"],
    ["PostImage",                  "https://postimages.org","Upload IMG"],
    ["SnipBoard",                  "https://snipboard.io","Upload IMG"],
    ["PicInfinity",                  "https://pic8.co","Upload IMG"],
    ["ImageServer",                  "https://imageserver.link","Upload IMG"],
    ["Unsee",                  "https://unsee.cc","Upload IMG"],
    ["SXCU",                  "https://sxcu.net","Upload IMG"],
    ["Stingle",                  "https://stingle.org","Upload Media"],
    ["AudioCutter",                  "https://meowtec.github.io/audio-cutter/","Cut Audio"],
    ["BearAudio",                  "https://www.bearaudiotool.com","Cut Audio"],
    ["Vocaroo",                  "https://vocaroo.com","Record Audio"],
    ["Racket",                  "https://racket.com","Stream Audio"],
    ["Lalal",                  "https://www.lalal.ai","Separate Music"],
    ["Melody",                  "https://melody.ml","Separate Music"],
    ["VocalRemove",                  "https://vocalremover.org","Separate Music"],
    ["RemoveVocal",                  "https://www.remove-vocals.com","Separate Music"],
    ["Telegraph",                 "https://telegra.ph","Pastebin"],
    ["Paste.ee",                 "https://paste.ee","Pastebin"],
    ["URLDev",                 "https://url.dev","Short URL"],
    ["TermBin",                 "https://termbin.com","Terminal Pastebin"],
    ["Temp.sh",                 "https://temp.sh","Terminal Upload"],
    ["Transfer",                 "https://transfer.sh","Terminal Upload"],
    ["Ziggs",                 "https://ziggs.io","File Transfer"],
    ["Instant",                 "https://instant.io","File Transfer"],
    ["SnapDrop",                 "https://snapdrop.net","File Transfer"],
    ["ShareDrop",                 "https://www.sharedrop.io","File Transfer"],
    ["Slate",                  "https://slate.host","Blockchain"],
    ["Swarm",                  "https://swarm-gateways.net","Blockchain"],
    ["GlobalUp",                  "https://globalupload.io","Blockchain"],
    ["SkyTransfer",                  "https://skytransfer.hns.siasky.net","Blockchain"],
    ["DocDroid",                  "https://www.docdroid.net","Upload PDF"],
    ["PDFHost",                  "https://pdfhost.io","Upload PDF"],
    ["eDisk",                  "https://www.edisk.eu","Cloud Storage"],
    ["Mega.nz",                  "https://mega.nz","Cloud Storage"],
    ["DooDrive",                  "https://doodrive.com","Cloud Storage"],
    ["MediaFire",                  "https://www.mediafire.com","Cloud Storage"],
    ["GoogleDrive",                  "https://www.google.com/drive/","Cloud Storage"],
    ["YandexDisk",                  "https://disk.yandex.com","Cloud Storage"],
    ["Fex.net",                  "https://fex.net","Cloud Storage"],
    ["Racaty",                  "https://racaty.com","Cloud Storage"],
    ["Smash",                  "https://en.fromsmash.com","Cloud Storage"],
    ["BlackHole",                  "https://blackhole.run","Upload Files"],
    ["SwissXfer",                  "https://www.swisstransfer.com/en","Upload Files"],
    ["Envelope",                  "https://envelop.app","Upload Files"],
    ["1fichier",                  "https://1fichier.com","Upload Files"],
    ["DDownload",                  "https://ddownload.com","Upload Files"],
    ["LetsUpload",                  "https://letsupload.io","Upload Files"],
    ["UploadFile",                  "https://ufile.io","Upload Files"],
    ["SolidFiles",                  "https://www.solidfiles.com","Upload Files"],
    ["MixDrop",                  "https://mixdrop.co","Upload Files"],
    ["GoFile",                  "https://gofile.io","Upload Files"],
    ["DBREE",                  "https://dbree.org","Upload Files"],
    ["Upload.ee",                  "https://www.upload.ee","Upload Files"],
    ["SQLGG",                  "https://sql.gg","Upload Files"],
    ["PomfCrawl",                  "https://pomfcrawl.pythonanywhere.com","Upload Files"],
    ["ZzZz",                  "https://zz.ht","Upload Files"],
    ["FileUp",                  "https://fileup.pro","Upload Files"],
    ["CatBox",                  "https://catbox.moe","Upload Files"],
    ["Femto",                  "https://femto.pw","Upload Files"],
    ["Pomf",                  "https://pomf.lain.la","Upload Files"],
    ["X0at",                  "https://x0.at","Upload Files"],
    ["Ttmsh",                  "https://ttm.sh","Upload Files"],
    ["TMPNinja",                  "https://tmp.ninja","Upload Files"],
    ["UploadVaa",                  "https://upload.vaa.red","Upload Files"],
    ["BayFiles",                  "https://bayfiles.com","Upload Files"],
    ["ZippyShare",                  "http://zippyshare.com","Upload Files"],
    ["Userscloud",                  "https://userscloud.com","Upload Files"],
    ["FileRio",                  "http://filerio.in","Upload Files"],
    ["File.al",                  "https://file.al","Upload Files"],
    ["UpToBox",                  "https://uptobox.com","Upload Files"],
    ["UpToCloud",                  "https://uptocloud.co","Upload Files"],
    ["AlfaFile",                  "https://alfafile.net","Upload Files"],
    ["MegaUp",                  "https://megaup.net","Upload Files"],
    ["GoUnlimited",                  "http://gounlimited.to","Upload Videos"],
    ["DoodStream",                  "https://doodstream.com","Upload Videos"],
    ["ProtonVideo",                  "https://protonvideo.to","Upload Videos"],
    ["VidLox",                  "https://vidlox.me","Upload Videos"],
    ["Fembed",                  "https://vcdn.io","Upload Videos"],
    ["Saruch",                  "https://saruch.co","Upload Videos"],
    ["VidCloud",                  "https://vidcloud.pro","Upload Videos"],
    ["StreamTape",                  "https://streamtape.com","Upload Videos"],
    ["WolfStream",                  "https://wolfstream.tv","Upload Videos"],
    ["VideoBin",                  "https://videobin.co","Upload Videos"],
    ["UpStream",                  "https://upstream.to","Upload Videos"],
    ["MirrorAce",                  "https://mirrorace.com","Mirror Files"],
    ["MultiUp",                  "https://multiup.eu","Mirror Files"],
    ["Reevown",                  "https://myuploadedpremium.de","Debrid"],
    ["Deepbrid",                  "https://www.deepbrid.com/service","Debrid"],
    ["CocoLeech",                  "https://cocoleech.com","Debrid"],
    ["HyperDebrid",                  "https://hyperdebrid.net","Debrid"],
    ["GenLinkPrem",                  "https://www.generatorlinkpremium.com","Debrid"],
    ["UpPremLink",                  "https://www.uploadedpremiumlink.net","Debrid"],
    ["LinkSnappy",                  "https://linksnappy.com","Debrid"],
    ["RapidGrab",                  "https://rapidgrab.pl","Debrid"],
    ["CoolDebrid",                  "https://www.cooldebrid.com","Debrid"],
    ["LinksPrem",                  "https://linkspremium.download","Debrid"],
    ["DDebrid",                  "https://ddebrid.com","Debrid"],
  ],
  "More": [
    [svgMore,                    "pink",                                      "-HEAD-"],
    ["Amazon",                    "https://www.amazon.com","Buy Anything"],
    ["NewEgg",                    "https://www.newegg.com","Buy Tech"],
    ["MonoPrice",                    "https://www.monoprice.com","Buy Tech"],
    ["AliExpress",                    "https://www.aliexpress.com","Buy Tech"],
    ["DiskPrices",                    "https://diskprices.com","Buy Tech"],
    ["RTINGS",                    "https://www.rtings.com","Product Ratings"],
    ["Shellix",                    		"https://shellix.xyz","Buy Digital"],
    ["Lumix",                    		"https://lumix.live","Buy Digital"],
    ["PayPal",                    "https://www.paypal.com","Payment"],
    ["CTemplar",                    "https://mail.ctemplar.com","Secure E-Mail"],
    ["ProtonMail",                    "https://mail.protonmail.com","Secure E-Mail"],
    ["Cock.li",                    "https://cock.li","Secure E-Mail"],
    ["Gmail",                    "https://www.google.com/gmail/","E-Mail"],
    ["InstaEmail",                    "https://m.kuku.lu","Temp E-Mail"],
    ["Gmailnator",                    "https://gmailnator.com","Temp E-Mail"],
    ["YangMaoEDU",                    "https://mail.mjj.edu.ge","Temp E-Mail"],
    ["AdBlockTest",                    "https://adblock-tester.com","Test AdBlocker"],
    ["StackEdit",                    "https://stackedit.io","MarkDown"],
    ["TradingView",                    "https://www.tradingview.com/chart/","Stocks"],
    ["StockTwits",               "https://stocktwits.com","Stocks"],
    ["WSBStocks",                    "https://wsbsentiment.io","Stocks"],
    ["Stonks",                    "https://stonks.vercel.app","Stocks"],
    ["BuyLow",                    "https://buylowsellhigh.fyi","Stocks"],
    ["Telegram",               "https://web.telegram.org","Web Client"],
    ["JamSystems",               "https://jam.systems","Voice Chat"],
    ["Dictation",               "https://dictation.io/speech","Voice Notepad"],
    ["WikiDark",                    "https://wikidark.org","Wikipedia GUI"],
    ["WikiLess",                    "https://wikiless.org","Wikipedia GUI"],
    ["TempURL",                    "https://www.temporary-url.com","Temp URL"],
    ["RFC.FYI",               "https://rfc.fyi","RFC Search"],
    ["GamingWiki",               "https://www.pcgamingwiki.com/wiki/Home","PC Game Wiki"],
    ["Periodic",               "https://periodic-table.io","Elements"],
    ["CountDowns",                    "https://yourcountdown.to/everything","CountDowns"],
    ["YouTLDR",                  "https://you-tldr.com","Transcribe YouTube"],
    ["Recipes",                    "https://recipe-search.typesense.org","Recipes"],
    ["RecipeRadar",                    "https://www.reciperadar.com","Recipes"],
    ["Cooking",                    "https://based.cooking","Recipes"],
    ["Deepl",               "https://www.deepl.com/translator","Translate"],
    ["Windy",                    "https://www.windy.com","Weather"],
    ["Nomie",                    "https://v5.nomie.app","Life Tracker"],
    ["DApps",                    "https://www.stateofthedapps.com/rankings","Crypto Apps"],
    ["Desmos",                    "https://www.desmos.com/scientific","Calculator"],
    ["OmniCalc",                    "https://www.omnicalculator.com","Calculator"],
    ["ZoomEarth",                    "https://zoom.earth","Satellite"],
    ["FlightRadar",                    "https://www.flightradar24.com","Planes"],
    ["GetSongBPM",               "https://getsongbpm.com","Music BPM"],
    ["TuneBat",               "https://tunebat.com","Music BPM"],
    ["SoftMurmur",               "https://asoftmurmur.com","Ambient Noise"],
    ["MyNoise",               "https://mynoise.net","Ambient Noise"],
    ["Draw",               "https://www.draw.io","FlowCharts"],
    ["0wx",               "https://www.0wx.org","Online Tools"],
    ["Void",               "https://void.yt","Online Tools"],
    ["PineTools",               "https://pinetools.com","Online Tools"],
    ["ManyTools",               "https://manytools.org","Online Tools"],
    ["SilkkyCloud",               "https://silkky.cloud","Online Tools"],
    ["ZimTools",               "https://zimtools.xyz","Configurator"],
    ["CloudConv",                    "https://cloudconvert.com","Convert Tools"],
    ["AnyConv",                    "https://anyconv.com","Convert Tools"],
    ["EPUB.to",                    "https://epub.to","Convert Tools"],
    ["PrintFriend",                  "https://www.printfriendly.com","Print & PDF"],
    ["PDFShelter",                    "https://pdfshelter.com","PDF Tools"],
    ["ILovePDF",                    "https://www.ilovepdf.com","PDF Tools"],
    ["Xodo",                    "https://www.xodo.com/app/","PDF Tools"],
	["VirusTotal",               "https://virustotal.com","Malware Scan"],
    ["HybridScan",               "https://www.hybrid-analysis.com","Malware Scan"],
    ["JoeSandbox",               "https://www.joesandbox.com","Malware Scan"],
    ["AnyRun",               "https://app.any.run","Malware Scan"],
    ["Archive.is",               "https://archive.is","Link Saver"],
    ["Archive.st",               "https://archive.st","Link Saver"],
    ["Ghost",               "https://ghostarchive.org","Link Saver"],
    ["WayBack",               "https://archive.org/web/","Link Saver"],
    ["Fast",               "https://fast.com","Internet Speed"],
    ["CFSpeed",               "https://speed.cloudflare.com","Internet Speed"],
    ["SpeedTest",               "https://www.speedtest.net","Internet Speed"],
    ["LibreSpeed",               "https://librespeed.org","Internet Speed"],
    ["HostGuide",               "https://weboas.is/media/host.pdf","Hosting Guide"],
    ["ServerHunt",               "https://www.serverhunter.com","Host List"],
    ["ExoticVM",               "https://www.exoticvm.com","Host List"],
    ["Products",                   "https://www.producthunt.com","New Sites"],
    ["AppScope",                    "https://appsco.pe","Web Apps"],
    ["Hackster",                   "https://www.hackster.io/projects?ref=topnav","DIY Projects"],
    ["PartPicker",                    "https://pcpartpicker.com","PC Building"],
    ["CronTab",               "https://crontab.guru/examples.html","Cron Job"],
    ["Squawkr",               "https://squawkr.io","P2P Alert"],
    ["FileCrypt",                    "https://filecrypt.cc","Link Protect"],
    ["PeepLink",                    "https://peeplink.in","Link Protect"],
    ["TheEye",                "https://the-eye.eu/public/","Archive Dump"],
    ["WallHaven",               "https://wallhaven.cc","WallPapers"],
    ["CanYouSeeMe",               "https://canyouseeme.org","Open Ports"],
    ["PortScanMe",               "http://portscan.me","Open Ports"],
    ["IKnowDL",               "https://iknowwhatyoudownload.com","Torrent Peers"],
    ["Looking",               "https://looking.house","Web MTR"],
    ["Ping",               "https://ping.pe","Web MTR"],
    ["Scans",               "https://scans.io","Internet Scan"],
    ["Spyse",               "https://spyse.com","Internet Scan"],
    ["Censys",               "https://search.censys.io","Internet Scan"],
    ["Shodan",               "https://www.shodan.io","Internet Scan"],
    ["BGPView",               "https://bgpview.io","ASN Info"],
    ["BGPTools",               "https://bgp.tools","ASN Info"],
    ["Whois",               "https://whois.cynthia.re","Domain Whois"],
    ["DNSLeak",               "https://www.dnsleaktest.com","Test DNS"],
    ["ViewDNS",               "https://viewdns.info","DNS Scan"],
    ["DNSlytics",               "https://dnslytics.com","DNS Scan"],
    ["DNSDump",                    "https://dnsdumpster.com","DNS Scan"],
    ["DNSApe",               "https://www.dnsape.com","DNS Tools"],
    ["DNSTools",                    "https://dnstools.ws","DNS Tools"],
    ["NetworksDB",               "https://networksdb.io","DNS Tools"],
    ["SecTrail",               "https://securitytrails.com","DNS History"],
    ["CompleteDNS",               "https://completedns.com/dns-history/","DNS History"],
    ["DNSHistory",               "https://dnshistory.org","DNS History"],
    ["WhoHistory",               "https://tools.whoisxmlapi.com/whois-history-search","Whois History"],
    ["CertSearch",               "https://crt.sh","SSL History"],
    ["CrimeFlare",               "http://www.crimeflare.org:82/cfs.html","Cloudflare"],
    ["ExploitDB",                 "https://www.exploit-db.com","Exploit List"],
    ["CyberChef",               "https://gchq.github.io/CyberChef/","Encrypt Decrypt"],
    ["Buckets",               "https://buckets.grayhatwarfare.com","Open AWS"],
    ["WiGLE",               "https://wigle.net","Find WiFi"],
    ["CanaryToken",               "https://whiteclouddrive.com/generate","Hacker Traps"],
    ["DoxBin",                    "https://doxbin.org","Doxing"],
    ["Leak.sx",                    "https://leak.sx","Accounts"],
    ["CyberHub",               "https://cyber-hub.pw","Hack Tools"],
    ["DarkFail",               "https://dark.fail","TOR Links"],
    ["OnionLive",               "https://onion.live","TOR Links"],
    ["TechLists",               "https://awesomelists.top","All Lists"],
    ["Defensive",               "https://defensivecomputingchecklist.com","Defense List"],
    ["DataHoard",               "https://github.com/simon987/awesome-datahoarding","Data Hoarding"],
    ["SecretBook",               "https://github.com/trimstray/the-book-of-secret-knowledge/blob/master/README.md","Tech Info"],
    ["GoodSites",                   "https://www.goodsites.tech","Tech Links"],
    ["PiracyNow",                   "https://piracy.now.sh","Pirate Links"],
    ["PiracyList",                   "https://github.com/Igglybuff/awesome-piracy/blob/master/readme.md","Pirate Links"],
    ["SnakeWarez",                   "https://pilssken.neocities.org/warez/","Pirate Links"],
    ["PirateGames",                   "https://github.com/taskylizard/piratedgames-megathread/blob/main/README.md","Pirate Links"],
    ["DMOZTools",               "http://dmoztools.net","Web Directory"],
    ["CataList",               "https://cata-list.github.io","Web Directory"],
    ["LinkBase",               "https://link-base.org","Cyber Crime"],
    ["IntelX",               "https://intelx.io","Net Research"],
    ["PasteSkim",                    "https://sites.google.com/view/l33tech/tools/pasteskimmer","Paste Search"],
    ["Psbdmp",                    "https://psbdmp.ws","Paste Search"],
    ["Hunter",               "https://hunter.io","Find Emails"],
    ["NameChk",               "https://namechk.com","Net Research"],
    ["OSINT1",               "https://github.com/jivoi/awesome-osint/blob/master/README.md","Net Research"],
    ["OSINT2",               "https://www.osintdojo.com/resources/","Net Research"],
    ["OSINT3",               "https://github.com/Ph055a/OSINT_Collection","Net Research"],
    ["OSINT4",               "https://osintframework.com","Net Research"],
    ["OSINT5",               "https://docs.google.com/spreadsheets/d/18rtqh8EG2q1xBo2cLNyhIDuK9jrPGwYr9DI2UncoqJQ/","Net Research"],
    ["OSINT6",               "https://start.me/p/b5Aow7/asint_collection","Net Research"],
    ["FaganFind",               "https://www.faganfinder.com","Net Research"],
    ["JudyRec",               "https://www.judyrecords.com","Court Records"],
    ["FakeGen",               "https://www.fakenamegenerator.com","Fake ID"],
    ["FakeIt",               "https://fake-it.ws","Fake ID"],
    ["THGTOA",               "https://anonymousplanet.github.io/thgtoa/guide.html","Anonymity"],
    ["Madaidan",               "https://madaidans-insecurities.github.io","Security Privacy"],
    ["PrivacyTool",               "https://www.privacytools.io","Privacy Software"],
    ["PRISMBreak",               "https://prism-break.org","Privacy Software"],
    ["PrivacyList",               "https://privacytoolslist.com","Privacy Software"],
    ["Windows",               "https://github.com/Awesome-Windows/Awesome/blob/master/README.md","Windows Links"],
    ["Hacking",            "https://github.com/Hack-with-Github/Awesome-Hacking/blob/master/README.md","Hacking Links"],
    ["Sysadmin",           "https://github.com/n1trux/awesome-sysadmin/blob/master/README.md","Admin Links"],
    ["PenTest",                    "https://www.reddit.com/r/Pentesting/comments/9ondj5/a_good_pentesting_tools_list/","Security Tools"],
    ["SecLists",                    "https://github.com/danielmiessler/SecLists","Security Lists"],
    ["Tracer",                    "http://pre.c-burns.co.uk/pre.php","Scene Releases"],
    ["TechBench",                    "https://tb.rg-adguard.net","MSDN"],
    ["UUPDump",                    "https://uupdump.net","MSDN"],
  ]
};
let hiddenLinksOne = [
	["PrivateSpreadsheet", "https://hdvinnie.github.io/Private-Trackers-Spreadsheet/"],
	["BlackPearl", "https://blackpearl.biz"],
	["EBookShares", "https://ebooks-shares.org"],
    ["IntoTheInternet", "https://intotheinter.net"],
	["SilentGround", "https://www.silentground.org"],
    ["AlphaRatio", "https://alpharatio.cc"],
    ["AnimeBytes", "https://animebytes.tv"],
    ["Bibliotik", "https://bibliotik.me"],
    ["BitSpyder", "https://bitspyder.net"],
    ["BroadcasTheNet", "https://broadcasthe.net"],
    ["BrokenStones", "https://brokenstones.club"],
    ["CGPeers", "https://www.cgpeers.to"],
    ["Empornium", "https://www.empornium.is"],
    ["FileList", "https://filelist.io"],
    ["GazelleGames", "https://gazellegames.net"],
    ["HDBits", "https://hdbits.org"],
    ["IPTorrents", "https://iptorrents.com"],
    ["MacTorrents", "https://mac-torrents.me"],
    ["Materialize", "https://materialize.is"],
    ["MoreThanTV", "https://www.morethan.tv"],
    ["MySpleen", "https://www.myspleen.org"],
    ["NotWhatCD", "https://notwhat.cd"],
    ["Orpheus", "https://orpheus.network"],
    ["PassThePopcorn", "https://passthepopcorn.me"],
    ["Redacted", "https://redacted.ch"],
    ["TheGeeks", "https://thegeeks.click"],
    ["ThePirateSociety", "https://thepiratesociety.org/forums/"],
];
let hiddenLinksTwo = [
    ["AnonImages", "https://anonposted.com"],
    ["AnonVideos", "https://anonvideos.com"],
    ["Booba", "https://booba.tv"],
    ["CamVault", "https://camvault.xyz"],
    ["CelebJihad", "https://celebjihad.com"],
    ["ChatPic", "https://chatpic.org/r/GoWild"],
    ["Chaturbate", "https://chaturbate.com"],
    ["CyberLeaks", "https://cyberleaks.to"],
    ["DaftSex", "https://daftsex.com"],
    ["DirtyShip", "https://dirtyship.com"],
    ["Erome", "https://www.erome.com/explore"],
    ["Fappening", "https://thefappeningblog.com/forum/"],
    ["Fuskator", "https://fuskator.com"],
    ["GoodPorn", "https://goodporn.to"],
    ["HotPornFile", "https://www.hotpornfile.org"],
    ["iWankTV", "https://www.iwank.tv/en/"],
    ["KemonoParty", "https://kemono.party"],
    ["KittyKats", "https://kitty-kats.net"],
    ["LeakemUp", "https://leakemup.com/forums/"],
    ["LewdWeb", "https://forum.lewdweb.net"],
    ["OnlyfansBabes", "https://old.reddit.com/r/OnlyfansBabes1/"],
    ["Motherless", "https://motherless.com"],
	["NSFW411", "https://old.reddit.com/r/NSFW411/wiki/index"],
	["Nudes7", "https://nudes7.com"],
	["NudoStar", "https://nudostar.com/forum/"],
	["OnlyLeaks", "https://www.onlyleaks.me"],
	["OnlyNudes", "https://onlynudes.net"],
    ["Palimas", "https://palimas.org"],
    ["ParadiseHill", "https://en.paradisehill.cc/porn/"],
    ["PayWallParty", "https://paywall.party"],
    ["PlexStorm", "https://www.plexstorm.com"],
    ["PornGo", "https://www.porngo.com"],
    ["PornXP", "https://pornxp.com"],
    ["PreFap", "https://prefap.com"],
    ["ProThots", "https://prothots.com"],
    ["ReddNight", "https://reddnight.com"],
    ["RedGifs", "https://www.redgifs.com"],
    ["Rule34", "https://rule34.xxx/index.php?page=post&s=list"],
    ["SeisoParty", "https://seiso.party"],
    ["SocialMedia", "https://forums.socialmediagirls.com"],
    ["SxyPrn", "https://www.sxyprn.com"],
    ["SwipePorn", "https://swipe-porn.com"],
    ["ThePornDude", "https://theporndude.com"],
    ["ThotBook", "https://thotbook.tv"],
    ["ThotHub", "https://thothub.su"],
    ["Thots", "https://thots.tv"],
    ["ViralPorn", "https://viralporn.com"],
    ["XHamster", "https://xhamster.com"],
    ["XXXPics", "https://xxx.pics"],
    ["XXXStreams", "https://xxxstreams.org"],
];
let linkMenu;
let userSettings;
let searchInput = document.getElementById("searchBar");
let searchLinksInput = document.getElementById("searchLinks");
let rootSearchHelp = document.getElementById("searchHelpMenu");
let rootSearchLinkHelp = document.getElementById("searchLinkMenu");
let rootMenuUL = document.getElementById("categoryMenu");
let dateDiv = document.getElementById("dateContainer");
let systemInfoDiv = document.getElementById("systemInfoContainer");
let notesTextarea = document.getElementById("notesInput");
let showHideItemIcons = document.getElementById("customization-checkbox");
let openInNewTab = document.getElementById("openNewTab-checkbox");
let searchSuggestions = document.getElementById("searchsuggestions-checkbox")
let oldRedditLinks = document.getElementById("oldReddit-checkbox");
let confirmModal = document.getElementById("confirmModal");
let secretMenuOne = document.getElementById("secretMenu");
let secretMenuTwo = document.getElementById("secretMenu");
let overlay = document.getElementById("overlay");
let closeOptions = document.getElementsByClassName("modal-cancel");

function init() {
  initSearchBar();
  initSearchLinks();
  buildDate();
  buildSystemInfo();
  buildHelp();
  buildHelp2();
  buildMenu();
  document.body.style.opacity = 1;
  document.getElementById("mainContainer").style.opacity = 1;
  document.getElementById("infoContainer").style.opacity = 1;
  document.getElementById("notesWidget").style.opacity = 1;
  let psNav = new PerfectScrollbar("#mySidenav");
  document
    .getElementById("menu-select")
    .addEventListener("mouseenter", function (e) {
      lockNav = true;
    });
  document
    .getElementById("menu-select")
    .addEventListener("mouseleave", function (e) {
      if (e.relatedTarget === null) {
        return;
      }
      lockNav = false;
    });
  document
    .querySelector("#resetToDefault .btn")
    .addEventListener("click", resetAllToDefault);
  document.getElementById("resetColor").addEventListener("click", function () {
    color = "#0C85D3";
    document.getElementById("colorPicker").jscolor.fromString(color);
    SetCookie("matrix-color", color, 365 * 24 * 60 * 60 * 1000);
  });

  showHideItemIcons.onchange = toggleHideIcons;

  if (
    localStorage.getItem("hide-icons") &&
    localStorage.getItem("hide-icons") === "no"
  ) {
    if (showHideItemIcons.checked) {
      showHideItemIcons.checked = false;
    }
    toggleHideIcons();
  } else {
    showHideItemIcons.checked = true;
    toggleHideIcons()
  }

  openInNewTab.onchange = toggleOpenNewTab;
  if (GetCookie("new-tab") === "true") {
    openInNewTab.checked = true;
  }

  oldRedditLinks.onchange = toggleOldReddit;


  if (
    localStorage.getItem("old-reddit") &&
    localStorage.getItem("old-reddit") === "no"
  ) {
    if (oldRedditLinks.checked) {
      oldRedditLinks.checked = false;
    }
    toggleOldReddit();
  } else {
    oldRedditLinks.checked = true;
    toggleOldReddit()
  }


  searchSuggestions.onchange = toogleSearchSuggestions;

  if (
    localStorage.getItem("search-suggestions") &&
    localStorage.getItem("search-suggestions") === "no"
  ) {
    if (searchSuggestions.checked) {
      searchSuggestions.checked = false;
    }
    toogleSearchSuggestions();
  } else {
    searchSuggestions.checked = true;
    toogleSearchSuggestions()
  }
  if (GetCookie("matrix-color") != null) {
    color = GetCookie("matrix-color");
    jscolor.installByClassName("jscolor");
    document.getElementById("colorPicker").jscolor.fromString(color);
  }
  if (GetCookie("animation") != null) {
    clearOldCanvas();
    canvasBg = GetCookie("animation");
    setAnimation(GetCookie("animation"));
  }
  if (localStorage.getItem("background_id")) {
    document.getElementById("resetBackgroundBtn").style.display =
      "inline-block";
  }
}
Array.from(closeOptions).forEach(function (option) {
  option.addEventListener("click", function () {
    confirmModal.style.display = "none";
    secretMenu.style.display = "none";
    overlay.style.display = "none";
  });
});

function initSearchBar() {
  if (searchSources[ssi] !== undefined) {
    let searchsave = GetCookie("engine") || "";
    if (searchsave !== "") {
      searchInput.placeholder = searchSources[searchsave][2];
      ssi = searchsave;
    } else searchInput.placeholder = searchSources[ssi][2];
  } else {
    ssi = 0;
    searchInput.placeholder = "Do you know what you're doing?";
    alert("Error: default search engine setting is invalid!");
  }
  document.addEventListener("keydown", switcheroo);
  document.addEventListener("keyup", switcheroo);
  searchInput.value = "";
}

function initSearchLinks(links) {
  if (!links) {
    let allLinkSources = [];

    for (const property in defaultLinkMenu) {
      for (j = 0; j < defaultLinkMenu[property].length; j++) {
        if (defaultLinkMenu[property][j][2] != "-HEAD-")
          allLinkSources.push(defaultLinkMenu[property][j]);
      }
    }
    for (j = 0; j < hiddenLinksOne.length; j++) {
      hiddenLinksOne[j][2] = "";

      allLinkSources.push(hiddenLinksOne[j]);
    }
    for (j = 0; j < hiddenLinksTwo.length; j++) {
      hiddenLinksTwo[j][2] = "";

      allLinkSources.push(hiddenLinksTwo[j]);
    }


    searchLinksInput.placeholder = "Search WebOasis Links";
  } else {
    allLinkSources = [...links];
  }
  searchLinksInput.placeholder = "Search WebOasis Links";
}


function buildDate() {
  let today = new Date();
  let hours = today.getHours() > 12 ? today.getHours() - 12 : today.getHours();
  let am_pm = today.getHours() >= 12 ? "PM" : "AM";
  hours = hours < 10 ? "0" + hours : hours;
  if (hours < 1) {
    hours = 12;
  }
  let minutes =
    today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
  let seconds =
    today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds();
  let time = hours + ":" + minutes + ":" + seconds + " " + am_pm;
  dateDiv.innerHTML =
    '<font class="font-2em">' +
    dayNames[today.getDay()] +
    " " +
    monthNames[today.getMonth()] +
    " " +
    today.getDate() +
    ", " +
    today.getFullYear() +
    "<br>" +
    time +
    "</font>";
  setTimeout(buildDate, 1000);
}

function buildSystemInfo() {
  const pixelRatio = window.devicePixelRatio;
  const realWidth = Math.round(window.screen.width * pixelRatio);
  const realHeight = Math.round(window.screen.height * pixelRatio);
  let binfo =
    '<a href="https://amiunique.org/fp"  target="_blank"> ' +
    platform.os +
    "</a>" +
    "<br>" +
    '<a href="https://amiunique.org/fp"  target="_blank"> ' +
    platform.name +
    " " +
    platform.version +
    "</a>" +
    "<br>" +
    '<a href="https://amiunique.org/fp"  target="_blank"> ' +
    realWidth +
    " x " +
    realHeight +
    "</a>";
  let threadnum = window.navigator.hardwareConcurrency;
  let newthreadnum = parseInt(threadnum);
  let logical = newthreadnum + " Threads";
  let detectip = '<span id="ip" onclick="toggleShowIP()">Show IP</span>';
  if (newthreadnum > 0) {
    systemInfoDiv.innerHTML =
      binfo +
      "<br>" +
      '<a href="https://amiunique.org/fp"  target="_blank"> ' +
      logical +
      "</a>" +
      "<br>" +
      detectip;
  } else {
    systemInfoDiv.innerHTML = binfo + "<br>" + detectip;
  }
}

function buildHelp() {
  //To build Auto complete suggestions list"
  if (localStorage.getItem("search-suggestions") === "yes" && searchInput.value !== "") {
    if (document.getElementById("generatedList")) {
      var element = document.getElementById('generatedList');
      element.parentNode.removeChild(element);
    }
    var list = document.createElement('div');
    list.id = "generatedList"

    for (let i = 0; i < AutoComp.length && i < 10; i++) {
      var li = document.createElement('div');
      li.innerHTML = AutoComp[i];

      li.classList.add('searchSources');
      li.classList.add('list-item-animation');
      li.classList.add('transition');
      li.id = i;
      li.addEventListener('click', ((event) => {
        searchInput.value = event.target.innerText
        searchInput.focus(); //To not lose focus while clicking on a search suggestion 
      }))
      list.appendChild(li);
    }
    rootSearchHelp.appendChild(list)
  } else {
    //To build search engines list"

    let currentEngine = GetCookie("engine") ? parseInt(GetCookie("engine")) : "";
    if (document.getElementById("generatedList")) {
      var element = document.getElementById('generatedList');
      element.parentNode.removeChild(element);
    }
    var list = document.createElement('div');
    list.id = "generatedList"

    for (let i = 0; i < searchSources.length; i++) {
      var li = document.createElement('div');
      li.innerHTML = `<span
              		${currentEngine == i ? 'class="selected"' : ""} >` +
        "!" +
        searchSources[i][0] +
        "</span>" +
        searchSources[i][2];

      li.classList.add('searchSources');
      li.classList.add('list-item-animation');
      li.classList.add('transition');
      li.id = i;
      list.appendChild(li);
    }
    rootSearchHelp.appendChild(list)
    var searchSourcesList = document.querySelectorAll(".searchSources");
    Array.from(searchSourcesList).forEach(function (source) {
      source.addEventListener("click", function (e) {
        var index = e.target.id;
        ssi = index;
        searchInput.placeholder = e.target.textContent.substring(2);
        SetCookie("engine", index, 365 * 24 * 60 * 60 * 1000);
        buildHelp();
      });
    });
  }


}


function buildHelp2() {
  //Used to build the alternate search feature i.e. search links feature
  // let currentEngine = GetCookie("engine") ? parseInt(GetCookie("engine")) : "";
  rootSearchLinkHelp.innerHTML = "";

  for (let i = 0; i < 10 & i < allLinkSources.length; i++) {
    var li = document.createElement("div");
    li.innerHTML = `<span><a target="_blank" href=${allLinkSources[i][1]}>${allLinkSources[i][0]}</a></span>`;
    li.classList.add("searchSources");
    li.classList.add("list-item-animation");
    li.classList.add("transition");
    rootSearchLinkHelp.append(li);
  }
}

function handleSearchBarFocus(e) {
  addClass("mainContainer", "input-active");
  let lis = document.querySelectorAll(
    ".searchSources"
  );
  let lastElement = lis[lis.length - 1];
  let timeoutDelay = parseInt(
    parseFloat(lastElement.style.transitionDelay.replace("s", "")) * 1000
  );
  setTimeout(() => {
    lis = document.querySelectorAll(
      "#generatedList .searchSources"
    );
    lis.forEach((element) => {
      element.classList.add("no-delay");
    });
  }, timeoutDelay);
  if (closeCustomLinksNav) {
    closeCustomLinksNav();
  }
}

function handleSearchLinksFocus(e) {
  document.getElementById("mainContainer").style.display = "none";

  addClass("mainContainer2", "input-active");
  let lis = document.querySelectorAll(
    "#mainContainer2>#searchLinkHelp>#searchLinkMenu>.searchSources"
  );
  let lastElement = lis[lis.length - 1];
  let timeoutDelay = parseInt(
    parseFloat(lastElement.style.transitionDelay.replace("s", "")) * 1000
  );
  setTimeout(() => {
    lis = document.querySelectorAll(
      "#mainContainer2.input-active>#searchLinkHelp>#searchLinkMenu>p"
    );
    lis.forEach((element) => {
      element.classList.add("no-delay");
    });
  }, timeoutDelay);
  if (closeCustomLinksNav) {
    closeCustomLinksNav();
  }
}


function handleSearchBarBlur(e) {
  removeClass("mainContainer", "input-active");
  let lis = document.querySelectorAll(
    "#mainContainer>#searchHelp>#searchHelpMenu>li"
  );
  lis.forEach((element, index) => {
    if (element.classList.contains("no-delay")) {
      element.classList.remove("no-delay");
    }
    element.classList.remove("transition");
    document.getElementById(element.id).offsetWidth = document.getElementById(
      element.id
    ).offsetWidth;
    element.classList.add("transition");
  });
}

function handleSearchLinksBlur(e) {
  document.getElementById("mainContainer").style.display = "block";

  removeClass("mainContainer2", "input-active");
  let lis = document.querySelectorAll(
    "#mainContainer2>#searchHelp>#searchHelpMenu>li"
  );
  lis.forEach((element, index) => {
    if (element.classList.contains("no-delay")) {
      element.classList.remove("no-delay");
    }
    element.classList.remove("transition");
    document.getElementById(element.id).offsetWidth = document.getElementById(
      element.id
    ).offsetWidth;
    element.classList.add("transition");
  });
}

function calculateDelaySeconds(listIndex) {
  let delayMultiplier = 0.05;
  let delayStart = 0.2;
  return Number.parseFloat(listIndex * delayMultiplier + delayStart).toFixed(2);
}

function buildMenu() {
  if (localStorage.getItem("menu-items")) {
    linkMenu = JSON.parse(localStorage.getItem("menu-items"));
    console.log("Loaded menu items from localStorage");
  } else {
    linkMenu = defaultLinkMenu;
    localStorage.setItem("menu-items", JSON.stringify(defaultLinkMenu));
    console.log("Menu items not set in localStorage. Loaded default and set.");
  }
  let newMenu = "";
  for (let n = 0, nmax = linkMenuOrder.length; n < nmax; n++) {
    let menuID = linkMenuOrder[n];
    let menuItems = linkMenu[menuID];
    for (let i = 0, imax = menuItems.length; i < imax; i++) {
      if (menuItems[i][2] === "-HEAD-") {
        newMenu +=
          '<li class="button-container expanding-down"><div class="button accent-' +
          (menuItems[i][1] !== "" ? menuItems[i][1].toLowerCase() : "white") +
          '"><label class="button-content">' +
          menuItems[i][0] +
          '</label><div class="button-expanded-content" style="box-sizing: border-box;">';
        newMenu +=
          '<ul id="' + menuID + 'MenuContainer" class="menu-link container">';
      } else {
        if (menuItems[i][2] === "") {
          newMenu +=
            "<li class='menu-link-item' data-index=\"" +
            i +
            '"><div class="remove-menu-item">x</div> <div class="drag-handle"> :: </div><a  class="tooltip"href="' +
            menuItems[i][1] +
            '" target="_blank"><label class="text12">' +
            menuItems[i][0] +
            '</label><span class="tooltipwrap"><span class="tooltiptexthidden">' +
            menuItems[i][2] +
            "</span></span></a></li>";
        } else {
          newMenu +=
            "<li class='menu-link-item' data-index=\"" +
            i +
            '"><div class="remove-menu-item">x</div> <div class="drag-handle"> :: </div><a  class="tooltip"href="' +
            menuItems[i][1] +
            '" target="_blank"><label class="text12">' +
            menuItems[i][0] +
            '</label><span class="tooltipwrap"><span class="tooltiptext">' +
            menuItems[i][2] +
            "</span></span></a></li>";
        }
      }
      if (i === imax - 1) {
        newMenu += "</ul></div></div></li>";
      }
    }
  }
  rootMenuUL.innerHTML = newMenu;
  let removeMenuItemsList = document.querySelectorAll(".remove-menu-item");
  Array.from(removeMenuItemsList).forEach(function (menuItem) {
    menuItem.addEventListener("click", confirmRemove);
  });
  let linkMenuContainersList = document.querySelectorAll(
    "ul.menu-link.container"
  );
  Array.from(linkMenuContainersList).forEach(function (menuContainer) {
    Sortable.create(menuContainer, {
      handle: ".drag-handle",
      onEnd: function () {
        let menuID = menuContainer.id.replace("MenuContainer", "");
        let newMenuItems = [];
        newMenuItems[0] = linkMenu[menuID][0];
        let linkItemsList = menuContainer.querySelectorAll("li.menu-link-item");
        Array.from(linkItemsList).forEach(function (linkItem, index) {
          linkItem.setAttribute("data-index", index + 1);
          let URL = linkItem.querySelector("a").getAttribute("href");
          let name = linkItem.querySelector("a label").textContent;
          newMenuItems.push([name, URL, ""]);
        });
        linkMenu[menuID] = newMenuItems;
        localStorage.setItem("menu-items", JSON.stringify(linkMenu));
      },
    });
  });
  let menuLinks = document.querySelectorAll(".menu-link");
  Array.from(menuLinks).forEach(function (link) {
    new PerfectScrollbar(link);
  });
}

function randomLink() {
  let max_1 = linkMenuOrder.length;
  let i = Math.round(Math.random() * max_1);
  let menuID = linkMenuOrder[i];
  let menuItems = linkMenu[menuID];
  max_2 = menuItems.length;
  let j = Math.round(Math.random() * max_2);
  let randomLink = menuItems[j][1];
  window.open(randomLink);
}
document.getElementById("add").addEventListener("click", function () {
  setTimeout(function () {
    buildMenu();
  }, 500);
});
document.getElementById("random-link").addEventListener("click", function () {
  setTimeout(function () {
    randomLink();
  }, 50);
});

function addLinkToMenu(URL, name, menuID) {
  let newIndex = linkMenu[menuID].push([name, URL, ""]) - 1;
  localStorage.setItem("menu-items", JSON.stringify(linkMenu));
  let newLi = document.createElement("li");
  newLi.setAttribute("class", "menu-link-item");
  newLi.setAttribute("data-index", newIndex);
  newLi.innerHTML =
    '<div class="remove-menu-item">x</div><div class="drag-handle"> :: </div><a href="' +
    URL +
    '" target="_blank"><label>' +
    name +
    "</label></a>";
  document
    .getElementById(menuID + "MenuContainer")
    .appendChild(newLi)
    .addEventListener("click", confirmRemove);
  buildMenu();
}

function confirmRemove() {
  let linkElement = this.parentNode;
  let label = this.parentNode.querySelector("label").innerHTML;
  confirmModal.style.display = "block";
  overlay.style.display = "block";
  document.getElementById("modal-label").innerHTML = label;
  document.getElementById("deleteLink").addEventListener(
    "click",
    function () {
      removeLinkFromMenu(linkElement);
      confirmModal.style.display = "none";
      overlay.style.display = "none";
    }, {
      once: true,
    }
  );
}

function removeLinkFromMenu(linkElement) {
  let index = linkElement.getAttribute("data-index");
  let parentMenuContainer = linkElement.parentNode;
  let findID = parentMenuContainer.getAttribute("id");
  let menuID = findID.replace("MenuContainer", "");
  let menuItems = linkMenu[menuID];
  menuItems.splice(index, 1);
  localStorage.setItem("menu-items", JSON.stringify(linkMenu));
  linkElement.remove();
  let linkItemsList = parentMenuContainer.querySelectorAll(".menu-link-item");
  Array.from(linkItemsList).forEach(function (link) {
    link.setAttribute("data-index", index + 1);
  });
}

function openSecretMenuOne() {
  let secretLinksOne = document.createElement("ul");
  secretLinksOne.innerHTML += "<p class='menuTitle'>&nbsp;Private Sites</p>";
  for (let i = 0; i < hiddenLinksOne.length; i++) {
    secretLinksOne.innerHTML +=
      "<li class=' secret-link'><a href=\"" +
      hiddenLinksOne[i][1] +
      "\" target='_blank'><label id='secret-link-label'>" +
      hiddenLinksOne[i][0] +
      "</label></a></li>";
  }
  document.getElementById("secretMenu").appendChild(secretLinksOne);
  secretMenuOne.style.display = "block";
  overlay.style.display = "block";
  document.addEventListener("click", secretMenuClose);
}

function openSecretMenuTwo() {
  let secretLinkListTwo = document.createElement("ul");
  secretLinkListTwo.innerHTML += "<p class='menuTitle'>&nbsp;Porn Sites</p>";
  for (let i = 0; i < hiddenLinksTwo.length; i++) {
    secretLinkListTwo.innerHTML +=
      "<li class=' secret-link'><a href=\"" +
      hiddenLinksTwo[i][1] +
      "\" target='_blank'><label id='secret-link-label'>" +
      hiddenLinksTwo[i][0] +
      "</label></a></li>";
  }
  document.getElementById("secretMenu").appendChild(secretLinkListTwo);
  secretMenuTwo.style.display = "block";
  overlay.style.display = "block";
  document.addEventListener("click", secretMenuClose);
}

function hideSecretMenu() {
  secretMenu.style.display = "none";
  overlay.style.display = "none";
  let list = document.getElementById("secretMenu");
  list.innerHTML = "";
  document.removeEventListener("click", secretMenuClose);
}

function secretMenuClose(event) {
  console.log(event.target.className + event.target.id);
  if (
    event.target.id !== "secretMenu" &&
    event.target.className !== "menuTitle"
  ) {
    secretMenu.style.display = "none";
    overlay.style.display = "none";
    let list = document.getElementById("secretMenu");
    list.innerHTML = "";
    document.removeEventListener("click", secretMenuClose);
  }
  event.stopPropagation();
}

function handleQuery(event, query) {

  let key = event.keyCode || event.which;
  if (query !== "") {
    let url;
    let qList;
    if (key === 32) {
      qList = query.split(" ");
      if (qList[0].charAt(0) === cmdPrefix) {
        let keyword = "";
        for (let i = 0; i < searchSources.length; i++) {
          keyword = cmdPrefix + searchSources[i][0];
          if (keyword === qList[0]) {
            ssi = i;
            searchInput.placeholder = searchSources[ssi][2];
            searchInput.value = query.replace(keyword, "").trim();
            searchsave = ssi;
            SetCookie("engine", searchsave, 365 * 24 * 60 * 60 * 1000);
            event.preventDefault();
            break;
          }
        }
      }
    } else if (key === 13) {
      qList = query.split(" ");
      if (qList[0].charAt(0) === cmdPrefix) {
        let keyword = "";
        for (let i = 0; i < searchSources.length; i++) {
          keyword = cmdPrefix + searchSources[i][0];
          if (keyword === qList[0]) {
            ssi = i;
            break;
          }
        }
        if (qList.length > 1) {
          url = searchSources[ssi][1]
            .replace("{Q}", encodeURIComponent(query.replace(keyword, "")))
            .trim();
          if (GetCookie("new-tab") === "true") {
            window.open(url, "_blank");
          } else {
            window.location = url;
          }
        } else {
          searchInput.placeholder = searchSources[ssi][2];
          searchInput.value = "";
        }
      } else {
        url = searchSources[ssi][1].replace("{Q}", encodeURIComponent(query));
        if (GetCookie("new-tab") === "true") {
          window.open(url, "_blank");
        } else {
          window.location = url;
        }
      }
    }
  }
  if (key === 27) {
    searchInput.blur();
  }
  if (key !== 40 && key !== 38 && key !== 39) {
    fetchAutoComp(searchInput.value)

  }

}

function handleNoteInput(event) {
  let key = event.keyCode || event.which;
  if (key === 27) notesTextarea.blur();
}
let noteText = null;

function handleNotes(event, focus) {
  if (focus) {
    if (!noteText) {
      noteText = GetCookie("notes") || "";
    }
    notesTextarea.value = noteText;
    addClass("notesContainer", "active");
  } else {
    removeClass("notesContainer", "active");
    if (noteText !== notesTextarea.value) {
      noteText = notesTextarea.value;
      SetCookie("notes", noteText, 365 * 24 * 60 * 60 * 1000);
    }
  }
}
let ignoredKeys = [
  9,
  13,
  16,
  17,
  18,
  19,
  20,
  27,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  45,
  46,
  91,
  92,
  93,
  112,
  113,
  114,
  115,
  116,
  117,
  118,
  119,
  120,
  121,
  122,
  123,
  144,
  145,
];
let map = [];

function handleKeydown(event) {
  map[event.keyCode] = event.type === "keydown";
  if (map[16] && map[33]) {
    if (secretMenu.style.display == "block") {
      hideSecretMenu();
    } else {
      openSecretMenuOne();
    }
    return;
  }
  if (map[16] && map[46]) {
    if (secretMenu.style.display == "block") {
      hideSecretMenu();
    } else {
      openSecretMenuTwo();
    }
    return;
  }
  if (
    notesInput === document.activeElement ||
    searchInput === document.activeElement ||
    searchLinksInput === document.activeElement ||
    ignoredKeys.includes(event.keyCode)
  )
    return;
  let isCustomLinksMenuShown =
    window.getComputedStyle(document.getElementById("custom_links_nav"))
    .width !== "0px";
  if (!isCustomLinksMenuShown) {
    searchInput.focus();
  } else {
    let newLinkFormShown = document
      .getElementById("add-link-form")
      .classList.contains("active");
    if (newLinkFormShown) {
      if (!document.querySelector("#add-link-form > #title").value) {
        document.querySelector("#add-link-form > #title").focus();
      }
    } else {
      document.querySelector("#new-link-button > #add-link-btn").click();
    }
  }
}

function addClass(elementID, className) {
  document.getElementById(elementID).classList.add(className);
}

function removeClass(elementID, className) {
  document.getElementById(elementID).classList.remove(className);
}

function GetCookie(name) {
  try {
    let cookie = document.cookie;
    name = CookiePrefix + name;
    let valueStart = cookie.indexOf(name + "=") + 1;
    if (valueStart === 0) {
      return null;
    }
    valueStart += name.length;
    let valueEnd = cookie.indexOf(";", valueStart);
    if (valueEnd == -1) valueEnd = cookie.length;
    return decodeURIComponent(cookie.substring(valueStart, valueEnd));
  } catch (e) {
    console.log(e);
  }
  return null;
}

function SetCookie(name, value, expire) {
  let temp =
    CookiePrefix +
    name +
    "=" +
    escape(value) +
    ";" +
    (expire !== 0 ?
      "expires=" + new Date(new Date().getTime() + expire).toUTCString() + ";sameSite=strict" :
      " path=/;")
  document.cookie = temp;
}

function CanSetCookies() {
  SetCookie("CookieTest", "true", 0);
  let can = GetCookie("CookieTest") !== null;
  DelCookie("CookieTest");
  return can;
}

function DelCookie(name) {
  document.cookie =
    CookiePrefix + name + "=0; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;sameSite=strict";
}
let switcheroo = function (event) {
  handleKeydown(event);
};

function openNav() {
  document.getElementById("mySidenav").style.width = "200px";
  document.getElementById("leftsidemenu").style.marginLeft = "200px";
  document.getElementById("leftsidemenu").style.opacity = "0";
  document.getElementById("leftsidemenu").style.transition = "0.5s";
  document.removeEventListener("keydown", switcheroo);
  document.removeEventListener("keyup", switcheroo);
}

function closeNav() {
  if (lockNav) {
    return;
  }
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("leftsidemenu").style.marginLeft = "0";
  document.getElementById("leftsidemenu").style.opacity = "1";
}

function toggleShowIP() {
  if (document.getElementById("ip").innerHTML == "Show IP") {
    getIPData();
  } else {
    document.getElementById("ip").innerHTML = "Show IP";
  }
}

function getIPData() {
  let request = new XMLHttpRequest();
  request.open("GET", "https://icanhazip.com", true);
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      let data = request.responseText;
      document.getElementById("ip").innerHTML =
        '<a href="https://ipleak.net/"  target="_blank"> ' + data + "</a>";
    } else {}
  };
  request.onerror = function () {};
  request.send();
}

function toggleHideIcons() {
  let menuRoot = rootMenuUL;
  if (showHideItemIcons.checked) {
    menuRoot.classList.add("hide-icons");
    localStorage.setItem("hide-icons", "yes");
  } else {
    menuRoot.classList.remove("hide-icons");
    localStorage.setItem("hide-icons", "no");
  }
}

function toggleOpenNewTab() {
  if (openInNewTab.checked) {
    SetCookie("new-tab", true, 365 * 24 * 60 * 60 * 1000);
  } else {
    SetCookie("new-tab", false, 365 * 24 * 60 * 60 * 1000);
  }
}

function toggleOldReddit() {
  let regex;
  let RedditListItems = document.querySelectorAll("#RedditMenuContainer li");
  if (oldRedditLinks.checked) {

    regex = /(?:www)/;
    Array.from(RedditListItems).forEach(function (item) {
      item.lastChild.href = item.lastChild.href.replace(regex, "old");
    });
    localStorage.setItem("old-reddit", "yes");
  } else {

    regex = /(?:old)/;
    Array.from(RedditListItems).forEach(function (item) {
      item.lastChild.href = item.lastChild.href.replace(regex, "www");
    });
    localStorage.setItem("old-reddit", "no");

  }
}


function toogleSearchSuggestions() {
  if (searchSuggestions.checked) {
    localStorage.setItem("search-suggestions", "yes");
  } else {
    localStorage.setItem("search-suggestions", "no");
  }
  buildHelp()
}


function updateMatrixColor(jscolor) {
  color = "#" + jscolor;
  SetCookie("matrix-color", color, 365 * 24 * 60 * 60 * 1000);
  document.getElementById("colorPicker").jscolor.fromString(color);
}

function togglePicker() {
  let picker = document.getElementById("colorPicker");
  picker.classList.toggle("active");
  document.getElementById("pickerContainer").classList.toggle("active");
  document.getElementById("resetColor").classList.toggle("active");
  if (picker.classList.contains("active")) {
    picker.jscolor.show();
  } else {
    picker.jscolor.hide();
  }
}

function toggleSettings() {
  document.getElementById("toggleSettings").classList.toggle("active");
  document.getElementById("settingsContainer").classList.toggle("active");
}
let settingsFile = null;

function exportUserSettings(settings) {
  let settingsFile = new Blob([JSON.stringify(settings, null, 2)], {
    type: "application/json",
  });
  if (settingsFile !== null) {
    window.URL.revokeObjectURL(settingsFile);
  }
  settingsFile = window.URL.createObjectURL(settingsFile);
  console.log(settingsFile);
  return settingsFile;
}
document.getElementById("exportSettings").addEventListener(
  "click",
  function () {
    userSettings = {
      hideIcons: localStorage.getItem("hide-icons") ?
        localStorage.getItem("hide-icons") : "yes",
      newTab: GetCookie("new-tab") ? GetCookie("new-tab") : false,
      oldRedditOff: localStorage.getItem("old-reddit") ?
        localStorage.getItem("old-reddit") : "yes",
      searchSuggestionFeature: localStorage.getItem("search-suggestions") ?
        localStorage.getItem("search-suggestions") : "yes",
      matrixColor: color,
      animation: GetCookie("animation") ? GetCookie("animation") : canvasBg,
      searchEngine: GetCookie("engine"),
      backgroundImg: url_str.match(/[0-9]/),
      notes: GetCookie("notes"),
      links: localStorage.getItem("menu-items"),
    };
    let link = document.createElement("a");
    link.setAttribute("download", "weboasis-settings.json");
    link.href = exportUserSettings(userSettings);
    console.log(link.href);
    document.body.appendChild(link);
    window.requestAnimationFrame(function () {
      let event = new MouseEvent("click");
      link.dispatchEvent(event);
      document.body.removeChild(link);
    });
  },
  false
);

function updateSettings(userSettings) {
  localStorage.setItem("hide-icons", userSettings.hideIcons);
  localStorage.setItem("old-reddit", userSettings.oldRedditOff);
  localStorage.setItem("search-suggestions", userSettings.searchSuggestionFeature)

  localStorage.setItem("menu-items", userSettings.links);
  userSettings.newTab === "true" ?
    (SetCookie("new-tab", true, 365 * 24 * 60 * 60 * 1000),
      (openInNewTab.checked = true)) :
    SetCookie("new-tab", false, 365 * 24 * 60 * 60 * 1000);

  SetCookie(
    "matrix-color",
    userSettings.matrixColor,
    365 * 24 * 60 * 60 * 1000
  );
  SetCookie("animation", userSettings.animation, 365 * 24 * 60 * 60 * 1000);
  if (userSettings.searchEngine) {
    SetCookie("engine", userSettings.searchEngine, 365 * 24 * 60 * 60 * 1000);
  }
  if (userSettings.notes) {
    SetCookie("notes", userSettings.notes, 365 * 24 * 60 * 60 * 1000);
  }
  if (userSettings.backgroundImg) {
    localStorage.setItem("background_id", userSettings.backgroundImg[0]);
  }
}

function importSettings() {
  let fReader = new FileReader();

  let fileInput = document.getElementById("importSettings");
  let filePath = fileInput.value;
  let allowedExtension = /(\.json)$/i;
  if (!allowedExtension.exec(filePath)) {
    alert("Please upload only the exported .json file");
    fileInput.value = "";
    return;
  } else {
    fReader.onload = function () {
      let fileData = fReader.result;
      try {
        userSettings = JSON.parse(fileData);
        updateSettings(userSettings);
        setTimeout(function () {
          window.location.reload();
        }, 300);
      } catch (error) {
        alert("Invalid file!");
        console.log(error);
      }
    };
  }
  fReader.readAsText(fileInput.files[0]);
}

function toggleAnimations() {
  document.getElementById("customAnimationsBtn").classList.toggle("active");
  document.getElementById("customAnimationsList").classList.toggle("active");
  document.getElementById("matrix").classList.toggle("active");
}
let head = document.getElementsByTagName("head")[0];
let animationsBtnList = document.querySelectorAll(".animationBtn");
Array.from(animationsBtnList).forEach(function (btn) {
  btn.addEventListener("click", function () {
    if (canvasBg === btn.id) {
      return;
    }
    canvasBg = btn.id;
    clearOldCanvas();
    globalResetBackground();
    setAnimation(btn.id);
    SetCookie("animation", btn.id, 365 * 24 * 60 * 60 * 1000);
    window.location.reload(true);
  });
});

function clearOldCanvas() {
  let scripts = document.getElementsByTagName("script");
  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].src.search("canvas") != -1) {
      head.removeChild(scripts[i]);
    }
  }
  let canvasContainer = document.getElementById("canvasContainer");
  while (canvasContainer.firstChild) {
    contex = canvasContainer.firstChild.getContext("2d");
    contex.save();
    contex.setTransform(1, 0, 0, 1, 0, 0);
    contex.clearRect(
      0,
      0,
      canvasContainer.firstChild.width,
      canvasContainer.firstChild.height
    );
    contex.restore();
    canvasContainer.removeChild(canvasContainer.firstChild);
  }
}

function setAnimation(canvasBg) {
  let js = document.createElement("script");
  js.type = "text/javascript";
  js.src = "js/canvas/" + canvasBg + ".js";
  head.appendChild(js);
}

function resetAllToDefault() {
  localStorage.setItem("menu-items", JSON.stringify(defaultLinkMenu));
  buildMenu();
  globalResetBackground();
  DelCookie("engine");
  DelCookie("notes");
  DelCookie("new-tab");
  DelCookie("animation");
  DelCookie("matrix-color");
  notesTextarea.value = "";
  noteText = "";
  color = "#0C85D3";
  localStorage.setItem("hide-icons", "yes");
  localStorage.setItem("old-reddit", "yes");
  localStorage.setItem("search-suggestions", "yes");

  if (openInNewTab.checked) {
    openInNewTab.click();
  }

  setTimeout(function () {
    window.location.reload();
  }, 100);
}
var isDefaultSearch = true;
function switchSearch() {
  const defaultSearch = document.getElementById("searchBar");
  const linkSearch = document.getElementById("searchLinks");
  const container = document.getElementById("menuContainer");
  if (isDefaultSearch) {
    defaultSearch.value = "";
    defaultSearch.style.display = "none";
    linkSearch.style.display = "block";
    container.style.marginTop = "3.1em";
    isDefaultSearch = false;
    return;
  }
  if (!isDefaultSearch) {
    searchLinks.value = "";
    defaultSearch.style.display = "block";
    linkSearch.style.display = "none";
    container.style.marginTop = "0px";
    isDefaultSearch = true;
    return;
  }
}
const style = [
  "background: #0280cf",
  "color: #fff",
  "padding: 10px 20px",
  "line-height: 35px",
].join(";");
console.log("%c WebOas.is", style);
