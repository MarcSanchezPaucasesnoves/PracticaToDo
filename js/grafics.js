

export function crearGrafic(canva, dades){
    const chart = Chart.getChart(canva);

    if (chart) {
        chart.destroy();
    }

    new Chart(canva, {
        type: 'line',
        data: {
            labels: ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Septembre', 'Octubre', 'Novembre', 'Desembre'],
            datasets: [{
                label: 'Tasques realitzades',
                data: dades,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}