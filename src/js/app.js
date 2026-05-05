document.addEventListener('DOMContentLoaded', function() {

    navegacionFija()
    crearGaleria()
    resaltarEnlace()
    scrollNav()
})

function navegacionFija() {
    const header = document.querySelector('.header')
    const sobreFestival = document.querySelector('.sobre-festival')

    window.addEventListener('scroll', function() {
        if(sobreFestival.getBoundingClientRect().bottom < 1 ) {
            header.classList.add('fixed')
        } else {
            header.classList.remove('fixed')
        }
    })
}

function crearGaleria() {

    const Cantidad_Imagenes = 16;
    const galeria = document.querySelector('.galeria-imagenes')

    for(let i = 1; i <=Cantidad_Imagenes; i++) {
        const imagen = document.createElement('PICTURE')
        imagen.innerHTML = `
            <source srcset="build/img/gallery/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
        `;

        //Event handler 
        imagen.onclick = function() {
            mostrarImagen(i)
        }

        galeria.appendChild(imagen) 
    }
}

function mostrarImagen(i) {
    const imagen = document.createElement('PICTURE')
    imagen.innerHTML = `
        <source srcset="build/img/gallery/full/${i}.avif" type="image/avif">
        <source srcset="build/img/gallery/full/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/gallery/full/${i}.jpg" alt="imagen galeria">
    `;

    
    //General modal

    const modal = document.createElement('DIV')
    modal.classList.add('modal')
    modal.onclick = cerrarModal

    //Boton cerrar modal
    const cerrarModalBtn = document.createElement('BUTTON')
    cerrarModalBtn.textContent = 'X'
    cerrarModalBtn.classList.add('btn-cerrar')
    cerrarModalBtn.onclick = cerrarModal

    modal.appendChild(imagen)
    modal.appendChild(cerrarModalBtn)

    //Agregar al HTML
    const body = document.querySelector('body')
    body.classList.add('overflow-hidden')
    body.appendChild(modal)

    console.log(modal)
}

function cerrarModal() {
    const modal = document.querySelector('.modal')
    modal.classList.add('fade-out')

    setTimeout(() => {
        modal?.remove()
        
        const body = document.querySelector('body')
        body.classList.remove('overflow-hidden')
    }, 500);
    
}

function resaltarEnlace() {
    document.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section') 
        const navLinks = document.querySelectorAll('.navegacion-principal a')

        let actual = ''

        sections.forEach( function(section) {
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight

            if(window.scrollY >= (sectionTop - sectionHeight / 3)) {
                actual = section.id
            }
        })

        navLinks.forEach(link => {
            if(link.getAttribute('href') === '#' + actual) {
                link.classList.add('active')
            } else {
                link.classList.remove('active')
            }
        }) 
    })
}

function scrollNav() {
    const navLinks = document.querySelectorAll('.navegacion-principal a')

    navLinks.forEach( link => {
        link.addEventListener('click', e => {
            e.preventDefault()
            const sectionScroll = e.target.getAttribute('href')
            const section = document.querySelector(sectionScroll)

            section.scrollIntoView({behavior: 'smooth'})  //Esta funcion sirve para hacer un scroll mas amigable a la vista solo se le puede asiganr un valor "behavior" y dentro de este hay dos: "auto" que es como no usarlo 
            //hace scroll automatico sin animacion// "smooth" es el que debemos ocupar y dara un estilo al momento de movernos entre secciones
        })
    })
}