google.charts.load("current", {"packages" : ["corechart"]})

google.charts.setOnLoadCallback(drawchart)

function drawchart(array){

    const visualizarGrafico = document.getElementById('chart_div')
    visualizarGrafico.innerHTML = ""

    let grafico = new google.visualization.DataTable();

    grafico.addColumn('number', "Valor X")

    grafico.addColumn('number', "Valor X")

    var options = {

        annotations: {

            boxStyle: {

                // Color of the box outline.

            stroke: '#888',

            // Thickness of the box outline.

            strokeWidth: 1,

            // x-radius of the corner curvature.

            rx: 10,

            // y-radius of the corner curvature.

            ry: 10,

            // Attributes for linear gradient fill.

            gradient: {

                // Start color for gradient.

              color1: '#fbf6a7',

              // Finish color for gradient.

              color2: '#33b679',

              // Where on the boundary to start and

              // end the color1/color2 gradient,

              // relative to the upper left corner

              // of the boundary.

              x1: '0%', y1: '0%',

              x2: '100%', y2: '100%',

              // If true, the boundary for x1,

              // y1, x2, and y2 is the box. If

              // false, it's the entire chart.

              useObjectBoundingBoxUnits: true

            }

            }

        }

    };
    
    grafico.addRows(array)

    var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));

    chart.draw(grafico, options);



}

/*

function drawChart(array) {​​​​

    const visualizarGrafico = document.getElementById('chart_div')

    visualizarGrafico.innerHTML = ""



    let grafico = new google.visualization.DataTable();

    grafico.addColumn('number', varX.value)

    grafico.addColumn('number', varY.value)



    var options = {​​​​

        annotations: {​​​​

          boxStyle: {​​​​

            // Color of the box outline.

            stroke: '#888',

            // Thickness of the box outline.

            strokeWidth: 1,

            // x-radius of the corner curvature.

            rx: 10,

            // y-radius of the corner curvature.

            ry: 10,

            // Attributes for linear gradient fill.

            gradient: {​​​​

              // Start color for gradient.

              color1: '#fbf6a7',

              // Finish color for gradient.

              color2: '#33b679',

              // Where on the boundary to start and

              // end the color1/color2 gradient,

              // relative to the upper left corner

              // of the boundary.

              x1: '0%', y1: '0%',

              x2: '100%', y2: '100%',

              // If true, the boundary for x1,

              // y1, x2, and y2 is the box. If

              // false, it's the entire chart.

              useObjectBoundingBoxUnits: true

            }​​​​

          }​​​​

        }​​​​

    }​​​​;

          



    grafico.addRows(array)



    var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));



    chart.draw(grafico, options);



}​​​​

*/ 





