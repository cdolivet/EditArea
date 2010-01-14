<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<!--<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">-->
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" >
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
	<title>EditArea - the code editor in a textarea</title>
	<!-- <link href="style.css" rel="stylesheet" type="text/css"> -->
	<style> 
	/*	html{
			width: 80%;
		} */
		::-moz-selection{
			background:#cc0000;
			color:#fff;
		}
	</style>
	
<script language="Javascript" type="text/javascript" src="mootools-1.2.1-core-yc.js"></script>
<!--
<script language="Javascript" type="text/javascript" src="prototype.js"></script>
<script language="Javascript" type="text/javascript" src="rico_1.1.2.js"></script>
-->

<script type="text/javascript" src="../edit_area/edit_area_compressor.php?plugins"></script>
<!--<script language="Javascript" type="text/javascript" src="../edit_area/edit_area_compressor.php?plugins"></script>-->
<!--<script language="Javascript" type="text/javascript" src="../edit_area/edit_area_full.gz"></script>-->
<!--<script language="Javascript" type="text/javascript" src="../edit_area/edit_area_full.js"></script>
<script language="Javascript" type="text/javascript" src="../edit_area/edit_area_loader.js"></script>-->
<script type="text/javascript">
	// initialisation
/*	editAreaLoader.init({
            id: "src"    // id of the textarea to transform   
           ,EA_toggle_off_callback: "my_toggle_off"   
           ,EA_unload_callback: "my_EA_unload"
        });
        */

