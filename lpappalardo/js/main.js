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

        let elementoBoton = listaGeneral.filter(elemento => elemento.id == idBoton)[0];

        subLista.push(elementoBoton);
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
    }

    // ----------- Agregar y Quitar Zona -----------

    let agregarZonas = [];
    let quitarZonas = [];
    let zonasSeleccionadas = [];
    let contadorZonas = document.getElementById("contador-zona");

    function actualizarContador(contador, lista) {
        contador.innerHTML = lista.length
    }

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

        actualizarContador(contadorZonas, zonasSeleccionadas);
    }

    function quitarUnaZona(e) {
  
        quitarEstilos(e);

        quitarDeSubLista(e, zonasSeleccionadas);

        actualizarContador(contadorZonas, zonasSeleccionadas);
    }

    // ----------- Agregar y Quitar Criatura -----------

    let agregarCriaturas = [];
    let quitarCriaturas = [];
    let criaturasSeleccionadas = [];
    let contadorCriaturas = document.getElementById("contador-criatura");

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

        actualizarContador(contadorCriaturas, criaturasSeleccionadas);
    }

    function quitarUnaCriatura(e) {

        quitarEstilos(e);

        quitarDeSubLista(e, criaturasSeleccionadas);

        actualizarContador(contadorCriaturas, criaturasSeleccionadas);
    }


    // ----------- Agregar y Quitar Objeto -----------

    let agregarObjetos = [];
    let quitarObjetos = [];
    let objetosSeleccionados = [];
    let contadorObjetos = document.getElementById("contador-objeto");

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

        actualizarContador(contadorObjetos, objetosSeleccionados);
    }

    function quitarUnObjeto(e) {

        quitarEstilos(e);

        quitarDeSubLista(e, objetosSeleccionados);

        actualizarContador(contadorObjetos, objetosSeleccionados);
    }

    // ----------- Agregar y Quitar Personaje -----------

    let agregarPersonajes = [];
    let quitarPersonajes = [];
    let personajesSeleccionados = [];
    let contadorPersonajes = document.getElementById("contador-personaje");

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

        actualizarContador(contadorPersonajes, personajesSeleccionados);
    }

    function quitarUnPersonaje(e) {

        quitarEstilos(e);

        quitarDeSubLista(e, personajesSeleccionados);

        actualizarContador(contadorPersonajes, personajesSeleccionados);
    }

    // ----------- Agregar y Quitar Jefe -----------

    let agregarJefes= [];
    let quitarJefes = [];
    let jefesSeleccionados = [];
    let contadorJefes = document.getElementById("contador-jefe");

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

        actualizarContador(contadorJefes, jefesSeleccionados);
    }

    function quitarUnJefe(e) {

        quitarEstilos(e);

        quitarDeSubLista(e, jefesSeleccionados);

        actualizarContador(contadorJefes, jefesSeleccionados);
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

    let indiceBase = 0; 

    function cargarAventura() {

        msgErrorZona.innerHTML = ""; 
        msgErrorZona.style.display = "none";

        msgErrorCriatura.innerHTML = ""; 
        msgErrorCriatura.style.display = "none";

        msgErrorObjeto.innerHTML = ""; 
        msgErrorObjeto.style.display = "none";

        msgErrorPersonaje.innerHTML = ""; 
        msgErrorPersonaje.style.display = "none";

        msgErrorJefe.innerHTML = ""; 
        msgErrorJefe.style.display = "none";

        if(!aventuraCompleta()){

            if(zonasSeleccionadas.length < 1){
           
                msgErrorZona.innerHTML = 'Debe cargar al menos 1 zona';
                msgErrorZona.style.display = "block";
            } 
            
            if (criaturasSeleccionadas.length < 1) {
                
                msgErrorCriatura.innerHTML = 'Debe cargar al menos 1 criatura';
                msgErrorCriatura.style.display = "block";
            }
            
            if (objetosSeleccionados.length < 1) {
             
                msgErrorObjeto.innerHTML = 'Debe cargar al menos 1 objeto';
                msgErrorObjeto.style.display = "block";
            }
            
            if (personajesSeleccionados.length < 1) {
            
                msgErrorPersonaje.innerHTML = 'Debe cargar al menos 1 personaje';
                msgErrorPersonaje.style.display = "block";
            }
            
            if (jefesSeleccionados.length < 1) {
            
                msgErrorJefe.innerHTML = 'Debe cargar al menos 1 jefe';
                msgErrorJefe.style.display = "block";
            } 

        } else {

            let indiceAventura = 0;
            if(aventurasCargadas.length == 0 && indiceBase == 0){
                indiceAventura = aventurasCargadas.length + 1;
            } else {
                indiceAventura = indiceBase + aventurasCargadas.length + 1;
            }
            let unaAventura = new Aventura(indiceAventura, zonasSeleccionadas, criaturasSeleccionadas,objetosSeleccionados, personajesSeleccionados, jefesSeleccionados);

            aventurasCargadas.push(unaAventura)
            agregarAventura();

        }
    }

    function aventuraCompleta() {
        return zonasSeleccionadas.length >= 1 && criaturasSeleccionadas.length >= 1 && objetosSeleccionados.length >= 1 && personajesSeleccionados.length >= 1 && jefesSeleccionados.length >= 1;
    }

    function agregarAventura() {
        actualizarAventuras();
        localStorage.setItem("aventuras-guardadas", JSON.stringify(aventurasCargadas));
    }

    let mensajeAventuras = document.querySelector(".mensaje-aventuras");
    let contenedorAventuras = document.querySelector(".container-aventuras")
    let aventuras = document.querySelector(".lista-aventuras");

    function actualizarAventuras() {

        if(aventurasCargadas.length >= 1) {
            contenedorAventuras.style.display = "block";
            mensajeAventuras.style.display = "none";

        } else {
            contenedorAventuras.style.display = "none";
            mensajeAventuras.style.display = "block";
        }

        let elementAventuras = ""

        aventurasCargadas.forEach((aventura) => {

                let listaZonas = aventura.zonas;

                let listaCriaturas = aventura.criaturas;

                let listaObjetos = aventura.objetos;

                let listaPersonajes = aventura.personajes;

                let listaJefes = aventura.jefes;

                elementAventuras += `
                    <div class="card adventure-item">
                        <h4>
                            Aventura ${aventura.id}
                        </h4>
                        <div class="body-card">
                            <div>
                                <span>Zona/s:</span> ${listaZonas.length}
                            </div>
                            <div>
                                <span>Criatura/s:</span> ${listaCriaturas.length}
                            </div>
                            <div>
                                <span>Objeto/s:</span> ${listaObjetos.length}
                            </div>
                            <div>
                                <span>Personajes/s:</span> ${listaPersonajes.length}
                            </div>
                            <div>
                                <span>Jefe/s:</span> ${listaJefes.length}
                            </div>
                        </div>
                        <button id="${aventura.id}" class="boton btn-mostrar">Ver Detalle</button>
                        <button id="${aventura.id}" class="boton btn-eliminar">Eliminar</button>
                    </div>
                `
                });

        aventuras.innerHTML = elementAventuras;

        actualizarEliminarAventuras();
        actualizarMostrarAventuras();

        

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

        // Originalmente limpiar aventura iba aca pero lo tuve que mover de lugar hacia la notificacion 
        // de Creacion Aventura porque con la validacion que utilizada acaba limpiando los campos utilizados 
        // para la creacion de la aventura antes de se generara la notificacion
        // limpiarAventura();
    }

    function limpiarAventura() {
        zonasSeleccionadas = [];
        actualizarContador(contadorZonas, zonasSeleccionadas);
        criaturasSeleccionadas = [];
        actualizarContador(contadorCriaturas, criaturasSeleccionadas);
        objetosSeleccionados = [];
        actualizarContador(contadorObjetos, objetosSeleccionados);
        personajesSeleccionados = [];
        actualizarContador(contadorPersonajes, personajesSeleccionados);
        jefesSeleccionados = [];
        actualizarContador(contadorJefes, jefesSeleccionados);
    }
 
     // ----------- Abrir/Cerrar Modales -----------

    //  ELIMINAR AVENTURA

     function abrirModalEliminar (e) {
    
        let ventanaEliminar = document.getElementById('ventanaEliminar');
        ventanaEliminar.setAttribute('class', 'modal mostrar-modal');

        let contenido = document.getElementsByClassName('contenido-modal-cerrar')[0];
        contenido.innerHTML = 'Aventura ' +  e.currentTarget.id;

        botonEliminar.setAttribute('id', e.currentTarget.id);
    }
    
    const cerrarModalEliminar = () => {
    
        let ventanaEliminar = document.getElementById('ventanaEliminar');
        ventanaEliminar.setAttribute('class', 'modal');
    }

    //  MOSTRAR AVENTURA

    function abrirModalMostrar (e) {
    
        let ventanaMostrar = document.getElementById('ventanaMostrar');
        ventanaMostrar.setAttribute('class', 'modal mostrar-modal');

        let tituloModal = document.getElementsByClassName('titulo-modal')[0];
        let contenidoModalMostrar = document.getElementsByClassName('contenido-modal-mostrar')[0];

        let zonasDeAventura = "";
        let criaturasDeAventura = "";
        let objetosDeAventura = "";
        let personajesDeAventura = "";
        let jefesDeAventura = "";

        let detalleAventura = ""

        aventurasCargadas.forEach((aventura) => {

            if(aventura.id == e.currentTarget.id){

                let listaZonas = aventura.zonas;

                let listaCriaturas = aventura.criaturas;

                let listaObjetos = aventura.objetos;

                let listaPersonajes = aventura.personajes;

                let listaJefes = aventura.jefes;

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

            tituloModal.innerHTML = 'Aventura ' + aventura.id;
            
            detalleAventura += `
                <div class="detalle-aventura">
                    <div>
                        <h4>
                            Zona/s Selecionada/s
                        </h4>
                        <div class="componentes-aventura-elementos">
                            ${zonasDeAventura}
                        </div>
                    </div>
                    <div>
                        <h4>
                            Criatura/s Selecionada/s
                        </h4>
                        <div class="componentes-aventura-elementos">
                            ${criaturasDeAventura}
                        </div>
                    </div>
                    <div>
                        <h4>
                            Objeto/s Selecionado/s
                        </h4>
                        <div class="componentes-aventura-elementos">
                            ${objetosDeAventura}
                        </div>
                    </div>
                    <div>
                        <h4>
                            Personajes/s Selecionado/s
                        </h4>
                        <div class="componentes-aventura-elementos">
                            ${personajesDeAventura}
                        </div>
                    </div>
                    <div>
                        <h4>
                            Jefe/s Selecionado/s
                        </h4>
                        <div class="componentes-aventura-elementos">
                            ${jefesDeAventura}
                        </div>
                    </div>
                </div>`
            }
        })

        contenidoModalMostrar.innerHTML = detalleAventura;
    }
    
    const cerrarModalMostrar = () => {
    
        let ventanaMostrar = document.getElementById('ventanaMostrar');
        ventanaMostrar.setAttribute('class', 'modal');
    }
 
    // ----------- Eliminar Aventura -----------

    let eliminarAventuras = [];

    function actualizarEliminarAventuras() {

        eliminarAventuras = document.querySelectorAll(".btn-eliminar");
    
        eliminarAventuras.forEach(boton => {
            boton.addEventListener("click", abrirModalEliminar);
        });
    }

    function eliminarAventura(e) {

        quitarDeSubLista(e, aventurasCargadas);

        cerrarModalEliminar();

        actualizarAventuras();

        localStorage.setItem("aventuras-guardadas", JSON.stringify(aventurasCargadas));
        
        indiceBase++;
        localStorage.setItem("indice-guardado", JSON.stringify(indiceBase));
    }

    let botonCerrar1 = document.getElementsByClassName('cerrar-modal')[0];
    let botonCerrar2 = document.getElementsByClassName('boton-cerrar-modal')[0];

    let botonEliminar = document.getElementsByClassName('boton-eliminar-aventura')[0];

    botonEliminar.addEventListener("click", eliminarAventura);
    botonCerrar1.addEventListener("click", cerrarModalEliminar);
    botonCerrar2.addEventListener("click", cerrarModalEliminar);

    // ----------- Mostrar Aventura -----------

    let mostrarAventuras = [];

    function actualizarMostrarAventuras() {

        mostrarAventuras = document.querySelectorAll(".btn-mostrar");
    
        mostrarAventuras.forEach(boton => {
            boton.addEventListener("click", abrirModalMostrar);
        });
    }

    let botonCerrarMostrar = document.getElementsByClassName('cerrar-modal-mostrar')[0];
    let botonCerrarMostrar2 = document.getElementsByClassName('boton-cerrar-modal-mostrar')[0];

    botonCerrarMostrar.addEventListener("click", cerrarModalMostrar);
    botonCerrarMostrar2.addEventListener("click", cerrarModalMostrar);

    // ----------- NOTIFICACIONES --------------
    if(window.Notification){
        if(Notification.permission !== 'denied'){
            setTimeout(function(){
                Notification.requestPermission()
                .then(permiso => {
                    if(permiso === 'granted'){
                        console.log('La notificaciones han sido aceptadas')
                    }else{
                        console.log('Las notificaciones han sido rechazadas')
                    }
                })
            }, 5000)
        }
    }

    if(creacionAventura){
        creacionAventura.addEventListener('click', () => {
            Notification.requestPermission().then(permiso=>{
                if(permiso === 'granted' && aventuraCompleta()){
                    console.log('aventura creada');
                    navigator.serviceWorker.ready.then((registration) => {
                        registration.showNotification("Creación de aventura", {
                            body: "La aventura ha sido creada",
                            icon: '../icons/icon-192x192.png',
                            tag: 1,
                            vibrate: [500,300,500,300,300,100],
                            actions:[
                                {
                                    action: 1,
                                    icon: 'icons/icon-192x192.png',
                                    title: 'Aceptar'
                                }
                            ]
                        });
                      });
                      limpiarAventura();
                }
            })
        })
    }

    if(botonEliminar){
        botonEliminar.addEventListener('click', () => {
            Notification.requestPermission().then(permiso=>{
                if(permiso === 'granted'){
                    console.log('aventura eliminada');
                    navigator.serviceWorker.ready.then((registration) => {
                        registration.showNotification("Eliminación de aventura", {
                            body: "La aventura ha sido eliminada",
                            icon: '../icons/icon-192x192.png',
                            tag: 2,
                            vibrate: [500,300,500,300,300,100],
                            actions:[
                                {
                                    action: 1,
                                    icon: 'icons/icon-192x192.png',
                                    title: 'Aceptar'
                                }
                            ]
                        });
                      });
                }
            })
        })
    }

    // --------------online/ofline -----------------

    let header = this.document.querySelector('.navbar');
    let footer = this.document.querySelector('.footer-pwa');

    let OnLineStatus = () => {

        if(navigator.onLine){
            header.setAttribute('class', 'navbar navbar-expand-lg bg-dk-green');
            footer.setAttribute('class', 'footer-pwa bg-dk-green');
            
        }else{
            header.setAttribute('class', 'navbar navbar-expand-lg bg-dgr');
            footer.setAttribute('class', 'footer-pwa bg-dgr');
        }
    }

    OnLineStatus();

    window.addEventListener('online', function(){
        OnLineStatus();
    })

    window.addEventListener('offline', function(){
        OnLineStatus();
    })

    // ------------ COMPARTIR APP ----------------

    let btnShare = document.querySelector('.btnShare');
    if(btnShare != undefined){
        if(navigator.share){
            btnShare.addEventListener('click', (e) => {
                let dataShare = {
                    title: 'Elden Ring', 
                    text: 'Aventuras en el mundo de Elden Ring',
                    url: 'http://localhost/lpappalardo/index.html'
                }
                navigator.share(dataShare)
                .then(() => {
                    console.log('Compartir la app')
                })
            })
        }else{
            console.log('no es compatible');
            btnShare.style.display = "none";
        }
    }


    // ------------ LOCAL STORAGE ----------------

    let aventurasGuardadasLS = localStorage.getItem("aventuras-guardadas");
    let indiceGuardadoLS = localStorage.getItem("indice-guardado");

    if (aventurasGuardadasLS) {
        aventurasCargadas = JSON.parse(aventurasGuardadasLS);
        indiceBase = JSON.parse(indiceGuardadoLS);
        actualizarAventuras();
    } else {
        aventurasCargadas = [];
        indiceBase = 0;
    }

})