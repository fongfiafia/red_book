import EmojiReader from 'emoji-reader';
import 'canvas-confetti';

var dayRexgex = /DAY\d+/g;

function closeCard() {
    console.log("Card closed");
    var card = document.getElementById("myCard");
    card.style.display = "none"; // 或者其他关闭卡片的逻辑，例如删除节点等
}

function copyContent() {
    var textToCopy = document.getElementById("copyText").innerText;
    var tempInput = document.createElement("textarea");
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    console.log("Copied text: " + textToCopy);


    var copySuccessMessage = document.getElementById("copySuccessMessage");
    copySuccessMessage.style.display = "block";

    // 获取元素在页面中的位置信息
    var rect = copySuccessMessage.getBoundingClientRect();

    // 计算中心点的坐标
    var centerX = rect.left + rect.width / 2 + window.scrollX;
    var centerY = rect.top + rect.height / 2 + window.scrollY;
    var x = (centerX - rect.left) / rect.width;
    var y = (centerY - rect.top) / rect.height;

    confetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 360,
        origin: {
            x: x,
            y: y
        }
    });

    // 慢慢消失
    setTimeout(function () {
        copySuccessMessage.style.display = "none";
    }, 800); // 2秒后隐藏
}

// 设置 link 元素的属性
const linkElement = document.createElement('link');
linkElement.rel = 'stylesheet';
linkElement.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
// 将 link 元素添加到 head 中
document.head.appendChild(linkElement);

// 用户点击时执行的函数
function handleClick() {
    const interactionContainer = document.querySelector('.interaction-container');

    const hh_btn = document.querySelector('.hh_btn');
    if (hh_btn) {
        // 已经存在就跳过
        return
    }

    if (interactionContainer) {
        console.log('Interaction container found!');
        // 创建一个按钮元素
        const button = document.createElement('button');
        // 使用 Bootstrap 的按钮类
        button.classList.add('btn', 'btn-primary', 'hh_btn');

        button.textContent = '点击生成同款文案模板';

        // set button color as #FF2E4D
        button.style.backgroundColor = '#FF2D4D';
        // set button width as 117px
        button.style.width = '300px';
        button.style.height = '400px';
        button.style.borderRadius = '20px';
        button.style.marginTop = 'auto';
        button.style.marginBottom = 'auto';
        button.style.borderColor = '#FF2E4D';

        // 添加点击事件监听器
        button.addEventListener('click', function () {
            // 在这里可以添加按钮点击后的逻辑
            generateTemplateClick()
        });

        button.style.marginLeft = '7px';

        // 添加按钮到interaction-container的右侧
        interactionContainer.parentNode.insertBefore(button, interactionContainer.nextSibling);
    }
}

// 在每个页面上添加点击事件监听器
// 每间隔1s执行一次document.addEventListener('click', handleClick);
setInterval(() => {
    handleClick();
}, 1000);

document.addEventListener('click', handleClick);

