const a1 = document.getElementsByTagName("a")[0];
const a2 = document.getElementsByTagName("a")[1];
const form1 = document.getElementsByClassName("form_1")[0];
const form2 = document.getElementsByClassName("form_2")[0];
const logBtn = document.getElementsByClassName("btn_1")[0];
const regBtn = document.getElementsByClassName("btn_2")[0];
const input1 = form1.getElementsByTagName("input")[0];
const input2 = form1.getElementsByTagName("input")[1];
const input3 = form2.getElementsByTagName("input")[0];
const input4 = form2.getElementsByTagName("input")[1];

a1.onclick = function () {
  a1.className = "chosen";
  a2.className = "";
  form2.style.display = "none";
  form1.style.display = "block";
}

a2.onclick = function () {
  a2.className = "chosen";
  a1.className = "";
  form1.style.display = "none";
  form2.style.display = "block";
}
logBtn.onclick = function () {
  const xhr = new XMLHttpRequest();
  xhr.open('post', '/login');
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(`type=1&id=${input1.value}&password=${input2.value}`);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        let data = JSON.parse(xhr.response);
        if (data.status == 200) {
          // console.log("登录成功！");
          window.location.href = "/";
        }
        else if (data.status == 404) {
          alert('请先注册！');
          location.reload();
        }
        else {
          alert('密码错误，请重新输入！');
        }
      }
    }
  }
}
regBtn.onclick = function () {
  const xhr = new XMLHttpRequest();
  xhr.open('post', '/login');
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  // console.log(`id=${input3.value}&password=${input4.value}`);
  xhr.send(`type=2&id=${input3.value}&password=${input4.value}`);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        let data = JSON.parse(xhr.response);
        if (data.status == 200) {
          window.location.href = "/";
        }
        else if (data.status == 499) {
          alert('该用户已注册！');
          location.reload();
        }
      }
    }
  }
}
