import React from 'react';
import Chart from 'chart.js';

class Charts extends React.Component {
    componentDidMount() {
        let spends_amount = [];
        let spends_categories = [];
        let spends_amount_categories = [];
        let spends_categories_final = [];
        let spends_amount_final = [];
        let colors = [];
        let colors_hover = [];

        fetch('https://mateusz-styrna.pl:3001/check_outgoings_chart', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function(response) {
            response.text().then(function(results) {
                results = JSON.parse(results);
                let amount = results.map(a => a.Amount);
                let category = results.map(a => a.Category);

                for (let i = 0; i < amount.length; i++) {
                    spends_amount[i] = [category[i], amount[i]];
                    if (!spends_categories.includes(category[i])) {
                        spends_categories.push(category[i]);
                    }

                }

                for (let j = 0; j < spends_amount.length; j++) {
                    let y = spends_amount[j][0];
                    let found_category = false;

                    for(let l = 0; l < spends_amount_categories.length; l++){
                        if(spends_amount_categories[l][0] === y){
                            found_category = true;
                        }
                        if (found_category === true) break;
                    }

                    if (!spends_amount_categories.includes(spends_amount[j][0]) && !found_category) {
                        spends_amount_categories.push(spends_amount[j][0]);
                    }

                    if (spends_amount_categories[spends_amount_categories.indexOf(spends_amount[j][0])]) {
                        spends_amount_categories[spends_amount_categories.indexOf(spends_amount[j][0])] = [spends_amount[j][0], 0];
                    }

                    let x = spends_amount[j][0];
                    let found = false;

                    for(var k = 0; k < spends_amount_categories.length; k++){
                        if(spends_amount_categories[k][0] === x){
                            found = true;
                        }
                        if (found === true) break;
                    }
                    spends_amount_categories[k][1] += spends_amount[j][1];
                }

                for (let e = 0; e < spends_amount_categories.length; e++) {
                    spends_categories_final.push(spends_amount_categories[e][0]);
                }

                for (let r = 0; r < spends_amount_categories.length; r++) {
                    spends_amount_final.push(spends_amount_categories[r][1]);
                }

                for (let t = 0; t < spends_categories_final.length; t++) {
                   let r = Math.random() * (255 - 0) + 0;
                   let g = Math.random() * (255 - 0) + 0;
                   let b = Math.random() * (255 - 0) + 0;

                   colors.push('rgba('+Math.floor(r)+', '+ Math.floor(g)+ ', '+ Math.floor(b)+', 0.7)');
                   colors_hover.push('rgba('+Math.floor(r)+', '+ Math.floor(g)+ ', '+ Math.floor(b)+', 0.9)');
                }

                update_chart_spends();
            });
        });

        //prepare incomings data
        let incomings_amount = [];
        let incomings_categories = [];
        let incomings_amount_categories = [];
        let incomings_categories_final = [];
        let incomings_amount_final = [];
        let incomings_colors = [];
        let incomings_colors_hover = [];

        fetch('https://mateusz-styrna.pl:3001/check_incomings_chart', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function(response) {
            response.text().then(function(resp) {
                resp = JSON.parse(resp);
                let amount = resp.map(a => a.Amount);
                let category = resp.map(a => a.Category);

                for (let i = 0; i < amount.length; i++) {
                    incomings_amount[i] = [category[i], amount[i]];
                    if (!incomings_categories.includes(category[i])) {
                        incomings_categories.push(category[i]);
                    }

                }

                for (let j = 0; j < incomings_amount.length; j++) {
                    let y = incomings_amount[j][0];
                    let found_category = false;

                    for(let l = 0; l < incomings_amount_categories.length; l++){
                        if(incomings_amount_categories[l][0] === y){
                            found_category = true;
                        }
                        if (found_category === true) break;
                    }

                    if (!incomings_amount_categories.includes(incomings_amount[j][0]) && !found_category) {
                        incomings_amount_categories.push(incomings_amount[j][0]);
                    }

                    if (incomings_amount_categories[incomings_amount_categories.indexOf(incomings_amount[j][0])]) {
                        incomings_amount_categories[incomings_amount_categories.indexOf(incomings_amount[j][0])] = [incomings_amount[j][0], 0];
                    }

                    let x = incomings_amount[j][0];
                    let found = false;

                    for(var k = 0; k < incomings_amount_categories.length; k++){
                        if(incomings_amount_categories[k][0] === x){
                            found = true;
                        }
                        if (found === true) break;
                    }
                    incomings_amount_categories[k][1] += incomings_amount[j][1];
                }

                for (let e = 0; e < incomings_amount_categories.length; e++) {
                    incomings_categories_final.push(incomings_amount_categories[e][0]);
                }

                for (let r = 0; r < incomings_amount_categories.length; r++) {
                    incomings_amount_final.push(incomings_amount_categories[r][1]);
                }

                for (let t = 0; t < incomings_categories_final.length; t++) {
                   let r = Math.random() * (255 - 0) + 0;
                   let g = Math.random() * (255 - 0) + 0;
                   let b = Math.random() * (255 - 0) + 0;

                   incomings_colors.push('rgba('+Math.floor(r)+', '+ Math.floor(g)+ ', '+ Math.floor(b)+', 0.7)');
                   incomings_colors_hover.push('rgba('+Math.floor(r)+', '+ Math.floor(g)+ ', '+ Math.floor(b)+', 0.9)');
                }

                update_chart_incomings();
            });
        });

        let date_list = [];
        let amount_list = [];
        let total = 0;

        fetch('https://mateusz-styrna.pl:3001/check_both', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function(response) {
            response.text().then(function(results) {
                results = JSON.parse(results);

                let title = results.map(a => a.Title);
                let amount = results.map(a => a.Amount);
                let date = results.map(a => a.Date);
                let type = results.map(a => a.type);

                for (let i = 0; i < title.length; i++) {
                    let formated_date = new Date(date[i]);
                    let year = formated_date.getFullYear();
                    let month = formated_date.getMonth()+1;
                    let day = formated_date.getUTCDate()+1;
                    date_list.push(day + "-" + month + "-" + year);

                    if (type[i] === "incomings") {
                        amount_list.push(total+=amount[i]);
                    }
                    else {
                        amount_list.push(total-=amount[i]);
                    }
                }

                update_chart();
            });
        });

        let data = {
            labels: date_list,
            datasets: [
                {
                    label: "History of Balance",
                    borderColor : 'rgba(0, 132, 255, 0.8)',
                    pointBorderColor : 'rgba(0, 132, 255, 1)',
                    borderWidth : 2,
                    fill: true,
                    backgroundColor : 'rgba(0, 132, 255, 0.5)', 
                    
                    pointRadius : 4,
                    pointBorderWidth : 1,
                    pointBackgroundColor : 'rgba(255,255,255,1)',

                    pointHoverRadius: 4,
                    pointHoverBorderWidth: 3,
                    pointHoverBackgroundColor : 'rgba(255,255,255,1)',
                    pointHoverBorderColor : 'rgba(236,115,87, 1)',
                    data: amount_list,
                }
            ]
        };

        let options = {
            //maybe some day I will need this
        };


        let data_spends = {
            labels: spends_categories_final,
            datasets: [
                {
                    backgroundColor : colors,
                    borderColor : colors,
                    borderWidth : 2,
                    hoverBackgroundColor : colors_hover,
                    hoverBorderColor: colors,
                    hoverBorderWidth: 3,
                    data: spends_amount_final,
                }
            ]
        };

        let options_spends = {
            //maybe some day I will need this
        };

        let data_incomings = {
            labels: incomings_categories_final,
            datasets: [
                {
                    backgroundColor : incomings_colors,
                    borderColor : incomings_colors,
                    borderWidth : 2,
                    hoverBackgroundColor : incomings_colors_hover,
                    hoverBorderColor: incomings_colors,
                    hoverBorderWidth: 3,
                    data: incomings_amount_final,
                }
            ]
        };

        let options_incomings = {
            //maybe some day I will need this
        };

        function update_chart() {
            let ctx = document.getElementById("chart").getContext("2d");
            new Chart(ctx, {
                type: 'line',
                data: data,
                options: options
            });
        }

        function update_chart_spends() {
            let ctx = document.getElementById("chart--spends").getContext("2d");
            new Chart(ctx, {
                type: 'pie',
                data: data_spends,
                options: options_spends
            });
        }

        function update_chart_incomings() {
            let ctx = document.getElementById("chart--incomings").getContext("2d");
            new Chart(ctx, {
                type: 'pie',
                data: data_incomings,
                options: options_incomings
            });
        }
    }

    render() {
        return(
            <div className="charts">
                <div className="charts__big panel__box">
                    <canvas id="chart"></canvas>
                    <h2 className="charts__title">History</h2>
                </div>
                <div className="charts__small">
                    <div className="charts__small--chart panel__box">
                        <canvas id="chart--spends"></canvas>
                        <h2 className="charts__title">Outgoings</h2>
                    </div>
                    <div className="charts__small--chart panel__box">
                        <canvas id="chart--incomings"></canvas>
                        <h2 className="charts__title">Incomings</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default Charts;