/* =========================================================================
 * 《简·爱》人物关系图 · 数据层
 * Jane Eyre Character Map — data
 *
 * 所有内容都集中在这个文件里，改文字不需要懂 HTML/JS。
 * 想加一个人物：在 characters 里加一条，在 relations 里补关系即可。
 * 坐标系：SVG 视口 1720 × 1300（会自动缩放，不影响显示）。
 * 引文章号据 Oxford World's Classics 通行文本，中译为便于阅读的意译。
 * License: 代码 MIT / 文字内容 CC BY-SA 4.0
 * ====================================================================== */
window.JE = {};

/* ---------- 一、家族 / 场景分组（决定配色与图例） ---------- */
JE.groups = {
  reed:   { zh: '盖茨海德 · 里德家', en: 'Gateshead', color: '#8c2f39' },
  lowood: { zh: '洛伍德慈善学校',   en: 'Lowood',    color: '#3d6b63' },
  thorn:  { zh: '桑菲尔德庄园',     en: 'Thornfield', color: '#37556e' },
  moor:   { zh: '沼泽居 · 里弗斯家', en: 'Moor House', color: '#6b4a6a' },
  eyre:   { zh: '马德拉 · 爱家',     en: 'Madeira',   color: '#a8763e' }
};

/* ---------- 二、人物 ----------
 * id      唯一标识（relations 里要用）
 * zh/en   名字
 * role    身份定语，显示在姓名下方
 * group   所属分组（null = 主角，不着色）
 * kind    core 主角 / hub 枢纽人物 / sm 普通
 * x,y,w,h 关系图坐标与盒子尺寸（已做防重叠排版，改动后请自行检查）
 * desc    一两句人物速写（点开节点时显示）
 * fate    结局
 * ------------------------------------------------------------------- */
