class ValidateJS {

  EnableStyling = false;
  errorColor = "#f5908e";
  successColor = "#29e479";
  featuresList = {
    min: "Minimum value length",
    max: "Maximum value length",
    email: "Only email format",
    num: "Only number format",
    url: "Only url format",
    required: "No empty value",
    confirmpass: "Match 2 password"
  }
  
  
  constructor(obj = {EnableStyling:this.EnableStyling,errorColor:this.errorColor,successColor:this.successColor}) {
    this.EnableStyling = obj.EnableStyling;
    this.errorColor = obj.errorColor;
    this.successColor = obj.successColor;
  }
  
  
  validateEl(obj, el, type) {
    el = document.querySelector(el);
    // Minimum value length
    const checkMin = () => {
      if (obj.required && el.value.length < 1) return false;
      if (obj.max && el.value.length > obj.max.value) return false;
      if (obj.num && isNaN(el.value)) return false;
      if (el.value.length < obj.min.value) {
        errorStyling(obj.min.errormsg);        
        return false;
      } else {
        successStyling(obj.min.successmsg);
        return true;
      }
    }
    // Maximum value length
    const checkMax = () => {
      if (obj.min && el.value.length < obj.min.value) return false;
      if (el.value.length > obj.max.value) {
        errorStyling(obj.max.errormsg);        
        return false;
      } else {
        successStyling(obj.max.successmsg);
        return true;
      }
    }
    // Check if email is valid format
    const checkEmail = () => {
      if (obj.required && el.value.length < 1) return false;
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (regex.test(String(el.value).toLowerCase())) {
        successStyling(obj.email.successmsg);        
        return true;
      } else {
        errorStyling(obj.email.errormsg);
        return false;
      }
    }
    // Check if num is valid number format
    const checkNum = () => {
      if (obj.required && el.value.length < 1) return false;
      if (isNaN(el.value)) {
        errorStyling(obj.num.errormsg);        
        return false;
      } else {
        successStyling(obj.num.successmsg);
        return true;
      }
    }
    // Check if url is valid url format
    const checkUrl = () => {
      if (obj.required && el.value.length < 1) return false;
      try {
        new URL(el.value);
        successStyling(obj.url.successmsg);
        return true; 
      } catch (_) {
        errorStyling(obj.url.errormsg);
        return false;
      }
    }
    // Required
    const checkValue = () => {
      if (el.value.length < 1) {
        errorStyling(obj.required.errormsg);        
        return false;
      } else {
        successStyling(obj.required.successmsg);
        return true;
      }
    }
    // Confirm password if match
    const confirmPass = () => {
      const el2 = document.querySelector(obj.confirmpass.el);
      const pass1 = el.value,
            pass2 = el2.value;
      if (obj.confirmpass.required && el2.value.length < 1) {
        el2.style.borderColor = this.errorColor;
        appendMessage(el2.id, this.errorColor, obj.confirmpass.required.errormsg);
        return false;
      }
      if (pass1 == pass2) {
        if (this.EnableStyling) {
          el.style.borderColor = this.successColor;
          el2.style.borderColor = this.successColor;
          appendMessage(el2.id, this.successColor, obj.confirmpass.successmsg);
        }
        return true;
      } else {
        if (this.EnableStyling) {
          el.style.borderColor = this.errorColor;
          el2.style.borderColor = this.errorColor;
          appendMessage(el2.id, this.errorColor, obj.confirmpass.errormsg);
        }
        return false;
      }     
    }
    
    
    function appendMessage(id, color, msg) {
      if (document.querySelector("#for"+id)) {
        const div = document.querySelector("#for"+id);
        div.textContent = msg;
        div.style.color = color;
      } else {
        const div = document.createElement("div");
        div.style = "margin:auto;color:"+color;
        div.textContent = msg;
        div.id = "for"+id
        document.querySelector("#"+id).parentNode.appendChild(div);
      }
    }
    const errorStyling = (errorMsg) => {
      if (this.EnableStyling) {
        el.style.borderColor = this.errorColor;
        appendMessage(el.id, this.errorColor, errorMsg);
      }
    }
    const successStyling = (successMsg) => {
      if (this.EnableStyling) {
        el.style.borderColor = this.successColor;
        appendMessage(el.id, this.successColor, successMsg);
      }
    }
    
    
    switch (type) {
      case "min": return checkMin(); break;
      case "max": return checkMax(); break;
      case "email": return checkEmail(); break;
      case "num": return checkNum(); break;
      case "url": return checkUrl(); break;
      case "required": return checkValue(); break;
      case "confirmpass": return confirmPass(); break;
    }
                     
  }
  
  validate(...objs) {
    
    let validCounter = 0;
    let invalidCounter = 0;
    
    objs.forEach((v,i) => {
      Object.keys(v).forEach(type => {
        if (this.featuresList[type]) this.validateEl(v, v.el, type) ? validCounter++ : invalidCounter++;
      });
    });
    
    return invalidCounter == 0 ? true : false;
  }


}
