export default class Form {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll('input');
        this.message = {
            loading: 'Loading...',
            spinner: 'assets/img/spinner.gif',
            ok: 'assets/img/ok.png',
            success: 'Thank you, we will contact you!',
            failure: 'Something getting wrong!'
        };
        this.path = 'assets/question.php';
    }


    clearAllInputs() {
        this.inputs.forEach(input => {
            input.value = '';
        })
    }

    checkMailInputs() {
        const textInputs = document.querySelectorAll(['[type="email"]']);
      
        textInputs.forEach((input) => {
          input.addEventListener("keypress", function (e) {
            if (e.key.match(/[^a-z 0-9 @ \.]/)) {
              e.preventDefault();
            }
          });
        });
      }

      initMask() {
        let setCursorPosition = (pos, elem) => {
            elem.focus();
        
            if (elem.setSelectionRange) {
              elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
              let range = elem.createTextRange();
        
              range.collapse(true);
              range.moveEnd("character", pos);
              range.moveStart("character", pos);
              range.select();
            }
          };
        
          function createMask(event) {
            let matrix = "+1 (___) ___-____",
              i = 0,
              def = matrix.replace(/\D/g, ""),
              val = this.value.replace(/\D/g, "");
        
            if (def.length >= val.length) {
              val = def;
            }
        
            this.value = matrix.replace(/./g, function (a) {
              return /[_\d]/.test(a) && i < val.length
                ? val.charAt(i++)
                : i >= val.length
                ? ""
                : a;
            });
        
            if (event.type === "blur") {
              if (this.value.length == 2) {
                this.value = "";
              }
            } else {
              setCursorPosition(this.value.length, this);
            }
          }
        
          let inputs = document.querySelectorAll('[name="phone"]');
        
          inputs.forEach((input) => {
            input.addEventListener("click", function () {
              input.setSelectionRange(2, 2);
            });
            input.addEventListener("input", createMask);
            input.addEventListener("focus", createMask);
            input.addEventListener("blur", createMask);
          });
      }

    async postData(url, data) {
        let res = await fetch(url, {
          method: "POST",
          body: data,
        });
        return await res.text();
      };

    init() {
        this.initMask();
        this.checkMailInputs();
        this.forms.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();
    
                let statusMessage = document.createElement("div");
                statusMessage.style.cssText = `
                    margin-top: 20px;
                    width: 300px;
                    height: 300px;
                `
                item.parentNode.appendChild(statusMessage);
    
                item.classList.add("animated", "fadeOutUp");
                setTimeout(() => {
                    item.style.display = "none";
                }, 400);
    
                let statusImg = document.createElement("img");
                statusImg.setAttribute("src", this.message.spinner);
                statusImg.classList.add("animated", "fadeInUp");
                statusImg.style.cssText = `
                    margin-top: 20px;
                    width: 300px;
                    height: 300px;
                `
                statusMessage.appendChild(statusImg);
    
                let textMessage = document.createElement("div");
                textMessage.textContent = this.message.loading;
                textMessage.style.cssText = `
                    display: block;
                    color: gray;
                    margin: 0 auto;
                    margin-top: 20px;
                    font-size: 30px;
                `
                statusMessage.appendChild(textMessage);
    
                const formData = new FormData(item);
    
                this.postData(this.path, formData)
                        .then(res => {
                            console.log(res);
                            statusImg.setAttribute("src", this.message.ok);
                            textMessage.textContent = this.message.success;
                        })
                        .catch(() => {
                            statusImg.style.display = 'none';
                            textMessage.textContent = this.message.failure;
                        })
                        .finally(() => {
                            this.clearAllInputs();
                            setTimeout(() => {
                                statusMessage.remove();
                                item.style.display = "block";
                                item.classList.remove("fadeOutUp");
                                item.classList.add("fadeInUp");
                            }, 5000);
                            });
            })
        })
    }
}