JE.characters = [
  {
    id: 'Jane', zh: '简·爱', en: 'Jane Eyre', role: '主人公 · 第一人称叙述者',
    group: null, kind: 'core', x: 740, y: 590, w: 190, h: 74,
    desc: '父母双亡的孤儿。在舅妈家学会反抗，在洛伍德学会忍耐，在桑菲尔德学会爱，在荒原学会自立。她一生都在拒绝别人替她安排的位置。',
    fate: '继承遗产后回到失明的罗切斯特身边，在芬丁庄园成婚；十年后他一只眼睛复明，两人得有一子。'
  },
  {
    id: 'Roch', zh: '爱德华·罗切斯特', en: 'Edward Rochester', role: '桑菲尔德庄主',
    group: 'thorn', kind: 'core', x: 1130, y: 390, w: 192, h: 74,
    desc: '被父兄当作筹码送进西印度群岛的婚姻，带着一笔钱和一个疯妻回国。傲慢、阴郁、惯于试探，却在简面前第一次承认自己想变好。',
    fate: '桑菲尔德大火中失去一只手、双目失明，退居芬丁；简归来后成婚，视力部分恢复。'
  },
  {
    id: 'JohnEyre', zh: '约翰·爱', en: 'John Eyre', role: '马德拉酒商 · 简的叔叔',
    group: 'eyre', kind: 'sm', x: 740, y: 150, w: 144, h: 46,
    desc: '简父亲的弟弟，在马德拉经营酒业，暗中寻找侄女多年。他的遗嘱让简一夜之间拥有两万英镑，也让她第一次以「给予者」的身份回到罗切斯特面前。',
    fate: '在简抵达沼泽居前后病逝，遗产由简与里弗斯三兄妹四人平分。'
  },
  {
    id: 'MrsReed', zh: '里德太太', en: 'Mrs. Reed', role: '舅妈 · 盖茨海德主妇',
    group: 'reed', kind: 'hub', x: 300, y: 300, w: 156, h: 54,
    desc: '丈夫临终托孤，她答应「像亲生一样抚养」，却在十年里把简当作佣人。临终前她仍交不出那封能改变简命运的信，只交出了自己的偏心。',
    fate: '中风卧床，召简回盖茨海德，交出被隐瞒三年的信，当夜去世。'
  },
  {
    id: 'JohnReed', zh: '约翰·里德', en: 'John Reed', role: '表哥 · 施暴者',
    group: 'reed', kind: 'sm', x: 110, y: 165, w: 121, h: 46,
    desc: '里德家独子，十四岁就酗酒、赌博、虐待妹妹与表妹。他把书砸向简的那一下，换来的是简第一次真正的反抗。',
    fate: '挥霍家产、负债入狱，母亲死后自杀。'
  },
  {
    id: 'Eliza', zh: '伊丽莎·里德', en: 'Eliza Reed', role: '表姐 · 后入修道院',
    group: 'reed', kind: 'sm', x: 480, y: 150, w: 144, h: 46,
    desc: '精于算计、恪守形式，把家产分作三份后带着自己那一份进了修道院。她与乔治亚娜的对照，是「规矩」与「美貌」两种生存策略。',
    fate: '进入修道院终身修行，把财产捐给宗教团体。'
  },
  {
    id: 'Georgiana', zh: '乔治亚娜·里德', en: 'Georgiana Reed', role: '表姐 · 嫁入上流',
    group: 'reed', kind: 'sm', x: 120, y: 460, w: 148, h: 46,
    desc: '美貌、爱哭、擅长撒娇，是里德太太的掌上明珠。她嫁给一个有钱的老头，婚后仍靠回忆自己的艳史度日。',
    fate: '嫁给一位年长的富绅，生活优渥而空虚。'
  },
  {
    id: 'Bessie', zh: '贝茜·利文', en: 'Bessie Leaven', role: '盖茨海德的保姆',
    group: 'reed', kind: 'sm', x: 400, y: 640, w: 120, h: 46,
    desc: '盖茨海德唯一给过简温情的人：偷偷的拥抱、一个故事、一次探望。她不理解简，却真心疼她。',
    fate: '嫁给车夫罗伯特·利文，生儿育女，后来到盖茨海德为里德太太报丧。'
  },
  {
    id: 'Helen', zh: '海伦·彭斯', en: 'Helen Burns', role: '挚友 · 洛伍德',
    group: 'lowood', kind: 'sm', x: 150, y: 830, w: 133, h: 46,
    desc: '相信「忍耐」的神学：受罚不辩、被打不恨，把希望放在身后。简从她身上学到宽恕，却始终没有学会顺从。',
    fate: '洛伍德春疫中死于肺病，简夜里偷偷溜进病房，陪她走完最后一程。'
  },
  {
    id: 'Temple', zh: '谭波尔小姐', en: 'Miss Temple', role: '洛伍德校长',
    group: 'lowood', kind: 'sm', x: 430, y: 880, w: 133, h: 46,
    desc: '唯一相信简的清白、当众为她洗刷「说谎」罪名的人。她的公正让简第一次感到「被看见」，也是简愿意留校任教的原因。',
    fate: '婚后随丈夫迁往远方。她的离开，促使简登报求职、前往桑菲尔德。'
  },
  {
    id: 'Brock', zh: '布洛克赫斯特', en: 'Mr. Brocklehurst', role: '洛伍德主管',
    group: 'lowood', kind: 'sm', x: 200, y: 1040, w: 133, h: 46,
    desc: '用「克己」要求孤女，用奢侈供养自家妻女。他当众宣布简是「说谎者」，也让简第一次体会制度性的羞辱。',
    fate: '疫病与账目风波后声望受损，但仍在位；学校后来由更有同情心的捐资人监管。'
  },
  {
    id: 'Fairfax', zh: '费尔法克斯太太', en: 'Mrs. Fairfax', role: '桑菲尔德管家',
    group: 'thorn', kind: 'sm', x: 940, y: 195, w: 148, h: 46,
    desc: '温和、健谈、有点絮叨的寡妇，把简当作未来的同伴。她真心喜欢简，却也知道这栋房子里有些门不能开。',
    fate: '桑菲尔德焚毁后离开，晚年由简与罗切斯特安排居所、时常照应。'
  },
  {
    id: 'Blanche', zh: '布兰奇·英格拉姆', en: 'Blanche Ingram', role: '名门闺秀',
    group: 'thorn', kind: 'sm', x: 1250, y: 165, w: 164, h: 46,
    desc: '会弹琴、会唱歌、会骑马，也精于计算一场婚姻的价钱。她的傲慢让简第一次直面自己「贫穷、低微、不美、矮小」的位置。',
    fate: '罗切斯特并无求婚之意；她后来嫁给一位家道中落的从男爵。'
  },
  {
    id: 'Bertha', zh: '伯莎·梅森', en: 'Bertha Mason', role: '阁楼上的妻子',
    group: 'thorn', kind: 'sm', x: 1450, y: 300, w: 118, h: 46,
    desc: '西印度富商之女，被罗切斯特的父兄撮合成婚。疯病发作后被关进桑菲尔德三楼十年，由格雷斯·普尔看管。她几乎不说话，只会笑、爬、点火。',
    fate: '纵火烧毁桑菲尔德，登上屋顶，在罗切斯特眼前跳下身亡。'
  },
  {
    id: 'Richard', zh: '理查德·梅森', en: 'Richard Mason', role: '伯莎之弟 · 揭发者',
    group: 'thorn', kind: 'sm', x: 1510, y: 470, w: 144, h: 46,
    desc: '软弱、体面，被罗切斯特救过命，也被他当作「不会说出去的人」。最终是他在婚礼上开口，说出了那个名字。',
    fate: '婚礼上揭发重婚，此后移居西印度群岛，健康与财产都不佳。'
  },
  {
    id: 'Grace', zh: '格雷斯·普尔', en: 'Grace Poole', role: '看守 · 守密人',
    group: 'thorn', kind: 'sm', x: 1420, y: 630, w: 133, h: 46,
    desc: '酗酒、沉默、拿双倍工钱。她守着三楼的门，也守着整栋房子最贵的秘密；她的笑声明明就在走廊尽头，却没人愿意追问。',
    fate: '大火前离开桑菲尔德，此后下落不详。'
  },
  {
    id: 'Adele', zh: '阿黛尔·瓦朗', en: 'Adèle Varens', role: '简的学生 · 养女',
    group: 'thorn', kind: 'sm', x: 1150, y: 700, w: 133, h: 46,
    desc: '法国舞女塞莉纳·瓦朗的女儿。罗切斯特说不清她是不是自己的孩子，却把她带回英国。她的法语、裙子和喋喋不休，是桑菲尔德唯一的亮色。',
    fate: '简婚后送她进一所规矩宽松的学校，长成一个讨人喜欢、有教养的姑娘，常回来看望他们。'
  },
  {
    id: 'StJohn', zh: '圣约翰·里弗斯', en: 'St. John Rivers', role: '摩顿牧师 · 表兄',
    group: 'moor', kind: 'hub', x: 1090, y: 1050, w: 179, h: 54,
    desc: '冷峻、英俊，把一切热情都献给使命。他爱罗莎蒙德却拒绝这份爱，因为婚姻必须服务于工作；他向简求婚的理由，是「你适合做传教士的妻子」。',
    fate: '独自前往印度传教，在信中写道「我的工作将近完成」，暗示将死于异乡。'
  },
  {
    id: 'Diana', zh: '黛安娜·里弗斯', en: 'Diana Rivers', role: '表姐',
    group: 'moor', kind: 'sm', x: 790, y: 1140, w: 148, h: 46,
    desc: '受过良好教育、以家庭教师为业，穷得体面而快活。她与简在荒原上一见如故，是简第一次遇到真正的「同类」。',
    fate: '嫁给一位海军上校，与玛丽比邻而居。'
  },
  {
    id: 'Mary', zh: '玛丽·里弗斯', en: 'Mary Rivers', role: '表姐',
    group: 'moor', kind: 'sm', x: 1350, y: 1150, w: 133, h: 46,
    desc: '比黛安娜安静，也更早学会照顾人。是她把濒死的简从门廊拖进屋里——那一下，是简第二次被「捡回来」。',
    fate: '嫁给一位牧师，与黛安娜比邻而居。'
  },
  {
    id: 'Rosamond', zh: '罗莎蒙德·奥利弗', en: 'Rosamond Oliver', role: '厂主之女 · 教区美人',
    group: 'moor', kind: 'sm', x: 850, y: 890, w: 164, h: 46,
    desc: '摩顿最明艳的姑娘，喜欢圣约翰，也喜欢被他拒绝时自己扮演的角色。她最终嫁给门当户对的人。',
    fate: '嫁给一位富有且门第相当的绅士。'
  }
];