function calcular () {

    

    var x = document.getElementById("var_X").value
    var y = document.getElementById("var_Y").value
    var auxSep_X = x.split(";")
    var separa_X = []
    var auxSep_Y = y.split(";") 
    var separa_Y = []
    var n = auxSep_X.length
    var correlacao = 0

    var soma_x = 0
    var soma_y = 0
    var soma_Mult = 0
    var soma_X2 = 0
    var soma_Y2 = 0

    //Valida a quantidade de dados inseridos em ambos inputs

    if( (auxSep_X.length != auxSep_Y.length) ||  (auxSep_Y.length != auxSep_X.length)){
        alert("A quantidade de valores inseridos em X ou Y não estão compativeis")
        auxSep_X = 0
        auxSep_Y = 0
        document.getElementById("resultados").innerHTML = ""
    }
    //Valida a quantidade de dados inseridos em ambos inputs


    //Armazena a soma de X e Y / X * Y / X^2 / Y^2
    for(let i = 0; i < auxSep_X.length; i++){

        separa_X.push(Number(auxSep_X[i])) 
        separa_Y.push(Number(auxSep_Y[i]))
        


        soma_x += separa_X[i]
        soma_y += separa_Y[i]
        soma_Mult += (separa_X[i] * separa_Y[i])
        soma_X2 += Math.pow(separa_X[i], 2)
        soma_Y2 += Math.pow(separa_Y[i], 2)
        
    }
    //Armazena a soma de X e Y / X * Y / X^2 / Y^2


    // Faz os calculos para chegar na Correlação

    let result_1 = ((n * soma_X2) - (soma_x ** 2)) 
    let result_2 = ((n * soma_Y2) - (soma_y ** 2))

    let raiz_1 = 0
    let raiz_2 = 0

    if (result_1 < 0) {

        result_1 = result_1 * -1

        result_1 = Math.sqrt(result_1)

        raiz_1 = result_1 * -1

    }
    else{
        raiz_1 =  Math.sqrt(result_1)
    }

    if (result_2 < 0) {

        result_2 = result_2 * -1

        result_2 = Math.sqrt(result_2)

        raiz_2 = result_2 * -1

    }
    else{
        raiz_2 =  Math.sqrt(result_2)
    }



    let div_baixo = (raiz_1 * raiz_2)

    correlacao = (((n * soma_Mult) - (soma_x * soma_y)) / div_baixo) 

    // Faz os calculos para chegar na Correlação


    //Gau de correlação 
    var grau 

    if(correlacao == 1){

        grau = "Perfeita Posivitva"
    }
    else if(correlacao == -1){
        grau = "Perfeita Negativa"
    }
    else if(correlacao == 0){
        grau = "Não correlacionadas"
    }
    else if((((correlacao > 0) || (correlacao == 0)) && ((correlacao < 0.30) || (correlacao == 0.30)))){
        grau = "Fraca"

    }
    else if((correlacao > 0.30) && ((correlacao < 0.70) || (correlacao == 0.70))){
        grau = "Moderada"

    }
    else if(correlacao > 0.70){
        grau = "Forte"

    }
    
    correlacao = correlacao * 100




    //Regressão

    let media_y = (soma_y / n)
    let media_x = (soma_x / n)

    var a = ((n * soma_Mult) - (soma_x * soma_y)) / ((n * soma_X2) - (soma_x ** 2))

    var b = ( media_y - (a * media_x) )
    
    document.getElementById("projecao").innerHTML = ""
    
    var projecao = document.getElementById("projecao")
    var select_id = document.getElementById("selec")

    let select = document.createElement("select")
    select.setAttribute("class", "form-control")
    select.setAttribute("id", "seleciona")

    let div_titutlo = document.createElement("div")
    div_titutlo.setAttribute("class", "text-center mb-3 descritiva-text")
    
    let titulo = document.createElement("h2")
    titulo.textContent = "Faça uma projeção " 

    let div_formula = document.createElement("div")
    div_formula.setAttribute("class", "text-right")

    //titulo.......................................................

    

    let div_conteudo = document.createElement("div")
    div_conteudo.setAttribute("class", "row")

    let conteudo_1 = document.createElement("div")
    conteudo_1.setAttribute("class", "col")

    let conteudo_2 = document.createElement("div")
    conteudo_2.setAttribute("class", "col form-group")

    let conteudo_3 = document.createElement("div")
    

    let input_cont2 = document.createElement("input")
    input_cont2.setAttribute("class", "form-control")
    input_cont2.setAttribute("id", "valorXY")
    input_cont2.setAttribute("type", "number")
    input_cont2.setAttribute("placeholder", "Insira o valor")

    let calcula_2 = document.createElement("button")
    calcula_2.setAttribute("class", "btn btn-outline-dark")
    calcula_2.setAttribute("onclick", "calcular2()")
    calcula_2.textContent = "Calcular"
    
    
    let option_1 = document.createElement("option")
    option_1.setAttribute("value", "")
    option_1.textContent = "Selecione"

    let option_2 = document.createElement("option")
    option_2.setAttribute("value", "proje_y")
    option_2.textContent = "Insira X, para projeção de Y"

    let option_3 = document.createElement("option")
    option_3.setAttribute("value", "proje_x")
    option_3.textContent = "Insira Y, para projeção de X"
    
    

    div_titutlo.appendChild(titulo)
    select.appendChild(option_1)
    select.appendChild(option_2)
    select.appendChild(option_3)
    conteudo_1.appendChild(select)
    conteudo_2.appendChild(input_cont2)
    conteudo_3.appendChild(calcula_2)
    div_conteudo.appendChild(conteudo_1)
    div_conteudo.appendChild(conteudo_2)
    div_conteudo.appendChild(conteudo_3)

    
    projecao.appendChild(div_titutlo)
    projecao.appendChild(div_conteudo)
    
    //..........................................................................................
    

    //Tabela
    document.getElementById("tabela").innerHTML = ""

    let tabela = document.getElementById("tabela")
    let titulos_col = ["Correlação", "Grau de Correlação", "Equação"]
    let valores_col = [correlacao.toFixed(2)+"%", grau, ("Y = " + "(" + a.toFixed(2) + " * X " + ")" + "+" + "(" + b.toFixed(0) + ")")]

    let linha1 = document.createElement("tr")
    let linha2 = document.createElement("tr")

    for(let i = 0; i < titulos_col.length; i++){

        var coluna1 = document.createElement("th")
        
        coluna1.textContent = titulos_col[i]
        
        linha1.appendChild(coluna1)
    }

    for(let i = 0; i < titulos_col.length; i++){

        var coluna2 = document.createElement("td")
        
        coluna2.textContent = valores_col[i]
        
        linha2.appendChild(coluna2)
    }

    tabela.appendChild(linha1)
    tabela.appendChild(linha2)
    //Tabela

    

    var todo_dados = []

    for (let i = 0; i < separa_X.length; i++) {
        todo_dados.push([separa_X[i],separa_Y[i]])
        
    }

    drawchart(todo_dados)

    

}



