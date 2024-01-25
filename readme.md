https://github.com/aneasystone/weekly-practice/tree/main


// 看起来就是查找两个<br> 之间的 内容作为一个 模板点
    // 将表情保留，冒号前的东西保留；其他替换
    // 告诉我怎么找到页面中 id = detail - desc 的div 元素下的数据


    1. 我想实现未来 新增匹配规则，能快速的视线 现在先新增实现day1
    2. 范例：https://www.xiaohongshu.com/explore/6406cd9f0000000013001c47?m_source=pinpai
    3. 可以在控制台限制性看看效果 。


https://www.xiaohongshu.com/explore/64549d4400000000120338c4?m_source=pinpai -- done : 如果表情后面跟着的文字超过x于x个字符，就还是认为是标题
高铁上海到衢州两小时。在衢州当地全程打车（几乎都是10元以内），到了开化和龙游是租车自驾，不开车的话可以从衢州坐客车下去，半小时一班车也很方便。

https://www.xiaohongshu.com/explore/6406cd9f0000000013001c47?m_source=pinpai -- done

https://www.xiaohongshu.com/explore/65a5163f000000000f01d174?m_source=pinpai  -- done

https://www.xiaohongshu.com/explore/659903a1000000000f0105d7?m_source=pinpai -- 要识别到这个

https://www.xiaohongshu.com/explore/658ffcad0000000013035be5?m_source=pinpai

https://www.xiaohongshu.com/explore/659903a1000000000f0105d7?m_source=pinpai shibie这个序号 

https://zhuanlan.zhihu.com/p/89316809 这个很好 -- 给我一个启发 就是这个插件的名字叫做 表情模板提取，突出表情 同款

如果整篇内容没有什么可以提取的，提示无明显模板可用。

差不多了，就是我想能不能识别出哪些应该写标题，哪些应该写内容？ 不然就只是一个表情提取器， -- done
同时分段好像还是有点偏差

npm install webpack webpack-cli --save-dev
npx webpack --config webpack.config.js