/* ---------- 三、关系 ----------
 * a, b   两端人物 id
 * type   关系类型（见 relationTypes）
 * label  线上的说明文字
 * bow    弯曲方向/幅度（可选，默认 1）
 * t      标签在曲线上的位置 0–1（可选，默认 0.5 / 涉及主角时 0.6）
 * ------------------------------------------------------------------- */
JE.relationTypes = {
  kin:      { zh: '亲缘 / 雇佣',      color: '#8d8377', width: 1.5, dash: null,  opacity: 0.8 },
  love:     { zh: '爱情与婚姻',        color: '#b0505c', width: 3.0, dash: null,  opacity: 0.95 },
  wed:      { zh: '未解除的婚约',      color: '#8c2f39', width: 2.4, dash: null,  opacity: 0.78 },
  fake:     { zh: '未成或破裂的婚约',  color: '#a99a86', width: 1.5, dash: '7 6', opacity: 0.9 },
  conflict: { zh: '冲突与揭发',        color: '#a8522f', width: 1.6, dash: '3 5', opacity: 0.9 }
};

JE.relations = [
  { a: 'Jane',     b: 'JohnEyre',  type: 'kin',      label: '叔侄 · 遗产两万镑' },
  { a: 'Jane',     b: 'MrsReed',   type: 'kin',      label: '舅妈 · 寄养' },
  { a: 'MrsReed',  b: 'JohnReed',  type: 'kin',      label: '母子' },
  { a: 'MrsReed',  b: 'Eliza',     type: 'kin',      label: '母女' },
  { a: 'MrsReed',  b: 'Georgiana', type: 'kin',      label: '母女' },
  { a: 'Jane',     b: 'Bessie',    type: 'kin',      label: '唯一的温情' },
  { a: 'Jane',     b: 'Helen',     type: 'kin',      label: '挚友 · 临终相伴' },
  { a: 'Jane',     b: 'Temple',    type: 'kin',      label: '师长 · 精神母亲' },
  { a: 'Jane',     b: 'Brock',     type: 'conflict', label: '监管 · 当众羞辱' },
  { a: 'Jane',     b: 'Roch',      type: 'love',     label: '相恋 · 结为夫妻' },
  { a: 'Roch',     b: 'Bertha',    type: 'wed',      label: '未解除的婚约' },
  { a: 'Bertha',   b: 'Richard',   type: 'kin',      label: '姐弟' },
  { a: 'Roch',     b: 'Grace',     type: 'kin',      label: '雇佣 · 共守秘密' },
  { a: 'Roch',     b: 'Adele',     type: 'kin',      label: '养父' },
  { a: 'Roch',     b: 'Blanche',   type: 'fake',     label: '传闻婚约 · 一场试探' },
  { a: 'Roch',     b: 'Fairfax',   type: 'kin',      label: '雇佣' },
  { a: 'Jane',     b: 'Adele',     type: 'kin',      label: '家庭教师' },
  { a: 'Jane',     b: 'StJohn',    type: 'fake',     label: '表兄 · 求婚被拒' },
  { a: 'Jane',     b: 'Diana',     type: 'kin',      label: '表兄妹' },
  { a: 'Jane',     b: 'Mary',      type: 'kin',      label: '表兄妹' },
  { a: 'StJohn',   b: 'Rosamond',  type: 'fake',     label: '无望的爱' },
  { a: 'Richard',  b: 'Jane',      type: 'conflict', label: '婚礼上揭发重婚', bow: -1, t: 0.38 }
];

