// 成语题库（与之前相同）
const idioms = [
    {word: "一帆风顺", explanation: "比喻非常顺利，没有任何阻碍。"},
    {word: "二龙戏珠", explanation: "两条龙相对，戏玩着一颗宝珠。"},
    {word: "三心二意", explanation: "形容犹豫不决，意志不坚定。"},
    {word: "四海为家", explanation: "指什么地方都可以当作自己的家。"},
    {word: "五光十色", explanation: "形容色彩鲜艳，花样繁多。"},
    {word: "六神无主", explanation: "形容惊慌着急，没了主意。"},
    {word: "七上八下", explanation: "形容心里慌乱不安。"},
    {word: "八仙过海", explanation: "比喻各自拿出本领或办法，互相竞赛。"},
    {word: "九牛一毛", explanation: "比喻极大数量中极微小的数量，微不足道。"},
    {word: "十全十美", explanation: "十分完美，毫无欠缺。"},
    {word: "百里挑一", explanation: "一百个当中就挑出这一个来。形容人才出众。"},
    {word: "千军万马", explanation: "形容雄壮的队伍或浩大的声势。"},
    {word: "万众一心", explanation: "千万人一条心。形容团结一致。"},
    {word: "守株待兔", explanation: "比喻希望不经过努力而得到成功的侥幸心理。"},
    {word: "亡羊补牢", explanation: "比喻出了问题以后想办法补救，可以防止继续受损失。"},
    {word: "画蛇添足", explanation: "比喻做了多余的事，反而弄巧成拙。"},
    {word: "掩耳盗铃", explanation: "比喻自己欺骗自己，明明掩盖不了的事情偏要设法掩盖。"},
    {word: "拔苗助长", explanation: "比喻违反事物发展的客观规律，急于求成，反而坏事。"},
    {word: "狐假虎威", explanation: "比喻依仗别人的势力欺压人。"},
    {word: "望梅止渴", explanation: "比喻用空想安慰自己。"},
    {word: "卧薪尝胆", explanation: "形容人刻苦自励，发奋图强。"},
    {word: "负荆请罪", explanation: "表示向人认错赔罪。"},
    {word: "完璧归赵", explanation: "比喻把原物完好地归还本人。"},
    {word: "草木皆兵", explanation: "形容人在惊慌时疑神疑鬼。"},
    {word: "背水一战", explanation: "表示没有退路，与敌人决一死战。"},
    {word: "破釜沉舟", explanation: "比喻下决心不顾一切地干到底。"},
    {word: "四面楚歌", explanation: "比喻陷入四面受敌、孤立无援的境地。"},
    {word: "纸上谈兵", explanation: "比喻空谈理论，不能解决实际问题。"},
    {word: "指鹿为马", explanation: "比喻故意颠倒黑白，混淆是非。"},
    {word: "闻鸡起舞", explanation: "比喻有志报国的人及时奋起。"},
    {word: "胸有成竹", explanation: "比喻做事之前已作好充分准备，对事情的成功已有了十分的把握。"},
    {word: "画龙点睛", explanation: "比喻在关键地方简明扼要地点明要旨，使内容生动传神。"},
    {word: "杯弓蛇影", explanation: "比喻因疑神疑鬼而引起恐惧。"},
    {word: "愚公移山", explanation: "比喻坚持不懈地改造自然和坚定不移地进行斗争。"},
    {word: "精卫填海", explanation: "比喻意志坚决，不畏艰难。"},
    {word: "夸父逐日", explanation: "比喻人有大志，也比喻不自量力。"},
    {word: "叶公好龙", explanation: "比喻表面上爱好某事物，实际上并不真爱好。"},
    {word: "井底之蛙", explanation: "比喻见识狭窄的人。"},
    {word: "对牛弹琴", explanation: "比喻对不懂道理的人讲道理，对外行人说内行话。"},
    {word: "黔驴技穷", explanation: "比喻有限的一点本领也已经用完了。"},
    {word: "朝三暮四", explanation: "原指玩弄手法欺骗人。后用来比喻常常变卦，反复无常。"},
    {word: "一鸣惊人", explanation: "比喻平时没有突出的表现，一下子做出惊人的成绩。"},
    {word: "一箭双雕", explanation: "比喻做一件事达到两个目的。"},
    {word: "一举两得", explanation: "做一件事得到两方面的好处。"},
    {word: "一鼓作气", explanation: "比喻趁劲头大的时候鼓起干劲，一口气把工作做完。"},
    {word: "一见钟情", explanation: "旧指男女之间一见面就产生爱情。"},
    {word: "一诺千金", explanation: "比喻说话算数，极有信用。"},
    {word: "一视同仁", explanation: "表示对人同样看待，不分厚薄。"},
    {word: "一丝不苟", explanation: "指做事认真细致，一点儿不马虎。"},
    {word: "一往无前", explanation: "一直往前，无所阻挡。形容勇猛无畏地前进。"},
    {word: "一针见血", explanation: "比喻说话直截了当，切中要害。"},
    {word: "入木三分", explanation: "形容书法极有笔力。现多比喻分析问题很深刻。"},
    {word: "大器晚成", explanation: "指能担当重任的人物要经过长期的锻炼，所以成就较晚。"},
    {word: "口若悬河", explanation: "讲起话来滔滔不绝，像瀑布不停地奔流倾泻。形容能说会辩。"},
    {word: "门庭若市", explanation: "门前和院子里人很多，象市场一样。形容来的人很多，非常热闹。"},
    {word: "水落石出", explanation: "比喻事情的真相完全显露出来。"},
    {word: "水滴石穿", explanation: "比喻只要有恒心，不断努力，事情就一定能成功。"},
    {word: "风吹草动", explanation: "风稍一吹，草就摇晃。比喻微小的变动。"},
    {word: "风吹雨打", explanation: "原指花木遭受风雨摧残。比喻恶势力对弱小者的迫害。也比喻严峻的考验。"},
    {word: "风雨同舟", explanation: "在狂风暴雨中同乘一条船，一起与风雨搏斗。比喻共同经历患难。"},
    {word: "东山再起", explanation: "指再度出任要职。也比喻失势之后又重新得势。"},
    {word: "东张西望", explanation: "形容这里那里地到处看。"},
    {word: "出类拔萃", explanation: "超出同类之上。多指人的品德才能。"},
    {word: "出神入化", explanation: "形容技艺达到了绝妙的境界。"},
    {word: "乐极生悲", explanation: "高兴到极点时，发生使人悲伤的事。"},
    {word: "半途而废", explanation: "指做事不能坚持到底，中途停顿，有始无终。"},
    {word: "宁死不屈", explanation: "宁愿死也不屈服。"},
    {word: "对答如流", explanation: "回答问话象流水一样快。形容口才好，反应快。"},
    {word: "老马识途", explanation: "比喻有经验的人对事情比较熟悉。"},
    {word: "耳闻目睹", explanation: "亲耳听到，亲眼看见。"},
    {word: "百发百中", explanation: "形容射箭或打枪准确，每次都命中目标。也比喻做事有充分把握。"},
    {word: "百折不挠", explanation: "比喻意志坚强，无论受到多少次挫折，毫不动摇退缩。"},
    {word: "死灰复燃", explanation: "冷灰重新烧了起来。比喻失势的人重新得势。也比喻已经停止活动的事物重新活动起来。"},
    {word: "过目不忘", explanation: "形容记忆力很强，看过后不易忘记。"},
    {word: "同甘共苦", explanation: "共同享受幸福，共同担当艰苦。"},
    {word: "名不虚传", explanation: "传出的名声不是虚假的。指实在很好，不是空有虚名。"},
    {word: "各抒己见", explanation: "各人充分发表自己的意见。"},
    {word: "如火如荼", explanation: "原比喻军容之盛。现用来形容大规模的行动气势旺盛，气氛热烈。"},
    {word: "如鱼得水", explanation: "比喻得到跟自己很投合的人或对自己很适合的环境。"},
    {word: "异口同声", explanation: "不同的嘴说出相同的话。指大家说得都一样。"},
    {word: "异想天开", explanation: "指想法很不切实际，非常奇怪。"},
    {word: "志同道合", explanation: "志向相同，道路一致。形容彼此理想、志趣相合。"},
    {word: "声东击西", explanation: "造成要攻打东边的声势，实际上却攻打西边。是使对方产生错觉以出奇制胜的一种战术。"},
    {word: "走马观花", explanation: "骑在奔跑的马上看花。原形容事情如意，心境愉快。后多指大略地观察一下。"},
    {word: "投桃报李", explanation: "比喻友好往来或互相赠送东西。"},
    {word: "抛砖引玉", explanation: "抛出砖去，引回玉来。比喻用自己不成熟的意见或作品引出别人更好的意见或好作品。"},
    {word: "改邪归正", explanation: "从邪路上回到正路上来，不再做坏事。"},
    {word: "时不我待", explanation: "时间不会等待我们。指要抓紧时间。"},
    {word: "呆若木鸡", explanation: "形容因恐惧或惊异而发愣的样子。"},
    {word: "呕心沥血", explanation: "比喻用尽心思。多形容为事业、工作、文艺创作等用心的艰苦。"},
    {word: "囫囵吞枣", explanation: "把枣整个咽下去，不加咀嚼，不辨滋味。比喻对事物不加分析思考。"},
    {word: "坐井观天", explanation: "坐在井底看天。比喻眼界小，见识少。"},
    {word: "坐享其成", explanation: "自己不出力而享受别人取得的成果。"},
    {word: "应接不暇", explanation: "形容景物繁多，来不及观赏。后多形容来人或事情太多，应付不过来。"},
    {word: "完璧归赵", explanation: "比喻把原物完好地归还本人。"},
    {word: "张冠李戴", explanation: "把姓张的帽子戴到姓李的头上。比喻认错了对象，弄错了事实。"},
    {word: "忍辱负重", explanation: "为了完成艰巨的任务，忍受暂时的屈辱。"},
    {word: "杞人忧天", explanation: "比喻不必要的或缺乏根据的忧虑和担心。"},
    {word: "杯水车薪", explanation: "用一杯水去救一车着了火的柴草。比喻力量太小，解决不了问题。"},
    {word: "画饼充饥", explanation: "画个饼来解除饥饿。比喻用空想来安慰自己。"},
    {word: "虎头蛇尾", explanation: "头大如虎，尾细如蛇。比喻开始时声势很大，到后来劲头很小，有始无终。"},
    {word: "明察秋毫", explanation: "形容人能洞察事理，不受欺蒙。"},
    {word: "垂头丧气", explanation: "形容因失败或不顺利而情绪低落、萎靡不振的样子。"},
    {word: "知难而进", explanation: "明知困难，却敢于向前。指迎着困难上。"},
    {word: "舍己为人", explanation: "舍弃自己的利益去帮助别人。"},
    {word: "金玉其外", explanation: "比喻外表很华美，而里面一团糟。"},
    {word: "贪得无厌", explanation: "贪心永远没有满足的时候。"},
    {word: "狐朋狗友", explanation: "泛指一些吃喝玩乐、不务正业的朋友。"},
    {word: "盲人摸象", explanation: "比喻对事物只凭片面的了解或局部的经验，就乱加猜测，想做出全面的判断。"},
    {word: "刻舟求剑", explanation: "比喻不懂事物已发展变化而仍静止地看问题。"},
    {word: "视死如归", explanation: "把死看得像回家一样平常。形容不怕牺牲生命。"},
    {word: "南辕北辙", explanation: "比喻行动和目的正好相反。"},
    {word: "按图索骥", explanation: "按照画像去寻求好马。比喻墨守成规办事；也比喻按照线索去寻求。"},
    {word: "独木难支", explanation: "一根木头支不住高大的房子。比喻一个人的力量单薄，维持不住全局。"},
    {word: "狡兔三窟", explanation: "狡猾的兔子准备好几个藏身的窝。比喻隐蔽的地方或方法多。"},
    {word: "胆大包天", explanation: "形容胆子极大。"},
    {word: "闻风丧胆", explanation: "听到风声，就吓得丧失了勇气。形容对某种力量非常恐惧。"},
    {word: "举一反三", explanation: "比喻从一件事情类推而知道其他许多事情。"},
    {word: "神机妙算", explanation: "惊人的机智，巧妙的计谋。形容善于估计复杂的变化的情势，决定策略。"},
    {word: "眉开眼笑", explanation: "眉头舒展，眼含笑意。形容高兴愉快的样子。"},
    {word: "怒发冲冠", explanation: "指愤怒得头发直竖，顶着帽子。形容极端愤怒。"},
    {word: "班门弄斧", explanation: "在鲁班门前舞弄斧子。比喻在行家面前卖弄本领，不自量力。"},
    {word: "破镜重圆", explanation: "比喻夫妻失散或离婚后重新团聚。"},
    {word: "唇亡齿寒", explanation: "嘴唇没有了，牙齿就会感到寒冷。比喻利害密切相关。"},
    {word: "铁杵成针", explanation: "比喻只要有毅力，肯下苦功，事情就能成功。"},
    {word: "高枕无忧", explanation: "垫高枕头睡觉，无忧无虑。比喻思想麻痹，丧失警惕。"},
    {word: "雪中送炭", explanation: "在下雪天给人送炭取暖。比喻在别人急需时给以物质上或精神上的帮助。"},
    {word: "掩耳盗铃", explanation: "偷铃铛怕别人听见而捂住自己的耳朵。比喻自己欺骗自己，明明掩盖不住的事情偏要想法子掩盖。"},
    {word: "望洋兴叹", explanation: "原指在伟大事物面前感叹自己的渺小。现多比喻做事时因力不胜任或没有条件而感到无可奈何。"},
    {word: "梁上君子", explanation: "窃贼的代称。现在有时也指脱离实际、脱离群众的人。"},
    {word: "惊弓之鸟", explanation: "被弓箭吓怕了的鸟不容易安定。比喻经过惊吓的人碰到一点动静就非常害怕。"},
    {word: "望梅止渴", explanation: "原意是梅子酸，人想吃梅子就会流涎，因而止渴。后比喻愿望无法实现，用空想安慰自己。"},
    {word: "落井下石", explanation: "看见人要掉进陷阱里，不伸手救他，反而推他下去，又扔下石头。比喻乘人有危难时加以陷害。"},
    {word: "集思广益", explanation: "指集中群众的智慧，广泛吸收有益的意见。"},
    {word: "锦上添花", explanation: "在锦上再绣花。比喻好上加好，美上添美。"},
    {word: "滥竽充数", explanation: "比喻无本领的冒充有本领，次货冒充好货。"},
    {word: "塞翁失马", explanation: "比喻一时虽然受到损失，也许反而因此能得到好处。也指坏事在一定条件下可变为好事。"},
    {word: "锲而不舍", explanation: "不断地镂刻。比喻有恒心，有毅力。"},
    {word: "鹤立鸡群", explanation: "像鹤站在鸡群中一样。比喻一个人的仪表或才能在周围一群人里显得很突出。"},
    {word: "黔驴技穷", explanation: "比喻有限的一点本领也已经用完了。"},
    {word: "螳臂当车", explanation: "螳螂举起前肢企图阻挡车子前进。比喻做力量做不到的事情，必然失败。"},
    {word: "鹬蚌相争", explanation: "比喻双方相持不下，而使第三者从中得利。"},
    {word: "鞠躬尽瘁", explanation: "指恭敬谨慎，竭尽心力。"},
    {word: "鞭长莫及", explanation: "原意是鞭子虽长，也不能打马肚子。比喻相隔太远，力量达不到。"},
    {word: "囊萤映雪", explanation: "原是车胤用口袋装萤火虫来照书本，孙康利用雪的反光勤奋苦学的故事。后形容刻苦攻读。"},
    {word: "一叶知秋", explanation: "从一片树叶的凋落，知道秋天的到来。比喻通过个别的细微的迹象，可以看到整个形势的发展趋向与结果。"},
    {word: "一石二鸟", explanation: "扔一颗石子打到两只鸟。比喻做一件事情得到两种好处。"},
    {word: "一箭双雕", explanation: "原指射箭技术高超，一箭射中两只雕。后比喻做一件事达到两个目的。"},
    {word: "一曝十寒", explanation: "原意是说，虽然是最容易生长的植物，晒一天，冻十天，也不可能生长。比喻学习或工作一时勤奋，一时又懒散，没有恒心。"},
    {word: "入乡随俗", explanation: "到一个地方，就顺从当地的习俗。"},
    {word: "力挽狂澜", explanation: "比喻尽力挽回危险的局势。"},
    {word: "三令五申", explanation: "多次命令和告诫。"},
    {word: "大智若愚", explanation: "某些才智出众的人不露锋芒，看来好像愚笨。"},
    {word: "小题大做", explanation: "拿小题目做大文章。比喻把小事情当做大事情来处理。"},
    {word: "天衣无缝", explanation: "神话传说，仙女的衣服没有衣缝。比喻事物周密完善，找不出什么毛病。"},
    {word: "无中生有", explanation: "把没有的说成有。指凭空捏造。"},
    {word: "日新月异", explanation: "每天都在更新，每月都有变化。指发展或进步迅速，不断出现新事物、新气象。"},
    {word: "见义勇为", explanation: "看到正义的事，就勇敢地去做。"},
    {word: "分道扬镳", explanation: "分路而行。比喻目标不同，各走各的路或各干各的事。"},
    {word: "未雨绸缪", explanation: "天还没有下雨，先把门窗绑牢。比喻事先做好准备工作。"},
    {word: "东山再起", explanation: "指再度出任要职。也比喻失势之后又重新得势。"},
    {word: "四面楚歌", explanation: "比喻陷入四面受敌、孤立无援的境地。"},
    {word: "出奇制胜", explanation: "用奇兵或奇计战胜敌人。比喻用对方意料不到的方法取得胜利。"},
    {word: "半斤八两", explanation: "八两：即半斤。一个半斤，一个八两。比喻彼此一样，不相上下。"},
    {word: "对症下药", explanation: "针对病症用药。比喻针对事物的问题所在，采取有效的措施。"},
    {word: "老生常谈", explanation: "老书生经常说的话。比喻人们听惯了的没有新鲜意思的话。"},
    {word: "百折不挠", explanation: "比喻意志坚强，无论受到多少次挫折，毫不动摇退缩。"},
    {word: "成竹在胸", explanation: "画竹前竹的全貌已在胸中。比喻在做事之前已经拿定主意。"},
    {word: "同舟共济", explanation: "坐一条船，共同渡河。比喻团结互助，同心协力，战胜困难。"},
    {word: "先发制人", explanation: "原指先动手的处于主动地位，可以控制对方。后也泛指争取主动，先动手来制服对方。"},
    {word: "自相矛盾", explanation: "比喻自己说话做事前后抵触。"},
    {word: "后来居上", explanation: "后来的超过先前的。用以称赞后起之秀超过前辈。"},
    {word: "名落孙山", explanation: "名字落在榜末孙山的后面。指考试或选拔没有录取。"},
    {word: "多多益善", explanation: "越多越好。"},
    {word: "如履薄冰", explanation: "像走在薄冰上一样。比喻行事极为谨慎，存有戒心。"},
    {word: "买椟还珠", explanation: "买下木匣，退还了珍珠。比喻没有眼力，取舍不当。"},
    {word: "远走高飞", explanation: "指象野兽远远跑掉，象鸟儿远远飞走。比喻人跑到很远的地方去。多指摆脱困境去寻找出路。"},
    {word: "运筹帷幄", explanation: "指拟定作战策略。引申为筹划、指挥。"},
    {word: "投鼠忌器", explanation: "想用东西打老鼠，又怕打坏了近旁的器物。比喻做事有顾忌，不敢放手干。"},
    {word: "声名狼藉", explanation: "名声败坏到了极点。"},
    {word: "花言巧语", explanation: "原指铺张修饰、内容空泛的言语或文辞。后多指用来骗人的虚伪动听的话。"},
    {word: "两袖清风", explanation: "衣袖中除清风外，别无所有。比喻做官廉洁。也比喻穷得一无所有。"},
    {word: "励精图治", explanation: "振奋精神，想办法治理好国家。"},
    {word: "围魏救赵", explanation: "原指战国时齐军用围攻魏国的方法，迫使魏国撤回攻赵部队而使赵国得救。后指袭击敌人后方的据点以迫使进攻之敌撤退的战术。"},
    {word: "坐山观虎斗", explanation: "比喻对双方的斗争采取旁观的态度，等到双方都受到损伤，再从中捞取好处。"},
    {word: "言过其实", explanation: "原指言语浮夸，超过实际才能。后也指话说得过分，超过了实际情况。"},
    {word: "完璧归赵", explanation: "本指蔺相如将和氏璧完好地自秦送回赵国。后比喻把原物完好地归还本人。"},
    {word: "改过自新", explanation: "改正错误，重新做起。"},
    {word: "青出于蓝", explanation: "青是从蓝草里提炼出来的，但颜色比蓝更深。比喻学生超过老师或后人胜过前人。"},
    {word: "抱薪救火", explanation: "抱着柴草去救火。比喻用错误的方法去消除灾祸，结果使灾祸反而扩大。"},
    {word: "卧薪尝胆", explanation: "睡觉睡在柴草上，吃饭睡觉都尝一尝苦胆。形容人刻苦自励，发奋图强。"},
    {word: "拔苗助长", explanation: "比喻违反事物发展的客观规律，急于求成，反而坏事。"},
    {word: "势如破竹", explanation: "形势就像劈竹子，头上几节破开以后，下面各节顺着刀势就分开了。比喻节节胜利，毫无阻碍。"},
    {word: "图穷匕见", explanation: "比喻事情发展到最后，真相或本意显露了出来。"},
    {word: "物以类聚", explanation: "同类的东西聚在一起。指坏人彼此臭味相投，勾结在一起。"},
    {word: "舍本逐末", explanation: "抛弃根本的、主要的，而去追求枝节的、次要的。比喻不抓根本环节，而只在枝节问题上下功夫。"},
    {word: "金蝉脱壳", explanation: "蝉变为成虫时要脱去一层壳。比喻用计脱身，使人不能及时发觉。"},
    {word: "狐假虎威", explanation: "狐狸假借老虎的威势。比喻依仗别人的势力欺压人。"},
    {word: "狗尾续貂", explanation: "比喻拿不好的东西补接在好的东西后面，前后两部分非常不相称。"},
    {word: "盲人瞎马", explanation: "盲人骑着瞎马。比喻盲目行动，后果十分危险。"},
    {word: "刻骨铭心", explanation: "铭刻在心灵深处。形容记忆深刻，永远不忘。"},
    {word: "废寝忘食", explanation: "顾不得睡觉，忘记了吃饭。形容专心努力。"},
    {word: "郑人买履", explanation: "用来讽刺只信教条，不顾实际的人。"},
    {word: "城门失火", explanation: "城门失火，大家都到护城河取水，水用完了，鱼也死了。比喻因受连累而遭到损失或祸害。"},
    {word: "指鹿为马", explanation: "指着鹿，说是马。比喻故意颠倒黑白，混淆是非。"},
    {word: "按部就班", explanation: "按照一定的步骤、顺序进行。也指按老规矩办事，缺乏创新精神。"},
    {word: "草木皆兵", explanation: "把山上的草木都当做敌兵。形容人在惊慌时疑神疑鬼。"},
    {word: "独辟蹊径", explanation: "自己开辟一条路。比喻独创一种新风格或者新方法。"},
    {word: "狡兔三窟", explanation: "狡猾的兔子准备好几个藏身的窝。比喻隐蔽的地方或方法多。"},
    {word: "浑水摸鱼", explanation: "比喻乘混乱的时候从中捞取利益。"},
    {word: "举足轻重", explanation: "只要脚移动一下，就会影响两边的轻重。指处于重要地位，一举一动都足以影响全局。"},
    {word: "神采奕奕", explanation: "形容精神饱满，容光焕发。"},
    {word: "眉清目秀", explanation: "形容人容貌清秀不俗气。"},
    {word: "怒不可遏", explanation: "愤怒得难以抑制。形容十分愤怒。"},
    {word: "班门弄斧", explanation: "在鲁班门前舞弄斧子。比喻在行家面前卖弄本领，不自量力。"},
    {word: "破釜沉舟", explanation: "比喻下决心不顾一切地干到底。"},
    {word: "唇枪舌剑", explanation: "舌如剑，唇象枪。形容辩论激烈，言词锋利，象枪剑交锋一样。"},
    {word: "铁面无私", explanation: "形容公正严明，不怕权势，不讲情面。"},
    {word: "高瞻远瞩", explanation: "站得高，看得远。比喻眼光远大。"},
    {word: "雪上加霜", explanation: "比喻接连遭受灾难，损害愈加严重。"},
    {word: "掩人耳目", explanation: "遮掩别人的耳朵和眼睛。比喻用假象迷惑人，欺骗人。"},
    {word: "望眼欲穿", explanation: "眼睛都要望穿了。形容盼望殷切。"},
    {word: "梁上君子", explanation: "窃贼的代称。现在有时也指脱离实际、脱离群众的人。"},
    {word: "惊涛骇浪", explanation: "汹涌吓人的浪涛。比喻险恶的环境或尖锐激烈的斗争。"},
    {word: "望穿秋水", explanation: "眼睛都望穿了。形容对远地亲友的殷切盼望。"},
    {word: "落花流水", explanation: "原形容暮春景色衰败。后常用来比喻被打得大败。"},
    {word: "集腋成裘", explanation: "狐狸腋下的皮虽很小，但聚集起来就能制一件皮袍。比喻积少成多。"},
    {word: "锦囊妙计", explanation: "旧小说里描写足智多谋的人把对付敌方的计策写在纸条上，放在锦囊里，以便当事人在紧急时拆阅。比喻有准备的巧妙办法。"},
    {word: "滥竽充数", explanation: "比喻无本领的冒充有本领，次货冒充好货。"},
    {word: "塞翁失马", explanation: "比喻一时虽然受到损失，也许反而因此能得到好处。也指坏事在一定条件下可变为好事。"},
    {word: "锲而不舍", explanation: "不断地镂刻。比喻有恒心，有毅力。"},
    {word: "鹤发童颜", explanation: "仙鹤羽毛般雪白的头发，儿童般红润的面色。形容老年人气色好。"},
    {word: "黔驴技穷", explanation: "比喻有限的一点本领也已经用完了。"},
    {word: "螳臂当车", explanation: "螳螂举起前肢企图阻挡车子前进。比喻做力量做不到的事情，必然失败。"},
    {word: "鹬蚌相争", explanation: "比喻双方相持不下，而使第三者从中得利。"},
    {word: "鞠躬尽瘁", explanation: "指恭敬谨慎，竭尽心力。"},
    {word: "鞭长莫及", explanation: "原意是鞭子虽长，也不能打马肚子。比喻相隔太远，力量达不到。"},
    {word: "囊萤映雪", explanation: "原是车胤用口袋装萤火虫来照书本，孙康利用雪的反光勤奋苦学的故事。后形容刻苦攻读。"},
    {word: "一叶知秋", explanation: "从一片树叶的凋落，知道秋天的到来。比喻通过个别的细微的迹象，可以看到整个形势的发展趋向与结果。"},
    {word: "一石二鸟", explanation: "扔一颗石子打到两只鸟。比喻做一件事情得到两种好处。"},
    {word: "一箭双雕", explanation: "原指射箭技术高超，一箭射中两只雕。后比喻做一件事达到两个目的。"},
    {word: "一曝十寒", explanation: "原意是说，虽然是最容易生长的植物，晒一天，冻十天，也不可能生长。比喻学习或工作一时勤奋，一时又懒散，没有恒心。"},
    {word: "入乡随俗", explanation: "到一个地方，就顺从当地的习俗。"},
    {word: "力挽狂澜", explanation: "比喻尽力挽回危险的局势。"},
    {word: "三令五申", explanation: "多次命令和告诫。"},
    {word: "大智若愚", explanation: "某些才智出众的人不露锋芒，看来好像愚笨。"},
    {word: "小题大做", explanation: "拿小题目做大文章。比喻把小事情当做大事情来处理。"},
    {word: "天衣无缝", explanation: "神话传说，仙女的衣服没有衣缝。比喻事物周密完善，找不出什么毛病。"},
    {word: "无中生有", explanation: "把没有的说成有。指凭空捏造。"},
    {word: "日新月异", explanation: "每天都在更新，每月都有变化。指发展或进步迅速，不断出现新事物、新气象。"},
    {word: "见义勇为", explanation: "看到正义的事，就勇敢地去做。"},
    {word: "分道扬镳", explanation: "分路而行。比喻目标不同，各走各的路或各干各的事。"},
    {word: "未雨绸缪", explanation: "天还没有下雨，先把门窗绑牢。比喻事先做好准备工作。"},
    {word: "东山再起", explanation: "指再度出任要职。也比喻失势之后又重新得势。"},
    {word: "四面楚歌", explanation: "比喻陷入四面受敌、孤立无援的境地。"},
    {word: "出奇制胜", explanation: "用奇兵或奇计战胜敌人。比喻用对方意料不到的方法取得胜利。"},
    {word: "半斤八两", explanation: "八两：即半斤。一个半斤，一个八两。比喻彼此一样，不相上下。"},
    {word: "对症下药", explanation: "针对病症用药。比喻针对事物的问题所在，采取有效的措施。"},
    {word: "老生常谈", explanation: "老书生经常说的话。比喻人们听惯了的没有新鲜意思的话。"},
    {word: "百折不挠", explanation: "比喻意志坚强，无论受到多少次挫折，毫不动摇退缩。"},
    {word: "成竹在胸", explanation: "画竹前竹的全貌已在胸中。比喻在做事之前已经拿定主意。"},
    {word: "同舟共济", explanation: "坐一条船，共同渡河。比喻团结互助，同心协力，战胜困难。"},
    {word: "先发制人", explanation: "原指先动手的处于主动地位，可以控制对方。后也泛指争取主动，先动手来制服对方。"},
    {word: "自相矛盾", explanation: "比喻自己说话做事前后抵触。"},
    {word: "后来居上", explanation: "后来的超过先前的。用以称赞后起之秀超过前辈。"},
    {word: "名落孙山", explanation: "名字落在榜末孙山的后面。指考试或选拔没有录取。"},
    {word: "多多益善", explanation: "越多越好。"},
    {word: "如履薄冰", explanation: "像走在薄冰上一样。比喻行事极为谨慎，存有戒心。"},
    {word: "买椟还珠", explanation: "买下木匣，退还了珍珠。比喻没有眼力，取舍不当。"},
    {word: "远走高飞", explanation: "指象野兽远远跑掉，象鸟儿远远飞走。比喻人跑到很远的地方去。多指摆脱困境去寻找出路。"},
    {word: "运筹帷幄", explanation: "指拟定作战策略。引申为筹划、指挥。"},
    {word: "投鼠忌器", explanation: "想用东西打老鼠，又怕打坏了近旁的器物。比喻做事有顾忌，不敢放手干。"},
    {word: "声名狼藉", explanation: "名声败坏到了极点。"},
    {word: "花言巧语", explanation: "原指铺张修饰、内容空泛的言语或文辞。后多指用来骗人的虚伪动听的话。"},
    {word: "两袖清风", explanation: "衣袖中除清风外，别无所有。比喻做官廉洁。也比喻穷得一无所有。"},
    {word: "励精图治", explanation: "振奋精神，想办法治理好国家。"},
    {word: "围魏救赵", explanation: "原指战国时齐军用围攻魏国的方法，迫使魏国撤回攻赵部队而使赵国得救。后指袭击敌人后方的据点以迫使进攻之敌撤退的战术。"},
    {word: "坐山观虎斗", explanation: "比喻对双方的斗争采取旁观的态度，等到双方都受到损伤，再从中捞取好处。"},
    {word: "言过其实", explanation: "原指言语浮夸，超过实际才能。后也指话说得过分，超过了实际情况。"},
    {word: "完璧归赵", explanation: "本指蔺相如将和氏璧完好地自秦送回赵国。后比喻把原物完好地归还本人。"},
    {word: "改过自新", explanation: "改正错误，重新做起。"},
    {word: "青出于蓝", explanation: "青是从蓝草里提炼出来的，但颜色比蓝更深。比喻学生超过老师或后人胜过前人。"},
    {word: "抱薪救火", explanation: "抱着柴草去救火。比喻用错误的方法去消除灾祸，结果使灾祸反而扩大。"},
    {word: "卧薪尝胆", explanation: "睡觉睡在柴草上，吃饭睡觉都尝一尝苦胆。形容人刻苦自励，发奋图强。"},
    {word: "拔苗助长", explanation: "比喻违反事物发展的客观规律，急于求成，反而坏事。"},
    {word: "势如破竹", explanation: "形势就像劈竹子，头上几节破开以后，下面各节顺着刀势就分开了。比喻节节胜利，毫无阻碍。"},
    {word: "图穷匕见", explanation: "比喻事情发展到最后，真相或本意显露了出来。"},
    {word: "物以类聚", explanation: "同类的东西聚在一起。指坏人彼此臭味相投，勾结在一起。"},
    {word: "舍本逐末", explanation: "抛弃根本的、主要的，而去追求枝节的、次要的。比喻不抓根本环节，而只在枝节问题上下功夫。"},
    {word: "金蝉脱壳", explanation: "蝉变为成虫时要脱去一层壳。比喻用计脱身，使人不能及时发觉。"},
    {word: "狐假虎威", explanation: "狐狸假借老虎的威势。比喻依仗别人的势力欺压人。"},
    {word: "狗尾续貂", explanation: "比喻拿不好的东西补接在好的东西后面，前后两部分非常不相称。"},
    {word: "盲人瞎马", explanation: "盲人骑着瞎马。比喻盲目行动，后果十分危险。"},
    {word: "刻骨铭心", explanation: "铭刻在心灵深处。形容记忆深刻，永远不忘。"},
    {word: "废寝忘食", explanation: "顾不得睡觉，忘记了吃饭。形容专心努力。"},
    {word: "郑人买履", explanation: "用来讽刺只信教条，不顾实际的人。"},
    {word: "城门失火", explanation: "城门失火，大家都到护城河取水，水用完了，鱼也死了。比喻因受连累而遭到损失或祸害。"},
    {word: "指鹿为马", explanation: "指着鹿，说是马。比喻故意颠倒黑白，混淆是非。"},
    {word: "按部就班", explanation: "按照一定的步骤、顺序进行。也指按老规矩办事，缺乏创新精神。"},
    {word: "草木皆兵", explanation: "把山上的草木都当做敌兵。形容人在惊慌时疑神疑鬼。"},
    {word: "独辟蹊径", explanation: "自己开辟一条路。比喻独创一种新风格或者新方法。"},
    {word: "狡兔三窟", explanation: "狡猾的兔子准备好几个藏身的窝。比喻隐蔽的地方或方法多。"},
    {word: "浑水摸鱼", explanation: "比喻乘混乱的时候从中捞取利益。"},
    {word: "举足轻重", explanation: "只要脚移动一下，就会影响两边的轻重。指处于重要地位，一举一动都足以影响全局。"},
    {word: "神采奕奕", explanation: "形容精神饱满，容光焕发。"},
    {word: "眉清目秀", explanation: "形容人容貌清秀不俗气。"},
    {word: "怒不可遏", explanation: "愤怒得难以抑制。形容十分愤怒。"},
    {word: "班门弄斧", explanation: "在鲁班门前舞弄斧子。比喻在行家面前卖弄本领，不自量力。"},
    {word: "破釜沉舟", explanation: "比喻下决心不顾一切地干到底。"},
    {word: "唇枪舌剑", explanation: "舌如剑，唇象枪。形容辩论激烈，言词锋利，象枪剑交锋一样。"},
    {word: "铁面无私", explanation: "形容公正严明，不怕权势，不讲情面。"},
    {word: "高瞻远瞩", explanation: "站得高，看得远。比喻眼光远大。"},
    {word: "雪上加霜", explanation: "比喻接连遭受灾难，损害愈加严重。"},
    {word: "掩人耳目", explanation: "遮掩别人的耳朵和眼睛。比喻用假象迷惑人，欺骗人。"},
    {word: "望眼欲穿", explanation: "眼睛都要望穿了。形容盼望殷切。"},
    {word: "梁上君子", explanation: "窃贼的代称。现在有时也指脱离实际、脱离群众的人。"},
    {word: "惊涛骇浪", explanation: "汹涌吓人的浪涛。比喻险恶的环境或尖锐激烈的斗争。"},
    {word: "望穿秋水", explanation: "眼睛都望穿了。形容对远地亲友的殷切盼望。"},
    {word: "落花流水", explanation: "原形容暮春景色衰败。后常用来比喻被打得大败。"},
    {word: "集腋成裘", explanation: "狐狸腋下的皮虽很小，但聚集起来就能制一件皮袍。比喻积少成多。"},
    {word: "锦囊妙计", explanation: "旧小说里描写足智多谋的人把对付敌方的计策写在纸条上，放在锦囊里，以便当事人在紧急时拆阅。比喻有准备的巧妙办法。"},
    {word: "滥竽充数", explanation: "比喻无本领的冒充有本领，次货冒充好货。"},
    {word: "塞翁失马", explanation: "比喻一时虽然受到损失，也许反而因此能得到好处。也指坏事在一定条件下可变为好事。"},
    {word: "锲而不舍", explanation: "不断地镂刻。比喻有恒心，有毅力。"},
    {word: "鹤发童颜", explanation: "仙鹤羽毛般雪白的头发，儿童般红润的面色。形容老年人气色好。"},
    {word: "黔驴技穷", explanation: "比喻有限的一点本领也已经用完了。"},
    {word: "螳臂当车", explanation: "螳螂举起前肢企图阻挡车子前进。比喻做力量做不到的事情，必然失败。"},
    {word: "鹬蚌相争", explanation: "比喻双方相持不下，而使第三者从中得利。"},
    {word: "鞠躬尽瘁", explanation: "指恭敬谨慎，竭尽心力。"},
    {word: "鞭长莫及", explanation: "原意是鞭子虽长，也不能打马肚子。比喻相隔太远，力量达不到。"},
    {word: "囊萤映雪", explanation: "原是车胤用口袋装萤火虫来照书本，孙康利用雪的反光勤奋苦学的故事。后形容刻苦攻读。"}
];

