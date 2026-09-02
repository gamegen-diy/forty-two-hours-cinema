// FORTY-TWO HOURS — a playable Juliet. CINEMA scene data (engine: odyssey_cinema index.html contract).
//
// STAT MAPPING (engine hard-codes exactly three 0-100 bars: glory / wisdom / heart —
// display names live in config/language/en.json under ui.*):
//   glory  -> BOLDNESS   (breaking the script in the open; defiance that costs you cover)
//   wisdom -> CUNNING    (buying time, working the plan, staying unwatched)
//   heart  -> DEVOTION   (people who will move for you: Romeo, the Nurse, Friar Laurence)
//
// Media slot contract: media:{img:'bg_<id>_a.jpg'} — BARE filename, resolved by assetUrl()
// (resolver.js three-layer fallback -> ?style= / commonPath / common/ / root). Files ship in common/.
// VO contract: engine auto-loads 'sfx_voice_en_<id lowercase>_a.mp3' for every beat/choice scene.
// vo: narration = the subtitle lines, split on '|'. prompt: image-gen prompt (2:3 vertical film still).
// Source: Shakespeare's public-domain play skeleton ONLY. No film adaptation lines, casting or settings.
const SCENES = {

// 2026-08-31 Pizza 定案遊戲名稱「羅密歐與茱麗葉之我又重生了」：h1=姓名(讓人一眼認出是誰的故事)、
// sub=哏(重生/記得結局)，沿用原本 h1/vsub 兩層結構，不動 tagline。
S01:{type:'title', title:'ROMEO & JULIET', sub:'I GOT REBORN AGAIN', tagline:'She has already died once. This time she has a deadline.', btn:'▶ Begin',
 media:{img:'bg_s01_a.jpg'},
 // 2026-08-31 Pizza：片頭像陽春文字卡不像電影海報，換成有兩位主角的海報級構圖（原圖是空墓穴+蠟燭，換掉）
 prompt:'Cinematic movie poster key art, vertical 2:3 portrait: Romeo and Juliet standing close back-to-back in extreme foreground, half-body, his dark velvet doublet and her pale gown catching warm torchlight from below, both gazing past camera with quiet longing and intensity, a crumbling stone bell tower and starlit dusk sky behind them, thin drifting mist, dramatic teal-and-gold cinematic color grade, strong rim lighting, shallow depth of field, photorealistic film-poster quality, generous empty space at top and bottom of frame for title text, photorealistic, generic period faces only — must not resemble any real actor or living person, must not reference any film adaptation, no text, no logo, no watermark',
 goto:'S02'},

// 2026-08-31 拆幕（Pizza 拍板②A）：原 16 秒拼接片拆回 A1/A2 兩場，字幕各歸各的畫面——
// 他喝毒那 8 秒配羅密歐的遺言（莎翁原句 Act 5 Scene 3），她抱屍那 8 秒才配茱麗葉的話。
// 2026-09-02 重做：先說遺言→喝→痛苦倒下（vid_s02_a.mp4，10 秒）；舊無台詞版 vid_s02_a1 留在 video_work
// 2026-09-02 二修：圖從「他+她的屍體同框」改成緊湊在他一人身上（她仍在原地，只是這鏡頭沒帶到）——
// 含台詞版連撞 4 次 Flow 政策拒絕（未扣點），懷疑是「喝+背景可見靜止身體」這個畫面組合本身觸發，
// 換掉構圖後同一句台詞才過關，見 TEST_LOG 9/2 段。
S02:{type:'beat', phase:'THE TOMB', objective:'Remember how it ended',
 media:{img:'bg_s02_a.jpg', video:'vid_s02_a.mp4'}, kb:'kb-in',
 // 2026-09-02 四修：影片音軌實際只留得住「Here's to my love.」這句短的（見下方 prompt 註解），
 // caption/vo 改成跟影片實際講的一字不差——不能再犯「字幕跟畫面對不上」那個錯（這次改版起因就是它）。
 caption:'Here\'s to my love.',
 vo:'The vault at night. He believes you dead.|"Here\'s to my love."|He drinks, and the cup falls from his open hand.',
 // 2026-09-02 三修：小玻璃瓶連換 3 種台詞/動作寫法都被拒(見 TEST_LOG)，換道具測最後一個變數——
 // 改成高腳杯(像敬酒，不像喝藥)，同一個致命劇情，純粹換視覺讀法測是否為道具本身觸發分類器。
 prompt:'Renaissance Verona film still, vertical 2:3: tight close shot of a young man in a dark doublet kneeling in a candlelit stone tomb at night, raising a silver wine goblet toward the camera as if giving a solemn toast, his face lit by warm candlelight against deep shadow, the background completely dark and out of focus so nothing else is visible behind him, photorealistic, grief and resolve, no text',
 goto:'S02a'},

// flash:true = 離場時真的閃一下白光再切下一幕（跟影片本身結尾的白光bloom銜接）
// A2 因Flow內容政策擋掉所有含台詞版本，最終是純視覺無對白版；caption文字照樣疊字幕。
// 2026-09-02 Pizza 鐵律「每支影片都要有台詞」：抱屍構圖含台詞四種版本全被 Flow 擋（8/27），
// 改成她的臉部特寫反應鏡頭（他不入鏡＝沒有死亡畫面），台詞才放得進影片。新圖 bg_s02a_a.jpg。
S02a:{type:'beat', phase:'THE TOMB', objective:'Refuse this ending',
 media:{img:'bg_s02a_a.jpg', video:'vid_s02a_a.mp4'}, kb:'kb-in', flash:true,
 caption:'If I had one more chance... I would never let you die.',
 vo:'Cold stone. You wake to an empty cup beside him.|"If I had one more chance — I would never let you die."|Then white light takes the tomb, and the night begins again.',
 spoiler:'🔮 YOU ALREADY READ THIS ENDING: the letter never reaches Mantua. Change that, change everything.',
 prompt:'Renaissance Verona film still, vertical 2:3: extreme close-up of a young woman\'s tear-streaked face inside a candlelit stone tomb, dark braided hair, eyes glistening, lips parted as if about to speak, warm candle gold against cold blue moonlight, shallow depth of field, photorealistic, grief turning to resolve, no text',
 goto:'S02b'},

S02b:{type:'beat', phase:'VERONA — BEFORE THE MASQUE', objective:'Say it out loud',
 media:{img:'bg_s02b_a.jpg', video:'vid_s02b_a.mp4'}, kb:'kb-in',
 caption:'I\'m... alive again? This time, I will not let you die, Romeo.',
 vo:'Her own heartbeat, loud as a drum.|The mirror shows a girl who has not yet been to a funeral.|Downstairs the musicians are tuning. The masque is about to begin.',
 prompt:'Renaissance Verona film still, vertical 2:3: a young woman in a fine gown seated before a candlelit vanity mirror in a stone chamber, one hand pressed to her chest, eyes wide as if waking from a vivid dream, warm candle glow, photorealistic, wonder and resolve, no text',
 goto:'S03'},

S03:{type:'beat', phase:'VERONA — THE MASQUE', objective:'Walk in like it is the first time',
 media:{img:'bg_s03_a.jpg'}, kb:'kb-out',
 vo:'Torches. Masks. The same song, played at the same hour.|You are breathing. Nothing has happened yet.|You know every page of this. Tonight you burn one.',
 prompt:'Renaissance Verona film still, vertical 2:3: a torch-lit Renaissance ballroom crowded with masked dancers in crimson and gold velvet, warm firelight, a frescoed stone hall, motion blur of skirts, photorealistic, opulent and slightly menacing, no text',
 goto:'S04'},

S04:{type:'beat', phase:'VERONA — THE MASQUE', objective:'He does not know yet',
 media:{img:'bg_s04_a.jpg', video:'vid_s04_a.mp4'}, kb:'kb-left',
 caption:'I don’t know your name. I already know I’m in trouble.',
 vo:'Across the hall: Romeo. Whole. Laughing at something small.|You buried this boy. He has not even met you.|Smile. Let nothing on your face give the ending away.',
 prompt:'Renaissance Verona film still, vertical 2:3: a young man in a dark velvet doublet and half-mask seen across a crowded candlelit ballroom, shallow focus so the crowd blurs, warm amber light on his face, photorealistic intimate portrait, generic period face, no text',
 goto:'S04b'},

S04b:{type:'beat', phase:'VERONA — THE MASQUE', objective:'Let it happen again',
 media:{img:'bg_s04b_a.jpg', video:'vid_s04b_a.mp4'}, kb:'kb-in',
 caption:'My hand is a poor pilgrim. It has walked all night for one blessing.',
 vo:'He crosses the hall like it is the easiest thing in the world.|"My hand is a poor pilgrim," he says, raising his palm to yours. "It has walked all night for one blessing."|"Then pray properly, pilgrim. Palms touching — that is how saints kiss."',
 prompt:'Renaissance Verona film still, vertical 2:3: in a candlelit ballroom alcove, a young man in a dark velvet doublet and a young woman in a fine gown stand close, palm pressed to palm, both half-masked, eyes locked, warm amber light, dancers blurred behind them, photorealistic, intimate and electric, no text',
 goto:'S04c'},

S04c:{type:'choice', phase:'VERONA — THE MASQUE', objective:'The first page of everything',
 media:{img:'bg_s04c_a.jpg'},
 vo:'"Then pray properly, pilgrim. Palms touching — that is how saints kiss."|The music slows. He is close enough now that the candle heat on your face is his.',
 prompt:'Renaissance Verona film still, vertical 2:3: close two-shot in a candlelit alcove, a half-masked young man leaning slowly toward a half-masked young woman, faces near, her chin lifted, candle flames soft behind them, photorealistic, breath-held anticipation, no text',
 ask:'You know this kiss. It is the first page of everything. How does it happen this time?',
 intel:'👁 The kiss is not a choice. The script only argues about how.',
 options:[
  {label:'Let it land exactly as it did the first time.', tone:'SCRIPT', fx:{heart:8}, goto:'S04d'},
  {label:'Kiss him first. Rewrite the opening line.', tone:'BOLD', fx:{glory:8,heart:4}, goto:'S04d'},
  {label:'Hold the palm one beat longer. Make him wonder.', tone:'CUNNING', fx:{wisdom:8}, goto:'S04d'}]},

S04d:{type:'beat', phase:'VERONA — THE MASQUE', objective:'The first kiss, again',
 // 影片完成 2026-08-27：額頭相貼版，簡單中文動作描述一次過審
 media:{img:'bg_s04d_a.jpg', video:'vid_s04d_a.mp4'}, kb:'kb-out',
 // 2026-09-02 補台詞（Pizza 鐵律）：額頭相貼後她說原著 Act 1 Scene 5 這句；舊無台詞版留 video_work
 caption:'You kiss by the book.',
 vo:'The kiss lands — brief, soft, and it still ends the world.|"You kiss by the book."|Then the Nurse is at your elbow, and the night moves on.',
 prompt:'Renaissance Verona film still, vertical 2:3: close two-shot in a candlelit ballroom alcove, a half-masked young man and a half-masked young woman in a tender embrace, foreheads touching, eyes closed, both smiling faintly, her hand on his sleeve, behind them an older nursemaid in period dress approaching from the blurred crowd, warm torchlight, photorealistic, tender and secret, no text',
 goto:'S04e'},

S04e:{type:'beat', phase:'VERONA — THE MASQUE', objective:'Act like you did not know',
 // 2026-09-02 補影片（優化規劃 v2 §4）：奶媽揭身分＋她的名句，兩句台詞 10 秒
 media:{img:'bg_s04e_a.jpg', video:'vid_s04e_a.mp4'}, kb:'kb-left',
 caption:'His name is Romeo, and a Montague.|My only love sprung from my only hate.', capAt:[0,5.5], // Whisper 量測實際開口時間（v2 重生後時間點變了）
 vo:'Then the Nurse leans in with the name you have known for a lifetime: Montague.|Last time, that word split the night open. Tonight you must act as if it still can.|"My only love sprung from my only hate." You even remember your own line.',
 prompt:'Renaissance Verona film still, vertical 2:3: an older nursemaid in period dress whispering urgently to a young masked woman at the edge of a candlelit ballroom, the young woman glancing across the hall toward a departing young man in a dark doublet, warm torchlight, photorealistic, secret and quiet shock, no text',
 goto:'S05'},

S05:{type:'choice', phase:'FIRST MOVE', objective:'Choose how to spend the night',
 media:{img:'bg_s05_a.jpg'},
 vo:'He is gone into the crowd, and the name Montague hangs in the air.|You know how tonight ends. You know how everything ends.',
 prompt:'Renaissance Verona film still, vertical 2:3: a masked young woman standing alone at the edge of a bright ballroom, hand resting on a carved stone balustrade, watching the dancers, candle chandeliers behind her, photorealistic, poised and calculating, no text',
 ask:'The script says: balcony, vows, a secret wedding at dawn. What do you do with what you know?',
 intel:'👁 Every hour you spend watching is an hour the story keeps.',
 options:[
  {label:'Follow the script. Be on the balcony when he comes.', tone:'PATIENT', fx:{wisdom:8}, goto:'S06b'},
  {label:'Meet him in the garden first. Skip the script three pages.', tone:'RECKLESS', fx:{glory:8,heart:5}, goto:'S06b'},
  {label:'Before he leaves, warn him: stay away from Tybalt tomorrow.', tone:'CALCULATING', fx:{wisdom:5,glory:4}, flag:'WarnedRomeo', goto:'S06b'}]},

S06b:{type:'beat', phase:'THE ORCHARD WALL', objective:'Say the thing out loud',
 media:{img:'bg_s06b_a.jpg', video:'vid_s06b_a.mp4'}, kb:'kb-in',
 caption:'But soft, what light through yonder window breaks? It is the east, and Juliet is the sun.',
 vo:'He finds the wall under your window somehow — climbs it like a man who has never once considered falling.|"But soft, what light through yonder window breaks? It is the east, and Juliet is the sun."|You have read this line a hundred times. It has never once sounded like this.',
 prompt:'Renaissance Verona film still, vertical 2:3: a moonlit stone balcony at night on a Renaissance villa, a young woman in a pale nightgown leaning on the stone balustrade looking down with longing, warm candlelight glowing from the open window behind her, below in the walled garden among dark cypress and climbing roses a young man in a dark doublet stands looking up at her, moonlight and candlelight mixing, romantic, hopeful, quiet, photorealistic, no text',
 goto:'S06d'},

// 補洞（2026-08-27 QA 二輪）：S06b 原本只演羅密歐開口那句台詞，S06 直接跳到隔天旁白說「證婚了」——
// 兩人互許終身這件事本身從沒被玩家看到過，違反同一條「經典橋段要先發生」原則。這場補上「求婚+立誓」。
S06d:{type:'beat', phase:'THE ORCHARD WALL', objective:'Make the promise real',
 // 2026-09-02 補影片（優化規劃 v2 §4 優先 1）
 media:{img:'bg_s06d_a.jpg', video:'vid_s06d_a.mp4'}, kb:'kb-out',
 caption:'If your intentions are honourable, and your purpose marriage — send me word tomorrow.',
 vo:'You lean further over the rail than caution allows — love, if it is real, does not need a whole night of games.|"If your intentions are honourable, and your purpose marriage, send me word tomorrow, and I will follow you the whole world over."|He swears it without a heartbeat of hesitation. Tomorrow. A priest. A ring neither family has blessed. By the time the candle gutters, you have already promised yourselves to each other.',
 prompt:'Renaissance Verona film still, vertical 2:3: moonlit stone balcony at night, close two-shot from a lower angle, a young woman in a pale nightgown leaning far over a stone balustrade with her hand reaching down, a young man on the ground below reaching up to meet it, fingertips almost touching, warm candlelight from the window above mixing with cool moonlight, climbing roses and dark cypress in the walled garden below, photorealistic, tender and urgent, no text',
 goto:'S06'},

S06:{type:'beat', phase:'THE CELL AT DAWN', objective:'Fix the weak link',
 // 2026-09-02 補影片（優化規劃 v2 §4）：神父名句
 media:{img:'bg_s06_a.jpg', video:'vid_s06_a.mp4'}, kb:'kb-in',
 caption:'These violent delights have violent ends.',
 vo:'Friar Laurence marries you at dawn, then explains the sleeping draught.|You stop him. The draught is clever. The letter is not.|This time the letter does not travel alone.',
 prompt:'Renaissance Verona film still, vertical 2:3: a small stone monastery cell at dawn, an elderly friar in brown robes at a wooden table crowded with dried herbs and glass vials, one shaft of cold morning light through a narrow window, photorealistic, quiet conspiracy, no text',
 goto:'S07'},

S07:{type:'beat', phase:'THE STREET', objective:'The clock starts',
 // 2026-09-02 補影片（優化規劃 v2 §4，政策高風險）：茂丘西奧負傷名句
 media:{img:'bg_s07_a.jpg', video:'vid_s07_a.mp4'}, kb:'kb-right',
 caption:'A plague on both your houses!',
 vo:'Tybalt kills Mercutio. Romeo kills Tybalt. The street stops arguing.|By sunset Romeo is banished to Mantua.|Forty-two hours until he buys the poison. Starting now.',
 // 2026-09-02：補影片要有人說台詞（茂丘西奧 "A plague on both your houses!"），圖從空街改成他負傷靠牆；不畫血（政策）
 prompt:'Renaissance Verona film still, vertical 2:3: a narrow sunlit stone street at noon, a young man in a slashed doublet leaning against a stone wall, one hand pressed to his side, a bitter defiant grin, a dropped rapier at his feet, dust hanging in the harsh white light, blurred onlookers in period dress behind him, photorealistic, no visible blood, no text',
 goto:'S06c'},

// Canon order: the wedding night falls AFTER Tybalt's death and the banishment (Act 3 Scene 5).
S06c:{type:'beat', phase:'ONE NIGHT', objective:'The only happy page',
 // 2026-09-02 補影片（優化規劃 v2 §4 優先 2）：夜鶯／雲雀雙人對白，10 秒
 media:{img:'bg_s06c_a.jpg', video:'vid_s06c_a.mp4'}, kb:'kb-in',
 caption:'It was the nightingale, and not the lark.|It was the lark, the herald of the morn.', capAt:[0,4.0], // Whisper 量測實際開口時間
 vo:'One night. The only page of the story where nobody is running.|Then the lark sings, and he swears it is the nightingale, and you both know better.|He goes down the ladder, and your hand is the last thing to let go.',
 prompt:'Renaissance Verona film still, vertical 2:3: first light of dawn through an open casement window of a stone bedchamber, a young man in a loose white shirt at the window ledge about to climb down a rope ladder, a young woman in a pale nightgown holding his hand from inside, pale gold and grey light, photorealistic, tender farewell, no text',
 goto:'S07b'},

S07b:{type:'choice', phase:'THURSDAY', objective:'Buy yourself hours',
 media:{img:'bg_s07b_a.jpg'},
 vo:'Your father names the day. Thursday. Count Paris. No argument.|Your hand is money he has already spent.',
 prompt:'Renaissance Verona film still, vertical 2:3: a severe wealthy Italian nobleman in dark furred robes standing over a seated young woman in a shadowed stone hall, cold light from a high window, tense distance between them, photorealistic, domestic menace, generic period faces, no text',
 ask:'The draught needs time. How do you buy it?',
 intel:'👁 A daughter who agrees is a daughter nobody watches.',
 options:[
  {label:'Agree to Paris. Smile. Take the days you need.', tone:'COLD', fx:{wisdom:9}, flag:'PlayedAlong', goto:'S08'},
  {label:'Bring the Nurse in. You need a second pair of hands.', tone:'TRUSTING', fx:{heart:8,wisdom:3}, flag:'NurseInside', goto:'S08'},
  {label:'Refuse him now, loudly, in front of the whole house.', tone:'DEFIANT', fx:{glory:10,wisdom:-8}, goto:'D1'}]},

S08:{type:'choice', phase:'THE LETTER', objective:'Get it to Mantua',
 media:{img:'bg_s08_a.jpg'},
 vo:'Plague has closed the roads. Every gate has a checkpoint now.|One letter has to reach Mantua before the rumour does.',
 prompt:'Renaissance Verona film still, vertical 2:3: a sealed letter with red wax on a rough wooden table beside a candle stub and a riding glove, a dark window showing torches at a city gate beyond, photorealistic, close and urgent, no text visible on the paper',
 ask:'Who carries the letter?',
 intel:'👁 Plague quarantine stops monks. Gold moves faster than faith.',
 options:[
  {label:'The Friar’s own order. The proper road, the slow one.', tone:'FAITHFUL', fx:{heart:7}, flag:'MonkCourier', goto:'S09'},
  {label:'Hire a rider. Fast, silent, paid not to ask.', tone:'PRACTICAL', fx:{wisdom:7}, flag:'HiredRider', goto:'S09'},
  {label:'Sell your jewellery. Ride for Mantua yourself, tonight.', tone:'HEADLONG', fx:{glory:9,heart:4,wisdom:-3}, flag:'RodeHerself', goto:'S09'}]},

S09:{type:'meter', phase:'THE RACE', objective:'Beat the rumour to Mantua',
 // 2026-08-31 Pizza 拍板：追信關全程用騎馬狂奔影片當動態背景（loop），Flow i2v 生成（uuid a3e45b8e）
 // 2026-09-02 重做：她在馬背上喊一句（有聲）；說一次就定格，不循環（Pizza 拍板）
 media:{img:'bg_s09_a.jpg', video:'vid_s09_a.mp4', loop:false},
 prompt:'Renaissance Verona film still, vertical 2:3: a lone rider in a dark travelling cloak galloping a lathered horse along a dusty Italian country road at dusk, cypress trees, distant walled hill town, long low sun and streaming dust, photorealistic, urgency and speed, no text',
 title:'THE RACE', goalText:'Reach Mantua before the news of your death does. Then he never buys poison.',
 start:25, gold:68,
 rounds:[
  {ask:'A quarantine line across the road. Fever tents. Guards turning everyone back.',
   intel:'👁 Guards on plague duty are underpaid and a long way from home.',
   options:[
    {label:'Give the captain your mother’s ring.', tone:'COSTLY', delta:18, react:'The ring vanishes into his glove. The barrier lifts.'},
    {label:'Argue. Tell them exactly whose daughter you are.', tone:'ENTITLED', delta:-12, react:'A Capulet name buys nothing out here. They wave you off.'},
    {label:'Wait for dark. Walk the ditch past the tents.', tone:'PATIENT', delta:7, react:'You get through. It costs four hours of the forty-two.'}]},
  {ask:'The horse is finished. One drover, one fresh bay, one bad price.',
   intel:'👁 He knows exactly how badly you need it. So do you.',
   options:[
    {label:'Pay whatever he asks. Do not haggle.', tone:'DECISIVE', delta:17, react:'You leave broke and moving. Moving is the only currency left.'},
    {label:'Take the bay while he sleeps.', tone:'DESPERATE', delta:-14, react:'He wakes. You run the next miles on your own feet.'},
    {label:'Trade your wedding dress for his donkey.', tone:'THRIFTY', delta:6, react:'A donkey is not fast. A donkey is not nothing.'}]},
  {ask:'The road forks. The short way is under brown water. The long way climbs.',
   intel:'👁 Four hours saved is four hours he is still alive.',
   options:[
    {label:'Swim the horse across. Now.', tone:'HEADLONG', delta:16, react:'You come out the far bank soaked, shaking, and hours ahead.'},
    {label:'Take the long climb. Late, but arriving.', tone:'SAFE', delta:5, react:'The hills cost you four hours. The letter is still dry.'},
    {label:'Turn back and look for a ferry.', tone:'CAUTIOUS', delta:-11, react:'There is no ferry. There is only the time you spent looking.'}]},
  {ask:'A rider comes the other way. Balthasar, carrying the news of your death.',
   intel:'👁 Whatever he tells Romeo first is the version Romeo believes.',
   options:[
    {label:'Stop him. Show him your face. Let him look.', tone:'PROOF', delta:17, react:'He stares at a dead girl who is breathing, and turns around.'},
    {label:'Ride past. Let him get there first.', tone:'FATAL', delta:-16, react:'He rides on with your funeral in his mouth.'},
    {label:'Pull him down and take his packet.', tone:'VIOLENT', delta:4, react:'You win the packet. He runs for Mantua anyway, on foot.'}]}],
 win:'S10a', fail:'S10b'},

S10a:{type:'results', phase:'ENDING',
 // 2026-08-31 Pizza 拍板：成功結局=相擁+台詞影片（Flow i2v，uuid 16b53af2；台詞 Whisper 驗過）。
 // 不 muted：他的台詞 "This time, I was here when you woke." 是這場戲的點，loop 隨卡片循環。
 media:{img:'bg_s10a_a.jpg', video:'vid_s10a_a.mp4', loop:false}, // 2026-09-02 台詞說一次就定格
 title:'THE SECOND LETTER',
 // 2026-08-31 Pizza 拍板：成功結局要「相擁+台詞」影片。圖 prompt 從「空墓+信」改成兩人晨光相擁（當影片起始幀）；舊圖備份在 docs/BACKUP_20260831/
 prompt:'Renaissance Verona film still, vertical 2:3: dawn light flooding into an open stone crypt, a young woman in a pale gown just risen from the bier and a young man in a dark doublet holding her in a close embrace, foreheads touching, both smiling through tears, warm gold morning light replacing the cold blue night, photorealistic, overwhelming relief and tenderness, no text',
 body:'The letter reached Mantua with six hours to spare. Romeo never found the apothecary.|He was sitting in the dark of the tomb when you opened your eyes.|Two families came expecting a funeral and got an argument instead.',
 // 2026-08-31 三圍作用（Pizza 拍板①A）：結局依最高的那一項屬性加一句客製化尾聲。
 // 引擎 veilResults() 取 glory/wisdom/heart 最大值選 epiGlory/epiWisdom/epiHeart，平手時 heart 優先。
 epiGlory:'Verona will tell this as the tale of the girl who tore up the script in the open — and dared the ending to stop her.',
 epiWisdom:'No ballad will ever mention how quietly it was done. That was the plan, and the plan held.',
 epiHeart:'You did not outrun fate alone. You were carried by everyone who loved you — and this time, you let them.',
 next:'CHAPTER 2: TWO HOUSES, STILL STANDING',
 nextNote:'Not yet written.',
 btn:'↻ Run the forty-two hours again'},

S10b:{type:'results', phase:'ENDING',
 // 2026-08-31 Pizza 拍板：悲劇結局背景重用開場 S02a 影片（首尾呼應）；9/2 改吃新台詞版、說一次就定格
 media:{img:'bg_s10b_a.jpg', video:'vid_s02a_a.mp4', loop:false},
 title:'NO WHITE LIGHT',
 prompt:'Renaissance Verona film still, vertical 2:3: a cold stone tomb interior at night, one burnt-out candle, a young man lying still on a bier, an empty vial on the floor, harsh blue moonlight, no warmth anywhere, photorealistic, bleak and final, no text',
 body:'The rumour got to Mantua first. It always travelled lighter than paper.|You wake to the same cold hand and the same empty vial.|This time the light does not come. This time you stay.',
 epiGlory:'You were bold enough to break every rule but one: the clock was never impressed by courage.',
 epiWisdom:'Every trick worked except the last. The rumour was the better schemer.',
 epiHeart:'They all loved you. Love simply reached Mantua second.',
 next:'THE STORY AS WRITTEN',
 nextNote:'You knew every page. Knowing was not enough.',
 btn:'↻ Try the forty-two hours again'},

D1:{type:'death',
 media:{img:'bg_d1_a.jpg'},
 title:'CAUSE OF DEATH: THURSDAY',
 prompt:'Renaissance Verona film still, vertical 2:3: a heavy studded wooden door closed and barred from the outside in a stone corridor, a thin line of light underneath, an untouched supper tray on the floor, photorealistic, claustrophobic, no text',
 body:'You refused Paris in front of the whole house. Your father moved the wedding up.|The door locked from the outside. The letter was never written.|Forty-two hours, and you spent none of them.',
 btn:'💀 Rewind to Thursday (you remember everything)',
 goto:'S07b'}
};
if (typeof module!=='undefined') module.exports = {SCENES};