/* ---------- 四、思维导图 ----------
 * side: R 放右侧 / L 放左侧；leaves 为末端条目（建议 ≤ 18 字）
 * ------------------------------------------------------------------- */
JE.mindmap = {
  center: { zh: '简·爱', en: 'JANE EYRE' },
  branches: [
    {
      name: '情节主线', color: '#8c2f39', side: 'R', leaves: [
        '盖茨海德：寄人篱下，红房子惊魂',
        '洛伍德：海伦病逝，谭波尔远嫁',
        '桑菲尔德：任家庭教师，与主人相恋',
        '婚礼惊变：阁楼上的妻子被揭发',
        '荒原夜逃：濒死中被里弗斯家所救',
        '芬丁重逢：残废的罗切斯特与平等之爱'
      ]
    },
    {
      name: '主题思想', color: '#2f5d58', side: 'R', leaves: [
        '平等之爱：灵魂与灵魂的对话',
        '女性独立：经济自持与人格自主',
        '宗教三面：忍耐 · 苦修 · 此世信仰',
        '阶级与金钱：遗产带来的底气',
        '激情与理性：走，还是留'
      ]
    },
    {
      name: '意象象征', color: '#6b4a6a', side: 'R', leaves: [
        '红房子：童年创伤与囚禁',
        '阁楼上的疯女人：被压抑的欲望',
        '火：两度纵火，毁灭与净化',
        '月亮与梦：预感与指引',
        '肖像与素描：凝视与自我认知'
      ]
    },
    {
      name: '人物谱系', color: '#37556e', side: 'L', leaves: [
        '里德家：舅妈与三个表兄妹',
        '洛伍德：海伦·彭斯、谭波尔小姐',
        '桑菲尔德：罗切斯特、阿黛尔、管家',
        '阁楼：伯莎·梅森与梅森姐弟',
        '沼泽居：圣约翰与黛安娜、玛丽',
        '客串：布兰奇、罗莎蒙德、布洛克赫斯特'
      ]
    },
    {
      name: '经典语句', color: '#a8763e', side: 'L', leaves: [
        '你以为我穷、低微、不美，就没有灵魂吗',
        '我不是鸟，没有网能罗住我',
        '读者，我嫁给了他',
        '越是孤独无援，我越要尊重自己'
      ]
    },
    {
      name: '作者与背景', color: '#4a5d4e', side: 'L', leaves: [
        '夏洛蒂·勃朗特（1816—1855）',
        '1847 年出版，化名「柯勒·贝尔」',
        '哥特小说 + 成长小说 + 爱情小说',
        '约克郡荒原与牧师家庭的投影'
      ]
    }
  ]
};

