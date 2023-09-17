import { defineAppConfig } from '../types';

export default defineAppConfig({
  id: 'com.tencent.mm',
  name: '微信',
  groups: [
    {
      key: 0,
      name: '关闭朋友圈广告',
      desc: '朋友圈信息流广告,点击关闭按钮,确认关闭',
      activityIds: 'com.tencent.mm.plugin.sns.ui.SnsTimeLineUI',
      exampleUrls: [
        'https://github.com/gkd-kit/subscription/assets/38517192/c9ae4bba-a748-4755-b5e4-c7ad3d489a79',
      ],
      rules: [
        'TextView[text*="广告"] + TextView[text="关闭该广告"]',
        'ImageView - TextView[text="广告"][id!=null][index=0]',
      ],
    },
    {
      key: 1,
      name: '电脑微信快捷自动登录',
      activityIds: '.plugin.webwx.ui.ExtDeviceWXLoginUI',
      rules: 'TextView[text="取消登录"] - Button[text="登录"]',
    },
    {
      key: 2,
      name: '浏览器扫码微信登录自动授权',
      activityIds: ['com.tencent.mm.plugin.webview.ui.tools.SDKOAuthUI'],
      rules: 'Button[text="拒绝"] - Button[text="允许"]',
    },
    {
      key: 3,
      name: '微信手机第三方APP申请使用',
      desc: '自动点击同意',
      rules: [
        'TextView + TextView[text="申请使用"]',
        'Button[text="拒绝"] - Button[text="允许"]',
      ],
    },
    {
      key: 4,
      name: '微信读书网页版扫码登录自动授权',
      activityIds: ['com.tencent.mm.plugin.webview.ui.tools.MMWebViewUI'],
      rules: [
        {
          matches: 'Button[text="登 录"]',
          snapshotUrls: 'https://gkd-kit.songe.li/import/12506197',
        },
        {
          matches: [
            '[text="登录成功"]',
            '[id="com.tencent.mm:id/g1"][desc="返回"]',
          ],
          snapshotUrls: 'https://gkd-kit.songe.li/import/12506201',
        },
      ],
    },
    {
      enable: false,
      key: 5,
      name: '微信红包自动领取',
      desc: '自动领取私聊红包,群聊红包',
      exampleUrls:
        'https://github.com/gkd-kit/subscription/assets/38517192/32cfda78-b2e1-456c-8d85-bfb2bc4683aa',
      rules: [
        {
          name: '从红包结算界面返回',
          preKeys: [1, 2],
          activityIds:
            'com.tencent.mm.plugin.luckymoney.ui.LuckyMoneyBeforeDetailUI',
          matches: 'ImageView[desc="返回"]',
          snapshotUrls: 'https://gkd-kit.gitee.io/import/12567696',
        },
        {
          key: 1,
          name: '点击红包-开',
          activityIds:
            'com.tencent.mm.plugin.luckymoney.ui.LuckyMoneyNotHookReceiveUI',
          // Button[desc="开"] 会在出现金币动画时会消失
          matches: 'ImageButton[desc="开"] + Button[desc="开"]',
          snapshotUrls: [
            'https://gkd-kit.gitee.io/import/12567697',
            'https://gkd-kit.gitee.io/import/12567698', // 额外增加,金币动画的快照,规则不在这个快照上运行
          ],
        },
        {
          key: 2,
          name: '点击别人发的红包',
          activityIds: 'com.tencent.mm.ui.LauncherUI',
          // 第一个 LinearLayout[childCount=1] 区分是自己发的红包还是别人发的
          // 第二个 LinearLayout[childCount=1] 区分这个红包是否被领取过
          matches:
            'LinearLayout[childCount=1] >5 LinearLayout[childCount=1] - ImageView < LinearLayout + View + RelativeLayout > TextView[text="微信红包"][id!=null]',
          snapshotUrls: 'https://gkd-kit.gitee.io/import/12567637',
        },
      ],
    },
    {
      enable: false,
      key: 6,
      name: '订阅号底部广告',
      desc: '自动点击-广告反馈按钮-不感兴趣-与我无关',
      activityIds:
        'com.tencent.mm.plugin.brandservice.ui.timeline.preload.ui.TmplWebViewMMUI',
      rules: [
        {
          key: 1,
          name: '点击广告反馈按钮',
          matches: '[text="广告"] + [text="feedback_icon"]',
          snapshotUrls: 'https://gkd-kit.gitee.io/import/12642232',
        },
        {
          key: 2,
          preKeys: [1],
          name: '点击不感兴趣',
          matches: '[id^="menu"] > [id="dislike"][text="不感兴趣"]',
          snapshotUrls: ['https://gkd-kit.gitee.io/import/12642234'],
        },
        {
          key: 3,
          preKeys: [2],
          name: '点击与我无关',
          matches: '[id^="menu"] > [id="isdismatch"][text="与我无关"]',
          snapshotUrls: ['https://gkd-kit.gitee.io/import/12642238'],
        },
      ],
    },
  ],
});
