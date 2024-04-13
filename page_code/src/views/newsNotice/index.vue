<template>
  <div class="newsNotice">
    <div class="bannerBg">
      <div class="banner">
        <el-carousel height="400px" ref="nop">
          <el-carousel-item
            v-for="item in carouselData"
            :key="item.id"
            :class="'carousel' + item.id"
          >
            <div class="carouselItem">
              <div class="left">
                <div class="title">{{ item.title }}</div>
                <div class="msg">{{ item.title }}</div>
                <div class="detail" @click="jump(item)">了解详情</div>
              </div>
              <div class="right">
                <img :src="item.img" alt="" />
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="body">
      <div class="box">
        <div class="bodyLeft">
          <div class="tab">
            <div
              class="tabItem"
              :class="active == index ? 'active' : ''"
              v-for="(item, index) in tabList"
              :key="index"
              @click="tabClick(index)"
            >
              {{ item }}
            </div>
          </div>
          <div class="content">
            <div
              class="contentItem"
              v-for="(item, index) in contentList"
              :key="index"
              @click="jumpDetail(item)"
            >
              <div class="ItemLeft">
                <div>
                  <div class="title">{{ item.title }}</div>
                  <div class="msg">{{ item.msg }}</div>
                </div>
                <div class="bottom">
                  <div class="type">{{ item.type }}</div>
                  <div class="souce">腾讯新闻</div>
                  <div class="time">{{ item.time }}</div>
                </div>
              </div>
              <div class="ItemRight">
                <img :src="item.img" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="bodyRight">
          <div class="header">
            <div class="hotNews">热门动态</div>
            <div class="refresh">
              <img :src="images.refresh" alt="" />
              换一换
            </div>
          </div>
          <div class="hotNewsBody">
            <div
              class="hotNewsItem"
              v-for="(item, index) in hotNewsList"
              :key="index"
            >
              <div class="ItemLeft">
                <img :src="item.img" alt="" />
                <div class="ranking">{{ index + 1 }}</div>
              </div>
              <div class="ItemRight">
                <div class="title">{{ item.title }}</div>
                <div class="type">{{ item.type }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import images from "@/utils/js/exportImage";
export default {
  data() {
    return {
      images: images,
      carouselData: [
        {
          id: 1,
          title: "GPT-4驱动的机器人化学家登Nature，自主设计反应并执行复杂实验",
          msg:
            "卡内基梅隆大学研究团队创建Coscientist，基于GPT-4的智能代理，可以自主设计并执行化学实验，已发表于《Nature》。",
          img: "https://pic.imgdb.cn/item/65ef03af9f345e8d03b89732.png",
        },
        {
          id: 2,
          title: "北京航空航天大学举办首届“人工智能科学计算学术研讨会”",
          msg:
            "北航联合其他八家单位举办首届“人工智能科学计算研讨会”。会议提议成立科学智算研究联盟，促进人工智能与科学深度结合，加速科学发现与技术创新。",
          img: "https://pic.imgdb.cn/item/65ef08599f345e8d03e41a72.png",
        },
        {
          id: 3,
          title: "首届“大湾区杯”粤港澳 AI for Science科技竞赛颁奖典礼隆重举行",
          msg:
            "首届“大湾区杯”粤港澳AI for Science科技竞赛于2023年11月18日在广东韶关举行，此次大赛共有近千名青年学子参与，最终产生80支获奖队伍。大赛旨在推动AI技术在科研领域的应用与发展。",
          img: "https://pic.imgdb.cn/item/65ef08df9f345e8d03e86d28.png",
        },
      ],
      tabList: ["推荐", "综合新闻", "产业动向", "社区生活"],
      active: 0,
      contentList: [
        {
          title:
            "预测所有生物分子，David Baker 团队蛋白质设计新工具 RoseTTAFold All-Atom 登 Science",
          msg:
            "华盛顿大学团队开发了RoseTTAFold All-Atom，预测蛋白质与多分子复合结构，推进生物分子设计。",
          img: "https://pic.imgdb.cn/item/65ef01049f345e8d039fc9bf.png",
          type: "学术动态",
          time: "2024-03-08 00:00:00",
        },
        {
          title: "量子计算新进展，腾讯量子实验室设计新算法进行量子近似优化",
          msg:
            "腾讯量子实验室研发的DARBO算法提高了QAOA在解决组合优化问题的效率。",
          img: "https://pic.imgdb.cn/item/65ef022f9f345e8d03aacc15.png",
          type: "学术动态",
          time: "2024-03-11 00:00:00",
        },
        {
          title:
            "AI4Science的基石：几何图神经网络，最全综述来了！人大高瓴联合腾讯AI lab、清华、斯坦福等发布",
          msg:
            "Nature杂志连续刊登了Chroma和GNoME研究，利用图神经网络在AI科学领域取得重大进展。",
          img: "https://pic.imgdb.cn/item/65ef029a9f345e8d03ae62c6.png",
          type: "学术动态",
          time: "2024-03-07 00:00:00",
        },
        {
          title:
            "用基于结构的突变偏好进行蛋白质设计，加州大学、MIT、哈佛医学院团队开发了一种无监督方法",
          msg:
            "CoVES方法表明，通过基于结构的残基突变偏好，可以有效进行蛋白质设计，这一发现为蛋白质功能预测和设计开辟了新途径。",
          img: "https://pic.imgdb.cn/item/65ef02e89f345e8d03b136ae.png",
          type: "学术动态",
          time: "2024-03-06 00:00:00",
        },
        {
          title:
            "5天完成6个月实验量，加速催化研究，「自动驾驶」催化实验室Fast-Cat登Nature子刊",
          msg:
            "「自动驾驶实验室」成为未来科研新趋势，如RoboChem、A-Lab以及Fast-Cat等，这些系统运用AI技术自动执行高质量的科学实验，显著提高效率和效果。",
          img: "https://pic.imgdb.cn/item/65ef03149f345e8d03b2f078.png",
          type: "学术动态",
          time: "2024-03-01 00:00:00",
        },
        {
          title:
            "登Nature，提前300毫秒预测聚变中等离子体「撕裂」，普林斯顿团队开发AI控制器",
          msg:
            "普林斯顿大学研究团队通过AI预测并阻止核聚变过程中等离子体的不稳定性，为解决长期困扰聚变能发展的问题提供了新思路。",
          img: "https://pic.imgdb.cn/item/65ef03329f345e8d03b4118b.png",
          type: "学术动态",
          time: "2024-02-23 00:00:00",
        },
        {
          title: "首次大规模多语言评估，支持7种语言，生物医学领域7B开源LLM",
          msg:
            "BioMistral是为生物医学领域打造的开源大型语言模型，展现卓越的多语言性能和轻量级模型潜力。",
          img: "https://pic.imgdb.cn/item/65ef03559f345e8d03b55067.png",
          type: "学术动态",
          time: "2024-02-21 00:00:00",
        },
        {
          title:
            "以自监督方式去除荧光图像中的噪声，清华团队开发了空间冗余去噪Transformer方法",
          msg:
            "清华大学团队创新开发SRDTrans，一种自监督技术，有效去噪提高荧光成像质量。",
          img: "https://pic.imgdb.cn/item/65ef03709f345e8d03b63db9.png",
          type: "学术动态",
          time: "2024-03-16 00:00:00",
        },
        {
          title:
            "可多模态数据集成、插补和跨模态生成，中科院&树兰医院&北师大团队开发带有掩码模块的深度生成框架",
          msg:
            "树兰医院、中国科学院和北京师范大学的合作研究团队开发的inClust+，深度生成框架，通过掩码模块强化单细胞多组学数据集成，在《BMC Bioinformatics》期刊发表。",
          img: "https://pic.imgdb.cn/item/65ef038c9f345e8d03b74c31.png",
          type: "学术动态",
          time: "2024-02-05 00:00:00",
        },
        {
          title: "GPT-4驱动的机器人化学家登Nature，自主设计反应并执行复杂实验",
          msg:
            "卡内基梅隆大学研究团队创建Coscientist，基于GPT-4的智能代理，可以自主设计并执行化学实验，已发表于《Nature》。",
          img: "https://pic.imgdb.cn/item/65ef03af9f345e8d03b89732.png",
          type: "学术动态",
          time: "2023-12-31 00:00:00",
        },
        {
          title: "上海交大团队利用深度学习进行运动评估，促进脑瘫早期筛查",
          msg:
            "上海交通大学开发一种基于深度学习的运动评估模型（MAM)，利用婴儿的视频和基本特征实现了GMA的自动化。",
          img: "https://pic.imgdb.cn/item/65ef03e69f345e8d03ba7dd9.png",
          type: "学术动态",
          time: "2023-12-15 00:00:00",
        },
        {
          title: "AI炼金术革新化学：MIT学者使用生成式AI，六秒生成新化学反应",
          msg:
            "MIT研究团队开发OA-ReactDiff模型，几秒内发现化学反应过渡态结构，推动化学、催化剂设计新进展，提高能源、药物研制效率。已发表《Nature Computational Science》。",
          img: "https://pic.imgdb.cn/item/65ef04059f345e8d03bb7fda.png",
          type: "学术动态",
          time: "2023-12-16 00:00:00",
        },
        {
          title: "人工智能促进科学、能源和安全的报告",
          msg:
            "2023年度报告总结了关于科学人工智能机遇与挑战的研讨会成果，强调了美国能源部在负责任的AI发展中的作用。",
          img: "https://pic.imgdb.cn/item/65ef042d9f345e8d03bcd868.png",
          type: "产业动向",
          time: "2023-05-31 00:00:00",
        },
        {
          title: "使用深度神经网络整合药物与疾病关联数据进行药物再利用",
          msg:
            "伊朗大不里士大学研发了IDDI-DNN模型，利用深度神经网络高效进行药物再利用研究。",
          img: "https://pic.imgdb.cn/item/65ef044e9f345e8d03bdf414.png",
          type: "学术动态",
          time: "2023-11-19 00:00:00",
        },
        {
          title:
            "中国科学院团队利用 AI 大模型训练技术解决同步辐射海量数据处理难题",
          msg:
            "X射线叠层相干衍射成像技术理论上可实现衍射极限分辨率，对高通量多维度成像前景良好。HEPS团队开发PtyNet框架，实现从X射线数据中快速重建物体精确投影。",
          img: "https://pic.imgdb.cn/item/65ef046f9f345e8d03bf228f.png",
          type: "学术动态",
          time: "2023-11-20 00:00:00",
        },
        {
          title: "准确率达 80%，深度学习识别布朗运动中纳米粒子形状",
          msg:
            "东京大学团队提出新方法，利用深度学习从NTA测得的布朗运动数据预测纳米粒子形状，解决了传统方法无法评估非球形纳米粒子问题，提升了粒子形状分类的准确性。",
          img: "https://pic.imgdb.cn/item/65ef049e9f345e8d03c0de3d.png",
          type: "学术动态",
          time: "2023-11-07 00:00:00",
        },
        {
          title:
            "比传统量子化学计算快约40倍，机器学习揭示了如何将聚合物材料溶解在有机溶剂中",
          msg:
            "日本研究团队利用机器学习和化学数据库，开发了快速预测聚合物和溶剂混溶性的方法，效率提升显著。",
          img: "https://pic.imgdb.cn/item/65ef04ba9f345e8d03c1ed28.png",
          type: "学术动态",
          time: "2023-10-27 00:00:00",
        },
        {
          title: "全新Ansys Fluent Web UI支持访问大规模多GPU CFD仿真",
          msg:
            "Ansys推出Fluent Web UI，用户可远程操作云端CFD模拟，提速10倍，支持多GPU和云计算。",
          img: "https://pic.imgdb.cn/item/65ef04df9f345e8d03c35f43.png",
          type: "产业动向",
          time: "2024-02-07 00:00:00",
        },
        {
          title: "向着新一轮科学革命制高点攀登——2023全球科学智能峰会观察",
          msg:
            "北京举办2023全球科学智能峰会，集合千名学者讨论AI for Science，致力科研范式变革与跨学科合作。",
          img: "https://pic.imgdb.cn/item/65ef051e9f345e8d03c5bbfe.png",
          type: "综合新闻",
          time: "2023-08-11 00:00:00",
        },
        {
          title: "2023科学智能AI4S全球发展观察与展望：科学研究第五范式",
          msg:
            "AI for Science成科研新范式，推动跨学科创新，2023中关村论坛呈现全球发展展望。",
          img: "https://pic.imgdb.cn/item/65ef05419f345e8d03c72759.png",
          type: "综合新闻",
          time: "2023-08-28 00:00:00",
        },
        {
          title:
            "AI for Science年度激辩：AlphaFold成功难以复制，数据人才生态建设都是挑战",
          msg:
            "AI for Science引发热议和探索。在MEET 2023大会上，来自深势科技、百图生科、英矽智能的领导者分享了视角。他们表示AI for Science带来新机遇，但也面临管理预期等挑战。",
          img: "https://pic.imgdb.cn/item/65ef055a9f345e8d03c84b76.png",
          type: "综合新闻",
          time: "2024-01-07 00:00:00",
        },
        {
          title: "10万字《2022 AI4S全球发展观察与展望》重磅发布",
          msg:
            '"AI for Science"在MEET 2023大会上引发热议，行业内外高度关注。来自多家科技公司的领袖分享了他们的观点，并探讨了该领域的新挑战和可能性。',
          img: "https://pic.imgdb.cn/item/65ef05749f345e8d03c95473.png",
          type: "综合新闻",
          time: "2022-08-10 00:00:00",
        },
        {
          title: "AI智药 | 深势科技：立足“AI for Science”，定义科研新范式 ",
          msg:
            "深势科技通过其三大AI平台推进药品和材料科研创新，并与多家上市药企合作推动新药研发，以此推进其商业化进程。",
          img: "https://pic.imgdb.cn/item/65ef05919f345e8d03ca7bea.png",
          type: "综合新闻",
          time: "2023-03-28 00:00:00",
        },
        {
          title:
            "致力打造“AI时代的默克”，分子之心完成红杉中国领投数千万美元融资",
          msg:
            "AI蛋白质设计公司“分子之心”完成数千万美元天使轮融资，将扩大团队、深化AI平台研发并推动产品化转化，致力于推动药物研发和社会进步。",
          img: "https://pic.imgdb.cn/item/65ef05b09f345e8d03cbbab3.png",
          type: "产业动向",
          time: "2022-04-18 00:00:00",
        },
        {
          title: "胡成文：AI技术可改变医疗健康产业发展模式 助力医药研发",
          msg:
            "在2023健康未来论坛中，深势科技首席技术官胡成文强调，AI技术的应用将改变医疗健康产业，特别是医药研发领域，推动行业创新和效率提升。",
          img: "https://pic.imgdb.cn/item/65ef05df9f345e8d03cd9a09.png",
          type: "综合新闻",
          time: "2023-12-04 00:00:00",
        },
        {
          title:
            "「深势科技」完成新一轮超 7 亿元人民币融资，多项重磅成果及产业化落地将 AI for Science 引入大模型时代",
          msg:
            "深势科技完成超7亿人民币融资，资金将用于加强AI技术在新能源、化工、半导体等领域的商业化推广，以推动其AI for Science全新科研范式在各领域的应用与发展。",
          img: "https://pic.imgdb.cn/item/65ef061b9f345e8d03cfe370.png",
          type: "产业动向",
          time: "2023-08-21 00:00:00",
        },
        {
          title: "上海交大AI for Science团队：将AI蛋白计算效率提升1万倍 ",
          msg:
            "AIMS-Lab团队通过AI的深度应用，赋予了AI不同领域的科研工作更高效、更准确的能力，以实现科研角度的降本增效及新知识的发现。",
          img: "https://pic.imgdb.cn/item/65ef063b9f345e8d03d105e3.png",
          type: "综合新闻",
          time: "2023-08-26 00:00:00",
        },
        {
          title:
            "微软研究院刘铁岩：AI for Science：追求人类智能最光辉的一面｜MEET 2023 ",
          msg:
            "刘铁岩团队研发出了用于分子模拟的Graphormer模型，推动了AI在科学领域的应用。",
          img: "https://pic.imgdb.cn/item/65ef06579f345e8d03d20b88.png",
          type: "综合新闻",
          time: "2023-01-05 00:00:00",
        },
        {
          title:
            "AI挺进生命科学领域，分子动力学模拟加速新冠病毒致病机理研究进程",
          msg:
            "微软亚洲研究院和清华大学利用AI和大数据，解析新冠病毒机理，发现NTD的调控作用，为药物研发提供新方向。",
          img: "https://pic.imgdb.cn/item/65ef066e9f345e8d03d2d05e.png",
          type: "学术动态",
          time: "2022-01-06 00:00:00",
        },
        {
          title: "BioMap与GeneQuantum建立战略合作，共同开发一系列下一代ADC疗法",
          msg:
            "生命科学AI领导者BioMap与创新生物接合技术新药开发领头企业GeneQuantum达成战略合作，共同开发多目标的FIC/BIC ADC疗法。双方将共同利用各自优势资源，综合运用iLDC®和iGDC®技术平台，高效抗体设计平台AIGP，以及高质量数据挖掘利用技术，共同创造创新性ADC药物，以满足全球未得到满足的医学需求。",
          img: "https://pic.imgdb.cn/item/65ef06909f345e8d03d408fb.png",
          type: "产业动向",
          time: "2023-12-18 00:00:00",
        },
        {
          title: "AI for Science的上半场：人工智能如何重新定义科学研究新范式？",
          msg:
            "AlphaFold 2成功克服了长期困扰科学界的蛋白质折叠问题。AI的应用涉及能源、材料研发等领域，被认为是科学革命的新驱动力。百度飞桨和英特尔等公司在AI for Science领域做出努力与贡献。",
          img: "https://pic.imgdb.cn/item/65ef06b69f345e8d03d54f6a.png",
          type: "综合新闻",
          time: "2022-12-27 00:00:00",
        },
        {
          title: "再获超7亿元融资，这家公司估值3年涨了数十倍",
          msg:
            "深势科技，在3年内估值从最初的1亿元上升至数十亿元。公司开发出的多尺度建模、机器学习和高性能计算平台已服务超过百家客户，并预计2023年营收将突破1亿元。",
          img: "https://pic.imgdb.cn/item/65ef06d39f345e8d03d651e0.png",
          type: "产业动向",
          time: "2023-08-18 00:00:00",
        },
        {
          title:
            "不知疲倦自主工作，一周完成博士数月研究，“AI化学家”登上Science",
          msg:
            'AI机器人"RoboChem"优化化学合成过程，提高效率和精确度。该系统整合流动化学和人工智能，实现全自动数据采集分析。',
          img: "https://pic.imgdb.cn/item/65ef07089f345e8d03d8414b.png",
          type: "综合新闻",
          time: "2024-01-29 00:00:00",
        },
        {
          title:
            "晶泰科技以18C规则冲刺港交所：起源于麻省理工，AI+机器人赋能AI for Science",
          msg:
            "晶泰科技，一家应用量子物理、AI和机器人技术进行药物和材料科学研发的公司，已向港交所递交招股说明书，拟主板上市。",
          img: "https://pic.imgdb.cn/item/65ef07259f345e8d03d944c4.png",
          type: "产业动向",
          time: "2023-12-01 00:00:00",
        },
        {
          title: "课题组组织CNCC分论坛 —— 科学计算平台技术前沿",
          msg:
            "2023年10月28日，科学智算共性平台举办“科学计算平台技术前沿”分论坛，聚集各领域专家共同探讨科学智算最新研究和产业动态。",
          img: "https://pic.imgdb.cn/item/65ef074c9f345e8d03daa411.png",
          type: "社区活动",
          time: "2023-11-17 00:00:00",
        },
        {
          title: "课题组组织CNCC分论坛——“神经符号计算：理论、技术与应用”",
          msg:
            "北理和北航在2023年10月27日共同举办了“神经符号计算：理论、技术与应用”分论坛，探讨将神经网络计算与符号规则推理结合的新型计算方法，此法能提高学习模型的泛化性、鲁棒性和可解释性。",
          img: "https://pic.imgdb.cn/item/65ef07649f345e8d03db8f32.png",
          type: "社区活动",
          time: "2023-11-17 00:00:00",
        },
        {
          title:
            "何恺明香港中文大学讲座回顾 | 科研经历、大模型、AI For Science",
          msg:
            "AI大牛何恺明在科研和AI应用方面分享了他的见解，认为AI将是未来所有领域的基础工具。他还分享了他的研究重点，即自监督学习在图像领域的应用。",
          img: "https://pic.imgdb.cn/item/65ef077e9f345e8d03dc7787.png",
          type: "社区活动",
          time: "2023-11-05 00:00:00",
        },
        {
          title:
            "2023 IEEE MTT-S International Conference on Numerical Electromagnetic and Multiphysics Modeling and Optimization交流报告",
          msg:
            "多域权重共享（MDWS）方法解决了全波电磁逆散射问题，通过连接两个U-Net网络优化了深度学习表现，并降低了存储和计算成本。此方法在重建精度和泛化性上超越了现有的基准方法。",
          img: "https://pic.imgdb.cn/item/65ef07939f345e8d03dd3ae9.png",
          type: "社区活动",
          time: "2023-09-20 00:00:00",
        },
        {
          title: "百度在上海飞桨赋能中心举办科学计算交流会",
          msg:
            "7月13日，百度在飞桨赋能中心举办科学计算交流会，集结全球科研工作者，发布了飞桨PaddleScience v1.0版本。",
          img: "https://pic.imgdb.cn/item/65ef07b39f345e8d03de582d.png",
          type: "社区活动",
          time: "2023-09-18 00:00:00",
        },
        {
          title:
            "大连海事大学与大连市科协联合举办“人工智能流体力学及应用”，由华中科技大学孟旭辉进行学术报告\n",
          msg:
            "华中科技大学孟旭辉教授进行了两场报告，一场针对人工智能流体力学应用，另一场在大连理工大学探讨深度学习解决正反偏微分方程问题。两场报告都关注不确定性量化和模型的可靠性。",
          img: "https://pic.imgdb.cn/item/65ef07d29f345e8d03df6a7e.png",
          type: "社区活动",
          time: "2023-09-18 00:00:00",
        },
        {
          title:
            "南京大学、复旦大学和西安交通大学相关领域专家学者共同研讨了基于脉冲神经网络时空耦合机制的复杂人类基因系统重建理论与方法",
          msg:
            "南京大学举办的“脉冲神经网络的认知-学习机制与方法”研讨会集结全球学者，讨论了人工智能与生命科学的交叉，复杂基因系统疾病溯源及小样本学习等议题。",
          img: "https://pic.imgdb.cn/item/65ef07ee9f345e8d03e048c0.png",
          type: "社区活动",
          time: "2023-09-18 00:00:00",
        },
        {
          title: "上海人工智能实验室科学家白磊进行关于气象大模型的报告和讨论",
          msg:
            '"风乌"人工智能天气预报大模型通过深度学习和多模态数据融合，能同时预测多个天气参数。此模型具有明显优势并推荐广泛应用，可能助益于农业、航空等领域中的生产效率，降低风险，确保公共安全。',
          img: "https://pic.imgdb.cn/item/65ef08039f345e8d03e0fa72.png",
          type: "社区活动",
          time: "2023-09-18 00:00:00",
        },
        {
          title:
            "北大为华为昇思MindSpore进行了题为“蛋白质属性建模以及突变预测”的报告",
          msg:
            "这次报告转述了蛋白质属性建模与突变预测的最新研究、实际应用、未来展望。强调了改善技术、准确性、对接数据集的含义，以便更好地服务于药物设计和蛋白质工程",
          img: "https://pic.imgdb.cn/item/65ef081a9f345e8d03e1cacb.png",
          type: "社区活动",
          time: "2023-09-18 00:00:00",
        },
        {
          title: "美国韦恩州立大学李恒光教授进行学术报告",
          msg:
            "2023年8月，李恒光教授在中山大学就双调和问题的C^0有限元方法进行报告，解决了非凸域计算失真难题",
          img: "https://pic.imgdb.cn/item/65ef08359f345e8d03e2bdc4.png",
          type: "社区活动",
          time: "2023-09-16 00:00:00",
        },
        {
          title: "北京航空航天大学举办首届“人工智能科学计算学术研讨会”",
          msg:
            "北航联合其他八家单位举办首届“人工智能科学计算研讨会”。会议提议成立科学智算研究联盟，促进人工智能与科学深度结合，加速科学发现与技术创新。",
          img: "https://pic.imgdb.cn/item/65ef08599f345e8d03e41a72.png",
          type: "社区活动",
          time: "2023-09-12 00:00:00",
        },
        {
          title:
            "百度飞桨AI4S亮相全国动力学设计与反问题研讨会，助力汽车底盘智能设计",
          msg:
            "2023年9月，南京航空航天大学承办第二届全国动力学设计与反问题研讨会。百度技术专家分享了飞桨AI在动力学设计上的应用，展示了物理信息神经网络（PINN）在汽车底盘受力分析和拓扑优化的研究成效。",
          img: "https://pic.imgdb.cn/item/65ef08719f345e8d03e50039.png",
          type: "社区活动",
          time: "2023-10-12 00:00:00",
        },
        {
          title: "人工智能产业发展联盟科学智能（AI4S）工作组筹备会圆满举办",
          msg:
            "2023年11月16日，AI4S工作组筹备会在京举办。来自20余家单位的专家就AI4S领域现状、挑战和趋势进行分享。工作组将推动AI4S领域的技术创新和应用落地，注入人工智能产业新动力。",
          img: "https://pic.imgdb.cn/item/65ef088a9f345e8d03e5d299.png",
          type: "社区活动",
          time: "2023-11-29 00:00:00",
        },
        {
          title: "“AI驱动科学研究（AI4S）”专题研讨会成功召开",
          msg:
            "2023年4月19日，中国信通院以及众多科技公司专家举办了“AI驱动科学研究”专题研讨会，探讨AI赋能科学研究的现状、关键技术以及问题，并分享了在AI4S领域的工作经验和成果。",
          img: "https://pic.imgdb.cn/item/65ef08a29f345e8d03e697af.png",
          type: "社区活动",
          time: "2023-04-28 00:00:00",
        },
        {
          title:
            "科学智能，智绘未来——北京大学深圳研究生院未来之后AI4S 第二届国际高峰论坛成功举行",
          msg:
            "2023年12月14日，“未来之后”AI4S第二届国际高峰论坛在深圳举行。由国内外多位院士专家与产业精英参与，共同讨论并引领AI4S的前沿新发展。",
          img: "https://pic.imgdb.cn/item/65ef08be9f345e8d03e77a1d.png",
          type: "社区活动",
          time: "2023-12-16 00:00:00",
        },
        {
          title: "首届“大湾区杯”粤港澳 AI for Science科技竞赛颁奖典礼隆重举行",
          msg:
            "首届“大湾区杯”粤港澳AI for Science科技竞赛于2023年11月18日在广东韶关举行，此次大赛共有近千名青年学子参与，最终产生80支获奖队伍。大赛旨在推动AI技术在科研领域的应用与发展。",
          img: "https://pic.imgdb.cn/item/65ef08df9f345e8d03e86d28.png",
          type: "社区活动",
          time: "2023-12-08 00:00:00",
        },
        {
          title: "Generate Biomedicines C轮融资2.73亿美元",
          msg:
            "临床阶段生物治疗公司Generate Biomedicines完成2.73亿美元C轮融资，资金将推进其17个在研项目和每年约10个新项目的启动。 ",
          img: "https://pic.imgdb.cn/item/65ef08f69f345e8d03e917ea.png",
          type: "产业动向",
          time: "2023-09-14 00:00:00",
        },
      ],
      hotNewsList: [
        {
          img: "https://pic.imgdb.cn/item/65ef08039f345e8d03e0fa72.png",
          title: "上海人工智能实验室科学家白磊进行关于气象大模型的报告和讨论",
          type: "社区活动",
        },
        {
          img: "https://pic.imgdb.cn/item/65ef04059f345e8d03bb7fda.png",
          title: "AI炼金术革新化学：MIT学者使用生成式AI，六秒生成新化学反应",
          type: "学术动态",
        },
        {
          img: "https://pic.imgdb.cn/item/65ef042d9f345e8d03bcd868.png",
          title: "人工智能促进科学、能源和安全的报告",
          type: "产业动向",
        },
        {
          img: "https://pic.imgdb.cn/item/65ef044e9f345e8d03bdf414.png",
          title: "使用深度神经网络整合药物与疾病关联数据进行药物再利用",
          type: "学术动态",
        },
        {
          img: "https://pic.imgdb.cn/item/65ef046f9f345e8d03bf228f.png",
          title:
            "中国科学院团队利用 AI 大模型训练技术解决同步辐射海量数据处理难题",
          type: "学术动态",
        },
      ],
    };
  },
  components: {},
  methods: {
    jump(jumpPath) {
      this.$router.push({ path: jumpPath });
    },
    jumpDetail(item) {
         this.$router.push({ path: '/newsNoticeDetail' });
    },
    tabClick(index) {
      this.active = index;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-carousel__indicators--horizontal {
  position: absolute;
  bottom: 5px;
  text-align: right;
  .el-carousel__indicator--horizontal button {
    width: 20px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  .el-carousel__indicator--horizontal.is-active button {
    width: 60px;
    height: 4px;
    background: rgba(41, 84, 255, 1);
    border-radius: 10px;
  }
}
.newsNotice {
  height: 100%;
  margin-top: 20px;
  background: #fafafa;
  .bannerBg {
    width: 1440px;
    height: 400px;
    background: linear-gradient(
      180deg,
      #deeaff 0%,
      #deeaff 18%,
      rgba(250, 250, 250, 1) 100%
    );
    margin: 0 auto;
  }
  .banner {
    width: 1280px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.4);
    box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
    border-radius: 20px 20px 20px 20px;
  }
  .carouselItem {
    width: 1280px;
    height: 400px;
    padding: 40px 60px;
    display: flex;
    .right {
      width: 400px;
      img {
        width: 400px;
        height: 280px;
      }
    }
    .left {
      width: 680px;
      margin-right: 80px;
      position: relative;
      .title {
        font-weight: bold;
        font-size: 40px;
        color: #262626;
      }
      .msg {
        font-size: 16px;
        color: #2954ff;
        margin-top: 10px;
      }
      .detail {
        width: 80px;
        background: #587dff;
        border-radius: 14px 14px 14px 14px;
        font-size: 12px;
        color: #ffffff;
        padding: 5px 0;
        text-align: center;
        position: absolute;
        bottom: 0;
      }
    }
  }
  .body {
    width: 1440px;
    margin: 0 auto;
    background: #fafafa;
    padding-top: 40px;
    .box {
      width: 1280px;
      margin: 0 auto;
      display: flex;
      .bodyLeft {
        width: 750px;
        .tab {
          display: flex;
          .tabItem {
            margin: 0 20px;
            cursor: pointer;
            font-weight: bold;
            font-size: 16px;
            color: #000000;
          }
          .active {
            color: #2954ff;
          }
        }
        .content {
          .contentItem {
            cursor: pointer;
            padding: 10px;
            display: flex;
            margin-top: 24px;
            .ItemLeft {
              margin-right: 40px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .title {
                font-weight: 500;
                font-size: 18px;
                color: #262626;
              }
              .msg {
                font-weight: 400;
                font-size: 12px;
                color: #262626;
                margin-top: 8px;
              }
              .bottom {
                display: flex;
                font-size: 14px;
                .type {
                  color: #587dff;
                  margin-right: 15px;
                }
                .souce {
                  margin-right: 10px;
                }
              }
            }
            .ItemRight {
              img {
                width: 240px;
                height: 160px;
                border-radius: 12px 12px 12px 12px;
              }
            }
          }
          .contentItem:hover {
            background: #ffffff;
            box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
            border-radius: 16px 16px 16px 16px;
            .title {
              color: #2954ff;
            }
          }
        }
      }
      .bodyRight {
        width: 420px;
        margin-left: 130px;
        .header {
          display: flex;
          justify-content: space-between;
          .refresh {
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-right: 10px;
            img {
              width: 16px;
              height: 16px;
              margin-right: 10px;
            }
          }
        }
        .hotNewsBody {
          .hotNewsItem {
            display: flex;
            margin-top: 20px;
            padding: 10px;
            cursor: pointer;
            .ItemLeft {
              position: relative;
              img {
                width: 140px;
                height: 100px;
                border-radius: 8px 8px 8px 8px;
              }
              .ranking {
                width: 20px;
                height: 20px;
                top: 0;
                left: 0;
                position: absolute;
                background: url("@/utils/image/ranking.png");
                background-size: 100% 100%;
                color: #fff;
                text-align: center;
              }
            }
            .ItemRight {
              margin-left: 15px;
              padding: 7px 0;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .title {
                font-weight: 500;
                font-size: 16px;
                color: #262626;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: normal;
              }
              .type {
                font-size: 14px;
                color: #587dff;
              }
            }
          }
          .hotNewsItem:hover {
            background: #ffffff;
            box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
            border-radius: 16px 16px 16px 16px;
            .title {
                color: #2954FF;
            }
          }
        }
      }
    }
  }
}

.tooltipContent {
  img {
    display: block;
    width: 98px;
    height: 98px;
  }
}
</style>