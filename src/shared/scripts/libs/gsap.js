import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function gsapInit() {
  gsap.registerPlugin(ScrollTrigger)

  const helloGsap = document.querySelector('[data-hello-gsap]')

  const tl = gsap.timeline()

  tl.from(helloGsap, { scale: 0, opacity: 0, duration: 3 }).to(helloGsap, {
    rotation: 5,
    duration: 3,
    yoyo: true,
    repeat: -1,
    ease: 'power3.out'
  })

  const mainOrb = document.getElementById('main-orb')
  const smallOrbs = document.querySelectorAll('[data-orb]')

  // Текущий активный класс шара
  let currentOrbClass = 'main-orb'

  // Обработчик клика на маленькие шары
  smallOrbs.forEach(orbContainer => {
    orbContainer.addEventListener('click', () => {
      const targetOrbClass = orbContainer.getAttribute('data-orb')

      // Если кликнули на уже активный шар - ничего не делаем
      if (targetOrbClass === currentOrbClass) return

      // Анимация исчезновения текущего шара
      gsap.to(mainOrb, {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        onComplete: () => {
          // Меняем классы шара
          mainOrb.classList.remove(currentOrbClass)
          mainOrb.classList.add(targetOrbClass)

          // Обновляем текущий класс
          currentOrbClass = targetOrbClass

          // Анимация появления нового шара
          gsap.to(mainOrb, {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'power4.out'
          })
        }
      })
    })
  })
}
