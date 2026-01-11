const pieChartCanvas = document.querySelector("#myChart");

if (pieChartCanvas) {
        new Chart(pieChartCanvas, {
            type: "pie",
            data: {
                labels: ['Production de vin en %', 'Production de tire-bouchons personnalisés en %', 'Production de fromage en %'],
                datasets: [{
                    label: 'Production en %',
                    data: [60, 10, 30],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)'
                    ],
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                }
            }
        });
        } else {
            console.error("L'élément canvas avec l'ID 'myChart' n'a pas été trouvé.");
        }



let tester = document.getElementById('tester')
let data = [{
    type: 'bar',
    x: ['janvier','février', 'mars', 'avril', 'mai','juin','juillet', 'août', 'septembre', 'octobre', 'nomvembre', 'décembre'],
    y: [98, 87, 93, 83, 78, 69, 95, 91, 93, 95, 92, 89],
    marker: {
        color: '#C8A2C8',
        line: {
            width: 1.5
        }
    }
}];
let layout = { 
    title: 'Pourcentage de CA de l\'année 2022',
    font: {size: 15}
};
let config = {responsive: true}
Plotly.newPlot(tester, data, layout, config );