/* ---------- 五、五段人生地理 ---------- */
JE.stages = [
  {
    no: '01', place: '盖茨海德', en: 'Gateshead', span: '第 1–4 章 · 约 1–10 岁',
    color: '#8c2f39', word: '恐惧与反抗的起点',
    events: [
      '被约翰表哥用书砸中，第一次流血反抗，被关进「红房子」',
      '惊惧中昏厥，此后一生都在梦里重演那间屋子',
      '当众控诉里德太太「你不是我母亲」，被送去洛伍德',
      '临走前得到一次机会：她主动要求上学，而不是被赶走'
    ]
  },
  {
    no: '02', place: '洛伍德', en: 'Lowood', span: '第 5–10 章 · 约 10–18 岁',
    color: '#3d6b63', word: '忍耐，与一位精神母亲',
    events: [
      '被布洛克赫斯特当众指为「说谎者」，罚站在凳子上',
      '海伦·彭斯教她：宽恕比记仇更有力量',
      '春疫夺走海伦，简半夜潜入病房，陪她断气',
      '谭波尔小姐出嫁离去，简登报求职——去桑菲尔德'
    ]
  },
  {
    no: '03', place: '桑菲尔德', en: 'Thornfield', span: '第 11–26 章 · 约 18–19 岁',
    color: '#37556e', word: '爱，与一场不平等的婚约',
    events: [
      '任阿黛尔家庭教师，在壁炉边与庄园主第一次长谈',
      '深夜火警、梅森被咬、简救下罗切斯特',
      '果园求婚：「我们站在上帝脚下，是平等的」',
      '婚礼上梅森揭发重婚，阁楼上的伯莎现形'
    ]
  },
  {
    no: '04', place: '沼泽居', en: 'Moor House', span: '第 27–35 章 · 19 岁',
    color: '#6b4a6a', word: '自立，以及血缘的召唤',
    events: [
      '只带二十先令出走，在荒原上濒死，被里弗斯家救起',
      '化名「简·艾略特」，任教摩顿村校',
      '继承约翰·爱两万英镑，发现三人原是表亲',
      '拒绝圣约翰「以使命为名」的求婚，夜里听见罗切斯特的呼唤'
    ]
  },
  {
    no: '05', place: '芬丁', en: 'Ferndean', span: '第 36–38 章 · 约 19–20 岁',
    color: '#a8763e', word: '归来，与平等的完成',
    events: [
      '桑菲尔德被焚，罗切斯特失明、失去一只手',
      '简以「邻居、护士、管家」的身份出现在他面前',
      '「读者，我嫁给了他。」',
      '十年后：他一只眼复明，看见了他们的儿子'
    ]
  }
];

