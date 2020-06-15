
// Recursos a Conexiones -- Servicios REST

var conexion ={

  hostconexion: 'http://ec2-18-191-168-53.us-east-2.compute.amazonaws.com',
  portconexion: '80',
  rootconexion : '',
  timeconexion: '3600'

}

var ip     = window.localStorage.getItem("miip");
var puerto = window.localStorage.getItem("mipuerto");

var USER_GLOBAL_ID;
var CED;

var URL_GLOBAL;
console.log(ip);
console.log(puerto);

if ( ip != null && puerto != null ) {
  console.log("1");
  
  var x = conexion;
  x.hostconexion = ip;
  x.portconexion = puerto;
  x.rootconexion = '';
  x.timeconexion = '3600';
  URL_GLOBAL = x.hostconexion+':'+x.portconexion+'/'+x.rootconexion;
  
} 
else {
  console.log("2");
  console.log(conexion.hostconexion);
  URL_GLOBAL = conexion.hostconexion+':'+conexion.portconexion+'/'+conexion.rootconexion;
  //window.location.reload();

}

var SERVICIO_AUTENTICACION          =  URL_GLOBAL+'/api/rest/login_movil_app.php';
var SERVICIO_MOVIL                  =  URL_GLOBAL+'/api/rest/listar_servicio_movil_app.php';
var SERVICIO_MOVIL_HISTORIAL        =  URL_GLOBAL+'/api/rest/historial_servicio_movil_app.php';
var SERVICIO_MOVIL_SALDO_MOTORIZADO =  URL_GLOBAL+'/api/rest/saldo_motorizado_app.php';
var SERVICIO_CONSULTA               =  URL_GLOBAL+'/api/rest/buscar_servicio_movil_app.php';
var CERRAR_SERVICIO                 =  URL_GLOBAL+'/api/rest/cerrar_servicio_movil_app.php';
var GPS                             =  URL_GLOBAL+'/api/rest/gps_location_movil_app.php';

var $$ = Dom7;
var userIsLoggedIn = false;
var list_servicio;

var socket = io('http://ec2-18-191-168-53.us-east-2.compute.amazonaws.com:3000');

// Al iniciar 

socket.on('/domicilios:localizar', (msg) =>{

  console.log(msg);

var pos = {
  lat: "",
  lng: ""
};



navigator.geolocation.getCurrentPosition( onSuccess, onError,{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true } );

      function onSuccess(position) {

      pos.lat = position.coords.latitude;
      pos.lng = position.coords.longitude;
        console.log(position);
      socket.emit('/domicilios:enviar_localizacion',  { latitud : pos.lat, longitud : pos.lng } );
    };


    function onError(error) {
          alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
      };

    });





 var watchID = navigator.geolocation.watchPosition(onSuccessrednder, onError, { timeout: 3000 });
  
      var pos = {
          lat: "",
          lng: ""
        };

        function onSuccessrednder(position) {

          pos.lat = position.coords.latitude;
          pos.lng = position.coords.longitude;
          alert("nueva posicion"+ position);
          socket.emit('/domicilios:enviar_localizacion',  { latitud : pos.lat, longitud : pos.lng } );

        };

 // onError Callback receives a PositionError object
 //
          function onError(error) {
              alert('code: '    + error.code    + '\n' +
                    'message: ' + error.message + '\n');
          };

        

navigator.geolocation.clearWatch(watchID); 


var userid = localStorage.getItem("iduser");
var docus  = localStorage.getItem("doc");
var tipous = Number(localStorage.getItem("tipouser"));

var total = 0;

