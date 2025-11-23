window.currentTemplate = "classic";
window.resumeData = null;

document.addEventListener("DOMContentLoaded", function () {
  initializeEventListeners();
});

function initializeEventListeners() {
  const generateBtn = document.getElementById("generateBtn");
  generateBtn.addEventListener("click", function () {
    const data = collectFormData();
    if (data) {
      window.resumeData = data;
      generateResume(data);
    }
  });

  const templateBtns = document.querySelectorAll(".template-btn");
  templateBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const template = this.getAttribute("data-template");
      switchTemplate(template);
    });
  });
}

function collectFormData() {
  // 通过输入框的value属性获取用户输入的数据
  const data = {
    fullName: document.getElementById("fullName").value || alert("请填写必填字段"),
    email: document.getElementById("email").value || alert("请填写必填字段"),
    phone: document.getElementById("phone").value || alert("请填写必填字段"),
    experience: document.getElementById("experience").value,
    education: document.getElementById("education").value,
  };

  return data;
}

function generateResume(data) {
  const resumeContent = document.getElementById("resumeContent");

  const resumeHTML = `
        <div class="resume-header">
            <div class="resume-name">${data.fullName}</div>
            <div class="resume-contact">
                ${data.email} | ${data.phone}
            </div>
        </div>

        ${
          data.experience
            ? `
        <div class="resume-section">
            <div class="section-title">工作经历</div>
            <p>${data.experience.replace(/\n/g, "<br>")}</p>
        </div>
        `
            : ""
        }

        ${
          data.education
            ? `
        <div class="resume-section">
            <div class="section-title">教育背景</div>
            <p>${data.education.replace(/\n/g, "<br>")}</p>
        </div>
        `
            : ""
        }
    `;

  resumeContent.innerHTML = resumeHTML;

  resumeContent.className = `resume-content ${currentTemplate}`;
}

/**
 * @param {string} template - 选中的主题名称: 'classic' | 'modern' | 'minimal'
 */
function switchTemplate(template) {
  currentTemplate = template;
  
  // 更新简历预览区域的样式
  const resumeContent = document.getElementById("resumeContent");
  resumeContent.className = `resume-content ${template}`;
  
  // 更新按钮的选中状态
  const templateBtns = document.querySelectorAll(".template-btn");
  templateBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      templateBtns.forEach(b => b.classList.remove("active"));
      this.classList.add("active");
    })
  })

  if (window.resumeData) {
    generateResume(window.resumeData);
  }
}