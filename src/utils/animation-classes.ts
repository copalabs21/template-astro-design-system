import { inView, animate, stagger } from "motion";

/**
 * @class .motion-number
 * @example <span class='motion-number'>5</span>
 * Animates a number counting from 0 to its final value on scroll into view.
 */
inView(".motion-number", (element) => {
    const el = element as HTMLElement;
    const endNumber = Number(el.innerHTML.replaceAll(",", ""));

    animate(0, endNumber, {
        delay: 0.3,
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest: number) => {
            el.innerHTML = Math.round(latest).toLocaleString("en-US");
        },
    });
});

/**
 * @class .motion-spin
 * @example <span class='motion-spin'>$</span>
 */
inView(".motion-spin", (element) => {
    animate(element,
        {
            display: "inline-block",
            rotateY: 360 * 8
        },
        {
            delay: 0.3,
            duration: 2,
            ease: "easeOut",
        }
    )
})



/*****************
 * @class .motion-cards
 * @example <div class='motion-cards'> <div>Card 1</div> <div>Card 2</div> <div>Card 3</div> </div>
*/

/**
 * Inside a .motion-cards container, it selects the cards to animate. If there is any card tagged with ".motion-card" class (card, singular), it selects only these cards. Otherwise, it selects all child divs.
 * @param container - the div tagged with ".motion-cards" (card**s**, plural)
 * @returns a NodeList - the selected cards inside the container
 */
const selectCards = (container: Element) => container.querySelectorAll('.motion-card').length
    ? container.querySelectorAll('.motion-card')
    : container.querySelectorAll(':scope > div');

document.querySelectorAll('.motion-cards').forEach(container => {
    const cards = selectCards(container)
    cards.forEach(card => (card as HTMLElement).style.opacity = '0')
});

inView(".motion-cards", (element) => {
    const cards = selectCards(element)
    const isMobile = window.matchMedia('(max-width: 640px)').matches

    if (isMobile) {
        // Animate each card individually as it comes into view
        cards.forEach(card => {
            inView(card, (cardElement) => {
                animate(cardElement, { opacity: [0, 1], x: [-60, 0] }, {
                    duration: 1,
                    ease: "easeOut"
                });
            });
        });
    } else {
        // Desktop: group animation with stagger
        animate(cards, 
            { 
                opacity: [0,1],
                y: [60, 0]
            }, 
            {
                delay: stagger(0.2),
                duration: 0.8,
                ease: "easeOut"
            }
        );
    }
}, 
{
    // margin: "0px 0px -30% 0px",
});



/**
 * @class .motion-slide-from-left
 * @example <div class='motion-slide-from-left'></div>
 */
document.querySelectorAll('.motion-slide-from-left').forEach(card => (card as HTMLElement).style.opacity = '0')
inView(".motion-slide-from-left", (el) => {
    animate(el, { opacity: [0, 1], x: [-160, 0] }, {
        duration: 0.8,
        ease: "easeOut"
    });
});

/**
 * @class .motion-slide-from-right
 * @example <div class='motion-slide-from-right'></div>
 */
document.querySelectorAll('.motion-slide-from-right').forEach(card => (card as HTMLElement).style.opacity = '0')
inView(".motion-slide-from-right", (el) => {
    animate(el, { opacity: [0, 1], x: [160, 0] }, {
        duration: 0.8,
        ease: "easeOut"
    });
});

/**
 * @class .motion-slide-up
 * @example <div class='motion-slide-up'></div>
 */
document.querySelectorAll('.motion-slide-up').forEach(card => (card as HTMLElement).style.opacity = '0')
inView(".motion-slide-up", (target) => {
    animate(target, { opacity: [0, 1], y: [200, 0] }, {
        duration: 1,
        ease: "easeOut"
    });
    // return () => animate(target, { opacity: [1, 0], y: [0, 200] }, {
    //     duration: 1,
    //     ease: "easeOut"
    // }); 
});


/**
 * @class .motion-grow
 * @example <div class='motion-grow'></div>
 */
inView(".motion-grow", (el) => {
    animate(el, { scaleX: [0, 1]}, {
        duration: 0.8,
        ease: "easeOut"
    });
});

const hint = document.querySelector("#scroll-hint")
if(hint){
  document.querySelector("#scroll-container")?.addEventListener("scroll",()=>{
    animate(hint,{opacity:0},{duration:0.8})
  })
}


/*
function animateScrollBounce(element) {
  if (!element) return;
  // Only on mobile
  if (window.innerWidth > 768) return;

  const sequence = [
    { to: 40, duration: 150 },
    { to: 0, duration: 500 },
    { to: 40, duration: 200 },
    { to: 0, duration: 500 },
    { to: 40, duration: 150 },
    { to: 0, duration: 500 },
    { to: 40, duration: 200 },
    { to: 0, duration: 500 },
  ];

  let i = 0;
  function animateStep() {
    if (i >= sequence.length) return;
    const { to, duration } = sequence[i++];
    const from = element.scrollLeft;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      element.scrollLeft = from + (to - from) * progress;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setTimeout(animateStep, 50); // Small pause between bounces
      }
    }
    requestAnimationFrame(step);
  }
  animateStep();
}

inView("#scroll-container", ({target})=> {
    animateScrollBounce(target);
})
*/