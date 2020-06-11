var x = 1;
var xstring = localStorage.getItem('x'); 		//USED as a 'tally' of how many objects are currently saved
var numbered = true;
var filestringtosave = "" 
var filename = "noname";

window.onload = function(){
const darkbutton = document.getElementById("dark");
const lightbutton = document.getElementById("light");
const solarbutton = document.getElementById("solar");
const body = document.body;
const theme = localStorage.getItem('theme');
const isSolar = localStorage.getItem('isSolar');
const unorderedbutton = document.getElementById("unordered");
const numberedbutton = document.getElementById("numbered");
const ordered = localStorage.getItem('unordered');
const savebutton = document.getElementById('savebutton');
const changebutton = document.getElementById('changename');
const loadedfilename = localStorage.getItem('filename');
if(loadedfilename == null){
	filestringtosave += filename;
}
else{
	filename = loadedfilename;
	filestringtosave += filename;
}

unorderedbutton.onclick = () =>{
	numbered = false;
	localStorage.setItem('unordered',true);
};

numberedbutton.onclick = () =>{
	numbered = true;
	localStorage.removeItem('unordered');
}
if(ordered){
	numbered = false;
}

if(theme){
	body.classList.add(theme);
	isSolar && body.classList
}
var textinput = document.getElementById("listitem");
textinput.addEventListener('keydown',function(event){
	if(event.key== 'Enter'){
		add(); 
	}
	else if(event.keyCode == 46){ //When delete is pressed remove()
		remove();
	}
	else{
		console.log("Non enter key pressed");
	}
});
darkbutton.onclick = () =>{
	body.classList.replace('light','dark');
	localStorage.setItem('theme','dark');
	
};

lightbutton.onclick = () =>{
	body.classList.replace('dark','light');
	localStorage.setItem('theme','light');
};

solarbutton.onclick = () =>{
	if(body.classList.contains('solar')){
		body.classList.remove('solar');
		solarbutton.style.cssText = ' --bg-solar: var(--yellow);'
		
		solarbutton.innerText = 'solarize';
		localStorage.removeItem('isSolar');
	}
	else{
		solarbutton.style.cssText = ' --bg-solar: white;'
		
		body.classList.add('solar');
		localStorage.setItem('isSolar',true);
	}
	
};
savebutton.onclick = () =>{
	download(filename + ".txt",filestringtosave);
};
changebutton.onclick = () =>{
	filename = prompt("Enter filename");
	localStorage.setItem('filename',filename);
	location.reload();
};

	//Grab and load list items from local storage
	var parent = document.getElementById("list");
	var itemstoload = localStorage.getItem('x').length - 1;
	for(var v = 1; v < itemstoload;v++){
		var key = 'listitem' + v;
		var loadedlistitem = JSON.parse(localStorage.getItem(key));
		var loadedstring = loadedlistitem.value;
		var list = document.createElement("p");
		if(numbered){
		var loadedstringitem = "\r\n" + x + "- " + loadedstring + "\r\n";
		}
		else{
			var loadedstringitem = "\r\n" + "- " + loadedstring + "\r\n";
		}
		list.textContent += loadedstringitem;
		filestringtosave += loadedstringitem;
		parent.appendChild(list);
		console.log("SUCCESS!");
		x++;
	}
}
//Add new item to list and local storage
function add(){
	var parent = document.getElementById("list");
	var list = document.createElement("p");
	var listitem = document.getElementById("listitem").value;
	if(numbered){
	var stringItem = "\r\n" + x + "- " + listitem + "\r\n";
	}
	else{
		var stringItem = "\r\n" + "- " + listitem + "\r\n";
	}
	list.textContent += stringItem;
	filestringtosave += stringItem;
	var keyname = 'listitem'+x;
	localStorage.setItem(keyname,JSON.stringify({value: listitem}));
	parent.appendChild(list);
	document.getElementById("listitem").value = "";
	x++;
	xstring = xstring + "1"; //adds tally to xstring
	console.log("success!");
}
//remove item from list and local storage
function remove(){
	var parent = document.getElementById("list");
	var child = parent.lastChild;
	filestringtosave = filestringtosave.replace(child.textContent,"");
	parent.removeChild(child);
	var key = 'listitem' +x;
	localStorage.removeItem(key);
	xstring = xstring.slice(1); //removes tally from xstring
	x--;
}
//save xstring upon exit
function save(){
	localStorage.setItem('x',xstring);
}
function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}


