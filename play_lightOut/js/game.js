let curSize = 3;

function GetRandom(min = 0, max = 1)
{
    return Math.round(Math.random() * max + min);
}

function Init(size)
{
    curSize = size;
    $("table").html("");
    $("ul").html("");
    for(var y = 0; y < size; y++)
    {
        var el_tr = document.createElement("tr");
        for(var x = 0; x < size; x++)
        {
            var el_td = document.createElement("td");
            $(el_td).attr('x', x);
            $(el_td).attr('y', y);
            $(el_td).attr('curValue', '1');
            $(el_td).attr('lastValue', '1');
            $(el_td).on('click', function() {
                Reverse($(this).attr('x'), $(this).attr('y'));
                Render();
                CheckEnd();
            });
            $(el_td).text((y * size) + x + 1);

            $(el_tr).append(el_td);
        }
        $("table").append(el_tr);
    }

    $("td").each(function() {
        var rnd = GetRandom();
        if( rnd )
        {
            Reverse($(this).attr('x'), $(this).attr('y'));
        }
    });
    Render();
}

function CheckEnd()
{
    var check = true;
    $("td").each(function() {
        if($(this).attr("curValue") == 0)
        {
            check = false;
        }
    });
    if(check)
    {
        $("td").unbind("click");
        var list = document.createElement("li");
        $(list).text("Solved!");
        $("ul").append(list);
    }
}

function Render()
{
    $("td").each(function() {
        if( $(this).attr('lastValue') != $(this).attr('curValue') )
        {
            $(this).css("animation-name", ( $(this).attr('curValue') == '1' ) ? "btow" : "wtob");
            $(this).attr('lastValue', $(this).attr('curValue'));
        }
    });
}

function Reverse(x, y)
{
    $("td").each(function() {
        var curx = $(this).attr('x');
        var cury = $(this).attr('y');
        if( ( -1 <= x - curx && x - curx <= 1 ) && 
            ( -1 <= y - cury && y - cury <= 1 ) &&
            (curx == x || cury == y) )
        {
            $(this).attr('curValue', ( $(this).attr('curValue') == '1' ) ? '0' : '1');
        }
    });
}

let solveCells = [];
let solveArray = [];
function SolveReverse(x, y)
{
    for(var cury = y - 1; cury <= y + 1; cury++)
    {
        for(var curx = x - 1; curx <= x + 1; curx++)
        {
            if( ( 0 <= curx && curx <= curSize-1 ) && 
                ( 0 <= cury && cury <= curSize-1 ) &&
                (curx == x || cury == y) )
            {
                solveCells[(cury * curSize) + curx] = ( solveCells[(cury * curSize) + curx] ) ? 0 : 1;
            }
        }
    }
}

function Solve3()
{
    $("ul").html("");
    solveCells = [];
    solveArray = [];
    $("td").each(function() {
        solveCells[( parseInt($(this).attr('y')) * curSize ) + parseInt($(this).attr('x'))] = parseInt( $(this).attr('curValue') );
    });
    for(var y = 0; y < 2; y++)
    {
        for(var x = 0; x < 3; x++)
        {
            if(solveCells[(y * curSize) + x] == 0)
            {
                solveArray.push(((y + 1) * curSize) + x);
                SolveReverse(x, y + 1);
            }
        }
    }
    if(solveCells[6] == 0)
    {
        solveArray.push(0,1,5,6,8);
    }
    if(solveCells[7] == 0)
    {
        solveArray.push(0,1,2,4);
    }
    if(solveCells[8] == 0)
    {
        solveArray.push(1,2,3,6,8);
    }

    var optimize = [];
    for(var i = 0; i < solveArray.length; i++)
    {
        if(optimize[solveArray[i]] > -1)
        {
            solveArray[optimize[solveArray[i]]] = -1;
            optimize[solveArray[i]] = -1;
            solveArray[i] = -1;
        }
        else
        {
            optimize[solveArray[i]] = i;
        }
    }
    for(var i = 0; i < solveArray.length; i++)
    {
        if(solveArray[i] == -1)
        {
            solveArray.splice(i, 1);
            i--;
        }
        else
        {
            solveArray[i]++;
        }
    }
    solveArray.sort();
    for(var i = 0; i < solveArray.length; i++)
    {
        var list = document.createElement("li");
        $(list).text(solveArray[i]);
        $("ul").append(list);
    }
}

function Solve4()
{
    $("ul").html("");
    solveCells = [];
    solveArray = [];
    $("td").each(function() {
        solveCells[( parseInt($(this).attr('y')) * curSize ) + parseInt($(this).attr('x'))] = parseInt( $(this).attr('curValue') );
    });
    for(var y = 0; y < 3; y++)
    {
        for(var x = 0; x < 4; x++)
        {
            if(solveCells[(y * curSize) + x] == 0)
            {
                solveArray.push(((y + 1) * curSize) + x);
                SolveReverse(x, y + 1);
            }
        }
    }
    for(var i = 0; i < solveArray.length; i++)
    {
        var list = document.createElement("li");
        $(list).text(solveArray[i]+1);
        $("ul").append(list);
    }
}