function calcular2 () {

    var x = document.getElementById("var_X").value
    var y = document.getElementById("var_Y").value
    var auxSep_X = x.split(";")
    var separa_X = []
    var auxSep_Y = y.split(";") 
    var separa_Y = []
    var n = auxSep_X.length

    var soma_x = 0
    var soma_y = 0
    var soma_Mult = 0
    var soma_X2 = 0
    var soma_Y2 = 0

    for(let i = 0; i < auxSep_X.length; i++){

        separa_X.push(Number(auxSep_X[i])) 
        separa_Y.push(Number(auxSep_Y[i]))
        


        soma_x += separa_X[i]
        soma_y += separa_Y[i]
        soma_Mult += (separa_X[i] * separa_Y[i])
        soma_X2 += Math.pow(separa_X[i], 2)
        soma_Y2 += Math.pow(separa_Y[i], 2)
        
    }

    let media_y = (soma_y / n)
    let media_x = (soma_x / n)

    var a = ((n * soma_Mult) - (soma_x * soma_y)) / ((n * soma_X2) - (soma_x ** 2))

    var b = ( media_y - (a * media_x) )

    var valor_futuro = Number(document.getElementById("valorXY").value)

    if(seleciona.value === "proje_x"){

        document.getElementById("resul_Proje").innerHTML = ""
    
        var acha_X = ((valor_futuro - b) / a) 


        var resultadoX = document.getElementById("resul_Proje")

        let cria_X = document.createElement("div")
        cria_X.setAttribute("class", "align-self-center")


        let hx = document.createElement("h4")
        hx.setAttribute("class", "descritiva-text")
        hx.textContent = ("Projeção futura de X = " + acha_X.toFixed(2) + "%")

        cria_X.appendChild(hx)
        resultadoX.appendChild(cria_X)
        
        console.log(resultadoX)
    }
    else if(seleciona.value === "proje_y") {

        document.getElementById("resul_Proje").innerHTML = ""

        var acha_Y = ((a * valor_futuro) + b)

        var resultadoY = document.getElementById("resul_Proje")

        let cria_Y = document.createElement("div")
        cria_Y.setAttribute("class", "align-self-center")

        let hy = document.createElement("h4")
        hy.setAttribute("class", "descritiva-text")
        hy.textContent = ("Projeção futura de Y = " + acha_Y.toFixed(2) + "%")
        
        
        
        cria_Y.appendChild(hy)
        resultadoY.appendChild(cria_Y)

        console.log(acha_Y)

    }



    
    

}    








/*google.charts.load('current', {​​'packages':['corechart']}​​);*/

/*google.charts.setOnLoadCallback(drawChart);*/