/* ---------- 六、六组关键关系 ---------- */
JE.keyRels = [
  {
    type: '恋人 · 夫妻', color: '#b0505c',
    a: '简·爱', b: '爱德华·罗切斯特',
    body: '一个是无钱无势的家庭教师，一个是庄园主。罗切斯特用布兰奇试探她，用吉普赛算命逗她，用隐瞒伯莎欺骗她；简用离开回答他。等到她带着遗产回来、他失去庄园与视力，两个人才第一次真正站在同一高度。',
    quote: 'it is my spirit that addresses your spirit; just as if both had passed through the grave, and we stood at God\u2019s footstool, equal,\u2014as we are!',
    zh: '是我的灵魂在跟你的灵魂说话，就像我们两个都穿过坟墓，站在上帝脚下，彼此平等——本来就平等！',
    src: '第 23 章 · 果园求婚'
  },
  {
    type: '未解除的婚姻', color: '#8c2f39',
    a: '罗切斯特', b: '伯莎·梅森',
    body: '一场由父兄撮合、以三万英镑为价的西印度婚姻。伯莎的疯病让罗切斯特把她锁进三楼，用格雷斯·普尔的门闩代替离婚。她是这栋房子真正的秘密，也是简的婚礼被击碎的原因。文学史上最著名的「阁楼」，既是囚笼，也是被压抑之物的化身。',
    quote: 'Bertha Mason is mad; and she came of a mad family;\u2014idiots and maniacs through three generations!',
    zh: '伯莎·梅森疯了；她出身于一个疯人家族——三代都是白痴和疯子！',
    src: '第 26 章 · 婚礼中断'
  },
  {
    type: '寄养 · 决裂', color: '#8c2f39',
    a: '简·爱', b: '里德太太',
    body: '丈夫临终的承诺，变成了十年的冷眼。红房子那一夜是简一生的噩梦原型——被关进死者待过的房间，看见「光」。临终床前她终于得到一句迟到的承认：里德太太交出了隐瞒三年的信，也交出了自己的偏心。',
    quote: 'I am not deceitful: if I were, I should say I loved you; but I declare I do not love you.',
    zh: '我不是爱撒谎的人；倘若我撒谎，我就会说我爱你——可是我声明，我不爱你。',
    src: '第 4 章 · 与舅妈对峙'
  },
  {
    type: '挚友 · 精神启蒙', color: '#3d6b63',
    a: '简·爱', b: '海伦·彭斯',
    body: '海伦用「忍耐」回应不公，简用「反抗」回应不公。两种答案在洛伍德的病室里相遇：海伦死得安静，简却从她的墓碑上学会了不忘记。小说里第一个真正爱简的人，不是罗切斯特。',
    quote: 'Life appears to me too short to be spent in nursing animosity or registering wrongs.',
    zh: '在我看来，生命太短促了，不该用来记仇、算旧账。',
    src: '第 6 章 · 洛伍德的黄昏'
  },
  {
    type: '表兄 · 求婚', color: '#6b4a6a',
    a: '简·爱', b: '圣约翰·里弗斯',
    body: '圣约翰救过简的命，也认出了她的血缘。他需要一个能吃苦的传教士妻子，而不是一个被爱的人。简愿意跟他去印度，却拒绝以妻子的名义同行——因为那场婚姻里没有爱，只有使命。这是全书第二次「求婚」，也是第二次拒绝。',
    quote: '',
    zh: '',
    src: '第 28、30、32、35 章'
  },
  {
    type: '虚设的婚约', color: '#37556e',
    a: '罗切斯特', b: '布兰奇·英格拉姆',
    body: '英格拉姆家的客厅是桑菲尔德的另一套秩序：门第、财产、才艺表演。布兰奇弹琴唱歌，谈论婚姻像谈论一笔生意。罗切斯特故意放出婚讯，只为让简嫉妒——这场婚事从头到尾都没有发生过。',
    quote: '',
    zh: '',
    src: '第 17–18 章 · 桑菲尔德舞会'
  }
];

