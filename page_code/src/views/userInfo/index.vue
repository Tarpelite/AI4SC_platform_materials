<template>
  <div class="userInfo">
    <div class="content">
      <div class="information">
        <div class="infoBox">
          <div class="avatar">
            <img v-if="userInfo.avator" :src="userInfo.avator" alt="images.user"/>
            <img v-else :src="images.user" alt="images.user"/>
          </div>
          <div class="info">
            <div class="name">Hi, {{ userInfo.username}}</div>
            <div class="time">今天是你加入科学智算共性平台的第 {{ userInfo.countDate }} 天~</div>
            <!--            <img :src="images.edit" alt=""/>-->
            <div class="basicInformation">
              <div class="left">
                <div class="item">
                  <span class="title">邮箱</span>
                  <span class="spanContent">{{ userInfo.email }}</span>
                </div>
                <div class="item">
                  <!--                  <span class="title">手机号</span>-->
                  <!--                  <span class="spanContent">18759445778</span>-->
                </div>
              </div>
              <div class="right">
                <div class="item">
                  <span class="title">加入时间</span>
                  <span class="spanContent">{{ userInfo.joinDateStr }}</span>
                </div>
                <div class="item">
                  <!--                  <span class="title">加入时间</span>-->
                  <!--                  <span class="spanContent">2023-04-08</span>-->
                </div>
              </div>
            </div>
            <div class="info-edit" @click="dialogFormVisible= !dialogFormVisible">编辑</div>
          </div>
        </div>
        <div class="collect">
          <div class="quest">
            <div class="title">收藏新闻数量</div>
            <div class="num" v-if="userInfo.favorite_news">{{ userInfo.favorite_news.length }}</div>
          </div>
          <div class="kit">
            <div class="title">收藏科任务数量</div>
            <div class="num" v-if="userInfo.favorite_tasks">{{ userInfo.favorite_tasks.length }}</div>
          </div>
        </div>
      </div>
      <div class="history">
        <div class="title">浏览历史</div>
        <div class="historyBody">
          <div
              class="historyItem"
              v-for="(item, index) in historyList"
              :key="index"
              @click="jumpDetail(item, item._tag)"
          >
            <div class="ItemLeft">
              <img v-lazy="item.image" alt=""/>
            </div>
            <div class="ItemRight">
              <div class="title">{{ item.title }}</div>
              <div class="type">
                {{ item.type }}
                <div class="time">{{ item.dataLocal }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="collectBox">
      <div class="tab">
        <div
            class="quest"
            :class="active == 0 ? 'active' : ''"
            @click="active = 0"
        >
          科学新闻收藏
        </div>
        <div
            class="kit"
            :class="active == 1 ? 'active' : ''"
            @click="active = 1"
        >
          科学任务收藏
        </div>
      </div>
      <div class="collectContent">
        <div v-if="active == 0" style="display: flex; flex-wrap: wrap">
          <div
              class="questItem"
              v-for="(item, index) in collectNewsList"
              :key="index"
              @click="jumpDetail(item, null)"
          >
            <div class="img">
              <img v-lazy="item.image" alt=""/>
            </div>
            <div class="boxBody">
              <div class="title">{{ item.title }}</div>
              <div class="msg">{{ item.description }}</div>
              <div class="tag">
                <div class="type">{{ item.category }}</div>
                <div class="algorithm">{{ item.source }}</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="active == 1" style="display: flex; flex-wrap: wrap">
          <div
              class="questItem"
              v-for="(item, index) in collectScienceList"
              :key="index"
              @click="jumpDetail(item, null)"
          >
            <div class="img">
              <img v-lazy="item.image" alt=""/>
            </div>
            <div class="boxBody">
              <div class="title">{{ item.title }}</div>
              <div class="msg">{{ item.short_description }}</div>
              <div class="tag">
                <div class="type" v-if="item.domain">{{ item.domain.name }}</div>
                <div class="algorithm">{{ item.contributor }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="修改个人信息" :visible.sync="dialogFormVisible" width="460px">
      <el-form :model="dialogObj" style="width:400px;">
        <el-form-item label="用户名" required>
          <el-input v-model="dialogObj.username" placeholder="请输入原密码" size="small"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
              action="#"
              ref="upload"
              :on-remove="handleRemove"
              :limit="1"
              :on-exceed="handleExceed"
              :beforeUpload="beforeAvatarUpload"
              :file-list="fileList"
              :http-request="handleFileUpload"
              list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import images from "@/utils/js/exportImage";
import {getNewsList, getScienceList, getUserHistory, getUserInfo, updateUserInfo} from "@/api/api";
import {formatDate} from "@/utils/date";

export default {
  data() {
    return {
      images: images,
      historyList: [],
      active: 0,
      userInfo: {},
      kitList: [],
      fileList: [],
      collectNewsList: [],
      collectScienceList: [],
      dialogFormVisible: false,
      file: {},
      dialogObj: {
        username: '',
      }
    };
  },
  computed: {
    collectList() {
      return this.active === 0 ? this.collectNewsList : this.collectScienceList
    }
  },
  components: {},
  async activated() {
    await this._getUserInfo()
    this._getUserHistoryList()
    this._getUserCollectList()
  },
  methods: {
    async _getUserInfo() {
      const userInfo = await getUserInfo()
      userInfo.countDate = this.daysSinceTimestamp(userInfo.registration_date)
      userInfo.joinDateStr = formatDate(new Date(userInfo.registration_date), 'yyyy-MM-dd')
      this.userInfo = userInfo
      this.$set(this.dialogObj, 'username', userInfo.username)
    },
    async _getUserCollectList() {
      if(this.userInfo.favorite_news.length) {
        this.collectNewsList = await getNewsList({ids: this.userInfo.favorite_news.join(',')})
      }
      if(this.userInfo.favorite_tasks.length) {
        this.collectScienceList = await getScienceList({ids: this.userInfo.favorite_tasks.join(',')})
      }
    },
    async _getUserHistoryList() {
      const mixList = await getUserHistory()
      mixList.news.forEach(item => {
        item.dataLocal = formatDate(new Date(item.visited_on), 'MM/dd hh:mm')
        item._tag = 0
      })
      mixList.science_tasks.forEach(item => {
        item.dataLocal = formatDate(new Date(item.visited_on), 'MM/dd hh:mm')
        item._tag = 1
      })
      const historyList = [...mixList.news, ...mixList.science_tasks]
      historyList.sort((a, b) => {
        return new Date(b.visited_on).getTime() - new Date(a.visited_on).getTime()
      })
      this.historyList = historyList
    },
    async handleDialogConfirm() {
      let userInfoForm = new FormData()
      userInfoForm.append('avator', this.file.file)
      userInfoForm.append('username', this.dialogObj.username )
      const result = await updateUserInfo(userInfoForm)
      this._getUserInfo()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 处理预览操作
    handlePreview(file) {
      console.log('preview', file);
    },
    // 处理超出图片个数操作
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024  < 500
      if(!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 500kb!',
          type: 'warning'
        });
      }
      return isLt2M
    },
    // 处理文件上传操作
    handleFileUpload(file) {
      this.file = file
      // 调用后端服务器的接口
    },
    jumpDetail(item, category) {
      // 0新闻
      if(category == null) {
        category = this.active
      }
      if(category === 0) {
        this.$router.push({path: `/newsNoticeDetail/${item.id}`});
      } else {
        this.$router.push({path: `/scientificMissionDetail/${item.id}`});
      }
    },
    daysSinceTimestamp(timestamp) {
      const startDate = new Date(timestamp);
      const endDate = new Date();
      // 将日期转换为毫秒
      const startMillis = startDate.getTime();
      const endMillis = endDate.getTime();
      // 计算时间差（毫秒）
      const timeDiff = endMillis - startMillis;
      // 将时间差转换为天数
      return Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
    }
  },
};
</script>

