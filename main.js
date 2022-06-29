// **************** HOVER STUFF **************
function watchForHover() {
   // lastTouchTime is used for ignoring emulated mousemove events
   let lastTouchTime = 0

   function enableHover() {
      if (new Date() - lastTouchTime < 500)
         return
      document.body.classList.add('hasHover')
   }

   function disableHover() {
      const overlay = document.querySelectorAll('.overlay')
      overlay.forEach(x => {
         overlay.style.opacity = '1'
      })
   }

   function updateLastTouchTime() {
      lastTouchTime = new Date()
   }

   document.addEventListener('touchstart', updateLastTouchTime, true)
   document.addEventListener('touchstart', disableHover, true)
   document.addEventListener('mousemove', enableHover, true)

   enableHover()
}

watchForHover()



// *********** FORM SUBMIT **************
var form = document.getElementById("my-form");

async function handleSubmit(event) {
   event.preventDefault();
   var status = document.getElementById("status");
   var data = new FormData(event.target);
   fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
         'Accept': 'application/json'
      }
   }).then(response => {
      if (response.ok) {
         status.innerHTML = "Thanks for your submission!";
         form.reset()
      } else {
         response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
               status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
               status.innerHTML = "Oops! There was a problem submitting your form"
            }
         })
      }
   }).catch(error => {
      status.innerHTML = "Oops! There was a problem submitting your form"
   });
}
form.addEventListener("submit", handleSubmit)


// // *********** MOBILE MENU TOGGLE CLOSE ****************

let mobileLinks = document.getElementsByClassName('mobile-nav')

function hideMenu() {
   const menuToggler = document.getElementById('menu-toggler')
   menuToggler.checked = false
}

for (let i = 0; i < mobileLinks.length; i++) {
   mobileLinks[i].addEventListener('click', hideMenu)
}