/* ---------- 七、经典台词 ----------
 * who 对应 characters 的 id，用于筛选；cat 用于「其他」归类
 * ------------------------------------------------------------------- */
JE.quoteFilters = [
  { id: 'all', zh: '全部' },
  { id: 'Jane', zh: '简·爱' },
  { id: 'Roch', zh: '罗切斯特' },
  { id: 'Helen', zh: '海伦' },
  { id: 'MrsReed', zh: '里德太太' },
  { id: 'StJohn', zh: '圣约翰' }
];

JE.quotes = [
  {
    who: 'Jane', chapter: '第 1 章',
    en: 'There was no possibility of taking a walk that day.',
    zh: '那天是不可能出去散步了。',
    note: '全书第一句。十岁的简被排除在一家人的散步之外——从此「被排除」成为她人生的起点，也成为她后来每一次出走的动力。'
  },
  {
    who: 'Jane', chapter: '第 4 章',
    en: 'I am not deceitful: if I were, I should say I loved you; but I declare I do not love you.',
    zh: '我不是爱撒谎的人；倘若我撒谎，我就会说我爱你——可是我声明，我不爱你。',
    note: '十岁的简第一次当面反抗。这句话建立的不是仇恨，而是一种近乎苛刻的诚实：她宁可被恨，也不肯说假话。'
  },
  {
    who: 'Jane', chapter: '第 12 章',
    en: 'Women are supposed to be very calm generally: but women feel just as men feel; they need exercise for their faculties, and a field for their efforts, as much as their brothers do.',
    zh: '人们总以为女人应当很平静；可是女人的感受和男人一样，她们也需要施展才能，也需要一块可供努力的地方，和她们的兄弟一样。',
    note: '十九世纪最直白的女性宣言之一。注意它的修辞：不是「女人更强」，而是「女人一样」——平等，而非优越。'
  },
  {
    who: 'Jane', chapter: '第 23 章',
    en: 'Do you think, because I am poor, obscure, plain, and little, I am soulless and heartless? You think wrong!\u2014I have as much soul as you, and full as much heart!',
    zh: '你以为，因为我穷、低微、不美、矮小，我就没有灵魂、没有心吗？你想错了——我的灵魂跟你的一样，我的心也跟你的一样完整！',
    note: '全书最著名的一段。四个形容词（poor, obscure, plain, little）是罗切斯特与世界给她的标签，她用「灵魂」把它们全部作废。'
  },
  {
    who: 'Jane', chapter: '第 23 章',
    en: 'I am no bird; and no net ensnares me: I am a free human being with an independent will.',
    zh: '我不是鸟，没有网能罗住我：我是自由的人，有独立的意志。',
    note: '紧接着上文。前面讲平等，这句讲自由——两者合起来才是简的爱情观：可以爱你，但不能属于你。'
  },
  {
    who: 'Roch', chapter: '第 23 章',
    en: 'I sometimes have a queer feeling with regard to you\u2014especially when you are near me, as now: it is as if I had a string somewhere under my left ribs, tightly and inextricably knotted to a similar string situated in the corresponding quarter of your little frame.',
    zh: '有时我对你有一种奇怪的感觉——尤其是当你靠近我的时候，就像现在：仿佛我左肋下有一根弦，与你小小的身躯里相应部位的一根弦紧紧系在一起，解不开。',
    note: '罗切斯特罕见的坦白时刻。全书反复书写「弦」「绳」「牵引」——但真正把这根弦拉紧的，往往是简的离开。'
  },
  {
    who: 'Roch', chapter: '第 26 章',
    en: 'Bertha Mason is mad; and she came of a mad family;\u2014idiots and maniacs through three generations!',
    zh: '伯莎·梅森疯了；她出身于一个疯人家族——三代都是白痴和疯子！',
    note: '婚礼被中断后，罗切斯特的自辩。他把责任推给遗传与家族，却回避了自己为钱结婚的事实——这也是小说最受后世（如《藻海无边》）追问的地方。'
  },
  {
    who: 'Helen', chapter: '第 6 章',
    en: 'Life appears to me too short to be spent in nursing animosity or registering wrongs.',
    zh: '在我看来，生命太短促了，不该用来记仇、算旧账。',
    note: '海伦的「忍耐神学」。简当时无法接受，却在多年后无数次想起——包括在原谅里德太太的那个下午。'
  },
  {
    who: 'Helen', chapter: '第 9 章',
    en: 'I am very happy, Jane; and when you hear that I am dead, you must be sure and not grieve.',
    zh: '我很快乐，简；等你听到我死了的消息，千万别难过。',
    note: '海伦临终前的话。她把死亡说成「回家」，这份平静与简的激烈形成全书最重要的一组对照。'
  },
  {
    who: 'Jane', chapter: '第 27 章',
    en: 'The more solitary, the more friendless, the more unsustained I am, the more I will respect myself.',
    zh: '越是孤独，越是无友，越是无援，我就越要尊重自己。',
    note: '出走的理由。简拒绝做情妇，不是出于清高，而是出于自保：在没有一个人站在她这边时，她必须做自己的见证人。'
  },
  {
    who: 'Jane', chapter: '第 37 章',
    en: 'I am your neighbour, your nurse, your housekeeper.',
    zh: '我是你的邻居、你的护士、你的管家。',
    note: '芬丁重逢的第一句话。身份的排列顺序意味深长：先邻里，再照护，最后才是雇佣——爱情被放在最后，因为它已经不需要声明。'
  },
  {
    who: 'Jane', chapter: '第 38 章',
    en: 'Reader, I married him.',
    zh: '读者，我嫁给了他。',
    note: '全书最著名的三个词。主语是「我」，动作是「嫁」——不是「他娶了我」。这个语态的选择，就是整部小说的立场。'
  }
];