<style lang="scss" scoped>
.userInfo {
  height: 100%;
  background: #fafafa;
  max-width: 2000px;
  min-width: 900px;
  margin: 0 auto;

  .content {
    width: 1440px;
    padding: 40px 80px;
    margin: 0 auto;
    display: flex;

    .information {
      width: 860px;
      margin-right: 20px;

      .infoBox {
        height: 280px;
        background: #ffffff;
        box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
        border-radius: 16px 16px 16px 16px;
        padding: 40px;
        display: flex;
        position: relative;
        .info-edit {
          position: absolute;
          right: 40px;
          top: 60px;
          color: #6e91fa;
          cursor: pointer;
        }
        .avatar {
          img {
            border-radius: 50%;
            width: 120px;
            height: 120px;
          }
        }

        .info {
          margin: 20px 0 0 40px;
          .name {
            font-weight: bold;
            font-size: 24px;
            color: #262626;
          }

          .time {
            font-size: 14px;
            color: #262626;
            margin-top: 8px;
          }

          img {
            width: 16px;
            height: 16px;
            margin-top: 8px;
            cursor: pointer;
          }

          .basicInformation {
            display: flex;
            margin-top: 10px;

            .left {
              margin-right: 50px;
            }

            .item {
              font-size: 14px;
              color: #262626;
              margin-top: 15px;

              .title {
                width: 100px;
                display: inline-block;
              }
            }
          }
        }
      }

      .collect {
        margin-top: 20px;
        height: 120px;
        background: #ffffff;
        box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
        border-radius: 16px 16px 16px 16px;
        padding: 24px 40px;
        display: flex;

        .title {
          font-weight: 500;
          font-size: 16px;
          color: #262626;
          text-align: center;
        }

        .num {
          font-weight: 500;
          font-size: 40px;
          color: #6e91fa;
          text-align: center;
        }

        .quest {
          width: 370px;
        }

        .kit {
          width: 370px;
        }
      }
    }

    .history {
      width: 400px;
      height: 420px;
      background: #ffffff;
      box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
      border-radius: 16px 16px 16px 16px;
      padding: 24px;
      overflow-y: auto;

      .historyBody {

        .historyItem {
          display: flex;
          margin-top: 6px;
          padding: 6px;
          cursor: pointer;
          background: #fafafa;

          .ItemLeft {
            position: relative;

            img {
              width: 48px;
              height: 48px;
              border-radius: 8px 8px 8px 8px;
            }
          }

          .ItemRight {
            margin-left: 15px;
            display: flex;
            flex: 1;
            flex-direction: column;

            .title {
              font-weight: 500;
              font-size: 14px;
              color: #262626;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: normal;
            }

            .type {
              font-size: 14px;
              color: #587dff;
              display: flex;
              justify-content: space-between;
              margin-top: 5px;

              .time {
                color: #262626;
              }
            }
          }
        }

        .historyItem:hover {
          background: #ffffff;
          box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
          border-radius: 16px 16px 16px 16px;

          .title {
            color: #2954ff;
          }
        }
      }
    }
  }

  .collectBox {
    width: 1440px;
    margin: 0 auto;
    padding: 0px 80px;

    .tab {
      width: 400px;
      height: 40px;
      background: #d9d9d9;
      box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
      border-radius: 12px 12px 12px 12px;
      display: flex;
      text-align: center;
      line-height: 35px;

      div {
        margin: 2px;
        width: 198px;
        height: 36px;
        cursor: pointer;
      }

      div:hover {
        color: #2954ff;
        background: #ffffff;
        border-radius: 10px 10px 10px 10px;
      }

      .active {
        color: #2954ff;
        background: #ffffff;
        border-radius: 10px 10px 10px 10px;
      }
    }

    .collectContent {
      margin-top: 40px;
      border-radius: 16px;

      .questItem {
        width: 290px;
        height: 320px;
        margin: 0 30px 30px 0;
        cursor: pointer;

        .img {
          width: 290px;
          height: 160px;
          background: linear-gradient(180deg, #9cb9ff 0%, #deeaff 100%);
          border-radius: 16px 16px 0px 0px;

          img {
            width: 250px;
            height: 139px;
            border-radius: 8px 8px 0px 0px;
            margin: 20px 20px 0 20px;
          }
        }

        .boxBody {
          width: 290px;
          height: 160px;
          padding: 15px 20px;
          background: #fff;
          border-radius: 0px 0px 16px 16px;
          box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);

          .title {
            font-weight: bold;
            font-size: 16px;
            color: #262626;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
          }

          .msg {
            font-size: 12px;
            color: #262626;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
            margin-top: 8px;
          }

          .tag {
            display: flex;
            font-size: 12px;
            margin-top: 24px;

            .type {
              background: #587dff;
              border-radius: 14px 14px 14px 14px;
              color: #ffffff;
              padding: 2px 8px;
              margin-right: 5px;
            }

            .algorithm {
              background: #ffffff;
              border: 1px solid #587dff;
              border-radius: 14px 14px 14px 14px;
              color: #587dff;
              padding: 2px 8px;
            }
          }
        }
      }

      .kitItem {
        width: 400px;
        height: 420px;
        background: linear-gradient(
                180deg,
                #ccd7ff 0%,
                #f5f7ff 52%,
                #ffffff 100%
        );
        box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
        border-radius: 20px;
        padding: 20px;
        position: relative;
        margin: 0 25px 30px 0;
        cursor: pointer;

        .text {
          margin-top: 24px;

          .titleChild {
            font-weight: bold;
            font-size: 24px;
            color: #262626;
          }

          .msg {
            font-size: 14px;
            color: #262626;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
            margin-top: 10px;
          }
        }

        .smallImg {
          width: 80px;
          height: 28px;
          position: absolute;
          right: 20px;
          bottom: 20px;
        }

        img {
          width: 360px;
          height: 200px;
          border-radius: 10px;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
