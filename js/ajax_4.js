var Ajax = (function(){
	var ajax = {
		conexion : function(){
			return new XMLHttpRequest();
		},
		abrir : function(conexion,metodo,url,parametros,tipo){
			conexion.open(metodo,url);
			if(parametros){
				conexion.setRequestHeader("Content-type",`application/${ tipo ? "x-www-form-urlencoded" : "json" }`);
			}
			conexion.send(parametros);
			return conexion;
		},
		crearMetodo : function(nombreMetodo,funcion){
			var metodoAntiguo = this[nombreMetodo];

			this[nombreMetodo] = function(){
				if(funcion.length == arguments.length){
					return funcion.apply(this,arguments);
				}else{
					if(typeof metodoAntiguo == "function"){
						return metodoAntiguo.apply(this,arguments);
					}
				}
			}
		}

	};

	ajax.crearMetodo("request",function(url,callback){
		this.abrir(this.conexion(),"GET",url).addEventListener("load",function(){
			if(this.status == 200){
				callback(this.responseText);
			}
		});
	});

	ajax.crearMetodo("request",function(url,parametros,callback){
		this.abrir(this.conexion(),"POST",url,parametros,false).addEventListener("load",function(){
			if(this.status == 200){
				callback(this.responseText);
			}
		});
	});

	ajax.crearMetodo("request",function(url,parametros,tipo,callback){
		this.abrir(this.conexion(),"POST",url,parametros,tipo).addEventListener("load",function(){
			if(this.status == 200){
				callback(this.responseText);
			}
		});
	});

	return ajax;
})();
