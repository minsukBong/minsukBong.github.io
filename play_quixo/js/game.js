const MOC = "#ff8";	// MOUSE OVER COLOR
const MDC = "#fc4";	// MOUSE DOWN COLOR
const VCC = "#cfc";	// VALID CELL COLOR
const XMAX = 7;
const YMAX = 7;
const XEDGE = XMAX - 1;
const YEDGE = YMAX - 1;

let turn = "O";

let field = [[],[],[],[],[],[],[]];
let curX = -1;
let curY = -1;

$(window).ready(Init);

function Init()
{
    for(var y = 0; y < YMAX; y++)
    {
        var row = document.createElement("tr");
        for(var x = 0; x < XMAX; x++) 
        {
            var col = document.createElement("td");
			if((y == 0 || y == YEDGE) && (x == 0 || x == XEDGE))
			{
				$(col).attr("type", "blank");
				$(col).css("background-color", "#840");
			}
			else
			{
				if(y == 0 || y == YEDGE || x == 0 || x == XEDGE)
				{
					$(col).attr("type", "edge");
					$(col).css("background-color", "#864");
				}
				else
				{
					$(col).attr("type", "field");
				}

				$(col).attr("x", x);
				$(col).attr("y", y);

			}
            field[y][x] = "";
            $(row).append(col);
        }
        $(".board").append(row);
    }
    ChangePhase(1);
}

function setClickable(item, onMouseUp)
{
	$(item).css("background-color", VCC);
	$(item).css("cursor", "pointer");
	$(item).on('mouseover', function() {
		$(this).css("background-color", MOC);
	});
	$(item).on('mouseout', function() {
		$(this).css("background-color", VCC);
	});
	$(item).on('mousedown', function(e) {
		if(e.buttons != 1) return;
		$(this).css("background-color", MDC);
	});
	$(item).on('mouseup', onMouseUp);
}

function ClearBoard()
{
	for(var y = 0; y <= YEDGE; y++)
	{
		for(var x = 0; x <= XEDGE; x++)
		{
			if(y != 0 && y != YEDGE && x != 0 && x != XEDGE) continue;
			field[y][x] = "";
		}
	}
	$("td[type=edge]").text("");
	$("td[type=edge]").css("background-color", "#864");
	$("td[type=edge]").css("cursor", "default");
	$("td[type=edge]").unbind("mouseover");
	$("td[type=edge]").unbind("mouseout");
	$("td[type=edge]").unbind("mousedown");
	$("td[type=edge]").unbind("mouseup");
	$("td[type=field]").text("");
	$("td[type=field]").removeClass("O");
	$("td[type=field]").removeClass("X");
	$("td[type=field]").css("background-color", "#fff");
	$("td[type=field]").css("cursor", "default");
	$("td[type=field]").unbind("mouseover");
	$("td[type=field]").unbind("mouseout");
	$("td[type=field]").unbind("mousedown");
	$("td[type=field]").unbind("mouseup");
}

function DrawBoard()
{
	$("td[type=edge]").each(function() {
		var x = $(this).attr("x");
		var y = $(this).attr("y");
		$(this).text(field[y][x]);
	});
	$("td[type=field]").each(function() {
		var x = $(this).attr("x");
		var y = $(this).attr("y");
		$(this).addClass(field[y][x]);
	});
}

function MoveBoard(value)
{
    switch(value)
    {
        case "D":
            for(var y = parseInt(curY); y > 1; y--)
            {
                field[y][curX] = field[y-1][curX];
            }
            field[1][curX] = turn;
            break;
        case "U":
            for(var y = parseInt(curY); y < 5; y++)
            {
                field[y][curX] = field[y+1][curX];
            }
            field[5][curX] = turn;
            break;
        case "R":
            for(var x = parseInt(curX); x > 1; x--)
            {
                field[curY][x] = field[curY][x-1];
            }
            field[curY][1] = turn;
            break;
        case "L":
            for(var x = parseInt(curX); x < 5; x++)
            {
                field[curY][x] = field[curY][x+1];
            }
            field[curY][5] = turn;
            break;
    }
    CheckWinner();
}

function CheckWinner()
{
    for(var i = 1; i < 6; i++)
    {
        if( field[1][i] != "" &&
            field[1][i] == field[2][i] &&
            field[1][i] == field[3][i] &&
            field[1][i] == field[4][i] &&
            field[1][i] == field[5][i])
            {
				turn = field[1][i];
                ChangePhase(0);
                return;
            }
        if( field[i][1] != "" &&
            field[i][1] == field[i][2] &&
            field[i][1] == field[i][3] &&
            field[i][1] == field[i][4] &&
            field[i][1] == field[i][5])
            {
				turn = field[i][1];
                ChangePhase(0);
                return;
            }
    }
    if(field[1][1] != "" &&
    field[1][1] == field[2][2] &&
    field[1][1] == field[3][3] &&
    field[1][1] == field[4][4] &&
    field[1][1] == field[5][5])
    {
		turn = field[1][1];
        ChangePhase(0);
        return;
    }
    if(field[1][5] != "" &&
    field[1][5] == field[2][4] &&
    field[1][5] == field[3][3] &&
    field[1][5] == field[4][2] &&
    field[1][5] == field[5][1])
    {
		turn = field[1][5];
        ChangePhase(0);
        return;
    }
	turn = ( turn == "O" ) ? "X" : "O";
    ChangePhase(1);
}

function ChangePhase(phase)
{
    ClearBoard();
    DrawBoard();
    switch(phase)
    {
        case 0:
            $(".notice").html(turn+"의 승리입니다! 축하합니다!<br>F5를 눌러 다시 시작하세요");
            break;
        case 1:
            var validField = $("td[type=field][x=1], td[type=field][y=1], td[type=field][x="+(XEDGE-1)+"], td[type=field][y="+(YEDGE-1)+"]");

            if( validField.length == 0 )
            {
                $(".notice").html("무승부입니다<br>F5를 눌러 다시 시작하세요");
            }
            validField.each(function() {
                opTurn = ( turn == "O" ) ? "X" : "O";
                if(!$(this).hasClass(opTurn)) {
                    setClickable(this, function(e) {
                        if(e.button != 0) return;

                        $(this).css("background-color", MOC);
                        curX = $(this).attr("x");
                        curY = $(this).attr("y");
                        ChangePhase(2);
                    });
                }
            });
            $(".notice").html(turn+" 플레이어의 차례입니다<br>빈칸 하나를 선택해주세요");
            break;
        case 2:
            $("td[type=field][x="+curX+"][y="+curY+"]").css("background-color", MDC);

            $("td[type=edge]").each(function() {
                var x = $(this).attr("x");
                var y = $(this).attr("y");
                
                if((x == curX || y == curY) && (Math.abs(curX - x) > 1 || Math.abs(curY - y) > 1))
                {
                    if(y == 0)      { $(this).text("↓"); $(this).attr("value", "D");  }
                    if(y == YEDGE)  { $(this).text("↑"); $(this).attr("value", "U"); }
                    if(x == 0)      { $(this).text("→"); $(this).attr("value", "R");  }
                    if(x == XEDGE)  { $(this).text("←"); $(this).attr("value", "L"); }

                    setClickable(this, function(e) {
                        if(e.button != 0) return;

                        $(this).css("background-color", MOC);
                        MoveBoard($(this).attr("value"));
                    });
                }
            });
            $(".notice").html(turn+"을 채울 방향을 선택해주세요");
            break;
    }
}