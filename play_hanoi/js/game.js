let DISK_NUM = 5;
const WIDTH = 200;
const WIDTH_ADD = 100;
const HEIGHT = 10;
const HEIGHT_ADD = 4;
const SOLVE_SPEED = 500;

const PILLAR_NAME = ["L", "M", "R"];

let SolveArray = [];
let SolveInterval;

let Pillars = [[],[],[]];
let Selected = "";

$(window).ready(Init);

function Init()
{
	clearInterval(SolveInterval);
	Pillars = [[],[],[]]; Selected = "";
	$(".disk").remove();
	$("#log ul li").remove();
	$(".board td").css("background-color", "#fff");
	for(var i = DISK_NUM - 1; i >= 0; i--)
	{
		var newDisk = document.createElement("div");
		$(newDisk).attr("rel", i);
		$(newDisk).attr("class", "disk");
		$(newDisk).css("width", (WIDTH + (i * WIDTH_ADD) + "%"));
		$(newDisk).css("left", (-55 - (i * WIDTH_ADD / 2) + "%"));
		$(newDisk).css("bottom", (-1 + ((Pillars[0].length) * (HEIGHT + HEIGHT_ADD)) + "px"));
		Pillars[0].push(i);
		$(".board tr td .pillar")[0].appendChild(newDisk);
	}
}

$(window).on('keydown', function(e) {
	switch(e.key)
	{
		case "q":
		case "Q":
		case "7":
			areaClick(0);
			break;
		case "w":
		case "W":
		case "8":
			areaClick(1);
			break;
		case "e":
		case "E":
		case "9":
			areaClick(2);
			break;
		case " ":
			Solver();
			break;
		case "r":
		case "R":
			Init();
			break;
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
			DISK_NUM = parseInt(e.key);
			Init();
			break;
		default:
			console.log(e.key);
			break;
	}
});

function areaClick(num, auto = false)
{
	if( auto == false ) clearInterval(SolveInterval);
	if(Selected === "")
	{
		Selected = Pillars[num].pop();
		if( Selected == undefined) {
			Selected = "";
			return;
		}
		$(".disk[rel="+Selected+"]").css("bottom", "250px");
		$(".board td").each(function(key) {
			if( Pillars[key][Pillars[key].length - 1] < Selected )
			{
				$(this).css("background-color", "#fcc");
			}
			else
			{
				$(this).css("background-color", "#cfc");
			}
		});
		log = document.createElement("li");
		$(log).html(PILLAR_NAME[num]);
		$(log).on('mouseover', function() { $(this).css("color", "rgb(255,0,0,1)"); });
		$(log).on('mouseout', function() { $(this).css("color", "rgb(0,0,0,1)"); });
		$(log).on('mousedown', function() { $(this).css("color", "rgb(196,0,1)"); });
		$(log).on('click', function() { $(this).remove(); });
		$("#log ul").append(log);
	}
	else
	{
		if( Pillars[num].length == 0 || Pillars[num][Pillars[num].length - 1] > Selected )
		{
			$(".disk[rel="+Selected+"]").appendTo($(".pillar")[num]);
			$(".disk[rel="+Selected+"]").css("bottom", (-1 + ((Pillars[num].length) * (HEIGHT + HEIGHT_ADD)) + "px"));
			Pillars[num].push(Selected);
			Selected = "";
			$(".board td").each(function(key) {
				$(this).css("background-color", "#fff");
			});
			$("#log ul li:last-child").append(" => "+PILLAR_NAME[num]);
		}
	}
}

function findPillar(num)
{
	var pillarNum = -1;
	for(var i = 0; i < 3; i++)
		if( pillarNum == -1 && Pillars[i].includes(num-1) ) pillarNum = i;
	return pillarNum;
}

function Solver()
{
	clearInterval(SolveInterval);
	SolveArray = [];

	let tempPillar = JSON.parse(JSON.stringify(Pillars));
	HanoiSolve(DISK_NUM, 2);
	Pillars = tempPillar;
	SolveInterval = setInterval(AutoMove, SOLVE_SPEED);
}

function HanoiSolve(pillar, next)
{
	if(pillar > 1)
	{
		var from = findPillar(pillar);
		var pass = 3 - (from + next);

		if(from != next)
		{
			HanoiSolve(pillar-1, pass);
			disk = Pillars[from].pop()
			Pillars[next].push(disk);
			SolveArray.push(from);
			SolveArray.push(next);
		}
		HanoiSolve(pillar-1, next);
	}
	else
	{
		var from = findPillar(pillar);

		if(from != next)
		{
			disk = Pillars[from].pop()
			Pillars[next].push(disk);
			SolveArray.push(from);
			SolveArray.push(next);
		}
	}
}

function AutoMove()
{
	if( SolveArray.length == 0 )
	{
		clearInterval(SolveInterval);
		return;
	}

	areaClick(SolveArray.shift(), true);
}