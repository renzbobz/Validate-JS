# Validate JS

Validate login form example:
```javascript
const vjs = new ValidateJS();
// If u want styling like border color and message then set this to true
vjs.EnableStyling = true;
// Change error color 
vjs.errorColor = "red";
// Change success color
vjs.successColor = "lime";

dovument.querySelector("#form").onsubmit = () {
  return validate();
}

function validate() {
  // Validate inputs
  return vjs.validate(
  {
    el: "#username",
    required: {
      errormsg: "Username is required",
      successmsg: "Good"
    },
    min: {
      value: 3,
      errormsg: "Username must be 3 characters and above"
    },
    max: {
      value: 20,
      errormsg: "Username maximum characters is 20"
    }
  },
  {
    el: "#password",
    required: {
      errormsg: "Password is required",
      successmsg: "Good"
    },
    min: {
      value: 8,
      errormsg: "Password must be 8 characters and above"
    }
  }
  ); // This will return a boolean
}
```

Validate confirm password example:
```javascript
vjs.validate(
  {
    el: "#p1",
    required: {
      errormsg: "Password is required"
    },
    min: {
      value: 8,
      errormsg: "Password must be 8 and above"
    },
    confirmpass: {
      el: "#p2",
      errormsg: "Password do not match",
      successmsg: "Good!!!",
      required: {
        errormsg: "Confirm password is required"
      }
    }
  }
);
```
To view features list:
```javascript
console.log(vjs.featuresList);
```

Take note:

if EnableStyling is set to true the input must have a div parent.


---
> Coded on mobile phone

      
    
