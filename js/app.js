$(document).ready(
	function()
	{
		//SetUp juego
		candys     = 7;
		colums     = 7;
		totalCandys = candys*colums;

		// Ancho y alto del juego
		heightGame = $("#candyGame").height();
		widthGame  = $("#candyGame").width();
		
		// Definicion tamañano columnas y dulces dependiendo el ancho de la pantalla
		widthColum  = widthGame/colums;
		heightCandy = heightGame/candys;

		// Variable que va a saber cuanots cuadros contenederos va a tener el tablero
		numSpaces   = 0;
		timeSpeed   = 0;

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
					},timeSpeed);
					validate(numCandy,0);
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
		
		function validate(candyToValidate, opc){
			idCandy				= $("#c"+candyToValidate).attr('id');
			selectCandy         = $("#c"+candyToValidate).attr('data-rel');
			selectCandyRight    = $("#c"+ (candyToValidate+1)).attr('data-rel');
			selectCandyRightX2  = $("#c"+ (candyToValidate+2)).attr('data-rel');
			selectCandyBottom   = $("#c"+ (candyToValidate+candys)).attr('data-rel');
			selectCandyBottomX2 = $("#c"+ (candyToValidate+(candys*2))).attr('data-rel');
			console.log(selectCandy+"-R"+selectCandyRight+"-Rx2-"+selectCandyRightX2+"-B"+selectCandyBottom+"-Bx2-"+selectCandyBottomX2+" || "+idCandy)
			if(opc==0 && candyToValidate<=candys){
				if(selectCandy == selectCandyRight && selectCandy == selectCandyRightX2){
					console.log('aca hay 3 o mas right - '+ idCandy)
					validate(candyToValidate+1,0);
				}
				if(selectCandy == selectCandyBottom && selectCandy == selectCandyBottomX2){
					console.log('igual hay 3 o mas bottom -  ' + idCandy)
					validate(candyToValidate+1,0);
				}
				else{
					validate(candyToValidate+1,0);
				}
			}
				
		}

		//crear espacio para el dulce e insertarlo en el juego
		for(k=1; k<=candys*colums; k++){
			random = Math.round(Math.random() * (4 - 1) + 1);
			numSpaces += 1;
			$("#candyGame").append("<div id='"+k+"' data-rel='"+k+"' style='width:"+widthColum+"px; max-height:"+heightCandy+"'><img id='c"+numSpaces+"' data-rel='"+random+"' src='img/"+random+".png' style='display:block; margin-top:-"+heightGame*candys+"px;'></div>");	
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