var socket = io('http://ec2-18-191-168-53.us-east-2.compute.amazonaws.com:3000');
socket.on('/domicilios:asignar_servicio',  function() { 
    
  
  cordova.plugins.notification.local.schedule({
    title: 'Evento de Aplicacion',
    text: 'Tiene un servicio asignado',
    attachments: ['file://res/ready.png'],
    foreground: true
});

  Framework7.request({
    
    url : SERVICIO_MOVIL,
    method: 'GET',
    dataType: 'json',
    data : { "usuario" : localStorage.getItem("doc") },
    success: function (data) {

            var arr_datos = data;
            var html = '<tr>';
        
            for ( i = 0; i < arr_datos.length; i++ ) {

              html+= '<div id="micarta" class="card demo-card-header-pic">';
              html+= '<div style="background-image:url(res/mapa.png)" class="card-header align-items-flex-end"></div>';
              html+= '<div class="card-content card-content-padding">';
              html+= '<p class="date">N. Servicio :  '+arr_datos[i].num_servicio+''  ;
              html+= '<p> Origen : '+arr_datos[i].dir_proc+' </p>';
              html+= '<p> Destino : '+arr_datos[i].dir_dest+' </p>';
              html+= '</div>';
              html+= '<div class="card-footer color-red"><a href="#" class="link"></a><a href="/service/'+arr_datos[i].num_servicio+'/" class="link color-red">Aceptar</a></div>';
              html+= '</div>';


              total= total + parseInt(arr_datos[i].totalt);


        }

            
            $$('#tbody').html(html);
            var div = $("#micarta");
          
              var cantidad = 0;

                $$("#cantidad").html(arr_datos.length);
                $$("#total").html(total);

                div.animate({right: '200px', opacity: '0.4'}, "slow");
                div.animate({left: '5px', opacity: '0.8'}, "slow");

}

});
  
});


$$(document).on('page:init','.page[data-name="menu"]',function(data) {

  Framework7.request({

    url : SERVICIO_MOVIL,
    method: 'GET',
    dataType: 'json',
    data : { "usuario" : localStorage.getItem("doc") },
    success: function (data) {

            var arr_datos = data;
            var html= '<tr>';
        
            for ( i = 0; i < arr_datos.length; i++ ) {

              html+= '<div id="micarta" class="card demo-card-header-pic">';
              html+= '<div style="background-image:url(res/mapa.png)" class="card-header align-items-flex-end"></div>';
              html+= '<div class="card-content card-content-padding">';
              html+= '<p class="date">N. Servicio :  '+arr_datos[i].num_servicio+''  ;
              html+= '<p> Origen : '+arr_datos[i].dir_proc+' </p>';
              html+= '<p> Destino : '+arr_datos[i].dir_dest+' </p>';
              html+= '</div>';
              html+= '<div class="card-footer color-red"><a href="#" class="link"></a><a href="/service/'+arr_datos[i].num_servicio+'/" class="link color-red">Aceptar</a></div>';
              html+= '</div>';

/*               html+= '<div id="micarta" class="card text-center">';
              html+= '<div class="card-header">';
              html+= '  N. Servicio :  '+arr_datos[i].num_servicio+'';
              html+= '</div>';
              html+= '<div class="card-body">';
              html+= '<h5 class="card-title">Total : '+arr_datos[i].totalt+'</h5>';
              html+= '<p class="card-text"> Origen : '+arr_datos[i].dir_proc+'</p>'+ '<br>' + 'Destino :' +arr_datos[i].dir_dest+ '';
              
              html+= '</div>';
              html+= '<div class="card-footer text-muted">';
         
              html+= '<a href="/service/'+arr_datos[i].num_servicio+'/" class="col button button-small button-outline color-red">Aceptar</a>';
              html+= '</div>';
              
              html+= '</div>'; */

              total = total + parseInt(arr_datos[i].totalt);

        }

            // Datos de Tablas de Servicio
            $$('#tbody').html(html);
          //sumar cantidad de servicios y total servicios

          
          var cantidad = 0;
          console.log(total);

            $$("#cantidad").html(arr_datos.length);
            $$("#total").html(total);

            var div = $("#micarta");
            div.animate({right: '200px', opacity: '0.4'}, "slow");
            div.animate({left: '3px', opacity: '0.8'}, "slow");


}

});

$$(".link").on('click', function(event){

  console.log("bacanoooo");

  panel.open();

});

Framework7.request({

  url : SERVICIO_MOVIL_HISTORIAL,
  method: 'GET',
  dataType: 'json',
  data : { "usuario" : localStorage.getItem("doc") },
  success: function (data) {

          var arr_datos = data;
          var html= '<tr>';
      
          for ( i = 0; i < arr_datos.length; i++ ) {

            html+= '<div id="micarta" class="card text-center">';
            html+= '<div class="card-header">';
            html+= '  N. Servicio :  '+arr_datos[i].num_servicio+'';
            html+= '</div>';
            html+= '<div class="card-body">';
            html+= '<h5 class="card-title">Total : '+arr_datos[i].totalt+'</h5>';
            html+= '<p class="card-text"> Origen : '+arr_datos[i].dir_proc+'</p>'+ '<br>' + 'Destino :' +arr_datos[i].dir_dest+ '';
            
            html+= '</div>';
            html+= '<div class="card-footer text-muted">';
       
            /* html+= '<a href="/service/'+arr_datos[i].num_servicio+'/" class="col button button-small button-outline color-red">Aceptar</a>'; */
            html+= '</div>';
            
            html+= '</div>';

            total = total + parseInt(arr_datos[i].totalt);

      }

          // Datos de Tablas de Servicio
          $$('#tbody_historial').html(html);
        //sumar cantidad de servicios y total servicios

        
        var cantidad = 0;
        console.log(total);

          //$$("#cantidad").html(arr_datos.length);
          //$$("#total").html(total);

          /* var div = $("#micarta");
          div.animate({right: '200px', opacity: '0.4'}, "slow");
          div.animate({left: '5px', opacity: '0.8'}, "slow"); */


}

});

Framework7.request({

  url : SERVICIO_MOVIL_SALDO_MOTORIZADO,
  method: 'GET',
  dataType: 'json',
  data : { "empleado" : localStorage.getItem("doc") },
  success: function (data) {

          
           // Datos de Tablas de Servicio
          $$('#saldo').html(data);
          //sumar cantidad de servicios y total servicios



}

});




});