/* ---------- 八、结局名单 ---------- */
JE.endingGone = [
  { name: '海伦·彭斯', how: '肺病，死于洛伍德春疫', note: '第 9 章' },
  { name: '约翰·里德', how: '挥霍家产、负债入狱，自杀', note: '第 21 章（信中提及）' },
  { name: '里德太太', how: '中风，交出隐瞒三年的信后去世', note: '第 21 章' },
  { name: '伯莎·梅森', how: '纵火焚屋，登上屋顶跳下', note: '第 36 章' },
  { name: '约翰·爱', how: '病逝于马德拉，留下两万英镑', note: '第 30 章（信中提及）' }
];

JE.endingStay = [
  { name: '简·爱 & 罗切斯特', how: '芬丁庄园成婚，十年后他一只眼复明，得一子' },
  { name: '阿黛尔·瓦朗', how: '进了一所规矩宽松的学校，长成有教养的姑娘' },
  { name: '圣约翰·里弗斯', how: '赴印度传教，信中写「我的工作将近完成」' },
  { name: '黛安娜 & 玛丽', how: '分别嫁给海军上校与牧师，比邻而居' },
  { name: '费尔法克斯太太', how: '离开桑菲尔德，晚年由简夫妇照应' },
  { name: '布兰奇·英格拉姆', how: '嫁给一位家道中落的从男爵' },
  { name: '伊丽莎 / 乔治亚娜', how: '一个进修道院，一个嫁给年长富绅' },
  { name: '格雷斯·普尔', how: '大火前离开，下落不详' }
];