function generateTemplateClick() {
    function closeCard() {
        console.log("Card closed");
        var card = document.getElementById("myCard");
        card.style.display = "none"; // 或者其他关闭卡片的逻辑，例如删除节点等
    }


    // 获取文本内容并处理       
    const processText = (element) => {
        element.childNodes.forEach((node) => {
            if (node.nodeType === 3) { // 文本节点
                const emojiRegex = regex;
                const replacedText = node.nodeValue.replace(/[^<>&\n]+/g, (m) => (emojiRegex.test(m) ? m : '替换成您的文案'));
                node.replaceWith(replacedText);
            } else if (node.nodeType === 1) { // 元素节点
                processText(node);
            }
        });
    };

    let detailDescElement = document.querySelector("#detail-desc");
    if (detailDescElement) {
        let firstSpanElement = detailDescElement.querySelector("span");
        if (firstSpanElement) {
            console.log(firstSpanElement);
            let finalHtml = "" // 一般在最开始一定会有一个大的总结和情感抒发
            let processData = firstSpanElement.innerHTML
            let dataExcludeBr = processData.split("<br>")
            let brCnt = dataExcludeBr.length - 1;
            console.log(brCnt);
            let hasEmojiIdx = -1
            for (let i = 0; i < brCnt; i++) {
                let tmpData = dataExcludeBr[i]
                // let finalHtml = ""
                // let tmpData = "📍DAY6:峨眉-乌木博物馆-乐山大佛-返回成都🏠"

                // 特化逻辑 如果是一个字符的一般是分割符
                if (tmpData.length == 1) {
                    finalHtml = finalHtml + tmpData + "<br>"
                    continue
                }

                let emojiInfo = []

                const analyzedText = EmojiReader.analyzeText(tmpData); //5
                console.log(analyzedText)
                let all = analyzedText.array_hd7ov6$_0
                // iterator correct list 
                for (let i = 0; i < all.length; i++) {
                    let simple = all[i]
                    if (simple.isEmoji) {
                        emojiInfo.push({
                            "idx": simple.startIndex,
                            "emoji": tmpData.substring(simple.startIndex, simple.startIndex + simple.length)
                        })
                    }
                }

                for (const match of tmpData.matchAll(dayRexgex)) {
                    emojiInfo.push({
                        "idx": match.index,
                        "emoji": match[0]
                    })
                }

                // emojiInfo根据idx升序排
                emojiInfo.sort((a, b) => a.idx - b.idx);
                console.log(emojiInfo);

                // rule 1
                if (emojiInfo.length == 0) {
                    if (i == 0) { // 没有任何emoji同时是第一行
                        finalHtml = "<此处写整篇博文的总结和您的一些情感>" + "<br>" // 一般在最开始一定会有一个大的总结和情感抒发
                    }
                    // 没有表情纯纯的文本，那就一般就是主要的文案
                    // 我认为一航标请后面 如果没有表情那么就一定是一段对表情标题的内容
                    if (i > 0) {
                        if (i - 1 == hasEmojiIdx) {
                            finalHtml = finalHtml + "此处写小标题对应文案" + "<br>"
                        } else {
                            console.log(finalHtml.substring(finalHtml.length - 14, finalHtml.length))
                            if (finalHtml.substring(finalHtml.length - 14, finalHtml.length) != "此处写一些引导性文案" + "<br>") {
                                finalHtml = finalHtml + "此处写一些引导性文案" + "<br>"
                            }
                        }
                    }
                    continue
                }

                // emoji的拼接
                for (let j = 0; j < emojiInfo.length; j++) {
                    console.log(j)
                    // 如果两个表情紧贴，那么就紧贴不需要中间插入文本
                    let needAppend = false
                    for (let k = j + 1; k < emojiInfo.length; k++) {
                        if (emojiInfo[k].idx == emojiInfo[k - 1].emoji.length) {
                            finalHtml = finalHtml + emojiInfo[k - 1].emoji + emojiInfo[k].emoji
                            needAppend = true
                            j = k
                        }
                        if (k == emojiInfo.length - 1 && needAppend) {
                            finalHtml = finalHtml + "<此处写小标题>"
                        }
                    }
                    if (i == 0) { // 很特化
                        finalHtml = finalHtml + emojiInfo[j].emoji + "<此处写整篇博文的总结和您的一些情感>" // 一般在最开始一定会有一个大的总结和情感抒发 -- 有emoji同时又是第一行
                    } else if (!needAppend) {
                        if ((Number(emojiInfo[j].idx) + emojiInfo[j].emoji.length) == tmpData.length) {
                            finalHtml = finalHtml + emojiInfo[j].emoji
                        } else {
                            finalHtml = finalHtml + emojiInfo[j].emoji + "<此处写小标题>"
                        }
                    }
                    hasEmojiIdx = i
                }
                finalHtml = finalHtml + "<br>"
                console.log(finalHtml);
            }

            console.log(finalHtml);

            if (brCnt == 0 || hasEmojiIdx == -1) {
                finalHtml = "没有匹配到明显的模板，不建议参考" + "<br>"
            }

            // 找到class是hh_btn的元素
            const hhBtn = document.querySelector('.hh_btn');

            if (hhBtn) {
                // 创建卡片容器
                const container = document.createElement('div');
                container.classList.add('card-container');

                // 设置卡片内容
                container.innerHTML = `
                          <div class="card" style="width: 300px; height: 400px; position: relative; margin-top: auto; margin-bottom: auto ; border-radius: 20px; position: absolute; top: 50%; transform: translate(-50%, -50%); left: 46%">
                            <div class="card-body">
                            <h5 class="card-title" style="justify-content:space-between; display: flex; align-items: center;">
                                <div>同款模板</div>
                                <div>
                                    <button type="button" class="btn btn-primary btn-sm"
                                        style="background-color: #FF2E4D; border-color: #FF2E4D;border-radius: 20px; opacity: 0.85; height: 30px;" onclick="copyContent()">复制
                                    </button>
                                    <button type="button" class="btn btn-secondary btn-sm" style="border-radius: 100px; opacity: 0.85; height: 30px;"
                                        onclick="closeCard()">X
                                    </button>
                                </div>
                            </h5>
                            <div style="margin-bottom: 5px;">
                                <p class="card-text" style="overflow: auto; max-height: 350px; height: 350px">
                                    ${finalHtml}
                                </p>
                            </div>
                             <div id="copySuccessMessage" class="hidden"
                                style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); align-items: center; justify-content: center">
                                复制成功
                                    </div>
                        </div>

                         <script>
                            function closeCard() {
                            console.log("Card closed");
                            var card = document.getElementById("myCard");
                            card.style.display = "none"; // 或者其他关闭卡片的逻辑，例如删除节点等
                            }

                            function copyContent() {
                            var textToCopy = document.getElementById("copyText").innerText;
                            var tempInput = document.createElement("textarea");
                            tempInput.value = textToCopy;
                            document.body.appendChild(tempInput);
                            tempInput.select();
                            document.execCommand("copy");
                            document.body.removeChild(tempInput);

                            console.log("Copied text: " + textToCopy);


                            var copySuccessMessage = document.getElementById("copySuccessMessage");
                            copySuccessMessage.style.display = "block";

                            // 获取元素在页面中的位置信息
                            var rect = copySuccessMessage.getBoundingClientRect();

                            // 计算中心点的坐标
                            var centerX = rect.left + rect.width / 2 + window.scrollX;
                            var centerY = rect.top + rect.height / 2 + window.scrollY;
                            var x = (centerX - rect.left) / rect.width;
                            var y = (centerY - rect.top) / rect.height;

                            confetti({
                                particleCount: 100,
                                startVelocity: 30,
                                spread: 360,
                                origin: {
                                x: x,
                                // since they fall down, start a bit higher than random
                                y: y
                                }
                            });

                            // 慢慢消失
                            setTimeout(function () {
                                copySuccessMessage.style.display = "none";
                            }, 800); // 2秒后隐藏
                            }

                            // confetti({
                            //   shapes: [pineapple],
                            //   scalar
                            // });

                        </script>
                        <style>
                            #copySuccessMessage {
                            position: fixed;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            background-color: #FF2E4D;
                            color: white;
                            padding: 15px;
                            border-radius: 100px;
                            display: none;
                            opacity: 0.6;
                            }
                        
                            .hidden {
                            display: none;
                            }
                        </style>
                    `;


                // 设置卡片容器样式

                // 插入卡片到hh_btn右边
                hhBtn.parentNode.insertBefore(container, hhBtn.nextSibling);
            }

            // let close = container.querySelector('.close')
            // close.onclick = () => {
            //     container.classList.remove('show')
            // }


        }
    }
}