function Solve5()
{
    $("ul").html("");
    solveCells = [];
    solveArray = [];
    $("td").each(function() {
        solveCells[( parseInt($(this).attr('y')) * curSize ) + parseInt($(this).attr('x'))] = parseInt( $(this).attr('curValue') );
    });
    for(var y = 0; y < 4; y++)
    {
        for(var x = 0; x < 5; x++)
        {
            if(solveCells[(y * curSize) + x] == 0)
            {
                solveArray.push(((y + 1) * curSize) + x);
                SolveReverse(x, y + 1);
            }
        }
    }
    if(solveCells[20] == 0 && solveCells[21] == 0 && solveCells[23] == 0 && solveCells[24] == 0)
    {
        solveArray.push(2);
        SolveReverse(2, 0);
        for(var y = 0; y < 4; y++)
        {
            for(var x = 0; x < 5; x++)
            {
                if(solveCells[(y * curSize) + x] == 0)
                {
                    solveArray.push(((y + 1) * curSize) + x);
                    SolveReverse(x, y + 1);
                }
            }
        }
    }
    if( (solveCells[20] == 0 && solveCells[21] == 0 && solveCells[23] == 0) ||
        (solveCells[21] == 0 && solveCells[23] == 0 && solveCells[24] == 0))
    {
        solveArray.push(4);
        SolveReverse(4, 0);
        for(var y = 0; y < 4; y++)
        {
            for(var x = 0; x < 5; x++)
            {
                if(solveCells[(y * curSize) + x] == 0)
                {
                    solveArray.push(((y + 1) * curSize) + x);
                    SolveReverse(x, y + 1);
                }
            }
        }
    }
    if( (solveCells[20] == 0 && solveCells[22] == 0 && solveCells[23] == 0) ||
        (solveCells[21] == 0 && solveCells[22] == 0 && solveCells[24] == 0))
    {
        solveArray.push(0);
        SolveReverse(0, 0);
        for(var y = 0; y < 4; y++)
        {
            for(var x = 0; x < 5; x++)
            {
                if(solveCells[(y * curSize) + x] == 0)
                {
                    solveArray.push(((y + 1) * curSize) + x);
                    SolveReverse(x, y + 1);
                }
            }
        }
    }
    if(solveCells[20] == 0 && solveCells[21] == 0 && solveCells[22] == 0)
    {
        solveArray.push(1);
        SolveReverse(1, 0);
        for(var y = 0; y < 4; y++)
        {
            for(var x = 0; x < 5; x++)
            {
                if(solveCells[(y * curSize) + x] == 0)
                {
                    solveArray.push(((y + 1) * curSize) + x);
                    SolveReverse(x, y + 1);
                }
            }
        }
    }
    if(solveCells[22] == 0 && solveCells[23] == 0 && solveCells[24] == 0)
    {
        solveArray.push(3);
        SolveReverse(3, 0);
        for(var y = 0; y < 4; y++)
        {
            for(var x = 0; x < 5; x++)
            {
                if(solveCells[(y * curSize) + x] == 0)
                {
                    solveArray.push(((y + 1) * curSize) + x);
                    SolveReverse(x, y + 1);
                }
            }
        }
    }
    if(solveCells[21] == 0 && solveCells[23] == 0)
    {
        solveArray.push(0,1,2);
        SolveReverse(0, 0); SolveReverse(1, 0); SolveReverse(2, 0);
        for(var y = 0; y < 4; y++)
        {
            for(var x = 0; x < 5; x++)
            {
                if(solveCells[(y * curSize) + x] == 0)
                {
                    solveArray.push(((y + 1) * curSize) + x);
                    SolveReverse(x, y + 1);
                }
            }
        }
    }
    if(solveCells[20] == 0 && solveCells[24] == 0)
    {
        solveArray.push(0,1);
        SolveReverse(0, 0); SolveReverse(1, 0);
        for(var y = 0; y < 4; y++)
        {
            for(var x = 0; x < 5; x++)
            {
                if(solveCells[(y * curSize) + x] == 0)
                {
                    solveArray.push(((y + 1) * curSize) + x);
                    SolveReverse(x, y + 1);
                }
            }
        }
    }

    var optimize = [];
    for(var i = 0; i < solveArray.length; i++)
    {
        if(optimize[solveArray[i]] > -1)
        {
            solveArray[optimize[solveArray[i]]] = -1;
            optimize[solveArray[i]] = -1;
            solveArray[i] = -1;
        }
        else
        {
            optimize[solveArray[i]] = i;
        }
    }
    for(var i = 0; i < solveArray.length; i++)
    {
        if(solveArray[i] == -1)
        {
            solveArray.splice(i, 1);
            i--;
        }
        else
        {
            solveArray[i]++;
        }
    }
    solveArray.sort(function(a, b) { return parseInt(a) - parseInt(b); });
    for(var i = 0; i < solveArray.length; i++)
    {
        var list = document.createElement("li");
        $(list).text(solveArray[i]);
        $("ul").append(list);
    }
}

$("[id^=cell]").on('click', function() {
    switch($(this).val())
    {
        default:
        case "3x3":
            Init(3);
            break;
        case "4x4":
            Init(4);
            break;
        case "5x5":
            Init(5);
            break;
    }
});

$(document).ready(function() { Init(3); });