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

S01:{type:'title', title:'FORTY-TWO HOURS', sub:'A JULIET WHO REMEMBERS', tagline:'She has already died once. This time she has a deadline.', btn:'▶ Begin',
 media:{img:'bg_s01_a.jpg'},
 prompt:'Renaissance Verona film still, vertical 2:3: a stone crypt doorway at night lit by one guttering candle, a small glass vial on the cold flagstones, long shadows, no people, photorealistic, ominous stillness, no text',
 goto:'S02'},

S02:{type:'beat', phase:'THE TOMB', objective:'Remember how it ended',
 media:{img:'bg_s02_a.jpg', video:'vid_s02_a.mp4'}, kb:'kb-in',
 caption:'I remember this. Not this time.',
 vo:'Cold. His mouth still tastes of the poison.|The empty vial is warm. His hand is not.|Then white light takes the tomb, and everything starts again.',
 spoiler:'🔮 YOU ALREADY READ THIS ENDING: the letter never reaches Mantua. Change that, change everything.',
 prompt:'Renaissance Verona film still, vertical 2:3: interior of a candlelit stone tomb, a young woman kneeling over a still young man on a bier, an empty glass vial fallen from his open hand, cold blue moonlight through a grate mixing with candle gold, photorealistic, grief and hush, no text',
 goto:'S03'},

S03:{type:'beat', phase:'VERONA — THE MASQUE', objective:'You are alive again',
 media:{img:'bg_s03_a.jpg'}, kb:'kb-out',
 vo:'Torches. Masks. The same song, played at the same hour.|You are breathing. Nothing has happened yet.|You know every page of this. Tonight you burn one.',
 prompt:'Renaissance Verona film still, vertical 2:3: a torch-lit Renaissance ballroom crowded with masked dancers in crimson and gold velvet, warm firelight, a frescoed stone hall, motion blur of skirts, photorealistic, opulent and slightly menacing, no text',
 goto:'S04'},

S04:{type:'beat', phase:'VERONA — THE MASQUE', objective:'He does not know yet',
 media:{img:'bg_s04_a.jpg', video:'vid_s04_a.mp4'}, kb:'kb-left',
 caption:'I don’t know your name. I already know I’m in trouble.',
 vo:'Across the hall: Romeo. Whole. Laughing at something small.|You buried this boy. He has not even met you.|Smile. Let nothing on your face give the ending away.',
 prompt:'Renaissance Verona film still, vertical 2:3: a young man in a dark velvet doublet and half-mask seen across a crowded candlelit ballroom, shallow focus so the crowd blurs, warm amber light on his face, photorealistic intimate portrait, generic period face, no text',
 goto:'S05'},

S05:{type:'choice', phase:'FIRST MOVE', objective:'Change something. Anything.',
 media:{img:'bg_s05_a.jpg'},
 vo:'The hall is gold and noise, and the clock is already running.|One night decides whose funeral you attend.',
 prompt:'Renaissance Verona film still, vertical 2:3: a masked young woman standing alone at the edge of a bright ballroom, hand resting on a carved stone balustrade, watching the dancers, candle chandeliers behind her, photorealistic, poised and calculating, no text',
 ask:'You know how tonight ends. What is your first move?',
 intel:'👁 Every hour you spend watching is an hour the story keeps.',
 options:[
  {label:'Cut through the crowd. Reach Romeo first, and openly.', tone:'RECKLESS', fx:{glory:8,heart:5}, goto:'S06b'},
  {label:'Let the night replay exactly. Learn it. Change nothing yet.', tone:'PATIENT', fx:{wisdom:8}, goto:'S06b'},
  {label:'Forget Romeo. Watch Tybalt — the killing starts with him.', tone:'CALCULATING', fx:{wisdom:5,glory:4}, flag:'WatchedTybalt', goto:'S06b'}]},

S06b:{type:'beat', phase:'THE ORCHARD WALL', objective:'Say the thing out loud',
 media:{img:'bg_s06b_a.jpg', video:'vid_s06b_a.mp4'}, kb:'kb-in',
 caption:'But soft, what light through yonder window breaks? It is the east, and Juliet is the sun.',
 vo:'He finds the wall under your window somehow — climbs it like a man who has never once considered falling.|"But soft, what light through yonder window breaks? It is the east, and Juliet is the sun."|You have read this line a hundred times. It has never once sounded like this.',
 prompt:'Renaissance Verona film still, vertical 2:3: a moonlit stone balcony at night on a Renaissance villa, a young woman in a pale nightgown leaning on the stone balustrade looking down with longing, warm candlelight glowing from the open window behind her, below in the walled garden among dark cypress and climbing roses a young man in a dark doublet stands looking up at her, moonlight and candlelight mixing, romantic, hopeful, quiet, photorealistic, no text',
 goto:'S06'},

S06:{type:'beat', phase:'THE CELL AT DAWN', objective:'Fix the weak link',
 media:{img:'bg_s06_a.jpg'}, kb:'kb-in',
 vo:'Friar Laurence marries you at dawn, then explains the sleeping draught.|You stop him. The draught is clever. The letter is not.|This time the letter does not travel alone.',
 prompt:'Renaissance Verona film still, vertical 2:3: a small stone monastery cell at dawn, an elderly friar in brown robes at a wooden table crowded with dried herbs and glass vials, one shaft of cold morning light through a narrow window, photorealistic, quiet conspiracy, no text',
 goto:'S07'},

S07:{type:'beat', phase:'THE STREET', objective:'The clock starts',
 media:{img:'bg_s07_a.jpg'}, kb:'kb-right',
 vo:'Tybalt kills Mercutio. Romeo kills Tybalt. The street stops arguing.|By sunset Romeo is banished to Mantua.|Forty-two hours until he buys the poison. Starting now.',
 prompt:'Renaissance Verona film still, vertical 2:3: a narrow sunlit stone street in an Italian city at noon, dust and blood on the flagstones, a dropped rapier, scattering onlookers in period dress blurred by motion, harsh white light and hard shadow, photorealistic, violent aftermath, no text',
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
 media:{img:'bg_s09_a.jpg'},
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
 media:{img:'bg_s10a_a.jpg'},
 title:'THE SECOND LETTER',
 prompt:'Renaissance Verona film still, vertical 2:3: dawn light flooding into an open stone crypt, an untouched sealed letter resting on the empty bier, two long shadows falling in from the doorway, warm gold replacing the blue, photorealistic, quiet relief, no text',
 body:'The letter reached Mantua with six hours to spare. Romeo never found the apothecary.|He was sitting in the dark of the tomb when you opened your eyes.|Two families came expecting a funeral and got an argument instead.',
 next:'CHAPTER 2: TWO HOUSES, STILL STANDING',
 nextNote:'Not yet written.',
 btn:'↻ Run the forty-two hours again'},

S10b:{type:'results', phase:'ENDING',
 media:{img:'bg_s10b_a.jpg'},
 title:'NO WHITE LIGHT',
 prompt:'Renaissance Verona film still, vertical 2:3: a cold stone tomb interior at night, one burnt-out candle, a young man lying still on a bier, an empty vial on the floor, harsh blue moonlight, no warmth anywhere, photorealistic, bleak and final, no text',
 body:'The rumour got to Mantua first. It always travelled lighter than paper.|You wake to the same cold hand and the same empty vial.|This time the light does not come. This time you stay.',
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
