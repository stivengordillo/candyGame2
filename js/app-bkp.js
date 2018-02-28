$(document).ready(
	function()
	{
		//SetUp juego
		candys      = 7;
		colums      = 7;
		totalCandys = candys*colums;
		maxCandy    = 4;

		// Ancho y alto del juego
		heightGame = $("#candyGame").height();
		widthGame  = $("#candyGame").width();
		
		// Definicion tamañano columnas y dulces dependiendo el ancho de la pantalla
		widthColum  = widthGame/candys;
		heightCandy = heightGame/colums;

		// Variable que va a saber cuantos cuadros contenedores va a tener el tablero
		numSpaces   = 0;
		timeSpeed   = 0;
		saveRandom  = 0;

		// Recibo la cantidad de dulces que se van a posicionar, el tiempo en el que se debe ejecutar la animación, la división a animar y la opción (0 = El juego inicia , 1 = evelua la posicion de los dulces que faltan)

		function candyPosition(numCandy,time,div,opc){
			timeSpeed = time;
			nextCandy = numCandy-1;

			// Condicional que solo se va a ejecutar cuando inicie el juego
			if(opc==0){
				//Si todos los dulces estan en la posición indicada inicia las validaciones en la función validate
				if(numCandy == 1){
					$("#c"+numCandy).animate({
						"margin-top": 0
					},timeSpeed,function(){
						validate(1,0);
					});
					
				}
				//posiciona los dulces en el tablero
				else{
					$("#c"+numCandy).animate(
						{
							"margin-top": 0 
						},timeSpeed,function(){
							candyPosition(nextCandy, timeSpeed , 0 , 0);
						}
					);
				}
			}
			//Condicional que se va a ejacutar cuando  se emparejen dulces
		}

		// función encargada de validar los dulces y recibe como parametro el dulce a validar
		
		function validate(colToValidate, opc)
		{
			if(opc==0)
			{
				for(r=1; r<=colums; r++)
				{
					//Itera horizontal
					for(c=1; c<=candys-2; c++)
					{
						cx1 = c+1;
						cx2 = c+2;
						candyVal = $("#c-"+r+"-"+c);
						candyValX1 = $("#c-"+r+"-"+cx1);
						candyValX2 = $("#c-"+r+"-"+cx2);
						if(candyVal.attr('data-rel') == candyValX1.attr('data-rel') && candyVal.attr('data-rel') == candyValX2.attr('data-rel') )
						{
							candyVal.delay(2000).empty();
							candyValX1.delay(2000).empty();
							candyValX2.delay(2000).empty();
						}
					}

					//Itera vertical
					for(c=1; c<=candys; c++)
					{
						ry1 = r+1;
						ry2 = r+2;
						candyVal = $("#c-"+r+"-"+c);
						candyValY1 = $("#c-"+ry1+"-"+c);
						candyValY2 = $("#c-"+ry2+"-"+c);
						if(candyVal.attr('data-rel') == candyValY1.attr('data-rel') && candyVal.attr('data-rel') == candyValY2.attr('data-rel') )
						{
							candyVal.delay(2000).empty();
							candyValY1.delay(2000).empty();
							candyValY2.delay(2000).empty();
						}
					}
				}
			}
		}

		//crear espacio para el dulce e insertarlo en el juego
		for(i=1; i<=colums; i++){
			$("#candyGame").append("<div id='col-"+i+"' style='width:100%; height:"+heightCandy+"'></div>")
			for(k=1; k<=candys; k++){
				random = Math.round(Math.random() * (maxCandy - 1) + 1);
				numSpaces += 1;
				$("#col-"+i).append("<div id='c-"+i+"-"+k+"' data-rel='"+random+"' style='width:"+widthColum+"px; max-height:"+heightCandy+"'><img id='c"+numSpaces+"' data-rel='"+random+"' src='img/"+random+".png' style='display:block; margin-top:-"+heightGame*candys+"px;'></div>");	
			}
		}

		//Inicializa el juego con la función candyPosition

		$("#start").click(
			function()
			{
				candyPosition(totalCandys,100,0,0);
			}
		);	
	}
)