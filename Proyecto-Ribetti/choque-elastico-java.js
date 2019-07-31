var V1F = 0;
var V2F = 0;
/*la utilizo para el boton de reinicio del canvas*/
var reinicio = 0;
/* La utilizo para detectar si ocurrio la colision e intercambiar los valores de la velocidad final por los calculados */
var colision = 0;
/*las utilizo de tipo global asi declaro sus valores una sola vez y asi la funcion dibujar no me los modifica */
var x1 = 50;
var x2 = 480 - 50;

function VF() {
    /* para que me dibuje en el canvas*/
    reinicio = 0;
    var V1 = document.getElementById('velocidad1').value;
    var M1 = document.getElementById('masa1').value;
    var V2 = document.getElementById('velocidad2').value;
    var M2 = document.getElementById('masa2').value;

     V1F = (((parseFloat(M1) - parseFloat(M2))/(parseFloat(M1) + parseFloat(M2))) * parseFloat(V1)) + (((parseFloat(M2) + parseFloat(M2)) / (parseFloat(M1) + parseFloat(M2))) * parseFloat(V2));
     V2F = (((parseFloat(M2) - parseFloat(M1))/(parseFloat(M1) + parseFloat(M2))) * parseFloat(V2)) + (((parseFloat(M1) + parseFloat(M1)) / (parseFloat(M1) + parseFloat(M2))) * parseFloat(V1));

    alert("la velocidad final del objeto 1 es: " + V1F + " Y la velocidad final del objeto 2 es: " + V2F);
    setInterval(dibujo, 1);
}
function reiniciar() {
    reinicio = 1;
    colision = 0;
}
function dibujo() {
/*
variables de velocidad ingresadas por el usuario en los input
Esto dberia de ser valido solo antes de la colision, cuando colisiones los valores de velocidad cambian
*/
if(colision === 0){
    var V1 = document.getElementById('velocidad1').value;
    var V2 = document.getElementById('velocidad2').value;
    var vx1 = V1/100;             //velocidad relativa de la pelota 1 dependiente de la velocidad del objeto 1
    var vx2 = - V2/100;             //velocidad relativa de la pelota 2 dependiente de la velocidad del objeto 2
}
if(colision === 1){
    vx1 = -V1F/100;
    vx2 = V2F/100;
}
    if(reinicio == 0){
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.beginPath();
        /* para dibujar ambas pelotas */
        var y  = 160;
        var radius = 20;
        var startAngle = 0;
        var endAngle = Math.PI + (Math.PI * 3) / 2;
        var anticlockwise = 4 % 2 !== 0;
        ctx.arc(x1, y, radius, startAngle, endAngle, anticlockwise);
        ctx.arc(x2, y, radius, startAngle, endAngle, anticlockwise);
        ctx.fillStyle = 'violet';
        ctx.fill();

        if((x1 > x2) && colision === 0){
            colision = 1;
            x1 = x1 - vx1;
            x2 = x2 + vx2;
        }
        else{
            x1 = x1 + vx1;
            x2 = x2 + vx2;
        }
    }
    /* me reinicia el canvas y me devuelve ambas pelotas a su posicion original */
    if(reinicio == 1){
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0,0, canvas.width, canvas.height);
        /*Pongo en cero las velocidades y reseteo las posiciones de las pelotas*/
        x1 = 50;
        x2 = 480 - 50;
    }
}