var myapp = new Framework7({
  // App root element
  root: '#myapp',
  // App Name
  name: 'HelloCordova',
  // App id
  id: 'com.girosgo.domi',
  theme: 'md',

  toolbar: {
    hideOnPageScroll: true,
  },
 
  // Add default routes
  routes: [

    {

      path: '/',
      async(routeTo,routeFrom,resolve,reject){
              
        if ( localStorage.getItem("iduser") != null ){ 
          resolve({
              componentUrl : './pages/menu.html'
          },

          {
            context : {
              data : localStorage.getItem("nombs")
            }
          }
          
          )
        }else{
          resolve({
            loginScreen : {
               componentUrl : 'index.html'
            }
          })
        }

      }

    },

    {

      path: '/login/',
      async(routeTo, routeFrom, resolve, reject) {
        var info;
        $$('.item-link').on('click', function () {
          console.log("aqui ingreso login");
          
              var username = $$('#username').val();
              var password = $$('#password').val(); 

              myapp.preloader.show();

            setTimeout(function () {

              myapp.request({
              url: SERVICIO_AUTENTICACION,
              method: 'GET',
              dataType: 'json',
              data : {"usuario" : username, "passw" : password },
              success : function(data){
                  info = data;
                 
                  if ( info != null ){
                    //localStorage.setItem("doc",info.documento);
                    USER_GLOBAL_ID = info.id;
                    console.log(info);
                    
                    userIsLoggedIn = true;
                    localStorage.setItem("doc",info[0].usuadoc);
                    console.log("!!!!!!!!!!!!!!!!!!!"+info[0].usuadoc);
                    localStorage.setItem("iduser",info[0].id_usurio);
                    console.log(info[0].usuanomb_completo);
                    localStorage.setItem("nombs", info[0].usuanomb_completo);
                                        
                  
                  if (userIsLoggedIn) {

                         resolve(
                           
                          {
                          componentUrl : './pages/menu.html'              
                          }
                        ,
    
                          {
                          context: {
                            data: info[0].usuanomb_completo,
                          }

                        } //m 320 7668199


                        
                        );




                  } else {
                    resolve({
                      loginScreen: {
                        component: 'index.html'
                      }
                    });
                  }
                      

                  }else{

                    
                    err.open(true);
           

                  }

          }  

        });
        myapp.preloader.hide();
      },1000);

        });



      },
      data: function () {
        return {
          title: 'Mi Perfil',
          name: info.nombre,
        }
      },
      
   
    },

    {

      path: '/service/:idservicio/',
      async(routeTo, routeFrom, resolve,reject){
        
         // alert("Ingreso aqui !!");
          var idservicio_ = routeTo.params.idservicio;
        //alert(idservicio_);

          myapp.request({
            url : SERVICIO_CONSULTA,
            method: 'GET',
            dataType: 'json',
            data : { "servicio" : idservicio_ },
            success: function(data){
            myapp.preloader.show();

            //alert(data);
            
            setTimeout(function(){

              var data2 = JSON.stringify(data);
             
              
              if ( data.acceso == false ){

              resolve({
                template :  `

                <div class="page" data-name="form">
                  <div class="navbar">
                    <div class="navbar-inner sliding">
                      <div class="left">
                        <a href="#" class="link bac color-redk">
                          <i class="icon icon-back color-red"></i>
                          <span class="ios-only">Back</span>
                        </a>
                      </div>
                      <div class="title">Servicio</div>
                    </div>
                  </div>

   
                      <div class="page-content">
                        <div class="block-title">Detalle de Servicio</div>
                        <div class="list no-hairlines-md">
                          <ul>
                            <li>
                              <div class="item-content item-input">
                                <div class="item-inner">
                                  <div class="item-title item-label"># Servicio</div>
                                  <div class="item-input-wrap">
                                    <input type="text" id="numserv" disabled="disabled" placeholder="# de servicio" value="{{this.$route.params.idservicio}}" />
                                  </div>
                                </div>
                              </div>
                            </li>
                           
                            <li class="align-top">
                              <div class="item-content item-input">
                                <div class="item-inner">
                                  <div class="item-title item-label">Descripcion</div>
                                  <div class="item-input-wrap">
                                    <textarea disabled="disabled" placeholder="Descripcon del Servicio"  >{{datos.obs}}</textarea>
                                  </div>
                                </div>
                              </div>
                            </li>
                            
                            <li>
                              <div class="item-content item-input">
                                <div class="item-inner">
                                  <div class="item-title item-label">Direccion Servicio</div>
                                  <div class="item-input-wrap">
                                    <input type="text" disabled="disabled" placeholder="Direccion de Recogida" value="{{datos.dir_proc}}" />
                                  </div>
                                </div>
                              </div>
                            </li>
                          
                            <li>
                              <div class="item-content item-input">
                                <div class="item-inner">
                                  <div class="item-title item-label">Direccion Servicio</div>
                                  <div class="item-input-wrap">
                                    <input type="text" disabled="disabled" placeholder="Direccion de Entrega" value="{{datos.dir_dest}}" />
                                  </div>
                                </div>
                              </div>
                            </li>

                            <li>
                              <div class="item-content item-input">
                                <div class="item-inner">
                                  <div class="item-title item-label">Direccion Servicio</div>
                                  <div class="item-input-wrap">
                                    <input type="text" disabled="disabled" placeholder="Ruta Desvio #1" value="{{datos.dir_rta1}}" />
                                  </div>
                                </div>
                              </div>
                            </li>

                            <li>
                              <div class="item-content item-input">
                                <div class="item-inner">
                                  <div class="item-title item-label">Direccion Servicio</div>
                                  <div class="item-input-wrap">
                                    <input type="text" disabled="disabled" placeholder="Ruta Desvio #2" value="{{datos.dir_rta2}}" />
                                  </div>
                                </div>
                              </div>
                            </li>

                            <li>
                              <div class="item-content item-input">
                                <div class="item-inner">
                                  <div class="item-title item-label">Direccion Servicio</div>
                                  <div class="item-input-wrap">
                                    <input type="text" disabled="disabled" placeholder="Ruta Desvio #3" value="{{datos.dir_rta3}}" />
                                  </div>
                                </div>
                              </div>
                            </li>

                            <li>
                            <div class="item-content item-input">
                              <div class="item-inner">
                                <div class="item-title item-label">Direccion Servicio</div>
                                <div class="item-input-wrap">
                                  <input type="text" disabled="disabled" placeholder="Ruta Desvio #4" value="{{datos.dir_rta4}}" />
                                </div>
                              </div>
                            </div>
                          </li>

                          <li>
                          <div class="item-content item-input">
                            <div class="item-inner">
                              <div class="item-title item-label">Direccion Servicio</div>
                              <div class="item-input-wrap">
                                <input type="text" disabled="disabled" placeholder="Ruta Desvio #5" value="{{datos.dir_rta5}}" />
                              </div>
                            </div>
                          </div>
                        </li>

                        <li>
                        <div class="item-content item-input">
                          <div class="item-inner">
                            <div class="item-title item-label">Direccion Servicio</div>
                            <div class="item-input-wrap">
                              <input type="text" disabled="disabled" placeholder="Ruta Desvio #6" value="{{datos.dir_rta6}}" />
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                      <div class="item-content item-input">
                        <div class="item-inner">
                          <div class="item-title item-label">Direccion Servicio</div>
                          <div class="item-input-wrap">
                            <input type="text" disabled="disabled" placeholder="Ruta Desvio #7" value="{{datos.dir_rta7}}" />
                          </div>
                        </div>
                      </div>
                    </li>
                          
                    
                          
                          
                          </ul>
                  
                      
                        
                         
                          
                        
                        
                  
                        </div>
                      
                        <!-- Toolbar-->
                        <div class="toolbar toolbar-bottom">
                          <div class="toolbar-inner">
                            <a href="#" class="link color-red">Cancelar</a>
                            <a href="/takeservice/" id="aceptar" class="link color-red">Aceptar</a>
                          </div>
                        </div>
                      
                    
                        </div>
                  
                  
                      </div>
                  


    
                
                  `
              },

              {
                context: {
                  datos: data[0],
                }

              }
              
              )

            }

              else{

                resolve({
                  template :  `
  
                  <div class="page" data-name="form">
                  <div class="navbar">
                    <div class="navbar-inner sliding">
                      <div class="left">
                        <a href="#" class="link back color-red">
                          <i class="icon icon-back color-red"></i>
                          <span class="ios-only">Back</span>
                        </a>
                      </div>
                      <div class="title">Servicio</div>
                    </div>
                  </div>

   
                      <div class="page-content">
                        <div class="block-title">Detalle de Servicio</div>
                        <div class="list no-hairlines-md">
                          <ul>
                            <li>
                              <div class="item-content item-input">
                                <div class="item-inner">
                                  <div class="item-title item-label"># Servicio</div>
                                  <div class="item-input-wrap">
                                    <input type="text" id="numserv" disabled="disabled" placeholder="# de servicio" value="{{this.$route.params.idservicio}}" />
                                  </div>
                                </div>
                              </div>
                            </li>
                           
                            <li class="align-top">
                              <div class="item-content item-input">
                                <div class="item-inner">
                                  <div class="item-title item-label">Descripcion</div>
                                  <div class="item-input-wrap">
                                    <textarea disabled="disabled" placeholder="Descripcon del Servicio"  >{{datos.obs}}</textarea>
                                  </div>
                                </div>
                              </div>
                            </li>
                            
                            <li>
                              <div class="item-content item-input">
                                <div class="item-inner">
                                  <div class="item-title item-label">Direccion Servicio</div>
                                  <div class="item-input-wrap">
                                    <input type="text" disabled="disabled" placeholder="Direccion de Recogida" value="{{datos.dir_proc}}" />
                                  </div>
                                </div>
                              </div>
                            </li>
                          
                            <li>
                              <div class="item-content item-input">
                                <div class="item-inner">
                                  <div class="item-title item-label">Direccion Servicio</div>
                                  <div class="item-input-wrap">
                                    <input type="text" disabled="disabled" placeholder="Direccion de Entrega" value="{{datos.dir_dest}}" />
                                  </div>
                                </div>
                              </div>
                            </li>

                            <li>
                              <div class="item-content item-input">
                                <div class="item-inner">
                                  <div class="item-title item-label">Direccion Servicio</div>
                                  <div class="item-input-wrap">
                                    <input type="text" disabled="disabled" placeholder="Ruta Desvio #1" value="{{datos.dir_rta1}}" />
                                  </div>
                                </div>
                              </div>
                            </li>

                            <li>
                              <div class="item-content item-input">
                                <div class="item-inner">
                                  <div class="item-title item-label">Direccion Servicio</div>
                                  <div class="item-input-wrap">
                                    <input type="text" disabled="disabled" placeholder="Ruta Desvio #2" value="{{datos.dir_rta2}}" />
                                  </div>
                                </div>
                              </div>
                            </li>

                            <li>
                              <div class="item-content item-input">
                                <div class="item-inner">
                                  <div class="item-title item-label">Direccion Servicio</div>
                                  <div class="item-input-wrap">
                                    <input type="text" disabled="disabled" placeholder="Ruta Desvio #3" value="{{datos.dir_rta3}}" />
                                  </div>
                                </div>
                              </div>
                            </li>

                            <li>
                            <div class="item-content item-input">
                              <div class="item-inner">
                                <div class="item-title item-label">Direccion Servicio</div>
                                <div class="item-input-wrap">
                                  <input type="text" disabled="disabled" placeholder="Ruta Desvio #4" value="{{datos.dir_rta4}}" />
                                </div>
                              </div>
                            </div>
                          </li>

                          <li>
                          <div class="item-content item-input">
                            <div class="item-inner">
                              <div class="item-title item-label">Direccion Servicio</div>
                              <div class="item-input-wrap">
                                <input type="text" disabled="disabled" placeholder="Ruta Desvio #5" value="{{datos.dir_rta5}}" />
                              </div>
                            </div>
                          </div>
                        </li>

                        <li>
                        <div class="item-content item-input">
                          <div class="item-inner">
                            <div class="item-title item-label">Direccion Servicio</div>
                            <div class="item-input-wrap">
                              <input type="text" disabled="disabled" placeholder="Ruta Desvio #6" value="{{datos.dir_rta6}}" />
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                      <div class="item-content item-input">
                        <div class="item-inner">
                          <div class="item-title item-label">Direccion Servicio</div>
                          <div class="item-input-wrap">
                            <input type="text" disabled="disabled" placeholder="Ruta Desvio #7" value="{{datos.dir_rta7}}" />
                          </div>
                        </div>
                      </div>
                    </li>
                          
                    
                          
                          
                          </ul>
                  
                      
                        
                         
                          
                        
                        
                  
                        </div>
                      
                        <!-- Toolbar-->
                        <div class="toolbar toolbar-bottom">
                          <div class="toolbar-inner">
                            <a href="#" class="col button button-small color-red">Cancelar</a>
                            <a href="/takeservice/" id="aceptar" class="col button button-small color-red">Aceptar</a>
                          </div>
                        </div>
                      
                    
                        </div>
                  
                  
                      </div>
                    
  
  
      
                  
                    `
                },
  
                {
                  context: {
                    datos: data[0],
                  }
  
                }
                
                )

              }
                

              myapp.preloader.hide();
            },1000)

          }
          
        })

      },
      

    },


    {

      path: '/cam/',
      async(routeTo,routeFrom,resolve,reject){

       var idservicio = document.getElementById("numserv").value;

           //plugin options
    var options= {
      preferFrontCamera : false, // iOS and Android
      showFlipCameraButton : true, // iOS and Android
      showTorchButton : true, // iOS and Android
      torchOn: true, // Android, launch with the torch switched on (if available)
      saveHistory: true, // Android, save scan history (default false)
      prompt : "Por favor acercar dispositivo", // Android
      resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
      orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
      disableAnimations : true, // iOS
      disableSuccessBeep: false // iOS and Android
    }

//success callback
function onSuccess(result) {

  console.log(idservicio); 

  if ( idservicio == result.text ) {

  //console.log(result.text);
  myapp.request({
    url: CONTROL_ACCESO+idservicio+'/q2/'+result.text+'/verifica',
    method: 'GET',
    dataType: 'json',
    success : function(data){
      console.log("Cambiando css del boton aceptar");
      //document.getElementById("numserv").value = "asdad";
       var info = data;
        if ( info != null ){

              // mando respuesta al front de la solictud del vendedor despues de leer codigo qr

              if ( info.codigo == 1 ) {

               
                    if ( data.codigo = 1 )
                    informativo.open(true);
                    $$("#aceptar").toggleClass('link');
                    $$("#aceptar").removeClass('link disabled');
              
                

              }
      
        }
    
  

}  

});

} else{



}

}

//error callback
function onError(error) {
  console.log(error);
  myapp.request({
    url: CONTROL_ACCESO+idservicio+'/q2/BarbacodeError/verifica',
    method: 'GET',
    dataType: 'json',
    success : function(data){
      console.log("Error");
      
}  

});
}

cordova.plugins.barcodeScanner.scan(onSuccess, onError, options); 

      }

    },

    {

      path: '/settings/',
      url: './pages/configuracion.html',
      options : {
        animate : true
        }

    },

    {
      path : '/update',
      async(routeTo,routeFrom,resolve,reject){
        cargando.open(true);
        
          var userid = localStorage.getItem("iduser");
          console.log(userid);
          
            Framework7.request({
          
              url : SERVICIO_MOVIL,
              method: 'GET',
              dataType: 'json',
              data : { "usuario" : userid },
              success: function (data) {
              
                      var arr_datos = data;
                      var html = '<tr>';
                  
                      for ( i = 0; i < arr_datos.length; i++ ) {
                    
                        
                        html+= '<td ><a class="link" href="/service/'+arr_datos[i].num_servicio+'/">'+arr_datos[i].num_servicio+'</a></td>'; 
                        html+= '<td class="label-cell">'+arr_datos[i].direccion_servicio+'</td>';
                                      
                        html+= '</tr>';
          
                  }
          
                      
                      $$('#tbody').html(html);
          
          }
          
          });
            
        

      }

    },

    {

      path : '/salir',
      async(routeTo,routeFrom,resolve,reject){
                   
          window.localStorage.clear();
              resolve({

                loginScreen : {
                  componentUrl : '../index.html'
               }

              });

              window.location.reload();

        

      }


    },

    {
      path: '/takeservice/',
      async(routeTo,routeFrom,resolve,reject){

        var num_servicio_ = $$("#numserv").val();
        //alert(num_servicio_);
       

        if ( Number(window.localStorage.getItem("tipouser")) != 6 ) {

            resolve({
              componentUrl: './pages/takeservice.html'
            },
    
            {
            context: {
              data: num_servicio_,
            }
    
          }

        )

    }else{

      resolve({
        componentUrl: './pages/58.html'
      },

      {
      context: {
        data: num_servicio_,
      }

    }

      )

    }

      }

    },

    {

      path : '/cerrarservicio/',

      async(routeTo,routeFrom,resolve,reject){

        var usuario             = window.localStorage.getItem("iduser");
        var id_num_servicio     = $$("#id_num_servicio").val();
        var descripcion         = $$("#descripcion").val();
        var estado_servicio     = $$("#estado_servicio").val();

        console.log(usuario);

        myapp.request({


          url : CERRAR_SERVICIO,
          method   : 'POST',
          data : { "servicio" : id_num_servicio, "usuario" : localStorage.getItem("iduser"), "descripcion" : descripcion, "estado_serv" : estado_servicio },
          dataType : 'json',
          success  : function(data){

            myapp.preloader.show();
            mydialog.open(true);
            setTimeout(function(){

              
              myapp.preloader.hide();

            },1000);

            
          },

          error : function (xhr, status) {
              alert("Error de cachonimos" + USER_GLOBAL_ID);
          }

      });

    }

    },

    {

      path : '/cerrarservicio_seg/',
      async(routeTo,routeFrom,resolve,reject){

        var usuario             = window.localStorage.getItem("iduser");
        var id_num_servicio     = $$("#id_num_servicio").val();
        var descripcion         = $$("#descripcion").val();
        var estado_servicio     = $$("#estado_servicio").val();

        myapp.request({


          url : CERRAR_SERVICIO_SEG,
          method   : 'POST',
          data : { "servicio" : id_num_servicio, "usuario" : localStorage.getItem("iduser"), "descripcion" : descripcion, "estado_serv" : estado_servicio,  "pendiente" : "N/A", "inventario" : 1, "imei" : "N/A", "sim" : "N/A", "operador" : 1, "obs_cierre" : "N/A" },
          dataType : 'json',
          success  : function(data){

            myapp.preloader.show();
            mydialog.open(true);
            setTimeout(function(){

              
              myapp.preloader.hide();

            },1000);

            
          },

          error : function (xhr, status) {
              alert("Error de cachonimos" + USER_GLOBAL_ID);
          }

      });

    }

    },

    {

      path : '/addserv/',
      
      async(routeTo,routeFrom,resolve,reject){


            myapp.preloader.show();
            
            setTimeout(function(){

              myapp.preloader.hide();

            },1000);

            resolve({
              componentUrl : '../pages/addserv.html'
            })
        

      }

    },

    {

      path : 'guardarserv',
      async(routeTo,routeFrom,resolve,reject){


        myapp.preloader.show();
        

      }

    },

    {
      path: '/parametrizar/',
      async(routeTo,routeFrom,resolve,reject){

        console.log("parametrizando sistema...");

        ip     = $$("#ip").val();
        puerto = $$("#puerto").val();

          // Confirguracion global de conexion
        
          console.log("La ip : "+ip);
          console.log("El puerto : "+puerto); 

          localStorage.setItem("miip", 'http://'+ip);
          localStorage.setItem("mipuerto", puerto);

          //ojo pendiente..

          resolve({
            url: '../index.html'
          });

          //window.location.reload();


      }

    },



    {

        path: '(.*)',
        url: './pages/404.html',
        options : {
            animate : true
        }

    },

   

  ],
  // ... other parameters
});