// 游戏变量
let currentIdiom = null;
let blankIndices = [];
let score = 0;
let gameStarted = false;
let totalBlanks = 0;
let filledBlanks = 0;

// DOM元素
const startBtn = document.getElementById('start-btn');
const submitBtn = document.getElementById('submit-btn');
const userInput = document.getElementById('user-input');
const idiomDisplay = document.getElementById('idiom-display');
const scoreDisplay = document.getElementById('score-value');
const explanationDisplay = document.getElementById('explanation');
const explanationText = document.getElementById('explanation-text');
const gameOverDisplay = document.getElementById('game-over');
const finalScoreDisplay = document.getElementById('final-score');
const progressBar = document.getElementById('progress-bar');

// 开始游戏
startBtn.addEventListener('click', startGame);

// 提交答案
submitBtn.addEventListener('click', checkAnswer);
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

// 开始游戏函数
function startGame() {
    score = 0;
    filledBlanks = 0;
    totalBlanks = 0;
    scoreDisplay.textContent = score;
    explanationDisplay.style.display = 'none';
    gameOverDisplay.style.display = 'none';
    gameStarted = true;
    startBtn.style.display = 'none';
    submitBtn.disabled = false;
    userInput.disabled = false;
    userInput.focus();
    nextIdiom();
}

