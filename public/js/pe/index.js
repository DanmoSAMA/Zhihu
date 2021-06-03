const designWidth = 375;  		// 设计稿宽度
const remPx = 100;               // 在屏幕宽度375px的时候，设置根元素字体大小 100px
let scale = window.innerWidth / designWidth; // 计算当前屏幕的宽度与设计稿比例
// 根据屏幕宽度动态计算根元素的字体大小
document.documentElement.style.fontSize = scale * remPx + 'px';