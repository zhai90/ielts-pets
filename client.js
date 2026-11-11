window.__ModuleLoader__.load({
  id: 'dsh-ielts-pets',
  factory(require) {
    'use strict';

    const React = require('react');
    const h = React.createElement;
    const { useEffect, useMemo, useRef, useState } = React;

    const STORAGE_KEY = 'dsh.ielts-pet.v1';
    const DAY_MS = 24 * 60 * 60 * 1000;
    const PET_TYPES = ['cat', 'dog', 'capybara'];
    const DEFAULT_SETTINGS = { dailyGoal: 20, autoPop: true, intervalMin: 3, pet: 'cat' };
    const REVIEW_DAYS = [1, 3, 7, 14, 30, 60];
    const INTERVAL_OPTIONS = [1, 3, 5, 10, 15];
    const WORD_ROWS = [
      ["abandon", "v.", "放弃；抛弃", "Many students abandon their study plans when motivation drops.", "当动力下降时，许多学生会放弃自己的学习计划。"],
      ["abstract", "adj.", "抽象的；理论上的", "The theory is too abstract to explain everyday behaviour.", "这个理论太抽象，难以解释日常行为。"],
      ["abundant", "adj.", "丰富的；大量的", "The region has abundant rainfall and fertile soil.", "该地区雨量充沛、土壤肥沃。"],
      ["accelerate", "v.", "加速；促进", "Rising demand has accelerated the growth of online education.", "需求上升加速了在线教育的发展。"],
      ["access", "n. / v.", "使用权；获取", "Rural students need better access to digital resources.", "农村学生需要更好地获得数字资源。"],
      ["accommodate", "v.", "容纳；适应", "The new library can accommodate over a thousand readers.", "新图书馆可容纳一千多名读者。"],
      ["accumulate", "v.", "积累；积聚", "Small daily efforts accumulate into major progress.", "每天的小努力会积累成重大进步。"],
      ["accurate", "adj.", "准确的；精确的", "Scientists need accurate data before drawing conclusions.", "科学家在下结论前需要准确的数据。"],
      ["acknowledge", "v.", "承认；致谢", "The report acknowledges the limitations of the survey.", "报告承认了这项调查的局限性。"],
      ["adapt", "v.", "适应；改编", "Communities must adapt to a rapidly changing climate.", "社区必须适应快速变化的气候。"],
      ["adequate", "adj.", "足够的；适当的", "Many families lack adequate housing and healthcare.", "许多家庭缺乏足够的住房和医疗。"],
      ["adjacent", "adj.", "邻近的；毗连的", "The university built a new lab adjacent to the library.", "大学在图书馆旁边建了一个新实验室。"],
      ["advocate", "v. / n.", "提倡；倡导者", "Some economists advocate higher taxes on carbon emissions.", "一些经济学家主张提高碳排放税。"],
      ["aesthetic", "adj.", "审美的；美学的", "The building combines practical design with aesthetic appeal.", "这座建筑将实用设计与审美吸引力结合起来。"],
      ["allocate", "v.", "分配；拨给", "The government should allocate more funds to public transport.", "政府应该为公共交通分配更多资金。"],
      ["alternative", "n. / adj.", "替代方案；可供替代的", "Cycling is a healthy alternative to driving short distances.", "骑自行车是短途驾车的一种健康替代方式。"],
      ["ambiguous", "adj.", "模棱两可的；含糊的", "The instructions were ambiguous and caused confusion.", "这些说明含糊不清，引起了困惑。"],
      ["analyze", "v.", "分析；解析", "Researchers analyzed the responses from 500 participants.", "研究人员分析了500名参与者的回答。"],
      ["anticipate", "v.", "预期；预料", "We anticipate a rise in demand during the holiday season.", "我们预计假日期间需求会上升。"],
      ["apparent", "adj.", "明显的；表面上的", "It soon became apparent that the plan would cost too much.", "很快就明显看出该计划成本过高。"],
      ["appreciate", "v.", "欣赏；感激；理解", "Students appreciate teachers who explain ideas clearly.", "学生欣赏把观点讲清楚的老师。"],
      ["approach", "n. / v.", "方法；接近", "A balanced approach is needed to solve the problem.", "解决这个问题需要一种平衡的方法。"],
      ["appropriate", "adj.", "恰当的；合适的", "It is appropriate to cite your sources in an academic essay.", "在学术论文中引用来源是恰当的。"],
      ["arbitrary", "adj.", "任意的；武断的", "The deadline seemed arbitrary and unfair to the team.", "这个截止日期对团队来说似乎武断且不公平。"],
      ["assess", "v.", "评估；评定", "Teachers assess students through both exams and projects.", "教师通过考试和项目两种方式评估学生。"],
      ["assume", "v.", "假定；承担", "We should not assume that everyone has internet access.", "我们不应假定每个人都有互联网接入。"],
      ["attain", "v.", "达到；获得", "She worked hard to attain a high band score.", "她努力学习，以达到高分。"],
      ["attribute", "v. / n.", "归因于；属性", "The researchers attribute the decline to habitat loss.", "研究人员将下降归因于栖息地丧失。"],
      ["authentic", "adj.", "真实的；正宗的", "The museum displays authentic objects from the ancient city.", "博物馆展出古城的真实文物。"],
      ["aware", "adj.", "意识到的；知道的", "Consumers are increasingly aware of environmental costs.", "消费者越来越意识到环境成本。"],
      ["benefit", "n. / v.", "益处；受益", "Regular exercise benefits both body and mind.", "经常锻炼对身心都有益。"],
      ["bias", "n. / v.", "偏见；使有偏见", "The study was criticized for its selection bias.", "这项研究因选择偏差而受到批评。"],
      ["capacity", "n.", "容量；能力", "The city lacks the capacity to treat all its waste.", "这座城市缺乏处理全部垃圾的能力。"],
      ["challenge", "n. / v.", "挑战；质疑", "Climate change is a global challenge requiring cooperation.", "气候变化是需要合作的全球性挑战。"],
      ["circumstance", "n.", "情况；环境", "Under these circumstances, postponing the trip was wise.", "在这种情况下，推迟旅行是明智的。"],
      ["clarify", "v.", "澄清；阐明", "The author clarifies her argument in the second chapter.", "作者在第二章澄清了她的论点。"],
      ["coherent", "adj.", "连贯的；前后一致的", "A good essay presents a coherent line of reasoning.", "一篇好文章会呈现连贯的推理线索。"],
      ["collapse", "v. / n.", "倒塌；崩溃", "The old bridge collapsed after days of heavy rain.", "旧桥在连日大雨后倒塌了。"],
      ["commence", "v.", "开始；着手", "The ceremony will commence at nine o'clock.", "仪式将在九点开始。"],
      ["compensate", "v.", "补偿；弥补", "The company compensated residents for the noise pollution.", "公司就噪音污染向居民作出了补偿。"],
      ["compile", "v.", "编纂；汇编", "The team compiled a report from hundreds of interviews.", "团队根据数百次访谈编写了一份报告。"],
      ["complement", "v. / n.", "补充；补充物", "Practical training should complement classroom learning.", "实践培训应补充课堂学习。"],
      ["complex", "adj.", "复杂的；复合的", "Urban poverty is a complex social issue.", "城市贫困是一个复杂的社会问题。"],
      ["comprehensive", "adj.", "全面的；综合的", "The course offers a comprehensive introduction to economics.", "这门课程提供经济学的全面入门。"],
      ["comprise", "v.", "包含；由……组成", "The committee comprises experts from five countries.", "委员会由来自五个国家的专家组成。"],
      ["concentrate", "v.", "集中；专心", "It is hard to concentrate in a noisy room.", "在嘈杂的房间里很难集中注意力。"],
      ["concept", "n.", "概念；观念", "The concept of sustainable development is widely accepted.", "可持续发展的概念已被广泛接受。"],
      ["conclude", "v.", "得出结论；结束", "The researchers concluded that sleep affects memory.", "研究人员得出结论：睡眠会影响记忆。"],
      ["concurrent", "adj.", "同时发生的；并存的", "The two events were concurrent, so she could attend only one.", "这两个活动同时举行，所以她只能参加一个。"],
      ["conduct", "v. / n.", "进行；行为", "The university conducted a survey on student wellbeing.", "大学开展了一项关于学生福祉的调查。"],
      ["confine", "v.", "限制；把……局限于", "The discussion should be confined to the main topic.", "讨论应限制在主要议题上。"],
      ["conflict", "n. / v.", "冲突；相抵触", "Economic growth can conflict with environmental protection.", "经济增长可能与环境保护发生冲突。"],
      ["conform", "v.", "遵守；符合", "New buildings must conform to strict safety standards.", "新建筑必须符合严格的安全标准。"],
      ["consent", "n. / v.", "同意；准许", "Participants gave written consent before the experiment.", "参与者在实验前给出了书面同意。"],
      ["consequence", "n.", "后果；结果", "Rising sea levels are a consequence of global warming.", "海平面上升是全球变暖的后果。"],
      ["considerable", "adj.", "相当大的；可观的", "The project required a considerable amount of time.", "这个项目需要相当多的时间。"],
      ["consist", "v.", "由……组成；在于", "The exam consists of four separate sections.", "考试由四个独立部分组成。"],
      ["constant", "adj.", "不断的；恒定的", "Constant practice is the key to language fluency.", "持续练习是语言流利的关键。"],
      ["constitute", "v.", "构成；组成", "Women constitute nearly half of the workforce.", "女性占劳动力的近一半。"],
      ["constrain", "v.", "限制；约束", "Limited funding constrained the scope of the research.", "有限的资金限制了研究的范围。"],
      ["construct", "v.", "建造；构建", "Engineers constructed a barrier to protect the coast.", "工程师建造了一道屏障来保护海岸。"],
      ["consume", "v.", "消耗；消费", "Modern households consume far more energy than before.", "现代家庭消耗的能源远多于以前。"],
      ["contemporary", "adj.", "当代的；同时代的", "The gallery focuses on contemporary art.", "这家画廊专注于当代艺术。"],
      ["context", "n.", "背景；语境", "The meaning of a word depends on its context.", "一个词的含义取决于它的语境。"],
      ["contradict", "v.", "反驳；与……矛盾", "The new evidence contradicts the earlier theory.", "新证据与早先的理论相矛盾。"],
      ["convention", "n.", "惯例；大会；公约", "It is a convention to shake hands at the start of a meeting.", "会议开始时握手是一种惯例。"],
      ["convert", "v.", "转换；改造", "The old factory was converted into a cultural centre.", "旧工厂被改造成文化中心。"],
      ["convey", "v.", "传达；运送", "A graph can convey complex information quickly.", "图表可以快速传达复杂信息。"],
      ["convince", "v.", "使信服；说服", "The evidence convinced the jury of his innocence.", "证据使陪审团相信他是无辜的。"],
      ["cooperate", "v.", "合作；配合", "Countries must cooperate to reduce plastic waste.", "各国必须合作减少塑料垃圾。"],
      ["crucial", "adj.", "关键的；至关重要的", "Sleep plays a crucial role in learning.", "睡眠在学习中起着关键作用。"],
      ["cultivate", "v.", "培养；耕种", "Schools should cultivate curiosity and independent thinking.", "学校应培养好奇心和独立思考能力。"],
      ["decline", "v. / n.", "下降；拒绝", "The number of wild bees has declined sharply.", "野生蜜蜂的数量急剧下降。"],
      ["dedicate", "v.", "奉献；致力于", "She dedicated her career to improving rural education.", "她把职业生涯奉献给了改善农村教育。"],
      ["demonstrate", "v.", "证明；展示；示范", "The experiment demonstrates how heat affects pressure.", "这个实验演示了热量如何影响压力。"],
      ["denote", "v.", "表示；意味着", "In this chart, the red line denotes average rainfall.", "在这张图中，红线表示平均降雨量。"],
      ["derive", "v.", "源自；获得", "The word derives from an ancient Greek term.", "这个词源自一个古希腊术语。"],
      ["detect", "v.", "察觉；检测", "Sensors can detect tiny changes in air quality.", "传感器可以检测到空气质量的微小变化。"],
      ["diminish", "v.", "减少；减弱", "The effect of the medicine diminishes after a few hours.", "药效在几小时后减弱。"],
      ["discriminate", "v.", "歧视；区分", "The law forbids employers to discriminate by age.", "法律禁止雇主以年龄为由歧视他人。"],
      ["dispose", "v.", "处理；丢弃", "Consumers should dispose of batteries safely.", "消费者应安全处理电池。"],
      ["distinct", "adj.", "明显的；截然不同的", "There is a distinct difference between the two species.", "这两个物种之间有明显的区别。"],
      ["distribute", "v.", "分发；分配；分布", "Volunteers distributed food to affected families.", "志愿者向受灾家庭分发食物。"],
      ["diverse", "adj.", "多样的；不同的", "London is home to a diverse range of communities.", "伦敦拥有多元化的社区。"],
      ["dominate", "v.", "支配；占主导地位", "A few large firms dominate the smartphone market.", "几家大公司主导了智能手机市场。"],
      ["drastic", "adj.", "剧烈的；严厉的", "The city took drastic measures to cut air pollution.", "这座城市采取了严厉措施来减少空气污染。"],
      ["duration", "n.", "持续时间；期间", "The duration of the course is twelve weeks.", "这门课程的持续时间是十二周。"],
      ["dynamic", "adj.", "动态的；有活力的", "The labour market is dynamic and constantly changing.", "劳动力市场充满活力且不断变化。"],
      ["efficient", "adj.", "高效的；效率高的", "Public transport is a more efficient use of road space.", "公共交通是对道路空间更高效的利用。"],
      ["elaborate", "v. / adj.", "详细阐述；精心制作的", "The report elaborates on the causes of migration.", "报告详细阐述了移民的原因。"],
      ["eliminate", "v.", "消除；淘汰", "Vaccination has eliminated several deadly diseases.", "疫苗接种已经消灭了几种致命疾病。"],
      ["emerge", "v.", "出现；显露", "New patterns of work emerged during the pandemic.", "疫情期间出现了新的工作模式。"],
      ["empirical", "adj.", "实证的；经验主义的", "The claim is not supported by empirical evidence.", "这一说法没有实证证据支持。"],
      ["enhance", "v.", "增强；提高", "Good lighting can enhance the quality of a photograph.", "良好的光线可以提升照片质量。"],
      ["enormous", "adj.", "巨大的；庞大的", "The internet has had an enormous impact on education.", "互联网对教育产生了巨大影响。"],
      ["ensure", "v.", "确保；保证", "Please ensure that all sources are properly cited.", "请确保所有来源都得到恰当引用。"],
      ["equivalent", "adj. / n.", "等同的；等价物", "One hour of cycling is roughly equivalent to a short run.", "骑一小时自行车大致相当于短跑一会儿。"],
      ["establish", "v.", "建立；确立", "The organization was established in 1998.", "该组织成立于1998年。"],
      ["estimate", "v. / n.", "估计；估价", "Experts estimate that the population will double by 2050.", "专家估计到2050年人口将翻一番。"],
      ["ethical", "adj.", "道德的；伦理的", "Researchers must consider the ethical implications of their work.", "研究人员必须考虑其工作的伦理影响。"],
      ["evaluate", "v.", "评价；评估", "The committee will evaluate each proposal on its merits.", "委员会将根据每项提案的优劣进行评估。"],
      ["evident", "adj.", "明显的；显然的", "It is evident that the policy has reduced traffic accidents.", "很明显，该政策减少了交通事故。"],
      ["evolve", "v.", "演变；进化", "Languages evolve as societies change.", "语言随着社会变化而演变。"],
      ["exaggerate", "v.", "夸大；夸张", "The media sometimes exaggerates the risks of new technology.", "媒体有时会夸大新技术的风险。"],
      ["exceed", "v.", "超过；超越", "The cost of the project exceeded the original budget.", "项目成本超过了原始预算。"],
      ["exclude", "v.", "排除；把……排除在外", "The survey excluded people under eighteen.", "这项调查排除了十八岁以下的人。"],
      ["exploit", "v.", "利用；剥削", "Some companies exploit cheap labour in developing countries.", "一些公司剥削发展中国家的廉价劳动力。"],
      ["expose", "v.", "暴露；揭露", "The documentary exposes the hidden costs of fast fashion.", "这部纪录片揭露了快时尚的隐性成本。"],
      ["extract", "v. / n.", "提取；摘录", "The study extracted data from hospital records.", "这项研究从医院记录中提取了数据。"],
      ["facilitate", "v.", "促进；使便利", "Online forums facilitate discussion among distant learners.", "在线论坛促进了远程学习者之间的讨论。"],
      ["fluctuate", "v.", "波动；起伏", "Oil prices fluctuate with global demand.", "石油价格随全球需求波动。"],
      ["fundamental", "adj.", "基本的；根本的", "Trust is fundamental to a healthy relationship.", "信任是健康关系的基础。"],
      ["generate", "v.", "产生；生成", "Solar panels generate electricity from sunlight.", "太阳能电池板利用阳光发电。"],
      ["hypothesis", "n.", "假设；假说", "The experiment was designed to test the hypothesis.", "这个实验旨在检验该假设。"],
      ["illustrate", "v.", "说明；举例说明", "The case study illustrates the importance of early action.", "这个案例研究说明了及早行动的重要性。"],
      ["imply", "v.", "暗示；意味着", "The results imply that diet affects mood.", "结果暗示饮食会影响情绪。"],
      ["impose", "v.", "强加；征收", "The government imposed a tax on sugary drinks.", "政府对含糖饮料征税。"],
      ["incentive", "n.", "激励；刺激", "Tax breaks give companies an incentive to invest.", "税收减免激励企业投资。"],
      ["indicate", "v.", "表明；指示", "The data indicate a steady improvement in literacy.", "数据表明识字率稳步提高。"],
      ["inevitable", "adj.", "不可避免的；必然的", "Some degree of uncertainty is inevitable in research.", "研究中一定程度的不确定性是不可避免的。"]
    ];
    const WORDS = WORD_ROWS.map((row, index) => ({
      id: 'w' + (index + 1),
      w: row[0],
      k: row[1],
      m: row[2],
      e: row[3],
      z: row[4]
    }));
    const WORD_BY_ID = new Map(WORDS.map(word => [word.id, word]));
    const WORD_IDS = new Set(WORDS.map(word => word.id));
    const BUILTIN_WORD_KEYS = new Set(WORDS.map(word => word.w.toLowerCase()));
    const FIELD_ALIASES = {
      w: ['word', 'term', 'w', '单词', '英文', '词汇', 'wordphrase'],
      k: ['pos', 'partofspeech', 'k', '词性'],
      m: ['meaning', 'definition', 'm', '释义', '中文', '中文释义', '意思', '解释'],
      e: ['example', 'sentence', 'e', '例句', '例句英文'],
      z: ['translation', 'exampletranslation', 'z', '翻译', '例句翻译', '例句中文']
    };

    function normalizeFieldName(value) {
      return String(value === undefined || value === null ? '' : value).trim().toLowerCase().replace(/[\s_\-/\\]+/g, '');
    }

    function wordEntryFrom(raw) {
      if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
      const source = {};
      Object.keys(raw).forEach(key => {
        source[normalizeFieldName(key)] = raw[key];
      });
      const pick = field => {
        const aliases = FIELD_ALIASES[field];
        for (let index = 0; index < aliases.length; index += 1) {
          const value = source[normalizeFieldName(aliases[index])];
          if (value !== undefined && value !== null && String(value).trim() !== '') return String(value).trim();
        }
        return '';
      };
      const word = pick('w');
      const meaning = pick('m');
      if (!word || !meaning) return null;
      return {
        w: word.slice(0, 80),
        k: pick('k').slice(0, 24),
        m: meaning.slice(0, 400),
        e: pick('e').slice(0, 600),
        z: pick('z').slice(0, 600)
      };
    }

    function hashText(text) {
      let hash = 2166136261;
      for (let index = 0; index < text.length; index += 1) {
        hash ^= text.charCodeAt(index);
        hash = Math.imul(hash, 16777619);
      }
      return (hash >>> 0).toString(36);
    }

    function makeCustomWordId(seenIds, entry) {
      const base = 'c' + hashText(entry.w.toLowerCase() + '\u0000' + entry.m + '\u0000' + entry.e);
      let id = base;
      let suffix = 2;
      while (seenIds.has(id)) {
        id = base + '-' + suffix;
        suffix += 1;
      }
      return id;
    }

    function normalizeCustomWords(raw) {
      const result = [];
      if (!Array.isArray(raw)) return result;
      const seenWords = new Set(BUILTIN_WORD_KEYS);
      const seenIds = new Set();
      raw.forEach(item => {
        const entry = wordEntryFrom(item);
        if (!entry) return;
        const key = entry.w.toLowerCase();
        if (seenWords.has(key)) return;
        let id = item && typeof item.id === 'string' ? item.id.trim() : '';
        if (!id || seenIds.has(id) || WORD_IDS.has(id)) id = makeCustomWordId(seenIds, entry);
        seenWords.add(key);
        seenIds.add(id);
        result.push({ id: id, custom: true, w: entry.w, k: entry.k, m: entry.m, e: entry.e, z: entry.z });
      });
      return result;
    }

    function allWords(state) {
      const custom = state && Array.isArray(state.customWords) ? state.customWords : [];
      return custom.length > 0 ? WORDS.concat(custom) : WORDS;
    }

    function findWord(state, id) {
      if (!id) return null;
      const builtIn = WORD_BY_ID.get(id);
      if (builtIn) return builtIn;
      const custom = state && Array.isArray(state.customWords) ? state.customWords : [];
      return custom.find(word => word.id === id) || null;
    }

    function parseCsvRows(text) {
      const rows = [];
      let row = [];
      let field = '';
      let quoted = false;
      for (let index = 0; index < text.length; index += 1) {
        const character = text.charAt(index);
        if (quoted) {
          if (character === '"') {
            if (text.charAt(index + 1) === '"') {
              field += '"';
              index += 1;
            } else {
              quoted = false;
            }
          } else {
            field += character;
          }
        } else if (character === '"') {
          quoted = true;
        } else if (character === ',') {
          row.push(field);
          field = '';
        } else if (character === '\n') {
          row.push(field);
          rows.push(row);
          row = [];
          field = '';
        } else if (character !== '\r') {
          field += character;
        }
      }
      if (field !== '' || row.length > 0) {
        row.push(field);
        rows.push(row);
      }
      return rows.filter(line => line.some(cell => String(cell).trim() !== ''));
    }

    function parseWordFile(text, filename) {
      const clean = String(text || '').replace(/^\uFEFF/, '').trim();
      if (!clean) return { entries: [], invalid: 0 };
      const looksJson = /\.json$/i.test(String(filename || '')) || clean.charAt(0) === '[' || clean.charAt(0) === '{';

      if (looksJson) {
        const parsed = JSON.parse(clean);
        let list = null;
        if (Array.isArray(parsed)) list = parsed;
        else if (parsed && Array.isArray(parsed.words)) list = parsed.words;
        else if (parsed && Array.isArray(parsed.data)) list = parsed.data;
        if (!list) throw new Error('JSON must be an array of words, or an object with a words/data array');
        let invalid = 0;
        const entries = [];
        list.forEach(item => {
          const entry = wordEntryFrom(item);
          if (entry) entries.push(entry);
          else invalid += 1;
        });
        return { entries: entries, invalid: invalid };
      }

      const rows = parseCsvRows(clean);
      if (rows.length === 0) return { entries: [], invalid: 0 };
      const headerNames = rows[0].map(normalizeFieldName);
      const headerFields = {};
      headerNames.forEach((name, index) => {
        Object.keys(FIELD_ALIASES).forEach(field => {
          if (FIELD_ALIASES[field].some(alias => normalizeFieldName(alias) === name)) headerFields[index] = field;
        });
      });
      const hasHeader = Object.keys(headerFields).length > 0;
      const dataRows = hasHeader ? rows.slice(1) : rows;
      let invalid = 0;
      const entries = [];
      dataRows.forEach(line => {
        const raw = hasHeader ? {} : { w: line[0], k: line[1], m: line[2], e: line[3], z: line[4] };
        if (hasHeader) {
          Object.keys(headerFields).forEach(index => {
            raw[headerFields[index]] = line[Number(index)] || '';
          });
        }
        const entry = wordEntryFrom(raw);
        if (entry) entries.push(entry);
        else invalid += 1;
      });
      return { entries: entries, invalid: invalid };
    }

    function readFileText(file) {
      if (file && typeof file.text === 'function') return file.text();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ''));
        reader.onerror = () => reject(reader.error || new Error('Could not read the file'));
        reader.readAsText(file, 'utf-8');
      });
    }

    const DICTS = {
      zh: {
        brand: 'IELTS 单词宠物',
        settings: '设置',
        back: '回到单词',
        close: '收起',
        open: '打开单词宠物',
        listen: '朗读单词',
        known: '认识',
        unknown: '不认识',
        newBadge: '新词',
        reviewBadge: '复习',
        level: '熟悉度',
        petStyle: '宠物形象',
        petStyleHint: '选一只陪你背单词。',
        petCat: '猫',
        petDog: '狗',
        petCapybara: '卡皮巴拉',
        customWords: '自定义词库',
        customWordsHint: '导入 CSV 或 JSON，导入的词会加入每日学习队列。',
        importWords: '导入词表',
        clearCustom: '清空',
        customCount: '自定义词',
        imported: '已导入',
        skipped: '跳过',
        wordUnit: '词',
        importEmpty: '没有找到有效单词。',
        importError: '导入失败',
        formatHint: 'CSV 表头：word, pos, meaning, example, translation',
        clearConfirm: '确定清空自定义词库和这些词的学习记录吗？',
        cleared: '自定义词库已清空。',
        selfCheck: '凭印象判断，宠物会自动安排下次出现。',
        knownFeedback: '很好，已记录！',
        unknownFeedback: '没关系，稍后还会见到它。',
        meaning: '释义',
        next: '下一个',
        undoLast: '上一步',
        canDo: '会',
        cannotDo: '不会',
        keyBack: '返回',
        dailyGoal: '每日新词上限',
        dailyGoalHint: '最多 100 词，次日自动开始新一轮。',
        autoPop: '自动探出头',
        autoPopHint: '空闲时让宠物主动递上一个单词。',
        interval: '弹出间隔',
        minutes: '分钟',
        minus: '减少',
        plus: '增加',
        today: '今日',
        statsToday: '今日新词',
        statsReview: '今日复习',
        statsFamiliar: '已熟悉',
        statsDue: '待复习',
        doneTitle: '这一轮完成啦',
        doneGoalText: '今日新词目标已达成，熟悉的词会按间隔回来复习。',
        doneBankText: '词库已全部见过，接下来进入长期复习模式。',
        donePending: '现在没有到期的单词，宠物稍后还会来找你。',
        keepGoing: '继续复习',
        later: '稍后再说',
        progressLabel: '今日新词进度'
      },
      en: {
        brand: 'IELTS word pet',
        settings: 'Settings',
        back: 'Back to words',
        close: 'Minimize',
        open: 'Open word pet',
        listen: 'Pronounce word',
        known: 'Know it',
        unknown: 'Not yet',
        newBadge: 'New',
        reviewBadge: 'Review',
        level: 'Familiarity',
        petStyle: 'Pet style',
        petStyleHint: 'Choose your study companion.',
        petCat: 'Cat',
        petDog: 'Dog',
        petCapybara: 'Capybara',
        customWords: 'Custom words',
        customWordsHint: 'Import a CSV or JSON file and its words join the daily queue.',
        importWords: 'Import words',
        clearCustom: 'Clear',
        customCount: 'Custom words',
        imported: 'Imported',
        skipped: 'skipped',
        wordUnit: 'words',
        importEmpty: 'No valid words were found.',
        importError: 'Import failed',
        formatHint: 'CSV header: word, pos, meaning, example, translation',
        clearConfirm: 'Clear all custom words and their study records?',
        cleared: 'Custom words cleared.',
        selfCheck: 'Judge from memory; the pet schedules the next visit.',
        knownFeedback: 'Nice, recorded!',
        unknownFeedback: 'No problem, it will return soon.',
        meaning: 'Meaning',
        next: 'Next',
        undoLast: 'Previous answer',
        canDo: 'I know it',
        cannotDo: 'I do not',
        keyBack: 'back',
        dailyGoal: 'Daily new-word limit',
        dailyGoalHint: 'Up to 100 words; a new round starts the next day.',
        autoPop: 'Pop up automatically',
        autoPopHint: 'Let the pet offer a word while you are idle.',
        interval: 'Pop-up interval',
        minutes: 'min',
        minus: 'Decrease',
        plus: 'Increase',
        today: 'Today',
        statsToday: 'New today',
        statsReview: 'Reviewed today',
        statsFamiliar: 'Familiar',
        statsDue: 'Due',
        doneTitle: 'This round is complete',
        doneGoalText: 'The daily new-word goal is reached. Familiar words will return on schedule.',
        doneBankText: 'Every word has been introduced. Long-term review continues from here.',
        donePending: 'Nothing is due right now. The pet will come back later.',
        keepGoing: 'Keep reviewing',
        later: 'Later',
        progressLabel: 'New-word progress today'
      }
    };

    const CSS = `
      .ielts-pet-root {
        position: fixed;
        right: 24px;
        bottom: 86px;
        z-index: 60;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 10px;
        pointer-events: none;
        color: var(--dsw-alias-label-primary);
        font-family: system-ui, -apple-system, "Segoe UI", "Microsoft YaHei", sans-serif;
        font-size: 13px;
        line-height: 1.5;
      }
      .ielts-pet-root *, .ielts-pet-root *::before, .ielts-pet-root *::after { box-sizing: border-box; }
      .ielts-pet-bubble {
        position: relative;
        width: 356px;
        max-width: calc(100vw - 32px);
        background: var(--dsw-alias-bg-overlay);
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 18px;
        box-shadow: 0 18px 50px rgba(0, 0, 0, .18);
        pointer-events: auto;
        animation: ieltsPetPop .3s cubic-bezier(.2, .8, .3, 1);
      }
      .ielts-pet-bubble::after {
        content: "";
        position: absolute;
        right: 42px;
        bottom: -7px;
        width: 12px;
        height: 12px;
        background: var(--dsw-alias-bg-overlay);
        border-right: 1px solid var(--dsw-alias-border-l1);
        border-bottom: 1px solid var(--dsw-alias-border-l1);
        transform: rotate(45deg);
      }
      .ielts-pet-head {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 12px 12px 0;
      }
      .ielts-pet-brand {
        display: flex;
        align-items: center;
        gap: 6px;
        min-width: 0;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: .01em;
        color: var(--dsw-alias-label-secondary);
      }
      .ielts-pet-brand-name {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .ielts-pet-dot {
        flex: none;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--dsw-alias-state-success-primary);
        box-shadow: 0 0 0 3px rgba(35, 160, 110, .14);
      }
      .ielts-pet-goal {
        flex: none;
        margin-left: auto;
        padding: 2px 7px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 999px;
        background: var(--dsw-alias-bg-layer-2);
        color: var(--dsw-alias-label-secondary);
        font-size: 11px;
        font-variant-numeric: tabular-nums;
        line-height: 1.5;
      }
      .ielts-pet-goal b { color: var(--dsw-alias-label-primary); font-weight: 700; }
      .ielts-pet-iconbtn {
        flex: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 27px;
        height: 27px;
        padding: 0;
        border: 0;
        border-radius: 8px;
        background: transparent;
        color: var(--dsw-alias-label-secondary);
        cursor: pointer;
      }
      .ielts-pet-iconbtn:hover { background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); }
      .ielts-pet-iconbtn:focus-visible,
      .ielts-pet-action:focus-visible,
      .ielts-pet-speak:focus-visible,
      .ielts-pet-next:focus-visible,
      .ielts-pet-undo:focus-visible,
      .ielts-pet-undo-inline:focus-visible,
      .ielts-pet-back:focus-visible,
      .ielts-pet-preset:focus-visible,
      .ielts-pet-choice:focus-visible,
      .ielts-pet-import-btn:focus-visible,
      .ielts-pet-step:focus-visible,
      .ielts-pet-switch:focus-visible,
      .ielts-pet-petbutton:focus-visible {
        outline: 2px solid var(--dsw-alias-brand-primary);
        outline-offset: 2px;
      }
      .ielts-pet-meter {
        height: 3px;
        margin: 8px 12px 0;
        border-radius: 999px;
        background: var(--dsw-alias-bg-layer-2);
        overflow: hidden;
      }
      .ielts-pet-meter-fill {
        height: 100%;
        border-radius: inherit;
        background: var(--dsw-alias-brand-primary);
        transition: width .35s ease;
      }
      .ielts-pet-body {
        padding: 11px 14px 14px;
        max-height: calc(100vh - 260px);
        overflow-y: auto;
        overscroll-behavior: contain;
      }
      .ielts-pet-wordline { display: flex; align-items: flex-start; gap: 8px; }
      .ielts-pet-wordwrap { min-width: 0; flex: 1; }
      .ielts-pet-badge {
        display: inline-block;
        margin-bottom: 2px;
        padding: 1px 6px;
        border-radius: 5px;
        background: var(--dsw-alias-bg-layer-2);
        color: var(--dsw-alias-brand-primary);
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .04em;
      }
      .ielts-pet-word {
        margin: 0;
        font-size: 30px;
        line-height: 1.16;
        font-weight: 750;
        letter-spacing: -.025em;
        overflow-wrap: anywhere;
      }
      .ielts-pet-speak {
        flex: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        margin-top: 15px;
        padding: 0;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 50%;
        background: var(--dsw-alias-bg-layer-2);
        color: var(--dsw-alias-brand-primary);
        cursor: pointer;
        transition: transform .16s ease, background .16s ease;
      }
      .ielts-pet-speak:hover { transform: scale(1.06); background: var(--dsw-alias-bg-layer-1); }
      .ielts-pet-subline {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 7px;
        color: var(--dsw-alias-label-secondary);
        font-size: 11.5px;
      }
      .ielts-pet-pos {
        padding: 1px 6px;
        border-radius: 5px;
        background: var(--dsw-alias-bg-layer-2);
        color: var(--dsw-alias-label-secondary);
        font-style: italic;
      }
      .ielts-pet-level { display: inline-flex; align-items: center; gap: 3px; }
      .ielts-pet-level i {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: var(--dsw-alias-border-l2);
      }
      .ielts-pet-level i.on { background: var(--dsw-alias-state-success-primary); }
      .ielts-pet-example {
        margin: 12px 0 0;
        font-size: 14px;
        line-height: 1.68;
        color: var(--dsw-alias-label-primary);
      }
      .ielts-pet-example mark {
        padding: 0 2px;
        border-radius: 4px;
        background: var(--dsw-alias-brand-primary);
        color: var(--dsw-alias-bg-base);
        font-weight: 650;
      }
      .ielts-pet-actions {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        margin-top: 14px;
      }
      .ielts-pet-action {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        height: 42px;
        padding: 0 9px;
        border-radius: 12px;
        font: inherit;
        font-size: 13.5px;
        font-weight: 700;
        cursor: pointer;
        transition: transform .16s ease, filter .16s ease;
      }
      .ielts-pet-action:hover { transform: translateY(-1px); filter: brightness(1.03); }
      .ielts-pet-action:active { transform: translateY(0) scale(.99); }
      .ielts-pet-action svg { flex: none; }
      .ielts-pet-action.unknown {
        border: 1px solid var(--dsw-alias-state-error-primary);
        background: var(--dsw-alias-bg-layer-2);
        color: var(--dsw-alias-state-error-primary);
      }
      .ielts-pet-action.known {
        border: 1px solid var(--dsw-alias-state-success-primary);
        background: var(--dsw-alias-state-success-primary);
        color: var(--dsw-alias-bg-base);
      }
      .ielts-pet-selfcheck {
        margin-top: 8px;
        text-align: center;
        color: var(--dsw-alias-label-secondary);
        font-size: 10.5px;
      }
      .ielts-pet-keyhint {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 4px;
        margin-top: 6px;
        color: var(--dsw-alias-label-secondary);
        font-size: 10px;
      }
      .ielts-pet-keyhint kbd {
        padding: 0 4px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-bottom-width: 2px;
        border-radius: 4px;
        background: var(--dsw-alias-bg-layer-2);
        color: var(--dsw-alias-label-secondary);
        font: inherit;
        font-size: 9.5px;
        line-height: 1.55;
      }
      .ielts-pet-reveal {
        margin-top: 12px;
        padding: 11px 12px 12px;
        border-radius: 12px;
        background: var(--dsw-alias-bg-layer-2);
        border-left: 3px solid var(--dsw-alias-state-success-primary);
        animation: ieltsPetSlide .22s ease;
      }
      .ielts-pet-reveal.no { border-left-color: var(--dsw-alias-state-error-primary); }
      .ielts-pet-reveal-head {
        color: var(--dsw-alias-state-success-primary);
        font-size: 12.5px;
        font-weight: 700;
      }
      .ielts-pet-reveal.no .ielts-pet-reveal-head { color: var(--dsw-alias-state-error-primary); }
      .ielts-pet-meaning {
        display: flex;
        align-items: baseline;
        gap: 7px;
        margin-top: 6px;
        font-size: 14px;
      }
      .ielts-pet-meaning span {
        flex: none;
        color: var(--dsw-alias-label-secondary);
        font-size: 10.5px;
      }
      .ielts-pet-meaning b { font-weight: 700; }
      .ielts-pet-trans {
        margin: 5px 0 0;
        color: var(--dsw-alias-label-secondary);
        font-size: 12px;
        line-height: 1.55;
      }
      .ielts-pet-reveal-actions {
        display: flex;
        align-items: stretch;
        gap: 6px;
        margin-top: 10px;
      }
      .ielts-pet-reveal-actions .ielts-pet-next { flex: 1; width: auto; margin-top: 0; }
      .ielts-pet-undo {
        flex: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        padding: 0 10px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 9px;
        background: transparent;
        color: var(--dsw-alias-label-secondary);
        font: inherit;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
      }
      .ielts-pet-undo:hover { background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary); }
      .ielts-pet-undo.to-unknown {
        border-color: var(--dsw-alias-state-error-primary);
        color: var(--dsw-alias-state-error-primary);
      }
      .ielts-pet-undo.to-known {
        border-color: var(--dsw-alias-state-success-primary);
        color: var(--dsw-alias-state-success-primary);
      }
      .ielts-pet-undo-inline {
        display: flex;
        align-items: center;
        gap: 4px;
        margin: 7px auto 0;
        padding: 2px 7px;
        border: 0;
        border-radius: 7px;
        background: transparent;
        color: var(--dsw-alias-label-secondary);
        font: inherit;
        font-size: 10.5px;
        cursor: pointer;
      }
      .ielts-pet-undo-inline:hover { background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); }
      .ielts-pet-next {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        width: 100%;
        height: 34px;
        margin-top: 10px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 9px;
        background: var(--dsw-alias-bg-overlay);
        color: var(--dsw-alias-label-primary);
        font: inherit;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
      }
      .ielts-pet-next:hover { background: var(--dsw-alias-bg-layer-1); }
      .ielts-pet-settings-title {
        margin: 0 0 3px;
        font-size: 13px;
        font-weight: 700;
      }
      .ielts-pet-setting {
        display: flex;
        align-items: center;
        gap: 12px;
        justify-content: space-between;
        padding: 9px 0;
        border-bottom: 1px solid var(--dsw-alias-border-l1);
      }
      .ielts-pet-setting:last-child { border-bottom: 0; }
      .ielts-pet-setting-copy { min-width: 0; }
      .ielts-pet-setting-label { font-size: 12.5px; font-weight: 650; }
      .ielts-pet-setting-hint { margin-top: 2px; color: var(--dsw-alias-label-secondary); font-size: 10.5px; line-height: 1.45; }
      .ielts-pet-stepper {
        flex: none;
        display: flex;
        align-items: center;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 9px;
        overflow: hidden;
      }
      .ielts-pet-step {
        width: 28px;
        height: 30px;
        padding: 0;
        border: 0;
        background: var(--dsw-alias-bg-layer-2);
        color: var(--dsw-alias-label-primary);
        font: inherit;
        font-size: 16px;
        line-height: 1;
        cursor: pointer;
      }
      .ielts-pet-step:hover:not(:disabled) { background: var(--dsw-alias-bg-layer-1); }
      .ielts-pet-step:disabled { opacity: .35; cursor: default; }
      .ielts-pet-step-value {
        min-width: 34px;
        text-align: center;
        font-size: 13px;
        font-weight: 700;
        font-variant-numeric: tabular-nums;
      }
      .ielts-pet-range {
        display: block;
        width: 100%;
        margin: 10px 0 0;
        accent-color: var(--dsw-alias-brand-primary);
      }
      .ielts-pet-presets { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 7px; }
      .ielts-pet-preset {
        padding: 3px 8px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 999px;
        background: transparent;
        color: var(--dsw-alias-label-secondary);
        font: inherit;
        font-size: 10.5px;
        cursor: pointer;
      }
      .ielts-pet-preset:hover { background: var(--dsw-alias-bg-layer-2); }
      .ielts-pet-preset.on {
        border-color: var(--dsw-alias-brand-primary);
        background: var(--dsw-alias-brand-primary);
        color: var(--dsw-alias-bg-base);
        font-weight: 700;
      }
      .ielts-pet-petblock {
        padding: 9px 0;
        border-bottom: 1px solid var(--dsw-alias-border-l1);
      }
      .ielts-pet-petchoices {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 6px;
        margin-top: 8px;
      }
      .ielts-pet-choice {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        padding: 5px 3px 4px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 10px;
        background: transparent;
        color: var(--dsw-alias-label-secondary);
        font: inherit;
        cursor: pointer;
        transition: border-color .16s ease, background .16s ease;
      }
      .ielts-pet-choice:hover { background: var(--dsw-alias-bg-layer-2); }
      .ielts-pet-choice.on {
        border-color: var(--dsw-alias-brand-primary);
        background: var(--dsw-alias-bg-layer-2);
        color: var(--dsw-alias-label-primary);
        box-shadow: inset 0 0 0 1px var(--dsw-alias-brand-primary);
      }
      .ielts-pet-choice-art { display: block; width: 42px; height: 42px; }
      .ielts-pet-choice-label { font-size: 10px; line-height: 1.3; white-space: nowrap; }
      .ielts-pet-art-compact .ielts-pet-float,
      .ielts-pet-art-compact .ielts-pet-blink { animation: none; }
      .ielts-pet-import-row { display: flex; gap: 6px; margin-top: 8px; }
      .ielts-pet-import-btn {
        flex: 1;
        height: 32px;
        padding: 0 8px;
        border: 1px solid var(--dsw-alias-brand-primary);
        border-radius: 8px;
        background: var(--dsw-alias-brand-primary);
        color: var(--dsw-alias-bg-base);
        font: inherit;
        font-size: 11px;
        font-weight: 650;
        cursor: pointer;
      }
      .ielts-pet-import-btn.secondary {
        border-color: var(--dsw-alias-border-l1);
        background: transparent;
        color: var(--dsw-alias-label-secondary);
      }
      .ielts-pet-import-btn:hover { filter: brightness(1.04); }
      .ielts-pet-import-btn.secondary:hover { background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); }
      .ielts-pet-import-status {
        margin-top: 6px;
        color: var(--dsw-alias-label-secondary);
        font-size: 10px;
        line-height: 1.5;
        overflow-wrap: anywhere;
      }
      .ielts-pet-file { display: none; }
      .ielts-pet-switch {
        position: relative;
        flex: none;
        width: 38px;
        height: 22px;
        padding: 0;
        border: 0;
        border-radius: 999px;
        background: var(--dsw-alias-border-l2);
        cursor: pointer;
        transition: background .18s ease;
      }
      .ielts-pet-switch.on { background: var(--dsw-alias-state-success-primary); }
      .ielts-pet-knob {
        position: absolute;
        top: 3px;
        left: 3px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--dsw-alias-bg-base);
        box-shadow: 0 1px 3px rgba(0, 0, 0, .28);
        transition: transform .18s ease;
      }
      .ielts-pet-switch.on .ielts-pet-knob { transform: translateX(16px); }
      .ielts-pet-select {
        flex: none;
        height: 30px;
        padding: 0 6px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 8px;
        background: var(--dsw-alias-bg-layer-2);
        color: var(--dsw-alias-label-primary);
        font: inherit;
        font-size: 11.5px;
      }
      .ielts-pet-stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 6px;
        margin: 11px 0 2px;
      }
      .ielts-pet-stat {
        padding: 7px 9px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 9px;
        background: var(--dsw-alias-bg-layer-2);
      }
      .ielts-pet-stat b {
        display: block;
        font-size: 16px;
        line-height: 1.25;
        font-weight: 750;
        font-variant-numeric: tabular-nums;
      }
      .ielts-pet-stat span { color: var(--dsw-alias-label-secondary); font-size: 10px; }
      .ielts-pet-back {
        width: 100%;
        height: 36px;
        margin-top: 9px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 9px;
        background: var(--dsw-alias-bg-layer-2);
        color: var(--dsw-alias-label-primary);
        font: inherit;
        font-size: 12px;
        font-weight: 650;
        cursor: pointer;
      }
      .ielts-pet-back:hover { background: var(--dsw-alias-bg-layer-1); }
      .ielts-pet-done { text-align: center; padding: 2px 0 0; }
      .ielts-pet-done-pet { width: 62px; height: 62px; margin: 0 auto 2px; }
      .ielts-pet-done h3 { margin: 0; font-size: 18px; line-height: 1.3; letter-spacing: -.01em; }
      .ielts-pet-done p {
        margin: 5px auto 0;
        max-width: 290px;
        color: var(--dsw-alias-label-secondary);
        font-size: 12px;
        line-height: 1.55;
      }
      .ielts-pet-done .ielts-pet-stats { text-align: left; }
      .ielts-pet-primary {
        width: 100%;
        height: 38px;
        margin-top: 3px;
        border: 1px solid var(--dsw-alias-brand-primary);
        border-radius: 10px;
        background: var(--dsw-alias-brand-primary);
        color: var(--dsw-alias-bg-base);
        font: inherit;
        font-size: 12.5px;
        font-weight: 700;
        cursor: pointer;
      }
      .ielts-pet-secondary {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        width: 100%;
        height: 32px;
        margin-top: 6px;
        border: 0;
        border-radius: 9px;
        background: transparent;
        color: var(--dsw-alias-label-secondary);
        font: inherit;
        font-size: 11px;
        cursor: pointer;
      }
      .ielts-pet-secondary:hover { background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); }
      .ielts-pet-petwrap {
        display: flex;
        align-items: flex-end;
        gap: 6px;
        pointer-events: auto;
      }
      .ielts-pet-petbutton {
        position: relative;
        width: 88px;
        height: 88px;
        padding: 0;
        border: 0;
        background: transparent;
        cursor: pointer;
        filter: drop-shadow(0 10px 14px rgba(0, 0, 0, .2));
        transition: transform .2s ease, filter .2s ease;
      }
      .ielts-pet-petbutton:hover { transform: translateY(-2px) scale(1.025); filter: drop-shadow(0 13px 18px rgba(0, 0, 0, .24)); }
      .ielts-pet-art { display: block; width: 100%; height: 100%; overflow: visible; }
      .ielts-pet-float { animation: ieltsPetFloat 4.2s ease-in-out infinite; transform-origin: 48px 78px; }
      .ielts-pet-blink { animation: ieltsPetBlink 5.6s infinite; transform-box: fill-box; transform-origin: center; }
      .ielts-pet-count {
        position: absolute;
        right: -3px;
        bottom: 2px;
        padding: 2px 7px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 999px;
        background: var(--dsw-alias-bg-overlay);
        color: var(--dsw-alias-label-secondary);
        box-shadow: 0 3px 10px rgba(0, 0, 0, .14);
        font-size: 10px;
        font-variant-numeric: tabular-nums;
        line-height: 1.5;
        white-space: nowrap;
      }
      .ielts-pet-count b { color: var(--dsw-alias-label-primary); }
      @keyframes ieltsPetPop {
        from { opacity: 0; transform: translateY(9px) scale(.97); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes ieltsPetSlide {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes ieltsPetFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
      }
      @keyframes ieltsPetBlink {
        0%, 91%, 100% { transform: scaleY(1); }
        94% { transform: scaleY(.08); }
      }
      @media (max-width: 520px) {
        .ielts-pet-root { right: 10px; bottom: 72px; }
        .ielts-pet-bubble { width: calc(100vw - 20px); max-width: 356px; }
        .ielts-pet-word { font-size: 27px; }
        .ielts-pet-petbutton { width: 76px; height: 76px; }
      }
      @media (prefers-reduced-motion: reduce) {
        .ielts-pet-root *, .ielts-pet-root *::before, .ielts-pet-root *::after {
          animation-duration: .01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: .01ms !important;
        }
      }
    `;

    function clamp(value, min, max) {
      return Math.min(max, Math.max(min, value));
    }

    function cloneState(state) {
      return JSON.parse(JSON.stringify(state));
    }

    function dateKey(timestamp) {
      const date = new Date(timestamp === undefined ? Date.now() : timestamp);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return year + '-' + month + '-' + day;
    }

    function makeInitialState() {
      return {
        version: 1,
        settings: {
          dailyGoal: DEFAULT_SETTINGS.dailyGoal,
          autoPop: DEFAULT_SETTINGS.autoPop,
          intervalMin: DEFAULT_SETTINGS.intervalMin,
          pet: DEFAULT_SETTINGS.pet
        },
        cards: {},
        days: {},
        customWords: []
      };
    }

    function normalizeState(raw) {
      const state = makeInitialState();
      if (!raw || typeof raw !== 'object') return state;
      const settings = raw.settings && typeof raw.settings === 'object' ? raw.settings : {};
      const goal = Number(settings.dailyGoal);
      state.settings.dailyGoal = Number.isFinite(goal) ? clamp(Math.round(goal), 1, 100) : DEFAULT_SETTINGS.dailyGoal;
      state.settings.autoPop = settings.autoPop !== false;
      const interval = Number(settings.intervalMin);
      state.settings.intervalMin = INTERVAL_OPTIONS.indexOf(interval) >= 0 ? interval : DEFAULT_SETTINGS.intervalMin;
      state.settings.pet = PET_TYPES.indexOf(settings.pet) >= 0 ? settings.pet : DEFAULT_SETTINGS.pet;
      state.customWords = normalizeCustomWords(raw.customWords);
      const validIds = new Set(WORD_IDS);
      state.customWords.forEach(word => validIds.add(word.id));

      if (raw.cards && typeof raw.cards === 'object') {
        Object.keys(raw.cards).forEach(id => {
          const card = raw.cards[id];
          if (!validIds.has(id) || !card || typeof card !== 'object') return;
          const level = Number(card.level);
          state.cards[id] = {
            introducedAt: Number(card.introducedAt) || Date.now(),
            seen: Math.max(0, Number(card.seen) || 0),
            known: Math.max(0, Number(card.known) || 0),
            unknown: Math.max(0, Number(card.unknown) || 0),
            streak: Math.max(0, Number(card.streak) || 0),
            lapses: Math.max(0, Number(card.lapses) || 0),
            level: Number.isFinite(level) ? clamp(Math.round(level), 0, 5) : 0,
            nextDueAt: Number(card.nextDueAt) || Date.now(),
            lastSeenAt: Number(card.lastSeenAt) || 0,
            lastResult: card.lastResult === 'known' || card.lastResult === 'unknown' ? card.lastResult : null
          };
        });
      }

      if (raw.days && typeof raw.days === 'object') {
        Object.keys(raw.days).forEach(key => {
          const day = raw.days[key];
          if (!/^\d{4}-\d{2}-\d{2}$/.test(key) || !day || typeof day !== 'object') return;
          state.days[key] = {
            newIds: Array.isArray(day.newIds) ? day.newIds.filter(id => validIds.has(id)) : [],
            reviews: Math.max(0, Number(day.reviews) || 0),
            known: Math.max(0, Number(day.known) || 0),
            unknown: Math.max(0, Number(day.unknown) || 0)
          };
        });
      }
      return state;
    }

    function loadState() {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        return raw ? normalizeState(JSON.parse(raw)) : makeInitialState();
      } catch (error) {
        return makeInitialState();
      }
    }

    function saveState(state) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        /* The pet keeps working for this page even when storage is unavailable. */
      }
    }

    function ensureDay(state, now) {
      const stamp = now === undefined ? Date.now() : now;
      const key = dateKey(stamp);
      if (!state.days[key]) {
        state.days[key] = { newIds: [], reviews: 0, known: 0, unknown: 0 };
      }
      const keys = Object.keys(state.days).sort();
      while (keys.length > 60) {
        delete state.days[keys.shift()];
      }
      return state.days[key];
    }

    function computeStats(state) {
      const now = Date.now();
      const day = state.days[dateKey(now)] || { newIds: [], reviews: 0, known: 0, unknown: 0 };
      let due = 0;
      let familiar = 0;
      Object.keys(state.cards).forEach(id => {
        const card = state.cards[id];
        if (card.nextDueAt <= now) due += 1;
        if (card.level >= 3) familiar += 1;
      });
      return {
        todayNew: day.newIds.length,
        reviews: day.reviews,
        due: due,
        familiar: familiar,
        introduced: Object.keys(state.cards).length
      };
    }

    function hasWork(state) {
      const now = Date.now();
      const day = state.days[dateKey(now)] || { newIds: [] };
      const due = Object.keys(state.cards).some(id => state.cards[id].nextDueAt <= now);
      if (due) return true;
      return Object.keys(state.cards).length < allWords(state).length && day.newIds.length < state.settings.dailyGoal;
    }

    function chooseNext(state, avoidId, cycle) {
      const next = cloneState(state);
      const now = Date.now();
      const day = ensureDay(next, now);
      const due = [];
      Object.keys(next.cards).forEach(id => {
        const card = next.cards[id];
        if (id !== avoidId && card.nextDueAt <= now) due.push([id, card]);
      });
      due.sort((left, right) => {
        if (left[1].nextDueAt !== right[1].nextDueAt) return left[1].nextDueAt - right[1].nextDueAt;
        return right[1].lapses - left[1].lapses;
      });

      const unseen = allWords(next).filter(word => !next.cards[word.id]);
      const canIntroduce = unseen.length > 0 && day.newIds.length < next.settings.dailyGoal;
      let chosenId = null;
      let isNew = false;

      if (due.length > 0 && (!canIntroduce || cycle % 2 === 0)) {
        chosenId = due[0][0];
      } else if (canIntroduce) {
        chosenId = unseen[Math.floor(Math.random() * unseen.length)].id;
        isNew = true;
      } else if (due.length > 0) {
        chosenId = due[0][0];
      }

      if (!chosenId) return { state: next, id: null, isNew: false };
      if (isNew) {
        next.cards[chosenId] = {
          introducedAt: now,
          seen: 0,
          known: 0,
          unknown: 0,
          streak: 0,
          lapses: 0,
          level: 0,
          nextDueAt: now,
          lastSeenAt: 0,
          lastResult: null
        };
        day.newIds.push(chosenId);
      }
      return { state: next, id: chosenId, isNew: isNew };
    }

    function applyAnswer(state, targetCardId, known) {
      const now = Date.now();
      const next = cloneState(state);
      const day = ensureDay(next, now);
      const card = next.cards[targetCardId];
      if (!card) return null;

      const firstExposureToday = card.seen === 0 && day.newIds.indexOf(targetCardId) >= 0;
      card.seen += 1;
      card.lastSeenAt = now;
      card.lastResult = known ? 'known' : 'unknown';

      if (known) {
        card.known += 1;
        card.streak += 1;
        card.level = Math.min(5, card.level + 1);
        const days = REVIEW_DAYS[Math.max(0, card.level - 1)] || 60;
        card.nextDueAt = now + days * DAY_MS;
      } else {
        card.unknown += 1;
        card.streak = 0;
        card.lapses += 1;
        card.level = Math.max(0, card.level - 1);
        const delay = card.lapses <= 1 ? 45 * 1000 : card.lapses < 4 ? 2 * 60 * 1000 : 10 * 60 * 1000;
        card.nextDueAt = now + delay;
      }

      if (!firstExposureToday) day.reviews += 1;
      if (known) day.known += 1;
      else day.unknown += 1;
      return { state: next };
    }

    function splitExample(sentence, word) {
      const lower = sentence.toLowerCase();
      const needle = word.toLowerCase();
      let start = lower.indexOf(needle);
      let length = word.length;
      if (start < 0) {
        for (let size = word.length - 1; size >= 4; size -= 1) {
          start = lower.indexOf(word.slice(0, size).toLowerCase());
          if (start >= 0) {
            length = size;
            break;
          }
        }
      }
      if (start < 0) return [sentence];
      let end = start + length;
      while (end < sentence.length && /[a-z]/i.test(sentence.charAt(end))) end += 1;
      return [
        sentence.slice(0, start),
        h('mark', { key: 'hit' }, sentence.slice(start, end)),
        sentence.slice(end)
      ];
    }

    function speak(word) {
      try {
        if (!window.speechSynthesis || typeof window.SpeechSynthesisUtterance !== 'function') return;
        window.speechSynthesis.cancel();
        const utterance = new window.SpeechSynthesisUtterance(word);
        utterance.lang = 'en-GB';
        utterance.rate = 0.85;
        utterance.pitch = 1;
        const voices = window.speechSynthesis.getVoices();
        const voice = voices.find(item => /^en[-_]GB/i.test(item.lang)) || voices.find(item => /^en/i.test(item.lang));
        if (voice) utterance.voice = voice;
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        /* Speech is an enhancement; the card remains fully usable without it. */
      }
    }

    function IconSpeaker() {
      return h('svg', { viewBox: '0 0 20 20', width: 16, height: 16, fill: 'none', 'aria-hidden': true },
        h('path', { d: 'M4 8.2h3l4-3.2v10l-4-3.2H4V8.2z', stroke: 'currentColor', strokeWidth: 1.5, strokeLinejoin: 'round' }),
        h('path', { d: 'M14 7.2c1 1.2 1 4.4 0 5.6M16.3 5.5c2 2.5 2 6.5 0 9', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' })
      );
    }

    function IconCheck() {
      return h('svg', { viewBox: '0 0 20 20', width: 16, height: 16, fill: 'none', 'aria-hidden': true },
        h('path', { d: 'M4.2 10.5l3.4 3.4L15.8 5.8', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })
      );
    }

    function IconCross() {
      return h('svg', { viewBox: '0 0 20 20', width: 16, height: 16, fill: 'none', 'aria-hidden': true },
        h('path', { d: 'M5.2 5.2l9.6 9.6M14.8 5.2l-9.6 9.6', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' })
      );
    }

    function IconGear() {
      return h('svg', { viewBox: '0 0 20 20', width: 15, height: 15, fill: 'none', 'aria-hidden': true },
        h('path', { d: 'M8.5 3.2h3l.4 1.8c.5.2 1 .5 1.4.8l1.8-.5 1.5 2.6-1.4 1.2c0 .3.1.6.1 1s0 .7-.1 1l1.4 1.2-1.5 2.6-1.8-.5c-.4.3-.9.6-1.4.8l-.4 1.8h-3l-.4-1.8c-.5-.2-1-.5-1.4-.8l-1.8.5L3 12.1l1.4-1.2c0-.3-.1-.6-.1-1s0-.7.1-1L3 7.7l1.5-2.6 1.8.5c.4-.3.9-.6 1.4-.8l.4-1.8z', stroke: 'currentColor', strokeWidth: 1.25, strokeLinejoin: 'round' }),
        h('circle', { cx: 10, cy: 10, r: 2.2, stroke: 'currentColor', strokeWidth: 1.25 })
      );
    }

    function IconClose() {
      return h('svg', { viewBox: '0 0 20 20', width: 15, height: 15, fill: 'none', 'aria-hidden': true },
        h('path', { d: 'M5 5l10 10M15 5L5 15', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' })
      );
    }

    function IconArrow() {
      return h('svg', { viewBox: '0 0 20 20', width: 14, height: 14, fill: 'none', 'aria-hidden': true },
        h('path', { d: 'M4 10h11M11 5.5l4.5 4.5-4.5 4.5', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' })
      );
    }

    function IconUndo() {
      return h('svg', { viewBox: '0 0 20 20', width: 13, height: 13, fill: 'none', 'aria-hidden': true },
        h('path', { d: 'M7.5 5.5L3.8 9.2l3.7 3.7M4.2 9.2h7.1a4.3 4.3 0 0 1 0 8.6H8', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' })
      );
    }

    function petEye(cx, cy, mood, color, size) {
      const radius = size || 5.2;
      if (mood === 'happy') {
        return h('path', {
          key: 'eye-' + cx,
          d: 'M' + (cx - radius) + ' ' + (cy + 1) + ' Q' + cx + ' ' + (cy - radius + 1) + ' ' + (cx + radius) + ' ' + (cy + 1),
          fill: 'none',
          stroke: color,
          strokeWidth: 2.2,
          strokeLinecap: 'round'
        });
      }
      if (mood === 'sad') {
        return h('g', { key: 'eye-' + cx, stroke: color, strokeWidth: 2, strokeLinecap: 'round' },
          h('path', { d: 'M' + (cx - 3) + ' ' + (cy - 3) + 'l6 6M' + (cx + 3) + ' ' + (cy - 3) + 'l-6 6' })
        );
      }
      return h('g', { key: 'eye-' + cx, className: 'ielts-pet-blink' },
        h('circle', { cx: cx, cy: cy, r: radius, fill: '#fffdf8' }),
        h('circle', { cx: cx + 1, cy: cy + 1, r: radius * 0.46, fill: color }),
        h('circle', { cx: cx + 1.7, cy: cy - 0.2, r: Math.max(0.7, radius * 0.16), fill: '#ffffff' })
      );
    }

    function PetBook(props) {
      const y = props && Number.isFinite(props.y) ? props.y : 68;
      return h('g', { className: 'ielts-pet-book' },
        h('path', {
          d: 'M35 ' + y + 'c4-2 8.5-1 13 1 4.5-2 9-3 13-1v9c-4-2-8.5-1-13 1-4.5-2-9-3-13-1v-9z',
          fill: '#fffdf8',
          stroke: '#d7bd92',
          strokeWidth: 1.2
        }),
        h('path', { d: 'M48 ' + (y + 1) + 'v9', stroke: '#d7bd92', strokeWidth: 1.2 })
      );
    }

    function catArt(mood) {
      return {
        body: [
          h('path', { key: 'tail', d: 'M73 68c13-2 16-17 6-23', fill: 'none', stroke: '#d88f4a', strokeWidth: 8, strokeLinecap: 'round' }),
          h('ellipse', { key: 'body', cx: 48, cy: 65, rx: 27, ry: 18, fill: '#e8a15a' }),
          h('ellipse', { key: 'belly', cx: 48, cy: 67, rx: 17, ry: 13, fill: '#f8e7c6' }),
          h(PetBook, { key: 'book', y: 70 })
        ],
        head: [
          h('path', { key: 'earL', d: 'M26 30L20 11l17 10z', fill: '#e8a15a' }),
          h('path', { key: 'earR', d: 'M70 30l6-19-17 10z', fill: '#e8a15a' }),
          h('ellipse', { key: 'head', cx: 48, cy: 43, rx: 26, ry: 24, fill: '#e8a15a' }),
          h('path', { key: 'earInnerL', d: 'M27 26l-2-8 7 4z', fill: '#f5c6ae' }),
          h('path', { key: 'earInnerR', d: 'M69 26l2-8-7 4z', fill: '#f5c6ae' }),
          h('path', { key: 'stripes', d: 'M43 21l2 8M48 19v9M53 21l-2 8', fill: 'none', stroke: '#c97f3e', strokeWidth: 2, strokeLinecap: 'round' }),
          petEye(35, 44, mood, '#3c2b25', 5.2),
          petEye(61, 44, mood, '#3c2b25', 5.2),
          h('circle', { key: 'cheekL', cx: 28, cy: 55, r: 3.5, fill: '#ef9f8f', opacity: .5 }),
          h('circle', { key: 'cheekR', cx: 68, cy: 55, r: 3.5, fill: '#ef9f8f', opacity: .5 }),
          h('path', { key: 'nose', d: 'M44.5 52h7l-3.5 4z', fill: '#e98f8f' }),
          h('path', { key: 'mouth', d: 'M48 56q-4 4-7 0M48 56q4 4 7 0', fill: 'none', stroke: '#7b4d2a', strokeWidth: 1.4, strokeLinecap: 'round' }),
          h('path', { key: 'whiskers', d: 'M40 53L29 51M40 56l-11 2M56 53l11-2M56 56l11 2', fill: 'none', stroke: '#7b4d2a', strokeWidth: 1, strokeLinecap: 'round', opacity: .65 })
        ]
      };
    }

    function dogArt(mood) {
      return {
        body: [
          h('path', { key: 'tail', d: 'M75 69c12-2 14-13 7-19', fill: 'none', stroke: '#8e5a34', strokeWidth: 7, strokeLinecap: 'round' }),
          h('ellipse', { key: 'body', cx: 48, cy: 65, rx: 27, ry: 18, fill: '#b97a4b' }),
          h('ellipse', { key: 'chest', cx: 48, cy: 62, rx: 12, ry: 10, fill: '#d6a26c' }),
          h(PetBook, { key: 'book', y: 73 })
        ],
        head: [
          h('path', { key: 'earL', d: 'M25 28C13 29 8 47 17 55c6 5 12-2 12-11V28z', fill: '#7d4c2c' }),
          h('path', { key: 'earR', d: 'M71 28c12 1 17 19 8 27-6 5-12-2-12-11V28z', fill: '#7d4c2c' }),
          h('ellipse', { key: 'head', cx: 48, cy: 43, rx: 26, ry: 24, fill: '#b97a4b' }),
          h('ellipse', { key: 'patch', cx: 61, cy: 40, rx: 10, ry: 9, fill: '#8e5a34', opacity: .65 }),
          h('ellipse', { key: 'muzzle', cx: 48, cy: 57, rx: 14, ry: 11, fill: '#f3dfc4' }),
          petEye(35, 44, mood, '#33231b', 5.2),
          petEye(61, 44, mood, '#33231b', 5.2),
          h('ellipse', { key: 'nose', cx: 48, cy: 53, rx: 5.2, ry: 3.8, fill: '#3b2a22' }),
          h('path', { key: 'mouth', d: 'M48 57v3M48 60q-5 1-7-3M48 60q5 1 7-3', fill: 'none', stroke: '#5b3a26', strokeWidth: 1.5, strokeLinecap: 'round' }),
          mood === 'happy' ? h('path', { key: 'tongue', d: 'M44 62q0 7 4 7t4-7z', fill: '#ef8f9a' }) : null
        ]
      };
    }

    function capybaraArt(mood) {
      return {
        body: [
          h('ellipse', { key: 'body', cx: 48, cy: 65, rx: 28, ry: 18, fill: '#a97c50' }),
          h('ellipse', { key: 'belly', cx: 48, cy: 67, rx: 18, ry: 12, fill: '#c49a6b' }),
          h(PetBook, { key: 'book', y: 74 })
        ],
        head: [
          h('ellipse', { key: 'earL', cx: 26, cy: 24, rx: 5, ry: 6, fill: '#8a613c' }),
          h('ellipse', { key: 'earR', cx: 70, cy: 24, rx: 5, ry: 6, fill: '#8a613c' }),
          h('ellipse', { key: 'head', cx: 48, cy: 43, rx: 29, ry: 26, fill: '#a97c50' }),
          h('ellipse', { key: 'muzzle', cx: 48, cy: 59, rx: 17, ry: 13, fill: '#c99a68' }),
          h('circle', { key: 'cheekL', cx: 27, cy: 54, r: 4, fill: '#c98f6c', opacity: .55 }),
          h('circle', { key: 'cheekR', cx: 69, cy: 54, r: 4, fill: '#c98f6c', opacity: .55 }),
          petEye(35, 44, mood, '#3b2a1d', 3.5),
          petEye(61, 44, mood, '#3b2a1d', 3.5),
          h('ellipse', { key: 'nose', cx: 48, cy: 53, rx: 6, ry: 4, fill: '#6f4a2d' }),
          h('ellipse', { key: 'nostrilL', cx: 46, cy: 53, rx: 1.2, ry: 2, fill: '#3c2a1d' }),
          h('ellipse', { key: 'nostrilR', cx: 50, cy: 53, rx: 1.2, ry: 2, fill: '#3c2a1d' }),
          h('path', { key: 'mouth', d: 'M43 61q5 4 10 0', fill: 'none', stroke: '#6f4a2d', strokeWidth: 1.5, strokeLinecap: 'round' }),
          h('circle', { key: 'yuzu', cx: 63, cy: 15, r: 7, fill: '#f2b33d' }),
          h('path', { key: 'leaf', d: 'M63 8q7-5 10 1-6 4-10-1z', fill: '#6d9b4d' }),
          h('path', { key: 'stem', d: 'M63 8V5', stroke: '#6d9b4d', strokeWidth: 1.5, strokeLinecap: 'round' })
        ]
      };
    }

    function PetFace(props) {
      const source = props || {};
      const type = PET_TYPES.indexOf(source.type) >= 0 ? source.type : 'cat';
      const mood = source.mood || 'idle';
      const compact = source.compact === true;
      const art = type === 'dog' ? dogArt(mood) : type === 'capybara' ? capybaraArt(mood) : catArt(mood);
      return h('svg', {
        className: 'ielts-pet-art' + (compact ? ' ielts-pet-art-compact' : ''),
        viewBox: '0 0 96 96',
        'data-pet': type,
        'aria-hidden': true
      },
        h('ellipse', { key: 'shadow', cx: 48, cy: 87, rx: 26, ry: 5.5, fill: 'rgba(0,0,0,.16)' }),
        h('g', { className: 'ielts-pet-float' },
          h('g', { key: type + '-body' }, ...art.body),
          h('g', {
            key: type + '-head',
            ref: source.headRef,
            className: 'ielts-pet-head'
          }, ...art.head)
        )
      );
    }

    function PetWidget(props) {
      const translate = key => {
        let value = null;
        try {
          value = props && typeof props.t === 'function' ? props.t(key) : null;
        } catch (error) {
          value = null;
        }
        return typeof value === 'string' && value !== key ? value : (DICTS.zh[key] || key);
      };

      const boot = useMemo(() => chooseNext(loadState(), null, 0), []);
      const [state, setState] = useState(boot.state);
      const [cardId, setCardId] = useState(boot.id);
      const [phase, setPhase] = useState('question');
      const [screen, setScreen] = useState(boot.id ? 'card' : 'done');
      const [open, setOpen] = useState(true);
      const [mood, setMood] = useState('idle');
      const [lastKnown, setLastKnown] = useState(true);
      const [canUndo, setCanUndo] = useState(false);
      const [importStatus, setImportStatus] = useState('');

      const stateRef = useRef(boot.state);
      const cycleRef = useRef(0);
      const answerLockRef = useRef(false);
      const lastAnswerRef = useRef(null);
      const settingsReturnRef = useRef('card');
      const petButtonRef = useRef(null);
      const petHeadRef = useRef(null);
      const fileInputRef = useRef(null);

      useEffect(() => {
        saveState(state);
      }, [state]);

      useEffect(() => {
        if (!state.settings.autoPop || open || screen === 'settings') return undefined;
        let cancelled = false;
        let timer = null;
        const tick = () => {
          if (cancelled) return;
          if (hasWork(stateRef.current)) {
            setOpen(true);
            if (screen === 'done') goNext();
          } else {
            timer = setTimeout(tick, 60 * 1000);
          }
        };
        timer = setTimeout(tick, Math.max(1, state.settings.intervalMin) * 60 * 1000);
        return () => {
          cancelled = true;
          if (timer) clearTimeout(timer);
        };
      }, [open, screen, state.settings.autoPop, state.settings.intervalMin]);

      useEffect(() => {
        if (!open) return undefined;

        function handleKeyDown(event) {
          if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
          const target = event.target;
          const tag = target && target.tagName ? target.tagName.toLowerCase() : '';
          if (tag === 'input' || tag === 'textarea' || tag === 'select' || (target && target.isContentEditable)) return;

          if (screen === 'settings') {
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              closeSettings();
            }
            return;
          }

          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            if (screen === 'card' && phase === 'reveal') {
              event.preventDefault();
              if (event.key === 'ArrowRight') goNext();
              else changeLastAnswer();
              return;
            }
            if (screen === 'done') {
              if (event.key === 'ArrowRight') {
                event.preventDefault();
                if (hasWork(stateRef.current)) goNext();
                else setOpen(false);
              } else if (canUndo) {
                event.preventDefault();
                undoLastAnswer();
              }
              return;
            }
            if (screen !== 'card' || phase !== 'question') return;
            event.preventDefault();
            answer(event.key === 'ArrowRight');
            return;
          }

          if (event.key === 'ArrowDown') {
            event.preventDefault();
            if ((screen === 'card' && phase === 'reveal') || canUndo) undoLastAnswer();
            else setOpen(false);
            return;
          }

          if (event.key !== 'Enter') return;
          const button = target && target.closest ? target.closest('button') : null;

          if (screen === 'card' && phase === 'reveal') {
            if (button && !button.classList.contains('ielts-pet-next')) return;
            event.preventDefault();
            goNext();
            return;
          }

          if (screen === 'done') {
            if (button) return;
            event.preventDefault();
            if (hasWork(stateRef.current)) goNext();
            else setOpen(false);
          }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
      }, [open, screen, phase, canUndo, cardId]);

      useEffect(() => {
        if (typeof window === 'undefined' || typeof window.addEventListener !== 'function') return undefined;

        let frame = 0;
        let lastX = 0;
        let lastY = 0;
        let hasPointer = false;

        const applyLook = () => {
          frame = 0;
          const button = petButtonRef.current;
          const head = petHeadRef.current;
          if (!button || !head || !hasPointer || typeof button.getBoundingClientRect !== 'function') return;
          const rect = button.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height * 0.43;
          const nx = clamp((lastX - centerX) / 180, -1, 1);
          const ny = clamp((lastY - centerY) / 180, -1, 1);
          head.setAttribute(
            'transform',
            'translate(' + (nx * 4).toFixed(2) + ' ' + (ny * 2.4).toFixed(2) + ') rotate(' + (nx * 7).toFixed(2) + ' 48 42)'
          );
        };

        const resetLook = () => {
          hasPointer = false;
          if (frame) {
            cancelAnimationFrame(frame);
            frame = 0;
          }
          if (petHeadRef.current) petHeadRef.current.removeAttribute('transform');
        };

        const onPointerMove = event => {
          lastX = event.clientX;
          lastY = event.clientY;
          hasPointer = true;
          if (frame) return;
          frame = requestAnimationFrame(applyLook);
        };

        window.addEventListener('pointermove', onPointerMove, { passive: true });
        window.addEventListener('blur', resetLook);
        if (typeof document !== 'undefined' && document.addEventListener) {
          document.addEventListener('mouseleave', resetLook);
        }

        return () => {
          window.removeEventListener('pointermove', onPointerMove);
          window.removeEventListener('blur', resetLook);
          if (typeof document !== 'undefined' && document.removeEventListener) {
            document.removeEventListener('mouseleave', resetLook);
          }
          if (frame) cancelAnimationFrame(frame);
        };
      }, []);

      function commit(next) {
        stateRef.current = next;
        setState(next);
      }

      function goNext() {
        answerLockRef.current = false;
        const avoidId = cardId;
        const result = chooseNext(stateRef.current, avoidId, cycleRef.current);
        cycleRef.current += 1;
        commit(result.state);
        if (result.id) {
          setCardId(result.id);
          setPhase('question');
          setScreen('card');
          setMood('idle');
        } else {
          setCardId(null);
          setPhase('question');
          setScreen('done');
          setMood('idle');
        }
      }

      function answer(known) {
        if (!cardId || phase !== 'question' || answerLockRef.current) return;
        const recorded = applyAnswer(stateRef.current, cardId, known);
        if (!recorded) return;

        answerLockRef.current = true;
        lastAnswerRef.current = {
          cards: cloneState(stateRef.current.cards),
          days: cloneState(stateRef.current.days),
          cardId: cardId,
          known: known
        };
        setCanUndo(true);
        commit(recorded.state);
        setLastKnown(known);
        setMood(known ? 'happy' : 'sad');
        setPhase('reveal');
      }

      function changeLastAnswer() {
        const previous = lastAnswerRef.current;
        if (!previous) return;
        const base = cloneState(stateRef.current);
        base.cards = cloneState(previous.cards);
        base.days = cloneState(previous.days);
        const nextKnown = !previous.known;
        const recorded = applyAnswer(base, previous.cardId, nextKnown);
        if (!recorded) return;

        lastAnswerRef.current = {
          cards: cloneState(previous.cards),
          days: cloneState(previous.days),
          cardId: previous.cardId,
          known: nextKnown
        };
        answerLockRef.current = false;
        setCanUndo(true);
        setCardId(previous.cardId);
        setPhase('reveal');
        setScreen('card');
        setLastKnown(nextKnown);
        setMood(nextKnown ? 'happy' : 'sad');
        commit(recorded.state);
      }

      function undoLastAnswer() {
        const snapshot = lastAnswerRef.current;
        if (!snapshot) return;
        const next = cloneState(stateRef.current);
        next.cards = cloneState(snapshot.cards);
        next.days = cloneState(snapshot.days);
        commit(next);
        lastAnswerRef.current = null;
        setCanUndo(false);
        answerLockRef.current = false;
        setCardId(snapshot.cardId);
        setPhase('question');
        setScreen('card');
        setMood('idle');
      }

      function patchSettings(patch) {
        const next = cloneState(stateRef.current);
        next.settings = Object.assign({}, next.settings, patch);
        commit(next);
      }

      function setDailyGoal(value) {
        const goal = clamp(Math.round(Number(value) || 1), 1, 100);
        patchSettings({ dailyGoal: goal });
      }

      function addCustomWords(entries, invalidCount) {
        const next = cloneState(stateRef.current);
        if (!Array.isArray(next.customWords)) next.customWords = [];
        const existing = allWords(next);
        const seenWords = new Set(existing.map(word => word.w.toLowerCase()));
        const seenIds = new Set(existing.map(word => word.id));
        let added = 0;
        let skipped = invalidCount || 0;
        entries.forEach(entry => {
          const normalized = wordEntryFrom(entry);
          if (!normalized) {
            skipped += 1;
            return;
          }
          const key = normalized.w.toLowerCase();
          if (seenWords.has(key)) {
            skipped += 1;
            return;
          }
          const id = makeCustomWordId(seenIds, normalized);
          seenWords.add(key);
          seenIds.add(id);
          next.customWords.push({
            id: id,
            custom: true,
            w: normalized.w,
            k: normalized.k,
            m: normalized.m,
            e: normalized.e,
            z: normalized.z
          });
          added += 1;
        });
        commit(next);
        setImportStatus(
          translate('imported') + ' ' + added + ' ' + translate('wordUnit') +
          (skipped > 0 ? ' · ' + translate('skipped') + ' ' + skipped : '')
        );
      }

      async function handleImportFile(event) {
        const file = event && event.target && event.target.files ? event.target.files[0] : null;
        if (!file) return;
        try {
          if (file.size && file.size > 8 * 1024 * 1024) throw new Error('File is larger than 8 MB');
          const text = await readFileText(file);
          const parsed = parseWordFile(text, file.name);
          if (!parsed.entries.length) {
            setImportStatus(translate('importEmpty') + (parsed.invalid > 0 ? ' · ' + translate('skipped') + ' ' + parsed.invalid : ''));
            return;
          }
          addCustomWords(parsed.entries, parsed.invalid);
        } catch (error) {
          setImportStatus(translate('importError') + ': ' + (error && error.message ? error.message : String(error)));
        } finally {
          if (event && event.target) event.target.value = '';
        }
      }

      function clearCustomWords() {
        const custom = Array.isArray(stateRef.current.customWords) ? stateRef.current.customWords : [];
        if (custom.length === 0) return;
        if (typeof window.confirm === 'function' && !window.confirm(translate('clearConfirm'))) return;
        const ids = new Set(custom.map(word => word.id));
        const next = cloneState(stateRef.current);
        next.customWords = [];
        Object.keys(next.cards).forEach(id => {
          if (ids.has(id)) delete next.cards[id];
        });
        Object.keys(next.days).forEach(key => {
          const day = next.days[key];
          if (day && Array.isArray(day.newIds)) day.newIds = day.newIds.filter(id => !ids.has(id));
        });
        commit(next);
        setImportStatus(translate('cleared'));
        lastAnswerRef.current = null;
        answerLockRef.current = false;
        setCanUndo(false);
        if (cardId && ids.has(cardId)) {
          setCardId(null);
          setPhase('question');
        }
      }

      function openSettings() {
        settingsReturnRef.current = screen === 'settings' ? 'card' : screen;
        setMood('idle');
        setScreen('settings');
      }

      function closeSettings() {
        setScreen(settingsReturnRef.current || 'card');
      }

      function toggleSettings() {
        if (screen === 'settings') closeSettings();
        else openSettings();
      }

      function closeBubble() {
        if (screen === 'settings') closeSettings();
        setOpen(false);
      }

      function toggleOpen() {
        if (open) {
          closeBubble();
        } else {
          setOpen(true);
          if (screen === 'settings') closeSettings();
        }
      }

      const stats = computeStats(state);
      const goal = state.settings.dailyGoal;
      const progress = clamp(Math.round((stats.todayNew / Math.max(1, goal)) * 100), 0, 100);
      const word = cardId ? findWord(state, cardId) : null;
      const card = cardId ? state.cards[cardId] : null;
      const workLeft = hasWork(state);
      const customCount = Array.isArray(state.customWords) ? state.customWords.length : 0;

      const statGrid = h('div', { className: 'ielts-pet-stats' },
        h('div', { className: 'ielts-pet-stat' }, h('b', null, String(stats.todayNew)), h('span', null, translate('statsToday'))),
        h('div', { className: 'ielts-pet-stat' }, h('b', null, String(stats.reviews)), h('span', null, translate('statsReview'))),
        h('div', { className: 'ielts-pet-stat' }, h('b', null, String(stats.familiar)), h('span', null, translate('statsFamiliar'))),
        h('div', { className: 'ielts-pet-stat' }, h('b', null, String(stats.due)), h('span', null, translate('statsDue')))
      );

      let body = null;

      if (screen === 'settings') {
        body = h('div', null,
          h('h3', { className: 'ielts-pet-settings-title' }, translate('settings')),
          h('div', { className: 'ielts-pet-setting' },
            h('div', { className: 'ielts-pet-setting-copy' },
              h('div', { className: 'ielts-pet-setting-label' }, translate('dailyGoal')),
              h('div', { className: 'ielts-pet-setting-hint' }, translate('dailyGoalHint'))
            ),
            h('div', { className: 'ielts-pet-stepper' },
              h('button', {
                type: 'button',
                className: 'ielts-pet-step',
                disabled: goal <= 1,
                'aria-label': translate('minus'),
                onClick: () => setDailyGoal(goal - 5)
              }, '−'),
              h('span', { className: 'ielts-pet-step-value', 'aria-live': 'polite' }, String(goal)),
              h('button', {
                type: 'button',
                className: 'ielts-pet-step',
                disabled: goal >= 100,
                'aria-label': translate('plus'),
                onClick: () => setDailyGoal(goal + 5)
              }, '+')
            )
          ),
          h('input', {
            className: 'ielts-pet-range',
            type: 'range',
            min: 1,
            max: 100,
            step: 1,
            value: goal,
            'aria-label': translate('dailyGoal'),
            onChange: event => setDailyGoal(event.target.value)
          }),
          h('div', { className: 'ielts-pet-presets' },
            [10, 20, 30, 50, 100].map(value => h('button', {
              key: value,
              type: 'button',
              className: 'ielts-pet-preset' + (goal === value ? ' on' : ''),
              onClick: () => setDailyGoal(value)
            }, String(value)))
          ),
          h('div', { className: 'ielts-pet-petblock' },
            h('div', { className: 'ielts-pet-setting-label' }, translate('petStyle')),
            h('div', { className: 'ielts-pet-setting-hint' }, translate('petStyleHint')),
            h('div', { className: 'ielts-pet-petchoices' },
              PET_TYPES.map(type => h('button', {
                key: type,
                type: 'button',
                className: 'ielts-pet-choice' + (state.settings.pet === type ? ' on' : ''),
                'aria-pressed': state.settings.pet === type,
                onClick: () => patchSettings({ pet: type })
              },
                h('span', { className: 'ielts-pet-choice-art' }, h(PetFace, { type: type, mood: 'happy', compact: true })),
                h('span', { className: 'ielts-pet-choice-label' },
                  translate(type === 'cat' ? 'petCat' : type === 'dog' ? 'petDog' : 'petCapybara')
                )
              ))
            )
          ),
          h('div', { className: 'ielts-pet-petblock' },
            h('div', { className: 'ielts-pet-setting-label' }, translate('customWords') + ' · ' + customCount),
            h('div', { className: 'ielts-pet-setting-hint' }, translate('customWordsHint')),
            h('div', { className: 'ielts-pet-import-row' },
              h('button', {
                type: 'button',
                className: 'ielts-pet-import-btn',
                onClick: () => { if (fileInputRef.current) fileInputRef.current.click(); }
              }, translate('importWords')),
              customCount > 0 ? h('button', {
                type: 'button',
                className: 'ielts-pet-import-btn secondary',
                onClick: clearCustomWords
              }, translate('clearCustom')) : null
            ),
            h('input', {
              ref: fileInputRef,
              type: 'file',
              accept: '.csv,.json,text/csv,application/json',
              className: 'ielts-pet-file',
              onChange: handleImportFile
            }),
            h('div', { className: 'ielts-pet-import-status' }, importStatus || translate('formatHint'))
          ),
          h('div', { className: 'ielts-pet-setting' },
            h('div', { className: 'ielts-pet-setting-copy' },
              h('div', { className: 'ielts-pet-setting-label' }, translate('autoPop')),
              h('div', { className: 'ielts-pet-setting-hint' }, translate('autoPopHint'))
            ),
            h('button', {
              type: 'button',
              role: 'switch',
              className: 'ielts-pet-switch' + (state.settings.autoPop ? ' on' : ''),
              'aria-checked': state.settings.autoPop,
              'aria-label': translate('autoPop'),
              onClick: () => patchSettings({ autoPop: !state.settings.autoPop })
            }, h('span', { className: 'ielts-pet-knob' }))
          ),
          h('div', { className: 'ielts-pet-setting' },
            h('div', { className: 'ielts-pet-setting-copy' },
              h('div', { className: 'ielts-pet-setting-label' }, translate('interval'))
            ),
            h('select', {
              className: 'ielts-pet-select',
              value: state.settings.intervalMin,
              'aria-label': translate('interval'),
              onChange: event => patchSettings({ intervalMin: Number(event.target.value) })
            }, INTERVAL_OPTIONS.map(value => h('option', { key: value, value: value }, value + ' ' + translate('minutes'))))
          ),
          statGrid,
          h('div', { className: 'ielts-pet-keyhint' },
            h('kbd', null, '↓'),
            h('span', null, translate('keyBack'))
          ),
          h('button', { type: 'button', className: 'ielts-pet-back', onClick: closeSettings }, translate('back'))
        );
      } else if (screen === 'done' || !word || !card) {
        const doneText = stats.todayNew >= goal ? translate('doneGoalText') : (stats.introduced >= allWords(state).length ? translate('doneBankText') : translate('donePending'));
        body = h('div', { className: 'ielts-pet-done' },
          h('div', { className: 'ielts-pet-done-pet' }, h(PetFace, { mood: 'happy', type: state.settings.pet })),
          h('h3', null, translate('doneTitle')),
          h('p', null, doneText),
          statGrid,
          h('button', {
            type: 'button',
            className: 'ielts-pet-primary',
            onClick: () => {
              if (hasWork(stateRef.current)) goNext();
              else setOpen(false);
            }
          }, workLeft ? translate('keepGoing') : translate('later')),
          canUndo ? h('button', { type: 'button', className: 'ielts-pet-secondary', onClick: undoLastAnswer }, h(IconUndo), translate('undoLast')) : null,
          workLeft ? h('button', { type: 'button', className: 'ielts-pet-secondary', onClick: () => setOpen(false) }, translate('later')) : null
        );
      } else {
        const isNew = card.level === 0 && card.seen === 0;
        body = h('div', null,
          h('div', { className: 'ielts-pet-wordline' },
            h('div', { className: 'ielts-pet-wordwrap' },
              h('span', { className: 'ielts-pet-badge' }, translate(isNew ? 'newBadge' : 'reviewBadge')),
              h('h2', { className: 'ielts-pet-word' }, word.w)
            ),
            h('button', {
              type: 'button',
              className: 'ielts-pet-speak',
              title: translate('listen'),
              'aria-label': translate('listen') + ': ' + word.w,
              onClick: () => speak(word.w)
            }, h(IconSpeaker))
          ),
          h('div', { className: 'ielts-pet-subline' },
            word.k ? h('span', { className: 'ielts-pet-pos' }, word.k) : null,
            h('span', { className: 'ielts-pet-level', title: translate('level') + ' ' + card.level + '/5' },
              [0, 1, 2, 3, 4].map(index => h('i', { key: index, className: index < card.level ? 'on' : '' }))
            )
          ),
          word.e ? h('p', { className: 'ielts-pet-example' }, splitExample(word.e, word.w)) : null,
          phase === 'question' ? h('div', null,
            h('div', { className: 'ielts-pet-actions' },
              h('button', {
                type: 'button',
                className: 'ielts-pet-action unknown',
                onClick: () => answer(false)
              }, h(IconCross), h('span', null, translate('unknown'))),
              h('button', {
                type: 'button',
                className: 'ielts-pet-action known',
                onClick: () => answer(true)
              }, h(IconCheck), h('span', null, translate('known')))
            ),
            h('div', { className: 'ielts-pet-selfcheck' }, translate('selfCheck')),
            h('div', { className: 'ielts-pet-keyhint' },
              h('kbd', null, '←'), h('span', null, translate('unknown')),
              h('kbd', null, '→'), h('span', null, translate('known')),
              h('kbd', null, '↓'), h('span', null, translate('keyBack'))
            ),
            canUndo ? h('button', { type: 'button', className: 'ielts-pet-undo-inline', onClick: undoLastAnswer },
              h(IconUndo),
              h('span', null, translate('undoLast'))
            ) : null
          ) : h('div', { className: 'ielts-pet-reveal' + (lastKnown ? '' : ' no'), 'aria-live': 'polite' },
            h('div', { className: 'ielts-pet-reveal-head' }, translate(lastKnown ? 'knownFeedback' : 'unknownFeedback')),
            h('div', { className: 'ielts-pet-meaning' },
              h('span', null, translate('meaning')),
              h('b', null, word.m)
            ),
            word.z ? h('p', { className: 'ielts-pet-trans' }, word.z) : null,
            h('div', { className: 'ielts-pet-reveal-actions' },
              h('button', {
                type: 'button',
                className: 'ielts-pet-undo ' + (lastKnown ? 'to-unknown' : 'to-known'),
                onClick: changeLastAnswer
              },
                h(lastKnown ? IconCross : IconCheck),
                h('span', null, translate(lastKnown ? 'cannotDo' : 'canDo'))
              ),
              h('button', { type: 'button', className: 'ielts-pet-next', onClick: goNext },
                h('span', null, translate('next')),
                h(IconArrow)
              )
            ),
            h('div', { className: 'ielts-pet-keyhint' },
              h('kbd', null, '←'), h('span', null, translate(lastKnown ? 'cannotDo' : 'canDo')),
              h('kbd', null, '→'), h('span', null, translate('next'))
            )
          )
        );
      }

      return h('div', { className: 'ielts-pet-root' },
        h('style', { key: 'style' }, CSS),
        open ? h('section', {
          key: 'bubble',
          className: 'ielts-pet-bubble',
          'aria-label': translate('brand'),
          role: 'region'
        },
          h('header', { className: 'ielts-pet-head' },
            h('div', { className: 'ielts-pet-brand' },
              h('span', { className: 'ielts-pet-dot' }),
              h('span', { className: 'ielts-pet-brand-name' }, translate('brand'))
            ),
            h('span', { className: 'ielts-pet-goal', title: translate('progressLabel') },
              h('b', null, String(stats.todayNew)),
              h('span', null, '/' + goal)
            ),
            h('button', {
              type: 'button',
              className: 'ielts-pet-iconbtn',
              title: screen === 'settings' ? translate('back') : translate('settings'),
              'aria-label': screen === 'settings' ? translate('back') : translate('settings'),
              'aria-pressed': screen === 'settings',
              onClick: toggleSettings
            }, h(IconGear)),
            h('button', {
              type: 'button',
              className: 'ielts-pet-iconbtn',
              title: translate('close'),
              'aria-label': translate('close'),
              onClick: closeBubble
            }, h(IconClose))
          ),
          h('div', { className: 'ielts-pet-meter', role: 'progressbar', 'aria-label': translate('progressLabel'), 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': progress },
            h('div', { className: 'ielts-pet-meter-fill', style: { width: progress + '%' } })
          ),
          h('div', { className: 'ielts-pet-body' }, body)
        ) : null,
        h('div', { className: 'ielts-pet-petwrap' },
          h('button', {
            type: 'button',
            ref: petButtonRef,
            className: 'ielts-pet-petbutton',
            title: open ? translate('close') : translate('open'),
            'aria-label': open ? translate('close') : translate('open'),
            'aria-expanded': open,
            onClick: toggleOpen
          },
            h(PetFace, { mood: open && phase === 'reveal' ? mood : 'idle', type: state.settings.pet, headRef: petHeadRef }),
            h('span', { className: 'ielts-pet-count' },
              h('b', null, String(stats.todayNew)),
              h('span', null, '/' + goal)
            )
          )
        )
      );
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        const locale = ctx.locale;
        ctx.effect(() => {
          const disposers = [
            locale.register('ieltsPet', 'zh', DICTS.zh),
            locale.register('ieltsPet', 'en', DICTS.en)
          ];
          return () => disposers.forEach(dispose => dispose());
        }, 'ielts-pet-locale');

        ctx.slots.inject('shell.overlay', () => ctx.slots.register({
          name: 'shell.overlay',
          id: 'ielts-pet',
          order: 60,
          locale: 'ieltsPet'
        }, PetWidget));
      }
    };
  }
});
