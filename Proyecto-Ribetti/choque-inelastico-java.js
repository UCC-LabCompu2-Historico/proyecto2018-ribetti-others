var VFINAL = 0;
/*las utilizo de tipo global asi declaro sus valores una sola vez y asi la funcion dibujar no me los modifica */
var x1 = 50;
var x2 = 480 - 50;
var x = 0;
/* la utilizo para detectar la colision y dibujar un solo objeto luego de la colision */
var colision = 0;
var reinicio = 0;

function VF() {
    /* para que me dibuje en el canvas*/
    reinicio = 0;

    var V1 = document.getElementById('velocidad1').value;
    var M1 = document.getElementById('masa1').value;
    var V2 = document.getElementById('velocidad2').value;
    var M2 = document.getElementById('masa2').value;

    VFINAL = ((parseFloat(M1) * parseFloat(V1)) + (parseFloat(M2) * parseFloat(V2))) / (parseFloat(M1) + parseFloat(M2) );

    alert("la velocidad final de los objetos es: " + VFINAL);
    setInterval(dibujo, 1);
}

/* me reinicia el canvas y me devuelve ambas pelotas a su posicion original */
function reiniciar() {
    reinicio = 1;
    colision = 0;
}

function dibujo() {

    if(colision === 0){
        /* variables de velocidad ingresadas por el usuario */
        var V1 = document.getElementById('velocidad1').value;
        var V2 = document.getElementById('velocidad2').value;
        var vx1 = V1/100;             //velocidad relativa de la pelota 1 dependiente de la velocidad del objeto 1
        var vx2 = V2/100;             //velocidad relativa de la pelota 2 dependiente de la velocidad del objeto 2

        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.beginPath();

        /* para dibujar ambas pelotas */
        var y  = 160; // y coordinate
        var radius = 20; // Arc radius
        var startAngle = 0;
        var endAngle = Math.PI + (Math.PI * 3) / 2;
        var anticlockwise = 4 % 2 !== 0;
        ctx.arc(x1, y, radius, startAngle, endAngle, anticlockwise);
        ctx.arc(x2, y, radius, startAngle, endAngle, anticlockwise);
        ctx.fillStyle = 'dodgerblue';
        ctx.fill();
    }

    if (colision === 1){
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.beginPath();

        var y  = 160;
        var radius = 20;
        var startAngle = 0;
        var endAngle = Math.PI + (Math.PI * 3) / 2;
        var anticlockwise = 4 % 2 !== 0;
        ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        ctx.fillStyle = 'violet';
        ctx.fill();
    }
    /* funcion para detectar la colision entre ambos objetos */
    /* cuando colisionen necesito dibujar un solo objeto que tenga
     como veloiidad la velocidad final calculada mas arriba */
    if(x1>x2 && colision === 0){
        colision = 1 ;
        x = x1;
    }
    else{
        x1 = x1 + vx1;
        x2 = x2 + vx2;
        x = x + (VFINAL/100);
    }
    if(reinicio === 1){
        /* Limpio el canvas */
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0,0, canvas.width, canvas.height);
        x1 = 50;
        x2 = 480 - 50;
        x = 0;
    }
}