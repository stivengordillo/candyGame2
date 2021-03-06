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
		heightCandy = heightGame/candys;

		// Variable que va a saber cuantos cuadros contenedores va a tener el tablero
		numSpaces   = 0;
		timeSpeed   = 0;
		saveRandom  = 0;
		valCandy    = 0;
		contSpaces  = 0;

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
						candyVal = $("#c-"+r+"-"+c+" img");
						candyValX1 = $("#c-"+r+"-"+cx1+" img");
						candyValX2 = $("#c-"+r+"-"+cx2+" img");
						if(candyVal.attr('data-rel') == candyValX1.attr('data-rel') && candyVal.attr('data-rel') == candyValX2.attr('data-rel') )
						{
							candyVal.addClass('clear')
							candyValX1.addClass('clear')
							candyValX2.addClass('clear')
						}
					}

					//Itera vertical
					for(c=1; c<=candys; c++)
					{
						ry1 = r+1;
						ry2 = r+2;
						candyVal = $("#c-"+r+"-"+c+" img");
						candyValY1 = $("#c-"+ry1+"-"+c+" img");
						candyValY2 = $("#c-"+ry2+"-"+c+" img");
						valCandy += 1;
						if(candyVal.attr('data-rel') == candyValY1.attr('data-rel') && candyVal.attr('data-rel') == candyValY2.attr('data-rel') )
						{
							candyVal.addClass('clear')
							candyValY1.addClass('clear')
							candyValY2.addClass('clear')
						}
					}
				}
				if(valCandy == totalCandys)
				{
					validateCandys();
				}
			}
		}

		function validateCandys()
		{
			candysToClear = $("div .clear").length;
			console.log(candysToClear);
			$('.clear').fadeOut("fast",function()
				{
					$(this).parent().addClass('addCandy');
					valCan = $(this).parent().attr('data-rel');
					valCanY = valCan-1;
					valCol = $(this).parent().parent().attr('data-rel');
					console.log(valCol+"-"+valCanY);
					$("#c-"+valCol+"-"+valCanY+" img").animate(
						{
							"margin-top": heightCandy*2
						},50,function()
						{
							$("#c-"+valCol+"-"+valCanY+" img").append("#c-"+valCol+"-"+valCan);
							validateCandys()
						}
					);
					$(this).parent().empty();
				}
			)

		}

		
		//crear espacio para el dulce e insertarlo en el juego
		for(i=1; i<=colums; i++){
			$("#candyGame").append("<div id='col-"+i+"' data-rel='"+i+"' class='col' style='width:"+widthColum+"px; height:"+heightGame+"'></div>")
			for(k=1; k<=candys; k++){
				random = Math.round(Math.random() * (maxCandy - 1) + 1);
				numSpaces += 1;
				$("#col-"+i).append("<div id='c-"+i+"-"+k+"' data-rel='"+k+"' style='width:"+widthColum+"px; height:"+heightCandy+"px !important;'><img id='c"+numSpaces+"' data-rel='"+random+"' src='img/"+random+".png' style='display:block; margin-top:-"+heightGame*candys+"px;'></div>");	
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