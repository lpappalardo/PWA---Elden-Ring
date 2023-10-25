window.addEventListener("DOMContentLoaded", function(){

    if('serviceWorker' in navigator){
        navigator.serviceWorker
        .register('sw.js')
        .then(respuesta => console.log('Sw registrado correctamente'))
        .catch(error => console.log('sw no se pudo registrar'))
    }


    let eventInstall;
    let btnInstall = document.querySelector(".btnInstall");

    let InstallApp = () => {
        if(eventInstall){
            eventInstall.prompt();
            eventInstall.userChoice
            .then(res => {
                if(res.outcome === "accepted"){
                    console.log("La persona usuaria acepto instalar mi app");
                    btnInstall.style.display = "none";
                }else{
                     console.log("La persona usuaria rechazo instalar mi app");
                }
            })
        }
    }
    
    window.addEventListener("beforeinstallprompt", (e) => {
        console.log("before")
        e.preventDefault();
        eventInstall = e;
        showInstallButton();
    })

    let showInstallButton = () => {
        if(btnInstall != undefined){
            btnInstall.style.display = "inline-block";
            btnInstall.addEventListener("click", InstallApp)
        }
    };

    // ----------- Litsa, Objetos y Componentes Base -----------

    class ElementoAventura {
        constructor(id = '', imagen = '', nombre='', descripcionOFrase = ''){
            this.id = id;
            this.imagen = imagen;
            this.nombre = nombre;
            this.descripcionOFrase = descripcionOFrase;
        }
    }

    let zonasDisponibles = [];
    let criaturaDisponibles = [];
    let objetosDisponibles = [];
    let personajesDisponibles = [];
    let jefesDisponibles = [];

    let zonas = document.getElementById("componentes-zona");
    let criaturas = document.getElementById("componentes-criatura");
    let objetos = document.getElementById("componentes-objeto");
    let personajes = document.getElementById("componentes-personaje");
    let jefes = document.getElementById("componentes-jefe");

    // ----------- Funciones Mostar Elementos -----------

    const mostrarZonas = () => {

        let elementZonas = "";

        zonasDisponibles.forEach((zona) => {
    
            elementZonas += `
            <div class="card">
                <img src="${zona.imagen}" class="card-img-top" alt="${zona.nombre}">
                <div class="card-body">
                     <h5 class="card-title">${zona.nombre}</h5>
                     <p class="card-text">Descripción: ${zona.descripcionOFrase}</p>
                     <div class="d-flex justify-content-center align-items-baseline">
                         <button id="${zona.id}" class="boton agregarZona">Seleccionar</button>
                         <button id="${zona.id}" class="boton quitarZona escondido">Eliminar</button>
                     </div>
                </div>
            </div>`
    
        })
    
        zonas.innerHTML = elementZonas;
        actualizarAgregarZona();
        actualizarQuitarZona();
    }

    const mostrarCriaturas = () => {

        let elementCriaturas = "";

        criaturaDisponibles.forEach((criatura) => {
    
            elementCriaturas += `
            <div class="card">
                <img src="${criatura.imagen}" class="card-img-top" alt="${criatura.nombre}">
                <div class="card-body">
                     <h5 class="card-title">${criatura.nombre}</h5>
                     <p class="card-text">Descripción: ${criatura.descripcionOFrase}</p>
                     <div class="d-flex justify-content-center align-items-baseline">
                         <button id="${criatura.id}" class="boton agregarCriatura">Seleccionar</button>
                         <button id="${criatura.id}" class="boton quitarCriatura escondido">Eliminar</button>
                     </div>
                </div>
            </div>`
    
        })
    
        criaturas.innerHTML = elementCriaturas;
        actualizarAgregarCriatura();
        actualizarQuitarCriatura();
    }

    const mostrarObjetos = () => {

        let elementObjetos = "";

        objetosDisponibles.forEach((objeto) => {
    
            elementObjetos += `
            <div class="card">
                <img src="${objeto.imagen}" class="card-img-top" alt="${objeto.nombre}">
                <div class="card-body">
                     <h5 class="card-title">${objeto.nombre}</h5>
                     <p class="card-text">Descripción: ${objeto.descripcionOFrase}</p>
                     <div class="d-flex justify-content-center align-items-baseline">
                         <button id="${objeto.id}" class="boton agregarObjeto">Seleccionar</button>
                         <button id="${objeto.id}" class="boton quitarObjeto escondido">Eliminar</button>
                     </div>
                </div>
            </div>`
    
        })
    
        objetos.innerHTML = elementObjetos;
        actualizarAgregarObjeto();
        actualizarQuitarObjeto();
    }

    const mostrarPersonajes = () => {

        let elementPersonajes = "";

        personajesDisponibles.forEach((personaje) => {
    
            elementPersonajes += `
            <div class="card">
                <img src="${personaje.imagen}" class="card-img-top" alt="${personaje.nombre}">
                <div class="card-body">
                     <h5 class="card-title">${personaje.nombre}</h5>
                     <p class="card-text">Frase: ${personaje.descripcionOFrase}</p>
                     <div class="d-flex justify-content-center align-items-baseline">
                         <button id="${personaje.id}" class="boton agregarPersonaje">Seleccionar</button>
                         <button id="${personaje.id}" class="boton quitarPersonaje escondido">Eliminar</button>
                     </div>
                </div>
            </div>`
    
        })
    
        personajes.innerHTML = elementPersonajes;
        actualizarAgregarPersonaje();
        actualizarQuitarPersonaje();
    }

    const mostrarJefes = () => {

        let elementjefes = "";

        jefesDisponibles.forEach((jefe) => {
    
            elementjefes += `
            <div class="card">
                <img src="${jefe.imagen}" class="card-img-top" alt="${jefe.nombre}">
                <div class="card-body">
                     <h5 class="card-title">${jefe.nombre}</h5>
                     <p class="card-text">Descripción: ${jefe.descripcionOFrase}</p>
                     <div class="d-flex justify-content-center align-items-baseline">
                         <button id="${jefe.id}" class="boton agregarJefe">Seleccionar</button>
                         <button id="${jefe.id}" class="boton quitarJefe escondido">Eliminar</button>
                     </div>
                </div>
            </div>`
    
        })
    
        jefes.innerHTML = elementjefes;
        actualizarAgregarJefe();
        actualizarQuitarJefe();
    }

    // ----------- Fetch Elementos -----------

    fetch("https://eldenring.fanapis.com/api/locations?limit=9")
    .then((respuesta) => respuesta.json())
    .then((data) => {
        for (const location of data.data) {
           let unaZona = new ElementoAventura(location.id, location.image, location.name, location.description,);
            zonasDisponibles.push(unaZona)
        }
        mostrarZonas();
    })

    fetch("https://eldenring.fanapis.com/api/creatures?limit=9")
    .then((respuesta) => respuesta.json())
    .then((data) => {
        for (const location of data.data) {
           let unaCriatura= new ElementoAventura(location.id, location.image, location.name, location.description,);
            criaturaDisponibles.push(unaCriatura)
        }
        mostrarCriaturas();
    })

    fetch("https://eldenring.fanapis.com/api/items?limit=9")
    .then((respuesta) => respuesta.json())
    .then((data) => {
        for (const location of data.data) {
           let unObjeto= new ElementoAventura(location.id, location.image, location.name, location.description,);
            objetosDisponibles.push(unObjeto)
        }
        mostrarObjetos();
    })

    fetch("https://eldenring.fanapis.com/api/npcs?limit=9")
    .then((respuesta) => respuesta.json())
    .then((data) => {
        for (const location of data.data) {
           let unPersonaje= new ElementoAventura(location.id, location.image, location.name, location.quote,);
            personajesDisponibles.push(unPersonaje)
        }
        mostrarPersonajes();
    })

    fetch("https://eldenring.fanapis.com/api/bosses?limit=9")
    .then((respuesta) => respuesta.json())
    .then((data) => {
        for (const location of data.data) {
           let unJefe= new ElementoAventura(location.id, location.image, location.name, location.description,);
            jefesDisponibles.push(unJefe)
        }
        mostrarJefes();
    })

      // ----------- Funciones Agregar Elemento -----------

      function agregarEstilos(e) {

        let boton = e.currentTarget;
        let cardSeleccionada = boton.parentNode.parentNode.parentNode;
        cardSeleccionada.setAttribute('class', 'card borde-dorado');
        boton.classList.add('escondido');
 
        let botonElimiar = boton.nextElementSibling;
        botonElimiar.classList.remove("escondido");
    }

    function agregarASubLista(e, subLista, listaGeneral){
        let idBoton = e.currentTarget.id;
        console.log(idBoton);
        let elementoBoton = listaGeneral.filter(elemento => elemento.id == idBoton)[0];
        console.log(elementoBoton);
        subLista.push(elementoBoton);
        console.log(subLista);
    }

    // ----------- Funciones Quitar Elemento -----------

    function indiceSubLista(idSeleccionado, listaSeleccionada) {
        for (let i=0; i < listaSeleccionada.length; i++) {
            if (listaSeleccionada[i].id == idSeleccionado) {
                return i;
            }
        }
    }

    function normalizarCard(boton) {
        let cardSeleccionada = boton.parentNode.parentNode.parentNode;
        cardSeleccionada.setAttribute('class', 'card');
    }

    function quitarEstilos(e) {

        let boton = e.currentTarget;
        normalizarCard(boton);
        boton.classList.add('escondido');

        let botonSeleccion = boton.previousElementSibling;
        botonSeleccion.classList.remove("escondido");
    }

    function quitarDeSubLista(e, subLista) {

        const idBoton = e.currentTarget.id;

        let indice = indiceSubLista(idBoton, subLista);

        subLista.splice(indice, 1);

        console.log(subLista);
    }

    // ----------- Agregar y Quitar Zona -----------

    let agregarZonas = [];
    let quitarZonas = [];
    let zonasSeleccionadas = [];

    function actualizarAgregarZona() {

        agregarZonas = document.querySelectorAll(".agregarZona");
    
        agregarZonas.forEach(boton => {
            boton.addEventListener("click", agregarUnaZona);
        });
    }
    
    function actualizarQuitarZona() {

        quitarZonas = document.querySelectorAll(".quitarZona");
    
        quitarZonas.forEach(boton => {
            boton.addEventListener("click", quitarUnaZona);
        });
    } 

    function agregarUnaZona(e) {

        agregarEstilos(e);

        agregarASubLista(e, zonasSeleccionadas, zonasDisponibles);
    }

    function quitarUnaZona(e) {
  
        quitarEstilos(e);

        quitarDeSubLista(e, zonasSeleccionadas);
    }

    // ----------- Agregar y Quitar Criatura -----------

    let agregarCriaturas = [];
    let quitarCriaturas = [];
    let criaturasSeleccionadas = [];

    function actualizarAgregarCriatura() {

        agregarCriaturas = document.querySelectorAll(".agregarCriatura");
    
        agregarCriaturas.forEach(boton => {
            boton.addEventListener("click", agregarUnaCriatura);
        });
    }

    function actualizarQuitarCriatura() {

        quitarCriaturas = document.querySelectorAll(".quitarCriatura");
    
        quitarCriaturas.forEach(boton => {
            boton.addEventListener("click", quitarUnaCriatura);
        });
    }

    function agregarUnaCriatura(e) {

        agregarEstilos(e);

        agregarASubLista(e, criaturasSeleccionadas, criaturaDisponibles);
    }

    function quitarUnaCriatura(e) {

        quitarEstilos(e);

        quitarDeSubLista(e, criaturasSeleccionadas);
    }


    // ----------- Agregar y Quitar Objeto -----------

    let agregarObjetos = [];
    let quitarObjetos = [];
    let objetosSeleccionados = [];

    function actualizarAgregarObjeto() {

        agregarObjetos = document.querySelectorAll(".agregarObjeto");
    
        agregarObjetos.forEach(boton => {
            boton.addEventListener("click", agregarUnObjeto);
        });
    }

    function actualizarQuitarObjeto() {

        quitarObjetos = document.querySelectorAll(".quitarObjeto");
    
        quitarObjetos.forEach(boton => {
            boton.addEventListener("click", quitarUnObjeto);
        });
    }

    function agregarUnObjeto(e) {

        agregarEstilos(e);

        agregarASubLista(e, objetosSeleccionados, objetosDisponibles);
    }

    function quitarUnObjeto(e) {

        quitarEstilos(e);

        quitarDeSubLista(e, objetosSeleccionados);
    }

    // ----------- Agregar y Quitar Personaje -----------

    let agregarPersonajes = [];
    let quitarPersonajes = [];
    let personajesSeleccionados = [];

    function actualizarAgregarPersonaje() {

        agregarPersonajes = document.querySelectorAll(".agregarPersonaje");
    
        agregarPersonajes.forEach(boton => {
            boton.addEventListener("click", agregarUnPersonaje);
        });
    }

    function actualizarQuitarPersonaje() {

        quitarPersonajes = document.querySelectorAll(".quitarPersonaje");
    
        quitarPersonajes.forEach(boton => {
            boton.addEventListener("click", quitarUnPersonaje);
        });
    }

    function agregarUnPersonaje(e) {

        agregarEstilos(e);

        agregarASubLista(e, personajesSeleccionados, personajesDisponibles);
    }

    function quitarUnPersonaje(e) {

        quitarEstilos(e);

        quitarDeSubLista(e, personajesSeleccionados);
    }

    // ----------- Agregar y Quitar Jefe -----------

    let agregarJefes= [];
    let quitarJefes = [];
    let jefesSeleccionados = [];

    function actualizarAgregarJefe() {

        agregarJefes = document.querySelectorAll(".agregarJefe");
    
        agregarJefes.forEach(boton => {
            boton.addEventListener("click", agregarUnJefe);
        });
    }

    function actualizarQuitarJefe() {

        quitarJefes = document.querySelectorAll(".quitarJefe");
    
        quitarJefes.forEach(boton => {
            boton.addEventListener("click", quitarUnJefe);
        });
    }

    function agregarUnJefe(e) {

        agregarEstilos(e);

        agregarASubLista(e, jefesSeleccionados, jefesDisponibles);
    }

    function quitarUnJefe(e) {

        quitarEstilos(e);

        quitarDeSubLista(e, jefesSeleccionados);
    }

    // ----------- Crear Aventura -----------

    let creacionAventura = document.getElementById('crearAventura');
    creacionAventura.addEventListener("click", cargarAventura)


    class Aventura {
        constructor(id = '', zonas = [], criaturas = [], objetos = [], personajes = [], jefes = []){
            this.id = id;
            this.zonas = zonas;
            this.criaturas = criaturas;
            this.objetos = objetos;
            this.personajes = personajes;
            this.jefes = jefes;
        }
    }

    let aventurasCargadas = []


    let msgErrorZona = document.getElementById('mensaje-error-zona');
    let msgErrorCriatura = document.getElementById('mensaje-error-criatura');
    let msgErrorObjeto = document.getElementById('mensaje-error-objeto');
    let msgErrorPersonaje= document.getElementById('mensaje-error-personaje');
    let msgErrorJefe = document.getElementById('mensaje-error-jefe');

    function cargarAventura() {

        msgErrorZona.innerHTML = ""; 
        msgErrorCriatura.innerHTML = ""; 
        msgErrorObjeto.innerHTML = ""; 
        msgErrorPersonaje.innerHTML = ""; 
        msgErrorJefe.innerHTML = ""; 

        if(zonasSeleccionadas.length < 1){
            console.log('Debe cargar al menos 1 zona');
            msgErrorZona.innerHTML = 'Debe cargar al menos 1 zona';
        } else if (criaturasSeleccionadas.length < 1) {
            console.log('Debe cargar al menos 1 criatura');
            msgErrorCriatura.innerHTML = 'Debe cargar al menos 1 criatura';
        } else if (objetosSeleccionados.length < 1) {
            console.log('Debe cargar al menos 1 objeto');
            msgErrorObjeto.innerHTML = 'Debe cargar al menos 1 objeto';
        } else if (personajesSeleccionados.length < 1) {
            console.log('Debe cargar al menos 1 personaje');
            msgErrorPersonaje.innerHTML = 'Debe cargar al menos 1 personaje';
        } else if (jefesSeleccionados.length < 1) {
            console.log('Debe cargar al menos 1 jefe');
            msgErrorJefe.innerHTML = 'Debe cargar al menos 1 jefe';
        } else {
            let indiceAventura = aventurasCargadas.length + 1;
            let unaAventura = new Aventura(indiceAventura, zonasSeleccionadas, criaturasSeleccionadas,objetosSeleccionados, personajesSeleccionados, jefesSeleccionados);

            aventurasCargadas.push(unaAventura)
            actualizarAventuras();
        }
    }

    aventuras = document.querySelectorAll(".aventuras-diseñadas")[0];

    function actualizarAventuras() {

        let elementAventuras = ""

        aventurasCargadas.forEach((aventura) => {

                let zonasDeAventura = "";
                let criaturasDeAventura = "";
                let objetosDeAventura = "";
                let personajesDeAventura = "";
                let jefesDeAventura = "";

                let listaZonas = aventura.zonas;
                let largo = aventura.zonas.length;
                console.log(largo);

                for (const zona of listaZonas) {
                    zonasDeAventura += `
                    <div class="card">
                        <img src="${zona.imagen}" class="card-img-top" alt="${zona.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${zona.nombre}</h5>
                            <p class="card-text">Descripción: ${zona.descripcionOFrase}</p>
                        </div>
                    </div>`
                }

                let listaCriaturas = aventura.criaturas;
                listaCriaturas.forEach((criatura) => {

                criaturasDeAventura += `
                <div class="card">
                    <img src="${criatura.imagen}" class="card-img-top" alt="${criatura.nombre}">
                    <div class="card-body">
                         <h5 class="card-title">${criatura.nombre}</h5>
                         <p class="card-text">Descripción: ${criatura.descripcionOFrase}</p>
                    </div>
                </div>`
            
                })

                let listaObjetos = aventura.objetos;
                listaObjetos.forEach((objeto) => {

                objetosDeAventura += `
                <div class="card">
                    <img src="${objeto.imagen}" class="card-img-top" alt="${objeto.nombre}">
                    <div class="card-body">
                         <h5 class="card-title">${objeto.nombre}</h5>
                         <p class="card-text">Descripción: ${objeto.descripcionOFrase}</p>
                    </div>
                </div>`
            
                })

                let listaPersonajes = aventura.personajes;
                listaPersonajes.forEach((personaje) => {

                personajesDeAventura += `
                <div class="card">
                    <img src="${personaje.imagen}" class="card-img-top" alt="${personaje.nombre}">
                    <div class="card-body">
                         <h5 class="card-title">${personaje.nombre}</h5>
                         <p class="card-text">Frase: ${personaje.descripcionOFrase}</p>
                    </div>
                </div>`
            
                })

                let listaJefes = aventura.jefes;
                listaJefes.forEach((jefe) => {

                jefesDeAventura += `
                <div class="card">
                    <img src="${jefe.imagen}" class="card-img-top" alt="${jefe.nombre}">
                    <div class="card-body">
                         <h5 class="card-title">${jefe.nombre}</h5>
                         <p class="card-text">Descripción: ${jefe.descripcionOFrase}</p>
                    </div>
                </div>`
            
                })

                elementAventuras += `
                        <div class="aventura">
                            <h3>
                                Aventura ${aventura.id}
                            </h3>
                            <div>
                                <h2>
                                    Zona/s Selecionada/s
                                </h2>
                                <div class="componentes-aventura-elementos">
                                    ${zonasDeAventura}
                                </div>
                            </div>
                            <div>
                                <h2>
                                    Criatura/s Selecionada/s
                                </h2>
                                <div class="componentes-aventura-elementos">
                                    ${criaturasDeAventura}
                                </div>
                            </div>
                            <div>
                                <h2>
                                    Objeto/s Selecionado/s
                                </h2>
                                <div class="componentes-aventura-elementos">
                                    ${objetosDeAventura}
                                </div>
                            </div>
                            <div>
                                <h2>
                                    Personajes/s Selecionado/s
                                </h2>
                                <div class="componentes-aventura-elementos">
                                    ${personajesDeAventura}
                                </div>
                            </div>
                            <div>
                                <h2>
                                    Jefe/s Selecionado/s
                                </h2>
                                <div class="componentes-aventura-elementos">
                                    ${jefesDeAventura}
                                </div>
                            </div>
                        </div>`
                });

        aventuras.innerHTML = elementAventuras;

        agregarZonas.forEach((boton) => {
            
            boton.setAttribute('class', 'boton agregarZona');
            normalizarCard(boton);
              
        });

        quitarZonas.forEach((boton) => {
            boton.setAttribute('class', 'boton quitarZona escondido');
        })

        agregarCriaturas.forEach((boton) => {

            boton.setAttribute('class', 'boton agregarCriatura');         
            normalizarCard(boton);
             
        });

        quitarCriaturas.forEach((boton) => {
            boton.setAttribute('class', 'boton quitarCriatura escondido');
        })

        agregarObjetos.forEach((boton) => {

            boton.setAttribute('class', 'boton agregarObjeto');          
            normalizarCard(boton);
          
        });

        quitarObjetos.forEach((boton) => {
            boton.setAttribute('class', 'boton quitarObjeto escondido');
        })

        agregarPersonajes.forEach((boton) => {

            boton.setAttribute('class', 'boton agregarPersonaje');       
            normalizarCard(boton);
                      
        });

        quitarPersonajes.forEach((boton) => {
            boton.setAttribute('class', 'boton quitarPersonaje escondido');
        })

        agregarJefes.forEach((boton) => {

            boton.setAttribute('class', 'boton agregarJefe');
            normalizarCard(boton);          
        });

        quitarJefes.forEach((boton) => {
            boton.setAttribute('class', 'boton quitarJefe escondido');
        })

        zonasSeleccionadas = [];
        criaturasSeleccionadas = [];
        objetosSeleccionados = [];
        personajesSeleccionados = [];
        jefesSeleccionados = [];
    }

})