// 获取下一个成语
function nextIdiom() {
    // 随机选择一个成语
    const randomIndex = Math.floor(Math.random() * idioms.length);
    currentIdiom = idioms[randomIndex];
    
    // 随机决定要隐藏的字数 (1-2个)
    const blankCount = Math.min(Math.floor(Math.random() * 2) + 1, currentIdiom.word.length);
    totalBlanks += blankCount;
    
    // 随机选择要隐藏的字的位置
    blankIndices = [];
    while (blankIndices.length < blankCount) {
        const randomPos = Math.floor(Math.random() * currentIdiom.word.length);
        if (!blankIndices.includes(randomPos)) {
            blankIndices.push(randomPos);
        }
    }
    blankIndices.sort((a, b) => a - b);
    
    // 显示成语，隐藏选定的字
    displayIdiom();
    updateProgress();
}

// 显示成语，隐藏选定的字
function displayIdiom() {
    idiomDisplay.innerHTML = '';
    const word = currentIdiom.word;
    
    for (let i = 0; i < word.length; i++) {
        const charElement = document.createElement('div');
        charElement.className = 'character';
        
        if (blankIndices.includes(i)) {
            charElement.classList.add('blank');
            charElement.setAttribute('data-index', blankIndices.indexOf(i) + 1);
        } else {
            charElement.textContent = word[i];
        }
        
        idiomDisplay.appendChild(charElement);
    }
    
    // 重置输入框
    userInput.value = '';
    userInput.focus();
}

