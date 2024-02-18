import EmojiReader from 'emoji-reader';
import JSConfetti from 'js-confetti'

const jsConfetti = new JSConfetti()

var dayRexgex = /DAY\d+/g;

// 用户点击时执行的函数
function handleClick() {
    const interactionContainer = document.querySelector('.interaction-container');

    const hh_btn = document.querySelector('.hh_btn');
    if (hh_btn) {
        // 已经存在就跳过
        return
    }

    if (interactionContainer) {
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
    var card = document.getElementById("myCard");
    if (card) {
        return
    }

    let pureHtml = ""

    function closeCard() {
        var card = document.getElementById("myCard");
        if (card) {
            // 从其父元素中移除 card 元素
            card.parentNode.removeChild(card);
        }
    }

    function copyContent() {
        var textToCopy = document.getElementById("copyText").innerText;
        var tempInput = document.createElement("textarea");
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);

        var copySuccessMessage = document.getElementById("copySuccessMessage");
        copySuccessMessage.style.display = "block";

        jsConfetti.addConfetti()

        // 慢慢消失
        setTimeout(function () {
            copySuccessMessage.style.display = "none";
        }, 800); // 2秒后隐藏
    }

    function copyPureContent() {
        var replacedStr = pureHtml.replace(/<br>/g, "\n");
        var textToCopy = replacedStr
        var tempInput = document.createElement("textarea");
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);

        var copySuccessMessage = document.getElementById("copySuccessMessage");
        copySuccessMessage.style.display = "block";

        jsConfetti.addConfetti()

        // 慢慢消失
        setTimeout(function () {
            copySuccessMessage.style.display = "none";
        }, 800); // 2秒后隐藏
    }

    let detailDescElement = document.querySelector("#detail-desc");

    if (!detailDescElement) {
        return
    }

    let allSpan = detailDescElement.querySelectorAll("span");
    if (!allSpan) {
        return
    }

    let finalHtml = "" // 一般在最开始一定会有一个大的总结和情感抒发
    for (let m = 0; m < allSpan.length; m++) {
        if (finalHtml != "没有匹配到明显的模板，不建议参考<br>" && m > 0) {
            break
        }
        let firstSpanElement = allSpan[m]
        // console.log(firstSpanElement);
        let processData = firstSpanElement.innerHTML
        let dataExcludeBr = processData.split("<br>")
        let brCnt = dataExcludeBr.length - 1;
        // console.log(brCnt);
        let hasEmojiIdx = -1
        for (let i = 0; i < brCnt; i++) {
            let tmpData = dataExcludeBr[i]
            // let finalHtml = ""
            // let tmpData = "📍DAY6:峨眉-乌木博物馆-乐山大佛-返回成都🏠"

            // 特化逻辑 如果是一个字符的一般是分割符
            if (tmpData.length == 1) {
                finalHtml = finalHtml + tmpData + "<br>"
                pureHtml = pureHtml + tmpData + "<br>"
                continue
            }

            let emojiInfo = []

            const analyzedText = EmojiReader.analyzeText(tmpData); //5
            // const analyzedText = "xxx"
            // console.log(analyzedText)
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
            // console.log(emojiInfo);

            // rule 1
            if (emojiInfo.length == 0) {
                if (i == 0) { // 没有任何emoji同时是第一行
                    finalHtml = "<此处写整篇博文的总结和您的一些情感>" + "<br>" // 一般在最开始一定会有一个大的总结和情感抒发
                    pureHtml = "<br>" // 一般在最开始一定会有一个大的总结和情感抒发
                }
                // 没有表情纯纯的文本，那就一般就是主要的文案
                // 我认为一航标请后面 如果没有表情那么就一定是一段对表情标题的内容
                if (i > 0) {
                    if (i - 1 == hasEmojiIdx) {
                        finalHtml = finalHtml + "此处写小标题对应文案" + "<br>"
                        pureHtml = pureHtml + "" + "<br>"
                    } else {
                        // console.log(finalHtml.substring(finalHtml.length - 14, finalHtml.length))
                        if (finalHtml.substring(finalHtml.length - 14, finalHtml.length) != "此处写一些引导性文案" + "<br>") {
                            finalHtml = finalHtml + "此处写一些引导性文案" + "<br>"
                            pureHtml = pureHtml + "" + "<br>"
                        }
                    }
                }
                continue
            }

            // emoji的拼接
            for (let j = 0; j < emojiInfo.length; j++) {
                // console.log(j)
                // 如果两个表情紧贴，那么就紧贴不需要中间插入文本
                let needAppend = false
                for (let k = j + 1; k < emojiInfo.length; k++) {
                    if (emojiInfo[k].idx == emojiInfo[k - 1].emoji.length) {
                        finalHtml = finalHtml + emojiInfo[k - 1].emoji + emojiInfo[k].emoji
                        pureHtml = pureHtml + emojiInfo[k - 1].emoji + emojiInfo[k].emoji
                        needAppend = true
                        j = k
                    }
                    if (k == emojiInfo.length - 1 && needAppend) {
                        finalHtml = finalHtml + "<此处写小标题>"
                        pureHtml = pureHtml + ""
                    }
                }
                if (i == 0) { // 很特化
                    finalHtml = finalHtml + emojiInfo[j].emoji + "<此处写整篇博文的总结和您的一些情感>" // 一般在最开始一定会有一个大的总结和情感抒发 -- 有emoji同时又是第一行
                } else if (!needAppend) {
                    if ((Number(emojiInfo[j].idx) + emojiInfo[j].emoji.length) == tmpData.length) {
                        finalHtml = finalHtml + emojiInfo[j].emoji
                        pureHtml = pureHtml + emojiInfo[j].emoji
                    } else {
                        finalHtml = finalHtml + emojiInfo[j].emoji + "<此处写小标题>"
                        pureHtml = pureHtml + emojiInfo[j].emoji
                    }
                }
                hasEmojiIdx = i
            }
            finalHtml = finalHtml + "<br>"
            pureHtml = pureHtml + "<br>"
            // console.log(finalHtml);
        }

        // console.log(finalHtml);

        if ((brCnt == 0 || hasEmojiIdx == -1)) {
            finalHtml = "没有匹配到明显的模板，不建议参考" + "<br>"
            pureHtml = "没有匹配到明显的模板，不建议参考" + "<br>"
        }
    }

    // console.log(finalHtml);

    // 找到class是hh_btn的元素
    const noteContainer = document.getElementById('noteContainer');

    // 创建卡片容器
    const container = document.createElement('div');

    container.classList.add('card-container');

    // 设置卡片内容
    container.innerHTML = `
                    <div class="card shadow-box" style="width: 300px; height: 400px; border-radius: 20px;" id="myCard">
                    <div class="card-body">
                    <h5 class="card-title" style="justify-content:space-between; display: flex; align-items: center;">
                        <div>同款模板</div>
                        <div>
                            <button type="button" class="btn btn-primary btn-sm" id="copybtn"
                                style="background-color: #FF2E4D; border-color: #FF2E4D;border-radius: 20px; opacity: 0.85; height: 30px;">复制
                            </button>
                             <button type="button" class="btn btn-primary btn-sm" id="pureCopybtn"
                                style="background-color: #FF2E4D; border-color: #FF2E4D;border-radius: 20px; opacity: 0.85; height: 30px;">纯净复制
                            </button>
                            <button type="button" class="btn btn-secondary btn-sm" id="closebtn" style="border-radius: 100px; opacity: 0.85; height: 30px;">X
                            </button>
                        </div>
                    </h5>
                    <div style="margin-bottom: 5px;">
                        <p class="card-text" id="copyText" style="overflow: auto; max-height: 350px; height: 350px">
                            ${finalHtml}
                        </p>
                    </div>
                        <div id="copySuccessMessage" class="hidden"
                        style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); align-items: center; justify-content: center">
                        复制成功
                    </div>
                </div>
            `;

    // 设置新元素 A 的样式
    container.style.position = 'absolute';
    container.style.top = '50%';
    container.style.left = '50%';
    container.style.transform = 'translate(-50%, -50%)'; // 将元素 A 中心点移动到左上角的偏移

    // 插入卡片到hh_btn右边
    noteContainer.appendChild(container);

    let copybtn = document.getElementById("copybtn")
    copybtn.addEventListener("click", copyContent);

    let pureCopybtn = document.getElementById("pureCopybtn")
    pureCopybtn.addEventListener("click", copyPureContent);

    let closebtn = document.getElementById("closebtn")
    closebtn.addEventListener("click", closeCard);
}