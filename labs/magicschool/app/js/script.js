gsap.registerPlugin(SplitText, TextPlugin);

var d = document,
  inputType = 'name';

const wait = (delay = 0) =>
  new Promise(resolve => setTimeout(resolve, delay));

const setVisible = (elementOrSelector, visible) => 
  (typeof elementOrSelector === 'string'
    ? document.querySelector(elementOrSelector)
    : elementOrSelector
  ).style.display = visible ? 'block' : 'none';

  setVisible('.loading', false);

  document.addEventListener('DOMContentLoaded', () =>
    wait(1000).then(() => {
      setVisible('.loading', true);
      registrationMODai.play();
      tl.play();
}));


// document.onreadystatechange = function() {
//   if (document.readyState === 'complete') 
//   registrationMODai.play();
// };

// document.fonts.onloadingdone = () => {
//   registrationMODai.play();
// };

//* Create an account *//

var typing_hello1 = gsap.timeline({paused:true}),
  modHello1 = new SplitText(".mod-ai_hello1", { type: "words,chars" });
  typing_hello1.from(modHello1.chars, { duration: 0.01, opacity: 0, ease: "power1.out", stagger: 0.04 });

var typing_hello2 = gsap.timeline({paused:true}),
  modHello2 = new SplitText(".mod-ai_hello2", { type: "words,chars" });
  typing_hello2.from(modHello2.chars, { duration: 0.01, opacity: 0, ease: "power1.out", stagger: 0.04 });

var typing_hello3 = gsap.timeline({paused:true}),
  modHello3 = new SplitText(".mod-ai_hello3", { type: "words,chars" });
  typing_hello3.from(modHello3.chars, { duration: 0.01, opacity: 0, ease: "power1.out", stagger: 0.04 });

var typing_reqName = gsap.timeline({paused:true}),
  modReqName = new SplitText(".mod-ai_request-name", { type: "words,chars" });
  typing_reqName.from(modReqName.chars, { duration: 0.01, opacity: 0, ease: "power1.out", stagger: 0.04 });

var typing_reqUser = gsap.timeline({paused:true}),
  modReqUsername = new SplitText(".mod-ai_request-username", { type: "words,chars" });
  typing_reqUser.from(modReqUsername.chars, { duration: 0.01, opacity: 0, ease: "power1.out", stagger: 0.04 });

var typing_reqPass = gsap.timeline({paused:true}),
  modReqPass = new SplitText(".mod-ai_request-password", { type: "words,chars" });
  typing_reqPass.from(modReqPass.chars, { duration: 0.01, opacity: 0, ease: "power1.out", stagger: 0.04 });

var typing_complete = gsap.timeline({paused:true}),
  modComplete = new SplitText(".mod-ai_complete", { type: "words,chars" });
  typing_complete.from(modComplete.chars, { duration: 0.01, opacity: 0, ease: "power1.out", stagger: 0.04 });


var registrationMODai = gsap.timeline({paused:true});
registrationMODai.set(".registration", { display:'flex' },.7);
registrationMODai.from('.modai-avatar', { duration:1.2, y:-300, ease:'elastic.out(1,0.64)', onStart:function() {
  modaiType.play();
}}, .7);

var modaiType = new gsap.timeline({paused:true});
modaiType.add('start');
modaiType.to('.eyes', { scaleY:0, duration:.1, ease:'expo.easeOut', transformOrigin:'center center' }, 'start+=.6');
modaiType.to('.eyes', { scaleY:1, duration:.1, ease:'expo.easeOut' }, 'start+=.7');
modaiType.add(typing_hello1.play(), 'start+=1');
modaiType.add('text-2');
modaiType.add(typing_hello2.play(), 'text-2+=.4');
modaiType.add('text-3')
modaiType.add(typing_hello3.play(), 'text-3+=.4');
modaiType.add('text-4');
modaiType.add(typing_reqName.play(), 'text-4+=.4');
modaiType.add('text-input');
modaiType.from('.modai-input', { duration:.8, y:300, ease:'back.out' }, 'text-input+=0');
modaiType.addPause();
modaiType.addLabel('text-user');
modaiType.add(typing_reqUser.play(), 'textuser-4+=.4');
modaiType.addPause();
modaiType.addLabel('text-pass');
modaiType.add(typing_reqPass.play(), 'text-pass+=0.4');
modaiType.to('.eyes', { scaleY:0, duration:.1, ease:'expo.easeOut', transformOrigin:'center center' }, 'text-pass+=0.6');
modaiType.from('.eyes-closed', { scaleY:0, duration:.1, ease:'expo.easeOut', transformOrigin:'center center' }, 'text-pass+=0.7');
modaiType.addPause();
modaiType.addLabel('all-done');
modaiType.to('.modai-input', { duration:1.2, y:200, autoAlpha:0, ease:'expo.out' }, 'all-done+=0');
modaiType.to('.eyes-closed', { scaleY:0, duration:.1, ease:'expo.easeOut' }, 'all-done+=0');
modaiType.to('.eyes', { scaleY:1, duration:.1, ease:'expo.easeOut' }, 'all-done+=.1');
modaiType.add(typing_complete.play(), 'all-done+=0.4');
modaiType.add('init-welcome');
modaiType.to('.modai', { autoAlpha:0, duration:.4, ease:'expo.out', onComplete:function() {
  gsap.set(".registration", { display:'none' });
  gsap.set(".welcome-message-wrapper", { display:'flex' });
  initWelcome.play();
} }, 'init-welcome+=1');

var initWelcome = new gsap.timeline({paused:true, onComplete:scrollWiggle});
initWelcome.fromTo('.welcome-message-wrapper', { autoAlpha: 0 }, { duration: .8, autoAlpha: 1, ease:'power1.out' }, 0);
initWelcome.from('.welcome-message', { autoAlpha:0, y:200, duration: 1, ease:'back.out' }, .6);
initWelcome.from('.scroll-more', { autoAlpha:0, y:200, duration: 1, ease:'back.out' }, 4);
initWelcome.set('.ux-audit', { display:'flex' });

var wiggle = new gsap.timeline({paused:true, repeat:-1, delay:3, repeatDelay:6});
wiggle.to('.scroll-more', { duration:1.2, y:-32, ease:'back.out' });
wiggle.to('.scroll-more', { duration:2.4, y:0, ease:'back.out' }, .7);

function scrollWiggle() {
  wiggle.play();
}


var modaiText = document.getElementById("modaiText");
modaiText.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  
        validate(e);
        modaiText.value='';
    }
});

function validate(e) {
    usernameTxt = e.target.value;
    if ( inputType == 'name' ) {
      $(".mod-ai_name").html(usernameTxt);
      modaiType.play("text-user");
      inputType = 'user';
    } else if ( inputType == 'user' ) {
      $(".mod-ai_username").html(usernameTxt);
      modaiType.play("text-pass");
      inputType = 'pass';
      modaiText.type='password';
    } else if ( inputType == 'pass' ) {
      $(".mod-ai_password").html('********');
      modaiType.play("all-done"); 
    }
}