editAreaLoader.init({
			id: "src"	// id of the textarea to transform	
			//,smooth_selection: false
		//	,font_size: "10"	
			,font_family: "verdana,monospace"
			,start_highlight: true	// if start with highlight
			,cursor_position: "begin"
		//	,autocompletion: true
			//,begin_toolbar: "save, |"	// or end_toolbar
		//	,toolbar: "new_document, save, load, |, search, go_to_line, |, undo, redo, |, select_font,|, change_smooth_selection, highlight, reset_highlight, |, help"
			,end_toolbar: "charmap,syntax_selection"
		//	,autocompletion_syntax_allow: "js,php"
		//	,replace_tab_by_spaces: 3
		//	,change_callback: "my_change"
		/*	,load_callback: "my_load"
			,save_callback: "my_save"
		//	
			,submit_callback: "my_submit"*/
			,show_line_colors: true
			,EA_load_callback: "my_EA_load"
			,gecko_spellcheck: false
			,EA_init_callback: "my_EA_init"	// EditArea initiliazed (function name)	
			,EA_toggle_on_callback: "my_toggle_on"	// EditArea destroyed (function name)
		/*	,EA_delete_callback: "my_EA_delete"	// EditArea initiliazed (function name)
			,EA_toggle_off_callback: "my_toggle_off"	// EditArea destroyed (function name)
			,EA_unload_callback: "my_EA_unload"
	*/		,EA_file_switch_on_callback: "my_EA_switch_on"
			,EA_file_switch_off_callback: "my_EA_switch_off"
	//		,EA_file_close_callback: "my_EA_file_close"
		//	,submit_callback: "my_submit"
			,allow_resize: "both" // "both"
			,word_wrap: true
	//		,allow_toggle: true
			,language: "fr"
			,syntax: "php"
		//	,wrap_text: true
		//	,is_editable: false
		//	,is_multi_files: true
			,browsers: "known" 	// "known"
		//	,display: "later" // set to "later" for a later transform or "onload" for a direct transform to EditArea
			,debug: false
			,plugins: "charmap"
			,charmap_default: "arrows"
		//	,syntax_selection_allow: "css,html,js,php,python,vb,xml,c,cpp,basic,pas,brainfuck"
			//,fullscreen: true
			//,EA_load_callback: "test_aaa"
		});

		/*
		Mini load for readonly mode 
		
editAreaLoader.init({
			id: "src"	// id of the textarea to transform	
			,syntax: "ruby"
			,start_highlight: true
			,is_editable: false });
*/	
	//window.onunload=test;
	
	function test_later_init(){
		editAreaLoader.init({
			id: "src"	// id of the textarea to transform	
			//,smooth_selection: false
			//,font_size: "14"	// not for IE
			,start_highlight: true	// if start with highlight
			//,begin_toolbar: "save, |"	// or end_toolbar
			,toolbar: "new_document, save, load, |, search, go_to_line, |, undo, redo, |, select_font,|, change_smooth_selection, highlight, reset_highlight, |, help"
			//,end_toolbar: "*,charmap"
			,load_callback: "my_load"
			,save_callback: "my_save"
			,allow_resize: "none" // "both"
			,allow_toggle: true
			,language: "en"
			,syntax: "js"
			,browsers: "known"
			//,display: "later" // set to "later" for a later transform or "onload" for a direct transform to EditArea
			,debug: true
			//,plugins: "charmap"
			//,charmap_default: "arrows"
			,gecko_spellcheck: false
		});
		
	}	
	/*editAreaLoader.init({
		id: "src2"	// id of the textarea to transform
		,debug: true
		//,smooth_selection: false
		//,font_size: "12"	// not for IE
		,start_highlight: false	// if start with highlight
		//,begin_toolbar: "save, |"	// or end_toolbar
		,toolbar: "new_document, save, load, |, search, go_to_line, |, undo, redo, |, select_font, change_smooth_selection, highlight, reset_highlight, |, help"
		,load_callback: "my_load"
		,save_callback: "my_save"
		,allow_resize: "both"
		//, allow_toggle: false
		,language: "fr"
		,syntax: "php"
		//,display: "later" // set to "later" for a later transform or "onload" for a direct transform to EditArea
	});*/

	function test_aaa(id)
	{
		editAreaLoader.setValue(id, "mouarf");
	}

	function my_EA_load(id){
	
	//	editAreaLoader.setSelectionRange(id, 100, 150);
	/*	alert("load "+id);*/
	/*	window.frames["frame_src"].editArea.open_file({'id': "toto", 'text': 'aaaaaaaaaaa'});
	/*	window.frames["frame_src"].editArea.open_file({'id': "titi", 'text': 'bbbbbb'});
		window.frames["frame_src"].editArea.open_file({'id': "toto", 'text': 'aaaaaaaaaaa'});
		window.frames["frame_src"].editArea.open_file({'id': "toto", 'text': 'aaaaaaaaaaa'});
		window.frames["frame_src"].editArea.open_file({'id': "totoqsssssssssssssssssssssssssss qsd qsd qsd qsd", 'text': 'aaaaaaaaaaa'});
		window.frames["frame_src"].editArea.open_file({'id': "totoqsssssssssssssssssssssssssss qsd qsd qsd qsd", 'text': 'aaaaaaaaaaa'});
		window.frames["frame_src"].editArea.open_file({'id': "totoqsssssssssssssssssssssssssss qsd qsd qsd qsd", 'text': 'aaaaaaaaaaa'});
		window.frames["frame_src"].editArea.open_file({'id': "totoqsssssssssssssssssssssssssss qsd qsd qsd qsd", 'text': 'aaaaaaaaaaa'});
		window.frames["frame_src"].editArea.open_file({'id': "totoqsssssssssssssssssssssssssss qsd qsd qsd qsd", 'text': 'aaaaaaaaaaa'});
		window.frames["frame_src"].editArea.open_file({'id': "totoqsssssssssssssssssssssssssss qsd qsd qsd qsd", 'text': 'aaaaaaaaaaa'});
		window.frames["frame_src"].editArea.open_file({'id': "totoqsssssssssssssssssssssssssss qsd qsd qsd qsd", 'text': 'aaaaaaaaaaa'});
*/		
	}
	
	function my_EA_unload(id){
		//alert("unload "+editAreas[id]);
		//test_getSelectionRange(id)
		
	}
	
	function my_EA_init(id){
	//alert("init "+id);
	}
	function my_EA_delete(id){
		alert("delete "+id);
	}
	function my_toggle_on(id){
	/*	if(editAreaLoader.execCommand('src', 'line_number')==0)
			editAreaLoader.execCommand('src', 'line_number=25;');*/
		//	alert("toggle on "+id);
	}
	function my_toggle_off(id){
		alert("toggle off "+eAs[id].displayed);
	}
	
	function my_EA_switch_on(file_infos)
	{
	//	alert('switch_on: '+file_infos['id']);
		res= '';
		for(var i in file_infos)
			res+=i+': '+file_infos[i]+'\n';
		document.getElementById('src2').value= res;
	}
	
	
	function my_EA_switch_off(file_infos)
	{
		res= '';
		for(var i in file_infos)
			res+=i+': '+file_infos[i]+'\n';
		document.getElementById('src2').value= res;
		
	
	}
	
	function my_EA_file_close(file_infos)
	{
		alert('file close: '+file_infos['id']);
		res= '';
		for(var i in file_infos)
			res+=i+': '+file_infos[i]+'\n';
		document.getElementById('src2').value= res;
		
		return confirm('ok');
	}
	
	function my_submit(id){
		alert(window.frames["frame_"+id].editArea.settings['syntax']);
	}
	
	function my_save(id, content){
		alert("Here is the content of the EditArea '"+ id +"' as received by the save callback function:\n"+content);
	}

	function my_load(id){
		new_value="The content is loaded from the load_callback function into EditArea";
		editAreaLoader.setValue(id, new_value);
	}
	
	function my_change(id){
		//alert(id);
		window.frames["frame_"+ id].editArea.debug.value+="my_change;";
	}
	
	function test_setSelectionRange(id){
		editAreaLoader.setSelectionRange(id, 100, 150);
	}
	
	function test_getSelectionRange(id){
		var sel =editAreaLoader.getSelectionRange(id);
		alert("start: "+sel["start"]+"\nend: "+sel["end"]); 
	}
	
	function test_setSelectedText(id){
		text= "[REPLACED SELECTION]"; 
		editAreaLoader.setSelectedText(id, text);
	}
	
	function test_insertTags(id){
		//text= "[SEL]"+editAreaLoader.getSelectedText(id)+"[/SE\nL]"; 
		editAreaLoader.insertTags(id, "[OPEN]", "[CLOSE]");
	}
	
	function test_getSelectedText(id){
		alert(editAreaLoader.getSelectedText(id)); 
	}
	
	function simulate_ajax(){
		tmp= document.getElementById("src");
		document.getElementById("container").innerHTML= "";
		alert(tmp);
		document.getElementById("container").appendChild(tmp);
	
	//	test_later_init();
	}
	
	function toogle_editable()
	{
		editAreaLoader.execCommand('src', 'set_editable', !editAreaLoader.execCommand('src', 'is_editable'));
	}
	
	function toogle_wrap()
	{
		editAreaLoader.execCommand('src', 'set_word_wrap', !editAreaLoader.execCommand('src', "settings['word_wrap']"));
	}
	
	function increaseWidth()
	{
		document.getElementById('frame_src').style.width= (document.getElementById('frame_src').offsetWidth+1)+"px";
		editAreaLoader.execCommand('src', 'focus');
		editAreaLoader.execCommand('src', 'update_size');
	}
	
	function decreaseWidth()
	{
		document.getElementById('frame_src').style.width= (document.getElementById('frame_src').offsetWidth-1)+"px";
		editAreaLoader.execCommand('src', 'focus');
		editAreaLoader.execCommand('src', 'update_size');
	}
	
	function open_file1()
	{
		var new_file= {id: "to\\ � # � to", text: "aaaaaaaaaaa\n print('toto'); ", title: 'beautiful title', do_highlight: true, syntax: 'php'};
		//editAreaLoader.execCommand('src', 'open_file', new_file);
		editAreaLoader.openFile('src', new_file);
		//alert(editAreaLoader.execCommand('src', 'save_file', file_id)['text']);
	}
	
	function open_file2()
	{
		var new_file= {id: "Filename", text: "aaaaaaaa dsf sdf sdf dsfaaa\n printf('toto'); \necho 'aa';"};
		editAreaLoader.openFile('src', new_file);
		//alert(editAreaLoader.execCommand('src', 'save_file', file_id)['text']);
	}
	
	function close_file1()
	{
		editAreaLoader.closeFile('src', "to\\ � # � to");
	}
	
	function open_many_files()
	{
		var new_file= {id: "tod\\ ddf � # � to", text: "aaaaaaaaaaa", title: 'beautifsdfs dfl title'};
		editAreaLoader.openFile('src', new_file);
		
		var new_file= {id: "tdsf # � to", text: "aaaaaaaaaaa", title: 'beautifsdfs dfl title'};
		editAreaLoader.openFile('src', new_file);
		
		var new_file= {id: "tdsff# � to", text: "aaaaaaaaaaa", title: 'beautifsdffl title'};
		editAreaLoader.openFile('src', new_file);
		
		var new_file= {id: "tdfg� to", text: "aaaaaaaaaaa", title: 'beautifsdffl title'};
		editAreaLoader.openFile('src', new_file);
		
		var new_file= {id: "tdfdsf to", text: "aaaaaaaaaaa", title: 'beautifsdffl title'};
		editAreaLoader.openFile('src', new_file);
		
		var new_file= {id: "azeo", text: "aaaaaaaaaaa", title: 'beautifsdffl title'};
		editAreaLoader.openFile('src', new_file);
		
		var new_file= {id: "ert", text: "aaaaaaaaaaa", title: 'beautifsdffl title'};
		editAreaLoader.openFile('src', new_file);
		
		var new_file= {id: "tyu", text: "aaaaaaaaaaa", title: 'beautsdf dsfe'};
		editAreaLoader.openFile('src', new_file);
		
		var new_file= {id: "qsd", text: "aaaaaaaaaaa", title: 'beautifsdffl title'};
		editAreaLoader.openFile('src', new_file);
		
		var new_file= {id: "dfg", text: "aaaaaaaaaaa", title: 'beautifsdffl title'};
		editAreaLoader.openFile('src', new_file);
		
		var new_file= {id: "gfh", text: "aaaaaaaaaaa", title: 'beautifsdffl title'};
		editAreaLoader.openFile('src', new_file);
		
		var new_file= {id: "hj", text: "aaaaaaaaaaa", title: 'beautsdf dsfe'};
		editAreaLoader.openFile('src', new_file);
	}
	
	var tmp=null;
	function test(){
		var obj= document.getElementById('src2').attributes;
		var res= '';
		for(var i in obj)
			res+=i+': '+obj[i]+'\n';
		document.getElementById('src2').value= res;
	
	/*	if(tmp==null)
			tmp=document.getElementById("src");
		alert(tmp.value);*/
	//	alert(get_css_property(document.getElementById("src"), "font-family"));
	//	alert(window.frames["frame_src"].eA.do_highlight+"\n"+window.frames["frame_src"].editArea.do_highlight);
		//editAreaLoader.execCommand('src', 'execCommand("change_syntax", "css")' )
	/*	alert(editAreaLoader.execCommand('src', 'curr_file'));
		var obj= editAreaLoader.execCommand('src', 'get_file', 'Filename');
		var res= '';
		for(var i in obj)
			res+=i+': '+obj[i]+'\n';
		document.getElementById('src2').value= res;*/
	/*	document.getElementById('src2').value="\n\n****getCurrentFile****\n\n";
		var obj= editAreaLoader.getCurrentFile("src");
		var res= '';
		for(var i in obj)
			res+=i+': '+obj[i]+'\n';
		document.getElementById('src2').value+= res;
		document.getElementById('src2').value+="\n\n****getFile****\n\n";
		var obj= editAreaLoader.getFile("src", "Filename");
		var res= '';
		for(var i in obj)
			res+=i+': '+obj[i]+'\n';
		document.getElementById('src2').value+= res;
		document.getElementById('src2').value+="\n\n****getAllFiles****\n\n";
		var obj= editAreaLoader.getAllFiles("src");
		var res= '';
		for(var i in obj)
			res+=i+': '+obj[i]+'\n';
		document.getElementById('src2').value+= res;*/
	}