var homeView      = myapp.views.create('.view-main',{
    url: '/'
});



var panel = myapp.panel.create({
  el: '.panel-left',
  resizable: true,
  visibleBreakpoint: 1024,
  collapsedBreakpoint: 768,
})


var mydialog      = myapp.dialog.create({


  title: 'Evento de Aplicacion',
  text: 'Servicio Cerrado Con Exito',
  
  buttons : [
    {
    text: 'Aceptar',
    cssClass : 'mycustomsclass',
    bold : true,
    onClick: function(e){
      //alert("aqui navegando entre paginas");
      homeView.router.navigate('/');
      
    }
    
    },

  
     
  ],
  on: {
    opened: function () {
      
    }
  }
});

var cargando      = myapp.dialog.create({


  title: 'Evento de Aplicacion',
  text: 'Cargando por favor espere ..',
  
  buttons : [
    {
    text: 'Aceptar',
    cssClass : 'mycustomsclass',
    bold : true,
    onClick: function(e){
      //alert("aqui navegando entre paginas");
      homeView.router.navigate('/');
      
    }
    
    },

  
     
  ],
  on: {
    opened: function () {
      
    }
  }
});


var err      = myapp.dialog.create({


  title: 'Evento de Aplicacion',
  text: 'Error Usuario y/o Clave erroneas',
  
  buttons : [
    {
    text: 'Aceptar',
    cssClass : 'mycustomsclass',
    bold : true,
    onClick: function(e){
      //alert("aqui navegando entre paginas");
      //homeView.router.navigate('/');
      
    }
    
    },

  
     
  ],
  on: {
    opened: function () {
      
    }
  }
});

var informativo      = myapp.dialog.create({


  title: 'Evento de Aplicacion',
  text: 'Autorizacion satisfactoria',
  
  buttons : [
    {
    text: 'Aceptar',
    cssClass : 'mycustomsclass',
    bold : true,
    onClick: function(e){
      //alert("aqui navegando entre paginas");
      //homeView.router.navigate('/');
      
    }
    
    },

  
     
  ],
  on: {
    opened: function () {
      
    }
  }
});



var app = {
  /*
  Esta función initialize la llamamos desde index.html al final del documento,
  cuando esto se ejecute lanzará deviceready y su correspondiente función "init".
  */
  initialize: function() {
      document.addEventListener("deviceready", this.init, false);

  },
  init: function() {



     if( localStorage.getItem("iduser") != null ) {

      console.log(homeView.router);
      homeView.router.navigate(homeView.router.currentRoute.url, 
        {
        reloadCurrent: true,
        ignoreCache: false 
        });

        // enviando mi ubicacion al inciar aplicacion

      

     }
  },



};
