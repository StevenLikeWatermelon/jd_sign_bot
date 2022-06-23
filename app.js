// version v0.0.2
// create by ruicky
// detail url: https://github.com/ruicky/jd_sign_bot

const exec = require('child_process').execSync;
const rp = require('request-promise');
// 公共变量
const serverJ = 'SCT157017TlXYr1ryOmWAM4NHjeSBhJyRu';

async function start() {
  let content = '';
  try {
    content = await exec("node JD_DailyBonus.js", {
      encoding: 'utf8'
    });
  } catch (error) {
    console.log(error);
  }

  if (serverJ) {
    let t = content.match(/【签到概览】:((.|\n)*)【签到总计】/)
    let res = t ? t[1].replace(/\n/,'') : '失败'
    let t2 = content.match(/【签到总计】:((.|\n)*)【账号总计】/)
    let res2 = t2 ? t2[1].replace(/\n/,'') : '总计0'
    let text = "" + ` ${res2} ` + ` ${res} ` + new Date().toLocaleDateString()
    console.log('发送通知');
    const options ={
      uri:  `https://sc.ftqq.com/${serverJ}.send`,
      form: { text, content },
      json: true,
      method: 'POST'
    }
    rp.post(options).then(res=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
    console.log('发送通知结束');
  }
}

start()