</script>
</head>
<body>
<?php
	if(count($_POST)>0)
		printf("<pre style='height: 100px; overflow: auto; border: solid black 1px;'>%s</pre>", print_r($_POST, true));
?>

<h2>Edit area example</h2>
Test with php syntax.<br />
<!--<div style='position: absolute; top: 40px; left: 50px; border: solid red 1px; z-index: 100 '>
<h1>BOUHH</h1>
</div>-->
<form action='' method='post' onsubmit='alert("hah")'>
<!--<iframe src='http://www.google.fr' style='position: fixed;width: 100%;height: 200px' id='iframe_test' ></iframe>-->
<div id="container" stfyle='position: absolute; top: 80px; left: 150px; border: solid red 1px; '>
<textarea id="src" style="height: 350px; width: 913px;" name="toto" enctype="multipart/form-data" onfojcus="this.focused=true;" onbjlur="this.focused=false;" >
<?php
	$val='var simple_object = {
	name: "myname",
};
<a href="toto">
	bouh
</a>
<!-- it s a comment -->';
$tmp ='<?php	
	$authors	= array();
	$news		= array();
	/* this is a long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long comment for showing word-wrap feature */
	$query	= "SELECT author, COUNT(id) as \'nb_news\' FROM news_messages GROUP BY author";
	$result	= mysql_query($query, $DBnews);
