<html>
	<head>
		<title></title>
		<script type="text/javascript">
			function load(){
				loadScript( '../edit_area/edit_area_compressor.php',function(){
					alert('Editarea loading');
					editAreaLoader.init({id:'editor'});
					editAreaLoader.window_loaded();
				});
			}

			/**
			 * Load one script
			 * @param {String} url Url of the script
			 * @param {Function} callback This function will be called when the script will be loaded.
			 * @param {boolean} forceCallback If true, call the function even if the script is already loaded. Default to false.
			 */
			 
			function loadScript(url, callback, forceCallback) {
			  if (!this.loadedScript) {
				this.loadedScript = new Array();
			  }
			  if (this.loadedScript.indexOf(url) == -1) {
				this.loadedScript.push(url);
				var e = document.createElement("script");
				e.src = url + "?" + Math.random();
				e.type = "text/javascript";
				if (/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)) {
				  // IE
				  e.onreadystatechange = function(){
					if (this.readyState == 'loaded') {
					  callback();
					}
				  }
				} else {
				  // Other browsers
				  e.onload = callback;
				}
				document.getElementsByTagName("head")[0].appendChild(e);
			  } else {
				if (forceCallback) {
				  callback();
				}
			  }
			}

		</script>
	</head>
	<body onload="load()">
		<textarea id="editor"></textarea>
	</body>
</html>

 	  	 