// 更新进度条
function updateProgress() {
    const progress = totalBlanks > 0 ? (filledBlanks / totalBlanks) * 100 : 0;
    progressBar.style.width = `${progress}%`;
}

// 检查答案
function checkAnswer() {
    if (!gameStarted) return;
    
    const answer = userInput.value.trim();
    if (answer.length !== 1) return;
    
    // 检查答案是否正确
    const currentBlankIndex = blankIndices[0];
    const correctChar = currentIdiom.word[currentBlankIndex];
    
    if (answer === correctChar) {
        // 正确答案
        score++;
        filledBlanks++;
        scoreDisplay.textContent = score;
        
        // 更新显示填写的字
        const blankElements = document.querySelectorAll('.blank');
        blankElements[0].textContent = correctChar;
        blankElements[0].classList.remove('blank');
        blankElements[0].classList.add('filled');
        
        // 从blankIndices中移除已填写的空白
        blankIndices.shift();
        
        if (blankIndices.length === 0) {
            // 所有空白都填完了，显示解释并进入下一个成语
            showExplanation();
            setTimeout(nextIdiom, 1500);
        } else {
            // 更新空白编号
            updateBlankNumbers();
        }
        
        updateProgress();
    } else {
        // 错误答案，游戏结束
        endGame();
    }
    
    userInput.value = '';
}

// 更新空白编号
function updateBlankNumbers() {
    const blankElements = document.querySelectorAll('.blank');
    blankElements.forEach((el, index) => {
        el.setAttribute('data-index', index + 1);
    });
}

// 显示成语解释
function showExplanation() {
    explanationText.innerHTML = `<span class="idiom-word">${currentIdiom.word}</span>: ${currentIdiom.explanation}`;
    explanationDisplay.style.display = 'block';
}

// 游戏结束
function endGame() {
    gameStarted = false;
    submitBtn.disabled = true;
    userInput.disabled = true;
    
    // 显示正确答案
    const blankElements = document.querySelectorAll('.blank');
    blankElements.forEach(el => {
        const index = parseInt(el.getAttribute('data-index')) - 1;
        el.textContent = currentIdiom.word[blankIndices[index]];
        el.style.backgroundColor = '#ffdddd';
        el.style.color = 'var(--danger)';
        el.classList.remove('blank');
    });
    
    showExplanation();
    
    // 显示最终得分
    finalScoreDisplay.textContent = score;
    gameOverDisplay.style.display = 'block';
    startBtn.style.display = 'inline-flex';
    startBtn.textContent = '再玩一次';
}