< ?php	
	&ecute; &#x92c;&#x93f;&#x930;&#x92f;&#x93e;&#x928;&#x940;
	//Thanks to TinyMCE developpers!
	
	$authors= array();
	$news= array();
	$query="SELECT author, COUNT(id) as \'nb_news\' FROM news_messages GROUP BY author";
	$result=mysql_query($query, $DBnews);
	while($line = mysql_fetch_assoc($result)){
		$authors[$line["author"]]= $line["author"];
		$news[$line["author"]]=$line[\'nb_news\'];
	}
	
	$list= sprintf("(\'%s\')", implode("\', \'", $authors));
';
$val2='	
	
	$query="SELECT p.people_id, p.name, p.fname, p.status, team_name, t.leader_id=p.people_id as \'team_leader\', w.name as \'wp_name\', w.type
			FROM people p, teams t, wppartis wp, wps w
			WHERE p.people_id IN $list AND p.org_id=t.team_id AND wp.team_id=t.team_id AND wp.wp_id=w.wp_id 
			GROUP BY p.people_id";
	if(isset($_GET["order"]) && $_GET["order"]!="nb_news")
		$query.=" ORDER BY ".$_GET["order"];
		
	$result=mysql_query($query, $DBkal);
	while($line = mysql_fetch_assoc($result)){
		printf("<tr><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td></tr>", $line["name"], $line["fname"],
			$news[$line["people_id"]], $line["status"], $line["team_name"], ($line["team_leader"]=="1")?"yes":"no", $line["type"], $line["wp_name"]);
	
	}
	printf("</table>");
	
	print("toto");
	array_merge();

? >
';


for($i=0; $i<1; $i++)
	echo $val;
?>
</textarea>
</div>
<br style='clear: both' />
<!--
<div id="test_pre" style="white-space: pre;">
	<?=htmlspecialchars($val);?>
</div>-->
<input type='button' onclick='alert(editAreaLoader.getValue("src"));' value='get value' />
<input type='button' onclick='editAreaLoader.setValue("src", "bouh");' value='set value' />
<input type='button' onclick='test_getSelectionRange("src");' value='getSelectionRange' />
<input type='button' onclick='test_setSelectionRange("src");' value='setSelectionRange' />
<input type='button' onclick='test_getSelectedText("src");' value='getSelectedText' />
<input type='button' onclick='test_setSelectedText("src");' value='setSelectedText' />
<input type='button' onclick='test_insertTags("src");' value='insertTags' />
<input type='button' onclick='test_later_init()' value='test later init' />
<input type='button' onclick='editAreaLoader.hide("src")' value='hide' />
<input type='button' onclick='editAreaLoader.show("src")' value='show' />
<input type='submit' name='save' value="submit" />
<input type='reset' name='reset' value="reset" />
<input type='button' onclick='test()' value='test' />
<input type='button' onclick='editAreaLoader.delete_instance("src")' value='delete' />
<input type='button' onclick='simulate_ajax()' value='simulate ajax' />
<input type='button' onclick='open_file1()' value='open file 1' />
<input type='button' onclick='open_file2()' value='open file 2' />
<input type='button' onclick='close_file1()' value='close file 1' />
<input type='button' onclick='open_many_files()' value='open many files' />
<input type='button' onclick='toogle_editable()' value='toogle editable' />
<input type='button' onclick='toogle_wrap()' value='toogle wrap' />
<input type='button' onclick='increaseWidth()' value='w++' />
<input type='button' onclick='decreaseWidth()' value='w--' />
<input type='button' onclick='console.log(window.frames["frame_src"].editArea)' value='firbug Log editArea' />
<br />
<textarea id='src2' style="height: 250px; width: 650px" name="titi" _onafterpaste='alert("paste")' _oninput='alert("input")' >
	bouh
</textarea>
</form>
<a href="http://www.google.fr">external link</a>
</body>
</html>
