//---------------Побудова слайдера, кнопок, та авто перелистування---------------
let btns = document.getElementsByClassName('slider-btn');
if(btns[0])
{
	btns[0].onclick = change_img_left;
	btns[1].onclick = change_img_right;
}

let imgs = document.getElementsByClassName('slider-img');
let slider_interval;
let active_img_id = 0;
if(imgs.length > 0)
{
	imgs[0].style.opacity = 1;
	slider_interval = setInterval(function(){change_img_right();}, 4000);
}

function change_img_left()
{
	imgs[active_img_id].style.opacity = 0;
	active_img_id = (active_img_id - 1 + imgs.length)%imgs.length;
	imgs[active_img_id].style.opacity = 1;
	clearInterval(slider_interval);
	slider_interval = setInterval(function(){change_img_right();}, 4000);
}	

function change_img_right()
{
	imgs[active_img_id].style.opacity = 0;
	active_img_id = (active_img_id + 1)%imgs.length;
	imgs[active_img_id].style.opacity = 1;
	clearInterval(slider_interval);
	slider_interval = setInterval(function(){change_img_right();}, 4000);
}

let slider = document.getElementsByClassName('slider');
if(slider.length > 0)
{
	slider[0].onmouseover = function(){
		document.getElementsByClassName('slider-navigation')[0].style.opacity = 1;};
	slider[0].onmouseout = function(){
		document.getElementsByClassName('slider-navigation')[0].style.opacity = 0.3;};
	let ddd = document.createElement('div');
	ddd.style.backgroundImage = "linear-gradient(90deg, rgba(0, 0 , 0, 0), #BCD9FF, rgba(0, 0 , 0, 0))";
	ddd.style.height = "400px";
	ddd.style.position = "absolute";
	ddd.classList.add("center");
	ddd.style.width = "200%";
	ddd.style.zIndex = -1;
	slider[0].appendChild(ddd);
}

//---------------Побудова кругів на фоні слайдера---------------
function get_random(min, max)
{
	return Math.random() * (max - min) + min;
}

function create_krugs()
{
	if(slider.length > 0)
		for(k = 100; k >= 0; k--)
		{
			let krug = document.createElement('div');
			krug.classList.add('krug');
			krug.style.width = get_random(60, 250) + "px";
			krug.style.height = krug.style.width;
			krug.style.opacity = "0.7";
			krug.style.zIndex = -2;
			krug.style.position = "absolute";
			krug.style.top = get_random(-50, 450) + "px";
			krug.style.left = get_random(-50, parseInt(window.screen.width)+50) + "px";
			krug.style.borderRadius = "50%";
			slider[0].appendChild(krug);
		}
}

window.onload = function(){
	create_krugs();
	let colors_arr = ["#6DAAE7", "#7F3EE7", "#9FBFE7", "#E797DF", "#00D8E7", "#B1E7D2", "#E7DE90"];
	let crugs = document.getElementsByClassName('krug'); 
	for(i = 0; i < crugs.length; i++)
	{
		crugs[i].style.backgroundColor = colors_arr[parseInt(get_random(0, colors_arr.length-1))];
	}
};

//---------------Побудова лівого меню та підмерню а також зміна шляху---------------
let path = document.getElementsByClassName('direction-text')[0];
function change_path(str1, str2)
{
	let path_arr = path.textContent.split(" / ");
	path_arr[path_arr.length - 2] = str1;
	path_arr[path_arr.length - 1] = str2;
	path.textContent = '';
	for(i = 0; i < path_arr.length - 1; i++)
	{
		path.textContent += path_arr[i] + " / ";
	}
	path.textContent += path_arr[path_arr.length - 1];
}

let menus = document.getElementsByClassName('left-submenu');
let menu_before;
for(i = 0; i < menus.length; i++)
{
	menus[i].parentElement.onclick = function(){
								change_display(menu_before);
								change_display(this);
								menu_before = this;};
	for(j = 0; j < menus[i].childNodes.length; j++)
	{
		menus[i].childNodes[j].onclick = function(){
		if(path)change_path(this.parentElement.parentElement.innerText.split("\n")[0], this.textContent);
		}
	}	
}

function change_display(menu_obj)
{
	if(menu_obj)
	{
		let obj = menu_obj.childNodes[1];
		obj.style.display == "block"?obj.style.display = "none":obj.style.display = "block";
	}
}

//---------------Побудова слайдера з товарами та кнопок знизу---------------
let tov = document.getElementsByClassName('tovars')[0];
function slide_tovars(i)
{
	let height_len = i*(-tov.parentElement.clientHeight - 20)
	tov.style.top = height_len + 'px';
}

let tov_id = 0;
function creat_tovars_btns()
{
	let count_of_btns = document.getElementsByClassName('tovar').length;
	if(count_of_btns > 0)
	{
		if(count_of_btns%6 === 0)
		count_of_btns = parseInt(count_of_btns/6);
		else
		{
			count_of_btns = parseInt(count_of_btns/6);
			count_of_btns++;
		}
		let conteiner = document.getElementsByClassName('tovars-navigation')[0];
		for(i = 0; i < count_of_btns; i++)
		{
			let btn = document.createElement('div');
			btn.innerHTML = i+1;
			btn.classList.add('tovars-navigation-btn');
			btn.onclick = function(){
					clear_style(tov_id);
					tov_id = parseInt(this.textContent) - 1;
					change_style(tov_id);
					slide_tovars(tov_id)};
			conteiner.appendChild(btn);
		}
	}
}
	
creat_tovars_btns();
let navigations = document.getElementsByClassName('tovars-navigation-btn');
if(navigations.length > 0)change_style(tov_id);
function change_style(i)
{
	navigations[i].classList.add('middle-text');
}
function clear_style(i)
{
 	navigations[i].classList.remove('middle-text');
}

//---------------ФОрма зворотнього звязку-----------------
let popup = document.getElementsByClassName('popup')[0];
document.getElementsByClassName('popup-close')[0].onclick = function(){
					clear_values();
					popup.style.opacity = 0;
					popup.style.zIndex = -1;};
document.getElementById('feedback').onclick = function(){
					popup.style.opacity = 1;
					popup.style.zIndex = 2;};
function warning(object)
{
	object.style.border = "1px solid #FF8383";
	object.style.boxShadow = "inset 0 0 10px #FF8383";
	object.style.color = "#FF8383";
	object.placeholder = "Це поле обов'язкове!";
}

function check_inp(object)
{
	if(object.value == '')
	{
		warning(object);
		return true;
	}
	return false;
}

function clear_values()
{
	let ids = ["Name", "Telephone", "Email", "Message"];
	for(i = 0; i < 4; i++)
	{
		let x =document.getElementById(ids[i]);
		x.style.color = "#000";
		x.value = "";
		x.style.border = "";
		x.style.boxShadow = "";
		x.placeholder = "";
	}
}

document.getElementById('feedback-btn').onclick = function(){
	let ids = ["Name", "Telephone", "Email"];
	let k = 0
	for(i = 0; i < 3; i++)
	{
		if(!check_inp(document.getElementById(ids[i])))
		{
			k++;
		}
	}
	if(k == 3)
	{
		this.parentElement.submit();
		clear_values();
		popup.style.opacity = 0;
		popup.style.zIndex = -1;
	}
};
